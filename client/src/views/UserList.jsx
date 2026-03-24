import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "../services/api";
import {
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

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
      console.log(e);
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
        password,
      });

      alert("Användare skapad!");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      loadUsers();
    } catch (e) {
      alert("Kunde inte skapa användare");
    }
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h4" fontWeight={700}>
        Användare
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack component="form" onSubmit={createUser} spacing={2}>
          <Typography variant="h6">Skapa användare</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Förnamn"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Efternamn"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Lösenord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained">
            Skapa användare
          </Button>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} md={6} key={user.id}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={1}>
                <Typography
                  variant="h6"
                  component={RouterLink}
                  to={`/users/${user.id}/cart`}
                  sx={{ textDecoration: "none", color: "primary.main", fontWeight: 700 }}
                >
                  {user.firstName} {user.lastName}
                </Typography>

                <Typography>{user.email}</Typography>

                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/users/${user.id}/cart`}
                >
                  Visa varukorg
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default UserList;