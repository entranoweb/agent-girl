/**
 * Kimi K2.5 Integration Testing Suite
 * Comprehensive tests for K2.5 model configuration and functionality
 */

import { describe, it, expect, beforeEach } from 'bun:test';
import { AVAILABLE_MODELS, getModelConfig } from '../client/config/models';
import {
  isValidImageFormat,
  isValidVideoFormat,
  detectMediaType,
  getMimeType,
  estimateImageTokens,
  estimateVideoTokens,
  getUploadMethod,
  isFileSizeValid,
  validateMultimodalContent,
} from '../server/utils/multimodal';

describe('K2.5 Model Configuration', () => {
  it('K2.5 model should be available in AVAILABLE_MODELS', () => {
    const k25Model = AVAILABLE_MODELS.find(m => m.id === 'kimi-k2.5');
    expect(k25Model).toBeDefined();
    expect(k25Model?.name).toBe('Kimi K2.5');
    expect(k25Model?.apiModelId).toBe('kimi-k2.5');
    expect(k25Model?.provider).toBe('moonshot');
  });

  it('K2.5 should have proper description', () => {
    const k25 = getModelConfig('kimi-k2.5');
    expect(k25?.description).toContain('multimodal');
    expect(k25?.description).toContain('Agent Swarm');
  });

  it('All existing K2 models should still be available', () => {
    const k2Thinking = getModelConfig('kimi-k2-thinking');
    const k2Turbo = getModelConfig('kimi-k2-thinking-turbo');
    
    expect(k2Thinking).toBeDefined();
    expect(k2Turbo).toBeDefined();
  });

  it('getModelConfig should work for K2.5', () => {
    const model = getModelConfig('kimi-k2.5');
    expect(model?.id).toBe('kimi-k2.5');
    expect(model?.apiModelId).toBe('kimi-k2.5');
  });
});

describe('Multimodal Format Validation', () => {
  describe('Image Format Validation', () => {
    const validImageFormats = ['image.png', 'photo.jpg', 'picture.jpeg', 'animation.gif', 'graphic.webp', 'bitmap.bmp'];
    const invalidFormats = ['document.pdf', 'archive.zip', 'audio.mp3', 'text.txt'];

    validImageFormats.forEach(filename => {
      it(`should recognize ${filename} as valid image format`, () => {
        expect(isValidImageFormat(filename)).toBe(true);
      });
    });

    invalidFormats.forEach(filename => {
      it(`should reject ${filename} as invalid image format`, () => {
        expect(isValidImageFormat(filename)).toBe(false);
      });
    });
  });

  describe('Video Format Validation', () => {
    it('should recognize .mp4 as valid video format', () => {
      expect(isValidVideoFormat('video.mp4')).toBe(true);
    });

    it('should reject other video formats', () => {
      expect(isValidVideoFormat('video.avi')).toBe(false);
      expect(isValidVideoFormat('video.mov')).toBe(false);
      expect(isValidVideoFormat('video.webm')).toBe(false);
    });
  });

  describe('Media Type Detection', () => {
    it('should detect image files correctly', () => {
      expect(detectMediaType('photo.png')).toBe('image');
      expect(detectMediaType('picture.jpg')).toBe('image');
    });

    it('should detect video files correctly', () => {
      expect(detectMediaType('video.mp4')).toBe('video');
    });

    it('should detect unknown formats', () => {
      expect(detectMediaType('document.pdf')).toBe('unknown');
      expect(detectMediaType('archive.zip')).toBe('unknown');
    });
  });

  describe('MIME Type Detection', () => {
    it('should return correct MIME types for images', () => {
      expect(getMimeType('image.png')).toBe('image/png');
      expect(getMimeType('image.jpg')).toBe('image/jpeg');
      expect(getMimeType('image.jpeg')).toBe('image/jpeg');
      expect(getMimeType('image.gif')).toBe('image/gif');
      expect(getMimeType('image.webp')).toBe('image/webp');
      expect(getMimeType('image.bmp')).toBe('image/bmp');
    });

    it('should return correct MIME type for video', () => {
      expect(getMimeType('video.mp4')).toBe('video/mp4');
    });

    it('should return default MIME type for unknown formats', () => {
      expect(getMimeType('unknown.xyz')).toBe('application/octet-stream');
    });
  });
});

describe('Token Estimation', () => {
  describe('Image Token Estimation', () => {
    it('should estimate low-resolution image tokens', () => {
      const tokens = estimateImageTokens(200, 200);
      expect(tokens).toBe(100);
    });

    it('should estimate medium-resolution image tokens', () => {
      const tokens = estimateImageTokens(400, 400);
      expect(tokens).toBe(300);
    });

    it('should estimate high-resolution image tokens', () => {
      const tokens = estimateImageTokens(800, 600);
      expect(tokens).toBe(750);
    });

    it('should estimate ultra-high-resolution image tokens', () => {
      const tokens = estimateImageTokens(1920, 1080);
      expect(tokens).toBe(2000);
    });
  });

  describe('Video Token Estimation', () => {
    it('should estimate video tokens based on duration', () => {
      // 10 second video at 30fps: (10*30)/3 = 100 frames sampled, 50 tokens/frame = 5000 (but capped at 2500)
      const tokens = estimateVideoTokens(10, 30);
      expect(tokens).toBeGreaterThan(0);
      expect(tokens).toBeLessThanOrEqual(2500); // Capped at VIDEO_DEFAULT_FRAMES * 5 * VIDEO_PER_FRAME
    });

    it('should cap video token estimation', () => {
      // Very long video should be capped
      const tokens = estimateVideoTokens(3600, 30); // 1 hour
      expect(tokens).toBeLessThanOrEqual(2500); // Should be capped
    });
  });
});

