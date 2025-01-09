import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = createContext();
const ThemeContext = createContext();
const defaultProfileImage = require('@/assets/images/placeholder.jpg')
export const ThemeProvider = ({children}) => {
  const [Theme,setTheme] = useState(true)
  return (<ThemeProvider>
    {children}
  </ThemeProvider>)
}

export const useTheme = useContext(ThemeContext)

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('profileImage');
        if (storedImage) {
          setProfileImage({ uri: storedImage });
        }
      } catch (e) {
        console.error('Failed to load profile image', e);
      }
    };

    loadProfileImage();
  }, []);

  const updateProfileImage = async (imageUri) => {
    try {
      await AsyncStorage.setItem('profileImage', imageUri);
      setProfileImage({ uri: imageUri });
    } catch (e) {
      console.error('Failed to save profile image', e);
    }
  };

  return (
    <ProfileContext.Provider value={{ profileImage, updateProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);