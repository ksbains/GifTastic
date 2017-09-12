function switcharoo(boolean){
  if(boolean){
    //

  }
}
var gifs = ["hamster", "wolf", "cobra", "lion"];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

  var gif = $(this).attr("data-name");
  var api = "http://api.giphy.com/v1/gifs/search";
  var apikey = "?api_key=91dfe01af7b44084849de62f68879b83";
  var query = "&q=" + gif + "&limit=25&offset=0&rating=G&lang=en";
  //Q:need to diplay the original still and then upon click diplay the gif and vice vera?
  //A: have a bolean that ill itch from true to fale everytime time it i clicked, on true it i the original till, on fale it i the gif url.
  var queryURL = api + apikey + query;
  console.log(queryURL);
  //queryURL = "http://api.giphy.com/v1/gifs/search?api_key=91dfe01af7b44084849de62f68879b83&q=hamster&limit=10&offset=0&rating=Y&lang=en";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    // NEEDS CHECKS HERE!!!!!!!!!!!!!!!
    // hat kind of check?
    /*
    You can also use the StringBuilder class which is mutable.

    StringBuilder sb = new StringBuilder(inputString);
    It has the method deleteCharAt(), along with many other mutator methods.

    Just delete the characters that you need to delete and then get the result as follows:
    
    String resultString = sb.toString();*/
    //response.data[0].original
    console.log(response);
    // Creating a div to hold the movie
    //for loop for all of them
    for(var i = 0; i<response.data.length; i++){
      var gifDiv = $("<div class='gif'>");

      // Storing the rating data
      var rating = response.data[i].rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      gifDiv.append(pOne);

      // Retrieving the URL for the image
      var imgURL = response.data[i].images.original_still.url;
      console.log("the first itme: " + imgURL);
      imgURL = imgURL.substr(5);
      console.log("the second time: " + imgURL);
      imgURL = "http" + imgURL;
      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      gifDiv.append(image);
      $("#animals").prepend(gifDiv);
    }

    // Putting the entire movie above the previous movies
    
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#animalSel").empty();

  // Looping through the array of movies
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("gifBtn btn-lg");
    // Adding a data-attribute
    a.attr("data-name", gifs[i]);
    // Providing the initial button text
    a.text(gifs[i]);
    //before appending try to attachfuntion to button that will switch between 
    //booleans for true it will display origingal_stil and on false it is going to to be the gif
    // Adding the button to the buttons-view div
    $("#animalSel").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#addAnimal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var gif = $("#animal-input").val().trim();

  // Adding movie from the textbox to our array
  gifs.push(gif);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

//https://www.youtube.com/watch?v=fEYx8dQr_cQ
//call stuff here
// Adding a click event listener to all elements with a class of "movie"
$(document).on("click", ".gifBtn", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();