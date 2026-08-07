const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async () => {

  console.log("TESTANDO INSERT");

  const resultado = await supabase
    .from("vendas")
    .insert([
      {
        nome_cliente: "Teste",
        email_cliente: "teste@teste.com",
        produto: "Produto Teste",
        valentia: 87,
        data_compra: new Date().toISOString(),
        status_pagamento: "paid",
        dias_garantia: 7,
        status_garantia: "Em garantia",
        kiwify_sale_id: "TESTE123",
        criado_em: new Date().toISOString()
      }
    ])
    .select();

  console.log(JSON.stringify(resultado, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify(resultado)
  };

};