<template>
    <tr>
        <th scope="col" @click="$emit('sort-click', 'team')">{{division}}</th>
        <th scope="col" @click="$emit('sort-click', 'wins')">Wins</th>
        <th scope="col" @click="$emit('sort-click', 'losses')">Losses</th>
        <th scope="col" @click="$emit('sort-click', 'PCT')">PCT</th>
        <th scope="col" class="d-none d-sm-table-cell" @click="$emit('sort-click', 'PF')">PF</th>
        <th scope="col" class="d-none d-sm-table-cell" @click="$emit('sort-click', 'PA')">PA</th>
        <th scope="col" @click="$emit('sort-click', 'net')">Net Pts</th>
        <th scope="col" class="d-none d-md-table-cell" @click="$emit('sort-click', 'home')">Home</th>
        <th scope="col" class="d-none d-md-table-cell" @click="$emit('sort-click', 'road')">Road</th>
        <th scope="col" class="d-none d-lg-table-cell" @click="$emit('sort-click', 'div')">Div</th>
        <th scope="col" class="d-none d-lg-table-cell" @click="$emit('sort-click', 'divPCT')">PCT</th>
        <th scope="col" class="d-none d-lg-table-cell" @click="$emit('sort-click', 'conf')">Conf</th>
        <th scope="col" class="d-none d-lg-table-cell" @click="$emit('sort-click', 'confPCT')">PCT</th>
        <th scope="col" class="d-none d-lg-table-cell" @click="$emit('sort-click', 'nonconf')">NonConf</th>
        <th scope="col" class="d-none d-xl-table-cell" @click="$emit('sort-click', 'streak')">Strk</th>
        <th scope="col" class="d-none d-xl-table-cell" @click="$emit('sort-click', 'last5')">Last 5</th>
    </tr>
</template>

<script>
    export default{
        name: "StandingsHeading",
        props:{
            division: String
        },
        emits:['sort-click']
    }
</script>
