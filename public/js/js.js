const form = document.querySelector("form");
const input = document.querySelector("input");
const message1 = document.querySelector("#para-1");
const message2 = document.querySelector("#para-2");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const search = input.value;
    input.value = ""

    message1.textContent = "Loading"

    fetch(`http://localhost:3000/weather?address=${search}`)
        .then(resp => resp.json())
        .then(data => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message2.textContent = `
                Location - ${data.location}
                Temperatura - ${data.weather.temperature}`
                message1.textContent = ""
            }
        });
});