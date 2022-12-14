const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findmatches(wordMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findmatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value.toUpperCase()}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value.toUpperCase()}</span>`
      );
      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const sercher = document.querySelector(".searcher");
const suggestions = document.querySelector(".suggestions");

sercher.addEventListener("change", displayMatches);
sercher.addEventListener("keyup", displayMatches);
