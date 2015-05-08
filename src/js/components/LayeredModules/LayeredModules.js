import React from 'react';
import {List, Map, fromJS} from 'immutable';

class LayeredModules extends React.Component {
  static propTypes = {
    modules: React.PropTypes.instanceOf(List),
    layers: React.PropTypes.instanceOf(List),
    module: React.PropTypes.string
  }

  static defaultProps = {
    modules: new List(),
    layers: new List(),
    module: null
  }

  state = {
    loadedModules: new List()
  }

  componentDidMount() {
    this.updateModuleState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.module !== this.props.module) {
      this.updateModuleState();
    }
  }

  updateModuleState() {
    var module = this.props.modules.find((module) => {
      return module.get('name') === this.props.module
    });

    if (module) {
      this.setModule(module);
    } else {
      this.props.onUnknownModule && this.props.onUnknownModule(this.props.module);
    }
  }

  setModule(module) {
    this.setState({
      loadedModules: this.removeModulesUntil(module).push(module)
    });
  }

  removeModulesUntil(module) {
    var targetIndex = this.layerIndex(module.get('layer'));

    return this.state.loadedModules.takeWhile((module) => {
      return this.layerIndex(module.get('layer')) < targetIndex;
    });
  }

  layerIndex(name) {
    return this.props.layers.findIndex((layer) => layer === name);
  }

  renderModules() {
    return this.state.loadedModules.toJS().map((module) => {

      let properties = Object.assign(this.props.moduleProperties.toJSON(), {
        key: module.name,
        ref: module.layer
      });

      return React.cloneElement(module.component(), properties);
    });
  }

  render() {
    return (
      <div className="c-layered-modules">
        {this.renderModules()}
      </div>
    );
  }
};

export default LayeredModules;