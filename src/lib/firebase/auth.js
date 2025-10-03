import { // Import the Firebase Auth library
  GoogleAuthProvider, // Import the GoogleAuthProvider class
  signInWithPopup, // Import the signInWithPopup function
  onAuthStateChanged as _onAuthStateChanged, // Import the onAuthStateChanged function
  onIdTokenChanged as _onIdTokenChanged, // Import the onIdTokenChanged function
} from "firebase/auth"; // Import the Firebase Auth library

import { auth } from "@/src/lib/firebase/clientApp"; // Import the auth object

// The onAuthStateChanged function is used to listen for changes in the user's authentication state.
// It returns a function that can be used to unsubscribe from the listener.
// The cb function is called with the user object when the user's authentication state changes.
// The user object is null if the user is not authenticated.
// The user object is not null if the user is authenticated.
// The user object is not null if the user is authenticated.

export function onAuthStateChanged(cb) { // Export the onAuthStateChanged function
  return _onAuthStateChanged(auth, cb); // Return the onAuthStateChanged function
} // End of the onAuthStateChanged function

export function onIdTokenChanged(cb) { // Export the onIdTokenChanged function
  return _onIdTokenChanged(auth, cb); // Return the onIdTokenChanged function
} // End of the onI dTokenChanged function

export async function signInWithGoogle() { // Export the signInWithGoogle function
  const provider = new GoogleAuthProvider(); // Create a new GoogleAuthProvider object

  try {
    await signInWithPopup(auth, provider); // Sign in with the GoogleAuthProvider object
  } catch (error) { // Catch the error
    console.error("Error signing in with Google", error); // Log the error
  } // End of the try block
} // End of the signInWithGoogle function

export async function signOut() { // Export the signOut function
  try { // Try to sign out the user
    return auth.signOut(); // Sign out the user
  } catch (error) { // Catch the error
    console.error("Error signing out with Google", error); // Log the error
  } // End of the try block
} // End of the signOut function
