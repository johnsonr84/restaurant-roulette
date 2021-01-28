//$(document).ready
$(document).ready(function () {
    var clicked = 0;
    var zipAPI = "3TUtnF6zFHHIVFCDd6pcO8izME9T2DA8ohrHRUZ392YILAIEFEyTHv8uK1UlVOYp"
    var zomAPI = "1f187162b82ab83fb9770f3fdc8f7124"
    // var distanceInMiles = distanceInMetres / 1609;
    //Clear localStorage every used
    localStorage.clear();
    //Transition backgrounds effect
    var images = new Array('./css/bkgrd.jpg', './css/ramen.jpg', './css/taco.jpg', './css/waffle.jpg');
    var nextimage = 0;
    doSlideshow();
    $("#button-container").hide();
    function doSlideshow() {
        if (nextimage >= images.length) { nextimage = 0; }
        $('body')
            .css('background-image', 'url("' + images[nextimage++] + '")')
            .fadeIn(7000, function () {
                setTimeout(doSlideshow, 7000);
            });
    }
    //Setting up the button
    $("#btnZip").on("click", function (event) {
        event.preventDefault();
        var zipCode = $(".input").val().trim();
        // console.log(zipCode);
        //Condiction
        if (zipCode === '') {
            $("#error").text("Error: Zipcode missing!");
            $("#error").attr("style", "color: white");
        } else {
            $("#error").text('');
            question()
        }
        console.log(questions);
        function question() {
            

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




            // Ajax call for zip code API
            // var queryURL = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + zipAPI + "/info.json/" + zipCode + "/degrees";
            // $.ajax({
            //     url: queryURL,
            //     method: "GET",
            // }).then(function (response) {
            //     console.log(response);
            //     var lat = response.lat;
            //     var lng = response.lng;
            //     //Zomato API cuisine call
            //     var queryURL = "https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/cuisines?lat=" + lat + "&lon=" + lng;
            //     $.ajax({
            //         method: "GET",
            //         crossDomain: true,
            //         url: queryURL,
            //         dataType: "json",
            //         async: true,
            //         headers: {
            //             "user-key": zomAPI
            //         },
            //     }).then(function (response) {
            //         console.log(response);
            //     })
            //     //API call for price range
            //     var queryURL = "https://cors-anywhere.herokuapp.com/hhttps://developers.zomato.com/api/v2.1/cuisines?res_id=average_cost_for_two";
            //     $.ajax({
            //         method: "GET",
            //         crossDomain: true,
            //         url: queryURL,
            //         dataType: "json",
            //         async: true,
            //         headers: {
            //             "user-key": zomAPI
            //         },
            //     }).then(function (response) {
            //         console.log(response);
            //     })
            // })


        };
    });
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

        $("button").on("click", function (event) {

            event.preventDefault();
            var userInput = $(this).val();
            console.log(userInput);

            // console.log(clicked)

        })
        //function for click
        function nextQuestion() {
            for (let i = 0; i < clicked.length; i++) {
                if (!$(this).val === "") {
                    clicked++
                    console.log(clicked)

                }
                question()
            }


        }

    });
