<script>
	import Share from "$lib/components/conduct/share.svelte";
	import { taken,quizzzz } from "$lib/writable/conduct";
    import { share_open } from "$lib/writable/share";
	import { onMount } from "svelte";
    let share
    share_open.subscribe((val)=>{
        share=val
    })
    onMount(()=>{
        
    })
</script>

<slot></slot>

{#if share.state}
    <Share data={share.data}></Share>
{/if}
