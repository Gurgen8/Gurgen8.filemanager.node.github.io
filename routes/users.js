import express from "express";

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('users');
});

router.get('/settings', function(req, res, next) {
  res.send('settings');
});

export default router;
