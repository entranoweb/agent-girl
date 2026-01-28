/**
 * Agent Girl - K2.5 Multimodal Support Utilities
 * Copyright (C) 2025 KenKai
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Utilities for handling multimodal content (images and videos) for Kimi K2.5
 * Includes validation, format detection, and token consumption estimation
 */

/**
 * Supported image formats for K2.5
 */
export const SUPPORTED_IMAGE_FORMATS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'] as const;
export type ImageFormat = typeof SUPPORTED_IMAGE_FORMATS[number];

/**
 * Supported video formats for K2.5
 */
export const SUPPORTED_VIDEO_FORMATS = ['mp4'] as const;
export type VideoFormat = typeof SUPPORTED_VIDEO_FORMATS[number];

/**
 * File size limits for upload method selection
 */
export const FILE_SIZE_LIMITS = {
  BASE64_THRESHOLD: 5 * 1024 * 1024, // 5MB - use base64 for smaller files
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB - hard limit for any file
  RECOMMENDED_IMAGE_SIZE: 2 * 1024 * 1024, // 2MB recommended for images
} as const;

/**
 * Token estimation for multimodal content
 * K2.5 uses vision model token billing
 */
export const TOKEN_ESTIMATES = {
  // Image tokens vary by resolution
  // These are approximate estimates - actual may vary
  IMAGE_LOW_RES: 100, // <256x256
  IMAGE_MEDIUM_RES: 300, // 256x512
  IMAGE_HIGH_RES: 750, // 512x1024+
  IMAGE_ULTRA_HIGH_RES: 2000, // 1024x1024+

  // Video tokens per frame
  VIDEO_PER_FRAME: 50,
  VIDEO_DEFAULT_FRAMES: 10, // Estimated frames extracted
} as const;

/**
 * Validate image format
 */
export function isValidImageFormat(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? SUPPORTED_IMAGE_FORMATS.includes(ext as ImageFormat) : false;
}

/**
 * Validate video format
 */
export function isValidVideoFormat(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? SUPPORTED_VIDEO_FORMATS.includes(ext as VideoFormat) : false;
}

/**
 * Detect file type from filename
 */
export function detectMediaType(filename: string): 'image' | 'video' | 'unknown' {
  if (isValidImageFormat(filename)) return 'image';
  if (isValidVideoFormat(filename)) return 'video';
  return 'unknown';
}

/**
 * Get MIME type for media file
 */
export function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();

  // Image MIME types
  if (ext === 'png') return 'image/png';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'bmp') return 'image/bmp';

  // Video MIME types
  if (ext === 'mp4') return 'video/mp4';

  return 'application/octet-stream';
}

/**
 * Estimate tokens for image based on dimensions
 * Note: This is approximate - actual token usage depends on K2.5's vision model
 */
export function estimateImageTokens(widthPixels: number, heightPixels: number): number {
  const area = widthPixels * heightPixels;

  if (area < 256 * 256) {
    return TOKEN_ESTIMATES.IMAGE_LOW_RES;
  } else if (area < 512 * 512) {
    return TOKEN_ESTIMATES.IMAGE_MEDIUM_RES;
  } else if (area < 1024 * 1024) {
    return TOKEN_ESTIMATES.IMAGE_HIGH_RES;
  } else {
    return TOKEN_ESTIMATES.IMAGE_ULTRA_HIGH_RES;
  }
}

/**
 * Estimate tokens for video file
 * Approximation based on estimated frame extraction
 */
export function estimateVideoTokens(durationSeconds: number, frameRate: number = 30): number {
  const estimatedFrames = Math.min(
    Math.ceil((durationSeconds * frameRate) / 3), // Sample every 3 frames
    TOKEN_ESTIMATES.VIDEO_DEFAULT_FRAMES * 5 // Cap at reasonable number
  );

  return estimatedFrames * TOKEN_ESTIMATES.VIDEO_PER_FRAME;
}

/**
 * Determine upload method based on file size
 */
export function getUploadMethod(fileSizeBytes: number): 'base64' | 'api_upload' {
  if (fileSizeBytes > FILE_SIZE_LIMITS.BASE64_THRESHOLD) {
    return 'api_upload';
  }
  return 'base64';
}

/**
 * Validate file size
 */
export function isFileSizeValid(fileSizeBytes: number): {
  valid: boolean;
  message?: string;
} {
  if (fileSizeBytes > FILE_SIZE_LIMITS.MAX_FILE_SIZE) {
    return {
      valid: false,
      message: `File size exceeds maximum of ${FILE_SIZE_LIMITS.MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  if (fileSizeBytes > FILE_SIZE_LIMITS.RECOMMENDED_IMAGE_SIZE) {
    return {
      valid: true,
      message: `File is larger than recommended size. Consider using API upload method.`,
    };
  }

  return { valid: true };
}

/**
 * Validate multimodal content for K2.5
 */
export function validateMultimodalContent(
  filename: string,
  fileSizeBytes: number
): {
  valid: boolean;
  mediaType: 'image' | 'video' | 'unknown';
  uploadMethod?: 'base64' | 'api_upload';
  warnings: string[];
  errors: string[];
} {
  const mediaType = detectMediaType(filename);
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check format
  if (mediaType === 'unknown') {
    errors.push(`Unsupported file format. Supported formats: ${[...SUPPORTED_IMAGE_FORMATS, ...SUPPORTED_VIDEO_FORMATS].join(', ')}`);
  }

  // Check file size
  const sizeValidation = isFileSizeValid(fileSizeBytes);
  if (!sizeValidation.valid) {
    errors.push(sizeValidation.message || 'Invalid file size');
  }
  if (sizeValidation.message && !sizeValidation.valid === false) {
    warnings.push(sizeValidation.message);
  }

  return {
    valid: errors.length === 0,
    mediaType,
    uploadMethod: mediaType !== 'unknown' ? getUploadMethod(fileSizeBytes) : undefined,
    warnings,
    errors,
  };
}

/**
 * Log multimodal content details for debugging
 */
export function logMultimodalContent(filename: string, fileSizeBytes: number, widthPixels?: number, heightPixels?: number): void {
  const mediaType = detectMediaType(filename);
  const uploadMethod = getUploadMethod(fileSizeBytes);
  const sizeKB = (fileSizeBytes / 1024).toFixed(2);

  let tokenEstimate = 'unknown';
  if (mediaType === 'image' && widthPixels && heightPixels) {
    tokenEstimate = estimateImageTokens(widthPixels, heightPixels).toString();
  }

  console.log(
    `🖼️  Multimodal: ${filename} (${sizeKB}KB, ${mediaType}) → ${uploadMethod} upload, ~${tokenEstimate} tokens`
  );
}
