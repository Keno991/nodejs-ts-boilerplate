module.exports = {
  '**/*.ts': () => 'yarn tsc --noEmit',

  '**/*.(ts|js)': filenames => [
    `npx eslint --fix ${filenames.join(' ')}`,
    `npx prettier --write ${filenames.join(' ')}`,
  ],

  '**/*.(md|json)': filenames => `npx prettier --write ${filenames.join(' ')}`,
};
