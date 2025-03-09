import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './HealthAlert.css';
import BG from '../assets/BGGG.jpg';

function HealthAlert() {
  const [user, setUser] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [otherDisease, setOtherDisease] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  // List of available stations
  const stationOptions = [
    'Kathmandu',
    'Janakpur',
    'Pokhara',
    'Butwal',
    'Bhaktapur',
    'Nepalgunj',
    'Mahendranagar',
    'Biratnagar',
    'Birgunj',
    'Dharan',
  ];

  // List of diseases
  const diseases = ['Pneumonia', 'Asthma', 'COPD', 'Sarcoidosis', 'Bronchiectasis', 'Other', 'No Diseases'];

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().healthAlert?.subscribed) {
          setIsSubscribed(true);
          setStations(userDoc.data().healthAlert.stations);
          setSelectedDiseases(userDoc.data().healthAlert.diseases);
          setPhoneNumber(userDoc.data().healthAlert.phoneNumber || '');
        }
      } else {
        setUser(null);
        setIsSubscribed(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle disease selection logic
  const handleDiseaseChange = (disease) => {
    if (disease === 'No Diseases') {
      // If "No Diseases" is selected, clear all other selections
      setSelectedDiseases(['No Diseases']);
    } else if (disease === 'Other') {
      setSelectedDiseases((prev) =>
        prev.includes('Other') ? prev.filter((d) => d !== 'Other') : [...prev, 'Other']
      );
    } else {
      setSelectedDiseases((prev) =>
        prev.includes(disease)
          ? prev.filter((d) => d !== disease)
          : [...prev.filter((d) => d !== 'No Diseases'), disease]
      );
    }
  };

  // Handle subscription form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!stations.length || selectedDiseases.length === 0 || !agreed || !phoneNumber) {
      setMessage('Please fill all fields and agree to terms');
      return;
    }
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          healthAlert: {
            stations,
            diseases: selectedDiseases.map((d) => (d === 'Other' ? otherDisease : d)),
            subscribed: true,
            phoneNumber,
          },
        },
        { merge: true }
      );
      setIsSubscribed(true);
      setMessage('Subscription successful!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Subscription failed. Please try again.');
    }
  };

  // Handle unsubscribe confirmation
  const handleUnsubscribe = async () => {
    if (window.confirm('Are you sure you want to unsubscribe?')) {
      try {
        await setDoc(
          doc(db, 'users', user.uid),
          {
            healthAlert: { subscribed: false },
          },
          { merge: true }
        );
        setIsSubscribed(false);
        navigate('/HealthAlert');
      } catch (error) {
        console.error('Unsubscribe error:', error);
      }
    }
  };

  return (
    <div className="health-alert-page" style={{ backgroundImage: `url(${BG})` }}>
      <Navbar />
      <div className="health-alert-container">
        {!user ? (
          <div className="auth-required">
            <h2>NepAir - AQI Monitoring Service</h2>
            <p className="description">
              Protect your health with our free email and SMS alert service. Get notified about
              dangerous air quality levels in your area.
            </p>
            <button onClick={() => navigate('/login')} className="cta-button">
              Login to Subscribe
            </button>
          </div>
        ) : isSubscribed ? (
          <div className="subscription-success">
            <div className="success-icon">✓</div>
            <h2>Subscription Active!</h2>
            <p className="success-message">
              Email: {user.email}
              <br />
              Phone: {phoneNumber}
              <br />
              You'll receive alerts for {stations.join(', ')}.<br />
              Monitoring diseases: {selectedDiseases.join(', ')}.
            </p>
            <div className="action-buttons">
              <button
                onClick={() => setIsSubscribed(false)}
                className="cta-button"
              >
                Edit Preferences
              </button>
              <button
                onClick={handleUnsubscribe}
                className="cta-button secondary"
              >
                Unsubscribe
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="subscription-form">
            <h2>Health Alert Subscription</h2>
            <div className="form-group">
              <label>Select Monitoring Stations:</label>
              <select
                multiple
                value={stations}
                onChange={(e) =>
                  setStations(Array.from(e.target.selectedOptions, (option) => option.value))
                }
                className="station-select"
                required
              >
                {stationOptions.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
              <small>Hold Ctrl (Windows) or Command (Mac) to select multiple stations.</small>
            </div>
            <div className="form-group">
              <label>Select Respiratory Diseases:</label>
              <div className="disease-grid">
                {diseases.map((disease) => (
                  <label key={disease} className="disease-option">
                    <input
                      type="checkbox"
                      checked={selectedDiseases.includes(disease)}
                      onChange={() => handleDiseaseChange(disease)}
                    />
                    {disease}
                    {disease === 'Other' && selectedDiseases.includes('Other') && (
                      <input
                        type="text"
                        value={otherDisease}
                        onChange={(e) => setOtherDisease(e.target.value)}
                        placeholder="Specify other disease"
                        required
                        className="other-input"
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number (Nepal):</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="phone-input"
              />
            </div>
            <label className="agreement">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              I agree to receive email and SMS alerts based on my preferences
            </label>
            <button type="submit" className="cta-button">
              Subscribe Now
            </button>
          </form>
        )}
        {message && (
          <div className={`message ${message.includes('failed') ? 'error' : ''}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthAlert;