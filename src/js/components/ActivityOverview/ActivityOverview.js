import React from 'react';
import {List} from 'immutable';
import Activity from '../Activity';
import ActivityActions from '../../actions/ActivityActions';

require('./ActivityOverview.css');

class ActivityOverview extends React.Component {
  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired
  }

  static propTypes = {
    activities: React.PropTypes.instanceOf(List)
  }

  static defaultProps = {
    activities: new List()
  }

  componentDidMount() {
    this.context.executeAction(ActivityActions.fetchActivity);
  }

  renderActivities() {
    console.log(this.props.activities);

    return this.props.activities.map((activity) => {
      return <Activity activity={activity} />
    });
  }

  render() {
    return (
      <div className="c-activity-overview">
        {this.renderActivities()}
      </div>);
  }
}

export default ActivityOverview;