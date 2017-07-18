var topics = ['bmw','porsche','audi','mercedes','toyota','nissan','lamborghini','ferrari']




  


//Create form that takes user input and generates it








//On click function to display giphs
 $(document).on('click','.display', function () {

    $('#image-holder').empty()
    //store value of button clicked
    var imageSearch = $(this).attr('data-name');

    //URL for Giph Search
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + imageSearch + "&api_key=dc6zaTOxFJmzC&limit=10";

    //Ajax get request
    $.ajax({
      url: queryUrl,
      method: 'GET'
    })
      .done(function(response){
        console.log(response)

        //store the array of results
        var results = response.data

        for(var i = 0; i < results.length; i++) {

          //hold all content generated for giph image and text
          holder = $("<div class='col-md-4'>")
          //create a thumbnail
          gifDiv = $("<div class='thumbnail'>")
          //holds gif image
          gifImage = $('<img class="gif" data-state="still">');
          //add gif
          

          gifImageStatic = results[i].images.fixed_height_still.url;
          giphyImageUrl = results[i].images.original.url



          gifImage.attr("src", gifImageStatic)
          gifImage.attr("data-still",gifImageStatic)
          gifImage.attr('data-animate',giphyImageUrl)



          gifCaptionDiv = $("<div class='caption'>")

          gifCaptionP = $('<p>')

          gifCaptionP.text('Rating: ' + results[i].rating)


          //Append gifImage to Gif div
          gifDiv.append(gifImage)
          holder.append(gifDiv)
          gifCaptionDiv.append(gifCaptionP)
          holder.append(gifCaptionDiv)

          //Append gifDiv to HTML
          $('#image-holder').append(holder)

        }






      })





  })


        $(document).on("click", ".gif", function() {
      state = $(this).attr("data-state");
      console.log(state)
      if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


//Generate array of buttons

    

              // Function for displaying movie data
    function renderButtons() {

    $("#button-holder").empty();

    // Loops through the array of movies
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("btn btn-primary display");
      // Added a data-attribute
      a.attr("data-name", topics[i]);
      // Provided the initial button text
      a.text(topics[i]);
      // Added the button to the buttons-view div
      $("#button-holder").append(a);
    }
  }


      // This function handles events where the add movie button is clicked
      $("#car-movie").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var car = $("#car-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(car);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });



      // Calling the renderButtons function to display the intial buttons
      renderButtons();