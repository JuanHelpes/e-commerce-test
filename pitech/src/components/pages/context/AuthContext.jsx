import React, { createContext, useState } from "react";

// Crie o contexto
export const AuthContext = createContext();

import api from "../../../services/api"; // Importando a instância do Axios

// Crie o provider
export const AuthProvider = ({ children }) => {
  // Estado para armazenar a informação de login
  const [user, setUser] = useState(null);
  let url = "http://localhost:3000/";

  // Função para login
  const login = async (email, password) => {
    const user = {
      email: email,
      senha: password,
    };

    try {
      const response = await api.post("user/login", user);
      if (response.status === 401 || response.status === 500) {
        setUser(null);
        return false; // Login falhou
      } else {
        // Autenticação bem-sucedida
        const token = response.data.token;
        const usu_id = response.data.id;
        setUser({ usu_id: usu_id, token: token });
        return true; // Login bem-sucedido
      }
    } catch (error) {
      console.log("Erro ao fazer login:", error);
    }

    // // Normalmente aqui você faria uma chamada à API para autenticar
    // var sucess = false;
    // var userObj = {
    //   email: email,
    //   senha: password,
    // };
    // var jsonBody = JSON.stringify(userObj);

    // try {
    //   const response = await fetch(url + "login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: jsonBody,
    //   });

    //   const data = await response.json();
    //   console.log(data);
    //   // Verificar se a mensagem de erro existe
    //   if (data.mensagem === "Error") {
    //     setUser(null);
    //     return false; // Login falhou
    //   } else {
    //     // Autenticação bem-sucedida
    //     const token = data.token;
    //     const usu_id = data.idUsuario;
    //     setUser({ usu_id: usu_id, token: token });
    //     return true; // Login bem-sucedido
    //   }
    // } catch (error) {
    //   console.log("Erro ao fazer login:", error);
    //   return false; // Se houver erro, retornar false
    // }
  };

  // Função para logout
  const logout = () => {
    setUser(null); // Remover o usuário logado
    setToken(null); // Remover o token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
