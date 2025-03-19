"use client"; 
import Image from "next/image";
import react, { useState, useEffect } from "react";

function Square(props) {
  return (
    <div
      style={{
        height:'100px',
        width:'100px',
        backgroundColor:'grey',
        border: 'solid black',
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: '100px',
        fontSize: '30px'
      }}
      onClick={() => {
        props.onClick(props.row, props.col)
      }} 
    >
      {props.value}
    </div>
  )
}

export default function Home() {
  const [ currentTurn, setCurrenTurn ] = useState('X');
  const [ squareValue, setSquareValue ] = useState('');
  const [ winner, setWinner ] = useState('');

  let initiainze = () => {
    let copy = [];
    for (let row = 0; row < 3; row++) {
      copy[row] = [];
      for (let col = 0; col < 3; col++) {
        copy[row][col] = '';
      }
    }
    setSquareValue(copy);
    setWinner('');
    setCurrenTurn('X');
  }

  useEffect (() => {
    initiainze();
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  let isWinner = (row, col) => {
    let i = 0;
    while (i < 3) {
      if (squareValue[row][i] == currentTurn) {
        i++;
        continue;
      }
      break;
    }
    if (i == 3) {
      return true;
    }
    let j = 0;
    while (j < 3) {
      if (squareValue[j][col] == currentTurn) {
        j++;
        continue;
      }
      break;
    }
    if (j == 3) {
      return true;
    }

    if (row == col) {
      i = 0; j = 0;
        while ( i < 3 && j < 3) {
          if (squareValue[i][j] == currentTurn ) {
            i++;
            j++;
            continue;
          }
          break;
        }
        if (i == 3 && j ==3) {
          return true;
        }
      }
      return false;
  }

  let onSquareClick = (row, col) => {
    let copy = [...squareValue];
    copy[row][col] = currentTurn;
    setSquareValue(copy);
    if (isWinner(row, col)) {
      setWinner(currentTurn);
      return;
    }
    if (currentTurn == 'X') {
      setCurrenTurn('O');
    } else {
      setCurrenTurn('X');
    }
  }
  return (
    <main className="flex flex-col items-center justify-between p-24">
      {winner && <div>Winner : {winner} </div>}
      <div>
        <h1> Next Turn : { currentTurn } </h1>
      </div>
      <div>
        <button onClick={() => initiainze()}>Reset </button>
      </div>
      <div>
        {
          [0, 1, 2].map((index) => {
            return (
              <div style={{display: 'flex'}} key={index}>
                <Square value={squareValue[index]?.[0]} row={index} col={0} onClick={onSquareClick} />
                <Square value={squareValue[index]?.[1]} row={index} col={1} onClick={onSquareClick} />
                <Square value={squareValue[index]?.[2]} row={index} col={2} onClick={onSquareClick} />
              </div>
            )
          }) 
        }
      </div>
    </main>
  );
}
