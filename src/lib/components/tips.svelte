<script>
    import { details } from "$lib/writable/crd";
    import {gsap} from 'gsap'
    let details_val=[],show=false
    let div1,i=0
    details.subscribe((val)=>{
        if(!val.hasOwnProperty('tips')) return
        let keys=Object.keys(val.tips)
        details_val.push({val1:val.tips.qn.qs,val2:`Answer:${val.tips.qn.ans}`})
        details_val.push({val1:val.tips.advice,val2:''})
        details_val.push({val1:val.tips.joke,val2:''})
        show=true
    })
    $:{
        if(div1){
            gsap.from(div1,{x:'100%',duration:1,repeat:-1,repeatDelay:3,onRepeat:()=>{
                updateval()
            }})
        }
    }

    function updateval(){
        i=(i+1)%(details_val.length)
    }
</script>

<div class="tip_main">
    <div class="overley">
        {#if show}
        <div bind:this={div1}>
            <p class="val1">{details_val[i].val1}</p>
            <p>{details_val[i].val2}</p>
        </div>
    {/if}
    </div>
</div>

<style>
    .tip_main{
        height: 30vh;
        background-color: aliceblue;
        width: 100%;
        margin-top: 10px;
        border-radius: 5px;
        background-image: url(/tips.avif);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0%;
        color: white;
    }
    .overley{
        height: 100%;
        width: 100%;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.637);
        display: grid;
        place-items: center;
        padding: 10px;
        overflow: scroll;
    }
    .overley::-webkit-scrollbar{
        display: none;
    }
    .tip_main div .val1{
        font-size: 1.5em;
    }
</style>