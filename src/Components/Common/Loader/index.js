import React from "react";
import "./styles.css";

const Loader=()=>{
    return (
        <div className="wrapper">
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader;