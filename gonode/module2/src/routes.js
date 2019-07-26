import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Paulo Filho',
    email: 'pcf.feat@gmail.com',
    password_hash: '12323213994',
  });

  res.json(user);
});

export default routes;
