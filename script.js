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
