var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {
      "id": "1",
      "username": "CaydeHunter",
      "password": "123456",
    },
    {
      "id": "2",
      "username": "ZavalaTitan",
      "password": "654321",
    },
    {
      "id": "3",
      "username": "IkoraWarlock",
      "password": "password",
    },
  ])
});

module.exports = router;
