// include all of your models here using CommonJS requires
const User = require("./User.js")
const Set = require("./Set.js")
const Exercise = require("./Exercise.js")
const Workout = require("./Workout.js")
const Location = require("./Location.js")

module.exports = { User, Workout, Exercise, Set, Location };
