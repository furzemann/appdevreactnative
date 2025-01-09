import React,{useState} from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import {router} from 'expo-router';
import { db, auth } from '@/components/firebaseConfig'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";

const placeholderImg = require('@/assets/images/placeholder.jpg')

interface Props {
  GivenArticle: string
  id: string | null;
};

export default function Article({ GivenArticle, id}: Props) {
  const article = JSON.parse(GivenArticle)
  const imgSource= {uri: article.urlToImage} 
  const Author=article.author
  const Title=article.title
  const Source=article.source.name
  const Time=article.publishedAt
  const [saved,setSaved] = useState(false);
  const currTime = new Date();
  const artTime = new Date(Time);
  const  Days = currTime.getDate() - artTime.getDate();
  const saveArticle = async() => {
    if (!saved) {try {
      const user = await auth.currentUser?.uid
      const key = article.publishedAt
      const q = query(
            collection(db, 'newsArticles'),
            where('user', '==', user),
            where('key', '==', key)
          );
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
      await addDoc(collection(db,"newsArticles"), {
        data:JSON.stringify(article),
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
  /*const saveArticle = async() => {
    if (!saved) {try {
      await addDoc(collection(db,"Saved Articles"), {
        data:{name:'testing',id:'fuck why didn\'t I use JSON before'},
        key: Time,
        user: auth.currentUser?.email,
      })
      console.log("saved");
      setSaved(true);
    }
    catch(e) {
      console.log("Data could not be mounted",e)
    }}
    else {
      alert("Article is already saved");
    }
  }*/
  return (
    <View style={styles.container}>
      <View>
        <Image source={imgSource ? imgSource : {uri: placeholderImg}} style={styles.image} />
        <Text style={styles.sourceText}>
          {Source}
        </Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 26, textAlign: 'center', color:'white'}}>
        {Title}
      </Text>
      <Text style={{color:'white', textAlign: 'right', marginRight: 30}}>
        {Days} days ago
      </Text>
      <Text style={{color:'white', textAlign: 'left', marginLeft: 30 }}>
        Written by:{Author}
      </Text> 
      <Pressable style={styles.button} onPress={saveArticle}>
          <Text style={styles.buttonText}>{!saved ? "Save" : "Already Saved"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width:'90%',
    marginBottom: 20,
    backgroundColor:'#060029',
    color:'white',
    borderRadius:20,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius:20,
  },
  sourceText: {
    textShadowRadius: 20,
    textShadowColor: 'black',
    position: 'absolute',
    top: 10,
    left:0,
    right:0,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
