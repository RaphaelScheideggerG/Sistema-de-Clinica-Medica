import { Form, Input, DatePicker } from "antd";

export default function PFForm() {
  return (
    <>
      <Form.Item
        label="CPF"
        name="cpf"
        rules={[{ required: true, message: "Informe o CPF!" }]}
      >
        <Input placeholder="Somente números" maxLength={11} />
      </Form.Item>

      <Form.Item label="Data de Nascimento" name="dataNascimento">
        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
      </Form.Item>
    </>
  );
}
