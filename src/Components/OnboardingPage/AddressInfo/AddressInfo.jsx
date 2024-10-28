import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fireDB } from '../../Firebase/FirebaseConfig'; 
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './AddressInfo.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom'; 

const AddressInfo = () => {
    const location = useLocation();
    const { employeeId } = location.state || {};  // Extract employeeId from the passed state

    // State variables for the form fields
    const [permanentAddress, setPermanentAddress] = useState('');
    const [presentAddress, setPresentAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [document, setDocument] = useState(null); // State for document upload
    const navigate = useNavigate();

    const handleDocumentUpload = (e) => {
        setDocument(e.target.files[0]); // Store the uploaded file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get the document for the specific employee ID
            const employeeDocRef = doc(fireDB, 'employees', employeeId); 
            const employeeDoc = await getDoc(employeeDocRef);
            if (employeeDoc.exists()) {
                // Prepare the address info object
                const addressInfo = {
                    permanentAddress,
                    presentAddress,
                    city,
                    state,
                    country,
                    pinCode,
                    document,
                };

                // Save addressInfo to Firestore under the employee's document
                await setDoc(employeeDocRef, { addressInfo }, { merge: true });

                alert('Address information saved successfully:', addressInfo);
                navigate('/emergency', { state: { employeeId } });
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
            <h1>Address Information</h1>
            <h1>Your Employee ID: {employeeId}</h1>
            <form id="personalInfoForm" onSubmit={handleSubmit}>
                <div className='formDivs1'>
                    <div className="form-group">
                        <label htmlFor="permanentAddress">Permanent Address</label>
                        <input
                            type="text"
                            id="permanentAddress"
                            name="permanentAddress"
                            value={permanentAddress}
                            onChange={(e) => setPermanentAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="presentAddress">Present Address</label>
                        <input
                            type="text"
                            id="presentAddress"
                            name="presentAddress"
                            value={presentAddress}
                            onChange={(e) => setPresentAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pinCode">Pin Code</label>
                        <input
                            type="text"
                            id="pinCode"
                            name="pinCode"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="document">Upload Document (Aadhar Card, Driving License, etc.)</label>
                        <input
                            type="file"
                            id="document"
                            name="document"
                            onChange={handleDocumentUpload}
                            accept=".pdf,.jpg,.jpeg,.png" 
                        />
                    </div>
                    <button type="submit" className="submit-button">Next</button>
                </div>
            </form>
        </div>
    );
};

export default AddressInfo;
