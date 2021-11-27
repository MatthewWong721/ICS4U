<template>
  <InputScore @add-score="addScore"/>
</template>

<script>
import InputScore from "@/components/InputScore.vue";
export default {
  name: "Input",
  data(){
    return{
      scores:[]
    }
  },
  components: {
    InputScore,
  },
  methods: {
    async addScore(newScore){
      await fetch("http://localhost:5000/scores", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newScore),
      });
    }
  },
};
</script>