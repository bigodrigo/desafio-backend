/* 
1. Verifica se o `name` foi fornecido. Se não, retorna um erro 400 ao cliente informando que o nome é obrigatório. Bad Request

2. Verifica se já existe outro gênero com o mesmo nome (ignorando maiúsculas e minúsculas), excluindo o gênero que está sendo criado. Se um gênero com o mesmo nome já existir, retorna um erro 409 ao cliente. Conflict

3. Se não houver conflito, cria o gênero com o novo nome.

4. Se a atualização for bem-sucedida, retorna o gênero atualizado ao cliente com um status 201. Created

5. Se ocorrer um erro durante qualquer parte do processo, retorna um erro 500 ao cliente. 	Internal Server Error
*/

app.post("/genres", async (req, res) => {
    const { name } = req.body;

    if(!name) {
        return res.status(400).send({ message: "O nome do gênero é obrigatório." });
    }

    try {
        const existingGenre = await prisma.genre.findFirst({
            where: { name: { equals: name, mode: "insensitive" } }
        });

        if(existingGenre){
            return res.status(409).send({ message: "Este nome de gênero já existe." });
        }

        const newGenre = await prisma.genre.create({
            data: { name },
        });

        res.status(201).json(newGenre);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Houve um problema ao adicionar o novo gênero." });
    }
});