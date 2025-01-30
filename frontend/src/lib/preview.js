export function usePreview() {
  const searchParams = new URLSearchParams(window.location.search);
  const previewToken = searchParams.get('token');
  const isPreview = searchParams.has('x-craft-live-preview');
  const previewTimestamp = Date.now();

  const refreshPreview = () => {
    return Date.now();
  };

  return {
    isPreview,
    previewToken,
    previewTimestamp,
    refreshPreview
  };
} 