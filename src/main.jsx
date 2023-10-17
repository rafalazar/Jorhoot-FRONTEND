import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Surveys from './components/Surveys';
import Vote from './components/Vote';
import Results from './components/Results';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: 'surveys',
    element: <Surveys />,
  },
  {
    path: 'vote',
    element: <Vote />,
  },
  {
    path: 'results',
    element: <Results />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
