import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Navbar from '../components/Navbar'; // Import your Navbar component
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    healthAlert: {
      diseases: [],
      stations: [],
      subscribed: false,
    },
  });
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData);
            setFormData({
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              age: userData.age || '',
              gender: userData.gender || '',
              email: userData.email || '',
              healthAlert: userData.healthAlert || {
                diseases: [],
                stations: [],
                subscribed: false,
              },
            });
          } else {
            console.error("User data not found.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHealthAlertChange = (field, index, value) => {
    const updatedHealthAlert = { ...formData.healthAlert };
    if (field === 'diseases') {
      updatedHealthAlert.diseases[index] = value;
    } else if (field === 'stations') {
      updatedHealthAlert.stations[index] = value;
    }
    setFormData({ ...formData, healthAlert: updatedHealthAlert });
  };

  const handleAddField = (field) => {
    const updatedHealthAlert = { ...formData.healthAlert };
    if (field === 'diseases') {
      updatedHealthAlert.diseases.push('');
    } else if (field === 'stations') {
      updatedHealthAlert.stations.push('');
    }
    setFormData({ ...formData, healthAlert: updatedHealthAlert });
  };

  const handleSaveChanges = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser.uid), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          gender: formData.gender,
          email: formData.email,
          healthAlert: formData.healthAlert,
        });
        alert("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <h1>User Profile</h1>
          {user ? (
            <>
              <div className="profile-section">
                <h2>Personal Information</h2>
                <div className="profile-field">
                  <label>First Name:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{formData.firstName}</span>
                  )}
                </div>
                <div className="profile-field">
                  <label>Last Name:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{formData.lastName}</span>
                  )}
                </div>
                <div className="profile-field">
                  <label>Age:</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{formData.age}</span>
                  )}
                </div>
                <div className="profile-field">
                  <label>Gender:</label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <span>{formData.gender}</span>
                  )}
                </div>
                <div className="profile-field">
                  <label>Email:</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{formData.email}</span>
                  )}
                </div>
              </div>

              <div className="profile-section">
                <h2>Health Alerts</h2>
                <div className="profile-field">
                  <label>Diseases:</label>
                  {formData.healthAlert.diseases.map((disease, index) => (
                    <div key={index}>
                      {isEditing ? (
                        <input
                          type="text"
                          value={disease}
                          onChange={(e) =>
                            handleHealthAlertChange('diseases', index, e.target.value)
                          }
                        />
                      ) : (
                        <span>{disease}</span>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button onClick={() => handleAddField('diseases')}>
                      Add Disease
                    </button>
                  )}
                </div>
                <div className="profile-field">
                  <label>Stations:</label>
                  {formData.healthAlert.stations.map((station, index) => (
                    <div key={index}>
                      {isEditing ? (
                        <input
                          type="text"
                          value={station}
                          onChange={(e) =>
                            handleHealthAlertChange('stations', index, e.target.value)
                          }
                        />
                      ) : (
                        <span>{station}</span>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button onClick={() => handleAddField('stations')}>
                      Add Station
                    </button>
                  )}
                </div>
                <div className="profile-field">
                  <label>Subscribed:</label>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      checked={formData.healthAlert.subscribed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          healthAlert: {
                            ...formData.healthAlert,
                            subscribed: e.target.checked,
                          },
                        })
                      }
                    />
                  ) : (
                    <span>{formData.healthAlert.subscribed ? 'Yes' : 'No'}</span>
                  )}
                </div>
              </div>

              <div className="profile-actions">
                {isEditing ? (
                  <button onClick={handleSaveChanges}>Save Changes</button>
                ) : (
                  <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;