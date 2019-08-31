import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true }, // clause
      attributes: ['id', 'name', 'email', 'avatar_id'], // pull specific fields
      include: [
        // $include associates foreign tables
        {
          model: File, // table
          as: 'avatar', // alias
          attributes: ['name', 'path', 'url'], // fields
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
