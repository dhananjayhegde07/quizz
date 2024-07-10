<script lang="ts">
	import Take from "$lib/components/take/take.svelte";
	import { quizzzz, taken } from "$lib/writable/conduct";
	import { crd } from "$lib/writable/crd";
	import { width_val } from "$lib/writable/loading";
	import { createEventDispatcher, onMount } from "svelte";
	import CanExit from "../conduct/can_exit.svelte";
    let crd_val
    crd.subscribe((val)=>{
        crd_val=val
    })
    let take_val
    taken.subscribe((val)=>{
        take_val=val
    })
    let width='40vw'
    width_val.subscribe((val)=>{
        if(val<1000)width='100vw'
        else width='40vw'
    })
    const disp=createEventDispatcher()
    onMount(async()=>{
       
    })
</script>

<div class="main">
    <div class="header">
        <img src="/log_1.png" alt="">
        <p>LOLO QUizz</p>
    </div>
    <div class="instructions">
        <div class="ins_inner" style="width: {width};">
            <h2>Instructions</h2>
            <p>You are joining as {$crd.username}</p>
            <p>Created by:</p>
            <div class="create_by">
                {@html take_val.info.profile}
                <p>{take_val.info.owner}</p>
            </div>
            <ul>
                <li><strong>Created on: </strong> {take_val.info.date}</li>
                <li><strong>level : </strong> {take_val.info.level}</li>
                <li><strong>ID :  </strong> {take_val.info.id}</li>
                <li><strong>Type :  </strong> {take_val.info.type}</li>
                <li><strong>Duration:  </strong> {take_val.info.duration}</li>
            </ul>
            {#if take_val.strict}
                <p>Strict mode is turned on</p>
            {/if}
            <p>Total {take_val.info .count} members have taken the test before you</p>
            <button class="btn" on:click={async()=>{
                 let data=await fetch('/home/attend_quizz',{
                        method:'POST',
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({id:crd_val.username,crd:crd_val.key,lolo_id:take_val.info.id})
                    })
                let data2=await data.json()
                console.log(data2);
                taken.set({info:$taken.info,settings:data2.data.settings,qns:data2.data.qns,ans:[]})
                quizzzz.set({state:false,cur_dur:data2.data.settings.duration,end:false})
            }}>Start Quizz</button>
        </div>
    </div>
</div>

<style>
    .header{
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        font-size: 1.4em;
        border-bottom: 2px solid rgba(0, 0, 0, 0.7);
    }
    .header img{
        height: 100px;
        border-radius: 50%;
    }
    .header p{
        margin-left: 20px;
    }
    .instructions{
        display: grid;
        place-items: center;
        
    }
    .ins_inner{
        background-color: rgba(255, 228, 196, 0.595);
        padding: 20px;
        margin-top: 30px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.634);
    }
    .ins_inner h2{
        display: grid;
        place-items: center;
        height: 30px;
        font-size: 1.3em;
        text-decoration: underline;
    }
    .ins_inner p{
        min-height: 40px;
        display: flex;
        align-items: center;
    }
    .create_by{
        display: flex;
        margin:10px 40px;
    }
    :global(.create_by svg){
        max-height: 50px;
        max-width: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }
    ul{
        list-style: circle;
        margin-left: 30px;
    }
    li{
        min-height: 30px;
    }
    .btn{
        height: 40px;
        width: 100%;
        border-radius: 5px;
        background-color: rgba(0, 128, 0, 0.477);
    }
</style>