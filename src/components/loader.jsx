import React from 'react';



export default function Loader(props){

    return(
       <div className="loader-main">
           <div className="loader-layer"></div>
           <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
           </div>
           <div className="loader-message">
                <p>{props.message}</p>
           </div>

       </div>
    )
}