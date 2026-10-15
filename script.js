const $ = (s) => document.querySelector(s);
const sl = (ms) => new Promise((r) => setTimeout(r, ms));


const memes = [
  { distro: "Arch Linux", file: "memes/Arch.mp4", type: "video" },
  { distro: "Gentoo", file: "memes/Gentoo.mp4", type: "video" },
  { distro: "Ubuntu", file: "memes/Ubuntu.mp4", type: "video" },
  { distro: "Fedora", file: "memes/Fedora.mp4", type: "video" },
];

async function startIntro() {
  await sl(500);
  await typeText($('#line1'), "> Hello Dear User...");
  await sl(400);
  await typeText($('#line2'), "> You use linux right?");
  await sl(400);
  await typeText($('#line3'), "> Good, Good.");
  await sl(600);
  

  $('#btn-container').classList.remove('hidden');
}

async function typeText(el, text) {
  el.textContent = '';
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await sl(35);
  }
}


$('#trigger-btn').addEventListener('click', () => {
  $('.intro-section').style.display = 'none';$('#slander-section').classList.remove('hidden');


  const slanderAudio = new Audio('audio.mp3');
  slanderAudio.loop = true;
  slanderAudio.volume = 0.5;
  slanderAudio.play().catch(err => console.log("Otomatik oynatma engellendi:", err));

  startSlanderLoop();
});

function startSlanderLoop() {
  const container = $('#meme-container');
  const titleBar = $('#distro-title');
  let currentTimer = null;

  
  let remainingMemes = [...memes];

  function showNextMeme() {
    if (currentTimer) clearTimeout(currentTimer);

    
    if (remainingMemes.length === 0) {
      titleBar.textContent = "SYSTEM_HALTED";
      container.innerHTML = `<div style="font-size: 1.4rem; color: var(--y); text-shadow: 0 0 12px rgba(0,255,102,0.6); line-height: 1.6;">That was all for now<br>come back later...</div>`;
      return; 
    }

   
    const randomIndex = Math.floor(Math.random() * remainingMemes.length);
    const randomMeme = remainingMemes.splice(randomIndex, 1)[0];

    titleBar.textContent = `TARGET: ${randomMeme.distro.toUpperCase()}`;
    container.innerHTML = '';

    if (randomMeme.type === 'image') {
      const img = document.createElement('img');
      img.src = randomMeme.file;
      img.alt = "Linux Slander";
      img.style.cssText = "max-width:100%; height:auto;";
      container.appendChild(img);

      
      currentTimer = setTimeout(showNextMeme, 3500);

    } else {
      const video = document.createElement('video');
      video.src = randomMeme.file;
      video.autoplay = true;
      video.muted = true;
      video.style.cssText = "max-width:100%; height:auto;";
      container.appendChild(video);

    
      video.onended = () => {
        showNextMeme();
      };

      
      video.onerror = () => {
        currentTimer = setTimeout(showNextMeme, 5000);
      };
    }
  }

  showNextMeme();
}

startIntro();