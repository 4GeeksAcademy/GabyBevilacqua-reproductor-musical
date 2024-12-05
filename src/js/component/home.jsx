import React, { useEffect, useRef, useState } from "react";
import { Player } from "./Player";

//create your first component
const Home = () => {
	const [song, setSong] = useState([]);
	const [currentSong, setCurrentSong] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [loop, setLoop] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const audioElem = useRef();

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		isPlaying ? audioElem.current.play() : audioElem.current.pause();
	}, [isPlaying])

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
			song.songs.length === getIndex() + 1
				?
				setCurrentSong(song.songs[0])
				:
				setCurrentSong(song.songs[getIndex() + 1])
		setIsPlaying(true)
	}

	const prev = () => {
		0 === getIndex() ?
			setCurrentSong(song.songs[song.songs.length - 1])
			:
			setCurrentSong(song.songs[getIndex() - 1])
		setIsPlaying(true)
	}

	const random = () => {
		setCurrentSong(song.songs[Math.floor(Math.random() * song.songs.length)])
		setIsPlaying(true)
	}

	const onPlaying = () => {
		const duration = audioElem.current.duration;
		const current = audioElem.current.currentTime;
		setCurrentSong({
			...currentSong,
			progress: (current / duration) * 100,
			length: duration,
			current: current
		});
	}

	return (
		<div className="text-center container bg-dark text-white mt-3 pt-3">
			<h1>Reproductor de música de canciones de juegos:</h1>
			<section className="text-center container bg-dark text-white d-flex aling-items-center">				
				<section className="d-flex container col-3 mt-3">
					<div className="playlist overFlow-y-auto">
						<ul className="list-group">
							{song.songs?.map((elem, id) => <li className={`text-white list-group-item bg-dark ${currentSong && elem.name === currentSong.name ? "active" : ""}`} key={id} onClick={() => handleSelectedSong(song.songs[id])}>{elem.name}</li>)}
						</ul>
					</div>
				</section>

				<section className="container d-flex col-9">
					<audio
						hidden
						src={currentSong && "https://playground.4geeks.com" + currentSong.url}
						ref={audioElem}
						autoPlay
						loop={loop}
						onPlaying={onPlaying}
						onEnded={next}
						onTimeUpdate={onPlaying}
					/>
					<Player
						currentSong={currentSong}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						audioElem={audioElem}
						setSong={setSong}
						next={next}
						prev={prev}
						loop={loop}
						setLoop={setLoop}
						shuffle={shuffle}
						setShuffle={setShuffle}
						random={random}
					/>
				</section>
			</section>
		</div>
	);
};

export default Home;
