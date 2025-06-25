import { config } from "dotenv";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});


/*
 * Different ways to call the model synchronously
*/

// const messages = [
//   new SystemMessage("Translate the following from English into Italian"),
//   new HumanMessage("hi!"),
// ];
// const response = await model.invoke(messages);
// // const response = await model.invoke("Hello")
// // const response = await model.invoke([{ role: "user", content: "Hello" }])
// // const response = await model.invoke([new HumanMessage("hi!")])



/*
 * An example of streaming the model
*/

// const stream = await model.stream(messages);
// const chunks = [];
// for await (const chunk of stream) {
//   chunks.push(chunk);
//   console.log(`${chunk.content}|`);
// }

/*
 * An example of using a prompt template
 * This allows you to interpolate variables into a prompt
*/

const systemTemplate = "Translate the following from English into {language}";
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);
const promptValue = await promptTemplate.invoke({
  language: "italian",
  text: "hi!",
});
console.log('promptValue:',promptValue);
console.log('promptValue.toChatMessages():',promptValue.toChatMessages());
const response = await model.invoke(promptValue);

console.log('AI Response:', response);
