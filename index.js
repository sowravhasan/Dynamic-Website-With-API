  let sortByViewsDescending = false;


function convertViewsToNumber(viewsString) {
  const numericViews = parseFloat(viewsString.replace(/[^0-9.]/g, ''));
  
  if (viewsString.includes('k')) {
    return numericViews * 1000;
  }

  return numericViews;
}

const handleCategory = async () => {
    try {
      const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
      const data = await response.json();
  
      const categoryButton = document.getElementById('category-button');
      let firstButton = true;
  
      data.data.forEach((category, index) => {
        const button = document.createElement('button');
        button.textContent = category.category;
        button.classList.add('category-button', 'bg-[#D3D3D3]', 'text-dark', 'font-normal', 'py-2', 'px-4', 'rounded');
  
        button.addEventListener('click', () => {
          const buttons = categoryButton.querySelectorAll('.category-button');
          buttons.forEach(btn => btn.classList.remove('bg-[#FF1F3D]', 'text-white'));
  
          button.classList.add('bg-[#FF1F3D]', 'text-white', 'font-normal', 'py-2', 'px-4', 'rounded');
  
          handleCard(category.category_id);
        });
  
        if (firstButton) {
          button.classList.add('bg-[#FF1F3D]', 'text-white');
          firstButton = false;
        }
  
        categoryButton.appendChild(button);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  



    const handleCard = async (cardId) => {
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${cardId}`)
        const data = await response.json();
        const youtubeCard = document.getElementById('youtube-card');
        youtubeCard.innerHTML = '';
        errorPage = document.getElementById('error-page')
        if (data.status === false){
           errorPage.classList.remove("hidden");
        }
        else{
            errorPage.classList.add("hidden");
        }

        data.data.sort((a, b) => {
          const viewA = convertViewsToNumber(a.others.views);
          const viewB = convertViewsToNumber(b.others.views);
      
          if (sortByViewsDescending) {
            return viewB - viewA; 
           } 
          //  else {
          //   return viewA - viewB; 
          // }
        });
        
        data.data.forEach((card) => {
            
            const div = document.createElement('div');
            removeTime = document.getElementById('timesInSeconds')
            const fixedTime = card.others.posted_date;
            const hours = Math.floor(fixedTime / 3600);
            const minutes = Math.floor((fixedTime % 3600) / 60);
            
            div.innerHTML = `
            <div class="">
            <div class="max-w-md w-full rounded-lg overflow-hidden shadow-lg bg-white">
            <div class="mb-[20px] relative">
            <img src=${card.thumbnail} alt="Video Thumbnail" class="max-w-full w-full h-[200px]">
            <p id="timesInSeconds" class="text-sm rounded absolute bottom-0 right-0 bg-black text-white ${hours ==0 && minutes ==0 ? "hidden" : ""} p-2">${hours} hrs ${minutes} min ago</p>
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

    document.addEventListener('DOMContentLoaded', () => {
      const sortButton = document.getElementById('sort-view');
      sortButton.addEventListener('click', () => {
        sortByViewsDescending = !sortByViewsDescending;
    
        console.log('Sort by views:', sortByViewsDescending); 
    
        handleCard(1000);
      });
    });
    handleCategory();
    handleCard(1000);









