//other APIs I considered for my final project
//https://live-score-api.com/documentation/reference/15/football_data_history_matches
//https://sportsopendata.net/

//The API I am using for my final project
//https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
//https://gitlab.com/dword4/nhlapi



var teamsArr = [];


//On page load, load all teams into teamsArr
//note that getting franchises doesn't really provide any valuable information not in teams
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var teams = JSON.parse(this.responseText);
        teamsArr = teams.teams;
       // console.log(typeof(teams));
        var allTeams=document.createElement("div");
        allTeams.setAttribute("id", "allTeams");
        for (let i=0; i<teamsArr.length; i++){
            var oneTeam=document.createElement("div");

            var teamName = document.createElement("h4");
            teamName.innerHTML = teamsArr[i].name;
            oneTeam.appendChild(teamName);

            var conference = document.createElement("p");
            conference.innerHTML = "Conference: " + teamsArr[i].conference.name;
            oneTeam.appendChild(conference);

            var division = document.createElement("p");
            division.innerHTML = "Division: " + teamsArr[i].division.name;
            oneTeam.appendChild(division);

            var year = document.createElement("p");
            year.innerHTML = "First year of play: " + teamsArr[i].firstYearOfPlay;
            oneTeam.appendChild(year);

            var arena = document.createElement("p");
            arena.innerHTML = "Arena: " + teamsArr[i].venue.name;
            oneTeam.appendChild(arena);

            var website = document.createElement("p");
            website.innerHTML = "Official website: ";
            var websiteLink = document.createElement("a");
            websiteLink.setAttribute("href", teamsArr[i].officialSiteUrl);
            websiteLink.innerHTML = teamsArr[i].officialSiteUrl;
            website.appendChild(websiteLink);
            oneTeam.appendChild(website);

            oneTeam.setAttribute("class", "oneTeam");
            allTeams.appendChild(oneTeam)
        }
        document.body.appendChild(allTeams);
    }
    else{
        console.log("get teams failed");
    }
};
xhttp.open("GET", "https://statsapi.web.nhl.com/api/v1/teams", true);
//xhttp.setRequestHeader("x-api-key","bdbf4a-6f2a42-e084c9-9730f2-253d19");
xhttp.send();




document.getElementById("theForm1").addEventListener("submit", submitForm1, false);
//Team roster searched for
function submitForm1(event) {
    event.preventDefault();
    //document.getElementById("1").innerHTML=document.getElementById("form").value;
    var teamName = document.getElementById("form1").value
    var foundMatch = false;
    for (let i=0; i<teamsArr.length; i++){
        //check to see if form input matches a team
        if(teamsArr[i].locationName==teamName || teamsArr[i].name==teamName || teamsArr[i].teamName==teamName || teamsArr[i].shortName==teamName) {
            //clear all teams in search output
            //clear form
            document.getElementById("allTeams").style.display="none";
            document.getElementById("form1").value="";
            if (document.getElementById("roster")!=null){
                document.getElementById("roster").remove();
            }
            if (document.getElementById("statsTeam")!=null){
                document.getElementById("statsTeam").remove();
            }

            foundMatch = true;

            var teamID = teamsArr[i].id;
            // Initalize AJAX Request
            var xhttp2 = new XMLHttpRequest();
            // Response handler
            xhttp2.onreadystatechange = function() {
                // Wait for readyState = 4 & 200 response
                if (this.readyState == 4 && this.status == 200) {
                    // parse JSON response
                    var roster = JSON.parse(this.responseText);
                    roster=roster.roster;
                    var rosterTeam=document.createElement("div");
                    rosterTeam.setAttribute("id", "roster");
                    //loop through all players and add them to html
                    for (let j=0; j<roster.length; j++){
                        console.log(roster[j]);
                        var onePlayer=document.createElement("div");

                        var playerName = document.createElement("h4");
                        playerName.innerHTML = roster[j].person.fullName;
                        onePlayer.appendChild(playerName);

                        var number = document.createElement("p");
                        number.innerHTML = "Number: " + roster[j].jerseyNumber;
                        onePlayer.appendChild(number);

                        var positionName = document.createElement("p");
                        positionName.innerHTML = "Position: " + roster[j].position.name;
                        onePlayer.appendChild(positionName);

                        var positionType = document.createElement("p");
                        positionType.innerHTML = "Position Type: " + roster[j].position.type;
                        onePlayer.appendChild(positionType);

                        onePlayer.setAttribute("class", "onePlayer");
                        rosterTeam.appendChild(onePlayer);
                    }
                    document.body.appendChild(rosterTeam);
                    
                } else if (this.readyState == 4) {
                    // this.status !== 200, error from server
                    console.log("get a roster failed");
                    
                }
            };
            xhttp2.open("GET", "https://statsapi.web.nhl.com/api/v1/teams/"+teamID+"/roster", true);
            xhttp2.send();
        }
    }
    if (foundMatch==false){
        document.getElementById("form1").value="";
        alert("This search is case sensitive, please make sure you are correctly inputting a team name or city. 'Boston', 'Bruins', or 'Boston Bruins' for example.");
    }
}



