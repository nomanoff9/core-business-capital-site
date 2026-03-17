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
      en: '100% bonus depreciation is permanently restored — meaning you can immediately deduct the full cost of eligible business assets in year one. Here\'s what every business owner needs to know.',
      es: 'La depreciación adicional del 100% se ha restaurado de forma permanente, lo que significa que puede deducir de inmediato el costo total de los activos empresariales elegibles en el primer año. Esto es lo que todo empresario necesita saber.',
    },
    content: {
      en: [
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
  {
    slug: 'filing-taxes-sba-loan-qualification',
    date: '2026-03-17',
    category: 'Tax & Financing',
    readingTime: 6,
    thumbnail: '/images/taxes thumbnail.jpg',
    title: {
      en: 'Filing Your Taxes When Applying for a Business Loan: Top 3 Reasons Great Businesses Don\'t Qualify for Large SBA Loans',
      es: 'Cómo Declarar Sus Impuestos al Solicitar un Préstamo Empresarial: Las 3 Principales Razones por las que Grandes Empresas No Califican para Préstamos SBA Grandes',
    },
    excerpt: {
      en: 'Your tax return is your loan application. Discover the three most common — and costly — tax filing mistakes that prevent strong, profitable businesses from qualifying for the SBA financing they deserve.',
      es: 'Su declaración de impuestos es su solicitud de préstamo. Descubra los tres errores más comunes y costosos al declarar impuestos que impiden que negocios sólidos y rentables califiquen para el financiamiento SBA que merecen.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'You\'ve built a great business. Revenue is strong, customers keep coming back, and your team is growing. So why did the bank say no to your SBA loan? More often than not, the answer is sitting right there in your most recent tax return — and it has nothing to do with how well your business actually performs.',
        },
        {
          type: 'paragraph',
          text: 'Here are the top three reasons owners of genuinely successful businesses get denied for large SBA loans, and what you can do about it.',
        },
        {
          type: 'heading',
          text: '1. The Owner Is Taking Too Much Money Out of the Company',
        },
        {
          type: 'paragraph',
          text: 'This is the single most common disqualifier we see. It shows up in two ways: excessive salary and excessive distributions.',
        },
        {
          type: 'paragraph',
          text: 'When an owner pays themselves a salary far above market rate, the business books that as an expense — which reduces the net income shown on the tax return. When an owner takes 100% of the profits out as distributions rather than leaving capital in the company, the business shows no retained earnings. Either way, the tax return tells the bank the business can\'t afford the loan.',
        },
        {
          type: 'paragraph',
          text: 'Banks and SBA lenders use a metric called the Debt Service Coverage Ratio (DSCR). The requirement is typically 1.25x to 1.5x — meaning your business must show enough net income to cover all of its annual debt payments (including the new loan) by at least 1.25 to 1.5 times.',
        },
        {
          type: 'note',
          text: 'Here\'s the formula: Take the annual payments on the loan you\'re applying for, add all existing annual debt payments, and multiply by 1.5. That number is the minimum net income your tax return needs to show. If your return falls short because of how you\'ve been compensating yourself, you may need to adjust before your next filing cycle — or explain the add-backs clearly in your application.',
        },
        {
          type: 'heading',
          text: '2. Your Accountant Did Their Job — Maybe Too Well',
        },
        {
          type: 'paragraph',
          text: 'Business owners often hire the most skilled CPA they can find — someone who knows every deduction, every credit, and every legal strategy to minimize taxable income. That\'s exactly what a great accountant should do. The problem is that minimizing your tax bill and qualifying for a large business loan are fundamentally at odds with each other.',
        },
        {
          type: 'paragraph',
          text: 'The lower your reported income, the less you pay in taxes. But the lower your reported income, the less loan you qualify for — or you may not qualify at all.',
        },
        {
          type: 'paragraph',
          text: 'This isn\'t your accountant\'s fault. They aren\'t loan officers, and unless you tell them you\'re planning to apply for financing, they\'ll optimize your return entirely for tax savings.',
        },
        {
          type: 'subheading',
          text: 'What to Do',
        },
        {
          type: 'paragraph',
          text: 'Have a direct conversation with your CPA before your next tax filing. Tell them: "We are planning to apply for an SBA loan. Please make sure my return shows enough net income to support a 1.5x Debt Service Coverage Ratio on the loan amount I\'m seeking." A good accountant will find the balance. You may pay slightly more in taxes, but you\'ll gain access to six or seven figures of low-cost, long-term capital — a trade-off that almost always makes financial sense.',
        },
        {
          type: 'heading',
          text: '3. No Plan, No Projections — No Loan',
        },
        {
          type: 'paragraph',
          text: 'An SBA loan isn\'t just a credit check and a bank statement review. It\'s a presentation. The bank wants to understand who you are, where your business has been, and — most importantly — exactly where it\'s going with this capital.',
        },
        {
          type: 'paragraph',
          text: 'Here\'s what a complete SBA loan package requires beyond the financials:',
        },
        {
          type: 'list',
          items: [
            'Business history: Recent tax returns, profit & loss statements, and balance sheets showing the trajectory of your company.',
            'Loan purpose statement: A clear, specific explanation of exactly how the funds will be used.',
            'Business plan: Not a generic template — a genuine analysis that shows you understand your market, your competition, your customers, and your operational model.',
            'Industry analysis: Demonstrate knowledge of trends, risks, and opportunities in your sector.',
            'Financial projections: A detailed spreadsheet forecasting the next 12 to 24 months of revenue, expenses, and cash flow — with the assumptions behind every number clearly documented.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The projections aren\'t just a formality. They signal to the lender that you\'ve done the work, that you understand what success looks like, and that you have a realistic, executable plan to get there. Lenders want to fund businesses where the owner has thought deeply about the opportunity.',
        },
        {
          type: 'heading',
          text: 'The Bottom Line: Your Tax Return Is Your Loan Application',
        },
        {
          type: 'paragraph',
          text: 'An SBA loan process is ultimately a story — the story of where your business has been and where it\'s going. Your tax returns are the opening chapters. If those chapters don\'t reflect the strength of your business, the rest of the story won\'t matter.',
        },
        {
          type: 'paragraph',
          text: 'Plan ahead. Talk to your CPA. Build your projections. And if you want expert guidance navigating the entire process, Core Business Capital and Core Loan Hub are built specifically to help business owners like you move through this process as smoothly as possible — backed by years of hands-on experience securing long-term, low-cost financing.',
        },
        {
          type: 'note',
          text: 'Ready to find out where you stand? Apply today at app.corebusinesscapital.com and our team will walk you through exactly what your loan package needs to succeed.',
        },
      ],
      es: [
        {
          type: 'paragraph',
          text: 'Ha construido un gran negocio. Los ingresos son sólidos, los clientes siguen regresando y su equipo está creciendo. Entonces, ¿por qué el banco rechazó su solicitud de préstamo SBA? La mayoría de las veces, la respuesta está justo ahí, en su declaración de impuestos más reciente — y no tiene nada que ver con qué tan bien funciona su negocio en realidad.',
        },
        {
          type: 'paragraph',
          text: 'Estas son las tres principales razones por las que propietarios de negocios verdaderamente exitosos son rechazados para préstamos SBA grandes, y qué puede hacer al respecto.',
        },
        {
          type: 'heading',
          text: '1. El Dueño Está Retirando Demasiado Dinero de la Empresa',
        },
        {
          type: 'paragraph',
          text: 'Este es el descalificador más común que vemos. Se presenta de dos formas: salario excesivo y distribuciones excesivas.',
        },
        {
          type: 'paragraph',
          text: 'Cuando un dueño se paga un salario muy por encima del mercado, el negocio lo registra como un gasto — lo que reduce el ingreso neto que aparece en la declaración de impuestos. Cuando un dueño retira el 100% de las ganancias como distribuciones en lugar de dejar capital en la empresa, el negocio no muestra utilidades retenidas. De cualquier manera, la declaración de impuestos le dice al banco que el negocio no puede pagar el préstamo.',
        },
        {
          type: 'paragraph',
          text: 'Los bancos y prestamistas SBA utilizan una métrica llamada Ratio de Cobertura del Servicio de la Deuda (DSCR, por sus siglas en inglés). El requisito típico es de 1.25x a 1.5x — lo que significa que su negocio debe mostrar suficiente ingreso neto para cubrir todos sus pagos anuales de deuda (incluido el nuevo préstamo) al menos 1.25 a 1.5 veces.',
        },
        {
          type: 'note',
          text: 'La fórmula es la siguiente: tome los pagos anuales del préstamo que está solicitando, agregue todos los pagos anuales de deuda existentes y multiplíquelos por 1.5. Ese número es el ingreso neto mínimo que su declaración de impuestos necesita mostrar. Si su declaración queda corta debido a cómo se ha estado compensando, puede necesitar ajustarlo antes de su próximo ciclo de declaración, o explicar claramente los ajustes en su solicitud.',
        },
        {
          type: 'heading',
          text: '2. Su Contador Hizo Su Trabajo — Quizás Demasiado Bien',
        },
        {
          type: 'paragraph',
          text: 'Los dueños de negocios a menudo contratan al CPA más calificado que pueden encontrar — alguien que conoce cada deducción, cada crédito y cada estrategia legal para minimizar el ingreso gravable. Eso es exactamente lo que debe hacer un gran contador. El problema es que minimizar su factura de impuestos y calificar para un préstamo comercial grande son objetivos fundamentalmente opuestos.',
        },
        {
          type: 'paragraph',
          text: 'Cuanto menor sea el ingreso declarado, menos impuestos pagará. Pero cuanto menor sea el ingreso declarado, menos préstamo calificará — o puede que no califique en absoluto.',
        },
        {
          type: 'paragraph',
          text: 'Esto no es culpa de su contador. No son oficiales de préstamos, y a menos que les diga que planea solicitar financiamiento, optimizarán su declaración completamente para el ahorro de impuestos.',
        },
        {
          type: 'subheading',
          text: 'Qué Hacer',
        },
        {
          type: 'paragraph',
          text: 'Tenga una conversación directa con su CPA antes de su próxima declaración de impuestos. Dígales: "Estamos planeando solicitar un préstamo SBA. Por favor, asegúrese de que mi declaración muestre suficiente ingreso neto para respaldar un Ratio de Cobertura del Servicio de la Deuda de 1.5x sobre el monto del préstamo que estoy buscando." Un buen contador encontrará el equilibrio. Puede pagar un poco más en impuestos, pero obtendrá acceso a seis o siete cifras de capital a bajo costo y largo plazo — un intercambio que casi siempre tiene sentido financiero.',
        },
        {
          type: 'heading',
          text: '3. Sin Plan, Sin Proyecciones — Sin Préstamo',
        },
        {
          type: 'paragraph',
          text: 'Un préstamo SBA no es solo una verificación de crédito y una revisión de estados de cuenta bancarios. Es una presentación. El banco quiere entender quién es usted, dónde ha estado su negocio y — lo más importante — exactamente hacia dónde va con este capital.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que requiere un paquete completo de préstamo SBA más allá de los estados financieros:',
        },
        {
          type: 'list',
          items: [
            'Historial del negocio: Declaraciones de impuestos recientes, estados de pérdidas y ganancias, y balances generales que muestren la trayectoria de su empresa.',
            'Declaración del propósito del préstamo: Una explicación clara y específica de exactamente cómo se utilizarán los fondos.',
            'Plan de negocios: No una plantilla genérica — un análisis genuino que demuestre que entiende su mercado, su competencia, sus clientes y su modelo operativo.',
            'Análisis de la industria: Demuestre conocimiento de las tendencias, riesgos y oportunidades en su sector.',
            'Proyecciones financieras: Una hoja de cálculo detallada que pronostique los próximos 12 a 24 meses de ingresos, gastos y flujo de caja — con cada supuesto claramente documentado.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Las proyecciones no son solo una formalidad. Le indican al prestamista que usted ha hecho el trabajo, que entiende cómo se ve el éxito y que tiene un plan realista y ejecutable para lograrlo. Los prestamistas quieren financiar negocios donde el dueño ha pensado profundamente en la oportunidad.',
        },
        {
          type: 'heading',
          text: 'La Conclusión: Su Declaración de Impuestos Es Su Solicitud de Préstamo',
        },
        {
          type: 'paragraph',
          text: 'Un proceso de préstamo SBA es en última instancia una historia — la historia de dónde ha estado su negocio y hacia dónde va. Sus declaraciones de impuestos son los capítulos iniciales. Si esos capítulos no reflejan la fortaleza de su negocio, el resto de la historia no importará.',
        },
        {
          type: 'paragraph',
          text: 'Planifique con anticipación. Hable con su CPA. Construya sus proyecciones. Y si desea orientación experta durante todo el proceso, Core Business Capital y Core Loan Hub están diseñados específicamente para ayudar a empresarios como usted a atravesar este proceso de la manera más fluida posible — respaldados por años de experiencia práctica en la obtención de financiamiento a largo plazo y bajo costo.',
        },
        {
          type: 'note',
          text: '¿Listo para saber en qué posición se encuentra? Solicite hoy en app.corebusinesscapital.com y nuestro equipo lo guiará exactamente en lo que necesita su paquete de préstamo para tener éxito.',
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
