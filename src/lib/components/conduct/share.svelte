<script>
	import { width_val } from "$lib/writable/loading";
	import { notification } from "$lib/writable/notification";
	import { share_open } from "$lib/writable/share";

    export let data
    let width='50%'
    width_val.subscribe((val)=>{
        if(val<530)width='95%'
        else width='50%'
    })
</script>

<div class="outer_main_share">
    <div class="inner" style="width: {width};">
        <h1>Share your Quizz</h1>
        <div class="svg">
            {@html '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h29v29H0z"/><path stroke="#000000" d="M4 4.5h7m2 0h3m2 0h7M4 5.5h1m5 0h1m2 0h2m1 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m1 0h2m2 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h1m1 0h2m2 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h2m1 0h2m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h3m1 0h1m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m2 0h2M4 12.5h1m1 0h5m2 0h1m2 0h1m1 0h5M5 13.5h1m3 0h1m1 0h3m2 0h1m2 0h1m1 0h1m2 0h1M4 14.5h1m1 0h1m1 0h1m1 0h1m1 0h4m1 0h1m2 0h2m1 0h1M5 15.5h1m3 0h1m9 0h4M8 16.5h1m1 0h1m1 0h2m1 0h1m1 0h1m2 0h1m2 0h2M12 17.5h1m2 0h5m1 0h1m2 0h1M4 18.5h7m2 0h1m2 0h1m1 0h2m2 0h2M4 19.5h1m5 0h1m1 0h1m1 0h6m1 0h2m1 0h1M4 20.5h1m1 0h3m1 0h1m1 0h1m3 0h1m6 0h1M4 21.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m3 0h2M4 22.5h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h1M4 23.5h1m5 0h1m9 0h3M4 24.5h7m1 0h4m1 0h1m2 0h4"/></svg>\n'}
        </div>
        <p>Your LOLO Id</p>
        <div class="copy">
            <p>{data.id}</p>
            <button on:click={()=>{
                navigator.clipboard.writeText(data.id)
                notification.set({msg:'Copied to clipboard',on:true})
            }}>Copy</button>
        </div>
        <div class="btn">
            <button on:click={()=>{
                share_open.set({data:{id:'',qr:''},state:false})
            }}>Done</button>
        </div>
    </div>
</div>




<style>
    .btn{
        display: flex;
        justify-content: center;
        min-height: 40px;
        background-color: rgba(0, 128, 0, 0.641);
    }
    .copy{
        display: flex;
        align-items: center;
        margin: 20px;

    }
    .copy p{
        width: 70%;
        overflow: scroll;
        min-height: 40px;
        border: 3px solid rgba(0, 0, 0, 0.504);
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.263);
    }
    .copy button{
        margin-left: 10px;
        height: 30px;
        width: 20%;
    }
    .copy button:hover{
        background-color: rgba(0, 128, 0, 0.292);
    }
    .copy p::-webkit-scrollbar{
        display: none;
    }
    .outer_main_share{
        position: fixed; /* or absolute, depending on your layout needs */
        display: grid;
        place-items: center;
        top: 0;
        left: 0;
        z-index: 1;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
         /* Adjust as needed */
        backdrop-filter: blur(5px);
    }
    .inner{
        min-height: 200px;
        background-color: aliceblue;
        border-radius: 5px;
        padding: 5px;
    }
    .inner h1{
        font-size: 1.2em;
        display: grid;
        place-items: center;
    }
    :global(.inner svg){
        height: 260px;
    }
    .svg{
        display: grid;
        place-items: center;
    }
</style>