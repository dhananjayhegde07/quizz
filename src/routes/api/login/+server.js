import { json } from '@sveltejs/kit'

export const POST=async (req) =>{
    let x=await req.request.json()
    let res=await fetch('http://localhost:4300/login',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(x)
    })
    res=await res.json()
    return json(res)
}