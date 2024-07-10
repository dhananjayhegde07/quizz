<script>
	import { createEventDispatcher } from "svelte";

    export let list=[]
    let obj={}
    for(let i of list){
        obj[i.q_id]='none'
    }
    let disp=createEventDispatcher()

    function change_item(id){
        for(let i of Object.keys(obj)){
            obj[i]='none'
        }
        obj[id]='selected'
    }
    let search_show=false
</script>


<div class="overflow-scroll h-full w-full">
    <div class="nav">
        <p class="w-1/2">Borad-1</p>
        <div class="nav_div relative flex items-center justify-end w-1/2 {search_show?'search':''}">
            <img src="/search.png" alt="" class="h-6" on:click={()=>{search_show=!search_show}}>
            {#if search_show}
                <div class="absolute top-0 left-0">
                    <input type="text" placeholder="type here">
                </div>
            {/if}
        </div>
    </div>
    <div class="ctn">
        {#if list.length==0}
            <div class="grid place-items-center">
                <p>No Quizz to display</p>
            </div>
        {/if}
        {#each list as item}
            <div class="grid place-items-center">
                <div on:click={()=>{
                    disp('change',item.q_id)
                    change_item(item.q_id)
                }} class='{obj[item.q_id]} card'>
                <p>{item.q_id}</p>
                <p>{item.count}</p>
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
    .search input{
        border-radius: 5px;
        background-color: aliceblue;
        padding-left: 10px;
        height: 100%;
    }
    .search input:focus{
        outline: none;
    }
    .ctn{
        height: 90%;
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