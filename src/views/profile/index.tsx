import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import { getPublicLinks, getPublicNotes, getPublicSnippets, getPublicTopics, getPublicVideos } from "../../clib/api"
import { Note } from "../../components"
import { getDate } from "../../util"
import UserNotFound from "./components/UserNotFound"


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
        width: "79%",
        borderRadius: 3,
        padding: 10,
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
            width: "75%",
        },
        height:"100%"
    },
    topicSidebar: {
        width: "20%",
        backgroundColor: "#333",
        border: 2,
        marginRight: "1%",
        // border: "1px solid gray",
        borderRadius: 3,
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
        cursor: "pointer",
        // border: "1px solid #333"
    },
    shadow: {
        // boxShadow: "2px 2px 1px 0px rgb(0 0 0 / 75%)",
        borderBottom: "3px solid rgb(36, 107, 248)",
        // backgroundColor: "#1f1f1f"
    },
    selectedTopicHeader: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between"
    },
    selectTopicTitle: {
        margin: 4, 
        padding: 0
    }
})

const TopicList = ({ topics, onSelectTopic, selectedTopicId }) => {
    return topics.map((topic) => {
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

const NotesList = ({ notes }) => {
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
}

const SnippetList = ({ snippets }) => {
    return snippets.map((snippet) => {
        // const renderDate = () => {
        //     const dateText = new Date(note.date_updated);
        //     return getDate(dateText);
        // };
        return (
            <div className='card w-50 note-card' style={{display: "inline-block"}}>
                <h3>{snippet.title}</h3>
                {snippet.content}
            </div>
        )
    })
}

const SelectedTopic = ({ topic, classes, userName }) => {

    const [selectedResourceType, setSelectedResourceType] = useState("NOTES")
    const [notes, setNotes] = useState()
    const [snippets, setSnippets] = useState()
    const [videos, setVideos] = useState()
    const [links, setLinks] = useState()
    
    useEffect(() => {
        getResources(selectedResourceType)
    }, [selectedResourceType, topic])

    const getResources = async (selectedResourceType) => {
        switch (selectedResourceType) {
            case "NOTES": {
                const res = await getPublicNotes(topic.id)
                setNotes(res.notes)
                break
            }
            case "SNIPPETS": {
                const res = await getPublicSnippets(topic.id)
                setSnippets(res.snippets)
                break
            }
            case "VIDEOS": {
                const res = await getPublicVideos(topic.id)
                setVideos(res.videos)
                break
            }
            case "LINKS": {
                const res = await getPublicLinks(topic.id)
                setLinks(res.links)
                break
            }
        }
    }

    return (
        <div>
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
            <div style={{ marginTop: 15 }}>
                {selectedResourceType === "NOTES" && notes && <NotesList notes={notes} />}
                {selectedResourceType === "SNIPPETS" && snippets && (
                    <SnippetList snippets={snippets} />
                )}
                {selectedResourceType === "VIDEOS" && videos && (
                    <div>{JSON.stringify(videos)}</div>
                )}
                {selectedResourceType === "LINKS" && links && (
                    <div>{JSON.stringify(links)}</div>
                )}
            </div>
        </div>
    )
}


const ProfileTopics = ({ openMenu, classes, topics, userName }) => {

    const [selectedTopic, setSelectedTopic] = useState(topics[0])

    const onSelectTopic = (topic) => {
        setSelectedTopic(topic)
    }

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
    const [topics, setTopics] = useState()
    const [menuOpen, setMenu] = useState(false)

    useEffect(() => {
        findProfile()
    }, [])

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
                <div style={{ border:"1px solid gray", marginTop: 10, borderRadius: 5, padding: "15px 10px", background: "#333", color: "white", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <div>TEST</div>
                    <div>
                        <i className="fas fa-chevron-right white"></i>
                    </div>
                </div>
                <div style={{ border:"1px solid gray", marginTop: 10, borderRadius: 5, padding: "15px 10px", background: "#333", color: "white", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <div>TEST</div>
                    <div>
                        <i className="fas fa-chevron-right white"></i>
                    </div>
                </div>
                <div style={{ border:"1px solid gray", marginTop: 10, borderRadius: 5, padding: "15px 10px", background: "#333", color: "white", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <div>TEST</div>
                    <div>
                        <i className="fas fa-chevron-right white"></i>
                    </div>
                </div>
            </div>
        )}
        <div className={`cf helvetica ${classes.mainContainer}`}>
            {!loading && !userNotFound && topics && (
                <ProfileTopics
                    userName={userName}
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
