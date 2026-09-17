import React, { useState } from 'react';
import { createDoubt } from '../../services/doubtService';
import './DoubtForm.css';

export function DoubtForm({ onDoubtCreated, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    author_name: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const CATEGORIES = [
    'Web Development',
    'AI / ML',
    'Competitive Programming',
    'Hackathons',
    'General Technical'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || formData.title.trim().length < 8) {
      setError('Please provide a clear title with at least 8 characters.');
      return;
    }

    if (!formData.description.trim() || formData.description.trim().length < 15) {
      setError('Please provide a detailed description with at least 15 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await createDoubt(formData);
      if (res?.data) {
        setSuccess('Your question has been posted successfully! Mentors and peers will answer soon.');
        setFormData({
          title: '',
          description: '',
          category: 'Web Development',
          author_name: ''
        });
        if (onDoubtCreated) {
          setTimeout(() => {
            onDoubtCreated(res.data);
          }, 800);
        }
      } else {
        setError('Failed to submit doubt. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="doubt-form">
      <div className="doubt-form__header">
        <h3 className="doubt-form__title">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ask a Technical Doubt
        </h3>
        <p className="doubt-form__subtitle">
          Get answers from JYC Technical mentors, leads, and senior peers.
        </p>
      </div>

      {error && <div className="doubt-form__error">{error}</div>}
      {success && <div className="doubt-form__success">{success}</div>}

      <div className="doubt-form__group">
        <label className="doubt-form__label">Question Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. How do I fix CORS issue when deploying React Vite on Vercel?"
          className="doubt-form__input"
          required
        />
      </div>

      <div className="doubt-form__row">
        <div className="doubt-form__group">
          <label className="doubt-form__label">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="doubt-form__select"
          >
            {CATEGORIES.map((cat, i) => (
              <option key={i} value={cat} style={{ background: '#12100D', color: '#F6EBC7' }}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="doubt-form__group">
          <label className="doubt-form__label">Your Name / Alias (Optional)</label>
          <input
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            placeholder="e.g. Priya Patel (2nd Year)"
            className="doubt-form__input"
          />
        </div>
      </div>

      <div className="doubt-form__group">
        <label className="doubt-form__label">Detailed Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide context, error messages, code snippets, or what you've tried so far..."
          className="doubt-form__textarea"
          required
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="doubt-form__submit-btn"
            style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-dim)' }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="doubt-form__submit-btn"
        >
          {loading ? 'Posting Question...' : 'Post Doubt'}
        </button>
      </div>
    </form>
  );
}
