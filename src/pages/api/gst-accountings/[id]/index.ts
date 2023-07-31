import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { gstAccountingValidationSchema } from 'validationSchema/gst-accountings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.gst_accounting
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getGstAccountingById();
    case 'PUT':
      return updateGstAccountingById();
    case 'DELETE':
      return deleteGstAccountingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGstAccountingById() {
    const data = await prisma.gst_accounting.findFirst(convertQueryToPrismaUtil(req.query, 'gst_accounting'));
    return res.status(200).json(data);
  }

  async function updateGstAccountingById() {
    await gstAccountingValidationSchema.validate(req.body);
    const data = await prisma.gst_accounting.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteGstAccountingById() {
    const data = await prisma.gst_accounting.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
