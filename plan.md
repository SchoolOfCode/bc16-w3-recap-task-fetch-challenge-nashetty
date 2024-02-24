# Astronomy Snap Explorer

- Use NASA Image and Video Library API @ [images.nasa.gov](https://images.nasa.gov/#/) from the available [NASA APIs](https://api.nasa.gov/index.html)
- For the documentation go [here](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)

Plan breakdown
1. It may be necessary to generate an API key to use { NASA APIs }
2. Use fetch API with async/await to receive a response object and log it to console
   - if API key needed, research how to use authorisation keys with fetch
   - start with these 3 objects initially:
     - https://images.nasa.gov/details/carina_nebula
     - https://images.nasa.gov/details/GSFC_20171208_Archive_e002076
     - https://images.nasa.gov/details/JPL-20231222-SOLSYSf-0001-NASA%20Telescopes%20Reveal%20Hidden%20Universe
4. Create a basic UI with HTML/CSS to display the results on the page
5. Link the response object to the UI to display images and videos witht their corresponding descriptions on the page dynamically
6. Create a search input field where users will be able to enter what they want to search for and update the fetch so it accepts the input from search
