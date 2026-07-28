import encode from "../../assets/vendor/jsquash-jpeg/encode.js";

const DEFAULT_OPTIONS = {
  baseline: false,
  progressive: true,
  optimize_coding: true,
  smoothing: 0,
  color_space: 3,
  quant_table: 3,
  trellis_multipass: false,
  trellis_opt_zero: false,
  trellis_opt_table: false,
  trellis_loops: 1,
  auto_subsample: true,
  chroma_subsample: 2,
  separate_chroma_quality: false
};

async function encodeAtQuality(imageData, quality) {
  const buffer = await encode(imageData, {
    ...DEFAULT_OPTIONS,
    quality,
    chroma_quality: quality
  });
  return { buffer, quality, size: buffer.byteLength };
}

async function encodeToLimit(imageData, maxSize, minQuality = 20, maxQuality = 95) {
  const results = new Map();

  const tryQuality = async quality => {
    const normalizedQuality = Math.max(minQuality, Math.min(maxQuality, Math.round(quality)));
    if (!results.has(normalizedQuality)) {
      results.set(normalizedQuality, await encodeAtQuality(imageData, normalizedQuality));
    }
    return results.get(normalizedQuality);
  };

  const highResult = await tryQuality(maxQuality);
  if (highResult.size <= maxSize) return { ...highResult, meetsLimit: true };

  const lowResult = await tryQuality(minQuality);
  if (lowResult.size > maxSize) return { ...lowResult, meetsLimit: false };

  const sizeRange = highResult.size - lowResult.size;
  const targetRatio = sizeRange > 0 ? (maxSize - lowResult.size) / sizeRange : 0;
  const estimatedQuality = Math.max(minQuality + 1, Math.min(maxQuality - 1, Math.floor(minQuality + (maxQuality - minQuality) * targetRatio)));
  const estimatedResult = await tryQuality(estimatedQuality);

  if (estimatedResult.size > maxSize) {
    const saferResult = await tryQuality(Math.floor((minQuality + estimatedQuality) / 2));
    return saferResult.size <= maxSize ? { ...saferResult, meetsLimit: true } : { ...lowResult, meetsLimit: true };
  }

  const higherResult = await tryQuality(Math.floor((estimatedQuality + maxQuality) / 2));
  return higherResult.size <= maxSize ? { ...higherResult, meetsLimit: true } : { ...estimatedResult, meetsLimit: true };
}

self.addEventListener("message", async event => {
  const { id, pixels, width, height, maxSize } = event.data;
  try {
    const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height);
    const result = await encodeToLimit(imageData, maxSize);
    self.postMessage({ id, ok: true, buffer: result.buffer, quality: result.quality, size: result.size, meetsLimit: result.meetsLimit }, [result.buffer]);
  } catch (error) {
    self.postMessage({ id, ok: false, error: error instanceof Error ? error.message : String(error) });
  }
});
