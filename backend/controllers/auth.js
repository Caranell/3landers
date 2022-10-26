const { Router } = require('express');
const { generateNonce, SiweMessage } = require('siwe');
const { createUserProfile } = require('../models/profile');

const router = Router();

router.get('/nonce', async (req, res) => {
  req.session.nonce = generateNonce();
  await req.session.save();
  res.setHeader('Content-Type', 'text/plain');

  res.send(req.session.nonce);
});

router.post('/verify', async (req, res) => {
  try {
    const { message, signature } = req.body;
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.validate(signature);

    if (fields.nonce !== req.session.nonce) {
      return res.status(422).json({ message: 'Invalid nonce.' });
    }

    req.session.siwe = fields;
    await req.session.save();
    await createUserProfile({ address: fields.address });

    return res.status(200).json({ ok: true });
  } catch (_error) {
    return res.status(400).json({ ok: false });
  }
});

router.get('/session', async (req, res) => {
  res.send({ address: req.session.siwe?.address });
});

router.post('/sign-out', async (req, res) => {
  req.session.destroy();

  res.sendStatus(200);
});

module.exports = router;
