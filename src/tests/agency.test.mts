/*!
 * @license
 * Copyright (C) 2023 Michael L Haufe
 * SPDX-License-Identifier: AGPL-3.0-only
 * @see <https://spdx.org/licenses/AGPL-3.0-only.html>
 */

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import 'jsdom-global/register';
import { Heading } from '../agents/index.mjs';

describe('Heading', () => {
    test('foo', () => {
        const myHeading = new Heading({ text: 'Hello World', level: 1 });

        assert.equal(myHeading.text, 'Hello World');
        assert.equal(myHeading.level, 1);
    });
});