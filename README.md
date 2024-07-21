# Phaser Clicker Game

Welcome to the Phaser Clicker Game! This is an interactive clicker game built using the Phaser framework.

## Game Link

Play the game [here](https://phaser-clicker-game.vercel.app/).

## Features

- **Click Mechanics**: Click on the logo to earn points.
- **Interactive Buttons**: Includes Task, Friend, and Boost buttons.
- **Energy System**: Automatically regenerates energy over time.
- **Offline Recharge**: Energy recharges based on time elapsed since the last session.
- **Persistent State**: Game state is saved and loaded using `localStorage`.

## How to Play

1. **Click the Logo**: Each click costs 10 energy and rewards you with 10 points.
2. **Monitor Energy**: Energy will recover automatically over time.
3. **Use Buttons**: Click the Task, Friend, and Boost buttons for additional interactions (currently display alerts).

## Code Overview

### Key Functions

- **preload**: Loads assets required for the game.
- **create**: Sets up the game scene with the logo, score, energy displays, and interactive buttons.
- **setScore**: Initializes and displays the score.
- **setEnergy**: Initializes and displays the energy.
- **saveFile**: Saves the current game state to `localStorage`.
- **loadFile**: Loads the game state from `localStorage`.
- **updateScore**: Updates the score by a specified amount.
- **updateEnergy**: Updates the energy by a specified amount.
- **recoverEnergy**: Recovers energy every second up to the maximum limit.
- **calculateOfflineRecharge**: Applies energy recharge based on offline time.

### Assets

- **Logo**: Phaser logo.
- **Buttons**: Task, Friend, and Boost images.
- **Font**: Bitmap font used for displaying text.

## Installation and Setup

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/isonnymichael/phaser-clicker-game.git
    ```

2. **Navigate to the Project Directory**:
    ```sh
    cd phaser-clicker-game
    ```

3. **Play Locally**: Open `index.html` in your web browser or deploy to your preferred hosting service.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for enhancements, bug fixes, or new features.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Phaser](https://phaser.io/) - The fast, fun, and free HTML5 game framework.

Enjoy the game and happy clicking!
