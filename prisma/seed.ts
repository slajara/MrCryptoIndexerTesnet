import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const e7lList: Prisma.E7LCreateInput[] = [
  {
    name: "Dream Big",
    deployedBlock: 7228369,
    lastBlockIndexed: 7228369,
    contractAddress: "0x7ee331c64ba5ebf829e6d9f02c6dcb44dfe86c0e",
    imageURL:
      "https://mrcrypto-sources.s3.eu-central-1.amazonaws.com/3-0/dream-big/Copia+de+DREAM+BIG+B.png",
  },
  {
    name: "Escape Socialism",
    deployedBlock: 7228399,
    lastBlockIndexed: 7228399,
    contractAddress: "0x4e3534f28938180e13a3b9efda08cea0d5d0751c",
    imageURL:
      "https://mrcrypto-sources.s3.eu-central-1.amazonaws.com/3-0/escape-socialism/Copia+de+ESCAPE+Camiseta+3.0.png",
  },
  {
    name: "Mamba Black",
    deployedBlock: 7228068,
    lastBlockIndexed: 7228068,
    contractAddress: "0x09c56adf48c89586e4965b71bb9c4cb67bd89cea",
    imageURL:
      "https://mrcrypto-sources.s3.eu-central-1.amazonaws.com/3-0/mamba-black/mamba_black.jpg",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  const e7ls = await prisma.e7L.findMany();

  for (const e7l of e7lList) {
    const existE7LInDB = e7ls.find(
      (e) => e.contractAddress === e7l.contractAddress,
    );

    if (!existE7LInDB) {
      const e7lCreated = await prisma.e7L.create({
        data: e7l,
      });

      console.log(
        `Created E7L ${e7lCreated.name.padStart(26)} with id: ${e7lCreated.id}`,
      );
    }
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
