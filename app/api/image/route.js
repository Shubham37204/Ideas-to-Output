export async function POST(request) {
  try {
    const { prompt, type } = await request.json();

    if (!prompt || prompt.trim().length < 10) {
      return Response.json({ error: "Description must be at least 10 characters" }, { status: 400 });
    }

    let finalPrompt;
    if (type === "ghibli") {
      finalPrompt = `Studio Ghibli style, anime style, beautiful detailed background, ${prompt}, soft colors, magical atmosphere, hand-drawn animation style, miyazaki style, high quality, masterpiece`;
    } else {
      finalPrompt = `${prompt}, high quality, detailed, beautiful, photorealistic`;
    }

    // Use Pollinations AI - free, reliable, no API key needed
    const encodedPrompt = encodeURIComponent(finalPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000000)}`;

    const response = await fetch(imageUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ImageGenerator/1.0)"
      }
    });

    if (!response.ok) {
      console.error(`Pollinations API Error: ${response.status}`);
      return Response.json({
        error: `Image generation failed: ${response.status}`,
        details: "Unable to generate image at this time"
      }, { status: response.status });
    }

    const imageBlob = await response.blob();
    const imageBuffer = await imageBlob.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    return Response.json({ success: true, image: `data:image/png;base64,${base64Image}` });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
