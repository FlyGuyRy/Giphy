$(document).ready(function() {

  var movies = [
    "titanic", "the matrix", "the shining", "total recall", "the incredibles", "sideways",
    "x-men", "halloween", "wreck it ralph", "amelie"
  ];

  
  function populateButtons(movieArray, addMovie, addLocation) {
    $(addLocation).empty();

    for (var i = 0; i < movieArray.length; i++) {
      var a = $("<button>");
      a.addClass(addMovie);
      a.attr("data-type", movieArray[i]);
      a.text(movieArray[i]);
      $(addLocation).append(a);
    }

  }

  $(document).on("click", ".movieButton", function() {
    $("#movies").empty();
    $(".movieButton").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var movieDiv = $("<div class=\"movieItem\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var movieImage = $("<img>");
          movieImage.attr("src", still);
          movieImage.attr("data-still", still);
          movieImage.attr("data-animate", animated);
          movieImage.attr("data-state", "still");
          movieImage.addClass("movieImage");

          movieDiv.append(p);
          movieDiv.append(movieImage);

          $("#movies").append(movieDiv);
        }
      });
  });

  $(document).on("click", ".movieImage", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#addMovie").on("click", function(event) {
    event.preventDefault();
    var newMovie = $("input").eq(0).val();

    if (newMovie.length > 2) {
      movies.push(newMovie);
    }

    populateButtons(movies, "movieButton", "#movieButtons");

  });

  populateButtons(movies, "movieButton", "#movieButtons");
});
