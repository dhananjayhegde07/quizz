<script lang="ts">
    import "../app.css";
    import 'animate.css/animate.min.css'
    import { notification } from "$lib/writable/notification";
	import Loading from "$lib/extra/loading.svelte";
    import {loading,width_val} from '$lib/writable/loading'
    import {socketio} from '$lib/writable/sockets'
	import { connect, io, type Socket } from "socket.io-client";
    import {crd} from '$lib/writable/crd'
	import { onMount } from "svelte";
	import { quizzzz, taken } from "$lib/writable/conduct";
	import IoHandler from "$lib/extra/io_handler.svelte";
    let is_notification=false,msg='',timeid:any
    let is_loading=false
    let socket:Socket
    let render_page=false


    notification.subscribe((val)=>{
    is_notification=val.on;
    msg=val.msg
    clearTimeout(timeid)
    timeid=setTimeout(()=>{
        notification.set({msg:'',on:false})
    },5000)
    })

    let crd_val:any
    crd.subscribe((val)=>{
        crd_val=val
    })

    loading.subscribe((val)=>{
        is_loading=val
    })
    socketio.subscribe((val)=>{
        socket=val
        socket.on('connect',async ()=>{
            if(crd_val.username!=''&&crd_val.key!=''){
                try {
                    let ack=socket.emitWithAck('reconnect_user',{id:crd_val.username })
                    console.log(socket.id)
                } catch (error) {
                    //reconnection failed
                }
            }
        })
        socket.on('user_check',(cb)=>{
            cb()
        })
        
    })
    taken.set({info:{},settings:{},ans:[],qns:[]})
    quizzzz.set({state:true,cur_dur:0,end:false})
    onMount(()=>{
        window.addEventListener('beforeunload',()=>{
            if(crd_val.username!=''&&crd_val.key!=''){
                sessionStorage.setItem('username',crd_val.username)
                sessionStorage.setItem('token',crd_val.key)
            }
        })
        width_val.set(window.innerWidth)
        window.addEventListener('resize',()=>{
            width_val.set(window.innerWidth)
        })
        if(sessionStorage.getItem('username')&&sessionStorage.getItem('token')){
            crd.set({username:String(sessionStorage.getItem('username')),key:String(sessionStorage.getItem('token'))})
            console.log(crd_val)
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('token')
            try {
                let ack=socket.emitWithAck('reconnect_user',{id:crd_val.username })
                console.log(socket.id)
            } catch (error) {
                // reconnection failed
            }
        }
        render_page=true
    })
</script>


{#if render_page}
    <IoHandler></IoHandler>
    <slot></slot>
{/if}
{#if is_notification}
    <div class="h-14 w-screen z-40 absolute top-8 left-0 grid place-items-center">
        <div class="notification h-14">
            <div class="msg">
                <p class="themsg grid place-items-center overflow-scroll">{msg}</p>
                <div class="cancel" on:click={()=>{
                    notification.set({msg:'',on:false})
                    clearTimeout(timeid)
                }}>
                    <svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                </div>
            </div>
            <div class="progress"></div>
        </div>
    </div>
{/if}
{#if is_loading}
    <Loading></Loading>
{/if}



<style>
    .noti_main{
        position: absolute;
        top: 30px;
        left: 0px;
        width: 100vw;
        display: grid;
        place-items: center;
        animation: anime ease-in-out .5s;
    }
    @keyframes anime{
        0%{
            top: 0px;
        }
        100%{
            top: 30px;
        }
    }
    .notification{
       background-color: rgb(172, 172, 172);
       border-radius: 5px;
       width: 300px;
    }
    .msg{
        display: flex;
        height: calc(100% - 5px);
    }
    .msg .themsg{
        width: calc(100% - 30px);
        height: 100%;
        margin-left: 10px;
    }
    .cancel{
        display: grid;
        place-items: center;
        cursor: pointer;
        margin-right: 5px;
    }
    .progress{
        height: 5px;
        background-color: rgb(84, 192, 123);
        width: 100%;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        animation: progres 4s ease-in-out;
    }
    @keyframes progres{
        0%{
            width: 0%;
        }
        100%{
            width: 100%;
        }
    }
</style>