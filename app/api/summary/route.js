export async function POST(request) {
    try {
        const { topic } = await request.json();
        
        if (!topic || topic.trim() === '') {
            return Response.json({ error: 'Please provide a topic to explain' }, { status: 400 });
        }

        const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        let explanation = '';

        // Try Groq API first if available
        if (GROQ_API_KEY) {
            try {
                console.log('Attempting Groq API...');
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);
                
                const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${GROQ_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'llama-3.3-70b-versatile', 
                        messages: [
                            {
                                role: 'user',
                                content: `Explain ${topic} in simple and understandable terms. Keep it concise but informative.`
                            }
                        ],
                        max_tokens: 300,
                        temperature: 0.7
                    }),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);

                if (groqResponse.ok) {
                    const groqData = await groqResponse.json();
                    if (groqData.choices && groqData.choices[0] && groqData.choices[0].message) {
                        explanation = groqData.choices[0].message.content.trim();
                        console.log('Groq API succeeded');
                    }
                } else {
                    const errorText = await groqResponse.text();
                    console.error('Groq API error:', groqResponse.status, errorText);
                }
            } catch (error) {
                console.error('Groq API failed:', error.message);
            }
        }

        // Try Hugging Face if Groq didn't succeed
        if (!explanation && HUGGINGFACE_API_KEY) {
            try {
                console.log('Attempting Hugging Face API...');
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 12000);
                
                const hfResponse = await fetch(
                    'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            inputs: `Explain ${topic} in simple terms:`,
                            parameters: {
                                max_length: 300,
                                temperature: 0.8,
                                do_sample: true,
                                top_p: 0.9,
                                return_full_text: false
                            }
                        }),
                        signal: controller.signal
                    }
                );
                
                clearTimeout(timeoutId);

                if (hfResponse.ok) {
                    const hfData = await hfResponse.json();
                    
                    // Parse response
                    if (Array.isArray(hfData) && hfData.length > 0) {
                        explanation = hfData[0].generated_text || hfData[0].text || '';
                    } else if (typeof hfData === 'string') {
                        explanation = hfData;
                    } else if (hfData && typeof hfData === 'object') {
                        explanation = hfData.generated_text || hfData.text || '';
                    }

                    // Remove prompt echo
                    if (explanation) {
                        const promptToRemove = `Explain ${topic} in simple terms:`;
                        if (explanation.startsWith(promptToRemove)) {
                            explanation = explanation.substring(promptToRemove.length).trim();
                        }
                    }
                    console.log('Hugging Face API succeeded');
                } else {
                    const errorText = await hfResponse.text();
                    console.error('Hugging Face API error:', hfResponse.status, errorText);
                }
            } catch (error) {
                console.error('Hugging Face API failed:', error.message);
            }
        }

        // Check if we got any explanation
        if (!explanation || explanation.length < 5) {
            const availableApis = [];
            if (GROQ_API_KEY) availableApis.push('Groq');
            if (HUGGINGFACE_API_KEY) availableApis.push('Hugging Face');
            
            if (availableApis.length === 0) {
                return Response.json({ 
                    error: 'No API keys configured. Please set GROQ_API_KEY or HUGGINGFACE_API_KEY.' 
                }, { status: 500 });
            }
            
            return Response.json({ 
                error: `Failed to generate explanation. Tried: ${availableApis.join(', ')}. Check server logs for details.` 
            }, { status: 500 });
        }

        return Response.json({ explanation });
        
    } catch (error) {
        console.error('Unexpected error in POST handler:', error);
        return Response.json({ 
            error: 'Something went wrong. Please try again.',
            details: error.message 
        }, { status: 500 });
    }
}
