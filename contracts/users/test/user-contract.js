/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { UserContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('UserContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new UserContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"user 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"user 1002 value"}'));
    });

    describe('#userExists', () => {

        it('should return true for a user', async () => {
            await contract.userExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a user that does not exist', async () => {
            await contract.userExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createUser', () => {

        it('should create a user', async () => {
            await contract.createUser(ctx, '1003', 'user 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"user 1003 value"}'));
        });

        it('should throw an error for a user that already exists', async () => {
            await contract.createUser(ctx, '1001', 'myvalue').should.be.rejectedWith(/The user 1001 already exists/);
        });

    });

    describe('#readUser', () => {

        it('should return a user', async () => {
            await contract.readUser(ctx, '1001').should.eventually.deep.equal({ value: 'user 1001 value' });
        });

        it('should throw an error for a user that does not exist', async () => {
            await contract.readUser(ctx, '1003').should.be.rejectedWith(/The user 1003 does not exist/);
        });

    });

    describe('#updateUser', () => {

        it('should update a user', async () => {
            await contract.updateUser(ctx, '1001', 'user 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"user 1001 new value"}'));
        });

        it('should throw an error for a user that does not exist', async () => {
            await contract.updateUser(ctx, '1003', 'user 1003 new value').should.be.rejectedWith(/The user 1003 does not exist/);
        });

    });

    describe('#deleteUser', () => {

        it('should delete a user', async () => {
            await contract.deleteUser(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a user that does not exist', async () => {
            await contract.deleteUser(ctx, '1003').should.be.rejectedWith(/The user 1003 does not exist/);
        });

    });

});