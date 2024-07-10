<script lang="ts">
	import { notification } from "$lib/writable/notification";
	import { afterUpdate, onMount,createEventDispatcher } from "svelte";

    const disp=createEventDispatcher()
    export let data;
    export let width;
    let main_w='400px';
    let otp=''
    if(width<600){
        main_w='90vw'
    }
    afterUpdate(()=>{
        if(width<600) main_w='90vw'
        else main_w='400px'
    })
    onMount(()=>{
        addtimeout()
        rebtn.disabled=true
    })
    let rebtn:HTMLButtonElement
    let resend={timer:60,resend:false,count:3}
    function addtimeout(){
        let timeid=setInterval(()=>{
            if(resend.timer==0){
                clearTimeout(timeid)
                resend.resend=true
                rebtn.disabled=false
                return
            }
            resend.timer--
        },1000)
    }
</script>


<div class="main">
    <div class="sub m-20" style="width: {main_w};">
        <h3>Varify your identity</h3>
        <p>Email has been sent to {data.mail}</p>
        <input type="text" placeholder="otp" bind:value={otp}>
        <div class="btn">
            <button on:click={async()=>{
                if(otp=='')return
                let res=await fetch('api/submit_otp',{method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({mail:data.mail,otp:otp})
                })
                let result=await res.json()
                if (result.status=='err'||result.status=='wrong') {
                    notification.set({msg:'Something went wrong',on:true})
                    return
                }
                if (result.status=='expired') {
                    notification.set({msg:'OTP has expired',on:true})
                    return
                }
                if (result.status=='miss') {
                    notification.set({msg:'OTP miss match',on:true})
                    return
                }
                if (result.status!='varified') {
                    notification.set({msg:'Something went wrong',on:true})
                    return
                }
                disp('varified')
            }}>Submit</button>
            <button bind:this={rebtn} on:click={async()=>{
                if(resend.count==3){
                    notification.set({msg:'Try again later',on:true})
                    return
                }
                rebtn.disabled=true
                addtimeout()
                resend.count++
                let res=await fetch('api/resend_otp_reg',{method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({email:data.mail})
                })
                let result=await res.json()
                if (result.status=='no'||result.status=='wrong') {
                    notification.set({msg:'Something went wrong',on:true})
                    return
                }
                if (result.status=='mailerr') {
                    notification.set({msg:'Unable to send Emial',on:true})
                    return
                }
                if (result.status=='miss') {
                    notification.set({msg:'OTP miss match',on:true})
                    return
                }
                if (result.status!='varified') {
                    notification.set({msg:'Something went wrong',on:true})
                    return
                }
            }}>Resend</button>
        </div>
        <p class="msg">Resend otp {resend.timer}</p>
    </div>
</div>

<style>
    .main{
        display: grid;
        place-items: center;
        position: absolute;
        height: 100vh;
        width: 100vw;
        top: 0px;
        left: 0px;
        background-image: url(/whitebg.jpeg);
        background-repeat: no-repeat;
        background-size: cover;
        backdrop-filter: blur(3px);
    }
    .sub{
        background-color: whitesmoke;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.623);
        border-radius:5px;
        min-height: 250px;
        padding: 10px;
        font-size: 1.1em;
    }
    h3{
        display: grid;
        place-items: center;
        font-size: 1.2em;
    }
    .sub p{
       margin-bottom: 20px;
       margin-top: 10px;
    }
    .sub input{
        border: none;
        background-color: rgb(232, 232, 232);
        height: 40px;
        font-size: .9em;
        width: 150px;
        border: 1px solid rgba(0, 0, 0, 0.397);
        border-radius: 5px;
        padding-left: 5px;
    }
    .sub input:focus{
        outline: none;
        caret-color: rgba(0, 0, 0, 0.552);
    }
    .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }
    .btn button{
        border-radius: 5px;
        font-size: .9em;
        background-color: rgba(127, 255, 168, 0.959);
        height: 40px;
        width: 80px;
        margin-right: 20px;
    }
    .msg{
        font-size: .8em;
        color: rgba(0, 0, 0, 0.553);
    }
</style>