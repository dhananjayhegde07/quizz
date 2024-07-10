
<script lang="ts">
	import { onMount } from "svelte";

    let width:number;
    let style='50vw'
    onMount(()=>{
        width=window.innerWidth
        if(width<800)style='95vw'
        window.addEventListener('resize',()=>{
            width=window.innerWidth
            if(width<800)style='95vw'
            else style='50vw'
        })
    })
</script>


<div class="outer">
    <div class="inner" style="width:{style};">
        <h3>User agreement</h3>
        <p>By participating in this quiz, you consent to the collection, processing, and storage of your personal data for the quality purposes. This may include, but is not limited to, your name, email address, and quiz responses.
        </p>
        <p>Your personal data will be used solely for the following purposes:</p>
        <ul>
            <li>To provide you with access to the quiz and its results.</li>
            <li>To improve our services and user experience.</li>
            <li>To send you relevant communications related to your participation in the quiz.</li>
        </ul>
        <p>We will not share your personal data with third parties without your explicit consent, except as required by law or as necessary to fulfill the purposes outlined in our Privacy Policy.</p>
        <div class="btn">
            <button>I agree</button>
        </div>
    </div>
</div>


<style>
.outer{
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background-color: rgba(250, 235, 215, 0.34);
    display: grid;
    place-items: center;
    backdrop-filter: blur(5px);
}
.inner{
    background-color: rgba(245, 245, 245);
    border-radius: 10px;
    padding: 10px;
}
.inner h3{
    display: grid;
    place-items: center;
}
.btn{
    display: flex;
    justify-content: end;
}
.btn button{
    border: none;
    background-color: rgba(0, 128, 0, 0.555);
    cursor: pointer;
    height: 40px;
    width: 100px;
    border-radius: 5px;
}
</style>