const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLNonNull = graphql.GraphQLNonNull;

const db = require('./db');

//describe what graphql expects tables to looklike
const Volunteer = new GraphQLObjectType({
  name: 'Volunteer',
  description: 'This describes a volunteer',
  fields: () => {
     return {
      id:  {
        type: GraphQLInt,
        resolve(Volunteer) {
          return Volunteer.id;
        }
      },
      name:  {
        type: GraphQLString,
        resolve(Volunteer) {
          return Volunteer.name;
        }
      },
      description:  {
        type: GraphQLString,
        resolve(Volunteer) {
          return Volunteer.description;
        }
      },
      profile_img:  {
        type: GraphQLString,
        resolve(Volunteer) {
          return Volunteer.profile_img;
        }
      },
      username: {
        type: GraphQLString,
        resolve(Volunteer) {
          return Volunteer.token;
        }
      },
      email: {
        type: GraphQLString,
        resolve(Volunteer) {
          return Volunteer.token;
        }
      },
      token: {
        type: GraphQLString,
        resolve(Volunteer) {
          return Volunteer.token;
        }
      }
    };
  }
});

const Badges = new GraphQLObjectType({
  name: 'Badges',
  description: 'A description of badges',
  fields: () => {  
  return  {
    id: {
      type: GraphQLInt,
      resolve(Badges) {
        return Badges.id;
      }
    },    
  name: {
        type: GraphQLString,
        resolve(Badges) {
          return Badges.name;
        }
      }
  };
  }
});

const Ngo = new GraphQLObjectType({
  name: 'Ngo',
  description: 'This describes an NGO',
  fields: () => {
     return {
      id:  {
        type: GraphQLInt,
        resolve(Ngo) {
          return Ngo.id;
        }
      },
      name:  {
        type: GraphQLString,
        resolve(Ngo) {
          return Ngo.name;
        }
      },
      description:  {
        type: GraphQLString,
        resolve(Ngo) {
          return Ngo.description;
        }
      },
      profile_img:  {
        type: GraphQLString,
        resolve(Ngo) {
          return Ngo.profile_img;
        }
      },
      background_img:  {
        type: GraphQLString,
        resolve(Ngo) {
          return Ngo.background_img;
        }
      },
      EIN:  {
        type: GraphQLInt,
        resolve(EIN) {
          return Ngo.EIN;
        }
      },
      username: {
        type: GraphQLString,
        resolve(Volunteer) {
          return Volunteer.token;
        }
      },
      email: {
        type: GraphQLString,
        resolve(Volunteer) {
          return Volunteer.token;
        }
      },
      token: {
        type: GraphQLString,
        resolve(Volunteer) {
          return Volunteer.token;
        }
      }      
    };
  }
});

const badgesVolunteer = new GraphQLObjectType({
  name: 'badgesVolunteer',
  description: 'A join table between badges and volunteers',
  fields: () => {  
    return {
      volunteerId: {
        type: GraphQLInt,
        resolve(badgesVolunteer) {
          return badgesVolunteer.volunteerId;
        }
      },
      badgeId: {
        type: GraphQLString,
        resolve(badgesVolunteer) {
          return badgesVolunteer.badgeId;
        }
      }
    };
  }
});

const Schedule = new GraphQLObjectType({
  name: 'Schedule',
  description: 'This describes a Schedule',
  fields: () => {
     return {
      id:  {
        type: GraphQLInt,
        resolve(Schedule) {
          return Schedule.id;
        }
      },
      event_id:  {
        type: GraphQLInt,
        resolve(Schedule) {
          return Schedule.event_id;
        }
      },
      volunteer_id:  {
        type: GraphQLInt,
        resolve(Schedule) {
          return Schedule.volunteer_id;
        }
      },
      volunteer_start:  {
        type: GraphQLString,
        resolve(Schedule) {
          return Schedule.volunteer_start;
        }
      },
      volunteer_end:  {
        type: GraphQLString,
        resolve(Schedule) {
          return Schedule.volunteer_end;
        }
      }
    };
  }
});

const Event = new GraphQLObjectType({
  name: 'Event',
  description: 'This describes a Event',
  fields: () => {
     return {
      id:  {
        type: GraphQLInt,
        resolve(Event) {
          return Event.id;
        }
      },
      ngo_id:  {
        type: GraphQLInt,
        resolve(Event) {
          return Event.ngo_id;
        }
      },
      description:  {
        type: GraphQLString,
        resolve(Event) {
          return Event.description;
        }
      },
      event_start:  {
        type: GraphQLString,
        resolve(Event) {
          return Event.event_start;
        }
      },
      event_end:  {
        type: GraphQLString,
        resolve(Event) {
          return Event.event_end;
        }
      }
    };
  }
});



