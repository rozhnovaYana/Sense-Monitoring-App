import { PrismaClient } from "@prisma/client";
export const db = new PrismaClient();
// import msgs from "./messages.json";
// async function main() {
//   const inserts = [];
//   for (const data of msgs) {
//     inserts.push(
//       db.message.upsert({
//         where: { numberOfIncident: data.numberOfIncident },
//         update: { ...data },
//         create: { ...data },
//       })
//     );
//   }
//   await db.$transaction(inserts);
// }

// main()
//   .then(async () => {
//     await db.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await db.$disconnect();
//     process.exit(1);
//   });
