import React, { useState } from 'react';

const Task3 = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [headersData, setHeadersData] = useState(null);
  const [responseData, setResponseData] = useState(null); // Store response body
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }
    setErrorMessage(''); 

    try {
      const response = await fetch('https://chimpu.online/api/post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          phonenumber: phoneNumber,
        }),
      });

      console.log("Response object:", response);
      const data = await response.text(); // Change to response.json() if it's JSON
      console.log("Response body:", data);
      setResponseData(data);

      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      setHeadersData(headers);
    } catch (error) {
      console.error('Error posting phone number:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#f4f4f4',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    },
    label: {
      display: 'block',
      fontSize: '16px',
      marginBottom: '8px',
      color: '#00008B', 
    },
    inputField: {
      width: '100%',
      padding: '10px',
      marginBottom: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.2s ease-in-out',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out',
    },
    errorMessage: {
      color: 'red',
      marginTop: '-10px',
      marginBottom: '16px',
      fontSize: '14px',
    },
    dataContainer: {
      marginTop: '20px',
      backgroundColor: '#e9ecef',
      padding: '15px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      color: '#00008B', 
    },
    textBlackBlue: {
      color: '#00008B', 
    },
  };

  return (
    <div style={{ ...styles.container, ...styles.textBlackBlue }}>
      <h2 style={styles.textBlackBlue}>Post Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            maxLength="10"
            style={styles.inputField}
          />
        </label>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>

      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

      {headersData && (
        <div style={styles.dataContainer}>
          <h3 style={styles.textBlackBlue}>Headers Data Received:</h3>
          <pre>{JSON.stringify(headersData, null, 2)}</pre>
        </div>
      )}

      {responseData && (
        <div style={styles.dataContainer}>
          <h3 style={styles.textBlackBlue}>Response Body:</h3>
          <pre>{responseData}</pre>
        </div>
      )}
    </div>
  );
};

export default Task3;
