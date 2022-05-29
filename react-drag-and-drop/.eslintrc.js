module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: '12',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    '@typescript-eslint',
    "unused-imports" //追加 使っていないimportを自動で削除
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-use-before-define': 'off', // 関数や変数が定義される前に使われているとエラーになるデフォルトの機能をoff
    '@typescript-eslint/no-use-before-define': 'off',  
    'import/prefer-default-export': 'off', // named exportがエラーになるので使えるようにoff
    '@typescript-eslint/no-unused-vars': 'off', // unused-importsを使うため削除
    'unused-imports/no-unused-imports': 'error', // 不要なimportの削除
    'unused-imports/no-unused-vars': [ // unused-importsでno-unused-varsのルールを再定義
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    "react/function-component-definition": [ // アロー関数以外受け付けない設定
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    'no-param-reassign': [ // パラメーターのプロパティ変更を許可
      2,
      { props: false }
    ],
    'import/extensions': [ // importのときに以下の拡張子を記述しなくてもエラーにしない
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [ // jsx形式のファイル拡張子をjsxもしくはtsxに限定
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/react-in-jsx-scope': 'off', // import React from 'react'が無くてもエラーを無くす
    'react/prop-types': 'off', // TypeScriptでチェックしているから不要。offにする
    'no-void': [ // void演算子の許可
      'error',
      {
        allowAsStatement: true,  
      },
    ],
  },
  settings: {
    'import/resolver': { //importするファイルをjsだけではなく、tsを含むファイルを許可する
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
