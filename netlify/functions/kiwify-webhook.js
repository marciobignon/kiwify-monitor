exports.handler = async (event) => {

    console.log("Webhook recebido!");

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sucesso: true,
            mensagem: "Webhook funcionando!"
        })
    };

};