<script>
	import ProgressBar from "$lib/components/progress_bar.svelte";
	import { width_val } from "$lib/writable/loading";
	import Quick from "./quick.svelte";
	import RandomQna from "./random_qna.svelte";
	import Recents from "./recents.svelte";
	import Reports from "./reports.svelte";
    import Tips from "./tips.svelte";
    import {gsap} from 'gsap'
    let width
    width_val.subscribe((val)=>[
        width=val
    ])
    let div
    $:{
        if(div){
            gsap.from(div,{scale:0,duration:.5})
        }
    }
</script>

{#if width>720}
    <div class="first" bind:this={div}>
        <Tips></Tips>
        <div class="mt-3 flex second">
            <ProgressBar></ProgressBar>
            <Quick></Quick>
        </div>
        <div class="mt-3 flex second">
            <Reports></Reports>
            <Recents></Recents>
        </div>
        <RandomQna></RandomQna>
    </div>
    {:else}
        <div class="first" bind:this={div}>
            <Tips></Tips>
            <div class="mt-3 flex second">
                {#if width>500}
                <ProgressBar></ProgressBar>
                {/if}
                <Quick></Quick>
            </div>
            {#if width>500}
                <div class="mt-3 flex second">
                    <Reports></Reports>
                    <Recents></Recents>
                </div>
            {:else}
                <div class="mt-3 flex-row second_x">
                    <Reports></Reports>
                    <Recents></Recents>
                </div>
            {/if}
            <RandomQna></RandomQna>
        </div>
{/if}



<style>
    .second{
        justify-content: space-between;
    }
    
    .first::-webkit-scrollbar{
        display: none;
    }
    .second_x{
        margin-top: 10px;
    }
</style>