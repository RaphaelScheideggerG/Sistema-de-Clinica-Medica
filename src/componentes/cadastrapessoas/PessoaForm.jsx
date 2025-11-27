import React, { useState } from "react";
import { Form, Input, Radio, Button, message, Space, Card } from "antd";
import EnderecoForm from "./EnderecoForm";
import TelefoneList from "./TelefoneList";
import PFForm from "./PFForm";
import PJForm from "./PJForm";
import PF from "../../objetos/modelos/PF.mjs";
import PJ from "../../objetos/modelos/PJ.mjs";
import Endereco from "../../objetos/modelos/Endereco.mjs";
import Telefone from "../../objetos/modelos/Telefone.mjs";
import PFDAO from "../../objetos/dao/PFDAO.mjs";
import PJDAO from "../../objetos/dao/PJDAO.mjs";
import IE from "../../objetos/modelos/IE.mjs";

export default function PessoaFormOO() {
  const [form] = Form.useForm();
  const [tipo, setTipo] = useState("PF");

  const onChangeTipo = (e) => setTipo(e.target.value);

  const onFinish = (values) => {
    let pessoa;
    
      try {
        const end = new Endereco();
        end.setCep(values.endereco?.cep);
        end.setLogradouro(values.endereco?.logradouro);
        end.setBairro(values.endereco?.bairro);
        end.setCidade(values.endereco?.cidade);
        end.setUf(values.endereco?.uf);
        end.setRegiao(values.endereco?.regiao);

        if (values.tipo === "PF") {
          pessoa = new PF();
          pessoa.setCPF(values.cpf);
          pessoa.setDataNascimento(values.dataNascimento)

        } else {
          pessoa = new PJ();
          pessoa.setCNPJ(values.cnpj);
          const inscricaoEstadual = new IE();
          inscricaoEstadual.setNumero(values.ie);
          inscricaoEstadual.setEstado(values.estado);
          inscricaoEstadual.setDataRegistro(values.dataRegistro?.format("DD/MM/YYYY"));
          pessoa.setIE(inscricaoEstadual);
        }

        pessoa.setNome(values.nome);
        pessoa.setEmail(values.email);
        pessoa.setEndereco(end);

        if (values.telefones) {
          values.telefones.forEach((t) => {
            const fone = new Telefone();
            fone.setDdd(t.ddd);
            fone.setNumero(t.numero);
            pessoa.addTelefone(fone);
          });
        }

        const dao = values.tipo === "PF" ? new PFDAO() : new PJDAO();
        dao.salvar(pessoa);

        message.success("Pessoa cadastrada com sucesso!");
        form.resetFields();
        console.log("SUCESSO")
        console.log(values)
        console.log(pessoa)
      } catch (e) {
        message.error("Erro ao salvar: " + e.message);

      }
  };

  return (
    <Card title="Cadastro de Pessoa" style={{ maxWidth: 900, margin: "auto" }}>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label="Tipo de Pessoa" name="tipo" initialValue="PF">
          <Radio.Group onChange={onChangeTipo}>
            <Radio value="PF">Pessoa Física</Radio>
            <Radio value="PJ">Pessoa Jurídica</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Informe o nome!" }]}
        >
          <Input placeholder="Nome completo ou razão social" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Informe o e-mail!" },
            { type: "email", message: "Formato de e-mail inválido!" },
          ]}
        >
          <Input placeholder="exemplo@email.com" />
        </Form.Item>

        <EnderecoForm form={form} />
        <TelefoneList form={form} />

        <Space direction="vertical" style={{ width: "100%" }}>
          {tipo === "PF" ? <PFForm /> : <PJForm />}
          <Button type="primary" htmlType="submit" block>
            Salvar
          </Button>
        </Space>
      </Form>
    </Card>
  );
}
