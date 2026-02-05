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
    ? 'Términos de Servicio | Core Business Capital'
    : 'Terms of Service | Core Business Capital';
  const description = lang === 'es'
    ? 'Lea nuestros términos de servicio para entender las condiciones de uso de los servicios de Core Business Capital.'
    : 'Read our terms of service to understand the conditions for using Core Business Capital services.';
  
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/terms`,
      languages: {
        'en': `${baseUrl}/en/terms`,
        'es': `${baseUrl}/es/terms`,
        'x-default': `${baseUrl}/en/terms`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/terms`,
      siteName: 'Core Business Capital',
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      images: [
        {
          url: `${baseUrl}/images/hero-bg.jpg`,
          width: 1200,
          height: 630,
          alt: 'Core Business Capital Terms of Service',
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

export default async function TermsOfServicePage({
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
            {isSpanish ? 'Términos de Servicio' : 'Terms of Service'}
          </h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 text-[#3d2914]">
            <p className="text-sm text-gray-600">
              {isSpanish ? 'Última actualización: 8 de enero de 2026' : 'Last Updated: January 8, 2026'}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Aceptación de Términos' : 'Acceptance of Terms'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Al acceder o usar el sitio web de Core Business Capital (el "Sitio") y nuestros servicios, usted acepta estar sujeto a estos Términos de Servicio ("Términos"). Si no está de acuerdo con estos Términos, por favor no use nuestro Sitio o servicios.'
                  : 'By accessing or using the Core Business Capital website (the "Site") and our services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site or services.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Descripción de Servicios' : 'Description of Services'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Core Business Capital es una agencia de préstamos establecida en 2016 que se especializa en conectar propietarios de pequeñas empresas con soluciones de financiamiento. Facilitamos solicitudes de préstamos y trabajamos con varios socios de préstamo para ayudarlo a asegurar financiamiento a largo plazo y bajo costo. Nuestros servicios incluyen, pero no se limitan a:'
                  : 'Core Business Capital is a loan agency established in 2016 that specializes in connecting small business owners with financing solutions. We facilitate loan applications and work with various lending partners to help you secure long-term, low-cost financing. Our services include, but are not limited to:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{isSpanish ? 'Préstamos SBA de EE. UU.' : 'U.S. SBA Loans'}</li>
                <li>{isSpanish ? 'Préstamos a Plazo' : 'Term Loans'}</li>
                <li>{isSpanish ? 'Financiamiento de Equipos' : 'Equipment Financing'}</li>
                <li>{isSpanish ? 'Préstamos de Capital de Trabajo' : 'Working Capital Loans'}</li>
                <li>{isSpanish ? 'Líneas de Crédito' : 'Lines of Credit'}</li>
                <li>{isSpanish ? 'Financiamiento de Facturas' : 'Invoice Financing'}</li>
                <li>{isSpanish ? 'Financiamiento de Nómina' : 'Payroll Financing'}</li>
                <li>{isSpanish ? 'Adelantos de Efectivo para Negocios' : 'Business Cash Advances'}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Elegibilidad' : 'Eligibility'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Para usar nuestros servicios, usted debe:'
                  : 'To use our services, you must:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {isSpanish
                    ? 'Tener al menos 18 años de edad'
                    : 'Be at least 18 years of age'}
                </li>
                <li>
                  {isSpanish
                    ? 'Ser propietario o representante autorizado de un negocio'
                    : 'Be a business owner or authorized representative of a business'}
                </li>
                <li>
                  {isSpanish
                    ? 'Proporcionar información precisa y completa en todas las solicitudes'
                    : 'Provide accurate and complete information in all applications'}
                </li>
                <li>
                  {isSpanish
                    ? 'Cumplir con todas las leyes y regulaciones aplicables'
                    : 'Comply with all applicable laws and regulations'}
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Proceso de Solicitud' : 'Application Process'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Cuando envía una solicitud de financiamiento a través de nuestro Sitio:'
                  : 'When you submit a financing application through our Site:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {isSpanish
                    ? 'Usted certifica que toda la información proporcionada es verdadera y precisa'
                    : 'You certify that all information provided is true and accurate'}
                </li>
                <li>
                  {isSpanish
                    ? 'Nos autoriza a compartir su solicitud con socios de préstamo para evaluar opciones de financiamiento'
                    : 'You authorize us to share your application with lending partners to evaluate financing options'}
                </li>
                <li>
                  {isSpanish
                    ? 'Entiende que enviar una solicitud no garantiza la aprobación de financiamiento'
                    : 'You understand that submitting an application does not guarantee financing approval'}
                </li>
                <li>
                  {isSpanish
                    ? 'Acepta que los términos finales del préstamo están determinados por el socio de préstamo, no por Core Business Capital'
                    : 'You agree that final loan terms are determined by the lending partner, not Core Business Capital'}
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Rol de Core Business Capital' : 'Role of Core Business Capital'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Core Business Capital actúa como facilitador entre usted y nuestros socios de préstamo. Es importante entender que:'
                  : 'Core Business Capital acts as a facilitator between you and our lending partners. It is important to understand that:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {isSpanish
                    ? 'No somos un prestamista directo'
                    : 'We are not a direct lender'}
                </li>
                <li>
                  {isSpanish
                    ? 'No garantizamos la aprobación de financiamiento ni tasas o términos específicos'
                    : 'We do not guarantee financing approval or specific rates or terms'}
                </li>
                <li>
                  {isSpanish
                    ? 'Las decisiones finales de financiamiento las toman nuestros socios de préstamo'
                    : 'Final financing decisions are made by our lending partners'}
                </li>
                <li>
                  {isSpanish
                    ? 'Trabajamos para encontrar la mejor opción de financiamiento para su situación específica'
                    : 'We work to find the best financing option for your specific situation'}
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Uso del Sitio Web' : 'Website Use'}
              </h2>
              <p>
                {isSpanish ? 'Usted acepta no:' : 'You agree not to:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {isSpanish
                    ? 'Usar el Sitio para cualquier propósito ilegal o no autorizado'
                    : 'Use the Site for any unlawful or unauthorized purpose'}
                </li>
                <li>
                  {isSpanish
                    ? 'Intentar obtener acceso no autorizado a cualquier parte del Sitio'
                    : 'Attempt to gain unauthorized access to any portion of the Site'}
                </li>
                <li>
                  {isSpanish
                    ? 'Interferir con o interrumpir la operación del Sitio'
                    : 'Interfere with or disrupt the operation of the Site'}
                </li>
                <li>
                  {isSpanish
                    ? 'Proporcionar información falsa o engañosa'
                    : 'Provide false or misleading information'}
                </li>
                <li>
                  {isSpanish
                    ? 'Violar cualquier ley, regulación o estos Términos'
                    : 'Violate any law, regulation, or these Terms'}
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Propiedad Intelectual' : 'Intellectual Property'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Todo el contenido del Sitio, incluyendo texto, gráficos, logotipos, imágenes y software, es propiedad de Core Business Capital o sus licenciantes y está protegido por las leyes de derechos de autor y marcas registradas. No puede usar, reproducir o distribuir ningún contenido del Sitio sin nuestro permiso previo por escrito.'
                  : 'All content on the Site, including text, graphics, logos, images, and software, is the property of Core Business Capital or its licensors and is protected by copyright and trademark laws. You may not use, reproduce, or distribute any content from the Site without our prior written permission.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Descargo de Responsabilidad' : 'Disclaimer of Warranties'}
              </h2>
              <p>
                {isSpanish 
                  ? 'EL SITIO Y LOS SERVICIOS SE PROPORCIONAN "TAL CUAL" Y "SEGÚN DISPONIBILIDAD" SIN GARANTÍAS DE NINGÚN TIPO, YA SEAN EXPRESAS O IMPLÍCITAS. NO GARANTIZAMOS QUE EL SITIO ESTARÁ LIBRE DE ERRORES, SEGURO O DISPONIBLE EN TODO MOMENTO.'
                  : 'THE SITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SITE WILL BE ERROR-FREE, SECURE, OR AVAILABLE AT ALL TIMES.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Limitación de Responsabilidad' : 'Limitation of Liability'}
              </h2>
              <p>
                {isSpanish 
                  ? 'EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, CORE BUSINESS CAPITAL NO SERÁ RESPONSABLE POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES O PUNITIVOS, NI POR PÉRDIDA DE BENEFICIOS, INGRESOS, DATOS O OPORTUNIDADES DE NEGOCIO QUE SURJAN DE O EN CONEXIÓN CON SU USO DEL SITIO O NUESTROS SERVICIOS.'
                  : 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, CORE BUSINESS CAPITAL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SITE OR OUR SERVICES.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Indemnización' : 'Indemnification'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Usted acepta indemnizar, defender y mantener indemne a Core Business Capital, sus funcionarios, directores, empleados y agentes de cualquier reclamo, responsabilidad, daño, pérdida y gasto (incluyendo honorarios razonables de abogados) que surjan de su uso del Sitio, su violación de estos Términos, o su violación de cualquier derecho de terceros.'
                  : 'You agree to indemnify, defend, and hold harmless Core Business Capital, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorneys\' fees) arising out of your use of the Site, your violation of these Terms, or your violation of any rights of a third party.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Ley Aplicable' : 'Governing Law'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Estos Términos se regirán e interpretarán de acuerdo con las leyes del Estado de Colorado, Estados Unidos, sin tener en cuenta sus principios de conflicto de leyes. Cualquier disputa que surja de estos Términos se resolverá en los tribunales ubicados en Colorado.'
                  : 'These Terms shall be governed by and construed in accordance with the laws of the State of Colorado, United States, without regard to its conflict of law principles. Any disputes arising from these Terms shall be resolved in the courts located in Colorado.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Cambios a Estos Términos' : 'Changes to These Terms'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Nos reservamos el derecho de modificar estos Términos en cualquier momento. Publicaremos cualquier cambio en esta página y actualizaremos la fecha de "Última actualización". Su uso continuado del Sitio después de cualquier cambio constituye su aceptación de los nuevos Términos.'
                  : 'We reserve the right to modify these Terms at any time. We will post any changes on this page and update the "Last Updated" date. Your continued use of the Site after any changes constitutes your acceptance of the new Terms.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Divisibilidad' : 'Severability'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Si alguna disposición de estos Términos se considera inválida o inaplicable, las disposiciones restantes continuarán en pleno vigor y efecto.'
                  : 'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Acuerdo Completo' : 'Entire Agreement'}
              </h2>
              <p>
                {isSpanish 
                  ? 'Estos Términos, junto con nuestra Política de Privacidad, constituyen el acuerdo completo entre usted y Core Business Capital con respecto al uso del Sitio y nuestros servicios.'
                  : 'These Terms, together with our Privacy Policy, constitute the entire agreement between you and Core Business Capital regarding the use of the Site and our services.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#c06b29]">
                {isSpanish ? 'Contáctenos' : 'Contact Us'}
              </h2>
              <p>
                {isSpanish
                  ? 'Si tiene preguntas sobre estos Términos de Servicio, contáctenos en:'
                  : 'If you have questions about these Terms of Service, please contact us at:'}
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
