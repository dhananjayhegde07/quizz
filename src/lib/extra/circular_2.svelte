<script>
    import {gsap} from 'gsap'
    export let size=100;
    export let stroke='green'
    export let text=''
    export let stroke_val=5
    let radius=(size/2)-stroke_val
    let str_arr=2*Math.PI*(size/2);
    let circle
    $:{
        if(circle){
            gsap.to(circle,{strokeDashoffset:0,duration:1,ease:'circ.inOut'})
        }
    }
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
            stroke={stroke}
            stroke-dashoffset={0}
            fill='none'
            />
            <text
                x={radius+stroke_val}
                y={radius+stroke_val}
                text-anchor='middle'
                dominant-baseline='middle'
            >
            {text}</text>
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