import { apiClient, handleResponse } from './axios';
import {libraryServices} from "./libraryServices";

export const musicServices = {
    getRecentlyPlayed,
    getCurrentPlayback,
    getAvailableDevices,
    getRecommendations,
    getRecommendationsGenre,
    getNewRelease,
    getTopTrack,
    getTopArtists,
    getTopTrackLimit,
    getTopArtistsLimit,
    getAlbumTracks,
    getAlbum,
    getUserProfil
};

function getRecentlyPlayed() {
    return apiClient.get("/me/player/recently-played")
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getRecommendations(idartist, idtrack) {

    return apiClient.get(`/recommendations?seed_artists=${idartist}&seed_tracks=${idtrack}&market=FR&max_popularity=55&min_popularity=15&limit=30`)
        .then(handleResponse)
        .then(data => {
            return data
        })
}
function getRecommendationsGenre() {
    return apiClient.get("/recommendations/available-genre-seeds")
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getNewRelease() {
    return apiClient.get("/browse/new-releases")
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getCurrentPlayback() {
    return apiClient.get("/me/player")
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getAvailableDevices() {
    return apiClient.get("/me/player/devices")
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getTopTrack() {
    return apiClient.get("/me/top/tracks?limit=50&time_range=short_term")
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getTopArtists() {
    return apiClient.get("/me/top/artists?limit=50&time_range=short_term")
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getTopTrackLimit(limit) {
    return apiClient.get(`/me/top/tracks?limit=${limit}&time_range=short_term`)
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getTopArtistsLimit(limit) {
    return apiClient.get(`/me/top/artists?limit=${limit}&time_range=short_term`)
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getUserProfil() {
    return apiClient.get("/me")
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getAlbumTracks(id) {
    return apiClient.get(`/albums/${id}/tracks`)
        .then(handleResponse)
        .then(data => {
			let ids = "";
			data.items.forEach((element, index) => {
				if (index !== 0)
					ids += ",";
				ids += element.id;
			});
			return libraryServices.checkSavedTracks(ids)
				.then(resSavedTracks => {
					data.items.forEach((element, index) => {
						data.items[index]["saved"] = resSavedTracks[index]
					});
					return data;
				})
        })
}

function getAlbum(id) {
    return apiClient.get(`/albums/${id}`)
        .then(handleResponse)
        .then(data => {
            return data;
        })
}


