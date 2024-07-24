<script>
	import { afterUpdate, createEventDispatcher } from "svelte";
    import Select,{Option} from '@smui/select'
    import Switch from '@smui/switch';
	import { crd } from "$lib/writable/crd";
	import { notification } from "$lib/writable/notification";
	import { conduct_data, update_conduct_data } from "$lib/writable/data";
    import {gsap} from 'gsap'
	import Result from "postcss/lib/result";
    export let data={}
    export let is_lead
    let disp=createEventDispatcher()
    let setobj={
        duration: 1,
        e_type: "3",
        islimit: false,
        level: "easy",
        limit: 10,
        retake: "0",
        strict: false,
        type: "MCQ", 
    }
    let is_open=true,lead=false
    let sorted,d_m='pdf'
    let abs_div
    afterUpdate(()=>{
        if(is_lead){
            lead=true
        }
        console.log(data);
        if(data.settings){
            setobj=data.settings
            sorted=data.taken.sort((a,b)=>a.result-b.result)
            is_open=data.is_open
        }
    })

    async function download_file(){
        let res=await fetch('/others/file_download',{
            method:'POST',
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({id:$crd.username,crd:$crd.key,lolo_id:data.q_id,type:d_m})
        })
        let result=await res.json()
        let response=await fetch(result.url)
        let file=await response.blob()
        console.log(file);
        let url=URL.createObjectURL(file)
        let a=document.createElement('a')
        a.href=url
        if(d_m=='pdf'){
            a.download=`${data.q_id}.pdf`
        }
        else{
            a.download=`${data.q_id}.xlsx`
        }
        a.click()
        URL.revokeObjectURL(url)
    }
    const updatesetting=async()=>{
        let result=await fetch('/others/update_setting',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                id:$crd.username,crd:$crd.key,
                lolo_id:data.q_id,
                is_open:is_open,
                settings:setobj
            })
        })
        let res=await result.json()
        if(res.status!='done'){
            notification.set({msg:'Something went wrong',on:true})
            return
        }
        $update_conduct_data()
        notification.set({msg:'Updated successfully',on:true})
    }
    
</script>

