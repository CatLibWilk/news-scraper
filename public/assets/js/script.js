
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