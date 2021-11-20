//! file to set up express Pizza router
const router = require('express').Router();

//! import pizza-controller functionality and destructure pizza-controlle into method names
const {
   getAllPizza,
   getPizzaById,
   createPizza,
   updatePizza,
   deletePizza,
   deleteALLPizza,
} = require('../../controllers/pizza-controller');

//! set up GET ALL and POST at /api/pizzas
//* the following syntax (2 first lines) are equivalentes with the third line
//* router.get('/', getCallbackFunction);
//* router.post('/', postCallbackFunction);
//* router.route('/').get(getCallbackFunction).post(postCallbackFunction);
router.route('/')
   .get(getAllPizza)
   .post(createPizza);

//! set up GET one, PUT, and DELETE at /api/pizzas/:id
router.route('/:id')
   .get(getPizzaById)
   .put(updatePizza)
   .delete(deletePizza);

   router
   .route('/')
   .delete(deleteALLPizza);

module.exports = router;
