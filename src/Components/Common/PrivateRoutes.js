import React from "react";
import { auth } from "../../firebase";
import { Navigate, Outlet } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./Loader";

const PrivateRoutes=()=>{
    const [user, loading, error]= useAuthState(auth);

    if(loading){
        return <Loader/>
    } else if(!user || error){
        return <Navigate to="/" replace/>;
    } else{
        return <Outlet/>;
    }
};

export default PrivateRoutes;