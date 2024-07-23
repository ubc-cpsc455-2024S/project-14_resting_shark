
import React, { useState } from 'react';
import s from './UserEditModal.module.css';


interface UserInfo {
    username: string;
    email: string;
  }
  
  interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    userInfo: UserInfo;
    onSave: (updatedUserInfo: UserInfo & { password?: string }) => void;
  }

const UserEditModal : React.FC<UserEditModalProps> = ({ isOpen, onClose, userInfo, onSave }) => {
    const [activeTab, setActiveTab] = useState('userInfo');
    const [username, setUsername] = useState(userInfo.username || '');
    const [email, setEmail] = useState(userInfo.email || '');
    const [password, setPassword] = useState('');
  
    const handleSaveChanges = () => {
      // Pass updated user info to the parent component
      onSave({ username, email, password });
      onClose();
    };
  
    return (
      <div className={`${s.modal} ${isOpen ? s.show : ''}`}>
        <div className={s.modalContent}>
          <div className={s.modalHeader}>
            <span className={s.close} onClick={onClose}>&times;</span>
            <h2>Edit Profile</h2>
          </div>
          <div className={s.modalBody}>
            <div className={s.tabs}>
              <button
                className={`${s.tabButton} ${activeTab === 'userInfo' ? s.active : ''}`}
                onClick={() => setActiveTab('userInfo')}
              >
                User Info
              </button>
              <button
                className={`${s.tabButton} ${activeTab === 'profilePicture' ? s.active : ''}`}
                onClick={() => setActiveTab('profilePicture')}
              >
                Profile Picture
              </button>
            </div>
            <div className={`${s.tabContent} ${activeTab === 'userInfo' ? s.active : ''}`}>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={`${s.tabContent} ${activeTab === 'profilePicture' ? s.active : ''}`}>
              <p>Profile Picture Upload Component Here</p>
            </div>
          </div>
          <div className={s.modalFooter}>
            <button className={s.saveButton} onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserEditModal;
  