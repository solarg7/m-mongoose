$(".classSave").on("click", function(event) {
  console.log("hola Paolita" );
  
  var id = $(this).data("id");
  // var storage = $(this).data("storagestatus");
  var state = true;
  console.log("queee"+ $(this).data("id"));
  console.log("hola Paolita" + id + "mas =" + state);
  var newState = {
    storage: state
  };

  console.log(
    newState);

  // Send the PUT request.
  $.ajax("/"+ id, {

    type: "PUT",
    data: newState
  }).then(
    function() {
      console.log("changed devour to");
      // Reload the page to get the updated list
      location.reload();
    }
  );
});


$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});




// // Make sure we wait to attach our handlers until the DOM is fully loaded.
// $(function() {

    // $(".classSave").on("click", function(event) {
    //   var id = $(this).data("id");
    //   var newDevour = $(this).data("newdevour");

    //   var newDevourState = {
    //     devoured: newDevour
    //   };

    //   // Send the PUT request.
    //   $.ajax("/api/burgers/" + id, {
    //     type: "PUT",
    //     data: newDevourState
    //   }).then(
    //     function() {
    //       console.log("changed devour to", newDevour);
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });




//     $(".change-sleep").on("click", function(event) {
//       var id = $(this).data("id");
//       var newSleep = $(this).data("newsleep");
  
//       var newSleepState = {
//         sleepy: newSleep
//       };
  
//       // Send the PUT request.
//       $.ajax("/api/cats/" + id, {
//         type: "PUT",
//         data: newSleepState
//       }).then(
//         function() {
//           console.log("changed sleep to", newSleep);
//           // Reload the page to get the updated list
//           location.reload();
//         }
//       );
//     });
  
//     $(".create-form").on("submit", function(event) {
//       // Make sure to preventDefault on a submit event.
//       event.preventDefault();
  
//       var newCat = {
//         name: $("#ca").val().trim(),
//         sleepy: $("[name=sleepy]:checked").val().trim()
//       };
  
//       // Send the POST request.
//       $.ajax("/api/cats", {
//         type: "POST",
//         data: newCat
//       }).then(
//         function() {
//           console.log("created new cat");
//           // Reload the page to get the updated list
//           location.reload();
//         }
//       );
//     });
  
//     $(".delete-cat").on("click", function(event) {
//       var id = $(this).data("id");
  
//       // Send the DELETE request.
//       $.ajax("/api/cats/" + id, {
//         type: "DELETE",
//       }).then(
//         function() {
//           console.log("deleted cat", id);
//           // Reload the page to get the updated list
//           location.reload();
//         }
//       );
//     });
//   });
  