/* 
Chama todos os valores de genero

Se ocorrer um erro durante qualquer parte do processo, retorna um erro 500 ao cliente. 	Internal Server Error
*/

app.get("/genres", async (req, res) => {
    try {
        const prisma = new PrismaClient()

        async function main() {
        const genres = await prisma.genre.findMany()
        console.log(genres)
        }

        main()
        .then(async () => {
            await prisma.$disconnect()
        })
        res.status(200).json(genres)
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Houve um problema ao adicionar o novo gênero." });
    }
});