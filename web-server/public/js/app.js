console.log("Client side js is loaded.");

const w_Form = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#_message1");
const message2 = document.querySelector("#_message2");

function viewDiv() {
  document.getElementById("container-content-id").style.display = "block";
}
function hideDiv() {
  document.getElementById("container-content-id").style.display = "none";
}

w_Form.addEventListener("submit", (event) => {
  event.preventDefault(); //stop refresh page

  const location = search.value;

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        message2.textContent = data.error;
        message1.textContent = " ";
        setTimeout(() => {
          hideDiv();
        }, 1500);
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
        viewDiv();
      }
    });
  });
});
