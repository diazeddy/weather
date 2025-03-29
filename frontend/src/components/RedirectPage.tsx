import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RedirectPage: React.FC = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/${shortUrl}`);
        window.location.href = response.data.originalUrl;
      } catch (error) {
        console.error('Error fetching URL:', error);
      }
    };
    fetchUrl();
  }, [shortUrl]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;