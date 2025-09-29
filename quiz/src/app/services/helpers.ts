import {keyword, rgb } from "color-convert";
import { KEYWORD, RGB } from "color-convert/conversions";
import namer from 'color-namer';
import { Question } from "../models/question.model";

export function randomNumber(min: number, max: number, includeMax = false): number {
    const range = includeMax ? max - min + 1 : max - min;
    return Math.floor(Math.random() * range) + min;
}

export function randomItem<T>(items: T[]): T {
    const index = randomNumber(0, items.length);
    return items[index];
}

export function randomItems<T>(items: T[], count: number): T[] {
    const res: T[] = [];

    while (res.length < count) {
        const newItem = randomItem(items);
        items = items.filter(i => i !== newItem);
        res.push(newItem);
    }

    return res;
}

const KNOWN_COLORS: KEYWORD[] = [
    'red', 
    'blue', 
    'green', 
    'yellow', 
    'orange', 
    'purple', 
    'magenta', 
    'cyan', 
    'gray', 
    'brown', 
    'teal', 
    'gold', 
    'lime', 
    'tomato'
];

export function addRgb(...rgbs: RGB[]): RGB {
    const res: RGB = [0, 0, 0];

    for (let index = 0; index < 3; index++) {
        const sum = rgbs.reduce((acc, c) => acc + c[index], 0)
        res[index] = Math.min(sum, 255);
    }

    return res;
}


export function randomColorQuestion() {
    const twoOrThree = randomNumber(2, 3, true);
    const colors = randomItems([...KNOWN_COLORS], twoOrThree) as [KEYWORD, KEYWORD] | [KEYWORD, KEYWORD, KEYWORD];
    const rgbs = colors.map(clr => keyword.rgb(clr));
    const added = addRgb(...rgbs);
    const addedHex = rgb.hex(added);

    const htmlCols = namer(addedHex).html;
    const names = htmlCols.map(n => n.name);
    const caser = caserMap();
    const name = names[0];

    const answers = [names[25], names[50], names[75], names[100]];
        
    const correctIndex = randomNumber(0, 4);
    answers[correctIndex] = name;

    const question: Question = {
        caption: colors.map(a => caser[a]) as Question['caption'],
        answers: answers.map(a => caser[a]), 
        correctIndex
    };
    return question;
}

export function randomColorQuiz() {
    return Array.from({
        length: randomNumber(6, 20), 
    }).map(_ => randomColorQuestion());
}

function splitCamelCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

const COLOR_DISPLAY_NAMES = getColorDisplayNameMap();

export function getColorDisplayNameMap() {
    const htmlColors = [
        "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure",
        "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue",
        "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse",
        "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson",
        "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray",
        "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen",
        "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen",
        "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet",
        "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue",
        "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro",
        "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey",
        "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed",
        "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush",
        "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan",
        "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink",
        "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey",
        "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen",
        "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid",
        "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise",
        "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin",
        "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab",
        "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen",
        "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru",
        "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple",
        "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon",
        "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver",
        "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow",
        "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle",
        "Tomato", "Turquoise", "Violet", "Wheat", "White",
        "WhiteSmoke", "Yellow", "YellowGreen", 
        "Question: What do you get when you add"
    ];

    return Object.fromEntries(htmlColors.map(clr => [clr.toLowerCase(), splitCamelCase(clr)]));    
}

function caserMap() {
    const res = getColorDisplayNameMap();
    const entries = Object.entries(res)
                .map(([key, value]) => [key, removeSpaces(value)])
    return Object.fromEntries(entries);
}

export function displayNameOfColor(color: string) {
    return COLOR_DISPLAY_NAMES[color.toLowerCase()];
}

export function removeSpaces(str: string) {
    return str.replace(/\s/g, '');
}