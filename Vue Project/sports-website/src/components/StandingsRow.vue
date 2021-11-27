<template>
  <tr>
    <td scope="col" v-if="this.loaded">{{ this.team.name }}</td>
    <td scope="col" v-else>Loading...</td>
    <td scope="col" v-if="this.loaded">{{ this.team.Wins }}</td>
    <td scope="col" v-if="this.loaded">{{ this.team.Losses }}</td>
    <td scope="col" v-if="this.loaded">{{ this.team.Ties }}</td>
    <td scope="col" class="d-none d-sm-table-cell" v-if="this.loaded">
      {{
        (
          this.team.Wins /
          (this.team.Wins + this.team.Losses + this.team.Ties)
        ).toFixed(2)
      }}
    </td>
    <td scope="col" class="d-none d-md-table-cell" v-if="this.loaded">
      {{ this.team.PF }}
    </td>
    <td scope="col" class="d-none d-md-table-cell" v-if="this.loaded">
      {{ this.team.PA }}
    </td>
    <td scope="col" class="d-none d-sm-table-cell" v-if="this.loaded">{{ this.team.PF - this.team.PA }}</td>
    <td scope="col" class="d-none d-md-table-cell" v-if="this.loaded">
      {{
        this.team.HomeWins +
        "/" +
        this.team.HomeLosses +
        "/" +
        this.team.HomeTies
      }}
    </td>
    <td scope="col" class="d-none d-md-table-cell" v-if="this.loaded">
      {{
        this.team.AwayWins +
        "/" +
        this.team.AwayLosses +
        "/" +
        this.team.AwayTies
      }}
    </td>
    <td scope="col" class="d-none d-lg-table-cell" v-if="this.loaded">
      {{
        this.team.DivisionWins +
        "/" +
        this.team.DivisionLosses +
        "/" +
        this.team.DivisionTies
      }}
    </td>
    <td scope="col" class="d-none d-lg-table-cell" v-if="this.loaded">
      {{
        (
          this.team.DivisionWins /
          (this.team.DivisionWins +
            this.team.DivisionLosses +
            this.team.DivisionTies)
        ).toFixed(2)
      }}
    </td>
    <td scope="col" class="d-none d-lg-table-cell" v-if="this.loaded">
      {{
        this.team.ConferenceWins +
        "/" +
        this.team.ConferenceLosses +
        "/" +
        this.team.ConferenceTies
      }}
    </td>
    <td scope="col" class="d-none d-lg-table-cell" v-if="this.loaded">
      {{
        (
          this.team.ConferenceWins /
          (this.team.ConferenceWins +
            this.team.ConferenceLosses +
            this.team.ConferenceTies)
        ).toFixed(2)
      }}
    </td>
    <td scope="col" class="d-none d-lg-table-cell" v-if="this.loaded">
      {{
        this.team.NonconferenceWins +
        "/" +
        this.team.NonconferenceLosses +
        "/" +
        this.team.NonconferenceTies
      }}
    </td>
    <td scope="col" class="d-none d-xl-table-cell" v-if="this.loaded">
      {{ this.team.Streak + this.team.StreakType }}
    </td>
    <td scope="col" class="d-none d-xl-table-cell" v-if="this.loaded">
      {{
        this.team.Last5Wins +
        "/" +
        this.team.Last5Losses +
        "/" +
        this.team.Last5Ties
      }}
    </td>
  </tr>
</template>

<script>
export default {
  name: "StandingsRow",
  props: {
    team: Object,
    loaded: Boolean,
  },
};
</script>
