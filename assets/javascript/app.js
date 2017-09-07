  // <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  // <script type="text/javascript">
// Initial array of movies
var gifs = ["hamster", "wolf", "cobra", "lion"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

  var gif = $(this).attr("data-name");
  var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
// https://api.giphy.com/v1/gifs/search?api_key=91dfe01af7b44084849de62f68879b83&q=dog&limit=25&offset=0&rating=G&lang=en
 queryURL = "gifs/search?api_key=91dfe01af7b44084849de62f68879b83&q=" + gif + "&limit=25&offset=0&rating=G&lang=en";


  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    // NEEDS CHECKS HERE!!!!!!!!!!!!!!!

    // Creating a div to hold the movie
    var gifDiv = $("<div class='gif'>");

    // Storing the rating data
    var rating = response.Rated;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    gifDiv.append(pOne);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    movieDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#movies-view").prepend(movieDiv);
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

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
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-movie").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var gif = $("#gif-input").val().trim();

  // Adding movie from the textbox to our array
  gifs.push(gif);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie"
$(document).on("click", ".gif", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();