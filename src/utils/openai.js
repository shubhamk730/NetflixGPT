import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.REACT_APP_GPT_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true
});

export const sendChat = async (searchText) => {
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: searchText }],
      model: 'gpt-3.5-turbo-0125'
    });

    return chatCompletion.choices;

  }

export default client;