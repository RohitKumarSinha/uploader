var selectedFile;
var option;
var Input;
function getImage() {
  var pic = document.getElementById("photo");
  // selected file is that file which user chosen by html form
  selectedFile = pic.files[0];
}

// function getOption(getOption) {
//   option = getOption;
// }

function Cleardata() {
  document.getElementById("photo").value = "";
}

// Event Listener for add book
function uploadImage() {
  // Get form values
  var name = "123" + Date.now();
  // make ref to your firebase storage and select images folder
  var storageRef = firebase.storage().ref("/Fashion/" + name);

  // put file to firebase
  var uploadTask = storageRef.put(selectedFile);

  // all working for progress bar that in html
  // to indicate image uploading... report
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var uploader = document.getElementById("uploader");
      uploader.value = progress;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log("Upload is running");
          break;
      }
    },
    function (error) {
      console.log(error);
    },
    function () {
      // get the uploaded image url back
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        // You get your url from here

        this.showImage.innerHTML = `
         <video width="320" height="240" controls>
         <source src=${downloadURL} type="video/mp4">
         Your browser does not support the video tag.
        </video>
        `;

        this.profile.innerHTML = `
          <div class="form-group">
          <label for="Textarea1">Your Image Url Link</label>
          <textarea class="form-control" id=Textarea1" rows="3">${downloadURL}</textarea>
          </div>
    `;

        this.clearbutton.innerHTML = `
        <form>
         <button class="btn btn-danger">Reset</button>
         </form>
        `;

        document.getElementById("photo").value = "";
        document.getElementById("uploader").value = "";
      });
    }
  );
}
