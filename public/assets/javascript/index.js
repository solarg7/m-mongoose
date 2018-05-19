$(".classSave").on("click", function(event) {
    console.log("paolita");
    var id = $(this).data("data-id");
    var storage = true;
  
     console.log(id + "storgae status= " + storage);
  
    var newState = {
      storage: storage
    };
  
    // Send the PUT request.
    $.ajax("/all/" + id, {
      type: "PUT",
      data: newState
    }).then(
      function() {
        console.log("changed devour to", newState);
        // Reload the page to get the updated list
        location.reload();
      }
    );
});