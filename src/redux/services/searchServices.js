import { apiClient, handleResponse } from "./axios";

export const searchServices = {
	rapidsearch
}

function rapidsearch(search) {
	return apiClient.get(`/search?q=${search}&type=album,track,artist,playlist`)
		.then(handleResponse)
		.then(data => {
			return data
		})
}
