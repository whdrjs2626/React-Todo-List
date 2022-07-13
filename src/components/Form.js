import React from 'react';
import './Form.css';
/*
    Form 컴포넌트의 props
    value - input의 내용
    onCreate - 버튼 클릭 시 실행될 함수
    onChange - input의 내용이 변경될 때 실행되는 함수
    onKeyPress - input에서 키 입력 시 실행되는 함수 - Enter를 누르는 것이 onCreate를 누르는 것과 동일한 작업을 수행하게 하기 위함
*/
const Form = ({value, onChange, onCreate, onKeyPress, color}) => {
    return (
        <div className="form">
            <input value={value} onChange={onChange} onKeyPress={onKeyPress} style={{color: color}}/>
            <div className="create-button" onClick={onCreate}>
                추가
            </div>
        </div>
    );
};

export default Form;