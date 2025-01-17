import { prisma } from "./prisma";
import { CommissionStatus } from "@prisma/client";

// Create a new commission request
export async function createCommissionRequest(data: {
  commissionTypeId: string;
  commissionerId: string;
  clientId: string;
  details: string;
  estPrice?: number;
}) {
  return await prisma.commissionRequest.create({
    data: {
      commissionType: {
        connect: {
          id: data.commissionTypeId,
        },
      },
      commissioner: {
        connect: {
          id: data.commissionerId,
        },
      },
      client: {
        connect: {
          id: data.clientId,
        },
      },
      estPrice: data.estPrice,
      details: data.details,
    },
  });
}

// as a commissioner, get a commission request by id
export async function getCommissionRequestById_commissioner(
  requestId: string,
  commissionerId: string
) {
  return await prisma.commissionRequest.findUnique({
    where: {
      id: requestId,
      commissionerId,
    },
  });
}

// as a client, get a commission request by id
export async function getCommissionRequestId_client(
  requestId: string,
  clientId: string
) {
  return await prisma.commissionRequest.findUnique({
    where: {
      id: requestId,
      clientId,
    },
  });
}

// as a commissioner, get all commission requests by a given client id
export async function getCommissionRequestsByClient(
  clientId: string,
  userId: string,
  status?: CommissionStatus
) {
  return await prisma.commissionRequest.findMany({
    where: {
      clientId,
      commissionerId: userId,
      status,
    },
  });
}

// as a client, get all commission requests by a given commissioner id
export async function getCommissionRequestsByCommissioner(
  commissionerId: string,
  userId: string,
  status?: CommissionStatus
) {
  return await prisma.commissionRequest.findMany({
    where: {
      commissionerId,
      clientId: userId,
      status,
    },
  });
}

// as a commissioner, get all commission requests
export async function getAllCommissionRequestsByCommissioner(
  commissionerId: string,
  status?: CommissionStatus
) {
  return await prisma.commissionRequest.findMany({
    where: {
      commissionerId,
      status,
    },
  });
}

// as a client, get all commission requests
export async function getAllCommissionRequestsByClient(
  clientId: string,
  status?: CommissionStatus
) {
  return await prisma.commissionRequest.findMany({
    where: {
      clientId,
      status,
    },
  });
}

// as a commissioner, update a commission request
export async function updateCommissionRequestStatus_commissioner(
  requestId: string,
  commissionerId: string,
  data: {
    estPrice?: number;
    status?: CommissionStatus;
  }
) {
  return await prisma.commissionRequest.update({
    where: {
      id: requestId,
      commissionerId,
    },
    data: {
      estPrice: data.estPrice,
      status: data.status,
    },
  });
}
