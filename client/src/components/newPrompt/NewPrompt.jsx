import React, { useEffect, useRef, useState } from 'react'
import "./newPrompt.css"
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';

const NewPrompt = () => {

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},    // image data
    aiData: {},
  });

    const endRef = useRef(null);
    
    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
      }, []);

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
    {/* To see last message endRef and giving it padding */}
    <div className="endChat" ref={endRef}></div>
      <form className="newForm">
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
