<template>
  <div class="container">
    <div class="row justify-content-between">
      <div class="col-auto py-3">
        <label class="form-label">Home Team</label>
        <select class="form-select" v-model="homeTeam">
          <option selected></option>
          <option value="ARI">ARI</option>
          <option value="ATL">ATL</option>
          <option value="BAL">BAL</option>
          <option value="BUF">BUF</option>
          <option value="CAR">CAR</option>
          <option value="CHI">CHI</option>
          <option value="CIN">CIN</option>
          <option value="CLE">CLE</option>
          <option value="DAL">DAL</option>
          <option value="DEN">DEN</option>
          <option value="DET">DET</option>
          <option value="GB">GB</option>
          <option value="HOU">HOU</option>
          <option value="IND">IND</option>
          <option value="JAX">JAX</option>
          <option value="KC">KC</option>
          <option value="LV">LV</option>
          <option value="LAC">LAC</option>
          <option value="LAR">LAR</option>
          <option value="MIA">MIA</option>
          <option value="MIN">MIN</option>
          <option value="NE">NE</option>
          <option value="NO">NO</option>
          <option value="NYG">NYG</option>
          <option value="NYJ">NYJ</option>
          <option value="PHI">PHI</option>
          <option value="PHI">PIT</option>
          <option value="SF">SF</option>
          <option value="SEA">SEA</option>
          <option value="TB">TB</option>
          <option value="TEN">TEN</option>
          <option value="WAS">WAS</option>
        </select>
      </div>
      <div class="col-auto py-3">
        <label class="form-label">Home Team Score</label>
        <input type="text" v-model="homeScore" class="form-control" />
      </div>
      <div class="col-auto py-3">
        <label class="form-label">Away Team</label>
        <select class="form-select" v-model="awayTeam">
          <option selected></option>
          <option value="ARI">ARI</option>
          <option value="ATL">ATL</option>
          <option value="BAL">BAL</option>
          <option value="BUF">BUF</option>
          <option value="CAR">CAR</option>
          <option value="CHI">CHI</option>
          <option value="CIN">CIN</option>
          <option value="CLE">CLE</option>
          <option value="DAL">DAL</option>
          <option value="DEN">DEN</option>
          <option value="DET">DET</option>
          <option value="GB">GB</option>
          <option value="HOU">HOU</option>
          <option value="IND">IND</option>
          <option value="JAX">JAX</option>
          <option value="KC">KC</option>
          <option value="LV">LV</option>
          <option value="LAC">LAC</option>
          <option value="LAR">LAR</option>
          <option value="MIA">MIA</option>
          <option value="MIN">MIN</option>
          <option value="NE">NE</option>
          <option value="NO">NO</option>
          <option value="NYG">NYG</option>
          <option value="NYJ">NYJ</option>
          <option value="PHI">PHI</option>
          <option value="PHI">PIT</option>
          <option value="SF">SF</option>
          <option value="SEA">SEA</option>
          <option value="TB">TB</option>
          <option value="TEN">TEN</option>
          <option value="WAS">WAS</option>
        </select>
      </div>
      <div class="col-auto py-3">
        <label class="form-label">Away Team Score</label>
        <input type="text" v-model="awayScore" class="form-control" />
      </div>
      <div class="col-auto py-3">
        <label class="form-label">Date</label>
        <input
          type="text"
          class="form-control"
          placeholder="yyyy-mm-dd"
          v-model="date"
        />
      </div>
      <div class="col-auto py-3">
        <label class="form-label">Week #</label>
        <input type="text" class="form-control" v-model="week" />
      </div>
    </div>
    <div class="text-center py-5">
      <button class="btn btn-primary btn-lg" type="button" @click="onSubmit">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputScore",
  data() {
    return {
      homeTeam: "",
      awayTeam: "",
      homeScore: "",
      awayScore: "",
      date: "",
      week: "",
      scores: []
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (
        this.homeTeam != "" &&
        this.homeScore != "" &&
        !isNaN(this.homeScore) &&
        this.awayTeam != "" &&
        this.awayScore != "" &&
        !isNaN(this.awayScore) &&
        this.week != "" &&
        !isNaN(this.week) &&
        this.date.length === 10 &&
        !isNaN(
          this.date.substring(0, 4) +
            this.date.substring(5, 7) +
            this.date.substring(8, 10)
        ) &&
        this.date.substring(4, 5) == "-" &&
        this.date.substring(7, 8) == "-" &&
        parseInt(this.date.substring(5, 7)) <= 12 &&
        parseInt(this.date.substring(8, 10)) <= 31 &&
        this.homeTeam != this.awayTeam
      ) {
        this.homeScore = parseInt(this.homeScore);
        this.awayScore = parseInt(this.awayScore);
        this.week = parseInt(this.week);
        const newScore = {
          id: Math.floor(Math.random() * 100000) + 63778,
          AwayTeam: this.awayTeam,
          HomeTeam: this.homeTeam,
          AwayScore: this.awayScore,
          HomeScore: this.homeScore,
          Date: this.date,
          Week: this.week,
        };
        this.$emit("add-score", newScore);
        alert("Score successfully submitted.")
      } else
        alert(
          "Invalid input. Make sure you have correctly filled out each section."
        );
      this.homeTeam = "";
      this.awayTeam = "";
      this.homeScore = "";
      this.awayScore = "";
      this.date = "";
      this.week = "";
    },
  },
};
</script>
