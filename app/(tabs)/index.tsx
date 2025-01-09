import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput,Button,ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import NewsFeed from '@/components/NewsFeed';
import ProfileIcon from '@/components/Icon';
import {ProfileProvider } from '@/components/Context';


const MainContent = () => {
  //1.setting up router and state variables
  const router = useRouter();
  const [errorState, setErrorState] = useState(false);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('technology');
  //2. Ferch Articles method with the useEffect hook implemented
  const fetchArticles = async () => {
    try{const call = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=`);
    const data = await call.json();
    setArticles(data.articles);}
    catch(e) {
      console.error(e)
      setErrorState(true);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [category]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NewsApp</Text>
        <Pressable style={[styles.button,{position:'absolute',right:80}]} onPress={() => router.dismissAll()}>
          <Text style={styles.buttonText}>Return to Login</Text>
        </Pressable>
        <ProfileIcon diameter={45}  />
      </View>

      <View style={styles.rowbutton}>
        <Pressable style={styles.button} onPress={() => setCategory('technology')}>
          <Text style={styles.buttonText}>Tech</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setCategory('entertainment')}>
          <Text style={styles.buttonText}>Entertainment</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setCategory('sports')}>
          <Text style={styles.buttonText}>Sports</Text>
        </Pressable>
      </View>
      <NewsFeed articles={articles} />
    </View>
  );
};

export default function Index() {
  return (<ProfileProvider><MainContent/></ProfileProvider>)
}

const styles = StyleSheet.create({
scrollcontainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {

    marginBottom: 16,
  },
  rowbutton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 5,
    gap:40,
  }, 
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:10,
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
  }, 
});