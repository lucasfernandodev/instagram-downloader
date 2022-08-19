async function donwloader(url, videoId) {

  const buttonDonwload = document.querySelector(`[data-id="${videoId}"]`);

  const btnAnimate = {
    process: (el) => {
      console.log(`[instaDonwload]: Donwload iniciado`);
      el.classList.add("btnId-process");
    },

    complete: (el) => {
      const iconChecked = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M5 12l5 5l10 -10"></path></svg>';

      el.classList.remove("btnId-process");
      el.innerHTML = iconChecked;
      el.classList.add("btnId-complet");
      el.setAttribute("onclick", null);

      console.log(`[instaDonwload]: Donwload concluido`);
    },

    error: (el) => {
      // msg de error
    }
  }

  function downloadFile(filename, file) {
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    const filenameComplet = `${filename}.mp4`
    a.download = filenameComplet;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);

    // Complete Donwload animation
    btnAnimate.complete(buttonDonwload)
  }


  if (typeof buttonDonwload !== 'undefined' && buttonDonwload !== null) {

    // Add effect to processing..
    btnAnimate.process(buttonDonwload)

    const request = await fetch(url);

    if (request.ok) {

      const response = await request.blob(); // Get File
      downloadFile(videoId, response); // Starting download

    } else {
      console.log(`[instaDonwload]: Erro ao buscar video no servidor do instagram`);
    }

  } else {
    console.log(`[instaDonwload]: Ação inválida, botão não encontrado`);
  }
}