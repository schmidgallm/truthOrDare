$(document).ready(function () {

  // Event listenters
  $(document).on('click', '#newDare', createDare);
  $(document).on('click', '.doit', claimBounty);
  $(document).on('click', '.awaitDelete', deleteBounty);
  $(document).on('click', '.notApproved', notApproveBounty);


  /*
  // -------------------------
  // POST NEW DARE
  // -------------------------
  */

  function createDare(e) {

    // Prevent form from submitting
    e.preventDefault();

    // get request params and create new dare object to post
    let newDare = {
      name: $('#name').val().trim(),
      description: $('#description').val().trim(),
      boardname: $('#boardname').val().trim(),
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

  /*
  // -------------------------
  // PUT NEW DARE TO CLAIMED: TRUE
  // -------------------------
  */

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

  /*
  // -------------------------
  // DELETE CLAIMED DARE
  // -------------------------
  */

  function deleteBounty() {

    // grab id of selected item and put into object
    const id = $(this).attr('id');
    let deleteDare = {
      id: id
    }

    console.log(deleteDare);

    // call ajax delete request
    $.ajax({
      url: `/dare/api/claimed/:${deleteDare.id}`,
      type: 'DELETE',
      data: deleteDare,
      success: postDelete()
    })
  }

  // on succesful ajax deletion run this function
  function postDelete() {
    console.log('item deleted');
    swal({
      title: "Dare Approved!",
      icon: "success",
      button: "Done"
    })
    .then( () => {
      location.reload();
    })
  }

  /*
  // -------------------------
  // PUT NEW DARE BACK TO CLAIMED: FALSE
  // -------------------------
  */

  function notApproveBounty(){

    // grab id of selected item
    const id = $(this).attr('id');
    const notApproveDare = {
      id: id
    }

    console.log(notApproveDare);

    // call ajax to change bounty status
    $.ajax({
      url: `/dare/api/claimed/${notApproveDare.id}`,
      type: 'PUT',
      data: notApproveDare,
      success: postNotApprove()
    })
  }

  function postNotApprove(){
    console.log('item not approved');
    swal({
      title: "Dare Not Approved!",
      icon: "success",
      button: "Done"
    })
    .then( () => {
      location.reload();
    })
  }

});