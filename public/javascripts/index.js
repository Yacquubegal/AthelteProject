// start by creating data so we don't have to type it in each time
let playerArray = [];

// define a constructor to create movie objects
let PlayerObject = function (pTitle, pDate) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.Title = pTitle;
    this.Year = pDate;
};


let selectedGenre = "not selected";

document.addEventListener("DOMContentLoaded", function () {

   // createList();

// add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
    let newplayer = (new MovieObject(document.getElementById("title").value, document.getElementById("date").value,
       
    $.ajax({
        url : "/AddPlayer",
        type: "POST",
        data: JSON.stringify(newplayer),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success: function (result) {
            console.log(result);
            document.location.href = "index.html#ListAll";  // go back to movie list 
          }
        });

       //
           // document.location.href = "index.html#ListAll";
        // also add the URL value
    });

// page before show code *************************************************************************
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#Listplayers", function (event) {   // have to use jQuery 
        createList();
    });

    $(document).on("pagebeforeshow", "#ListMyPlayers", function (event) {   // have to use jQuery 
        // clear prior data
        createList();
    });

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   
        let localParm = localStorage.getItem('parm');  // get the unique key back from the dictionairy
        let localID = GetArrayPointer(localParm); // map to which array element it is
        
        // next step to avoid bug in jQuery Mobile,  force the movie array to be current
        playerArray = JSON.parse(localStorage.getItem('playerArray'));  
      // no longer using pointer -1 now that we have real keys
      // document.getElementById("oneTitle").innerHTML = "The title is: " + playerArray[localID-1].Title;

        document.getElementById("oneTitle").innerHTML = "This name is: " + playerArray[localID].Title;
        document.getElementById("oneDate").innerHTML = "he was drafted in the Year: " + playerArray[localID ].date;
    });
 
// end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************



// next 2 functions ( createList and createListSubset ) could be combined into 1 with a little work
// such as I could pass in a variable which said which divMovieList div it should draw
function createList() {
   // clear prior data
   console.log("clearing li's");
   var ul = document.getElementById("playerUl");
   ul.innerHTML = "";

    $.get("/getAllAthelte", function(data, status){  // AJAX get
        // any code that wants to use this server data must wait for
        // the server to reply, so put that code in this "call back" function
        console.log(status);
        playerArray = data;
        playerArray.forEach(function (element,) {   // use handy array forEach method
            var li = document.createElement('li');
            // adding a class name to each one as a way of creating a collection
            li.classList.add('oneAthelte'); 
            // use the html5 "data-parm" to encode the ID of this particular data object
            // that we are building an li from
            li.setAttribute("data-parm", element.ID);
            li.innerHTML = element.ID + ":  " + element.Title + "  " + element.Genre;
            ul.appendChild(li);
        });
    

        // now we have the HTML done to display out list, 
        // next we make them active buttons
        // set up an event for each new li item, 
        var liArray = document.getElementsByClassName("oneAthelte");
        Array.from(liArray).forEach(function (element) {
            element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and save THIS ID value in the localStorage "dictionairy"
            localStorage.setItem('parm', parm);
            // but also, to get around a "bug" in jQuery Mobile, take a snapshot of the
            // current movie array and save it to localStorage as well.
            let stringPlayerArray = JSON.stringify(playerArray); // convert array to "string"
            localStorage.setItem('playerArray', stringPlayerArray);
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
            });
        });

}); // end of the get call "call back" function

};
 


    // clear prior data
    var ul = document.getElementById("playerUl2");
    ul.innerHTML = "";
    $.get("/getAllAthelte", function(data, status){  // AJAX get
        // any code that wants to use this server data must wait for
        // the server to reply, so put that code in this "call back" function
        console.log(status);
        playerArray = data;
    
        playerArray.forEach(function (element,) {
            if (element.Genre === whichType) {
                // use handy array forEach method
                var li = document.createElement('li');
                // adding a class name to each one as a way of creating a collection
                li.classList.add('oneAthelte');
                // use the html5 "data-parm" to encode the ID of this particular data object
                // that we are building an li from
                li.setAttribute("data-parm", element.ID);
                li.innerHTML = element.ID + ":  " + element.Title + "  " + element.Genre;
                ul.appendChild(li);
            }
        });
    

        // now we have the HTML done to display out list, 
        // next we make them active buttons
        // set up an event for each new li item, 
        var liArray = document.getElementsByClassName("oneAthelte");
        Array.from(liArray).forEach(function (element) {
            element.addEventListener('click', function () {
                // get that data-parm we added for THIS particular li as we loop thru them
                var parm = this.getAttribute("data-parm");  // passing in the record.Id
            
                localStorage.setItem('parm', parm);
                // but also, to get around a "bug" in jQuery Mobile, take a snapshot of the
                // current movie array and save it to localStorage as well.
                let stringPlayerArray = JSON.stringify(playerArray); // convert array to "string"
                localStorage.setItem('playerArray', stringPlayerArray);
                // now jump to our page that will use that one item
                document.location.href = "index.html#details";
            });
        });
    });

// remove a movie from array
function DeleteAthelte(which) {
    console.log(which);
// tell the server to remove it from the server array
    $.ajax({
        type: "DELETE",
        url: "/DeleteAthelte/" + which,
        success: function(result){
            console.log(result + " back from delete on server");
            document.location.href = "index.html#ListAll";  // go back to movie list 
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(textStatus);
            alert("server failed to delete");
        }

    })

   // let arrayPointer = GetArrayPointer(which);
   //playerArray.splice(arrayPointer, 1);  // remove 1 element at index 
}

// cycles thru the array to find the array element with a matching ID
function GetArrayPointer(localID) {
    for (let i = 0; i < playerArray.length; i++) {
        if (localID === playerArray[i].ID) {
            return i;
        }
    }
}

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}

