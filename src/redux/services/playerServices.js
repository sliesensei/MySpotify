import { apiClient, handleResponse } from './axios';

export const playerServices = {
  playPlayback,
  pausePlayback,
  nextPlayback,
  prevPlayback,
  playTrackWithId,
  playAlbumWithId,
  setVolume,
  addToQueue
};

function playPlayback(device) {

  return apiClient.put(`/me/player/play?device_id=${device}`)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function pausePlayback(device) {

  return apiClient.put(`/me/player/pause?device_id=${device}`)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function nextPlayback(device) {

  return apiClient.post(`/me/player/next?device_id=${device}`)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function prevPlayback(device) {

  return apiClient.post(`/me/player/previous?device_id=${device}`)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function setVolume(device, volume) {

  return apiClient.put(`/me/player/volume?device_id=${device}&&volume_percent=${volume}`)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function playTrackWithId(device, trackid) {

  const body = JSON.stringify({
    "uris": [trackid],
  })
  return apiClient.put(`/me/player/play?device_id=${device}`, body)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function playAlbumWithId(device, albumid) {

  const body = JSON.stringify({
    "context_uri": albumid,
  })
  return apiClient.put(`/me/player/play?device_id=${device}`, body)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function addToQueue(id) {
    return apiClient.post(`/me/player/queue?uri=${id}`)
        .then(handleResponse)
        .then(data => {
            return data;
        })
}