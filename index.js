
async function fetchAndPostData() {
    let innerHtml = ""
    let results = ""
    await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=51d549b177e44501842ca559b10a4702")
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                data.articles.map(item => {
                    innerHtml += `
                    <div class="card" style="width: 18rem;margin: 20px;">
                    <img src=${item.urlToImage} class="card-img-top" alt=${item.title}>
                    <div class="card-body" style="display: flex;flex-direction: column;justify-content: space-between;">
                    <p class="card-text">${item.title}</p>
                    <div class="pb-2">
                        <div>
                            Author : <span>${item.author}</span>
                        </div>
                        <div>
                            Source : <span>${item.source.name}</span>
                        </div>
                    </div>
                    <div style="display:flex;justify-content:space-around">
                        <a href=${item.url} class="btn btn-primary">Read More...</a>
                        <div style="font-size: x-small;display: flex;align-items: center;">
                            Date : <span>${item.publishedAt}</span>
                        </div>
                    </div>
                    </div>
                    </div>
                    `
                })

                results = data.articles.length
            } else {
                document.getElementById("toast").innerHTML = `
                <div class="toast align-items-center text-bg-primary border-0 show" role="alert" aria-live="assertive" aria-atomic="false">
                    <div class="d-flex">
                        <div class="toast-body">
                        Cannot Get Headlines...
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
                `
            }
        })
    document.getElementById("headlines").innerHTML = innerHtml
    document.getElementById("results").innerText = results
}
fetchAndPostData()




async function fetchSearch() {
    let search = document.getElementById("inputText").value

    if (search === "") {
        return document.getElementById("toast").innerHTML = `
        <div class="toast align-items-center text-bg-primary border-0 show" role="alert" aria-live="assertive" aria-atomic="false">
            <div class="d-flex">
              <div class="toast-body">
              Search is Empty!!!
              </div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        `
    }

    let innerSearchHTML = ""
    await fetch(`https://newsapi.org/v2/everything?q=${search}&sortBy=popularity&apiKey=51d549b177e44501842ca559b10a4702`)
        .then(response => response.json())
        .then(data => {

            if (data.articles.length === 0) {
                document.getElementById("toast").innerHTML = `
            <div class="toast align-items-center text-bg-primary border-0 show" role="alert" aria-live="assertive" aria-atomic="false">
                <div class="d-flex">
                    <div class="toast-body">
                    Oops No Such Results Found !!!
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
            `
            } else {
                data.articles.map(item => {
                    innerSearchHTML += `<div class="card" style="width: 18rem;margin: 20px;">
                <img src=${item.urlToImage} class="card-img-top" alt=${item.title}>
                <div class="card-body" style="display: flex;flex-direction: column;justify-content: space-between;">
                  <p class="card-text">${item.title}</p>
                  <div class="pb-2">
                    <div>
                        Author : <span>${item.author}</span>
                    </div>
                    <div>
                        Source : <span>${item.source.name}</span>
                    </div>
                  </div>
                  <div style="display:flex;justify-content:space-around">
                    <a href=${item.url} class="btn btn-primary">Read More...</a>
                    <div style="font-size: x-small;display: flex;align-items: center;">
                        Date : <span>${item.publishedAt}</span>
                    </div>
                  </div>
                </div>
                </div>`
                })
            }
        })
    document.getElementById("searchResults").innerHTML = innerSearchHTML
}