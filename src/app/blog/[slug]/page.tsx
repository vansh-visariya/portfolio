import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Vansh`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px]" />
      </div>

      <Navigation />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <Link href="/blog/" className="btn-ghost text-xs mb-6 inline-flex">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            All posts
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-white/30">{post.date}</span>
            <span className="text-xs text-white/20">·</span>
            <span className="text-xs text-white/30">{post.readTime}</span>
          </div>

          <h1 className="heading-lg mb-6">{post.title}</h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <span key={tag} className="tag text-xs">{tag}</span>
            ))}
          </div>

          <p className="text-base text-white/60 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        </article>
      </main>
    </div>
  );
}
