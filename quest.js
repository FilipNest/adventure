//Basic quest setup

A.Quest.create("Hello","A development adventure");

//Options set one

W.quest.questions[0] = A.MakeChoice([
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
W.quest.box = A.Container.create("box", 5);
W.quest.amulet = {name:"amulet",size:2};
W.quest.torch = {name:"torch",size:2};
W.quest.theremin = {name:"theremin", size:4};
//Some examples:
W.quest.player.inventory.receive(W.quest.amulet);
W.quest.player.inventory.give("amulet",W.quest.box);
//The box should now have the amulet. Check this as follows.
W.quest.box.checkitem("amulet");
//Checks if the box has the amulet and returns the position of the amulet in the box's contents array.