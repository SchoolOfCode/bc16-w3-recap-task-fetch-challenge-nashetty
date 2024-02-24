// fetch data and console log the object ✅
// after testing in POSTMAN, the API key is not necessary

// url for NASA API
const url = 'https://images-api.nasa.gov'

// function to fetch the data
async function fetchData(endpoint) {
    const response = await fetch(url+endpoint, {
        headers: {
            accept: 'application/json',
        }
    });

    // response failed
    if(!response) {
        console.error('Request failed');
        return
    }

    // parse to json
    const data = await response.json()
    console.log(data)
    return data
}

// Endpoint should be in format - /search?q={q}
// Carina nebula Endpoint
const endpoint1 = '/search?q=carina_nebula'
const endpoint2 = '/search?q=GSFC_20171208_Archive_e002076'
const endpoint3 = '/search?q=JPL-20231222-SOLSYSf-0001-NASA%20Telescopes%20Reveal%20Hidden%20Universe'

fetchData(endpoint1)
fetchData(endpoint2)
fetchData(endpoint3)

// Display data on the page
async function displayOnPage() {

    // get data from API
    let NASAdata = await fetchData(endpoint1)

    // get title, img and description div from DOM
    const title = document.querySelector('.title')
    const description = document.querySelector('.description')
    const displayImage = document.querySelector('.displayImage')
    
    // create and update text content for title
    let text = NASAdata.collection.items[0].data[0].title
    title.textContent = text
    
    // create and update text content for description
    text = NASAdata.collection.items[0].data[0].description
    description.textContent = text

    // display image
    displayImage.src = NASAdata.collection.items[0].links[0].href
    
}
displayOnPage()