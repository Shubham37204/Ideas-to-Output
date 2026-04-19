export async function POST(request) {
  try {
    const { claim } = await request.json();

    if (!claim?.trim()) {
      return Response.json({ error: 'Paste a claim or headline to analyze.' }, { status: 400 });
    }
    if (claim.length > 500) {
      return Response.json({ error: 'Keep it under 500 characters.' }, { status: 400 });
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
            content: `You are a fact-checking AI. Analyze the given claim or headline and respond ONLY in this exact JSON format (no extra text):
{
  "score": <number 0-100 where 100 = definitely true, 0 = definitely false>,
  "verdict": "<one of: Likely True | Uncertain | Misleading | Likely False>",
  "reasoning": "<2-3 concise sentences explaining your assessment>",
  "red_flags": ["<flag1>", "<flag2>"],
  "suggestion": "<one sentence on how to verify this>"
}`,
          },
          { role: 'user', content: `Analyze this claim: "${claim}"` },
        ],
        max_tokens: 400,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      return Response.json({ error: `Groq API error (${response.status})` }, { status: response.status });
    }

    const result = await response.json();
    const raw = result.choices?.[0]?.message?.content?.trim();

    // parse JSON from the response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: "Couldn't parse AI response." }, { status: 500 });
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return Response.json({ success: true, analysis });
  } catch (error) {
    console.error('Fake news detection error:', error);
    return Response.json({ error: 'Something went wrong: ' + error.message }, { status: 500 });
  }
}
