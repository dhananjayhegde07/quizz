<script>
	import { details } from "$lib/writable/crd";
	import { width_val } from "$lib/writable/loading";
    import {gsap} from 'gsap'

    let details_val,show=false,width
    let height='150px'
    let abs='active'
    width_val.subscribe((val)=>{
        width=val
        if(val<900) height='100px'
        else height='150px'
    })
    details.subscribe((val)=>{
        if(!val.hasOwnProperty('taken')) return
        details_val={taken:val.taken,host:val.host}
        show=true
    })
    let div1,div2
    $:{
        if(div1&&div2){
            gsap.from('.outer',{width:'0%',duration:1})
        }
    }
</script>

<div class="main">
    {#if show}
    <div class="sub">
        <div class="outer" bind:this={div1} style="height: {height}; width:{height}">
            <div class="inner">
                <p>{details_val.taken}</p>
            </div>
        </div>
        <p>Test taken</p>
    </div>
    <div class="sub">
        <div class="outer" bind:this={div2} style="height: {height}; width:{height}">
            <div class="inner">
                <p>{details_val.host}</p>
            </div>
        </div>
        <p>Test Hosted</p>
    </div>
    {/if}
    
</div>

<style>
    .main{
        height: 300px;
        width: 45%;
        background-color: aliceblue;
        border-radius: 5px;
        display: flex;
        user-select: none;
    }
    .sub{
        height: 100%;
        width: 50%; 
        display: grid;
        place-items: center;
    }
    .outer{
        background-color: green;
        border-radius: 50%;
        display: grid;
        place-items: center;
    }
    .inner{
        height: 90%;
        width: 90%;
        background-color: whitesmoke;
        border-radius: 50%;
        display: grid;
        place-items: center;
    }
    p{
        margin-top: 0px;
    }
</style>



