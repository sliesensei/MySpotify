import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import SearchBar from "material-ui-search-bar";
import { Button } from '@material-ui/core';
import { searchServices } from "../../redux/services/searchServices";
import TrackList from "../Artist/Components/TrackList";
import GenericCard from "../Home/Components/genericCard";
import ArtistLogo from './components/artistLogo';
import "../../scss/Search.scss";
import AnimateHeight from 'react-animate-height';
import { withStyles} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { searchActions } from "../../redux/actions/searchActions";
import Loader from "react-loader-spinner";

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

const Search = props => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState();
    const [loaded, setLoaded] = useState(false);
    const [tracks, setTracks] = useState();
    const [playlists, setPlaylists] = useState();
    const [albums, setAlbums] = useState();
    const [artistHeight, setArtistHeight] = useState(380);
    const [trackHeight, setTrackHeight] = useState(220);
    const [albumHeight, setAlbumHeight] = useState(290);
    const [playlistHeight, setPlaylistHeight] = useState(290);
    const [artists, setArtists] = useState();


    useEffect(() => {
        setLoaded(false);
        const decodedUrl = decodeURIComponent(window.location.search);
        const params = queryString.parse(decodedUrl)
        const code = params["input"];
        if (code !== undefined) {
            setSearchValue(code);
            props.setLastSearch(code);
            searchServices.rapidsearch(code)
                .then(res => {
                    setSearchResult(res);
                    props.setLastResultSearch(res);
                    setArtists(res.artists)
                    setPlaylists(res.playlists)
                    setAlbums(res.albums)
                    setTracks(res.tracks.items)
                    setLoaded(true)
                })
        } else if (props.search.lastresult) {
            setSearchValue(props.search.lastsearch);
            setSearchResult(props.search.lastresult);
            setArtists(props.search.lastresult.artists)
            setPlaylists(props.search.lastresult.playlists)
            setAlbums(props.search.lastresult.albums)
            setTracks(props.search.lastresult.tracks.items)
            setLoaded(true)
        } else if (props.search.lastsearch) {
            setSearchValue(props.search.lastsearch);
            searchServices.rapidsearch(props.search.lastsearch)
                .then(res => {
                    setSearchResult(res);
                    props.setLastResultSearch(res);
                    setArtists(res.artists)
                    setPlaylists(res.playlists)
                    setAlbums(res.albums)
                    setTracks(res.tracks.items)
                    setLoaded(true)
                })
        } else {
            setLoaded(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.search]);

    const search = () => {
        if (searchValue) {
            props.setLastSearch(searchValue);
            setLoaded(false)
            searchServices.rapidsearch(searchValue)
                .then(res => {
                    setSearchResult(res);
                    props.setLastResultSearch(res);
                    setArtists(res.artists)
                    setPlaylists(res.playlists)
                    setAlbums(res.albums)
                    setTracks(res.tracks.items)
                    setLoaded(true)
                })
        }
    }

    if (loaded) {
        if (searchResult) {
            return (

                <div id="search">
                    <SearchBar
                        value={searchValue}
                        onChange={(newValue) => setSearchValue(newValue)}
                        placeholder={"Rechercher"}
                        onRequestSearch={() => {search()}}
                    />
                    <h1 style={{ margin: "30px" }}>Votre recherche: <i>{searchValue}</i></h1>
                    <h2 style={{ marginTop: "50px" }}>Artistes</h2>

                    <AnimateHeight
                        id='artist'
                        duration={300}
                        height={artistHeight} // see props documentation below
                    >
                        <div className="box">
                            <ArtistLogo history={props.history} data={artists} />
                        </div>
                    </AnimateHeight>
                    <div className="divbutton">
                        <ColorButton onClick={() => setArtistHeight(artistHeight === 380 ? "auto" : 380)} variant="contained" color="primary">
                            Voir plus d'artistes
                    </ColorButton>
                    </div>

                    <h2 style={{ marginTop: "50px" }}>Albums</h2>
                    <AnimateHeight
                        id='artist'
                        duration={300}
                        height={albumHeight}
                    >
                        <div className="box">
                            <GenericCard history={props.history} data={albums} />
                        </div>

                    </AnimateHeight>
                    <div className="divbutton">
                        <ColorButton onClick={() => setAlbumHeight(albumHeight === 290 ? "auto" : 290)} variant="contained" color="primary">
                            Voir plus d'albums
                    </ColorButton>
                    </div>

                    <h2 style={{ marginTop: "50px" }} >Musiques</h2>
                    <AnimateHeight
                        id='track'
                        duration={300}
                        height={trackHeight}
                    >
                        <div className="box">
                            <TrackList showCover={true} tracks={tracks} setTracks={(tracks) => setTracks(tracks)} />
                        </div>

                    </AnimateHeight>
                    <div className="divbutton">
                        <ColorButton onClick={() => setTrackHeight(trackHeight === 220 ? "auto" : 220)} variant="contained" color="primary">
                            Voir plus de musiques
                    </ColorButton>
                    </div>
                    <h2 style={{marginTop: "50px"}}>Playlists</h2>
                    <AnimateHeight
                        id='playlists'
                        duration={300}
                        height={playlistHeight}
                    >
                        <div className="box">
                            <GenericCard history={props.history} data={playlists} />
                        </div>

                    </AnimateHeight>
                    <div className="divbutton">
                        <ColorButton onClick={() => setPlaylistHeight(playlistHeight === 290 ? "auto" : 290)} variant="contained" color="primary">
                            Voir plus de playlists
                    </ColorButton>
                    </div>
                </div>
            );
        }
        else {
            return (
            <div id="search">
                <SearchBar
                    value={searchValue}
                    onChange={(newValue) => setSearchValue(newValue)}
                    placeholder={"Rechercher"}
                        onRequestSearch={() => { search()}}
                />
                </div>)
        }
    }
    else {
        return (<div><Loader type="ThreeDots" color="#23CF5F" height={80} width={80} /></div>)
    }
}

function mapState(state) {
    return ({search : state.search})
}

const actionCreators = {
    setLastResultSearch: searchActions.setLastResultSearch,
    setLastSearch: searchActions.setLastSearch,
}

const connectedSearch = connect(mapState, actionCreators)(Search);
export default connectedSearch;
