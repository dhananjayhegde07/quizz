<script>
    export let qn
    export let i
    import Select,{Option} from "@smui/select";
</script>

<div class="qn_card" bind:this={qn.div}>
    <div class="head">
        <p>Question {i+1}</p>
        <div>
            <button on:click={()=>{
                add_arr(i)
            }}>Remove</button>
        </div>
    </div>
    <div class="question">
        <p>Question:</p>
        <input type="text" placeholder="Type here" bind:value={qn.qn}>
    </div>
    <div class="oprtions">
        <div>
            <p>Option 1:</p>
            <input type="text" placeholder="opt" bind:value={qn.opt[0]}>
        </div>
        <div>
            <p>Option 2:</p>
            <input type="text" placeholder="opt" bind:value={qn.opt[1]}>
        </div>
        <div>
            <p>Option 3:</p>
            <input type="text" placeholder="opt" bind:value={qn.opt[2]}>
        </div>
        <div>
            <p>Option 4:</p>
            <input type="text" placeholder="opt" bind:value={qn.opt[3]}>
        </div>
    </div>
    <div class="ans">
        <p>Answer:</p>
        <Select class='ans_select' bind:value={qn.ans}>
            <Option value={qn.opt[0]}>{qn.opt[0]}</Option>
            <Option value={qn.opt[1]}>{qn.opt[1]}</Option>
            <Option value={qn.opt[2]}>{qn.opt[2]}</Option>
            <Option value={qn.opt[3]}>{qn.opt[3]}</Option>
        </Select>
    </div>
</div>


<style>
    
    .submit{
        display: flex;
        align-items: center;
        justify-content: end;
        margin:30px 0px;
    }
    .submit button{
        height: 30px;
        width: 100px;
        background-color: rgba(0, 100, 0, 0.664);
        margin-right: 30px;
    }
    :global(.ans_select){
        margin-left: 20px;
        background-color: aliceblue;
        border-radius: 5px;
    }
    .ans{
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
    .head button{
        background-color: rgba(152, 89, 104, 0.744);
        width: 100px;
        height: 30px;
        margin-right: 50px;
    }
    .head p{
        width: 50%;
    }
    .head div{
        display: flex;
        align-items: center;
        justify-content: end;
        width: 50%;
    }
    .head{
        min-height: 40px;
        background-color: rgba(100, 148, 237, 0.512);
        border-radius: 5px;
        display: flex;
        margin-bottom: 10px;
        align-items: center;
    }
    .oprtions div{
        display: flex;
        margin-top: 20px;
        align-items: center;
    }
    .qn_card{
        background-color: rgba(240, 248, 255, 0.781);
        border-radius: 5px;
        padding: 5px;
        margin-top: 10px;
    }
    .qn_card input{
        height: 30px;
        margin-left: 20px;
        padding: 5px;
        border-radius: 5px;
    }
    .question{
        display: flex;
        align-items: center;
    }
    .question input{
        width: 100%;
    }
    .myavv{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: auto;
        grid-gap: 10px;
    }
    .qns_disp{
        padding: 10px;
    }
    .qns{
        background-color: rgba(240, 248, 255, 0.514);
    }
    .qn_heading{
        width: 100%;
        background-color: rgb(92, 92, 92);
        min-height: 50px;
        display: flex;
        align-items: center;
    }
    .qn_heading h2{
        width: 50%;
        margin-left: 20px;
        color: aliceblue;
    }
    .qn_heading div{
        display: flex;
        width: 50%;
        justify-content: end;
    }
    .qn_heading button{
        background-color: rgba(89, 135, 152, 0.744);
        width: 100px;
        height: 30px;
        margin-right: 50px;
    }
    .settings h1{
        display: grid;
        place-items: center;
        font-size: 1.1em;
        text-decoration: underline;
    }
    .heading{
        min-height: 50px;
        width: 100%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-color: rgba(95, 158, 160, 0.763);
        display: flex;
        align-items: center;
    }
    .heading button{
        background-color: rgba(164, 174, 164, 0.308);
        width: 100px;
        height: 30px;
        margin-right: 50px;
    }
    .heading p{
        width: 50%;
        font-size: 1.2em;
        margin-left: 10px;
    }
    .heading div{
        display: flex;
        justify-content: end;
        width: 50%;
    }
    .form{
        margin-top: 20px;
        width: 100%;
    }
    .settings{
        width: 100%;
        background-color: rgba(240, 248, 255, 0.312);
    }
</style>