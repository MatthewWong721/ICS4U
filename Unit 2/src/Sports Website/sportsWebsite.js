
async function getScores() {
    const response = await fetch('games.json');
    const data = await response.json();
    return data;
}

const scoresString = localStorage.getItem("storedScores")

let jsonScores = [];
let scores = [];
getScores().then(data => {jsonScores = data; scores = scoresString != null ? JSON.parse(scoresString) : jsonScores; scores = scores.filter(game=>game.Status!="Postponed"); initDate(); sortByDate(); initTeamStats(); load()});

const teams = [{abbrev:"ARI", name:"Arizona Cardinals", division:"NFC West"}, {abbrev:"ATL", name:"Atlanta Falcons", division:"NFC South"}, {abbrev:"BAL", name:"Baltimore Ravens", division:"AFC North"}, {abbrev:"BUF", name:"Buffalo Bills", division:"AFC East"}, {abbrev:"CAR", name:"Carolina Panthers", division:"NFC South"}, {abbrev:"CHI", name:"Chicago Bears", division:"NFC North"}, {abbrev:"CIN", name:"Cincinnati Bengals", division:"AFC North"}, {abbrev:"CLE", name:"Cleveland Browns", division:"AFC North"}, {abbrev:"DAL", name:"Dallas Cowboys", division:"NFC East"}, {abbrev:"DEN", name:"Denver Broncos", division:"AFC West"}, {abbrev:"DET", name:"Detroit Lions", division:"NFC North"}, {abbrev:"GB", name:"Green Bay Packers", division:"NFC North"}, {abbrev:"HOU", name:"Houston Texans", division:"AFC South"}, {abbrev:"IND", name:"Indianapolis Colts", division:"AFC South"}, {abbrev:"JAX", name:"Jacksonville Jaguars", division:"AFC South"}, {abbrev:"KC", name:"Kansas City Chiefs", division:"AFC West"}, {abbrev:"LV", name:"Las Vegas Raiders", division:"AFC West"}, {abbrev:"LAC", name:"Los Angeles Chargers", division:"AFC West"}, {abbrev:"LAR", name:"Los Angeles Rams", division:"NFC West"}, {abbrev:"MIA", name:"Miami Dolphins", division:"AFC East"}, {abbrev:"MIN", name:"Minnesota Vikings", division:"NFC North"}, {abbrev:"NE", name:"New England Patriots", division:"AFC East"}, {abbrev:"NO", name:"New Orleans Saints", division:"NFC South"}, {abbrev:"NYG", name:"New York Giants", division:"NFC East"}, {abbrev:"NYJ", name:"New York Jets", division:"AFC East"}, {abbrev:"PHI", name:"Philadelphia Eagles", division:"NFC East"}, {abbrev:"PIT", name:"Pittsburgh Steelers", division:"AFC North"}, {abbrev:"SF", name:"San Francisco 49ers", division:"NFC West"}, {abbrev:"SEA", name:"Seattle Seahawks", division:"NFC West"}, {abbrev:"TB", name:"Tampa Bay Buccaneers", division:"NFC South"}, {abbrev:"TEN", name:"Tennessee Titans", division:"AFC South"}, {abbrev:"WAS", name:"Washington Football Team", division:"NFC East"}]
let scorePage = null

// function teamConvert(team){
//     // if(isNaN(team)){
//     //     console.log(team);
//     // }else{
//     //     return teamAbbrevs[team];
//     // }
//     for(i=0;i<teams.length;i++){
//         if(team===teams[i].abbrev)
//             return teams[i].name
//     }
// }

