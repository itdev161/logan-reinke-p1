var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {
      "id": "1",
      "username": "CaydeHunter",
    },
    {
      "id": "2",
      "username": "ZavalaTitan",
    },
    {
      "id": "3",
      "username": "IkoraWarlock",
    },
  ])
});

module.exports = router;
