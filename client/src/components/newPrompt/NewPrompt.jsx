import React, { useEffect, useRef, useState } from 'react'
import "./newPrompt.css"
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from "react-markdown"
import { useMutation, useQueryClient } from "react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},    // image data
    aiData: {},   // added
  });
  const queryClient = useQueryClient();

  //saving chat
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hi my name is Bob" }],
      },
      {
        role: "model",
        parts: [{ text: "Hi Bob!" }],
      },
    ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);


  const mutation = useMutation({
    mutationFn: async (text) => {
      return await fetch(`http://localhost:8000/api/chats/${data._id}`, {    // props ke through 
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined
        })
      }).then((res) => res.json())

      // if its success it returns chatId. (Backend sy bhej rhy)
    }, onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: `chat, ${data._id}` })   // chat page py yeh query
        .then(() => {
          formRef.current.reset();   // reseting our form. Now ques answer "" empty hujaya ga after the answer
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        })
    },
    onError: (err) => {
      console.log(err);
    },
  })


  const add = async (text, isInitial) => {

    // means false
    if (!isInitial) setQuestion(text);   // agar false tw question set. mtlb agar phela nahi ha

    try {
    const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, text] : [text]);
    let accumulatedText = ""   
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText
      setAnswer(accumulatedText)
    }
    mutation.mutate();
  }
  catch (err) {
    console.log(err);
  }
  }



  const handleSubmit = async (e) => {
    e.preventDefault()

    const text = e.target.text.value;  // text attribute pass
    if (!text) return;

    add(text, false);

  }

  // IN PRODUCTION WE DON'T NEED IT
  const hasRun = useRef(false);


  // when there is only one message. Jab new chat banata. means its question so generate answer and send to db
  useEffect(()=>{
    if(!hasRun.current){
      if (data?.history?.length === 1){
        add(data.history[0].parts[0].text, true)
      }
    }
    hasRun.current = true;
  },[])  // agar empty array de dia it will run twice as we have react.strictmode. Production mein it will run. Abhi twice is lia ke it will test bugs

  return (
    <>
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath &&
        <IKImage
          urlEndpoint={process.env.REACT_APP_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}   // OPTIMIZE IMAGE AND MAKES FASTER
        />
      }

      {/* User will ask question always and answer aya ga */}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
          {/* {answer} */}
        </div>
      )}


      {/* <button onClick={add}>Test AI</button> */}
      {/* To see last message endRef and giving it padding */}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  )
}

export default NewPrompt
