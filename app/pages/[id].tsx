import HomeButton from '@/components/HomeButton';
import React, {useState, useEffect}  from 'react';
import { useLocalSearchParams } from 'expo-router';
import {Pressable,ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import {ProfileProvider} from '@/components/Context'
import ProfileIcon from '@/components/Icon';
import { db, auth} from '@/components/firebaseConfig'

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, where,query } from "firebase/firestore";

const Page = () => {
  const { article } = useLocalSearchParams();
  const selectedArticle = article ? JSON.parse(article) : null;
  const [saved,setSaved] = useState(false);
  if (!selectedArticle) {
    return (
      <View style={styles.container}>
        <Text>Article not found</Text>
        <HomeButton />
      </View>
    );
  }
  const saveArticle = async() => {
    if (!saved) {try {
      const user = await auth.currentUser?.uid
      const key = selectedArticle.publishedAt
      const q = query(
            collection(db, 'newsArticles'),
            where('user', '==', user),
            where('key', '==', key)
          );
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
      await addDoc(collection(db,"newsArticles"), {
        data:JSON.stringify(selectedArticle),
        user: user,
        key: key ,
      })
      setSaved(true); }
      else {
        setSaved(true)
        alert('Document is already in DB')
      }
    }
    catch(e) {
      console.error("Data could not be mounted")
    }}
    else {
    }
  }
  return (
 <>   
<View style={styles.header}>
        <Text style={styles.headerText}>NewsApp</Text>
        <ProfileIcon diameter={45}  />
      </View>
<ScrollView contentContainerStyle={styles.container}>
      <Text style={{fontSize:50,fontWeight:'bold',}}>{selectedArticle.title}</Text>
      <View style={{height:400, width:'100%'}}>
      <Image source={{ uri: selectedArticle.urlToImage }} style={styles.image} /></View>
      <Text>{selectedArticle.author}</Text>
      <Text>{selectedArticle.publishedAt}</Text>
      <Text>{selectedArticle.content}</Text>
      <Pressable style={!saved ? styles.button : styles.Savedbutton} onPress={saveArticle}>
          <Text style={styles.buttonText}>{!saved ? 'Save Article' : 'Already Saved'}</Text>
      </Pressable>
      <HomeButton />
    </ScrollView></>);
}
export default function PageApp() {
  return(<ProfileProvider><Page/></ProfileProvider>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top:0,
  },
  image: {
    width: '100%',
    position: 'absolute',
    top:0,
    height: 400,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    margin:5,
  },
  Savedbutton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
    textAlign: 'center',
    margin: 5,
  }
});