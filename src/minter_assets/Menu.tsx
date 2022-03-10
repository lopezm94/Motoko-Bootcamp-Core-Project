import React, {Component} from "react"

class Menu extends Component<{alignment: string}> {
  state = {
    visible: false,
  };

  toggle() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible } = this.state;

    return (
        <div className="menu">
          {
            visible &&
            <div className={this.props.alignment}>{this.props.children}</div>
          }
        </div>
    );
  }
}

export { Menu }
