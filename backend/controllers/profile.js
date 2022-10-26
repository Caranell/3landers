const { Router } = require('express');
const { isUserAuthenticated } = require('../middleware/auth');
const {
  updateProfileInfo,
  getProfileInfo,
  isUsernameTaken,
  isTwitterHandleTaken,
} = require('../models/profile');

const router = Router();

router.get('/', async (req, res) => {
  const { address } = req.session.siwe;

  const profile = getProfileInfo({ address });

  res.status(200).send(profile);
});

router.post('/twitterHandle', isUserAuthenticated, async (req, res) => {
  const { twitterHandle } = req.body;
  const { address } = req.session.siwe;

  const isAlreadyTaken = await isTwitterHandleTaken({ address, twitterHandle });

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
  const { username } = req.body;
  const { address } = req.session.siwe;

  const isAlreadyTaken = await isUsernameTaken({ address, username });

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

module.exports = router;
