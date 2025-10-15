'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  // Extract locale from pathname (assumes /:lang/... structure)
  const currentLocale = pathname?.split('/')[1] || 'en';

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const switchLang = (newLang: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLang}`);
    router.push(newPath);
  };

  const getNavText = (key: string) => {
    const translations = {
      en: {
        home: 'Home',
        services: 'Services',
        apply: 'Apply Now'
      },
      es: {
        home: 'Inicio',
        services: 'Servicios',
        apply: 'Aplicar Ahora'
      }
    };
    return translations[currentLocale as 'en' | 'es']?.[key as keyof typeof translations.en] || translations.en[key as keyof typeof translations.en];
  };

  // Common navigation link styles
  const navLinkStyles = "w-[120px] h-[60px] flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 no-underline text-black hover:text-orange-600";
  const mobileNavLinkStyles = "w-full h-[60px] flex items-center justify-end px-4 font-medium text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 no-underline text-black hover:text-orange-600";

  // Services data for dropdown
  const serviceKeys = [
    { key: 'sba', titleKey: 'sba' },
    { key: 'term', titleKey: 'term' },
    { key: 'equipment', titleKey: 'equipment' },
    { key: 'working', titleKey: 'working' },
    { key: 'line', titleKey: 'line' },
    { key: 'invoice', titleKey: 'invoice' },
    { key: 'payroll', titleKey: 'payroll' },
    { key: 'cash', titleKey: 'cash' },
  ];

  const serviceNames = {
    en: {
      sba: "U.S. SBA Loans",
      term: "Term Loans", 
      equipment: "Equipment Financing",
      working: "Working Capital Loans",
      line: "Lines of Credit",
      invoice: "Invoice Financing",
      payroll: "Payroll Financing",
      cash: "Business Cash Advances"
    },
    es: {
      sba: "Préstamos SBA de EE.UU.",
      term: "Préstamos a Plazo",
      equipment: "Financiamiento de Equipos", 
      working: "Préstamos de Capital de Trabajo",
      line: "Líneas de Crédito",
      invoice: "Financiamiento de Facturas",
      payroll: "Financiamiento de Nómina",
      cash: "Adelantos de Efectivo para Negocios"
    }
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 transition-colors duration-200" role="banner">
      {/* Language Toggle Above Nav */}
      <div className="w-full flex justify-end items-center bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 gap-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
        <button
          onClick={() => switchLang(currentLocale === 'en' ? 'es' : 'en')}
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          aria-label={`Switch to ${currentLocale === 'en' ? 'Spanish' : 'English'}`}
        >
          <span className={currentLocale === 'en' ? 'font-bold text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'}>English</span>
          <span className="mx-1">/</span>
          <span className={currentLocale === 'es' ? 'font-bold text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'}>Español</span>
        </button>
      </div>
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-all duration-200" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 min-[480px]:h-16 sm:h-20">
            {/* Brand Logo Left */}
            <div className="flex items-center min-w-[180px] sm:min-w-[140px] h-full">
              <Link href={`/${currentLocale}`} aria-label="Core Business Capital Home" className="h-full flex items-center">
                <NextImage
                  src="/images/logo.png"
                  alt="Core Business Capital Logo"
                  width={0}
                  height={0}
                  sizes="(max-width: 600px) 180px, (max-width: 990px) 200px, 280px"
                  style={{ width: 'clamp(180px, 25vw, 280px)', height: 'auto' }}
                  className="cursor-pointer h-full max-h-14 min-[480px]:max-h-16 sm:max-h-14 min-[990px]:max-h-20 w-auto"
                  priority
                />
              </Link>
            </div>
            {/* Desktop Nav Links */}
            <div className="hidden min-[990px]:flex flex-1 justify-end items-center gap-24">
              <Link href={`/${currentLocale}`} className={navLinkStyles}>{getNavText('home')}</Link>
              
              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
              >
                <Link href={`/${currentLocale}/services`} className={navLinkStyles}>
                  {getNavText('services')}
                </Link>
                
                {/* Dropdown Menu */}
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <div className="py-3">
                      {serviceKeys.map((service) => (
                        <Link
                          key={service.key}
                          href={`/${currentLocale}/services/${service.key}`}
                          className="block px-6 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 no-underline leading-relaxed whitespace-nowrap"
                          style={{ display: 'block', width: '100%' }}
                        >
                          {serviceNames[currentLocale as 'en' | 'es'][service.key as keyof typeof serviceNames.en]}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="ml-8 min-w-[160px] h-[60px] flex items-center justify-center rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer px-4" style={{backgroundColor: '#ea9a20', color: 'white'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#efba22'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ea9a20'}>
                <a href="https://app.corebusinesscapital.com/en/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center no-underline text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" style={{color: 'white !important'}} aria-label="Apply for business loan (opens in new tab)">{getNavText('apply')}</a>
              </div>
            </div>
            {/* Hamburger for Mobile */}
            <button
              onClick={toggleMobileMenu}
              className="min-[990px]:hidden flex items-center justify-center w-12 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              >
                {/* Hamburger lines */}
                <rect
                  x="4"
                  y="6"
                  width="16"
                  height="2"
                  rx="1"
                  fill="#2d1a08"
                  className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}
                />
                <rect
                  x="4"
                  y="11"
                  width="16"
                  height="2"
                  rx="1"
                  fill="#2d1a08"
                  className={`transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                />
                <rect
                  x="4"
                  y="16"
                  width="16"
                  height="2"
                  rx="1"
                  fill="#2d1a08"
                  className={`transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-[990px]:hidden bg-white dark:bg-gray-900 px-4 py-4 shadow-sm border-t border-gray-100 dark:border-gray-800"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col items-end gap-2">
              <Link href={`/${currentLocale}`} className={mobileNavLinkStyles} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>{getNavText('home')}</Link>
              <Link href={`/${currentLocale}/services`} className={mobileNavLinkStyles} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>{getNavText('services')}</Link>
              <div className="w-full h-[60px] mt-4 flex items-center justify-end">
                <div className="min-w-[160px] h-[60px] flex items-center justify-center rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer px-4" style={{backgroundColor: '#ea9a20', color: 'white'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#efba22'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ea9a20'}>
                  <a href="https://app.corebusinesscapital.com/en/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center no-underline text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" style={{color: 'white !important'}} aria-label="Apply for business loan (opens in new tab)" onClick={() => setIsMobileMenuOpen(false)}>{getNavText('apply')}</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
    );
  }