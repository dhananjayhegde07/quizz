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
    <div class="noti_main">
        <div class="notification">
            <div class="msg">
                <p class="themsg">{msg}</p>
                <p class="cancel" on:click={()=>{
                    notification.set({msg:'',on:false})
                    clearTimeout(timeid)
                }}>X</p>
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
       padding-top: 5px; ;
       width: 300px;
       min-height: 50px;
    }
    .msg{
        display: flex;
        height: 90%;
    }
    .msg .themsg{
        width: 90%;
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