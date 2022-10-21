//"Client side js;

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msgOne");
const msgTwo = document.querySelector("#msgTwo");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const searchLocation = search.value;
	msgOne.textContent = "Loading ...";
	msgTwo.textContent = "";

	fetch(`/weather?address=${searchLocation}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				msgOne.textContent = `Error : ${data.error}`;
			} else {
				msgOne.textContent = data.location;
				msgTwo.textContent = data.forecast;
			}
		});
	});
});
