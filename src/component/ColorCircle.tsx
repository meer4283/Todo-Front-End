import React from 'react'

const ColorCircle = ({index, color, selectedColor ="", onClick = () =>{} }:any) => {
    return (
        <div
            key={index}
            className={`w-2rem h-2rem rounded-full cursor-pointer bg-${color} ${selectedColor === color ? "border-2 border-white" : ""
                }`}
            onClick={onClick}
        ></div>
    )
}

export default ColorCircle