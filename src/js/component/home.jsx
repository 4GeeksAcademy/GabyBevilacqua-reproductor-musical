import React, { useEffect, useRef, useState } from "react";
import { Player } from "./Player";
import { element } from "prop-types";

//create your first component
const Home = () => {
	const [song, setSong] = useState([]);
	const [currentSong, setCurrentSong] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [loop, setLoop] = useState(false);
	const [shuffle, setShuffle] = useState(false);

	const audioElem = useRef()

	useEffect(() => {
		getData()
	}, [])

	useEffect(()=>{
		isPlaying? audioElem.current.play() : audioElem.current.pause();
	},[isPlaying])

	const getData = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/sound/all")
			const data = await response.json()
			setSong(await data)
			console.log(data)
		} catch (error) {
			console.error("error---->", error)
		}
	}

	const handleSelectedSong = (elem) => {
		setCurrentSong(elem)
		setIsPlaying(true)
	}

	const getIndex = () => {
		const aux = song.songs.filter((elem) => elem.id === currentSong.id)
		return song.songs.indexOf(aux[0])
	}

	const next = () => {
		shuffle ?
			random()
			:
			setCurrentSong(song.songs[getIndex() + 1])
		setIsPlaying(true)
	}

	const prev = () => {
		setCurrentSong(song.songs[getIndex() - 1])
		setIsPlaying(true)
	}

	const random = () => {
		setCurrentSong(song.songs[Math.floor(Math.random() * song.songs.length)])
		setIsPlaying(true)
	}

	return (
		<section className="text-center container bg-dark text-white">
			<section>

				<ul>
					{song.songs?.map((elem, id) => <li key={id} onClick={() => handleSelectedSong(song.songs[id])}>{elem.name}</li>)}
				</ul>
			</section>
			<section>
				<audio
					hidden
					src={currentSong && "https://playground.4geeks.com/sound/songs" + currentSong.url}
					ref={audioElem}
					autoPlay
				/>
				<Player
					currentSong={currentSong}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					audioElem={audioElem}
					setSong={setSong()}
					next={next}
					prev={prev}
					loop={loop}
					setLoop={setLoop}
					shuffle={shuffle}
					setShuffle={setShuffle}
				/>
			</section>
		</section>
	);
};

export default Home;
