import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../Common/Input";
import { toast } from "react-toastify";
import Button from "../Common/Button";
import FileInput from "../Common/Input/FileInput";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {auth, db, storage} from "../../firebase";
import { addDoc, collection, setDoc } from "firebase/firestore";
import Loader from "../Common/Loader";

function CreatePodcastForm(){

    const[title, setTitle]= useState("");
    const[desc, setDesc]= useState("");
    const[displayImage, setDisplayImage]= useState();
    const[bannerImage, setBannerImage]= useState();
    const[loading, setLoading]= useState(false);
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const handleSubmit=async()=>{
        if(title && desc && displayImage && bannerImage)
        {
            setLoading(true)
            //Upload files and get downloadable links
            //for banner image
            try{
                const bannerImageRef= ref(
                    storage ,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(bannerImageRef, bannerImage);
    
                const bannerImageUrl= await getDownloadURL(bannerImageRef);

                //for display image

                const displayImageRef= ref(
                    storage ,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(displayImageRef, displayImage);
    
                const displayImageUrl= await getDownloadURL(displayImageRef);
                const podcastData = {
                    title: title,
                    description: desc,
                    bannerImage: bannerImageUrl,
                    displayImage: displayImageUrl ,
                    createdBy: auth.currentUser.uid,
                  };
          
                const docRef = await addDoc(collection(db, "podcasts"), podcastData);
                
                setTitle("");
                setDesc("");
                setBannerImage(null);
                setDisplayImage(null);

                toast.success("Podcast Created!");
                setLoading(false);
            }catch(error){
                toast.error(error.message);
                console.log("error", error);
                setLoading(false);
            }
        }
        else{
            toast.error("please enter all values")
            setLoading(false); 
        }
    }

    function displayImageHandle(file){
        setDisplayImage(file)
    }

    function bannerImageHandle(file){
        setBannerImage(file)
    }
    return(
        <>
            <InputComponent 
                    state={title}
                    setState={setTitle}
                    placeholder= "Title"
                    type="text"
                    required= {true} />

            <InputComponent 
                    state={desc}
                    setState={setDesc}
                    placeholder= "Description"
                    type="text"
                    required= {true} />

            <FileInput
                accept={"image/*"}
                id="display-image-input"
                fileHandleFnc={displayImageHandle}
                text={"Display Image Upload"} 
            />

            <FileInput
                accept={"image/*"}
                id="banner-image-input"
                fileHandleFnc={bannerImageHandle}
                text={"Banner Image Upload"}
            />

            <Button text={loading?"Creating A Podcast. Please Wait...":"Create A Podcast"} disabled={loading} onClick={handleSubmit}/>
        </>
    )
}

export default CreatePodcastForm;