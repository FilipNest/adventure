var A = {};

//Holder for all things

A.things = {};

A.thing = function (name, type, hidden, value) {

  //Create object

  if (typeof name !== "string") {

    throw Error("Not a string");

  }

  if (type !== "string" && type !== "number") {

    throw Error("Type must be either string or number");

  }

  if (type === "string" && typeof value !== "string" || type === "number" && typeof value !== "number") {

    throw Error("Not a" + +value);

  }

  if (type === "string" && typeof value !== "string" || type === "number" && typeof value !== "number") {

    throw Error("Not a" + +value);

  }

  if (typeof hidden !== "boolean") {

    throw Error("Hidden value must be true or false");

  }

  //Check if thing doesn't already exist in the world

  if (A.things[name]) {

    throw Error("There is already a thing called " + name);

  }

  //Set values if validation passes

  this.name = name;
  this.type = type;
  this.hidden = hidden;
  this.value = value;

  var self = this;

  var public = {

    setValue: function (value) {

      if (self.type === typeof value) {

        self.value = value;

      } else {

        throw Error("Needs to be " + type);

      }

    },

    getValue: function () {

      return self.value;

    },

    setHidden: function (hidden) {

      if (typeof hidden === "boolean") {

        self.hidden = hidden;

      } else {

        throw Error("Hidden must be true or false");

      }

    },

    flipHidden: function () {

      self.hidden = !self.hidden;

      return self.hidden;

    },

    checkHidden: function () {

      return self.hidden;

    },

    getType: function () {

      return self.type;

    };

  }

  A.things[name] = public;

  return public;

};
