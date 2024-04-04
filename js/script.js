let form = document.querySelector("form");
let input = document.querySelector("input");
let cardEl = document.querySelector(".card");
let url = "https://restcountries.com/v3.1/name/";
let template = document.querySelector("template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let countryName = input.value.trim();
  if (countryName !== "") {
    fetchData(countryName)
      .then((data) => {
        updateUI(data);
      })
      .catch((error) => {
        error;
      });
  }
});

async function fetchData(countryName) {
  let response = await fetch(url + countryName);
  let data = await response.json();
  return data;
}

function updateUI(data) {
  cardEl.innerHTML = "";
  let country = data[0];

  let card = template.content.cloneNode(true);
  let image = card.querySelector("img");
  image.src = country.flags.svg;
  image.alt = country.name.common;

  let details = card.querySelector(".details");
  details.innerHTML = `
    <h1>${country.name.common}</h1>
    <p>Poytaxt: ${country.capital}</p>
    <p>Mintaqa: ${country.region}</p>
    <p>Maydon: ${country.area.toLocaleString()} km<sup>2</sup></p>
    <p>Aholisi: ${country.population.toLocaleString()}</p>
    <p>Chegaradosh davlatlar: ${country.borders.join(", ")}</p>
    <p>TLD: ${country.tld.join(", ")}</p>
  `;

  cardEl.appendChild(card);
  input.value = "";
}
