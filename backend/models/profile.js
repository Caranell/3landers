const { getDbConnection } = require('../database');

const createUserProfile = async ({ address }) => {
  const Profiles = getDbConnection().collection('Profiles');

  const existingProfile = await Profiles.findOne({
    address,
  });

  if (existingProfile) {
    return existingProfile;
  }

  const profile = await Profiles.insertOne({
    address,
  });

  return profile;
};

const updateProfileInfo = async ({ address, field, value }) => {
  const Profiles = getDbConnection().collection('Profiles');

  const profile = await Profiles.findOne({
    address,
  });

  if (!profile) {
    throw new Error('No info about the user');
  }

  await Profiles.updateOne(
    { address },
    {
      $set: {
        [field]: value,
      },
    },
  );
};

const getProfileInfo = async ({ address }) => {
  const Profiles = getDbConnection().collection('Profiles');

  const profile = await Profiles.findOne({
    address,
  });

  return profile;
};

const isUsernameTaken = async ({ address, username }) => {
  const Profiles = getDbConnection().collection('Profiles');

  const profile = await Profiles.findOne({
    username,
    address: {
      $ne: address,
    },
  });

  return Boolean(profile);
};

const isTwitterHandleTaken = async ({ address, twitterHandle }) => {
  const Profiles = getDbConnection().collection('Profiles');

  const profile = await Profiles.findOne({
    twitterHandle,
    address: {
      $ne: address,
    },
  });

  return Boolean(profile);
};

module.exports = {
  updateProfileInfo,
  getProfileInfo,
  isUsernameTaken,
  isTwitterHandleTaken,
  createUserProfile,
};
