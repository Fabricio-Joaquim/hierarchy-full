import * as fs from 'fs';
import * as path from 'path';

interface Dictionary {
    [key: string]: Dictionary | {};
}

function loadDictionary(filePath: string): Dictionary {
    const fullPath = path.resolve(__dirname, filePath);
    const data = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(data);
}

function countMatchesAtDepth(tree: Dictionary, words: string[], depth: number): Map<string, { value: number, overDepth: boolean }> {
    const matchCount = new Map<string, { value: number, overDepth: boolean }>();

    function traverse(node: Dictionary, currentDepth: number, parentKey: string = '') {
        if (currentDepth === depth) {
            for (const key in node) {
                if (node.hasOwnProperty(key)) {
                    const normalizedKey = key.toLowerCase();
                    if (words.includes(normalizedKey)) {
                        if (parentKey === '') return; // Evita processamento desnecessário
                        const currentCount = matchCount.get(parentKey) ?? { value: 0, overDepth: false };
                        matchCount.set(parentKey, { value: currentCount.value + 1, overDepth: false });
                    } else if (typeof node[key] === 'object') {
                        traverse(node[key] as Dictionary, currentDepth + 1, key);
                    }
                }
            }
        } else if (typeof node === 'object') {
            for (const key in node) {
                if (node.hasOwnProperty(key)) {
                    traverse(node[key] as Dictionary, currentDepth + 1, key);
                }
            }
        }

        if (currentDepth === depth) {
            for (const key in node) {
                if (node.hasOwnProperty(key)) {
                    const existChild = words.filter(word => JSON.stringify(node[key]).toLocaleLowerCase().includes(word))

                    if (existChild.length > 0) {
                        const currentCount = matchCount.get(parentKey) || { value: 0, overDepth: false };
                        matchCount.set(parentKey, { value: currentCount.value + 1, overDepth: true });
                    }
                }
            }
        }
    }

    traverse(tree, 0);
    return matchCount;
}

function formatOutput(matchCount: Map<string, { value: number, overDepth: boolean }>): string {
    const entries = Array.from(matchCount.entries());
    if (entries.length === 0) {
        return "0;";
    }

    const outputoverDepthFlexGeneric = (category: string, count: { value: number, overDepth: boolean }) => `${category} = ${count.value} ${count.overDepth ? `(Uma ${category.slice(0, -1)} foi mencionada)` : ''}`
    const output = (category: string, count: { value: number, overDepth: boolean }) => `${category} = ${count.value}`

    return entries.map(([category, count]) => count.overDepth ? outputoverDepthFlexGeneric(category, count) : output(category, count)).join('; ') + ';';
}

function analyzePhrase(phrase: string, depth: number, verbose: boolean) {
    const startLoadTime = Date.now();
    const dictionary = loadDictionary('./dicts/words.json');
    const loadTime = Date.now() - startLoadTime;

    const startCheckTime = Date.now();

    const normalizedPhrase = phrase.toLowerCase().split(/\s+/)
    const words = normalizedPhrase.filter(word => word.length > 3 && JSON.stringify(dictionary).toLocaleLowerCase().includes(word))

    const matchCount = countMatchesAtDepth(dictionary, words, depth);
    const checkTime = Date.now() - startCheckTime;

    if (verbose) {
        console.log(`Tempo de carregamento dos parâmetros: ${loadTime} ms`);
        console.log(`Tempo de verificação da frase: ${checkTime} ms`);
    }

    console.log(formatOutput(matchCount));
}

(function () {
    const args = process.argv.slice(2);
    let depth = 0;
    let verbose = false;
    let phrase = '';

    for (let i = 0; i < args.length; i++) {

        switch (args[i]) {
            case '--depth':
                depth = parseInt(args[++i]);
                break;
            case '--verbose':
                verbose = true;
                break;
            case 'analyze':
                break;
            default:
                phrase += (phrase ? ' ' : '') + args[i];
        }
    }

    if (depth < 0) {
        console.error('A profundidade deve ser um número não negativo.');
        process.exit(1);
    }

    phrase = phrase.replace(/^"|"$/g, '');
    analyzePhrase(phrase, depth, verbose);
})()

