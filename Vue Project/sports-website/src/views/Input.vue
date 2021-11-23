<template>
  <div class="input">
    <h1>Test</h1>
  </div>
</template>

<script>
  export default{
    async addScore(score){
      this.scores = [...this.scores, score]
    },
  }
</script>
