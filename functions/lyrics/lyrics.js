import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const handler = async (event) => {
  try {
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
      idea: ${event.body}
      lyrics: 
      `,
      max_tokens: 700
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.data }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }