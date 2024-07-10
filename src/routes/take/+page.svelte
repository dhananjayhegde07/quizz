<script>
	import Pre from "$lib/components/take/pre.svelte";
	import Start from "$lib/components/take/start.svelte";
	import { endpage, quizzzz, sendcopy, taken } from "$lib/writable/conduct";
	import { crd } from "$lib/writable/crd";
	import { loading } from "$lib/writable/loading";
	import { notification } from "$lib/writable/notification";
    let quizz
    quizzzz.subscribe((val)=>{
        quizz=val.state
    })
    sendcopy.subscribe(async(val)=>{
        if(val.do_it){
            // loading.set(true)
            let send=$sendcopy.send
            console.log($taken);
            if($taken.qns.length==0){
                return
            }
            try{
                let res=await fetch('/take/submit_quizz',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id:$crd.username,crd:$crd.key,data:$taken,sendcopy:send})
                })
                let result=await res.json()
                console.log(result);
                loading.set(false)
                if(result.status=='less'){
                    endpage.set({mode:1,curr:result.marks_got,prev:result.prev})
                    quizzzz.set({...$quizzzz,end:true})
                    sendcopy.set({...$sendcopy,do_it:false,submit:false})
                    return
                }
                if(result.status!='done'){
                    notification.set({'msg':'something went wrong',on:true})
                    return
                }
                endpage.set({mode:2,curr:result.marks,prev:0})
                quizzzz.set({...$quizzzz,end:true})
                sendcopy.set({...$sendcopy,do_it:false,submit:false})

            }catch(e){
                loading.set(false)
                notification.set({"msg":'Check your internet connection',on:true})
            }
            
        }
    })
</script>


<div>
    {#if quizz}
        <Pre></Pre>
    {:else}
        <Start></Start>
    {/if}
</div>


<style>

</style>