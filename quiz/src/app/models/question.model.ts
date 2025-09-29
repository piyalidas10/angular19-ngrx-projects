export interface Question {
    readonly caption: [string, string] | [string, string, string];
    readonly answers: string[];
    readonly correctIndex: number;
}