import React from 'react';
import LogoutScreen from "@/components/LogoutScreen";
const ProfileScreen = () => {
  const handleLogout = () => {
    // Handle logout logic
    console.log("Logged out!");
  };

  const handleCancel = () => {
    // Handle cancel logic
    console.log("Logout canceled!");
  };

  return <LogoutScreen onLogout={handleLogout} onCancel={handleCancel} />;
    
};
export default ProfileScreen;
