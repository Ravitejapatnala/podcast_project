import React from "react";
import Button from "../../Button";

function EpisodeDetails({index, title, description, audioFile, onClick}){
    return(
        <div style={{width: "100%"}}>
            <h1 style={{textAlign:"left", marginBottom:0}}>{title}</h1>
            <p style={{marginLeft:"1.2rem"}} className="podcast-description">{description}</p>
            <Button text={"Play"} onClick={()=>onClick(audioFile)} width={"100px"}/>
         </div>
    )
}

export default EpisodeDetails;