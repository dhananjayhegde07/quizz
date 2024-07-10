import { writable } from "svelte/store";

export const share_open=writable({data:{id:'',qr:''},state:false})