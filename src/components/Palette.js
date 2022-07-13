import './Palette.css';
import React, { Component } from 'react';

// const Color = ({ color, active, onClick }) => {
//     return (
//         <div className={`color ${active && 'active1'}`} style={{backgroundColor: color}} onClick={onClick} ></div>
//     );
// }
//
// const Palette = ({ colors, selected, onSelect }) => {
//     const colorList = colors.map(
//         (color) => (
//             <Color
//                 color={color}
//                 active={selected===color}
//                 onClick={() => onSelect(color)}
//                 key={color}
//             />
//         )
//     )
//     return (
//         <div className="palette">
//             {colorList}
//         </div>
//     );
// }

class Color extends Component {
    render() {
        const { color, active, onClick } = this.props;
        return (
            <div className={active ? "color active" : "color"} onClick={onClick} style={{backgroundColor: color}}></div>
        )
    }
}


class Palette extends Component {
    render() {
        const { colors, selected, onSelect  } = this.props;
        const colorList = colors.map(
            (color) => (
                <Color
                    color={color}
                    onClick={() => onSelect(color)}
                    active={selected===color}
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