

// --- Codex Output [7/7/2025, 8:16:43 PM] ---
First, you need to create a context for the authentication state. Create a file named `AuthContext.js`:

```jsx
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
```

Next, create a file named `Navbar.js`:

```jsx
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="flex items-center justify-between p-6 bg-blue-500">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <a className="text-white">Dashboard</a>
        </Link>
        <Link href="/rental">
          <a className="text-white">Rental</a>
        </Link>
        <Link href="/stations">
          <a className="text-white">Stations</a>
        </Link>
        <Link href="/profile">
          <a className="text-white">Profile</a>
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <a className="px-4 py-2 text-white bg-green-500 rounded">Login</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
```

Finally, wrap your app with the `AuthProvider` in your `_app.js` file:

```jsx
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
```

This will create a responsive navigation bar with links to `/dashboard`, `/rental`, `/stations`, and `/profile`. If the user is logged in, a logout button will be shown, otherwise a login link will be shown.
