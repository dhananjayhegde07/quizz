<script>
	import { write } from '$lib/writable/conduct';
	import { crd } from '$lib/writable/crd';
	import { width_val } from '$lib/writable/loading';
	import { notification } from '$lib/writable/notification';
    import Select,{Option} from '@smui/select'
    import Switch from '@smui/switch';
    let write_val
    let cls='great';
    let width,div_width='50%'
    width_val.subscribe((val)=>{
        width=val
        if(width<600){
            cls='less'
            div_width='100%'
        }
        else {
            cls='great'
            div_width='50%'
        }
    })
    let setobj={
        duration:1,
        retake:'0',
        e_type:'1',
        limit:10,
        islimit:false,
        strict:false,
        level:'easy',
        type:'MCQ'
    }
    write.subscribe((val)=>{
        write_val=val
        // write.set({settings:setobj,qns:write_val.qns,started:false})
    })
    let rtake
</script>

<div class="setting">
    <div class={cls} >
        <div class="duration" style="width: {div_width};">
            <p>Duration(Hours):</p>
            <input type="number" bind:value={setobj.duration}>
        </div>
        <div class="some_param" style="width: {div_width};">
            <p>Entry Type:</p>
            <Select class="select_entry" bind:value={setobj.e_type}>
                <Option value='1'>Anyone</Option>
                <Option value='2'>Anyone and inform</Option>
                <Option value='3'>Ask permission</Option>
            </Select>
        </div>
    </div>
    <div class={cls} >
        <div class="duration" style="width: {div_width};">
            <p>Participants limit?</p>
            <Switch bind:checked={setobj.islimit}></Switch>
            <input type="number" bind:value={setobj.limit}>
        </div>
        <div class="some_param" style="width: {div_width};">
            <p>Retakes:</p>
            <Select class="select_entry" bind:value={setobj.retake}>
                <Option value="0">0</Option>
                <Option value='1'>1</Option>
                <Option value='2'>2</Option>
                <Option value='3'>3</Option>
                <Option value='4'>4</Option>
                <Option value='-1'>Any</Option>
            </Select>
        </div>
    </div>
    <div class={cls} >
        <div class="duration" style="width: {div_width};">
            <p>Strict mode?</p>
            <Switch bind:checked={setobj.strict}></Switch>
        </div>
        <div class="some_param" style="width: {div_width};">
            <p>Quizz level:</p>
            <Select class="select_entry" bind:value={setobj.level}>
                <Option value="easy">Easy</Option>
                <Option value='medium'>Medium</Option>
                <Option value='hard'>Hard</Option>
            </Select>
        </div>
    </div>
    <div class={cls} >
        <div class="duration" style="width: {div_width};">
            <p>Quizz Type</p>
            <Select class="select_entry" bind:value={setobj.type}>
                <Option value='MCQ'>MCQ</Option>
            </Select>
        </div>
    </div>
    <div class="save">
        <button class="mr-3" on:click={async()=>{
            let res=await fetch('/home/save_default_setting',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id:$crd.username,crd:$crd.key,settings:setobj})
            })
            let result=await res.json()
            if (result.status!='done') {
                notification.set({msg:'something Went wrong',on:true})
                return
            }
            notification.set({msg:'Settings updated',on:true})
        }}>Save as default</button>
        <button on:click={()=>{
            write.set({settings:setobj,qns:write_val.qns,started:true,title:$write.title})
        }}>Save changes</button>
    </div>
</div>


<style>
    .save{
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: end;
        width: 100%;
    }
    .save button{
        height: 30px;
        width: 120px;
        background-color: rgba(0, 128, 0, 0.51);
    }
    :global(.select_entry){
        margin-left: 20px;
        background-color: aliceblue;
        border-radius: 5px;
    }
    :global( .mdc-line-ripple){
        display: none;
    }
    :global(.mdc-select__anchor){
        height: 40px !important;
        align-items: center !important;
    }
   .setting{
    padding: 10px;
   }
   .less .duration,.less .some_param{
    margin-bottom: 30px;
   }
   /* :global(.less .select_entry){
    margin-top: 50px;
   } */

   .great{
    display: flex;
    align-items: center;
    margin-top: 20px;
   }
   .duration{
    display: flex;
    align-items: center;
    /* width: 50%; */
   }
   .duration input{
    width: 50px;
    color: black;
    border-radius: 5px;
    padding: 5px;
    margin-left: 20px;
   }
   .some_param{
    display: flex;
    align-items: center;
    width: 50%;
   }
</style>
