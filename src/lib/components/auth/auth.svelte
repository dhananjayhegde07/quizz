<script>
	import { notification } from "$lib/writable/notification";
	import Select, { Option } from "@smui/select";
	import Conduct2Stat from "../quizz/conduct2_stat.svelte";
	import { auth_data, get_auth_data } from "./auth";
	import Leadbord from "./leadbord.svelte";
	import Settings from "./settings.svelte";
	import { crd } from "$lib/writable/crd";
    let id='',key=''
    let data;
    auth_data.subscribe((val)=>{
        console.log(val);
        data=val
    })
    let d_m='pdf'
    async function download_file(){
        let res=await fetch('/others/file_download',{
            method:'POST',
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({id:$crd.username,crd:$crd.key,lolo_id:data.data.q_id,type:d_m})
        })
        let result=await res.json()
        let response=await fetch(result.url)
        let file=await response.blob()
        console.log(file);
        let url=URL.createObjectURL(file)
        let a=document.createElement('a')
        a.href=url
        if(d_m=='pdf'){
            a.download=`${data.data.q_id}.pdf`
        }
        else{
            a.download=`${data.data.q_id}.xlsx`
        }
        a.click()
        URL.revokeObjectURL(url)
    }
</script>

<div class="h-full w-full main">
    {#if data.state}
        <div class="flex sub_main-1 justify-between">
            <div class="elements">
                <h2 class="h-12 grid place-items-center text-xl">Details</h2>
                <div class="mt-4">
                    <p>Quizz ID : </p>
                    <input type="text" class="p-1 ml-3 w-[70%] h-9" placeholder="Type here" bind:value={id}>
                </div>
                <div class="mt-4">
                    <p>Authorized KEY: </p>
                    <input type="text" class="p-1 ml-3 w-[70%] h-9" placeholder="Type here" bind:value={key}>
                </div>
                <div class="mt-4 flex justify-center">
                    <button class="h-9 w-24 bg-green-400" on:click={async()=>{
                        let x=await $get_auth_data({q_id:id,key:key});
                        if(x=='no'){
                            notification.set({msg:'Key or ID mismatch',on:true})
                            return
                        }
                        if(x!='done'){
                            notification.set({msg:'something went wrong',on:true})
                            return
                        }
                        console.log($auth_data);
                        auth_data.set({state:false,data:$auth_data.data})
                    }}>Get Access</button>
                </div>
            </div>
            <div class="elements">
                <ul class="list">
                    <li>Implement secure login using usernames and passwords.</li>
                    <li>Assign roles (admin, teacher, student) with specific permissions to ensure users access only their authorized functionalities.</li>
                    <li>Use JWTs for stateless authentication and middleware to validate user permissions for each API request.</li>
                    <li>Encrypt data in transit using HTTPS and at rest to protect sensitive information.</li>
                    <li>Implement logs for user activities and monitor for suspicious behavior to detect and respond to unauthorized access attempts.</li>
                </ul>                  
            </div>
        </div>
    {/if}
    {#if !data.state}
        <div class="mt-3">
            <div class="bg-white flex items-center min-h-12">
                <div class="ml-2" on:click={()=>{
                    auth_data.set({state:true,data:{}})
                }}>
                    <svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                </div>
                <h2 class="text-xl grid place-items-center" style="width: calc(100% - 36px);">Authorized Access</h2>
            </div>
            <div class="mt-4 flex h-[350px] items-center justify-around radius">
                <div class="svg_qr bg-slate-200 w-[35%] grid place-items-center h-[350px]">
                    {@html $auth_data.data.qr}
                </div>
                <div class="w-[45%] bg-slate-200 h-[350px]">
                    <Conduct2Stat data={data.data} auth={false}></Conduct2Stat>
                </div>
            </div>
            <div class="bg-slate-200 mt-3">
                <Settings></Settings>
            </div>
            <div class="bg-slate-200 mt-3">
                <Leadbord data={data.data.taken}></Leadbord>
            </div>
            <div class="bg-slate-200 mt-3">
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
        </div>

    {/if}
</div>


<style>
    :global(.svg_qr svg){
        height: 300px;
    }
    .radius div{
        border-radius: 5px;
    }
    .sub_main-1{
        height: 50%;
        width: 100%;
        margin-top: 20px;
        border-radius: 5px;
    }
    .elements{
        background-color: rgba(240, 248, 255, 0.744);
        height: 100%;
        width: 45%;
        border-radius: 10px;
    }
    .list{
        padding-left: 30px;
        list-style: disc;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    input:focus{
        outline: none;
    }
</style>