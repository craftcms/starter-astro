export function getPreviewStatus(url) {
  const searchParams = new URL(url).searchParams;
  const token = searchParams.get('token');
  const isPreview = searchParams.has('x-craft-live-preview') || searchParams.has('token');
  
  console.log('Preview Status:', { isPreview, token });
  
  return {
    isPreview,
    token,
    timestamp: Date.now()
  };
} 