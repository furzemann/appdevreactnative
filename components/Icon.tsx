import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfile } from '@/components/Context';

const ProfileIcon = ({ diameter }) => {
  const { profileImage } = useProfile();
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/profile')} style={[styles.icon, { width: diameter, height: diameter, borderRadius: diameter / 2 }]}>
      <Image
        source={profileImage}
        style={{ width: diameter, height: diameter, borderRadius: diameter / 2 }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileIcon;