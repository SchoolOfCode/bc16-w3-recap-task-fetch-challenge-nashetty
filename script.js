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
    // console.log(data)
    return data
}

// Endpoint should be in format - /search?q={q}
// Carina nebula Endpoint
const endpoint1 = '/search?q=carina_nebula'
const endpoint2 = '/search?q=GSFC_20171208_Archive_e002076'
const endpoint3 = '/search?q=JPL-20231222-SOLSYSf-0001-NASA Telescopes Reveal Hidden Universe'

fetchData(endpoint1)
fetchData(endpoint2)
fetchData(endpoint3)

// Display data on the page
async function displayOnPage() {
    let NASAdata = []
    // get data from API
    NASAdata.push(await fetchData(endpoint1))
    NASAdata.push(await fetchData(endpoint2))
    NASAdata.push(await fetchData(endpoint3))

    // get displayResults element from DOM
    const main = document.querySelector('main')

    for(let i = 0; i < NASAdata.length; i++) {
        // create elements that are the same as title, img and description in displayResults div from DOM
        const displayResults = document.createElement('div')
        displayResults.classList.add('displayResults')
        const title = document.createElement('h2')
        title.classList.add('title')
        const description = document.createElement('div')
        description.classList.add('description')
        const displayImage = document.createElement('img')
        displayImage.classList.add('displayImage')
        
        // create and update text content for title
        let text = NASAdata[i].collection.items[0].data[0].title
        title.textContent = text
        displayResults.appendChild(title)

        // display image
        displayImage.src = NASAdata[i].collection.items[0].links[0].href
        displayResults.appendChild(displayImage)
        
        // create and update text content for description
        text = NASAdata[i].collection.items[0].data[0].description
        description.textContent = text
        displayResults.appendChild(description)
        main.appendChild(displayResults)

    }
    
}
displayOnPage()