import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type DataProps = {
  name: string;
  cpf: string;
  phone: string;
}

const prisma = new PrismaClient();


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const studentData: DataProps = req.body;

  
  
  const getAlreadyExists = await prisma.student.findMany({
    where: {
      cpf: studentData.cpf,
    }
  })

  if (getAlreadyExists.length > 0) {
    return res.json(getAlreadyExists[0]);
  }

  const savedStudent = await prisma.student.create({
    data: {
      cpf: studentData.cpf,
      phone: studentData.phone,
      name: studentData.name,
    },
  })

  await prisma.student.update({
    where: {
      id: savedStudent.id
    },
    data: {
      link: `${process.env.URL}/invite/${savedStudent.id}`
    }
  })

  return res.json(savedStudent);
}