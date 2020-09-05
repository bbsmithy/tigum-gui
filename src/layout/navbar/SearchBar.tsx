
import React, { useState } from "react"
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    searchBar: {
        padding: 3,
        width: "100%",
        color: "white",
        boxShadow: '2px 2px 1px 0px rgba(0, 0, 0, 0.75)',
        backgroundColor: "#333",
        border: '1px solid gray',
        borderRadius: 5,
        marginTop: 10,
        fontSize: 14,
        '&:focus':{
            outline: "none",
            border: '1px solid white',   
        }
    },
    searchBarFocused: {
        padding: 3,
        width: "100%",
        color: "white",
        boxShadow: '2px 2px 1px 0px rgba(0, 0, 0, 0.75)',
        backgroundColor: "#333",
        border: '1px solid white',
        borderRadius: "5px 5px 0px 0px",
        marginTop: 10,
        fontSize: 14,
        '&:focus':{
            outline: "none"
        }
    },
    searchModal:{
        position: "absolute",
        width: "100%",
        height: 300,
        zIndex: 500,
        margin: "auto",
        backgroundColor: "#333",
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
        borderBottom: '1px solid white',
        borderRadius: "0px 0px 10px 10px"
    }
});

const SearchModal = () => {
    const classes = useStyles();

    return (
        <div className={classes.searchModal}>
            Test
        </div>
    )
}

export const SearchBar = () => {

    const [query, setQuery] = useState()
    const classes = useStyles();

    const onChangeQuery = (evt) => {
        setQuery(evt.target.value)
    }

    return (
        <div style={{ position: "relative" }}>
            <input type="text" placeholder="Search All" className={query ? classes.searchBarFocused : classes.searchBar} onChange={onChangeQuery}>
            </input>
            {query && <SearchModal />}
        </div>
    )
}