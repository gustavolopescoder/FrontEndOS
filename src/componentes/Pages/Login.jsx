import { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import logo from "/ChamaNaOS.png"; // ajuste conforme o local da imagem

function Login({ onLogin }) {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [erro, setErro] = useState("");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");

  const [nomeTecnico, setNomeTecnico] = useState("");
  const [emailTecnico, setEmailTecnico] = useState("");
  const [senhaTecnico, setSenhaTecnico] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backendos-production.up.railway.app/login",
        {
          email,
          senha,
        }
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      if (onLogin) onLogin(res.data.tecnico);
    } catch (err) {
      console.error(err);
      setErro("Login inválido");
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://backendos-production.up.railway.app/empresas-ti",
        {
          nome: nomeEmpresa,
          email_admin: emailCadastro,
          senha_empresa: senhaCadastro,
          nome_tecnico: nomeTecnico,
          email_tecnico: emailTecnico,
          senha_tecnico: senhaTecnico,
        }
      );

      alert("Cadastro realizado com sucesso!");
      setModoCadastro(false);
      setNomeEmpresa("");
      setEmailCadastro("");
      setSenhaCadastro("");
      setNomeTecnico("");
      setEmailTecnico("");
      setSenhaTecnico("");
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Erro ao cadastrar empresa");
    }
  };

  const trocarModo = () => {
    setModoCadastro(!modoCadastro);
    setErro("");
    setEmail("");
    setSenha("");
    setNomeEmpresa("");
    setEmailCadastro("");
    setSenhaCadastro("");
    setNomeTecnico("");
    setEmailTecnico("");
    setSenhaTecnico("");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F2F6F9] px-4 py-6">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-3xl overflow-hidden">
        {/* Lado esquerdo (info) */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0EB1D2] to-[#045D75] flex flex-col justify-center items-center text-white p-8 text-center space-y-4">
          <h1 className="text-2xl font-semibold">
            {modoCadastro ? "Já tem uma conta?" : "Não tem uma conta?"}
          </h1>
          <p className="text-white/80 text-sm max-w-xs">
            {modoCadastro
              ? "Faça login para acessar seu painel e gerenciar ordens."
              : "Cadastre sua empresa e comece agora mesmo."}
          </p>
          <button
            onClick={trocarModo}
            className="mt-2 px-6 py-2 rounded-md bg-white text-[#045D75] font-semibold shadow hover:bg-gray-100 transition"
          >
            {modoCadastro ? "Voltar ao Login" : "Cadastre-se"}
          </button>
        </div>

        {/* Lado direito (formulário) */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-6 py-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={modoCadastro ? "cadastro" : "login"}
              initial={{ x: modoCadastro ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: modoCadastro ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md space-y-5"
            >
              {modoCadastro ? (
                <>
                  <h1 className="text-[#045D75] font-bold text-3xl text-center">
                    Criar Conta
                  </h1>
                  <form
                    onSubmit={handleCadastro}
                    className="flex flex-col gap-3"
                  >
                    <input
                      type="text"
                      value={nomeEmpresa}
                      onChange={(e) => setNomeEmpresa(e.target.value)}
                      required
                      placeholder="Nome da empresa"
                      className="p-2 border rounded-md"
                    />
                    <input
                      type="email"
                      value={emailCadastro}
                      onChange={(e) => setEmailCadastro(e.target.value)}
                      required
                      placeholder="E-mail da empresa"
                      className="p-2 border rounded-md"
                    />
                    <input
                      type="password"
                      value={senhaCadastro}
                      onChange={(e) => setSenhaCadastro(e.target.value)}
                      required
                      placeholder="Senha da empresa"
                      className="p-2 border rounded-md"
                    />
                    <hr className="my-2 border-gray-300" />
                    <h2 className="text-lg font-semibold text-[#045D75] text-center">
                      Técnico Administrador
                    </h2>
                    <input
                      type="text"
                      value={nomeTecnico}
                      onChange={(e) => setNomeTecnico(e.target.value)}
                      required
                      placeholder="Nome do técnico"
                      className="p-2 border rounded-md"
                    />
                    <input
                      type="email"
                      value={emailTecnico}
                      onChange={(e) => setEmailTecnico(e.target.value)}
                      required
                      placeholder="E-mail do técnico"
                      className="p-2 border rounded-md"
                    />
                    <input
                      type="password"
                      value={senhaTecnico}
                      onChange={(e) => setSenhaTecnico(e.target.value)}
                      required
                      placeholder="Senha do técnico"
                      className="p-2 border rounded-md"
                    />
                    <button
                      type="submit"
                      className="bg-[#045D75] text-white font-semibold py-2 rounded-md hover:bg-[#064e63] transition"
                    >
                      Cadastrar
                    </button>
                    {erro && <p className="text-red-500 text-sm">{erro}</p>}
                  </form>
                </>
              ) : (
                <>
                  <h1 className="text-[#045D75] font-bold text-3xl text-center">
                    Login
                  </h1>
                  <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="E-mail"
                      className="p-2 border rounded-md"
                    />
                    <input
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      placeholder="Senha"
                      className="p-2 border rounded-md"
                    />
                    <button
                      type="submit"
                      className="bg-[#045D75] text-white font-semibold py-2 rounded-md hover:bg-[#064e63] transition"
                    >
                      Entrar
                    </button>
                    {erro && <p className="text-red-500 text-sm">{erro}</p>}
                  </form>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Login;
