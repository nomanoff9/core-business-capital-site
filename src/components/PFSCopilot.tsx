'use client';
import Link from 'next/link';
import { memo } from 'react';
import type { Dict } from '@/types/dict';

interface PFSCopilotProps {
  dict: Dict;
}

const PFSCopilot = memo(function PFSCopilot({ dict }: PFSCopilotProps) {
  return (
    <section 
      className="px-4 pt-20 pb-0"
      style={{ backgroundColor: '#fff3c7', margin: 0, padding: '80px 16px 0 16px' }}
      role="region"
      aria-labelledby="pfs-copilot-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Title Section */}
        <div className="text-center mb-16">
          <h2
            id="pfs-copilot-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6"
            style={{ color: '#000000' }}
          >
            {dict.pfsCopilot.title}
          </h2>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: '#603913' }}>
            {dict.pfsCopilot.subtitle}
          </p>
          
          {/* CTA Button */}
          <div className="mb-8">
            <Link
              href="https://pfs.corebusinesscapital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-12 py-5 text-xl font-extrabold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 uppercase tracking-wide shadow-lg hover:shadow-2xl"
              style={{ 
                backgroundColor: '#98a894',
                color: '#ffffff',
                minWidth: '280px',
                border: '3px solid #707465'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#aabaa7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#98a894'}
            >
              {dict.pfsCopilot.cta_button} →
            </Link>
          </div>

          <p className="text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
            {dict.pfsCopilot.description}
          </p>
        </div>

        {/* Features Grid - Flexbox Design */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {/* Quick & Easy */}
          <div className="flex-1 min-w-[260px] max-w-[300px] relative overflow-hidden rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group" 
               style={{ 
                 backgroundColor: '#4d2508',
                 border: '6px solid #f4eda9',
                 transform: 'translateZ(0)'
               }}>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500"
                   style={{ background: 'linear-gradient(135deg, #ea9a20 0%, #efba22 100%)' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-black text-2xl mb-4 transition-all duration-300" style={{ color: '#ffffff' }}>
                {dict.pfsCopilot.features.quick.title}
              </h3>
              <p className="text-base leading-relaxed font-medium" style={{ color: '#f4eda9' }}>
                {dict.pfsCopilot.features.quick.desc}
              </p>
            </div>
          </div>

          {/* Mobile Friendly */}
          <div className="flex-1 min-w-[260px] max-w-[300px] relative overflow-hidden rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group" 
               style={{ 
                 backgroundColor: '#4d2508',
                 border: '6px solid #f4eda9',
                 transform: 'translateZ(0)'
               }}>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500"
                   style={{ background: 'linear-gradient(135deg, #ea9a20 0%, #efba22 100%)' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-black text-2xl mb-4 transition-all duration-300" style={{ color: '#ffffff' }}>
                {dict.pfsCopilot.features.mobile.title}
              </h3>
              <p className="text-base leading-relaxed font-medium" style={{ color: '#f4eda9' }}>
                {dict.pfsCopilot.features.mobile.desc}
              </p>
            </div>
          </div>

          {/* Bilingual */}
          <div className="flex-1 min-w-[260px] max-w-[300px] relative overflow-hidden rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group" 
               style={{ 
                 backgroundColor: '#4d2508',
                 border: '6px solid #f4eda9',
                 transform: 'translateZ(0)'
               }}>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500"
                   style={{ background: 'linear-gradient(135deg, #ea9a20 0%, #efba22 100%)' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="font-black text-2xl mb-4 transition-all duration-300" style={{ color: '#ffffff' }}>
                {dict.pfsCopilot.features.bilingual.title}
              </h3>
              <p className="text-base leading-relaxed font-medium" style={{ color: '#f4eda9' }}>
                {dict.pfsCopilot.features.bilingual.desc}
              </p>
            </div>
          </div>

          {/* Secure */}
          <div className="flex-1 min-w-[260px] max-w-[300px] relative overflow-hidden rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group" 
               style={{ 
                 backgroundColor: '#4d2508',
                 border: '6px solid #f4eda9',
                 transform: 'translateZ(0)'
               }}>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500"
                   style={{ background: 'linear-gradient(135deg, #ea9a20 0%, #efba22 100%)' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-black text-2xl mb-4 transition-all duration-300" style={{ color: '#ffffff' }}>
                {dict.pfsCopilot.features.secure.title}
              </h3>
              <p className="text-base leading-relaxed font-medium" style={{ color: '#f4eda9' }}>
                {dict.pfsCopilot.features.secure.desc}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl shadow-2xl p-10 max-w-3xl mx-auto">
          <p className="text-2xl font-bold mb-8" style={{ color: '#000000' }}>
            {dict.pfsCopilot.cta_text}
          </p>
          <Link
            href="https://pfs.corebusinesscapital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-12 py-5 text-xl font-extrabold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 uppercase tracking-wide shadow-lg hover:shadow-2xl"
            style={{ 
              backgroundColor: '#98a894',
              color: '#ffffff',
              minWidth: '280px',
              border: '3px solid #707465'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#aabaa7'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#98a894'}
          >
            {dict.pfsCopilot.cta_button} →
          </Link>
          <p className="text-base mt-6 font-semibold" style={{ color: '#000000' }}>
            {dict.pfsCopilot.form_info}
          </p>
        </div>
      </div>
    </section>
  );
});

export default PFSCopilot;
