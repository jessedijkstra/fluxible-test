import Actions from '../constants/Actions';

const RouteActions = {
  navigate(context, { url, state, replace }) {

    if (replace) {
      window.history.replaceState(state, '', url);
    } else {
      window.history.pushState(state, '', url);
    }

    context.dispatch(Actions.CHANGE_ROUTE, { url, state });

    return Promise.resolve();
  },

  show404(context, { err }) {
    context.dispatch(Actions.STATUS_404, { err });

    return Promise.resolve();
  },

  show500(context, { err }) {
    context.dispatch(Actions.STATUS_500, { err });

    return Promise.resolve();
  }
};

export default RouteActions;