{#if Object.keys(data).length!=0}
<div class="w-full h-screen overflow-y-scroll relative">
    <h1 class="grid place-items-center text-xl h-10">{data.q_id}</h1>
    <div class="to_disp_svg grid place-items-center">
        {@html data.qr}
    </div>
    <div class="p-3 text-lg ">
        <div>
            <p>Created on : <strong>{new Date(data.date).toLocaleDateString()}</strong></p>
        </div>
        <div class="flex items-center">
            <p>Is Open? </p>
            <Switch bind:checked={is_open} on:input={updatesetting}></Switch>
        </div>
    </div>
    <div class="p-4">
        <h1 class="underline text-lg grid place-items-center bg-blue-500">Settings</h1>
        <div>
            <div class="duration flex items-center mt-5">
                <p>Duration(Hours):</p>
                <input type="number" bind:value={setobj.duration}>
            </div>
            <div class="some_param flex items-center mt-5" >
                <p>Entry Type:</p>
                <Select class="select_entry" bind:value={setobj.e_type}>
                    <Option value='1'>Anyone</Option>
                    <Option value='2'>Anyone and inform</Option>
                    <Option value='3'>Ask permission</Option>
                </Select>
            </div>
        </div>
        <div>
            <div class="duration flex items-center mt-5">
                <p>Participants limit?</p>
                <Switch bind:checked={setobj.islimit}></Switch>
                <input type="number" bind:value={setobj.limit}>
            </div>
            <div class="some_param flex items-center mt-5">
                <p>Retakes:</p>
                <Select class="select_entry" bind:value={setobj.retake}>
                    <Option value="0">0</Option>
                    <Option value='1'>1</Option>
                    <Option value='2'>2</Option>
                    <Option value='3'>3</Option>
                    <Option value='4'>4</Option>
                    <Option value='-1'>Any</Option>
                </Select>
            </div>
        </div>
        <div>
            <div class="flex items-center mt-5">
                <p>Strict mode?</p>
                <Switch bind:checked={setobj.strict}></Switch>
            </div>
            <div class="some_param flex items-center mt-5" >
                <p>Quizz level:</p>
                <Select class="select_entry" bind:value={setobj.level}>
                    <Option value="easy">Easy</Option>
                    <Option value='medium'>Medium</Option>
                    <Option value='hard'>Hard</Option>
                </Select>
            </div>
        </div>
        <div >
            <div class="duration flex items-center mt-5" >
                <p>Quizz Type</p>
                <Select class="select_entry" bind:value={setobj.type}>
                    <Option value='MCQ'>MCQ</Option>
                </Select>
            </div>
        </div>
        <div class="p-5 flex items-center justify-around">
            <button class="min-h-8 w-24 bg-green-600" on:click={updatesetting}>Update</button>
            <button class="min-h-8 p-2 bg-green-600" on:click={()=>{
                lead=true
            }}>View leaderboard</button>
        </div>
    </div>
    <div class="">
        <p class="underline text-lg grid place-items-center bg-blue-500">Others</p>
        <div class="mt-5">
            <Select class='select_entry' bind:value={d_m}>
                <Option value='pdf'>PDF</Option>
                <Option value='xl'>XL Sheet</Option>
            </Select>
            <button class="min-h-8 p-2 bg-green-600" on:click={()=>{
                download_file()
            }}>Download result</button>
        </div>
    </div>
    <div>
        <button class="w-full h-9 bg-red-500 m-5" on:click={async()=>{
            let result=await fetch('/others/delete_conduct',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                id:$crd.username,crd:$crd.key,
                lolo_id:data.q_id,
            })
        })
        let res=await result.json()
        if(res.status!='done'){
            notification.set({msg:'Something went wrong',on:true})
            return
        }
        notification.set({msg:'Deleted successfully',on:true})
        disp('relaod')
        }}>Delete all data</button>
    </div>
    {#if lead}
    <div class="absolute top-0 left-0 view_ans overflow-scroll" bind:this={abs_div}>
                <button on:click={()=>{
                        gsap.to(abs_div,{scale:0,duration:.5,onComplete:()=>{lead=false}})
                    }} class='h-10 w-10 bg-red-700 grid place-items-center'>
                    <img src="/arrow-button.png" class="h-8" alt="">
                </button>
                <h2 class="text-xl grid place-items-center">{data.title?data.title.title:'Title'}</h2>
                <div class="mt-8 mb-8">
                    <p>{data.title?data.title.desc:'Description'}</p>
                </div>
                <div class="w-full">
                    <h2 class="w-full bg-blue-700 h-9 grid place-items-center text-xl" style="color: aliceblue;">Leaderboard</h2>
                    <div class="flex min-h-14">
                        <p class="place">Place</p>
                        <p class="id">ID</p>
                        <p class="marks">Marks</p>
                    </div>
                    <div class="" style="border-bottom: 1px solid black;"></div>
                    {#each sorted as t,i}
                        <div class="flex min-h-14">
                            <p class="place">{i+1}</p>
                            <p class="id">{t.email}</p>
                            <p class="marks">{t.result}</p>
                        </div>
                    {/each}
                </div>
    </div>
{/if}
</div>


{:else}
    <div>
        Select from Board 1
    </div>
{/if}





<style>
    .place{
        width: 10%;
        display: grid;;
        place-items: center;
    }
    .id{
        width: 90%;
        display: grid;;
        place-items: center;
    }
    .marks{
        width: 10%;
        display: grid;;
        place-items: center;
    }
    :global(.to_disp_svg svg){
        width: 350px;
    }
    input{
        height: 30px;
        margin-left: 10px;
        border-radius: 5px;
    }
    .view_ans{
        width: 100%;
        height: 200vh;
        background-color: aliceblue;
    }
</style>