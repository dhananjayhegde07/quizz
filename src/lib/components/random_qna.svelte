<script lang="ts">
	import { onMount } from "svelte";
    import {gsap} from 'gsap'
    let obj={
        qn:'',
        ans:'',
        opt:[],
        sel:''
    }
    let obj2={
        1:HTMLLabelElement,
        2:HTMLLabelElement,
        3:HTMLLabelElement,
        4:HTMLLabelElement
    }
    let show=false,success=true
    onMount(async()=>{
       await getqna()
       gsap.from(qn,{height:'0%',duration:.5,ease:'power4.in'})
    })

    async function getqna(){
        try{
            obj.sel=''
            success=true
            let res=await fetch('https://opentdb.com/api.php?amount=1&difficulty=hard')
            let result=await res.json()
            obj['qn']=result.results[0].question
            obj.opt=[... result.results[0].incorrect_answers]
            obj.opt.push(result.results[0].correct_answer)
            obj.ans=result.results[0].correct_answer
            for (let i = obj.opt.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [obj.opt[i], obj.opt[j]] = [obj.opt[j], obj.opt[i]];
            }
        }catch{
            success=false
        }
    }
    let qn
</script>

<div class="test">
    <div class="heading">
        <h1>
            Test your Knowledge
        </h1>
        <div class="nav">
            <img src="/eco.png" alt="" on:click={async()=>{
                show=false
                try{
                    obj2[`${obj.opt.indexOf(obj.sel)+1}`].style='color:black'
                }catch(e){}
                await getqna() 
                gsap.from(qn,{height:'0%',duration:1,ease:'power4.in'})
            }}>
            <img src="/next.png" alt="" on:click={async()=>{
                show=false,
                await getqna()
            }}>
        </div>
    </div>
    <div class="qn" bind:this={qn}>
        {#if success}
            <p>{obj.qn}</p>
            <div class="options">
                {#each obj.opt as i,index}
                    <div><input type="radio" value={i} id="{i}"  name="same" on:input={()=>{
                        obj.sel=i
                        console.log(obj2)
                    }}><label bind:this={obj2[`${index+1}`]} for="{i}">{i}</label></div>
                {/each}
            </div>
        {:else}
            <p style="font-size: 1.3em;">Thre was some error during fetching</p>
        {/if}

    </div>
    <div class="bottom">
        <div>
            {#if show}
                <p>{obj.ans}</p>
            {/if}
        </div>
        <div class="btn">
            <button on:click={()=>{
                if(obj.sel=='') return
                let div=obj2[`${obj.opt.indexOf(obj.sel)+1}`]
                if (obj.ans==obj.sel) {
                    div.style='color:green'
                }
                else{
                    div.style='color:red'
                }
                show=true
            }}>Check</button>
        </div>
    </div>
</div>

<style>
.test{
    height: 500px;
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
    background-color: aliceblue;
}
.heading{
    background-color: rgba(95, 158, 160, 0.399);
    min-height: 50px;
    display: flex;
    align-items: center;
}
.heading h1{
    width: 50%;
    font-size: 1.2em;
    margin-left: 20px;
}
.nav{
    width: 50%;
    display: flex;
    /* flex-direction: row; */
    align-items: center;
    justify-content: end;
    
}
.nav img{
    height: 30px;
    margin-right: 20px;
    cursor: pointer;
}
.qn{
    height:400px ;
    width: 100%;
    padding: 10px;
    font-size: 1.1em;
    overflow: scroll;
}
.bottom{
    height: 50px;
    width: 100%;
    background-color: rgba(95, 158, 160, 0.399);
    display: flex;
    align-items: center;
}
.options{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}
.options div{
    width: 100%;
    margin-top: 10px;
}

.bottom div{
    width: 50%;
}
.bottom p{
    margin-left: 10px;
}
.btn{
    display: flex;
    justify-content: end;
    padding-right: 20px;
}
.btn button{
    background-color: rgba(0, 128, 0, 0.308);
    width: 80px;
    height: 30px;
}
</style>