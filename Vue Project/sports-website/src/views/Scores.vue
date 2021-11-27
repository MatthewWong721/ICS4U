<template>
  <div class="scores">
    <h1 class="fw-bold m-4">Games - Week {{ this.week }}</h1>
    <div v-for="game in weekScores" :key="game.GameKey">
      <ScoreCard :game="game" :teams="teams" :loaded="loaded" />
    </div>
    <Pagination :pageNumber="week" @change-page="changePage" />
  </div>
</template>

<script>
import ScoreCard from "@/components/ScoreCard.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Scores",
  components: {
    ScoreCard,
    Pagination,
  },
  data() {
    return {
      scores: Array,
      teams: [
        { abbrev: "ARI", name: "Arizona Cardinals" },
        { abbrev: "ATL", name: "Atlanta Falcons" },
        { abbrev: "BAL", name: "Baltimore Ravens" },
        { abbrev: "BUF", name: "Buffalo Bills" },
        { abbrev: "CAR", name: "Carolina Panthers" },
        { abbrev: "CHI", name: "Chicago Bears" },
        { abbrev: "CIN", name: "Cincinnati Bengals" },
        { abbrev: "CLE", name: "Cleveland Browns" },
        { abbrev: "DAL", name: "Dallas Cowboys" },
        { abbrev: "DEN", name: "Denver Broncos" },
        { abbrev: "DET", name: "Detroit Lions" },
        { abbrev: "GB", name: "Green Bay Packers" },
        { abbrev: "HOU", name: "Houston Texans" },
        { abbrev: "IND", name: "Indianapolis Colts" },
        { abbrev: "JAX", name: "Jacksonville Jaguars" },
        { abbrev: "KC", name: "Kansas City Chiefs" },
        { abbrev: "LV", name: "Las Vegas Raiders" },
        { abbrev: "LAC", name: "Los Angeles Chargers" },
        { abbrev: "LAR", name: "Los Angeles Rams" },
        { abbrev: "MIA", name: "Miami Dolphins" },
        { abbrev: "MIN", name: "Minnesota Vikings" },
        { abbrev: "NE", name: "New England Patriots" },
        { abbrev: "NO", name: "New Orleans Saints" },
        { abbrev: "NYG", name: "New York Giants" },
        { abbrev: "NYJ", name: "New York Jets" },
        { abbrev: "PHI", name: "Philadelphia Eagles" },
        { abbrev: "PIT", name: "Pittsburgh Steelers" },
        { abbrev: "SF", name: "San Francisco 49ers" },
        { abbrev: "SEA", name: "Seattle Seahawks" },
        { abbrev: "TB", name: "Tampa Bay Buccaneers" },
        { abbrev: "TEN", name: "Tennessee Titans" },
        { abbrev: "WAS", name: "Washington Football Team" },
      ],
      weekScores: Array,
      week: 0,
      loaded: false,
    };
  },
  methods: {
    async fetchScores() {
      const res = await fetch("http://localhost:5000/scores");
      const data = await res.json();
      return data;
    },
    initTeamStats() {
      for (let i = 0; i < this.teams.length; i++) {
        this.teams[i]["Wins"] = 0;
        this.teams[i]["Losses"] = 0;
        this.teams[i]["Ties"] = 0;
        let team = this.teams[i];
        let teamGames = this.scores.filter(
          (game) =>
            game.AwayTeam === team.abbrev || game.HomeTeam === team.abbrev
        );
        for (let j = 0; j < teamGames.length; j++) {
          let game = teamGames[j];
          if (game.AwayTeam === team.abbrev) {
            if (game.AwayScore > game.HomeScore) this.teams[i].Wins++;
            else if (game.AwayScore < game.HomeScore) this.teams[i].Losses++;
            else this.teams[i].Ties++;
          } else {
            if (game.HomeScore > game.AwayScore) this.teams[i].Wins++;
            else if (game.HomeScore < game.AwayScore) this.teams[i].Losses++;
            else this.teams[i].Ties++;
          }
        }
      }
    },
    changePage(input) {
      if (!input && this.week > 1) this.week--;
      else if (input && this.week < this.scores[0].Week) this.week++;
      this.weekScores = this.scores.filter((game) => game.Week === this.week);
    },
  },
  async created() {
    this.fetchScores().then((data) => {
      this.scores = data;
      this.scores = this.scores.filter((game) => game.Status != "Postponed");
      this.scores = this.scores.sort((b,a)=>(a.Week*999999999+parseInt(a.Date.substring(0,4))*99999+parseInt(a.Date.substring(5,7))*99+parseInt(a.Date.substring(8,10)))-(b.Week*999999999+parseInt(b.Date.substring(0,4))*99999+parseInt(b.Date.substring(5,7))*99+parseInt(b.Date.substring(8,10))));
      this.week = this.scores[0].Week;
      this.weekScores = this.scores.filter((game) => game.Week === this.week);
      this.initTeamStats();
      this.loaded = true;
    });
  },
};
</script>
