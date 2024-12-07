import React from "react";
import TransacaoForm from "../components/TransacaoForm";

export default function TransacaoFormScreen({ route, navigation }) {
  const handleSave = (novaTransacao) => {
    route.params.onSave(novaTransacao);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return <TransacaoForm onSave={handleSave} onCancel={handleCancel} />;
}
