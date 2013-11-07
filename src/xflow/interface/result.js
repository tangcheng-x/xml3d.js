(function(){
/**
 * Content of this file:
 * Result classes of an Xflow graph which are received through Requests.
 */

/**
 * Abstract Result structure containing a (processed) result of the Xflow graph.
 * @abstract
 * @param {Xflow.DataNode} dataNode
 * @param {Array.<string>} filter
 */
Xflow.Result = function(){
    this.loading = false;
    this.valid = false;
    this._listeners = [];
    this._requests = [];
};
var Result = Xflow.Result;

/**
 * @param {function(Xflow.Result, Xflow.RESULT_STATE)} callback
 */
Result.prototype.addListener = function(callback){
    this._listeners.push(callback);
};

/**
 * @param {function(Xflow.Result, Xflow.RESULT_STATE)} callback
 */
Result.prototype.removeListener = function(callback){
    Array.erase(this._listeners, callback);
};

/**
 * @param {function(Xflow.Result, Xflow.RESULT_STATE)} callback
 */
Result.prototype._addRequest = function(request){
    this._requests.push(request);
};

/**
 * @param {function(Xflow.Result, Xflow.RESULT_STATE)} callback
 */
Result.prototype._removeRequest = function(request){
    Array.erase(this._requests, request);
};


Result.prototype._notifyChanged = function(state){
    this.valid = false;
    for(var i = 0; i < this._requests.length; ++i){
        this._requests[i]._onResultChanged(state);
    }
    Xflow._listCallback(this, state);
}

Result.prototype._onListedCallback = function(state){
    for(var i = 0; i < this._listeners.length; ++i){
        this._listeners[i](this, state);
    }
}



/**
 * ComputeResult contains a named map of typed values.
 * @constructor
 * @extends {Xflow.Result}
 */
Xflow.ComputeResult = function(){
    Xflow.Result.call(this);
    this._outputNames = [];
    /** @type {Object.<string,DataEntry>} */
    this._dataEntries = {};
};
Xflow.createClass(Xflow.ComputeResult, Xflow.Result);
var ComputeResult = Xflow.ComputeResult;

Object.defineProperty(ComputeResult.prototype, "outputNames", {
    set: function(v){
        throw new Error("outputNames is readonly");
    },
    get: function(){ return this._outputNames; }
});

ComputeResult.prototype.getOutputData = function(name){
    return this._dataEntries[name];
};

/**
 * @returns {Object.<string,DataEntry>}
 */
ComputeResult.prototype.getOutputMap = function() {
    return this._dataEntries;
};



/**
 * VertexShaderResult is used to generate a VertexShader that includes dataflow processing
 * @constructor
 * @extends {Xflow.Result}
 */
Xflow.VSDataResult = function(){
    Xflow.Result.call(this);
    this._program = null;
    this._programData = null;
};
Xflow.createClass(Xflow.VSDataResult, Xflow.Result);
var VSDataResult = Xflow.VSDataResult;

Object.defineProperty(VSDataResult.prototype, "shaderOutputNames", {
    set: function(v){
        throw new Error("shaderOutputNames is readonly");
    },
    get: function(){ return this._programData.getFinalOutputNames(); }
});

VSDataResult.prototype.isOutputUniform = function(name){
    return this._program.isOutputUniform(name);
    if(this._programData.isFinalOutputProcessed(name))
        return false;
    var entry = this._programData.getFinalOutputDataEntry(name);
    if(!entry)
        return false;
    var iterateCount = entry.getIterateCount ? entry.getIterateCount() : 1
    return iterateCount == 1;
}
VSDataResult.prototype.isOutputNull = function(name){
    return this._program.isOutputNull(name);
}

VSDataResult.prototype.getVertexShader = function(vsConfig){
    return this._program.createVertexShader(this._programData, vsConfig);
}


})();
