<script>
	import Circular from "$lib/extra/circular.svelte";
	import Circular_2 from "$lib/extra/circular_2.svelte";
    import { afterUpdate } from "svelte";
	import LoadingAuto from "./loading_auto.svelte";
	import { crd } from "$lib/writable/crd";
    import {notification} from '$lib/writable/notification'
    export let data={}
    export let auth=true
    let avg=0,low,high=0
    function calc(){
        if(Object.keys(data).length==0)return
        let res=0,low=data.taken[0].result
        for(let i of data.taken){
            res+=(i.result)/data.qns.length
            if(i.result>high)high=i.result
            if(i.result<low)low=i.result
        }
        avg=res/data.taken.length
    }
    async function getauthkey(){
        is_auth=true
        let result=await fetch('/quizz/get_authority_id',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:$crd.username,crd:$crd.username,lolo_id:data.q_id })
        })
        let res=await result.json()
        console.log(res);
        is_auth=false
        if(res.status=='gen'){
            return
        }
        if(res.status!='done'){
            authkey='err'
            return
        }
        authkey=res.key
    }
    afterUpdate(async()=>{
        calc()
    })
    let is_auth=false
    let authkey='',get_auth=false,gensuth_arr=[]
    let gen_auth_res='Auth_'
    $:{
        if(data.q_id){
            getauthkey()
        }
    }
</script>

{#if Object.keys(data).length!=0 &&!get_auth}
    <div class=" flex flex-col justify-evenly h-full">
        <div class="flex items-center justify-around">
            <div class="flex-row items-center">
                <p>Average Score</p>
                <Circular progress={avg}></Circular>
            </div>
            <div>
                <p>Total Count</p>
                <Circular_2 text={`${data.count}`}></Circular_2>
            </div>
        </div>
        <div class="flex items-center justify-around ">
            <div>
                <p>Highest score</p>
                <Circular_2 text={`${high}`} ></Circular_2>
            </div>
            <div>
                <p>Lowest Score</p>
                <Circular_2 text={`${low}`} stroke={'red'}></Circular_2>
            </div>
        </div>
        {#if auth}
        <div class=" relative">
            <h2 class="grid place-items-center text-xl underline">Authority key</h2>
            <LoadingAuto on={is_auth}></LoadingAuto>
            {#if authkey==''}
                <div>
                    <p class="p-3">Authority key is not generated for this Quizz</p>
                    <div class="pl-8">
                        <button class="h-8 w-24 bg-green-300" on:click={()=>{
                            get_auth=true
                        }}>Generate</button>
                    </div>
                </div>
                {:else}
                <div>
                    <div class="flex items-center m-3">
                        <p class="w-[75%] h-11 p-1 pt-2 self-center overflow-scroll bg-white">{authkey}</p>
                        <button class="w-[25%]" on:click={async()=>{
                            await navigator.clipboard.writeText(authkey)
                            notification.set({msg:'Copied to clipborad',on:true})
                        }}>Copy</button>
                    </div>
                    <button class="h-8 w-24 bg-green-300 ml-7" on:click={()=>{get_auth=true}}>Change</button>
                </div>
            {/if}
            {#if authkey=='err'}
                <div class="grid place-items-center">
                    Something went wrong
                </div>
            {/if}
        </div>
        {/if}
    </div>
    {:else if get_auth}
        <div class="relative h-full w-full bg-blue-200">
            <p class="p-3 grid place-items-center">Move the mouse in white area to generated A key</p>
            <div class="p-3 w-full h-[60%]  bg-slate-100" on:mousemove={(e)=>{
                if(gensuth_arr.length>300){
                    let x=gensuth_arr[Math.floor(Math.random()*300)]
                    gen_auth_res+=x
                    gensuth_arr=[]
                    return
                }
                gensuth_arr.push(e.clientX)
                gensuth_arr.push(e.clientY)
            }}>
            </div>
            <div class="pt-3 pl-3 flex">
                <p>Key : </p>
                <p>{gen_auth_res}</p>
            </div>
            <div class="flex justify-center w-full pt-4">
                <button class="h-8 w-24 bg-green-300" on:click={async()=>{
                    if(gen_auth_res=='Auth_')return
                    let result=await fetch('/quizz/change_authority',{
                            method:'POST',
                            headers:{'Content-Type':'application/json'},
                            body:JSON.stringify({id:$crd.username,crd:$crd.username,lolo_id:data.q_id,authkey:gen_auth_res })
                    })
                    let res=await result.json()
                    console.log(res);
                    
                    if (res.status!='done') {
                        notification.set({msg:'something went wrong',on:true})
                        return
                    }
                    notification.set({msg:'Updated',on:true})
                    getauthkey()
                    get_auth=false
                }}>Generate</button>
                <button class="h-8 w-24 bg-green-300 ml-5" on:click={()=>{get_auth=false}}>Cancel</button>
            </div>
        </div>
    {:else}
        <div class="h-full w-full grid place-items-center">
            Select from board 1
        </div>
{/if}

<style>

</style>