export async function POST(request) {
    try {
        const { message, context, dialogueType } = await request.json();

        // needs a message to work with the api
        if (!message?.trim()) {
            return Response.json({ error: 'need a message' }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error('missing groq api key');
            return Response.json({ error: 'api key missing' }, { status: 500 });
        }

        console.log('chat message:', message);

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: 'You are a helpful AI assistant. Be conversational and natural.' },
                    { role: 'user', content: message }
                ],
                max_tokens: 600,
                temperature: 0.8
            })
        });

        if (!response.ok) {
            console.error('groq error:', response.status);
            return Response.json({ error: `chat api failed: ${response.status}` }, { status: response.status });
        }

        const result = await response.json();
        const reply = result.choices?.[0]?.message?.content?.trim();

        if (reply) {
            return Response.json({ response: reply });
        }

        return Response.json({ error: 'no response generated' }, { status: 500 });
    } catch (error) {
        console.error('dialogue error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
