import { apiClient, handleResponse } from './axios';
import { libraryServices } from "./libraryServices";

export const artistServices = {
	getArtist,
	getArtistTopTracks,
	getArtistAlbums
};

function getArtist(id) {
	return apiClient.get(`/artists/${id}`)
		.then(handleResponse)
		.then(data => {
			return data;
		});
}

function getArtistTopTracks(id) {
	return apiClient.get(`/artists/${id}/top-tracks?country=from_token`)
		.then(handleResponse)
		.then(data => {
			let ids = "";
			data.tracks.forEach((element, index) => {
				if (index !== 0)
					ids += ",";
				ids += element.id;
			});
			return libraryServices.checkSavedTracks(ids)
				.then(resSavedTracks => {
					data.tracks.forEach((element, index) => {
						data.tracks[index]["saved"] = resSavedTracks[index]
					});
					return data;
				})
		})
}

function getArtistAlbums(id, params = '') {
	return apiClient.get(`/artists/${id}/albums?country=from_token${params}`)
		.then(handleResponse)
		.then(data => {
			return data;
		})
}