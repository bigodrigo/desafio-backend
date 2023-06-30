import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const movie = await prisma.movie.create({
    data: {
      title: 'Matrix',
      description: 'O jovem programador Thomas Anderson é atormentado por estranhos pesadelos em que está sempre conectado por cabos a um imenso sistema de computadores do futuro. À medida que o sonho se repete, ele começa a desconfiar da realidade.',
      genre: 'Action'
    },
  })
  console.log(movie)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })