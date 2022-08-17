; (() => {

  let timer;

  const body = document.getElementsByTagName("body")[0];
  console.log(body)

  body.addEventListener("wheel", () => debounce());

  function debounce(){
    let timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      const cardsVideos = document.getElementsByClassName("_aato _ab1k _ab1l")|| [];

      if (cardsVideos !== [] && cardsVideos.length > 0) {

        console.log(`[${timer}] Encontrado ${cardsVideos.length} novos cards`)

        Array.from(cardsVideos).forEach(card => {
          const currentCard = card.parentNode.parentNode.parentNode.parentNode;
          if (!currentCard.classList.contains("btn_add")) {
            currentCard.classList.add("btn_add");

           const cardReactions = currentCard.getElementsByClassName("_aamu _aat0 _aat1")[0];
           console.log("cardReactions", cardReactions)
          //  if()
           cardReactions.style.backgroundColor = "red";
          }

          clearTimeout(timer);
        });
      }else{
        clearTimeout(timer);
      }
    }, 500)
  }
})();