console.log("notes pages loaded");
var age = 23;
const addNumners = function (a, b) {
  return a + b;
};

module.exports = {
  // exports the age variable that the process of the use  another file use same variable and display use for module exports
  age,
  addNumners, // exports the addNumbers functions
};
