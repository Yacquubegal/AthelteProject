var express = require('express');
var router = express.Router();


let serverArray = [];

// define a constructor to create movie objects
let PlayerObject = function (pTitle, pData) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.Title = pTitle;
    this.Data = pData;
}


serverArray.push(new PlayerObject("Stephen Curry", 2009));
serverArray.push(new PlayerObject("klay thompson", 2011));
serverArray.push(new PlayerObject("Seth Curry", 2013));
serverArray.push(new PlayerObject("Shaq", 1992));
serverArray.push(new PlayerObject("Kobe Bryant", 1996));
serverArray.push(new PlayerObject("James Harden", 2009));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("in the get html code on the server");
  res.sendFile('index.html');
});


/* GET all player data */
router.get('/getAllAthelte', function(req, res) {
  res.status(200).json(serverArray);
});

/* Add one new player */
router.post('/AddPlayer', function(req, res) {
  const newplayer = req.body;
  serverArray.push(newplayer);
  res.status(200).json(newplayer);
});

// add route for delete
router.delete('/DeleteAthelte/:ID', (req, res) => {
  const delID = req.params.ID;
  let found = false;
  let pointer = GetArrayPointer(delID);
  if(pointer == -1){    // if did not find movie in array
    console.log("not found");
    return res.status(500).json({
      status: "error - no such ID"
    });
  }
  else {    // if did find the movie
    serverArray.splice(pointer, 1);  // remove 1 element at index 
    res.send('Athelte with ID: ' + delID + ' deleted!');
  }
});

  // cycles thru the array to find the array element with a matching ID
  function GetArrayPointer(localID) {
      for (let i = 0; i < serverArray.length; i++) {
          if (localID === serverArray[i].ID) {
              return i;
          }
      }
      return -1; // flag to say did not find a movie
  }

module.exports = router;
