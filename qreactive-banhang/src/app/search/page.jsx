"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter from next/router instead of next/navigation
import MyQR from "./styles.module.css";
import { getEmailUser } from '@/components/emailuser';
import html2canvas from 'html2canvas'; 

function MyQRCodesContent() {
  

  // State to manage search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State to store search results
  const [searchResults, setSearchResults] = useState([]);
  
  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/personalQR/search', { searchQuery });
      setSearchResults(response.data.qrCodes);
    } catch (error) {
      console.error('Error searching for public vCard QR codes:', error);
    }
  };
  
  
  
  return (
    <div>
      <div className={MyQR.search}>
      <input
  type="text"
  className={MyQR.search_input}
  placeholder="Search for other people Vcard ...."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
<button
  className={MyQR.search_button}
  onClick={handleSearch}
  disabled={!searchQuery.trim()} // Disable the button if searchQuery is empty or contains only whitespace
>
  Go
</button>
      </div>
      <div>
        <ul>
          {searchResults.map((qrCode, index) => (
            <li key={index}>
                <div className={MyQR.qrCodeInfo}>
                    {/* Render each search result */}
                    <img src={qrCode.QRcode} alt={qrCode.name} />
                    <p>Name: {qrCode.name}</p>
                    <p>Email: {qrCode.email}</p>
                    <p>Company: {qrCode.company}</p>
                    <p>Position: {qrCode.position}</p>
                    <p>Phone: {qrCode.phone}</p>
                    <p>Address: {qrCode.address}</p>
                    <p>Website: {qrCode.website}</p>
                    <button
                          
                          className={MyQR.dropbtn}
                        >
                          Download
                    </button>
                </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyQRCodesContent;
