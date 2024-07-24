import { json } from '@sveltejs/kit'

export const POST=async(req)=>{
    let data= await req.request.json()
    let res=await fetch('http://localhost:4300/gen_file',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(data)
    })
    let res2=await res.json()
    return json(res2)
}