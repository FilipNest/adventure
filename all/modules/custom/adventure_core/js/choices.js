A.choice = function (text, requirements, action) {

  if (typeof text !== "string") {

    throw Error("Text must be a string");

  }

  this.requirements = requirements;
  this.action = action;
  this.text = text;

  var self = this;

  var public = {

    checkVisibility: function () {

      return A.requirementsCheck(self.requirements);

    },

    trigger: function () {

      if (A.requirementsCheck(self.requirements)) {

        return self.action();

      } else {

        throw Error("Requirements not met");

      }

    }

  }

  return public;

};
