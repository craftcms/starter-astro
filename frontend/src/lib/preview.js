import React, { useState, useCallback } from 'react';

// Server-side preview check
export function getPreviewStatus(url) {
  const searchParams = new URL(url).searchParams;
  return {
    isPreview: searchParams.has('x-craft-live-preview'),
    previewToken: searchParams.get('token')
  };
}

// Client-side preview functionality
export function usePreview() {
  if (typeof window === 'undefined') {
    return {
      isPreview: false,
      previewToken: null,
      previewTimestamp: null,
      refreshPreview: () => {}
    };
  }

  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  
  const previewToken = searchParams.get('token');
  const isPreview = searchParams.has('x-craft-live-preview');
  
  // Only update timestamp when preview state changes
  const [timestamp, setTimestamp] = useState(Date.now());

  const refreshPreview = useCallback(() => {
    setTimestamp(Date.now());
  }, []);

  return {
    isPreview,
    previewToken,
    previewTimestamp: timestamp,
    refreshPreview
  };
} 