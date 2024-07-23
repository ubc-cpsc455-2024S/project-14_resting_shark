import React, { useState, useEffect } from 'react';
import s from './UserEditModal.module.css';
import { LuXCircle } from "react-icons/lu";


interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { username: string; email: string; profilePicture: string };
}

const UserEditModal: React.FC<UserEditModalProps> = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('userInfo');
  const [formData, setFormData] = useState({ username: user.username, email: user.email, password: '', profilePicture: user.profilePicture });
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ username: user.username, email: user.email, password: '', profilePicture: user.profilePicture });
    }
  }, [isOpen, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    // Implement the save functionality
    console.log('Saved data:', formData);
    setUnsavedChanges(false);
    onClose();
  };

  const handleClose = () => {
    if (unsavedChanges) {
      if (window.confirm('You have unsaved changes. Do you really want to close?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <div className={s.header}>
        <h2>Edit Profile</h2>
        <button className={s.closeButton} onClick={handleClose}>
        <LuXCircle/> 
        </button>
        </div>
        <div className={s.tabs}>
          <div className={`${s.tab} ${activeTab === 'userInfo' ? s.activeTab : ''}`} onClick={() => setActiveTab('userInfo')}>User Info</div>
          <div className={`${s.tab} ${activeTab === 'profilePicture' ? s.activeTab : ''}`} onClick={() => setActiveTab('profilePicture')}>Profile Picture</div>
        </div>
        {activeTab === 'userInfo' && (
          <div>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className={s.inputField} />
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={s.inputField} />
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className={s.inputField} />
          </div>
        )}
        {activeTab === 'profilePicture' && (
          <div>
            <label>Profile Picture</label>
            <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} className={s.inputField} />
          </div>
        )}
        <button className={s.button} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default UserEditModal;

  