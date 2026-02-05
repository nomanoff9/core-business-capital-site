import Link from 'next/link';
import NextImage from 'next/image';
import { FaTwitter, FaInstagram, FaLinkedin, FaYelp } from 'react-icons/fa';
import type { Dict } from '@/types/dict';

interface FooterProps {
  dict: Dict;
  lang?: string;
}

export default function Footer({ dict, lang = 'en' }: FooterProps) {
  return (
    <footer className="text-[#3d2914] py-12 px-4 pt-0" style={{ backgroundColor: '#e2a884' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 min-[990px]:grid-cols-4 gap-8">
        
        {/* Left Column - Logo and Company Info */}
        <div className="space-y-4">
          <div className="flex items-center">
            <NextImage
              src="/images/logo.png"
              alt="Core Business Capital Logo"
              width={150}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>
          <div className="space-y-2 text-sm">
            <p>{dict.about.since}</p>
            <p>{dict.about.experience}</p>
            <p>{dict.about.states}</p>
            <p className="font-semibold">{dict.about.rating_google} | {dict.about.rating_bbb}</p>
          </div>
        </div>

        {/* Middle Column - Services Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{dict.footer.servicesTitle}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${lang}/services/sba`} className="hover:text-[#8b5a00] transition-colors duration-200">{dict.services.sba}</Link></li>
            <li><Link href={`/${lang}/services/term`} className="hover:text-[#8b5a00] transition-colors duration-200">{dict.services.term}</Link></li>
            <li><Link href={`/${lang}/services/equipment`} className="hover:text-[#8b5a00] transition-colors duration-200">{dict.services.equipment}</Link></li>
            <li><Link href={`/${lang}/services/working`} className="hover:text-[#8b5a00] transition-colors duration-200">{dict.services.working}</Link></li>
            <li><Link href={`/${lang}/services/line`} className="hover:text-[#8b5a00] transition-colors duration-200">{dict.services.line}</Link></li>
            <li><Link href={`/${lang}/services/invoice`} className="hover:text-[#8b5a00] transition-colors duration-200">{dict.services.invoice}</Link></li>
            <li><Link href={`/${lang}/services/payroll`} className="hover:text-[#8b5a00] transition-colors duration-200">{dict.services.payroll}</Link></li>
            <li><Link href={`/${lang}/services/cash`} className="hover:text-[#8b5a00] transition-colors duration-200">{dict.services.cash}</Link></li>
          </ul>
        </div>

        {/* SBA Assistance Column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{dict.footer.sbaAssistanceTitle}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link 
                href={`/${lang}/sba-calculator`} 
                className="hover:text-[#8b5a00] transition-colors duration-200"
              >
                {dict.footer.sbaCalculator}
              </Link>
            </li>
            <li>
              <a 
                href="https://pfs.corebusinesscapital.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#8b5a00] transition-colors duration-200"
              >
                {dict.footer.pfsCopilot}
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column - Contact and Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{dict.footer.contactTitle}</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href={`/${lang}/contact`} className="hover:text-[#8b5a00] transition-colors duration-200">
                {dict.footer.contactLink}
              </Link>
            </li>
            <li>
              <a href="mailto:info@corebusinesscapital.com" className="hover:text-[#8b5a00] transition-colors duration-200">
                {dict.footer.emailLink}
              </a>
            </li>
            <li>
              <a href="tel:17202223396" className="hover:text-[#8b5a00] transition-colors duration-200" suppressHydrationWarning>
                {dict.footer.callLink}
              </a>
            </li>
            <li>
              <Link href={`/${lang}/privacy`} className="hover:text-[#8b5a00] transition-colors duration-200">
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/terms`} className="hover:text-[#8b5a00] transition-colors duration-200">
                {dict.footer.terms}
              </Link>
            </li>
          </ul>
          
          {/* Social Media Icons */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3">{dict.footer.followUs}</h4>
            <div className="flex space-x-4">
              <a 
                href="https://x.com/corebusinesscap" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#3d2914] hover:text-[#8b5a00] transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://www.instagram.com/corebusinesscapital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#3d2914] hover:text-[#8b5a00] transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/core-business-capital/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#3d2914] hover:text-[#8b5a00] transition-colors duration-200"
                aria-label="Connect with us on LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://yelp.to/eAt4ijEHNi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#3d2914] hover:text-[#8b5a00] transition-colors duration-200"
                aria-label="Review us on Yelp"
              >
                <FaYelp size={20} />
              </a>
            </div>
          </div>
        </div>

      </div>
      
      {/* Copyright Section */}
      <div className="border-t border-[#8b5a00] mt-8 pt-8 text-center text-sm">
        <p>{dict.footer.copyright}</p>
      </div>
    </footer>
  );
}