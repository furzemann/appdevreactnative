import React, { useState, useEffect } from 'react';
import { View, TextInput, Button,Pressable, StyleSheet,Text,Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileProvider,useProfile } from '@/components/Context';
import { launchImageLibrary } from 'react-native-image-picker';
import HomeButton from '@/components/HomeButton'
import * as ImagePicker from 'expo-image-picker'

const Profile = ()=> {
  const { profileImage, updateProfileImage } = useProfile();
   
  const getImage = async() => {
    let options = {
      mediaType: 'photo',

    };
     await launchImageLibrary(options, (response) => {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      updateProfileImage(imageUri);
    });
  };

  const [input, setInput] = useState(false);
  const [reload, setReload] = useState(false);
  const [formdata, setFormdata] = useState({
    username: '',
    age: 0,
    nickname: '',
    bio: '',
  });
const [profileData, setProfileData] = useState(formdata);
 useEffect(() => {
    const loadProfileData = async () => {
      try {
        const jsondata = await AsyncStorage.getItem('userinfo');
        setProfileData(jsondata != null ? JSON.parse(jsondata) : formdata);
      } catch (e) {
        console.error('failed to get object', e);
      }
    };

    loadProfileData();
  }, [reload]); 
  const store = async (key:string, value) => {
    try {
      const jsondata = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsondata);
    } catch (e) {
      console.error('failed to store object', e);
    }
  };

  const get = async (key) => {
    try {
      const jsondata = await AsyncStorage.getItem(key);
      return jsondata != null ? JSON.parse(jsondata) : formdata;
    } catch (e) {
      console.error('failed to get object', e);
    }
  };

  const handleSubmit=() => {
    store('userinfo',formdata);
    setReload(true);
    setInput(!input);
  }
  const jsondata=get('userinfo');
  const toggleInput = () => {
    setInput(!input);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={getImage}>
      <Image style={{height:300,width:300,borderRadius:150}} source={profileImage}/>
      </Pressable>
      {input ? (
        <>
          <TextInput style={styles.inputBox}
            placeholder="username"
            onChangeText={(text) => setFormdata({ ...formdata, username: text })}
          />
          <TextInput style={styles.inputBox}
            placeholder="age"
            keyboardType="numeric"
            onChangeText={(text) => setFormdata({ ...formdata, age: parseInt(text) })}
          />
          <TextInput style={styles.inputBox}
            placeholder="nickname"
            onChangeText={(text) => setFormdata({ ...formdata, nickname: text })}
          />
          <TextInput style={styles.inputBox}
            placeholder="bio"
            onChangeText={(text) => setFormdata({ ...formdata, bio: text })}
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
        </>
      ) : (
        <>
          <Text>UserName: {profileData.username}</Text>
          <Text>Age: {profileData.age}</Text>
          <Text>Nickname: {profileData.nickname}</Text>
          <Text>Bio: {profileData.bio}</Text>
        </>
      )}
      <Pressable style={styles.button} onPress={toggleInput}>
        <Text style={styles.buttonText}>{input ? "Go Back":"Edit"}</Text>
      </Pressable>
      <HomeButton/>
    </ScrollView>
  );
}

export default function ProfilePage() {
  return(<ProfileProvider>
    <Profile/>
  </ProfileProvider>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:5,
  },
inputBox: {
    backgroundColor: 'white',
    color: '#060029',
    borderWidth: 1,
    borderColor: '#060029',
    borderRadius: 5,
    height: 40,
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
  },
buttonText:{
fontWeight:200,
color:'white'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#060029',
    borderRadius: 5,
    textAlign: 'center',
  }
});