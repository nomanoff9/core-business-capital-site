import { getDictionary } from '../dictionaries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Dict } from '@/types/dict';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const baseUrl = 'https://corebusinesscapital.com';
  
  const title = lang === 'es' 
    ? 'Política de Privacidad | Core Business Capital'
    : 'Privacy Policy | Core Business Capital';
  const description = lang === 'es'
    ? 'Lea nuestra política de privacidad para entender cómo Core Business Capital protege y maneja su información personal.'
    : 'Read our privacy policy to understand how Core Business Capital protects and handles your personal information.';
  
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/privacy`,
      languages: {
        'en': `${baseUrl}/en/privacy`,
        'es': `${baseUrl}/es/privacy`,
        'x-default': `${baseUrl}/en/privacy`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/privacy`,
      siteName: 'Core Business Capital',
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      images: [
        {
          url: `${baseUrl}/images/hero-bg.jpg`,
          width: 1200,
          height: 630,
          alt: 'Core Business Capital Privacy Policy',
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

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const dict: Dict = await getDictionary(lang as 'en' | 'es');

  const isSpanish = lang === 'es';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#fdf6ef] to-[#f5e6d3] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#3d1e08] mb-8">
            {isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
          </h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 text-[#3d2914]">
            <p className="text-sm text-gray-600">
              {isSpanish ? 'Última actualización: 8 de enero de 2026' : 'Last Updated: January 8, 2026'}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Introducción' : 'Introduction'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Core Business Capital ("nosotros", "nuestro" o "la Compañía") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web corebusinesscapital.com y cualquier subdominio relacionado (colectivamente, el "Sitio").'
                  : 'Core Business Capital ("we," "our," or "the Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website corebusinesscapital.com and any related subdomains (collectively, the "Site").'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Información que Recopilamos' : 'Information We Collect'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Podemos recopilar información sobre usted de varias maneras, incluyendo:'
                  : 'We may collect information about you in a variety of ways, including:'}
              </p>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-[#d48125]">
                  {isSpanish ? 'Información Personal' : 'Personal Information'}
                </h3>
                <p>
                  {isSpanish
                    ? 'Cuando completa una solicitud de préstamo o se comunica con nosotros, podemos recopilar información de identificación personal como su nombre, dirección de correo electrónico, número de teléfono, dirección comercial, información financiera comercial y otros detalles necesarios para procesar su solicitud de financiamiento.'
                    : 'When you complete a loan application or contact us, we may collect personally identifiable information such as your name, email address, phone number, business address, business financial information, and other details necessary to process your financing request.'}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-[#d48125]">
                  {isSpanish ? 'Datos de Uso y Cookies' : 'Usage Data and Cookies'}
                </h3>
                <p>
                  {isSpanish
                    ? 'Recopilamos automáticamente cierta información cuando visita nuestro Sitio, incluyendo su dirección IP, tipo de navegador, sistema operativo, páginas visitadas y la hora y fecha de su visita. Usamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro Sitio y mejorar su experiencia de navegación.'
                    : 'We automatically collect certain information when you visit our Site, including your IP address, browser type, operating system, pages visited, and the time and date of your visit. We use cookies and similar tracking technologies to track activity on our Site and improve your browsing experience.'}
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Cómo Usamos Su Información' : 'How We Use Your Information'}
              </h2>
              <p>
                {isSpanish ? 'Usamos la información recopilada para:' : 'We use the information we collect to:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {isSpanish
                    ? 'Procesar y evaluar sus solicitudes de financiamiento'
                    : 'Process and evaluate your financing applications'}
                </li>
                <li>
                  {isSpanish
                    ? 'Comunicarnos con usted sobre su solicitud y nuestros servicios'
                    : 'Communicate with you about your application and our services'}
                </li>
                <li>
                  {isSpanish
                    ? 'Enviarle información de marketing sobre productos de financiamiento que puedan interesarle'
                    : 'Send you marketing information about financing products that may interest you'}
                </li>
                <li>
                  {isSpanish
                    ? 'Mejorar nuestro sitio web y experiencia del cliente'
                    : 'Improve our website and customer experience'}
                </li>
                <li>
                  {isSpanish
                    ? 'Cumplir con obligaciones legales y regulatorias'
                    : 'Comply with legal and regulatory obligations'}
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Compartir Su Información' : 'Sharing Your Information'}
              </h2>
              <p className="font-semibold text-[#3d1e08]">
                {isSpanish
                  ? 'No vendemos su información personal.'
                  : 'We do not sell your personal information.'}
              </p>
              <p>
                {isSpanish
                  ? 'Su información permanece dentro de nuestra empresa y solo se comparte con socios de préstamo en relación con solicitudes de financiamiento individuales que usted inicia. Específicamente, podemos compartir su información con:'
                  : 'Your information remains in-house and is only shared with lending partners in connection with individual funding requests that you initiate. Specifically, we may share your information with:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {isSpanish
                    ? 'Socios de préstamo y instituciones financieras para procesar su solicitud de financiamiento específica'
                    : 'Lending partners and financial institutions to process your specific financing request'}
                </li>
                <li>
                  {isSpanish
                    ? 'Proveedores de servicios que nos ayudan a operar nuestro negocio (por ejemplo, alojamiento web, análisis)'
                    : 'Service providers who assist us in operating our business (e.g., web hosting, analytics)'}
                </li>
                <li>
                  {isSpanish
                    ? 'Autoridades legales cuando sea requerido por ley o para proteger nuestros derechos'
                    : 'Legal authorities when required by law or to protect our rights'}
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Remarketing y Publicidad' : 'Remarketing and Advertising'}
              </h2>
              <p>
                {isSpanish
                  ? 'Podemos usar cookies y tecnologías de seguimiento para mostrarle anuncios dirigidos basados en su visita a nuestro Sitio. Esto nos ayuda a llegar a visitantes anteriores con información relevante sobre nuestros servicios de financiamiento. Puede optar por no recibir publicidad basada en intereses visitando las herramientas de preferencia de anuncios proporcionadas por la Iniciativa de Publicidad en Red (NAI) o la Alianza de Publicidad Digital (DAA).'
                  : 'We may use cookies and tracking technologies to display targeted advertisements to you based on your visit to our Site. This helps us reach previous visitors with relevant information about our financing services. You can opt out of interest-based advertising by visiting the ad preference tools provided by the Network Advertising Initiative (NAI) or Digital Advertising Alliance (DAA).'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Seguridad de Datos' : 'Data Security'}
              </h2>
              <p>
                {isSpanish
                  ? 'Implementamos medidas de seguridad razonables para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro, y no podemos garantizar seguridad absoluta.'
                  : 'We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Retención de Datos' : 'Data Retention'}
              </h2>
              <p>
                {isSpanish
                  ? 'Retenemos su información personal durante el tiempo que sea necesario para cumplir con los propósitos descritos en esta Política de Privacidad, a menos que la ley requiera o permita un período de retención más largo.'
                  : 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Sus Derechos' : 'Your Rights'}
              </h2>
              <p>
                {isSpanish
                  ? 'Dependiendo de su ubicación, puede tener ciertos derechos con respecto a su información personal, incluyendo:'
                  : 'Depending on your location, you may have certain rights regarding your personal information, including:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {isSpanish
                    ? 'El derecho a acceder a la información personal que tenemos sobre usted'
                    : 'The right to access the personal information we hold about you'}
                </li>
                <li>
                  {isSpanish
                    ? 'El derecho a solicitar la corrección de información inexacta'
                    : 'The right to request correction of inaccurate information'}
                </li>
                <li>
                  {isSpanish
                    ? 'El derecho a solicitar la eliminación de su información personal'
                    : 'The right to request deletion of your personal information'}
                </li>
                <li>
                  {isSpanish
                    ? 'El derecho a optar por no recibir comunicaciones de marketing'
                    : 'The right to opt out of marketing communications'}
                </li>
              </ul>
              <p>
                {isSpanish
                  ? 'Para ejercer cualquiera de estos derechos, contáctenos usando la información proporcionada a continuación.'
                  : 'To exercise any of these rights, please contact us using the information provided below.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Privacidad de Menores' : 'Children\'s Privacy'}
              </h2>
              <p>
                {isSpanish
                  ? 'Nuestros servicios no están dirigidos a personas menores de 18 años. No recopilamos conscientemente información personal de menores. Si nos damos cuenta de que hemos recopilado información personal de un menor, tomaremos medidas para eliminar esa información.'
                  : 'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have collected personal information from a minor, we will take steps to delete that information.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Cambios a Esta Política' : 'Changes to This Policy'}
              </h2>
              <p>
                {isSpanish
                  ? 'Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última actualización". Le recomendamos revisar esta Política de Privacidad periódicamente.'
                  : 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Contáctenos' : 'Contact Us'}
              </h2>
              <p>
                {isSpanish
                  ? 'Si tiene preguntas o inquietudes sobre esta Política de Privacidad o nuestras prácticas de datos, contáctenos en:'
                  : 'If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:'}
              </p>
              <div className="bg-[#fdf6ef] p-4 rounded-lg">
                <p className="font-semibold">Core Business Capital</p>
                <p>
                  {isSpanish ? 'Correo electrónico: ' : 'Email: '}
                  <a href="mailto:info@corebusinesscapital.com" className="text-[#c06b29] hover:underline">
                    info@corebusinesscapital.com
                  </a>
                </p>
                <p>
                  {isSpanish ? 'Teléfono: ' : 'Phone: '}
                  <a href="tel:17202223396" className="text-[#c06b29] hover:underline">
                    (720) 222-3396
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
