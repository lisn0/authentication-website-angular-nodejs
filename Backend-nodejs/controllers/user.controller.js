const { User } = require("../models/user.model");

module.exports = {

    createUser: async (req, res) => {
        try{
            const user = new User(req.body);

            await user.save();
            res.json("/users/list");
        } catch{
            console.log(err);
        }
    },

    showUsers: async (req, res) => {
        try{
            const users = await User.find();
            res.send(users);
        } catch {
            console.log(err);
        }

    },

    showOneUser: async (req, res) => {
        const user = await User.findById(req.params.id);
        res.send(user);
    },

    deleteUser: async (req,res)=>{
        const { id } = req.params;
        await User.remove({ _id: id });
        res.json('user deleted');
    },

    updateUser : async (req, res) => {
        const user = await User.findById(req.params.id);
        console.log(req.body)
        console.log(req.body)
        user.firstName = req.body.firstName || user.firstName;;
        user.lastName = req.body.lastName || user.lastName;;
        user.email = req.body.email || user.email;;
        user.address = req.body.address || user.address;;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;;
        await user.save();
        res.json("user updaded ")
    },

    showOneUserByUsername: async (req, res) => {
        const account = await User.findOne({username: req.params.username});
        res.send(account);
    },

    getUserByEmail:  (email) => {
        const user = User.findOne({email: email});
        return user;
    },
    getUserByResetToken: async (resetToken) => {
        const user = await User.findOne({resetPasswordToken: resetToken});
        return user;
    },

    BlockUser : async (req, res) => {
        const user = await User.findById(req.params.id);
        user.blocked = true;
        await user.save();
        res.json({blocked: user.blocked})
    },

    deblockUser : async (req, res) => {
        const user = await User.findById(req.params.id);
        user.blocked = false;
        await user.save();
        res.json({blocked: user.blocked})
    },

    updateUserByUsername : async (req, res) => {
        const user = await User.findOne({username: req.params.username});
        user.firstName = req.body.firstName || user.firstName;;
        user.lastName = req.body.lastName || user.lastName;;
        user.email = req.body.email || user.email;;
        user.address = req.body.address || user.address;;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;;
        await user.save();
        res.json("user updaded ")
    },

    updateProfile : async (username, newData, file) => {
        const user = await User.findOne({username: username});
        user.firstName = newData.firstName;
        user.lastName = newData.lastName;
        user.adress = newData.adress;
        user.img = file;
        await user.save();
        res.json("profile updaded ")
    },

    updateUserTokens : async (username, newUser) => {
        const user = await User.findOne({username: username});
        user.resetPasswordToken = newUser.resetPasswordToken;
        user.resetPasswordExpires = newUser.resetPasswordExpires;
        await user.save();
    },

    deleteResetTokens : async (data) => {
        const user = await User.findOne({username: data.username});
        delete user.resetPasswordToken;
        delete user.resetPasswordExpires;

        await user.save();

    }


}
