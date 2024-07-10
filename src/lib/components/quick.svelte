<script>
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
</script>

<div class="main" style="width: {width_div};">
    <div class="overley">
        <h2>Quick actions</h2>
        <div class="panel">
            <div class="bg take">
                    <div class="grid place-items-center mt-3"><img src="/join.png" alt=""></div>
                    <p>Take a quizz</p>
                <div class="grid place-items-center"><button>Go!</button></div>
            </div>
            <div class="extra">
                <div class="bg other">
                    <div class="flex">
                        <img src="/quiz.png" alt="">
                        <p>Conduct a quizz</p>
                    </div>
                    <button>Go!</button>
                </div>
                <div class="bg other">
                    <div class="flex">
                        <img src="/class.png" alt="">
                        <p>Create a class</p>
                    </div>
                    <button>Go!</button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .main{
        height: 300px;
        /* width: 45%; */
        background-image: url(/quick.jpeg);
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 5px;
    }
    h2{
        height: 30px;
        font-size: 1.5em;
        display: grid;
        place-items: center;
    }
    .overley{
        padding: 5px;
        height: 100%;
        width: 100%;
        border-radius: 5px;
        background-color: rgba(240, 248, 255, 0.412);
    }
    /* .overley div{
        display: flex;
        align-items: center;
        margin: 10px 0px;
    } */
    /* .overley div img{
        height: 40px;
        margin: 0px 10px;
    } */
    button{
        background-color: rgba(59, 134, 59, 0.873);
        height: 30px;
        width: 80px;
        border-radius: 5px;
    }
    .overley div p{
        font-size: 1.2em;
    }
    .panel{
        margin-top: 20px;
        height: 80%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 10px;
    }
    .bg{
        background-color: aliceblue;
        border-radius: 5px;
    }
    .extra{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .extra img{
        height: 40px;
    }
    .other{
        height: 45%;
        display: grid;
        place-items: center;
    }
    .take p{
        text-align: center;
        margin-top: 10px;
    }
    .take img{
        height: 80px;
    }
    .take button{
        margin-top: 10px;
    }
</style>