export async function POST(request) {
  console.log('code generation request received');

  try {
    // geting the data from request
    const { prompt, language } = await request.json();

    // basic validation from the api
    if (!prompt?.trim()) {
      return Response.json({ error: "need a prompt" }, { status: 400 });
    }
    if (!language) {
      return Response.json({ error: "pick a language" }, { status: 400 });
    }
    if (prompt.length > 200) {
      return Response.json({ error: "prompt too long, keep it under 200 chars" }, { status: 400 });
    }

    //api key from env file
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('Missing GROQ_API_KEY');
      return Response.json({ error: "api key not configured" }, { status: 500 });
    }

    console.log(`generating ${language} code for:`, prompt);

    // calling the  groq api
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: `Generate clean ${language} code. Only return code, no explanations.` },
          { role: "user", content: `${prompt}` }
        ],
        max_tokens: 500, 
        temperature: 0.3 
      }),
    });

    // checks  the groq api key
    if (!response.ok) {
      console.error('Groq API error:', response.status);
      return Response.json({ error: `groq api failed (${response.status})` }, { status: response.status });
    }

    // get the generated code from the api
    const result = await response.json();
    const code = result.choices?.[0]?.message?.content?.trim();

    if (code && code.length > 0) {
      return Response.json({ success: true, code, language });
    }

    return Response.json({ error: "couldn't generate code, try again" }, { status: 500 });
  } catch (error) {
    console.error('Code generation error:', error);
    return Response.json({ error: "something broke: " + error.message }, { status: 500 });
  }
}
