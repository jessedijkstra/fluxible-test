import {BaseStore} from 'fluxible/addons';
import {Map, fromJS} from 'immutable';
import actions from '../config/actions';
import Routr from 'routr';
import routes from '../config/routes';

class ApplicationStore extends BaseStore {
  static storeName = 'ApplicationStore'

  static handlers = {
    [actions.CHANGE_ROUTE]: 'changeRoute',
    [actions.STATUS_404]: 'status404',
    [actions.STATUS_500]: 'status500',
    [actions.ACTIVITIES]: 'setActivities'
  }

  state = new Map()
  router = new Routr(routes)

  changeRoute({ url, state }) {

    let route = Object.assign(this.router.getRoute(url), { state });

    this.setProperty('route', route);

    this.emitChange();
  }

  status404() {
    this.changeRoute({ url: '/notfound' });
  }

  status500() {
    this.changeRoute({ url: '/error' });
  }

  setActivities(value) {
    this.setProperty('activities', value);
  }

  setProperty(property, value) {
    this.state = this.state.set(property, fromJS(value));
  }

  getProperty(property) {
    this.state.get(property);
  }

  getState() {
    return this.state;
  }

  getModule() {
    return this.state.getIn(['route', 'config', 'module']);
  }

  getParams() {
    return this.state.getIn(['route', 'params']);
  }
};

export default ApplicationStore;