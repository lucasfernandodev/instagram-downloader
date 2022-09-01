;(() => {

 
    const url = window.location.href;
    const domain = 'https://www.instagram.com/';
  
    const urlParams = url.replace(domain, "").split("/").filter(e => e);

    if(url.includes(domain)){
      var s = document.createElement('script');
      s.setAttribute("as", "script");
      s.setAttribute("rel", "preload");
      s.setAttribute("crossorigin", "anonymous")
      s.src = chrome.runtime.getURL(`src/utils/downloadFile.js`);
      (document.head || document.documentElement).appendChild(s);
    }


    if(urlParams.length === 0){
      var s = document.createElement('script');
      s.setAttribute("as", "script");
      s.setAttribute("rel", "preload");
      s.setAttribute("crossorigin", "anonymous")
      s.src = chrome.runtime.getURL(`src/modules/home.js`);
      (document.head || document.documentElement).appendChild(s);
    }


    if(urlParams.length === 1 && urlParams[0] !== "/" && urlParams.length <= 30 && urlParams[0] !== 'explore'){
      console.log("Estou em algum perfil",urlParams);
    }

    if(urlParams.length === 3 && urlParams[0] === "stories"){
      console.log("Estou nos stories")
    }

    if(urlParams.length === 1 && urlParams[0] === "explore"){
      console.log("Estou no explore")
    }


})();

