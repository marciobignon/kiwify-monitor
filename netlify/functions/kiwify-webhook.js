const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {
  try {

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Método não permitido"
      };
    }

    const body = JSON.parse(event.body);

    // A Kiwify envia os dados dentro de "order"
    const dados = body.order || body;

    const { data: existente } = await supabase
      .from("vendas")
      .select("kiwify_sale_id")
      .eq("kiwify_sale_id", dados.order_ref)
      .maybeSingle();

    if (existente) {
      console.log("Venda já cadastrada.");

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Venda já existe."
        })
      };
    }

    const valor = (dados.Commissions?.charge_amount || 0) / 100;

    const { data, error } = await supabase
      .from("vendas")
      .insert([
        {
          nome_cliente: dados.Customer?.full_name,
          email_cliente: dados.Customer?.email,
          produto: dados.Product?.product_name,
          valor: valor,
          data_compra: dados.approved_date,
          status_pagamento: dados.order_status,
          dias_garantia: 7,
          status_garantia: "Em garantia",
          created_at: new Date().toISOString(),
          kiwify_sale_id: dados.order_ref
        }
      ])
      .select();

    console.log("RESULTADO:");
    console.log(JSON.stringify({ data, error }, null, 2));

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error)
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    };

  } catch (erro) {

    console.error(erro);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        erro: erro.message
      })
    };

  }
};