import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const e7lList: Prisma.E7LCreateInput[] = [
  {
    name: "Dream Big",
    deployedBlock: 44698332,
    lastBlockIndexed: 44698332	,
    contractAddress: "0x6d989B12D44040727E18AAe609cD0F3510A7eCE3",
    imageURL:
      "https://mrcrypto-sources.s3.eu-central-1.amazonaws.com/3-0/dream-big/Copia+de+DREAM+BIG+B.png",
  },
  {
    name: "Escape Socialism",
    deployedBlock: 44698809,
    lastBlockIndexed: 44698809,
    contractAddress: "0x3F7EcDb60d94721cd1160adB932bE75AD273355c",
    imageURL:
      "https://mrcrypto-sources.s3.eu-central-1.amazonaws.com/3-0/escape-socialism/Copia+de+ESCAPE+Camiseta+3.0.png",
  },
  {
    name: "Mamba Black",
    deployedBlock: 44698856,
    lastBlockIndexed: 44698856,
    contractAddress: "0x8D5992fA6bb42f32cAf260D3b964e2BBbA573CdB",
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
