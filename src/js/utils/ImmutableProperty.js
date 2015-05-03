var Immutable = require('immutable');

function impropImmutableInstance(expectedConstructor) {
  return function(props, propName, componentName) {
    if (!(props[propName] instanceof expectedConstructor)) {
      return new Error(
        `Warning: Invalid prop '${propName}' supplied to '${componentName}'; ` +
        `expected instance of '${expectedConstructor.name}'.`
      );
    }
  };
}

var impropTypeCheck = {
  List: impropImmutableInstance(Immutable.List),
  Map: impropImmutableInstance(Immutable.Map)
};

module.exports = impropTypeCheck;