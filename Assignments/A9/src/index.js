//41_Orsmond

import React from 'react';
import ReactDOM from 'react-dom/client';

import EnrolmentList from './components/EnrolmentList';

const root = ReactDOM.createRoot(document.getElementById('root'));
const socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
    socket.on('classes', (classes) => {
        root.render(
            <React.StrictMode>
                <EnrolmentList classes={classes} socket={socket} />
            </React.StrictMode>
        );
    });
});

