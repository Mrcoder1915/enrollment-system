import bcrypt from 'bcryptjs';

const verifyPassword = (password,hashpasword) => {
    return bcrypt.compareSync(password,hashpasword);
}

export default verifyPassword;