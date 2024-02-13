import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/css/main.css';
import { store } from './reducer/app/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
