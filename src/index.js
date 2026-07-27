import fs from 'fs';
import playRaceEngine from './service/playRaceEngineService.js';
import chalk from 'chalk';

const characters = JSON.parse(
    fs.readFileSync(new URL('./data/characters.json', import.meta.url), 'utf-8')
);

(async function main() {
    console.log(`Welcome to the Mario Kart Simulator!\n` + `Available characters: ${characters.map(c => c.name).join(', ')}`);
    console.log(`\nInstructions: The game consists of 5 rounds.\nIn each round, a random block will be selected: ${chalk.blue('STRAIGHT')}, ${chalk.yellow('CURVE')}, or ${chalk.red('CONFRONTATION')}.\nEach player will roll a dice and add their character's attribute value based on the block type.\nThe player with the highest total wins the round.\n`);
    await playRaceEngine();
})();