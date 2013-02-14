module.exports= function () {

  var modules = [
  {
    definitionMap:{
      "xy": 2
    },
    usageMap:{
      "z": 4
    },
    programInstructions:[
      {
        opcode: 1,
        address: 4,
        type: "R"
      },
      {
        opcode: 5,
        address: 678,
        type: "I"
      },
      {
        opcode: 2,
        address: 777,
        type: "E"
      },
      {
        opcode: 8,
        address: 2,
        type: "R"
      },
      {
        opcode: 7,
        address: 2,
        type: "E"
      }
    ]
  },
  {
    definitionMap:{},
    usageMap:{
      "z": 3
    },
    programInstructions:[
      {
        opcode: 8,
        address: 1,
        type: "R"
      },
      {
        opcode: 1,
        address: 777,
        type: "E"
      },
      {
        opcode: 1,
        address: 1,
        type: "E"
      },
      {
        opcode: 3,
        address: 2,
        type: "E"
      },
      {
        opcode: 1,
        address: 2,
        type: "R"
      },
      {
        opcode: 1,
        address: 10,
        type: "A"
      }
    ]
  },
  {
    definitionMap:{},
    usageMap:{
      "z": 1
    },
    programInstructions:[
      {
        opcode: 5,
        address: 1,
        type: "R"
      },
      {
        opcode: 4,
        address: 777,
        type: "E"
      }
    ]
  },
  {
    definitionMap:{
      "z": 2
    },
    usageMap: {
      "xy": 2
    },
    programInstructions: [
      {
        opcode: 8,
        address: 0,
        type: "A"
      },
      {
        opcode: 1,
        address: 777,
        type: "E"
      },
      {
        opcode: 2,
        address: 1,
        type: "E"
      }
    ]
  }];
  return modules;
}