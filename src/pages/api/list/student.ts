import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type DataProps = {
  id: string;
}

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const studentData: DataProps = req.body;

  const student = await prisma.student.findUnique({
    where: {
      id: studentData.id,
    }
  })

  return res.json(student);
}