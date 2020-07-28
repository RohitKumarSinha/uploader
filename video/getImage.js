$(function () {
  "use strict";

  var body = $("#wrapper");

  function goToNextInput(e) {
    var key = e.which,
      t = $(e.target),
      sib = t.next("#wrapper #dialog input");

    if (key != 9 && (key < 48 || key > 57)) {
      e.preventDefault();
      return false;
    }

    if (key === 9) {
      return true;
    }

    if (!sib || !sib.length) {
      sib = body.find("input").eq(0);
    }
    sib.select().focus();
  }

  function onKeyDown(e) {
    var key = e.which;

    if (key === 9 || (key >= 48 && key <= 57)) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  function onFocus(e) {
    $(e.target).select();
  }

  body.on("keyup", "input", goToNextInput);
  body.on("keydown", "input", onKeyDown);
  body.on("click", "input", onFocus);
});

loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Filter tasks event
  document.getElementById("wrapper").style.display = "none";
  document.getElementById("wrapper1").style.display = "block";
}

// var container = document.getElementsByClassName("inputvalue")[0];
// container.onkeyup = function (e) {
//   var target = e.srcElement || e.target;
//   var maxLength = parseInt(target.attributes["maxlength"].value, 10);
//   var myLength = target.value.length;
//   if (myLength >= maxLength) {
//     var next = target;
//     while ((next = next.nextElementSibling)) {
//       if (next == null) break;
//       if (next.tagName.toLowerCase() === "input") {
//         next.focus();
//         break;
//       }
//     }
// }
// Move to previous field if empty (user pressed backspace)
//   else if (myLength === 0) {
//     var previous = target;
//     while ((previous = previous.previousElementSibling)) {
//       if (previous == null) break;
//       if (previous.tagName.toLowerCase() === "input") {
//         previous.focus();
//         break;
//       }
//     }
//   }
// };

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  return;
}

function reverse() {
  localStorage.clear();
  inputtxt = document.getElementById("input1").value;

  var phoneno = /^\d{10}$/;
  if (inputtxt.match(phoneno)) {
    const getresponse = new getResponse();
    inputtxt = "91" + inputtxt;
    getresponse.getUser(inputtxt).then((data) => {
      if (data.status == true) {
        // Store in LS
        storeTaskInLocalStorage(inputtxt);
      }
    });
  } else {
    alert("Not a valid Phone Number");
    $("#test").html("you enter wrong number please try again");
    // showAlert();
    return false;
  }
  console.log(inputtxt);
  // Filter tasks event
  document.getElementById("wrapper1").style.display = "none";
  document.getElementById("wrapper").style.display = "block";
}

var storage = firebase.storage();
var storageRef = storage.ref();

var i = 0;
show = "";

storageRef
  .child("Fashion/")
  .listAll()
  .then(function (result) {
    result.items.forEach(function (imageRef) {
      // console.log("Image reference" + imageRef.toString());
      i++;
      displayImage(i, imageRef);
    });
  });

function displayImage(row, images) {
  images.getDownloadURL().then(function (url) {
    console.log(url);
    show += `
       <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
        <div class="card">

 <div class="embed-responsive embed-responsive-16by9">
 <iframe class="embed-responsive-item" src="${url}" allowfullscreen></iframe>
</div>
  
    <div class="card-body">
     
           <p class="card-text">
              <div class="alert alert-success text-center" role="alert">
              <strong>ID :- </strong> ${row} 
            </div>
             <span class="card-title"><strong>${row}</strong></span>
             <span class="value float-right">(110)</span>
            <span class="badge badge-pill badge-success float-right mt-1">4.3 <i class="fas fa-star"></i></span>
            </div>
           

            </p>
            <div type="button" data-toggle="modal" data-target=".bd-example-modal-lg" class="btn-group btn-group-toggle btn-sm">
             <label class="btn one">
                <input type="radio" value="1" name="options" id="option1" > 1 
              </label>
              <label class="btn two">
               <input type="radio" value="2" name="options" id="option2"> 2 
              </label>
              <label class="btn three">
                <input type="radio" value="3" name="options" id="option3"> 3 
              </label>
               <label class="btn four">
                <input type="radio" value="4" name="options" id="option4" > 4 
              </label>
              <label class="btn five">
                <input type="radio" value="5" name="options" id="option5"> 5 
              </label>
            </div>
          </div>
        </div>
      </div>`;

    document.getElementById("showVideos").innerHTML = show;
  });
}

