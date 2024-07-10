<script lang="ts">
	import { details } from "$lib/writable/crd";
	import { onMount ,createEventDispatcher} from "svelte";
    import {gsap} from 'gsap'
	import { width_val } from "$lib/writable/loading";
    let user_details,main_div,cur_date_time,width,profile_pic
    const disp=createEventDispatcher()
    details.subscribe((val)=>{
        user_details=val
        if(user_details.hasOwnProperty('profile_pic'))
            profile_pic=true        
    })
    width_val.subscribe((val)=>{
        width=val
    })
    onMount(async()=>{
        //fecth time
        try {
            let res=await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
            if(!res.ok) throw new Error('error')
            let result=await res.json()
            let date=new Date(result.datetime)
            cur_date_time=date.toLocaleDateString()
        } catch (error) {
            let date2=new Date()
            cur_date_time=date2.toLocaleDateString()
        }
    })
    $:{
        if(main_div) gsap.fromTo(main_div,{width:'0%'},{width:'100%'})
    }
</script>

{#if width>720}
<div class="themain animate__bounceIn animate__animated" bind:this={main_div}>
    <div class="greet">
        <p>Welcome</p>
        <h2>{user_details.username}</h2>
    </div>
    <div class="date">
    <p>{cur_date_time}</p>
    </div>
    <div class="search">
        <img src="/search.png" alt="">
        <input type="text" placeholder="search here">
    </div>
    <div class="profile" bind:this={profile_pic}>
       {@html user_details.profile}
    </div>
</div>
{:else}

<div class="themain_mb animate__bounceIn animate__animated" bind:this={main_div}>
    <div class="menu" on:click={()=>{
        disp('nav_on')
    }}>
        <img src="/menu.png" alt="">
    </div>
    {#if width>400}
        <div class="greet">
            <p>Welcome</p>
            <h2>{user_details.username}</h2>
        </div>
    {/if}
    <div class="search">
        <img src="/search.png" alt="">
        {#if width<400||width>720}
            <input type="text" placeholder="search here">
        {/if}
    </div>
    <div class="profile" bind:this={profile_pic}>
        {@html user_details.profile}
    </div>
</div>
{/if}


<style>
    .menu{
        background-color: rgba(240, 248, 255, 0.712);
        border-radius: 5px;
    }
    .menu img{
        height: 30px;
    }
    .themain{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    /* .profile{
        
        margin-left: auto;
    } */
    :global(.profile svg){
        height: 50px;
        width: 50px;
        display: grid;
        border-radius: 50%;
        place-items: center;
    }
    .search{
        display: flex;
        background-color: aliceblue;
        border-radius: 10px;
        align-items: center;
        min-height: 40px;
        min-width: 50px;
    }
    .search img{
        height:20px;
    }
    .search input{
        background-color: aliceblue;
        border: none;
        min-width: 130px;
        margin-left: 10px;
        font-size: 0.9em;
    }
    .search input:focus{
        outline: none;
    }
    .greet h2{
        margin-left: 10px;
    }
    .themain_mb{
       background-image: url(/navbg.avif);
       width: 100vw;
       height: 10%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 5px;
    }
</style>