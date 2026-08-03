const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {

  try {
    console.log("########## VERSÃO NOVA ##########");

    console.log("==================================");
    console.log("WEBHOOK RECEBIDO DA KIWIFY");
    console.log("==================================");

    const dados = JSON.parse(event.body);

    console.log("Venda:", dados.order_ref);
    console.log("Cliente:", dados.Customer.full_name);
    console.log("Produto:", dados.Product.product_name);

    // Verifica se a venda já existe
    const { data: vendaExistente } = await supabase
      .from("vendas")
      .select("kiwify_sale_id")
      .eq("kiwify_sale_id", dados.order_ref)
      .maybeSingle();

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
        // Grava a venda no Supabase
    const { error } = await supabase
      .from("vendas")
      .insert([
        {
          nome_cliente: dados.Customer.full_name,
          email_cliente: dados.Customer.email,
          produto: dados.Product.product_name,

          valentia: dados.Commissions.charge_amount / 100,

          data_compra: dados.approved_date,

          status_pagamento: dados.order_status,

          dias_garantia: 7,

          status_garantia: "Em garantia",

          criado_em: new Date().toISOString(),

          kiwify_sale_id: dados.order_ref
        }
      ]);

    if (error) {

      console.error("Erro ao gravar venda:");
      console.error(error);

      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          erro: error.message
        })
      };

    }

    console.log("Venda gravada com sucesso!");
        return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        mensagem: "Venda gravada com sucesso."
      })
    };

  } catch (erro) {

    console.error("ERRO NO WEBHOOK:");
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