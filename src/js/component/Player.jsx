import React from "react";


export const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
    console.log(isPlaying)

    const PlayPause = () => {
        setIsPlaying(!isPlaying)

        console.log(isPlaying)
    }
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
                    <span onClick={PlayPause}>
                        <i className={`${isPlaying? "fa-solid fa-pause" : "fa-solid fa-play"}`}/>
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

