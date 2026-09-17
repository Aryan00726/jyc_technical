import React, { useState } from 'react';
import { upvoteAnswer } from '../../services/answerService';
import './AnswerCard.css';

export function AnswerCard({ answer }) {
  const [upvotes, setUpvotes] = useState(answer.upvotes || 0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleUpvote = async () => {
    if (hasVoted) return;
    setUpvotes(prev => prev + 1);
    setHasVoted(true);
    await upvoteAnswer(answer.id);
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recently';
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'M';
  };

  return (
    <div className={`answer-card ${answer.is_verified ? 'answer-card--verified' : ''}`}>
      <div className="answer-card__header">
        <div className="answer-card__author-wrap">
          <div className="answer-card__avatar">{getInitial(answer.author_name)}</div>
          <div className="answer-card__author-info">
            <span className="answer-card__author-name">
              {answer.author_name || 'Technical Mentor'}
              {answer.is_verified && (
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#5cdb95' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span className="answer-card__author-role">{answer.author_role || 'Club Member'}</span>
          </div>
        </div>

        {answer.is_verified && (
          <span className="answer-card__verified-badge">
            Verified Mentor Answer
          </span>
        )}
      </div>

      <div className="answer-card__content">
        {answer.content}
      </div>

      <div className="answer-card__footer">
        <span>Answered {formatDate(answer.created_at)}</span>

        <button
          onClick={handleUpvote}
          className={`doubt-card__upvote-btn ${hasVoted ? 'doubt-card__upvote-btn--voted' : ''}`}
          title="Mark answer as helpful"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>Helpful ({upvotes})</span>
        </button>
      </div>
    </div>
  );
}
