/* 
1. Ele busca todos os gêneros na base de dados, ordenando-os pelo campo `name` em ordem ascendente.

2. Se a busca for bem-sucedida, ele retorna a lista de gêneros ao cliente.

3. Se ocorrer um erro durante a busca, retorna um erro 500 ao cliente.
*/

app.get("/genres", async (_, res) => {
    try {
        const genres = await prisma.genre.findMany({
            orderBy: {
                name: "asc",
            },
        });

        res.json(genres);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Houve um problema ao buscar os gêneros." });
    }
});