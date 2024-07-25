<script>
	import Select, { Option } from "@smui/select";
	import Switch from "@smui/switch";
	import { afterUpdate } from "svelte";
    import {gsap} from 'gsap'
	import { crd } from "$lib/writable/crd";
	import { notification } from "$lib/writable/notification";
	import { share_open } from "$lib/writable/share";

    export let data

    let setobj={
        duration: 1,
        e_type: "1",
        islimit: false,
        level: "easy",
        limit: 10,
        retake: "0",
        strict: false,
        type: "MCQ", 
    }
    afterUpdate(()=>{
        if(!data)return
        setobj=data.settings
    })
    async function create_quizz(){
        let res=await fetch('/home/new_conduct',{
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({id:$crd.username,crd:$crd.key,data:{
                        settings:setobj,
                        title:{title:data.title,desc:data.Desc},
                        qns:data.qns
                    }})
                })
                let result=await res.json()
                console.log(result);
                if(result.status!='done'){
                    notification.set({msg:'somethingwent wrong',on:true})
                    return
                }
                share_open.set({data:{id:result.id,qr:result.qr},state:true})
    }
    let abs_div,view_qns=false
    $:{
        if(abs_div){
            gsap.from(abs_div,{scale:0,duration:.5})
        }
    }
</script>

{#if data}
    <div class="h-full w-full p-4 overflow-scroll relative">
        <h3 class="h-[30px] grid place-items-center text-xl">{data.title}</h3>
        <div class="mt-1">
            <p>Description : {data.Desc}</p>
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
            <div class="duration flex items-center mt-5" >
                <p>Quizz Type</p>
                <Select class="select_entry" bind:value={setobj.type}>
                    <Option value='MCQ'>MCQ</Option>
                </Select>
            </div>
        </div>
        <div class="flex justify-around mt-3">
            <button class="h-[40px] w-32 bg-blue-500" on:click={()=>{
                view_qns=true
            }}>View Questions</button>
            <button on:click={async()=>{
                await create_quizz()
            }}>Create Quizz</button>
        </div>
        {#if view_qns}
        <div class="absolute top-0 left-0 view_ans overflow-scroll bg-slate-200" bind:this={abs_div}>
            <button on:click={()=>{
                    gsap.to(abs_div,{scale:0,duration:.5,onComplete:()=>{view_qns=false}})
                }} class='h-10 w-10 bg-red-700 grid place-items-center'>
                <img src="/arrow-button.png" class="h-8" alt="">
            </button>
            <div>
                {#each data.qns as qn,i}
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
                            <p>Answer : <strong>{qn.ans}</strong></p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        {/if}
    </div>
{:else}
    <div class="h-full w-full grid place-items-center">
        Select Quiz to display
    </div>
{/if}