/* eslint-disable react/prop-types */
import { useState } from "react";
import "./color-picker.css";
function ColorPicker({ setColor }) {
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];
  const [selectedColor, setSelectedColor] = useState(null);
  // console.log(selectedColor);
  return (
    <div>
      <>
        <div>
          <div className="color-picker">
            <label> Choose Color</label>
            <div className="colors">
              {colors.map((color) => (
                <div
                  key={color}
                  className="color"
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? "2px solid #000" : "none",
                  }}
                  onClick={() => {
                    setSelectedColor(color);
                    setColor(color);
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default ColorPicker;
