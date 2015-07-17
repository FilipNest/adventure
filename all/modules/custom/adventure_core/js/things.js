//Holder for all things

A.things = {};

A.thing = function (id, name, description, value, requirements, choices, location) {

  var name = name.toLowerCase();

  this.id = id;
  this.name = name;
  this.description = description;
  this.value = value;
  this.location = location;
  
  var requirements_array = [];

  requirements.forEach(function (group, index) {

    var or = [];

    group.forEach(function (requirement, index) {

      or.push(new A.requirement(requirement.thing, requirement.operator, requirement.value, requirement.negate))

    });

    requirements_array.push(or);

  });

  var choices_array = [];

  choices.forEach(function (choice) {

    var actions = [];

    //Create actions array

    choice.actions.forEach(function (action) {

      actions.push(new A.action(action.target, action.property, action.value));

    });

    var requirements_array = [];

    choice.requirements.forEach(function (group, index) {

      var or = [];

      group.forEach(function (requirement, index) {

        or.push(new A.requirement(requirement.thing, requirement.operator, requirement.value, requirement.negate))

      });

      requirements_array.push(or);

    });

    var choice = new A.choice(choice.text, requirements_array, actions, choice.id, choice.message);

    choices_array.push(choice);

  });

  this.choices = choices_array;

  this.requirements = requirements_array;

  var self = this;

  var public = {

    set value(value) {

      self.value = value;
      jQuery(document).trigger("thingChanged", public);

    },

    get value() {

      return self.value;

    },

    get description() {

      return self.description;

    },

    set description(value) {

      self.description = value;

    },
    
    get location() {

      return self.location;

    },

    set location(value) {

      self.location = value;

    },

    get description() {

      return self.description;

    },

    get name() {

      return self.name;

    },

    get id() {

      return self.id;

    },

    get choices() {

      //List only visible choices

      return self.choices;

    },

    get visibility() {

      return A.requirementsCheck(self.requirements);

    },

  }

  A.things[id] = public;

  jQuery(document).trigger("thingChanged", public);

  return public;

};
