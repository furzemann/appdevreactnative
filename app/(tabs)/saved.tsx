import {View,Text,Pressable,StyleSheet,} from 'react-native'
import React,{useState,useEffect} from 'react'
import SavedList from '@/components/SavedList'
import ProfileIcon from '@/components/Icon'
import { db,auth} from '@/components/firebaseConfig'
import HomeButton from '@/components/HomeButton'
import {onSnapshot, collection, query, getDocs, deleteDoc,where } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler'

/*const MainContent = () => {
 return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NewsApp</Text>
        <Pressable style={[styles.button,{position:'absolute',right:80}]} onPress={() => router.dismissAll()}>
          <Text style={styles.buttonText}>Return to Login</Text>
        </Pressable>
        <ProfileIcon diameter={45}  />
      </View> 
      <SavedList articles={articles} />
    </View>
  )
}*/

export default function SaveApp () {
    const [articles,setArticles] = useState([]);
    const [user, setUser] = useState(''); 
    useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);
    
    useEffect(()=>{
       if (user) { const unsubscribe = onSnapshot(query(collection(db,"newsArticles"), where('user', '==', user)), (querySnapshot) => {
        const items= querySnapshot.docs.map((doc) => ({...doc.data(),id: doc.id}));
        setArticles(items);

       },
      (error) => {
        alert("Articles did not load");
          })
      return () => unsubscribe()   
    } },[user])
    const articleList = articles.map((item) => ({data:item.data,id:item.id}))
    return(<ScrollView>
{user ? <SavedList articles={articleList} /> : <Text>Loading...</Text>}</ScrollView>
    )
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