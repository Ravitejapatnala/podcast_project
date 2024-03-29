import React, {useState} from "react";
import InputComponent from "../../Common/Input";
import Button from "../../Common/Button";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { auth, db } from "../../../firebase";
import { toast } from "react-toastify";
import Loader from "../../Common/Loader";

function LoginForm(){

    
    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");
    const[loading, setLoading]= useState(false);
    const dispatch= useDispatch();
    const navigate= useNavigate();
    

    const handleLogin=async()=>{
        console.log("handing login");
        setLoading(true);

        try{
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user= userCredential.user;

            const userDoc= await getDoc(doc(db, "users", user.uid));
            const userData= userDoc.data();
            
            dispatch(
                setUser({
                    name: userData.name,
                    email: user.email,
                    uid: user.uid,
                    profilePic: userData.profilePic
                })
            );
            
            toast.success("Login Successful");
            setLoading(false);
            navigate("/profile")
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <>
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

                <Button text={loading?"Loading...":"Login"} disabled={loading} onClick={handleLogin}/>
        </>
    )
}

export default LoginForm;