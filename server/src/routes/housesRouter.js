const { Router } = require('express');
const { House } = require('../../db/models');
const housesRouter = Router();

housesRouter.get('/', async (req, res) => {
  try {
    const houses = await House.findAll({
      order: [['id', 'ASC']],
    });
    res.status(200).json(houses);
  } catch (error) {
    console.log('Ошибка получения всех домов', error);
    res.status(500).json({ message: 'Ошибка получения всех домов' });
  }
});

housesRouter.post('/', async (req, res) => {
  try {
    const { name, cost, area } = req.body;
    const house = await House.create({ name, cost, area });
    res.status(200).json(house);
  } catch (error) {
    console.log('Ошибка создания дома', error);
    res.status(500).json({ message: 'Ошибка создания дома' });
  }
});

housesRouter
  .get('/:id', async (req, res) => {
    try {
      const house = await House.findByPk(req.params.id);
      res.status(200).json(house);
    } catch (error) {
      console.log('Ошибка получения дома по id', error);
      res.status(500).json({ message: 'Ошибка получения дома по id' });
    }
  })
  .put('/:id', async (req, res) => {
    try {
      const [updated] = await House.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedHouse = await House.findByPk(req.params.id);
        res.status(200).json(updatedHouse);
      } else {
        res.status(404).json({ message: 'Дом не найден' });
      }
    } catch (error) {
      console.log('Ошибка обновления дома по id', error);
      res.status(500).json({ message: 'Ошибка обновления дома по id' });
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const house = await House.destroy({ where: { id: req.params.id } });
      res.status(200).json(house);
    } catch (error) {
      console.log('Ошибка удаления дома по id', error);
      res.status(500).json({ message: 'Ошибка удаления дома по id' });
    }
  });

module.exports = housesRouter;
