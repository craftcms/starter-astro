import HomeContent from './HomeContent';

export default function PreviewContent({ data }) {
  if (!data) return null;
  return <HomeContent data={data} />;
} 