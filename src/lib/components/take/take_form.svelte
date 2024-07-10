<script>
	import { width_val } from "$lib/writable/loading";
    import { onMount } from "svelte";
    import {gsap} from 'gsap'
	import { crd } from "$lib/writable/crd";
	import { notification } from "$lib/writable/notification";
	import { taken } from "$lib/writable/conduct";
	import { goto } from "$app/navigation";
	import { conduct_data } from "$lib/writable/data";
    let width='50%'
    let crd_val
    crd.subscribe((val)=>{
        crd_val=val
    })
    width_val.subscribe((val)=>{
        if(val<560) width='100%'
        else width='50%'
    })
    let p,lolo
    onMount(async()=>{

    })
    $:{
        if(p)
            gsap.to(p,{scale:1.2,yoyo:true,repeat:-1,ease:'power4.inOut',duration:.5})
    }
</script>

<div class="outer">
    <div class="inner" style="width: {width};">
        <div class="overley">
            <h2>Attend a quizz with ID</h2>
            <div class="text">
                <p class="text_q">Get ready, it's quiz time! Challenge your knowledge and have fun!</p>
                <div>
                    <p bind:this={p}>LOLO Quizzz</p>
                </div>
            </div>
            <input type="text" placeholder="LOLO ID" bind:value={lolo}>
            <div class="btn">
                <button on:click={async()=>{
                    if(!lolo||lolo=='')return
                    let res=await fetch('/home/getquizz',{method:'POST',
                        headers:{'COntent-Type':'application/json'},
                        body:JSON.stringify({id:crd_val.username,crd:crd_val.key,lolo_id:lolo})
                    })
                    let result=await res.json()
                    console.log(result);
                    
                    if (result.status=='db_err') {
                        notification.set({msg:'something went wrong',on:true})
                        return
                    }
                    if (result.status=='close') {
                        notification.set({msg:'The test is closed',on:true})
                        return
                    }
                    if (result.status=='retake') {
                        notification.set({msg:'Your Retake limit is reached',on:true})
                        return
                    }
                    if (result.status=='permission') {
                        conduct_data.set({fetched:false,data:$conduct_data.data})
                        notification.set({msg:'The request sent',on:true})
                        return
                    }
                    if (result.status=='permission_no') {
                        notification.set({msg:'The request sent',on:true})
                        return
                    }
                    if (result.status!='done') {
                        notification.set({msg:'Something went wrong',on:true})
                        return
                    }
                    taken.set({info:result.data,settings:{},ans:[],qns:[]})
                    console.log($taken.info);
                    
                    goto('/take')
                }}>Submit</button>
            </div>
        </div>
    </div>
</div>

<style>
    .outer{
        display: grid;
        place-items: center;
        margin: 10px;
        min-height: 50vh;
    }
    .inner{
        background-color: aliceblue;
        min-height: 300px;
        border-radius: 5px;
        background-image: url(/quiztime.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0%;
    }
    .overley{
        min-height: 300px;
        padding: 10px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.499);
        color: rgba(255, 255, 255, 0.837);
    }
    .overley h2{
        display: grid;
        place-items: center;
        font-size: 1.2em;
    }
    .text .text_q{
        height: 30px;
        margin: 20px 0px;
    }
    .text div{
        font-size: 1.5em;
        display: flex;
        justify-content: center;
    }
    input{
        height: 40px;
        width: 80%;
        border-radius: 5px;
        border: none;
        margin-top: 20px;
        color: black;
        padding: 20px;
    }
    .btn{
        display: flex;
        justify-content: end;
        margin-top: 20px;
    }
    .btn button{
        margin-right: 20px;
        background-color: yellowgreen;
        color: black;
        width: 100%;
        min-height: 40px;
        border-radius: 5px;
    }
</style>