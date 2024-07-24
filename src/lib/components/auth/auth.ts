import { crd } from "$lib/writable/crd";
import { writable } from "svelte/store";

let crd_val
crd.subscribe((val)=>{
    crd_val=val
})
export const auth_data=writable({state:true,data:{}})

export const get_auth_data=writable(the_function)


async function the_function(data){
    let result=await fetch('/quizz/get_auth_details',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({id:crd_val.username,crd:crd_val.key,q_id:data.q_id,auth_key:data.key})
    })
    let res=await result.json()
    console.log(res);
    if(res.status=='no'){
        return 'no'
    }
    if(res.status!='done'){
        return 'err'
    }
    auth_data.set({state:true,data:res.data})
    return 'done'
}
