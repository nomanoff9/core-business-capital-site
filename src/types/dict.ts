export type Dict = {
  hero_title: string;
  hero_subtitle: string;
  cta_apply: string;
  credit_disclaimer: string;
  services: {
    title: string;
    sba: string;
    term: string;
    equipment: string;
    line: string;
    working: string;
    payroll: string;
    cash: string;
    invoice: string;
    sba_desc: string;
    term_desc: string;
    equipment_desc: string;
    line_desc: string;
    working_desc: string;
    payroll_desc: string;
    cash_desc: string;
    invoice_desc: string;
    [key: string]: string;  // Add this for dynamic indexing
  };
  about: {
    title: string;
    since: string;
    rating_google: string;
    rating_bbb: string;
    experience: string;
    states: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    cta_text: string;
    cta_button: string;
  };
  pfsCopilot: {
    title: string;
    subtitle: string;
    description: string;
    features: {
      quick: {
        title: string;
        desc: string;
      };
      mobile: {
        title: string;
        desc: string;
      };
      bilingual: {
        title: string;
        desc: string;
      };
      secure: {
        title: string;
        desc: string;
      };
    };
    cta_text: string;
    cta_button: string;
    form_info: string;
  };
  apply_ready: string;
  apply_desc: string;
  apply_benefits: {
    quick: string;
    nocredit: string;
    expert: string;
    states: string;
  };
  footer: {
    copyright: string;
    email: string;
    privacy: string;
    terms: string;
    servicesTitle: string;
    sbaAssistanceTitle: string;
    sbaCalculator: string;
    pfsCopilot: string;
    contactTitle: string;
    emailLink: string;
    callLink: string;
    followUs: string;
  };
  nav: {
    home: string;
    services: string;
    pfsCopilot: string;
    sbaCalculator: string;
    apply: string;
  };
  sbaCalculator: {
    title: string;
    subtitle: string;
    currentRate: string;
    enterAmount: string;
    loanTerm: string;
    years: string;
    months: string;
    interestRate: string;
    monthlyPayment: string;
    avgAnnualInterest: string;
    ctaText: string;
    applyNow: string;
    or: string;
    launchPFS: string;
    disclaimer: string;
  };
  serviceDetails: {
    sectionHeaders: {
      qualifications_title: string;
      documentation_title: string;
      benefits_title: string;
    };
    cta: {
      ready_title: string;
      contact_text: string;
      apply_button: string;
      view_all_button: string;
    };
    sba?: {
      qualifications: string[];
      paperwork: string[];
      benefits: string[];
    };
    term?: {
      qualifications: string[];
      paperwork: string[];
      benefits: string[];
    };
    equipment?: {
      qualifications: string[];
      paperwork: string[];
      benefits: string[];
    };
    working?: {
      qualifications: string[];
      paperwork: string[];
      benefits: string[];
    };
    line?: {
      qualifications: string[];
      paperwork: string[];
      benefits: string[];
    };
    invoice?: {
      qualifications: string[];
      paperwork: string[];
      benefits: string[];
    };
    payroll?: {
      qualifications: string[];
      paperwork: string[];
      benefits: string[];
    };
    cash?: {
      qualifications: string[];
      paperwork: string[];
      benefits: string[];
    };
  };
};