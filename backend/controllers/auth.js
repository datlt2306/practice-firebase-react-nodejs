import User from '../models/user';

export const createOrUpdateUser = async (req, res) => {
    const { email, name, picture } = req.user;

    const user = await User.findOneAndUpdate({ email }, { email, name, picture }, { returnNewDocument: true });
    if (user) {
        res.json(user)
    } else {
        const newUser = await new User({
            email,
            name,
            picture
        }).save()
        res.json(newUser);
    }
}
export const currentUser = (req, res) => {
    const { email } = req.user;
    User.findOne({ email }).exec((err, user) => {
        if (err) throw new Error(err)
        res.json(user)
    });
}