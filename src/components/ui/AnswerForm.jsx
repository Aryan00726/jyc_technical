import React, { useState } from 'react';
import { addAnswer } from '../../services/answerService';
import './AnswerForm.css';

export function AnswerForm({ doubtId, onAnswerSubmitted }) {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Technical Member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || content.trim().length < 10) {
      setError('Please provide a complete answer with at least 10 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await addAnswer({
        doubtId,
        content: content.trim(),
        author_name: authorName.trim() || 'JYC Member',
        author_role: authorRole.trim() || 'Technical Member'
      });

      if (res?.data) {
        setContent('');
        setAuthorName('');
        if (onAnswerSubmitted) {
          onAnswerSubmitted(res.data);
        }
      } else {
        setError('Failed to submit answer. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while posting your answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="answer-form">
      <h4 className="answer-form__title">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Write an Answer or Solution
      </h4>

      {error && <div className="doubt-form__error">{error}</div>}

      <div className="answer-form__row">
        <div className="answer-form__group">
          <label className="doubt-form__label">Your Name / Handle</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="e.g. Siddharth Verma"
            className="doubt-form__input"
          />
        </div>

        <div className="answer-form__group">
          <label className="doubt-form__label">Your Role / Designation</label>
          <input
            type="text"
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
            placeholder="e.g. Web Lead / 3rd Year Mentor"
            className="doubt-form__input"
          />
        </div>
      </div>

      <div className="answer-form__group">
        <label className="doubt-form__label">Solution / Explanation *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your explanation step by step, add code suggestions, or link to relevant docs..."
          className="doubt-form__textarea"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="doubt-form__submit-btn"
        style={{ alignSelf: 'flex-end', marginTop: '4px' }}
      >
        {loading ? 'Posting Solution...' : 'Post Answer'}
      </button>
    </form>
  );
}
