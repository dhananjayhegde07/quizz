<script lang="ts">
	import { afterUpdate, onMount,createEventDispatcher } from "svelte";
    import { notification } from "./writable/notification";
	import Heading from "$lib/extra/heading.svelte";
	import VarifyOtp from "./extra/varify_otp.svelte";
    import {loading} from '$lib/writable/loading'
    const disp=createEventDispatcher()
    export let width;
    export let is_show;
    let main_w="500px"
    let reg={
        name:'',
        email:'',
        pass:'',
        username:'',
        repass:''
    }
    let btn:HTMLButtonElement;
    if(width<500){
        main_w=`${width-50}px`
    }
    onMount(()=>{
        document.title='Login/Register'
    })
    afterUpdate(()=>{
        if(width<600){
            main_w=`${width-50}px`
            // console.log(width)
        }
        else main_w="500px"
    })
    function varify(){
        let arr=Object.keys(reg)
        for(let i=0;i<arr.length;i++){
            if(reg[arr[i]]==''){
                notification.set({msg:'Missing Field',on:true})
                return false
            }
        }
        if(!(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(reg['email']))){
                notification.set({msg:'Email seems incorrect',on:true})
                return false
        }
        if(reg.pass!=reg.repass){
            notification.set({msg:'Password missmatch',on:true})
            return false
        }
        return true
    }
    let varify_otp={
        otp:'',
        bool:false
    }
    async function register() {
        let res2=await fetch('/api/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(reg)
        })
        let result=await res2.json()
        if(result.status=='form'){
            notification.set({msg:'Form not validated',on:true})
            return
        }
        if(result.status=='otp'){
            notification.set({msg:'otp not varified',on:true})
            return
        }
        notification.set({msg:'You can login',on:true})
        disp('log')
    }
</script>

<div class="main" style="width:{main_w};">
    {#if is_show}
        <Heading></Heading>
    {/if}
    <h2>Register Now</h2>
    <div class="inp">
        <p>Full name</p>
        <input type="text" bind:value={reg.name}>
    </div>
    <div class="inp">
        <p>Email</p>
        <input type="email" bind:value={reg.email}>
    </div>
    <div class="inp">
        <p>Username</p>
        <input type="text" bind:value={reg.username}>
    </div>
    <div class="inp">
        <p>Password</p>
        <input type="password" bind:value={reg.pass}>
    </div>
    <div class="inp">
        <p>Re-Password</p>
        <input type="text" bind:value={reg.repass} on:keypress={(e)=>{
            if(e.keyCode==13){
                btn.click()
            }
        }}>
    </div>
    <div class="btn">
        <button bind:this={btn} on:click={async ()=>{
            btn.disabled=true
            if (!varify()){btn.disabled=true;return}
            loading.set(true)
            let res2=await fetch('/api/register_otp',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(reg)
            })
            let result=await res2.json()
            loading.set(false)
            console.log(result)
            if (result.status=='exists') {
                btn.disabled=false
                notification.set({msg:'This email is already registered',on:true})
                return
            }
            if (result.status=='u_exist') {
                notification.set({msg:'Username is not available',on:true})
                btn.disabled=false
                return
            }
            if (result.status=='mailerr') {
                notification.set({msg:'Unable to send mail',on:true})
                btn.disabled=false
                return
            }
            btn.disabled=false
            varify_otp.bool=true
        }}>Sign up</button>
    </div>
    <div>
        <p>Already have a account?<strong style="margin-left: 5px;color: blue;cursor: pointer;" on:click={()=>{
            disp('log')
        }}>Login</strong></p>
    </div>
</div>

{#if varify_otp.bool}
    <VarifyOtp data={{'mail':reg.email}} width={width} on:varified={()=>{
        register()
        varify_otp.bool=false
    }}></VarifyOtp>
{/if}


<style>
    .main{
        height: 600px;
        overflow-y: scroll;
        padding: 10px;
        background-color: rgba(245, 245, 245, 0.563);
        border-radius: 10px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.604);
        animation: anime ease-in-out 0.5s;
    }
    .main::-webkit-scrollbar{
        border-radius: 10px;
    }
    @keyframes anime{
        0%{
            height: 0px;
        }
        100%{
            height: 600px;
        }
    }
    .inp{
        padding: 0;
        margin-top: 20px;
    }
    h2{
        height: 40px;
        display: grid;
        place-items: center;
        font-size: 1.2em;

    }
    .inp p{
        font-size: large;
        color: rgb(46, 44, 44);
    }
    .inp input{
        height: 40px;
        width: 90%;
        margin-left: 10px;
        background-color: rgba(250, 235, 215, 0.615);
        border-radius: 5px;
        border: none;
        font-size: 1.1em;
    }
    .inp input:focus{
        border: none;
        outline: none;
    }
    .btn{
        height: 80px;
        display: grid;
        place-items: center;
    }
    .btn button{
        border: none;
        background-color: rgb(89, 184, 89);
        border-radius: 5px;
        height: 40px;
        width: 80px;
        font-size: 1.1em;
        color:rgba(0, 0, 0, 0.742);
    }
</style>