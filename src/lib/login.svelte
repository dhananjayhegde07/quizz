<script lang="ts">
	import { afterUpdate, onMount,createEventDispatcher } from "svelte";
	import Heading from "$lib/extra/heading.svelte";
    import {crd} from '$lib/writable/crd'
	import { notification } from "./writable/notification";
	import { loading } from "./writable/loading";
	import { socketio } from "./writable/sockets";
	import type { Socket } from "socket.io-client";
    import {goto} from '$app/navigation'
    const disp=createEventDispatcher()
    export let width;
    export let is_show;
    export let q_id=null
    let name='',pass='',main_w="500px"
    if(width<500){
        main_w=`${width-50}px`
    }
    afterUpdate(()=>{
        if(width<600){
            main_w=`${width-50}px`
        }
        else main_w="500px"
    })
    let socket:Socket
    socketio.subscribe((val)=>{
        socket=val;
    })
    let login:HTMLButtonElement
</script>

<div class="main" style="width:{main_w};">
    {#if is_show}
        <Heading></Heading>
    {/if}
    <h2>Login Now</h2>
    <div class="inp">
        <p>Username/email</p>
        <input type="text" bind:value={name}>
    </div>
    <div class="inp">
        <p>Password</p>
        <input type="password" bind:value={pass}>
    </div>
    <div class="btn">
        <button bind:this={login} on:click={async ()=>{
            login.disabled=true
            let res=await fetch('/api/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({name:name,pass:pass})
            })
            let result=await res.json()
            console.log(result)
            if (result.status=='fields') {
                login.disabled=false
                notification.set({msg:'Missing fields',on:true})
                return
            }
            if (result.status=='dberr') {
                login.disabled=false
                notification.set({msg:'Something went wrong',on:true})
                return
            }
            if (result.status=='nouser') {
                login.disabled=false
                notification.set({msg:'There is no such user',on:true})
                return
            }
            if (result.status=='pass') {
                login.disabled=false
                notification.set({msg:'Incorrect password',on:true})
                return
            }
            login.disabled=false
            
            loading.set(true)
            try {
                let ack=await socket.timeout(10000).emitWithAck('connection_on',{id:name})
                if (ack.status!='done') {
                    notification.set({msg:'something went wrong',on:true})
                    return
                }
                crd.set({username:ack.name,key:ack.token})
                loading.set(false)
                if (q_id) {
                    disp("done")
                    return
                }
                goto('/home')
                
            } catch (error) {
                loading.set(false)
            }
        }}>Login</button>
    </div>
    <div class="additional">
        <p class="reg">Dont have a account?<strong style="margin-left: 5px;color: blue;cursor: pointer;" on:click={()=>{
            disp('reg')
        }}>Create</strong></p>
        <p on:click={()=>{

        }}>Forgot password?</p>
    </div>
</div>

<style>
    .main{
        height: 500px ;
        padding: 10px;
        background-color: rgba(245, 245, 245, 0.563);
        border-radius: 10px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.604);
        overflow: hidden  ;
        animation: anime ease-in-out 0.5s;
    }
    @keyframes anime{
        0%{
            height: 0px;
        }
        100%{
            height: 500px;
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
        font-size: 1.3em;
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
    .additional{
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .additional p{
        width: 30%;
    }
    .additional .reg{
        width: 70%;
    }
</style>