export default function HomeContent({ data }) {
  if (!data) return null;
  
  return (
    <div class="home-content">
      <h1>{data.title}</h1>
      
      {data.pageSubheading && (
        <h2>{data.pageSubheading}</h2>
      )}

      {data.image && (
        <img 
          src={data.image.url} 
          alt={data.image.alt || ''} 
          class="hero-image"
        />
      )}

      {data.pageContent && (
        <div class="content" dangerouslySetInnerHTML={{ __html: data.pageContent }} />
      )}
    </div>
  );
} 