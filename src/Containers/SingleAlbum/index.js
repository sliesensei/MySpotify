import React, { useEffect, useState } from 'react';
import {musicServices} from "../../redux/services/musicServices";
import Album from "../Artist/Components/Album";


const SingleAlbum = props => {
	const [album, setAlbum] = useState(null)

	useEffect(() => {
		if (!props.match.params.id) {
			props.history.push({pathname: "/home"});
		}

		musicServices.getAlbum(props.match.params.id)
			.then(res => {
				setAlbum(res);
			})

	}, [props.history, props.match.params.id]);

	if (!album) {
		return (<div/>);
	}

	return (
		<div id="album">
			<Album limit={50} album={album}/>
		</div>
	);
}

export default SingleAlbum;
