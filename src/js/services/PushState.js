import Routr from 'routr';
import RouteActions from '../actions/RouteActions'

class PushState {
  constructor(context) {

    this._context = context;

    window.onpopstate = this.onPopState.bind(this);

    this.run();
  }

  run() {
    this._running = true;

    this.navigate(window.location.pathname, window.history.state);
  }

  onPopState(e) {
    this.navigate(window.location.pathname, e.state);
  }

  navigate(url, state) {
    if (this._running) {
      RouteActions.navigate(this._context.getActionContext(), { url, state, replace: true });
    }
  }
}

export default PushState;