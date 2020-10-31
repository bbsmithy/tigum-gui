import React, { useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { findByTitle } from '../clib/api';
import { CursorState } from "../types"

const useStyles = createUseStyles({
    cmdInput: {
      position: "absolute",
      zIndex: 10,
      borderRadius: 5,
      width: 300,
    },
    searchResourceInput: {
      width: "100%",
      borderRadius: "4px 4px 0px 0px",
      border: "1px solid white",
      '&:focus': {
        outline: 'none'
      },
      fontSize: 12,
      padding: 5,
      height: 30
    },
    resultsContainer:{
        overflow: "scroll",
        padding: 5,
        height: 300,
        border: "1px solid white",
        borderRadius: "px 0px 4px 4px",
        backgroundColor: "#474646 !important",
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
        if (evt.target.value.trim() === "") {
            setResults(null)
        } else {
            searchTimeOut = setTimeout(() => {
                findByTitle(queryRef.current).then((res) => {
                    setResults(res)
                }).catch(() => {
                    setResults(null)
                })
            }, 400)
        }
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
              top: position.top
            }}
          >
            <input
                type="text"
                autoFocus
                placeholder="Search for resource/flagpole"
                className={classes.searchResourceInput}
                onChange={onChangeSearch}
                value={query}
                style={{ borderRadius: results ? "4px 4px 0px 0px" : 4 }}
            >
            </input>
            {results && (
                <div className={classes.resultsContainer}>
                    {results.map((resource) => {
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
            )}
        </div>
    )
}

export default ResourceDialog