import React, { useState } from "react";
import Header from "../Components/Common/Header/index";
import InputComponent from "../Components/Common/Input";
import Button from "../Components/Common/Button";
import SignupForm from "../Components/SignupComponents/SignupForm";
import LoginForm from "../Components/SignupComponents/LoginForm";

const SignUp=()=>{
    
    const[flag, setFlag]= useState(false);
    
    
    return(
        <div>
            <Header/>
            <div className="input-wrapper">
                {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
                {!flag ? <SignupForm/> : <LoginForm/>}
                {!flag? (<p style={{"cursor": "pointer"}} onClick={()=>setFlag(!flag)}>Already have an Account? Click here to Login.</p>) : (<p style={{"cursor": "pointer"}} onClick={()=>setFlag(!flag)}>Don't have an Account? CLick here to Signup.</p>)}
            </div>
        </div>
    )
}

export default SignUp;