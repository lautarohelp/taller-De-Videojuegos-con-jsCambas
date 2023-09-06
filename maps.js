/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '🧨',
    'I': '💰',
    'PLAYER': '🏃‍♂️',
    'PLAYER2':'🚶‍♂️',
    'PLAYER3':'👨‍🦽',
    'PLAYER4':'☠️',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
    'HEART': '❤️',
};

const maps = [];
    maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
`);
    maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
`);
    maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
`);
    maps.push(`
    OXXX---XXX
    -XX--X-XXX
    -X--X--XXX
    -X-XX-XXXX
    -X-XX--XXX
    -X-XXX-XXX
    -X--X--XXX
    -XX-X-XXXX
    -X--X--XXX
    ---XXX--IX
    `)
