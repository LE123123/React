import React, {Component} from 'react';
//html form tag
//action: 폼을 전송할 서버 쪽 스크립트 파일을 지정합니다.
//name: 폼을 식별하기 위한 이름을 지정합니다.
//accept-charset: 폼 전송에 사용할 문자 인코딩을 지정합니다.
//method: 폼을 서버에 전송할 http 메소드를 정합니다 (GET 또는 POST)

//html input tag
//type: 입력 태그의 유형
//value: 입력 태그의 초기값을 말하며 사용자가 변경가능합니다.
//name: 서버로 전달되는 이름을 말합니다.
class CreateContent extends Component {
    render() {
        console.log("Contents render");
        return (
            <article>
                <h2>Create</h2>
                
                <form action="/create_process" method="post"


                    //만약 submit타입의 버튼을 누르게 되면 onSubmit을 진행시키게 된다.
                    onSubmit={function(e) {
                        e.preventDefault();
                        // debugger;
                        // this.props.onSubmit()
                        // debugger;

                        this.props.onSubmit(
                            e.target.title.value,
                            e.target.desc.value
                        )

                        alert('Submit!!!');

                    }.bind(this)}>


                    <p>
                        <input type="text" name="title" placeholder="title">
                        
                        </input>
                    </p>

                    <p>
                        <textarea name="desc" placeholder="description">

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

export default CreateContent;