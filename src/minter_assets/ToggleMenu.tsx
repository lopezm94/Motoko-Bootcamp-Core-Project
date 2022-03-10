import React, {PureComponent, RefObject, createRef} from 'react';
import {Menu} from "./Menu";
import {MenuItem} from "./MenuItem";

class ToggleMenu extends PureComponent {

    btnRef: RefObject<Menu>;

    constructor(props: any, context: any) {
        super(props, context);
        this.btnRef= createRef();
    }

    showRight = () => {
        this.btnRef.current?.toggle();
    }

    render() {

        return (
            <div>
                <button onClick={this.showRight}>Show Right Menu!</button>
                <Menu ref={this.btnRef} alignment="right">
                    <MenuItem hash="first-page">First Page</MenuItem>
                    <MenuItem hash="second-page">Second Page</MenuItem>
                    <MenuItem hash="third-page">Third Page</MenuItem>
                </Menu>
            </div>
        );
    }
}

export { ToggleMenu }
