//Placeholder for action defining function(s).

A.action = function (subject, value, message) {

  if (typeof message !== "string") {

    throw Error("Message must be text");

  }

  var subject = subject.toLowerCase();

  if (!A.things[subject]) {

    throw Error("There is not a thing called " + name + ". Thing names are case insensitive");

  }

  if (A.things[subject].getType() !== typeof value) {

    throw Error("The value is of the wrong type");

  }

  this.message = message;

  self = this;

  return function () {

    A.things[subject].setValue(value);

    return self.message;

  };

};
