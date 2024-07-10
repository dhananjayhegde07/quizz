<script>
	import { conduct_data, reports, update_conduct_data } from "$lib/writable/data";
	import { socketio } from "$lib/writable/sockets";

    const socket=$socketio

    socket.on('new_req',async(data)=>{
        //get the doc and update conduct_data
    })
    socket.on('new_conduct_register',(data)=>{
        let arr=$conduct_data.data
        arr.push(data)
        console.log('xx');
        conduct_data.set({...$conduct_data,data:arr})
    })
    socket.on('new_taken_user',()=>{
        reports.set({fetched:false,data:$reports.data})
        $update_conduct_data()
    })
</script>


<div>

</div>


<style>
    div{
        position: absolute;
        display: none;
    }
</style>