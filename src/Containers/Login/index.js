import React, { useEffect, useState } from 'react';
import '../../scss/Login.scss';
import config from "../../config";
import queryString from 'query-string';
import { connect } from 'react-redux';
import {
	Button
} from '@material-ui/core';
import { userActions } from '../../redux/actions/userActions';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';


const loginUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=${encodeURIComponent(config.scopes)}`
const cookies = new Cookies();

const Login = props => {

	const [redirect, setredirect] = useState(false);
	useEffect(() => {
		if (redirect === false) {
			const decodedUrl = decodeURIComponent(window.location.href);
			let lastpart = decodedUrl.split("/").pop();
			if (lastpart !== "" && lastpart.includes("code=")) {
				const params = queryString.parse(lastpart)
				const code = params["callback?code"];
				props.login(code);
				setredirect(true)
			}
		}
		if (cookies.get('JWT') !== undefined) {
			setredirect(true)
		}
	}, [props, redirect]);


	if (redirect) {
		return <Redirect push to="/" />;
	}
	else {
		return (
			<div id="login" className="Index">
				<div className="login-container">
					<h1 className="title">My Spotify</h1>
					<p>Veuillez vous connecter pour acceder à l'application.</p>
					<Button
						href={loginUrl}
						variant="contained"
						className="connect"
						color="primary">
						SE CONNECTER
      				</Button>
				</div>
			</div>
		);
	}
}

function mapState(state) {
	return({})
}

const actionCreators = {
	login: userActions.login,
	logout: userActions.logout
};

const connectedLogin = connect(mapState, actionCreators)(Login);
export default connectedLogin;
