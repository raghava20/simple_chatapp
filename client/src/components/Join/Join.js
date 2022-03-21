import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Join.css"

export default function Join() {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h4>Join</h4>
                <div><input type="text" className="joinInput" placeholder="Name" onChange={(e) => setName(e.target.value)} /></div>
                <div><input type="text" className="joinInput" placeholder="Room" onChange={(e) => setRoom(e.target.value)} /></div>
                <Link onClick={(e) => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button">Sign in</button>
                </Link>
            </div>
        </div>
    )
}
