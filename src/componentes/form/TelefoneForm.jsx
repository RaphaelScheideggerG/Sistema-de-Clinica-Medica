import React from 'react';
import { Select, Input, Form } from 'antd';

const dddsBrasil = [
  { value: '11', label: '11 - São Paulo (SP)' },
  { value: '12', label: '12 - São José dos Campos (SP)' },
  { value: '13', label: '13 - Santos (SP)' },
  { value: '14', label: '14 - Bauru (SP)' },
  { value: '15', label: '15 - Sorocaba (SP)' },
  { value: '16', label: '16 - Ribeirão Preto (SP)' },
  { value: '17', label: '17 - São José do Rio Preto (SP)' },
  { value: '18', label: '18 - Presidente Prudente (SP)' },
  { value: '19', label: '19 - Campinas (SP)' },
  { value: '21', label: '21 - Rio de Janeiro (RJ)' },
  { value: '22', label: '22 - Campos dos Goytacazes (RJ)' },
  { value: '24', label: '24 - Volta Redonda (RJ)' },
  { value: '27', label: '27 - Vitória (ES)' },
  { value: '28', label: '28 - Cachoeiro de Itapemirim (ES)' },
  { value: '31', label: '31 - Belo Horizonte (MG)' },
  { value: '32', label: '32 - Juiz de Fora (MG)' },
  { value: '33', label: '33 - Governador Valadares (MG)' },
  { value: '34', label: '34 - Uberlândia (MG)' },
  { value: '35', label: '35 - Poços de Caldas (MG)' },
  { value: '37', label: '37 - Divinópolis (MG)' },
  { value: '38', label: '38 - Montes Claros (MG)' },
  { value: '41', label: '41 - Curitiba (PR)' },
  { value: '42', label: '42 - Ponta Grossa (PR)' },
  { value: '43', label: '43 - Londrina (PR)' },
  { value: '44', label: '44 - Maringá (PR)' },
  { value: '45', label: '45 - Foz do Iguaçu (PR)' },
  { value: '46', label: '46 - Francisco Beltrão (PR)' },
  { value: '47', label: '47 - Joinville (SC)' },
  { value: '48', label: '48 - Florianópolis (SC)' },
  { value: '49', label: '49 - Chapecó (SC)' },
  { value: '51', label: '51 - Porto Alegre (RS)' },
  { value: '53', label: '53 - Pelotas (RS)' },
  { value: '54', label: '54 - Caxias do Sul (RS)' },
  { value: '55', label: '55 - Santa Maria (RS)' },
  { value: '61', label: '61 - Brasília (DF)' },
  { value: '62', label: '62 - Goiânia (GO)' },
  { value: '64', label: '64 - Rio Verde (GO)' },
  { value: '63', label: '63 - Palmas (TO)' },
  { value: '65', label: '65 - Cuiabá (MT)' },
  { value: '66', label: '66 - Rondonópolis (MT)' },
  { value: '67', label: '67 - Campo Grande (MS)' },
  { value: '68', label: '68 - Rio Branco (AC)' },
  { value: '69', label: '69 - Porto Velho (RO)' },
  { value: '71', label: '71 - Salvador (BA)' },
  { value: '73', label: '73 - Ilhéus (BA)' },
  { value: '74', label: '74 - Juazeiro (BA)' },
  { value: '75', label: '75 - Feira de Santana (BA)' },
  { value: '77', label: '77 - Barreiras (BA)' },
  { value: '79', label: '79 - Aracaju (SE)' },
  { value: '81', label: '81 - Recife (PE)' },
  { value: '87', label: '87 - Petrolina (PE)' },
  { value: '82', label: '82 - Maceió (AL)' },
  { value: '83', label: '83 - João Pessoa (PB)' },
  { value: '84', label: '84 - Natal (RN)' },
  { value: '85', label: '85 - Fortaleza (CE)' },
  { value: '88', label: '88 - Juazeiro do Norte (CE)' },
  { value: '86', label: '86 - Teresina (PI)' },
  { value: '89', label: '89 - Picos (PI)' },
  { value: '91', label: '91 - Belém (PA)' },
  { value: '93', label: '93 - Santarém (PA)' },
  { value: '94', label: '94 - Marabá (PA)' },
  { value: '92', label: '92 - Manaus (AM)' },
  { value: '97', label: '97 - Coari (AM)' },
  { value: '95', label: '95 - Boa Vista (RR)' },
  { value: '96', label: '96 - Macapá (AP)' },
  { value: '98', label: '98 - São Luís (MA)' },
  { value: '99', label: '99 - Imperatriz (MA)' }
];

const TelefoneForm = () => {
  return (
    <Form.Item label="Telefone">
      <Input.Group compact>
        <Form.Item
          name={['telefone', 'ddd']}
          noStyle
          rules={[{ required: true, message: 'DDD obrigatório' }]}
        >
          <Select
            showSearch
            placeholder="DDD"
            options={dddsBrasil}
            style={{ width: 120 }}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </Form.Item>

        <Form.Item
          name={['telefone', 'numero']}
          noStyle
          rules={[
            { required: true, message: 'Telefone obrigatório' },
            { pattern: /^[0-9]+$/, message: 'Digite apenas números' }
          ]}
        >
          <Input
            style={{ width: 'calc(100% - 120px)' }}
            placeholder="9xxxxyyyy"
            maxLength={9}
          />
        </Form.Item>


      </Input.Group>
    </Form.Item>
  );
};

export default TelefoneForm;