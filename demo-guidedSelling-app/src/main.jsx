import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './routes/mainPage';
import ErrorPage from './routes/ErrorPage';
import PromptTest2 from './routes/PromptTest2';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/projects/greenvoyage">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="promptTest2" element={<PromptTest2 />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
