'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname?.split('/')[1] === 'es' ? 'es' : 'en';

  const content = {
    en: {
      title: '404 - Page Not Found',
      heading: 'Page Not Found',
      message: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      homeButton: 'Go to Home',
      servicesButton: 'View Services',
    },
    es: {
      title: '404 - Página No Encontrada',
      heading: 'Página No Encontrada',
      message: 'La página que busca puede haber sido eliminada, cambiado de nombre o estar temporalmente no disponible.',
      homeButton: 'Ir al Inicio',
      servicesButton: 'Ver Servicios',
    },
  };

  const t = content[lang as keyof typeof content] || content.en;

  return (
    <html lang={lang}>
      <head>
        <title>{t.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
          <div className="max-w-md w-full text-center space-y-8">
            {/* 404 Number */}
            <div className="space-y-2">
              <h1 className="text-9xl font-bold text-gray-800" style={{ lineHeight: '1' }}>
                404
              </h1>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#ea9a20' }}></div>
            </div>

            {/* Message */}
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-gray-700">
                {t.heading}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t.message}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href={`/${lang}`}
                className="inline-block px-8 py-4 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 no-underline"
                style={{ 
                  backgroundColor: '#ea9a20',
                  transform: 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d48125';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ea9a20';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {t.homeButton}
              </Link>
              
              <Link
                href={`/${lang}/services`}
                className="inline-block px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 no-underline"
                style={{ 
                  border: '2px solid #ea9a20',
                  color: '#ea9a20',
                  backgroundColor: 'white',
                  transform: 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ea9a20';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#ea9a20';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {t.servicesButton}
              </Link>
            </div>

            {/* Additional Help */}
            <div className="pt-8 text-sm text-gray-500">
              <p>
                {lang === 'en' 
                  ? 'If you believe this is an error, please contact us.' 
                  : 'Si cree que esto es un error, contáctenos.'}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
