<script>
    import {gsap} from 'gsap'
    let hover=false,p
    $:{
        if(p)
            gsap.from(p,{top:'0%',duration:1,ease:'bounce.inOut'})
    }
</script>

<div class="main" bind:this={p} on:mouseenter={()=>{
    hover=true
}} on:mouseleave={()=>{
    hover=false
}}>
    <img src="/offline.png" alt="">
    {#if hover}
        <p class="overflow-hidden">Your device is offline</p>
    {/if}
</div>

<style>
    .main{
        position: absolute;
        top: 5%;
        right: 20px;
        backdrop-filter: blur(5px);
        background-color: rgba(205, 101, 72, 0.715);
        display: flex;
        align-items: center;
        border-radius: 10px;
        /* width: 50px; */
        height: 50px;
        padding: 10px;
        overflow: hidden;
    }
    img{
        height: 40px;
    }
</style>
