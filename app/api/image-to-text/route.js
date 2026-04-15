import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    // Validation
    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided. Please select an image.' },
        { status: 400 }
      );
    }

    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Please upload a valid image file (PNG, JPG, etc.)' },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (imageFile.size > maxSize) {
      return NextResponse.json(
        { error: 'Image file is too large. Please upload an image smaller than 10MB.' },
        { status: 400 }
      );
    }

    console.log(`Processing OCR for: ${imageFile.name} (${(imageFile.size / 1024).toFixed(2)} KB)`);

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    let extractedText = '';
    let method = '';

    const imageBuffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    if (GROQ_API_KEY && !extractedText) {
      try {
        console.log('Attempting Groq Llama 4 Scout Vision...');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: 'Extract ALL text visible in this image. Return ONLY the text you see, with no additional commentary. Preserve line breaks and formatting. If you see no text, respond with exactly: "No readable text found"'
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: `data:${imageFile.type};base64,${base64Image}`
                    }
                  }
                ]
              }
            ],
            max_tokens: 2000,
            temperature: 0
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            extractedText = data.choices[0].message.content.trim();
            method = 'Groq Llama 4 Scout Vision';
            console.log('Groq Vision OCR succeeded');
          }
        } else {
          const errorText = await response.text();
          console.error('Groq Vision error:', response.status, errorText);
        }
      } catch (error) {
        console.error('Groq Vision OCR failed:', error.message);
      }
    }

    if (!extractedText) {
      try {
        console.log('Attempting Claude Vision OCR...');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'image',
                    source: {
                      type: 'base64',
                      media_type: imageFile.type,
                      data: base64Image
                    }
                  },
                  {
                    type: 'text',
                    text: 'Extract all text from this image. Return ONLY the text you see, nothing else. Preserve formatting and line breaks.'
                  }
                ]
              }
            ]
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.content && data.content[0]) {
            extractedText = data.content[0].text.trim();
            method = 'Claude Sonnet 4 Vision';
            console.log('Claude Vision OCR succeeded');
          }
        } else {
          console.log('Claude API not available');
        }
      } catch (error) {
        console.error('Claude Vision failed:', error.message);
      }
    }

    if (!extractedText || extractedText.trim().length === 0 || extractedText === 'No readable text found') {
      return NextResponse.json(
        { 
          error: 'No text could be extracted from the image.',
          suggestion: 'The image might not contain readable text, or the text quality is too low. Try uploading a clearer image with visible text.',
          triedMethods: GROQ_API_KEY ? ['Groq Llama 4', 'Claude', 'OCR.space'] : ['Claude', 'OCR.space']
        },
        { status: 422 }
      );
    }

    extractedText = extractedText.trim();

    return NextResponse.json({
      success: true,
      text: extractedText,
      method: method,
      metadata: {
        originalFileName: imageFile.name,
        fileSize: imageFile.size,
        processedAt: new Date().toISOString(),
        textLength: extractedText.length,
        wordCount: extractedText.split(/\s+/).filter(word => word.length > 0).length
      }
    });

  } catch (error) {
    console.error('Image-to-Text error:', error);

    if (error.message.includes('timeout') || error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Processing took too long. Please try with a smaller or clearer image.' },
        { status: 504 }
      );
    }

    if (error.message.includes('rate limit') || error.message.includes('quota')) {
      return NextResponse.json(
        { error: 'API usage limit reached. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Text extraction failed. Please try again.',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'This endpoint only accepts POST requests with image files.' },
    { status: 405 }
  );
}
