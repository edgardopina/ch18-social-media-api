//! file to set up express user router
const router = require('express').Router();

//* import user-controller functionality and destructure user-controll into its method names
const {
   getAllUsers,
   getUserById,
   createUser,
   updateUserById,
   deleteUserById,
   deleteALLUser,
   addFriendToUser,
   removeFriendFromUser,
} = require('../../controllers/user-controller');

//* process requests to /api/users route
router.route('/')
   .get(getAllUsers)
   .post(createUser)
   .delete(deleteALLUser);

//* preocess requests to /api/users/:userId route
router.route('/:userId')
   .get(getUserById)
   .put(updateUserById)
   .delete(deleteUserById);


//* process requests to /api/users/:userId/friends/:friendId route
router.route('/:userId/friends/:friendId')
   .put(addFriendToUser)
   .delete(removeFriendFromUser);

module.exports = router;
