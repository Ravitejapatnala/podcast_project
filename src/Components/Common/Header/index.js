import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";

const Header=()=>{
    return(
        <div className="navbar">
            <div className="gradient-div"></div>
            <div className="links">
                <NavLink to="/">Signup</NavLink>
                <NavLink to="/podcasts">Podcast</NavLink>
                <NavLink to="/create-a-podcast">Start a Podcast</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </div>
        </div>
    )
}

export default Header;