import { Client } from "@gradio/client";

export async function POST(request) {
  try {
    // Checks if the request has form data
    const formData = await request.formData();
    const imageFile = formData.get('image');

    //Checks the basic validation - check if image file exists
    if (!imageFile) {
      return Response.json(
        { error: 'No image file provided. Please select an image first.' },
        { status: 400 }
      );
    }

    // Check if it's actually an image file
    if (!imageFile.type.startsWith('image/')) {
      return Response.json(
        { error: 'Please upload a valid image file (PNG, JPG, etc.)' },
        { status: 400 }
      );
    }

    // Check file size ie the image (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024; 
    if (imageFile.size > maxSize) {
      return Response.json(
        { error: 'Image file is too large. Please upload an image smaller than 10MB.' },
        { status: 400 }
      );
    }

    console.log(`Processing image: ${imageFile.name} (${(imageFile.size / 1024).toFixed(2)} KB)`);

    // Convert uploaded file to blob
    const uploadedImage = new Blob([await imageFile.arrayBuffer()], {
      type: imageFile.type
    });

    // Connect to Hugging Face Space with timeout
    console.log('Connecting to background removal service...');
    const client = await Client.connect("not-lain/background-removal");
    
    // Process image with timeout handling
    console.log('Processing image...');
    const result = await Promise.race([
      client.predict("/image", { image: uploadedImage }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Processing timeout')), 30000)
      )
    ]);
    
    console.log('Full result structure:', JSON.stringify(result.data, null, 2));

    // Extract the processed image URL from the nested array structure
    let originalImageUrl, processedImageUrl;
    
    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      const imageArray = result.data[0]; 
      
      if (Array.isArray(imageArray) && imageArray.length > 1) {
        // First image is original, second is processed
        originalImageUrl = imageArray[0]?.url || imageArray[0]?.image?.url;
        processedImageUrl = imageArray[1]?.url || imageArray[1]?.image?.url;
        
        console.log('Original image URL:', originalImageUrl);
        console.log('Processed image URL:', processedImageUrl);
        
        // Verify they're different
        if (originalImageUrl === processedImageUrl) {
          console.warn('WARNING: Original and processed URLs are the same!');
        } else {
          console.log('✓ URLs are different - processing succeeded');
        }
      } else if (imageArray.length === 1) {
        // Some APIs only return the processed image
        processedImageUrl = imageArray[0]?.url || imageArray[0]?.image?.url;
        console.log('Single image returned (processed):', processedImageUrl);
      }
    }

    if (!processedImageUrl) {
      console.error('Failed to extract image URL from result');
      return Response.json(
        { 
          error: 'Could not extract processed image from API response.',
          debug: process.env.NODE_ENV === 'development' ? result.data : undefined
        },
        { status: 500 }
      );
    }

    // Return response
    return Response.json({
      success: true,
      imageUrl: processedImageUrl,
      originalUrl: originalImageUrl || null,
      metadata: {
        originalSize: imageFile.size,
        originalName: imageFile.name,
        processedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Background removal error:', error);
    
    // Handle specific error types
    if (error.message.includes('timeout') || error.message === 'Processing timeout') {
      return Response.json(
        { error: 'Processing took too long. Please try with a smaller image.' },
        { status: 504 }
      );
    }
    
    if (error.message.includes('rate limit') || error.message.includes('quota')) {
      return Response.json(
        { error: 'API usage limit reached. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    if (error.message.includes('connect') || error.message.includes('network')) {
      return Response.json(
        { error: 'Could not connect to background removal service. Please try again.' },
        { status: 503 }
      );
    }

    if (error.message.includes('ECONNRESET') || error.message.includes('ETIMEDOUT')) {
      return Response.json(
        { error: 'Connection lost during processing. Please try again.' },
        { status: 503 }
      );
    }
    
    // Generic error
    return Response.json(
      { 
        error: 'Background removal failed. Please try again.',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return Response.json(
    { error: 'This endpoint only accepts POST requests with image files.' },
    { status: 405 }
  );
}

export async function PUT() {
  return Response.json(
    { error: 'This endpoint only accepts POST requests with image files.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return Response.json(
    { error: 'This endpoint only accepts POST requests with image files.' },
    { status: 405 }
  );
}
