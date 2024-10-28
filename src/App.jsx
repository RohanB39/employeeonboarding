import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../src/Components/LoginPage/LoginPage'; 
import './App.css';
import Personal from './Components/OnboardingPage/PersonalInfo/Personal';
import AddressInfo from './Components/OnboardingPage/AddressInfo/AddressInfo';
import Emergency from './Components/OnboardingPage/EmergencyAndID/Emergency';
import BankPFFamily from './Components/OnboardingPage/BankPFFamily/BankPFFamily';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/address" element={<AddressInfo />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/bank-pf-family" element={<BankPFFamily />} />
      </Routes>
    </Router>
  );
}

export default App;
