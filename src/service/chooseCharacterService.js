import fs from 'fs';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

export const characters = JSON.parse(
    fs.readFileSync(new URL('../data/characters.json', import.meta.url), 'utf-8')
);

async function chooseCharacter(characters, promptText = 'Escolha o personagem: ', selectedCharacter = null) {
    const rl = readline.createInterface({ input, output });
    
    try{
        while (true) {
            const answer = await rl.question(`${promptText} (${characters.map(c => c.name).join('/')}): `);
            const normalizedAnswer = answer.trim().toLowerCase();
            if (!normalizedAnswer) {
                console.log('Erro: Entrada vazia. Por favor, selecione um personagem.');
                continue;
            }
            const found = characters.find(c => c.name.toLowerCase() === answer.trim().toLowerCase());
            if (!found) {
                console.log('Erro: Personagem inválido. Por favor, escolha um personagem válido.');
                continue;
            }
            if (selectedCharacter && found.name.toLowerCase() === selectedCharacter.name.toLowerCase()) {
                console.log('Erro: Personagem já selecionado. Por favor, escolha outro personagem.');
                continue;
            }
            rl.close();
            return found;
        }
    } finally {
        rl.close();
    }
}

export default chooseCharacter;