; (() => {

  let timer;

  // Add Event generating buttons to video downloads
  document.body.addEventListener("wheel", debounce);

  // Add script de donwload
  var s = document.createElement('script');
  s.setAttribute("as", "script");
  s.setAttribute("rel", "preload");
  s.setAttribute("crossorigin", "anonymous")
  s.src = chrome.runtime.getURL('donwload.js');
  (document.head || document.documentElement).appendChild(s);

  // Button video download
  function buttonDownload(url = "#", shortcode) {

    const svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"  stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path> <polyline points="7 11 12 16 17 11"></polyline> <line x1="12" y1="4" x2="12" y2="16"></line> </svg>';

    const func = `donwloader('${url}', '${shortcode}')`;


    return (
      `
      <button onclick="${func}" class="btnId" data-id="${url}">
       <span style="text-decoration: none; color: var(--ig-primary-text)">
         ${svgIcon}
       </span>
      </button>
      `
    )
  }

  // Get Video Link to download
  async function getVideo(shortCode) {
    const url = `https://www.instagram.com/p/${shortCode}/?__a=1&__d=dis`;
    const request = await fetch(url);
    const response = await request.json();
    const urlVideo = response.items[0].video_versions[0].url;

    return `${urlVideo}&amp;dl=1`;
  }


  function getShortCode(cardVideo) {
    const videoLink = cardVideo.getElementsByTagName("time")[0].parentNode.parentNode.href;
    const fragmentLink = videoLink.replace("https://www.instagram.com/", "").split("/")[1];
    return fragmentLink;
  }

  async function debounce() {

    clearTimeout(timer);

    timer = setTimeout(() => {
      const cardsVideos = document.getElementsByClassName("_aato _ab1k _ab1l") || [];

      if (cardsVideos !== [] && cardsVideos.length > 0) {

        Array.from(cardsVideos).forEach(async card => {

          const cardVideo = card.parentNode.parentNode.parentNode.parentNode;

          if (!cardVideo.classList.contains("card_registred")) {

            cardVideo.classList.add("card_registred");

            const shortcode = getShortCode(cardVideo);
            const linkVideo = await getVideo(shortcode);
            const cardReactions = cardVideo.getElementsByTagName("section")[0];

            if (cardReactions !== null && typeof cardReactions !== 'undefined') {
              cardReactions.insertAdjacentHTML("beforeend", buttonDownload(linkVideo, shortcode))
            }
          }
        });

        clearTimeout(timer);
      } else {
        clearTimeout(timer);
      }
    }, 500)
  }

})();

