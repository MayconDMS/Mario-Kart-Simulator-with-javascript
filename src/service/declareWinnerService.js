import { colorizeCharacter } from './characterColorService.js';

function declareWinner(character1, character2, wins1, wins2) {
    console.log("================================");
    console.log(`Placar final: ${colorizeCharacter(character1.name)} ${wins1} x ${colorizeCharacter(character2.name)} ${wins2}`);
    console.log("================================");
    if (wins1 > wins2) {
            console.log(`\n${colorizeCharacter(character1.name)} venceu a corrida com ${wins1} vitórias!`);
        } else if (wins2 > wins1) {
            console.log(`\n${colorizeCharacter(character2.name)} venceu a corrida com ${wins2} vitórias!`);
        } else {
            console.log('\nA corrida terminou em empate!');
    }
}

export default declareWinner;