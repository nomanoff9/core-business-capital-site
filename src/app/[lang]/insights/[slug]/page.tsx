import { getDictionary } from '../../dictionaries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NextImage from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import Script from 'next/script';
import { articles, getArticleBySlug, type ArticleContentBlock } from '@/lib/articles';

export async function generateStaticParams() {
  const langs = ['en', 'es'];
  return langs.flatMap((lang) =>
    articles.map((article) => ({ lang, slug: article.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const baseUrl = 'https://corebusinesscapital.com';
  const title = `${article.title[lang as 'en' | 'es']} | Core Business Capital`;
  const description = article.excerpt[lang as 'en' | 'es'];
  const url = `${baseUrl}/${lang}/insights/${slug}`;
  const imageUrl = article.thumbnail
    ? `${baseUrl}${article.thumbnail}`
    : `${baseUrl}/images/hero-bg.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/insights/${slug}`,
        es: `${baseUrl}/es/insights/${slug}`,
        'x-default': `${baseUrl}/en/insights/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Core Business Capital',
      type: 'article',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      publishedTime: article.date,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title[lang as 'en' | 'es'] }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

function renderBlock(block: ArticleContentBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} style={{ color: '#1a1a1a', lineHeight: '1.8', marginBottom: '1.25rem', fontSize: '1rem' }}>
          {block.text}
        </p>
      );
    case 'heading':
      return (
        <h2 key={index} style={{ color: '#3d1e08', fontWeight: 700, fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', lineHeight: '1.3' }}>
          {block.text}
        </h2>
      );
    case 'subheading':
      return (
        <h3 key={index} style={{ color: '#c06b29', fontWeight: 600, fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul key={index} style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.75rem', color: '#1a1a1a', marginBottom: '0.75rem', lineHeight: '1.7', fontSize: '1rem' }}>
              <span style={{ marginTop: '0.55rem', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d48125', flexShrink: 0, display: 'inline-block' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'note':
      return (
        <div key={index} style={{ margin: '2rem 0', padding: '1.25rem 1.5rem', borderRadius: '0.75rem', borderLeft: '4px solid #f1bb17', backgroundColor: '#fef9ec', color: '#5a3e00', fontSize: '0.95rem', lineHeight: '1.7' }}>
          <span style={{ fontWeight: 700, marginRight: '0.4rem' }}>⚠</span>
          {block.text}
        </div>
      );
    default:
      return null;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const dict = await getDictionary(lang as 'en' | 'es');
  const l = lang as 'en' | 'es';

  const formatDate = (dateStr: string) =>
    new Date(dateStr + 'T00:00:00').toLocaleDateString(
      lang === 'es' ? 'es-US' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );

  // JSON-LD Article schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[l],
    description: article.excerpt[l],
    datePublished: article.date,
    ...(article.thumbnail && {
      image: [`https://corebusinesscapital.com${article.thumbnail}`],
    }),
    author: {
      '@type': 'Organization',
      name: 'Core Business Capital',
      url: 'https://corebusinesscapital.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Core Business Capital',
      url: 'https://corebusinesscapital.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://corebusinesscapital.com/images/logo.png',
      },
    },
    url: `https://corebusinesscapital.com/${lang}/insights/${slug}`,
    inLanguage: lang === 'es' ? 'es' : 'en',
  };

  const contentBlocks = article.content[l];

  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>

        {/* Hero / Title Area */}
        <section style={{ background: 'linear-gradient(135deg, #3d1e08 0%, #c06b29 60%, #d48125 100%)', padding: '3.5rem 1rem 3rem' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>

            {/* Back link */}
            <Link
              href={`/${lang}/insights`}
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}
            >
              {dict.insights.backToInsights}
            </Link>

            {/* Category + reading time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                {article.category}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem' }}>
                {article.readingTime} {dict.insights.minuteRead}
              </span>
            </div>

            {/* Title */}
            <h1 style={{ color: '#ffffff', fontWeight: 800, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', lineHeight: 1.25, marginBottom: '1rem' }}>
              {article.title[l]}
            </h1>

            {/* Date */}
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: 0 }}>
              {dict.insights.publishedOn} {formatDate(article.date)}
            </p>
          </div>
        </section>

        {/* Article Body */}
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '2.5rem 1rem 4rem' }}>

          {/* Featured Thumbnail */}
          {article.thumbnail && (
            <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.15)', marginBottom: '2.5rem' }}>
              <NextImage
                src={article.thumbnail}
                alt={article.title[l]}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, 780px"
              />
            </div>
          )}

          {/* White reading card */}
          <article style={{ backgroundColor: '#ffffff', borderRadius: '1rem', padding: '2.5rem', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>

            {/* Lead / Excerpt */}
            <p style={{ color: '#5a3e00', fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.8, marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '2px solid #e5c9a0' }}>
              {article.excerpt[l]}
            </p>

            {/* Content Blocks */}
            {contentBlocks.map((block, i) => renderBlock(block, i))}

            {/* Divider */}
            <hr style={{ margin: '2.5rem 0', borderColor: '#e5e7eb', borderTopWidth: '1px' }} />

            {/* CTA */}
            <div style={{ backgroundColor: '#3d1e08', borderRadius: '1rem', padding: '2.5rem', textAlign: 'center' }}>
              <h2 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.75rem' }}>{dict.insights.ctaTitle}</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', fontSize: '1rem' }}>{dict.insights.ctaDesc}</p>
              <a
                href="https://app.corebusinesscapital.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', backgroundColor: '#f1bb17', color: '#3d1e08', padding: '1rem 2.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
              >
                {dict.insights.ctaButton}
              </a>
            </div>

            {/* Back link bottom */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link
                href={`/${lang}/insights`}
                style={{ color: '#c06b29', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}
              >
                {dict.insights.backToInsights}
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Banner dict={dict} />
      <Footer dict={dict} lang={lang} />
    </>
  );
}
