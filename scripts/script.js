//$(document).ready
$(document).ready(function () {
    var clicked = 0;
    var zomAPI = "1f187162b82ab83fb9770f3fdc8f7124"
    var allInput = [];
    var cuisineId = [];
    // var distanceInMiles = distanceInMetres / 1609;

    //Clear localStorage every used
    localStorage.clear();
    //Transition backgrounds effect
    var images = new Array('./css/bkgrd.jpg', './css/ramen.jpg', './css/taco.jpg', './css/waffle.jpg');
    var nextImage = 0;
    doSlideshow();
    $("#button-container").hide();
    function doSlideshow() {
        if (nextImage >= images.length) { nextImage = 0; }
        $('body')
            .css('background-image', 'url("' + images[nextImage++] + '")')
            .fadeIn(function () {
                setTimeout(doSlideshow, 7000);
            });
    }
    //Setting up the button
    $("#btnZip").on("click", function (event) {
        event.preventDefault();
        var zipCode = $(".input").val().trim();
        localStorage.setItem("zipcode", zipCode);
        if (zipCode === '') {
            $("#error").text("Error: Zipcode missing!");
            $("#error").attr("style", "color: white");
        } else {
            $("#error").text('');
            startQuestions();
        }
        console.log(questions);
        zipCall(zipCode);
    })
        // Ajax call for zip code API
        function zipCall(zipCode) {
            var zipQueryURL = "http://api.zippopotam.us/US/" + zipCode;
            $.ajax({
                url: zipQueryURL,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                var lat = response.places[0].latitude;
                console.log("🚀 ~ file: script.js ~ line 49 ~ lat", lat)
                var lng = response.places[0].longitude;
                console.log("🚀 ~ file: script.js ~ line 50 ~ lng", lng)
                cuisineCall(lat, lng)
            })
            
        }

        //Zomato API cuisine call
        function cuisineCall(lat, lng) {
            var cuisineQueryURL = "https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/cuisines?lat=" + lat + "&lon=" + lng;
            $.ajax({
                method: "GET",
                crossDomain: true,
                url: cuisineQueryURL,
                dataType: "json",
                async: true,
                headers: {
                    "user-key": zomAPI
                },
            }).then(function (response) {
                console.log(response);
            })
            priceCall(cuisineId);
        }
    
    //API call for price range
    function priceCall(cuisineId) {
        var priceQueryURL = "https://developers.zomato.com/api/v2.1/search?cuisines=" + cuisineId;
        $.ajax({
            method: "GET",
            crossDomain: true,
            url: priceQueryURL,
            dataType: "json",
            async: true,
            headers: {
                "user-key": zomAPI
            },
        }).then(function (response) {
            console.log(response);
        })
    }



$("button").on("click", function (event) {

    if ($("Button").val() === "American") {
        cuisineId = response.cuisines[2].cuisine.cuisine_id;
        console.log(cuisineId)
    }
    if ($("Button").val() === "Italian") {
        cuisineId = response.cuisines[47].cuisine.cuisine_id;
        console.log(cuisineId)
    }
    if ($("Button").val() === "Mexican") {
        cuisineId = response.cuisines[54].cuisine.cuisine_id;
        console.log(cuisineId)
    }
    if ($("Button").val() === "Asian") {
        cuisineId = response.cuisines[4].cuisine.cuisine_id;
        console.log(cuisineId)
    }
})
//Function for cuisine
function showCuisine() {
    $("#button-container,#cuisine").show();
    $(".input,#box,#price,#radius").hide();

};
//show radius buttons function
function showRadius() {
    $("#button-container,#radius").show();
    $(".input,#box,#price,#cuisine").hide();
};
//show prices buttons function
function showPrice() {
    $("#button-container,#price").show();
    $(".input,#box,#radius,#cuisine").hide();

};
//event listener for button clicks, push to local storage
$("button").on("click", function (event) {
    event.preventDefault();
    clicked++;
    startQuestions();
    console.log(clicked)
    var userInput = $(this).val();
    allInput.push(userInput);
    console.log(allInput);
    localStorage.setItem("userInput", allInput);
})

//function for click
function nextQuestion() {
    for (let i = 0; i < clicked.length; i++) {
        if (!$(this).val === "") {
            // console.log(clicked)
        }
        startQuestions();
    }
}

function startQuestions() {

    if (clicked === 0) {
        $("#questions").text(questions[0].question);
        showCuisine()
        nextQuestion()
    }
    if (clicked === 1) {
        $("#questions").text(questions[1].question);
        showRadius()
        nextQuestion()
    }

    if (clicked === 2) {
        $("#questions").text(questions[2].question);
        showPrice()
        nextQuestion()
    }
}

});
