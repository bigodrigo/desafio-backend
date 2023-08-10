/* 
1. Extrai o `id` da rota, o `name` é necessário?

2. Eu preferia uma confirmação, talvez no front?

3. Tenta encontrar um gênero com o id fornecido. Se o gênero não for encontrado, retorna um erro 404 ao cliente.

4. Se a remoção for bem-sucedida, retorna o gênero removido ao cliente com um status 204?. No Content 410 Gone?

5. Se ocorrer um erro durante qualquer parte do processo, retorna um erro 500 ao cliente.
*/

app.put("/genres/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await prisma.genre.findUnique({
            where: { id: Number(id) },
        });

        if (!genre) {
            return res.status(404).send({ message: "Gênero não encontrado." });
        }

        const existingGenre = await prisma.genre.findFirst({
            where: { 
                id: { equals: id } 
            },
        });

        if(existingGenre){
            const deleteGenre = await prisma.genre.delete({
                where: {
                    id: id 
                },
              })
            deleteGenre
            res.status(204).send({ message: `Removemos o gênero ${existingGenre}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Houve um problema ao atualizar o gênero." });
    }
});