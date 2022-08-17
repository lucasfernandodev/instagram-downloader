


export default async function main() {

  function buttonDownload(link = "#"){
    return (
      `
      <button style="background: unset; border: unset;" class="btn-instagram-downloader">
       <a target="_blank" rel="noreferrer" data-mediatype="Video" href="${link}" style="text-decoration: none; color: var(--ig-primary-text)" download>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"  stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
           <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
           <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
           <polyline points="7 11 12 16 17 11"></polyline>
           <line x1="12" y1="4" x2="12" y2="16"></line>
         </svg>
       </a>
      </button>
      `
    )
  }

  
  console.log("main logged");
  const body = document.getElementsByTagName("body")[0];
  console.log(body)

  body.addEventListener("wheel", debounce);


  let timer;
  async function debounce(){
 
    clearTimeout(timer);

    timer = setTimeout(() => {
      const cardsVideos = document.getElementsByClassName("_aato _ab1k _ab1l")|| [];

      if (cardsVideos !== [] && cardsVideos.length > 0) {

        console.log(`[${timer}] Encontrado ${cardsVideos.length} novos cards`)

        Array.from(cardsVideos).forEach(async card => {
          const currentCard = card.parentNode.parentNode.parentNode.parentNode;
          if (!currentCard.classList.contains("btn_add")) {
            currentCard.classList.add("btn_add");

           const cardReactions = currentCard.getElementsByClassName("_aamu _aat0 _aat1")[0];
           const videoLink = currentCard.getElementsByTagName("time")[0].parentNode.parentNode.href;
          
           const fragmentLink = videoLink.replace("https://www.instagram.com/", "").split("/")[1];

           async function getVideo(shortCode){
            const url = `https://www.instagram.com/p/${shortCode}/?__a=1&__d=dis`;
            const request = await fetch(url);
            const response = await request.json();
            const urlVideo = response.items[0].video_versions[0].url;

            return `${urlVideo}&amp;dl=1`;
          }

           cardReactions.insertAdjacentHTML("beforeend", buttonDownload(await getVideo(fragmentLink)))
          }

          clearTimeout(timer);
        });
      }else{
        clearTimeout(timer);
      }
    }, 500)
  }

};
