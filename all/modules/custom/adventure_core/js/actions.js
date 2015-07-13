//Placeholder for action defining function(s)?

A.action = function (subject, value) {

  this.subject = subject;
  this.value = value;
  self = this;

  return function () {
    
    A.things[self.subject].value = self.value;
    
  };

};
