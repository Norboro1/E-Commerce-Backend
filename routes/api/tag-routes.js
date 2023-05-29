const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const data = await Tag.findAll({
    include:[Product]
  });

  res.json(data);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const data = await Tag.findByPk(req.params.id,{
      include:[Product]
    });
    if(!data){
      res.status(404).json({message:'No tag found with this id!'});
      return;
    }
    res.json(data);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const data = await Tag.create(req.body);
    res.json({message: 'Tag successfully created!',data});
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const data = await Tag.update(req.body,{
      where:{
        id:req.params.id
      }
    });
    if(!data[0]){
      res.status(404).json({message:'No tag found with this id!'});
      return;
    }
    const response = await Tag.findByPk(req.params.id);
    res.json({message:'Tag successfully updated!', response});
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const data = await Tag.destroy({
      where:{
        id:req.params.id
      }
    });
    if(!data){
      res.status(404).json({message:'No tag found with this id!'});
      return;
    }
    res.json({message:'Tag successfully deleted!',data});
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
