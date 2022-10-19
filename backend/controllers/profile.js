const { Router } = require('express');
const { getDbConnection } = require('../database');
const { isUserAuthenticated } = require('../middleware/auth');
const { updateProfileInfo, getProfileInfo } = require('../models/profile');

const router = Router();
const db = getDbConnection();
const Profiles = db.collection('Profiles');

router.get('/:address', async (req, res) => {
  const { address } = req.params;

  const profile = getProfileInfo({ address });

  res.status(200).send(profile);
});

router.post('/twitterHandle', isUserAuthenticated, async (req, res) => {
  const { twitterHandle, address } = req.body;

  const isAlreadyTaken = await Profiles.findOne({
    twitterHandle,
  });

  if (isAlreadyTaken) {
    return res.status(400).send({
      error: 'Specified twitter handle is already taken',
    });
  }

  await updateProfileInfo({
    address,
    field: 'twitterHandle',
    value: twitterHandle,
  });

  return res.sendStatus(200);
});

router.post('/username', isUserAuthenticated, async (req, res) => {
  const { username, address } = req.body;

  const isAlreadyTaken = await Profiles.findOne({
    username,
  });

  if (isAlreadyTaken) {
    return res.status(400).send({
      error: 'Specified username is already taken',
    });
  }

  await updateProfileInfo({
    address,
    field: 'username',
    value: username,
  });

  return res.sendStatus(200);
});

router.post('/auth', async (req, res) => {});

module.exports = router;
