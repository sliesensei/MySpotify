import React, { useState } from 'react';
import '../../scss/Callback.scss';
import {Redirect} from "react-router-dom";
import { auth } from '../../helpers/authHeader';


const Callback = props => {

	const [redirect] = useState(auth.isAuth());

	if (redirect === false) {
		return (
			<div id="callback" className="callback">
				<div className="main-container">
					<h1>Chargement...</h1>
				</div>
			</div>
		);
	} else {
		return (
			<Redirect to="/" />
		);
	}
}

export default (Callback);
