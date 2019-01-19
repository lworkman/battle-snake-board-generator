import React, { Component, Ref } from 'react';
import logo from './logo.svg';
import './App.css';
import { IBoardState } from './types/IBoardState.interface';
import { Board } from './components/board';
import { ICoordinate } from './types/ICoordinate.type';
import { SnakeControl } from './components/SnakeControl/SnakeControl';
import { IBoardMove } from './types/IBoardMove';
import { TitledContainer } from './components/TitledContainer/TitledContainer';
import { BoardControls } from './components/BoardControls/BoardControls';
import { StyledButton } from './components/StyledButton/StyledButton';
import { generateColour, generateId } from './shared/utils';
import { TestSnake } from './components/TestSnake/TestSnake';
import { CenteredRow } from './components/CenteredRow/CenteredRow';
import { ColourSquare } from './components/ColourSquare/ColourSquare';

interface IAppState {
  id: string;
  height: string;
  width: string;
  food: ICoordinate[];
  snakes: {
    id: string;
    colour: string;
    body: ICoordinate[];
    health: string;
  }[];
  you: {
    colour: string;
    body: ICoordinate[];
    health: string;
    id: "you";
  };
  mode: "food" | "you" | "snake";
  chosenId: string;
  lastMove: string;
}

class App extends Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      id: generateId(),
      height: "15",
      width: "15",
      food: [],
      snakes: [],
      you: {
        colour: "#22aa34",
        body: [],
        health: "100",
        id: "you"
      },
      mode: "food",
      chosenId: "",
      lastMove: ""
    }
  }

  private findExistingCell = (id: string, x: number, y: number) => {
    const { food, you, snakes } = this.state;

    switch (id) {
      case "food":
        return {
          id: "food",
          index: food.findIndex(item => item.x === x && item.y === y)
        };
      case "you":
        return {
          id: "you",
          index: you.body.findIndex(item => item.x === x && item.y === y)
        };
      case undefined:
        return undefined;
      default:
        const snake = snakes.find(snake => snake.id === id);
        if (snake) {
          return {
            id: id,
            index: snake.body.findIndex(item => item.x === x && item.y === y)
          };
        }
    }
  }

  private checkIfCellConnected: (x: number, y: number, body: ICoordinate[]) => boolean = (x, y, body) => {
    return body.some(segment => (Math.abs(segment.x - x) === 1 && segment.y === y)|| (Math.abs(segment.y - y) === 1 && segment.x === x));
  }



  public selectCell = (x: number, y: number, id: string) => {

    const { mode, food, you, snakes, chosenId } = this.state;
    let existingIndex: {
      id: string;
      index: number;
    } | undefined = this.findExistingCell(id, x, y);

    if (existingIndex) {

      const foundId: string = existingIndex.id;

      switch (foundId) {
        case "food":
          food.splice(existingIndex.index, 1);
          break;
        case "you":
          you.body.splice(existingIndex.index);
          break;
        default:
          const matchingSnake = snakes.find(snake => snake.id === foundId);
          if (matchingSnake) {
            matchingSnake.body.splice(existingIndex.index)
          }
          break;
      }
    }

    if (!existingIndex || (existingIndex.id !== mode && existingIndex.id !== chosenId)) {
      switch (mode) {
        case "food":
          food.push({ x, y });
          break;
        case "you":
          if (you.body.length === 0 || this.checkIfCellConnected(x, y, you.body)) {
            you.body.unshift({ x, y });
          }
          break;
        case "snake":
          const matchingSnake = snakes.find(snake => snake.id === chosenId);
          if (!matchingSnake) {
            return;
          }
          if (matchingSnake.body.length === 0 || this.checkIfCellConnected(x, y, matchingSnake.body)) {
            matchingSnake.body.unshift({ x, y });
          }
          break;
      }
    }

    this.setState({ mode, food, you, snakes, chosenId });
  }

  private buildBoardState: () => IBoardState = () => {
    return {
      game: {
        id: this.state.id
      },
      turn: 200,
      you: {
        health: parseInt(this.state.you.health, 10),
        id: "you",
        name: this.state.you.colour,
        body: this.state.you.body
      },
      board: {
        food: this.state.food,
        height: parseInt(this.state.height, 10),
        width: parseInt(this.state.width, 10),
        snakes: this.state.snakes.map(snake => ({
          health: parseInt(snake.health, 10),
          id: snake.id,
          name: snake.colour,
          body: snake.body
        }))
      }
    }
  }

  public addSnake = () => {
    const colour = generateColour();
    const { snakes } = this.state;
    snakes.push({
      body: [],
      colour: colour,
      health: "100",
      id: colour
    });

    this.setState({ snakes })
  }

  public selectSnake = (id: string) => {
    this.setState({
      mode: "snake",
      chosenId: id
    });
  }

  public selectFood = () => {
    this.setState({
      mode: "food",
      chosenId: ""
    });
  }

  public selectYou = () => {
    this.setState({
      mode: "you",
      chosenId: ""
    });
  }

  public changeSnakeHealth = (health: string, targetSnakeId: "you" | string) => {
    const { you, snakes } = this.state;

    if (targetSnakeId === "you") {
      you.health = health;
      this.setState({ you });
      return;
    } else {
      const targetSnake = snakes.find(snake => snake.id === targetSnakeId);
      if (targetSnake) {
        targetSnake.health = health;
        this.setState({ snakes });
      }
    }
  }

  public changeBoardHeight = (height: string) => this.setState({ height });

  public changeBoardWidth = (width: string) => this.setState({ width });

  render() {

    const { height, width, snakes, you, lastMove, food, mode, chosenId } = this.state;

    return (
      <div className="App">
        <div className="control-container">
          <TitledContainer title="You">
            <SnakeControl selectSnake={this.selectYou} colour={you.colour} health={you.health} changeHealth={(value) => this.changeSnakeHealth(value, "you")} />
          </TitledContainer>
          <TitledContainer title="Other Snakes">
            <div style={{ minHeight: "68px" }}>
              {snakes.map(snake =>
                <div key={snake.colour} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", margin: "5px" }}>
                  <SnakeControl selectSnake={() => this.selectSnake(snake.id)} colour={snake.colour} health={snake.health} title={snake.colour} changeHealth={(value) => this.changeSnakeHealth(value, snake.id)} />
                </div>
              )}
            </div>
            <StyledButton onClick={this.addSnake}>Add Snake</StyledButton>
          </TitledContainer>
          <TitledContainer title="Food">
            <CenteredRow>
              <StyledButton onClick={this.selectFood}>
                <ColourSquare colour="orange" />
              </StyledButton>
              <span>Food Count: {food.length}</span>
            </CenteredRow>
          </TitledContainer>
          <TitledContainer title="Board">
            <BoardControls
              boardState={this.buildBoardState()}
              changeHeight={this.changeBoardHeight}
              changeWidth={this.changeBoardWidth}
              height={height}
              width={width}
              uploadBoard={console.log}
            />
          </TitledContainer>
          <TestSnake boardState={this.buildBoardState()} />
          {lastMove}
        </div>
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <TitledContainer title="Current Mode">
            <div className="current-mode">
              <ColourSquare colour={mode === "food" ? "orange" : mode === "you" ? "#22aa34" : chosenId} />
              <span style={{ marginLeft: 10 }}>{mode !== "snake" ? mode : chosenId}</span>
            </div>
          </TitledContainer>
          <Board boardState={this.buildBoardState()} onChange={this.selectCell} />
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default App;
