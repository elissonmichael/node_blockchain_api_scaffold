/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class UserContract extends Contract {

    async userExists(ctx, userId) {
        const buffer = await ctx.stub.getState(userId);
        return (!!buffer && buffer.length > 0);
    }

    async createUser(ctx, userId, value) {
        const exists = await this.userExists(ctx, userId);
        if (exists) {
            throw new Error(`The user ${userId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(userId, buffer);
    }

    async readUser(ctx, userId) {
        const exists = await this.userExists(ctx, userId);
        if (!exists) {
            throw new Error(`The user ${userId} does not exist`);
        }
        const buffer = await ctx.stub.getState(userId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateUser(ctx, userId, newValue) {
        const exists = await this.userExists(ctx, userId);
        if (!exists) {
            throw new Error(`The user ${userId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(userId, buffer);
    }

    async deleteUser(ctx, userId) {
        const exists = await this.userExists(ctx, userId);
        if (!exists) {
            throw new Error(`The user ${userId} does not exist`);
        }
        await ctx.stub.deleteState(userId);
    }

}

module.exports = UserContract;
