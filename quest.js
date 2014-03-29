//Basic quest setup

A.Quest.create("Hello","A development adventure");

//Options set one

W.Q.questions[0] = A.MakeChoice([
    {
        condition:1<5,
        option:"Eat a sandwich",
        result:function(){return "Eating"}
    },
    {
        condition:10>5,
        option:"Fly a plane",
        result:function(){return "Flying"}
    }
],"What do you wish to do?");

//Create a test box and some items to play with
W.Q.box = A.Container.create("box", 5);
W.Q.amulet = {name:"amulet",size:2};
//Some examples:
W.Q.player.inventory.receive(W.Q.amulet);
W.Q.player.inventory.give("amulet",W.Q.box);
//The box should now have the amulet. Check this as follows.
W.Q.box.checkitem("amulet");
//Checks if the box has the amulet and returns the position of the amulet in the box's contents array.