export async function POST(request) {
  try {
    const { theme, genre } = await request.json();

    if (!theme?.trim()) {
      return Response.json({ error: 'Describe a theme for the song.' }, { status: 400 });
    }
    if (!genre) {
      return Response.json({ error: 'Pick a genre.' }, { status: 400 });
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
            content: `You are a professional songwriter. Write authentic, emotionally resonant song lyrics in the requested genre. Format your response with clear section labels like [Verse 1], [Chorus], [Verse 2], [Bridge], [Outro]. Make the lyrics feel real and genre-appropriate.`,
          },
          {
            role: 'user',
            content: `Write a ${genre} song about: "${theme}". Include Verse 1, Chorus, Verse 2, Bridge, and Outro.`,
          },
        ],
        max_tokens: 800,
        temperature: 0.85,
      }),
    });

    if (!response.ok) {
      return Response.json({ error: `Groq API error (${response.status})` }, { status: response.status });
    }

    const result = await response.json();
    const lyrics = result.choices?.[0]?.message?.content?.trim();

    if (!lyrics) {
      return Response.json({ error: "Couldn't generate lyrics." }, { status: 500 });
    }

    return Response.json({ success: true, lyrics, genre, theme });
  } catch (error) {
    console.error('Lyrics generation error:', error);
    return Response.json({ error: 'Something went wrong: ' + error.message }, { status: 500 });
  }
}
