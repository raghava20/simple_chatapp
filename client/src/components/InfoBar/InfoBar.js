import React from 'react'

import "./InfoBar.css"
import closeIcon from "../icons/closeIcon.png"
import onlineIcon from "../icons/onlineIcon.png"

export default function InfoBar({ room }) {
    return (
        <div className="infoBar">
            <div className="leftInfoContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online" />
                <h4>{room}</h4>
            </div>
            <div className="rightInfoContainer">
                <a href="/">
                    <img src={closeIcon} alt="close" />
                </a>
            </div>
        </div>
    )
}
