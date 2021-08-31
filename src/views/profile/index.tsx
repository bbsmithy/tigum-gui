import React, { useEffect, useRef, useState } from "react"
import { createUseStyles } from "react-jss"
import { getPublicLinks, getPublicNotes, getPublicSnippets, getPublicTopics, getPublicVideos } from "../../clib/api"
import { getDate } from "../../util"
import UserNotFound from "./components/UserNotFound"
import LoadingSnippet from "../../components/LoadingSnippet"
import marked from "marked"
import { LoadingVideo } from "../../components/LoadingVideo"
import { LinkCard, LoadingCard, VideoCard } from "../../components"


const useStyles = createUseStyles({
    menuIcon: {
        '@media (max-width: 1000px)': {
            marginTop: 20
        },
        '@media (min-width: 1000px)': {
            display: "none"
        },
        
    },
    contentSection: {
        '@media (max-width: 1000px)':{
            padding: "30px 20px",
            width: "100%"
        },
        marginTop: 10,
        flex: 8,
        borderRadius: 3,
        padding: 10,
        "a": {
            color: "red"
        }
        // backgroundColor: "#333"
    },
    mainContainer: {
        margin: "auto",
        '@media (max-width: 1000px)':{
            width: "100%",
            padding: 10
        },
        '@media (min-width: 1000px)':{
            width: "85%"
        },
        '@media (min-width: 1200px)':{
            width: "80%",
        },
        height:"100%"
    },
    topicSidebar: {
        flex: 2,
        marginTop: 10,
        overflow: "hidden",
        '@media (max-width: 1000px)':{
            display: "none"
        },
    },
    searchInput: {
        '@media (max-width: 420px)':{
            display: "none"
        },
        color: "white",
        width: "100%",
        border: "1px solid gray",
        padding: 3,
        fontSize: 14,
        boxShadow: "2px 2px 1px 0px rgb(0 0 0 / 75%)",
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: "#333"
    },
    mobileSearchInput: {
        color: "white",
        width: "100%",
        border: "1px solid gray",
        height: 30,
        fontSize: 14,
        boxShadow: "2px 2px 1px 0px rgb(0 0 0 / 75%)",
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: "white"
    },
    loadingProfile: {
        fontSize: 25,
        width: "40%",
        color: "white",
        margin: "auto",
        background: "#333",
        textAlign: "center",
        marginTop: "10%",
        height: 200,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20
    },
    selectedTopicNavBarItem: {
        marginLeft: 4,
        marginRight: 4,
        padding: "5px 10px",
        height: 33,
        fontSize: "bold",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer"
    },
    shadow: {
        borderBottom: "3px solid rgb(36, 107, 248)"
    },
    selectedTopicHeader: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between",
    },
    selectTopicTitle: {
        margin: 4, 
        padding: 0
    }
})

const TopicList = ({ topics, onSelectTopic, selectedTopicId }) => {
    return (
        <div style={{
            backgroundColor: "#333",
            border: 2,
            marginRight: "1%",
            borderRadius: 3,
            overflow: "hidden"
        }}>
        {    
            topics.map((topic) => {
                return (
                    <div onClick={() => {
                        onSelectTopic(topic)
                    }} style={{
                        borderRight: topic.id === selectedTopicId ? "5px solid #246bf8" : "none",
                        borderBottom: "1px solid gray", 
                        cursor: "pointer",
                        padding: 10
                    }}>
                        {topic.title}
                    </div>
                )
            })
        }
        </div>
    )
}