//describe queries
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'returns volunteers',
  fields: () => {
    return {
      volunteers: {
        type: new GraphQLList(Volunteer),
        args: {
          id: {type: new GraphQLList(GraphQLInt), default: 1},
          name: {type: new GraphQLList(GraphQLString)},
          username: {type: new GraphQLList(GraphQLString)},
          email: {type: new GraphQLList(GraphQLString)},
          token: {type: new GraphQLList(GraphQLString)},
        },
        resolve(root, args) {
          return db.models.volunteer.findAll({where: args});
        }
      },
      badges: {
        type: new GraphQLList(Badges),
        resolve(root, args) {
          return db.models.badges.findAll({where: args});
        }
      },
      ngo: {
        type: new GraphQLList(Ngo),
        args: {
          id: {type: new GraphQLList(GraphQLInt)},
          name: {type: new GraphQLList(GraphQLString)},
          username: {type: new GraphQLList(GraphQLString)},
          email: {type: new GraphQLList(GraphQLString)},
          token: {type: new GraphQLList(GraphQLString)},
          EIN: {type: new GraphQLList(GraphQLString)},       
        },        
        resolve(root, args) {
          return db.models.ngo.findAll({where: args});
        }
      },
      event: {
        type: new GraphQLList(Event),
        args: {
          ngo_id: {type: new GraphQLList(GraphQLInt)}
        },
        resolve(root, args) {
          return db.models.event.findAll({where: args});
        }
      },
      schedule: {
        type: new GraphQLList(Schedule),
        args: {
          event_id: {type: new GraphQLList(GraphQLInt)},
          volunteer_id: {type: new GraphQLList(GraphQLInt)}
        },
        resolve(root, args) {
          return db.models.schedule.findAll({where: args});
        }
      },
      badges_volunteer: {
        type: new GraphQLList(badgesVolunteer),
        args: {
          volunteer_id: {type: new GraphQLList(GraphQLInt)},
          badge_id: {type: new GraphQLList(GraphQLInt)}
        },        
        resolve(root, args) {
          return db.models.badges_volunteer.findAll({where: args});
        }
      }
    };
  }
})

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  description: 'mutations for our tables',
  fields: () => {
    return {
      volunteer: {
        type: new GraphQLList(Volunteer),
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            profile_img: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(root, input) {
          return db.models.volunteer.create({name: input.name, description: input.description, profile_img: input.profile_img})
        }
      },
      ngo: {
        type: new GraphQLList(Ngo),
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            profile_img: { type: new GraphQLNonNull(GraphQLString) },
            background_img: { type: new GraphQLNonNull(GraphQLString)},
            ein: { type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve(root, input) {
          return db.models.ngo.create({name: input.name, description: input.description, profile_img: input.profile_img, background_img: input.background_img, ein: input.ein})
        }     
      },
      events: {
        type: new GraphQLList(Event),
        args: {
            event_start: { type: new GraphQLNonNull(GraphQLString) },
            event_end: { type: new GraphQLNonNull(GraphQLString) },
            ngo_id: { type: new GraphQLNonNull(GraphQLInt) },
            description: { type: new GraphQLNonNull(GraphQLString)},
        },
        resolve(root, input) {
          return db.models.event.create({event_start: input.event_start, event_end: input.event_end, ngo_id: input.ngo_id, description: input.description})
        }     
      },
      schedule: {
        type: new GraphQLList(Schedule),
        args: {
            volunteer_start: { type: new GraphQLNonNull(GraphQLString) },
            volunteer_end: { type: new GraphQLNonNull(GraphQLString) },
            event_id: { type: new GraphQLNonNull(GraphQLInt) },
            volunteer_id: { type: new GraphQLNonNull(GraphQLInt)},
        },
        resolve(root, input) {
          return db.models.schedule.create({volunteer_start: input.volunteer_start, volunteer_end: volunteer.event_end, event_id: input.event_id, volunteer_id: input.volunteer_id})
        }     
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutations
});


var app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.listen(3000, () => console.log(`Now browse to localhost/3000/graphql`));










