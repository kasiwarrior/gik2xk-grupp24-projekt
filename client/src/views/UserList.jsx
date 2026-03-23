import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

function UserList() {

  const [users, setUsers] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


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
          onChange={(e)=>setFirstName(e.target.value)}
        />

        <input
          placeholder="Efternamn"
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">

          Skapa användare

        </button>

      </form>


      <hr />


      {users.map(user => (

        <div key={user.id}>

          <Link to={`/users/${user.id}/cart`}>

            <strong>

              {user.firstName} {user.lastName}

            </strong>

          </Link>

          <br />

          {user.email}

          <hr />

        </div>

      ))}


    </div>

  );

}

export default UserList;