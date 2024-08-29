import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CCol, CRow } from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileForm from './profileForm';
import ProfileTable from './profileTable';
import axios from 'axios';

const ProfileSettings = () => {
    const [profileTypes, setProfileTypes] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [editingProfile, setEditingProfile] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadProfileTypes();
        loadProfiles();
    }, []);

    const loadProfileTypes = () => {
        axios.get('http://localhost:5000/api/profile-types')
            .then(response => setProfileTypes(response.data))
            .catch(error => toast.error('Failed to load profile types.'));
    };

    const loadProfiles = () => {
        axios.get('http://localhost:5000/api/profile-names')
            .then(response => setProfiles(response.data))
            .catch(error => toast.error('Failed to load profiles.'));
    };

    const handleAddProfileType = (newProfileType) => {
        axios.post('http://localhost:5000/api/profile-types', { ProfileType: newProfileType })
            .then(() => {
                loadProfileTypes();
                toast.success('Profile type added successfully!');
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    toast.error('Profile type already exists.');
                } else {
                    toast.error('Failed to add profile type.');
                }
            });
    };

    const handleSaveProfile = (profileData) => {
        if (editingProfile) {
            // Editing an existing profile
            axios.put(`http://localhost:5000/api/profile-names/${editingProfile.ProfileId}`, profileData)
                .then(() => {
                    loadProfiles();
                    setShowForm(false);
                    setEditingProfile(null);
                    toast.success('Profile updated successfully!');
                })
                .catch(error => toast.error('Failed to update profile.'));
        } else {
            // Adding a new profile
            axios.post('http://localhost:5000/api/profile-names', profileData)
                .then(() => {
                    loadProfiles();
                    setShowForm(false);
                    toast.success('Profile added successfully!');
                })
                .catch(error => toast.error('Failed to add profile.'));
        }
    };

    const handleEditProfile = (profile) => {
        if (!profile || !profile.ProfileId) {
            toast.error('Invalid profile ID.');
            return;
        }
        setEditingProfile(profile);
        setShowForm(true);
    };

    const handleDeleteProfile = (profileId) => {
        if (!profileId) {
            toast.error('Invalid profile ID.');
            return;
        }
        axios.delete(`http://localhost:5000/api/profile-names/${profileId}`)
            .then(() => {
                loadProfiles();
                toast.success('Profile deleted successfully!');
            })
            .catch(error => toast.error('Failed to delete profile.'));
    };

    const handleCancel = () => {
        setEditingProfile(null);
        setShowForm(false);
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader>
                        <strong>Profile Settings</strong>
                    </CCardHeader>
                    <CCardBody>
                        {!showForm ? (
                            <>
                                <CButton color="primary" className="mb-3" onClick={() => {
                                    setEditingProfile(null); // Ensure this is reset when adding a new profile
                                    setShowForm(true);
                                }}>
                                    Add Profile
                                </CButton>
                                <ProfileTable
                                    profiles={profiles}
                                    onEdit={handleEditProfile}
                                    onDelete={handleDeleteProfile}
                                />
                            </>
                        ) : (
                            <ProfileForm
                                profileTypes={profileTypes}
                                onAddProfileType={handleAddProfileType}
                                onSave={handleSaveProfile}
                                onCancel={handleCancel}
                                editingProfile={editingProfile}
                            />
                        )}
                        <ToastContainer />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default ProfileSettings;
