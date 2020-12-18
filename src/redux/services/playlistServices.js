import { apiClient, handleResponse } from "./axios";

export const playlistServices = {
	getCurrentUserPlaylists,
	getPlaylistTracks,
	getPlaylistInfos
}

function getCurrentUserPlaylists() {
	return apiClient.get(`/me/playlists`)
		.then(handleResponse)
		.then(res => {
			return res;
		})
}

function getPlaylistTracks(id) {
	return apiClient.get(`/playlists/${id}/tracks`)
		.then(handleResponse)
		.then(res => {
			return res;
		})
}

function getPlaylistInfos(id) {
	return apiClient.get(`/playlists/${id}`)
		.then(handleResponse)
		.then(res => {
			return res;
		})
}