import React, {Component} from 'react';

class Subject extends Component {
    //render라는 함수가 있어야 합니다.
    render() {
        console.log("Subject render");
        return (
            //컴포넌트를 만들 때에는 최소한 
            //하나의 최상위 태그로 시작해야 합니다.
            <header>
                <h1><a href="/" onClick = {function(e) {
                    e.preventDefault();
                    this.props.onChangePage();
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;