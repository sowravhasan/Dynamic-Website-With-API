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
        
        data.data.forEach((card) => {
            const div = document.createElement('div');
            const minuteHour = card.others.posted_date;
            fixedTime = minuteHour.slice(0,5);
            console.log(fixedTime);
            const hours = Math.floor(fixedTime / 3600);
            const minutes = Math.floor((fixedTime % 3600) / 60);
            div.innerHTML = `
            <div class="">
            <div class="max-w-md w-full rounded-lg overflow-hidden shadow-lg bg-white">
            <div class="mb-[20px] relative">
            <img src=${card.thumbnail} alt="Video Thumbnail" class="max-w-full w-full h-[200px]">
            <p class="text-sm rounded absolute bottom-0 right-0 bg-black text-white p-2">${hours} hrs ${minutes} min ago</p>
        </div>
                <div class="flex  px-4 pt-4">
                    <img src=${card.authors[0].profile_picture} alt="Channel Logo" class="max-w-full w-10 h-10 rounded-full mr-2">
                    <h2 class="text-xl font-semibold text-gray-800 mt-[5px]">${card.title}</h2>
                </div>
                <div class="px-6 pb-4 ml-[2.4rem]">
                    <div class="flex">
                        <p class="text-gray-600 text-sm">${card.authors[0].profile_name}</p>
                        <span class="text-blue-500 text-sm ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" class="w-4 h-4 mr-1 inline-block">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                            Verified
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


// const timestampInSeconds = 13885;

// Convert seconds to hours and minutes
// const hours = Math.floor(timestampInSeconds / 3600);
// const minutes = Math.floor((timestampInSeconds % 3600) / 60);

// console.log(`${hours} hrs ${minutes} min ago`);









