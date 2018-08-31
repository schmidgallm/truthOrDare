$(document).ready(function () {

  // Event listenters
  $(document).on('click', '#newDare', createDare)


  // AJAX Post Dare Request
  function createDare(e) {

    // Prevent form from submitting
    e.preventDefault();

    // get request params and create new dare object to post
    let newDare = {
      name: $('#name').val().trim(),
      description: $('#description').val().trim(),
      boardname: $('#category').val().trim(),
      value: $('#value').val()
    }

    // Ajax call to post to api
    $.ajax(`/dare/api/${newDare.name}/${newDare.boardname}`, {
      type: 'POST',
      data: newDare
    }).then(function () {

      swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!",
      }).then(() => {
        // Reload page to refresh dynamic content
        location.reload();
      });


    });

  };

});