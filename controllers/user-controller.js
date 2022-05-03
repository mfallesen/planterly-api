const { User } = require("../models");

const userController = {
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
      if (!req.body.password) {
        res.status(401).send("Please Include a Password");
      }
      // console.log(userInfo);
      userInfo.passwordVerify(req.body.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          // console.log(req.body);
          res.cookie(userInfo.username, userInfo._id);
          res.status(200).send("User Found and logged in!");
        }
      });
    });
  },
  // update a user
  // +++++NOT IMPLEMENTED
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
  // delete user
  // +++++NOT IMPLEMENTED
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
