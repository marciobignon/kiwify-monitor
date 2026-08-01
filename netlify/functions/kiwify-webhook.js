const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {
  try {
    console.log("📩 Webhook recebido da Kiwify");

    // Converte o JSON enviado pela Kiwify
    const dados = JSON.parse(event.body);

    console.log("Dados recebidos:");
    console.log(dados);

    return {
      statusCode: 200,
      body: JSON.stringify({
        sucesso: true,
        mensagem: "Webhook recebido com sucesso!"
      })
    };

  } catch (erro) {

    console.error("Erro:", erro);

    return {
      statusCode: 500,
      body: JSON.stringify({
        sucesso: false,
        erro: erro.message
      })
    };

  }
};