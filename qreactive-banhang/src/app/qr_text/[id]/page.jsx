"use client";
// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function Text({params}) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [tag, setTag] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            
            try {
            const response = await axios.get(`http://localhost:5000/text/edit/${params.id}`);
            setText(response.data.content);
            setTag(response.data.tag);
            setLoading(false);
            } catch (error) {
            console.error('Error fetching data: ', error);
            setError(error);
            setLoading(false);
            }
        };
    
        fetchData();
        }
    , []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/text/edit/${params.id}`, {
                text,
                tag,
            });
            console.log(response.data);
            //navigate to the list page
            router.push("/qr_list");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <div>
            <label htmlFor="text">Text</label>
            <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
            <label htmlFor="tag">Tag</label>
            <input type="text" name="tag" value={tag} onChange={(e) => setTag(e.target.value)} />

            <button onClick={handleSubmit}>Submit</button>
        </div>
        </>
    )
}
