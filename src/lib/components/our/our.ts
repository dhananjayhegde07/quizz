import { crd } from "$lib/writable/crd";
import { writable } from "svelte/store";

let crd_val
crd.subscribe((val)=>{
    crd_val=val
})

export const our_data=writable({fetched:false,data:{}})


export const fetch_our_data=writable(async()=>{
    let result=await fetch('/quizz/get_our_data',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({id:crd_val.username,crd:crd_val.key})
    })
    let res=await result.json()
    console.log(res);
    if(res.status!='done'){
        return 'err'
    }
    our_data.set({fetched:true,data:res.data})
    return 'done'
})