export type ArticleContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; text: string };

export interface Article {
  slug: string;
  date: string; // ISO date string (YYYY-MM-DD)
  category: string;
  readingTime: number; // minutes
  thumbnail?: string; // path relative to /public
  title: { en: string; es: string };
  excerpt: { en: string; es: string };
  content: { en: ArticleContentBlock[]; es: ArticleContentBlock[] };
}

export const articles: Article[] = [
  {
    slug: 'big-beautiful-bill-100-percent-bonus-depreciation',
    date: '2025-07-04',
    category: 'Tax & Financing',
    readingTime: 7,
    thumbnail: '/images/BBB thumbnail.jpg',
    title: {
      en: 'The "Big Beautiful Bill": 100% Bonus Depreciation and What It Means for You',
      es: 'La "Gran Hermosa Ley": La Depreciación Adicional del 100% y Qué Significa para Usted',
    },
    excerpt: {
      en: 'The One Big Beautiful Bill Act (OBBBA), signed July 4, 2025, permanently restores 100% bonus depreciation for most business assets. Here\'s what every business owner needs to know.',
      es: 'La Ley "One Big Beautiful Bill" (OBBBA), promulgada el 4 de julio de 2025, restaura permanentemente la depreciación adicional del 100% para la mayoría de los activos empresariales. Esto es lo que todo empresario necesita saber.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'The "Big Beautiful Bill" (formally the One Big Beautiful Bill Act, or OBBBA, signed into law on July 4, 2025) permanently restores and locks in 100% bonus depreciation (additional first-year depreciation under IRC Section 168(k)) for most qualifying business assets acquired and placed in service after January 19, 2025.',
        },
        {
          type: 'paragraph',
          text: 'This is a major win for business owners because it lets you immediately deduct the full cost of eligible investments in the year you place them in service, instead of spreading deductions over 5–39 years via regular MACRS depreciation. It dramatically accelerates tax savings, improves cash flow (you can often finance purchases and still deduct 100% right away), reduces current-year taxable income, and makes large capital investments far more attractive. It applies to both new and certain used property, with no overall dollar cap (unlike Section 179).',
        },
        {
          type: 'heading',
          text: 'Key Benefits for Business Owners',
        },
        {
          type: 'list',
          items: [
            'Immediate cash tax savings: A $500,000 piece of machinery bought and used in 2025+ can create a $500,000 deduction in year 1 (subject to your tax bracket and other limits), potentially saving tens or hundreds of thousands in taxes upfront.',
            'Better financing and reinvestment: You can borrow or use credit to buy assets and still get the full write-off immediately.',
            'Planning flexibility: You can elect out of 100% bonus (or elect a lower 40%/60% rate in the first applicable year) or pair it with Section 179 expensing.',
            'Growth incentive: Especially helpful for manufacturers, real estate investors, and any business buying equipment or improving facilities.',
            'Permanent: No phase-out like before (it was heading to 0% by 2027 without this bill).',
          ],
        },
        {
          type: 'paragraph',
          text: 'It also expands Section 179 immediate expensing (separate but complementary): The limit is now permanently $2.5 million (phased out dollar-for-dollar above $4 million in total qualifying purchases), indexed for inflation going forward.',
        },
        {
          type: 'heading',
          text: 'What Can You Invest In for a 100% Deduction?',
        },
        {
          type: 'paragraph',
          text: 'Here\'s what qualifies for 100% immediate write-off (bonus depreciation or the new QPP rules). Always confirm "acquired after Jan. 19, 2025" and "placed in service" rules, plus your specific facts (original use, business use percentage, etc.).',
        },
        {
          type: 'subheading',
          text: '1. Standard 100% Bonus Depreciation Assets (Permanent, Broad Category)',
        },
        {
          type: 'paragraph',
          text: 'Tangible MACRS property with a class life of 20 years or less, plus a few others:',
        },
        {
          type: 'list',
          items: [
            'Machinery, equipment, and tools — Factory machines, restaurant/kitchen equipment, medical/dental gear, construction equipment, etc.',
            'Office furniture, fixtures, and furnishings — Desks, chairs, shelving (typically 7-year property).',
            'Computers, peripherals, and off-the-shelf software.',
            'Qualified Improvement Property (QIP) — Interior improvements to nonresidential buildings: new lighting, HVAC (non-structural), flooring, walls/partitions, ceilings, electrical/plumbing upgrades for the interior. (Does not include building enlargement, elevators, or structural components.)',
            'Certain vehicles — Business-use trucks, vans, heavy SUVs (over 6,000 lbs GVWR often qualify for full 100% without luxury-auto caps); lighter passenger autos qualify but are subject to annual depreciation limits.',
            'Land improvements — Fences, sidewalks, landscaping (15-year property).',
            'Farm equipment and specified plants (farming businesses can elect this).',
          ],
        },
        {
          type: 'subheading',
          text: '2. New Qualified Production Property (QPP) – 100% Expensing (Elective, Temporary Window)',
        },
        {
          type: 'paragraph',
          text: 'This brand-new category under Section 168(n) is a game-changer for manufacturers: You can elect 100% immediate deduction on qualifying portions of nonresidential real property (i.e., factory/warehouse buildings or structural components) used as an integral part of qualified production activities in the U.S. or possessions.',
        },
        {
          type: 'paragraph',
          text: 'Qualifying activities generally involve substantial transformation of tangible personal property (manufacturing, certain agricultural/chemical production, or refining). Examples: turning raw materials into finished goods in a factory. Mere assembly, packaging, storage, or retail food/beverage prep does not qualify.',
        },
        {
          type: 'paragraph',
          text: 'What can be deducted at 100%: Structural walls, general lighting, HVAC, plumbing, insulation, etc., in the production areas of the building, as well as the building itself (or portions) if it meets the rules.',
        },
        {
          type: 'paragraph',
          text: 'Timing: Construction must generally begin after January 19, 2025 (and before 2029 in most cases), and be placed in service by Dec. 31, 2030 (or 2031 in some rules). An election is required on your return; recapture applies if you dispose of it within 10 years.',
        },
        {
          type: 'paragraph',
          text: 'This effectively turns what used to be 39-year straight-line depreciation on factory buildings into a full immediate write-off for qualifying manufacturing investments.',
        },
        {
          type: 'subheading',
          text: '3. Section 179 Expensing (Up to the New $2.5M Limit)',
        },
        {
          type: 'paragraph',
          text: 'You can use this for many of the same assets above (plus some qualified real property like roofs, HVAC, fire protection, security systems for nonresidential buildings) when bonus doesn\'t apply or you want to pick and choose.',
        },
        {
          type: 'heading',
          text: 'Important Notes',
        },
        {
          type: 'list',
          items: [
            'Used property often qualifies for bonus depreciation if it meets the acquisition rules (not from a related party, etc.).',
            'State conformity varies — some states don\'t follow the federal 100% bonus or QPP rules.',
            'Recapture and limitations still apply in some cases (e.g., if business use drops below 50%, or for QPP dispositions).',
            'Sound recording productions — a niche new addition that can also qualify in certain cases.',
          ],
        },
        {
          type: 'note',
          text: 'This is a powerful tax planning tool, but eligibility depends on precise facts (acquisition contracts, placed-in-service dates, business use %, elections). Strongly recommend working with a CPA or tax advisor familiar with the OBBBA (and IRS Notice 2026-11 guidance) to maximize it and avoid pitfalls. Rules are still being fleshed out in some areas, so timely elections and documentation matter.',
        },
      ],
      es: [
        {
          type: 'paragraph',
          text: 'La "Gran Hermosa Ley" (formalmente la Ley One Big Beautiful Bill, o OBBBA, promulgada el 4 de julio de 2025) restaura permanentemente y consolida la depreciación adicional del 100% (depreciación adicional de primer año bajo la Sección 168(k) del IRC) para la mayoría de los activos empresariales calificados adquiridos y puestos en servicio después del 19 de enero de 2025.',
        },
        {
          type: 'paragraph',
          text: 'Este es un gran logro para los propietarios de negocios porque le permite deducir de inmediato el costo total de las inversiones elegibles en el año en que las pone en servicio, en lugar de distribuir las deducciones durante 5 a 39 años a través de la depreciación regular de MACRS. Acelera drásticamente el ahorro fiscal, mejora el flujo de caja (a menudo puede financiar compras y aún deducir el 100% de inmediato), reduce el ingreso imponible del año actual y hace que las grandes inversiones de capital sean mucho más atractivas. Se aplica tanto a propiedades nuevas como a ciertas propiedades usadas, sin límite general en dólares (a diferencia de la Sección 179).',
        },
        {
          type: 'heading',
          text: 'Beneficios Clave para los Propietarios de Negocios',
        },
        {
          type: 'list',
          items: [
            'Ahorro fiscal inmediato: Una maquinaria de $500,000 comprada y utilizada en 2025 o después puede crear una deducción de $500,000 en el año 1 (sujeto a su tasa impositiva y otros límites), potencialmente ahorrando decenas o cientos de miles en impuestos por adelantado.',
            'Mejor financiamiento y reinversión: Puede pedir prestado o usar crédito para comprar activos y aún obtener la deducción total de inmediato.',
            'Flexibilidad de planificación: Puede optar por no recibir el bono del 100% (o elegir una tasa menor del 40%/60% en el primer año aplicable) o combinarlo con el gasto de la Sección 179.',
            'Incentivo de crecimiento: Especialmente útil para fabricantes, inversionistas de bienes raíces y cualquier negocio que compre equipos o mejore instalaciones.',
            'Permanente: Sin reducción gradual como antes (iba hacia el 0% para 2027 sin esta ley).',
          ],
        },
        {
          type: 'paragraph',
          text: 'También amplía el gasto inmediato de la Sección 179 (separado pero complementario): El límite es ahora permanentemente $2.5 millones (reducido dólar por dólar por encima de $4 millones en compras calificadas totales), indexado por inflación en adelante.',
        },
        {
          type: 'heading',
          text: '¿En Qué Puede Invertir para una Deducción del 100%?',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que califica para la deducción inmediata del 100% (depreciación adicional o las nuevas reglas QPP). Siempre confirme las reglas de "adquirido después del 19 de enero de 2025" y "puesto en servicio", además de sus hechos específicos (uso original, porcentaje de uso comercial, etc.).',
        },
        {
          type: 'subheading',
          text: '1. Activos Estándar de Depreciación Adicional del 100% (Permanente, Categoría Amplia)',
        },
        {
          type: 'paragraph',
          text: 'Propiedad tangible de MACRS con una vida útil de clase de 20 años o menos, más algunos otros:',
        },
        {
          type: 'list',
          items: [
            'Maquinaria, equipos y herramientas — Máquinas de fábrica, equipos de restaurante/cocina, equipos médicos/dentales, equipos de construcción, etc.',
            'Muebles, accesorios y mobiliario de oficina — Escritorios, sillas, estanterías (típicamente propiedad de 7 años).',
            'Computadoras, periféricos y software listo para usar.',
            'Propiedad de Mejora Calificada (QIP) — Mejoras interiores a edificios no residenciales: nueva iluminación, HVAC (no estructural), pisos, paredes/divisiones, techos, mejoras eléctricas/de plomería para el interior.',
            'Ciertos vehículos — Camiones, furgonetas y SUVs pesados de uso comercial (más de 6,000 lbs GVWR a menudo califican para el 100% completo sin límites de autos de lujo).',
            'Mejoras de terreno — Cercas, aceras, paisajismo (propiedad de 15 años).',
            'Equipos agrícolas y plantas especificadas (los negocios agrícolas pueden elegir esto).',
          ],
        },
        {
          type: 'subheading',
          text: '2. Nueva Propiedad de Producción Calificada (QPP) – Gasto del 100% (Electivo, Ventana Temporal)',
        },
        {
          type: 'paragraph',
          text: 'Esta nueva categoría bajo la Sección 168(n) es revolucionaria para los fabricantes: Puede elegir la deducción inmediata del 100% en porciones calificadas de propiedad real no residencial (es decir, edificios de fábrica/almacén o componentes estructurales) utilizados como parte integral de actividades de producción calificadas en los EE.UU.',
        },
        {
          type: 'paragraph',
          text: 'Las actividades calificadas generalmente implican la transformación sustancial de propiedad personal tangible (fabricación, cierta producción agrícola/química o refinación). La mera asamblea, embalaje, almacenamiento o preparación de alimentos/bebidas al por menor no califica.',
        },
        {
          type: 'subheading',
          text: '3. Gasto de la Sección 179 (Hasta el Nuevo Límite de $2.5M)',
        },
        {
          type: 'paragraph',
          text: 'Puede usar esto para muchos de los mismos activos mencionados anteriormente (más algunas propiedades reales calificadas como techos, HVAC, protección contra incendios, sistemas de seguridad para edificios no residenciales) cuando el bono no aplica o desea elegir.',
        },
        {
          type: 'heading',
          text: 'Notas Importantes',
        },
        {
          type: 'list',
          items: [
            'La propiedad usada a menudo califica para la depreciación adicional si cumple con las reglas de adquisición (no de una parte relacionada, etc.).',
            'La conformidad estatal varía — algunos estados no siguen las reglas federales de bono del 100% o QPP.',
            'La recuperación y las limitaciones aún se aplican en algunos casos (p. ej., si el uso comercial cae por debajo del 50%, o para disposiciones de QPP).',
          ],
        },
        {
          type: 'note',
          text: 'Esta es una poderosa herramienta de planificación fiscal, pero la elegibilidad depende de hechos precisos (contratos de adquisición, fechas de puesta en servicio, % de uso comercial, elecciones). Se recomienda encarecidamente trabajar con un CPA o asesor fiscal familiarizado con la OBBBA (y la guía del Aviso del IRS 2026-11) para maximizarla y evitar problemas.',
        },
      ],
    },
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}
