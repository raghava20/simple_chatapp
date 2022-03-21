import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { io } from "socket.io-client"
import queryString from "query-string"
import { useLocation } from "react-router-dom"
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

let socket;

export default function Chat() {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    let location = useLocation()
    const ENDPOINT = 'http://localhost:5000'
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        socket = io(ENDPOINT);
        console.log(socket)
        setRoom(room)
        setName(name)
        socket.emit('join', { name, room }, (error) => {
            if (error) alert(error)
            console.log("user join")
        })

        return () => {
            socket.emit('disconnect')

            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])

        })
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    console.log(message, "message", messages)
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}
