// src/components/Restaurant/FeedbackForm.js (Enhanced with Validation)
import React, { useState } from 'react';
import API from '../../api';

const FeedbackForm = ({ restaurantId }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }
    try {
      await API.post(`/restaurants/${restaurantId}/feedback`, { rating, comment });
      setSuccess('Feedback submitted successfully!');
      setRating('');
      setComment('');
      setError('');
    } catch (err) {
      setError('Failed to submit feedback.');
    }
  };

  return (
    <div>
      <h3>Leave a Feedback</h3>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submitFeedback}>
        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="" disabled>
              Rate the restaurant
            </option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment"
            required
          />
        </label>
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
