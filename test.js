  new A.thing("Fun", "number", false, 100);

  var test = new A.requirement("Fun", ">", 55);

  var test2 = new A.requirement("Fun", "<", 5000);

  var chain = [
      [test, test2]
    ];

  var action = new A.action("Fun", 50000, "You increased your fun");

  var choice = new A.choice("This is a choice", chain, action);

  console.log(choice.trigger());
