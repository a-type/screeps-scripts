var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.refilling && creep.carry.energy == 0) {
            creep.memory.refilling = false;
            creep.say('harvesting');
        } else if(!creep.memory.refilling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.refilling = true;
            creep.say('refilling');
        } else {
            creep.memory.refilling = false;
        }
        
        if(creep.memory.refilling) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            
            if(targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['The Cove']);
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleHarvester;