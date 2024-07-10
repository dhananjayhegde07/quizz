<script>
	import DispMain from "./disp_main.svelte";
    import { current } from "./quizz";
    let current_set=false;
    current.subscribe((val)=>{
        current_set=val.set;
    })
</script>

<div class="main relative">
    {#if current_set}
        <!--  -->
    {/if}
    {#if !current_set}
        <DispMain></DispMain>
    {/if}
</div>

<style>
    .main{
        height: 100%;
        width: 100%;
    }
</style>


