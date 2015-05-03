import {BaseStore} from 'fluxible/addons';
import {Map, fromJS} from 'immutable';
import Actions from '../constants/Actions';
import Routr from 'routr';
import routes from '../config/routes';

class ApplicationStore extends BaseStore {
  static storeName = 'ApplicationStore'

  static handlers = {
    [Actions.CHANGE_ROUTE]: "changeRoute",
    [Actions.STATUS_404]: "status404",
    [Actions.STATUS_500]: "status500"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this._state = new Map();
    this._routr = new Routr(routes);
  }

  changeRoute({ url, state }) {
    this.setProperty('route', fromJS(this._routr.getRoute(url)));
    this.setProperty('state', fromJS(state));

    this.emitChange();
  }

  status404() {
    this.changeRoute({ url: '/notfound' });
  }

  status500() {
    this.changeRoute({ url: '/error' });
  }

  setProperty(property, value) {
    this._state.set(property, value);
  }

  getProperty(property) {
    this._state.get(property);
  }

  getState() {
    return this._state;
  }

  getRoute() {
    return this._state.get('route');
  }
};

export default ApplicationStore;