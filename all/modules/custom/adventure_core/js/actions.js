//Placeholder for action defining function(s)?

A.action = function (subject, value) {

  return {

    trigger: function () {
      
      A.things[subject].value = value;

    },
    
    name: subject,
    value: value
  }

};
