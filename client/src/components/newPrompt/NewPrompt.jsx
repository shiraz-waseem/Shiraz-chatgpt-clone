import React, { useEffect, useRef } from 'react'
import "./newPrompt.css"

const NewPrompt = () => {
    const endRef = useRef(null);
    
    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
      }, []);

  return (
    <>
    {/* To see last message endRef and giving it padding */}
    <div className="endChat" ref={endRef}></div>
      <form className="newForm">
        {/* <Upload setImg={setImg} /> */}
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
