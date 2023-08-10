/* 
1. Extrai o `id` do body da requisição.

2. Tenta encontrar um gênero com o `id` fornecido.

3. Se o gênero não for encontrado, retorna um erro 404 ao cliente.

4. Se o gênero for encontrado, tenta deletar o gênero do banco de dados.

5. Se a remoção for bem-sucedida, retorna uma mensagem de sucesso ao cliente com um status 200.

6. Se ocorrer um erro durante qualquer parte deste processo, retorna um erro 500 ao cliente.
*/

app.delete("/genres/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const genre = await prisma.genre.findUnique({
            where: { id: Number(id) },
        });

        if (!genre) {
            return res.status(404).send({ message: "Gênero não encontrado." });
        }

        await prisma.genre.delete({
            where: { id: Number(id) },
        });

        res.status(200).send({ message: "Gênero removido com sucesso." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Houve um problema ao remover o gênero." });
    }
});