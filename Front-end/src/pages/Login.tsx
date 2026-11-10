import Input from "../Componentes/Input";
import Button from "../Componentes/Button";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-teal-100">
      <div className="flex w-[380px] max-w-sm flex-col gap-4 rounded-lg bg-teal-100 p-8 shadow-lg">
        <h1 className="w-full text-center text-xl font-bold text-slate-800">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-3">
          <Input 
          type="email" 
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <Input 
          type="password" 
          placeholder="Senha" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" title="Entrar" variant="outline" />

          <Link
            to="/esqueci-senha"
            className="mt-1 text-xs text-slate-600 underline hover:text-teal-700"
          >
            Esqueceu a senha?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
