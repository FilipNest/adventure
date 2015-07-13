//Holder for all things

A.things = {};

A.thing = function (id, name, description, value, requirements, choices) {

  var name = name.toLowerCase();

  this.id = id;
  this.name = name;
  this.description = description;
  this.value = value;
  
  var requirements_array = [];
  
  requirements.forEach(function(group, index){
    
    var or = [];
    
    group.forEach(function(requirement, index){
            
        or.push(new A.requirement(requirement.thing, requirement.operator, requirement.value))  
      
    });
      
    requirements_array.push(or);
    
  });
  
  var choices_array = [];
  
  choices.forEach(function(choice){
    
    var actions = [];
    
    //Create actions array
    
    choice.actions.forEach(function(action){
      
      actions.push(new A.action(action.target, action.value));
      
    });
    
    var requirements_array = [];

    choice.requirements.forEach(function(group, index){

      var or = [];

      group.forEach(function(requirement, index){

          or.push(new A.requirement(requirement.thing, requirement.operator, requirement.value))  

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

    getName: function () {

      return self.name;

    },
    
    checkVisibility: function(){
     
      return A.requirementsCheck(self.requirements);
      
    },
    
    listChoices: function(){
    
     //List only visible choices
      
      var output = [];
      
      self.choices.forEach(function(element){
                
        if(element.checkVisibility()){
                    
          output.push({id:element.id, text:element.text, trigger:element.trigger});
          
        };
        
      });
      
      if(output.length > 0){
      return output; 
      }
    
    }

  }

  A.things[id] = public;

  jQuery(document).trigger("thingChanged", public);

  return public;

};
