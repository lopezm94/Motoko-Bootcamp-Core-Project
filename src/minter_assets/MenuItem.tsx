import React, {Component} from 'react';

class MenuItem extends Component<{hash: string}> {

    navigate(props: {hash: string}) {
        window.location.hash = props.hash;
    }

    render() {
        return (
            <div className="menu-item" onClick={this.navigate.bind(this, this.props)}>{this.props.children}</div>
        );
    }
}

export { MenuItem }
