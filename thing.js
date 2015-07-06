var A = {};
A.things = {};

A.thing = {

  name: null,
  type: null, //String or number
  hidden: true,
  value: null,
  create: function (name, type, hidden, value) {

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

    //Create thing

    var thing = Object.create(A.thing, {

      name: {
        writable: false,
        value: name
      },
      type: {
        writable: false,
        value: type
      },
      hidden: {
        writable: true,
        value: hidden
      },
      value: {
        writable: true,
        value: value
      }
    });

    return A.things[name] = thing;
    
  }
};
