import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'user' },
      { name: 'coach' },
      { name: 'assistant_coach' },
      { name: 'active_member' },
      { name: 'board_member' },
      { name: 'alumni' },
      { name: 'partner' },
      { name: 'contact_person' },
    ],
    skipDuplicates: true, // Skip if roles already exist
  });

  console.log('Roles seeded:', roles);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
