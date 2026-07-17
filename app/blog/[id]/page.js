import Link from 'next/link';
import { notFound } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import { getPostById } from '@/lib/wp';

export async function generateMetadata({ params }) {
  const post = await getPostById(params.id);
  if (!post) return { title: 'Post not found — TE Sivann' };
  return {
    title: `${post.title} — TE Sivann`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostById(params.id);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white pt-14 lg:pt-0">
      <FloatingNav />
      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.image} alt={post.imageAlt || post.title} className="w-full max-h-96 object-cover" />
      )}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm font-bold text-purple hover:underline">← Back to blog</Link>
        <p className="text-xs text-gold font-bold uppercase tracking-wide mt-6 mb-2">
          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          {' · '}{post.category}
        </p>
        <h1 className="font-extrabold text-3xl md:text-4xl mb-8 leading-tight">{post.title}</h1>
        <div
          className="prose prose-neutral max-w-none prose-headings:font-extrabold prose-a:text-purple prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
