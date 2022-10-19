import { useContext } from 'react';
import { AuthContext } from './context/auth';

function App() {
  const accessToken = useContext(AuthContext);

  return (
    <div className="App">
      <h1>React App</h1>
    </div>
  );
}

export default App;
