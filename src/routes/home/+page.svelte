<script lang="ts">
    import {gsap} from 'gsap'
	import { onMount } from 'svelte';
    import {crd, details} from '$lib/writable/crd'
	import { notification } from '$lib/writable/notification';
	import { goto } from '$app/navigation';
	import NavbarHome from '$lib/components/navbar_home.svelte';
	import HeadingHome from '$lib/components/heading_home.svelte';
	import { width_val } from '$lib/writable/loading';
	import Tips from '$lib/components/tips.svelte';
	import Home from '$lib/components/home.svelte';
	import Conduct from '$lib/components/conduct/conduct.svelte';
	import Take from '$lib/components/take/take.svelte';
	import { write } from '$lib/writable/conduct';
	import Share from '$lib/components/conduct/share.svelte';
	import { nav_bar } from '$lib/writable/navigation';
	import Quizz from '$lib/components/quizz/quizz.svelte';
    let div:HTMLDivElement
    let crd_val
    let cur_date_time=''
    let width
    let nav_mb=false,nav_mb_div
    width_val.subscribe((val)=>{
        width=val
    })
    let write_val
    write.subscribe((val)=>{
        write_val=val
    })
    let obj={
        home:true,
        take:false,
        conduct:false,
        quizz:false
    }
    nav_bar.subscribe((val)=>{
        obj=val
    })
    onMount(async()=>{
        crd.subscribe((val)=>{
            crd_val=val
            if(val.key==''||val.username==''){
                notification.set({msg:'Login first',on:true})
                goto('/')
            }
        })
        let res=await fetch('/home/getdata',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({crd:crd_val.key,id:crd_val.username})
        })
        let result=await res.json()
        if(result.status=='body'||result.status=='dberr'){
            return
        }
        if(result.status=='auth'){
            notification.set({msg:'Seems you have logged out',on:true})
            return
        }
        details.set(result.data[0])
        console.log($details)
    })
</script>

{#if width>720}
<div class="home_main">
    <NavbarHome data='20%' on:navigate={(data)=>{
        if(write_val.started){
            //
        }
        for(let i of Object.keys(obj)){
            obj[i]=false
        }
        obj[data.detail]=true
        nav_bar.set(obj);
    }}></NavbarHome>
    <div class="content">
        <HeadingHome on:nav_on={()=>{
            nav_mb=true
        }}></HeadingHome>
        {#if obj.home}
            <Home></Home>
        {/if}
        {#if obj.conduct}
            <Conduct></Conduct>
        {/if}
        {#if obj.take}
            <Take></Take>
        {/if}
        {#if obj.quizz}
            <Quizz></Quizz>
        {/if}
    </div>
</div>

{:else}
    <div class="home_main_w">
        <HeadingHome on:nav_on={()=>{
            console.log('xxx')
            nav_mb=true
        }}></HeadingHome>
        <div class="content_mb">
            {#if obj.home}
            <Home></Home>
        {/if}
        {#if obj.conduct}
            <Conduct></Conduct>
        {/if}
        {#if obj.take}
            <Take></Take>
        {/if}
        </div>
    </div>
{/if}

{#if nav_mb &&width<720}
    <div class="nav_mb" bind:this={nav_mb_div} on:click={()=>{
        
    }}>
        <NavbarHome data='50%' on:logo_click={()=>{nav_mb=false}} on:navigate={(data)=>{
            for(let i of Object.keys(obj)){
            obj[i]=false
        }
            obj[data.detail]=true
            nav_mb=false
            nav_bar.set(obj);
        }}></NavbarHome>
    </div>
{/if}


<style>
    .home_main{
        height: 100vh;
        width: 100vw;
        overflow: scroll;
        background-color: aliceblue;
        display: flex;
        padding: 10px;
    }
    .home_main::-webkit-scrollbar{
        display: none;
    }
    .content{
        height: 100%;
        width: 80%;
        margin-left: 10px;
        border-radius: 5px;
        background-color: rgba(96, 96, 253, 0.488);
        padding: 10px;
        overflow: scroll;
    }
    .content::-webkit-scrollbar{
        display: none;
    }
    .home_main_w{
        height: 100vh;
        width: 100vw;
        overflow: scroll;
        background-color: aliceblue;
        padding: 10px;
    }
    .content_mb{
        height: 89%;
        width: 100%;
        margin-top: 10px;
        border-radius: 5px;
        background-color: rgba(96, 96, 253, 0.488);
        padding: 5px;
        overflow: scroll;
    }
    .content_mb::-webkit-scrollbar{
        display: none;
    }
    .nav_mb{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.256);
        backdrop-filter: blur(3px);
    }
</style>