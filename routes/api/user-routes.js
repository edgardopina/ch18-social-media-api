//! file to set up express user router
const router = require('express').Router();

//! import user-controller functionality and destructure user-controlle into method names
const {
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser,
   deleteALLUser,
} = require('../../controllers/user-controller');

//! set up GET ALL and POST at /api/users
router.route('/')
   .get(getAllUsers)
   .post(createUser);

//! set up GET one, PUT, and DELETE at /api/users/:id
router.route('/:id')
   .get(getUserById)
   .put(updateUser)
   .delete(deleteUser);

   router
   .route('/')
   .delete(deleteALLUser);

module.exports = router;
