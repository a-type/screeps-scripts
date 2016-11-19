
var roleHarvester = require('./roles/creeps/harvester');
var roleUpgrader = require('./roles/creeps/upgrader');
var roleTower = require('./roles/tower/default');

module.exports.loop = function () {

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        roleTower.run(tower);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}