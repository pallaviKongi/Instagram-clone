import { firebase, FieldValue } from '../lib/firebase';

export const doesUsernameExists = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs?.length > 0;
};

export const getUserObjByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
};

export const getUserProfiles = async (userId, following) => {
  const query = firebase.firestore().collection('users');
  const result = await query.limit(10).get();
  const users = result.docs
    .map((item) => ({
      ...item.data(),
      docId: item.id,
    }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
  return users;
};

export const updateLoggedInUsersFollowing = async (
  followedUserId, // Followed user's userId in users collection
  loggedInUserId // Doc ID of the logged In user
) => {
  firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserId)
    .update({
      following: FieldValue.arrayUnion(followedUserId),
    });
};

export const updateFollowedUsersFollowingList = async (
  userId, // Doc Id of the user who's following list needs to be updated
  loggedInUserId // Logged In users userId in users collection
) => {
  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .update({
      followers: FieldValue.arrayUnion(loggedInUserId),
    });
};
