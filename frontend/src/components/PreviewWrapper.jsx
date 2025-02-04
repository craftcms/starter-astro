import { useEffect, useState } from 'react';
import { craftClient } from '../lib/craft';
import { usePreview } from '../lib/preview';
import PreviewContent from './PreviewContent';

export default function PreviewWrapper({ query }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isPreview, previewToken } = usePreview();

  useEffect(() => {
    if (!isPreview) return;

    const fetchPreviewData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await craftClient.query(query, {}, {
          previewToken: previewToken || null
        });
        
        if (result && result.entry) {
          setData(result.entry);
        }
      } catch (error) {
        console.error('Preview fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [isPreview, previewToken, query]);

  if (loading) {
    return <div class="preview-loading">Loading preview...</div>;
  }

  if (error) {
    return <div class="preview-error">Error: {error}</div>;
  }

  return <PreviewContent data={data} />;
} 