import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './routes/errorPage';
import MainPage from './routes/mainPage';
import PromptTest1 from './routes/promptTest1';
import PromptTest2 from './routes/promptTest2';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />, // error page
  },
  {
    path: 'promptTool1',
    element: <PromptTest1 />,
  },
  {
    path: 'promptTool2',
    element: <PromptTest2 />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
