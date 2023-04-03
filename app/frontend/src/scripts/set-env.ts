/* tslint:disable */
// @ts-nocheck
const {writeFile, existsSync, mkdirSync} = require('fs');
const {argv} = require('yargs');

require('dotenv').config({path: `./.env`});
const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent) {
    writeFile(targetPath, environmentFileContent, function (err) {
        if (err) {
            console.log(err);
        }
        if (environmentFileContent !== '') {
            console.log(`wrote variables to ${targetPath}`);
        }
    });
}

// Providing path to the `environments` directory
const envDirectory = './src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
    mkdirSync(envDirectory);
}

//creates the `environment.ts` file if it does not exist
writeFileUsingFS('./src/environments/environment.ts', '');
const targetPath = './src/environments/environment.ts';

// Checks whether command line argument of `prod` was provided signifying production mode
const isProduction = environment === 'prod';

console.log('building with environment == ', environment);

// get current package version
const appVersion = require('../../package.json').version;

console.log('building app version == ', appVersion);

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `// This file was autogenerated by dynamically running setEnv.ts and using dotenv for managing API key secrecy
  export const environment = {
    openAiApiKey: '${process.env.OPEN_AI_SECRET}',
    openAiCompletionUrl: '${process.env.OPEN_AI_COMPLETION_URL}',
    tmdbApiKey: '${process.env.TMDB_API_KEY}',
    appVersion: '${appVersion}',
    production: ${isProduction},
    apiUrl: '${process.env.API_URL}',
  };
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file

/* tslint:enable */