describe('File Size Management', () => {
  describe('Upload Method Selection', () => {
    it('should use base64 for files under 5MB', () => {
      const method = getUploadMethod(1024 * 1024); // 1MB
      expect(method).toBe('base64');
    });

    it('should use API upload for files over 5MB', () => {
      const method = getUploadMethod(10 * 1024 * 1024); // 10MB
      expect(method).toBe('api_upload');
    });

    it('should use base64 at exactly 5MB threshold', () => {
      const method = getUploadMethod(5 * 1024 * 1024); // 5MB
      expect(method).toBe('base64');
    });

    it('should use API upload just above 5MB threshold', () => {
      const method = getUploadMethod(5 * 1024 * 1024 + 1); // 5MB + 1 byte
      expect(method).toBe('api_upload');
    });
  });

  describe('File Size Validation', () => {
    it('should accept files under 100MB', () => {
      const result = isFileSizeValid(50 * 1024 * 1024);
      expect(result.valid).toBe(true);
    });

    it('should reject files over 100MB', () => {
      const result = isFileSizeValid(101 * 1024 * 1024);
      expect(result.valid).toBe(false);
      expect(result.message).toContain('exceeds maximum');
    });

    it('should warn for files over recommended size', () => {
      const result = isFileSizeValid(3 * 1024 * 1024);
      expect(result.valid).toBe(true);
      expect(result.message).toContain('Consider using API upload');
    });

    it('should accept files under recommended size', () => {
      const result = isFileSizeValid(1 * 1024 * 1024);
      expect(result.valid).toBe(true);
      expect(result.message).toBeUndefined();
    });
  });
});

describe('Multimodal Content Validation', () => {
  it('should validate correct image with reasonable file size', () => {
    const result = validateMultimodalContent('image.png', 1024 * 1024);
    expect(result.valid).toBe(true);
    expect(result.mediaType).toBe('image');
    expect(result.uploadMethod).toBe('base64');
    expect(result.errors).toHaveLength(0);
  });

  it('should validate image with large file size', () => {
    const result = validateMultimodalContent('image.jpg', 10 * 1024 * 1024);
    expect(result.valid).toBe(true);
    expect(result.uploadMethod).toBe('api_upload');
  });

  it('should reject unsupported file format', () => {
    const result = validateMultimodalContent('document.pdf', 1024 * 1024);
    expect(result.valid).toBe(false);
    expect(result.mediaType).toBe('unknown');
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain('Unsupported file format');
  });

  it('should reject oversized files', () => {
    const result = validateMultimodalContent('image.png', 101 * 1024 * 1024);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should validate video file correctly', () => {
    const result = validateMultimodalContent('video.mp4', 50 * 1024 * 1024);
    expect(result.valid).toBe(true);
    expect(result.mediaType).toBe('video');
  });
});

describe('K2.5 Parameter Handling', () => {
  it('K2.5 model should be recognized for special handling', () => {
    const model = getModelConfig('kimi-k2.5');
    expect(model?.apiModelId).toBe('kimi-k2.5');
    // Parameter handling will be tested via integration tests
  });

  it('should not affect other Moonshot models', () => {
    const k2 = getModelConfig('kimi-k2-thinking');
    const k2Turbo = getModelConfig('kimi-k2-thinking-turbo');
    
    expect(k2?.provider).toBe('moonshot');
    expect(k2Turbo?.provider).toBe('moonshot');
    // These should NOT have K2.5-specific parameter handling
  });
});

describe('Backward Compatibility', () => {
  it('should not break existing model selection', () => {
    const allModels = AVAILABLE_MODELS;
    expect(allModels.length).toBeGreaterThanOrEqual(7); // At least 3 Claude + 1 GLM + 2 K2 + 1 K2.5
  });

  it('should maintain provider configuration', () => {
    const anthropic = AVAILABLE_MODELS.filter(m => m.provider === 'anthropic');
    const zai = AVAILABLE_MODELS.filter(m => m.provider === 'z-ai');
    const moonshot = AVAILABLE_MODELS.filter(m => m.provider === 'moonshot');
    
    expect(anthropic.length).toBeGreaterThan(0);
    expect(zai.length).toBeGreaterThan(0);
    expect(moonshot.length).toBeGreaterThanOrEqual(3); // K2 Thinking, K2 Turbo, K2.5
  });

  it('K2 models should have different API model IDs than K2.5', () => {
    const k2 = getModelConfig('kimi-k2-thinking');
    const k25 = getModelConfig('kimi-k2.5');
    
    expect(k2?.apiModelId).not.toBe(k25?.apiModelId);
    expect(k2?.apiModelId).toBe('kimi-k2-thinking');
    expect(k25?.apiModelId).toBe('kimi-k2.5');
  });
});
