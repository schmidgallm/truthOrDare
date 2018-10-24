$(document).ready(function () {

  // Event listenters
  $(document).on('click', '#newDare', createDare)
  $(document).on('click', '.doit', claimBounty)


  // AJAX Post Dare Request
  function createDare(e) {

    // Prevent form from submitting
    e.preventDefault();

    // get request params and create new dare object to post
    let newDare = {
      name: $('#name').val().trim(),
      description: $('#description').val().trim(),
      boardname: $('#description').val().trim(),
      bounty: $('#value').val()
    }

    // Ajax call to post to api
    $.ajax(`/dare/api/${newDare.name}/${boardname}`, {
      type: 'POST',
      data: newDare
    }).then( () => {
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

  function claimBounty() {

    // prevent default behavior
    // e.preventDefault();

    const id = $(this).attr('id');
    console.log(id);

    let updateBounty = {
      id: $(this).attr('id')
    }

    console.log(updateBounty);

    // ajax call to update bounty
    $.ajax({
      url: `/dare/api/${updateBounty.id}`,
      type: 'PUT',
      data: updateBounty,
      success: postClaim()
    })

  }

  function postClaim() {
    console.log('dare updated')
      swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!"
      })
      .then( () => {
        // Reload page to refresh dynamic content
        location.reload();
      })
  }

});