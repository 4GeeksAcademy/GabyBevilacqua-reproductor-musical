import React, { useEffect, useRef, useState } from "react";
import { Player } from "./Player";
import { element } from "prop-types";

//create your first component
const Home = () => {
	const [song, setSong] = useState([])
	const [currentSong, setCurrentSong] = useState()
	const [playing, setPlaying] = useState(false)

	const audioElement = useRef()

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try{
			const response = await fetch("https://playground.4geeks.com/sound/all")
			const data = await response.json()
			setSong(await data)
			console.log(data)
		} catch (error) {
			console.error("error---->", error)
		}
	}

	const handleSelectedSong = (element) => {
		setCurrentSong(element)
	}

	return (
		<section className="text-center container bg-dark text-white">
			<section>
				
				<ul>
					{song.songs?.map((element, id) => <li key={id} onClick={() => handleSelectedSong(song.songs[id])}>{element.name}</li>)}
				</ul>
			</section>
			<section>
				<audio 
				hidden
				src={currentSong && "https://playground.4geeks.com/sound/songs" + currentSong.url}
				ref={audioElement}
				autoPlay
				/>
				<Player
				currentSong={currentSong}
				playing={playing} 
				/>
			</section>
		</section>
	);
};

export default Home;
