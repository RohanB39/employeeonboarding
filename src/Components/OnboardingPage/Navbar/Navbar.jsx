import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Personal Info');
    const navigate = useNavigate();

    const handleTabClick = (tab, path) => {
        setActiveTab(tab);
    };

    return (
        <div className="onboarding-page">
            <nav className="navbar">
                <div className="navbar-content">
                    <button
                        className={activeTab === 'Personal Info' ? 'active' : ''}
                        onClick={() => handleTabClick('Personal Info', '/personal')}
                    >
                        Personal Info
                    </button>
                    <button
                        className={activeTab === 'Address Info' ? 'active' : ''}
                        onClick={() => handleTabClick('Address Info', '/address')}
                    >
                        Address Info
                    </button>
                    <button
                        className={activeTab === 'Emergency & ID' ? 'active' : ''}
                        onClick={() => handleTabClick('Emergency & ID', '/emergency')}
                    >
                        Emergency & ID
                    </button>
                    <button
                        className={activeTab === 'Bank, PF & Family' ? 'active' : ''}
                        onClick={() => handleTabClick('Bank, PF & Family', '/bank-pf-family')}
                    >
                        Bank, PF & Family
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
