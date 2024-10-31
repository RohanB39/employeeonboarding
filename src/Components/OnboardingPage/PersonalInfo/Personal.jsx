import React, { useState } from 'react';
import './Personal.css';
import Navbar from '../Navbar/Navbar';
import { doc, setDoc } from 'firebase/firestore';
import { fireDB } from '../../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom'; 

const Personal = () => {
    // State for each field
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [countryOfOrigin, setCountryOfOrigin] = useState('');
    const [nationality, setNationality] = useState('');
    const [internationalEmployee, setInternationalEmployee] = useState('');
    const [physicallyChallenged, setPhysicallyChallenged] = useState('');
    const [disabilityType, setDisabilityType] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    function generateEmployeeId(firstName, lastName) {
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const generatedId = `${firstInitial}${lastInitial}_TECTI${randomNum}`;
        setEmployeeId(generatedId);
    }

    const navigate = useNavigate();


    // Dropdown data
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
    const countries = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia',
        'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
        'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
        'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
        'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic (Czechia)',
        'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
        'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini (fmr. "Swaziland")', 'Ethiopia', 'Fiji', 'Finland',
        'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
        'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
        'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
        'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
        'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco',
        'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
        'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
        'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
        'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
        'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
        'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
        'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
        'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
        'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    ];
    // Add more countries as needed
    const nationalities = ['Indian', 'American', 'Canadian', 'Australian', 'British', 'German', 'French', 'Chinese', 'Japanese', 'Korean', 'Brazilian']; // Add more nationalities
    const yesNoOptions = ['Yes', 'No'];
    const genders = ['Male', 'Female', 'Other'];

    // Handle form submission
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !bloodGroup || !personalEmail || !mobileNumber) {
            alert("Please fill all the required fields");
            return;
        }
    
        // Create an object for the form data (excluding employeeId)
        const personalInfo = {
            firstName,
            lastName,
            bloodGroup,
            personalEmail,
            fatherName,
            maritalStatus,
            countryOfOrigin,
            nationality,
            internationalEmployee,
            physicallyChallenged,
            disabilityType: physicallyChallenged === 'Yes' ? disabilityType : '',
            gender,
            dateOfBirth,
            mobileNumber
        };
    
        try {
            // Set the document ID to be employeeId and save data in the 'employees' collection
            await setDoc(doc(fireDB, 'employees', employeeId), {
                employeeId, 
                personalInfo,
                Status: 'Active',
            });
    
            alert(`Document with Employee ID: ${employeeId} successfully written.`);
            navigate('/address', { state: { employeeId } });
            // Clear form fields or show success message as needed
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };


    return (
        <div className="personal-page">
            <Navbar /> <br />
            <h1>Personal Information</h1>
            <form id="personalInfoForm" onSubmit={handleSubmit}>
                <div className='formDivs1'>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div>
                        <button className='btn' onClick={() => generateEmployeeId(firstName, lastName)}>
                            Generate Employee ID
                        </button>
                        <p className='para'>{employeeId}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bloodGroup">Blood Group</label>
                        <select id="bloodGroup" name="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
                            <option value="">Select</option>
                            {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="personalEmail">Personal Email</label>
                        <input type="email" id="personalEmail" name="personalEmail" value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fatherName">Father's Name</label>
                        <input type="text" id="fatherName" name="fatherName" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maritalStatus">Marital Status</label>
                        <select id="maritalStatus" name="maritalStatus" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} required>
                            <option value="">Select</option>
                            {maritalStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="countryOfOrigin">Country of Origin</label>
                        <select id="countryOfOrigin" name="countryOfOrigin" value={countryOfOrigin} onChange={(e) => setCountryOfOrigin(e.target.value)} required>
                            <option value="">Select</option>
                            {countries.map((country) => <option key={country} value={country}>{country}</option>)}
                        </select>
                    </div>
                </div>

                <div className='formDivs'>
                    <div className="form-group">
                        <label htmlFor="nationality">Nationality</label>
                        <select id="nationality" name="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} required>
                            <option value="">Select</option>
                            {nationalities.map((nation) => <option key={nation} value={nation}>{nation}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="internationalEmployee">International Employee</label>
                        <select id="internationalEmployee" name="internationalEmployee" value={internationalEmployee} onChange={(e) => setInternationalEmployee(e.target.value)} required>
                            <option value="">Select</option>
                            {yesNoOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="physicallyChallenged">Physically Challenged</label>
                        <select id="physicallyChallenged" name="physicallyChallenged" value={physicallyChallenged} onChange={(e) => setPhysicallyChallenged(e.target.value)} required>
                            <option value="">Select</option>
                            {yesNoOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </div>
                    {physicallyChallenged === 'Yes' && (
                        <div className="form-group">
                            <label htmlFor="disabilityType">Disability Type</label>
                            <input type="text" id="disabilityType" name="disabilityType" value={disabilityType} onChange={(e) => setDisabilityType(e.target.value)} />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Select</option>
                            {genders.map((g) => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Mobile">Mobile Number</label>
                        <input type="number" id="mobilenumber" name="mobilenumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn'>Next</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Personal;