function stopStreamedVideo(videoElem) {
  const stream = videoElem;
  console.log(stream);
  const tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });

  videoElem = null;
}

// // JavaScript code
// function search_animal(e) {
//   let input = document.getElementById("searchbar").value;
//   input = input.toLowerCase();
//   let x = document.getElementsByClassName("card-title");

//   for (i = 0; i < x.length; i++) {
//     if (!x[i].innerHTML.toLowerCase().includes(input)) {
//       x[i].parentNode.parentNode.style.display = "none";
//     } else {
//       x[i].style.display = "list-item";
//     }
//   }
// }

// Filter Tasks
// function filterTasks(e) {
//   const text = e.target.value.toLowerCase();
//   if (text == "") {
//     window.location.reload();
//   }

//   document.querySelectorAll(".alert").forEach(function (task) {
//     const item = task.firstChild.textContent;
//     console.log(item);
//     if (item.toString().indexOf(text) != -1) {
//       task.style.display = "block";
//     } else {
//       task.parentNode.parentNode.parentNode.style.display = "none";
//     }
//   });
// }

function myFunction() {
  var input, filter, cards, cardContainer, h5, title, i;
  input = document.getElementById("myFilter");
  filter = input.value.toUpperCase();
  cardContainer = document.getElementById("showVideos");
  cards = cardContainer.getElementsByClassName("card");
  for (i = 0; i < cards.length; i++) {
    title = cards[i].querySelector(".card-body span.card-title");
    if (title.innerText.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

class getResponse {
  async getUser(inputtxt) {
    console.log(inputtxt);
    const profileResponse = await fetch(
      "http://services.thedirtylaundry.in/v1/otpservice?phone=" + inputtxt
    );

    const profile = await profileResponse.json();

    return profile;
  }
}

// Show Alert
function showAlert() {
  document.getElementById("wrapper1").appendChild = `
  <div class="alert alert-danger" role="alert">
  This is a danger alert—check it out!
  </div>
  `;
  // Create div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert alert-danger`;
  // Add text
  div.appendChild(document.createTextNode("you enter wrong mobile number"));
  // Get parent
  const container = document.querySelector("#modal");
  // Get form
  const form = document.querySelector(".modal-content");
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  // // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  console.log(tasks[0]);
  mobileNum = tasks[0];
  otp1 = document.getElementById("otpOne").value;
  otp2 = document.getElementById("otpTwo").value;
  otp3 = document.getElementById("otpThree").value;
  otp4 = document.getElementById("otpFour").value;

  otp = otp1 + otp2 + otp3 + otp4;

  const getresponse = new getOtp();
  getresponse.getUser(mobileNum, otp).then((data) => {
    if (data.status == false) {
      alert("Not a valid otp");
      $("#test1").html("you enter wrong OTP please try again");
    } else {
      // $("#modal").on("hidden.bs.modal", function () {
      //   $(this).find("form").trigger("reset");
      // });
      loadEventListeners();
      $(function () {
        $("#modal").modal("toggle");
      });
    }
  });

  console.log(otp);
}

function sendOtp() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  mobileNum = tasks[0];
  const getresponse = new getResponse();
  getresponse.getUser(mobileNum).then((data) => {
    if (data.status == true) {
      alert("Otp is sent");
    }
  });
}

class getOtp {
  async getUser(mobileNum, Otp) {
    const profileResponse = await fetch(
      "http://services.thedirtylaundry.in/v1/otpservice?phone=" +
        mobileNum +
        "&otp=" +
        Otp
    );

    const status = await profileResponse.json();

    return status;
  }
}

// class getResponse {
//   async sendOtp(inputtxt) {
//     const verifyOtp = await fetch(
//       "http://services.thedirtylaundry.in/v1/otpservice?phone=" + inputtxt
//     );

//     const getOtp = await verifyOtp.json();

//     return getOtp;
//   }
// }
