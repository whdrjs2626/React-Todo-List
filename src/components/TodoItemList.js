import React, { Component } from 'react';
import TodoItem from './TodoItem'

/*
    TodoItem 컴포넌트 여러 개를 렌더링해주는 역할 수행
    리스트를 렌더링하는 경우 특히 보여주는 리스트가 동적인 경우 클래스형 컴포넌트가 적합하다. -> 성능 최적화에 용이하기 때문
    이 컴포넌트는 3가지 props를 받는다
    todos - todo 객체들이 들어있는 배열
    onToggle - 체크박스 ON/OFF
    onRemove - 아이템 삭제 함수
 */
class TodoItemList extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        /*
        해당 메소드는 컴포넌트 라이프 사이클 메소드 중 하나로 컴포넌트가 리렌더링 할지 말지를 결정함
        이게 구현되어 있지 않으면 언제나 true를 반환
        이를 구현하는 경우 업데이트에 영향을 끼치는 조건을 리턴하자
        현재 todos가 변경되면 리렌더링해야 하기 때문에 이를 비교하여 리턴한다.
        이를 통해 원래 글자 하나 입력할 때마다 렌더링 되었던 것을 처음에만 렌더링하게 한다.
         */
        return this.props.todos !== nextProps.todos;
    }

    render() {
        const { todos, onToggle, onRemove, color } = this.props;

        // 아래를 보면 map함수를 이용해 todos 객체 배열의 원소(객체)를 TodoItem 컴포넌트로 변경하여 todoList라는 TodoItem 컴포넌트 배열로 변환함
        const todoList = todos.map(
            ({id, text, checked}) => ( // 여기서 props로 전달하기 위해 비구조화 할당함
                <TodoItem
                    id={id}
                    text={text}
                    checked={checked}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id}
                    color={color}
                />
            )
        );

        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;