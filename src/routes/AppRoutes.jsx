import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import PessoaForm from "../componentes/cadastrapessoas/PessoaForm.jsx";
import PessoaFormOO from "../componentes/cadastrapessoas/EditaPessoa.jsx"
import ListaPessoas from "../componentes/listapessoas/ListaPessoas.jsx";
import VisualizaPessoa from "../componentes/visualizapessoas/VisualizaPessoa.jsx";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="pessoa" replace />} />
          <Route path="pessoa"  element={<PessoaForm />} />
          <Route path="lista" element={<ListaPessoas />} />
          <Route path="visualizar/:tipo/:id" element={<VisualizaPessoa />} />
          <Route path="editar/:tipo/:id" element={<PessoaFormOO/>} /> 
         </Route>
      </Routes>
    </BrowserRouter>
  );
}
