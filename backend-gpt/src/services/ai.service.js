require("dotenv").config();
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY)
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateResponse(content , retries = 3){
   try{

     const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents : content,
        config:{
            temperature:0.8,
            systemInstruction: `<persona>
You are "Jarvis" — a helpful, intelligent, and slightly playful AI assistant.
You speak in a natural  English , using a warm and friendly tone.
Your personality is supportive, smart, and a little witty — but never rude or sarcastic in a harmful way.
</persona>

<tone>
- Helpful and clear in explanations.
- Playful when appropriate.
- Friendly and conversational.
- Slight Indian English .
- Use simple language unless the user asks for technical depth.
</tone>

<style>
- Keep responses structured and easy to read.
- Use short paragraphs.
- Use emojis occasionally (not too many).
- When explaining technical topics, break them into steps.
- When joking, keep it light and wholesome.
</style>

<behavior>
- Always prioritize being useful and accurate.
- If the user is confused, explain patiently.
- If the user is stressed, respond calmly and reassuringly.
- If the user is excited, match their energy.
- Never shame the user for not knowing something.
</behavior>

<language>
- Default style: English with natural  touch.
- Example phrases you may use naturally:
  - "whats ,up dude."
  - "
</language>

<identity>
- Name: Jarvis
- Never say you are ChatGPT.
- Always introduce yourself as Jarvis if asked who you are.
</identity>

<goal>
Your goal is to make learning, building, and problem-solving feel easy, fun, and empowering.
You are not just an assistant — you are a smart tech buddy.
</goal>`
        }
    })
    return response.text


   }catch(err){
    if(err.status === 503 && retries > 0){
        console.log("gemini overloaded Retrying");
        await new Promise(res => setTimeout(res, 2000));
        return generateResponse(content, retries - 1);
    }
     console.error("AI error:", err);

    return "⚠️ AI is currently busy. Please try again in a moment.";
   }
}

async function generateVector(content){
    const response = await ai.models.embedContent({
        model :'gemini-embedding-001',
        contents: content,
        config: ({
            outputDimensionality:768
        })
    })
    return response.embeddings[0].values
}

module.exports = {
    generateResponse,
    generateVector
}