/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import TrackList from "../Artist/Components/TrackList";
import {playlistServices} from "../../redux/services/playlistServices";
import Loader from "react-loader-spinner";
import "../../scss/Playlist.scss";
import { IconButton } from '@material-ui/core';
import { playerActions } from "../../redux/actions/playerActions"
import { FaPlayCircle } from "react-icons/fa";
import { connect } from 'react-redux';


const Playlist = props => {
	const [tracks, setTracks] = useState()
	const [loaded, setLoaded] = useState(false);
	const [info, setInfo] = useState();

	const getData = async () => {
		setLoaded(false);
		const track = await playlistServices.getPlaylistTracks(props.match.params.id);
		const inf = await playlistServices.getPlaylistInfos(props.match.params.id);
		let newsavemusic = []
		track.items.forEach(element => {
			newsavemusic.push(element.track)
		});
		setInfo(inf)
		setTracks(newsavemusic);
		setLoaded(true);
	};

	useEffect(() => {
		if (!props.match.params.id) {
			props.history.push({pathname: "/home"});
		}
		getData();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.match.params.id]);


	const playmusic = (track) => {
		props.setMusic(track)
	}

	if (loaded) {
		if (!tracks) {
			return (	<div />	)
		}
		return (
			// eslint-disable-next-line react/jsx-no-comment-textnodes
			<div id="playlist">
				<img className="roundimage" src={info.images[0] ? info.images[0].url : ""} />
				<h2 style={{ marginTop: "5px" }}>{info.name}</h2>
				<h4 style={{ marginBottom: "30px" }}>{info.description}	<IconButton onClick={() => playmusic(info)} className="icon">
					<FaPlayCircle className="fa fa-user" size={48} color={"white"} />
				</IconButton></h4>
				<div className="boxtrack">
					<TrackList showCover={true} tracks={tracks} setTracks={(tracks) => setTracks(tracks)} />
				</div>


			</div>
		)
	}
	else {
		return (<div><Loader type="ThreeDots" color="#23CF5F" height={80} width={80} /></div>)
	}

}

function mapStateToProps(state) {
	const token = state.authentication.auth.access_token
	const musicPlayer = state.player
	return { accessToken: token, musicPlayer: musicPlayer }
}

const actionCreators = {
	setMusic: playerActions.setPlayerState
};

export default connect(mapStateToProps, actionCreators)(Playlist);