const NotesList = ({ notes }) => {
    if (notes.length > 0) {
        return notes.map((note) => {
            const renderDate = () => {
                const dateText = new Date(note.date_updated);
                return getDate(dateText);
            };
    
            return (
                <div className='card w-33 note-card pointer'>
                    <div className='mw9 center'>
                        <div className='cf ph2-ns'>
                            <div className='fl ph2 w-90 pv3' style={{alignItems: "center", justifyContent: "center"}}>
                                <h4 style={{marginTop: 4, marginBottom: 0}}>{note.title}</h4>
                                <div style={{fontSize: 13, marginTop: 10, fontStyle: "italic", color: "gray"}}>{renderDate()}</div>
                            </div>
                            <div className='fl w-10 pv4'>
                                <div>
                                    <i className='fas fa-chevron-right'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    } else {
        return (
            <div className='no-resources-message'>
                <i className='fas fa-pen-square' /> <span>No notes yet</span>
            </div>
        )
    }
}

const SnippetList = ({ snippets }) => {
    if (snippets.length) {
        return snippets.map((snippet, idx) => {
            return (
                <>
                    <div className="note-card" style={{
                        padding: 10, 
                        marginTop: 10, 
                        borderRadius: 5
                    }}>
                        <h4 style={{ marginTop: 5, marginBottom: 5 }}>{snippet.title}</h4>
                        <div dangerouslySetInnerHTML={{ __html: marked(snippet.content) }} />
                        {snippet.origin != "TIGUM" && (
                            <div style={{marginTop: 10}}>
                                Source: <a href={`${snippet.origin}`} target="blank" style={{color: "rgb(36, 107, 248)"}}>{snippet.origin}</a>
                            </div>
                        )}
                    </div>
                </>
            )
        })
    } else {
        return (
            <div className='no-resources-message'>
                <i className='fas fa-newspaper' /> <span>No snippets yet</span>
            </div>
        )
    }
}

const VideoList = ({ videos }) => {
    if (videos.length > 0) {
        return videos.map((video, idx) => {
            return (
                <VideoCard
                    {...video}
                />
            )
        })
    } else {
        return (
            <div className='no-resources-message'>
                <i className='fab fa-youtube' /> <span>No videos yet</span>
            </div>
        )
    }
}

const LinkList = ({ links }) => {
    if (links.length > 0) {
        return links.map((link, idx) => {
            return (
                <LinkCard link={link} onClick={() => {

                }} />
            )
        })
    } else {
        return (
            <div className='no-resources-message'>
                <i className='fas fa-link' /> <span>No links yet</span>
            </div>
        )
    }
}


const TopicHeader = ({ classes, topic, setSelectedResourceType, selectedResourceType }) => {
    return (
        <div className={classes.selectedTopicHeader}>
            <div>
                <h2 className={classes.selectTopicTitle}>{topic.title}</h2>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <div 
                    className={`${classes.selectedTopicNavBarItem} ${selectedResourceType === "NOTES" ? classes.shadow : null}`}
                    onClick={() => {
                        setSelectedResourceType("NOTES")
                    }}
                >   
                    <i className="fas fa-pen-square" />
                    <span style={{ marginLeft: 6 }}>Notes</span>
                </div>
                <div 
                    className={`${classes.selectedTopicNavBarItem} ${selectedResourceType === "SNIPPETS" ? classes.shadow : null}`}
                    onClick={() => {
                        setSelectedResourceType("SNIPPETS")
                    }}
                >
                    <i className="fas fa-newspaper" />
                    <span style={{ marginLeft: 6 }}>Snippets</span>
                </div>
                <div 
                    className={`${classes.selectedTopicNavBarItem} ${selectedResourceType === "VIDEOS" ? classes.shadow : null}`}
                    onClick={() => {
                        setSelectedResourceType("VIDEOS")
                    }}
                >
                    <i className="fab fa-youtube" />
                    <span style={{ marginLeft: 6 }}>Videos</span>
                </div>
                <div 
                    className={`${classes.selectedTopicNavBarItem} ${selectedResourceType === "LINKS" ? classes.shadow : null}`}
                    onClick={() => {
                        setSelectedResourceType("LINKS")
                    }}
                >
                    <i className="fas fa-link" />
                    <span style={{ marginLeft: 6 }}>Links</span>
                </div>
            </div>
        </div>
    )
}

const LoadingResources = ({
    selectedResourceType
}) => {
    switch (selectedResourceType) {
        case "NOTES": {
            return (
                <LoadingCard />
            )
        }
        case "SNIPPETS": {
            return (
                <LoadingSnippet />
            )
        }
        case "VIDEOS": {
            return <LoadingVideo />
        }
        case "LINKS": {
            return <LoadingCard />
        }
        default: {
            return null
        }
    }
}

const SelectedTopic = ({ topic, classes, userName }) => {

    const topicIdRef = useRef()
    const [selectedResourceType, setSelectedResourceType] = useState("NOTES")
    const [notes, setNotes] = useState([])
    const [snippets, setSnippets] = useState([])
    const [videos, setVideos] = useState([])
    const [links, setLinks] = useState([])
    const [loadingResources, setLoadingResources] = useState(false)

    
    useEffect(() => {
        if (topicIdRef.current !== topic.id) {
            resetResources()
            getResources(selectedResourceType)
        } else {
            if (!checkIsResourceLoaded(selectedResourceType)) {
                getResources(selectedResourceType)
            }
        }
        topicIdRef.current = topic.id
    }, [selectedResourceType, topic])

    const resetResources = () => {
        setNotes([])
        setSnippets([])
        setVideos([])
        setLinks([])
    }

    const checkIsResourceLoaded = (selectedResourceType) => {
        switch(selectedResourceType){
            case "NOTES": {
                return notes && notes.length > 0
            }
            case "VIDEOS": {
                return videos && videos.length > 0
            }
            case "SNIPPETS": {
                return snippets && snippets.length > 0
            }
            case "LINKS": {
                return links && links.length > 0
            }
        }
    }

    const getResources = async (selectedResourceType) => {
        setLoadingResources(true)
        switch (selectedResourceType) {
            case "NOTES": {
                const res = await getPublicNotes(topic.id)
                setNotes(res.notes)
                setLoadingResources(false)
                break
            }
            case "SNIPPETS": {
                const res = await getPublicSnippets(topic.id)
                setSnippets(res.snippets)
                setLoadingResources(false)
                break
            }
            case "VIDEOS": {
                const res = await getPublicVideos(topic.id)
                setVideos(res.videos)
                setLoadingResources(false)
                break
            }
            case "LINKS": {
                const res = await getPublicLinks(topic.id)
                setLinks(res.links)
                setLoadingResources(false)
                break
            }
        }
    }

    return (
        <div>
            <TopicHeader 
                classes={classes} 
                topic={topic} 
                setSelectedResourceType={setSelectedResourceType} 
                selectedResourceType={selectedResourceType} 
            />
            <div style={{ marginTop: 15 }}>
                {loadingResources && (
                    <LoadingResources selectedResourceType={selectedResourceType} />
                )}
                {!loadingResources && (
                    <>
                        {selectedResourceType === "NOTES" && <NotesList notes={notes} />}
                        {selectedResourceType === "SNIPPETS" && (
                            <SnippetList snippets={snippets} />
                        )}
                        {selectedResourceType === "VIDEOS" && (
                            <VideoList videos={videos} />
                        )}
                        {selectedResourceType === "LINKS" && (
                            <LinkList links={links} />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}


const ProfileTopics = ({ 
    openMenu, 
    classes, 
    topics, 
    userName, 
    onSelectTopic, 
    selectedTopic 
}) => {

    return (
        <>
            <div className="fl w-100">
                <div style={{
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "space-between",
                        padding: "4px 8px 6px 8px",
                        borderBottom: "1px solid gray"
                    }}>
                    <div>
                        <ProfileButton classes={classes} openMenu={openMenu} />
                    </div>
                    <div style={{width: 200}}>
                        <input placeholder="Search All" className={classes.searchInput}></input>
                    </div>      
                </div>
            </div>
            <div className="fl w-100">
                <div 
                style={{
                    borderRadius: 4,
                    color: "white",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {topics && topics.length > 0 && selectedTopic && (
                        <>
                            <div className={classes.topicSidebar}>
                                <TopicList 
                                    topics={topics} 
                                    onSelectTopic={onSelectTopic} 
                                    selectedTopicId={selectedTopic.id} 
                                />
                            </div>
                            <div className={classes.contentSection}>
                                <SelectedTopic topic={selectedTopic} userName={userName} classes={classes} />
                            </div>
                        </>
                    )}
                    {topics.length === 0 && (
                        <div style={{ textAlign: "center", color: "gray", margin: "auto", marginTop: "15%"}}>
                            <i className="far fa-folder-open" style={{ fontSize: 35, marginBottom: 5}}></i>
                            <h3>{userName} hasn't published any topics yet</h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


const ProfileButton = ({ classes, openMenu }) => {
    return (
        <div style={{textAlign: "center", display: "flex", flexDirection: "row", color: "white" }}>
             <i className={`fas fa-bars white pointer pr3 ${classes.menuIcon}`} onClick={openMenu}></i> 
            <img 
                src="https://avatars.githubusercontent.com/u/30689746?v=4" 
                style={{height: 40, marginTop: 7, borderRadius: 4}}
            >
            </img>
            <h3 style={{marginLeft: 10}}>bbsmithy</h3>
        </div>
    )
}

export const Profile = ({ }) => {
    
    const classes = useStyles()
    
    const [loading, setLoading] = useState(true)
    const [userNotFound, setUserNotFound] = useState(false)
    const [userName, setUserName] = useState("")
    const [topics, setTopics] = useState([])
    const [menuOpen, setMenu] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState()

    useEffect(() => {
        findProfile()
    }, [])

    const onSelectTopic = (topic) => {
        setSelectedTopic(topic)
    }

    const findProfile = async () => {
        try {
            const pathArray = window.location.pathname.split('/');
            const userName = pathArray[1]
            setUserName(userName)
            const profile = await getPublicTopics(userName)
            if (profile.error) {
                throw profile.error
            } else if (profile.topics) {
                setTopics(profile.topics)
                setSelectedTopic(profile.topics[0])
            }
            setLoading(false)
        } catch (err) {
            setUserNotFound(true)
            setLoading(false)
        }
    }

    const openMenu = () => {
        setMenu(true)
    }

    const closeMenu = () => {
        setMenu(false)
    }

    return (
        <>
        {menuOpen && (
            <div style={{height: "100%", width:"100%", position: "absolute", backgroundColor: "#333", padding: 15}}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>
                        <h3 style={{color:"white"}}>Topics</h3>
                    </div>
                    <div>
                        <i 
                            className="fas fa-times white" 
                            style={{ marginTop: 20, fontSize: 20 }}
                            onClick={closeMenu}
                        >
                        </i>
                    </div>
                </div>
                <input placeholder="Search All" className={classes.mobileSearchInput}></input>
                {topics && topics.map((topic) => {
                    return (
                        <div style={{ border:"1px solid gray", marginTop: 10, borderRadius: 5, padding: "15px 10px", background: "#333", color: "white", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <div>{topic.title}</div>
                            <div>
                                <i className="fas fa-chevron-right white"></i>
                            </div>
                        </div>
                    )
                })}
            </div>
        )}
        <div className={`cf helvetica ${classes.mainContainer}`}>
            {!loading && !userNotFound && topics && (
                <ProfileTopics
                    userName={userName}
                    selectedTopic={selectedTopic}
                    onSelectTopic={onSelectTopic}
                    topics={topics}
                    openMenu={openMenu} 
                    classes={classes}
                />
            )}
            {!loading && userNotFound && (
                <UserNotFound userName={userName} />
            )}
            {loading && (
                <div className={classes.loadingProfile}>
                    <i 
                        className={`fas fa-circle-notch fa-spin white`} 
                        style={{fontSize: 35, marginTop: 20}}
                    ></i>
                    <h3 style={{textAlign: "center"}}>Searching the cosmos</h3>
                </div>
            )}
        </div>
        </>
    )
}
