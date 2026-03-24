import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

// Skapa kontexten
const SnackbarContext = createContext();

// Skapa Providern som håller state och själva komponenten
export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // Funktionen som andra filer kommer kalla på
  const showSnackbar = (msg, sev = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      
      {/* Rutan ligger här, globalt för hela appen! */}
      <Snackbar 
        open={open} 
        autoHideDuration={4000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

// Den anpassade hooken för att använda den i andra filer
export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar måste användas inuti en SnackbarProvider");
  }
  return context;
}