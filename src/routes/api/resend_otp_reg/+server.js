import { json } from '@sveltejs/kit'

export const POST=async(req)=>{
    let obj=await req.request.json()
    let res=await fetch('http://localhost:4300/resend_otp_reg',{method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(obj)
    })
    let result=await res.json()
    return json(result)
}