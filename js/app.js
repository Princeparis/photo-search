import * as dotenv from 'dotenv'
dotenv.config()


const form = document.querySelector("form")
const searchTag = document.querySelector("form input.input")
const accessKey = process.env.API_KEY
console.log(accessKey)
const apiUrl = "https://api.unsplash.com//search/photos?per_page=30&query="


const resultTag = document.querySelector("section.results")

const searchUnsplash = term => {

    return fetch(apiUrl + term, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + accessKey
        }
    })
        .then(response => response.json())
        .then(data => {

            //console.log(data)
            // format unsplash's result to suit our needs
            return data.results.map(result => {
                return {
                    imageSrc: result.urls.regular,
                    width: result.width,
                    height: result.height,
                    name: result.user.name,
                    title: (result.description || "Untitled"),
                    bgColor: (result.color || "#cccccc") + "33"
                }
            })
        })
}

const addResults = function (results) {
    resultTag.innerHTML = ""

    results.forEach(result => {
        resultTag.innerHTML = resultTag.innerHTML + `
            <div class="single-result">
                <div class="image" style="background-color: ${result.bgColor}">
                    <img src="${result.imageSrc}">
                </div>
                <h2>${result.title}</h2>
                <p>By ${result.name} <span class="hyphen"></span> ${result.width} x ${result.height}</p>
            </div>
        `
    })
}




//when form is submitted get the input tag

form.addEventListener('submit',function (event) {
    const searchTerm = searchTag.value
    searchUnsplash(searchTerm)
        .then(results => {
            addResults(results)
        })

event.preventDefault()
});