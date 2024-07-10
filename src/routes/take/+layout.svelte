<script>
	import { goto } from "$app/navigation";
	import Endpage from "$lib/components/take/endpage.svelte";
	import Offline from "$lib/components/take/offline.svelte";
	import { quizzzz, sendcopy, taken } from "$lib/writable/conduct";
	import { crd } from "$lib/writable/crd";
    import {socketio} from '$lib/writable/sockets'
	import { onDestroy, onMount } from "svelte";
    const socket=$socketio
    let show=false
    let taken_val
    taken.subscribe((val)=>{
        taken_val=val
    })
    let submit=true
    sendcopy.subscribe((val)=>{
        submit=val.submit
    })
    let end=false
    quizzzz.subscribe((val)=>{
        end=val.end
    })
    function out_of_focus(){
        //out of focus action
    }
    function visibility(){

    }
    let offline=false
    function offline_list(){
        offline=navigator.onLine
    }
    //crd
     onMount(async()=>{
        let x=sessionStorage.getItem('taken')
        let y=sessionStorage.getItem('quizz')
        if(taken_val.info.id&&taken_val.info.id!=''){
            show=true
            console.log($quizzzz,$taken);
        }
        else if(x && y){
            taken.set(JSON.parse(x))
            quizzzz.set(JSON.parse(y))
            sessionStorage.removeItem('taken')
            sessionStorage.removeItem('quizz')
            show=true
        }
        else{
            goto('/home')
            return
        }
        //
        if(taken_val.settings.strict){
            window.addEventListener("blur",out_of_focus)
            document.addEventListener('visibilitychange',visibility)
        }
        //
        try {
            let ack=await socket.emitWithAck('is_active_quizz',{id:$crd.username,lolo_id:taken_val.info.id})
            
        } catch (error) {
            
        }
        window.addEventListener("beforeunload",somthing)
        window.addEventListener('offline',offline_list)
        window.addEventListener('online',offline_list)
        console.log($quizzzz);
     })
     function somthing(){
        if(taken_val.info.id&&taken_val.info.id!=''&&$quizzzz.end==false){
            sessionStorage.setItem('taken',JSON.stringify($taken))
            sessionStorage.setItem('quizz',JSON.stringify($quizzzz))
        }
     }
     onDestroy(()=>{
        window.removeEventListener('blur',out_of_focus)
        document.removeEventListener('visibilitychange',visibility)
        window.removeEventListener('offline',offline_list)
        window.removeEventListener('online',offline_list)
        taken.set({info:{},settings:{},qns:[],ans:[]})
        quizzzz.set({state:true,cur_dur:0,end:false})
        sendcopy.set({do_it:false,send:false,submit:false})
        console.log('destroyed');
     })
     offline=navigator.onLine
     console.log(offline);
</script>

{#if show}
    <slot style="user-select: none;"></slot>
{/if}

{#if submit}
    <div class="submit_pre">
        <div class="submit_inner">
            <h2>Submiting quizz</h2>
            <p>Please varify your answers before submitting</p>
            <div class="anss">
                <div>
                    <h2>Total Questions</h2>
                    <p>{$taken.qns.length}</p>
                </div>
                <div>
                    <h2>Answerd Questions</h2>
                    <p>{$taken.ans.length}</p>
                </div>
            </div>
            <ul>
                <li>You can chose to send the copy of this</li>
                <li>If you wish to view the answers you will not be able to retake the test</li>
                <li>This is the final copy of your answers</li>
            </ul>
            <div>
                <input type="checkbox" name="x" id="xxx" bind:checked={$sendcopy.send} on:input={()=>{                    
                }}>
                <label for="xxx">Send a copy</label>
            </div>
            <div class="btn">
                <button on:click={()=>{
                    sendcopy.set({...$sendcopy,submit:false})
                }}>Go back</button>
                <button on:click={(e)=>{
                    // e.target.disabled=true
                    sendcopy.set({...$sendcopy,do_it:true})
                }}>Continue</button>
            </div>
        </div>
    </div>
{/if}

{#if end}
    <Endpage></Endpage>
{/if}
{#if !offline}
    <Offline></Offline>
{/if}
<style>
    .anss{
        display: flex;
        align-items: center;
        margin: 20px 0px;
    }
    .anss div{
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .anss h2{
        color: green;
    }
    .submit_pre{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100vh;
        width: 100vw;
        backdrop-filter: blur(5px);
        background-color: rgba(240, 248, 255, 0.715);
        display: grid;
        place-items: center;
   }
   .submit_inner{
        width: 70%;
        background-color: aliceblue;
        box-shadow: 2px 2px 5px black;
        padding: 10px;
   }
   .submit_inner h2{
    font-size: 1.3em;
    display: grid;
    place-items: center;
    height: 40px;
   }
   .submit_inner p{
    min-height: 30px;
    font-size: 1.1em;
   }
   .submit_inner ul{
    list-style: inside;
    font-size: 1.1em;
   }
   .submit_inner li{
    min-height: 30px;
   }
   .btn{
    display: flex;
    align-items: center;
    justify-content: end;
   }
   .btn button{
    height: 40px;
    width: 100px;
    margin-right: 20px;
   }
</style>