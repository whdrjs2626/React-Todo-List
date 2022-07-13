import React, { Component } from "react";
import './TodoItem.css';

/*
    TodoItem 컴포넌트가 받는 props
    text - todo내용
    checked - 체크박스 상태
    id = todo의 고유 번호
    onToggle - 체크박스를 키고 끄는 함수
    onRemove - 아이템을 삭제시키는 함수
*/
/*
    아래 코드를 보면 최상위 DOM객체의 클릭 이벤트엔 onToggle을
    remove엔 onRemove를 실행한다.
    근데 onRemove를 호출하기 전에 e.stopPropagation()을 호출한다.
    위 함수를 호출하지 않으면 클릭 시 해당 DOM의 부모의 클릭 이벤트에 연결된 onToggle도 실행됨 즉 onRemove > onToggle
    이것(이벤트의 확산)을 막는 것이 e.stopPropagation()
    즉 삭제 부분에 들어간 이벤트가 해당 부모의 이벤트까지 전달되지 않게 해준다.
*/
/*
    `todo-text ${checked && 'checked'}`
    "todo-text " + checked && 'checked'
    위 코드의 의미 checked가 true면 'checked'라는 문자열을 className으로 주겠다.
    단점 : checked가 false면 todo-text false와 같은 결과값이 나타남
    위 단점 보완 코드
    'todo-text %{ checked ? ' checked' : '' }'
*/
class TodoItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        /*
        해당 컴포넌트가 리렌더링(업데이트)되어야할 때는 checked값이 바뀔 때이다.
         */
        return this.props.checked !== nextProps.checked;
    }

    render() {
        const {text, checked, id, onToggle, onRemove, color} = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation() // onToggle이 실행되지 않도록 함
                    onRemove(id)}}>&times;</div>
                <div className={`todo-text ${checked && 'checked'}`}>
                    <div style={{color: color}}>{text}</div>
                </div>
                { checked && (<div className="check-mark">&#x2713;</div>) }
            </div>
        );
    }
}

export default TodoItem;