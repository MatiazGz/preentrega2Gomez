import React from "react";
import "./EstateView.css"

function EstateView({estate}) {
    return (
        <div className="EstateView">
            <h1>{estate.name}</h1>
            <h2>{estate.description}</h2>
            <img src ={estate.image} alt=
            {estate.name + "image"}/>
        </div>
    )
}

export default EstateView