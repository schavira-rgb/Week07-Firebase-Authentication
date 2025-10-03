// enforces that this code can only be called on the server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only"; // Import the server-only module

import { cookies } from "next/headers"; // Import the cookies function
import { initializeServerApp, initializeApp } from "firebase/app"; // Import the initializeServerApp and initializeApp functions

import { getAuth } from "firebase/auth"; // Import the getAuth function

// Returns an authenticated client SDK instance for use in Server Side Rendering
// and Static Site Generation
export async function getAuthenticatedAppForUser() { // Export the getAuthenticatedAppForUser function
  const authIdToken = (await cookies()).get("__session")?.value; // End of the cookies function

  // Firebase Server App is a new feature in the JS SDK that allows you to
  // instantiate the SDK with credentials retrieved from the client & has
  // other affordances for use in server environments.
  const firebaseServerApp = initializeServerApp( // End of the initializeServerApp function
    // https://github.com/firebase/firebase-js-sdk/issues/8863#issuecomment-2751401913
    initializeApp(), // End of the initializeApp function
    { // End of the initializeServerApp function
      authIdToken, // End of the authIdToken function
    } // End of the initializeServerApp function  
  ); // End of the initializeServerApp function

  const auth = getAuth(firebaseServerApp); // End of the getAuth function
  await auth.authStateReady(); // End of the authStateReady function

  return { firebaseServerApp, currentUser: auth.currentUser }; // End of the getAuthenticatedAppForUser function
} // End of the getAuthenticatedAppForUser function
