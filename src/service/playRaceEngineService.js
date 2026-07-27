import chooseCharacter, { characters } from './chooseCharacterService.js';
import { colorizeCharacter } from './characterColorService.js';
import chalk from 'chalk';
import replayRaceEngine from './replayRaceEngineService.js';
import declareWinner from './declareWinnerService.js';

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
    const random = Math.random();
    if (random < 0.33) return 'RETA';
    if (random < 0.66) return 'CURVA';
    return 'CONFRONTO';
}

function logRollResult(characterName, block, diceResult, attributeValue) {
    console.log(`${colorizeCharacter(characterName)} rolou: ${diceResult} + ${attributeValue} = ${diceResult + attributeValue}`);
} 

async function playRaceEngine(character1 = null, character2 = null) {
    characters // Assuming characters is imported from chooseCharacterService.js
    let wins1 = 0;
    let wins2 = 0;

    if (!character1) character1 = await chooseCharacter(characters, 'Escolha o personagem 1');
    if (!character2) character2 = await chooseCharacter(characters, 'Escolha o personagem 2', character1);

    for (let round = 1; round <= 5; round++) {
        console.log(`\nRodada ${round}`);

        const block = getRandomBlock();
        console.log(`Bloco sorteado: ${chalk.blue(block)}`);

        const player1Roll = rollDice();
        const player2Roll = rollDice();

        console.log(`${colorizeCharacter(character1.name)} rolou: ${player1Roll}`);
        console.log(`${colorizeCharacter(character2.name)} rolou: ${player2Roll}`);

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === 'RETA') {
            totalTestSkill1 = player1Roll + (character1.speed ?? 0);
            totalTestSkill2 = player2Roll + (character2.speed ?? 0);

            logRollResult(character1.name, block, player1Roll, character1.speed ?? 0);
            logRollResult(character2.name, block, player2Roll, character2.speed ?? 0);
        } else if (block === 'CURVA') {
            totalTestSkill1 = player1Roll + (character1.maneuverability ?? 0);
            totalTestSkill2 = player2Roll + (character2.maneuverability ?? 0);

            logRollResult(character1.name, block, player1Roll, character1.maneuverability ?? 0);
            logRollResult(character2.name, block, player2Roll, character2.maneuverability ?? 0);
        } else if (block === 'CONFRONTO') {
            totalTestSkill1 = player1Roll + (character1.power ?? 0);
            totalTestSkill2 = player2Roll + (character2.power ?? 0);
            logRollResult(character1.name, block, player1Roll, character1.power ?? 0);
            logRollResult(character2.name, block, player2Roll, character2.power ?? 0);
        }

        console.log(`Resultado da rodada: ${colorizeCharacter(character1.name)} ${totalTestSkill1} x ${colorizeCharacter(character2.name)} ${totalTestSkill2}`);
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${colorizeCharacter(character1.name)} venceu a rodada!`);
            wins1 += 1;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${colorizeCharacter(character2.name)} venceu a rodada!`);
            wins2 += 1;
        } else {
            console.log('Empate na rodada!');
        }    
    }
    declareWinner(character1, character2, wins1, wins2);
    await replayRaceEngine();
}

export default playRaceEngine;
