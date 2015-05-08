import actions from '../config/actions';

const ActivityActions = {
  fetchActivity(context) {
    context.dispatch(actions.ACTIVITIES,
      [{
        "_embedded": {
          "user": {
            "name": "Jesse",
            "id": "jesse"
          }
        },
        "message": "Test 123"
      },
      {
        "_embedded": {
          "user": {
            "name": "Maarten",
            "id": "maarten"
          }
        },
        "message": "5 6 7 8 GO"
      },
      {
        "_embedded": {
          "user": {
            "name": "Rick",
            "id": "rick"
          }
        },
        "message": "Dat is raar"
      }]
    );

    return Promise.resolve();
  }
};

export default ActivityActions;
