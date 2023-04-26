var url = "https://raw.githubusercontent.com/b-mcavoy/datasets/main/Geography/World's%20Tallest%20Mountains.csv"
var mountainNames = getColumn(url, 2);
var mountainLocation = getColumn(url, 11);
var parentMountains = getColumn(url, 8);
var heightFeet = getColumn(url, 4);
var heightMeters = getColumn(url, 3);
var mountainRange = getColumn(url, 6);
var ascentYear = getColumn(url, 9);


//takes a mountain name and returns the location
//mountain name {string} - the desired mountain
//return {string} - the location of the mountain
 
function getLocation(mountainName){
  if(typeof mountainName !="string"){
    return "Please enter a string parameter";
  }
  for(var i in mountainNames){
    if (mountainNames[i].toLowerCase().replaceAll(" ", "").includes(mountainName.toLowerCase().replaceAll(" ", ""))){
     return mountainLocation[i];
    }
  }
   return "that is not a mountain name";
}

//takes mountain name and returns the parent mountain
//mountain name {string} - the desired mountain
//return {string} - the parent mountain
function getParentMountain(mountainName){
  if(typeof mountainName !="string"){
    return "Please enter a string parameter";
  }
  for(var i in mountainNames){
    if (mountainNames[i].replaceAll(" ", "").toLowerCase().includes(mountainName.replaceAll(" ", "").toLowerCase())){
     return parentMountains[i];
    }
  }
   return "that is not a mountain name";
}


//takes a mountain name and returns the height in feet
//mountain name {string} - the desired mountain
//return {number} - the height of mountain

function getHeightInFeet(mountainName){
  if(typeof mountainName !="string"){
    return "Please enter a string parameter";
  }
  for(var i in mountainNames){
    if (mountainNames[i].replaceAll(" ", "").toLowerCase().includes(mountainName.replaceAll(" ", "").toLowerCase())){
     return heightFeet[i];
    }
  }
   return "that is not a mountain name";
}



//takes a range and returns a list of mountain names in that range
//range {string} - the desired range
//return {list} - the names of mountains in the range
function getNamesInRange(range){
  if(typeof range !="string"){
    return "Please enter a string parameter";
  }
  var matches = [];
  for(var i in mountainRange){
    if (mountainRange[i].replaceAll(" ", "").toLowerCase().includes(range.replaceAll(" ", "").toLowerCase())){
      matches.push(mountainNames[i]);
      }
  }
  if(matches.length == 0){
    matches.push("No mountains Are in That Division")
  }
    return matches;
}
 

//finds how many mountains that were ascended before 1950
//return{number} how many mountains were ascended before 1950
function getAscendedBefore(){
  var count = 0;
  for(var i in mountainNames){
    if (1950 > parseInt(ascentYear[i]) && parseInt(ascentYear[i])>0){
      count ++;
    }
  } 
  if (count == 0){
    return "there are no ascents before 1950"
  }
  return count;
}




function  getColumn(url, columnNumber){
  var column = [];
  var table = [];
  var request = new XMLHttpRequest();  
  request.open("GET", url, false);   
  request.send(null);  
  var csvData = new Array();
  var jsonObject = request.responseText.split(/\r?\n|\r/);
  for (var i = 0; i < jsonObject.length; i++) {
    csvData.push(jsonObject[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
  }
  table = csvData;
  column = getCol(table, columnNumber);
  return column;
}

//returns the specified column from a 2D Array
function getCol(matrix, col){
       var column = [];
       for(var i=1; i<matrix.length-1; i++){
          column.push(matrix[i][col]);
       }
       return column;
    }