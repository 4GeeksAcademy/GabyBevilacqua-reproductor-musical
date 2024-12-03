import React from "react";


export const Player = ({ currentSong, playing }) => {


    return (

        <div>
            <div>Tracker</div>
            <div className="d-flex justify-content-center">
                <div className="mx-2">
                    <span>
                        <i className="fa-solid fa-shuffle"></i>
                    </span>
                </div>
                <div className="mx-2">
                    <span>
                        <i className="fa-solid fa-backward-step"></i>
                    </span>
                </div>
                <div className="mx-2">
                    <span>
                        <i className={`${playing? "fa-solid fa-pause" : "fa-solid fa-play"}`}/>
                    </span>
                </div>
                <div className="mx-2">
                    <span>
                        <i className="fa-solid fa-forward-step"></i>
                    </span>
                </div>
                <div className="mx-2">
                    <span>
                        <i className="fa-solid fa-rotate-left"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

