import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout.jsx"
import MainForm from "../componentes/cadastrapessoas/MainForm.jsx"

import EditaPessoa from "../componentes/cadastrapessoas/EditaPessoa.jsx"
import ListaPessoas from "../componentes/listapessoas/ListaPessoas.jsx";
import VisualizaPessoa from "../componentes/visualizapessoas/VisualizaPessoa.jsx";

import EditaConsulta from "../componentes/consulta/EditaConsulta.jsx";
import ListaConsultas from "../componentes/consulta/ListaConsultas.jsx"
import ListaPessoaConsultas from "../componentes/consulta/ListaPessoaConsultas.jsx"
import VisualizaConsulta from "../componentes/consulta/VisualizaConsulta.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
         
         <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="cadastro" replace />} />

          <Route path="cadastro"  element={<MainForm />} />

          <Route path="pessoas" element={<ListaPessoas />} />
          <Route path="visualizar-pessoa/:tipo/:id" element={<VisualizaPessoa />} />
          <Route path="editar-pessoa/:tipo/:id" element={<EditaPessoa/>} /> 

          <Route path="consultas" element={<ListaConsultas/>} />
          <Route path="visualizar-consulta/:id" element={<VisualizaConsulta/>} />
          <Route path="consultas/:tipo/:id" element={<ListaPessoaConsultas/>} />
          <Route path="editar-consulta/:id" element={<EditaConsulta/>} />

         </Route>
      </Routes>
    </BrowserRouter>
  );
}
