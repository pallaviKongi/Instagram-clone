import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FireBaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExists } from '../services/firebase';

export default function SignIn() {
  const history = useHistory();
  const { firebase } = useContext(FireBaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';
  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExists(username);
    if (usernameExists) {
      setError('This username isnt available. Please try another.');
    } else {
      try {
        setError('');
        // Authentication
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // Setting displayName to the user profile

        await createdUserResult.user.updateProfile({ displayName: username });

        // Adding user to the users collections
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user?.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          dateCreated: Date.now(),
          following: [],
          followers: [],
        });

        history.push(ROUTES.DASHBOARD);
      } catch (err) {
        setError(err);
        setUsername('');
        setFullName('');
        setEmailAddress('');
        setPassword('');
      }
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen flex-col w-1/5 my-20 ">
      <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
        <h1 className="flex justify-center w-full">
          <img
            src="/images/logo.png"
            alt="Instagram"
            className="mt-2 w-6/12 mb-4"
          />
        </h1>
        <p className="text-base text-center py-5 font-bold text-gray-base">
          Sign up to see photos and videos from your friends.
        </p>
        {error && <p className="mb-4 text-xs text-red-primary"> {error}</p>}

        <form onSubmit={handleSignup} method="POST">
          <input
            aria-label="Enter your email address"
            type="text"
            placeholder="Phone number or Email"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded-sm mb-2"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />
          <input
            aria-label="Enter Full Name"
            type="text"
            placeholder="Full Name"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded-sm mb-2"
            onChange={({ target }) => setFullName(target.value)}
            value={fullName}
          />
          <input
            aria-label="Enter Username"
            type="text"
            placeholder="Username"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded-sm mb-2"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <input
            aria-label="Enter your password"
            type="password"
            placeholder="Password"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded-sm mb-2"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button
            disabled={isInvalid}
            type="submit"
            className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-50 bg-blue-faded'}`}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSignup();
              }
            }}
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
        <p className="text-sm">
          Have an account ?{' '}
          <Link to="/login" className="font-bold text-blue-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
