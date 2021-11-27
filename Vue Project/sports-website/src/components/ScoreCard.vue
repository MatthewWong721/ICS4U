<template>
  <div class="border border-2 p-3 m-4 bg-light" v-if="this.loaded">
    <h4 class="fw-bold p-3">{{ this.getDateString() }}</h4>
    <div class="row justify-content-between pt-4 px-5 text-dark">
      <p>Home</p>
      <h3 class="col-auto">{{ getTeam(this.game.HomeTeam).name }}</h3>
      <h6 class="col-sm pt-2 d-none d-md-inline">
        ({{ getTeam(this.game.HomeTeam).Wins }}/{{
          getTeam(this.game.HomeTeam).Losses
        }}/{{ getTeam(this.game.HomeTeam).Ties }})
      </h6>
      <h3 class="col-auto text-end px-5">{{ this.game.HomeScore }}</h3>
    </div>
    <div class="row justify-content-between pt-3 pb-4 px-5 text-black">
      <p>Away</p>
      <h3 class="col-auto">{{ getTeam(this.game.AwayTeam).name }}</h3>
      <h6 class="col-sm pt-2 d-none d-md-inline">
        ({{ getTeam(this.game.AwayTeam).Wins }}/{{
          getTeam(this.game.AwayTeam).Losses
        }}/{{ getTeam(this.game.AwayTeam).Ties }})
      </h6>
      <h3 class="col-auto text-end px-5">{{ this.game.AwayScore }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreCard",
  props: {
    game: Object,
    teams: Array,
    loaded: Boolean,
  },
  methods: {
    getDateString() {
      let day = this.game.Date.substring(8, 10);
      let month = this.game.Date.substring(5, 7);
      let year = this.game.Date.substring(0, 4);
      let dateString = "";
      if (month === "01") dateString += "January ";
      else if (month === "02") dateString += "February ";
      else if (month === "03") dateString += "March ";
      else if (month === "04") dateString += "April ";
      else if (month === "05") dateString += "May ";
      else if (month === "06") dateString += "June ";
      else if (month === "07") dateString += "July ";
      else if (month === "08") dateString += "August ";
      else if (month === "09") dateString += "September ";
      else if (month === "10") dateString += "October ";
      else if (month === "11") dateString += "November ";
      else dateString += "December ";

      if (day.substring(0, 1) === "0") dateString += day.substring(1, 2);
      else dateString += day;

      dateString += ", " + year;
      return dateString + " - FINAL";
    },
    getTeam(teamString) {
      for (let i = 0; i < this.teams.length; i++) {
        if (
          teamString === this.teams[i].abbrev ||
          teamString === this.teams[i].name
        )
          return this.teams[i];
      }
    },
  },
};
</script>
