import { FormData } from 'formdata-node';
import { fileFromSync } from 'fetch-blob/from';
import { Readable } from 'stream/web';
import { ReadableStream as NodeReadableStream } from 'stream/web';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    const form = new FormData();
    form.set('prompt', prompt);
    form.set('model', 'sdxl');
    form.set('output_format', 'png');

    const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        Accept: 'application/json',
      },
      body: form,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Stability API error:', result);
      return res.status(500).json({ error: result.errors || 'Unknown error' });
    }

    const { image } = result;
    res.status(200).json({ imageUrl: `data:image/png;base64,${image}` });
  } catch (err) {
    console.error('Image generation failed:', err);
    res.status(500).json({ error: 'Image generation failed' });
  }
}
