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
  };
  mode: "food" | "you" | "snake";
  chosenId: string;
  lastMove: string;
}

class App extends Component<{}, IAppState> {

  public boardState: IBoardState = { "game": { "id": "53ce0e07-b7e1-4266-a71f-0cb00584f622" }, "turn": 0, "board": { "height": 15, "width": 15, "food": [{ "x": 12, "y": 0 }, { "x": 1, "y": 8 }, { "x": 6, "y": 10 }, { "x": 3, "y": 3 }, { "x": 11, "y": 12 }, { "x": 13, "y": 3 }, { "x": 8, "y": 13 }, { "x": 9, "y": 5 }, { "x": 9, "y": 7 }, { "x": 13, "y": 0 }], "snakes": [{ "id": "903e51d9-2861-43d9-94ce-08def08b2438", "name": "test", "health": 100, "body": [{ "x": 2, "y": 12 }, { "x": 2, "y": 12 }, { "x": 2, "y": 12 }] }, { "id": "2832cebd-1da0-4e90-a005-580bf4f5a5a2", "name": "test", "health": 100, "body": [{ "x": 5, "y": 6 }, { "x": 5, "y": 6 }, { "x": 5, "y": 6 }] }, { "id": "3fe73b73-bd25-49f8-9bf4-f3e570f466ce", "name": "test", "health": 100, "body": [{ "x": 8, "y": 10 }, { "x": 8, "y": 10 }, { "x": 8, "y": 10 }] }, { "id": "d97d8f6a-d813-4a26-b4d2-f76862c6b3fa", "name": "test", "health": 100, "body": [{ "x": 12, "y": 5 }, { "x": 12, "y": 5 }, { "x": 12, "y": 5 }] }] }, "you": { "id": "d97d8f6a-d813-4a26-b4d2-f76862c6b3fa", "name": "test", "health": 100, "body": [{ "x": 12, "y": 5 }, { "x": 12, "y": 5 }, { "x": 12, "y": 5 }] } };
  public textAreaRef: HTMLTextAreaElement | null = null;

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
        health: "100"
      },
      mode: "food",
      chosenId: "",
      lastMove: ""
    }
  }

  selectCell = (x: number, y: number) => {

    const { mode, food, you, snakes, chosenId } = this.state;
    let existingIndex: number;

    switch (mode) {
      case "food":
        existingIndex = food.findIndex(coor => coor.x === x && coor.y === y);
        if (existingIndex !== -1) {
          food.splice(existingIndex, 1);
        } else {
          food.push({ x, y });
        }
        break;
      case "you":
        existingIndex = you.body.findIndex(coor => coor.x === x && coor.y === y);
        if (existingIndex !== -1) {
          you.body.splice(existingIndex, 1);
        } else {
          you.body.unshift({ x, y });
        }
        break;
      case "snake":
        const matchingSnake = snakes.find(snake => snake.id === chosenId);
        if (!matchingSnake) {
          return;
        }
        existingIndex = matchingSnake.body.findIndex(coor => coor.x === x && coor.y === y);
        if (existingIndex !== -1) {
          matchingSnake.body.splice(existingIndex, 1);
        } else {
          matchingSnake.body.unshift({ x, y });
        }
        break;
    }

    this.setState({ mode, food, you, snakes, chosenId });
  }

  buildBoardState: () => IBoardState = () => {
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
  addSnake = () => {
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

  selectSnake = (id: string) => {
    this.setState({
      mode: "snake",
      chosenId: id
    });
  }

  selectFood = () => {
    this.setState({
      mode: "food"
    });
  }

  selectYou = () => {
    this.setState({
      mode: "you"
    });
  }

  uploadBoard = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (this.textAreaRef) {
      let boardValue: IBoardState;
      try {
        boardValue = JSON.parse(this.textAreaRef.value);
        this.setState({
          height: boardValue.board.height.toString(),
          width: boardValue.board.width.toString(),
          food: boardValue.board.food,
          snakes: boardValue.board.snakes.map(snake => {
            const colour = generateColour();
            return {
              id: colour,
              colour: colour,
              body: snake.body,
              health: snake.health.toString()
            }
          }),
          you: {
            colour: "#22aa34",
            body: boardValue.you.body,
            health: boardValue.you.health.toString()
          },
          mode: "food",
          chosenId: ""
        });
      } catch {
        return;
      }
    }
  }


  changeSnakeHealth = (health: string, targetSnakeId: "you" | string) => {
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

  changeBoardHeight = (height: string) => this.setState({ height });

  changeBoardWidth = (width: string) => this.setState({ width });

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
                <div className="colour-cell" style={{ backgroundColor: "orange" }}></div>
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
            <p className="current-mode">{mode !== "snake" ? mode : chosenId}</p>
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
