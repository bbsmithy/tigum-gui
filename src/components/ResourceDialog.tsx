import React, { useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { findByTitle } from '../clib/api';
import { CursorState } from "../types"

const useStyles = createUseStyles({
    cmdInput: {
      position: "absolute",
      backgroundColor: "#474646 !important",
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      border: "1px solid white",
      zIndex: 10,
      borderRadius: 5,
      width: 250,
      height: 300,
      padding: 5,
      overflow: "hidden"
    },
    searchResourceInput: {
      width: "100%",
      borderRadius: 5,
      border: "1px solid white",
      '&:focus': {
        outline: 'none'
      },
      fontSize: 12,
      padding: 5
    },
    resultsContainer:{
        overflow: "scroll",
        height: "100%"
    },
    result: {
        padding: 10,
        fontSize: 12,
        color: "white",
        borderBottom: "1px solid white",
        cursor: "pointer"
    }
});

let searchTimeOut;

const ResourceDialog = ({ position, cursorLine } : CursorState) => {
    const [results, setResults] = useState(null)
    const [query, setQuery] = useState()
    const classes = useStyles()
    const queryRef = useRef()

    const _setQuery = (term) => {
        setQuery(term)
        queryRef.current = term
    }

    
    const onChangeSearch = (evt) => {
        clearTimeout(searchTimeOut)
        _setQuery(evt.target.value)
        searchTimeOut = setTimeout(() => {
            findByTitle(queryRef.current).then((res) => {
                setResults(res)
            }).catch(() => {

            })
        }, 400)
    }

    const selectResource = (resource) => {
        alert(resource.title)
    }

    return (
        <div
            className={classes.cmdInput}
            style={{
              left: position.left,
              right: position.right,
              top: position.top + 25,
              bottom: position.bottom
            }}
          >
            <input
                type="text"
                autoFocus
                placeholder="Search for resource/flagpole"
                className={classes.searchResourceInput}
                onChange={onChangeSearch}
                value={query}
            >
            </input>
            <div className={classes.resultsContainer}>
                {results && results.map((resource) => {
                    return (
                        <div className={classes.result} onClick={(evt) => {
                            evt.stopPropagation()
                            selectResource(resource)}
                        }>
                            {resource.title}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ResourceDialog