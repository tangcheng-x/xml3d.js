XML3D.xflow.register("skinPosition", {
    outputs: [{name: 'result', tupleSize: '3'}],
    params:  ['pos','boneIdx','boneWeight','boneXform'],
    evaluate: function(pos,boneIdx,boneWeight,boneXform) {
        var count = pos.length / 3;
        var result = new Float32Array(pos.length);

        var m = mat4.create();
        var r = vec3.create();
        var tmp =  vec3.create();

        for(var i = 0; i<count;i++) {
            var offset = i*3;
            r[0] = r[1] = r[2] = +0;
            for(var j = 0; j < 4; j++) {
                var weight = boneWeight[i*4+j];
                if (weight) {
                    var mo = boneIdx[i*4+j]*16;

                    mat4.multiplyOffsetVec3(boneXform, mo, pos, offset, tmp);
                    vec3.scale(tmp, weight);
                    vec3.add(r, tmp);
                }
            }
            result[offset] = r[0];
            result[offset+1] = r[1];
            result[offset+2] = r[2];
        }
        this.result = result;
        return true;
    },
    
    evaluate_parallel: function(pos, boneIndex, boneWeight, boneXform) {
        var elementalFunc = function(index, pos, boneIndex, boneWeight, boneXform) {
            var r = [0,0,0];
            var off4 = index*4;
            var off3 = index*3;

            var tmp = [0,0,0];
            var x = pos[off3], y = pos[off3+1], z = pos[off3+2];
            
            for (var j=0; j < 4; j++) {
                var weight = boneWeight[off4+j];
                if (weight > 0) {
                    var mo = boneIndex[off4+j] * 16;
                    
                    //Multiply pos with boneXform
                    r[0] += (boneXform[mo+0]*x + boneXform[mo+4]*y + boneXform[mo+8]*z + boneXform[mo+12]) * weight;
                    r[1] += (boneXform[mo+1]*x + boneXform[mo+5]*y + boneXform[mo+9]*z + boneXform[mo+13]) * weight; 
                    r[2] += (boneXform[mo+2]*x + boneXform[mo+6]*y + boneXform[mo+10]*z + boneXform[mo+14]) * weight;
                }
            }
            return r;
        };

        var numVertices = pos.length / 3;
        var result = new ParallelArray(
                numVertices,
                elementalFunc,
                pos,
                boneIndex,
                boneWeight,
                boneXform
        );
        this.result = new Float32Array(result.data);
        return true;
    }
});