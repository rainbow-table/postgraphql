const Sequelize = require('sequelize');
const _ = require('lodash');
const Faker = require('faker');

//defining connection
const Conn = new Sequelize(
  process.env.DATABASE_DB,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST
  }
);

//creating table schemas
const Volunteer = Conn.define('volunteer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  profile_img: {
    type: Sequelize.STRING,
    allowNull: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  token: {
    type: Sequelize.STRING,
    allowNull: true
  },
  facebook_id: {
    type: Sequelize.STRING,
    allowNull: true
  },
  google_id: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Badges = Conn.define('badge', {
  name: {
    type: Sequelize.STRING
  }
});

const Ngo = Conn.define('ngo', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  profile_img: {
    type: Sequelize.STRING,
    allowNull: true
  },
  background_img: {
    type: Sequelize.STRING,
    allowNull: true
  },
  EIN: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  token: {
    type: Sequelize.STRING,
    allowNull: true
  },
  facebook_id: {
    type: Sequelize.STRING,
    allowNull: true
  },
  google_id: {
    type: Sequelize.STRING,
    allowNull: true
  },
  ngo_address: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Event = Conn.define('event', {
  event_start: {
    type: Sequelize.DATE,
    allowNul: false
  },
  event_end: {
    type: Sequelize.DATE,
    allowNul: false
  },
  ngo_id: {
    type: Sequelize.INTEGER,
    allowNul: false
  },
  description: {
    type: Sequelize.STRING,
    allowNul: false
  },
  event_address: {
    type: Sequelize.STRING,
    allowNul: true
  }
});

const Schedule = Conn.define('schedule', {
  event_id: {
    type: Sequelize.INTEGER,
    allowNul: false
  },
  volunteer_id: {
    type: Sequelize.INTEGER,
    allowNul: false
  },
  volunteer_start: {
    type: Sequelize.DATE,
    allowNul: false
  },
  volunteer_end: {
    type: Sequelize.DATE,
    allowNul: false
  }
});


//creating relationships between tables
Volunteer.belongsToMany(Badges, {through: 'badges_volunteer'});
Badges.belongsToMany(Volunteer, {through: 'badges_volunteer'});

Ngo.hasMany(Event, {foreignKey: 'ngo_id'});

Schedule.hasOne(Event);
Schedule.hasOne(Volunteer);


//start connection
Conn.sync({force: true})
 .then(() => {
   Ngo.create({
     name: 'Super fake NGO',
     description: Faker.company.catchPhrase(),
     profile_img: Faker.image.imageUrl(),
     EIN: 123456789,
     ngo_address: `${Faker.address.streetAddress()}, new orleans, la`,
   }).then(() => {
     _.times(5, () => {
     return Volunteer.create({
       name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
       description: Faker.company.catchPhrase(),
       profile_img: Faker.image.imageUrl(),
     }).then(() => {
      let date = Faker.date.between('2017-07-01', '2017-08-01');
      let time = 8;
     Event.create({
       event_start: date,
       event_end: date,
       ngo_id: 1,
       description: Faker.company.catchPhrase(),
       event_address: `${Faker.address.streetAddress()}, new orleans, la`,
     });
   });
   });
   }
 )
 });

module.exports = Conn;