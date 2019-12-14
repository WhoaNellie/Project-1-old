let button = $("<input>"); 

button.on("click", function() {
    if ($(this).attr("value") == "done"){

        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        "yay" + "&api_key=dc6zaTOxFJmzC&limit=10" + "&limit=1";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          console.log(response);
            let gifDiv = $("<div>");
            let positiveImage = $("<img>");
            
            positiveImage.attr("src", results[i].images.fixed_height.url);
  
            gifDiv.prepend(positiveImage);
  
            $("#gifs-go-here").prepend(gifDiv);
          
        });

    };

});