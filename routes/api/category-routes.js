const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const data = await Category.findAll({
    include:[Product]
  });

  res.json(data);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const data = await Category.findByPk(req.params.id,{
      include:[Product]
    });
  
    res.json(data);
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    const data = await Category.create(req.body);
    res.json({msg: "Category successfully created!",data});
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    await Category.update(req.body,{
      where:{
        id:req.params.id
      }
    });
    const data = await Category.findByPk(req.params.id);
    res.json({msg: "Category successfully updated!",data});
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const data = await Category.destroy({
      where:{
        id:req.params.id
      }
    });
    if(!data){
      res.status(404).json({msg: "Category not found!"});
      return;
    }
    res.json({msg: "Category successfully deleted!"});
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
