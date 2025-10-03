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
    <header> // End of the handleSignOut function
      <Link href="/" className="logo"> // End of the handleSignOut function
        <img src="/friendly-eats.svg" alt="FriendlyEats" /> // End of the handleSignOut function
        Friendly Eats
      </Link> // End of the handleSignOut function
      {user ? ( // If the user is authenticated
        <> // End of the handleSignOut function
          <div className="profile"> // End of the handleSignOut function
            <p> // End of the handleSignOut function
              <img
                className="profileImage"
                src={user.photoURL || "/profile.svg"}
                alt={user.email}
              /> // End of the handleSignOut function
              {user.displayName}
            </p> // End of the handleSignOut function

            <div className="menu"> // End of the handleSignOut function
              ... // End of the handleSignOut function
              <ul> // End of the handleSignOut function
                <li>{user.displayName}</li> // End of the handleSignOut function

                <li> // End of the handleSignOut function
                  <a href="#" onClick={addFakeRestaurantsAndReviews}> // Add sample restaurants
                    Add sample restaurants // End of the handleSignOut function
                  </a> // End of the handleSignOut function
                </li> // End of the handleSignOut function

                <li> // End of the handleSignOut function
                  <a href="#" onClick={handleSignOut}> // Sign out the user
                    Sign Out // End of the handleSignOut function
                  </a> // End of the handleSignOut function
                </li> // End of the handleSignOut function
              </ul> // End of the handleSignOut function
            </div> // End of the handleSignOut function
          </div> // End of the handleSignOut function
        </> // End of the handleSignOut function
      ) : ( //  If the user is not authenticated
        <div className="profile"> // End of the handleSignIn function
          <a href="#" onClick={handleSignIn}> // Sign in with the GoogleAuthProvider object
            <img src="/profile.svg" alt="A placeholder user image" /> // End of the handleSignIn function
            Sign In with Google // End of the handleSignIn function
          </a> // End of the handleSignIn function
        </div> // End of the handleSignIn function
      )} // End of the handleSignIn function
    </header> // End of the header
  ); // End of the header
} // End of the Header function
