/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WaitlistForm from './components/WaitlistForm';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WaitlistForm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
