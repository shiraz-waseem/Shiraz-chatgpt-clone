import React, { useEffect, useRef, useState } from 'react'
import "./newPrompt.css"
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from "react-markdown"

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},    // image data
    aiData: {},
  });

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer]);


  // const add = async () => {
  //   const prompt = "Write a story about a magic backpack.";

  //   const result = await model.generateContent(prompt);
  //   const response = await result.response
  //   const text = response.text()
  //   // console.log(result.response.text());
  //   console.log(text)
  // }

  const add = async (text, isInitial) => {
    // // const prompt = "Write a story about a magic backpack.";
    // const result = await model.generateContent(prompt);
    // const response = await result.response
    // // const text = response.text()
    // // console.log(result.response.text());
    // console.log(text)

    if (!isInitial) setQuestion(text);   // agar false tw question set
    const result = await model.generateContent(text);
    const response = await result.response
    setAnswer(response.text())
  }



  const handleSubmit = (e) => {
    e.preventDefault()

    const text = e.target.text.value;  // text attribute pass
    if (!text) return;

    add(text, false);
  }

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
      <form className="newForm" onSubmit={handleSubmit}>
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
