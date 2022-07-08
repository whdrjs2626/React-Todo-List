import React, { Component } from 'react';
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";

class App extends Component {

    id = 3 // todo 객체들을 구분하기 위한 고유 번호 / 데이터가 추가될 떄마다 1씩 증가

    state = {
        input: '',
        todos: [
            { id: 0, text: ' 리액트 소개', checked: false },
            { id: 1, text: ' 리액트 소개', checked: true },
            { id: 2, text: ' 리액트 소개', checked: false }
        ]
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value // input이 바뀌게 될 값
        })
    }

    handleCreate = () => {
        const { input, todos } = this.state;
        this.setState({
            input: '', // 인풋 비우고
            // concat 을 사용하여 배열에 추가
            // 리액트 state에서 배열을 다룰 때 push 사용 금지
            // 배열.push()는 앞 배열과 똑같은 곳을 가리키는 배열을 리턴
            // 배열.concat()은 새로운 배열을 생성해 리턴하기 때문
            todos: todos.concat({
            id: this.id++,
            text: input,
            checked: false
            })
        });
    }

    handleKeyPress = (e) => {
        // 눌려진 키가 Enter 면 handleCreate 호출
        if(e.key === 'Enter') {
          this.handleCreate();
        }
    }

    render() {
        const { input } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress
        } = this; // this.handleChange와 같이 this로 접근해야 하는 작업 생략
        return (
            <TodoListTemplate form={(
                <Form
                    value={input}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                    onCreate={handleCreate}
                />
            )}>
                {/*
                    App에서 TodoListTemplate 컴포넌틀를 불러와서 사용
                    Form 컴포넌트를 App에 렌더링
                */}
                <TodoItemList/>
            </TodoListTemplate>
        )
    }
}



export default App;
