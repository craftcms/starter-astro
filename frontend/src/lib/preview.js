export function getPreviewStatus(url) {
  const searchParams = new URL(url).searchParams;
  const token = searchParams.get('token');
  const isPreview = searchParams.has('x-craft-live-preview');
  
  console.log('Preview Status:', { isPreview, token });
  
  return {
    isPreview,
    token,
    previewToken: token,
    timestamp: Date.now()
  };
}

export function isLivePreview(url) {
  const searchParams = new URL(url).searchParams;
  return searchParams.has('x-craft-live-preview');
}

export function injectPreviewScript() {
  if (typeof window !== 'undefined') {
    window.addEventListener('message', (event) => {
      if (event.data === 'preview:refresh') {
        window.location.reload();
      }
    });
  }
}

export function PreviewScript({ isPreview }) {
  return isPreview ? `
    <script>
      (${injectPreviewScript.toString()})();
    </script>
  ` : '';
} 