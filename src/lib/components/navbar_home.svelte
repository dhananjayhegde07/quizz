<script lang="ts">
    import {details} from '$lib/writable/crd'
	import { onMount,createEventDispatcher } from 'svelte';
    import {gsap} from 'gsap'
    const disp=createEventDispatcher()
    export let data;
    let animate_div;
    onMount(()=>{
        gsap.to(animate_div,{backgroundPosition:'20% 20%',repeat:-1,duration:10,ease:'power4.inOut',yoyo:true})
    })

    let obj={
        1:"active",
        2:'notactive',
        3:'notactive',
        4:'notactive'
    }
    let nav_obj={
        div1:null,
        div2:null,
        div3:null,
        div4:null
    }

    $:{
        if(nav_obj.div1){
            gsap.to(nav_obj.div1,{x:'0%',duration:1})
        }
    }
    function change_mode(val,d){
        let keys=Object.keys(obj)
        for(let i of keys){
            obj[i]='notactive'
        }
        obj[val]='active'
        gsap.from('.active',{x:'0%',duration:.5})
        gsap.from(d,{x:'50%',duration:.5})
    }
</script>


<div class="bg" bind:this={animate_div} style="width: {data};" >
    <div class="overlay">
        <div class="lolo animate__bounceIn animate__animated" on:click={()=>{disp("logo_click")}}>
            <img src="/log_1.png" alt="">
            <p>LOLO quizz</p>
        </div>
        <div class="menu {obj['1']}" on:click={()=>{
            change_mode('1',nav_obj.div1)
            disp('navigate','home')
        }}>
            {#if obj['1']=='active'}
                <img src="" alt="">
            {/if}
            <p bind:this={nav_obj.div1}>Home</p>
        </div>
        <div class="menu {obj['2']}"  on:click={()=>{
            change_mode('2',nav_obj.div2)
            disp('navigate','take')
        }}>
            <p bind:this={nav_obj.div2}>Take a Quizz</p>
        </div>
        <div class="menu {obj['3']}"  on:click={()=>{
            change_mode('3',nav_obj.div3)
            disp('navigate','conduct')
        }}>
            <p bind:this={nav_obj.div3}>Conduct a Quizz</p>
        </div>
        <div class="menu {obj['4']}"  on:click={()=>{
            change_mode('4',nav_obj.div4)
            disp('navigate','quizz')
        }}>
            <p bind:this={nav_obj.div4}>Quizz</p>
        </div>
    </div>
</div>


<style>
    .bg{
        border-radius: 5px;
        height: 100%;
        /* width: 20%; */
        background-image: url(/navbg.avif);
        background-color: aliceblue;
        background-size: 120% 120%;
        z-index: 1;
    }
    .overlay{
        border-radius: 5px;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.27);
    }
    .lolo{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }
    .lolo img{
        height: 50px;
        width: 50px;
        margin:  5px;
        border-radius: 50%;
    }
    .lolo p{
        font-size: 1.2em;
        color: white;
    }
    .menu{
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 1.2em;
        padding: 10px;
        min-height: 60px;
    }
    .overlay .notactive{
        display: grid;
        place-items: center;
    }
    .active{
        background-color: rgba(240, 248, 255, 0.407);
    }
</style>