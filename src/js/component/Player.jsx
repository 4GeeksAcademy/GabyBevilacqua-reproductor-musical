import React, { useRef } from "react";


export const Player = ({ currentSong, isPlaying, setIsPlaying, next, prev, shuffle, setShuffle, loop, setLoop, audioElem, random }) => {

    const timeStamp = useRef();

    const PlayPause = () => {
        if (!isPlaying && !currentSong) {
            random()
            setIsPlaying(!isPlaying);
        }else {
            setIsPlaying(!isPlaying);
        }      
    }

    const setTime = (e) => {
        const width = timeStamp.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const progress = (offset / width) * 100
        audioElem.current.currentTime = (progress / 100) * currentSong.length
    }

    return (
        <div className="container w-75 d-flex flex-column justify-content-center aling-items-center">
            <section>
                <h2 className="text-white">{currentSong && currentSong.name}</h2>
            </section>
            <section>
                <div className="navigation">
                    {currentSong ?
                        <div className="seeker" onClick={setTime} style={{ width: `${currentSong.progress}%` }}>
                        </div>
                        :
                        ""
                    }
                </div>
            </section>
            <div className="d-flex justify-content-center mt-3">
                <div className="mx-2">
                    <span onClick={() => setShuffle(!shuffle)}>
                        <i className={`fa-solid fa-shuffle ${shuffle ? "text-success" : "text-white"}`}></i>
                    </span>
                </div>
                <div className="mx-2">
                    <span onClick={prev}>
                        <i className="fa-solid fa-backward-step"></i>
                    </span>
                </div>
                <div className="mx-2">
                    <span onClick={PlayPause}>
                        <i className={`${isPlaying ? "fa-solid fa-pause fa-2xl" : "fa-solid fa-play fa-2xl"}`} />
                    </span>
                </div>
                <div className="mx-2">
                    <span onClick={next}>
                        <i className="fa-solid fa-forward-step"></i>
                    </span>
                </div>
                <div className="mx-2">
                    <span onClick={() => setLoop(!loop)}>
                        <i className={`fa-solid fa-rotate-left ${loop  ? "text-success" : "text-white"}`}></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

