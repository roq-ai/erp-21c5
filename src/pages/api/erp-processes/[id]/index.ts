import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { erpProcessValidationSchema } from 'validationSchema/erp-processes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.erp_process
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getErpProcessById();
    case 'PUT':
      return updateErpProcessById();
    case 'DELETE':
      return deleteErpProcessById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getErpProcessById() {
    const data = await prisma.erp_process.findFirst(convertQueryToPrismaUtil(req.query, 'erp_process'));
    return res.status(200).json(data);
  }

  async function updateErpProcessById() {
    await erpProcessValidationSchema.validate(req.body);
    const data = await prisma.erp_process.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteErpProcessById() {
    const data = await prisma.erp_process.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
