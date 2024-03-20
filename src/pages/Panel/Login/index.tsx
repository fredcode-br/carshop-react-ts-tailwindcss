import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";  
import { UserCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Button from "../../../components/Button";
import { AuthContext } from "../../../common/context/AuthContext";
import logoAdmin from "../../../assets/img/logoadm.png";


interface ILogin {
    email: string;
    password: string;
}

function Login(){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { signIn, signed } = useContext(AuthContext);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const data: ILogin = {
          email: email,
          password: password  
        }

        await signIn(data); 
    }

    if(signed ) {
      return <Navigate to="/dashboard" />
    } 

    return (
        <main className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center bg-black p-7 rounded-sm text-white">
            <img src={logoAdmin} className=" w-52" alt="logo da empresa, formada por um carro em cima da palavra carshop e ao lado a palavra ADM grande em negrito" />
            <form onSubmit={handleLogin} className="mt-6">
            <div className="relative flex items-center mb-5">
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value) }
                    placeholder="E-mail" 
                    className="bg-white text-gray-600 border font-bold border-gray-600 px-4 py-2 rounded-lg focus:outline-none pl-10" 
                />
                <UserCircleIcon className="h-6 w-6 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

              <div className="relative flex items-center mb-5">
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value) }
                    placeholder="Senha" 
                    className="bg-white text-gray-600 border font-bold border-gray-600 px-4 py-2 rounded-lg focus:outline-none pl-10" 
                />
                <LockClosedIcon className="h-6 w-6 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <Button
                type="submit"
                customClass="bg-gray-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Iniciar sessão
              </Button>
            </form>
          </div>
        </main>
    );
}

export default Login;
