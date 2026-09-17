import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { upvoteDoubt } from '../../services/doubtService';
import './DoubtCard.css';

export function DoubtCard({ doubt, onUpvoteSuccess }) {
  const [upvotes, setUpvotes] = useState(doubt.upvotes || 0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleUpvote = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasVoted) return;

    setUpvotes(prev => prev + 1);
    setHasVoted(true);

    const res = await upvoteDoubt(doubt.id);
    if (res?.data && onUpvoteSuccess) {
      onUpvoteSuccess(res.data);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recently';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getAuthorInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'S';
  };

  return (
    <Link to={`/doubts/${doubt.id}`} className="doubt-card">
      <div className="doubt-card__header">
        <span className="doubt-card__category">{doubt.category || 'General'}</span>
        <span className="doubt-card__meta">{formatDate(doubt.created_at)}</span>
      </div>

      <h3 className="doubt-card__title">{doubt.title}</h3>
      <p className="doubt-card__description">{doubt.description}</p>

      <div className="doubt-card__footer">
        <div className="doubt-card__author">
          <div className="doubt-card__avatar">{getAuthorInitial(doubt.author_name)}</div>
          <span>{doubt.author_name || 'Student'}</span>
        </div>

        <div className="doubt-card__actions">
          <button
            onClick={handleUpvote}
            className={`doubt-card__upvote-btn ${hasVoted ? 'doubt-card__upvote-btn--voted' : ''}`}
            title="Upvote this doubt"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
            <span>{upvotes}</span>
          </button>

          <div className="doubt-card__answers-badge">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{doubt.answers_count || 0} {doubt.answers_count === 1 ? 'Answer' : 'Answers'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
