/* @flow */
'use strict';

import AbstractMethod from './AbstractMethod';
import * as UI from '../../constants/ui';
import { validateParams } from './helpers/paramsValidator';

import type { CoreMessage } from '../../types';

type Params = {
    flags: number,
}

export default class ApplyFlags extends AbstractMethod {
    params: Params;
    run: () => Promise<any>;

    constructor(message: CoreMessage) {
        super(message);
        this.useUi = false;
        const payload: Object = message.payload;

        validateParams(payload, [
            { name: 'flags', type: 'number', obligatory: true },
        ]);

        this.params = {
            flags: payload.flags,
        };
        this.allowDeviceMode.push(UI.BOOTLOADER);
    }

    async run(): Promise<Object> {
        return await this.device.getCommands().applyFlags(this.params);
    }
}
