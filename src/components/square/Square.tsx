import React from "react";
import './Square.css';
import {SquareValue} from "../../types/SquareValue";

interface SquareProps {
    value?: SquareValue,
    onSquareClick: () => void
}

export const Square = ({value, onSquareClick}: SquareProps) => {
    return <button className="Square" onClick={onSquareClick}>{ value }</button>
}