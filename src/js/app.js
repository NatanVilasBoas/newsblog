console.log(Date.now)

document.addEventListener('DOMContentLoaded', function(){
    const newsContainer = document.getElementById('newsContainer');
    getAllNews();
})

function getAllNews(category = ''){
    let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apiKey=59e016d648a44ed4ac0e452c04cf2730&category=${category}`

    let req = new Request(url)

    fetch(req)
    .then(function(response) {
        return response.json();
    })
    .then((data) => {
        console.log(data.articles)

        let count = 0;

        let row = document.createElement('div')
        row.className = "row";

        data.articles.forEach(news => {
            if(news.title == "[Removed]" && news.description == "[Removed]" && news.url == "https://removed.com" || news.description == null){
                return;
            } else{
                const newsElement = document.createElement('div');

                newsElement.className = 'col-lg-3 col-md-5 col-sm-7';

                newsElement.innerHTML= `
                <div class="card mb-5" style="width: 18rem;">
                    ${news.urlToImage == null ? '' : `<img src="${news.urlToImage}" class="card-img-top" alt="${news.title}">`}
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.description}</p>
                    </div>
                </div>`
                row.appendChild(newsElement);
    
                count++
            }

            if(count == 3){
                newsContainer.appendChild(row);

                count = 0;
                row = document.createElement('div')
                row.className = "row"
            }
        })
        if (count > 0 ){
            newsContainer.appendChild(row)
        }
    })
    .catch((error) =>{
        console.error('Erro na solicitação: ', error);
    })
}

function onCategoryClick(selectedCategory) {
    
    document.getElementById('newsContainer').innerHTML = '';

    getAllNews(selectedCategory);
}

function searchFormSubmit() {
    const searchTerm = document.getElementById('searchBar').value;
    searchFor(searchTerm);

    return false;
}

function searchFor(search){

    if (search.trim() === '') {
        alert('Digite um termo de pesquisa válido.');
        return;
    }

    document.getElementById('newsContainer').innerHTML = '';

    const dataAtual = new Date();
    let ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth() +1;
    let dia = dataAtual.getDate();

    let url = 'https://newsapi.org/v2/everything?' +
    `q=${search}&` +
    `from=${ano}-${mes-1}-${dia}&` +
    `to=${ano}-${mes}-${dia}&` +
    'sortBy=popularity&' +
    'pageSize=30&' +
    'searchIn=title&' +
    'apiKey=59e016d648a44ed4ac0e452c04cf2730';

    let req = new Request(url);

    fetch(req)
    .then(function(response) {
        return response.json();
    })
    .then((data) => {
        console.log(data.articles)

        let count = 0;

        let row = document.createElement('div')
        row.className = "row";

        data.articles.forEach(news => {
            const newsElement = document.createElement('div');

            newsElement.className = 'col-lg-3 col-md-5 col-sm-7';

            newsElement.innerHTML= `
            <div class="card mb-5" style="width: 18rem;">
                ${news.urlToImage == null ? '' : `<img src="${news.urlToImage}" class="card-img-top" alt="${news.title}">`}
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.description}</p>
                </div>
            </div>`
            row.appendChild(newsElement);

            count++

            if(count == 3){
                newsContainer.appendChild(row);

                count = 0;
                row = document.createElement('div')
                row.className = "row"
            }
        })
        if (count > 0 ){
            newsContainer.appendChild(row)
        }
    })
    .catch((error) =>{
        console.error('Erro na solicitação: ', error);
    })

}