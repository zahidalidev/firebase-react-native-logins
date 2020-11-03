/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import auth from '@react-native-firebase/auth';

function LoginApp() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

class App extends Component {

  loginUser = () => {
    auth()
      .signInWithEmailAndPassword('jane.doe2@example.com', 'SuperSecretPassword!')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
  // createUser = () => {
  //   auth()
  //     .createUserWithEmailAndPassword('jane.doe2@example.com', 'SuperSecretPassword!')
  //     .then(() => {
  //       console.log('User account created & signed in!');
  //     })
  //     .catch(error => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         console.log('That email address is already in use!');
  //       }

  //       if (error.code === 'auth/invalid-email') {
  //         console.log('That email address is invalid!');
  //       }

  //       console.error(error);
  //     });
  // }

  logoff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  componentDidMount = () => {
    // auth()
    //   .signInAnonymously()
    //   .then(() => {
    //     console.log('User signed in anonymously');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/operation-not-allowed') {
    //       console.log('Enable anonymous in your firebase console.');
    //     }

    //     console.error(error);
    //   });
  }

  render() {
    return (
      <>
        {/* <StatusBar barStyle="dark-content" /> */}
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={{ padding: 100 }}>
              <LoginApp />
              {/* <Button title="Create User" onPress={this.createUser} /> */}
              <Button title="Login User" onPress={this.loginUser} />
              <Button title="Logoff" onPress={this.logoff} />
            </View>

          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
