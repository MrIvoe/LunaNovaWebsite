'use client';

import { useState } from 'react';
import { ContactInfo } from '@/types';

interface ContactFormProps {
  data: ContactInfo['form'];
  formEndpoint?: string;
  destinationEmail: string;
}

export default function ContactForm({ data, formEndpoint, destinationEmail }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolvedFormEndpoint = formEndpoint || process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '';

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (resolvedFormEndpoint) {
        const response = await fetch(resolvedFormEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          throw new Error('Form submission failed');
        }
      } else {
        const mailtoLink = `mailto:${destinationEmail}?subject=New message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      setError(data.errorMessage);
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-[var(--color-surface)] p-6 rounded-lg border border-[color:var(--color-border)]">
      <h3 className="text-xl font-serif font-bold text-[var(--color-brand)] mb-4">
        {data.title}
      </h3>

      <div>
        <label htmlFor="name" className="block text-sm font-accent font-semibold text-[var(--color-text-primary)] mb-2">
          {data.nameLabel} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-[var(--color-surface-alt)] border border-[color:var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
          placeholder={data.namePlaceholder}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-accent font-semibold text-[var(--color-text-primary)] mb-2">
          {data.emailLabel} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-[var(--color-surface-alt)] border border-[color:var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
          placeholder={data.emailPlaceholder}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-accent font-semibold text-[var(--color-text-primary)] mb-2">
          {data.messageLabel} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2.5 bg-[var(--color-surface-alt)] border border-[color:var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors resize-none"
          placeholder={data.messagePlaceholder}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-2.5 bg-[var(--color-brand)] text-[var(--color-surface)] font-accent font-bold tracking-wide uppercase rounded-lg hover:bg-[var(--color-brand-strong)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? data.submitLoading : data.submitIdle}
      </button>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-400/50 rounded-lg text-red-300 text-center">
          {error}
        </div>
      )}

      {submitted && (
        <div className="p-4 bg-green-900/30 border border-green-400/50 rounded-lg text-green-300 text-center">
          {data.successMessage}
        </div>
      )}

      {!resolvedFormEndpoint && (
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          {data.fallbackHint}
        </p>
      )}
    </form>
  );
}