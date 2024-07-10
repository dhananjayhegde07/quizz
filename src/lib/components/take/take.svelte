<script>
	import RecentTake from "./recent_take.svelte";
    import {gsap} from 'gsap'
	import TakeForm from "./take_form.svelte";
    let div


    $:{
        if(div)
            gsap.from(div,{scale:0,duration:.5})
    }
</script>

<div bind:this={div}>
    <TakeForm></TakeForm>
    <RecentTake></RecentTake>
    
</div>

<style>
    
</style>