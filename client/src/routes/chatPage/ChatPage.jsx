import React from 'react'
import "./chatPage.css"
import NewPrompt from '../../components/newPrompt/NewPrompt'
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Markdown from 'react-markdown';

const ChatPage = () => {
  const path = useLocation().pathname;
  // console.log(path)

  const chatId = path.split("/").pop();  // gives last one
  // console.log(chatId)

  // `chat, ${chatId}`
  const { isLoading, error, data } = useQuery(`chat, ${chatId}`, () =>
    fetch(`http://localhost:8000/api/chats/${chatId}`, {
      credentials: "include",
    }).then((res) => res.json())
  )
  console.log("Data is: ", data);


  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {/* <div className='message'>Test Message</div>
        <div className='message user'>Test Message</div> */}
          {/* history contains the message */}

          {
            isLoading
              ? "Loading..."
              : error
                ? "Something went wrong!"
                : data?.history?.map((message, i) => (
                  <>
                    {message.imp && (
                      <IKImage
                        urlEndpoint={process.env.REACT_APP_IMAGE_KIT_ENDPOINT}
                        path={message.img}
                        height="300"
                        width="400"
                        transformation={[{ height: 300, width: 400 }]}   // OPTIMIZE IMAGE AND MAKES FASTER
                        loading="lazy"
                        lqip={{ active: true, quality: 20 }}
                      />
                    )}

                    <div className={
                      message.role === "user" ? "message user" : "message"
                    } key={i}>
                      <Markdown>{message.parts[0].text}</Markdown>
                      {/* takes the first one */}
                    </div>
                  </>
                ))
          }
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  )
}

export default ChatPage
