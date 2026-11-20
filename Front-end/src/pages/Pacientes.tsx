import { useState } from "react";
import Button from "../Componentes/Button";

interface Paciente {
  id: number;
  nome: string;
  idade: number;
  telefone: string;
  convenio: string;
}

const Pacientes = () => {
  const [busca, setBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [novoNome, setNovoNome] = useState("");
  const [novaIdade, setNovaIdade] = useState<number | "">("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [novoConvenio, setNovoConvenio] = useState("");
  const [pacienteEmEdicaoId, setpacienteEmEdicaoId] = useState<number | null>(
    null,
  );

  const [isProntuarioModalOpen, setIsProntuarioModalOpen] = useState(false);
  const [pacienteProntuario, setPacienteProntuario] = useState<Paciente | null>(
    null,
  );

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [error, setError] = useState("");

  const handleSalvarPaciente = (e: any) => {
    e.preventDefault();
    if (!novoNome || !novoTelefone || !novoConvenio) {
      setError("Todas as informações são obrigatórias");
      return;
    }

    if (Number(novaIdade) <= 0) {
      setError("Informe uma idade válida");
      return;
    }

    setError("");

    if (pacienteEmEdicaoId !== null) {
      setPacientes(
        pacientes.map((p) =>
          p.id === pacienteEmEdicaoId
            ? {
                ...p,
                nome: novoNome,
                idade: Number(novaIdade),
                telefone: novoTelefone,
                convenio: novoConvenio,
              }
            : p,
        ),
      );
    } else {
      const novo: Paciente = {
        id:
          pacientes.length > 0
            ? Math.max(...pacientes.map((p) => p.id)) + 1
            : 1,
        nome: novoNome,
        idade: Number(novaIdade),
        telefone: novoTelefone,
        convenio: novoConvenio,
      };
      setPacientes([...pacientes, novo]);
    }

    setNovoNome("");
    setNovaIdade("");
    setNovoTelefone("");
    setNovoConvenio("");
    setIsModalOpen(false);
  };

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pacientes</h1>
          <p className="text-sm text-gray-500">
            Gerencie os cadastros e prontuários da clínica
          </p>
        </div>

        <Button
          title="+ Novo paciente"
          variant="outline"
          onClick={() => {
            setpacienteEmEdicaoId(null);
            setNovoNome("");
            setNovaIdade("");
            setNovoTelefone("");
            setNovoConvenio("");
            setIsModalOpen(true);
          }}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar pacientes por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-teal-500 focus:outline-none sm:w-80"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Idade</th>
              <th className="px-4 py-3">Telefone</th>
              <th className="px-4 py-3">Convênio</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientesFiltrados.map((paciente) => (
              <tr
                key={paciente.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {paciente.nome}
                </td>
                <td className="px-4 py-3 font-medium">{paciente.idade} anos</td>
                <td className="px-4 py-3 font-medium">{paciente.telefone}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">
                    {paciente.convenio}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      title="Prontuário"
                      type="button"
                      variant="default"
                      onClick={() => {
                        setPacienteProntuario(paciente);
                        setIsProntuarioModalOpen(true);
                      }}
                    />

                    <Button
                      title="Editar"
                      type="button"
                      variant="default"
                      onClick={() => {
                        setpacienteEmEdicaoId(null);
                        setNovoNome(paciente.nome);
                        setNovaIdade(paciente.idade);
                        setNovoTelefone(paciente.telefone);
                        setNovoConvenio(paciente.convenio);
                        setIsModalOpen(true);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {pacientesFiltrados.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  Nenhum paciente encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de prontuário */}
      {isProntuarioModalOpen && pacienteProntuario && (
        <div className="bg-black-50 fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <h2>Prontuário de {pacienteProntuario.nome}</h2>
            <div className="mb-6 space-y-3 text-gray-600">
              <p>
                <strong>Idade:</strong>
                {pacienteProntuario.idade}anos
              </p>
              <p>
                <strong>Telefone:</strong>
                {pacienteProntuario.telefone}
              </p>
              <p>
                <strong>Convênio:</strong>
                {pacienteProntuario.convenio}
              </p>
            </div>

            <div>
              <Button
                title="Fechar"
                variant="default"
                onClick={() => {
                  setIsProntuarioModalOpen(false);
                  setPacienteProntuario(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de cadastro ativado pela variável isModalOpen */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Cadastrar Novo Paciente</h2>
            <form onSubmit={handleSalvarPaciente}>
              <div className="mb-3">
                <label className="text-sm text-gray-600">Nome</label>
                <input
                  type="text"
                  value={novoNome}
                  onChange={(e) => {
                    setNovoNome(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full rounded border px-3 py-2"
                />
              </div>
              <div className="mb-3">
                <label className="text-sm text-gray-600">Idade</label>
                <input
                  type="number"
                  value={novaIdade}
                  onChange={(e) => {
                    setNovaIdade(
                      e.target.value === "" ? "" : Number(e.target.value),
                    );
                    if (error) setError("");
                  }}
                  className="w-full rounded border px-3 py-2"
                />
              </div>
              <div className="mb-3">
                <label className="text-sm text-gray-600">Telefone</label>
                <input
                  type="text"
                  value={novoTelefone}
                  onChange={(e) => {
                    setNovoTelefone(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full rounded border px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-600">Convênio</label>
                <input
                  type="text"
                  value={novoConvenio}
                  onChange={(e) => {
                    setNovoConvenio(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full rounded border px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-600"
                >
                  Salvar
                </button>
              </div>
              {error && (
                <p className="text-left text-sm font-bold text-red-500">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pacientes;
