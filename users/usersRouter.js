const router = require('express').Router();
const validateToken = require('../auth/validate.js');
const db = require('../database/dbConfig.js');

// READ
router.get('/', validateToken, (req, res) => {
  db('users')
    .then(users => {
      users = users.map(user => {
        return {
          id: user.id,
          username: user.username
        };
      });
      res.status(200).json(users);
    })
    .catch(err =>
      res.status(500).json({
        message: 'Error retrieving users.',
        err: err.message
      })
    );
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await db('users').where({ id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `Could not find user with id ${id}` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Failed to retrieve user.' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await db('users')
      .where('id', '=', id)
      .update(changes);
    if (count) {
      res.status(200).json({ update: count });
    } else {
      res.status(404).json({ message: `Could not find user ${id}` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Failed to modify user info.' });
  }
});


// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db('users')
      .where({ id })
      .del();
    if (count) {
      res
        .status(200)
        .json({ deleted: count, message: `User ${id} has been deleted.` });
    } else {
      res.status(404).json({ message: `Could not find user ${id}` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Failed to delete user!' });
  }
});

module.exports = router;
