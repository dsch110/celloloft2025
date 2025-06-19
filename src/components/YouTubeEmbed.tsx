'use client';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="aspect-video bg-black/30 rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&playsinline=1&start=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
} 