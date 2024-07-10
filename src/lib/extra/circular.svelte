<script>
    import {gsap} from 'gsap'
	import { afterUpdate } from 'svelte';
    export let size=100;
    export let progress=1;
    export let stroke_val=5
    let radius,str_arr,circle,show=true,offset
    function init(){
        radius=(size/2)-stroke_val
        str_arr=2*Math.PI*(size/2);
        offset=str_arr*(1-progress)
    }
    init()
    $:{
        if(circle){
            gsap.from(circle,{strokeDashoffset:0,duration:1,ease:'circ.inOut'})
        }
    }
    let fill='green'
    if(progress<0.6){
        fill='red'
    }
    afterUpdate(()=>{
        if(progress<0.6){
            fill='red'
        }
        init()
        if(circle){
            gsap.to(circle,{strokeDashoffset:offset,duration:1,ease:'circ.inOut'})
        }
    })
</script>



<div class="main">
    <div class="relative">
        <svg  style="width:{size}px; height:{size}px">
            <circle bind:this={circle}
            cx={size/2}
            cy={size/2}
            r={radius}
            stroke-width={`${stroke_val}px`}
            stroke-dasharray={str_arr}
            stroke={fill}
            stroke-dashoffset={offset}
            fill='none'
            />
            <text
                x={radius+stroke_val}
                y={radius+stroke_val}
                text-anchor='middle'
                dominant-baseline='middle'
            >
            {Math.floor(progress*100)}%</text>
        </svg>
    </div>
</div>


<style>
    circle{
        transform: rotate(-90deg);
        transform-origin: center;
        stroke-width: 5px;
        stroke-linecap: round;
        /* stroke-dasharray:50px ; */
        /* stroke-dashoffset: ; */
        box-shadow: 2px 2px 5px black;
    }
</style>