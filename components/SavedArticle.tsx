import React,{useState} from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import {router} from 'expo-router';
import { db, auth } from '@/components/firebaseConfig'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const placeholderImg = require('@/assets/images/placeholder.jpg')

interface Props {
    data : string,
    id : string, 
};

export default function SavedArticle({data, id}: Props) {
  const article=JSON.parse(data)
  const currTime = new Date();
  const artTime = new Date(article.publishedAt);
  const  Days = currTime.getDate() - artTime.getDate();
  const deleteArticle = async() => {
    try {
    const ArticleRef = doc(db, "newsArticles", id)
    await deleteDoc(ArticleRef) 
      console.log("Article removed");
      console.log(article.title) 
    }
    catch(e) {
      console.log("Data could not be mounted",e)
    }  }
  return (
    <View style={styles.container}>
      <View>
        <Image source={article.urlToImage ? {uri : article.urlToImage} : {uri: placeholderImg}} style={styles.image} />
        <Text style={styles.sourceText}>
          {article.source.name}
        </Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 26, textAlign: 'center', color:'white'}}>
        {article.title}
      </Text>
      <Text style={{color:'white', textAlign: 'right', marginRight: 30}}>
        {Days} days ago
      </Text>
      <Text style={{color:'white', textAlign: 'left', marginLeft: 30 }}>
        Written by:{article.Author}
      </Text> 
      <Pressable style={styles.button} onPress={deleteArticle}>
          <Text style={styles.buttonText}>Remove From Saved?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width:'90%',
    marginBottom: 20,
    backgroundColor:'#18009e',
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


