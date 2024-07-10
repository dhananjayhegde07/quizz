import { crd } from "$lib/writable/crd";
import { writable } from "svelte/store";

export const current=writable({set:false,data:{},mode:1})

export const taken_data=writable({fetched:false,data:[],other:[]})

export const mode=writable('taken')

let username,key;
crd.subscribe((val)=>{
    username=val.username;
    key=val.key
})

async function update_taken() {
    let res=await fetch('/others/get_all_taken',{
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
    taken_data.set({fetched:true,data:result.data,other:result.others})
    return false
}

export const update_taken_func=writable(update_taken)