import React, {useState,useEffect} from 'react'
import {Pressable,View, Button, TextInput, Text, StyleSheet, ImageBackground} from 'react-native'
import {Link} from 'expo-router'
import app,{auth} from '@/components/firebaseConfig'
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from '@firebase/auth';


interface AuthProps1 {
    isLogin: boolean;
    setIsLogin: (isLogin:boolean)=>void;
    email: string;
    setEmail: (email:string)=>void;
    password: string;
    setPassword: (password:string)=>void;
    Authentication: ()=>void;   
}

const provider = new GoogleAuthProvider();


const AuthScreen = ({setIsLogin, isLogin, email, setEmail, password, setPassword, Authentication}: AuthProps1) => {
    return (<ImageBackground source={require('@/assets/images/qg2anjwb5l2a1.png')} style={styles.backgroundImage}><View style={styles.loginContainer}>
<View style={styles.header}><Text style={{fontSize:50, fontWeight:200}}>
            Welcome to NewsApp</Text></View>
        <TextInput style={styles.inputBox}  placeholder='email' value={email} onChangeText={setEmail}/>
        <TextInput secureTextEntry={true} style={styles.inputBox}  placeholder='password' value={password} onChangeText={setPassword}/>
        {isLogin ? 
        (<Pressable style={styles.button} onPress={Authentication}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>) :
         (<Pressable style={styles.button} onPress={Authentication}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>)}
        <Pressable style={styles.button} onPress={()=>setIsLogin(!isLogin)}>
          <Text style={styles.buttonText}>{isLogin ? "Don't have an account? create one":"Already have an Account"}</Text>
        </Pressable>
    </View></ImageBackground>)
}

interface WelcomeProps{
    user: {email : string | null};
    handleAuthentication: ()=>Promise<void>;
}

const WelcomeScreen = ({user, handleAuthentication}: WelcomeProps) => {
    return(<ImageBackground source={require('@/assets/images/qg2anjwb5l2a1.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={{fontSize:28,fontWeight:200}}>
            Welcome {user.email}!!
        </Text>
        <Link href='/(tabs)'>
        <Text style={{fontSize:22,fontWeight:200,color:'blue'}}>
            Go to NewsPage! (click Me!!)
        </Text>
        </Link>
        <Button title='logout' onPress={handleAuthentication}/>
    </View></ImageBackground>)
}
export default function App() {
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [user,setUser] = useState<User | null>(null);
    
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (user)=>
        setUser(user))

        return ()=>unsubscribe();   
    },[auth])

    const userAuth= async ()=> {
    try {
      if (user) {
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
        alert(isLogin?"Wrong Username/Password":"This Email is already in use or Password is too Short(<6 chars)");
    }
    }

    return (<View style={styles.container}> {(user) ? <WelcomeScreen user={user} handleAuthentication={userAuth}/>: <AuthScreen 
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        isLogin={isLogin} setIsLogin={setIsLogin}
        Authentication={userAuth}/> }</View>)
    }

const darkstyle = StyleSheet.create({
    header:{
        alignItems:'center',
        justifyContent: 'center',
        flex: 1,
    },
    backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030014',
    color: 'white',
  },
  linkText: {
    color: 'white',
    marginTop: 20,
  },
  loginContainer: {
    backgroundColor: '#030014',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width:'40%',
    gap: 5,
  },
  buttonText:{
fontWeight:200,
color:'black'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
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
});

const styles = StyleSheet.create({
    header:{
        alignItems:'center',
        justifyContent: 'center',
        flex: 1,
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: '#060029',
    marginTop: 20,
  },
  loginContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 5,
    width:'40%',
    alignSelf: 'center',
  },
  buttonText:{
fontWeight:200,
color:'white'
  },backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width:'100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#060029',
    borderRadius: 5,
    textAlign: 'center',
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
});