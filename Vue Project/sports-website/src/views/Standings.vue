<template>
  <div class="standings">
    <div id="main" class="mx-5 my-3">
      <div class="col-auto py-3">
        <input
          type="text"
          class="form-control"
          v-model="filterString"
          placeholder="Search for a team..."
          @keyup="filterTeams()"
        />
      </div>
      <div v-if="filterString.length == 0">
        <table class="table table-striped">
          <tbody>
            <StandingsHeading @sort-click="sortTeams" leftCol="NFC North" />
            <tr></tr>
            <StandingsRow :team="nNTeams[0]" :loaded="loaded" />
            <StandingsRow :team="nNTeams[1]" :loaded="loaded" />
            <StandingsRow :team="nNTeams[2]" :loaded="loaded" />
            <StandingsRow :team="nNTeams[3]" :loaded="loaded" />
          </tbody>
          <tbody>
            <StandingsHeading @sort-click="sortTeams" leftCol="NFC East" />
            <tr></tr>
            <StandingsRow :team="nETeams[0]" :loaded="loaded" />
            <StandingsRow :team="nETeams[1]" :loaded="loaded" />
            <StandingsRow :team="nETeams[2]" :loaded="loaded" />
            <StandingsRow :team="nETeams[3]" :loaded="loaded" />
          </tbody>
          <tbody>
            <StandingsHeading @sort-click="sortTeams" leftCol="NFC South" />
            <tr></tr>
            <StandingsRow :team="nSTeams[0]" :loaded="loaded" />
            <StandingsRow :team="nSTeams[1]" :loaded="loaded" />
            <StandingsRow :team="nSTeams[2]" :loaded="loaded" />
            <StandingsRow :team="nSTeams[3]" :loaded="loaded" />
          </tbody>
          <tbody>
            <StandingsHeading @sort-click="sortTeams" leftCol="NFC West" />
            <tr></tr>
            <StandingsRow :team="nWTeams[0]" :loaded="loaded" />
            <StandingsRow :team="nWTeams[1]" :loaded="loaded" />
            <StandingsRow :team="nWTeams[2]" :loaded="loaded" />
            <StandingsRow :team="nWTeams[3]" :loaded="loaded" />
          </tbody>
          <tbody>
            <StandingsHeading @sort-click="sortTeams" leftCol="AFC North" />
            <tr></tr>
            <StandingsRow :team="aNTeams[0]" :loaded="loaded" />
            <StandingsRow :team="aNTeams[1]" :loaded="loaded" />
            <StandingsRow :team="aNTeams[2]" :loaded="loaded" />
            <StandingsRow :team="aNTeams[3]" :loaded="loaded" />
          </tbody>
          <tbody>
            <StandingsHeading @sort-click="sortTeams" leftCol="AFC East" />
            <tr></tr>
            <StandingsRow :team="aETeams[0]" :loaded="loaded" />
            <StandingsRow :team="aETeams[1]" :loaded="loaded" />
            <StandingsRow :team="aETeams[2]" :loaded="loaded" />
            <StandingsRow :team="aETeams[3]" :loaded="loaded" />
          </tbody>
          <tbody>
            <StandingsHeading @sort-click="sortTeams" leftCol="AFC South" />
            <tr></tr>
            <StandingsRow :team="aSTeams[0]" :loaded="loaded" />
            <StandingsRow :team="aSTeams[1]" :loaded="loaded" />
            <StandingsRow :team="aSTeams[2]" :loaded="loaded" />
            <StandingsRow :team="aSTeams[3]" :loaded="loaded" />
          </tbody>
          <tbody>
            <StandingsHeading @sort-click="sortTeams" leftCol="AFC West" />
            <tr></tr>
            <StandingsRow :team="aWTeams[0]" :loaded="loaded" />
            <StandingsRow :team="aWTeams[1]" :loaded="loaded" />
            <StandingsRow :team="aWTeams[2]" :loaded="loaded" />
            <StandingsRow :team="aWTeams[3]" :loaded="loaded" />
          </tbody>
        </table>
      </div>
      <div v-else>
        <table class="table table-striped">
          <thead>
            <StandingsHeading @sort-click="sortTeams" leftCol="Team Name" />
          </thead>
          <tbody>
            <StandingsRow
              v-for="team in filteredTeams"
              :key="team.name"
              :team="team"
              :loaded="loaded"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import StandingsRow from "@/components/StandingsRow.vue";
