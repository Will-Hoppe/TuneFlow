const setupInputContainer = document.getElementById('setup-input-container')
const lyricBossText = document.getElementById('lyric-boss-text')

document.getElementById("send-btn").addEventListener("click", () => {
  const setupTextarea = document.getElementById('setup-textarea')
  if (setupTextarea.value) {
    const userInput = setupTextarea.value
    setupInputContainer.innerHTML = `Loading...`
    lyricBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
    fetchBotReply(userInput)
    fetchSynopsis(userInput)
  }
})

async function fetchBotReply(outline) {
  const url = 'https://silly-syrniki-f0ccaf.netlify.app/.netlify/functions/fetchAI'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        'content-type': 'text/plain',
    },
    body: outline
  })
  const data = await response.json()
  
  lyricBossText.innerText = data.reply.choices[0].text.trim()
} 

async function fetchSynopsis(outline) {
  const url = 'https://silly-syrniki-f0ccaf.netlify.app/.netlify/functions/lyrics'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        'content-type': 'text/plain',
    },
    body: outline
  })
  const data = await response.json()
  const lyrics = data.reply.choices[0].text.trim()
  document.getElementById('output-text').innerText = lyrics
  fetchTitle(lyrics)
}

async function fetchTitle(lyrics) {
  const url = 'https://silly-syrniki-f0ccaf.netlify.app/.netlify/functions/title'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        'content-type': 'text/plain',
    },
    body: lyrics
  })
  const data = await response.json()
  const title = data.reply.choices[0].text.trim()
  document.getElementById('output-title').innerText = title
  fetchImagePromt(title, lyrics)
}

async function fetchImagePromt(title, lyrics){
  const url = 'https://silly-syrniki-f0ccaf.netlify.app/.netlify/functions/image'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        'content-type': 'text/plain',
    },
    body: JSON.stringify({t:title, l:lyrics})
  })
  const data = await response.json()
  fetchImageUrl(data.reply.choices[0].text.trim())
}

async function fetchImageUrl(imagePrompt){
  const url = 'https://silly-syrniki-f0ccaf.netlify.app/.netlify/functions/imageGet'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        'content-type': 'text/plain',
    },
    body: imagePrompt
  })
  const data = await response.json()
  document.getElementById('output-img-container').innerHTML = `<img src="data:image/png;base64,${data.reply.data[0].b64_json}">`
  setupInputContainer.innerHTML = `<button id="view-song-btn" class="view-song-btn">View Song</button>`
  document.getElementById('view-song-btn').addEventListener('click', ()=>{
    document.getElementById('setup-container').style.display = 'none'
    document.getElementById('output-container').style.display = 'flex'
    lyricBossText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`
  })
}