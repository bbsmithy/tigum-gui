import classes from "*.module.css"
import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import { getPublicTopics } from "../../clib/api"
import { LoadingCard } from "../../components"
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
        backgroundColor: "#333"
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
    }
})

const TopicList = ({ topics }) => {
    return topics.map((topic) => {
        return (
            <div style={{borderBottom: "1px solid gray", cursor: "pointer", borderRight: "5px solid #246bf8", padding: 10}}>
                {topic.title}
            </div>
        )
    })
}

const SelectedTopic = ({ topic }) => {
    return (
        <h2>{topic.title}</h2>
    )
}


const ProfileTopics = ({ openMenu, classes, topics, userName }) => {

    const [selectedTopic, setSelectedTopic] = useState()

    const onSelectTopic = (topic) => {
        setSelectedTopic(topic)
    }
    console.log("topics: ", topics)

    return (
        <>
            <div className="fl w-100">
                <div style={{
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "space-between",
                        // boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
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
                    // backgroundColor: "#333", 
                    borderRadius: 4,
                    // boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
                    color: "white",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {topics && topics.length > 0 && (
                        <>
                            <div className={classes.topicSidebar}>
                                <TopicList topics={topics} onSelectTopic={onSelectTopic} />
                            </div>
                            <div className={classes.contentSection}>
                                <SelectedTopic topic={selectedTopic} />
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
