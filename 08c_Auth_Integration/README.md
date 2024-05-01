# Setting up Firebase Authentication with React

1. **Create a Firebase Project**
    - Go to [Firebase Console](https://console.firebase.google.com/u/0/).
    - Click on "Add Project" or select an existing project.
    - Navigate to **Build > Authentication > Sign-in method**.
    - Enable the sign-in methods you prefer, e.g., "Email/password", "Google", "Facebook".
    - Once done, go back to **Project Overview**.

2. **Add Firebase to your Web App**
    - Click on "Add App" and select "Web".
    - Enter your app nickname and click "Register App".
    - In the "Add Firebase SDK" section, copy the firebaseConfig object. It should look like this:

      ```javascript
      const firebaseConfig = {
        apiKey: "<YOUR_API_KEY>",
        authDomain: "<YOUR_AUTH_DOMAIN>",
        projectId: "<YOUR_PROJECT_ID>",
        storageBucket: "<YOUR_STORAGE_BUCKET>",
        messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
        appId: "<YOUR_APP_ID>"
      };
      ```

3. **Create a React App**
    - Open your terminal and navigate to the directory where you want to create the app.
    - Run the command:
      ```
      npx create-react-app <APP-NAME>
      ```
    - Move into your app directory:
      ```
      cd <APP-NAME>
      ```

4. **Install Required Packages**
    - Install necessary packages:
      ```
      npm i react-firebaseui firebase firebaseui
      ```

5. **Configure Firebase in your React App**
    - Open your project in Visual Studio Code:
      ```
      code .
      ```
    - In index.js, add the Firebase configuration:
      ```javascript
      import firebase from 'firebase/compat/app';
      import 'firebase/compat/auth';

      // Paste the firebaseConfig object here
      const firebaseConfig = {
        apiKey: "<YOUR_API_KEY>",
        authDomain: "<YOUR_AUTH_DOMAIN>",
        projectId: "<YOUR_PROJECT_ID>",
        storageBucket: "<YOUR_STORAGE_BUCKET>",
        messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
        appId: "<YOUR_APP_ID>"
      };

      firebase.initializeApp(firebaseConfig);
      ```

6. **Implement Firebase Authentication in your App**
    - In App.js, add the following code:
      ```javascript
      import React, { useState } from 'react';
      import firebase from 'firebase/compat/app';
      import 'firebase/compat/auth';
      import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

      function App() {
        const [user, setUser] = useState(null);

        const uiConfig = {
          signInFlow: 'popup',
          signInSuccessUrl: '/',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              setUser(authResult.user);
              return false;
            }
          }
        };

        return (
          <div>
            <h1>Auth Integration</h1>
            {user ? (
              <div>
                <p>Welcome, {user.displayName}!</p>
                <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
              </div>
            ) : (
              <div>
                <p>Please sign in to continue.</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              </div>
            )}
          </div>
        );
      }

      export default App;
      ```

7. **Run Your React App**
    - Start the development server:
      ```
      npm start
      ```
    - Visit [http://localhost:3000](http://localhost:3000) in your browser to see the app running.
