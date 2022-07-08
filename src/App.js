import React, { Component } from 'react';
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";

class App extends Component {
    // test
    render() {
        return (
            <TodoListTemplate form={<Form/>}>
                {/*
                    App에서 TodoListTemplate 컴포넌틀를 불러와서 사용
                    Form 컴포넌트를 App에 렌더링
                */}
                TDL 템플릿 완성
            </TodoListTemplate>
        )
    }
}



export default App;
