var A;
(function () {
    'use strict';

    //Wrapper for the adventure engine.
    var adventure = {

            //World object for putting everything in

            world: {
                description: null,
                attributes: {
                    red: null,
                    orange: null,
                    yellow: null,
                    green: null,
                    blue: null,
                    indigo: null,
                    violet: null
                },
                places: [],
                findplace: function (name) {
                    var i;
                    for (i = 0; i < this.places.length; i += 1) {
                        if (this.places[i].admin_name === name) {
                            return this.places[i];
                        }
                    }
                    return false;
                },
                items: [],
                player: {
                    name: null,
                    attributes: {
                        red: null,
                        orange: null,
                        yellow: null,
                        green: null,
                        blue: null,
                        indigo: null,
                        violet: null
                    },
                    inventory: null
                }
            },

            //Containers for putting items in (including the player's inventory). Includes methods for taking, receiving and checking if an item is in a container and where in that container it is. Checks for available space in container before placing item.

            container: {
                name: null,
                size: null,
                contents: [],
                //Can players openly view the container
                visible: false,
                //Can players put items in the container?
                storage: false,
                space: function () {
                    var i,
                        total = 0;
                    for (i = 0; i < this.contents.length; i += 1) {
                        total += this.contents[i].size;
                    }
                    return this.size - total;
                },
                //Receive takes an item object {name:string, size:number}
                receive: function (item) {
                    if (this.hasOwnProperty("contents")) {
                        if (this.space() >= item.size) {
                            this.contents.push(item);
                            return "received";
                        } else {
                            return "Not enough space in " + this.name;
                        }
                    } else {
                        return "No contents in inventory";
                    }
                },
                //Checks if an item is in the container
                checkitem: function (item) {
                    if (this.hasOwnProperty("contents")) {
                        var i;
                        for (i = 0; i < this.contents.length; i += 1) {
                            if (this.contents[i] === item) {
                                return this.contents[i];
                            }
                        }
                        return false;
                    }
                },
                //Check if an item is in the current container and, if yes, move it to the container of the second argument
                give: function (item, container) {
                    //Check if item present
                    if (this.checkitem(item)) {
                        item = this.checkitem(item);
                        //Check if container has enough space
                        if (container.space() < item.size) {
                            return "Not enough space in " + container.name;
                        }
                        //Remove item from current container
                        this.contents.splice(item);
                        container.receive(item);
                        return "Given";
                    }
                }
            },

            //Items for putting in containers.

            item: {
                name: null,
                size: null,
                //Stuck to account
                sticky: null,
                //Player can see this item (invisible items can be used to mark goals/achievements)
                visible: null
            },

            //A place is a location in a world that contains a list of choices which can be moved through by player progress. State shows the current progress of the place and indicates which list of choices to show.  

            place: {
                admin_name: null,
                location: {
                    lat: null,
                    lng: null
                },
                choices: [],
                state: 0,
                container: null
            },

            //A game condition (for winning, showing choices, giving items etc)

            condition: {
                attributes: {
                    min: {
                        red: null,
                        orange: null,
                        yellow: null,
                        green: null,
                        blue: null,
                        indigo: null,
                        violet: null
                    },
                    max: {
                        red: null,
                        orange: null,
                        yellow: null,
                        green: null,
                        blue: null,
                        indigo: null,
                        violet: null
                    }
                },
                item: null,
                check: function (player) {

                    //Check if attribute conditions met
                    var attribute,
                        item;
                    
                    for (attribute in this.attributes) {

                        if (this.attributes[attribute] !== null) {
                            if (this.attributes[attribute].min && this.attributes[attribute].min >= player.attributes[attribute]) {
                                return false;
                            }
                            if (this.attributes[attribute].max && this.attributes[attribute].max <= player.attributes[attribute]) {
                                return false;
                            }
                        }
                    }
                    
                    //Check if item conditions met
                    
                    if (this.item !== null) {
                        if (!player.inventory.checkitem(this.item.yes)) {
                            return false;
                        }
                        if (player.inventory.checkitem(this.item.no)) {
                            return false;
                        }
                       
                    }
                    
                    return true;
                }
            }
        };
    A = adventure;
}
 ());