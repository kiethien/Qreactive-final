"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter from next/router instead of next/navigation
import MyQR from "./styles.module.css";
import { getEmailUser } from '@/components/emailuser';


function MyQRCodesContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/personalQR/search', { searchQuery });
      setSearchResults(response.data.qrCodes);
    } catch (error) {
      console.error('Error searching for public vCard QR codes:', error);
    }
  };

  const downloadVCard = async (qrCode) => {
    try {
      const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${qrCode.name}
ORG:${qrCode.company}
TITLE:${qrCode.position}
TEL:${qrCode.phone}
EMAIL:${qrCode.email}
ADR:${qrCode.address}
URL:${qrCode.website}
END:VCARD`;

      // Create a Blob containing the vCard data
      const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${qrCode.name}.vcf`;
      document.body.appendChild(a);

      // Trigger the click event on the anchor element
      a.click();

      // Revoke the temporary URL to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating vCard:', error);
    }
  };

  return (
      <div>
        <div className={MyQR.searchContainer}>
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
                disabled={!searchQuery.trim()}
            >
              Go
            </button>
          </div>
        </div>
        <div className={MyQR.info}>
          <ul>
            {searchResults.map((qrCode, index) => (
                <li key={index} className={MyQR.qrCodeItem}>
                  <div className={MyQR.qrCodeInfo}>
                    <img src={qrCode.QRcode} alt={qrCode.name} className={MyQR.qrCodeImage} />
                    <div className={MyQR.content}>
                      <p className={MyQR.qrCodeName}>Name: {qrCode.name}</p>
                      <p>Email: {qrCode.email}</p>
                      <p>Company: {qrCode.company}</p>
                      <p>Position: {qrCode.position}</p>
                      <p>Phone: {qrCode.phone}</p>
                      <p>Address: {qrCode.address}</p>
                      <p>Website: {qrCode.website}</p>
                    </div>

                    <button
                        className={MyQR.downloadButton}
                        onClick={() => downloadVCard(qrCode)}
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

export default MyQRCodesContent
