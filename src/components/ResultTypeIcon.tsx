import React from "react"

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
export default ResultTypeIcon