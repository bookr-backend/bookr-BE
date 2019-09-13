const db = require('../database/dbConfig.js');
const Users = require('./usersModel.js');

describe('usersModel.js', () => {
  describe('add', () => {
    afterEach(async () => {
      await db('users').truncate();
    });
    it('Should insert new user', async () => {
      await Users.add({ username: 'bookworm123', password: '123' });
      await Users.add({ username: 'mikeReadsAlot', password: 'abc' });
      await Users.add({ username: 'joan', password: '321' });
      const users = await db('users');
      expect(users).toHaveLength(3);
      expect(users[0].username).toBe('bookworm123');
    });
    it('Should return new user on insert', async () => {
      const user = await Users.add({
        username: 'bookworm123',
        password: '123'
      });

      expect(user).toEqual({ id: 1, username: 'bookworm123', password: '123' });
    });
  });

  describe('find', () => {
    afterEach(async () => {
      await db('users').truncate();
    });
    it('Should return all users', async () => {
      await Users.add({ username: 'bookworm123', password: '123' });
      await Users.add({ username: 'mikeReadsAlot', password: 'abc' });
      await Users.add({ username: 'joan', password: '321' });
      const users = await Users.find();
      expect(users).toHaveLength(3);
    });
  });
});
