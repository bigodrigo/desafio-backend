/* 
1. Extrai o `id` da rota e o `name` do body da requisição.

2. Verifica se o `name` foi fornecido. Se não, retorna um erro 400 ao cliente informando que o nome é obrigatório.

3. Tenta encontrar um gênero com o id fornecido. Se o gênero não for encontrado, retorna um erro 404 ao cliente.

4. Verifica se já existe outro gênero com o mesmo nome (ignorando maiúsculas e minúsculas), excluindo o gênero que está sendo atualizado. Se um gênero com o mesmo nome já existir, retorna um erro 409 ao cliente.

5. Se não houver conflito, atualiza o gênero com o novo nome.

6. Se a atualização for bem-sucedida, retorna o gênero atualizado ao cliente com um status 200.

7. Se ocorrer um erro durante qualquer parte do processo, retorna um erro 500 ao cliente.
*/

app.put("/genres/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if(!name) {
        return res.status(400).send({ message: "O nome do gênero é obrigatório." });
    }

    try {
        const genre = await prisma.genre.findUnique({
            where: { id: Number(id) },
        });

        if (!genre) {
            return res.status(404).send({ message: "Gênero não encontrado." });
        }

        const existingGenre = await prisma.genre.findFirst({
            where: { 
                name: { equals: name, mode: "insensitive" },
                id: { not: Number(id) } 
            },
        });

        if(existingGenre){
            return res.status(409).send({ message: "Este nome de gênero já existe." });
        }

        const updatedGenre = await prisma.genre.update({
            where: { id: Number(id) },
            data: { name },
        });

        res.status(200).json(updatedGenre);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Houve um problema ao atualizar o gênero." });
    }
});