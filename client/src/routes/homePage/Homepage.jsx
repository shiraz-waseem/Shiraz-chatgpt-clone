import React, { useState } from 'react'
import "./homepage.css"
import { Link } from "react-router-dom"
import { TypeAnimation } from "react-type-animation";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");


  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>SHIRAZ AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat sint
          dolorem doloribus, architecto dolor.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>

      <div className='right'>
        <div className="imgContainer">

          <div className="bgContainer">
            <div className="bg"></div>
          </div>

          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                    ? "/human2.jpeg"
                    : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                "Human:Hey who are you?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "I am a bot to answer your queries",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Human2: What really?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                'Yes, feel free to ask anything',
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              // speed={50}
              // style={{ fontSize: '2em' }}
              // repeat={Infinity}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>


      <div className="terms">
        <img src="/bot.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>

    </div>
  )
}

export default Homepage
