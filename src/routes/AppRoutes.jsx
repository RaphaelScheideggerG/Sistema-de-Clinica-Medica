import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import PacienteForm from "../componentes/cadastrapessoas/PacienteForm.jsx"; // Depois substituir pelo PessoaForm quando tivermos mais CRUDEs
import ListaPessoas from "../componentes/listapessoas/ListaPessoas.jsx";
import VisualizaPessoa from "../componentes/visualizapessoas/VisualizaPessoa.jsx";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="cadastrar" replace />} />
          <Route path="pessoa"  element={<PessoaForm />} />
          <Route path="listar" element={<ListaPessoas />} />
          <Route path="visualizar/:tipo/:id" element={<VisualizaPessoa />} />
          <Route path="editar/:tipo/:id" element={<PessoaForm />} /> 
         </Route>
      </Routes>
    </BrowserRouter>
  );
}
