import { useEffect } from 'react';
import { config } from 'dotenv';
import { CompetitonStats } from './pages';
// import { Matches } from './components';
import axios from './utils/axios';

config();

function App() {
  const generateToken = async () => {
    const {
      data: {
        data: { access_token },
      },
    } = await axios.post('/oauth/token', {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      grant_type: process.env.REACT_APP_GRANT_TYPE,
    });

    localStorage.setItem('token', access_token);
  };

  useEffect(() => {
    try {
      generateToken();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="App">
      <CompetitonStats />
    </div>
  );
}

export default App;
