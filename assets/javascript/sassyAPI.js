//Run this when page loads
$(document).ready(function () {
    console.log("hi");
//Populate random gif when radio button "done" selected
    $("#complete").on("click", function () {

        let queryURL = "https://api.giphy.com/v1/gifs/random?tag=" +
            "congrats" + "&api_key=lJvM8CYrpxziVxv5vy11SIH5QRxU7OU8" + "&limit=1";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let results = response.data; 
            console.log(results.length);
            //for (let i=0; i < results.length; i++){

                let gifDiv = $("<div>");
                let positiveImage = $("<img>");  
                
                positiveImage.attr("src", response.data.images.original.url);
                console.log(response.data.url);
    
                gifDiv.prepend(positiveImage);
    
                $("#gifs-go-here").prepend(gifDiv);

           //}
           

        });

    });
});

