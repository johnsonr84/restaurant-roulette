//$(document).ready
$(document).ready(function () {
    var clicked = 0;
    var zomAPI = "1f187162b82ab83fb9770f3fdc8f7124"
    var allInput = [];
    var userInput = [];
    var radiusInput = '';
    var cuisineInput = '';
    // var priceInput = '';
    var lat = '';
    var lng = '';
    var results = [];
    var restName = [];
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
        localStorage.setItem("zip code", zipCode);
        if (zipCode === '') {
            $("#error").text("Oops, you didn't enter a ZIP!");
            $("#error").attr("style", "color: white");
        } else {
            $("#error").text('');
            startQuestions();
        }
        console.log(zipCode)
        console.log(questions);
        zipSearch(zipCode)
    })

    //event listener for button clicks, push to local storage
    $("button").on("click", function (event) {
        event.preventDefault();
        clicked++;
        startQuestions();
        console.log("clicked", clicked)
        userInput = $(this).val();
        allInput.push(userInput);
        console.log("allInput", allInput);
        localStorage.setItem("userInput", allInput);
        radiusInput = allInput[1];
        console.log("radiusInput", radiusInput)
        cuisineInput = allInput[0];
        console.log("cuisineInput", cuisineInput)
        // priceInput = allInput[2];
        // console.log("priceInput", priceInput)
        searchCall(lat, lng, radiusInput, cuisineInput)
    })
    function zipSearch(zipCode) {
        // Ajax call for zip code API
        var zipQueryURL = "https://api.zippopotam.us/us/" + zipCode;
        $.ajax({
            url: zipQueryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            lat = response.places[0].latitude;
            console.log("lat", lat)
            lng = response.places[0].longitude;
            console.log("lng", lng)
            searchCall(lat, lng, radiusInput, cuisineInput)
        })
    };
    //API call for search
    function searchCall(lat, lng, radiusInput, cuisineInput) {

        var priceQueryURL = "https://developers.zomato.com/api/v2.1/search?&lat=" + lat + "&lon=" + lng + "&radius=" + radiusInput + "&cuisines=" + cuisineInput;
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
            console.log(priceQueryURL)
            var result = response.restaurants;
            r = [Math.floor(Math.random() * result.length)];
            results = result[r];
            // console.log(results)
            // console.log(results.restaurant.name)
            restName = results.restaurant.name
            // localStorage.setItem("restaurantname", results.restaurant.name)
            $("#restName").append(restName)
        })

    }
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
    // function showPrice() {
    //     $("#button-container,#price").show();
    //     $(".input,#box,#radius,#cuisine").hide();

    // };


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
            // showPrice()
            nextQuestion()
        }
    }

    // $("#restName").append(JSON.stringify(localStorage.getItem("restaurantname")))
   

});
