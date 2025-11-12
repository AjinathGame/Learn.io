import OpenAI from "openai";


const askai = async (question = "you are rodmap ganarator ai and your name is learnmap.ai") => {
    try {

        const opeinai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.API_KEY
        })

        
        const response = await opeinai.chat.completions.create({
            model: "mistralai/ministral-3b",
            messages: [
                {
                    "role": "user",
                    "content": question
                }
            ]
        })

        return (response.choices[0].message.content);

    } catch (error) {
        return (error.message);
    }

}


export default askai