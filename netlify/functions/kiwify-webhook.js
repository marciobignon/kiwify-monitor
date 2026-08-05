const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async () => {

  console.log("TESTANDO CONEXÃO COM SUPABASE");

  const { data, error } = await supabase
    .from("vendas")
    .select("*")
    .limit(1);

  console.log("DATA:");
  console.log(data);

  console.log("ERROR:");
  console.log(error);

  return {
    statusCode: 200,
    body: JSON.stringify({
      sucesso: true
    })
  };

};