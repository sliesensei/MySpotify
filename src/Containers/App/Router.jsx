import React from 'react';
import Loadable from "react-loadable";
import { Route, Switch } from "react-router-dom";
import LogIn from "../Login/index";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import Layout from './Layout';
import Loader from "react-loader-spinner";

const locationHelper = locationHelperBuilder({});

function Loading(props) {
    if (props.error) {
        return (
            <div>
                Error! <button onClick={props.retry}>Retry</button>
            </div>
        );
    } else if (props.pastDelay) {
        return <Loader type="ThreeDots" color="#23CF5F" height={80} width={80} />;
    } else {
        return null;
    }
}

const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || "/home",
    allowRedirectBack: false,
    authenticatedSelector: state => state.authentication.loggedIn !== true,
    wrapperDisplayName: "UserIsNotAuthenticated"
});

const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: "/",
    authenticatedSelector: state => state.authentication.loggedIn === true,
    wrapperDisplayName: "UserIsAuthenticated"
});


const Home = Loadable({
    loader: () => import("../Home/index"),
    loading: Loading
});

const Callback = Loadable({
    loader: () => import("../Callback/index"),
    loading: Loading
});

const Profil = Loadable({
    loader: () => import("../Profil/index"),
    loading: Loading
});

const Search = Loadable({
    loader: () => import("../Search/index.jsx"),
    loading: Loading
});

const Artist = Loadable({
    loader: () => import("../Artist/index"),
    loading: Loading
});

const Album = Loadable({
    loader: () => import("../SingleAlbum/index"),
    loading: Loading
});

const Playlist = Loadable({
    loader: () => import("../Playlist/index"),
    loading: Loading
});

const wrappedRoutes = () => (
    <>
        <Layout>
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profil} />
            <Route path="/search" component={Search} />
            <Route path="/callback" component={Callback} />
            <Route path="/artist/:id" component={Artist}/>
            <Route exact path="/artist" component={Artist}/>
            <Route path="/album/:id" component={Album}/>
            <Route exact path="/album" component={Album}/>
            <Route path="/playlist/:id" component={Playlist}/>
            <Route exact path="/playlist" component={Playlist}/>
        </Layout>
    </>
);

const Router = () => (
    <Switch>
        <Route exact path="/" component={userIsNotAuthenticated(LogIn)} />
        <Route path="/" component={userIsAuthenticated(wrappedRoutes)} />
    </Switch>
);

export default Router;