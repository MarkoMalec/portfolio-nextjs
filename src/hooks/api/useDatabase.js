import { PrismaClient } from "@prisma/client";
import { useQuery } from 'react-query';

const prisma = new PrismaClient();

export async function fetchData(tableName) {
  try {
    const data = await prisma[tableName].findMany();
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
}

export function useDatabase(tableName) {
  return useQuery(tableName, async () => {
    return fetchData(tableName);
  });
}
