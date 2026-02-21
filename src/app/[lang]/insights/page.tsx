import { getDictionary } from '../dictionaries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NextImage from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import { articles } from '@/lib/articles';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const baseUrl = 'https://corebusinesscapital.com';

  const title =
    lang === 'es'
      ? 'Perspectivas y Noticias Empresariales | Core Business Capital'
      : 'Business Insights & News | Core Business Capital';
  const description =
    lang === 'es'
      ? 'Manténgase informado con las últimas actualizaciones sobre financiamiento para pequeñas empresas, estrategias fiscales y oportunidades de fondos.'
      : 'Stay informed with the latest updates on small business financing, tax strategies, and funding opportunities.';

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/insights`,
      languages: {
        en: `${baseUrl}/en/insights`,
        es: `${baseUrl}/es/insights`,
        'x-default': `${baseUrl}/en/insights`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/insights`,
      siteName: 'Core Business Capital',
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const dict = await getDictionary(lang as 'en' | 'es');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>

        {/* Hero Section */}
        <section style={{ background: 'linear-gradient(135deg, #3d1e08 0%, #c06b29 50%, #d48125 100%)', padding: '4rem 1rem 3.5rem' }}>
          <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.35rem 1rem', borderRadius: '999px', marginBottom: '1rem' }}>
              {lang === 'es' ? 'Perspectivas' : 'Insights'}
            </span>
            <h1 style={{ color: '#ffffff', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.2, marginBottom: '1rem' }}>
              {dict.insights.pageTitle}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.1rem', maxWidth: '36rem', margin: '0 auto' }}>
              {dict.insights.pageSubtitle}
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '3.5rem 1rem' }}>
          {sortedArticles.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '1.1rem' }}>{dict.insights.noArticles}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {sortedArticles.map((article) => (
                <div
                  key={article.slug}
                  style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.09)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/${lang}/insights/${article.slug}`}
                    style={{ display: 'block', position: 'relative', height: '210px', overflow: 'hidden', flexShrink: 0 }}
                    aria-label={article.title[lang as 'en' | 'es']}
                    tabIndex={-1}
                  >
                    {article.thumbnail ? (
                      <NextImage
                        src={article.thumbnail}
                        alt={article.title[lang as 'en' | 'es']}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3d1e08, #d48125)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '2.5rem', fontWeight: 700 }}>CBC</span>
                      </div>
                    )}
                    {/* Category badge */}
                    <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', backgroundColor: '#3d1e08', color: '#f1bb17', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.25rem 0.65rem', borderRadius: '999px', zIndex: 10 }}>
                      {article.category}
                    </span>
                  </Link>

                  {/* Card body */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* Reading time */}
                    <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                      {article.readingTime} {dict.insights.minuteRead}
                    </p>

                    {/* Title */}
                    <h2 style={{ marginBottom: '0.75rem', lineHeight: 1.35 }}>
                      <Link
                        href={`/${lang}/insights/${article.slug}`}
                        style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }}
                      >
                        {article.title[lang as 'en' | 'es']}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.65, flex: 1, marginBottom: '1rem' }}>
                      {article.excerpt[lang as 'en' | 'es']}
                    </p>

                    {/* Card footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                      <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                        {formatDate(article.date)}
                      </span>
                      <Link
                        href={`/${lang}/insights/${article.slug}`}
                        style={{ color: '#c06b29', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}
                        aria-label={`Read more: ${article.title[lang as 'en' | 'es']}`}
                      >
                        {dict.insights.readMore} →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Banner */}
        <div style={{ backgroundColor: '#3d1e08', padding: '3.5rem 1rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '36rem', margin: '0 auto' }}>
            <h2 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '1rem' }}>{dict.insights.ctaTitle}</h2>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', marginBottom: '2rem' }}>{dict.insights.ctaDesc}</p>
            <a
              href="https://app.corebusinesscapital.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', backgroundColor: '#f1bb17', color: '#3d1e08', padding: '1rem 2.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
            >
              {dict.insights.ctaButton}
            </a>
          </div>
        </div>

      </main>
      <Banner dict={dict} />
      <Footer dict={dict} lang={lang} />
    </>
  );
}
