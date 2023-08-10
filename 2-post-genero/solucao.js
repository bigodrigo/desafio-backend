/* 
1. Extrai o `name` do body da requisição.

2. Verifica se o `name` foi enviado. Se não, retorna um erro 400 ao cliente informando que o nome é obrigatório.

3. Tenta encontrar um gênero existente com o mesmo nome (ignorando a diferença entre maiúsculas e minúsculas).

4. Se um gênero com o mesmo nome já existir, retorna um erro 409 ao cliente informando que o gênero já existe.

5. Se o gênero não existir, tenta criar um novo gênero no banco de dados.

6. Se a criação for bem-sucedida, retorna o novo gênero ao cliente com um status 201.

7. Se ocorrer um erro durante qualquer parte deste processo, retorna um erro 500 ao cliente.
*/

app.post("/genres", async (req, res) => {
    const { name } = req.body;
  
    if(!name) {
        return res.status(400).send({ message: "O nome do gênero é obrigatório." });
    }
  
    try {
        // Verificar se o gênero já existe (ignorando maiúsculas e minúsculas)
        const existingGenre = await prisma.genre.findFirst({
            where: { name: { equals: name, mode: "insensitive" } }
        });
  
        if (existingGenre) {
            return res.status(409).send({ message: "Esse gênero já existe." });
        }
  
        const newGenre = await prisma.genre.create({
            data: {
                name
            }
        });
  
        res.status(201).json(newGenre);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Houve um problema ao adicionar o novo gênero." });
    }
  });