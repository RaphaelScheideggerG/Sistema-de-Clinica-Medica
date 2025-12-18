import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout.jsx"
import MainForm from "../componentes/form/MainForm.jsx"

import EditaPessoa from "../componentes/edita/EditaPessoa.jsx"
import ListaPessoas from "../componentes/lista/ListaPessoas.jsx";
import VisualizaPessoa from "../componentes/visualiza/VisualizaPessoa.jsx";

import EditaConsulta from "../componentes/edita/EditaConsulta.jsx";
import ListaConsultas from "../componentes/lista/ListaConsultas.jsx"
import ListaPessoaConsultas from "../componentes/lista/ListaPessoaConsultas.jsx"
import VisualizaConsulta from "../componentes/visualiza/VisualizaConsulta.jsx";

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
