<template>
    <div class="d-flex justify-content-center align-items-center fixed-bottom" id="paginationButtons">
        <div><button class="btn btn-secondary btn-lg col-sm" type="button" @click="$emit('change-page',false)"><h5 class="fw-bold">&lt;</h5></button></div>
        <div><h1><span class="badge bg-primary" id="pageNumber">Week {{this.pageNumber}}</span></h1></div>
        <div><button class="btn btn-secondary btn-lg col-sm" type="button" @click="$emit('change-page',true)"><h5 class="fw-bold">&gt;</h5></button></div>
    </div>
</template>

<script>
    export default{
        name: "Pagination",
        props:{
            pageNumber: Number
        }
    }
</script>
