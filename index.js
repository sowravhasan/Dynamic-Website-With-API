const handleCategory = async () =>{
    const response = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const categoryButton = document.getElementById('category-button'); 
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `<button onclick="handleCard('${category.category_id}')" class="bg-[#D3D3D3] text-dark font-normal py-2 px-4 rounded">
        ${category.category}
      </button>`;
      categoryButton.appendChild(div);
    })
    
};

    const handleCard = async (cardId) => {
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${cardId}`)
        const data = await response.json();
        const youtubeCard = document.getElementById('youtube-card');
        youtubeCard.innerHTML = '';
        errorPage = document.getElementById('error-page')
        if (cardId == 1005){
           errorPage.classList.remove("hidden");
        }
        else{
            errorPage.classList.add("hidden");
        }
        
        data.data.forEach((card) => {
            const div = document.createElement('div');
            removeTime = document.getElementById('timesInSeconds')
            const fixedTime = card.others.posted_date;
            const blueBadgeId = document.querySelector('.blue-badge0')
            const blueBadge = card.authors[0].verified;
            const hours = Math.floor(fixedTime / 3600);
            const minutes = Math.floor((fixedTime % 3600) / 60);
            
            div.innerHTML = `
            <div class="">
            <div class="max-w-md w-full rounded-lg overflow-hidden shadow-lg bg-white">
            <div class="mb-[20px] relative">
            <img src=${card.thumbnail} alt="Video Thumbnail" class="max-w-full w-full h-[200px]">
            <p id="timesInSeconds" class="text-sm rounded absolute bottom-0 right-0 bg-black text-white p-2">${hours} hrs ${minutes} min ago</p>
        </div>
                <div class="flex  px-4 pt-4">
                    <img src=${card.authors[0].profile_picture} alt="Channel Logo" class="max-w-full w-10 h-10 rounded-full mr-2">
                    <h2 class="text-md font-semibold text-gray-800 mt-[5px]">${card.title}</h2>
                </div>
                <div class="px-6 pb-4 ml-[2.4rem]">
                    <div class="flex">
                        <p class="text-gray-600 text-sm">${card.authors[0].profile_name}</p>
                        <span class="text-blue-500 text-sm blue-badge0" id="blue-badge">
                        ${card?.authors[0]?.verified?'<img src="blue-badge.png" alt="" class="w-[20px] ml-[10px]">':''}
                        </span>
                    </div>
                    <div class="flex items-center text-gray-600 text-xs mt-2">
                        <span>${card.others.views} views</span>
                    </div>
                </div>
            </div>
        </div>

            `
            youtubeCard.appendChild(div);
            

        })
    }
handleCategory();
handleCard(1000);



// item.authors[0].profile_name
// "<img src=bluetick.svg' >"
// ${condition ? "<img src=bluetick.svg' >" : ""}









