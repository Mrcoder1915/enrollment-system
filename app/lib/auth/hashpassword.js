import bcrypt from 'bcryptjs';


const HashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt)
}

export default HashPassword;