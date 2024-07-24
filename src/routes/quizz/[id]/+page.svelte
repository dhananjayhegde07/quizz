<script>
	import { goto } from "$app/navigation";
    import {page } from "$app/stores";
	import Login from "$lib/login.svelte";
    import {width_val} from '$lib/writable/loading'
    import { crd } from "$lib/writable/crd";
	import { onMount } from "svelte";
    import {gsap } from 'gsap'
	import { notification } from "$lib/writable/notification";
	import { conduct_data } from "$lib/writable/data";
	import { taken } from "$lib/writable/conduct";
    let div
    $:{
        if(div){
            console.log('div');
           
        }
    }
</script>

<div class="grid place-items-center h-screen w-screen">
    <div bind:this={div}>
        <Login width={$width_val} is_show={true} q_id={$page.params.id} on:done={async()=>{
            let res=await fetch('/home/getquizz',{method:'POST',
                headers:{'COntent-Type':'application/json'},
                body:JSON.stringify({id:$crd.username,crd:$crd.key,lolo_id:$page.params.id})
            })
            let result=await res.json()
            console.log(result);
            
            if (result.status=='db_err') {
                notification.set({msg:'something went wrong',on:true})
                return
            }
            if (result.status=='close') {
                notification.set({msg:'The test is closed',on:true})
                return
            }
            if (result.status=='retake') {
                notification.set({msg:'Your Retake limit is reached',on:true})
                return
            }
            if (result.status=='permission') {
                conduct_data.set({fetched:false,data:$conduct_data.data})
                notification.set({msg:'The request sent',on:true})
                return
            }
            if (result.status=='permission_no') {
                notification.set({msg:'The request sent',on:true})
                return
            }
            if (result.status!='done') {
                notification.set({msg:'Something went wrong',on:true})
                return
            }
            taken.set({info:result.data,settings:{},ans:[],qns:[]})
            console.log($taken.info);
            
            goto('/take')
        }}></Login>
    </div>
</div>





