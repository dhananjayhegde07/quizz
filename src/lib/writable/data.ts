import { writable } from "svelte/store";
import { crd } from "./crd";
let username,key
crd.subscribe((val)=>{
    console.log(val);
    username=val.username
    key=val.key
})

export const conduct_data=writable({fetched:false,data:[]});

export const reports=writable({fetched:false,data:{}})

export const update_conduct_data=writable(fetchdetails)

async function fetchdetails() {
    let res=await fetch('/home/getconducts',{
        method:'POST',
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({id:username,crd:key})
    })
    let result=await res.json()
    console.log(result);
    
    if(result.status!='done'){
        // err=true
        return true
    }
    conduct_data.set({fetched:true,data:result.data})
    return false
}


export const pending=writable({fetched:false,data:[]})

async function pending_takes() {
    let res=await fetch('/others/pending_taken',{
        method:'POST',
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({id:username,crd:key})
    })
    let result=await res.json()
    console.log(result);
    
    if(result.status!='done'){
        // err=true
        return true
    }
    pending.set({fetched:true,data:result.data})
    return false
}
export const update_pending=writable(pending_takes)