import StandingsHeading from "@/components/StandingsHeading.vue";
export default {
  name: "Standings",
  components: {
    StandingsRow,
    StandingsHeading,
  },
  data() {
    return {
      scores: [],
      teams: [
        { abbrev: "ARI", name: "Arizona Cardinals", division: "NFC West" },
        { abbrev: "ATL", name: "Atlanta Falcons", division: "NFC South" },
        { abbrev: "BAL", name: "Baltimore Ravens", division: "AFC North" },
        { abbrev: "BUF", name: "Buffalo Bills", division: "AFC East" },
        { abbrev: "CAR", name: "Carolina Panthers", division: "NFC South" },
        { abbrev: "CHI", name: "Chicago Bears", division: "NFC North" },
        { abbrev: "CIN", name: "Cincinnati Bengals", division: "AFC North" },
        { abbrev: "CLE", name: "Cleveland Browns", division: "AFC North" },
        { abbrev: "DAL", name: "Dallas Cowboys", division: "NFC East" },
        { abbrev: "DEN", name: "Denver Broncos", division: "AFC West" },
        { abbrev: "DET", name: "Detroit Lions", division: "NFC North" },
        { abbrev: "GB", name: "Green Bay Packers", division: "NFC North" },
        { abbrev: "HOU", name: "Houston Texans", division: "AFC South" },
        { abbrev: "IND", name: "Indianapolis Colts", division: "AFC South" },
        { abbrev: "JAX", name: "Jacksonville Jaguars", division: "AFC South" },
        { abbrev: "KC", name: "Kansas City Chiefs", division: "AFC West" },
        { abbrev: "LV", name: "Las Vegas Raiders", division: "AFC West" },
        { abbrev: "LAC", name: "Los Angeles Chargers", division: "AFC West" },
        { abbrev: "LAR", name: "Los Angeles Rams", division: "NFC West" },
        { abbrev: "MIA", name: "Miami Dolphins", division: "AFC East" },
        { abbrev: "MIN", name: "Minnesota Vikings", division: "NFC North" },
        { abbrev: "NE", name: "New England Patriots", division: "AFC East" },
        { abbrev: "NO", name: "New Orleans Saints", division: "NFC South" },
        { abbrev: "NYG", name: "New York Giants", division: "NFC East" },
        { abbrev: "NYJ", name: "New York Jets", division: "AFC East" },
        { abbrev: "PHI", name: "Philadelphia Eagles", division: "NFC East" },
        { abbrev: "PIT", name: "Pittsburgh Steelers", division: "AFC North" },
        { abbrev: "SF", name: "San Francisco 49ers", division: "NFC West" },
        { abbrev: "SEA", name: "Seattle Seahawks", division: "NFC West" },
        { abbrev: "TB", name: "Tampa Bay Buccaneers", division: "NFC South" },
        { abbrev: "TEN", name: "Tennessee Titans", division: "AFC South" },
        {
          abbrev: "WAS",
          name: "Washington Football Team",
          division: "NFC East",
        },
      ],
      sortDirection: "ASC",
      currentSortField: "team",
      nNTeams: [],
      nETeams: [],
      nSTeams: [],
      nWTeams: [],
      aNTeams: [],
      aETeams: [],
      aSTeams: [],
      aWTeams: [],
      loaded: false,
      filterString: "",
      filteredTeams: [],
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
        this.teams[i]["PF"] = 0;
        this.teams[i]["PA"] = 0;
        this.teams[i]["HomeWins"] = 0;
        this.teams[i]["HomeLosses"] = 0;
        this.teams[i]["HomeTies"] = 0;
        this.teams[i]["AwayWins"] = 0;
        this.teams[i]["AwayLosses"] = 0;
        this.teams[i]["AwayTies"] = 0;
        this.teams[i]["DivisionWins"] = 0;
        this.teams[i]["DivisionLosses"] = 0;
        this.teams[i]["DivisionTies"] = 0;
        this.teams[i]["ConferenceWins"] = 0;
        this.teams[i]["ConferenceLosses"] = 0;
        this.teams[i]["ConferenceTies"] = 0;
        this.teams[i]["NonconferenceWins"] = 0;
        this.teams[i]["NonconferenceLosses"] = 0;
        this.teams[i]["NonconferenceTies"] = 0;
        this.teams[i]["Last5Wins"] = 0;
        this.teams[i]["Last5Losses"] = 0;
        this.teams[i]["Last5Ties"] = 0;
        this.teams[i]["Streak"] = 1;
        let team = this.teams[i];
        let teamGames = this.scores.filter(
          (game) =>
            game.AwayTeam === team.abbrev || game.HomeTeam === team.abbrev
        );
        let streakOngoing = true;
        for (let j = 0; j < teamGames.length; j++) {
          let game = teamGames[j];
          let type = this.gameType(game);
          if (game.AwayTeam === team.abbrev) {
            if (game.AwayScore > game.HomeScore) {
              this.teams[i].Wins++;
              this.teams[i].AwayWins++;
              if (type === 0) this.teams[i].ConferenceWins++;
              else this.teams[i].NonconferenceWins++;
              if (type === -1) this.teams[i].DivisionWins++;
              if (j < 5) this.teams[i].Last5Wins++;
              if (j === 0) this.teams[i]["StreakType"] = "W";
              else if (this.teams[i].StreakType === "W" && streakOngoing)
                this.teams[i].Streak++;
              else streakOngoing = false;
            } else if (game.AwayScore < game.HomeScore) {
              this.teams[i].Losses++;
              this.teams[i].AwayLosses++;
              if (type === 0) this.teams[i].ConferenceLosses++;
              else this.teams[i].NonconferenceLosses++;
              if (type === -1) this.teams[i].DivisionLosses++;
              if (j < 5) this.teams[i].Last5Losses++;
              if (j === 0) this.teams[i]["StreakType"] = "L";
              else if (this.teams[i].StreakType === "L" && streakOngoing)
                this.teams[i].Streak++;
              else streakOngoing = false;
            } else {
              this.teams[i].Ties++;
              this.teams[i].AwayTies++;
              if (type === 0) this.teams[i].ConferenceTies++;
              else this.teams[i].NonconferenceTies++;
              if (type === -1) this.teams[i].DivisionTies++;
              if (j < 5) this.teams[i].Last5Ties++;
              if (j === 0) this.teams[i]["StreakType"] = "T";
              else if (this.teams[i].StreakType === "T" && streakOngoing)
                this.teams[i].Streak++;
              else streakOngoing = false;
            }
            this.teams[i].PF += game.AwayScore;
            this.teams[i].PA += game.HomeScore;
          } else {
            if (game.HomeScore > game.AwayScore) {
              this.teams[i].Wins++;
              this.teams[i].HomeWins++;
              if (type === 0) this.teams[i].ConferenceWins++;
              else this.teams[i].NonconferenceWins++;
              if (type === -1) this.teams[i].DivisionWins++;
              if (j < 5) this.teams[i].Last5Wins++;
              if (j === 0) this.teams[i]["StreakType"] = "W";
              else if (this.teams[i].StreakType === "W" && streakOngoing)
                this.teams[i].Streak++;
              else streakOngoing = false;
            } else if (game.HomeScore < game.AwayScore) {
              this.teams[i].Losses++;
              this.teams[i].HomeLosses++;
              if (type === 0) this.teams[i].ConferenceLosses++;
              else this.teams[i].NonconferenceLosses++;
              if (type === -1) this.teams[i].DivisionLosses++;
              if (j < 5) this.teams[i].Last5Losses++;
              if (j === 0) this.teams[i]["StreakType"] = "L";
              else if (this.teams[i].StreakType === "L" && streakOngoing)
                this.teams[i].Streak++;
              else streakOngoing = false;
            } else {
              this.teams[i].Ties++;
              this.teams[i].HomeTies++;
              if (type === 0) this.teams[i].ConferenceTies++;
              else this.teams[i].NonconferenceTies++;
              if (type === -1) this.teams[i].DivisionTies++;
              if (j < 5) this.teams[i].Last5Ties++;
              if (j === 0) this.teams[i]["StreakType"] = "T";
              else if (this.teams[i].StreakType === "T" && streakOngoing)
                this.teams[i].Streak++;
              else streakOngoing = false;
            }
            this.teams[i].PF += game.HomeScore;
            this.teams[i].PA += game.AwayScore;
          }
        }
        this.teams[i]["StreakValue"] = 0;
        if (this.teams[i].StreakType === "W")
          this.teams[i].StreakValue = this.teams[i].Streak;
        else if (this.teams[i].StreakType === "L")
          this.teams[i].StreakValue = -1 * this.teams[i].Streak;
      }
    },
    gameType(game) {
      let a = game.AwayTeam;
      let b = game.HomeTeam;
      if (
        ((a === "ARI" || a === "LAR" || a === "SF" || a === "SEA") &&
          (b === "ARI" || b === "LAR" || b === "SF" || b === "SEA")) ||
        ((a === "GB" || a === "MIN" || a === "CHI" || a === "DET") &&
          (b === "GB" || b === "MIN" || b === "CHI" || b === "DET")) ||
        ((a === "TB" || a === "NO" || a === "ATL" || a === "CAR") &&
          (b === "TB" || b === "NO" || b === "ATL" || b === "CAR")) ||
        ((a === "DAL" || a === "WAS" || a === "PHI" || a === "NYG") &&
          (b === "DAL" || b === "WAS" || b === "PHI" || b === "NYG")) ||
        ((a === "TEN" || a === "IND" || a === "JAX" || a === "HOU") &&
          (b === "TEN" || b === "IND" || b === "JAX" || b === "HOU")) ||
        ((a === "BUF" || a === "NE" || a === "NYJ" || a === "MIA") &&
          (b === "BUF" || b === "NE" || b === "NYJ" || b === "MIA")) ||
        ((a === "LV" || a === "LAC" || a === "KC" || a === "DEN") &&
          (b === "LV" || b === "LAC" || b === "KC" || b === "DEN")) ||
        ((a === "CIN" || a === "BAL" || a === "CLE" || a === "PIT") &&
          (b === "CIN" || b === "BAL" || b === "CLE" || b === "PIT"))
      )
        return -1;
      if (
        !(
          (a === "ARI" ||
            a === "LAR" ||
            a === "SF" ||
            a === "SEA" ||
            a === "GB" ||
            a === "MIN" ||
            a === "CHI" ||
            a === "DET" ||
            a === "TB" ||
            a === "NO" ||
            a === "ATL" ||
            a === "CAR" ||
            a === "DAL" ||
            a === "WAS" ||
            a === "PHI" ||
            a === "NYG") &&
          (b === "TEN" ||
            b === "IND" ||
            b === "JAX" ||
            b === "HOU" ||
            b === "BUF" ||
            b === "NE" ||
            b === "NYJ" ||
            b === "MIA" ||
            b === "LV" ||
            b === "LAC" ||
            b === "KC" ||
            b === "DEN" ||
            b === "CIN" ||
            b === "BAL" ||
            b === "CLE" ||
            b === "PIT")
        )
      )
        return 0;
    },
    createTeamsArrays() {
      this.nNTeams = this.teams.filter((team) => team.division === "NFC North");
      this.nETeams = this.teams.filter((team) => team.division === "NFC East");
      this.nSTeams = this.teams.filter((team) => team.division === "NFC South");
      this.nWTeams = this.teams.filter((team) => team.division === "NFC West");
      this.aNTeams = this.teams.filter((team) => team.division === "AFC North");
      this.aETeams = this.teams.filter((team) => team.division === "AFC East");
      this.aSTeams = this.teams.filter((team) => team.division === "AFC South");
      this.aWTeams = this.teams.filter((team) => team.division === "AFC West");
    },
    sortTeams(field) {
      if (field === undefined) {
        field = this.currentSortField;
      } else if (field === this.currentSortField) {
        if (this.sortDirection === "ASC") this.sortDirection = "DSC";
        else if (this.sortDirection === "DSC") this.sortDirection = "ASC";
      }
      if (this.sortDirection === "ASC") {
        if (field === "team")
          this.teams.sort((a, b) => (a.name > b.name ? -1 : 1));
        else if (field === "wins") this.teams.sort((a, b) => a.Wins - b.Wins);
        else if (field === "losses")
          this.teams.sort((a, b) => a.Losses - b.Losses);
        else if (field === "ties") this.teams.sort((a, b) => a.Ties - b.Ties);
        else if (field === "PCT")
          this.teams.sort(
            (a, b) =>
              a.Wins / (a.Wins + a.Losses + a.Ties) -
              b.Wins / (b.Wins + b.Losses + b.Ties)
          );
        else if (field === "PF") this.teams.sort((a, b) => a.PF - b.PF);
        else if (field === "PA") this.teams.sort((a, b) => a.PA - b.PA);
        else if (field === "net")
          this.teams.sort((a, b) => a.PF - a.PA - (b.PF - b.PA));
        else if (field === "home")
          this.teams.sort((a, b) => a.HomeWins - b.HomeWins);
        else if (field === "road")
          this.teams.sort((a, b) => a.AwayWins - b.AwayWins);
        else if (field === "div")
          this.teams.sort((a, b) => a.DivisionWins - b.DivisionWins);
        else if (field === "divPCT")
          this.teams.sort(
            (a, b) =>
              a.DivisionWins /
                (a.DivisionWins + a.DivisionLosses + a.DivisionTies) -
              b.DivisionWins /
                (b.DivisionWins + b.DivisionLosses + b.DivisionTies)
          );
        else if (field === "conf")
          this.teams.sort((a, b) => a.ConferenceWins - b.ConferenceWins);
        else if (field === "confPCT")
          this.teams.sort(
            (a, b) =>
              a.ConferenceWins /
                (a.ConferenceWins + a.ConferenceLosses + a.ConferenceTies) -
              b.ConferenceWins /
                (b.ConferenceWins + b.ConferenceLosses + b.ConferenceTies)
          );
        else if (field === "nonconf")
          this.teams.sort((a, b) => a.NonconferenceWins - b.NonconferenceWins);
        else if (field === "streak")
          this.teams.sort((a, b) => a.StreakValue - b.StreakValue);
        else if (field === "last5")
          this.teams.sort((a, b) => a.Last5Wins - b.Last5Wins);
      } else if (this.sortDirection === "DSC") {
        if (field === "team")
          this.teams.sort((a, b) => (a.name > b.name ? 1 : -1));
        else if (field === "wins") this.teams.sort((b, a) => a.Wins - b.Wins);
        else if (field === "losses")
          this.teams.sort((b, a) => a.Losses - b.Losses);
        else if (field === "ties") this.teams.sort((b, a) => a.Ties - b.Ties);
        else if (field === "PCT")
          this.teams.sort(
            (b, a) =>
              a.Wins / (a.Wins + a.Losses + a.Ties) -
              b.Wins / (b.Wins + b.Losses + b.Ties)
          );
        else if (field === "PF") this.teams.sort((b, a) => a.PF - b.PF);
        else if (field === "PA") this.teams.sort((b, a) => a.PA - b.PA);
        else if (field === "net")
          this.teams.sort((b, a) => a.PF - a.PA - (b.PF - b.PA));
        else if (field === "home")
          this.teams.sort((b, a) => a.HomeWins - b.HomeWins);
        else if (field === "road")
          this.teams.sort((b, a) => a.AwayWins - b.AwayWins);
        else if (field === "div")
          this.teams.sort((b, a) => a.DivisionWins - b.DivisionWins);
        else if (field === "divPCT")
          this.teams.sort(
            (b, a) =>
              a.DivisionWins /
                (a.DivisionWins + a.DivisionLosses + a.DivisionTies) -
              b.DivisionWins /
                (b.DivisionWins + b.DivisionLosses + b.DivisionTies)
          );
        else if (field === "conf")
          this.teams.sort((b, a) => a.ConferenceWins - b.ConferenceWins);
        else if (field === "confPCT")
          this.teams.sort(
            (b, a) =>
              a.ConferenceWins /
                (a.ConferenceWins + a.ConferenceLosses + a.ConferenceTies) -
              b.ConferenceWins /
                (b.ConferenceWins + b.ConferenceLosses + b.ConferenceTies)
          );
        else if (field === "nonconf")
          this.teams.sort((b, a) => a.NonconferenceWins - b.NonconferenceWins);
        else if (field === "streak")
          this.teams.sort((b, a) => a.StreakValue - b.StreakValue);
        else if (field === "last5")
          this.teams.sort((b, a) => a.Last5Wins - b.Last5Wins);
      }
      this.currentSortField = field;
      this.createTeamsArrays();
      this.filterTeams();
    },
    filterTeams() {
      if (this.filterString != "") {
        this.filteredTeams = this.teams.filter(
          (team) =>
            team.name
              .substring(0, this.filterString.length)
              .localeCompare(this.filterString, "en", {
                sensitivity: "accent",
              }) === 0
        );
      }
    },
  },
  async created() {
    this.fetchScores().then((data) => {
      this.scores = data;
      this.scores = this.scores.filter((game) => game.Status != "Postponed");
      this.initTeamStats();
      this.createTeamsArrays();
      this.sortTeams(this.currentSortField);
      this.filteredTeams = this.teams;
      this.loaded = true;
    });
  },
};
</script>
