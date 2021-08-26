//this is for fetching forecast

//http requrest: use fetch api
//use then method
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

//get search results from index.hbs form
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "";

//how to run code when someone submits a form
//add event listener.
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  messageOne.textContent = "Patience is a virtue.";
  messageTwo.textContent = "Loading..";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo.textContent = "";
          // console.log(data.error);
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
          // console.log(data.location);
          // console.log(data.forecast);
        }
      });
    }
  );
});
