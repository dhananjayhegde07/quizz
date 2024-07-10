<script>
	import ConductForm from "./conduct_form.svelte";
import RecentConduct from "./recent_conduct.svelte";
    import {gsap} from "gsap";
    let div
    $:{
        if(div){
            gsap.from(div,{scale:0,duration:.5})
        }
    }

</script>

<div bind:this={div}>
    <RecentConduct></RecentConduct>
    <ConductForm></ConductForm>
</div>

<style>

</style>