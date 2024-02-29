const updateBtns = document.querySelectorAll('#update-btn');
const deleteBtns = document.querySelectorAll('#delete-btn');
const cancelBtns = document.querySelectorAll('#cancel-btn');
const saveBtns = document.querySelectorAll('#save-btn');

updateBtns.forEach(updateBtn => {
  updateBtn.addEventListener('click', _ => {
    // get the id from url parameter
    const postId = updateBtn.dataset.id;
    console.log('clicked UPDATE btn', postId);
    window.location.href =`/posts/${postId}/edit`;
  });
})

function getEditFormData() {
  const form = document.getElementById('editPostForm');
  const postFormData = {}
  const editForm = new FormData(form);
  for(const [key, val] of editForm.entries()) {
    postFormData[key] = val;
  }
  console.log(postFormData)
  return postFormData;
}

// handle when a user clicks "Save Changes" on the Edit Quote page
saveBtns.forEach(saveBtn => {
  saveBtn.addEventListener("click", _=> {
    const postId = saveBtn.dataset.id;
    const postUpdatedData = getEditFormData();
    // send PUT request to server with updated information
    fetch(`/posts/${postId}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(postUpdatedData)
      }).then(_=> {
        alert('Your changes have been saved!')
      })
      .catch(err => console.error(err))
  })

});


cancelBtns.forEach(cancelBtn => {
  cancelBtn.addEventListener('click', _ => {

  });
});

deleteBtns.forEach(deleteBtn => {
  deleteBtn.addEventListener('click', _ => {
    const postId = deleteBtn.dataset.id;
    // const postDeleteData = getEditFormData();
    console.log(postId)
    fetch(`/posts/${postId}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(postDeleteData)
    })
      .then(res => {
        if (res.ok) {
          console.log(res)
          return res.json()
        }
      })
      .then(data => {
        console.log('Deleted:', data)
        alert('Your changes have been saved!')
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while deleting the post. Please try again later.'); 
      })
  });
});