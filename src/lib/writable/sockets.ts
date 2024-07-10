import { io,Socket } from "socket.io-client";
import { writable } from "svelte/store";

const socket=io('http://localhost:4300')

export const socketio=writable<Socket>(socket)