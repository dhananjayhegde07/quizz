<script>
	import { afterUpdate, createEventDispatcher } from "svelte";

    export let data=[]
    let obj={}
    let disp=createEventDispatcher()

    function change_item(id){
        for(let i of Object.keys(obj)){
            obj[i]='none'
        }
        obj[id]='selected'
        console.log(obj);
    }
    let search_show=false
    afterUpdate(()=>{
        for(let i=0;i<data.length;i++){
        obj[`${i}`]='none'
    }
    })
</script>


<div class="overflow-scroll h-full w-full bg-slate-200">
    <div class="ctn">
        {#if data.length==0}
            <div class="grid place-items-center h-full w-full">
                <p>Select from Board1</p>
            </div>
        {/if}
        {#each data as item,i}
            <div class="grid place-items-center">
                <div on:click={()=>{
                    disp('change',i)
                    change_item(`${i}`)
                }} class='{obj[`${i}`]} card'>
                <p>Quizz-{i+1}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .selected{
        outline: 2px solid green;
    }
    .nav{
        height: 10%;
        display: flex;
        background-color: cadetblue;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        align-items: center;
    }
    .search{
        background-color: aliceblue;
        border-radius: 5px;
        height: 90%;
    }
    .ctn{
        height: 100%;
        width: 100%;
        display: grid;
        grid-auto-rows: 80px;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .card{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 70%;
        background-color: aliceblue;
        height: 40px;
        border-radius: 5px;
        padding: 0px 10px;
    }
</style>