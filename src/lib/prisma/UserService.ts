import { prisma } from "./prisma";

// get user public profile
export async function getUserProfile(userName: string) {
  return await prisma.user.findUnique({
    where: { username: userName },
    select: {
      image: true,
      displayName: true,
      bio: true,
      username: true,
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  });
}

// Actions user can take on their own profile

// update user locked status
export async function updateLockedStatus(userId: string, lockStatus: boolean) {
  return await prisma.user.update({
    where: { id: userId },
    data: { isLocked: lockStatus },
  });
}
