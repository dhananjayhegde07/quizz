<script>
	import Circular from "$lib/extra/circular.svelte";
	import Circular_2 from "$lib/extra/circular_2.svelte";
import { crd } from "$lib/writable/crd";
	import { reports } from "$lib/writable/data";
    import { width_val } from "$lib/writable/loading";
	import { onMount } from "svelte";
    let width,width_div='45%'
    width_val.subscribe((val)=>{
        width=val
        if(width<500){
            width_div='100%'
        }
        else{
            width_div='45%'
        }
    })
    let data,err=false
    reports.subscribe((val)=>{
        data=val.data
        if(val.fetched)return
        get_reports()
    })
    onMount(async()=>{
        
    })
    async function get_reports(){
        let data=await fetch('/others/get_reports',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:$crd.username,crd:$crd.key})
        })
        let res=await data.json()
        if(res.status!='done'){
            err=true
            return
        }
        reports.set({fetched:true,data:res.data})
        err=false
    }
</script>

<div class="main" style="width: {width_div};">
    {#if err}
        <div class="h-full w-full grid place-items-center">
            <p>Unable to fetch</p>
        </div>
    {/if}
    <div class="grid place-items-center">
        <div>
            <p>Average score</p>
            <Circular progress={data.avg}></Circular>
        </div>
    </div>

    <div class="flex mt-3 justify-around">
        <div class="">
            <p>Highest score</p>
            <Circular_2 stroke={'green'} text={data.high}></Circular_2>
        </div>
        <div class="">
            <p>Lowest score</p>
            <Circular_2 stroke={'red'} text={data.low}></Circular_2>
        </div>
    </div>
</div>

<style>
    .main{
        height: 300px;
        /* width: 45%; */
        background-color: aliceblue;
        border-radius: 5px;
        margin-top: 10px;
    }
</style>