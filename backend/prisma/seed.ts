import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const password = await bcrypt.hash('Password1!', 12);

await prisma.rating.deleteMany();
await prisma.store.deleteMany();
await prisma.user.deleteMany();

const [admin, olivia, sofia, marcus] = await Promise.all([
  prisma.user.create({ data: { name: 'James Wilson', email: 'admin@northstar.com', passwordHash: password, address: '500 Congress Ave, Austin', role: Role.ADMIN } }),
  prisma.user.create({ data: { name: 'Olivia Bennett', email: 'olivia@northstar.com', passwordHash: password, address: '14 Cedar Lane, Austin', role: Role.USER } }),
  prisma.user.create({ data: { name: 'Sofia Rodriguez', email: 'sofia@northstar.com', passwordHash: password, address: '7 Rosewood Drive, Austin', role: Role.USER } }),
  prisma.user.create({ data: { name: 'Marcus Thompson', email: 'owner@northstar.com', passwordHash: password, address: '81 Market Street, Austin', role: Role.OWNER } })
]);
const greenTable = await prisma.store.create({ data: { name: 'The Green Table', address: '81 Market Street, Austin, TX', ownerId: marcus.id } });
const juniper = await prisma.store.create({ data: { name: 'Juniper & Co.', address: '204 West 5th Street, Austin, TX' } });
await prisma.store.createMany({ data: [
  { name: 'Riverside Roasters', address: '17 Rainey Street, Austin, TX' },
  { name: 'Harvest House', address: '312 South Lamar Blvd, Austin, TX' },
  { name: 'Little Owl Bakery', address: '401 East Cesar Chavez, Austin, TX' }
] });
await prisma.rating.createMany({ data: [
  { userId: olivia.id, storeId: greenTable.id, score: 5 },
  { userId: sofia.id, storeId: greenTable.id, score: 5 },
  { userId: olivia.id, storeId: juniper.id, score: 4 }
] });
console.log(`Seeded admin ${admin.email}, user ${olivia.email}, owner ${marcus.email}. Password: Password1!`);
await prisma.$disconnect();
