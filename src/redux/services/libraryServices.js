import { apiClient, handleResponse } from "./axios";

export const libraryServices = {
	checkSavedTracks,
	saveTrack,
	removeTrack,
	getTrack
}

function checkSavedTracks(ids) {
	return apiClient.get(`/me/tracks/contains?ids=${ids}`)
		.then(handleResponse)
		.then(data => {
			return data
		})
}

function saveTrack(ids) {
	return apiClient.put(`/me/tracks?ids=${ids}`)
		.then(handleResponse)
		.then(data => {
			return data
		})
}

function removeTrack(ids) {
	return apiClient.delete(`/me/tracks?ids=${ids}`)
		.then(handleResponse)
		.then(data => {
			return data
		})
}

function getTrack(limit) {
	return apiClient.get(`/me/tracks?limit=${limit}`)
		.then(handleResponse)
		.then(data => {
			return data
		})
}