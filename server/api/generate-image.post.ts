import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readFormData(event);

  const style = body.get('style')?.toString() ?? 'modern minimalist';
  const image = body.get('image') as File;
  const constraints = body.get('constraints')?.toString() ?? '';

  const client = new OpenAI({
    apiKey: config.openaiApiKey,
  });

  let prompt = `Redesign this room in a ${style} style. Keep the original architectural features exactly the same: wall and floor colors, baseboards, flooring direction, lighting, and overall room layout must remain unchanged. Only change the furniture and decoration to match the desired style. The camera angle, proportions, and structure must be preserved perfectly.`;

  if (constraints) {
    prompt += ` Please incorporate the following specific requirements: ${constraints}.`;
  }

  const response = await client.images.edit({
    model: "gpt-image-1",
    image: [image],
    prompt,
  });

  if (!response.data || response.data.length === 0) {
    return {
      error: 'No image generated'
    };
  }

  return {
    imageBase64: response.data[0].b64_json
  };
});
