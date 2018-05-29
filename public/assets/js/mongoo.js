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
      title: "Write a Note for this Article!",
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