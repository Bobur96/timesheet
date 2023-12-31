import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);
