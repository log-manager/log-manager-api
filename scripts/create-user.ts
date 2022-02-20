import { prompt } from 'enquirer';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

export async function createUser(): Promise<void> {
  const response = await prompt<any>([
    {
      type: 'input',
      name: 'email',
      message: 'Email address',
    },
    {
      type: 'input',
      name: 'password',
      message: 'Password',
    },
  ]);

  try {
    await prisma.user.create({
      data: {
        email: response.email,
        password: hashSync(response.password, 10),
        logTypes: '{}',
      },
    });
  } catch (e) {
    console.log('Failed creating user ', e.message);
  }
}


createUser()
