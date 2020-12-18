import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import "../../scss/Home.scss";
import {
	IconButton} from '@material-ui/core';
import RecentPlay from "./Components/recentPlay";
import GenericCard from "./Components/genericCard";
import { musicServices } from '../../redux/services/musicServices';
import { BiRefresh } from "react-icons/bi";
import Loader from "react-loader-spinner";

const Home = () => {
	const [recentlyPlayed, setRecentlyPlayed] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [recommendations, setRecommendations] = useState([]);
	
	const getRecommendation = async () => {
		setLoaded(false);
		const topTrack = await musicServices.getTopTrack();
		const topArtists = await musicServices.getTopArtists();
		let idtrack = ""
		let idartist = ""
		for (let i = 0; i < 2; i = i + 1) {
			idartist += topArtists.items[i].id
			idtrack += topTrack.items[i].id
			if (i !== 1) {
				idartist += ","
				idtrack += ","
			}
		}
		const recom = await musicServices.getRecommendations(idartist, idtrack);
		setRecommendations(recom)
		const recent = await musicServices.getRecentlyPlayed();
		setRecentlyPlayed(recent);
		setLoaded(true);
	
	};

	useEffect(() => {

		getRecommendation();
	}, []);

	if (loaded === true) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<div id="home">
					<h2>
						Sélectionné spécialement pour vous
					<IconButton onClick={() => getRecommendation()} className="icon">
						<BiRefresh className="fa fa-user" size={32} color={"white"} />
					</IconButton>
					</h2>
					<div className="recentlyPlayed">
						<GenericCard data={recommendations}/>
					</div>
					<h2>Écouté récemment :</h2>
					<div className="recentlyPlayed">
						<RecentPlay data={recentlyPlayed} />
					</div>
				</div>
			</div>
		)
	}
	else {
		return (
			<div id="home">
				<Loader type="ThreeDots" color="#23CF5F" height={80} width={80} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	const token = state.authentication.auth.access_token
	return { accessToken: token }
}

export default connect(mapStateToProps, {})(Home);

// 					<BottomPlayer recentlyPlayed={recentlyPlayed && !recentlyPlayed.error ? recentlyPlayed.items[0] : null} />