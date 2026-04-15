export async function POST(request) {
  console.log('story generation request');

  try {
    const { prompt } = await request.json();

    // basic validation
    if (!prompt?.trim() || prompt.length < 5) {
      return Response.json({ error: 'need at least 5 characters' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('missing groq api key');
      return Response.json({ error: 'api key not configured' }, { status: 500 });
    }

    console.log('generating story for:', prompt);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: 'Write creative short stories. Keep them engaging but concise.' },
            { role: 'user', content: `Write a story about: ${prompt.trim()}` }
          ],
          max_tokens: 400, // keep stories reasonable length
          temperature: 0.8 // good for creativity
        }),
      });

      if (!response.ok) {
        console.error('groq api error:', response.status);
        throw new Error('api call failed');
      }

      const data = await response.json();
      const story = data.choices?.[0]?.message?.content?.trim();

      if (story && story.length > 20) {
        return Response.json({ success: true, story });
      }

      throw new Error('no story generated');

    } catch (apiError) {
      console.error('api failed, using fallback:', apiError);

      // fallback story template - this is a bit hacky but works
      const fallbackStory = `Once upon a time, ${prompt.trim()} led to an unexpected adventure. The journey was filled with challenges and discoveries that changed everyone involved. Through courage and determination, the characters learned valuable lessons about friendship, perseverance, and finding magic in everyday moments.`;

      return Response.json({ success: true, story: fallbackStory });
    }

  } catch (error) {
    console.error('story generation error:', error);
    return Response.json({ error: 'something went wrong: ' + error.message }, { status: 500 });
  }
}
