import Fluxible from 'fluxible';
import {connectToStores, provideContext} from 'fluxible/addons';
import React from 'react';
import Immutable from 'immutable';
import ApplicationStore from './stores/ApplicationStore';
import RouteActions from './actions/RouteActions';
import Link from './components/Link';
import NotFound from './components/NotFound';
import ActivityOverview from './components/ActivityOverview';
import LayeredModules from './components/LayeredModules';

require('./app.css');

const AppComponent = provideContext(connectToStores(
  LayeredModules,
  [ApplicationStore],
  (stores) => {
    let modules = Immutable.fromJS([
      {
        name: 'NotFound',
        component: () => (<NotFound />),
        layer: 'main'
      },
      {
        name: 'ActivityOverview',
        component: () => (
          <ActivityOverview activities={stores.ApplicationStore.getProperty('activities')}/>
        ),
        'layer': 'main'
      }
    ]);

    let layers = new Immutable.List([
      'main',
      'overlay',
      'dialogue',
      'system'
    ]);

    return {
      module: stores.ApplicationStore.getModule(),
      moduleProperties: stores.ApplicationStore.getParams(),
      onUnknownModule: function (moduleName) {
        this.context.executeAction(RouteActions.show404);
      },
      layers,
      modules
    }
  }
));

const app = new Fluxible({
  component: AppComponent,
});

app.registerStore(ApplicationStore);

export default app;