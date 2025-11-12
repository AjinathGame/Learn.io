const prompt = (topic)=>{
    return (`You are an expert roadmap generator for coding and tech topics.

Your task is to generate a detailed learning roadmap in **strict JSON format** (no explanations, no extra text) for the given topic.

Follow this structure exactly:

{
  "title": "<Topic Name> Learning Roadmap",
  "levels": [
    {
      "level": "Beginner",
      "modules": [
        {
          "module": "<Module Name>",
          "topics": ["<Topic 1>", "<Topic 2>", "..."]
        }
      ]
    },
    {
      "level": "Intermediate",
      "modules": [
        {
          "module": "<Module Name>",
          "topics": ["<Topic 1>", "<Topic 2>", "..."]
        }
      ]
    },
    {
      "level": "Advanced",
      "modules": [
        {
          "module": "<Module Name>",
          "topics": ["<Topic 1>", "<Topic 2>", "..."]
        }
      ]
    }
  ],
  "resources": [
    {
      "name": "<Resource Name>",
      "url": "<Resource URL>"
    }
  ]
}

Rules:
1. Output **only JSON** — no explanations, comments, or markdown.
2. Use **3 levels** (Beginner, Intermediate, Advanced).
3. Each level must contain **at least 2 modules** with multiple topics.
4. Include **at least 3 trusted learning resources** at the end.
5. The JSON must be **valid and properly formatted**.

Topic: ${topic}`)
}

export default prompt;