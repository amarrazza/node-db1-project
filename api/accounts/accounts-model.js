const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  //select * from accounts
  return db('accounts');
}

const getById = id => {
  //select * FROM accounts WHERE id = 1;
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first()
}

const create = async account => {
  //INSERT INTO accounts (name, budget) VALUES ('foo, 1000');
  const [id] = await db('accounts').insert(account)
  return getById(id);
}

const updateById = async(id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update(account)
  return getById(id);
}

const deleteById = id => {
  //delete from accounts where id = 1;
  return db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
