//$(document).ready
$(document).ready(function () {
    //Setting up the welcome page
    //Setting up the button

    $("#btnZip").on("click", function (event) {
        event.preventDefault();
        var zipCode = $(".input").val().trim();
        // alert(zipCode)
        // console.log(zipCode);
        //Condiction
        if (zipCode === '') {
            $("#error").text("Error: Zipcode missing!");
            $("#error").attr("style", "color: white");
        } else {
            $("#error").text('');
            question();
        }
    });
    //Creating a function to go through the question
    var questions = ["Meat or no Meat", "What category of Food do you want to eat?", "What is your price range?", "Distance from zip?"];
var clicked = 0;
    function question() {
        //Setting up Questions 1 to 3 page
        for (let i = 0; i < questions.length; i++) {
            if (clicked === 0 && questions[0]) {
                $(".box").addClass("hide");
                $("#questions").text(questions[0]);
                //Setting up button for category
                $("#button-container").attr("style", "display: block");
                $("#btn1").text("Meayt");
                $("#btn2").text("No Meat");
                $("#btn3").addClass("hide");
                $("#btn4").addClass("hide");
               
                //console.log(this);
            };
            // if (questions[1]) {
            //     $(".box").addClass("hide");
            //     $("#questions").text(questions[1]);
            //     //Setting up button for category
            //     $("#button-container").attr("style", "display: block");
            //     $("#btn1").text("Asian");
            //     $("#btn2").text("American");
            //     $("#btn3").text("Italian");
            //     $("#btn4").text("European");
            //     //console.log(this);
            // }
        };
        // //Adding an event listener to each button
        // //Asian category
        // $("#btn1").click(function () {
        //     //alert($("#btn1").text());
        //     var category = $("<h1>");
        //     category.text("Asian");
        //     category.attr("style", "margin-top: 20px")
        //     $("#questions").append(category);
        //     $("#btn1").text("Japanese");
        //     $("#btn2").text("Vietnamese");
        //     $("#btn3").text("Thai");
        //     $("#btn4").text("Filipino");
        // });
        // //American category
        // $("#btn2").click(function () {
        //     //alert($("#btn2").text());
        //     var category = $("<h1>");
        //     category.text("American");
        //     category.attr("style", "margin-top: 20px")
        //     $("#questions").append(category);
        //     $("#btn1").text("1");
        //     $("#btn2").text("2");
        //     $("#btn3").text("3");
        //     $("#btn4").text("4");
        // });
        // //American category
        // $("#btn3").click(function () {
        //     //alert($("#btn3").text());
        //     var category = $("<h1>");
        //     category.text("Italian");
        //     category.attr("style", "margin-top: 20px")
        //     $("#questions").append(category);
        //     $("#btn1").text("1");
        //     $("#btn2").text("2");
        //     $("#btn3").text("3");
        //     $("#btn4").text("4");
        // });
    }





    //Setting up quesutions 1 button

    //Setting up question 2 page

    //Setting up question 2 button

    //Setting up question 3 page

    //Setting up question 3 button

    //Setting up question 4 page

    //Setting up question 4 button





    //Calling API through a function

    //Calling API through a function for second query

    //Seeting up the result page
});
