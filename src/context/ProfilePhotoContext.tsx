import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

interface ProfilePhotoContextType {
  photoUrl: string;
  setPhotoFile: (file: File) => void;
  removeCustomPhoto: () => void;
  hasCustomPhoto: boolean;
}

const ProfilePhotoContext = createContext<ProfilePhotoContextType>({
  photoUrl: portfolioData.personal.avatarUrl,
  setPhotoFile: () => {},
  removeCustomPhoto: () => {},
  hasCustomPhoto: false,
});

export const ProfilePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kb_custom_profile_photo');
      if (saved) return saved;
    }
    return portfolioData.personal.avatarUrl;
  });

  const [hasCustomPhoto, setHasCustomPhoto] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('kb_custom_profile_photo');
    }
    return false;
  });

  const setPhotoFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPhotoUrl(result);
        setHasCustomPhoto(true);
        try {
          localStorage.setItem('kb_custom_profile_photo', result);
        } catch (err) {
          console.warn('Storage quota exceeded or error saving profile photo:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const removeCustomPhoto = () => {
    localStorage.removeItem('kb_custom_profile_photo');
    setPhotoUrl(portfolioData.personal.avatarUrl);
    setHasCustomPhoto(false);
  };

  return (
    <ProfilePhotoContext.Provider value={{ photoUrl, setPhotoFile, removeCustomPhoto, hasCustomPhoto }}>
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useProfilePhoto = () => useContext(ProfilePhotoContext);
