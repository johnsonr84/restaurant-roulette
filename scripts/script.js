//$(document).ready
$(document).ready(function () {
  var clicked = 0;
  var zomAPI = "1f187162b82ab83fb9770f3fdc8f7124";
  var allInput = [];
  var userInput = [];
  var radiusInput = "";
  var cuisineInput = "";
  // var priceInput = '';
  var lat = "";
  var lng = "";
  var results = [];
  var restNameInput = "";
  var result = "";
  var restNameInputAll = [];
  var idealRestName = "";
  var zomLat = "";
  var zomLng = "";
  var reviewGrade = "";
  var reviewText = "";
  var idealReviewGrade = "";
  var idealReviewText = "";
  var mapLng = JSON.parse(localStorage.getItem("zomLng", zomLng));
  var mapLat =JSON.parse(localStorage.getItem("zomLat", zomLat));

  //var imageUrl = '';
  //Clear localStorage every used
  //localStorage.clear();
  //Transition backgrounds effect
  var images = new Array(
    "./css/bkgrd.jpg",
    "./css/ramen.jpg",
    "./css/taco.jpg",
    "./css/waffle.jpg"
  );
  var nextImage = 0;
  doSlideshow();
  $("#button-container").hide();
  function doSlideshow() {
    if (nextImage >= images.length) {
      nextImage = 0;
    }
    $("body")
      .css("background-image", 'url("' + images[nextImage++] + '")')
      .fadeIn(function () {
        setTimeout(doSlideshow, 7000);
      });
  }
  //Setting up the button
  $("#btnZip").on("click", function (event) {
    event.preventDefault();
    var zipCode = $(".input").val().trim();
    localStorage.setItem("zip code", zipCode);
    if (zipCode === "") {
      $("#error").text("Oops, you didn't enter a ZIP!");
      $("#error").attr("style", "color: white");
    } else {
      $("#error").text("");
      startQuestions();
    }
   // console.log(zipCode);
   // console.log(questions);
    zipSearch(zipCode);
  });

  //event listener for button clicks, push to local storage
  $("button").on("click", function (event) {
    event.preventDefault();
    clicked++;
    startQuestions();
    //console.log("clicked", clicked);
    userInput = $(this).val();
    allInput.push(userInput);
    //console.log("allInput", allInput);
    localStorage.setItem("userInput", allInput);
    radiusInput = allInput[1];
    //console.log("radiusInput", radiusInput);
    cuisineInput = allInput[0];
    //console.log("cuisineInput", cuisineInput);
    // priceInput = allInput[2];
    // console.log(priceInput)
    searchCall(lat, lng, radiusInput, cuisineInput);
  });
  function zipSearch(zipCode) {
    // Ajax call for zip code API
    var zipQueryURL = "https://api.zippopotam.us/us/" + zipCode;
    $.ajax({
      url: zipQueryURL,
      method: "GET",
      async: false,
    }).then(function (response) {
     // console.log(response);
      lat = response.places[0].latitude;
      //console.log(lat);
      lng = response.places[0].longitude;
     // console.log(lng);
    });
  }
  //API call for search
  function searchCall(lat, lng, radiusInput, cuisineInput) {
    var priceQueryURL =
      "https://developers.zomato.com/api/v2.1/search?&lat=" + lat + "&lon=" + lng + "&radius=" + radiusInput + "&cuisines=" + cuisineInput + "&sort=real_distance";
     // console.log(priceQueryURL);
    $.ajax({
      method: "GET",
      crossDomain: true,
      url: priceQueryURL,
      dataType: "json",
      async: false,
      headers: {
        "user-key": zomAPI,
      },
    }).then(function (response) {
     // console.log(response);
      // console.log(priceQueryURL)
      result = response.restaurants;
      r = [Math.floor(Math.random() * result.length)];
      results = result[r];
     // console.log(results);
      // console.log(results.restaurant.name)
      restNameInput = results.restaurant.name;
      //console.log(restNameInput);
      //restNameInputAll.push(restNameInput)
      //console.log(restNameInputAll);
      ///localStorage.setItem("restaurantName", restNameInputAll)
      localStorage.setItem("restaurantName", restNameInput);
      zomLat = results.restaurant.location.latitude;
      localStorage.setItem("zomLat", zomLat);
     // console.log(zomLat);
      zomLng = results.restaurant.location.longitude;
     // console.log(zomLng);
      localStorage.setItem("zomLng", zomLng);
      reviewGrade = results.restaurant.user_rating.aggregate_rating;
     // console.log(reviewGrade);
      localStorage.setItem("reviewGrade", reviewGrade);
      reviewText = results.restaurant.user_rating.rating_text;
      //console.log(reviewText);
      localStorage.setItem("reviewText", reviewText);
      // imageUrl = results.restaurant.photos_url;
      // console.log(imageUrl);
      // localStorage.setItem("image", imageUrl);
    });
  }
  //Function for cuisine
  function showCuisine() {
    $("#button-container,#cuisine").show();
    $(".input,#box,#price,#radius").hide();
  }
  //show radius buttons function
  function showRadius() {
    $("#button-container,#radius").show();
    $(".input,#box,#price,#cuisine").hide();
  }
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
      showCuisine();
      nextQuestion();
    }
    if (clicked === 1) {
      $("#questions").text(questions[1].question);
      showRadius();
      nextQuestion();
    }

    if (clicked === 2) {
      // $("#questions").text(questions[2].question);
      // showPrice()
      // nextQuestion()
      change();
    }
    //
  }
  function change() {
    if (clicked === 2 || restNameInputAll.length === 2) {
      // $("<index.html>").hide();
      // $("<results.html>").show();

      window.location.href = "results.html";
      // $("#restName").text(localStorage.getItem("restaurantName", restNameInput))
    }
  }
  idealRestName = localStorage.getItem("restaurantName", restNameInput);
  //console.log(idealRestName)
  $("#restName").text(idealRestName);
  change();

  //Getting the location
  $("#btnGo").on("click", function () {
    $("#btnGo").attr(
      "href",

      "https://www.google.com/maps/search/?api=1&query=" + localStorage.getItem("restaurantName", restNameInput)

    );
  });

  //Setting up the review part
  idealReviewGrade = localStorage.getItem("reviewGrade", reviewGrade);
 // console.log(idealReviewGrade);
  idealReviewText = localStorage.getItem("reviewText", reviewText);
 // console.log(idealReviewText);
  $(".review").text(idealReviewGrade + "/5 --- " + idealReviewText);

  // //Getting the map
  let map;
  
  function initMap() {
    
    const pin = {
      lat: mapLat, lng: mapLng
    }
    map = new google.maps.Map(document.getElementById("map"), {
     
      center: { lat: mapLat, lng: mapLng },
      zoom: 10,
    });
    const marker = new google.maps.Marker({
      position: pin,
      map: map
     
    });
  }
  initMap();

  //Setting image
  // var idealImage = results.restaurant.photos_url;
  // $("#image").attr("src", idealImage)
  
});
