import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDoubtById, upvoteDoubt } from '../services/doubtService';
import { fetchAnswersByDoubtId } from '../services/answerService';
import { AnswerCard } from '../components/ui/AnswerCard';
import { AnswerForm } from '../components/ui/AnswerForm';
import './DoubtDetails.css';

export default function DoubtDetails() {
  const { id } = useParams();
  const [doubt, setDoubt] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    async function loadThread() {
      setLoading(true);
      const resD = await fetchDoubtById(id);
      if (resD?.data) {
        setDoubt(resD.data);
      }

      const resA = await fetchAnswersByDoubtId(id);
      if (resA?.data) {
        setAnswers(resA.data);
      }
      setLoading(false);
    }
    loadThread();
  }, [id]);

  const handleUpvoteDoubt = async () => {
    if (!doubt || hasVoted) return;
    setHasVoted(true);
    setDoubt(prev => ({ ...prev, upvotes: (prev.upvotes || 0) + 1 }));
    await upvoteDoubt(doubt.id);
  };

  const handleAnswerSubmitted = (newAnswer) => {
    setAnswers(prev => [...prev, newAnswer]);
    setDoubt(prev => ({ ...prev, answers_count: (prev.answers_count || 0) + 1 }));
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recently';
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="page doubt-details-page">
        <div className="container" style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-muted)' }}>
          Loading question thread...
        </div>
      </div>
    );
  }

  if (!doubt) {
    return (
      <div className="page doubt-details-page">
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>Question Not Found</h2>
          <p style={{ color: 'var(--color-text-dim)', marginBottom: '24px' }}>
            The requested doubt may have been removed or does not exist.
          </p>
          <Link to="/doubts" className="doubt-details__back">
            ← Return to Doubts Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page doubt-details-page">
      <div className="container" style={{ maxWidth: '860px' }}>
        <Link to="/doubts" className="doubt-details__back">
          ← Back to All Doubts
        </Link>

        {/* Question detail card */}
        <div className="doubt-details__card">
          <div className="doubt-card__header">
            <span className="doubt-card__category">{doubt.category || 'General'}</span>
            <span className="doubt-card__meta">Asked on {formatDate(doubt.created_at)}</span>
          </div>

          <h1 className="doubt-details__title">{doubt.title}</h1>
          <p className="doubt-details__body">{doubt.description}</p>

          <div className="doubt-card__footer">
            <div className="doubt-card__author">
              <div className="doubt-card__avatar">{doubt.author_name ? doubt.author_name.charAt(0).toUpperCase() : 'S'}</div>
              <span>Asked by <strong>{doubt.author_name || 'Student'}</strong></span>
            </div>

            <button
              onClick={handleUpvoteDoubt}
              className={`doubt-card__upvote-btn ${hasVoted ? 'doubt-card__upvote-btn--voted' : ''}`}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
              <span>{doubt.upvotes || 0} Upvotes</span>
            </button>
          </div>
        </div>

        {/* Answers List & Discussion */}
        <div className="doubt-details__answers-section">
          <div className="doubt-details__answers-title">
            <span>{answers.length} {answers.length === 1 ? 'Answer' : 'Answers & Mentorship Replies'}</span>
          </div>

          {answers.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '36px var(--container-px)',
              background: 'rgba(18, 16, 13, 0.6)',
              border: '1px dashed var(--color-border)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-sm)', margin: 0 }}>
                No answers posted yet. If you know the answer or want to guide a peer, write a response below!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {answers.map(answer => (
                <AnswerCard key={answer.id} answer={answer} />
              ))}
            </div>
          )}

          {/* Form to submit an answer */}
          <div style={{ marginTop: '24px' }}>
            <AnswerForm
              doubtId={doubt.id}
              onAnswerSubmitted={handleAnswerSubmitted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
