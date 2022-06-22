import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import './styles.css';
import App from './components/App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);