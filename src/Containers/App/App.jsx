import React, { Fragment, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import ReduxToastr from 'react-redux-toastr'
import store from '../../helpers/store';
import Scroll from './Scroll';
import * as serviceWorker from '../../serviceWorker';
import '../../scss/index.scss';
import Router from './Router';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import Loader from "react-loader-spinner";

serviceWorker.unregister();

const App = () => {
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.addEventListener('load', () => {
            setLoading(false);
            setLoaded(true);
        });
    }, []);

    return (

        <Provider store={store}>
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-left"
                getState={(state) => state.toastr}
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick
            />
            <BrowserRouter>
                <Scroll>
                    <Fragment>
                        {!loaded
                            && (
                                <div className={`load${loading ? '' : ' loaded'}`}>
                                    <div className="load__icon-wrap">
                                        <Loader type="ThreeDots" color="#23CF5F" height={80} width={80} />
                                    </div>
                                </div>
                            )
                        }
                        <div>
                            <Router />
                        </div>
                    </Fragment>
                </Scroll>
            </BrowserRouter>
        </Provider>
    )
}

export default hot(module)(App);
