import React, {useEffect, useState} from 'react';
import SearchBar from "material-ui-search-bar";
import { withRouter } from "react-router-dom";

const Search = (props) => {
    const [searchValue, setSearchValue] = useState();

    useEffect(() => {
    
    }, []);

    const searchQuery = () => {
        const encoded = encodeURIComponent(searchValue.replace(" ", "+"));
        props.history.push({
            pathname: '/search',
            search: `?input=${encoded}`,
        })
    }
        return (
            <SearchBar
                value={searchValue}
                onChange={(newValue) => setSearchValue(newValue)}
                placeholder= {"Recherche rapide"}
                onRequestSearch={() => searchQuery()}
            />
        )
}

export default withRouter(Search);
