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

$(".classDelete").on("click", function(event) {
  console.log("hola Paolita delete" );
  
  var id = $(this).data("id");


  // Send the PUT request.
  $.ajax("/"+ id, {
    type: "DELETE",
  }).then(
    function() {
      console.log("changed devour to");
      // Reload the page to get the updated list
      location.reload();
    }
  );
});


$("#scrapeButton").on("click", function(event) {
  event.preventDefault();
  console.log("hola Paolita scrape" );
  // Send the PUT request.
  $.ajax("/scrape", {
    type: "GET",
  }).then(
    function() {
      console.log("changed devour to");
      // Reload the page to get the updated list
      bootbox.alert({
      
      size: "small",
      title: "Scrape Done!",
      message: "Articles Scraped from NYT", 
      callback: function(){ location.reload() }
      })



      // location.reload();
    }
  );
});


$(".classNote").on("click", function(event) {
  event.preventDefault();
  console.log("hola Paolita scrape" );
  // Send the PUT request.
  // $.ajax("/scrape", {
  //   type: "GET",
  // }).then(
  //   function() {
  //     console.log("changed devour to");
  //     // Reload the page to get the updated list
      bootbox.prompt({
      
      // size: "small",
      title: "Put a Note for this Article!",
      message: "Articles Scraped from NYT",
      inputType: 'textarea',
      // buttons: {
      //   cancel: {
      //       label: "I'm a custom cancel button!",
      //       className: 'btn-danger',
      //       callback: function(){
      //           Example.show('Custom cancel clicked');
      //       }
      //   },
      //   noclose: {
      //       label: "I'm a custom button, but I don't close the modal!",
      //       className: 'btn-warning',
      //       callback: function(){
      //           Example.show('Custom button clicked');
      //           return false;
      //       }
      //   },
      //   ok: {
      //       label: "I'm a custom OK button!",
      //       className: 'btn-info',
      //       callback: function(){
      //           Example.show('Custom OK clicked');
      //       }
      //   }
      // }, 
      callback: function(){ location.reload() }
      })



  //     // location.reload();
  //   }
  // );
});

// $("#scrape").on("click", function(event) {
//   console.log("hola Paolita" );
//   var newState = {
//     storage: state
//   };

//   $.ajax("/scrape", {

//     type: "PUT",
//     data: newState
//   }).then(
//     function() {
//       console.log("changed devour to");
//       // Reload the page to get the updated list
//       location.reload();
//     }
//   );
// });

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
  