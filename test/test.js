const abc  =require('./a');
const chai = require('chai');
const assert = chai.assert;

describe('Test1', () => {
    it('Equal', () => {
        assert.equal(abc(30), 30)
    })
    
})