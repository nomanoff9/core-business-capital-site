'use client';
import { memo, useState, useEffect } from 'react';
import type { Dict } from '@/types/dict';

interface SBACalculatorProps {
  dict: Dict;
  lang?: string;
}

const SBACalculator = memo(function SBACalculator({ dict, lang = 'en' }: SBACalculatorProps) {
  const [loanAmount, setLoanAmount] = useState<string>('250000');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [averageAnnualInterest, setAverageAnnualInterest] = useState<number>(0);

  const APR = 0.0925; // 9.25% (Prime 6.75% + 2.5%)
  const TERM_YEARS = 10;
  const TERM_MONTHS = TERM_YEARS * 12;

  useEffect(() => {
    const amount = parseFloat(loanAmount) || 0;
    if (amount > 0 && amount <= 5000000) {
      // Monthly interest rate
      const monthlyRate = APR / 12;
      
      // Calculate monthly payment using amortization formula
      // M = P * [r(1+r)^n] / [(1+r)^n - 1]
      const payment = amount * (monthlyRate * Math.pow(1 + monthlyRate, TERM_MONTHS)) / 
                      (Math.pow(1 + monthlyRate, TERM_MONTHS) - 1);
      
      // Total amount paid over life of loan
      const totalPaid = payment * TERM_MONTHS;
      
      // Total interest paid
      const totalInterestPaid = totalPaid - amount;
      
      // Average annual interest expense
      const avgAnnual = totalInterestPaid / TERM_YEARS;
      
      setMonthlyPayment(payment);
      setAverageAnnualInterest(avgAnnual);
    } else {
      setMonthlyPayment(0);
      setAverageAnnualInterest(0);
    }
  }, [loanAmount, TERM_MONTHS, TERM_YEARS]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '' || parseInt(value) <= 5000000) {
      setLoanAmount(value);
    }
  };

  return (
    <section 
      className="px-4 sba-calculator-section"
      style={{ backgroundColor: '#707465', margin: 0, padding: '80px 16px' }}
      role="region"
      aria-labelledby="sba-calculator-heading"
      data-gtm="sba-calculator"
    >
      <div className="max-w-7xl mx-auto">
        {/* Row 1: Header */}
        <div className="text-center mb-12">
          <h2
            id="sba-calculator-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{ color: '#ffffff' }}
          >
            {dict.sbaCalculator.title}
          </h2>
          <p className="text-lg sm:text-xl" style={{ color: '#f4eda9' }}>
            {dict.sbaCalculator.subtitle}
          </p>
          <p className="text-sm mt-2" style={{ color: '#e2a884' }}>
            {dict.sbaCalculator.currentRate}
          </p>
        </div>

        {/* Row 2: 5 Column Flex Grid */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {/* Column 1: Loan Amount Input */}
          <div className="flex-1 min-w-[260px] max-w-[300px] bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300">
            <label 
              htmlFor="loan-amount"
              className="block text-sm font-bold mb-4 text-center"
              style={{ color: '#ffffff' }}
            >
              {dict.sbaCalculator.enterAmount}
            </label>
            <div className="relative w-4/5">
              <span 
                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-4xl font-bold"
                style={{ color: '#4d2508' }}
              >
                $
              </span>
              <input
                id="loan-amount"
                type="text"
                value={loanAmount ? parseInt(loanAmount).toLocaleString('en-US') : ''}
                onChange={handleInputChange}
                className="w-full text-5xl font-bold py-6 pl-12 pr-4 border-0 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-400 transition-all duration-200 text-center"
                style={{ 
                  color: '#4d2508'
                }}
                placeholder="0"
                maxLength={9}
                aria-label="Enter loan amount up to $5,000,000"
              />
            </div>
          </div>

          {/* Column 2: Loan Term */}
          <div 
            className="flex-1 min-w-[260px] max-w-[300px] rounded-2xl shadow-xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition-all duration-300"
            style={{ backgroundColor: '#fff3c7' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: '#4d2508' }}>
              {dict.sbaCalculator.loanTerm}
            </p>
            <p className="text-2xl font-black" style={{ color: '#000000' }}>
              10 {dict.sbaCalculator.years}
            </p>
            <p className="text-sm" style={{ color: '#4d2508' }}>
              (120 {dict.sbaCalculator.months})
            </p>
          </div>

          {/* Column 3: Interest Rate */}
          <div 
            className="flex-1 min-w-[260px] max-w-[300px] rounded-2xl shadow-xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition-all duration-300"
            style={{ backgroundColor: '#f0bb6a' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: '#4d2508' }}>
              {dict.sbaCalculator.interestRate}
            </p>
            <p className="text-2xl font-bold" style={{ color: '#4d2508' }}>
              9.25% APR
            </p>
          </div>

          {/* Column 4: Monthly Payment */}
          <div 
            className="flex-1 min-w-[260px] max-w-[300px] rounded-2xl text-center shadow-xl p-6 flex flex-col justify-center hover:shadow-2xl transition-all duration-300"
            style={{ backgroundColor: '#dd5d20' }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: '#ffffff' }}>
              {dict.sbaCalculator.monthlyPayment}
            </p>
            <p className="text-3xl font-black" style={{ color: '#ffffff' }}>
              {loanAmount && parseFloat(loanAmount) > 0 ? formatCurrency(monthlyPayment) : '$0.00'}
            </p>
          </div>

          {/* Column 5: Average Annual Interest */}
          <div 
            className="flex-1 min-w-[260px] max-w-[300px] rounded-2xl text-center shadow-xl p-6 flex flex-col justify-center hover:shadow-2xl transition-all duration-300"
            style={{ backgroundColor: '#4d2508', border: '3px solid #3d1e08' }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: '#ffffff' }}>
              {dict.sbaCalculator.avgAnnualInterest}
            </p>
            <p className="text-3xl font-black" style={{ color: '#ffffff' }}>
              {loanAmount && parseFloat(loanAmount) > 0 ? formatCurrency(averageAnnualInterest) : '$0.00'}
            </p>
          </div>
        </div>

        {/* Row 3: Call to Action */}
        <div className="text-center">
          <p className="text-lg mb-6" style={{ color: '#ffffff' }}>
            {dict.sbaCalculator.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.corebusinesscapital.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-12 py-4 text-lg font-extrabold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400 uppercase tracking-wide shadow-lg hover:shadow-2xl"
              style={{ 
                backgroundColor: '#dd5d20',
                color: '#ffffff',
                minWidth: '250px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f27721'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dd5d20'}
            >
              {dict.sbaCalculator.applyNow}
            </a>
            
            <span className="text-white text-lg font-semibold">{dict.sbaCalculator.or}</span>
            
            <a
              href={`https://pfs.corebusinesscapital.com/${lang}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-12 py-4 text-lg font-extrabold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 uppercase tracking-wide shadow-lg hover:shadow-2xl"
              style={{ 
                backgroundColor: '#4d2508',
                color: '#ffffff',
                border: '3px solid #3d1e08',
                minWidth: '250px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5d3518';
                e.currentTarget.style.borderColor = '#3d1e08';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4d2508';
                e.currentTarget.style.borderColor = '#3d1e08';
              }}
            >
              {dict.sbaCalculator.launchPFS}
            </a>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-8">
            <p className="text-xs text-gray-400 text-center leading-relaxed max-w-4xl mx-auto">
              {dict.sbaCalculator.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SBACalculator;
