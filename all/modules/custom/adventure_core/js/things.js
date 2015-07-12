//Holder for all things

A.things = {};

A.thing = function (id, name, description, value, requirements) {

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
      
    }

  }

  A.things[id] = public;

  jQuery(document).trigger("thingChanged", public);

  return public;

};