document.getElementById("theForm2").addEventListener("submit", submitForm2, false);
//Team stats searched for
function submitForm2(event) {
    event.preventDefault();
    //document.getElementById("1").innerHTML=document.getElementById("form").value;
    var teamName = document.getElementById("form2").value
    var foundMatch = false;
    document.getElementById("form2").value="";
    for (let i=0; i<teamsArr.length; i++){
        //check to see if form input matches a team
        if(teamsArr[i].locationName==teamName || teamsArr[i].name==teamName || teamsArr[i].teamName==teamName || teamsArr[i].shortName==teamName) {
            //clear all teams in search output
            //clear form
            document.getElementById("allTeams").style.display="none";
            if (document.getElementById("roster")!=null){
                document.getElementById("roster").remove();
            }
            if (document.getElementById("statsTeam")!=null){
                document.getElementById("statsTeam").remove();
            }
            
            //clear all body

            foundMatch = true;

            var teamID = teamsArr[i].id;
            // Initalize AJAX Request
            var xhttp3 = new XMLHttpRequest();
            // Response handler
            xhttp3.onreadystatechange = function() {
                // Wait for readyState = 4 & 200 response
                if (this.readyState == 4 && this.status == 200) {
                    // parse JSON response
                    var stats = JSON.parse(this.responseText);
                    var statsTeam=document.createElement("div");
                    statsTeam.setAttribute("id", "statsTeam");

                    var oneStat=document.createElement("div");

                    var teamName = document.createElement("h4");
                    teamName.innerHTML = stats.teams[0].name;
                    oneStat.appendChild(teamName);

                    var wins = document.createElement("p");
                    wins.innerHTML = "Wins: " + stats.teams[0].teamStats[0].splits[0].stat.wins;
                    oneStat.appendChild(wins);

                    var losses = document.createElement("p");
                    losses.innerHTML = "Losses: " + stats.teams[0].teamStats[0].splits[0].stat.losses;
                    oneStat.appendChild(losses);

                    var ot = document.createElement("p");
                    ot.innerHTML = "OT: " + stats.teams[0].teamStats[0].splits[0].stat.ot;
                    oneStat.appendChild(ot);

                    var points = document.createElement("p");
                    points.innerHTML = "Points: " + stats.teams[0].teamStats[0].splits[0].stat.pts;
                    oneStat.appendChild(points);

                    var goals = document.createElement("p");
                    goals.innerHTML = "Goals per game: " + stats.teams[0].teamStats[0].splits[0].stat.goalsPerGame;
                    oneStat.appendChild(goals);

                    var against = document.createElement("p");
                    against.innerHTML = "Goals against per game: " + stats.teams[0].teamStats[0].splits[0].stat.goalsAgainstPerGame;
                    oneStat.appendChild(against);

                    var ranking = document.createElement("p");
                    ranking.innerHTML = "NHL Ranking by point total: " + stats.teams[0].teamStats[0].splits[1].stat.pts;
                    oneStat.appendChild(ranking);


                    oneStat.setAttribute("class", "oneStat");
                    statsTeam.appendChild(oneStat);

                    document.body.appendChild(statsTeam);
                    
                } else if (this.readyState == 4) {
                    // this.status !== 200, error from server
                    console.log("get stats failed");
                    
                }
            };
            xhttp3.open("GET", "https://statsapi.web.nhl.com/api/v1/teams/"+teamID+"?expand=team.stats", true);
            xhttp3.send();
        }
    }
    if (foundMatch==false){
        document.getElementById("form1").value="";
        alert("This search is case sensitive, please make sure you are correctly inputting a team name or city. 'Boston', 'Bruins', or 'Boston Bruins' for example.");
    }
}