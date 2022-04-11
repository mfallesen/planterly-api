const { User, Thought } = require("../models");

const userController = {
  // get all users
  // getUsers(req, res) {
  //   User.find()
  //     .select('-__v')
  //     .then((dbUserData) => {
  //       res.json(dbUserData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },
  // get single user by id
  // getSingleUser(req, res) {
  //   User.findOne({ _id: req.params.userId })
  //     .select('-__v')
  //     .populate('friends')
  //     .populate('thoughts')
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         return res.status(404).json({ message: 'No user with this id!' });
  //       }
  //       res.json(dbUserData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // log in user
  loginUser(req, res) {
    User.findOne({ username: req.body.username }).then((userInfo) => {
      console.log("++++++");
      console.log(userInfo);
      console.log("++++++");
      if (!req.body.password) {
        res.status(401).send("Please Include a Password");
      }

      userInfo.passwordVerify(req.body.password, function (err, isMatch) {
        // console.log(userInfo);
        if (err) throw err;
        console.log(userInfo.password, isMatch);
        if (isMatch) res.status(200).send("user logged in");
      });
    });
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete user (BONUS: and delete associated thoughts)
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }

        // BONUS: get ids of user's `thoughts` and delete them all
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add friend to friend list
  // addFriend(req, res) {
  //   User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         return res.status(404).json({ message: 'No user with this id!' });
  //       }
  //       res.json(dbUserData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },
  // remove friend from friend list
  // removeFriend(req, res) {
  //   User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         return res.status(404).json({ message: 'No user with this id!' });
  //       }
  //       res.json(dbUserData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },
};

module.exports = userController;
