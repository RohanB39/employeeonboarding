import React, { useState } from 'react';
import './Emergency.css';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { fireDB } from '../../Firebase/FirebaseConfig'; 
import { useNavigate } from 'react-router-dom'; 

const Emergency = () => {
    // State variables for the form fields
    const [contactName, setContactName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [relationship, setRelationship] = useState('');
    const [identification, setIdentification] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [aadhaarName, setAadhaarName] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('');
    const location = useLocation();
    const { employeeId } = location.state || {}; 
    const navigate = useNavigate();

    const handleIdentificationChange = (e) => {
        setIdentification(e.target.value);
        // Reset other fields when identification type changes
        setAadhaarNumber('');
        setAadhaarName('');
        setPassportNumber('');
        setDrivingLicenseNumber('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const employeeDocRef = doc(fireDB, 'employees', employeeId); 
            const employeeDoc = await getDoc(employeeDocRef);
            if (employeeDoc.exists()) {
                const emergencyContact = {
                    contactName,
                    mobileNumber,
                    relationship,
                    identification,
                    aadhaarNumber,
                    aadhaarName,
                    passportNumber,
                    drivingLicenseNumber,
                };

                // Save addressInfo to Firestore under the employee's document
                await setDoc(employeeDocRef, { emergencyContact }, { merge: true });
                alert('Emergency information saved successfully:', emergencyContact);
                navigate('/bank-pf-family', { state: { employeeId } });
            } else {
                console.error('No such employee document!');
            }
        } catch (error) {
            console.error('Error saving address info:', error);
        }
    };

    return (
        <div className="personal-page">
            <Navbar /> <br />
            <h1>Emergency Information</h1>
            {employeeId ? (
                <p>Your Employee ID: {employeeId}</p>
            ) : (
                <p>No Employee ID found.</p>
            )}
            <div id="recaptcha-container"></div> {/* ReCAPTCHA container */}
            <form id="personalInfoForm" onSubmit={handleSubmit}>
                <div className='formDivs1'>
                    <div className="form-group">
                        <label htmlFor="contactName">Emergency Contact Name</label>
                        <input
                            type="text"
                            id="contactName"
                            name="contactName"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="relationship">Relationship</label>
                        <select
                            id="relationship"
                            name="relationship"
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                            required
                        >
                            <option value="">Select Relationship</option>
                            <option value="parent">Parent</option>
                            <option value="sibling">Sibling</option>
                            <option value="spouse">Spouse</option>
                            <option value="friend">Friend</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="identification">Identification</label>
                        <select
                            id="identification"
                            name="identification"
                            value={identification}
                            onChange={handleIdentificationChange}
                            required
                        >
                            <option value="">Select Identification Type</option>
                            <option value="aadhaar">Aadhaar</option>
                            <option value="passport">Passport</option>
                            <option value="drivingLicense">Driving License</option>
                        </select>
                    </div>

                    {/* Conditional rendering based on selected identification */}
                    {identification === 'aadhaar' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="aadhaarNumber">Aadhaar Number</label>
                                <input
                                    type="text"
                                    id="aadhaarNumber"
                                    name="aadhaarNumber"
                                    value={aadhaarNumber}
                                    onChange={(e) => setAadhaarNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="aadhaarName">Name in Aadhaar</label>
                                <input
                                    type="text"
                                    id="aadhaarName"
                                    name="aadhaarName"
                                    value={aadhaarName}
                                    onChange={(e) => setAadhaarName(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {identification === 'passport' && (
                        <div className="form-group">
                            <label htmlFor="passportNumber">Passport Number</label>
                            <input
                                type="text"
                                id="passportNumber"
                                name="passportNumber"
                                value={passportNumber}
                                onChange={(e) => setPassportNumber(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {identification === 'drivingLicense' && (
                        <div className="form-group">
                            <label htmlFor="drivingLicenseNumber">Driving License Number</label>
                            <input
                                type="text"
                                id="drivingLicenseNumber"
                                name="drivingLicenseNumber"
                                value={drivingLicenseNumber}
                                onChange={(e) => setDrivingLicenseNumber(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="submit-button">Next</button>
                </div>
            </form>
        </div>
    );
};

export default Emergency;
