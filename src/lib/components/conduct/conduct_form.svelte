<script>
	import { write } from "$lib/writable/conduct";
	import { width_val } from "$lib/writable/loading";
    import Settings from "./settings.svelte";
    import Select,{Option} from '@smui/select'
    import {notification} from '$lib/writable/notification'
	import { crd } from "$lib/writable/crd";
	import Share from "./share.svelte";
	import { Result } from "postcss";
	import { share_open } from "$lib/writable/share";
    import {gsap} from 'gsap'
    let write_val
    write.subscribe((val)=>{
        write_val=val
    })
    let crd_val
    crd.subscribe((val)=>{
        crd_val=val
    })
    let arr=[]
    let next=0
    let display='myavv'
    width_val.subscribe((val)=>{
        if(val<750) display="bhoww"
        else display="myavv"
    })
    function add_arr(i){
        arr.splice(i,1)
        write.set({settings:write_val.settings,qns:[...arr],started:true,title:$write.title})
        arr=[...arr]
        style_arr.splice(i,1)
        console.log(arr)

    }
    let style_arr=[]
    let upload=false,up_div
    $:{
        if(up_div){
            gsap.from(up_div,{width:'0',height:'0',duration:.5})
        }
    }
    function animate_up(){
        gsap.to(up_div,{height:0,duration:.5})
    }
</script>