function gameType(game){
    let a = game.AwayTeam
    let b = game.HomeTeam
    // if(getTeam(game.AwayTeam).division===getTeam(game.HomeTeam).division)
    //     return -1
    // else if(getTeam(game.AwayTeam).division.substring(0,3)===getTeam(game.HomeTeam).division.substring(0,3))
    //     return 0
    // else
    //     return 1
    if(((a==="ARI"||a==="LAR"||a==="SF"||a==="SEA")&&(b==="ARI"||b==="LAR"||b==="SF"||b==="SEA"))||((a==="GB"||a==="MIN"||a==="CHI"||a==="DET")&&(b==="GB"||b==="MIN"||b==="CHI"||b==="DET"))||((a==="TB"||a==="NO"||a==="ATL"||a==="CAR")&&(b==="TB"||b==="NO"||b==="ATL"||b==="CAR"))||((a==="DAL"||a==="WAS"||a==="PHI"||a==="NYG")&&(b==="DAL"||b==="WAS"||b==="PHI"||b==="NYG"))||((a==="TEN"||a==="IND"||a==="JAX"||a==="HOU")&&(b==="TEN"||b==="IND"||b==="JAX"||b==="HOU"))||((a==="BUF"||a==="NE"||a==="NYJ"||a==="MIA")&&(b==="BUF"||b==="NE"||b==="NYJ"||b==="MIA"))||((a==="LV"||a==="LAC"||a==="KC"||a==="DEN")&&(b==="LV"||b==="LAC"||b==="KC"||b==="DEN"))||((a==="CIN"||a==="BAL"||a==="CLE"||a==="PIT")&&(b==="CIN"||b==="BAL"||b==="CLE"||b==="PIT")))
        return -1
    if(!(((a==="ARI"||a==="LAR"||a==="SF"||a==="SEA"||a==="GB"||a==="MIN"||a==="CHI"||a==="DET"||a==="TB"||a==="NO"||a==="ATL"||a==="CAR"||a==="DAL"||a==="WAS"||a==="PHI"||a==="NYG")&&(b==="TEN"||b==="IND"||b==="JAX"||b==="HOU"||b==="BUF"||b==="NE"||b==="NYJ"||b==="MIA"||b==="LV"||b==="LAC"||b==="KC"||b==="DEN"||b==="CIN"||b==="BAL"||b==="CLE"||b==="PIT"))))
        return 0
}

function initTeamStats(){
    for(i=0;i<teams.length;i++){
        teams[i]["Wins"] = 0
        teams[i]["Losses"] = 0
        teams[i]["Ties"] = 0
        teams[i]["PF"] = 0
        teams[i]["PA"] = 0
        teams[i]["HomeWins"] = 0
        teams[i]["HomeLosses"] = 0
        teams[i]["HomeTies"] = 0
        teams[i]["DivisionWins"] = 0
        teams[i]["DivisionLosses"] = 0
        teams[i]["DivisionTies"] = 0
        teams[i]["ConferenceWins"] = 0
        teams[i]["ConferenceLosses"] = 0
        teams[i]["ConferenceTies"] = 0
        teams[i]["Last5Wins"] = 0
        teams[i]["Last5Losses"] = 0
        teams[i]["Last5Ties"] = 0
        teams[i]["Streak"] = 1
        let team = teams[i]
        let teamGames = scores.filter(game=>game.AwayTeam===team.abbrev||game.HomeTeam===team.abbrev)
        let streakOngoing = true
        for(j=0; j<teamGames.length;j++){
            let game = teamGames[j]
            let type = gameType(game)
            if(game.AwayTeam===team.abbrev){
                if(game.AwayScore>game.HomeScore){
                    teams[i].Wins++;
                    if(type===0)
                        teams[i].ConferenceWins++;
                    if(type===-1)
                        teams[i].DivisionWins++;
                    if(j<5)
                        teams[i].Last5Wins++;
                    if(j===0)
                        teams[i]["StreakType"]="W"
                    else if(teams[i].StreakType==="W"&&streakOngoing)
                        teams[i].Streak++;
                    else
                        streakOngoing = false
                }else if(game.AwayScore<game.HomeScore){
                    teams[i].Losses++;
                    if(type===0)
                        teams[i].ConferenceLosses++;
                    if(type===-1)
                        teams[i].DivisionLosses++;
                    if(j<5)
                        teams[i].Last5Losses++;
                    if(j===0)
                        teams[i]["StreakType"]="L"
                    else if(teams[i].StreakType==="L"&&streakOngoing)
                        teams[i].Streak++;
                    else
                        streakOngoing = false
                }else{
                    teams[i].Ties++;
                    if(type===0)
                        teams[i].ConferenceTies++;
                    if(type===-1)
                        teams[i].DivisionTies++;
                    if(j<5)
                        teams[i].Last5Ties++;
                    if(j===0)
                        teams[i]["StreakType"]="T"
                    else if(teams[i].StreakType==="T"&&streakOngoing)
                        teams[i].Streak++;
                    else
                        streakOngoing = false
                }
                teams[i].PF+=game.AwayScore
                teams[i].PA+=game.HomeScore
            }else{
                if(game.HomeScore>game.AwayScore){
                    teams[i].Wins++;
                    teams[i].HomeWins++;
                    if(type===0)
                        teams[i].ConferenceWins++;
                    if(type===-1)
                        teams[i].DivisionWins++;
                    if(j<5)
                        teams[i].Last5Wins++;
                    if(j===0)
                        teams[i]["StreakType"]="W"
                    else if(teams[i].StreakType==="W"&&streakOngoing)
                        teams[i].Streak++;
                    else
                        streakOngoing = false
                }else if(game.HomeScore<game.AwayScore){
                    teams[i].Losses++;
                    teams[i].HomeLosses++;
                    if(type===0)
                        teams[i].ConferenceLosses++;
                    if(type===-1)
                        teams[i].DivisionLosses++;
                    if(j<5)
                        teams[i].Last5Losses++;
                    if(j===0)
                        teams[i]["StreakType"]="L"
                    else if(teams[i].StreakType==="L"&&streakOngoing)
                        teams[i].Streak++;
                    else
                        streakOngoing = false
                }else{
                    teams[i].Ties++;
                    teams[i].HomeTies++;
                    if(type===0)
                        teams[i].ConferenceTies++;
                    if(type===-1)
                        teams[i].DivisionTies++;
                    if(j<5)
                        teams[i].Last5Ties++;
                    if(j===0)
                        teams[i]["StreakType"]="T"
                    else if(teams[i].StreakType==="T"&&streakOngoing)
                        teams[i].Streak++;
                    else
                        streakOngoing = false
                }
                teams[i].PF+=game.HomeScore
                teams[i].PA+=game.AwayScore
            }
        }
    }
}

