/* ============================================
   MONITOR KIWIFY
   APP.JS
   VERSÃO 1.0
============================================ */

console.log("🚀 Monitor Kiwify iniciado com sucesso!");

/* ============================================
   ELEMENTOS DA TELA
============================================ */

const totalVendido = document.getElementById("totalVendido");
const garantia = document.getElementById("garantia");
const ultimoDia = document.getElementById("ultimoDia");
const encerradas = document.getElementById("encerradas");
const listaVendas = document.getElementById("listaVendas");

/* ============================================
   DADOS INICIAIS
============================================ */

let dashboard = {

    total: 0,

    garantia: 0,

    ultimoDia: 0,

    encerradas: 0

};

/* ============================================
   ATUALIZA OS CARDS
============================================ */

function atualizarDashboard(){

    totalVendido.innerHTML =
        "R$ " + dashboard.total.toFixed(2);

    garantia.innerHTML =
        dashboard.garantia;

    ultimoDia.innerHTML =
        dashboard.ultimoDia;

    encerradas.innerHTML =
        dashboard.encerradas;

}

/* ============================================
   MOSTRA VENDAS
============================================ */

function mostrarVendas(){

    listaVendas.innerHTML = `

    <tr>

        <td colspan="6">

            Nenhuma venda encontrada.

        </td>

    </tr>

    `;

}

/* ============================================
   INICIAR SISTEMA
============================================ */

function iniciarSistema(){

    atualizarDashboard();

    mostrarVendas();

    console.log("✅ Dashboard carregado.");

}

iniciarSistema();
buscarVendas().then(vendas => {

    console.log("Vendas encontradas:");

    console.table(vendas);

});