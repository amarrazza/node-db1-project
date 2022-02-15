const router = require('express').Router();
const md = require('./accounts-middleware');
const Accounts = require('./accounts-model');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then(resp => {
      res.json(resp);
    }).catch(next);
})

router.get('/:id', md.checkAccountId, async(req, res, next) => {
// DO YOUR MAGIC
  res.json(req.account);
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
// DO YOUR MAGIC
try {
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
} catch (err){
  next(err);
}
})

router.put('/:id', md.checkAccountId, md.checkAccountPayload, async (req, res, next) => {
// DO YOUR MAGIC
const updated = await Accounts.updateById(req.params.id, req.body)
try {
    res.json(updated);
} catch (err){
  next(err);
}
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
// DO YOUR MAGIC
try {
    await Accounts.deleteById(req.params.id);
    res.json(req.account)
} catch (err){
  next(err);
}
})

router.use((err, req, res, next) => { // eslint-disable-line
// DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