function getTeam(teamString){
    for(i=0;i<teams.length;i++){
        if(teamString===teams[i].abbrev||teamString===teams[i].name)
            return teams[i]
    }
}

function initDate(){
    for(i=0;i<scores.length;i++){
        scores[i]["Year"] = scores[i].Date.substring(0,4)
        scores[i]["Month"] = scores[i].Date.substring(5,7)
        scores[i]["Day"] = scores[i].Date.substring(8,10)
    }
}

function sortByDate(){
    scores = scores.sort((b,a)=>(a.Year*99999+a.Month*99+a.Day)-(b.Year*99999+b.Month*99+b.Day))
}

function load(){
    if(window.location.href==="http://127.0.0.1:5500/Unit%202/src/Sports%20Website/scores.html"){
        createScores()
    }else if(window.location.href==="http://127.0.0.1:5500/Unit%202/src/Sports%20Website/standings.html")
        createStandings()
}

function dateConverter(month, day, year){
    let monthString=""
    let dayString=""
    if(month==="01")
        monthString = "January"
    else if(month==="02")
        monthString = "February"
    else if(month==="03")
        monthString = "March"
    else if(month==="04")
        monthString = "April"
    else if(month==="05")
        monthString = "May"
    else if(month==="06")
        monthString = "June"
    else if(month==="07")
        monthString = "July"
    else if(month==="08")
        monthString = "August"
    else if(month==="09")
        monthString = "September"
    else if(month==="10")
        monthString = "October"
    else if(month==="11")
        monthString = "November"
    else
        monthString = "December"
    
    if(day.substring(0,1)==="0")
        dayString = day.substring(1,2)
    else
        dayString = day

    return monthString+" "+dayString+", "+year
}

function createScores(team){
    document.getElementById("scoreContainer").innerHTML = ""
    if(team===undefined){
        if(scorePage===null)
            scorePage = scores[0].Week
        let title = document.createElement("h1")
        title.setAttribute("class", "fw-bold m-4")
        title.textContent = "Games - Week "+scorePage
        document.getElementById("scoreContainer").append(title)
        let page = scores.filter(game=>game.Week===scorePage)
        page.forEach(game =>{let score = addScore(game)})
    }else{
    }
    document.getElementById("pageNumber").textContent = "Week "+scorePage
}

function createStandings(){

}

