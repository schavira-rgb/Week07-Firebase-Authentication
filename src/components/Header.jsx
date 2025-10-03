"use client"; // Use the client
import React, { useEffect } from "react"; // Import the React and useEffect functions
import Link from "next/link"; // Import the Link function
import {
  signInWithGoogle, // Import the signInWithGoogle function
  signOut, // Import the signOut function
  onIdTokenChanged, // Import the onIdTokenChanged function
} from "@/src/lib/firebase/auth.js"; // Import the signInWithGoogle, signOut, and onIdTokenChanged functions
import { addFakeRestaurantsAndReviews } from "@/src/lib/firebase/firestore.js"; // Import the addFakeRestaurantsAndReviews function
import { setCookie, deleteCookie } from "cookies-next"; // Import the setCookie and deleteCookie functions

function useUserSession(initialUser) { // Export the useUserSession function
  useEffect(() => { // Use the useEffect hook
    return onIdTokenChanged(async (user) => { // Return the onIdTokenChanged function
      if (user) { // If the user is authenticated
        const idToken = await user.getIdToken(); // Get the ID token
        await setCookie("__session", idToken); // Set the cookie
      } else { // If the user is not authenticated
        await deleteCookie("__session"); // Delete the cookie
      } // End of the if statement
      if (initialUser?.uid === user?.uid) { // If the user is the same
        return; // Return if the user is the same
      } // End of the if statement
      window.location.reload(); // Reload the page
    }); // End of the onIdTokenChanged function
  }, [initialUser]); // Use the useEffect hook

  return initialUser; // Return the initialUser
} // End of the useUserSession function

export default function Header({ initialUser }) { // Export the Header function
  const user = useUserSession(initialUser); // Use the useUserSession function

  const handleSignOut = (event) => { // Export the handleSignOut function
    event.preventDefault(); // Prevent the default event
    signOut(); // Sign out the user
  }; // End of the handleSignOut function

  const handleSignIn = (event) => { // Export the handleSignIn function
    event.preventDefault(); // Prevent the default event
    signInWithGoogle(); // Sign in with the GoogleAuthProvider object
  }; // End of the handleSignIn function

  return ( // Return the header
    <header> 
      <Link href="/" className="logo"> 
        <img src="/friendly-eats.svg" alt="FriendlyEats" />
        Friendly Eats
      </Link> 
      {user ? ( // If the user is authenticated
        <> 
          <div className="profile"> 
            <p> 
              <img
                className="profileImage"
                src={user.photoURL || "/profile.svg"}
                alt={user.email}
              /> 
              {user.displayName}
            </p> 

            <div className="menu"> 
              ... 
              <ul> 
                <li>{user.displayName}</li> 

                <li> 
                  <a href="#" onClick={addFakeRestaurantsAndReviews}> 
                    Add sample restaurants 
                  </a> 
                </li> 

                <li> 
                  <a href="#" onClick={handleSignOut}> 
                    Sign Out 
                  </a> 
                </li> 
              </ul> 
            </div> 
          </div> 
        </> // End of the handleSignOut function
      ) : ( //  If the user is not authenticated
        <div className="profile"> 
          <a href="#" onClick={handleSignIn}> 
            <img src="/profile.svg" alt="A placeholder user image" /> 
            Sign In with Google 
          </a> 
        </div> // End of the handleSignIn function
      )} 
    </header> // End of the header
  ); // End of the header
} // End of the Header function
