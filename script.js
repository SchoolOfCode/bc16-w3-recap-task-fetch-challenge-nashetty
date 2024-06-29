// TODO - maybe change the original image a tag, so that the api call is only made when the link is clicked?
// refactor the code so it's not repetitive (initial data and new data)

// fetch data and console log the object ✅
// after testing in POSTMAN, the API key is not necessary

// function to fetch the data from search
async function fetchSearchData() {
  // add search functionality
  // get search input value
  const searchInputValue = document.querySelector("#search").value;

  // url for NASA API with the search input value
  // encode a URI (Uniform Resource Identifier) - searchInputValue before it is appended to the URL
  // only fetch images (no videos or audio files)
  const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(
    searchInputValue
  )}&media_type=image`;

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  // response failed
  if (!response) {
    console.error(`Request failed: ${response.statusText}`);
    return;
  }

  // parse to json
  const data = await response.json();
  // console.log(data)
  return data;
}

// function to display initial 'Trending pictures'
// function to fetch the data
async function fetchTrendingData(endpoint) {
  const url = "https://images-api.nasa.gov";
  const response = await fetch(url + endpoint, {
    headers: {
      accept: "application/json",
    },
  });
  // response failed
  if (!response) {
    console.error("Request failed");
    return;
  }

  // parse to json
  const data = await response.json();
  return data;
}

// get original size picture
async function originalSizeImg(imgUrl) {
  const response = await fetch(imgUrl, {headers: {accept: "application/json",},});
  if (!response) {
    console.error("Image coult not be retrieved");
    return
  }
  // parse to jscon
  const data = await response.json();
  return data
}

// Endpoint should be in format - /search?q={q}
// Trending pictures
const endpoint1 = "/search?q=carina_nebula";
const endpoint2 = "/search?q=PIA15416";
const endpoint3 = "/search?q=GSFC_20171208_Archive_e002159";

// to get the original size pictures, fetch request needs to be made to the following:
// https://images-api.nasa.gov/asset/PIA15416
// the original size photo is saved under collection.items[0].href
// add functionality to display the full size image when the picture is clicked

// Display data on the page
async function displayOnPage() {
  // display trending images
  let NASAdata = [];
  NASAdata.push(await fetchTrendingData(endpoint1));
  NASAdata.push(await fetchTrendingData(endpoint2));
  NASAdata.push(await fetchTrendingData(endpoint3));
  // get displayResults element from DOM
  // const container = document.querySelector(".container");
  const main = document.querySelector("main");
  for (let i = 0; i < NASAdata.length; i++) {
    // create elements that are the same as title, img and description in displayResults div from DOM
    const container = document.createElement("div");
    container.classList.add("container");
    const displayResults = document.createElement("div");
    displayResults.classList.add("displayResults");
    const title = document.createElement("h2");
    title.classList.add("title");
    const displayDescription = document.createElement("div");
    displayDescription.classList.add("displayDescription");
    const description = document.createElement("div");
    description.classList.add("description");
    const linkToOrigSizeImg = document.createElement("a")
    const displayImage = document.createElement("img");
    displayImage.classList.add("displayImage");

    // create and update text content for title
    let text = NASAdata[i].collection.items[0].data[0].title;
    title.textContent = text;
    displayResults.appendChild(title);

    //link to big image
    let bigSizeImg = await originalSizeImg(NASAdata[i].collection.items[0].href)
    console.log(bigSizeImg)
    linkToOrigSizeImg.href = bigSizeImg[0]
    linkToOrigSizeImg.target = '_blank'
    // display image
    displayImage.src = NASAdata[i].collection.items[0].links[0].href;
    linkToOrigSizeImg.appendChild(displayImage);
    displayResults.appendChild(linkToOrigSizeImg);
    // displayResults.appendChild(displayImage);

    // create and update text content for description
    text = NASAdata[i].collection.items[0].data[0].description;
    description.textContent = text;
    displayDescription.appendChild(description);
    container.appendChild(displayResults);
    container.appendChild(displayDescription);
    main.appendChild(container);

    displayDescription.addEventListener("click", function () {
      displayDescription.style.display = "none";
      displayResults.style.display = "flex";
    });

    title.addEventListener("click", function () {
      displayResults.style.display = "none";
      displayDescription.style.display = "flex";
    });
  }

  // get searchBtn and input field  to add event listener to fetch data when the search button is clicked/enter pressed
  const searchBtn = document.querySelector("#search-btn");
  const searchInput = document.querySelector("#search");
  // enable Enter key shortcut to press the searchBtn
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault;
      searchBtn.click();
    }
  });
  // add event listener to fetch data when the search button is clicked/enter pressed
  searchBtn.addEventListener("click", renderData);
}

displayOnPage();

async function renderData() {
  const NASAdata = await fetchSearchData();
  console.log(NASAdata.collection.items.length);
  console.log(NASAdata);

  // get displayResults element from DOM and clear content
  // const container = document.querySelector(".container");
  const main = document.querySelector("main");
  const trending = document.getElementById("trending");
  main.innerHTML = "";
  // container.innerHTML = "";
  trending.innerHTML = "";

  // loop through every element in the NASAdata collection
  for (let i = 0; i < NASAdata.collection.items.length; i++) {
    // create elements that are the same as title, img and description in displayResults div from DOM
    const container = document.createElement("div");
    container.classList.add("container");
    const displayResults = document.createElement("div");
    displayResults.classList.add("displayResults");
    const displayDescription = document.createElement("div");
    displayDescription.classList.add("displayDescription");

    const title = document.createElement("h2");
    title.classList.add("title");

    const description = document.createElement("div");
    description.classList.add("description");

    const linkToOrigSizeImg = document.createElement("a")
    const displayImage = document.createElement("img");
    displayImage.classList.add("displayImage");

    // create and update text content for title
    let text = NASAdata.collection.items[i].data[0].title;
    title.textContent = text;
    displayResults.appendChild(title);

    //link to big image
    let bigSizeImg = await originalSizeImg(NASAdata.collection.items[i].href)
    console.log(bigSizeImg)
    linkToOrigSizeImg.href = bigSizeImg[0]
    linkToOrigSizeImg.target = '_blank'

    // display image
    displayImage.src = NASAdata.collection.items[i].links[0].href;
    // displayResults.appendChild(displayImage);
    linkToOrigSizeImg.appendChild(displayImage);
    displayResults.appendChild(linkToOrigSizeImg);

    // create and update text content for description
    text = NASAdata.collection.items[i].data[0].description;
    description.textContent = text;
    displayDescription.appendChild(description);
    container.appendChild(displayResults);
    container.appendChild(displayDescription);
    main.appendChild(container);

    // add event listener to display description/image based on click
    displayDescription.addEventListener("click", function () {
      displayDescription.style.display = "none";
      displayResults.style.display = "flex";
    });

    title.addEventListener("click", function () {
      displayResults.style.display = "none";
      displayDescription.style.display = "flex";
    });
  }
}
