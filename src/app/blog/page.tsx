import Link from 'next/link';

export default function BlogIndex() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="mb-8">This is a collection of articles for SEO purposes. It is not linked in the main navigation.</p>
      <ul>
        <li>
          <Link href="/blog/the-importance-of-proper-posture-in-cello-playing" className="text-xl text-blue-600 hover:underline">
            The Importance of Proper Posture in Cello Playing
          </Link>
        </li>
        {/* Future blog posts will be listed here */}
      </ul>
    </div>
  );
} 