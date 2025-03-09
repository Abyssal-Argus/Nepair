import React, { useEffect, useMemo, useState } from 'react';
import { db } from '../firebase'; // Import Firestore database
import { collection, getDocs, query, where } from 'firebase/firestore'; // Firestore utilities
import emailjs from '@emailjs/browser';
import { FaBiohazard, FaSkull, FaExclamationTriangle } from "react-icons/fa";
import { MdDangerous, MdHealthAndSafety } from "react-icons/md";

function OldData({ setShowInfo }) {
  const [khumaltarPM25, setKhumaltarPM25] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to determine AQI category based on PM2.5 value
  const getCategory = (value) => {
    if (value === '-') return '';
    if (value > 200) return 'Hazardous';
    if (value > 150) return 'Sensitive';
    if (value > 100) return 'Unhealthy';
    if (value > 50) return 'Moderate';
    return 'Good';
  };

  // Mapping of categories to icons
  const categoryIcons = {
    Hazardous: <FaBiohazard />,
    Sensitive: <FaSkull />,
    Unhealthy: <FaExclamationTriangle />,
    Moderate: <MdDangerous />,
    Good: <MdHealthAndSafety />,
  };

  // Function to fetch real-time PM2.5 data for Khumaltar
  const fetchRealTimePM25 = async () => {
    try {
      const response = await fetch(
        'https://api.waqi.info/feed/@10124/?token=ec4f4e7dd3eab970a6daa16025d4d2d696ad4b28'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch AQI data');
      }
      const data = await response.json();
      if (data.status === 'ok') {
        const pm25Value = data.data.iaqi.pm25?.v || '-'; // Extract PM2.5 value or fallback to '-'
        setKhumaltarPM25(pm25Value);
      } else {
        console.error('API returned an error:', data.message);
        setKhumaltarPM25('-'); // Fallback value
      }
    } catch (error) {
      console.error('Error fetching real-time PM2.5 data:', error.message);
      setKhumaltarPM25('-'); // Fallback value
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  // Fetch real-time PM2.5 data on component mount
  useEffect(() => {
    fetchRealTimePM25();
  }, []);

  // Memoize the `data` array with dynamic PM2.5 value for Khumaltar
  const data = useMemo(() => {
    return [
      { station: 'Kathmandu', value: khumaltarPM25, category: getCategory(khumaltarPM25) },
      { station: 'Janakpur', value: 180, category: 'Hazardous' },
      { station: 'Pokhara', value: '100', category: 'Hazardous' },
      { station: 'Butwal', value: 100, category: 'Unhealthy' },
      { station: 'Bhaktapur', value: 100, category: 'Unhealthy' },
      { station: 'Nepalgunj', value: 100, category: 'Sensitive' },
      { station: 'Mahendranagar', value: 80, category: 'Moderate' },
      { station: 'Biratnagar', value: 400, category: 'Good' },
      { station: 'Birgunj', value: 90, category: 'Moderate' },
      { station: 'Dharan', value: 80, category: 'Moderate' },
    ].map((entry) => ({
      ...entry,
      icon: categoryIcons[entry.category] || null, // Assign the icon based on the category
    }));
  }, [khumaltarPM25]);

  // Effect to check AQI and notify users
  useEffect(() => {
    const checkAQIAndNotify = async () => {
      // Filter stations with high AQI values
      const highAQIStations = data.filter((entry) => entry.value !== '-' && entry.value > 200);
      console.log('High AQI stations:', highAQIStations);

      if (highAQIStations.length === 0) {
        console.log('No high AQI stations detected.');
        return;
      }

      try {
        // Fetch user emails from Firestore
        const usersRef = collection(db, 'users'); // Assuming 'users' is the collection name
        const q = query(usersRef, where('healthAlert.subscribed', '==', true)); // Only notify subscribed users
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.warn('No subscribed users found in Firestore.');
          return;
        }

        // Process each user document
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userEmail = userData.email;
          const userStations = userData.healthAlert.stations; // Array of stations selected by the user

          // Find high AQI stations that match the user's selected stations
          const relevantStations = highAQIStations.filter((station) =>
            userStations.includes(station.station)
          );

          if (relevantStations.length > 0) {
            // Prepare email content
            const stationsText = relevantStations
              .map((station) => `${station.station}: ${station.value}`)
              .join('\n');

            // Send email using EmailJS
            emailjs
              .send(
                'service_thkeu45', // Your Service ID
                'template_kk30yhg', // Your Template ID
                {
                  to_email: userEmail,
                  stations: stationsText,
                },
                'v6pNvmbYK2iyUdR2Z' // Your Public Key
              )
              .then(
                (result) => {
                  console.log('Email sent successfully to:', userEmail, result.text);
                },
                (error) => {
                  console.error('Error sending email to:', userEmail, error.text);
                }
              );
          }
        });
      } catch (error) {
        console.error('Error fetching Firestore data:', error.message);
      }
    };

    checkAQIAndNotify();
  }, [data]);

  // Render loading state while fetching real-time data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table className="oldData tab1">
        <thead>
          <tr>
            <th>Stations (AQI)</th>
            <th>Yesterday 24hr</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} onMouseEnter={() => setShowInfo(true)}>
              <td id='category' className={entry.category}>{entry.station}{entry.icon}</td>
              <td className='tdata'>{entry.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OldData;