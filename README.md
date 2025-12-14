# 🏥 Sistema de Clínica Médica

Sistema web para gestão de clínica médica, focado na usabilidade e organização de dados. O projeto permite o cadastro de pacientes, médicos e o gerenciamento completo de consultas com filtros dinâmicos.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido combinando performance e design moderno:

-   *React.js:* Construção da interface reativa e componentes.
-   *Ant Design (AntD):* Biblioteca de UI para layout profissional, tabelas e botões.
-   *JavaScript (ES6+):* Lógica de manipulação de dados e estados.

---

## ⚙ Funcionalidades do Sistema

O sistema é dividido em três módulos principais, acessíveis pela barra de navegação superior:

### 1. 🧑 Pacientes
Cadastro e manutenção da base de clientes da clínica.
-   *Dados:* Nome completo, CPF e Data de Nascimento.
-   *Visualização:* Listagem organizada.

### 2. 👨‍⚕ Médicos
Gestão do corpo clínico e especialidades.
-   *Dados:* Nome completo, Especialidade e CRM.

### 3. 🩺 Consultas (Novo ✨)
Módulo central para agendamento e histórico de atendimentos.
-   *Grid Interativo:* Tabela que relaciona Paciente, Médico e Data.
-   *Filtro Inteligente:* Campo de busca "Filtrar por data" para localizar agendamentos rapidamente.
-   *Status Visual:* Feedback amigável (ícone "No data") quando não há registros.
-   *Gestão:* Botão de "Atualizar" e ações rápidas na tabela.

---

## 💡 Roteiro de Teste Recomendado

Como o sistema utiliza armazenamento temporário no navegador (sem banco de dados persistente), recomenda-se seguir este fluxo para testar todas as funcionalidades corretamente:

1.  Acesse a aba *"Cadastro"* (ou Pessoas) e cadastre ao menos um *Médico*.
2.  Cadastre também um *Paciente*.
3.  Vá para a aba *"Consultas"* para realizar o agendamento, selecionando os cadastros criados anteriormente.
4.  Utilize o campo de busca por data para testar a filtragem.

---

## 💻 Como Rodar (StackBlitz)

Este projeto está hospedado no *StackBlitz*, permitindo execução imediata sem configurações complexas.

1.  Acesse o link do projeto.
2.  O ambiente instalará as dependências automaticamente.
3.  O sistema iniciará na janela de preview ao lado do código.

> *Nota para execução local (VS Code):*
> Caso baixe os arquivos para sua máquina:
> bash
> npm install
> npm start
> 

---