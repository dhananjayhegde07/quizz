<script lang="ts">
	import { endpage, quizzzz, sendcopy, taken } from "$lib/writable/conduct";
	import { crd } from "$lib/writable/crd";
	import { createEventDispatcher, onDestroy } from "svelte";
    import {width_val} from '$lib/writable/loading'
    let disp=createEventDispatcher()
    let qns=$taken.qns
    let duration=$quizzzz.cur_dur
    
    let hour,min,sec,timeid
    timeid=setInterval(()=>{
            if(duration<=0){
                finish_test()
                return
            }
            hour=Math.floor(duration/(3600*60))
            min=Math.floor((duration % 3600) / 60);
            sec=duration%60
            duration--
            quizzzz.set({state:false,cur_dur:duration,end:false})
        },1000)

    function finish_test(){
        clearInterval(timeid)
        // quizzzz.set({'state':true,cur_dur:0,end:true})
        disp('submit')
    }
    sendcopy.subscribe((val)=>{
        if(val.do_it){
            console.log('finifn');
            
            finish_test()
        }
    })
    let qn_list='Fr_4'
    width_val.subscribe((val)=>{
        if(val<800){
            qn_list='Fr_3'
        }
        else{
            qn_list='Fr_4'
        }
    })
    let color={}
    for(let i of $taken.qns)
        color[i.id]='notdone'
    taken.subscribe((val)=>{
        for(let i of $taken.qns)
        color[i.id]='notdone'
        for(let i of val.ans){
            for(let j of val.qns){
                if(i.id==j.id)
                    color[i.id]='done'
            }
        }
    })
    onDestroy(()=>{
        clearInterval(timeid)
    })
</script>


<div class="main">
    <div class="timer">
        <div >
            <p>{hour}:{min}:{sec}</p>
        </div>
    </div>
    <div>
        <ul>
            <li>Attending as {$crd.username}</li>
            <li>Do not refresh the page untill end</li>
        </ul>
    </div>

    <div class="qns_nav">
        <h1>Questions</h1>
        <div class="{qn_list}">
            {#each qns as q}
                <div style="display: grid;place-items: center;">
                    <div class="qns {color[q.id]}" on:click={()=>{
                        disp('qn_change',{id:q.id})
                    }}>
                        <p>{Number(q.id)+1}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="btn">
        <button on:click={()=>{
            sendcopy.set({...$sendcopy,submit:true})
        }}>
            Sumbit
        </button>
    </div>
    <!-- qns -->

</div>


<style>
    .qns{
        display: grid;
        place-items: center;
        background-color: cadetblue;
        border-radius: 50%;
        height: 40px;
        width: 40px;
    }
    .timer{
        display: grid;
        place-items: center;
        min-height: 50px;
        margin-top: 10px;
    }
    .timer div{
        background-color: rgba(0, 128, 0, 0.589);
        width: 50%;
        display: grid;
        place-items: center;
        height: 100%;
        border-radius: 5px;
    }
    .main{
        height: 100%;
        width: 35%;
        background-color: rgba(255, 235, 205, 0.426);
        border: 2px solid rgba(0, 0, 0, 0.556);
        border-radius: 10px;
        margin-left: 10px;
        padding: 10px
    }
    ul{
        margin: 10px;
        list-style: inside;
    }
    li{
        min-height: 40px;
        overflow: hidden;
    }
    .qns_nav{
        background-color: rgba(240, 248, 255, 0.737);
        border-radius: 5px;
        width: 100%;
        /* min-height: 40vh; */
        border: 1px solid rgba(0, 0, 0, 0.645);
    }
    .qns_nav h1{
        display: grid;
        place-items: center;
        height: 30px;
    }
    .Fr_4{
        display: grid;
        padding: 10px;
        grid-auto-rows: 100px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        overflow: scroll;
        width: 100%;
        height: 40vh;
    }
    .Fr_3{
        display: grid;
        padding: 10px;
        grid-auto-rows: 100px;
        grid-template-columns: 1fr 1fr 1fr;
        overflow: scroll;
        width: 100%;
        height: 40vh;
    }
    .done{
        background-color: green;
    }
    .btn{
        height: 100px;
        display: grid;
        place-items: center;
    }
    .btn button{
        height: 40px;
        width: 100px;
        background-color: rgba(0, 128, 0, 0.577);
        border-radius: 5px;
    }
</style>