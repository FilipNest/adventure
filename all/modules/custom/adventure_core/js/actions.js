//Placeholder for action defining function(s)?

A.action = function (subject, property, value) {

  return {

    trigger: function () {

      A.things[subject][property] = value;

    },

    name: subject,
    value: value
  }

};
