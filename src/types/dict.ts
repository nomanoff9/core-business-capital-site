export type Dict = {
  hero_title: string;
  hero_subtitle: string;
  cta_apply: string;
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