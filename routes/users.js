let express = require("express");
let router = express.Router();

let db = require("../controllers/user.js");
const Joi = require("joi");

/** Create user. */
router.post("/register", async function (req, res, next) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error);

  const response = await db.createUser(req.body);
  res.json({
    success: true,
    message: "Register successfull"
  });
});

router.post("/login", async function (req, res, next) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error);

  const answer = await db.login(req.body);
  if (answer.valid === true) {
    let resp = {
      success: true,
      message: "Authentication successfull",
      token: answer.user
    };
    res.json(resp);
  } else {
    res.send(403).json({
      success: false,
      message: "Incorrect username or password",
    });
  }
});

const validateUser = (userR) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string(),
  });

  return schema.validate(userR);
};

module.exports = router;
