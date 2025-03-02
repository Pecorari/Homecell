import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';

const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await useApi.get('/check-auth');
        setUser(response.data.message);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  return { loading, user };
};

export default useAuth;
