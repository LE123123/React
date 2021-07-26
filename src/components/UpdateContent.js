import React, {Component} from 'react';
//html form tag
//action: 폼을 전송할 서버 쪽 스크립트 파일을 지정합니다.
//name: 폼을 식별하기 위한 이름을 지정합니다.
//accept-charset: 폼 전송에 사용할 문자 인코딩을 지정합니다.ß
//method: 폼을 서버에 전송할 http 메소드를 정합니다 (GET 또는 POST)

//html input tagß
//type: 입력 태그의 유형
//value: 입력 태그의 초기값을 말하며 사용자가 변경가능합니다.
//name: 서버로 전달되는 이름을 말합니다.
class UpdateContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            title: this.props.data.title,
            desc: this.props.data.desc
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    inputFormHandler(e) {
        //대괄호를 사용하게 되면 그 안의 값을 프로퍼티로 사용할 수 있게 됩니다.
        this.setState({[e.target.name]:e.target.value});
    }


    render() {
        console.log(this.props.data);
        console.log("UpdateContent render");
        return (
            <article>
                <h2>Update</h2>
                
                
                <form action="/create_process" method="post"
                    onSubmit={function(e) {
                        e.preventDefault();
                        // debugger;
                        // this.props.onSubmit()

                        this.props.onSubmit(
                            this.state.id,
                            this.state.title,
                            this.state.desc
                        );

                        alert('Submit!!!');
                    }.bind(this)}>


                    <input
                        type="hidden" name="id" value={this.state.id}
                    ></input>



                    <p>
                        <input
                            type="text" 
                            name="title"
                            placeholder="title"
                            //input의 값을 바꿨을 때 state값을 바뀌게 해야지만
                            //readOnly가 아니게 됨.
                            value = {this.state.title}
                            //props의 data는 읽기 전용 입니다. 따라서 이 값을
                            //바꾸려고 하면 리액트가 개입해서 값을 변경하지 못하게 합니다.

                            //하지만 state는 setState로 변경 가능합니다.

                            //input의 택스트 값을 수정했다고 해서 state값이 바뀌어야 하는
                            //근거는 없습니다.

                            //우리가 하고 싶은 것은 input태그의 값을 바뀌게 했을 떄
                            //state값을 바뀌게 해서 value가 읽기 전용 상태가 아닌 것이
                            //되게 하는 것입니다.
                            onChange = {this.inputFormHandler}
                            >
                        </input> 
                    </p>

                    <p>
                        <textarea 
                            name="desc" 
                            placeholder="description" 

                            //기본 값을 설정
                            value={this.state.desc}
                            onChange = {this.inputFormHandler}
                        >    
                        </textarea>
                    </p>

                    <p>
                        <input type="submit">

                        </input>
                    </p>
                    <p>
                        <input type="reset">

                        </input>
                    </p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;