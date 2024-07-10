import { json } from '@sveltejs/kit'

export const POST=async(req)=>{
    let data= await req.request.json()
    let res=await fetch('http://localhost:4300/get_structure_file',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(data)
    })
    let result=await res.blob()
    return new Response(result,{
        status:200,
        headers:{
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="structure.json"'
        }
    })
}