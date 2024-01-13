const User = require('../Models/User')
const bcrypt = require('bcrypt')


exports.Register = (data) => User.create(data)

exports.login = async (email, password) => {

    try {
        console.log('da')
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid email or password');
        }

        const payload = { _id: user._id, email: user.email, username: user.username };
        return payload;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('An unexpected error occurred during login');
    }
};
