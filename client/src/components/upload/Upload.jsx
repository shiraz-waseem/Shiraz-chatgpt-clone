import React, { useRef } from 'react';
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';

const publicKey = process.env.REACT_APP_IMAGE_KIT_PUBLIC_KEY;
const urlEndpoint = process.env.REACT_APP_IMAGE_KIT_ENDPOINT;


const authenticator = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};




function Upload({ setImg }) {
    const ikUploadRef = useRef(null);

    const onError = err => {
        console.log("Error", err);
    };

    const onSuccess = res => {
        console.log("Success", res);
        setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
    };

    const onUploadProgress = (progress) => {
        console.log("Progress", progress);
    };

    const onUploadStart = (evt) => {
        const file = evt.target.files[0];

        //read our file. 
        const reader = new FileReader();
        reader.onloadend = () => {
            setImg((prev) => ({
                ...prev,
                isLoading: true,
                aiData: {
                    inlineData: {
                        data: reader.result.split(",")[1],
                        mimeType: file.type,
                    },
                }
            }))
        }
        reader.readAsDataURL(file)

        // console.log("Start", evt);  // evt includes file
        // // Make it loading
        // setImg((prev) => ({
        //     ...prev,
        //     isLoading: true,
        // }))
    };

    return (
        <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <IKUpload
                fileName="test-upload.png"
                onError={onError}
                onSuccess={onSuccess}
                useUniqueFileName={true}  // no need to worry about giving unique name
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                style={{ display: "none" }}
                ref={ikUploadRef}
            />
            {/* when we click on this label upper wala component call on is lia useRef bana lia  */}
            {
                <label onClick={() => ikUploadRef.current.click()}>
                    <img src="/attachment.png" alt="" />
                </label>
            }
        </IKContext>
    );
}

export default Upload;