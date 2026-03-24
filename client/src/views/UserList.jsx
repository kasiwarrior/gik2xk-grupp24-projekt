import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "../services/api";
import { useUser } from "../contexts/UserContext";
import { useSnackbar } from "../contexts/SnackbarContext";

// MUI
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Alert,
  Divider,
  Paper
} from "@mui/material";

function UserList() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, setCurrentUser } = useUser();

  const { showSnackbar } = useSnackbar();

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
      showSnackbar("Användare skapad!");
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
    <Box sx={{ maxWidth: 1000, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Användare
      </Typography>

      {/* Visuell feedback på vem som är inloggad just nu */}
      {currentUser && (
        <Alert severity="success" sx={{ mb: 4 }}>
          Just nu inloggad som: <strong>{currentUser.firstName} {currentUser.lastName}</strong>
        </Alert>
      )}

      {/* Snygg inramning (Paper) för formuläret */}
      <Paper sx={{ p: 3, mb: 5, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Skapa ny användare
        </Typography>
        <Box component="form" onSubmit={createUser} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Förnamn"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Efternamn"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Lösenord"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button type="submit" variant="contained" color="primary">
              Skapa användare
            </Button>
          </Box>
        </Box>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" gutterBottom fontWeight="bold">
        Alla användare
      </Typography>

      {/* Lista med användarkort i ett rutnät */}
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 2 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Länken till användarens varukorg ser nu ut som vanlig text men är klickbar */}
                <Typography 
                  variant="h6" 
                  component={RouterLink} 
                  to={`/users/${user.id}/cart`}
                  sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 'bold' }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {user.email}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  variant={currentUser?.id === user.id ? "contained" : "outlined"}
                  color={currentUser?.id === user.id ? "success" : "primary"}
                  fullWidth
                  onClick={() => {
                    setCurrentUser(user);
                    showSnackbar(`Du är nu inloggad som ${user.firstName}`);
                  }}
                >
                  {currentUser?.id === user.id ? "Inloggad" : `Logga in som ${user.firstName}`}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UserList;