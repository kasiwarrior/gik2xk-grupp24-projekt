import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

import { useUser } from "../contexts/userContext";

function UserList() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hämta den globala state-funktionen för att byta användare
  const { currentUser, setCurrentUser } = useUser();

  async function loadUsers() {
    try {
      const res = await axios.get("/users");
      setUsers(res.data.data);
    } catch (e) {
      e?.response ? console.log(e.response.data) : console.log(e);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function createUser(e) {
    e.preventDefault();
    try {
      await axios.post("/users", {
        firstName,
        lastName,
        email,
        password
      });
      alert("Användare skapad!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      loadUsers();
    } catch (e) {
      console.log("Fel vid create user:", e);
      e?.response && console.log("Server response:", e.response.data);
      alert("Kunde inte skapa användare");
    }
  }

  return (
    <div>
      <h2>Användare</h2>

      <form onSubmit={createUser}>
        <input
          placeholder="Förnamn"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Efternamn"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Skapa användare</button>
      </form>

      <hr />

      {/* Visuell feedback på vem som är inloggad just nu */}
      {currentUser && (
        <div style={{ backgroundColor: "#e0f7fa", padding: "10px", marginBottom: "20px", borderRadius: "5px" }}>
          <strong>Just nu inloggad som: </strong> {currentUser.firstName} {currentUser.lastName}
        </div>
      )}

      {users.map((user) => (
        <div key={user.id} style={{ marginBottom: "20px" }}>
          <Link to={`/users/${user.id}/cart`}>
            <strong>
              {user.firstName} {user.lastName}
            </strong>
          </Link>
          <br />
          {user.email}
          <br />

          {/* knapp för att logga in*/}
          <button
            onClick={() => {
              setCurrentUser(user);
              alert(`Du är nu inloggad som ${user.firstName}`);
            }}
            style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer" }}
          >
            Logga in som {user.firstName}
          </button>

          <hr style={{ marginTop: "15px" }} />
        </div>
      ))}
    </div>
  );
}

export default UserList;