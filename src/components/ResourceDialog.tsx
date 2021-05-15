import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { findByTitle, findByTopicId, getArticleSnippets, getLinks, getNotes, getVideos } from '../clib/api';
import { useStateValue } from '../state/StateProvider';
import { CursorState } from "../types"
import ClickAwayListener from './ClickAwayListener';
import ResultTypeIcon from './ResultTypeIcon';


const LoadingResults = ({ classes }) => {
    return (
        <div>
            <div className={classes.loadingItem} style={{width: "70%"}}></div>
            <div className={classes.loadingItem} style={{width: "40%"}}></div>
            <div className={classes.loadingItem} style={{width: "50%"}}></div>
            <div className={classes.loadingItem} style={{width: "70%"}}></div>
        </div>
    )
}

const ResourceResult = ({ resource, type, classes, onClickResource }) => {
    const renderRow = () => {
        switch (type) {
            case "Videos": {
                return (
                    <div style={{ flexDirection: "row", display: "flex" }}>
                        <div style={{flex: 2}}>
                            <img src={resource.thumbnail_img} style={{borderRadius: 3 }} width="50px" />
                        </div>
                        <div style={{flex: 7, paddingTop: 5}}>
                            {resource.title}
                        </div>
                    </div>
                )
            }
            case "Notes": {
                return resource.title
            }
            case "Links": {
                return resource.title
            }
            case "Snippets": {
                return (
                    <div>
                        <div style={{ fontWeight: "bold", marginBottom: 10 }}>{resource.title}</div>
                        <div>{resource.content}</div>
                    </div>
                )
            }
        }
    }
    return (
        <div 
            className={classes.resourceResult}
            key={resource.id}
            onClick={() => onClickResource(type, resource)}
        >
            {renderRow()}
        </div>
    )
}


