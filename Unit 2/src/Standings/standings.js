const allTeams = [{ name: 'Tampa Bay', wins: 100, losses: 62, GB: 0 },
{ name: 'New York', wins: 92, losses: 70, GB: 8.0 },
{ name: 'Boston', wins: 92, losses: 70, GB: 8.0 },
{ name: 'Toronto', wins: 91, losses: 71, GB: 9.0 },
{ name: 'Baltimore', wins: 52, losses: 110, GB: 48.0 }
];

teams = allTeams;

let currentSortField = 'GB';
let sortDirection = 'ASC';

function createStandings() {
   document.querySelector('#rows').innerHTML = '';
   teams.forEach(team => { let row = createRow(team); document.querySelector('#rows').appendChild(row); });
}

function createRow(team) {
   let newRow = document.createElement('tr');
   newRow.setAttribute('scope', 'row');
   let newCell = document.createElement('td');
   newCell.appendChild(document.createTextNode(team.name));
   newRow.appendChild(newCell);
   newCell = document.createElement('td');
   newCell.appendChild(document.createTextNode(team.wins));
   newRow.appendChild(newCell);
   newCell = document.createElement('td');
   newCell.appendChild(document.createTextNode(team.losses));
   newRow.appendChild(newCell);
   newCell = document.createElement('td');
   newCell.appendChild(document.createTextNode(team.GB));
   newRow.appendChild(newCell);

   return newRow;
}

function sort(field){
   if(field===undefined){
      field=currentSortField;
   }else if(field===currentSortField){
      if(sortDirection==='ASC')
         sortDirection='DSC';
      else if(sortDirection==='DSC')
         sortDirection='ASC';
   }

   if(sortDirection==='ASC'){
      if(field==='team')
         teams = teams.sort((a,b)=>(a.name > b.name ? -1 : 1));
      else if(field==='wins')
         teams.sort((a,b)=>a.wins-b.wins);
      else if(field==='losses')
         teams = teams.sort((a,b)=>(a.losses-b.losses));
      else if(field==='GB')
         teams = teams.sort((a,b)=>(a.GB-b.GB > 0 ? 1 : -1));
   }else if(sortDirection==='DSC'){
      if(field==='team')
         teams = teams.sort((a,b)=>(a.name > b.name ? 1 : -1));
      else if(field==='wins')
         teams.sort((a,b)=>b.wins-a.wins);
      else if(field==='losses')
         teams = teams.sort((a,b)=>(a.losses-b.losses > 0 ? -1 : 1));
      else if(field==='GB')
         teams = teams.sort((a,b)=>(a.GB-b.GB > 0 ? -1 : 1));  
   }
   currentSortField=field;
   createStandings();
}

function filterTeams(){
   let filterValue = document.querySelector('#filter').value;
   teams = allTeams.filter(team=>(team.name.indexOf(filterValue)>=0));
   sort(); //field in sort is left blank, will be undefined
}

createStandings();