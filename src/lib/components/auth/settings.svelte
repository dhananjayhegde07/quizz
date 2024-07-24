
<script>
	import Select, { Option } from "@smui/select";
	import Switch from "@smui/switch";
	import { auth_data } from "./auth";
	import { crd } from "$lib/writable/crd";
	import { notification } from "$lib/writable/notification";
	import { update_conduct_data } from "$lib/writable/data";
    
    let setobj={
        duration: 1,
        e_type: "3",
        islimit: false,
        level: "easy",
        limit: 10,
        retake: "0",
        strict: false,
        type: "MCQ", 
    }
    let data={}
    auth_data.subscribe((val)=>{
        setobj=val.data.settings
        data=val.data
    })
    let is_open
    const updatesetting=async()=>{
        let result=await fetch('/others/update_setting',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                id:$crd.username,crd:$crd.key,
                lolo_id:data.q_id,
                is_open:true,
                settings:setobj
            })
        })
        let res=await result.json()
        if(res.status!='done'){
            notification.set({msg:'Something went wrong',on:true})
            return
        }
        $update_conduct_data()
        notification.set({msg:'Updated successfully',on:true})
    }
</script>


<div class="p-4">
    <h1 class="underline text-lg grid place-items-center bg-blue-500">Settings</h1>
    <div class="flex justify-evenly">
        <div>
            <div>
                <div class="duration flex items-center mt-5">
                    <p>Duration(Hours):</p>
                    <input type="number" bind:value={setobj.duration}>
                </div>
                <div class="some_param flex items-center mt-5" >
                    <p>Entry Type:</p>
                    <Select class="select_entry" bind:value={setobj.e_type}>
                        <Option value='1'>Anyone</Option>
                        <Option value='2'>Anyone and inform</Option>
                        <Option value='3'>Ask permission</Option>
                    </Select>
                </div>
            </div>
            <div>
                <div class="duration flex items-center mt-5">
                    <p>Participants limit?</p>
                    <Switch bind:checked={setobj.islimit}></Switch>
                    <input type="number" bind:value={setobj.limit}>
                </div>
                <div class="some_param flex items-center mt-5">
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
        </div>
        <div>
            <div>
                <div class="flex items-center mt-5">
                    <p>Strict mode?</p>
                    <Switch bind:checked={setobj.strict}></Switch>
                </div>
                <div class="some_param flex items-center mt-5" >
                    <p>Quizz level:</p>
                    <Select class="select_entry" bind:value={setobj.level}>
                        <Option value="easy">Easy</Option>
                        <Option value='medium'>Medium</Option>
                        <Option value='hard'>Hard</Option>
                    </Select>
                </div>
            </div>
            <div >
                <div class="duration flex items-center mt-5" >
                    <p>Quizz Type</p>
                    <Select class="select_entry" bind:value={setobj.type}>
                        <Option value='MCQ'>MCQ</Option>
                    </Select>
                </div>
            </div>
        </div>
    </div>
    <div class="p-5 flex items-center justify-around">
        <button class="min-h-8 w-24 bg-green-600" on:click={updatesetting}>Update</button>
        
    </div>
</div>