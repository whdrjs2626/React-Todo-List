import React from 'react';
import './TodoListTemplate.css'

/*
    함수형 컴포넌트
    파라미터로는 원래 props를 받는데 {form, children} 형태로 받음 - 두가지 props를 받은 것
    children은 해당 템플릿 태그 내부 내용에 들어갈 것
    form은 input, button이 있는 컴포넌트를 렌더링할 때 사용할 것
*/
const TodoListTemplate = ({form, children}) => {
    return (
        <main className="todo-list-template">
            <div className="title">
                오늘 할 일
            </div>
            <section className="form-wrapper">
                {form}
            </section>
            <section className="todos-wrapper">
                {children}
            </section>
        </main>
    );
};

export default TodoListTemplate;