import User from '../models/User';

class UserController {
  async store(req, res) {
    // check if user exists to validate field uniqueness
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, email, name, provider } = await User.create(req.body);

    return res.json({ id, email, name, provider });
  }

  async update(req, res) {
    // req.userId now available from auth middleware

    return res.json({ ok: true });
  }
}

export default new UserController();
