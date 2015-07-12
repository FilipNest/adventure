 (function ($) {

   $.each(A.data, function(index, element){

     new A.thing(element.id, element.name,element.description, element.value, element.viewing_requirements);
  
//  var action = new A.action("Fun", 50000, "You increased your fun");
//
//  var action2 = new A.action("Fun", 30000, "You increased your fun");
//
//
//  var choice = new A.choice("This is a choice", chain, action);
//
//  var choice2 = new A.choice("This is a choice", chain, action);
//
////choice.trigger();
     
   });

 })(jQuery)
