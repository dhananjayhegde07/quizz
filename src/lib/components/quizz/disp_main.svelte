<script>
	import { conduct_data, update_conduct_data } from "$lib/writable/data";
	import { mode, taken_data, update_taken_func } from "./quizz";
	import Taken1List from "./taken1_list.svelte";
    import Conduct1_list from '$lib/components/quizz/consuct1_list.svelte'
	import TodispT from "./todisp_t.svelte";
	import Taken2List from "./taken2_list.svelte";
	import Conduct2Stat from "./conduct2_stat.svelte";

    let taken,others;
    taken_data.subscribe(async(val)=>{
        if(!val.fetched){
            await $update_taken_func();
            return
        }
        taken=val.data;
        others=val.other
    })
    let conduct;
    conduct_data.subscribe(async(val)=>{
        if(!val.fetched){
            await $update_conduct_data();
            return
        }
        conduct=val.data;
    })
    let mode_val='taken'
    mode.subscribe((val)=>{
        mode_val=val
    })
    let borad2=[]
    let to_disp={},todisp2={}

    let borad2_c={}
</script>


<div class="h-full w-full main pt-5">
    <div class="board_clust">
        <div class=" w-full borad1">
            {#if mode_val=='taken'}
                <Taken1List list={taken} on:change={(data)=>{
                    let item=taken.find((val)=>val.q_id==data.detail)
                    if(item){
                        borad2_c=item.data
                    }
                    todisp2=others.find((val)=>val.q_id==data.detail)
                }}></Taken1List>
            {:else} <Conduct1_list list={conduct} on:change={(data)=>{
                let item=taken.find((val)=>val.q_id==data.detail)
                    if(item){
                        borad2_c=item
                    }
            }}></Conduct1_list>
            {/if}
        </div>
        <div class=" w-full borad2">
            {#if mode_val=='taken'}
                <Taken2List list={borad2} on:change={(data)=>{
                    to_disp=borad2[data.detail]
                }}></Taken2List>
            {:else} <Conduct2Stat></Conduct2Stat>
            {/if}
        </div>
    </div>

    <div class="middle grid place-items-center" on:click={()=>{
        if(mode_val=='taken'){
            mode.set("conduct")
            return
        }
        mode.set("taken")
    }}>
        <img src="/log_1.png" alt="" class="h-12 w-12">
    </div>

    <div class="board3 h-full w-full">
        {#if mode_val=='taken'}
                <TodispT item={to_disp} item2={todisp2} on:change={(data)=>{
                    to_disp=borad2[data.detail]
                }}></TodispT>
        {:else} <Conduct1_list></Conduct1_list>
        {/if}
    </div>
</div>


<style>
    .main{
        display: grid;
        grid-template-columns: 1fr 100px 1fr;
    }
    .middle img{
        border-radius: 50%;
    }
    .borad1{
        height: calc(50% - 5px);
        background-color: rgba(240, 248, 255, 0.403);
        border-radius: 5px;
    }
    .borad2{
        margin-top: 10px;
        height: calc(50% - 5px);
        background-color: rgba(240, 248, 255, 0.51);
        border-radius: 5px;
    }
    .board3{
        background-color: rgba(240, 248, 255, 0.478);
        border-radius: 5px;
    }
</style>