import { PrismaClient, Role } from '@prisma/client';
import { hashPassword } from '../lib/password';

const prisma = new PrismaClient();

async function main() {
  await prisma.setting.upsert({ where: { id: 1 }, update: {}, create: { id: 1, waterCostPerM3: 35, waterPeriodCost: 150 } });

  const users = [
    { email: 'user@limboda.se', name: 'Standard User', role: Role.standard, houseNumber: 1 },
    { email: 'firm@limboda.se', name: 'Firmatecknare', role: Role.firmatecknare, houseNumber: 2 },
    { email: 'board@limboda.se', name: 'Styrelsen', role: Role.styrelsen, houseNumber: 3 },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, passwordHash: await hashPassword('password123') },
    });
  }
}

main().finally(async () => prisma.$disconnect());
