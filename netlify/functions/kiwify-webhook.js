exports.handler = async (event) => {

  console.log("FUNÇÃO EXECUTOU");

  return {
    statusCode: 200,
    body: JSON.stringify({
      sucesso: true
    })
  };

};