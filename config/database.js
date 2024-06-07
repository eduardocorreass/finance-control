module.exports = {
  username: 'finance_prss_user',
  password: 'dR0cZULsawuraYYO5QQV8XIfhMpvJxLN',
  database: 'finance_prss',
  host: 'dpg-cp1urr6n7f5s73f8d4p0-a.ohio-postgres.render.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    connectTimeout: 60000
  }
}