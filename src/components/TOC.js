//react라는 라이브러리에서 Component라는 클래스와 React라는 객체를 불러온것
import React, {Component} from 'react';

class TOC extends Component { 
    
    shouldComponentUpdate(newProps, newState) {
        console.log('===>TOC render shouldComponentUpdate'
            ,newProps.data
            ,this.props.data
        );
        if(this.props.data === newProps.data) {
            return false;
        } 
        return true
    }
    render() {
        console.log("TOC render");
        var lists = [];
        var data = this.props.data;
        var i = 0;

        while(i < data.length) {
            lists.push(
                <li key={data[i].id}>
                    <a
                        href={"/content/" + data[i].id}
                        //<a>태그에 data-id라는 속성을 추가하고 id값을 추가했습니다.
                        
                        // data-id = {data[i].id}
                        onClick = {function(id, e) {
                            //bind 2번째 인자를 함수의 첫번째 인자로 넣어주게 됩니다.
                            e.preventDefault();
                            //e.target을 통해 <a>태그에 지정해둔 data-id에 접근할 수 있게
                            //됩니다.
                            //data-라는 접두사로 시작하는 속성은 dataset이라는 특수한 객체를 통해
                            //접근할 수 있습니다.
                            console.log(e);
                            console.log(id);
                            this.props.onChangePage(id);
                        }.bind(this, data[i].id)}
                        >{data[i].title}
                    </a>
                </li>)
            i = i + 1;
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

//TOC라는 클래스를 다른 곳에서 사용할 수 있게 된다.
export default TOC;