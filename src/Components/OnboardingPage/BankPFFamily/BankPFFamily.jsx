import React, { useState } from 'react';
import './BankPFFamily.css';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { fireDB } from '../../Firebase/FirebaseConfig';

const BankPFFamily = () => {
    // State to manage bank information
    const [bankDetails, setBankDetails] = useState({
        bankAccountNumber: '',
        confirmBankAccountNumber: '',
        ifscCode: '',
        bankName: '',
        branch: '',
        nameAsPerBank: '',
        accountType: 'Saving',
        previousPfAccountNumber: '',
        uan: ''
    });

    const location = useLocation();
    const { employeeId } = location.state || {}; 

    // State to manage family members
    const [familyMembers, setFamilyMembers] = useState([]);

    // Handle change for bank details inputs
    const handleBankChange = (e) => {
        const { name, value } = e.target;
        setBankDetails({ ...bankDetails, [name]: value });
    };

    // Handle change for family member inputs
    const handleFamilyChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFamilyMembers = [...familyMembers];
        updatedFamilyMembers[index] = { ...updatedFamilyMembers[index], [name]: value };
        setFamilyMembers(updatedFamilyMembers);
    };

    // Add a new family member
    const addFamilyMember = () => {
        setFamilyMembers([...familyMembers, { name: '', relationship: '', dob: '', gender: '', bloodGroup: '', nationality: '', minorOrIllness: '' }]);
    };

    // Remove a family member
    const removeFamilyMember = (index) => {
        const updatedFamilyMembers = familyMembers.filter((_, i) => i !== index);
        setFamilyMembers(updatedFamilyMembers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const employeeDocRef = doc(fireDB, 'employees', employeeId); 
            const employeeDoc = await getDoc(employeeDocRef);
            if (employeeDoc.exists()) {
                const dataToSave = {
                    bankDetails,
                    familyMembers,
                };

                // Save data to Firestore under the employee's document
                await setDoc(employeeDocRef, dataToSave, { merge: true });
                alert('Onbording Processing Is Completed Waiting For HR Confirmation');    
            } else {
                console.error('No such employee document!');
            }
        } catch (error) {
            console.error('Error saving bank and family information:', error);
        }
    };

    return (
        <div className="personal-page">
            <Navbar /> <br />
            <h1>Bank Information</h1>
            {employeeId ? (
                <p>Your Employee ID: {employeeId}</p>
            ) : (
                <p>No Employee ID found.</p>
            )}

            <form id="personalInfoForm" onSubmit={handleSubmit}>
                <div className='formDivs1'>
                    {/* Bank Account Number */}
                    <div className="form-group">
                        <label htmlFor="bankAccountNumber">Bank Account Number</label>
                        <input type="text" id="bankAccountNumber" name="bankAccountNumber" value={bankDetails.bankAccountNumber} onChange={handleBankChange} required />
                    </div>

                    {/* Confirm Bank Account Number */}
                    <div className="form-group">
                        <label htmlFor="confirmBankAccountNumber">Confirm Bank Account Number</label>
                        <input type="text" id="confirmBankAccountNumber" name="confirmBankAccountNumber" value={bankDetails.confirmBankAccountNumber} onChange={handleBankChange} required />
                    </div>

                    {/* IFSC Code */}
                    <div className="form-group">
                        <label htmlFor="ifscCode">IFSC Code</label>
                        <input type="text" id="ifscCode" name="ifscCode" value={bankDetails.ifscCode} onChange={handleBankChange} required />
                    </div>

                    {/* Bank Name */}
                    <div className="form-group">
                        <label htmlFor="bankName">Bank Name</label>
                        <input type="text" id="bankName" name="bankName" value={bankDetails.bankName} onChange={handleBankChange} required />
                    </div>

                    {/* Branch */}
                    <div className="form-group">
                        <label htmlFor="branch">Branch</label>
                        <input type="text" id="branch" name="branch" value={bankDetails.branch} onChange={handleBankChange} required />
                    </div>

                    {/* Name as per Bank Account */}
                    <div className="form-group">
                        <label htmlFor="nameAsPerBank">Name as per Bank Account</label>
                        <input type="text" id="nameAsPerBank" name="nameAsPerBank" value={bankDetails.nameAsPerBank} onChange={handleBankChange} required />
                    </div>

                    {/* Account Type */}
                    <div className="form-group">
                        <label htmlFor="accountType">Account Type</label>
                        <select id="accountType" name="accountType" value={bankDetails.accountType} onChange={handleBankChange}>
                            <option value="Saving">Saving</option>
                            <option value="Current">Current</option>
                            <option value="Salary">Salary</option>
                        </select>
                    </div>

                    {/* Previous PF Account Number */}
                    <div className="form-group">
                        <label htmlFor="previousPfAccountNumber">Previous PF Account Number</label>
                        <input type="text" id="previousPfAccountNumber" name="previousPfAccountNumber" value={bankDetails.previousPfAccountNumber} onChange={handleBankChange} />
                    </div>

                    {/* UAN */}
                    <div className="form-group">
                        <label htmlFor="uan">UAN</label>
                        <input type="text" id="uan" name="uan" value={bankDetails.uan} onChange={handleBankChange} required />
                    </div>
                </div>

                {/* Family Details Section */}
                <h4>Family Details</h4>
                {familyMembers.map((member, index) => (
                    <div key={index} className="formDivs1">
                        <h5>Member {index + 1}</h5>
                        {/* Member Name */}
                        <div className="form-group">
                            <label htmlFor={`familyMemberName_${index}`}>Name</label>
                            <input type="text" id={`familyMemberName_${index}`} name="name" value={member.name} onChange={(e) => handleFamilyChange(index, e)} required />
                        </div>
                        {/* Relationship */}
                        <div className="form-group">
                            <label htmlFor={`relationship_${index}`}>Relationship</label>
                            <input type="text" id={`relationship_${index}`} name="relationship" value={member.relationship} onChange={(e) => handleFamilyChange(index, e)} required />
                        </div>
                        {/* DOB */}
                        <div className="form-group">
                            <label htmlFor={`dob_${index}`}>DOB</label>
                            <input type="date" id={`dob_${index}`} name="dob" value={member.dob} onChange={(e) => handleFamilyChange(index, e)} required />
                        </div>
                        {/* Gender */}
                        <div className="form-group">
                            <label htmlFor={`gender_${index}`}>Gender</label>
                            <select id={`gender_${index}`} name="gender" value={member.gender} onChange={(e) => handleFamilyChange(index, e)} required>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {/* Blood Group */}
                        <div className="form-group">
                            <label htmlFor={`bloodGroup_${index}`}>Blood Group</label>
                            <select id={`bloodGroup_${index}`} name="bloodGroup" value={member.bloodGroup} onChange={(e) => handleFamilyChange(index, e)} required>
                                <option value="">Select</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                        {/* Nationality */}
                        <div className="form-group">
                            <label htmlFor={`nationality_${index}`}>Nationality</label>
                            <input type="text" id={`nationality_${index}`} name="nationality" value={member.nationality} onChange={(e) => handleFamilyChange(index, e)} required />
                        </div>
                        {/* Minor/Mental Illness */}
                        <div className="form-group">
                            <label htmlFor={`minorOrIllness_${index}`}>Minor/Mental Illness</label>
                            <input type="text" id={`minorOrIllness_${index}`} name="minorOrIllness" value={member.minorOrIllness} onChange={(e) => handleFamilyChange(index, e)} required />
                        </div>
                        <button type="button" onClick={() => removeFamilyMember(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addFamilyMember}>Add Family Member</button>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default BankPFFamily;
