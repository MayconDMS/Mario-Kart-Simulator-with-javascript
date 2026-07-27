import chalk from "chalk";

const characterColors = {
    "Mario": chalk.red,
    "Luigi": chalk.green,
    "Peach": chalk.magenta,
    "Bowser": chalk.yellow,
    "Yoshi": chalk.greenBright,
    "Toad": chalk.blue,
    "Donkey Kong": chalk.hex("#8B4513")
};

export function colorizeCharacter(name) {
    return (characterColors[name] || chalk.white)(name);
}