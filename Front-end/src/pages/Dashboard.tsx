import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "../Componentes/Button";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div className="flex h-screen w-full bg-teal-100">
      <aside className="flex w-64 flex-col bg-white p-6 shadow-md">
        <h2 className="mb-8 text-lg font-bold text-slate-700">Dashboard</h2>

        <nav className="flex flex-col gap-6 text-lg font-medium text-slate-600">
          <Link to="/dashboard/pacientes" className="hover:text-teal-700">
            Cadastro de pacientes
          </Link>
          <Link to="/fila-espera" className="hover:text-teal-700">
            Fila de espera
          </Link>
          <Link to="/visitas" className="hover:text-teal-700">
            Visitas Domiciliares
          </Link>
          <Link to="/processos" className="hover:text-teal-700">
            Processos-TFD
          </Link>
           <Button
            title="Sair"
            variant="default"
            onClick={handleLogout}
            
          />
        </nav>
      </aside>
      <main className="flex-1 h-full p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl mb-4 font-bold text-slate-800">
              Bem-vindo ao Sistema
            </h1>
           
          </div>
         
        </div>
        <Outlet />
      </main>
    </div>
  );
};
export default Dashboard;
