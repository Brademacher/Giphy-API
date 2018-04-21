// Global array to hold buttons created for gifs 
var topics = [];

// auth key to use for API
var authKey = "qq4zHa0rjKZREFAHd4eJOTZDIdRgr4HJ";

//Set up search parameters
var searchTerm = "";

// URL Base
var queryURLBase = "http://api.giphy.com/v1/gifs/search?api_key=" + authKey;

// JS function for what to do with user input

function runQuery(numImages, queryURL) {

    //AJAX call to get the data from the API endpoint
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (imageData) {

        //clear well from previous run
        $("#gifs-container").empty();

        // logging to console
        for (var i = 0; i < imageData.data.length; i++) {
            console.log("-------- GIF DATA --------")
            console.log(queryURL);
            console.log(imageData);
            console.log(imageData.data[i].rating);
            console.log("still= " + imageData.data[i].images.fixed_height_still.url);
            console.log("active= " + imageData.data[i].images.fixed_height_downsampled.url);

            //Push to HTML
            var gifDiv = $("<img>");
            gifDiv.attr("src", imageData.data[i].images.fixed_height_still.url);
            gifDiv.attr("data-still", imageData.data[i].images.fixed_height_still.url);
            gifDiv.attr("data-animate", imageData.data[i].images.fixed_height_downsampled.url);
            gifDiv.attr("data-state", "still");
            gifDiv.addClass("gif");
            $("#gifs-container").append(gifDiv);

            // Function to Animate on click
            $(".gif").on("click", function () {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });


        };
    });
};



//On click of the search button process

$("#search-button").on("click", function (event) {

    event.preventDefault();

    //get term user wants to search
    searchTerm = $("#search").val().trim();
    console.log(searchTerm);

    //add search term
    var newURL = queryURLBase + "&q=" + searchTerm + "&limit=10";

    //Send to AJAX and call new URL
    runQuery(10, newURL);

})