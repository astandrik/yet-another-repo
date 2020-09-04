import React from 'react';
import styled, { keyframes } from 'styled-components';

const COLOR_CHANGE_TIMEOUT = 10000;
const BLOCK_SIZE = 32;

class Background extends React.Component {
  private _generateBlocks = (): React.ReactNode[] => {
    const columns = Math.ceil(
      document.documentElement.clientWidth / BLOCK_SIZE,
    );
    const rows = Math.ceil(document.documentElement.clientHeight / BLOCK_SIZE);

    const blocks: React.ReactNode[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        blocks.push(<Block key={`${i}+${j}`} col={j} row={i} />);
      }
    }

    return blocks;
  };

  render() {
    return <Wrapper> {this._generateBlocks()} </Wrapper>;
  }
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

interface BlockProps {
  col: number;
  row: number;
}

const pulse = keyframes`
  0% {
    background-color: white;
  }
  50% {
    background-color: #FEE1C7;
  }
  100% {
    background-color: white;
  }
`;

const Block = styled.div.attrs<BlockProps>(props => ({
  style: {
    left: (props.col || 0) * BLOCK_SIZE,
    top: (props.row || 0) * BLOCK_SIZE,
    animationDelay: Math.random() * 10000 + 'ms',
  },
}))<BlockProps>`
  height: ${BLOCK_SIZE}px;
  width: ${BLOCK_SIZE}px;
  position: absolute;
  animation: ${pulse} ${COLOR_CHANGE_TIMEOUT}ms ease infinite;
`;

export default Background;
