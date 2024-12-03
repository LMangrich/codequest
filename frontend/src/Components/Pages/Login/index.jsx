import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useToast from "../../../hooks/toast";
import AuthService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [role, setRole] = useState("aluno");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const success = await AuthService.login(email, password);
      if (success) {
        showToast("Login bem sucedido!", "success");
        navigate("/menu");
      } else {
        showToast("Login falhou. Verifique suas credenciais.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Ocorreu um erro. Tente novamente.", "error");
    }
    setLoading(false);
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await AuthService.register(email, password, name, role);
      console.log("Response status:", response.status);
      console.log("Response:", response);
      if (response.success) {
        setIsLogin(true);
        showToast(
          "Registro realizado com sucesso! Faça login para continuar.",
          "success"
        );
      } else if (response.status === 400) {
        showToast("Email já cadastrado. Tente outro.", "error");
      } else {
        showToast("Ocorreu um erro. Tente novamente.", "error");
      }
    } catch (error) {
      console.error(error);

      showToast("Ocorreu um erro. Tente novamente.", "error");
    }
    setLoading(false);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      onSubmit={isLogin ? handleSubmit : handleRegisterSubmit}
    >
      <>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight={"bold"}
          color={"var(--text-color)"}
        >
          {isLogin ? "Login" : "Registro"}
        </Typography>
        {!isLogin && (
          <TextField
            label="Nome"
            type="text"
            required
            fullWidth
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        )}
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        {!isLogin && (
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="role-label">Tipo de Usuário</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="Tipo de Usuário"
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <MenuItem value={"aluno"}>Estudante</MenuItem>
              <MenuItem value={"professor"}>Professor</MenuItem>
            </Select>
          </FormControl>
        )}
        {isLogin && (
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ marginTop: 2 }}
          >
            Esqueceu a senha?
          </Typography>
        )}
        <Button
          type="button"
          variant="text"
          fullWidth
          onClick={() => setIsLogin(!isLogin)}
          disabled={loading}
          sx={{
            marginTop: 2,
            fontWeight: "bold",
            bgcolor: "transparent",
            color: "var(--text-color)",
            ":hover": { color: "var(--text-color)" },
          }}
        >
          {isLogin
            ? "Não tem uma conta? Registre-se"
            : "Já tem uma conta? Faça login"}
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            background: "var(--primary-color)",
            marginTop: 2,
            fontWeight: "bold",
            ":hover": { background: "var(--primary-weaker-color)" },
          }}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? "Loading..." : isLogin ? "Entrar" : "Registrar"}
        </Button>
      </>
    </Box>
  );
};

export default LoginPage;
