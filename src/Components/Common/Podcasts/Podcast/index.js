import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import {FaPlay} from "react-icons/fa";
const PodcastCard=({id, title, displayImage})=>{
    return(
        <Link to={`/podcast/${id}`}>
            <div className="podcast-card">
                <img className="display-image-podcast" src={displayImage}/>
                <div className="info">
                    <p>{title}</p>
                    <FaPlay/>
                </div>
            </div>
        </Link>
    )
}

export default PodcastCard;