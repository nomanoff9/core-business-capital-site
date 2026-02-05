'use client';

import { useState } from 'react';
import type { Dict } from '@/types/dict';

interface ContactFormProps {
  dict: Dict;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // Reset form on success
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#3d1e08] mb-2">
          {dict.contact.form.name} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[#d48125]/30 focus:border-[#d48125] focus:ring-2 focus:ring-[#d48125]/20 outline-none transition-all bg-white text-[#3d1e08] placeholder-[#5a3921]/50"
          placeholder={dict.contact.form.namePlaceholder}
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#3d1e08] mb-2">
          {dict.contact.form.email} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[#d48125]/30 focus:border-[#d48125] focus:ring-2 focus:ring-[#d48125]/20 outline-none transition-all bg-white text-[#3d1e08] placeholder-[#5a3921]/50"
          placeholder={dict.contact.form.emailPlaceholder}
        />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#3d1e08] mb-2">
          {dict.contact.form.phone} <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[#d48125]/30 focus:border-[#d48125] focus:ring-2 focus:ring-[#d48125]/20 outline-none transition-all bg-white text-[#3d1e08] placeholder-[#5a3921]/50"
          placeholder={dict.contact.form.phonePlaceholder}
        />
      </div>

      {/* Message Field (Optional) */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#3d1e08] mb-2">
          {dict.contact.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[#d48125]/30 focus:border-[#d48125] focus:ring-2 focus:ring-[#d48125]/20 outline-none transition-all bg-white text-[#3d1e08] placeholder-[#5a3921]/50 resize-none"
          placeholder={dict.contact.form.messagePlaceholder}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-gradient-to-r from-[#d48125] to-[#f1bb17] text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {dict.contact.form.submitting}
          </span>
        ) : (
          dict.contact.form.submit
        )}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
          {dict.contact.form.successMessage}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
          {dict.contact.form.errorMessage}
        </div>
      )}
    </form>
  );
}
