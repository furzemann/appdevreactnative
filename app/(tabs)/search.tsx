import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text} from 'react-native';
import HomeButton from '@/components/HomeButton';
import ProfileIcon from '@/components/Icon';
import { useRouter } from 'expo-router';
import NewsFeed from '@/components/NewsFeed';
import {ProfileProvider, useProfile} from '@/components/Context'


const Search = () =>{
  //1. Initializing the state variables
  const [results, setResults] = useState([]);
  const [input, setInput] = useState('');
  const [opacity, setOpacity] = useState(0.4);
  const router = useRouter();

  //2. Creating the async function that can be used when clicking submit, Also have a different way by using the useEffect Hook
  //which gives seamless search though due to API call limit I cannot use this one 
  /*useEffect(()=>{
  const search = async () => {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=`);
    const data = await response.json();
    setResults(data.articles);
  }
  search}
  ),[input])*/

  const search = async () => {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=`);
    const data = await response.json();
    setResults(data.articles);
    setInput(input);
  };
  //this is just to have opaque text
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NewsApp</Text>
        <ProfileIcon diameter={45} />
      </View>
      <Text style={styles.headerText}>Search</Text>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Search for news"
          value={input}
          onChangeText={setInput}
        />
        <Button title="Submit" onPress={search} />
        <ScrollView style={styles.scrollView}>
          {results ? (<NewsFeed articles={results} />) : (input && <Text>No Results Found. Sorry</Text>)}
        </ScrollView>
      </View>
    </View>
  );
}
//Using ProfileProvider to provide the context for image here
export default function SearchApp(){
  return (<ProfileProvider>
    <Search/>
  </ProfileProvider>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf:'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
});
