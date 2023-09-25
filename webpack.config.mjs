/*!
 * @license
 * Copyright (C) 2023 Michael L Haufe
 * SPDX-License-Identifier: AGPL-3.0-only
 * @see <https://spdx.org/licenses/AGPL-3.0-only.html>
 */

import path from 'path';
import url from 'url';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';

const __filename = url.fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename);

export default {
    devtool: 'source-map',
    entry: {
        main: './src/index.mts',
        agents: './src/agents/index.mts'
    },
    experiments: {
        outputModule: true
    },
    mode: 'production',
    module: {
        rules: [
            { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    resolve: {
        extensions: ['.mts', '.mjs', '.js', '.ts', '.json'],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
        }
    },
    output: {
        clean: true,
        library: {
            type: 'module'
        },
        module: true,
        filename: ({ chunk }) => {
            switch (chunk.name) {
                case 'main': return 'index.mjs';
                case 'agents': return 'agents/index.mjs';
            }
        },
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new ESLintWebpackPlugin({
            extensions: ['.mts', '.mjs', '.js', '.ts', '.json'],
            exclude: ['node_modules', 'dist', 'coverage'],
            fix: true,
            overrideConfigFile: path.resolve(__dirname, '.eslintrc.json')
        })
    ]
};
