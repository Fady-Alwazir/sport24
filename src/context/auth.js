import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { config } from 'dotenv';

config();
export const AuthContext = createContext('');

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState('');

  const generateToken = async () => {
    const {
      data: {
        data: { access_token },
      },
    } = await axios.post(`${process.env.REACT_APP_BASE_URL}/oauth/token`, {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      grant_type: process.env.REACT_APP_GRANT_TYPE,
    });

    setAccessToken(access_token);
  };

  useEffect(() => {
    try {
      generateToken();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={accessToken}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
