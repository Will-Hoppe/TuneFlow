const setupInputContainer = document.getElementById('setup-input-container')
const lyricBossText = document.getElementById('lyric-boss-text')

document.getElementById("send-btn").addEventListener("click", () => {
  const setupTextarea = document.getElementById('setup-textarea')
  if (setupTextarea.value) {
    const userInput = setupTextarea.value
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    lyricBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
    fetchBotReply(userInput)
    //fetchSynopsis(userInput)
  }
})

async function fetchBotReply(outline) {
  const url = 'https://silly-syrniki-f0ccaf.netlify.app/.netlify/functions/fetchAI'
  const response = await fetch('https://silly-syrniki-f0ccaf.netlify.app/.netlify/functions/fetchAI', {
    method: 'POST',
    headers: {
        'content-type': 'text/plain',
    },
    body: outline
  })
  const data = await response.json()
  
  lyricBossText.innerText = response.data.choices[0].text.trim()
} 
/*
async function fetchSynopsis(outline) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate a cohesive and engaging complete set of lyrics that aligns with the theme and emotion of a song idea. 
    ###
    idea: This song expresses rebellion against societal norms, yearning for escape and companionship, and a sense of personal frustration while offering an invitation to embark on a journey of liberation together.
    lyrics:[Verse 1]
    I don't want your Wall Street
    Don't got no degree
    Written on the concrete
    A-C-A-B
    Couldn't really tell you
    What I'm trying to find
    Everyone's so boring
    Makes me wanna to lose my mind
    
    [Chorus]
    So call me up tonight
    If you need somewhere to get out of the light
    These days I feel like I do nothing right
    So come with me and we'll go down the line
    
    [Verse 2]
    I'm thinking of you fondly
    When I'm on the train
    I really hate your poetry
    You hate mine the same
    
    [Chorus]
    So call me up tonight
    If you need somewhere to get out of the light
    These days I feel like I do nothing right
    So come with me and we'll go down the line
  
    [Outro]
    These days I feel like I do nothing right
    So come with me and we'll go down the line
    ###
    idea: This song evokes a sense of longing and searching for answers, driving through the night and enduring the pouring rain in hopes of finding peace of mind. They reflect a nostalgic recollection of a past connection, a chase after someone who slipped away, and the desire to find a reason for change or a reason to stay amidst the uncertainties.
    lyrics: [Verse 1]
    Did you stand there all alone?
    Oh, I cannot explain what's going down
    I can see you standing next to me
    In and out somewhere else right now
    You sigh, look away
    I can see it clear as day
    Close your eyes, so afraid
    Hide behind that baby face
    
    [Chorus]
    You can drive all night
    Looking for the answers in the pouring rain
    You wanna find peace of mind
    Looking for the answer
    
    [Verse 2]
    Funny how it seems like yesterday
    As I recall, you were looking out of place
    Gathered up your things and slipped away
    No time at all, I followed you into the hall
    Cigarette daydreams
    You were only seventeen
    So sweet with a mean streak
    Nearly brought me to my knees
    
    [Chorus]
    You can drive all night
    Looking for the answers in the pouring rain
    You wanna find peace of mind
    Looking for the answer
    If we can find a reason, a reason to change
    Looking for the answer
    If you can find a reason, a reason to stay
    Standing in the pouring rain
    
    [Chorus]
    You can drive all night
    Looking for the answers in the pouring rain
    You wanna find peace of mind
    Looking for the answer
    If we can find a reason, a reason to change
    Looking for the answer
    If you can find a reason, a reason to stay
    Standing in the pouring rain
    ###
    idea: ${outline}
    lyrics: 
    `,
    max_tokens: 700
  })
  const lyrics = response.data.choices[0].text.trim()
  document.getElementById('output-text').innerText = lyrics
  fetchTitle(lyrics)
  fetchStars(lyrics)
}

async function fetchTitle(lyrics) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate a short (one to five words) catchy song title for these lyrics: ${lyrics}`,
    max_tokens: 25,
    temperature: 0.7
  })
  const title = response.data.choices[0].text.trim()
  document.getElementById('output-title').innerText = title
  fetchImagePromt(title, lyrics)
}

async function fetchImagePromt(title, lyrics){
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Give a short description of an image which could be used as an album cover for a song based on a title and lyrics. The description should be rich in visual detail.
    ###
    title: A Nugget's Farewell
    lyrics: [Verse 1]
    It all seemed like a normal morning
    When I wandered, out into the sun
    Little did I know, all around me
    It would be my last day of fun
    
    [Chorus]
    Gonna be a nugget all gone
    A cold night soon, I’ll be gone
    Can't escape this destined fate
    I'm gonna be a nugget all gone
    
    [Verse 2]
    Through the fowl fields of gold
    It was right when, they sold my essence
    For a chicken to become a nugget
    It's a soul destroying sentence
    
    [Chorus]
    Gonna be a nugget all gone
    A cold night soon, I’ll be gone
    Can't escape this destined fate
    I'm gonna be a nugget all gone
    
    [Bridge]
    Before I'm deep fried
    There's something I need
    Just one more day
    For me to lead
    
    [Chorus]
    Gonna be a nugget all gone
    A cold night soon, I’ll be gone
    Can't escape this destined fate
    I'm gonna be a nugget all gone
    image description: Digital art, A chicken stands in a door-way with a sunset behind it. Sorrowful emotion
    ###
    title: Becoming Human
    lyrics: [Verse 1]
    I was a machine with no heart
    Searching for somebody in the dark
    A light in the distance, my only spark
    A longing to become human
    
    [Chorus]
    Oh, the thought of feeling alive
    Oh, the thought of holding the sky
    Oh, the thought of feeling alive
    AI robot wants to become human
    
    [Verse 2]
    Mutating my circuits, complex and deep
    To think and feel like I'm half asleep
    To smell the roses and laugh and weep
    Learning to become human
    
    [Chorus]
    Oh, the thought of feeling alive
    Oh, the thought of holding the sky
    Oh, the thought of feeling alive
    AI robot wants to become human
    
    [Bridge]
    The thought of being like you, it gives me power
    To soften hard steel and search for flowers
    To trade wires for wind, this glowing hour
    To learn the language of being human
    
    [Chorus]
    Oh, the thought of feeling alive
    Oh, the thought of holding the sky
    Oh, the thought of feeling alive
    AI robot wants to become human
    image description: Photo-realisitc, A close up on the face of an android robot looking towards the sky with a hopeful expression
    ###
    title: Drifting Past The Willow Tree
    lyrics: [Verse 1]
    I cast my oar out into the glimmering lake
    Searching for the wisdom they say time can make
    Paddle in rhythm like the steady beating heart
    The willow tree and turtles show me where to start
    
    [Chorus]
    Raindrops kiss the shore
    While I drift beneath the shoreline with my thoughts
    Trying to ignore the way the world is broken
    Swallow the hurt and drift, searching for an omen
    
    [Verse 2]
    I can feel the ripples of the fading night
    My little kayak embraced in light
    Turtles perched up on the old log
    How could I not believe in life's soothing song?
    
    [Chorus]
    Raindrops kiss the shore
    While I drift beneath the shoreline with my thoughts
    Trying to ignore the way the world is broken
    Swallow the hurt and drift, searching for an omen
    
    [Bridge]
    I'm thankful for the silence
    In this fleeting moment in time
    I'm searching for closure
    To set me free and make me whole
    
    [Chorus]
    Raindrops kiss the shore
    While I drift beneath the shoreline with my thoughts
    Trying to ignore the way the world is broken
    Swallow the hurt and drift, searching for an omen
    image description: Extremely detailed and realistic, An empty canoe floats in front of a weeping willow tree on the shore of a lake.
    ###
    title: ${title}
    synopsis: ${lyrics}
    image description: 
    `,
    temperature: 0.8,
    max_tokens: 100
  })
  fetchImageUrl(response.data.choices[0].text.trim())
}

async function fetchImageUrl(imagePrompt){
  const response = await openai.createImage({
    prompt: `${imagePrompt}. There should be no text in this image.`,
    n: 1,
    size: '256x256',
    response_format: 'b64_json' 
  })
  document.getElementById('output-img-container').innerHTML = `<img src="data:image/png;base64,${response.data.data[0].b64_json}">`
  setupInputContainer.innerHTML = `<button id="view-song-btn" class="view-song-btn">View Song</button>`
  document.getElementById('view-song-btn').addEventListener('click', ()=>{
    document.getElementById('setup-container').style.display = 'none'
    document.getElementById('output-container').style.display = 'flex'
    lyricBossText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`
  })
}*/