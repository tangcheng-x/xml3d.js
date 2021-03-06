(function() {

//----------------------------------------------------------------------------------------------------------------------
// XML3D.base.Asset
//----------------------------------------------------------------------------------------------------------------------

function AssetError(message, node){
    this.message = message;
    this.node = node;
}

XML3D.base.Asset = function(refNode){
    this.srcAsset = null;
    this.children = [];
    this.pickFilter = null;
    this.assetResult = null;
    this.listener = [];
    this.loading = false;
    this.refNode = refNode || null;
};

XML3D.base.Asset.prototype.checkValidity = function(){
    if(this.isSubtreeLoading())
        return;
    checkRecursive(this);
}
function checkRecursive(asset){
    var parentNames;
    if(asset.srcAsset){
        parentNames = checkRecursive(asset.srcAsset);
    }
    var localNames = [];
    for(var i = 0; i < asset.children.length; ++i){
        var child = asset.children[i], name = child.name;
//        if(!name){
//            throw new AssetError("Child subdata without a name.", child.refNode);
//        }
        if(name && localNames.indexOf(name) != -1){
            throw new AssetError("Two subdata elements with the same name: '" + name + "'", child.refNode);
        }
        if(name) localNames.push(name);
    }
    var totalNames = localNames.slice();
    if(parentNames){
        Xflow.utils.setAdd(totalNames, parentNames);
    }
    for(var i = 0; i < asset.children.length; ++i){
        checkIncludes(asset.children[i], totalNames);
    }

    return totalNames;
}
function checkIncludes(subData, totalNames){
    if(!subData.includes)
        return;
    for(var i = 0; i < subData.includes.length; ++i){
        var inclName = subData.includes[i];
        if(totalNames.indexOf(inclName) == -1){
            throw new AssetError("Subdata '" + subData.name +
                 "' includes non existing subdata of name '" + inclName + "'", subData.refNode);
        }
    }
}


XML3D.base.Asset.prototype.setLoading = function(loading){
    if(loading != this.loading){
        this.loading = loading;
        invalidateAsset(this);
    }
}

XML3D.base.Asset.prototype.isSubtreeLoading = function(){
    if(this.loading)
        return true;
    if(this.srcAsset && this.srcAsset.isSubtreeLoading())
        return true;
    var i = this.children.length;
    while(i--){
        if(this.children[i].loading) return true;
    }
    return false;
}

XML3D.base.Asset.prototype.appendChild = function(child){
    this.children.push(child);
    child.assetParent = this;
    invalidateAsset(this);
}

XML3D.base.Asset.prototype.setPickFilter = function(pickFilter){
    this.pickFilter = pickFilter;
    invalidateAsset(this);
}

XML3D.base.Asset.prototype.setSrcAsset = function(asset){
    if(this.srcAsset)
        this.srcAsset.removeChangeListener(this);

    this.srcAsset = asset;

    if(this.srcAsset)
        this.srcAsset.addChangeListener(this);

    invalidateAsset(this);
}

XML3D.base.Asset.prototype.clearChildren = function(){
    var i = this.children.length;
    while(i--) this.children[i].assetParent = null
    this.children = [];
    invalidateAsset(this);
}

XML3D.base.Asset.prototype.addChangeListener = function(listener){
    Xflow.utils.setAdd(this.listener, listener);
}
XML3D.base.Asset.prototype.removeChangeListener = function(listener){
    Xflow.utils.setRemove(this.listener, listener);
}

XML3D.base.Asset.prototype.onAssetChange = function(){
    invalidateAsset(this);
}

XML3D.base.Asset.prototype.getResult = function(){
    if(!this.assetResult)
        this.assetResult = new XML3D.base.AssetResult(this);

    return this.assetResult;
}

function invalidateAsset(asset){
    if(asset.assetResult){
        asset.assetResult = null;
    }
    for(var i = 0; i < asset.listener.length; ++i){
        asset.listener[i].onAssetChange(this);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// XML3D.base.SubData
//----------------------------------------------------------------------------------------------------------------------

XML3D.base.SubData = function(xflowNodeOut, xflowNodeIn, refNode){
    this.xflowNodeOut = xflowNodeOut;
    this.xflowNodeIn = xflowNodeIn;
    this.refNode = refNode || null;
    this.name = null;
    this.postDataflow = null;
    this.postCompute = null;
    this.postFilter = null;
    this.includes = [];
    this.shader = null;
    this.transform = null;
    this.meshType = null;
    this.assetParent = null;
    this.loading = false;
};

XML3D.base.SubData.prototype.setLoading = function(loading){
    if(loading != this.loading){
        this.loading = loading;
        invalidateParent(this);
    }
}

XML3D.base.SubData.prototype.setName = function(name){
    this.name = name;
    invalidateParent(this);
}

XML3D.base.SubData.prototype.setPostDataflow = function(postDataflow){
    this.postDataflow = postDataflow;
    invalidateParent(this);
}

XML3D.base.SubData.prototype.setPostCompute = function(postCompute){
    this.postCompute = postCompute;
    invalidateParent(this);
}

XML3D.base.SubData.prototype.setPostFilter = function(postFilter){
    this.postFilter = postFilter;
    invalidateParent(this);
}

XML3D.base.SubData.prototype.setIncludes = function(includes){
    this.includes = includes;
    invalidateParent(this);
}

XML3D.base.SubData.prototype.setShader = function(shader){
    this.shader = shader;
    invalidateParent(this);
}

XML3D.base.SubData.prototype.setTransform = function(transform){
    this.transform = transform;
    invalidateParent(this);
}

XML3D.base.SubData.prototype.setMeshType = function(meshType){
    this.meshType = meshType;
    invalidateParent(this);
}

function invalidateParent(subData){
    if(subData.assetParent){
        invalidateAsset(subData.assetParent);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// XML3D.base.AssetResult
//----------------------------------------------------------------------------------------------------------------------

XML3D.base.AssetResult = function(asset){
    this.namedEntries = {};
    this.allEntries = [];
    this.pickFilter = null;
    constructAssetTable(this, asset);
}


XML3D.base.AssetResult.prototype.getMeshDataSets = function(){
    var result = [];

    for(var i = 0; i < this.allEntries.length; ++i){

        var entry = this.allEntries[i];
        if(entry.meshType && (!entry.name || !this.pickFilter || this.pickFilter.indexOf(entry.name) != -1) ){
            updateAccumulatedNode(this, entry);
            result.push({
                xflowNode: entry.accumulatedXflowNode,
                type: entry.meshType,
                shader: entry.shader,
                transform: entry.transform,
                refNode: entry.refNode
            });
        }
    }
    return result;
}

function updateAccumulatedNode(table, entry){
    if(!entry.outOfSync)
        return;

    if(entry.accumulatedXflowNode){
        entry.accumulatedXflowNode.clearChildren();
        entry.accumulatedXflowNode.setCompute("");
        entry.accumulatedXflowNode.setFilter("");
        entry.accumulatedXflowNode.dataflowNode = null;
        entry.accumulatedXflowNode.setLoading(false);
    }
    else{
        entry.accumulatedXflowNode = XML3D.data.xflowGraph.createDataNode(false);
    }

    var dataNode = entry.postQueue.length == 1 ? entry.accumulatedXflowNode : XML3D.data.xflowGraph.createDataNode(false);
    for(var i = 0; i < entry.includes.length; ++i){
        var addEntry = table.namedEntries[entry.includes[i]];
        updateAccumulatedNode(table, addEntry);
        dataNode.appendChild(addEntry.accumulatedXflowNode);
    }
    for(var i = 0; i < entry.postQueue.length; ++i){
        if(entry.postQueue[i].xflowNode)
            dataNode.appendChild(entry.postQueue[i].xflowNode);
    }
    var node = dataNode, parentNode = null;
    for(var i = 0; i < entry.postQueue.length; ++i){
        var postEntry = entry.postQueue[i];
        if(!node) node = (i == entry.postQueue.length - 1 ? entry.accumulatedXflowNode : XML3D.data.xflowGraph.createDataNode(false));
        node.setCompute(postEntry.compute);
        node.setFilter(postEntry.filter);
        node.dataflowNode = postEntry.dataflow;
        node.setLoading(postEntry.dataflowLoading);
        if(parentNode) node.appendChild(parentNode);
        parentNode = node;
        node = null;
    }
    entry.outOfSync = false;
}


function constructAssetTable(table, asset){
    var srcData = asset.srcAsset;
    var children = asset.children;
    if(srcData)
        copySrcTable(table, srcData.getResult(), asset.pickFilter);
    else
        table.pickFilter = asset.pickFilter;
    for(var i = 0; i < children.length; ++i){
        var child = children[i];
        var name = child.name;
        var entry;
        if(name){
            if(!table.namedEntries[name]){
                entry = new AssetTableEntry();
                table.namedEntries[name] = entry
                table.allEntries.push(entry);
            }
            else
                entry = table.namedEntries[name];
        }
        else{
            entry = new AssetTableEntry();
            table.allEntries.push(entry);
        }
        entry.pushPostEntry(child);

        entry.meshType = child.meshType || entry.meshType;
        if(child.shader) entry.shader = child.shader;
        if(child.transform) entry.transform = child.transform;  // TODO: Better accumulate?
    }
}

function copySrcTable(table, srcTable, pickFilter){
    var i = srcTable.allEntries.length;
    while(i--){
        var newEntry = new AssetTableEntry(srcTable.allEntries[i]);
        table.allEntries.push(newEntry);
        if(newEntry.name) table.namedEntries[newEntry.name] = newEntry;
    }
    if(pickFilter && srcTable.pickFilter){
        table.pickFilter = [];
        var i = pickFilter.length;
        while(i--){
            if(srcTable.pickFilter.indexOf(pickFilter[i]) != -1)
                table.pickFilter.push(pickFilter[i]);
        }
    }
    else{
        table.pickFilter = pickFilter || srcTable.pickFilter;
    }
}


function AssetTableEntry (srcEntry){
    this.name = srcEntry && srcEntry.name;
    this.meshType = srcEntry && srcEntry.meshType || null;

    this.includes = srcEntry && srcEntry.includes.slice(0) || [];
    this.postQueue = srcEntry && srcEntry.postQueue.slice(0) || [];
    this.shader = srcEntry && srcEntry.shader || null;
    this.transform = srcEntry && srcEntry.transform || null;

    this.accumulatedXflowNode = null;
    this.outOfSync = true;
    this.refNode = null;

}

AssetTableEntry.prototype.pushPostEntry = function(subData){
    this.name = subData.name;
    this.postQueue.push({
        dataflow: subData.postDataflow,
        dataflowLoading: subData.loading,
        compute: subData.postCompute,
        filter: subData.postFilter,
        xflowNode: subData.xflowNodeIn
    });
    this.refNode = subData.refNode;
    this.accumulatedXflowNode = subData.xflowNodeOut;
    Xflow.utils.setAdd(this.includes, subData.includes);
}




}());