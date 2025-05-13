import NJgroup from "../assets/NJgroup.png";
import { useEffect, useState } from "react";
import BgLogin1 from "../assets/BgLogin1.jpeg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  rememberMe
    ? localStorage.setItem("rememberedEmail", email)
    : localStorage.removeItem("rememberedEmail");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Mot de passe:", password);
    console.log("Se souviens de moi:", rememberMe);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("L'adresse email n'est pas valide");
      return;
    }

    const correctPassword = "123test";

    if (password === correctPassword) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Mot de passe incorrect");
    }
  };

  return (
    <>
      <div className="grid grid-cols-[1.5fr_2fr] max-sm:grid-cols-1">
        <div className="relative ">
          <div>
            <img
              src={BgLogin1}
              alt="Login"
              className="w-full h-screen object-cover absolute"
            />
          </div>
          <div className="relative z-10 flex items-center justify-center min-h-screen flex-col text-center pb-85">
            <img src={NJgroup} alt="NJgroup" className="w-30 h-30" />
            <h1 className="text-xl font-semibold pb-5">
              Heureux de vous revoir
            </h1>
            <p className="opacity-80">
              Expérience utilisateur et conception d'interface <br /> Stratégie
              pour une solution SaaS.
            </p>
          </div>
        </div>

        <div className="bg-rose-100">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center min-h-screen flex-col gap-5"
          >
            <div>
              <h1 className="text-2xl font-semibold max-sm:text-center">
                Connectez vous avec un compte admin
              </h1>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="pb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder=" Votre Email..."
                className="bg-white w-90 h-10 rounded-md max-sm:w-70"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="pb-2">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder=" Votre mot de passe..."
                className="bg-white w-90 h-10 rounded-md max-sm:w-70"
                autoComplete="current-password"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span> Se souvenir de moi</span>
              </label>
            </div>

            <button
              type="submit"
              className="bg-red-400 w-90 h-10 rounded-md hover:bg-red-500 transition-color duration-300 max-sm:w-70"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
