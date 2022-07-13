import React, { Component } from 'react';
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";
import Palette from "./components/Palette";


class App extends Component {

    id = 3 // todo 객체들을 구분하기 위한 고유 번호 / 데이터가 추가될 떄마다 1씩 증가

    colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6']

    state = {
        input: '',
        todos: [
            { id: 0, text: ' 리액트 소개', checked: false, color: '#343a40' },
            { id: 1, text: ' 리액트 소개', checked: true, color: '#343a40' },
            { id: 2, text: ' 리액트 소개', checked: false, color: '#343a40' }
        ],
        now_color: '#343a40'
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value // input에 작성된 value값
        })
    }

    handleCreate = () => {
        const { input, todos, now_color } = this.state;
        this.setState({
            input: '', // 등록 시 input을 비우기 위함
            // concat 을 사용하여 배열에 추가
            // 리액트 state에서 배열을 다룰 때 push 사용 금지
            // 배열.push()는 앞 배열과 똑같은 곳을 가리키는 배열을 리턴
            // 배열.concat()은 새로운 배열을 생성해 리턴하기 때문
            todos: todos.concat({ // todos에 원소 추가
                id: this.id++,
                text: input,
                checked: false,
                color: now_color
            }),
            now_color
        });
    }

    handleKeyPress = (e) => {
        // 눌려진 키가 Enter 면 handleCreate 호출
        if(e.key === 'Enter') {
          this.handleCreate();
        }
    }

    handleToggle = (id) => { // 체크하거나 푸는 함수
        const { todos } = this.state;

        // 파라미터로 받은 id를 통해 해당 id를 가진 todo가 todos에서 몇번째 아이템인지 찾음
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index]; // 해당 id를 가진 객체


        // 1번 방법 - 기존 값을 전체 복사 후 해당 id를 가진 객체만 수정하기
        const nextTodos = [...todos]; // 배열을 복사

        // 기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextTodos[index] = {
          ...selected, // 기존값 복사
          checked: !selected.checked // checked를 반대로 변환
        };

        this.setState({
          todos: nextTodos
        });


        // 2번 방법 - slice 함수를 통해 리스트를 3등분함 시작 + 해당 id의 객체 + 끝 / 중간 객체만 변경
        // this.setState({
        //     todos: [
        //         ...todos.slice(0, index), // 0 ~ index - 1
        //         {
        //             ...selected,
        //             checked: !selected.checked // index
        //         },
        //         ...todos.slice(index + 1, todos.length) // index + 1 ~ end
        //     ]
        // })
    }

    handleRemove = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id) // 파라미터로 받은 id를 갖고 있지 않는 배열을 새로 생성하여 todos에 저장
        });
    }

    handleColorChange = (color) => {
        this.setState({
            now_color: color
        })
    }

    render() {
        const { input, todos, now_color } = this.state;
        const { colors } = this;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove,
            handleColorChange
        } = this; // this.handleChange와 같이 this로 접근해야 하는 작업 생략
        // this는 해당 컴포넌트를 의미한다. 즉 App
        return (
            <TodoListTemplate palette = {(<Palette colors={colors} selected={now_color} onSelect={handleColorChange}/>)}
                              form={(<Form
                                      value={input}
                                      onKeyPress={handleKeyPress}
                                      onChange={handleChange}
                                      onCreate={handleCreate}
                                      color={now_color}/>)}>
                {/*
                    App에서 TodoListTemplate 컴포넌틀를 불러와서 사용
                    Form 컴포넌트를 App에 렌더링
                */}
                <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
                {/* todos안의 객체들을 화면에 보여주기 위해 todos 배열을 컴포넌트 배열로 변환해야 함 - 일단 TodoItemList에 todos를 전달 */}
            </TodoListTemplate>
        )
    }
}



export default App;
