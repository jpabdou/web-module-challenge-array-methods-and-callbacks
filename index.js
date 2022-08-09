const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const yearData = fifaData.filter(element => element.Year === 2014 && element.Stage === "Final")
console.log(yearData[0]['Home Team Name'])


//(b) Away Team name for 2014 world cup final
console.log(yearData[0]['Away Team Name'])

//(c) Home Team goals for 2014 world cup final
console.log(yearData[0]['Home Team Goals'])

//(d) Away Team goals for 2014 world cup final
console.log(yearData[0]['Away Team Goals'])

//(e) Winner of 2014 world cup final */
console.log(yearData[0]['Win conditions'])


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(array) {
    const finalsData = array.filter(element => element.Stage === "Final")
    return finalsData
 }



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, cb) {
    let mapYear = [];
    const Years = cb(array).map((game)=> {
        return {"Year":game.Year} // unnecessary as I can skip to the push step, but did it for map() practice
    })
    for (let i=0; i<Years.length;i++) {
        mapYear.push(Years[i].Year)

    }
    return mapYear
    
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array,cb) {
    let winners =[];
    const arrFinals = cb(array);
    for (let i=0;i<arrFinals.length;i++){
        let scoreDiff = arrFinals[i]["Home Team Goals"] -arrFinals[i]["Away Team Goals"];
        if (scoreDiff>0) {
            winners.push(arrFinals[i]["Home Team Name"])
        } else if (scoreDiff < 0) {
            winners.push(arrFinals[i]["Away Team Name"])
        } else {
            let result = arrFinals[i]["Win conditions"]
            if (result != "") {
                winners.push(result.split(" ")[0])
            } else {
                winners.push(arrFinals[i]["Home Team Name"])
            }
        }
    }
    return winners
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, cb1, cb2, cb3) {
    const years = cb2(cb1(array))
    const winners = cb3(cb1(array))
    let announcements = [];
    for (let i=0;i<years.length;i++) {
        announcements.push(`In ${years[i]}, ${winners[i]} won the world cup!`)
    }

    return announcements
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/
let callback = getFinals(fifaData)
function getAverageGoals(callback) {
    let goalTotals = 0
    const goals = callback.reduce((total, game) => {
        let sumGoals = total + game["Home Team Goals"] + game["Away Team Goals"];
        return sumGoals
    }, 0);
    return (goals/callback.length).toFixed(2)
 }




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInit) {
    const finalsData = getFinals(data);
    const countryData = finalsData.filter(element => element["Home Team Initials"] === teamInit || element["Away Team Initials"]===teamInit)
    let countryWinCount = 0;
    for (let i=0;i<countryData.length;i++){
        let scoreDiff = countryData[i]["Home Team Goals"] -countryData[i]["Away Team Goals"];
        if (scoreDiff>0 && countryData[i]["Home Team Initials"] == teamInit) {
            countryWinCount +=1
        } else if (scoreDiff<0 && countryData[i]["Away Team Initials"] == teamInit) {
            countryWinCount +=1
        } else if (scoreDiff === 0 && ((countryData[i]["Win conditions"].split(" ")[0] === countryData[i]["Home Team Name"] && countryData[i]["Home Team Initials"] === teamInit) || (countryData[i]["Win conditions"].split(" ")[0] === countryData[i]["Away Team Name"] && countryData[i]["Away Team Initials"] === teamInit))) {
            countryWinCount+=1
        }
    }
    return countryWinCount
}
console.log(getCountryWins(fifaData, "BRA"))


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {


    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {
// don't understand this one; pass
    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
