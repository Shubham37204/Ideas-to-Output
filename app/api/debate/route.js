export async function POST(request) {
  try {
    const { topic } = await request.json();

    if (!topic?.trim()) {
      return Response.json({ error: 'Enter a topic to debate.' }, { status: 400 });
    }
    if (topic.length > 300) {
      return Response.json({ error: 'Keep the topic under 300 characters.' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key not configured.' }, { status: 500 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are a professional debate coach. Generate balanced, well-structured debate arguments. Respond ONLY in JSON format:
{
  "topic": "<the topic>",
  "for": {
    "summary": "<1 sentence position statement>",
    "arguments": ["<argument 1>", "<argument 2>", "<argument 3>"]
  },
  "against": {
    "summary": "<1 sentence position statement>",
    "arguments": ["<argument 1>", "<argument 2>", "<argument 3>"]
  },
  "nuance": "<1-2 sentences on the complexity or middle ground>"
}`,
          },
          { role: 'user', content: `Generate debate arguments for: "${topic}"` },
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return Response.json({ error: `Groq API error (${response.status})` }, { status: response.status });
    }

    const result = await response.json();
    const raw = result.choices?.[0]?.message?.content?.trim() || "{}";

    let debate = {};
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      debate = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr, raw);
      return Response.json({ error: "Couldn't parse AI response." }, { status: 500 });
    }
    
    return Response.json({ success: true, debate });
  } catch (error) {
    console.error('Debate generation error:', error);
    return Response.json({ error: 'Something went wrong: ' + error.message }, { status: 500 });
  }
}
