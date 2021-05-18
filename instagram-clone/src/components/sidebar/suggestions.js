import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react/cjs/react.development';
import { getUserProfiles } from '../../services/firebase';
import SuggestedProfile from './suggestedProfile';

export default function Suggestions({ userId, following, docId }) {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const getSuggestedProfiles = async () => {
      const users = await getUserProfiles(userId, following);
      setProfiles(users);
    };
    if (userId) {
      getSuggestedProfiles();
    }
  }, [userId]);
  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            userDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            docId={docId}
          />
        ))}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  docId: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  following: PropTypes.array,
};

Suggestions.defaultProps = {
  userId: '',
  docId: '',
  following: [],
};
