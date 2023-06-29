import './ColorPalette.css';

const colorList = [
    'rgb(235, 19, 19)',
    'rgb(233, 30, 99)',
    'rgb(103, 58, 183)',
    'rgb(0, 150, 136)',
    'rgb(76, 175, 80)',
    'rgb(0, 188, 212)',
    'rgb(255, 87, 34)',
    'rgb(96, 125, 139)',
    'rgb(121, 85, 72)'
];

const ColorPalette = props => {

    const getColorToSet = color => {
        props.handleSetColor(color);
    };

    return (
        <div className="color-palette__wrap">
            <div className="color-palette">
                {colorList.map((color, index) => (
                    <div className="color__wrap" key={index}>
                        <div className="color" style={{ background: color }} onClick={() => getColorToSet(color)}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorPalette;
