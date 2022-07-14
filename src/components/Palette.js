import './Palette.css';
import React, { Component } from 'react';

class Color extends Component { // 색상 지정을 위한 Color 컴포넌트
    render() {
        const { color, active, onClick } = this.props; // 부모 컴포넌트인 Palette에게 받은 props를 비구조화 할당
        return (
            <div className={active ? "color active" : "color"} onClick={onClick} style={{backgroundColor: color}}></div>
        )
    }
}


class Palette extends Component { // Color 컴포넌트 리스트를 담기 위한 Palette 컴포넌트
    render() {
        const { colors, selected, onSelect  } = this.props; // 부모로부터 받은 props를 비구조화 할당
        const colorList = colors.map( // props로 받은 colors 리스트를 Color 컴포넌트 배열로 변환
            (color) => (
                <Color
                    color={color}
                    onClick={() => onSelect(color)}
                    active={selected===color} // 현재 선택한 색상과 같은 색상이면 true
                    key={color}
                />
            )
        )
        return (
            <div className="palette">
                {colorList}
            </div>
        )
    }
}

export default Palette;