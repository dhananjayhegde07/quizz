<script>
	import Circular_2 from "$lib/extra/circular_2.svelte";
    import Circular from "$lib/extra/circular.svelte";

    import { afterUpdate, onMount } from "svelte";
	import { crd } from "$lib/writable/crd";
    import {gsap} from 'gsap'

    export let item={}
    export let item2={}
    afterUpdate(()=>{
        get_profile()
        console.log(item);
    })
    onMount(()=>{
        console.log(item);
        get_profile()
    })
    let profile='s'
    async function get_profile(){
        if(item2.owner==''||!item2.owner)return
        let data=await fetch('/others/the_profile',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:$crd.username,crd:$crd.key,person:item2.owner})
        })
        let pr=await data.json()
        profile=pr.profile
    }
    let view_ans=false,abs_div
    $:{
        if(abs_div){
            gsap.from(abs_div,{scale:0,duration:.5})
        }
    }

</script>



{#if Object.keys(item).length==0}
    <div class="grid place-items-center w-full h-full">
        Select from board 2
    </div>
{:else}
    <div class="overflow-scroll h-full w-full p-3 relative">
        <h3 class="h-8 grid place-items-center text-xl underline">{item.q_id}</h3>
        <div>
            <p>Submitted on: <strong>{new Date(item.submit_date).toLocaleDateString()}</strong></p>
        </div>
        <div class="mt-12">
            <div class="flex items-center justify-around">
                <Circular_2 text={`${item.marks}/${item.marks/item.percent}`} stroke={"cadetblue"}></Circular_2>
                <Circular progress={item.percent}></Circular>
            </div>
        </div>
        <div class="mt-4">
            <p>Created by</p>
            <div class="flex items-center quiz_233 ml-20 mt-4">
                {@html profile}
                <p>{item2.owner}</p>
            </div>
        </div>
        <div class="leads overflow-scroll">
            <h2 class="h-7 grid place-items-center">Top 10</h2>
            <div class="list p-3">
                <div class="list_item flex">
                    <p class="w-6">{item2.place+1}.</p>
                    <p class="the_id">Your place</p>
                    <p class="w-6">{item2.marks}</p>
                </div>
                {#each item2.top_10 as it,i}
                    <div class="list_item flex">
                        <p class="w-6">{i+1}.</p>
                        <p class="the_id">{it.id}</p>
                        <p class="w-6">{it.mark}</p>
                    </div>
                {/each}
            </div>
        </div>
        <div class="grid place-items-center mt-8">
            <button class="h-10 w-24 bg-green-600" on:click={()=>{
                view_ans=true
            }}>View quizz</button>
        </div>
        {#if view_ans}
            <div class="absolute top-0 left-0 view_ans overflow-scroll" bind:this={abs_div}>
                <button on:click={()=>{
                        gsap.to(abs_div,{scale:0,duration:.5,onComplete:()=>{view_ans=false}})
                    }} class='h-10 w-10 bg-red-700 grid place-items-center'>
                    <img src="/arrow-button.png" class="h-8" alt="">
                </button>
                <h2 class="text-xl grid place-items-center">{item2.title?item.title:'Title'}</h2>
                <div class="mt-8 mb-8">
                    <p>{item2.desc?item2.desc:'Description'}</p>
                </div>
                <div>
                    {#each item2.qns as qn,i}
                        <div>
                            <div class="h-10 w-full bg-blue-500 flex items-center">
                                <p>Qestion {Number(qn.id)+1}</p>
                            </div>
                            <div class="p-3">
                                <p>{qn.qn}</p>
                                <div>
                                    {#each qn.opt as opt}
                                        <p>{opt}</p>
                                    {/each}
                                </div>
                            </div>
                            <div>
                                
                                    {#if item.ans.filter((val)=>val.id==qn.id).length!=0}
                                    <p>Your answer: <strong class="ml-4">{item.ans.filter((val)=>val.id==qn.id)[0].ans}</strong></p>
                                    {:else}
                                        <p><strong>Not attempted</strong></p>
                                    {/if}
                
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

        {/if}
    </div>
{/if}


<style>
    .view_ans{
        height: 100%;
        width: 100%;
        background-color: aliceblue;
    }
    .the_id{
        width: calc(100% - 48px);
    }
    .list div{
        display: flex;
        align-items: center;
    }
    .list_item{
        background-color: aliceblue;
        border-radius: 5px;
        height: 40px;
        margin: 10px 0px;
    }
    p{
        height: 30px;
        /* padding-left: 10px; */
        font-size: 1.1em;
    }
    :global(.quiz_233 svg){
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
    .leads{
        width: 100%;
        height: 300px;
        background-color: rgba(240, 248, 255, 0.326);
        margin-top: 20px;
        border: 1px solid black;
    }
</style>