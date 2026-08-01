const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {

  console.log("====================================");
  console.log("WEBHOOK KIWIFY");
  console.log("Método:", event.httpMethod);
  console.log("Headers:");
  console.log(event.headers);
  console.log("Body:");
  console.log(event.body);
  console.log("====================================");

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true
    })
  };

};