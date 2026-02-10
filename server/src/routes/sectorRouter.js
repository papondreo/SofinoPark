/* eslint-disable no-console */
const { Router } = require('express');
const { Sector } = require('../../db/models');

const sectorRouter = Router();

sectorRouter.get('/', async (req, res) => {
  try {
    const sectors = await Sector.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(sectors);
  } catch (error) {
    console.log('Ошибка получения всех секторов', error);
    res.status(500).json({ message: 'Ошибка получения всех секторов' });
  }
});
sectorRouter.put('/:id', async (req, res) => {
  try {
    const [updated] = await Sector.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSector = await Sector.findByPk(req.params.id);
      res.status(200).json(updatedSector);
    } else {
      res.status(404).json({ message: 'Участок не найден' });
    }
  } catch (error) {
    console.log('Ошибка обновления участка по id', error);
    res.status(500).json({ message: 'Ошибка обновления участка по id' });
  }
});

module.exports = sectorRouter;
