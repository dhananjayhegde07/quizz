<script>
	import { afterUpdate } from "svelte";

    export let data
    let sorted=[]

    afterUpdate(()=>{
        if(data){
            sorted=data.sort((a,b)=>a-b)
        }
    })
</script>


<div >
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
</style>