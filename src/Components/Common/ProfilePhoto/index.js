import React from "react";
import "./styles.css";

const ProfileCard=({name, email, uid})=>{
    return(
        <div className="profile-card">
            <h1>{"Name: "+name}</h1>
            <p style={{"fontWeight": "bold"}}>{"Email: "+email}</p>
            <p style={{"fontWeight": "bold"}}>{"UID: "+uid}</p>
        </div>
    )
}

export default ProfileCard;