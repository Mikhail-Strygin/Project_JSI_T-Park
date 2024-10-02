const countryWrap = document.querySelector(".country__wrapper");
const filterRegionValue = document.querySelector("#filter-region");
const filterOption = document.querySelectorAll("#option");
const filterInput = document.querySelector("#filter-input");
const filterLabel = document.querySelector(".label-filter");
const topic = document.querySelector(".container__topic");
const arrRegion = [];

window.addEventListener("DOMContentLoaded", () => {
  getCountry();
});

async function getCountry() {
  const resp = await fetch("https://restcountries.com/v3.1/all");
  const result = await resp.json();
  createCountryArray(result);
}

// Создание массива со объектами - странами содержащие свойства name,popul,reg,cap,flag.
function createCountryArray(result) {
  var arrCountry = [];
  result.forEach((item) => {
    let country = {
      name: item.name.common,
      population: item.population,
      region: item.region,
      capital: item.capital,
      flag: item.flags.png,
    };

    arrCountry.push(country);
  });

  showDocObject(arrCountry);
  showFilterRegion(arrCountry);
  filterRegionValue.addEventListener("change", (event) => {
    filterRegion(arrCountry, event.target.value);
  });
  filterInput.addEventListener("input", (event) => {
    filterName(arrCountry, event.target.value);
    // console.log(event.target.value);
    console.log(event.target);
  });
}
// Вывести на экран массив стран, заранее отсортированный по имени
function showDocObject(array) {
  array = sortedArray(array, "name");
  array.forEach((item) => {
    document.querySelector(".country__wrapper").insertAdjacentHTML(
      "beforeend",
      `<div class="country__fields change__topic">
          <img src="${item.flag}" alt="flag" class="flag" />
          <div class="country__fields-text">
          <span class="country__name">${item.name}</span>
          <div class="country__field ">
            <span class="country__population">Population: </span>
            <span class="country__value">${item.population}</span>
          </div>
          <div class="country__field pd_5">
            <span class="country__region">Region:  </span>
            <span class="country__value">${item.region}</span>
          </div>
          <div class="country__field pd_5">
            <span class="country__capital">Capital: </span>
            <span class="country__value">${item.capital}</span>
          </div>
          </div>
        </div>`
    );
  });
}
// отрисовка в selected option с названиями регионов
function showFilterRegion(arr) {
  arr = sortedArray(arr, "region");
  arr.forEach((item) => {
    arrRegion.push(item.region);
  });
  let newArrRegion = [];
  arrRegion.forEach((item) => {
    if (!newArrRegion.includes(item)) {
      newArrRegion.push(item);
    }
  });
  newArrRegion.forEach((item) => {
    filterRegionValue.insertAdjacentHTML(
      "beforeend",
      `<option value="${item}" id="option">${item}</option>`
    );
  });
}
// сортировка массива по параметру
function sortedArray(arr, parametr) {
  let result = arr.sort((a, b) => {
    textA = a[parametr].toLowerCase();
    textB = b[parametr].toLowerCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return result;
}
// фильтрация по региону с последующем выводом на экран
function filterRegion(arrCountry, region) {
  console.log(arrCountry);
  let newArrCountry = [];
  if (region != "" && region != "null") {
    clearCountryWrapper();
    for (let i = 0; i < arrCountry.length; i++) {
      if (region == arrCountry[i].region) {
        newArrCountry.push(arrCountry[i]);
      }
    }
    showDocObject(newArrCountry);
  } else if (region == "null") {
    clearCountryWrapper();
    showDocObject(arrCountry);
  }
}
//фильтрация по названию страны
function filterName(arrCountry, name) {
  let arrCountryName = [];
  arrCountry.forEach((item) => {
    arrCountryName.push(item.name);
  });
  let result = arrCountryName.filter((item) =>
    item.toLowerCase().startsWith(name.toLowerCase())
  );
  console.log(result);
  let newArrCountryName = [];
  arrCountry.forEach((item) => {
    result.forEach((elem) => {
      if (item.name == elem) {
        clearCountryWrapper();
        newArrCountryName.push(item);
      }
    });
  });
  if (newArrCountryName.length) {
    console.log(1);
    showDocObject(newArrCountryName);
    filterLabel.classList.remove("show");
  } else {
    filterLabel.classList.add("show");
  }
  newArrCountryName = [];
}
// очистка контейнера
function clearCountryWrapper() {
  countryWrap.innerHTML = "";
}
// реализация смены темы
topic.addEventListener("click", function () {
  // console.log(1);
  document.querySelectorAll(".change__topic").forEach((item) => {
    item.classList.toggle("dm-bg_color-top");
  });
  document.querySelector(".image__moon-dark").classList.toggle("show");
  document.querySelector(".image__moon-light").classList.toggle("hidden");
  document.querySelector("body").classList.toggle("dm-bg_color-win");
});
