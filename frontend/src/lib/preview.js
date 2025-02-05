export function getPreviewStatus(url) {
  const searchParams = new URL(url).searchParams;
  
  return {
    isPreview: searchParams.has('x-craft-live-preview'),
    token: searchParams.get('token'),
    timestamp: Date.now()
  };
} 