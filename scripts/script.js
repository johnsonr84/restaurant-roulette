//$(document).ready
$(document).ready(function () {
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
            for (let i = 0; i < questions.length; i++) {
                $("#questions").text("questions[i]");
                if ($("#questions").text(questions[0])) {
                    $("#button-container").show();
                    $(".input").hide();
                    $("#cuisine").show();
                    $("#box").hide();
                    $("#price").hide();
                    $("#radius").hide();
                }
            }
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
    });
    $("#btnAmerican").on("click", function (event) {
        event.preventDefault();
        var American = $("#btnAmerican").val().trim();
        console.log(American);
    })
});
