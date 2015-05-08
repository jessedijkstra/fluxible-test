import actions from '../config/actions';

const RouteActions = {
  navigate(context, { url, state, replace }) {

    if (replace) {
      window.history.replaceState(state, '', url);
    } else {
      window.history.pushState(state, '', url);
    }

    context.dispatch(actions.CHANGE_ROUTE, { url, state });

    return Promise.resolve();
  },

  show404(context, { err }) {
    context.dispatch(actions.STATUS_404, { err });

    return Promise.resolve();
  },

  show500(context, { err }) {
    context.dispatch(actions.STATUS_500, { err });

    return Promise.resolve();
  }
};

export default RouteActions;
