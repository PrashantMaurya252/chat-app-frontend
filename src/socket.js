import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5000"

const userId = JSON.parse(localStorage.getItem("user"))._id


export const socket = io(SERVER_URL,{
    query:{userId:userId},
    transports:["websocket"],
})

socket.on("connect",()=>{
    console.log("Connected to Socket.IO Server")
})

socket.on("disconnect",()=>{
    console.log("Disconnected from Socket.Io server")
})