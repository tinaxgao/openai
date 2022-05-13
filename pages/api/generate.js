import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-ada-001", {
    prompt: req.body.text,
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}