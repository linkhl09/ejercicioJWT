const { mongoUtils, dataBase } = require("../lib/utils/mongo.js");
const COLLECTION_NAME = "users";
const bcrytp = require("bcrypt");
const auth = require("../lib/utils/auth");
const saltRounds = 10;

async function login(user) {
  return mongoUtils.conn().then(async (client) => {
    let response = { valid: true };
    const requestedUser = await client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ username: user.username })
      .finally(() => client.close());
    if (requestedUser !== null) {
      const isValid = await bcrytp.compare(
        user.password,
        requestedUser.password
      );
      if (isValid) {
        delete user.password;
        user.token = auth.createToken(user);
        response.user = user;
      } else response.valid = false;
    }
    else response.valid = false;
    return response;
  });
}

async function createUser(user) {
  if (user.password)
    bcrytp.hash(user.password, saltRounds).then((hash) => {
      user.password = hash;
    });

  return mongoUtils.conn().then(async (client) => {
    let newUser = await client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne(user)
      .finally(() => client.close());
    newUser = newUser.ops[0];
    delete newUser.password;
    return newUser;
  });
}

exports.createUser = createUser;
exports.login = login;
