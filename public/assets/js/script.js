
$(document).on("click",".scrape-btn", (e) => {
    e.preventDefault();
    console.log("clicked");
    $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "GET",
        url: "/scrape",
      }).then((result => {
          console.log(result)
          location.reload();
      }))
});

$(document).on("click", ".comment-btn", function(e){
    var targetId = $(this).attr("data-id");
    console.log(targetId);

    $("#sub-btn").on("click", function(e){
        e.preventDefault();

        if( $("#commentInput").val() && $("#titleInput").val() ) {
            $.ajax({
                type: "POST",
                url: "/articles/" + targetId,
                data: {
                    title: $("#titleInput").val(),
                    body: $("#commentInput").val()
                }
              }).then((result => {
                  console.log(result)
                //   location.reload();
              }));

        }else{
            console.log("Please provide a note title and comment to save.")
        };

    });
});