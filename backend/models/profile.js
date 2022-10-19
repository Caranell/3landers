const { getDbConnection } = require('../database');

const db = getDbConnection();
const Profiles = db.collection('Profiles');

const updateProfileInfo = async ({ address, field, value }) => {
  const profile = await Profiles.findOne({
    address,
  });

  if (!profile) {
    throw new Error('No info about the user');
  }

  await Profiles.updateOne({ address }, {
    $set: {
      [field]: value,
    },
  });
};

const getProfileInfo = async ({ address }) => {
  const profile = await Profiles.findOne({
    address,
  });

  return profile;
};

module.exports = {
  updateProfileInfo,
  getProfileInfo,
};
