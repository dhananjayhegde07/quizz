<script>
	import { fetch_our_data, our_data } from "./our";
	import OurDetail from "./our_detail.svelte";
    import OurQuizList from "./our_quiz_list.svelte";
    import OurTopic from "./our_topic.svelte";
    let show=false
    our_data.subscribe(async(val)=>{
        if(val.fetched==false){
            await $fetch_our_data()
            return
        }
        show=true
    })
    let list_topic=[]
    let item_detail
</script>


{#if show}
    <div class="h-full w-full mt-4 flex justify-around">
        <div class="h-full w-[48%] flex flex-col justify-between">
            <div class="h-[48%]">
                <OurTopic on:change={(data)=>{
                    list_topic=$our_data.data[data.detail]
                }}></OurTopic>
            </div>
            <div class="h-[48%]">
                <OurQuizList data={list_topic} on:change={(data)=>{
                    item_detail=list_topic[data.detail]
                }}></OurQuizList>
            </div>
        </div>
        <div class="h-full w-[48%] bg-slate-200">
            <OurDetail data={item_detail}></OurDetail>
        </div>
    </div>
{/if}