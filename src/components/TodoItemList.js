import React, { Component } from 'react';
import TodoItem from './TodoItem'

/*
    이 컴포넌트는 3가지 props를 받는다
    todos - t o d o 객체들이 들어있는 배열
    onToggle - 체크박스 ON/OFF
    onRemove - 아이템 삭제 함수
 */
class TodoItemList extends Component {
    render() {
        const { todos, onToggle, onRemove } = this.props;

        return (
            <div>
                <TodoItem text="안녕" />
                <TodoItem text="리액트" />
                <TodoItem text="반가워" />
            </div>
        );
    }
}

export default TodoItemList;