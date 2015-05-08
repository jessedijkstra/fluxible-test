import React from 'react';
import RouteActions from '../../actions/RouteActions';

class Link extends React.Component {
    static contextTypes = {
      executeAction: React.PropTypes.func.isRequired
    }

    render() {
        var { onClick, ...props } = this.props;

        return (
            <a onClick={this.onClick.bind(this)} {...props}>{this.props.children}</a>
        )
    }

    onClick(e) {
        this.props.onClick && this.props.onClick(e);

        if (!e.defaultPrevented && this.props.href) {
            e.preventDefault();

            this.context.executeAction(RouteActions.navigate, { url: this.props.href });
        }
    }
}

export default Link;