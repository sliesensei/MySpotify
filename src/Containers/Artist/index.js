/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { artistServices } from "../../redux/services/artistServices";
import "../../scss/Artist.scss";
import TrackList from "./Components/TrackList";
import Album from "./Components/Album";


const Artist = props => {
	const [artist, setArtist] = useState(null);
	const [topTracks, setTopTracks] = useState(null);
	const [albums, setAlbums] = useState(null);
	const [singles, setSingles] = useState(null);
	const [appearsOn, setAppearsOn] = useState(null);

	useEffect(() => {
		if (!props.match.params.id) {
			props.history.push({pathname: "/home"});
		}
		artistServices.getArtist(props.match.params.id)
			.then(res => {
				setArtist(res);
			});
		artistServices.getArtistTopTracks(props.match.params.id)
			.then(res => {
				setTopTracks(res.tracks)
			});
		artistServices.getArtistAlbums(props.match.params.id, "&include_groups=album,single,appears_on")
			.then(res => {
				setAlbums(res.items.filter((element) => {
					return element["album_group"] === "album";
				}));
				setSingles(res.items.filter((element) => {
					return element["album_group"] === "single";
				}));
				setAppearsOn(res.items.filter((element) => {
					return element["album_group"] === "appears_on";
				}));
			})
	}, [props.history, props.match.params.id]);


	if (!artist || !topTracks || !albums || !singles || !appearsOn) {
		return (<div/>);
	}

	function renderGenres() {
		let genres = "";
		if (!artist.genres)
			return;
		artist.genres.forEach((element, index) => {
			if (index !== 0)
				genres += ", ";
			genres += element;
		});
		return <p>{genres}</p>;
	}

	function renderAlbums() {
		return albums.map((element, index) => {
			return (
				<Album key={index} album={element} />
			)
		})
	}

	return (
		<div id="artist">
			<div className="header">
				<img className="artistImage" src={artist.images[0] ? artist.images[0].url : "" }/>
				<div className="artistName">
					<h1>{artist.name}</h1>
					{renderGenres()}
				</div>
			</div>
			<h2>Populaires</h2>
			<TrackList showCover={true} tracks={topTracks} setTracks={tracks => setTopTracks(tracks)} max={5}/>
			<div className="albums">
				<h2>Albums</h2>
				{renderAlbums()}
			</div>
		</div>
	);
}

export default Artist;
