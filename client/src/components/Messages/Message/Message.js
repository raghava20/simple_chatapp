import React from 'react'
import "./Message.css"
import ReactEmoji from "react-emoji"

export default function Message({ message: { user, text }, name }) {

    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sender pr-10">{trimmedName}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorBlack">{text}</p>
                    </div>
                    <p className="sender pl-10">{ReactEmoji.emojify(user)}</p>
                </div>
            )
    )
}
