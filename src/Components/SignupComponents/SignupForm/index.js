import React, {useState} from "react";
import InputComponent from "../../Common/Input";
import Button from "../../Common/Button";
import {auth, db, storage} from "../../../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Loader from "../../Common/Loader";
import FileInput from "../../Common/Input/FileInput";

function SignupForm(){

    const[fullName, setFullName]= useState("");
    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");
    const[confirmPassword, setConfirmPassword]= useState("");
    const[loading, setLoading]= useState(false);
    const[fileUrl, setFileUrl]= useState("");

    const dispatch= useDispatch();
    const navigate= useNavigate();

    const handleSignup=async()=>{
        console.log("handing signup");
        setLoading(true);
        if(password==confirmPassword && password.length>=6)
        {
            try{
                //Creating users account
                const userCredential= await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user= userCredential.user;
                console.log(user);
                //Saving users details
                await setDoc(doc(db, "users", user.uid), {
                    name: fullName,
                    email: user.email,
                    uid: user.uid,
                    profilePic: fileUrl,
                });

                //Save date in the redux, call the redux action
                dispatch(
                    setUser({
                        name: fullName,
                        email: user.email,
                        uid: user.uid,
                        profilePic: fileUrl,
                    })
                );
                
                toast.success("Signup Successful");
                setLoading(false);
                navigate("/profile");
                
            }catch(error){
                console.log('error', error);
                toast.error(error.message);
                setLoading(false); 
            }
        }
        else{
            if(password != confirmPassword){
                toast.error("Password Mismatch");
            }
            else if(password.length<6){
                toast.error("Password length must be greater than 6")
            }
            setLoading(false);
        }
    }

    const uploadImage= async(file)=>{
        setLoading(true);
        try{
            const imageRef= ref(storage, `profile/${Date.now()}`);
            await uploadBytes(imageRef, file);

            const imageURL= await getDownloadURL(imageRef);
            setFileUrl(imageURL);
            setLoading(false);
            console.log("ImageURL", imageURL);
        } catch(e){
            console.log(e);
            toast.error("Error Occurred!");
        }
    }
        
    return(
        <>
            <InputComponent 
                    state={fullName}
                    setState={setFullName}
                    placeholder= "Full Name"
                    type="text"
                    required= {true} />

                <InputComponent 
                    state={email}
                    setState={setEmail}
                    placeholder= "Email"
                    type="text"
                    required= {true} />

                <InputComponent 
                    state={password}
                    setState={setPassword}
                    placeholder= "Password"
                    type="password"
                    required= {true} />

                <InputComponent 
                    state={confirmPassword}
                    setState={setConfirmPassword}
                    placeholder= "Confirm Password"
                    type="password"
                    required= {true} />

                <FileInput
                    id="user-image"
                    fileHandleFnc={uploadImage}
                    accept={"image/*"}
                    text={"Upload Profile Pic"}
                />

                <Button text={loading?"Loading...":"Signup"} disabled={loading} onClick={handleSignup}/>
        </>
    )
}

export default SignupForm;