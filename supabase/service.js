/* ===================================================
   SERVIÇOS DO SUPABASE
=================================================== */

async function buscarVendas() {

    const { data, error } = await supabaseClient
        .from("vendas")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Erro ao buscar vendas:", error);
        return [];
    }

    return data;
}