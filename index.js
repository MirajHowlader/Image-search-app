const accessKey= '7M0cnXS102s540ejW0zywX41H1U5bs0h41ZrvgmXzwI';

const formEl = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const searchResult = document.querySelector('.search-results');
const showMore = document.getElementById('show-more-button');

let inputData=  '';
let page = 1;


 async function searchImage(){
    inputData = inputEl.value;

    const url= `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response= await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page===1){
        searchResult.innerHTML = '';

    }
        
        results.map((result)=>{
            const imageWrapper = document.createElement('div');

            imageWrapper.classList.add('search-result');
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description

            const imagelink = document.createElement('a');
            imagelink.href = result.links.html;
            imagelink.target = '_blank';
            imagelink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imagelink);
            searchResult.appendChild(imageWrapper);
        })
        page++;

        if(page>1){
            showMore.style.display='block';
        }
    }


formEl.addEventListener('submit',(event)=>{
    event.preventDefault();
    page = 1;
    searchImage();

})

showMore.addEventListener('click',()=>{
    searchImage();

})