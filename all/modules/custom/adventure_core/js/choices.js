A.choice = function (text, requirements, actions, id, message, message_title) {

  this.requirements = requirements;
  this.actions = actions;
  this.id = id;
  this.text = text;
  this.message = message;
  this.message_title = message_title;

  var self = this;

  var public = {

    get visibility() {

      return A.requirementsCheck(self.requirements);

    },

    get text() {

      return self.text;

    },

    get id() {

      return self.id;

    },

    trigger: function () {

      if (A.requirementsCheck(self.requirements)) {

        self.actions.forEach(function (element, index) {

          element.trigger();

        });

        if (self.message) {
          A.messages.push({
            id: self.id,
            title: self.message_title,
            message: self.message,
            timestamp: new Date()
          });

          jQuery(document).trigger("actionWithMessage");

        } else {

          jQuery(document).trigger("actionNoMessage");

        }

      } else {

        throw Error("Requirements not met");

      }

    }

  }

  return public;

};
