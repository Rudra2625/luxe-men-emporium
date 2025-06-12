
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import './index.css'; // Or './styles.css' — whatever your main CSS file is
import { store } from './components/redux/store'; // path to your Redux store
=======
import './index.css';
import { store } from './components/redux/store';
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
