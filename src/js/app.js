import Fluxible from 'fluxible';
import {connectToStores, provideContext} from 'fluxible/addons';
import React from 'react';
import Immutable from 'immutable';
import ApplicationStore from './stores/ApplicationStore';
import RouteActions from './actions/RouteActions';
import Link from './components/Link';
import NotFound from './components/NotFound';
import LayeredModuleRouter from './components/LayeredModuleRouter';

class Home extends React.Component {
  render() {
    return (
      <div className="v-home">
        <h1><Link href="/overlay">Welcome! Click here to navigate to an overlay</Link></h1>
      </div>);
  }
}

class Overlay extends React.Component {
  render() {
    var style = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)'
    }
    return (
      <div className="v-overlay" style={style}>
        <h1 style={{color: '#fff'}}><Link href="/dialogue" style={{ color: '#fff' }}>This is an overlay! Click here to navigate to a dialogue!</Link></h1>
      </div>);
  }
}

class Dialogue extends React.Component {
  render() {
    var style = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255,0,0,0.8)'
    }
    return (
      <div className="v-overlay" style={style}>
        <h1 style={{color: '#fff'}}><Link href="/" style={{ color: '#fff' }}>This is a dialogue! Click here to navigate to all the way back to the welcome page!</Link></h1>
      </div>);
  }
}

const AppComponent = provideContext(connectToStores(LayeredModuleRouter, [ApplicationStore.storeName],
  (stores) => ({
    route: stores.ApplicationStore.getRoute(),
    onUnknownRoute: function (route) {
      this.context.executeAction(RouteActions.show404);
    },
    layers: new Immutable.List([
      'main',
      'overlay',
      'dialogue',
      'system'
    ]),
    modules: Immutable.fromJS([
      {
        name: 'notfound',
        component: () => (<NotFound />),
        layer: 'main'
      },
      {
        name: 'home',
        component: () => (<Home />),
        layer: 'main'
      },
      {
        name: 'overlay',
        component: () => (<Overlay />),
        layer: 'overlay'
      },
      {
        name: 'dialogue',
        component: () => (<Dialogue />),
        layer: 'dialogue'
      }
    ])
  })
));

const app = new Fluxible({
  component: AppComponent,
});

app.registerStore(ApplicationStore);

export default app;