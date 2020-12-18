/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { musicServices } from "../../redux/services/musicServices"
import { libraryServices } from "../../redux/services/libraryServices"
import TrackList from "../Artist/Components/TrackList";
import ArtistLogo from "../Search/components/artistLogo";
import "../../scss/Profil.scss";
import { Button } from '@material-ui/core';
import AnimateHeight from 'react-animate-height';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
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


const Profil = props => {

    const [loaded, setLoaded] = useState(false);
    const [topTrack, setTopTrack] = useState();
    const [topArtists, setTopArtists] = useState();
    const [trackHeight, setTrackHeight] = useState(220);
    const [loveTracks, setLoveTracks] = useState();
    const [profilinfo, setProfilinfo] = useState();

    const getData = async () => {
        setLoaded(false);
        const topTrack = await musicServices.getTopTrackLimit("5");
        const topartist = await musicServices.getTopArtistsLimit("5");
        const profilInfo = await musicServices.getUserProfil();
        const savemusic = await libraryServices.getTrack("50");
        setTopTrack(topTrack.items);
        setTopArtists(topartist);
        setProfilinfo(profilInfo);
        let newsavemusic = []
        savemusic.items.forEach(element => {
                newsavemusic.push(element.track)
        });
        setLoveTracks(newsavemusic)
        setLoaded(true);

    };

    useEffect(() => {
        getData();
    }, []);

    if (loaded) {
        return (
            <div id="profil">
                <img className="roundimage" src={profilinfo.images[0] ? profilinfo.images[0].url : ""} />
                <h2 style={{ marginTop: "5px" }}>{profilinfo.display_name}</h2>
                <h4 style={{ marginBottom: "30px" }}>{profilinfo.email}</h4>
                <div className="boxtrack">
                    <h2 style={{ marginTop: "50px" }}>Vos 5 musiques préférées</h2>
                    <TrackList showCover={true} tracks={topTrack} setTracks={(tracks) => setTopTrack(tracks)} />
                </div>
                <div className="box">
                    <h2 style={{ marginTop: "50px" }}>Vos 5 artistes préférés</h2>
                    <ArtistLogo history={props.history} data={topArtists} />
                </div>
                <h2 style={{ marginTop: "50px" }} >Votre playlist coup de coeur</h2>
                <AnimateHeight
                    id='track'
                    duration={300}
                    height={trackHeight}
                >
                    <div className="boxtrack">
                        <TrackList showCover={true} tracks={loveTracks} setTracks={(tracks) => setLoveTracks(tracks)} />
                    </div>

                </AnimateHeight>
                <div className="divbutton">
                    <ColorButton onClick={() => setTrackHeight(trackHeight === 220 ? "auto" : 220)} variant="contained" color="primary">
                        Voir plus de musiques
                    </ColorButton>
                </div>
            </div>
        );
    }
    else {
        return (<div><Loader type="ThreeDots" color="#23CF5F" height={80} width={80} /></div>)
    }
}

export default Profil;
