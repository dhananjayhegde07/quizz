<script lang="ts">
	import Login from "$lib/login.svelte";
    import { onMount } from "svelte";
	import Register from "$lib/register.svelte";
    import {gsap} from 'gsap'
    let width:number;
    let reg=false,i=1
    let text_arr=['Conduct QUIZZ','Attend QUIZZ',"Good Experience"]
    let text_ele=text_arr[0]
    let is_show=false
    let h3,mainbg

    //animations
    $:{
        if(h3){
            gsap.from(h3,{x:'100%',duration:'2',ease:'power4',repeatDelay:2, repeat:-1,onRepeat:function(){
                changeh3()
            }})
        }
    }
    //animation end
    function changeh3(){
        text_ele=text_arr[i];
            if(i==2)i=0
            else i++
    }
    onMount(()=>{
        gsap.to(mainbg,{
        duration: 5,
        backgroundPosition: '100% 100%',
        ease: 'linear',
        repeat: -1,
        repeatDelay: 2,
        yoyo: true,
        });
        document.title='Login/Register'
        width=window.innerWidth
        window.addEventListener('resize',()=>{
            width=window.innerWidth
            if(width<810){
                is_show=true
            }
            else{
                is_show=false
            }
        })
        setInterval(()=>{
            
        },2000)
    })
</script>
<div class="main" bind:this={mainbg}>
    <div class="sub_main">
        {#if !reg}
            <Login width={width} is_show={is_show} on:reg={()=>{
                reg=true
            }}></Login>
        {:else}
            <Register width={width} is_show={is_show} on:log={()=>{
                reg=false
            }}></Register>
        {/if}
    </div>
    {#if width > 810}
        <div class="sub_main">
        <div>
            <h1>Welcome backk!!</h1>
            <h2>Its QUIZZ time!!!</h2>
            <img src="/logo.png" alt="" on:load={()=>{console.log('loaded');
            }}>
            <h3 bind:this={h3} style="">{text_ele}</h3>
        </div>
    </div>
        
    {/if}
</div>


<style>
    .main{
        height: 100vh;
        width: 100vw;
        background-image: linear-gradient(to right,blue,white);
        background-size: 200% 200%;
        overflow: scroll;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main::-webkit-scrollbar{
        display: none;
    }
    .sub_main{
        height: 100%;
        width: 50%;
        min-width: 400px;
        display: grid;
        place-items: center;
    }
    .sub_main img{
        height: 200px;
        border-radius: 5px;
    }
    .sub_main h2{
        display: grid;
        place-items: center;
        font-size: 1.8em;
    }
    .sub_main h3{
        font-size: larger;
    }
    .sub_main h1{
        display: grid;
        place-items: center;
        font-size: 2em;
    }
</style>