<div class="form">
    <div class="heading">
        <p>Fill this Form</p>
        <div class="outer flex items-center">
            <div class="w-8 h-8 grid place-items-center mr-2 relative info" on:mouseenter={()=>{upload=true}}
                on:mouseleave={()=>{
                    animate_up()
                    upload=false
                }}>
                <p>?</p>
                {#if upload}
                    <div style="max-width: 400px; min-width: 300px;" class="absolute abs_json p-5 overflow-hidden" bind:this={up_div} >
                        <p>File Type: <strong>json</strong></p>
                        <p>Note* : We are developing to support pdf and other file format</p>
                        <p class="cursor-pointer underline-offset-auto" on:click={async()=>{
                            let data=await fetch('/others/get_structure_file',{
                                method:'POST',
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify({id:$crd.username,crd:$crd.key})
                            })
                            let result=await data.blob()
                            const url = URL.createObjectURL(result);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'structure.json';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        }}>Download structure file</p>
                    </div>
                {/if}
            </div>
            <button>Uplaod file</button>
        </div>
    </div>
    <div class="settings">
        <h1>Settings</h1>
        <Settings></Settings>
    </div>
    <div class="hrline"></div>
    <div class="title">
        <div class="flex items-center text-xl head_title">
            <h2 class="ml-6">Information</h2>
        </div>
        <div class="inputs">
            <div>Title: <input type="text" bind:value={$write.title.title} placeholder="Type here"></div>
            <div>Description: <textarea name="" id="" bind:value={$write.title.desc} placeholder="Type Here"></textarea></div>
        </div>
    </div>
    <div class="qns">
        <div class="qn_heading">
            <h2>Add Questions</h2>
            <div>
                <button on:click={()=>{
                    arr=[...arr,{
                        qn:'',
                        opt:['','','',''],
                        ans:'',
                        div:null,
                        id:arr.length
                    }]
                    arr=[...arr]
                    style_arr.push('notactive')
                    write.set({settings:write_val.settings,qns:[...arr],started:true,title:$write.title})
                    console.log(write_val.qns)
                }}>
                    + Add
                </button>
            </div>
        </div>
        <div class="qns_disp {display}">
            {#each arr as qn,i}
            <div class="qn_card {style_arr[i]}" >
                <div class="head">
                    <p>Question {i+1}</p>
                    <div>
                        <button on:click={()=>{
                            add_arr(i)
                        }}>Remove</button>
                    </div>
                </div>
                <div class="question">
                    <p>Question:</p>
                    <input type="text" placeholder="Type here" bind:value={qn.qn}>
                </div>
                <div class="oprtions">
                    <div>
                        <p>Option 1:</p>
                        <input type="text" placeholder="opt" bind:value={qn.opt[0]}>
                    </div>
                    <div>
                        <p>Option 2:</p>
                        <input type="text" placeholder="opt" bind:value={qn.opt[1]}>
                    </div>
                    <div>
                        <p>Option 3:</p>
                        <input type="text" placeholder="opt" bind:value={qn.opt[2]}>
                    </div>
                    <div>
                        <p>Option 4:</p>
                        <input type="text" placeholder="opt" bind:value={qn.opt[3]}>
                    </div>
                </div>
                <div class="ans">
                    <p>Answer:</p>
                    <Select class='ans_select' bind:value={qn.ans}>
                        <Option value={qn.opt[0]}>{qn.opt[0]}</Option>
                        <Option value={qn.opt[1]}>{qn.opt[1]}</Option>
                        <Option value={qn.opt[2]}>{qn.opt[2]}</Option>
                        <Option value={qn.opt[3]}>{qn.opt[3]}</Option>
                    </Select>
                </div>
            </div>
        {/each}

        </div>

        <div class="submit">
            <button on:click={async()=>{
                console.log(write_val);
                if($write.title.title=='' || $write.title.desc==''){
                    notification.set({msg:'Provide Title and Description',on:true})
                    return
                }
                for(let i of write_val.qns){
                    if(i.qn==''){
                        notification.set({msg:"There is a blank question",on:true})
                        style_arr[i]='active'
                        setTimeout(() => {
                            style_arr[i]='notactive'
                        }, 3000);
                        return
                    }
                    if(i.opt.includes('')){
                        notification.set({msg:"There is a blank option",on:true})
                        style_arr[i]='active'
                        setTimeout(() => {
                            style_arr[i]='notactive'
                        }, 3000);
                        return
                    }
                    if(i.ans==''){
                        notification.set({msg:"There is a blank Answer",on:true})
                        style_arr[i]='active'
                        setTimeout(() => {
                            style_arr[i]='notactive'
                        }, 3000);
                        return
                    }
                }
                let res=await fetch('/home/new_conduct',{
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({id:crd_val.username,crd:crd_val.key,data:write_val})
                })
                let result=await res.json()
                console.log(result);
                if(result.status!='done'){
                    notification.set({msg:'somethingwent wrong',on:true})
                    return
                }
                share_open.set({data:{id:result.id,qr:result.qr},state:true})
            }}>Submit</button>
        </div>
    </div>
</div>




<style>
    .abs_json{
        background-color: aliceblue;
        top: 100%;
        z-index: 1000;
        right: 90%;
        box-shadow: 2px 2px 5px black;
    }
    .heading .abs_json p{
        width: 100%;
        height: fit-content;
        margin-bottom: 20px;
    }
    .inputs{
        background-color: rgba(240, 248, 255, 0.312);
        padding: 20px;
    }
    .inputs div{
       margin-bottom: 20px;
       display: flex;
       align-items: center;
    }
    .inputs input{
        height: 40px;
        padding: 10px;
        margin-left: 10px;
        border-radius: 5px;
    }
    .inputs textarea{
        height: 150px;
        margin-left: 10px;
        padding: 10px;
        width: 80%;
        resize: none;
    }
    .active{
        outline: 1px solid red;
    }
    .submit{
        display: flex;
        align-items: center;
        justify-content: end;
        margin:30px 0px;
    }
    .submit button{
        height: 30px;
        width: 100px;
        background-color: rgba(0, 100, 0, 0.664);
        margin-right: 30px;
        margin-bottom: 20px;
    }
    :global(.ans_select){
        margin-left: 20px;
        background-color: aliceblue;
        border-radius: 5px;
    }
    .ans{
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
    .head button{
        background-color: rgba(152, 89, 104, 0.744);
        width: 100px;
        height: 30px;
        margin-right: 50px;
    }
    .head p{
        width: 50%;
    }
    .head div{
        display: flex;
        align-items: center;
        justify-content: end;
        width: 50%;
    }
    .head{
        min-height: 40px;
        background-color: rgba(100, 148, 237, 0.512);
        border-radius: 5px;
        display: flex;
        margin-bottom: 10px;
        align-items: center;
    }
    .oprtions div{
        display: flex;
        margin-top: 20px;
        align-items: center;
    }
    .qn_card{
        background-color: rgba(240, 248, 255, 0.781);
        border-radius: 5px;
        padding: 5px;
        margin-top: 10px;
    }
    .qn_card input{
        height: 30px;
        margin-left: 20px;
        padding: 5px;
        border-radius: 5px;
    }
    .question{
        display: flex;
        align-items: center;
    }
    .question input{
        width: 100%;
    }
    .myavv{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: auto;
        grid-gap: 10px;
    }
    .qns_disp{
        padding: 10px;
    }
    .qns{
        background-color: rgba(240, 248, 255, 0.514);
    }
    .qn_heading{
        width: 100%;
        background-color: rgb(92, 92, 92);
        min-height: 50px;
        display: flex;
        align-items: center;
    }
    .qn_heading h2{
        width: 50%;
        margin-left: 20px;
        color: aliceblue;
    }
    .qn_heading div{
        display: flex;
        width: 50%;
        justify-content: end;
    }
    .qn_heading button{
        background-color: rgba(89, 135, 152, 0.744);
        width: 100px;
        height: 30px;
        margin-right: 50px;
    }
    .settings h1{
        display: grid;
        place-items: center;
        font-size: 1.1em;
        text-decoration: underline;
    }
    .heading{
        min-height: 50px;
        width: 100%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-color: rgba(95, 158, 160, 0.763);
        display: flex;
        align-items: center;
    }
    .heading button{
        background-color: rgba(164, 174, 164, 0.308);
        width: 100px;
        height: 30px;
        margin-right: 50px;
    }
    .heading p{
        width: 50%;
        font-size: 1.2em;
        margin-left: 10px;
    }
    .heading .outer{
        display: flex;
        justify-content: end;
        width: 50%;
    }
    .form{
        margin-top: 20px;
        width: 100%;
    }
    .settings{
        width: 100%;
        background-color: rgba(240, 248, 255, 0.312);
    }
    .head_title{
        background-color: rgb(92, 92, 92);
        color: aliceblue;
        min-height: 50px;
    }
</style>

