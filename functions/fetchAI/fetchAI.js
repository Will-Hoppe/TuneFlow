import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const handler = async (event) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a short message to enthusiastically say a song idea sounds interesting and that you need some minutes to think about it. Try to include specific details from their idea.
      ###
      outline: A powerful rock anthem rallying individuals to stand together, defy the norms, and embrace their true selves with unapologetic passion.
      message: I'll need to think about that. But your song idea is amazing! It's going to rock!
      ###
      outline: A haunting acoustic folk song capturing the bittersweet memories and healing solace found in the gentle whispers of rain on a rooftop in the old town where we used to dwell.
      message: I'll spend a few moments considering that. But I love your idea!! Sounds like a tear-jerker!
      ###
      outline: An infectious, dance-pop track filled with catchy hooks and shimmering synths, narrating the exhilarating rollercoaster of emotions and unstoppable chemistry between two star-crossed lovers who meet on a crowded dance floor.
      message: Wow that is awesome! Lovers on the dance floor, huh? Give me a few moments to think!
      ###
      outline: ${event.body}
      message: 
      `,
      max_tokens: 60 
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
