import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/shorten', { url });
      setShortUrl(response.data.shortUrl);
      setError('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <div>
          <p>Shortened URL: {shortUrl}</p>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UrlShortener;