import React, {Component} from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';


class BindTest extends Component {
  handleClick() {
    console.log(this)
  }
  
  render() {
    return (
      //같은 this인데 굳이 또 바인드를 해주는 이유가 뭘까요
      <button type="button" onClick = {this.handleClick.bind(this)}>
        Goodbye bind
      </button>
    )
  }
}

class WithoutBindTest extends Component {
  // handleClick() {
  //   console.log(this)
  // }
  //click, change등의 이벤트 리스너를 붙여줄때마다 bind()함수를 작성하는건 귀찮은 일입니다.
  //ES6의 화살표함수를 사용하면 이 문제를 간단히 해결할 수 있습니다.

  handleClick = () => {
    console.log(this)
    //이제는 this가 무엇인지 걱정할 필요가 없습니다. 화살표 함수의 this는 외부함수(부모함수)의
    //this를 상속받기 때문에 this는 항상 일정합니다.
  }
  render() {
    return (
      //컴포넌트의 render()함수가 실행되면 DOM이 그려질 것입니다.
      //이 떄 this는 WithoutBindTest객체를 가리키는 것이 맞습니다.
      //하지만 handleClick()함수가 호출 될 때의 this는 WithoutBindTest가 가 아닌 전역객체를
      //의미합니다.
      <button type="button" onClick={this.handleClick}>
        Goodbye bind without this
      </button>
    )
  }
}


//컴포넌트를 만드는 코드
//리엑트가 갖고 있는 Component라는 클래스를 상속한다.
class App extends Component {
  //react에서 Component를 생성할 때 state값을 초기화하거나 메서드를 바인딩 할떄 constructor()를 사용합니다.
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      //다음에는 크롬 개발자 도구에서 손으로 바꾸는 것이 아닌 버튼을 클릭했을 떄 자바스크립트
      //를 이용해 mode값을 바꾸는 방법을 알아볼 것이다.
      mode:'welcome',
      selected_content: 2,
      //외부에서 알 필요가 없는 정보들을 철저하게 숨기는 작업 state
      subject:{title:'WEB', sub:"World Wide Web!"},

      welcome:{title:'Welcome', desc:'Hello, React!!!'},

      contents:[
        {id:1, title:'HTML', desc:'HTML is HyperText'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  getReadContent() { //selected_content값에 있는 data를 return하는 함수이다.
    var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content) {
          return data;
        }
        i = i + 1;
      }
  }

  getContent() { //각각의 mode에 맞는 명령을 실행하는 함수이다.

    var _title, _desc, _article = null; //private

    //만약 this.state.mode가 'welcome'일 때 ReadContent의 속성값을 지정해 주고 이를 _article 변수에 지정한다.
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    //만약 this.state.mode가 'read'일 때 ReadContent의 속성 값을 getReadContent함수를 이용해서 받아온다.
    } else if(this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    //만약 this.state.nmode가 'create'라면 CreateContent 컴포넌트를 생성하고 콜백 함수로 onSubmit함수를 작성해준다.
    } else if(this.state.mode === 'create') {

      _article = <CreateContent onSubmit={function(_title, _desc) {
        // setState를 통해서 새로운 contents값을 추가하면 된다.
        this.max_content_id = this.max_content_id + 1;
        //만약 이렇게 하게 된다면 newProps 와 newState의 값이 같이지게 된다(원본 데이터를 바꾸므로)
        //유지 보수가 매우 어려워지게 된다.
        // this.state.contents.push(
        //   {id: this.max_content_id, title: _title, desc: _desc}
        // );
        //원본 데이터를 변경하지 않고 concat로 하는게 더 현명하다.
        // var _contents = this.state.contents.concat(
        //   {id: this.max_content_id, title: _title, desc: _desc}
        // );

        //아예 원본과는 다른 newContents라는 배열을 만든것이다.
        var newContents = Array.from(this.state.contents);


        //새로운 배열에 id에는 1증가 시켜준 max_content_id의 값을 넣어주고 title, desc에는 onSubmit콜백에서 받은 속성들을 넣어주면 된다.
        newContents.push(
          {id: this.max_content_id, title: _title, desc: _desc}
        )

        this.setState({
          contents: newContents,
          mode: 'read',
          selected_content: this.max_content_id
        });

        console.log(_title, _desc);
      }.bind(this)}></CreateContent>

    
    //만약 this.state.mode 가 'update'라면 UpdateContent 컴포넌트를 작성해 준다.
    } else if(this.state.mode === 'update') {

      _content = this.getReadContent();
      //seletect_content에 해당되는 내용을 _content에 저장한다.
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc) {

          // setState를 통해서 새로운 contents값을 추가하면 된다.
          //만약 이렇게 하게 된다면 newProps 와 newState의 값이 같이지게 된다(원본 데이터를 바꾸므로)
          //유지 보수가 매우 어려워지게 된다.
          // this.state.contents.push(
          //   {id: this.max_content_id, title: _title, desc: _desc}
          // );
          //원본 데이터를 변경하지 않고 concat로 하는게 더 현명하다.
          // var _contents = this.state.contents.concat(
          //   {id: this.max_content_id, title: _title, desc: _desc}
          // );
          // var newContents = Array.from(this.state.contents);
          // newContents.push(
          //   {id: this.max_content_id, title: _title, desc: _desc}
          // )

          //원본을 바꾸지 않는 technic입니다.
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id: _id, title: _title, desc: _desc};
              break;
            }
            i = i + 1
          }

          this.setState({
            contents: _contents,
            mode: 'read'
          });

      }.bind(this)}></UpdateContent>
    }
    return _article;
  }


  render() {
    console.log('App render');

    console.log("render", this);
    return (
      <div className="App">
      
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          //props형태로 들어간다.
          onChangePage={function(){
            alert('hihihi');
            this.setState({mode:'welcome'});
          }.bind(this)}>
        </Subject>



        <TOC onChangePage={function(id){
            alert('hi');
            this.setState({
              mode:'read',
              selected_content:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
          >
        </TOC>





        <Control onChangeMode = {function(_mode) {
          if(_mode === 'delete') {
            if(window.confirm('really?')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length) {
                if(_contents[i].id === this.state.selected_content) {
                  _contents.splice(i, 1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode: 'welcome',
                contents: _contents
              });
              alert('deleted!');
            }
          } else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}></Control>





        {this.getContent()}




        {/* <BindTest></BindTest>
        <WithoutBindTest></WithoutBindTest> */}
      </div>
    );
  }
}



export default App;
