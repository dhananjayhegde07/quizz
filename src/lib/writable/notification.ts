import { writable } from "svelte/store";

type noti={
    msg:string,
    on:boolean
}
export const notification=writable<noti>({msg:'',on:false})
