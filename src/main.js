import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '../src/styles/index.css';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(HashRouter, { children: _jsx(App, {}) }) }));
