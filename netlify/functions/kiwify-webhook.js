const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {

  try {

    console.log("======================================");
    console.log("WEBHOOK KIWIFY INICIADO");
    console.log("======================================");

    // Aceita apenas POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          success: false,
          erro: "Método não permitido."
        })
      };
    }

    // Verifica se existe body
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          erro: "Requisição sem body."
        })
      };
    }

    const dados = JSON.parse(event.body);

    console.log("Venda:", dados.order_ref);
    console.log("Cliente:", dados.Customer?.full_name);
    console.log("Produto:", dados.Product?.product_name);

    // Procura venda existente
    const { data: vendaExistente, error: erroBusca } = await supabase
      .from("vendas")
      .select("kiwify_sale_id")
      .eq("kiwify_sale_id", dados.order_ref)
      .maybeSingle();

    if (erroBusca) {

      console.error("ERRO CONSULTANDO SUPABASE");
      console.error(JSON.stringify(erroBusca, null, 2));

      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          erro: erroBusca.message
        })
      };

    }

    if (vendaExistente) {

      console.log("Venda já cadastrada.");

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          mensagem: "Venda já existe."
        })
      };

    }

    const valor =
      (dados.Commissions?.charge_amount || 0) / 100;

    const { error } = await supabase
      .from("vendas")
      .insert([
        {
          kiwify_sale_id: dados.order_ref,

          nome_cliente: dados.Customer?.full_name,

          email_cliente: dados.Customer?.email,

          produto: dados.Product?.product_name,

          valentia: valor,

          data_compra: dados.approved_date,

          status_pagamento: dados.order_status,

          dias_garantia: 7,

          status_garantia: "Em garantia",

          criado_em: new Date().toISOString()
        }
      ]);

    if (error) {

      console.error("========== ERRO SUPABASE ==========");
      console.error(JSON.stringify(error, null, 2));
      console.error("===================================");

      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          erro: error.message
        })
      };

    }

    console.log("======================================");
    console.log("VENDA GRAVADA COM SUCESSO");
    console.log("======================================");

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    };

  } catch (erro) {

    console.error("========== ERRO GERAL ==========");
    console.error(erro);
    console.error("================================");

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        erro: erro.message
      })
    };

  }

};