import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');


Meteor.methods({
  'tasks.insert'(text){
    check(text, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
    },
    'tasks.remove'(taskID) {
      check(taskId, String);

      Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
      check(taskId, String);
      check(setChecked, Boolean);

      Tasks.update(taskId, { $set: { checked: setChecked } });
    },
});
