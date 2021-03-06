import PropTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';
import {
  updateLoggedInUsersFollowing,
  updateFollowedUsersFollowingList,
} from '../../services/firebase';

export default function SuggestedProfile({
  userDocId,
  username,
  profileId,
  userId,
  docId,
}) {
  console.log('userDocId, profileId, userId', userDocId, profileId, userId);
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    try {
      await updateLoggedInUsersFollowing(profileId, docId);
      await updateFollowedUsersFollowingList(userDocId, userId);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpeg`}
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        type="button"
        className="text-xs font-bold text-blue-medium"
        onClick={() => handleFollowUser()}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  userDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
};
