import React from 'react';

require('./Activity.css');

class Activity extends React.Component {
  render() {
    return (
      <div className="c-activity">
        <p className="user">{this.props.activity.getIn(['_embedded', 'user', 'name'])}</p>
        <p className="message">{this.props.activity.get('message')}</p>
      </div>);
  }
}

export default Activity;