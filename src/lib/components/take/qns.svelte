<script>
	import { taken } from "$lib/writable/conduct";
	import { createEventDispatcher } from "svelte";
    let disp=createEventDispatcher()
    export let data
    export let ans_val
    let taken_val='%',len,ans
    taken.subscribe((val)=>{
        len=val.qns.length
        ans=val.ans.length
        let p=Math.floor((ans/len)*100)
        taken_val=`${p}%`
    })
    function take_input(opt){
        let arr=$taken.ans
        for( let i of $taken.ans){
            if(i.id==data.id){
                arr.splice(arr.indexOf(i),1)
                arr.push({
                    id:data.id,
                    ans:opt
                })
                taken.set({...$taken,ans:arr})
                console.log($taken)
                return
            }
        }
        arr.push({
                id:data.id,
                ans:opt
        })
        taken.set({...$taken,ans:arr})
        console.log($taken)
    }
</script>



<div class="main">
    <div class="percent">
        <p>0%</p>
        <div class="bar">
            <div style="width: {taken_val};"></div>
        </div>
        <p>100%</p>
    </div>
    <div class="qn_opt">
        <h2>Qustion {1+Number(data.id)}</h2>
        <div class="ques">
            <p>{data.qn}</p>
        </div>
        <div class="otp">
            {#each data.opt as opt,i}
               <div on:click={()=>{
                    take_input(opt)
               }}>
                    {#if ans_val==opt}
                        <img src="radio.png" alt="">
                        {:else}
                        <img src="radio_non.png" alt="">
                    {/if}
                    <p>{opt}</p>
               </div>
            {/each}
        </div>
    </div>
    <div class="footer">
        <div>
            <p class="ml-3">Answered {ans} of {len}</p>
        </div>
        <div class="btn">
            <button on:click={()=>{
                disp('clear')
            }}>
                Clear
            </button>
            <button on:click={()=>{
                disp('prev')
            }}>Previous</button>
            <button on:click={()=>{
                disp('next')
            }}>Next</button>
        </div>
    </div>
</div>


<style>
    .footer{
        display: flex;
        align-items: center;
    }
    .footer div{
        width: 50%;
    }
    .btn{
        display: flex;
        align-items: center;
        justify-content: end;
    }
    .btn button{
        background-color: rgba(0, 128, 0, 0.538);
        min-height: 30px;
        min-width: 80px;
        margin-right: 20px;
    }
    .qn_opt{
        overflow-x: scroll;
        height: 80%;
        width: 100%;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }
    .qn_opt h2{
        display: grid;
        place-items: center;
        min-height: 40px;
        font-size: 1.3em;
    }
    .otp img{
        height: 20px;
    }
    .otp div{
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-left: 30px;
    }
    .main{
        height: 100%;
        width: 64%;
        border: 2px solid rgba(0, 0, 0, 0.556);
        border-radius: 10px;
        background-color: rgba(255, 235, 205, 0.426);
        
    }
    .percent{
        width: 100%;
        height: 10%;
        margin:auto ;
        display: flex;
        align-items: center;
        font-size: 1.1em;
        padding: 20px ;
    }
    .percent p{
        width: 5%;
    }
    .bar{
        width: 90%;
        height:5px;
        border: 1px solid rgba(0, 0, 0, 0.534);
    }
    .bar div{
        border-radius: 10px;
        background-color: green;
        height: 100%;
    }
    .ques{
        display: flex;
        align-items: center;
        width: 100%;
    }
    .ques p{
        min-height:40px;
        margin: 10px;
        width: 100%;
    }
    .footer{
        height: 10%;
        width: 100%;
        
    }
</style>