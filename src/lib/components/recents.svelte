<script>
	import Circular from "$lib/extra/circular.svelte";
	import Circular_2 from "$lib/extra/circular_2.svelte";
    import { crd } from "$lib/writable/crd";
	import { conduct_data, update_conduct_data } from "$lib/writable/data";
	import { width_val } from "$lib/writable/loading";

    let width,width_div='45%'
    width_val.subscribe((val)=>{
        width=val
        if(width<500){
            width_div='100%'
        }
        else{
            width_div='45%'
        }
    })
    let err=false

    let data={}
    conduct_data.subscribe(async(val)=>{
        if(!val.fetched) {
            err=await $update_conduct_data()
            return
        }
        let max=Math.max(...val.data.map((val)=>parseInt(val.q_id.split('_')[1],10)))
        let curr=val.data.filter((val)=>parseInt(val.q_id.split('_')[1])==max)[0]
        data.id=curr.q_id
        data.is_limit=curr.settings.islimit
        data.count=curr.count
        data.limit=curr.settings.limit
        let count=0,lenth=curr.qns.length,avg=0
        let high=0,low=curr.taken[0].result
        for(let i of curr.taken){
            if(i.result>high)high=i.result
            if(i.result<low)low=i.result
            avg+=(i.result/lenth)
            count++
        }
        data.avg=avg/count
        data.high=high
        data.low=low
    })
</script>

<div class="r_main" style="width: {width_div};">
    <h2 class="h-5 grid place-items-center text-lg">{data.id}</h2>
    <div class="p-2 flex items-center justify-around">
        <div>
            <p>Average marks</p>
            <Circular progress={data.avg}></Circular>
        </div>
        {#if data.is_limit}
            <div>
                <p>Limit</p>
                <Circular progress={data.count/data.limit}></Circular>
            </div>
        {/if}
    </div>
    <div class="p-2 flex items-center justify-around">
        <div>
            <p>Highest marks</p>
            <Circular_2 text={data.high}></Circular_2>
        </div>
        <div>
            <p>Lowest marks</p>
            <Circular_2 text={data.low} stroke={'red'}></Circular_2>
        </div>
    </div>
</div>

<style>
    .r_main{
        height: 300px;
        /* width: 45%; */
        background-color: aliceblue;
        border-radius: 5px;
        margin-top: 10px;
    }
</style>