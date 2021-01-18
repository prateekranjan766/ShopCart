import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('password123456', 10),
    isAdmin: true,
  },
  {
    name: 'Jill Jhonson',
    email: 'jill@example.com',
    password: bcrypt.hashSync('password123456', 10),
  },
  {
    name: 'Sam Smith',
    email: 'sam@example.com',
    password: bcrypt.hashSync('password123456', 10),
  },
];

export default users;
