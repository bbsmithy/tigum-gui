
import React, { useRef, useState } from "react"
import { createUseStyles } from 'react-jss'
import { findByTitle } from "../../clib/api";
import { goto } from "../../util";

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
        '&:focus': {
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
        borderRadius: "0px 0px 10px 10px",
        overflow: "auto"
    },
    result: {
        width: "100%",
        padding: 15,
        borderBottom: "1px solid #1f1f1f",
        color: "white",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#246bf8"
        },
        display: "flex",
        flexDirection: "row"
    },
    resultTitle: {
        flex: 10
    },
    resultType: {
        flex: 1
    }
});

const ResultTypeIcon = ({ type }) => {
    switch(type){
        case 'topic':{
        return <span style={{ marginRight: 10, background: "#246bf8", padding: 5, borderRadius: 4 }}>Topic:</span>
        }
        case 'note': {
            return <i className="fas fa-pen-square"></i>
        }
        case 'snippet': {
            return <i className="fas fa-newspaper"></i>
        }
        case 'video': {
            return <i className="fab fa-youtube"></i>
        }
        case 'link': {
            return <i className="fas fa-link"></i>
        }
        default: {
            return null
        }
    }
}

const SearchResult = ({ result, reset }) => {

    const classes = useStyles()

    const onSelectResult = (url) => {
        if (result.result_type === 'topic') {
            goto(`/topic/${result.topic_id}/notes`)
        } else if (result.result_type === 'snippet') {
            goto(`/topic/${result.topic_id}/${result.result_type}s`)
        } else {
            goto(`/topic/${result.topic_id}/${result.result_type}s/${result.resource_id}`)
        }
        reset()
    }

    return (
        <div className={classes.result} onClick={onSelectResult}>
            <div className={classes.resultType}>
                <ResultTypeIcon type={result.result_type} />
            </div>
            <div className={classes.resultTitle}>
                {result.title}
            </div>
        </div> 
    )
}


const SearchModal = ({results, loading, reset }) => {
    const classes = useStyles();

    return (
        <div className={classes.searchModal}>
            {!loading && results && results.map((result) => <SearchResult result={result} reset={reset} />)}
            {loading && <div>loading</div>}
        </div>
    )
}

let searchTimeOut

export const SearchBar = () => {

    const classes = useStyles();
    const [query, setQuery] = useState()
    const [results, setResults] = useState()
    const [loading, setLoading] = useState(false)
    const queryRef = useRef()

    const _setQuery = (term) => {
        setQuery(term)
        queryRef.current = term
    }

    const handleFound = (data) => {
        setResults(data)
        setLoading(false)
    }

    const handleErr = (err) => {
        setLoading(false)
    }

    const onChangeQuery = (evt) => {
        _setQuery(evt.target.value)
        clearTimeout(searchTimeOut)
        setLoading(true)
        searchTimeOut = setTimeout(() => {
            findByTitle(queryRef.current).then(handleFound).catch(handleErr)
        }, 500)
    }

    const reset = () => {
        setResults(null)
        _setQuery('')
    }

    return (
        <div style={{ position: "relative" }}>
            <input type="text" placeholder="Search All" value={query} className={query ? classes.searchBarFocused : classes.searchBar} onChange={onChangeQuery}>
            </input>
            {query && (
                <SearchModal results={results} loading={loading} reset={reset} />
            )}
        </div>
    )
}