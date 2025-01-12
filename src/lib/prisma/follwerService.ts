import { prisma } from "./prisma";
// Remember if its modifying data need to validate inputs

// Follows a user
export async function followUser(followerId: string, followingId: string) {
  // cannot follow yourself
  if (followerId === followingId) {
    throw new Error("Cannot follow yourself");
  }

  // check if followingId exists
  const followerUser = await prisma.user.findUnique({
    where: { id: followerId },
  });

  if (!followerUser) {
    throw new Error("follower user not found");
  }

  // check if the following id exists
  const followUser = await prisma.user.findUnique({
    where: { id: followingId },
  });

  if (!followUser) {
    throw new Error("following user not found");
  }

  // check if the user is already following the user
  const isFollowing = await prisma.follower.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  if (isFollowing) {
    throw new Error("Already following user");
  }

  // create the follow
  return await prisma.follower.create({
    data: {
      followerId,
      followingId,
    },
  });
}

// Unfollows a user
export async function unfollowUser(followerId: string, followingId: string) {
  // cannot follow yourself
  if (followerId === followingId) {
    throw new Error("Cannot unfollow yourself");
  }

  // check if followingId exists
  const followerUser = await prisma.user.findUnique({
    where: { id: followerId },
  });

  if (!followerUser) {
    throw new Error("follower user not found");
  }

  // check if the following id exists
  const followUser = await prisma.user.findUnique({
    where: { id: followingId },
  });

  if (!followUser) {
    throw new Error("following user not found");
  }

  // check if the user is already following the user
  const isFollowing = await prisma.follower.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  if (!isFollowing) {
    throw new Error("Not following user");
  }

  return await prisma.follower.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
}

// Get all followers for a user
export async function getFollowers(userId: string) {
  // check if followingId exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.follower.findMany({
    where: { followingId: userId },
    include: { follower: true },
  });
}

// Get all users a user is following
export async function getFollowing(userId: string) {
  // check if followingId exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("user not found");
  }

  await prisma.follower.findMany({
    where: { followerId: userId },
    include: { following: true },
  });
}

// Check if a user is following another user
export async function isFollowing(followerId: string, followingId: string) {
  // i dont think we need to check if the users exist
  // since it will just return false if the user is not following the other user

  const follow = await prisma.follower.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
  return follow !== null;
}

// Retrieve a list of users who are mutual followers of two users.
export async function getMutualFollowers(userId: string, userId2: string) {
  return await prisma.follower.findMany({
    where: {
      AND: [{ followerId: userId }, { followingId: userId2 }],
    },
    include: { follower: true },
  });
}

export async function getFollowersCount(userId: string) {
  return await prisma.follower.count({
    where: { followingId: userId },
  });
}

export async function getFollowingCount(userId: string) {
  return await prisma.follower.count({
    where: { followerId: userId },
  });
}

// Recommend users who are followed by people the user is already following. This gives a "friends of friends" effect.
export async function getMutualConnections(userId: string, limit: number = 10) {
  return await prisma.user.findMany({
    where: {
      id: {
        in: (
          await prisma.follower.findMany({
            where: {
              followerId: {
                in: (
                  await prisma.follower.findMany({
                    where: { followerId: userId },
                    select: { followingId: true },
                  })
                ).map((f) => f.followingId),
              },
            },
            select: { followingId: true },
          })
        ).map((f) => f.followingId),
      },
      NOT: { id: userId }, // Exclude the user themselves
    },
    take: limit,
  });
}

// Recommend users with a high number of followers, excluding those the user already follows.
export async function getPopularUsers(userId: string, limit: number = 10) {
  return await prisma.user.findMany({
    where: {
      id: {
        notIn: (
          await prisma.follower.findMany({
            where: { followerId: userId },
            select: { followingId: true },
          })
        ).map((f) => f.followingId),
      },
      NOT: { id: userId },
    },
    orderBy: {
      followers: { _count: "desc" }, // Sort by the number of followers
    },
    take: limit,
  });
}

export async function getSuggestedUsers(userId: string, limit: number = 10) {
  const mutualConnections = await getMutualConnections(userId, limit / 2);
  const popularUsers = await getPopularUsers(userId, limit / 2);

  // Remove duplicates and limit results
  const allSuggestions = [...mutualConnections, ...popularUsers].filter(
    (value, index, self) => self.findIndex((u) => u.id === value.id) === index // Unique users
  );

  return allSuggestions.slice(0, limit);
}

// TODO: Implement these functions
// export async function blockUser(userId: string, blockedUserId: string) {}
// export async function unblockUser(userId: string, blockedUserId: string) {}
