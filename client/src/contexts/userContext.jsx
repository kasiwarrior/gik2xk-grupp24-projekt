import { createContext, useContext, useState } from "react";

// 1. Skapa själva kontexten
const UserContext = createContext();

// 2. Skapa en Provider-komponent som wrappar appen
export function UserProvider({ children }) {
  // Här sparar vi vem som är inloggad. null betyder att ingen är inloggad än.
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Skapa en anpassad hook för att enkelt kunna hämta datan i andra komponenter
export function useUser() {
  return useContext(UserContext);
}