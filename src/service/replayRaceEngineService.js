import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import chalk from 'chalk';
import playRaceEngine from './playRaceEngineService.js';


async function replayRaceEngine() {
    const rl = readline.createInterface({ input, output });
    try {
        while (true) {
            const answer = await rl.question('Deseja jogar novamente? (Responda com ' + chalk.green('Sim') + ' ou ' + chalk.red('Não') + '): ');
            if (answer.toLowerCase() === 'sim' || answer.toLowerCase() === 's') {
                await playRaceEngine();
                rl.close();
                return true;
            } else if (answer.toLowerCase() === 'não' || answer.toLowerCase() === 'nao' || answer.toLowerCase() === 'n') {
                console.log('Obrigado por jogar! Até a próxima!');
                rl.close();
                return false;
            } else {
                console.log('Entrada inválida. Por favor, digite Sim ou Não');
            }
        }
    } catch (error) {
        rl.close();
        throw error;
    }
}

export default replayRaceEngine;