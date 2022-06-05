// CLick button on home page thast takes you to form submission page #2

let arr = [];
let index = 0;

function formSubmitEvent() {
    let athlete = document.getElementById("athlete").value;
    let rating = document.getElementById("rating").value;
    let bio = document.getElementById("bio").value;
	
	let athleteObj = {name: athlete, rating: rating, bio: bio};
    console.log(athleteObj);
    if(athleteObj != null){
      arr.push(athleteObj);
    //document.getElementById("display1").innerHTML = mov.ToString();
	}else{
		alert("Please fill in the TextBox. No input can be empty.");
	}
	
}

function formSubmitEvent2() 
{
	let displayathlete = document.getElementById("display1");
	displayathlete.innerHTML = "";
	let str = '<ul>';
	
  	for(let i=0;i<arr.length;i++)
    {  			
		str += '<a data=""><li>'+arr[i].athlete +'</li></a>';
    }
	
	
	displayathlete.innerHTML = str;

}


// On 4th Page display only clicked athelte. Name, rating and bio.


var athleteObj = function (athelte, rating, bio) {
	
    this.title = title;
    this.rating = rating;
    this.ToString = function () {return ":" + athelte + rating + bio}
    this.Validate = function(){
        if(title.length > 2 && rating > 0 && rating <6){
            return true;
        }else{  return false;}
    }
}

$(function() {
    $('#display').click(function() {
    window.location.href = "index.html#details";
    });
    });

