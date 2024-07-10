<script>
	import { crd } from "$lib/writable/crd";
	import { pending, update_pending } from "$lib/writable/data";
	import { width_val } from "$lib/writable/loading";
	import { onMount } from "svelte";
    let crd_val
    crd.subscribe((val)=>{
        crd_val=val
    })
    let arr=[]
    let class_val='five'
    width_val.subscribe((val)=>{
        if(val<950&& val>550){
            class_val='four'
        }
        else if(val<550&&val>=410){
            class_val='three'
        }
        else if(val<410) class_val='two'
        else class_val='five'
    })
    let err=false
    pending.subscribe(async(val)=>{
        if(!val.fetched){
            err=await $update_pending()
            return
        }
        arr=[...val.data]
        console.log(val);
    })
</script>

<div class="mainn ">
    <h2 class="h-8 w-full grid place-items-center text-xl">Pending requests</h2>
    {#if err}
        <div class="h-full w-full grid place-items-center">
            <p>Unable to fetch</p>
        </div>
    {/if}
    {#if arr.length==0}
        <div class="h-full w-full grid place-items-center">
            <p class="text-xl">no pending requests</p>
        </div>
    {/if}
    <div class="h-full w-full p-5 grid {class_val} overflow-scroll dn">
        {#each arr as data}
            <div class="card grid place-items-center text-lg">
                <p>{data.q_id}</p>
            </div>
        {/each}
    </div>
    
    
</div>

<style>
    .mainn{
        height: 300px;
        width: 100%;
        margin-top: 20px;
        background-color: rgba(240, 248, 255, 0.568);
        border-radius: 5px;
    }
    .dn{
        overflow: scroll;
    }
    .dn::-webkit-scrollbar{
        display: none;
    }
    .taken_{
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    .five{
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    .four{
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .three{
        grid-template-columns: 1fr 1fr 1fr;
    }
    .two{
        grid-template-columns: 1fr 1fr;
    }
    .card{
        background-color: aliceblue;
        width: 80%;
        border-radius: 5px;
        height: 50px;
        margin: 10px;
        /* align-items: center; */
    }
</style>