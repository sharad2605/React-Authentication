import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import {AuthContextProvider} from './Store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AuthContextProvider>
);
