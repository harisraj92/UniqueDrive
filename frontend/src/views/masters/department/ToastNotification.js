// src/components/ToastNotification.js
import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastNotification = ({ show, onClose, message }) => {
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast onClose={onClose} show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastNotification;
