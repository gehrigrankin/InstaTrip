$("#search-button").on("click", function () {
    var category = "lodging"; //Assign variable equal to data-category value
    //!!REMOVE AFTER DEBUGGING
    console.log("Search Category: " + category);
    //Empty results-main div of any previous results
    $("#results-main").empty();

    //Assign variables to hold latitude and longitude values
    var latitude = $("#lat").val();
    var longitude = $("#lon").val();
    //Assemble & format latitude, longitude for query URL
    var location = "&location=" + latitude + "," + longitude + "&radius=500";
    var urlKey = "&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc";
    //Assigns variable to user input for no. results to return
    var resultsNum = $("#number").value;
    //Assemble complete query URL
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "&query=" + category + location + urlKey;
    //!!REMOVE AFTER DEBUGGING
    console.log("Search: " + queryURL);
    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the resultsData variable
            var resultData = response.results;
            //!!REMOVE AFTER DEBUGGING
            console.log(resultData);
            x = document.getElementById("number").value;
            console.log("Input number: " + x);
            // Looping over every result item
            for (var i = 0; i < x; i++) {
                //    for (var i = 0; i < resultData.length; i++) {
                // Creating a var for the result display section of the page
                var resultDiv = $("<div class='result-divs'>");
                // Set a variable to the place's name from the API
                var placeName = response.results[i].name;
                // Creating an element to have the name displayed
                var pName = $("<p style='font-weight: bold;'>").text((i + 1) + ".   " + placeName);
                var address = response.results[i].formatted_address;
                var pAddress = $("<p>").text("Address: " + address);
                //'If' function to check if the photo reference property is undefined
                if (response.results[i].photos != undefined) {
                    //If not undefined, assign variable to hold photo_reference value
                    var picID = response.results[i].photos[0].photo_reference;
                    //Variable to create an HTML img element
                    var picHTML = $("<img>");
                    //Add src attribute to img element that assembles photo URL and attaches API key
                    picHTML.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + picID + "&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc");
                    //Add result-photo class to each photo
                    picHTML.attr("class", "result-photo");
                    //Combine all of the results sections into the resultsDiv
                    resultDiv.append(pName, pAddress, picHTML);
                } else {
                    //If photo_reference is undefined, append only the name and address divs to the result div
                    resultDiv.append(pName, pAddress);
                }
                //Update the page with the results
                $("#results-main").append(resultDiv);
            }
        });
});