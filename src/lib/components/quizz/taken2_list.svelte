<script>
	import { afterUpdate, createEventDispatcher } from "svelte";

    export let list=[]
    let obj={}
    for(let i=0;i<list.length;i++){
        obj[`${i}`]='none'
    }
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
        
    })
</script>


<div class="overflow-scroll h-full w-full">
    <div class="ctn">
        {#if list.length==0}
            <div class="grid place-items-center h-full w-full">
                <p>Select from Board1</p>
            </div>
        {/if}
        {#each list as item,i}
            <div class="grid place-items-center">
                <div on:click={()=>{
                    disp('change',i)
                    change_item(`${i}`)
                }} class='{obj[`${i}`]} card'>
                <p>Attempt-{i+1}</p>
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