function inputScore(){
    let homeTeam = document.getElementById('homeTeam').value;
    let homeTeamScore = document.getElementById('homeTeamScore').value;
    let awayTeam = document.getElementById('awayTeam').value;
    let awayTeamScore = document.getElementById('awayTeamScore').value;
    let date = document.getElementById('date').value;
    if(homeTeam!=null&&homeTeamScore!=null&&awayTeam!=null&&date.length===10&&!isNaN(date.substring(0,4)+date.substring(5,7)+date.substring(8,10))&&isNaN(date.substring(4,5))&&isNaN(date.substring(7,8))){
        document.getElementById('homeTeam').innerHTML = null;
        document.getElementById('homeTeamScore').innerHTML = null;
        document.getElementById('awayTeam').innerHTML = null;
        document.getElementById('awayTeamScore').innerHTML = null;
        document.getElementById('date').innerHTML = null;
        let score = {AwayTeam:awayTeam, HomeTeam:homeTeam, AwayScore:awayTeamScore, HomeScore:homeTeamScore, Date:date}
        scores.push(score)
        localStorage.setItem("storedScores", JSON.stringify(scores))
        alert("Score successfully submitted.")
    }else{
        alert("Invalid input. Make sure you have correctly filled out each section.")
    }
}

function addScore(game){
    let newScore = document.createElement("div")
    newScore.setAttribute("class", "border border-2 p-3 m-4 bg-light")
    let header = document.createElement("h4")
    header.setAttribute("class", "fw-bold p-3")
    header.textContent=dateConverter(game.Month, game.Day, game.Year)+" - FINAL - "+game.StadiumDetails.Name
    let homeDiv = document.createElement("div")
    let awayDiv = document.createElement("div")
    if(game.AwayScore>game.HomeScore){
        homeDiv.setAttribute("class", "row justify-content-between pt-4 px-5 text-dark")
        awayDiv.setAttribute("class", "row justify-content-between pt-3 pb-4 px-5 text-black")
    }else if(game.HomeScore>game.AwayScore){
        homeDiv.setAttribute("class", "row justify-content-between pt-4 px-5 text-black")
        awayDiv.setAttribute("class", "row justify-content-between pt-3 pb-4 px-5 text-dark")
    }else{
        homeDiv.setAttribute("class", "row justify-content-between pt-4 px-5 text-dark")
        awayDiv.setAttribute("class", "row justify-content-between pt-3 pb-4 px-5 text-dark")
    }
    let homeTeamLabel = document.createElement("p")
    homeTeamLabel.textContent = "Home"

    let homeTeam = document.createElement("h3")
    homeTeam.setAttribute("class", "col-auto")
    homeTeam.textContent = getTeam(game.HomeTeam).name

    let homeTeamRecord = document.createElement("h6")
    homeTeamRecord.setAttribute("class", "col-sm pt-2")
    homeTeamRecord.textContent = "("+getTeam(game.HomeTeam).Wins+"-"+getTeam(game.HomeTeam).Losses+"-"+getTeam(game.HomeTeam).Ties+")"

    let homeTeamScore = document.createElement("h3")
    homeTeamScore.setAttribute("class", "col-auto text-end px-5")
    homeTeamScore.textContent = game.HomeScore

    let awayTeamLabel = document.createElement("p")
    awayTeamLabel.textContent = "Away"

    let awayTeam = document.createElement("h3")
    awayTeam.setAttribute("class", "col-auto")
    awayTeam.textContent = getTeam(game.AwayTeam).name

    let awayTeamRecord = document.createElement("h6")
    awayTeamRecord.setAttribute("class", "col-sm pt-2")
    awayTeamRecord.textContent = "("+getTeam(game.AwayTeam).Wins+"-"+getTeam(game.AwayTeam).Losses+"-"+getTeam(game.AwayTeam).Ties+")"

    let awayTeamScore = document.createElement("h3")
    awayTeamScore.setAttribute("class", "col-auto text-end px-5")
    awayTeamScore.textContent = game.AwayScore

    homeDiv.append(homeTeamLabel)
    homeDiv.append(homeTeam)
    homeDiv.append(homeTeamRecord)
    homeDiv.append(homeTeamScore)
    awayDiv.append(awayTeamLabel)
    awayDiv.append(awayTeam)
    awayDiv.append(awayTeamRecord)
    awayDiv.append(awayTeamScore)
    newScore.append(header)
    newScore.append(homeDiv)
    newScore.append(awayDiv)

    document.getElementById("scoreContainer").append(newScore)
}

function changePage(input){
    if(input===0&&scorePage>1)
        scorePage--;
    else if(input===1&&scorePage<scores[0].Week)
        scorePage++;
    createScores();
}