<script>
    export let on=false
</script>

{#if on}
    <div class="absolute top-0 left-0 h-full w-full grid place-items-center">
        <img src="/loading.gif" alt="" class="h-8">
    </div>
{/if}

<style>
    div{
        background-color: rgba(240, 248, 255, 0.433);
    }
</style>