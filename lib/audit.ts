import { prisma } from './prisma';

export async function audit(userId: string, action: string, entityType: string, entityId?: string, payload?: unknown) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entityType,
      entityId,
      payload: payload ? JSON.stringify(payload) : null,
    },
  });
}
