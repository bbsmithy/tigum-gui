import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { findByTitle, findByTopicId } from '../clib/api';
import { CursorState } from "../types"
import ClickAwayListener from './ClickAwayListener';
import ResultTypeIcon from './ResultTypeIcon';

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
      height: 35,
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
    },
    resultsContainer:{
        overflow: "scroll",
        height: 200,
        border: "1px solid white",
        borderRadius: "0px 0px 4px 4px",
        backgroundColor: "#474646 !important",
    },
    result: {
        padding: 8,
        fontSize: 12,
        color: "white",
        borderBottom: "1px solid white",
        cursor: "pointer",
        "&:hover":{
            backgroundColor: "#246bf8"
        }
    },
    resTitle: {
        marginLeft: 10
    }
});

let searchTimeOut;

type Props = {
    selection: CursorState,
    cm: any,
    topic_id: number,
    onClickAway: Function
}

const ResourceDialog = ({ 
    selection: { absPos, cursorPos },
    cm, topic_id,
    onClickAway
}: Props) => {
    const [results, setResults] = useState(null)
    const [query, setQuery] = useState()
    const classes = useStyles()
    const queryRef = useRef()

    useEffect(() => {
        findByTopicId(topic_id).then((res)=>{
            setResults(res)
        }).catch(() => {
            return
        })
    }, [])


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
                }).catch((err) => {
                    console.log(err)
                    setResults(null)
                })
            }, 200)
        }
    }

    const selectResource = (resource) => {
        switch(resource.result_type){
            case 'link': {
                const linkMD = `[${resource.title}](${resource.misc})`
                cm.replaceRange(linkMD, cursorPos)
                break
            }
            case 'note':{
                const noteLinkMD = `[${resource.title}](https://tigum.io/topic/${resource.topic_id}/notes/${resource.resource_id})`
                cm.replaceRange(noteLinkMD, cursorPos)
                break
            }
            case 'snippet': {
                const snippetMD = `
> [Source: ${resource.misc}](${resource.misc})
>
> ${resource.title}
>
>`
                cm.replaceRange(snippetMD, cursorPos)
                break
            }
            case 'video': {
                const videoLinkMD = `[${resource.title}](https://tigum.io/topic/${resource.topic_id}/videos/${resource.resource_id})`
                cm.replaceRange(videoLinkMD, cursorPos)
                break
            }
        }
        onClickAway()
    }

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <div
                className={classes.cmdInput}
                style={{
                left: absPos.left,
                right: absPos.right,
                top: absPos.top,
                bottom: absPos.bottom
                }}
            >
                <input
                    type="text"
                    autoFocus
                    placeholder="Search for resource"
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
                                    <ResultTypeIcon type={resource.result_type} />
                                    <span className={classes.resTitle}>
                                        {resource.title}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </ClickAwayListener>
    )
}

export default ResourceDialog