const TopicsTab = ({ 
    topics,
    classes,
    menuScreen,
    onSelectTopic,
    selectedTopic,
    setMenuScreen,
    setResourceType,
    resourceType,
    setResources,
    resources,
    loadingResources,
    setLoadingResources,
    onSelectResource
}) => {

    useEffect(() => {
        if (menuScreen === "RESOURCES") {
            getTopicResources(resourceType)
        } else {
            setResources([])
        }
    }, [menuScreen, resourceType])

    const goToTopics = () => {
        setMenuScreen("TOPICS")
    }

    const gotoResourceTypes = () => {
        setMenuScreen("RESOURCE_TYPES")
    }

    const gotoResources = (evt) => {
        setMenuScreen("RESOURCES")
        setResourceType(evt.target.dataset.resource)
    }

    const onClickResource = (type, resource) => {
        const lowercaseType = type.toLowerCase()
        const convertedResource = {
            title: resource.title,
            topic_id: resource.topic_id,
            resource_id: resource.id,
            result_type: lowercaseType.slice(0 , lowercaseType.length - 1),
            misc: ""
        }
        if (lowercaseType === "snippets") {
            convertedResource.misc = resource.origin
            convertedResource.title = resource.content
        } else if (lowercaseType === "links") {
            convertedResource.misc = resource.source
        }
        onSelectResource(convertedResource)
    }

    const getTopicResources = async (resourceType) => {
        setLoadingResources(true)
        switch (resourceType) {
            case "Videos": {
                const videos = await getVideos(selectedTopic.videos)
                setResources(videos)
                setLoadingResources(false)
                break;
            }
            case "Notes": {
                const notes = await getNotes(selectedTopic.notes)
                setResources(notes)
                setLoadingResources(false)
                break
            }
            case "Links": {
                const links = await getLinks(selectedTopic.links)
                setResources(links)
                setLoadingResources(false)
                break
            }
            case "Snippets": {
                const snippets = await getArticleSnippets(selectedTopic.article_snippets)
                setResources(snippets)
                setLoadingResources(false)
                break
            }
            default: {
                setLoadingResources(false)
            }
        }
    }

    return (
        <div>
            {menuScreen === "TOPICS" && (
                <div style={{maxHeight: 200, overflowY: "auto", marginTop: 3}}>
                    {topics.keys.map((topicKey) => {
                        return (
                            <div className={classes.menuItem} key={topicKey} onClick={() => {onSelectTopic(topics.data[topicKey])}}>
                                <div>{topics.data[topicKey].title}</div>
                                <div>
                                    <i className="fa fa-chevron-right" style={{ fontSize: 10 }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {menuScreen === "RESOURCE_TYPES" && (
                <>
                    <div style={{ padding: 8, color: "white",  borderBottom: "1px solid gray" }}>
                        <div>
                            <i className="fa fa-arrow-left" style={{ cursor: "pointer", fontSize: 14 }} onClick={goToTopics} />
                            <span style={{ fontSize: 14, marginLeft: 10 }}>{selectedTopic.title}</span>
                        </div>
                    </div>
                    <div className={classes.menuItem} onClick={gotoResources} data-resource="Notes">
                        <div>Notes</div>
                        <div><i className="fa fa-chevron-right" /></div>
                    </div>
                    <div className={classes.menuItem} onClick={gotoResources} data-resource="Videos">
                        <div>Videos</div>
                        <div><i className="fa fa-chevron-right" /></div>
                    </div>
                    <div className={classes.menuItem} onClick={gotoResources} data-resource="Snippets">
                        <div>Snippets</div>
                        <div><i className="fa fa-chevron-right" /></div>
                    </div>
                    <div className={classes.menuItem} onClick={gotoResources} data-resource="Links">
                        <div>Links</div>
                        <div><i className="fa fa-chevron-right" /></div>
                    </div>
                </>
            )}
            {menuScreen === "RESOURCES" && (
                <>
                    <div style={{ padding: 8, color: "white", borderBottom: "1px solid gray" }}>
                        <div>
                            <i className="fa fa-arrow-left" style={{ cursor: "pointer", fontSize: 14 }} onClick={gotoResourceTypes} />
                            <span style={{ fontSize: 14, marginLeft: 10 }}>{selectedTopic.title} / {resourceType}</span>
                        </div>
                    </div>
                    <div style={{maxHeight: 200, overflowY: "auto", marginTop: 3}}>
                        {loadingResources && (
                            <LoadingResults classes={classes} />
                        )}
                        {!loadingResources && resources && resources.map((resource) => {
                            return (
                                <ResourceResult 
                                    resource={resource}
                                    type={resourceType}
                                    classes={classes}
                                    onClickResource={onClickResource}
                                />
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}


const useStyles = createUseStyles({
    cmdInput: {
      position: "absolute",
      zIndex: 10,
      borderRadius: 5,
      width: 300,
    },
    loadingItem: {
        backgroundColor: "gray",
        height: 12,
        margin: "12px 8px",
        borderRadius: 5
    },
    searchResourceInput: {
      width: "100%",
      border: "1px solid white",
      '&:focus': {
        outline: 'none'
      },
      borderRadius: 4,
      fontSize: 13,
      padding: 5,
      height: 30
    },
    resultsContainer:{
        overflow: "scroll",
        height: 200,
        borderRadius: "0px 0px 4px 4px",
        backgroundColor: "#474646 !important",
    },
    tab: { flex: 1, textAlign: "center", padding: 8, fontSize: 14, color: "white", borderBottom: "1px solid gray", cursor: "pointer" },
    result: {
        padding: 8,
        fontSize: 12,
        color: "white",
        cursor: "pointer",
        margin: "3px 6px",
        borderRadius: 4,
        "&:hover":{
            backgroundColor: "#246bf8"
        }
    },
    menuItem: {
        color: "white",
        padding: 10,
        fontSize: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#246bf8"
        }
    },
    resourceResult: {
        margin: 5,
        padding: 8,
        borderRadius: 4,
        fontSize: 12,
        color: "white",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#246bf8"
        }
    },
    resTitle: {
        marginLeft: 10
    },
    activeTab: {
        borderBottom: "3px solid #246bf8"
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

    const [menuScreen, setMenuScreen] = useState("TOPICS")
    const [resourceType, setResourceType] = useState(null)
    const [selectedTopic, setSelectedTopic] = useState(null)
    const [resources, setResources] = useState([])
    const [loadingResources, setLoadingResources] = useState()
    const [results, setResults] = useState(null)
    const [query, setQuery] = useState()
    const [activeTab, setActiveTab] = useState(0)
    const classes = useStyles()
    const queryRef = useRef()
    // @ts-ignore
    const [state, dispatch] = useStateValue()

    useEffect(() => {
        findByTopicId(topic_id).then((res)=>{
            setResults(res)
        }).catch(() => {
            return
        })
    }, [])

    const onSelectTopic = (topic) => {
        setMenuScreen("RESOURCE_TYPES")
        setSelectedTopic(topic)
    }

    const onSelectSearchTab = () => {
        setActiveTab(0)
    }

    const onSelectTopicsTab = () => {
        setActiveTab(1)
        setMenuScreen("TOPICS")
    }

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

    const renderResourceSearchResult = (resource) => {
        return (
            <>
                {resource.result_type === "video" && (
                    <div style={{ flexDirection: "row", display: "flex" }}>
                        <div style={{flex: 2}}>
                            <img src={resource.misc2} style={{borderRadius: 3 }} width="50px" />
                        </div>
                        <div style={{flex: 7, paddingTop: 5}}>
                            {resource.title}
                        </div>
                    </div>
                )}
                {resource.result_type !== "video" && (
                    <>
                        <ResultTypeIcon type={resource.result_type} />
                        <span className={classes.resTitle}>
                            {resource.title}
                        </span>
                    </>
                )}
            </>
        )
    }

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <div
                className={classes.cmdInput}
                style={{
                    left: absPos.left,
                    right: absPos.right,
                    top: absPos.top - 40,
                    bottom: absPos.bottom
                }}
            >
                <div style={{ backgroundColor: "#474646", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", borderRadius: 4, fontFamily: "Arial", border: "1px solid white" }}>
                    <div style={{ flexDirection: "row", display: "flex" }}>
                        <div className={`${classes.tab} ${activeTab === 0 ? classes.activeTab: ""}`} onClick={onSelectSearchTab}>
                            <span>Search</span>
                        </div>
                        <div className={`${classes.tab}  ${activeTab === 1 ? classes.activeTab : ""}`} onClick={onSelectTopicsTab}>
                            <span>Topics</span>
                        </div>
                    </div>
                    {activeTab === 0 && (
                        <div>
                            <div style={{ padding: "5px 4px" }}>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search for resource"
                                    className={classes.searchResourceInput}
                                    onChange={onChangeSearch}
                                    value={query}
                                >
                                </input>
                            </div>
                            {results && (
                                <div className={classes.resultsContainer}>
                                    {results.map((resource) => {
                                        return (
                                            <div 
                                                key={resource.id} 
                                                className={classes.result}
                                                onClick={(evt) => {
                                                    evt.stopPropagation()
                                                    selectResource(resource)}
                                                }
                                            >
                                                {renderResourceSearchResult(resource)}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 1 && (
                        <TopicsTab 
                            topics={state.content.topics}
                            selectedTopic={selectedTopic}
                            classes={classes}
                            onSelectTopic={onSelectTopic}
                            setMenuScreen={setMenuScreen}
                            menuScreen={menuScreen}
                            setResourceType={setResourceType}
                            resourceType={resourceType}
                            resources={resources}
                            setResources={setResources}
                            loadingResources={loadingResources}
                            setLoadingResources={setLoadingResources}
                            onSelectResource={selectResource}
                        />
                    )}

                </div>
            </div>
        </ClickAwayListener>
    )
}

export default ResourceDialog