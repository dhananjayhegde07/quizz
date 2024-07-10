<script>
	import {taken } from "$lib/writable/conduct";
	import Qns from "./qns.svelte";
	import Sidebar from "./sidebar.svelte";
    let qns=$taken.qns
    let current=$taken.qns[0]
    let ans_main=''
    function set_ans(){
        let ans=$taken.ans.find((val)=>val.id==current.id)
        if(ans) ans_main=ans.ans
        else ans_main=''
    }
    set_ans()
    taken.subscribe((val)=>{
        set_ans()
    })
    async function submit_quiz(){

    }
</script>



<div class="main">
    <div class="lolo">
        <div class="logo">
            <img src="/log_1.png" alt="">
            <p>LOLO Quizz</p>
        </div>
        <div class="end">
            <p></p>
        </div>
    </div>
    <div class="bottom">
        <div class="overley">
            <Qns data={current} ans_val={ans_main} on:prev={()=>{
                let rep=qns.find((val)=>val.id==current.id-1)
                if(rep){
                    current=rep
                    set_ans()
                }
            }} 
            on:next={()=>{
                let rep=qns.find((val)=>val.id==Number(current.id)+1)
                if(rep){
                    current=rep
                    set_ans()
                }
            }}
            on:clear={()=>{
                let arr=$taken.ans.filter((val)=>val.id!=current.id)
                taken.set({...$taken,ans:arr})
                set_ans()
            }}></Qns>
            <Sidebar on:qn_change={(data)=>{
                for(let i of qns){
                    if(i.id==data.detail.id){
                        current=i
                        set_ans()
                        return
                    }
                }  
            }}></Sidebar>
        </div>
    </div>
</div>



<style>
    .bottom{
        height: 90vh;
        width: 100%;
        padding: 10px;
        background-image: url(/log_1.png);
        background-repeat: no-repeat;
        background-size: 20%;
        background-position: 50%;
    }
    .overley{
        height: 100%;
        width: 100%;
        background-color: rgba(240, 248, 255, 0.537);
        display: flex;
    }
    .lolo{
        background-color: rgba(95, 158, 160, 0.5);
        display: flex;
        align-items: center;
        padding: 20px;
        width: 100vw;
        height: 10vh;
    }
    .lolo .logo img{
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;

    }
    .logo{
        display: flex;
        align-items: center;
        width: 50%;
    }
    .end{
        display: flex;
        justify-content: end;
        width: 50%;
    }
    .end button{
        background-color: rgba(255, 0, 0, 0.467);
        margin-right: 20px;
        height: 40px;
        min-width: 100px;
        border-radius: 5px;
    }
</style>