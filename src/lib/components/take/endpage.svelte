<script lang="ts">
	import { endpage, taken } from '$lib/writable/conduct';
    import Cicular from '$lib/extra/circular.svelte'
    import Circular_progress from '@smui/circular-progress'
	import { goto } from '$app/navigation';
    let data=$endpage
    let total=$taken.qns.length

</script>

<div class="main">
    <div class="overley">
        <div class="inner">
            <h2>Congratulations!!</h2>
            <div class="score">
                <Cicular size={100} progress={data.curr/total} ></Cicular>
            </div>
            <div class="result">
                <div class="">
                    <p>Total</p>
                    <p>{total}</p>
                </div>
                <div class="text-green-800">
                    <p>Correct</p>
                    <p>{data.curr}</p>
                </div>
                <div class="text-red-600">
                    <p>Incorrect</p>
                    <p>{total-data.curr}</p>
                </div>
            </div>
            {#if data.mode==1}
                <div class="wish">
                    <p>Note*:Your Previous result was more than current so previous results are considered</p>
                </div>
            {/if}
            <p class="m-3">Thanks for choosing our platform</p>
            <div class="btn">
                <!-- <button on:click={()=>{
                    goto('/home',{state:{data:'lead'}})
                }}>View Leaderborad</button> -->
                <button on:click={()=>{
                    goto('/home')
                }}>Go home</button>
            </div>
        </div>
        
    </div>
</div>

<style>
    .main{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100vh;
        width: 100vw;
        backdrop-filter: blur(5px);
        background-image: url(/congats.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        display: grid;
        place-items: center;
    }
    .overley{
        height: 100%;
        width: 100%;
        background-color: rgba(240, 248, 255, 0.549);
        display: grid;
        place-items: center;
    }
    .inner{
        padding: 10px;
        background-color: rgba(240, 248, 255, 0.771);
        box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.644);
        min-width: 60vw;
    }
    .inner h2{
        font-size: 1.3em;
        display: grid;
        place-items: center;
        height: 30px;
    }
    .inner .score{
        height: 200px;
        display: grid;
        place-items: center;
    }
    .result{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .result div{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
        border: 1px solid rgba(0, 0, 0, 0.777);
        width: 33%;
        border-radius: 5px;
    }
    .btn{
        display: flex;
        align-items: center;
        justify-content: end;
        margin-top: 20px;
    }
    .btn button{
        margin-right: 20px;
        background-color: rgba(0, 128, 0, 0.748);
        height: 40px;
        min-width: 140px;
    }
    .wish{
        margin-top: 20px;
    }
</style>