// fetch data and console log the object ✅
// after testing in POSTMAN, the API key is not necessary

// function to fetch the data
async function fetchData() {
  // add search functionality
  // get search input value
  const searchInputValue = document.querySelector("#search").value;

  // url for NASA API with the search input value
  // encode a URI (Uniform Resource Identifier) - searchInputValue before it is appended to the URL
  const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(
    searchInputValue
  )}`;

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

// Display data on the page
function displayOnPage() {
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
  const NASAdata = await fetchData();
  console.log(NASAdata.collection.items.length);
  console.log(NASAdata);

  // get displayResults element from DOM and clear content
  const main = document.querySelector("main");
  main.innerHTML = "";

  // loop through every element in the NASAdata collection
  for (let i = 0; i < NASAdata.collection.items.length; i++) {
    // create elements that are the same as title, img and description in displayResults div from DOM
    const displayResults = document.createElement("div");
    displayResults.classList.add("displayResults");

    const title = document.createElement("h2");
    title.classList.add("title");

    const description = document.createElement("div");
    description.classList.add("description");

    const displayImage = document.createElement("img");
    displayImage.classList.add("displayImage");

    // create and update text content for title
    let text = NASAdata.collection.items[i].data[0].title;
    title.textContent = text;
    displayResults.appendChild(title);

    // display image
    displayImage.src = NASAdata.collection.items[i].links[0].href;
    displayResults.appendChild(displayImage);

    // create and update text content for description
    text = NASAdata.collection.items[i].data[0].description;
    description.textContent = text;
    displayResults.appendChild(description);
    main.appendChild(displayResults);
  }
}
