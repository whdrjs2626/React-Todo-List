import React, { Component } from 'react';
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";
import Palette from "./components/Palette";


class App extends Component {

    id = 3 // todo 객체들을 구분하기 위한 고유 번호 / 데이터가 추가될 떄마다 1씩 증가

    colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'] // Palette의 자식인 Color 컴포넌트의 색상으로 지정하기 위한 color 리스트

    state = {
        input: '', // 현재 Form의 input에 작성되어 있는 값
        todos: [
            { id: 0, text: ' 리액트 소개', checked: false, color: '#343a40' },
            { id: 1, text: ' 리액트 소개', checked: true, color: '#343a40' },
            { id: 2, text: ' 리액트 소개', checked: false, color: '#343a40' }
        ],
        now_color: '#343a40' // 현재 Palette에서 지정된 색상
    }

    handleChange = (e) => { // Form 컴포넌트의 input의 내용 변경 이벤트 핸들러
        this.setState({
            input: e.target.value // input에 작성된 value값
        })
    }

    handleCreate = () => { // Form 컴포넌트의 추가 버튼 클릭 이벤트 핸들러
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
            })
        });
    }

    handleKeyPress = (e) => { // Form 컴포넌트의 input에서 Enter 키를 누르는 이벤트 핸들러
        // Enter 키를 누른 경우 추가 버튼을 누른 것과 같은 로직을 수행하게 됨
        if(e.key === 'Enter') {
          this.handleCreate();
        }
    }

    handleToggle = (id) => { // TodoItem 컴포넌트의 클릭 이벤트 핸들러 - todos state의 요소들의 checked값을 설정 / 해제함
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


        // 2번 방법 - slice 함수를 통해 리스트를 3등분함 / 시작 + 해당 id의 객체 + 끝 / 중간 객체만 변경
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

    handleRemove = (id) => { // TodoItem 컴포넌트의 remove 버튼 클릭 이벤트 핸들러
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id) // 파라미터로 받은 id를 갖고 있지 않는 배열을 새로 생성하여 todos에 저장
        });
    }

    handleColorChange = (color) => { // Color 컴포넌트의 클릭 이벤트 핸들러로서 클릭한 Color를 now_color로 지정
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

        return ( // 여러 자식 컴포넌트들을 App에 렌더링
            <TodoListTemplate palette = {(<Palette
                                         colors={colors}
                                         selected={now_color}
                                         onSelect={handleColorChange}/>)}
                              form = {(<Form
                                      value={input}
                                      onKeyPress={handleKeyPress}
                                      onChange={handleChange}
                                      onCreate={handleCreate}
                                      color={now_color}/>)}>
                <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
                {/* todos안의 객체들을 화면에 보여주기 위해 todos 배열을 컴포넌트 배열로 변환해야 함 - 일단 TodoItemList에 todos를 전달 */}
            </TodoListTemplate>
        )
    }
}



export default App;
