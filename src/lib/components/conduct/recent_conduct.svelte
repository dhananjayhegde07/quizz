<script lang="ts">
	import { crd } from "$lib/writable/crd";
	import { onMount } from "svelte";
    import {gsap} from 'gsap'
    import {conduct_data, update_conduct_data} from '$lib/writable/data'
	import { width_val } from "$lib/writable/loading";

    let crd_val
    crd.subscribe(async(val)=>{
        crd_val=val       
    })   
    let content=[],hover_obj={}
    conduct_data.subscribe(async(val)=>{
        if(!val.fetched){
            err=await $update_conduct_data()
            return
        }
        content=[...val.data]
        console.log(content);
        
        for(let i of content){
            hover_obj[i.q_id]=false
        }
    }) 
    let err=false
    let the_div
    $:{
        if(the_div){
            gsap.from(the_div,{height:'0%', duration:0.2})
        }
    }
    function animate_hoover(id){
        gsap.to(the_div,{height:'0%', duration:0.2,onComplete:()=>{
            changeeee()
        }})

        function changeeee(){
            hover_obj[id]=false
        }
    }
    async function accept_all(c) {
        let data=await fetch('/others/accept_all_permission',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:$crd.username,crd:$crd.key,lolo_id:c.q_id})
        })
        let result=await data.json()
        console.log(result);
        let arr=$conduct_data.data
        arr=arr.filter((val)=>val.q_id!=result.data.q_id)
        arr.push(result.data)
        conduct_data.set({fetched:$conduct_data.fetched,data:arr})
    }
    let width_class='five'
    width_val.subscribe((val)=>{
        
        if(val<950&& val>550){
            width_class='four'
        }
        else if(val<550&&val>=410){
            width_class='three'
        }
        else if(val<410) width_class='two'
        else width_class='five'
    })
</script>


<div class="conduct p-3">
    <div class="top_bar flex justify-between items-center">
        <p class="ml-3">Pending requests</p>
        <img src="/eco.png" alt="" class="h-8 mr-4" on:click={async()=>{
            err=await $update_conduct_data()
        }}>
    </div>
    <div class="content">
        {#if err}
            <div class="h-full w-full grid place-items-center">
                <div class="flex items-center">
                    <img src="/attention.png" alt="" class="h-10">
                    <p class="ml-3">Unable to get the data</p>
                </div>
            </div>
        {/if}
        <div class="content_inner {width_class}">
            {#each content as c}
                <div class="grid place-items-center animate-animated animate__bounceIn">
                    <div class="relative flex card {hover_obj[c.q_id]?'no_raduis':''}" on:mouseenter={()=>{hover_obj[c.q_id]=true;}} on:mouseleave={()=>{
                        animate_hoover(c.q_id)
                    }}>
                        <p class="w-4/5 ml-3">{c.q_id}</p>
                        <p>{c.taken.filter((val)=>val.permission!='granted').length}</p>
                        {#if hover_obj[c.q_id]}
                            <div class="absolute top-full hover_class overflow-hidden" bind:this={the_div}>
                                <div class="grid place-items-center">
                                    <button class="w-28 h-8 bg-green-700" on:click={()=>{
                                        accept_all(c)
                                    }}>Approve all</button>
                                </div>
                                <div class="grid place-items-center mt-3">
                                    <button class="w-28 h-8 bg-green-700">View</button>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>



<style>
    .conduct{
        height: 300px;
        width: 100%;
        margin-top: 20px;
        background-color: rgba(240, 248, 255, 0.568);
        border-radius: 5px;
    }
    .top_bar{
        height: 15%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.667);
    }
    .content{
        height: 85%;
    }
    .content_inner{
        display: grid;
        grid-auto-rows: 50px;
        overflow: scroll;
        height: 100%;
    }
    .content_inner::-webkit-scrollbar{
        display: none;
    }
    .five{
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    .four{
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .three{
        grid-template-columns: 1fr 1fr 1fr;
    }
    .two{
        grid-template-columns: 1fr 1fr;
    }
    .card{
        background-color: aliceblue;
        width: 80%;
        border-radius: 5px;
        height: 50px;
        margin: 10px;
        align-items: center;
    }
    .hover_class{
        background-color: aliceblue;
        height: 100px;
        width: 100%;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        z-index: 1000;
    }
    .no_raduis{
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
</style>

