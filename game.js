/*global A,console*/

//Create a basic world. Player has ten health and a size 10 rucksack with nothing in it to start.
var world = A.world.create({title: "Hello, world", description: "An adventure in testing"});

world.player.attributes.red.name = "health";
world.player.attributes.blue.name = "water";
world.player.attributes.red.value = 10;
world.player.attributes.blue.value = 6;
world.player.inventory = Object.create(A.container);
world.player.inventory.name = "rucksack";
world.player.inventory.size = 5;
world.player.inventory.contents = [];

//Create a place on the map

world.places.push(Object.create(A.place, {
    admin_name: {
        value: "Start"
    }
}));

//Create a treasure chest and put it in that place

world.findplace("Start").container = Object.create(A.container, {
    name: {
        value: "chest"
    },
    size: {
        value: 10
    },
    contents: {
        value: []
    }
});

//Create an amulet object

world.items.push(Object.create(A.item));
world.items[0].admin_name = "Amulet";
world.finditem("Amulet").name = "Amulet";
world.finditem("Amulet").size = 5;

//Create a donkey object

world.items.push(Object.create(A.item));
world.items[1].admin_name = "Donkey";
world.finditem("Donkey").name = "Donkey";
world.finditem("Donkey").size = 100;

//Put the amulet in the treasure chest

world.findplace("Start").container.receive(world.items[0]);

//Give the player the amulet

world.findplace("Start").container.give(world.items[0], world.player.inventory);

//Check if the player has the amulet

console.log(world.player.inventory.checkitem(world.items[0]));

//Create a game condition for checking if the player has 10 health

world.condition = Object.create(A.condition, {attributes : {value: {min : {}, max : {}}}});
world.condition.attributes.red = {min : 9};
world.condition.attributes.blue = {max : 10};
world.condition.item = {yes : world.items[0], no : world.items[1]};

//Test if condition passes

console.log(world.condition.check(world.player));