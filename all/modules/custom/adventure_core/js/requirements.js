//Placeholder for requirement creation

A.requirementsCheck = function (requirementsarrays) {
  
  //Return true if no requirements set
  
  if(requirementsarrays.length === 0){
   
    return true;
    
  }
  
  var pass;

  requirementsarrays.forEach(function (requirements) {
    
    //Only run loop if requirements haven't passed yet. Each new array is treated like an "or" to the previous one.

    if (pass !== true) {

      var i;

      for (i = 0; i < requirements.length; i += 1) {
        
        pass = requirements[i]();
        
        if(pass === false){
         
          i = requirements.length;
          
        }

      }

    }

  });

  return pass;

};

A.requirement = function (subject, operator, value, negate) {

  var subject = subject.toLowerCase(),
    operator;

  this.value = value;
  this.subject = subject;
  this.operator = operator;
  this.negate = negate;
  
  var self = this;

  var public = function () {
  
    var currentValue = A.things[self.subject].value,
      result;

    switch (operator) {

      case "<":
        result = (currentValue < self.value);
        break;
      case ">":
        result = (currentValue > self.value);
        break;
      case "=":
        result = (currentValue == self.value);
        break;
      default:
        result = false;
        break;

    }
    
    //Flip result if negate is set

    if(negate === "1"){
      
      result = !result;
      
    };

    return result;

  }

  return public;

}
