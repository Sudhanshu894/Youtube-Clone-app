
  let names = document.getElementById('search').value;
  let key = "AIzaSyAzvztgywgu-0fFh-eeSM7Qc-PhQMZGteg";
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${names}&safeSearch=moderate&chart=mostPopular&key=${key}`;
  fetch(url).then((res)=>{
    return res.json()
  }).then((res) =>{
    let data = res.items;
    console.log(data);
    displaycontent(data); 
  })

  const navcontent = async(props)=>{
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${props}&safeSearch=moderate&chart=mostPopular&key=${key}`);
    let data = await res.json();
    displaycontent(data.items);
  }

  const displaycontent = (data) =>{
    let maindiv = document.querySelector('.content-section');
    maindiv.innerHTML = null;
      data.forEach(({id:{videoId},snippet:{title,thumbnails:{high:{url}},channelTitle}})=>{
          let videobox = document.createElement('div');
          videobox.setAttribute('class','videobox');
          let videodiv = document.createElement('div');
          videodiv.setAttribute('class','videodiv');
          let anchor = document.createElement('a');
          anchor.href = `https://youtu.be/${videoId}`;
          let video = document.createElement('img');
          video.src = url;
          anchor.append(video);
          videodiv.append(anchor);
          videobox.append(videodiv);


          let contentdiv = document.createElement('div');
          contentdiv.setAttribute('class','contentdiv');
          let videoinfo = document.createElement('div');
          videoinfo.setAttribute('class','videoinfo');
          let channellogo = document.createElement("div");
          channellogo.setAttribute('class','channellogo');
          let logo = document.createElement('img');
          logo.src = url;
          channellogo.append(logo);
          let videotitle = document.createElement('p');
          videotitle.textContent = title;
          videoinfo.append(channellogo,videotitle);
          contentdiv.append(videoinfo);

          let channelinfo = document.createElement('div');
          channelinfo.setAttribute('class','channelinfo');
          let channeltitle = document.createElement('p');
          channeltitle.textContent = channelTitle;
          let views = document.createElement('p');
          views.textContent = `${(Math.floor(Math.random()*(50 + 11) + 11)/10)}M views `;
          channelinfo.append(channeltitle,views);
          contentdiv.append(channelinfo);
          videobox.append(contentdiv);

          maindiv.append(videobox);
      })
  }


  var timerid;
  let apikey = "AIzaSyAzvztgywgu-0fFh-eeSM7Qc-PhQMZGteg";
  let showresults = ()=>{
      document.querySelector('.search-results').style.display = "block";

      const throttleFunction = (func, delay) => {
        if (timerid) {
          clearTimeout(timerid);
        }

        timerid = setTimeout(() =>  {
          func();
        }, delay);
      }
      throttleFunction(main,1000);
  }

  const main = async() => {
    let name = document.getElementById('search').value;
    if (name.length <= 2) {
      return false;
    }

    let vid = await searchvideos(name);
    console.log(vid);

    appendvidoes(vid);
  }
  document.querySelector('.search-results').addEventListener('mouseleave',()=>{
      document.querySelector('.search-results').style.display = "none";
  })

  const searchvideos = async(name) =>{
    document.querySelector('.search-results').innerHTML = null;

    let response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${name}&safeSearch=moderate&key=${apikey}`
    );

    let datacall = await response.json();
    console.log(datacall.items);
    return datacall.items;
  }

  const appendvidoes = async(vid)=> {
    if (vid === undefined) {
      return false;
    }

    vid.forEach(({snippet:{title},id:{videoId}}) => {
        let anc = document.createElement('a');
        anc.href = `https://youtu.be/${videoId}`
      let p = document.createElement("p");
      p.setAttribute('class','ptag');
      p.innerText = title;
      anc.append(p);
      document.querySelector('.search-results').append(anc);
    });
  }
var saveresult = JSON.parse(localStorage.getItem('saveitems')) || [];
  const getvideos = () =>{
      let name = document.getElementById('search').value;
    const searchvideos = async(name) =>{
        
    
        let response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${name}&safeSearch=moderate&key=${apikey}`
        );
    
        let datacall = await response.json();
        console.log(datacall.items);
        saveresult = [];
        saveresult.shift();
        saveresult.push(datacall.items);
        localStorage.setItem('saveitems',JSON.stringify(saveresult));
        console.log(saveresult);
        window.location.href = "searchpage.html";
        
        
      }
      searchvideos(name);
  }
  document.getElementById('logo').addEventListener('click',() =>{
    window.location.href = 'index.html'
  })
var counter = 0;
  const rightshift = () =>{
    counter -= 200;
    if (counter < 0){
      counter = 0;
    }
    document.querySelector('.options > div').style.right = `${counter}px`
  }
  const leftshift = () =>{
    counter += 200;
    if(counter > 1100) {
      counter = 1100;
    }
    document.querySelector('.options > div').style.right = `${counter}px`;
  }


