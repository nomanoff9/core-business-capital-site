import { getDictionary } from '../dictionaries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import type { Dict } from '@/types/dict';
import Script from 'next/script';
import NextImage from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const baseUrl = 'https://corebusinesscapital.com';
  
  const title = lang === 'es' 
    ? 'Sobre Nosotros | Core Business Capital'
    : 'About Us | Core Business Capital';
  const description = lang === 'es'
    ? 'Core Business Capital ha ayudado a miles de pequeñas empresas a obtener financiamiento desde 2016. Calificación 5.0 estrellas en Google, A+ en BBB. Sirviendo a los 50 estados desde Colorado.'
    : 'Core Business Capital has helped thousands of small businesses secure funding since 2016. 5.0 Google rating, A+ BBB rating. Serving all 50 states from Colorado.';
  
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/about`,
      languages: {
        'en': `${baseUrl}/en/about`,
        'es': `${baseUrl}/es/about`,
        'x-default': `${baseUrl}/en/about`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/about`,
      siteName: 'Core Business Capital',
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      images: [
        {
          url: `${baseUrl}/images/hero-bg.jpg`,
          width: 1200,
          height: 630,
          alt: 'About Core Business Capital - Trusted Business Funding Since 2016',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/hero-bg.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const dict: Dict = await getDictionary(lang as 'en' | 'es');

  const isSpanish = lang === 'es';

  // Organization Schema for E-E-A-T
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Core Business Capital",
    "alternateName": "CBC",
    "description": isSpanish 
      ? "Agencia líder de préstamos para pequeñas empresas en Estados Unidos desde 2016."
      : "Premier loan agency for small business funding in the United States since 2016.",
    "foundingDate": "2016",
    "url": "https://corebusinesscapital.com",
    "logo": "https://corebusinesscapital.com/images/logo.png",
    "telephone": "+1-720-222-3396",
    "email": "info@corebusinesscapital.com",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Colorado",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.linkedin.com/company/corebusinesscapital",
      "https://www.yelp.com/biz/core-business-capital",
      "https://www.bbb.org/us/co/core-business-capital"
    ],
    "knowsAbout": [
      "SBA Loans",
      "Small Business Financing",
      "Term Loans",
      "Equipment Financing",
      "Working Capital Loans",
      "Lines of Credit",
      "Invoice Financing",
      "Business Cash Advances"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Funding Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SBA Loans" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Term Loans" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Equipment Financing" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Working Capital Loans" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lines of Credit" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Invoice Financing" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Cash Advances" } }
      ]
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isSpanish ? "Inicio" : "Home",
        "item": `https://corebusinesscapital.com/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isSpanish ? "Sobre Nosotros" : "About Us",
        "item": `https://corebusinesscapital.com/${lang}/about`
      }
    ]
  };

  const content = {
    en: {
      pageTitle: "About Core Business Capital",
      missionTitle: "Our Mission",
      missionText: "To secure the longest term and lowest cost financing available for small business owners across America.",
      storyTitle: "Our Story",
      storyP1: "Founded in 2016, Core Business Capital was built on a simple principle: small business owners deserve access to the same quality financing options that large corporations enjoy. We started in Colorado with a vision to help entrepreneurs across all 50 states achieve their business goals.",
      storyP2: "Over the years, we've helped thousands of businesses secure the funding they need—from SBA loans up to $5 million to working capital solutions for day-to-day operations. Our team brings decades of combined experience in commercial lending, ensuring every client receives personalized guidance through the financing process.",
      storyP3: "Today, we maintain a perfect 5.0-star Google rating and an A+ rating from the Better Business Bureau, reflecting our commitment to transparency, integrity, and exceptional service.",
      whyChooseTitle: "Why Choose Us?",
      experience: "10+ Years Experience",
      experienceDesc: "Helping small businesses secure funding since 2016",
      nationwide: "Nationwide Service",
      nationwideDesc: "Proudly serving all 50 states from our Colorado base",
      rating: "5.0 Star Rating",
      ratingDesc: "Perfect Google rating with A+ BBB accreditation",
      programs: "8 Financing Programs",
      programsDesc: "From SBA loans to cash advances, we have solutions for every need",
      valuesTitle: "Our Values",
      transparency: "Transparency",
      transparencyDesc: "No hidden fees, no surprises. We explain every term clearly.",
      expertise: "Expertise",
      expertiseDesc: "Our team has decades of combined experience in commercial lending.",
      commitment: "Commitment",
      commitmentDesc: "We're dedicated to finding the best financing solution for your unique situation.",
      integrity: "Integrity",
      integrityDesc: "We only recommend products that genuinely benefit your business.",
      teamTitle: "Our Team",
      teamDesc: "Core Business Capital is led by experienced finance professionals who understand the challenges small business owners face. Our team includes specialists in SBA lending, equipment financing, and alternative business funding solutions.",
      ctaTitle: "Ready to Get Started?",
      ctaText: "Let us help you secure the funding your business deserves.",
      ctaButton: "Apply Now"
    },
    es: {
      pageTitle: "Sobre Core Business Capital",
      missionTitle: "Nuestra Misión",
      missionText: "Asegurar el financiamiento con el plazo más largo y el costo más bajo disponible para propietarios de pequeñas empresas en toda América.",
      storyTitle: "Nuestra Historia",
      storyP1: "Fundada en 2016, Core Business Capital se construyó sobre un principio simple: los propietarios de pequeñas empresas merecen acceso a las mismas opciones de financiamiento de calidad que disfrutan las grandes corporaciones. Comenzamos en Colorado con la visión de ayudar a emprendedores en los 50 estados a alcanzar sus objetivos comerciales.",
      storyP2: "A lo largo de los años, hemos ayudado a miles de empresas a obtener el financiamiento que necesitan, desde préstamos SBA de hasta $5 millones hasta soluciones de capital de trabajo para operaciones diarias. Nuestro equipo aporta décadas de experiencia combinada en préstamos comerciales, asegurando que cada cliente reciba orientación personalizada durante el proceso de financiamiento.",
      storyP3: "Hoy, mantenemos una calificación perfecta de 5.0 estrellas en Google y una calificación A+ del Better Business Bureau, reflejando nuestro compromiso con la transparencia, integridad y servicio excepcional.",
      whyChooseTitle: "¿Por Qué Elegirnos?",
      experience: "10+ Años de Experiencia",
      experienceDesc: "Ayudando a pequeñas empresas a obtener financiamiento desde 2016",
      nationwide: "Servicio Nacional",
      nationwideDesc: "Sirviendo con orgullo a los 50 estados desde nuestra base en Colorado",
      rating: "Calificación 5.0 Estrellas",
      ratingDesc: "Calificación perfecta en Google con acreditación A+ de BBB",
      programs: "8 Programas de Financiamiento",
      programsDesc: "Desde préstamos SBA hasta adelantos de efectivo, tenemos soluciones para cada necesidad",
      valuesTitle: "Nuestros Valores",
      transparency: "Transparencia",
      transparencyDesc: "Sin cargos ocultos, sin sorpresas. Explicamos cada término claramente.",
      expertise: "Experiencia",
      expertiseDesc: "Nuestro equipo tiene décadas de experiencia combinada en préstamos comerciales.",
      commitment: "Compromiso",
      commitmentDesc: "Estamos dedicados a encontrar la mejor solución de financiamiento para su situación única.",
      integrity: "Integridad",
      integrityDesc: "Solo recomendamos productos que genuinamente beneficien a su negocio.",
      teamTitle: "Nuestro Equipo",
      teamDesc: "Core Business Capital está dirigida por profesionales financieros experimentados que entienden los desafíos que enfrentan los propietarios de pequeñas empresas. Nuestro equipo incluye especialistas en préstamos SBA, financiamiento de equipos y soluciones alternativas de financiamiento empresarial.",
      ctaTitle: "¿Listo para Comenzar?",
      ctaText: "Permítanos ayudarle a obtener el financiamiento que su empresa merece.",
      ctaButton: "Aplicar Ahora"
    }
  };

  const t = content[lang as 'en' | 'es'];

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#fdf6ef] to-[#f5e6d3]">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3d1e08] mb-6">
              {t.pageTitle}
            </h1>
            <div className="bg-gradient-to-r from-[#4d2508] to-[#3d1e08] rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-4">{t.missionTitle}</h2>
              <p className="text-xl leading-relaxed opacity-95">
                {t.missionText}
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#3d1e08] mb-8 text-center">
              {t.storyTitle}
            </h2>
            <div className="space-y-6 text-lg text-[#3d2914] leading-relaxed">
              <p>{t.storyP1}</p>
              <p>{t.storyP2}</p>
              <p>{t.storyP3}</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#3d1e08] mb-12 text-center">
              {t.whyChooseTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Experience Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f1bb17] to-[#d48125] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#3d1e08] mb-2">{t.experience}</h3>
                <p className="text-sm text-[#5a3921]">{t.experienceDesc}</p>
              </div>

              {/* Nationwide Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f1bb17] to-[#d48125] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#3d1e08] mb-2">{t.nationwide}</h3>
                <p className="text-sm text-[#5a3921]">{t.nationwideDesc}</p>
              </div>

              {/* Rating Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f1bb17] to-[#d48125] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#3d1e08] mb-2">{t.rating}</h3>
                <p className="text-sm text-[#5a3921]">{t.ratingDesc}</p>
              </div>

              {/* Programs Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f1bb17] to-[#d48125] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#3d1e08] mb-2">{t.programs}</h3>
                <p className="text-sm text-[#5a3921]">{t.programsDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#3d1e08] mb-12 text-center">
              {t.valuesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#fff3c7] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#d48125]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3d1e08] mb-2">{t.transparency}</h3>
                  <p className="text-[#5a3921]">{t.transparencyDesc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#fff3c7] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#d48125]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3d1e08] mb-2">{t.expertise}</h3>
                  <p className="text-[#5a3921]">{t.expertiseDesc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#fff3c7] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#d48125]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3d1e08] mb-2">{t.commitment}</h3>
                  <p className="text-[#5a3921]">{t.commitmentDesc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#fff3c7] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#d48125]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3d1e08] mb-2">{t.integrity}</h3>
                  <p className="text-[#5a3921]">{t.integrityDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center gap-3 bg-white rounded-lg px-6 py-4 shadow-md">
                <NextImage
                  src="/images/google-5star.png"
                  alt="Google 5 Star Rating"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <div>
                  <p className="font-bold text-[#3d1e08]">5.0 Stars</p>
                  <p className="text-sm text-[#5a3921]">Google Reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg px-6 py-4 shadow-md">
                <NextImage
                  src="/images/bbb-aplus.png"
                  alt="BBB A+ Rating"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <div>
                  <p className="font-bold text-[#3d1e08]">A+ Rating</p>
                  <p className="text-sm text-[#5a3921]">Better Business Bureau</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#3d1e08] mb-6">
              {t.teamTitle}
            </h2>
            <p className="text-lg text-[#5a3921] leading-relaxed">
              {t.teamDesc}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#3d1e08] mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-[#5a3921] mb-8">
              {t.ctaText}
            </p>
            <a
              href="https://app.corebusinesscapital.com/en/"
              className="inline-block bg-gradient-to-r from-[#dd5d20] to-[#f27721] text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {t.ctaButton}
            </a>
          </div>
        </section>
      </main>
      <Banner dict={dict} />
      <Footer dict={dict} lang={lang} />
    </>
  );
}