import React from 'react';
import {List, Map, fromJS} from 'immutable';
import ImmutableProperty from '../utils/ImmutableProperty';

class LayeredModuleRouter extends React.Component {
  static propTypes = {
    modules: ImmutableProperty.List,
    layers: ImmutableProperty.List,
    route: ImmutableProperty.Map,
  }

  static defaultProps = {
    modules: new List(),
    layers: new List(),
    route: fromJS({
      config: {},
      url: '',
      params: {},
      navigate: undefined
    })
  }

  state = {
    loadedModules: new List()
  }

  componentDidMount() {
    this.updateModuleState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.route !== this.props.route) {
      this.updateModuleState();
    }
  }

  updateModuleState() {
    var module = this.props.modules.find((module) => {
      return module.get('name') === this.props.route.get('config').get('module')
    });

    if (module) {
      this.setModule(module);
    } else {
      console.warn('Unknown module');
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
    return this.state.loadedModules.toArray().map((module) => {
      return React.addons.cloneWithProps(
        module.get('component')(),
        {
          key: module.get('name'),
          ref: module.get('layer')
        }
      )
    });
  }

  render() {
    return (
      <div className="v-module-router">
        {this.renderModules()}
      </div>
    );
  }
};

export default LayeredModuleRouter;