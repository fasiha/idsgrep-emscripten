
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    }
    var PACKAGE_NAME = 'index.data';
    var REMOTE_PACKAGE_BASE = 'index.data';
    var REMOTE_PACKAGE_NAME = typeof Module['locateFilePackage'] === 'function' ?
                              Module['locateFilePackage'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
    var REMOTE_PACKAGE_SIZE = 6581934;
    var PACKAGE_UUID = '9e3cb79f-00cc-4fbb-8770-b62f93aaf6ff';
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}
Module['FS_createPath']('/', 'dict', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };
      new DataRequest(0, 4461882, 0, 0).open('GET', '/dict/cjkvi-j.eids');
    new DataRequest(4461882, 6246578, 0, 0).open('GET', '/dict/cjkvi-j.bvec');
    new DataRequest(6246578, 6406618, 0, 0).open('GET', '/dict/kanjivg.bvec');
    new DataRequest(6406618, 6581934, 0, 0).open('GET', '/dict/kanjivg.eids');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though.
      var ptr = Module['_malloc'](byteArray.length);
      Module['HEAPU8'].set(byteArray, ptr);
      DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
          DataRequest.prototype.requests["/dict/cjkvi-j.eids"].onload();
          DataRequest.prototype.requests["/dict/cjkvi-j.bvec"].onload();
          DataRequest.prototype.requests["/dict/kanjivg.bvec"].onload();
          DataRequest.prototype.requests["/dict/kanjivg.eids"].onload();
          Module['removeRunDependency']('datafile_index.data');

    };
    Module['addRunDependency']('datafile_index.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

})();

// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = (typeof Module !== 'undefined' ? Module : null) || {};

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  if (!Module['printErr']) Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };

  var nodeFS = require('fs');
  var nodePath = require('path');

  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
  Module['arguments'] = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }

  Module['readBinary'] = function readBinary(f) {
    return read(f, 'binary');
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  this['Module'] = Module;

}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WEB) {
    window['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
if (!Module['thisProgram']) {
  Module['thisProgram'] = './this.program';
}

// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in: 
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at: 
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  setTempRet0: function (value) {
    tempRet0 = value;
  },
  getTempRet0: function () {
    return tempRet0;
  },
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?\{ ?[^}]* ?\}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_ && type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      assert(args.length == sig.length-1);
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      assert(sig.length == 1);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    var source = Pointer_stringify(code);
    if (source[0] === '"') {
      // tolerate EM_ASM("..code..") even though EM_ASM(..code..) is correct
      if (source.indexOf('"', 1) === source.length-1) {
        source = source.substr(1, source.length-2);
      } else {
        // something invalid happened, e.g. EM_ASM("..code($0)..", input)
        abort('invalid EM_ASM input |' + source + '|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)');
      }
    }
    try {
      // Module is the only 'upvar', which we provide directly. We also provide FS for legacy support.
      var evalled = eval('(function(Module, FS) { return function(' + args.join(',') + '){ ' + source + ' } })')(Module, typeof FS !== 'undefined' ? FS : null);
    } catch(e) {
      Module.printErr('error in executing inline EM_ASM code: ' + e + ' on: \n\n' + source + '\n\nwith args |' + args + '| (make sure to use the right one out of EM_ASM, EM_ASM_ARGS, etc.)');
      throw e;
    }
    return Runtime.asmConstCache[code] = evalled;
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[sig]) {
      Runtime.funcWrappers[sig] = {};
    }
    var sigCache = Runtime.funcWrappers[sig];
    if (!sigCache[func]) {
      sigCache[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return sigCache[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;

      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }

      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }

      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          (((codePoint - 0x10000) / 0x400)|0) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      /* TODO: use TextEncoder when present,
        var encoder = new TextEncoder();
        encoder['encoding'] = "utf-8";
        var utf8Array = encoder['encode'](aMsg.data);
      */
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  getCompilerSetting: function (name) {
    throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8);(assert((((STACKTOP|0) < (STACK_MAX|0))|0))|0); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + (assert(!staticSealed),size))|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + (assert(DYNAMICTOP > 0),size))|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}


Module['Runtime'] = Runtime;









//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  if (!func) {
    try {
      func = eval('_' + ident); // explicit lookup
    } catch(e) {}
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

var cwrap, ccall;
(function(){
  var stack = 0;
  var JSfuncs = {
    'stackSave' : function() {
      stack = Runtime.stackSave();
    },
    'stackRestore' : function() {
      Runtime.stackRestore(stack);
    },
    // type conversion from js to c
    'arrayToC' : function(arr) {
      var ret = Runtime.stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    },
    'stringToC' : function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        ret = Runtime.stackAlloc(str.length + 1); // +1 for the trailing '\0'
        writeStringToMemory(str, ret);
      }
      return ret;
    }
  };
  // For fast lookup of conversion functions
  var toC = {'string' : JSfuncs['stringToC'], 'array' : JSfuncs['arrayToC']};

  // C calling interface. 
  ccall = function ccallFunc(ident, returnType, argTypes, args) {
    var func = getCFunc(ident);
    var cArgs = [];
    assert(returnType !== 'array', 'Return type should not be "array".');
    if (args) {
      for (var i = 0; i < args.length; i++) {
        var converter = toC[argTypes[i]];
        if (converter) {
          if (stack === 0) stack = Runtime.stackSave();
          cArgs[i] = converter(args[i]);
        } else {
          cArgs[i] = args[i];
        }
      }
    }
    var ret = func.apply(null, cArgs);
    if (returnType === 'string') ret = Pointer_stringify(ret);
    if (stack !== 0) JSfuncs['stackRestore']();
    return ret;
  }

  var sourceRegex = /^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;
  function parseJSFunc(jsfunc) {
    // Match the body and the return value of a javascript function source
    var parsed = jsfunc.toString().match(sourceRegex).slice(1);
    return {arguments : parsed[0], body : parsed[1], returnValue: parsed[2]}
  }
  var JSsource = {};
  for (var fun in JSfuncs) {
    if (JSfuncs.hasOwnProperty(fun)) {
      // Elements of toCsource are arrays of three items:
      // the code, and the return value
      JSsource[fun] = parseJSFunc(JSfuncs[fun]);
    }
  }

  
  cwrap = function cwrap(ident, returnType, argTypes) {
    argTypes = argTypes || [];
    var cfunc = getCFunc(ident);
    // When the function takes numbers and returns a number, we can just return
    // the original function
    var numericArgs = argTypes.every(function(type){ return type === 'number'});
    var numericRet = (returnType !== 'string');
    if ( numericRet && numericArgs) {
      return cfunc;
    }
    // Creation of the arguments list (["$1","$2",...,"$nargs"])
    var argNames = argTypes.map(function(x,i){return '$'+i});
    var funcstr = "(function(" + argNames.join(',') + ") {";
    var nargs = argTypes.length;
    if (!numericArgs) {
      // Generate the code needed to convert the arguments from javascript
      // values to pointers
      funcstr += JSsource['stackSave'].body + ';';
      for (var i = 0; i < nargs; i++) {
        var arg = argNames[i], type = argTypes[i];
        if (type === 'number') continue;
        var convertCode = JSsource[type + 'ToC']; // [code, return]
        funcstr += 'var ' + convertCode.arguments + ' = ' + arg + ';';
        funcstr += convertCode.body + ';';
        funcstr += arg + '=' + convertCode.returnValue + ';';
      }
    }

    // When the code is compressed, the name of cfunc is not literally 'cfunc' anymore
    var cfuncname = parseJSFunc(function(){return cfunc}).returnValue;
    // Call the function
    funcstr += 'var ret = ' + cfuncname + '(' + argNames.join(',') + ');';
    if (!numericRet) { // Return type can only by 'string' or 'number'
      // Convert the result to a string
      var strgfy = parseJSFunc(function(){return Pointer_stringify}).returnValue;
      funcstr += 'ret = ' + strgfy + '(ret);';
    }
    if (!numericArgs) {
      // If we had a stack, restore it
      funcstr += JSsource['stackRestore'].body + ';';
    }
    funcstr += 'return ret})';
    return eval(funcstr);
  };
})();
Module["cwrap"] = cwrap;
Module["ccall"] = ccall;


function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;


function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module['allocate'] = allocate;

function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))>>0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }

  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))>>0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;

function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;


function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;


function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;


function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;

function demangle(func) {
  var hasLibcxxabi = !!Module['___cxa_demangle'];
  if (hasLibcxxabi) {
    try {
      var buf = _malloc(func.length);
      writeStringToMemory(func.substr(1), buf);
      var status = _malloc(4);
      var ret = Module['___cxa_demangle'](buf, 0, 0, status);
      if (getValue(status, 'i32') === 0 && ret) {
        return Pointer_stringify(ret);
      }
      // otherwise, libcxxabi failed, we can try ours which may return a partial result
    } catch(e) {
      // failure when using libcxxabi, we can try ours which may return a partial result
    } finally {
      if (buf) _free(buf);
      if (status) _free(status);
      if (ret) _free(ret);
    }
  }
  var i = 3;
  // params, etc.
  var basicTypes = {
    'v': 'void',
    'b': 'bool',
    'c': 'char',
    's': 'short',
    'i': 'int',
    'l': 'long',
    'f': 'float',
    'd': 'double',
    'w': 'wchar_t',
    'a': 'signed char',
    'h': 'unsigned char',
    't': 'unsigned short',
    'j': 'unsigned int',
    'm': 'unsigned long',
    'x': 'long long',
    'y': 'unsigned long long',
    'z': '...'
  };
  var subs = [];
  var first = true;
  function dump(x) {
    //return;
    if (x) Module.print(x);
    Module.print(func);
    var pre = '';
    for (var a = 0; a < i; a++) pre += ' ';
    Module.print (pre + '^');
  }
  function parseNested() {
    i++;
    if (func[i] === 'K') i++; // ignore const
    var parts = [];
    while (func[i] !== 'E') {
      if (func[i] === 'S') { // substitution
        i++;
        var next = func.indexOf('_', i);
        var num = func.substring(i, next) || 0;
        parts.push(subs[num] || '?');
        i = next+1;
        continue;
      }
      if (func[i] === 'C') { // constructor
        parts.push(parts[parts.length-1]);
        i += 2;
        continue;
      }
      var size = parseInt(func.substr(i));
      var pre = size.toString().length;
      if (!size || !pre) { i--; break; } // counter i++ below us
      var curr = func.substr(i + pre, size);
      parts.push(curr);
      subs.push(curr);
      i += pre + size;
    }
    i++; // skip E
    return parts;
  }
  function parse(rawList, limit, allowVoid) { // main parser
    limit = limit || Infinity;
    var ret = '', list = [];
    function flushList() {
      return '(' + list.join(', ') + ')';
    }
    var name;
    if (func[i] === 'N') {
      // namespaced N-E
      name = parseNested().join('::');
      limit--;
      if (limit === 0) return rawList ? [name] : name;
    } else {
      // not namespaced
      if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
      var size = parseInt(func.substr(i));
      if (size) {
        var pre = size.toString().length;
        name = func.substr(i + pre, size);
        i += pre + size;
      }
    }
    first = false;
    if (func[i] === 'I') {
      i++;
      var iList = parse(true);
      var iRet = parse(true, 1, true);
      ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
    } else {
      ret = name;
    }
    paramLoop: while (i < func.length && limit-- > 0) {
      //dump('paramLoop');
      var c = func[i++];
      if (c in basicTypes) {
        list.push(basicTypes[c]);
      } else {
        switch (c) {
          case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
          case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
          case 'L': { // literal
            i++; // skip basic type
            var end = func.indexOf('E', i);
            var size = end - i;
            list.push(func.substr(i, size));
            i += size + 2; // size + 'EE'
            break;
          }
          case 'A': { // array
            var size = parseInt(func.substr(i));
            i += size.toString().length;
            if (func[i] !== '_') throw '?';
            i++; // skip _
            list.push(parse(true, 1, true)[0] + ' [' + size + ']');
            break;
          }
          case 'E': break paramLoop;
          default: ret += '?' + c; break paramLoop;
        }
      }
    }
    if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
    if (rawList) {
      if (ret) {
        list.push(ret + '?');
      }
      return list;
    } else {
      return ret + flushList();
    }
  }
  var final = func;
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    final = parse();
  } catch(e) {
    final += '?';
  }
  if (final.indexOf('?') >= 0 && !hasLibcxxabi) {
    Runtime.warnOnce('warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
  }
  return final;
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function jsStackTrace() {
  var err = new Error();
  if (!err.stack) {
    // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
    // so try that as a special-case.
    try {
      throw new Error(0);
    } catch(e) {
      err = e;
    }
    if (!err.stack) {
      return '(no stack trace available)';
    }
  }
  return err.stack.toString();
}

function stackTrace() {
  return demangleAll(jsStackTrace());
}
Module['stackTrace'] = stackTrace;

// Memory management

var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk

function enlargeMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');
}

var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;

var totalMemory = 64*1024;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be more reasonable');
  TOTAL_MEMORY = totalMemory;
}

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'JS engine does not provide full typed array support');

var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);

// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;
var runtimeExited = false;

function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    Module.printErr('Exiting runtime. Any attempt to access the compiled C code may fail from now. If you want to keep the runtime alive, set Module["noExitRuntime"] = true or build with -s NO_EXIT_RUNTIME=1');
  }
  callRuntimeCallbacks(__ATEXIT__);
  runtimeExited = true;
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;

// Tools


function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;

function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))>>0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))>>0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[(((buffer)+(i))>>0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))>>0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 10000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;

// === Body ===





STATIC_BASE = 8;

STATICTOP = STATIC_BASE + Runtime.alignMemory(9683);
  /* global initializers */ __ATINIT__.push();
  

/* memory initializer */ allocate([232,134,177,232,129,227,144,133,146,167,232,174,233,171,129,227,130,227,173,160,182,129,227,146,227,164,129,227,129,227,145,129,187,173,230,166,33,173,129,227,2,1,0,0,8,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,48,49,54,108,108,88,37,48,49,54,108,108,88,32,37,100,47,37,100,10,0,0,0,38,0,0,0,0,0,0,0,124,0,0,0,0,0,0,0,70,76,83,61,37,48,49,54,108,108,88,37,48,49,54,108,108,88,32,37,100,47,37,100,10,0,0,0,0,0,0,0,77,67,72,32,37,48,49,54,108,108,88,37,48,49,54,108,108,88,32,37,100,47,37,100,10,0,0,0,0,0,0,0,32,32,32,61,37,48,49,54,108,108,88,37,48,49,54,108,108,88,32,37,100,47,37,100,10,0,0,0,0,0,0,0,76,67,72,32,37,48,49,54,108,108,88,37,48,49,54,108,108,88,32,37,100,47,37,100,10,0,0,0,0,0,0,0,70,67,72,32,37,48,49,54,108,108,88,37,48,49,54,108,108,88,32,37,100,47,37,100,10,0,0,0,0,0,0,0,84,82,85,61,37,48,49,54,108,108,88,37,48,49,54,108,108,88,32,37,100,47,37,100,10,0,0,0,0,0,0,0,65,78,68,32,37,48,49,54,108,108,88,37,48,49,54,108,108,88,32,37,100,47,37,100,10,0,0,0,0,0,0,0,32,32,32,32,37,48,49,54,108,108,88,37,48,49,54,108,108,88,32,37,100,47,37,100,10,0,0,0,0,0,0,0,79,82,32,32,37,48,49,54,108,108,88,37,48,49,54,108,108,88,32,37,100,47,37,100,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,114,97,119,0,0,0,0,0,184,3,0,0,192,3,0,0,208,3,0,0,216,3,0,0,232,3,0,0,240,3,0,0,184,1,0,0,0,4,0,0,16,4,0,0,24,4,0,0,49,48,48,48,48,48,57,49,51,50,53,48,0,0,0,0,102,111,117,110,100,32,85,84,70,45,56,32,99,111,110,116,105,110,117,97,116,105,111,110,32,98,121,116,101,32,119,104,101,110,32,99,108,101,97,110,32,99,104,97,114,97,99,116,101,114,32,101,120,112,101,99,116,101,100,0,0,0,0,0,102,111,117,110,100,32,110,111,110,45,85,110,105,99,111,100,101,32,85,84,70,45,56,32,108,101,110,103,116,104,32,98,121,116,101,32,119,104,101,110,32,99,108,101,97,110,32,99,104,97,114,97,99,116,101,114,32,101,120,112,101,99,116,101,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,176,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,32,32,32,0,0,0,0,105,110,116,101,114,110,97,108,32,101,114,114,111,114,44,32,105,110,99,111,110,115,105,115,116,101,110,116,32,99,104,97,114,32,108,101,110,103,116,104,0,0,0,0,0,0,0,0,92,120,37,48,50,88,0,0,92,88,37,48,52,88,0,0,92,120,123,37,88,125,0,0,88,3,0,0,64,3,0,0,144,3,0,0,152,3,0,0,160,3,0,0,168,3,0,0,59,0,0,0,0,0,0,0,88,3,0,0,104,3,0,0,112,3,0,0,120,3,0,0,128,3,0,0,136,3,0,0,27,91,48,59,51,55,109,0,10,10,0,0,0,0,0,0,10,0,0,0,0,0,0,0,27,91,48,59,52,49,59,51,48,109,0,0,0,0,0,0,27,91,49,59,51,55,109,0,27,91,49,59,51,50,109,0,27,91,49,59,51,53,109,0,27,91,49,59,51,54,109,0,27,91,49,59,51,51,109,0,27,91,48,59,51,50,109,0,27,91,48,59,51,53,109,0,27,91,48,59,51,54,109,0,27,91,48,59,51,51,109,0,0,0,0,0,0,0,0,0,97,115,99,105,105,0,0,0,48,48,48,48,48,48,57,49,51,53,53,49,0,0,0,0,99,111,111,107,101,100,0,0,49,48,48,48,48,48,57,49,51,50,53,48,0,0,0,0,105,110,100,101,110,116,0,0,49,48,48,48,48,48,50,50,51,50,53,48,0,0,0,0,48,48,48,48,48,48,48,48,48,48,48,48,0,0,0,0,114,97,119,110,99,0,0,0,48,48,48,48,48,48,48,48,48,48,48,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,0,0,0,0,0,0,0,99,97,110,39,116,32,117,115,101,32,105,110,100,101,120,32,111,110,32,115,116,100,105,110,44,32,110,111,114,32,98,111,116,104,32,105,103,110,111,114,101,32,97,110,100,32,100,101,98,117,103,32,105,116,0,0,119,111,110,39,116,32,117,115,101,32,112,114,111,99,101,115,115,95,102,105,108,101,0,0,46,101,105,100,115,0,0,0,102,105,108,101,110,97,109,101,32,100,111,101,115,110,39,116,32,101,110,100,32,105,110,32,46,101,105,100,115,44,32,111,114,32,99,97,110,39,116,32,115,116,97,116,0,0,0,0,98,118,101,99,0,0,0,0,114,98,0,0,0,0,0,0,101,105,100,115,0,0,0,0,98,105,116,32,118,101,99,116,111,114,32,102,105,108,101,32,116,111,111,32,111,108,100,44,32,111,114,32,99,97,110,39,116,32,115,116,97,116,32,111,114,32,111,112,101,110,32,105,116,0,0,0,0,0,0,0,99,97,110,39,116,32,114,101,97,100,32,100,101,115,105,114,101,100,32,104,101,97,100,101,114,32,102,114,111,109,32,98,105,116,32,118,101,99,116,111,114,32,102,105,108,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,58,0,0,0,0,0,0,0,99,97,110,39,116,32,111,112,101,110,32,37,115,32,102,111,114,32,114,101,97,100,105,110,103,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,101,114,114,111,114,32,115,101,101,107,105,110,103,32,105,110,32,37,115,10,0,0,0,0,101,114,114,111,114,32,114,101,97,100,105,110,103,32,101,110,116,114,121,32,102,114,111,109,32,37,115,10,0,0,0,0,99,97,110,39,116,32,112,97,114,115,101,32,105,110,112,117,116,32,112,97,116,116,101,114,110,0,0,0,0,0,0,0,72,105,32,37,115,10,0,0,89,111,32,0,0,0,0,0,37,115,0,0,0,0,0,0,99,97,110,39,116,32,112,97,114,115,101,32,115,101,97,114,99,104,32,109,97,116,99,104,105,110,103,32,112,97,116,116,101,114,110,0,0,0,0,0,46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,105,108,108,101,103,97,108,32,109,97,116,99,104,32,114,101,115,117,108,116,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,254,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,59,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,97,116,116,101,109,112,116,32,116,111,32,114,101,103,105,115,116,101,114,32,99,111,110,102,108,105,99,116,105,110,103,32,97,114,105,116,105,101,115,32,102,111,114,32,102,117,110,99,116,111,114,0,0,0,0,0,60,0,0,0,0,0,0,0,62,0,0,0,0,0,0,0,227,128,144,0,0,0,0,0,227,128,145,0,0,0,0,0,227,128,150,0,0,0,0,0,227,128,151,0,0,0,0,0,40,0,0,0,0,0,0,0,41,0,0,0,0,0,0,0,239,188,136,0,0,0,0,0,239,188,137,0,0,0,0,0,239,189,159,0,0,0,0,0,239,189,160,0,0,0,0,0,46,0,0,0,0,0,0,0,58,0,0,0,0,0,0,0,227,131,187,0,0,0,0,0,91,0,0,0,0,0,0,0,93,0,0,0,0,0,0,0,239,188,187,0,0,0,0,0,239,188,189,0,0,0,0,0,227,128,154,0,0,0,0,0,227,128,155,0,0,0,0,0,123,0,0,0,0,0,0,0,125,0,0,0,0,0,0,0,227,128,148,0,0,0,0,0,227,128,149,0,0,0,0,0,227,128,152,0,0,0,0,0,227,128,153,0,0,0,0,0,44,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,97,110,121,116,104,105,110,103,0,0,0,0,0,0,0,0,97,110,121,119,104,101,114,101,0,0,0,0,0,0,0,0,38,0,0,0,0,0,0,0,97,110,100,0,0,0,0,0,124,0,0,0,0,0,0,0,111,114,0,0,0,0,0,0,33,0,0,0,0,0,0,0,110,111,116,0,0,0,0,0,42,0,0,0,0,0,0,0,117,110,111,114,100,0,0,0,61,0,0,0,0,0,0,0,101,113,117,97,108,0,0,0,64,0,0,0,0,0,0,0,97,115,115,111,99,0,0,0,47,0,0,0,0,0,0,0,114,101,103,101,120,0,0,0,35,0,0,0,0,0,0,0,117,115,101,114,0,0,0,0,226,191,176,0,0,0,0,0,108,114,0,0,0,0,0,0,226,191,177,0,0,0,0,0,116,98,0,0,0,0,0,0,226,191,178,0,0,0,0,0,108,99,114,0,0,0,0,0,226,191,179,0,0,0,0,0,116,99,98,0,0,0,0,0,226,191,180,0,0,0,0,0,101,110,99,108,111,115,101,0,226,191,181,0,0,0,0,0,119,114,97,112,117,0,0,0,226,191,182,0,0,0,0,0,119,114,97,112,100,0,0,0,226,191,183,0,0,0,0,0,119,114,97,112,108,0,0,0,226,191,184,0,0,0,0,0,119,114,97,112,117,108,0,0,226,191,185,0,0,0,0,0,119,114,97,112,117,114,0,0,226,191,186,0,0,0,0,0,119,114,97,112,108,108,0,0,226,191,187,0,0,0,0,0,111,118,101,114,108,97,112,0,99,111,109,112,105,108,101,100,32,119,105,116,104,111,117,116,32,114,101,103,117,108,97,114,32,101,120,112,114,101,115,115,105,111,110,32,115,117,112,112,111,114,116,0,0,0,0,0,0,0,0,0,0,0,0,0,254,255,254,255,254,255,254,255,2,0,3,0,4,0,4,0,0,3,5,0,6,0,7,0,8,0,9,0,10,0,11,0,11,0,0,3,254,255,254,255,254,255,254,255,12,0,12,0,12,0,12,0,0,5,254,255,254,255,254,255,254,255,13,0,13,0,13,0,13,0,0,5,254,255,254,255,254,255,254,255,14,0,14,0,14,0,14,0,0,5,255,255,255,255,254,255,254,255,15,0,15,0,15,0,15,0,0,5,255,255,255,255,254,255,254,255,16,0,16,0,16,0,16,0,0,5,255,255,255,255,254,255,254,255,17,0,17,0,17,0,17,0,0,5,255,255,255,255,254,255,254,255,18,0,18,0,18,0,18,0,0,5,19,0,20,0,21,0,22,0,254,255,254,255,254,255,254,255,0,0,23,0,23,0,23,0,23,0,254,255,254,255,254,255,24,0,0,0,254,255,254,255,254,255,254,255,25,0,25,0,25,0,25,0,0,5,254,255,26,0,27,0,28,0,29,0,255,255,255,255,255,255,0,0,255,255,255,255,30,0,255,255,255,255,31,0,254,255,32,0,0,0,33,0,33,0,254,255,254,255,254,255,254,255,254,255,254,255,0,0,34,0,254,255,34,0,254,255,254,255,254,255,254,255,254,255,0,0,254,255,254,255,254,255,254,255,255,255,35,0,254,255,254,255,0,0,254,255,254,255,36,0,254,255,254,255,254,255,37,0,38,0,0,0,39,0,40,0,254,255,41,0,42,0,43,0,44,0,45,0,0,0,254,255,254,255,254,255,254,255,46,0,46,0,46,0,46,0,0,5,254,255,254,255,254,255,254,255,47,0,47,0,47,0,47,0,0,5,254,255,254,255,254,255,254,255,48,0,48,0,48,0,48,0,0,5,254,255,254,255,254,255,254,255,49,0,49,0,49,0,49,0,0,5,254,255,254,255,254,255,254,255,50,0,50,0,50,0,50,0,0,5,254,255,254,255,254,255,254,255,51,0,51,0,51,0,51,0,0,5,52,0,52,0,53,0,53,0,254,255,254,255,254,255,254,255,0,0,54,0,254,255,254,255,254,255,254,255,254,255,254,255,254,255,1,3,254,255,55,0,56,0,57,0,254,255,254,255,254,255,58,0,1,3,59,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,1,3,255,255,255,255,255,255,255,255,255,255,255,255,60,0,255,255,1,3,61,0,61,0,61,0,62,0,63,0,64,0,63,0,63,0,1,0,255,255,255,255,255,255,65,0,254,255,254,255,254,255,254,255,1,3,254,255,254,255,254,255,254,255,66,0,67,0,254,255,68,0,1,3,254,255,69,0,254,255,69,0,255,255,255,255,255,255,255,255,1,3,254,255,254,255,254,255,254,255,254,255,70,0,254,255,254,255,1,3,255,255,255,255,255,255,255,255,255,255,255,255,254,255,254,255,1,3,71,0,72,0,254,255,254,255,254,255,254,255,254,255,254,255,1,3,254,255,254,255,255,255,255,255,255,255,255,255,255,255,73,0,1,3,74,0,74,0,254,255,254,255,254,255,254,255,254,255,254,255,1,3,75,0,254,255,255,255,76,0,254,255,254,255,254,255,254,255,1,3,254,255,71,0,255,255,255,255,254,255,254,255,77,0,254,255,1,3,254,255,254,255,78,0,73,0,79,0,80,0,254,255,254,255,1,3,254,255,78,0,81,0,254,255,254,255,254,255,255,255,255,255,1,3,255,255,67,0,254,255,254,255,254,255,254,255,254,255,254,255,1,3,254,255,254,255,254,255,254,255,78,0,255,255,82,0,82,0,1,3,254,255,254,255,254,255,254,255,254,255,71,0,67,0,254,255,1,3,83,0,84,0,85,0,86,0,87,0,88,0,89,0,90,0,1,0,91,0,92,0,254,255,93,0,94,0,95,0,96,0,254,255,1,3,97,0,98,0,254,255,99,0,254,255,100,0,254,255,101,0,1,0,102,0,102,0,255,255,255,255,102,0,102,0,255,255,255,255,1,0,254,255,103,0,254,255,103,0,104,0,105,0,104,0,105,0,1,3,254,255,254,255,254,255,254,255,254,255,106,0,254,255,107,0,1,3,108,0,109,0,108,0,109,0,108,0,109,0,108,0,109,0,1,3,255,255,255,255,254,255,254,255,255,255,255,255,254,255,254,255,1,3,254,255,254,255,254,255,254,255,255,255,110,0,254,255,254,255,1,0,254,255,254,255,254,255,254,255,111,0,254,255,254,255,254,255,1,0,254,255,112,0,255,255,255,255,255,255,255,255,254,255,254,255,1,0,254,255,254,255,254,255,254,255,254,255,113,0,114,0,254,255,1,0,254,255,254,255,255,255,255,255,255,255,255,255,255,255,255,255,1,0,115,0,255,255,116,0,255,255,255,255,255,255,255,255,255,255,1,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,1,0,255,255,255,255,255,255,254,255,254,255,254,255,255,255,255,255,1,3,255,255,255,255,117,0,254,255,254,255,254,255,255,255,255,255,1,3,255,255,255,255,254,255,254,255,254,255,254,255,255,255,255,255,1,3,255,255,255,255,254,255,254,255,112,0,254,255,255,255,255,255,1,3,255,255,255,255,255,255,255,255,255,255,255,255,118,0,254,255,1,0,254,255,254,255,254,255,254,255,255,255,255,255,255,255,255,255,1,0,255,255,255,255,255,255,255,255,254,255,254,255,254,255,254,255,1,0,119,0,118,0,254,255,254,255,255,255,120,0,254,255,121,0,1,0,255,255,255,255,255,255,255,255,254,255,254,255,254,255,122,0,1,0,254,255,254,255,254,255,254,255,254,255,255,255,254,255,254,255,1,0,254,255,254,255,254,255,255,255,255,255,255,255,255,255,255,255,1,0,255,255,255,255,254,255,254,255,254,255,254,255,254,255,254,255,1,0,255,255,255,255,255,255,255,255,255,255,255,255,254,255,255,255,1,0,254,255,255,255,255,255,254,255,255,255,255,255,254,255,255,255,1,0,255,255,255,255,255,255,255,255,255,255,255,255,254,255,254,255,1,0,255,255,255,255,255,255,254,255,255,255,255,255,254,255,254,255,1,0,255,255,254,255,254,255,254,255,254,255,254,255,254,255,254,255,1,0,254,255,254,255,254,255,254,255,254,255,254,255,255,255,255,255,1,0,255,255,255,255,255,255,255,255,255,255,254,255,254,255,255,255,1,0,255,255,254,255,255,255,255,255,255,255,255,255,254,255,254,255,1,0,254,255,255,255,254,255,254,255,254,255,254,255,254,255,254,255,1,0,255,255,254,255,255,255,254,255,255,255,254,255,255,255,254,255,1,0,123,0,124,0,125,0,126,0,123,0,124,0,125,0,126,0,1,3,127,0,128,0,129,0,130,0,127,0,128,0,129,0,130,0,1,3,254,255,131,0,132,0,133,0,254,255,131,0,132,0,133,0,1,3,255,255,134,0,135,0,136,0,255,255,134,0,135,0,136,0,1,3,137,0,138,0,254,255,139,0,137,0,138,0,254,255,139,0,1,3,140,0,141,0,142,0,143,0,140,0,141,0,142,0,143,0,1,3,144,0,145,0,254,255,146,0,144,0,145,0,254,255,146,0,1,3,142,0,147,0,148,0,149,0,142,0,147,0,148,0,149,0,1,3,150,0,151,0,152,0,254,255,255,255,255,255,255,255,255,255,1,0,254,255,254,255,254,255,254,255,254,255,153,0,254,255,254,255,1,0,254,255,254,255,254,255,254,255,154,0,155,0,156,0,157,0,1,0,158,0,254,255,159,0,254,255,160,0,254,255,254,255,254,255,1,0,161,0,162,0,254,255,254,255,163,0,164,0,165,0,166,0,1,0,167,0,254,255,168,0,168,0,254,255,254,255,254,255,255,255,1,0,169,0,254,255,254,255,254,255,254,255,254,255,254,255,254,255,1,3,170,0,254,255,254,255,254,255,254,255,254,255,254,255,254,255,1,3,255,255,254,255,254,255,254,255,254,255,254,255,171,0,254,255,1,3,254,255,254,255,254,255,254,255,254,255,254,255,172,0,254,255,1,3,254,255,254,255,254,255,254,255,254,255,254,255,112,0,254,255,1,3,255,255,255,255,254,255,254,255,255,255,255,255,254,255,254,255,2,3,254,255,173,0,174,0,175,0,254,255,254,255,254,255,254,255,1,0,176,0,254,255,254,255,177,0,178,0,179,0,180,0,254,255,1,0,181,0,182,0,183,0,184,0,254,255,254,255,185,0,185,0,1,0,186,0,254,255,254,255,254,255,186,0,254,255,254,255,254,255,1,0,255,255,254,255,254,255,125,0,254,255,254,255,254,255,187,0,1,0,188,0,189,0,254,255,254,255,190,0,190,0,190,0,190,0,1,0,191,0,191,0,254,255,254,255,191,0,191,0,254,255,254,255,1,0,255,255,255,255,255,255,255,255,254,255,254,255,254,255,254,255,2,3,254,255,192,0,192,0,254,255,254,255,254,255,254,255,254,255,2,0,254,255,254,255,254,255,254,255,255,255,255,255,255,255,255,255,2,3,254,255,254,255,254,255,254,255,254,255,254,255,193,0,255,255,2,3,255,255,255,255,194,0,254,255,254,255,254,255,254,255,254,255,2,3,255,255,255,255,195,0,195,0,195,0,195,0,255,255,196,0,2,0,255,255,255,255,255,255,197,0,255,255,255,255,255,255,255,255,2,3,255,255,255,255,254,255,254,255,254,255,254,255,254,255,254,255,2,3,255,255,255,255,255,255,255,255,255,255,255,255,254,255,254,255,2,3,254,255,254,255,255,255,255,255,254,255,254,255,255,255,255,255,2,3,198,0,110,0,110,0,110,0,110,0,110,0,110,0,110,0,2,0,254,255,254,255,254,255,254,255,255,255,254,255,254,255,254,255,2,3,254,255,194,0,254,255,254,255,254,255,194,0,254,255,254,255,2,3,199,0,200,0,170,0,200,0,201,0,200,0,202,0,202,0,2,0,203,0,254,255,254,255,254,255,254,255,254,255,254,255,204,0,2,3,254,255,254,255,254,255,254,255,254,255,254,255,254,255,193,0,2,3,254,255,254,255,254,255,254,255,254,255,254,255,205,0,194,0,2,3,254,255,206,0,206,0,206,0,254,255,254,255,254,255,254,255,2,0,207,0,255,255,255,255,254,255,254,255,254,255,208,0,208,0,2,3,209,0,255,255,255,255,254,255,210,0,254,255,254,255,254,255,2,3,211,0,212,0,254,255,254,255,211,0,212,0,254,255,254,255,2,3,213,0,213,0,213,0,254,255,172,0,254,255,254,255,254,255,2,0,254,255,254,255,254,255,254,255,254,255,254,255,254,255,214,0,2,3,172,0,215,0,172,0,172,0,215,0,216,0,215,0,216,0,2,0,207,0,217,0,254,255,254,255,210,0,254,255,254,255,254,255,2,3,254,255,254,255,121,0,121,0,218,0,218,0,117,0,218,0,2,0,254,255,255,255,254,255,254,255,254,255,255,255,254,255,254,255,2,3,213,0,213,0,219,0,254,255,172,0,254,255,254,255,254,255,2,0,220,0,254,255,254,255,254,255,254,255,254,255,254,255,214,0,2,3,254,255,254,255,254,255,220,0,254,255,254,255,221,0,222,0,2,3,218,0,223,0,224,0,224,0,223,0,225,0,223,0,223,0,2,0,226,0,221,0,227,0,254,255,210,0,254,255,254,255,254,255,2,3,254,255,213,0,228,0,228,0,213,0,117,0,254,255,254,255,2,0,215,0,215,0,215,0,215,0,215,0,215,0,215,0,216,0,2,0,213,0,213,0,254,255,254,255,172,0,254,255,254,255,254,255,2,0,213,0,254,255,213,0,254,255,254,255,254,255,254,255,254,255,2,0,229,0,230,0,255,255,255,255,255,255,255,255,255,255,231,0,2,3,232,0,221,0,254,255,254,255,254,255,254,255,254,255,254,255,2,3,254,255,194,0,233,0,254,255,254,255,254,255,254,255,254,255,2,3,254,255,254,255,254,255,254,255,254,255,254,255,228,0,254,255,2,0,216,0,172,0,215,0,216,0,216,0,234,0,234,0,235,0,2,0,199,0,236,0,216,0,216,0,216,0,254,255,174,0,174,0,2,0,237,0,238,0,254,255,238,0,254,255,254,255,254,255,254,255,2,3,254,255,254,255,254,255,239,0,254,255,254,255,254,255,254,255,2,3,254,255,254,255,119,0,119,0,119,0,254,255,254,255,254,255,2,0,254,255,254,255,119,0,119,0,254,255,254,255,119,0,119,0,2,0,254,255,254,255,254,255,254,255,254,255,254,255,240,0,231,0,2,3,241,0,207,0,194,0,221,0,254,255,254,255,254,255,254,255,2,3,254,255,197,0,254,255,254,255,254,255,254,255,254,255,254,255,2,3,254,255,254,255,254,255,254,255,254,255,242,0,254,255,254,255,2,3,170,0,243,0,244,0,172,0,192,0,172,0,172,0,243,0,2,0,174,0,254,255,254,255,174,0,254,255,254,255,254,255,245,0,2,0,246,0,247,0,246,0,248,0,248,0,249,0,250,0,249,0,2,0,194,0,254,255,254,255,254,255,254,255,254,255,251,0,252,0,2,3,216,0,216,0,253,0,235,0,192,0,192,0,192,0,192,0,2,0,254,0,254,0,121,0,170,0,121,0,121,0,254,255,254,255,2,0,235,0,235,0,254,255,254,255,216,0,235,0,121,0,192,0,2,0,254,255,254,255,254,255,254,255,254,255,239,0,255,0,254,255,2,3,254,255,254,255,0,1,255,255,1,1,2,1,3,1,3,1,2,3,254,255,197,0,254,255,254,255,254,255,4,1,254,255,254,255,2,3,254,255,254,255,254,255,254,255,255,255,255,255,254,255,254,255,2,3,216,0,216,0,254,255,254,255,216,0,216,0,254,255,192,0,2,0,254,255,254,255,254,255,254,255,254,255,254,255,254,255,255,255,2,3,215,0,215,0,215,0,172,0,215,0,215,0,216,0,235,0,2,0,254,255,254,255,254,255,255,255,254,255,254,255,254,255,254,255,2,3,254,255,254,255,254,255,254,255,254,255,254,255,220,0,220,0,2,3,254,255,254,255,213,0,218,0,254,255,121,0,228,0,254,255,2,0,239,0,254,255,254,255,254,255,255,255,255,255,220,0,254,255,2,3,254,255,254,255,254,255,254,255,193,0,231,0,254,255,254,255,2,3,211,0,255,255,5,1,254,255,211,0,255,255,5,1,254,255,2,3,203,0,254,255,254,255,254,255,254,255,254,255,6,1,7,1,2,3,254,255,254,255,254,255,254,255,254,255,8,1,9,1,9,1,2,3,10,1,11,1,254,255,254,255,254,255,254,255,254,255,254,255,2,3,254,255,254,255,254,255,254,255,254,255,254,255,12,1,209,0,2,3,242,0,242,0,254,255,254,255,254,255,204,0,193,0,193,0,2,3,254,255,254,255,254,255,254,255,238,0,217,0,254,255,254,255,2,3,254,255,254,255,254,255,13,1,254,255,254,255,254,255,254,255,2,3,254,255,254,255,254,255,254,255,254,255,254,255,194,0,194,0,2,3,14,1,254,255,254,255,254,255,254,255,15,1,254,255,254,255,2,3,16,1,17,1,18,1,254,255,19,1,254,255,20,1,254,255,2,0,254,255,254,255,21,1,21,1,254,255,254,255,21,1,21,1,2,3,254,255,22,1,254,255,22,1,254,255,23,1,24,1,254,255,2,0,254,255,254,255,254,255,254,255,254,255,255,255,254,255,254,255,2,3,254,255,254,255,254,255,254,255,254,255,254,255,255,255,255,255,2,0,255,255,255,255,255,255,255,255,254,255,254,255,254,255,254,255,2,0,255,255,255,255,255,255,255,255,255,255,254,255,255,255,255,255,2,3,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,2,3,254,255,254,255,254,255,255,255,255,255,255,255,255,255,255,255,2,0,255,255,255,255,255,255,255,255,255,255,254,255,254,255,254,255,2,3,254,255,254,255,254,255,255,255,255,255,254,255,254,255,254,255,2,3,254,255,254,255,254,255,255,255,255,255,255,255,254,255,254,255,2,3,254,255,254,255,254,255,255,255,254,255,255,255,254,255,254,255,2,3,254,255,254,255,255,255,255,255,255,255,255,255,254,255,254,255,2,3,255,255,255,255,255,255,254,255,254,255,254,255,254,255,254,255,2,0,254,255,254,255,254,255,254,255,255,255,255,255,254,255,254,255,2,0,254,255,255,255,254,255,254,255,255,255,255,255,255,255,255,255,2,0,254,255,254,255,254,255,255,255,254,255,254,255,254,255,255,255,2,3,254,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,2,0,255,255,255,255,254,255,254,255,254,255,255,255,254,255,255,255,2,0,255,255,254,255,254,255,254,255,254,255,254,255,255,255,255,255,2,0,254,255,254,255,255,255,255,255,254,255,254,255,254,255,254,255,2,0,254,255,254,255,254,255,254,255,254,255,254,255,254,255,255,255,2,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,2,0,255,255,254,255,254,255,254,255,254,255,254,255,254,255,254,255,2,3,254,255,254,255,254,255,254,255,255,255,254,255,254,255,255,255,2,0,254,255,254,255,254,255,254,255,254,255,254,255,255,255,255,255,2,3,254,255,254,255,254,255,254,255,254,255,254,255,255,255,254,255,2,3,255,255,254,255,254,255,254,255,254,255,255,255,254,255,255,255,2,0,254,255,255,255,254,255,254,255,254,255,254,255,254,255,254,255,2,3,255,255,254,255,254,255,254,255,254,255,254,255,254,255,255,255,2,3,255,255,255,255,254,255,254,255,254,255,254,255,254,255,254,255,2,0,254,255,254,255,254,255,254,255,254,255,255,255,254,255,255,255,2,0,254,255,255,255,254,255,254,255,254,255,254,255,254,255,254,255,2,0,255,255,254,255,255,255,254,255,254,255,254,255,254,255,254,255,2,3,255,255,254,255,255,255,254,255,255,255,254,255,254,255,254,255,2,3,255,255,255,255,255,255,254,255,254,255,254,255,254,255,254,255,2,3,254,255,255,255,255,255,255,255,255,255,255,255,254,255,254,255,2,0,255,255,254,255,255,255,254,255,255,255,254,255,255,255,254,255,2,0,255,255,254,255,254,255,254,255,255,255,254,255,254,255,254,255,2,3,255,255,255,255,255,255,255,255,255,255,254,255,255,255,255,255,2,0,254,255,254,255,254,255,254,255,254,255,255,255,255,255,255,255,2,0,255,255,255,255,255,255,255,255,255,255,255,255,254,255,254,255,2,0,255,255,254,255,254,255,254,255,254,255,254,255,254,255,254,255,2,0,254,255,254,255,255,255,255,255,255,255,255,255,255,255,255,255,2,0,254,255,254,255,254,255,254,255,254,255,255,255,255,255,255,255,2,3,254,255,254,255,254,255,254,255,254,255,255,255,255,255,254,255,2,3,254,255,254,255,254,255,255,255,254,255,254,255,255,255,254,255,2,3,254,255,254,255,255,255,254,255,254,255,255,255,255,255,254,255,2,0,254,255,254,255,254,255,254,255,254,255,255,255,254,255,254,255,2,0,254,255,254,255,254,255,254,255,255,255,255,255,255,255,255,255,2,0,254,255,254,255,254,255,254,255,255,255,255,255,254,255,255,255,2,0,254,255,254,255,254,255,254,255,254,255,254,255,255,255,254,255,2,0,254,255,255,255,254,255,254,255,254,255,255,255,254,255,254,255,2,0,254,255,254,255,254,255,254,255,255,255,254,255,254,255,255,255,2,3,254,255,254,255,254,255,254,255,255,255,254,255,255,255,255,255,2,3,254,255,254,255,255,255,254,255,254,255,254,255,254,255,254,255,2,3,254,255,254,255,254,255,255,255,255,255,255,255,254,255,255,255,2,3,254,255,254,255,254,255,255,255,254,255,255,255,254,255,255,255,2,3,254,255,254,255,254,255,255,255,254,255,255,255,255,255,255,255,2,3,254,255,254,255,254,255,255,255,255,255,254,255,255,255,255,255,2,3,254,255,254,255,255,255,255,255,255,255,254,255,255,255,255,255,2,3,254,255,254,255,254,255,254,255,255,255,254,255,255,255,255,255,2,0,255,255,255,255,255,255,254,255,255,255,254,255,254,255,254,255,2,0,255,255,254,255,254,255,254,255,254,255,254,255,255,255,254,255,2,3,255,255,254,255,254,255,254,255,254,255,255,255,254,255,254,255,2,3,255,255,255,255,255,255,255,255,254,255,254,255,255,255,255,255,2,0,255,255,255,255,255,255,254,255,255,255,255,255,255,255,255,255,2,0,255,255,254,255,255,255,255,255,255,255,255,255,255,255,255,255,2,0,255,255,254,255,254,255,254,255,254,255,255,255,254,255,254,255,2,0,254,255,254,255,254,255,254,255,255,255,254,255,254,255,254,255,2,0,254,255,254,255,255,255,255,255,255,255,255,255,255,255,254,255,2,0,255,255,255,255,254,255,254,255,255,255,255,255,254,255,254,255,2,0,254,255,254,255,254,255,255,255,254,255,254,255,255,255,255,255,2,0,255,255,255,255,254,255,254,255,255,255,254,255,254,255,254,255,2,0,254,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,2,0,254,255,255,255,255,255,254,255,254,255,255,255,255,255,254,255,2,0,254,255,254,255,254,255,255,255,254,255,254,255,254,255,254,255,2,0,254,255,254,255,254,255,254,255,255,255,254,255,255,255,254,255,2,0,255,255,254,255,255,255,255,255,255,255,254,255,254,255,255,255,2,0,254,255,254,255,255,255,254,255,254,255,254,255,255,255,254,255,2,0,254,255,254,255,254,255,254,255,254,255,254,255,254,255,25,1,2,0,26,1,254,255,26,1,254,255,254,255,254,255,254,255,254,255,2,0,27,1,27,1,28,1,28,1,27,1,27,1,28,1,28,1,2,3,29,1,29,1,254,255,254,255,29,1,29,1,254,255,254,255,2,3,30,1,30,1,28,1,28,1,30,1,30,1,28,1,28,1,2,3,31,1,31,1,28,1,28,1,31,1,31,1,28,1,28,1,2,3,32,1,32,1,28,1,28,1,32,1,32,1,28,1,28,1,2,3,254,255,254,255,33,1,33,1,254,255,254,255,33,1,33,1,2,0,254,255,34,1,254,255,254,255,254,255,34,1,254,255,254,255,2,3,35,1,254,255,254,255,254,255,35,1,254,255,254,255,254,255,2,3,36,1,254,255,254,255,254,255,36,1,254,255,254,255,254,255,2,3,254,255,254,255,254,255,254,255,254,255,37,1,254,255,37,1,3,0,38,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,3,0,37,1,40,1,37,1,37,1,37,1,37,1,37,1,37,1,3,0,41,1,41,1,41,1,42,1,41,1,42,1,254,255,41,1,3,0,43,1,43,1,43,1,43,1,43,1,43,1,43,1,254,255,3,0,44,1,254,255,254,255,254,255,254,255,254,255,45,1,46,1,3,3,47,1,47,1,47,1,48,1,49,1,48,1,50,1,51,1,3,0,40,1,40,1,37,1,37,1,37,1,37,1,41,1,49,1,3,0,52,1,52,1,52,1,53,1,53,1,53,1,53,1,53,1,3,0,254,255,254,255,255,255,255,255,255,255,254,255,255,255,254,255,3,0,54,1,54,1,37,1,41,1,41,1,41,1,41,1,55,1,3,0,56,1,57,1,254,255,254,255,254,255,58,1,254,255,254,255,3,3,254,255,254,255,254,255,254,255,254,255,254,255,254,255,255,255,3,3,254,255,255,255,254,255,254,255,254,255,254,255,254,255,255,255,3,3,255,255,255,255,254,255,254,255,254,255,254,255,254,255,255,255,3,3,255,255,254,255,254,255,254,255,254,255,254,255,254,255,255,255,3,3,254,255,254,255,254,255,254,255,254,255,254,255,255,255,255,255,3,3,254,255,254,255,254,255,254,255,254,255,255,255,255,255,255,255,3,3,255,255,254,255,254,255,254,255,254,255,254,255,254,255,254,255,3,3,255,255,255,255,254,255,254,255,254,255,254,255,254,255,254,255,3,0,254,255,254,255,254,255,255,255,255,255,255,255,255,255,254,255,3,0,254,255,255,255,255,255,254,255,254,255,255,255,254,255,254,255,3,0,255,255,254,255,254,255,254,255,254,255,255,255,255,255,254,255,3,3,254,255,254,255,254,255,254,255,254,255,255,255,255,255,254,255,3,3,254,255,254,255,254,255,254,255,254,255,254,255,255,255,254,255,3,3,254,255,254,255,254,255,254,255,254,255,255,255,254,255,254,255,3,3,254,255,254,255,254,255,254,255,255,255,255,255,254,255,254,255,3,3,255,255,255,255,255,255,254,255,255,255,255,255,255,255,254,255,3,3,255,255,255,255,254,255,254,255,255,255,255,255,254,255,254,255,3,3,254,255,254,255,254,255,254,255,254,255,255,255,254,255,255,255,3,3,254,255,254,255,254,255,254,255,255,255,254,255,255,255,255,255,3,3,255,255,255,255,255,255,254,255,254,255,255,255,255,255,255,255,3,0,255,255,255,255,255,255,255,255,254,255,254,255,254,255,254,255,3,0,254,255,254,255,255,255,255,255,255,255,255,255,254,255,254,255,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,45,43,32,32,32,48,88,48,120,0,0,0,0,0,0,0,40,110,117,108,108,41,0,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,0,0,0,0,0,105,110,102,0,0,0,0,0,73,78,70,0,0,0,0,0,110,97,110,0,0,0,0,0,78,65,78,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);




var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}


   
  Module["_i64Subtract"] = _i64Subtract;

  
  
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value;
      return value;
    }
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: {
          if (typeof navigator === 'object') return navigator['hardwareConcurrency'] || 1;
          return 1;
        }
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }

  
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  
  var MEMFS={ops_table:null,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.buffer.byteLength which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },getFileDataAsRegularArray:function (node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
          return arr; // Returns a copy of the original data.
        }
        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },getFileDataAsTypedArray:function (node) {
        if (node.contents && node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function (node, newCapacity) {
  
  
        if (!node.contents || node.contents.subarray) { // Keep using a typed array if creating a new storage, or if old one was a typed array as well.
          var prevCapacity = node.contents ? node.contents.buffer.byteLength : 0;
          if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
          // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
          // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
          // avoid overshooting the allocation cap by a very large margin.
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) | 0);
          if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
          var oldContents = node.contents;
          node.contents = new Uint8Array(newCapacity); // Allocate new storage.
          if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
          return;
        }
        // Not using a typed array to back the file storage. Use a standard JS array instead.
        if (!node.contents && newCapacity > 0) node.contents = [];
        while (node.contents.length < newCapacity) node.contents.push(0);
      },resizeFileStorage:function (node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
          return;
        }
  
        if (!node.contents || node.contents.subarray) { // Resize a typed array if that is being used as the backing store.
          var oldContents = node.contents;
          node.contents = new Uint8Array(new ArrayBuffer(newSize)); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
          return;
        }
        // Backing with a JS array.
        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;
        else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) { // Can we just reuse the buffer we are given?
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); // Use typed array write if available.
          else
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          node.usedBytes = Math.max(node.usedBytes, position+length);
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < stream.node.usedBytes) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        if (typeof indexedDB !== 'undefined') return indexedDB;
        var ret = null;
        if (typeof window === 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, 'IDBFS used, but indexedDB not supported');
        return ret;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          fileStore.createIndex('timestamp', 'timestamp', { unique: false });
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function() {
          callback(this.error);
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function() { callback(this.error); };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          var index = store.index('timestamp');
  
          index.openKeyCursor().onsuccess = function(event) {
            var cursor = event.target.result;
  
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, entries: entries });
            }
  
            entries[cursor.primaryKey] = { timestamp: cursor.key };
  
            cursor.continue();
          };
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { encoding: 'binary', canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function() { callback(this.error); };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function() { done(this.error); };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          stream.position = position;
          return position;
        }}};
  
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        var err = FS.nodePermissions(dir, 'x');
        if (err) return err;
        if (!dir.node_ops.lookup) return ERRNO_CODES.EACCES;
        return 0;
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },getStreamFromPtr:function (ptr) {
        return FS.streams[ptr - 1];
      },getPtrForStream:function (stream) {
        return stream ? stream.fd + 1 : 0;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            callback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        if (!PATH.resolve(oldpath)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        if (!old_dir || !new_dir) throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var err = FS.mayOpen(node, flags);
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          console.log("FS.trackingDelegate['onWriteToFile']('"+path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0, opts.canOwn);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0, opts.canOwn);
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device;
        if (typeof crypto !== 'undefined') {
          // for modern web browsers
          var randomBuffer = new Uint8Array(1);
          random_device = function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
        } else if (ENVIRONMENT_IS_NODE) {
          // for nodejs
          random_device = function() { return require('crypto').randomBytes(1)[0]; };
        } else {
          // default for ES5 platforms
          random_device = function() { return (Math.random()*256)|0; };
        }
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=FS.getPtrForStream(stdin);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=FS.getPtrForStream(stdout);
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=FS.getPtrForStream(stderr);
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
          if (this.stack) this.stack = demangleAll(this.stack);
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        }
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        }
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || []);
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = this;
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        }
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperty(node, "usedBytes", {
            get: function() { return this.contents.length; }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};
  
  
  
  
  function _mkport() { throw 'TODO' }var SOCKFS={mount:function (mount) {
        // If Module['websocket'] has already been defined (e.g. for configuring
        // the subprotocol/url) use that, if not initialise it to a new object.
        Module['websocket'] = (Module['websocket'] && 
                               ('object' === typeof Module['websocket'])) ? Module['websocket'] : {};
  
        // Add the Event registration mechanism to the exported websocket configuration
        // object so we can register network callbacks from native JavaScript too.
        // For more documentation see system/include/emscripten/emscripten.h
        Module['websocket']._callbacks = {};
        Module['websocket']['on'] = function(event, callback) {
  	    if ('function' === typeof callback) {
  		  this._callbacks[event] = callback;
          }
  	    return this;
        };
  
        Module['websocket'].emit = function(event, param) {
  	    if ('function' === typeof this._callbacks[event]) {
  		  this._callbacks[event].call(this, param);
          }
        };
  
        // If debug is enabled register simple default logging callbacks for each Event.
  
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
  
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          error: null, // Used in getsockopt for SOL_SOCKET/SO_ERROR test
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
  
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              // runtimeConfig gets set to true if WebSocket runtime configuration is available.
              var runtimeConfig = (Module['websocket'] && ('object' === typeof Module['websocket']));
  
              // The default value is 'ws://' the replace is needed because the compiler replaces '//' comments with '#'
              // comments without checking context, so we'd end up with ws:#, the replace swaps the '#' for '//' again.
              var url = 'ws:#'.replace('#', '//');
  
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['url']) {
                  url = Module['websocket']['url']; // Fetch runtime WebSocket URL config.
                }
              }
  
              if (url === 'ws://' || url === 'wss://') { // Is the supplied URL config just a prefix, if so complete it.
                var parts = addr.split('/');
                url = url + parts[0] + ":" + port + "/" + parts.slice(1).join('/');
              }
  
              // Make the WebSocket subprotocol (Sec-WebSocket-Protocol) default to binary if no configuration is set.
              var subProtocols = 'binary'; // The default value is 'binary'
  
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['subprotocol']) {
                  subProtocols = Module['websocket']['subprotocol']; // Fetch runtime WebSocket subprotocol config.
                }
              }
  
              // The regex trims the string (removes spaces at the beginning and end, then splits the string by
              // <any space>,<any space> into an Array. Whitespace removal is important for Websockify and ws.
              subProtocols = subProtocols.replace(/^ +| +$/g,"").split(/ *, */);
  
              // The node ws library API for specifying optional subprotocol is slightly different than the browser's.
              var opts = ENVIRONMENT_IS_NODE ? {'protocol': subProtocols.toString()} : subProtocols;
  
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
  
  
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
  
          var handleOpen = function () {
  
            Module['websocket'].emit('open', sock.stream.fd);
  
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
  
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
            Module['websocket'].emit('message', sock.stream.fd);
          };
  
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('close', function() {
              Module['websocket'].emit('close', sock.stream.fd);
            });
            peer.socket.on('error', function(error) {
              // Although the ws library may pass errors that may be more descriptive than
              // ECONNREFUSED they are not necessarily the expected error code e.g. 
              // ENOTFOUND on getaddrinfo seems to be node.js specific, so using ECONNREFUSED
              // is still probably the most useful thing to do.
              sock.error = ERRNO_CODES.ECONNREFUSED; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
              Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'ECONNREFUSED: Connection refused']);
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onclose = function() {
              Module['websocket'].emit('close', sock.stream.fd);
            };
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
            peer.socket.onerror = function(error) {
              // The WebSocket spec only allows a 'simple event' to be thrown on error,
              // so we only really know as much as ECONNREFUSED.
              sock.error = ERRNO_CODES.ECONNREFUSED; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
              Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'ECONNREFUSED: Connection refused']);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
          Module['websocket'].emit('listen', sock.stream.fd); // Send Event with listen fd.
  
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
  
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
  
              // push to queue for accept to pick up
              sock.pending.push(newsock);
              Module['websocket'].emit('connection', newsock.stream.fd);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
              Module['websocket'].emit('connection', sock.stream.fd);
            }
          });
          sock.server.on('closed', function() {
            Module['websocket'].emit('close', sock.stream.fd);
            sock.server = null;
          });
          sock.server.on('error', function(error) {
            // Although the ws library may pass errors that may be more descriptive than
            // ECONNREFUSED they are not necessarily the expected error code e.g. 
            // ENOTFOUND on getaddrinfo seems to be node.js specific, so using EHOSTUNREACH
            // is still probably the most useful thing to do. This error shouldn't
            // occur in a well written app as errors should get trapped in the compiled
            // app's own getaddrinfo call.
            sock.error = ERRNO_CODES.EHOSTUNREACH; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
            Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'EHOSTUNREACH: Host is unreachable']);
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        }}};function _recv(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _read(fd, buf, len);
    }
  
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fread(ptr, size, nitems, stream) {
      // size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fread.html
      var bytesToRead = nitems * size;
      if (bytesToRead == 0) {
        return 0;
      }
      var bytesRead = 0;
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return 0;
      }
      while (streamObj.ungotten.length && bytesToRead > 0) {
        HEAP8[((ptr++)>>0)]=streamObj.ungotten.pop();
        bytesToRead--;
        bytesRead++;
      }
      var err = _read(streamObj.fd, ptr, bytesToRead);
      if (err == -1) {
        if (streamObj) streamObj.error = true;
        return 0;
      }
      bytesRead += err;
      if (bytesRead < bytesToRead) streamObj.eof = true;
      return (bytesRead / size)|0;
    }

  
  function _close(fildes) {
      // int close(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/close.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        FS.close(stream);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  
  function _fsync(fildes) {
      // int fsync(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fsync.html
      var stream = FS.getStream(fildes);
      if (stream) {
        // We write directly to the file system, so there's nothing to do here.
        return 0;
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }
  
  function _fileno(stream) {
      // int fileno(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fileno.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) return -1;
      return stream.fd;
    }function _fclose(stream) {
      // int fclose(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fclose.html
      var fd = _fileno(stream);
      _fsync(fd);
      return _close(fd);
    }

  function _stat(path, buf, dontResolveLastLink) {
      // http://pubs.opengroup.org/onlinepubs/7908799/xsh/stat.html
      // int stat(const char *path, struct stat *buf);
      // NOTE: dontResolveLastLink is a shortcut for lstat(). It should never be
      //       used in client code.
      path = typeof path !== 'string' ? Pointer_stringify(path) : path;
      try {
        var stat = dontResolveLastLink ? FS.lstat(path) : FS.stat(path);
        HEAP32[((buf)>>2)]=stat.dev;
        HEAP32[(((buf)+(4))>>2)]=0;
        HEAP32[(((buf)+(8))>>2)]=stat.ino;
        HEAP32[(((buf)+(12))>>2)]=stat.mode;
        HEAP32[(((buf)+(16))>>2)]=stat.nlink;
        HEAP32[(((buf)+(20))>>2)]=stat.uid;
        HEAP32[(((buf)+(24))>>2)]=stat.gid;
        HEAP32[(((buf)+(28))>>2)]=stat.rdev;
        HEAP32[(((buf)+(32))>>2)]=0;
        HEAP32[(((buf)+(36))>>2)]=stat.size;
        HEAP32[(((buf)+(40))>>2)]=4096;
        HEAP32[(((buf)+(44))>>2)]=stat.blocks;
        HEAP32[(((buf)+(48))>>2)]=(stat.atime.getTime() / 1000)|0;
        HEAP32[(((buf)+(52))>>2)]=0;
        HEAP32[(((buf)+(56))>>2)]=(stat.mtime.getTime() / 1000)|0;
        HEAP32[(((buf)+(60))>>2)]=0;
        HEAP32[(((buf)+(64))>>2)]=(stat.ctime.getTime() / 1000)|0;
        HEAP32[(((buf)+(68))>>2)]=0;
        HEAP32[(((buf)+(72))>>2)]=stat.ino;
        return 0;
      } catch (e) {
        if (e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
          // an error occurred while trying to look up the path; we should just report ENOTDIR
          e.setErrno(ERRNO_CODES.ENOTDIR);
        }
        FS.handleFSError(e);
        return -1;
      }
    }

  
  function _strerror_r(errnum, strerrbuf, buflen) {
      if (errnum in ERRNO_MESSAGES) {
        if (ERRNO_MESSAGES[errnum].length > buflen - 1) {
          return ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          var msg = ERRNO_MESSAGES[errnum];
          writeAsciiToMemory(msg, strerrbuf);
          return 0;
        }
      } else {
        return ___setErrNo(ERRNO_CODES.EINVAL);
      }
    }function _strerror(errnum) {
      if (!_strerror.buffer) _strerror.buffer = _malloc(256);
      _strerror_r(errnum, _strerror.buffer, 256);
      return _strerror.buffer;
    }

   
  Module["_bitshift64Shl"] = _bitshift64Shl;

  function _abort() {
      Module['abort']();
    }

  
  
  
  function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var fd = _fileno(stream);
      var bytesWritten = _write(fd, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return (bytesWritten / size)|0;
      }
    }
  
  
   
  Module["_strlen"] = _strlen;
  
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = (HEAP32[((tempDoublePtr)>>2)]=HEAP32[(((varargs)+(argIndex))>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((varargs)+((argIndex)+(4)))>>2)],(+(HEAPF64[(tempDoublePtr)>>3])));
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+4))>>2)]];
  
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Runtime.getNativeFieldSize(type);
        return ret;
      }
  
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[((textIndex)>>0)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)>>0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)>>0)];
          }
  
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)>>0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)>>0)];
            }
          }
  
          // Handle precision.
          var precisionSet = false, precision = -1;
          if (next == 46) {
            precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)>>0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)>>0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)>>0)];
          }
          if (precision < 0) {
            precision = 6; // Standard default.
            precisionSet = false;
          }
  
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)>>0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)>>0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)>>0)];
  
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
  
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
  
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
  
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
  
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
  
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
  
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
  
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
  
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
  
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
  
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
  
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
  
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)>>0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length;
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[((i)>>0)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }

  function _printf(format, varargs) {
      // int printf(const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var stdout = HEAP32[((_stdout)>>2)];
      return _fprintf(stdout, format, varargs);
    }


  
  function _open(path, oflag, varargs) {
      // int open(const char *path, int oflag, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/open.html
      var mode = HEAP32[((varargs)>>2)];
      path = Pointer_stringify(path);
      try {
        var stream = FS.open(path, oflag, mode);
        return stream.fd;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fopen(filename, mode) {
      // FILE *fopen(const char *restrict filename, const char *restrict mode);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fopen.html
      var flags;
      mode = Pointer_stringify(mode);
      if (mode[0] == 'r') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 0;
        }
      } else if (mode[0] == 'w') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 512;
      } else if (mode[0] == 'a') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 1024;
      } else {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return 0;
      }
      var fd = _open(filename, flags, allocate([0x1FF, 0, 0, 0], 'i32', ALLOC_STACK));  // All creation permissions.
      return fd === -1 ? 0 : FS.getPtrForStream(FS.getStream(fd));
    }

  function _feof(stream) {
      // int feof(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/feof.html
      stream = FS.getStreamFromPtr(stream);
      return Number(stream && stream.eof);
    }

  function _fputc(c, stream) {
      // int fputc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputc.html
      var chr = unSign(c & 0xFF);
      HEAP8[((_fputc.ret)>>0)]=chr;
      var fd = _fileno(stream);
      var ret = _write(fd, _fputc.ret, 1);
      if (ret == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return -1;
      } else {
        return chr;
      }
    }

   
  Module["_i64Add"] = _i64Add;

  
  function _fputs(s, stream) {
      // int fputs(const char *restrict s, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputs.html
      var fd = _fileno(stream);
      return _write(fd, s, _strlen(s));
    }function _puts(s) {
      // int puts(const char *s);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/puts.html
      // NOTE: puts() always writes an extra newline.
      var stdout = HEAP32[((_stdout)>>2)];
      var ret = _fputs(s, stdout);
      if (ret < 0) {
        return ret;
      } else {
        var newlineRet = _fputc(10, stdout);
        return (newlineRet < 0) ? -1 : ret + 1;
      }
    }



  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }

  var Browser={mainLoop:{scheduler:null,method:"",shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },runIter:function (func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return; // |return false| skips a frame
            }
          }
          try {
            func();
          } catch (e) {
            if (e instanceof ExitStatus) {
              return;
            } else {
              if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
              throw e;
            }
          }
          if (Module['postMainLoop']) Module['postMainLoop']();
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            assert(typeof url == 'string', 'createObjectURL must return a url as a string');
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas ||
                                document['msPointerLockElement'] === canvas;
        }
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
          
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      function(){};
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   function(){}; // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", function(ev) {
              if (!Browser.pointerLock && canvas.requestPointerLock) {
                canvas.requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          contextHandle = GL.createContext(canvas, contextAttributes);
          ctx = GL.getContext(contextHandle).GLctx;
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx === 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
  
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement'] ||
               document['msFullScreenElement'] || document['msFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'] ||
                                      document['msExitFullscreen'] ||
                                      document['exitFullscreen'] ||
                                      function() {};
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else {
            
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
            
            if (Browser.resizeCanvas) Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
          Browser.updateCanvasDimensions(canvas);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
          document.addEventListener('MSFullscreenChange', fullScreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
        
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullScreen = canvasContainer['requestFullScreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullScreen'] ? function() { canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvasContainer.requestFullScreen();
      },nextRAF:0,fakeRequestAnimationFrame:function (func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= Browser.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            Browser.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          Browser.fakeRequestAnimationFrame(func);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           Browser.fakeRequestAnimationFrame;
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        Module['noExitRuntime'] = true;
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        Module['noExitRuntime'] = true;
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },getMouseWheelDelta:function (event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll': 
            delta = event.detail;
            break;
          case 'mousewheel': 
            delta = -event.wheelDelta;
            break;
          case 'wheel': 
            delta = event.deltaY;
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return Math.max(-1, Math.min(1, delta));
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
  
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
          // and we have no viable fallback.
          assert((typeof scrollX !== 'undefined') && (typeof scrollY !== 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
  
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var adjustedX = touch.pageX - (scrollX + rect.left);
            var adjustedY = touch.pageY - (scrollY + rect.top);
  
            adjustedX = adjustedX * (cw / rect.width);
            adjustedY = adjustedY * (ch / rect.height);
  
            var coords = { x: adjustedX, y: adjustedY };
            
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              Browser.lastTouches[touch.identifier] = Browser.touches[touch.identifier];
              Browser.touches[touch.identifier] = { x: adjustedX, y: adjustedY };
            } 
            return;
          }
  
          var x = event.pageX - (scrollX + rect.left);
          var y = event.pageY - (scrollY + rect.top);
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },updateCanvasDimensions:function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
             document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
             document['fullScreenElement'] || document['fullscreenElement'] ||
             document['msFullScreenElement'] || document['msFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:function () {
        var handle = Browser.nextWgetRequestHandle;
        Browser.nextWgetRequestHandle++;
        return handle;
      }};

   
  Module["_bitshift64Lshr"] = _bitshift64Lshr;

   
  Module["_memset"] = _memset;

  var _BDtoILow=true;

  function _ferror(stream) {
      // int ferror(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ferror.html
      stream = FS.getStreamFromPtr(stream);
      return Number(stream && stream.error);
    }

  var _BDtoIHigh=true;


  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 
  Module["_memcpy"] = _memcpy;

  
  
  function _lseek(fildes, offset, whence) {
      // off_t lseek(int fildes, off_t offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/lseek.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        return FS.llseek(stream, offset, whence);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fseek(stream, offset, whence) {
      // int fseek(FILE *stream, long offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fseek.html
      var fd = _fileno(stream);
      var ret = _lseek(fd, offset, whence);
      if (ret == -1) {
        return -1;
      }
      stream = FS.getStreamFromPtr(stream);
      stream.eof = false;
      return 0;
    }function _fseeko() {
  return _fseek.apply(null, arguments)
  }

  function _putchar(c) {
      // int putchar(int c);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/putchar.html
      return _fputc(c, HEAP32[((_stdout)>>2)]);
    }

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }

   
  Module["_memmove"] = _memmove;

  function ___errno_location() {
      return ___errno_state;
    }

  var _BItoD=true;

   
  Module["_strcpy"] = _strcpy;

  function _time(ptr) {
      var ret = (Date.now()/1000)|0;
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }


___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
_fputc.ret = allocate([0], "i8", ALLOC_STATIC);
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + 5242880;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");

 var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_DYNAMIC);
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);

  var Math_min = Math.min;
function nullFunc_ii(x) { Module["printErr"]("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info."); abort(x) }

function nullFunc_iiii(x) { Module["printErr"]("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info."); abort(x) }

function nullFunc_vii(x) { Module["printErr"]("Invalid function pointer called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info."); abort(x) }

function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

  function asmPrintInt(x, y) {
    Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
  }
  function asmPrintFloat(x, y) {
    Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
  }
  // EMSCRIPTEN_START_ASM
  var asm = (function(global, env, buffer) {
    'almost asm';
    var HEAP8 = new global.Int8Array(buffer);
    var HEAP16 = new global.Int16Array(buffer);
    var HEAP32 = new global.Int32Array(buffer);
    var HEAPU8 = new global.Uint8Array(buffer);
    var HEAPU16 = new global.Uint16Array(buffer);
    var HEAPU32 = new global.Uint32Array(buffer);
    var HEAPF32 = new global.Float32Array(buffer);
    var HEAPF64 = new global.Float64Array(buffer);
  
  var STACKTOP=env.STACKTOP|0;
  var STACK_MAX=env.STACK_MAX|0;
  var tempDoublePtr=env.tempDoublePtr|0;
  var ABORT=env.ABORT|0;
  var cttz_i8=env.cttz_i8|0;
  var ctlz_i8=env.ctlz_i8|0;
  var _stderr=env._stderr|0;
  var _stdout=env._stdout|0;

    var __THREW__ = 0;
    var threwValue = 0;
    var setjmpId = 0;
    var undef = 0;
    var nan = +env.NaN, inf = +env.Infinity;
    var tempInt = 0, tempBigInt = 0, tempBigIntP = 0, tempBigIntS = 0, tempBigIntR = 0.0, tempBigIntI = 0, tempBigIntD = 0, tempValue = 0, tempDouble = 0.0;
  
    var tempRet0 = 0;
    var tempRet1 = 0;
    var tempRet2 = 0;
    var tempRet3 = 0;
    var tempRet4 = 0;
    var tempRet5 = 0;
    var tempRet6 = 0;
    var tempRet7 = 0;
    var tempRet8 = 0;
    var tempRet9 = 0;
  var Math_floor=global.Math.floor;
  var Math_abs=global.Math.abs;
  var Math_sqrt=global.Math.sqrt;
  var Math_pow=global.Math.pow;
  var Math_cos=global.Math.cos;
  var Math_sin=global.Math.sin;
  var Math_tan=global.Math.tan;
  var Math_acos=global.Math.acos;
  var Math_asin=global.Math.asin;
  var Math_atan=global.Math.atan;
  var Math_atan2=global.Math.atan2;
  var Math_exp=global.Math.exp;
  var Math_log=global.Math.log;
  var Math_ceil=global.Math.ceil;
  var Math_imul=global.Math.imul;
  var abort=env.abort;
  var assert=env.assert;
  var asmPrintInt=env.asmPrintInt;
  var asmPrintFloat=env.asmPrintFloat;
  var Math_min=env.min;
  var nullFunc_ii=env.nullFunc_ii;
  var nullFunc_iiii=env.nullFunc_iiii;
  var nullFunc_vii=env.nullFunc_vii;
  var invoke_ii=env.invoke_ii;
  var invoke_iiii=env.invoke_iiii;
  var invoke_vii=env.invoke_vii;
  var _send=env._send;
  var _fread=env._fread;
  var _lseek=env._lseek;
  var __reallyNegative=env.__reallyNegative;
  var _write=env._write;
  var _fflush=env._fflush;
  var _pwrite=env._pwrite;
  var _strerror_r=env._strerror_r;
  var _open=env._open;
  var _sbrk=env._sbrk;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var _fileno=env._fileno;
  var _sysconf=env._sysconf;
  var _close=env._close;
  var _ferror=env._ferror;
  var _fseeko=env._fseeko;
  var _putchar=env._putchar;
  var _fseek=env._fseek;
  var _pread=env._pread;
  var _puts=env._puts;
  var _mkport=env._mkport;
  var _fclose=env._fclose;
  var _feof=env._feof;
  var _fsync=env._fsync;
  var ___errno_location=env.___errno_location;
  var _stat=env._stat;
  var _recv=env._recv;
  var _printf=env._printf;
  var __exit=env.__exit;
  var _read=env._read;
  var _fputc=env._fputc;
  var _abort=env._abort;
  var _fwrite=env._fwrite;
  var _time=env._time;
  var _fprintf=env._fprintf;
  var _strerror=env._strerror;
  var __formatString=env.__formatString;
  var _fputs=env._fputs;
  var _fopen=env._fopen;
  var _exit=env._exit;
  var ___setErrNo=env.___setErrNo;
  var tempFloat = 0.0;

  // EMSCRIPTEN_START_FUNCS
  function stackAlloc(size) {
    size = size|0;
    var ret = 0;
    ret = STACKTOP;
    STACKTOP = (STACKTOP + size)|0;
  STACKTOP = (STACKTOP + 7)&-8;
if ((STACKTOP|0) >= (STACK_MAX|0)) abort();

    return ret|0;
  }
  function stackSave() {
    return STACKTOP|0;
  }
  function stackRestore(top) {
    top = top|0;
    STACKTOP = top;
  }

  function setThrew(threw, value) {
    threw = threw|0;
    value = value|0;
    if ((__THREW__|0) == 0) {
      __THREW__ = threw;
      threwValue = value;
    }
  }
  function copyTempFloat(ptr) {
    ptr = ptr|0;
    HEAP8[tempDoublePtr>>0] = HEAP8[ptr>>0];
    HEAP8[tempDoublePtr+1>>0] = HEAP8[ptr+1>>0];
    HEAP8[tempDoublePtr+2>>0] = HEAP8[ptr+2>>0];
    HEAP8[tempDoublePtr+3>>0] = HEAP8[ptr+3>>0];
  }
  function copyTempDouble(ptr) {
    ptr = ptr|0;
    HEAP8[tempDoublePtr>>0] = HEAP8[ptr>>0];
    HEAP8[tempDoublePtr+1>>0] = HEAP8[ptr+1>>0];
    HEAP8[tempDoublePtr+2>>0] = HEAP8[ptr+2>>0];
    HEAP8[tempDoublePtr+3>>0] = HEAP8[ptr+3>>0];
    HEAP8[tempDoublePtr+4>>0] = HEAP8[ptr+4>>0];
    HEAP8[tempDoublePtr+5>>0] = HEAP8[ptr+5>>0];
    HEAP8[tempDoublePtr+6>>0] = HEAP8[ptr+6>>0];
    HEAP8[tempDoublePtr+7>>0] = HEAP8[ptr+7>>0];
  }
  function setTempRet0(value) {
    value = value|0;
    tempRet0 = value;
  }
  function getTempRet0() {
    return tempRet0|0;
  }
  
function _assoc_match_fn($ms) {
 $ms = $ms|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0;
 var $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0;
 var $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0;
 var $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0;
 var $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0;
 var $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0;
 var $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $haystack_prime = 0, $hp_arity = 0, $i = 0, $needle_prime = 0, $np_arity = 0, $rval = 0, $tmpp = 0, $tmpq = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $ms;
 $2 = $1;
 $3 = (($2) + 8|0);
 $4 = (($3) + 4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = (($5) + 8|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = (($7) + 28|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = $1;
 $11 = (($10) + 8|0);
 $12 = (($11) + 8|0);
 $13 = HEAP32[$12>>2]|0;
 $14 = (($13) + 28|0);
 $15 = HEAP32[$14>>2]|0;
 $16 = ($9|0)!=($15|0);
 if (!($16)) {
  $17 = $1;
  $18 = (($17) + 8|0);
  $19 = (($18) + 4|0);
  $20 = HEAP32[$19>>2]|0;
  $21 = (($20) + 8|0);
  $22 = HEAP32[$21>>2]|0;
  $23 = (($22) + 4|0);
  $24 = HEAP32[$23>>2]|0;
  $25 = $1;
  $26 = (($25) + 8|0);
  $27 = (($26) + 8|0);
  $28 = HEAP32[$27>>2]|0;
  $29 = (($28) + 4|0);
  $30 = HEAP32[$29>>2]|0;
  $31 = ($24|0)!=($30|0);
  if (!($31)) {
   $35 = $1;
   $36 = (($35) + 8|0);
   $37 = (($36) + 4|0);
   $38 = HEAP32[$37>>2]|0;
   $39 = (($38) + 8|0);
   $40 = HEAP32[$39>>2]|0;
   $41 = (($40) + 28|0);
   $42 = HEAP32[$41>>2]|0;
   $43 = ($42|0)==(0);
   if ($43) {
    $44 = $1;
    $45 = (($44) + 36|0);
    HEAP32[$45>>2] = 2;
    $46 = $1;
    $0 = $46;
    $327 = $0;
    STACKTOP = sp;return ($327|0);
   }
   $47 = (_new_node()|0);
   $needle_prime = $47;
   $48 = $1;
   $49 = (($48) + 8|0);
   $50 = (($49) + 4|0);
   $51 = HEAP32[$50>>2]|0;
   $52 = (($51) + 8|0);
   $53 = HEAP32[$52>>2]|0;
   $54 = $needle_prime;
   $55 = (($54) + 8|0);
   $56 = (($55) + 4|0);
   HEAP32[$56>>2] = $53;
   $57 = $needle_prime;
   $58 = (($57) + 8|0);
   $59 = (($58) + 4|0);
   $60 = HEAP32[$59>>2]|0;
   $61 = (($60) + 24|0);
   $62 = HEAP32[$61>>2]|0;
   $63 = (($62) + 1)|0;
   HEAP32[$61>>2] = $63;
   $np_arity = 1;
   $64 = $needle_prime;
   $tmpp = $64;
   while(1) {
    $65 = $tmpp;
    $66 = ($65|0)!=(0|0);
    if (!($66)) {
     break;
    }
    $67 = $tmpp;
    $68 = (($67) + 8|0);
    $69 = (($68) + 4|0);
    $70 = HEAP32[$69>>2]|0;
    $71 = (($70) + 28|0);
    $72 = HEAP32[$71>>2]|0;
    $73 = $1;
    $74 = (($73) + 8|0);
    $75 = (($74) + 4|0);
    $76 = HEAP32[$75>>2]|0;
    $77 = (($76) + 8|0);
    $78 = HEAP32[$77>>2]|0;
    $79 = (($78) + 28|0);
    $80 = HEAP32[$79>>2]|0;
    $81 = ($72|0)==($80|0);
    if ($81) {
     $82 = $tmpp;
     $83 = (($82) + 8|0);
     $84 = (($83) + 4|0);
     $85 = HEAP32[$84>>2]|0;
     $86 = (($85) + 4|0);
     $87 = HEAP32[$86>>2]|0;
     $88 = $1;
     $89 = (($88) + 8|0);
     $90 = (($89) + 4|0);
     $91 = HEAP32[$90>>2]|0;
     $92 = (($91) + 8|0);
     $93 = HEAP32[$92>>2]|0;
     $94 = (($93) + 4|0);
     $95 = HEAP32[$94>>2]|0;
     $96 = ($87|0)==($95|0);
     if ($96) {
      $97 = $tmpp;
      $98 = (($97) + 8|0);
      $99 = (($98) + 4|0);
      $100 = HEAP32[$99>>2]|0;
      $101 = (($100) + 28|0);
      $102 = HEAP32[$101>>2]|0;
      $103 = (($102) - 1)|0;
      $i = $103;
      while(1) {
       $104 = $i;
       $105 = ($104|0)>(0);
       if (!($105)) {
        break;
       }
       $106 = (_new_node()|0);
       $tmpq = $106;
       $107 = $tmpp;
       $108 = (($107) + 8|0);
       $109 = HEAP32[$108>>2]|0;
       $110 = $tmpq;
       $111 = (($110) + 8|0);
       HEAP32[$111>>2] = $109;
       $112 = $tmpq;
       $113 = $tmpp;
       $114 = (($113) + 8|0);
       HEAP32[$114>>2] = $112;
       $115 = $np_arity;
       $116 = (($115) + 1)|0;
       $np_arity = $116;
       $117 = $i;
       $118 = $tmpp;
       $119 = (($118) + 8|0);
       $120 = (($119) + 4|0);
       $121 = HEAP32[$120>>2]|0;
       $122 = (($121) + 8|0);
       $123 = (($122) + ($117<<2)|0);
       $124 = HEAP32[$123>>2]|0;
       $125 = $tmpq;
       $126 = (($125) + 8|0);
       $127 = (($126) + 4|0);
       HEAP32[$127>>2] = $124;
       $128 = $tmpq;
       $129 = (($128) + 8|0);
       $130 = (($129) + 4|0);
       $131 = HEAP32[$130>>2]|0;
       $132 = (($131) + 24|0);
       $133 = HEAP32[$132>>2]|0;
       $134 = (($133) + 1)|0;
       HEAP32[$132>>2] = $134;
       $135 = $i;
       $136 = (($135) + -1)|0;
       $i = $136;
      }
      $137 = $tmpp;
      $138 = (($137) + 8|0);
      $139 = (($138) + 4|0);
      $140 = HEAP32[$139>>2]|0;
      $tmpq = $140;
      $141 = $tmpp;
      $142 = (($141) + 8|0);
      $143 = (($142) + 4|0);
      $144 = HEAP32[$143>>2]|0;
      $145 = (($144) + 8|0);
      $146 = HEAP32[$145>>2]|0;
      $147 = $tmpp;
      $148 = (($147) + 8|0);
      $149 = (($148) + 4|0);
      HEAP32[$149>>2] = $146;
      $150 = $tmpp;
      $151 = (($150) + 8|0);
      $152 = (($151) + 4|0);
      $153 = HEAP32[$152>>2]|0;
      $154 = (($153) + 24|0);
      $155 = HEAP32[$154>>2]|0;
      $156 = (($155) + 1)|0;
      HEAP32[$154>>2] = $156;
      $157 = $tmpq;
      _free_node($157);
     } else {
      label = 15;
     }
    } else {
     label = 15;
    }
    if ((label|0) == 15) {
     label = 0;
     $158 = $tmpp;
     $159 = (($158) + 8|0);
     $160 = HEAP32[$159>>2]|0;
     $tmpp = $160;
    }
   }
   $161 = (_new_node()|0);
   $haystack_prime = $161;
   $162 = $1;
   $163 = (($162) + 8|0);
   $164 = (($163) + 8|0);
   $165 = HEAP32[$164>>2]|0;
   $166 = $haystack_prime;
   $167 = (($166) + 8|0);
   $168 = (($167) + 4|0);
   HEAP32[$168>>2] = $165;
   $169 = $haystack_prime;
   $170 = (($169) + 8|0);
   $171 = (($170) + 4|0);
   $172 = HEAP32[$171>>2]|0;
   $173 = (($172) + 24|0);
   $174 = HEAP32[$173>>2]|0;
   $175 = (($174) + 1)|0;
   HEAP32[$173>>2] = $175;
   $hp_arity = 1;
   $176 = $haystack_prime;
   $tmpp = $176;
   while(1) {
    $177 = $tmpp;
    $178 = ($177|0)!=(0|0);
    if (!($178)) {
     break;
    }
    $179 = $tmpp;
    $180 = (($179) + 8|0);
    $181 = (($180) + 4|0);
    $182 = HEAP32[$181>>2]|0;
    $183 = (($182) + 28|0);
    $184 = HEAP32[$183>>2]|0;
    $185 = $1;
    $186 = (($185) + 8|0);
    $187 = (($186) + 4|0);
    $188 = HEAP32[$187>>2]|0;
    $189 = (($188) + 8|0);
    $190 = HEAP32[$189>>2]|0;
    $191 = (($190) + 28|0);
    $192 = HEAP32[$191>>2]|0;
    $193 = ($184|0)==($192|0);
    if ($193) {
     $194 = $tmpp;
     $195 = (($194) + 8|0);
     $196 = (($195) + 4|0);
     $197 = HEAP32[$196>>2]|0;
     $198 = (($197) + 4|0);
     $199 = HEAP32[$198>>2]|0;
     $200 = $1;
     $201 = (($200) + 8|0);
     $202 = (($201) + 4|0);
     $203 = HEAP32[$202>>2]|0;
     $204 = (($203) + 8|0);
     $205 = HEAP32[$204>>2]|0;
     $206 = (($205) + 4|0);
     $207 = HEAP32[$206>>2]|0;
     $208 = ($199|0)==($207|0);
     if ($208) {
      $209 = $tmpp;
      $210 = (($209) + 8|0);
      $211 = (($210) + 4|0);
      $212 = HEAP32[$211>>2]|0;
      $213 = (($212) + 28|0);
      $214 = HEAP32[$213>>2]|0;
      $215 = (($214) - 1)|0;
      $i = $215;
      while(1) {
       $216 = $i;
       $217 = ($216|0)>(0);
       if (!($217)) {
        break;
       }
       $218 = (_new_node()|0);
       $tmpq = $218;
       $219 = $tmpp;
       $220 = (($219) + 8|0);
       $221 = HEAP32[$220>>2]|0;
       $222 = $tmpq;
       $223 = (($222) + 8|0);
       HEAP32[$223>>2] = $221;
       $224 = $tmpq;
       $225 = $tmpp;
       $226 = (($225) + 8|0);
       HEAP32[$226>>2] = $224;
       $227 = $hp_arity;
       $228 = (($227) + 1)|0;
       $hp_arity = $228;
       $229 = $i;
       $230 = $tmpp;
       $231 = (($230) + 8|0);
       $232 = (($231) + 4|0);
       $233 = HEAP32[$232>>2]|0;
       $234 = (($233) + 8|0);
       $235 = (($234) + ($229<<2)|0);
       $236 = HEAP32[$235>>2]|0;
       $237 = $tmpq;
       $238 = (($237) + 8|0);
       $239 = (($238) + 4|0);
       HEAP32[$239>>2] = $236;
       $240 = $tmpq;
       $241 = (($240) + 8|0);
       $242 = (($241) + 4|0);
       $243 = HEAP32[$242>>2]|0;
       $244 = (($243) + 24|0);
       $245 = HEAP32[$244>>2]|0;
       $246 = (($245) + 1)|0;
       HEAP32[$244>>2] = $246;
       $247 = $i;
       $248 = (($247) + -1)|0;
       $i = $248;
      }
      $249 = $tmpp;
      $250 = (($249) + 8|0);
      $251 = (($250) + 4|0);
      $252 = HEAP32[$251>>2]|0;
      $tmpq = $252;
      $253 = $tmpp;
      $254 = (($253) + 8|0);
      $255 = (($254) + 4|0);
      $256 = HEAP32[$255>>2]|0;
      $257 = (($256) + 8|0);
      $258 = HEAP32[$257>>2]|0;
      $259 = $tmpp;
      $260 = (($259) + 8|0);
      $261 = (($260) + 4|0);
      HEAP32[$261>>2] = $258;
      $262 = $tmpp;
      $263 = (($262) + 8|0);
      $264 = (($263) + 4|0);
      $265 = HEAP32[$264>>2]|0;
      $266 = (($265) + 24|0);
      $267 = HEAP32[$266>>2]|0;
      $268 = (($267) + 1)|0;
      HEAP32[$266>>2] = $268;
      $269 = $tmpq;
      _free_node($269);
     } else {
      label = 26;
     }
    } else {
     label = 26;
    }
    if ((label|0) == 26) {
     label = 0;
     $270 = $tmpp;
     $271 = (($270) + 8|0);
     $272 = HEAP32[$271>>2]|0;
     $tmpp = $272;
    }
   }
   $273 = $np_arity;
   $274 = $hp_arity;
   $275 = ($273|0)!=($274|0);
   if ($275) {
    $276 = $needle_prime;
    _free_node($276);
    $277 = $haystack_prime;
    _free_node($277);
    $278 = $1;
    $279 = (($278) + 36|0);
    HEAP32[$279>>2] = 1;
    $280 = $1;
    $0 = $280;
    $327 = $0;
    STACKTOP = sp;return ($327|0);
   }
   $281 = $1;
   $rval = $281;
   $282 = $1;
   $283 = (($282) + 36|0);
   HEAP32[$283>>2] = 3;
   while(1) {
    $284 = $needle_prime;
    $285 = ($284|0)!=(0|0);
    if (!($285)) {
     break;
    }
    $286 = $needle_prime;
    $287 = (($286) + 8|0);
    $288 = HEAP32[$287>>2]|0;
    $tmpp = $288;
    $289 = $haystack_prime;
    $290 = (($289) + 8|0);
    $291 = HEAP32[$290>>2]|0;
    $tmpq = $291;
    $292 = $rval;
    $293 = $needle_prime;
    $294 = (($293) + 8|0);
    HEAP32[$294>>2] = $292;
    $295 = $rval;
    $296 = (($295) + 24|0);
    $297 = HEAP32[$296>>2]|0;
    $298 = (($297) + 1)|0;
    HEAP32[$296>>2] = $298;
    $299 = $needle_prime;
    $rval = $299;
    $300 = $1;
    $301 = $rval;
    $302 = (($301) + 20|0);
    HEAP32[$302>>2] = $300;
    $303 = $haystack_prime;
    $304 = (($303) + 8|0);
    $305 = (($304) + 4|0);
    $306 = HEAP32[$305>>2]|0;
    $307 = $needle_prime;
    $308 = (($307) + 8|0);
    $309 = (($308) + 8|0);
    HEAP32[$309>>2] = $306;
    $310 = $needle_prime;
    $311 = (($310) + 8|0);
    $312 = (($311) + 8|0);
    $313 = HEAP32[$312>>2]|0;
    $314 = (($313) + 24|0);
    $315 = HEAP32[$314>>2]|0;
    $316 = (($315) + 1)|0;
    HEAP32[$314>>2] = $316;
    $317 = $tmpp;
    $needle_prime = $317;
    $318 = $tmpq;
    $319 = ($318|0)!=(0|0);
    if ($319) {
     $320 = $tmpq;
     $321 = (($320) + 24|0);
     $322 = HEAP32[$321>>2]|0;
     $323 = (($322) + 1)|0;
     HEAP32[$321>>2] = $323;
    }
    $324 = $haystack_prime;
    _free_node($324);
    $325 = $tmpq;
    $haystack_prime = $325;
   }
   $326 = $rval;
   $0 = $326;
   $327 = $0;
   STACKTOP = sp;return ($327|0);
  }
 }
 $32 = $1;
 $33 = (($32) + 36|0);
 HEAP32[$33>>2] = 1;
 $34 = $1;
 $0 = $34;
 $327 = $0;
 STACKTOP = sp;return ($327|0);
}
function _fnv_hash($m,$a,$bump) {
 $m = $m|0;
 $a = $a|0;
 $bump = $bump|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, $hval = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $m;
 $1 = $a;
 $2 = $bump;
 $3 = $2;
 $4 = ($3|0)!=(0);
 $5 = $4 ? 84696351 : -2128831035;
 $hval = $5;
 $i = 0;
 while(1) {
  $6 = $i;
  $7 = $0;
  $8 = ($6|0)<($7|0);
  if (!($8)) {
   break;
  }
  $9 = $i;
  $10 = $1;
  $11 = (($10) + ($9)|0);
  $12 = HEAP8[$11>>0]|0;
  $13 = $12 << 24 >> 24;
  $14 = $hval;
  $15 = $14 ^ $13;
  $hval = $15;
  $16 = $hval;
  $17 = Math_imul($16, 16777619)|0;
  $hval = $17;
  $18 = $i;
  $19 = (($18) + 1)|0;
  $i = $19;
 }
 $20 = $hval;
 STACKTOP = sp;return ($20|0);
}
function _bit_combo($n,$k,$h) {
 $n = $n|0;
 $k = $k|0;
 $h = $h|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $a = 0;
 var $i = 0, $j = 0, $rval = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 160|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $a = sp + 8|0;
 $0 = $n;
 $1 = $k;
 $2 = $h;
 $i = 0;
 while(1) {
  $3 = $i;
  $4 = $0;
  $5 = ($3|0)<($4|0);
  if (!($5)) {
   break;
  }
  $6 = $i;
  $7 = $i;
  $8 = (($a) + ($7<<2)|0);
  HEAP32[$8>>2] = $6;
  $9 = $i;
  $10 = (($9) + 1)|0;
  $i = $10;
 }
 $rval = 0;
 $i = 0;
 while(1) {
  $11 = $i;
  $12 = $1;
  $13 = ($11|0)<($12|0);
  if (!($13)) {
   break;
  }
  $14 = $2;
  $15 = $0;
  $16 = $i;
  $17 = (($15) - ($16))|0;
  $18 = (($14>>>0) % ($17>>>0))&-1;
  $j = $18;
  $19 = $0;
  $20 = $i;
  $21 = (($19) - ($20))|0;
  $22 = $2;
  $23 = (($22>>>0) / ($21>>>0))&-1;
  $2 = $23;
  $24 = $j;
  $25 = ($24|0)>(0);
  if ($25) {
   $26 = $i;
   $27 = $j;
   $28 = (($27) + ($26))|0;
   $j = $28;
   $29 = $j;
   $30 = (($a) + ($29<<2)|0);
   $31 = HEAP32[$30>>2]|0;
   $32 = $i;
   $33 = (($a) + ($32<<2)|0);
   $34 = HEAP32[$33>>2]|0;
   $35 = $34 ^ $31;
   HEAP32[$33>>2] = $35;
   $36 = $i;
   $37 = (($a) + ($36<<2)|0);
   $38 = HEAP32[$37>>2]|0;
   $39 = $j;
   $40 = (($a) + ($39<<2)|0);
   $41 = HEAP32[$40>>2]|0;
   $42 = $41 ^ $38;
   HEAP32[$40>>2] = $42;
   $43 = $j;
   $44 = (($a) + ($43<<2)|0);
   $45 = HEAP32[$44>>2]|0;
   $46 = $i;
   $47 = (($a) + ($46<<2)|0);
   $48 = HEAP32[$47>>2]|0;
   $49 = $48 ^ $45;
   HEAP32[$47>>2] = $49;
  }
  $50 = $i;
  $51 = (($a) + ($50<<2)|0);
  $52 = HEAP32[$51>>2]|0;
  $53 = 1 << $52;
  $54 = $rval;
  $55 = $54 | $53;
  $rval = $55;
  $56 = $i;
  $57 = (($56) + 1)|0;
  $i = $57;
 }
 $58 = $rval;
 STACKTOP = sp;return ($58|0);
}
function _needle_fn_wrapper($n,$f) {
 $n = $n|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0;
 var $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0;
 var $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0;
 var $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0;
 var $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0;
 var $98 = 0, $99 = 0, $fa = 0, $fb = 0, $hval = 0, $i = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 96|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer = sp + 48|0;
 $fa = sp + 24|0;
 $fb = sp;
 $0 = $n;
 $1 = $f;
 $2 = HEAP32[64>>2]|0;
 $3 = ($2|0)!=(0);
 if ($3) {
  $i = 0;
  while(1) {
   $4 = $i;
   $5 = HEAP32[80>>2]|0;
   $6 = ($4|0)<($5|0);
   if (!($6)) {
    break;
   }
   $7 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($7|0))|0);
   $8 = $i;
   $9 = (($8) + 1)|0;
   $i = $9;
  }
  $10 = $0;
  $11 = HEAP32[_stderr>>2]|0;
  _write_cooked_tree($10,$11);
  $12 = HEAP32[80>>2]|0;
  $13 = (($12) + 3)|0;
  HEAP32[80>>2] = $13;
 }
 $14 = $0;
 $15 = (($14) + 4|0);
 $16 = HEAP32[$15>>2]|0;
 $17 = (($16) + 32|0);
 $18 = HEAP32[$17>>2]|0;
 $19 = $0;
 $20 = $1;
 FUNCTION_TABLE_vii[$18 & 31]($19,$20);
 $21 = $0;
 $22 = HEAP32[$21>>2]|0;
 $23 = ($22|0)!=(0|0);
 if ($23) {
  $24 = $0;
  $25 = HEAP32[$24>>2]|0;
  $26 = (($25) + 16|0);
  $27 = HEAP32[$26>>2]|0;
  $28 = $0;
  $29 = HEAP32[$28>>2]|0;
  $30 = (($29) + 12|0);
  $31 = HEAP32[$30>>2]|0;
  $32 = (_fnv_hash($27,$31,0)|0);
  $hval = $32;
  $33 = $hval;
  $34 = (_bit_combo(32,3,$33)|0);
  $35 = $fa;
  $36 = $35;
  HEAP32[$36>>2] = $34;
  $37 = (($35) + 4)|0;
  $38 = $37;
  HEAP32[$38>>2] = 0;
  $39 = (($fa) + 8|0);
  $40 = $39;
  $41 = $40;
  HEAP32[$41>>2] = 0;
  $42 = (($40) + 4)|0;
  $43 = $42;
  HEAP32[$43>>2] = 0;
  $44 = (($fa) + 16|0);
  HEAP32[$44>>2] = 2;
  $45 = (_fnv_hash(0,72,0)|0);
  $hval = $45;
  $46 = $hval;
  $47 = (_bit_combo(32,3,$46)|0);
  $48 = $fb;
  $49 = $48;
  HEAP32[$49>>2] = $47;
  $50 = (($48) + 4)|0;
  $51 = $50;
  HEAP32[$51>>2] = 0;
  $52 = (($fb) + 8|0);
  $53 = $52;
  $54 = $53;
  HEAP32[$54>>2] = 0;
  $55 = (($53) + 4)|0;
  $56 = $55;
  HEAP32[$56>>2] = 0;
  $57 = (($fb) + 16|0);
  HEAP32[$57>>2] = 2;
  $58 = $1;
  $59 = $1;
  $60 = $1;
  $61 = (_bf_and($59,$60,$fb)|0);
  (_bf_or($58,$fa,$61)|0);
 }
 $62 = HEAP32[64>>2]|0;
 $63 = ($62|0)!=(0);
 if (!($63)) {
  STACKTOP = sp;return;
 }
 $64 = HEAP32[80>>2]|0;
 $65 = (($64) - 3)|0;
 HEAP32[80>>2] = $65;
 $i = 0;
 while(1) {
  $66 = $i;
  $67 = HEAP32[80>>2]|0;
  $68 = ($66|0)<($67|0);
  if (!($68)) {
   break;
  }
  $69 = HEAP32[_stderr>>2]|0;
  (_fputc(32,($69|0))|0);
  $70 = $i;
  $71 = (($70) + 1)|0;
  $i = $71;
 }
 $72 = HEAP32[_stderr>>2]|0;
 $73 = $1;
 $74 = (($73) + 8|0);
 $75 = $74;
 $76 = $75;
 $77 = HEAP32[$76>>2]|0;
 $78 = (($75) + 4)|0;
 $79 = $78;
 $80 = HEAP32[$79>>2]|0;
 $81 = $1;
 $82 = $81;
 $83 = $82;
 $84 = HEAP32[$83>>2]|0;
 $85 = (($82) + 4)|0;
 $86 = $85;
 $87 = HEAP32[$86>>2]|0;
 $88 = $1;
 $89 = (($88) + 16|0);
 $90 = HEAP32[$89>>2]|0;
 $91 = (($90) + 1)|0;
 $92 = $1;
 $93 = (_uint64_2_pop($92)|0);
 $94 = $vararg_buffer;
 $95 = $94;
 HEAP32[$95>>2] = $77;
 $96 = (($94) + 4)|0;
 $97 = $96;
 HEAP32[$97>>2] = $80;
 $vararg_ptr1 = (($vararg_buffer) + 8|0);
 $98 = $vararg_ptr1;
 $99 = $98;
 HEAP32[$99>>2] = $84;
 $100 = (($98) + 4)|0;
 $101 = $100;
 HEAP32[$101>>2] = $87;
 $vararg_ptr2 = (($vararg_buffer) + 16|0);
 HEAP32[$vararg_ptr2>>2] = $91;
 $vararg_ptr3 = (($vararg_buffer) + 20|0);
 HEAP32[$vararg_ptr3>>2] = $93;
 (_fprintf(($72|0),(88|0),($vararg_buffer|0))|0);
 STACKTOP = sp;return;
}
function _bf_or($z,$x,$y) {
 $z = $z|0;
 $x = $x|0;
 $y = $y|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0;
 var $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0;
 var $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0;
 var $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0;
 var $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0;
 var $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0;
 var $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0;
 var $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0;
 var $96 = 0, $97 = 0, $98 = 0, $99 = 0, $hi_lambda = 0, $i = 0, $trimbits = 0, $vararg_buffer = 0, $vararg_buffer10 = 0, $vararg_buffer4 = 0, $vararg_ptr1 = 0, $vararg_ptr13 = 0, $vararg_ptr14 = 0, $vararg_ptr15 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, $vararg_ptr7 = 0, $vararg_ptr8 = 0, $vararg_ptr9 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 112|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer10 = sp + 64|0;
 $vararg_buffer4 = sp + 40|0;
 $vararg_buffer = sp + 16|0;
 $trimbits = sp;
 $0 = $z;
 $1 = $x;
 $2 = $y;
 $3 = HEAP32[64>>2]|0;
 $4 = ($3|0)!=(0);
 if ($4) {
  $i = 0;
  while(1) {
   $5 = $i;
   $6 = HEAP32[80>>2]|0;
   $7 = ($5|0)<($6|0);
   if (!($7)) {
    break;
   }
   $8 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($8|0))|0);
   $9 = $i;
   $10 = (($9) + 1)|0;
   $i = $10;
  }
  $11 = HEAP32[_stderr>>2]|0;
  $12 = $1;
  $13 = (($12) + 8|0);
  $14 = $13;
  $15 = $14;
  $16 = HEAP32[$15>>2]|0;
  $17 = (($14) + 4)|0;
  $18 = $17;
  $19 = HEAP32[$18>>2]|0;
  $20 = $1;
  $21 = $20;
  $22 = $21;
  $23 = HEAP32[$22>>2]|0;
  $24 = (($21) + 4)|0;
  $25 = $24;
  $26 = HEAP32[$25>>2]|0;
  $27 = $1;
  $28 = (($27) + 16|0);
  $29 = HEAP32[$28>>2]|0;
  $30 = (($29) + 1)|0;
  $31 = $1;
  $32 = (_uint64_2_pop($31)|0);
  $33 = $vararg_buffer;
  $34 = $33;
  HEAP32[$34>>2] = $16;
  $35 = (($33) + 4)|0;
  $36 = $35;
  HEAP32[$36>>2] = $19;
  $vararg_ptr1 = (($vararg_buffer) + 8|0);
  $37 = $vararg_ptr1;
  $38 = $37;
  HEAP32[$38>>2] = $23;
  $39 = (($37) + 4)|0;
  $40 = $39;
  HEAP32[$40>>2] = $26;
  $vararg_ptr2 = (($vararg_buffer) + 16|0);
  HEAP32[$vararg_ptr2>>2] = $30;
  $vararg_ptr3 = (($vararg_buffer) + 20|0);
  HEAP32[$vararg_ptr3>>2] = $32;
  (_fprintf(($11|0),(384|0),($vararg_buffer|0))|0);
  $i = 0;
  while(1) {
   $41 = $i;
   $42 = HEAP32[80>>2]|0;
   $43 = ($41|0)<($42|0);
   if (!($43)) {
    break;
   }
   $44 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($44|0))|0);
   $45 = $i;
   $46 = (($45) + 1)|0;
   $i = $46;
  }
  $47 = HEAP32[_stderr>>2]|0;
  $48 = $2;
  $49 = (($48) + 8|0);
  $50 = $49;
  $51 = $50;
  $52 = HEAP32[$51>>2]|0;
  $53 = (($50) + 4)|0;
  $54 = $53;
  $55 = HEAP32[$54>>2]|0;
  $56 = $2;
  $57 = $56;
  $58 = $57;
  $59 = HEAP32[$58>>2]|0;
  $60 = (($57) + 4)|0;
  $61 = $60;
  $62 = HEAP32[$61>>2]|0;
  $63 = $2;
  $64 = (($63) + 16|0);
  $65 = HEAP32[$64>>2]|0;
  $66 = (($65) + 1)|0;
  $67 = $2;
  $68 = (_uint64_2_pop($67)|0);
  $69 = $vararg_buffer4;
  $70 = $69;
  HEAP32[$70>>2] = $52;
  $71 = (($69) + 4)|0;
  $72 = $71;
  HEAP32[$72>>2] = $55;
  $vararg_ptr7 = (($vararg_buffer4) + 8|0);
  $73 = $vararg_ptr7;
  $74 = $73;
  HEAP32[$74>>2] = $59;
  $75 = (($73) + 4)|0;
  $76 = $75;
  HEAP32[$76>>2] = $62;
  $vararg_ptr8 = (($vararg_buffer4) + 16|0);
  HEAP32[$vararg_ptr8>>2] = $66;
  $vararg_ptr9 = (($vararg_buffer4) + 20|0);
  HEAP32[$vararg_ptr9>>2] = $68;
  (_fprintf(($47|0),(352|0),($vararg_buffer4|0))|0);
 }
 $77 = $1;
 $78 = (($77) + 16|0);
 $79 = HEAP32[$78>>2]|0;
 $80 = $2;
 $81 = (($80) + 16|0);
 $82 = HEAP32[$81>>2]|0;
 $83 = ($79|0)<($82|0);
 if ($83) {
  $84 = $2;
  $85 = (($84) + 16|0);
  $86 = HEAP32[$85>>2]|0;
  $hi_lambda = $86;
  $87 = $1;
  $88 = (($87) + 16|0);
  $89 = HEAP32[$88>>2]|0;
  $90 = $0;
  $91 = (($90) + 16|0);
  HEAP32[$91>>2] = $89;
  $92 = $2;
  $93 = $92;
  $94 = $93;
  $95 = HEAP32[$94>>2]|0;
  $96 = (($93) + 4)|0;
  $97 = $96;
  $98 = HEAP32[$97>>2]|0;
  $99 = $1;
  $100 = $99;
  $101 = $100;
  $102 = HEAP32[$101>>2]|0;
  $103 = (($100) + 4)|0;
  $104 = $103;
  $105 = HEAP32[$104>>2]|0;
  $106 = $102 ^ -1;
  $107 = $105 ^ -1;
  $108 = $95 & $106;
  $109 = $98 & $107;
  $110 = $trimbits;
  $111 = $110;
  HEAP32[$111>>2] = $108;
  $112 = (($110) + 4)|0;
  $113 = $112;
  HEAP32[$113>>2] = $109;
  $114 = $2;
  $115 = (($114) + 8|0);
  $116 = $115;
  $117 = $116;
  $118 = HEAP32[$117>>2]|0;
  $119 = (($116) + 4)|0;
  $120 = $119;
  $121 = HEAP32[$120>>2]|0;
  $122 = $1;
  $123 = (($122) + 8|0);
  $124 = $123;
  $125 = $124;
  $126 = HEAP32[$125>>2]|0;
  $127 = (($124) + 4)|0;
  $128 = $127;
  $129 = HEAP32[$128>>2]|0;
  $130 = $126 ^ -1;
  $131 = $129 ^ -1;
  $132 = $118 & $130;
  $133 = $121 & $131;
  $134 = (($trimbits) + 8|0);
  $135 = $134;
  $136 = $135;
  HEAP32[$136>>2] = $132;
  $137 = (($135) + 4)|0;
  $138 = $137;
  HEAP32[$138>>2] = $133;
 } else {
  $139 = $1;
  $140 = (($139) + 16|0);
  $141 = HEAP32[$140>>2]|0;
  $hi_lambda = $141;
  $142 = $2;
  $143 = (($142) + 16|0);
  $144 = HEAP32[$143>>2]|0;
  $145 = $0;
  $146 = (($145) + 16|0);
  HEAP32[$146>>2] = $144;
  $147 = $1;
  $148 = $147;
  $149 = $148;
  $150 = HEAP32[$149>>2]|0;
  $151 = (($148) + 4)|0;
  $152 = $151;
  $153 = HEAP32[$152>>2]|0;
  $154 = $2;
  $155 = $154;
  $156 = $155;
  $157 = HEAP32[$156>>2]|0;
  $158 = (($155) + 4)|0;
  $159 = $158;
  $160 = HEAP32[$159>>2]|0;
  $161 = $157 ^ -1;
  $162 = $160 ^ -1;
  $163 = $150 & $161;
  $164 = $153 & $162;
  $165 = $trimbits;
  $166 = $165;
  HEAP32[$166>>2] = $163;
  $167 = (($165) + 4)|0;
  $168 = $167;
  HEAP32[$168>>2] = $164;
  $169 = $1;
  $170 = (($169) + 8|0);
  $171 = $170;
  $172 = $171;
  $173 = HEAP32[$172>>2]|0;
  $174 = (($171) + 4)|0;
  $175 = $174;
  $176 = HEAP32[$175>>2]|0;
  $177 = $2;
  $178 = (($177) + 8|0);
  $179 = $178;
  $180 = $179;
  $181 = HEAP32[$180>>2]|0;
  $182 = (($179) + 4)|0;
  $183 = $182;
  $184 = HEAP32[$183>>2]|0;
  $185 = $181 ^ -1;
  $186 = $184 ^ -1;
  $187 = $173 & $185;
  $188 = $176 & $186;
  $189 = (($trimbits) + 8|0);
  $190 = $189;
  $191 = $190;
  HEAP32[$191>>2] = $187;
  $192 = (($190) + 4)|0;
  $193 = $192;
  HEAP32[$193>>2] = $188;
 }
 $194 = $1;
 $195 = $194;
 $196 = $195;
 $197 = HEAP32[$196>>2]|0;
 $198 = (($195) + 4)|0;
 $199 = $198;
 $200 = HEAP32[$199>>2]|0;
 $201 = $2;
 $202 = $201;
 $203 = $202;
 $204 = HEAP32[$203>>2]|0;
 $205 = (($202) + 4)|0;
 $206 = $205;
 $207 = HEAP32[$206>>2]|0;
 $208 = $197 | $204;
 $209 = $200 | $207;
 $210 = $0;
 $211 = $210;
 $212 = $211;
 HEAP32[$212>>2] = $208;
 $213 = (($211) + 4)|0;
 $214 = $213;
 HEAP32[$214>>2] = $209;
 $215 = $1;
 $216 = (($215) + 8|0);
 $217 = $216;
 $218 = $217;
 $219 = HEAP32[$218>>2]|0;
 $220 = (($217) + 4)|0;
 $221 = $220;
 $222 = HEAP32[$221>>2]|0;
 $223 = $2;
 $224 = (($223) + 8|0);
 $225 = $224;
 $226 = $225;
 $227 = HEAP32[$226>>2]|0;
 $228 = (($225) + 4)|0;
 $229 = $228;
 $230 = HEAP32[$229>>2]|0;
 $231 = $219 | $227;
 $232 = $222 | $230;
 $233 = $0;
 $234 = (($233) + 8|0);
 $235 = $234;
 $236 = $235;
 HEAP32[$236>>2] = $231;
 $237 = (($235) + 4)|0;
 $238 = $237;
 HEAP32[$238>>2] = $232;
 $i = 63;
 while(1) {
  $239 = $hi_lambda;
  $240 = $0;
  $241 = (($240) + 16|0);
  $242 = HEAP32[$241>>2]|0;
  $243 = ($239|0)>($242|0);
  if ($243) {
   $244 = $i;
   $245 = ($244|0)>=(0);
   $362 = $245;
  } else {
   $362 = 0;
  }
  if (!($362)) {
   break;
  }
  $246 = (($trimbits) + 8|0);
  $247 = $246;
  $248 = $247;
  $249 = HEAP32[$248>>2]|0;
  $250 = (($247) + 4)|0;
  $251 = $250;
  $252 = HEAP32[$251>>2]|0;
  $253 = $i;
  $254 = (_bitshift64Shl(1,0,($253|0))|0);
  $255 = tempRet0;
  $256 = $249 & $254;
  $257 = $252 & $255;
  $258 = ($256|0)!=(0);
  $259 = ($257|0)!=(0);
  $260 = $258 | $259;
  if ($260) {
   $261 = $i;
   $262 = (_bitshift64Shl(1,0,($261|0))|0);
   $263 = tempRet0;
   $264 = $0;
   $265 = (($264) + 8|0);
   $266 = $265;
   $267 = $266;
   $268 = HEAP32[$267>>2]|0;
   $269 = (($266) + 4)|0;
   $270 = $269;
   $271 = HEAP32[$270>>2]|0;
   $272 = $268 ^ $262;
   $273 = $271 ^ $263;
   $274 = $265;
   $275 = $274;
   HEAP32[$275>>2] = $272;
   $276 = (($274) + 4)|0;
   $277 = $276;
   HEAP32[$277>>2] = $273;
   $278 = $hi_lambda;
   $279 = (($278) + -1)|0;
   $hi_lambda = $279;
  }
  $280 = $i;
  $281 = (($280) + -1)|0;
  $i = $281;
 }
 $i = 63;
 while(1) {
  $282 = $hi_lambda;
  $283 = $0;
  $284 = (($283) + 16|0);
  $285 = HEAP32[$284>>2]|0;
  $286 = ($282|0)>($285|0);
  if ($286) {
   $287 = $i;
   $288 = ($287|0)>=(0);
   $363 = $288;
  } else {
   $363 = 0;
  }
  if (!($363)) {
   break;
  }
  $289 = $trimbits;
  $290 = $289;
  $291 = HEAP32[$290>>2]|0;
  $292 = (($289) + 4)|0;
  $293 = $292;
  $294 = HEAP32[$293>>2]|0;
  $295 = $i;
  $296 = (_bitshift64Shl(1,0,($295|0))|0);
  $297 = tempRet0;
  $298 = $291 & $296;
  $299 = $294 & $297;
  $300 = ($298|0)!=(0);
  $301 = ($299|0)!=(0);
  $302 = $300 | $301;
  if ($302) {
   $303 = $i;
   $304 = (_bitshift64Shl(1,0,($303|0))|0);
   $305 = tempRet0;
   $306 = $0;
   $307 = $306;
   $308 = $307;
   $309 = HEAP32[$308>>2]|0;
   $310 = (($307) + 4)|0;
   $311 = $310;
   $312 = HEAP32[$311>>2]|0;
   $313 = $309 ^ $304;
   $314 = $312 ^ $305;
   $315 = $306;
   $316 = $315;
   HEAP32[$316>>2] = $313;
   $317 = (($315) + 4)|0;
   $318 = $317;
   HEAP32[$318>>2] = $314;
   $319 = $hi_lambda;
   $320 = (($319) + -1)|0;
   $hi_lambda = $320;
  }
  $321 = $i;
  $322 = (($321) + -1)|0;
  $i = $322;
 }
 $323 = HEAP32[64>>2]|0;
 $324 = ($323|0)!=(0);
 if (!($324)) {
  $361 = $0;
  STACKTOP = sp;return ($361|0);
 }
 $i = 0;
 while(1) {
  $325 = $i;
  $326 = HEAP32[80>>2]|0;
  $327 = ($325|0)<($326|0);
  if (!($327)) {
   break;
  }
  $328 = HEAP32[_stderr>>2]|0;
  (_fputc(32,($328|0))|0);
  $329 = $i;
  $330 = (($329) + 1)|0;
  $i = $330;
 }
 $331 = HEAP32[_stderr>>2]|0;
 $332 = $0;
 $333 = (($332) + 8|0);
 $334 = $333;
 $335 = $334;
 $336 = HEAP32[$335>>2]|0;
 $337 = (($334) + 4)|0;
 $338 = $337;
 $339 = HEAP32[$338>>2]|0;
 $340 = $0;
 $341 = $340;
 $342 = $341;
 $343 = HEAP32[$342>>2]|0;
 $344 = (($341) + 4)|0;
 $345 = $344;
 $346 = HEAP32[$345>>2]|0;
 $347 = $0;
 $348 = (($347) + 16|0);
 $349 = HEAP32[$348>>2]|0;
 $350 = (($349) + 1)|0;
 $351 = $0;
 $352 = (_uint64_2_pop($351)|0);
 $353 = $vararg_buffer10;
 $354 = $353;
 HEAP32[$354>>2] = $336;
 $355 = (($353) + 4)|0;
 $356 = $355;
 HEAP32[$356>>2] = $339;
 $vararg_ptr13 = (($vararg_buffer10) + 8|0);
 $357 = $vararg_ptr13;
 $358 = $357;
 HEAP32[$358>>2] = $343;
 $359 = (($357) + 4)|0;
 $360 = $359;
 HEAP32[$360>>2] = $346;
 $vararg_ptr14 = (($vararg_buffer10) + 16|0);
 HEAP32[$vararg_ptr14>>2] = $350;
 $vararg_ptr15 = (($vararg_buffer10) + 20|0);
 HEAP32[$vararg_ptr15>>2] = $352;
 (_fprintf(($331|0),(192|0),($vararg_buffer10|0))|0);
 $361 = $0;
 STACKTOP = sp;return ($361|0);
}
function _bf_and($z,$x,$y) {
 $z = $z|0;
 $x = $x|0;
 $y = $y|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0;
 var $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0;
 var $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0;
 var $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0;
 var $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0;
 var $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0;
 var $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0;
 var $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0;
 var $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0;
 var $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0;
 var $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0;
 var $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0;
 var $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0;
 var $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0;
 var $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0;
 var $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0;
 var $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0;
 var $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0;
 var $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0;
 var $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0;
 var $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0;
 var $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $a_max = 0, $a_min = 0, $ab_min = 0, $abc_min = 0, $ac_min = 0, $b_max = 0, $b_min = 0, $bc_min = 0, $best_filter = 0, $c_max = 0, $c_min = 0, $i = 0, $vararg_buffer = 0, $vararg_buffer10 = 0;
 var $vararg_buffer4 = 0, $vararg_ptr1 = 0, $vararg_ptr13 = 0, $vararg_ptr14 = 0, $vararg_ptr15 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, $vararg_ptr7 = 0, $vararg_ptr8 = 0, $vararg_ptr9 = 0, $xybits = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 160|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer10 = sp + 64|0;
 $vararg_buffer4 = sp + 40|0;
 $vararg_buffer = sp + 16|0;
 $xybits = sp;
 $1 = $z;
 $2 = $x;
 $3 = $y;
 $4 = HEAP32[64>>2]|0;
 $5 = ($4|0)!=(0);
 if ($5) {
  $i = 0;
  while(1) {
   $6 = $i;
   $7 = HEAP32[80>>2]|0;
   $8 = ($6|0)<($7|0);
   if (!($8)) {
    break;
   }
   $9 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($9|0))|0);
   $10 = $i;
   $11 = (($10) + 1)|0;
   $i = $11;
  }
  $12 = HEAP32[_stderr>>2]|0;
  $13 = $2;
  $14 = (($13) + 8|0);
  $15 = $14;
  $16 = $15;
  $17 = HEAP32[$16>>2]|0;
  $18 = (($15) + 4)|0;
  $19 = $18;
  $20 = HEAP32[$19>>2]|0;
  $21 = $2;
  $22 = $21;
  $23 = $22;
  $24 = HEAP32[$23>>2]|0;
  $25 = (($22) + 4)|0;
  $26 = $25;
  $27 = HEAP32[$26>>2]|0;
  $28 = $2;
  $29 = (($28) + 16|0);
  $30 = HEAP32[$29>>2]|0;
  $31 = (($30) + 1)|0;
  $32 = $2;
  $33 = (_uint64_2_pop($32)|0);
  $34 = $vararg_buffer;
  $35 = $34;
  HEAP32[$35>>2] = $17;
  $36 = (($34) + 4)|0;
  $37 = $36;
  HEAP32[$37>>2] = $20;
  $vararg_ptr1 = (($vararg_buffer) + 8|0);
  $38 = $vararg_ptr1;
  $39 = $38;
  HEAP32[$39>>2] = $24;
  $40 = (($38) + 4)|0;
  $41 = $40;
  HEAP32[$41>>2] = $27;
  $vararg_ptr2 = (($vararg_buffer) + 16|0);
  HEAP32[$vararg_ptr2>>2] = $31;
  $vararg_ptr3 = (($vararg_buffer) + 20|0);
  HEAP32[$vararg_ptr3>>2] = $33;
  (_fprintf(($12|0),(320|0),($vararg_buffer|0))|0);
  $i = 0;
  while(1) {
   $42 = $i;
   $43 = HEAP32[80>>2]|0;
   $44 = ($42|0)<($43|0);
   if (!($44)) {
    break;
   }
   $45 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($45|0))|0);
   $46 = $i;
   $47 = (($46) + 1)|0;
   $i = $47;
  }
  $48 = HEAP32[_stderr>>2]|0;
  $49 = $3;
  $50 = (($49) + 8|0);
  $51 = $50;
  $52 = $51;
  $53 = HEAP32[$52>>2]|0;
  $54 = (($51) + 4)|0;
  $55 = $54;
  $56 = HEAP32[$55>>2]|0;
  $57 = $3;
  $58 = $57;
  $59 = $58;
  $60 = HEAP32[$59>>2]|0;
  $61 = (($58) + 4)|0;
  $62 = $61;
  $63 = HEAP32[$62>>2]|0;
  $64 = $3;
  $65 = (($64) + 16|0);
  $66 = HEAP32[$65>>2]|0;
  $67 = (($66) + 1)|0;
  $68 = $3;
  $69 = (_uint64_2_pop($68)|0);
  $70 = $vararg_buffer4;
  $71 = $70;
  HEAP32[$71>>2] = $53;
  $72 = (($70) + 4)|0;
  $73 = $72;
  HEAP32[$73>>2] = $56;
  $vararg_ptr7 = (($vararg_buffer4) + 8|0);
  $74 = $vararg_ptr7;
  $75 = $74;
  HEAP32[$75>>2] = $60;
  $76 = (($74) + 4)|0;
  $77 = $76;
  HEAP32[$77>>2] = $63;
  $vararg_ptr8 = (($vararg_buffer4) + 16|0);
  HEAP32[$vararg_ptr8>>2] = $67;
  $vararg_ptr9 = (($vararg_buffer4) + 20|0);
  HEAP32[$vararg_ptr9>>2] = $69;
  (_fprintf(($48|0),(352|0),($vararg_buffer4|0))|0);
 }
 $78 = $2;
 $79 = $78;
 $80 = $79;
 $81 = HEAP32[$80>>2]|0;
 $82 = (($79) + 4)|0;
 $83 = $82;
 $84 = HEAP32[$83>>2]|0;
 $85 = $3;
 $86 = $85;
 $87 = $86;
 $88 = HEAP32[$87>>2]|0;
 $89 = (($86) + 4)|0;
 $90 = $89;
 $91 = HEAP32[$90>>2]|0;
 $92 = $81 & $88;
 $93 = $84 & $91;
 $94 = $xybits;
 $95 = $94;
 HEAP32[$95>>2] = $92;
 $96 = (($94) + 4)|0;
 $97 = $96;
 HEAP32[$97>>2] = $93;
 $98 = $2;
 $99 = (($98) + 8|0);
 $100 = $99;
 $101 = $100;
 $102 = HEAP32[$101>>2]|0;
 $103 = (($100) + 4)|0;
 $104 = $103;
 $105 = HEAP32[$104>>2]|0;
 $106 = $3;
 $107 = (($106) + 8|0);
 $108 = $107;
 $109 = $108;
 $110 = HEAP32[$109>>2]|0;
 $111 = (($108) + 4)|0;
 $112 = $111;
 $113 = HEAP32[$112>>2]|0;
 $114 = $102 & $110;
 $115 = $105 & $113;
 $116 = (($xybits) + 8|0);
 $117 = $116;
 $118 = $117;
 HEAP32[$118>>2] = $114;
 $119 = (($117) + 4)|0;
 $120 = $119;
 HEAP32[$120>>2] = $115;
 $121 = (_uint64_2_pop($xybits)|0);
 $b_max = $121;
 $122 = $2;
 $123 = (_uint64_2_pop($122)|0);
 $124 = $b_max;
 $125 = (($123) - ($124))|0;
 $a_max = $125;
 $126 = $3;
 $127 = (_uint64_2_pop($126)|0);
 $128 = $b_max;
 $129 = (($127) - ($128))|0;
 $c_max = $129;
 $130 = $a_max;
 $131 = $b_max;
 $132 = (($130) + ($131))|0;
 $133 = $c_max;
 $134 = (($132) + ($133))|0;
 $135 = ($134|0)==(0);
 if ($135) {
  $136 = $2;
  $137 = (($136) + 16|0);
  $138 = HEAP32[$137>>2]|0;
  $139 = ($138|0)<(0);
  if ($139) {
   $140 = $3;
   $141 = (($140) + 16|0);
   $142 = HEAP32[$141>>2]|0;
   $143 = ($142|0)<(0);
   if ($143) {
    $144 = $1;
    $145 = (_bf_true($144)|0);
    $148 = $145;
   } else {
    label = 15;
   }
  } else {
   label = 15;
  }
  if ((label|0) == 15) {
   $146 = $1;
   $147 = (_bf_false($146)|0);
   $148 = $147;
  }
  $0 = $148;
  $625 = $0;
  STACKTOP = sp;return ($625|0);
 }
 $149 = $2;
 $150 = (($149) + 16|0);
 $151 = HEAP32[$150>>2]|0;
 $152 = (($151) + 1)|0;
 $153 = $b_max;
 $154 = (($152) - ($153))|0;
 $a_min = $154;
 $155 = $2;
 $156 = (($155) + 16|0);
 $157 = HEAP32[$156>>2]|0;
 $158 = (($157) + 1)|0;
 $159 = $a_max;
 $160 = (($158) - ($159))|0;
 $b_min = $160;
 $161 = $3;
 $162 = (($161) + 16|0);
 $163 = HEAP32[$162>>2]|0;
 $164 = (($163) + 1)|0;
 $165 = $c_max;
 $166 = (($164) - ($165))|0;
 $167 = $b_min;
 $168 = ($166|0)>($167|0);
 if ($168) {
  $169 = $3;
  $170 = (($169) + 16|0);
  $171 = HEAP32[$170>>2]|0;
  $172 = (($171) + 1)|0;
  $173 = $c_max;
  $174 = (($172) - ($173))|0;
  $b_min = $174;
 }
 $175 = $3;
 $176 = (($175) + 16|0);
 $177 = HEAP32[$176>>2]|0;
 $178 = (($177) + 1)|0;
 $179 = $b_max;
 $180 = (($178) - ($179))|0;
 $c_min = $180;
 $181 = $a_min;
 $182 = ($181|0)<(0);
 if ($182) {
  $a_min = 0;
 }
 $183 = $b_min;
 $184 = ($183|0)<(0);
 if ($184) {
  $b_min = 0;
 }
 $185 = $c_min;
 $186 = ($185|0)<(0);
 if ($186) {
  $c_min = 0;
 }
 $187 = $a_min;
 $188 = $b_min;
 $189 = (($187) + ($188))|0;
 $ab_min = $189;
 $190 = $2;
 $191 = (($190) + 16|0);
 $192 = HEAP32[$191>>2]|0;
 $193 = (($192) + 1)|0;
 $194 = $ab_min;
 $195 = ($193|0)>($194|0);
 if ($195) {
  $196 = $2;
  $197 = (($196) + 16|0);
  $198 = HEAP32[$197>>2]|0;
  $199 = (($198) + 1)|0;
  $ab_min = $199;
 }
 $200 = $b_min;
 $201 = $c_min;
 $202 = (($200) + ($201))|0;
 $bc_min = $202;
 $203 = $3;
 $204 = (($203) + 16|0);
 $205 = HEAP32[$204>>2]|0;
 $206 = (($205) + 1)|0;
 $207 = $bc_min;
 $208 = ($206|0)>($207|0);
 if ($208) {
  $209 = $3;
  $210 = (($209) + 16|0);
  $211 = HEAP32[$210>>2]|0;
  $212 = (($211) + 1)|0;
  $bc_min = $212;
 }
 $213 = $a_min;
 $214 = $b_min;
 $215 = (($213) + ($214))|0;
 $216 = $c_min;
 $217 = (($215) + ($216))|0;
 $abc_min = $217;
 $218 = $2;
 $219 = (($218) + 16|0);
 $220 = HEAP32[$219>>2]|0;
 $221 = $3;
 $222 = (($221) + 16|0);
 $223 = HEAP32[$222>>2]|0;
 $224 = (($220) + ($223))|0;
 $225 = (($224) + 2)|0;
 $226 = $b_max;
 $227 = (($225) - ($226))|0;
 $228 = $abc_min;
 $229 = ($227|0)>($228|0);
 if ($229) {
  $230 = $2;
  $231 = (($230) + 16|0);
  $232 = HEAP32[$231>>2]|0;
  $233 = $3;
  $234 = (($233) + 16|0);
  $235 = HEAP32[$234>>2]|0;
  $236 = (($232) + ($235))|0;
  $237 = (($236) + 2)|0;
  $238 = $b_max;
  $239 = (($237) - ($238))|0;
  $abc_min = $239;
 }
 $240 = $a_min;
 $241 = $c_min;
 $242 = (($240) + ($241))|0;
 $ac_min = $242;
 $243 = $abc_min;
 $244 = $b_max;
 $245 = (($243) - ($244))|0;
 $246 = $ac_min;
 $247 = ($245|0)>($246|0);
 if ($247) {
  $248 = $abc_min;
  $249 = $b_max;
  $250 = (($248) - ($249))|0;
  $ac_min = $250;
 }
 $251 = $a_min;
 $252 = $a_max;
 $253 = (($252|0) / 3)&-1;
 $254 = ($251|0)>($253|0);
 $255 = $254 ? 0 : 4;
 $256 = $b_min;
 $257 = $b_max;
 $258 = (($257|0) / 3)&-1;
 $259 = ($256|0)>($258|0);
 $260 = $259 ? 0 : 2;
 $261 = (($255) + ($260))|0;
 $262 = $c_min;
 $263 = $c_max;
 $264 = (($263|0) / 3)&-1;
 $265 = ($262|0)>($264|0);
 $266 = $265 ? 0 : 1;
 $267 = (($261) + ($266))|0;
 $best_filter = $267;
 $268 = $best_filter;
 $269 = ($268|0)==(7);
 if ($269) {
  $270 = $a_min;
  $271 = ($270|0)>(0);
  $272 = $271 ? 0 : 4;
  $273 = $b_min;
  $274 = ($273|0)>(0);
  $275 = $274 ? 0 : 2;
  $276 = (($272) + ($275))|0;
  $277 = $c_min;
  $278 = ($277|0)>(0);
  $279 = $278 ? 0 : 1;
  $280 = (($276) + ($279))|0;
  $best_filter = $280;
 }
 $281 = $best_filter;
 switch ($281|0) {
 case 0:  {
  $282 = $2;
  $283 = $282;
  $284 = $283;
  $285 = HEAP32[$284>>2]|0;
  $286 = (($283) + 4)|0;
  $287 = $286;
  $288 = HEAP32[$287>>2]|0;
  $289 = $3;
  $290 = $289;
  $291 = $290;
  $292 = HEAP32[$291>>2]|0;
  $293 = (($290) + 4)|0;
  $294 = $293;
  $295 = HEAP32[$294>>2]|0;
  $296 = $285 | $292;
  $297 = $288 | $295;
  $298 = $1;
  $299 = $298;
  $300 = $299;
  HEAP32[$300>>2] = $296;
  $301 = (($299) + 4)|0;
  $302 = $301;
  HEAP32[$302>>2] = $297;
  $303 = $2;
  $304 = (($303) + 8|0);
  $305 = $304;
  $306 = $305;
  $307 = HEAP32[$306>>2]|0;
  $308 = (($305) + 4)|0;
  $309 = $308;
  $310 = HEAP32[$309>>2]|0;
  $311 = $3;
  $312 = (($311) + 8|0);
  $313 = $312;
  $314 = $313;
  $315 = HEAP32[$314>>2]|0;
  $316 = (($313) + 4)|0;
  $317 = $316;
  $318 = HEAP32[$317>>2]|0;
  $319 = $307 | $315;
  $320 = $310 | $318;
  $321 = $1;
  $322 = (($321) + 8|0);
  $323 = $322;
  $324 = $323;
  HEAP32[$324>>2] = $319;
  $325 = (($323) + 4)|0;
  $326 = $325;
  HEAP32[$326>>2] = $320;
  $327 = $abc_min;
  $328 = (($327) - 1)|0;
  $329 = $1;
  $330 = (($329) + 16|0);
  HEAP32[$330>>2] = $328;
  break;
 }
 case 1:  {
  $331 = $2;
  $332 = $331;
  $333 = $332;
  $334 = HEAP32[$333>>2]|0;
  $335 = (($332) + 4)|0;
  $336 = $335;
  $337 = HEAP32[$336>>2]|0;
  $338 = $1;
  $339 = $338;
  $340 = $339;
  HEAP32[$340>>2] = $334;
  $341 = (($339) + 4)|0;
  $342 = $341;
  HEAP32[$342>>2] = $337;
  $343 = $2;
  $344 = (($343) + 8|0);
  $345 = $344;
  $346 = $345;
  $347 = HEAP32[$346>>2]|0;
  $348 = (($345) + 4)|0;
  $349 = $348;
  $350 = HEAP32[$349>>2]|0;
  $351 = $1;
  $352 = (($351) + 8|0);
  $353 = $352;
  $354 = $353;
  HEAP32[$354>>2] = $347;
  $355 = (($353) + 4)|0;
  $356 = $355;
  HEAP32[$356>>2] = $350;
  $357 = $ab_min;
  $358 = (($357) - 1)|0;
  $359 = $1;
  $360 = (($359) + 16|0);
  HEAP32[$360>>2] = $358;
  break;
 }
 case 2:  {
  $361 = $2;
  $362 = $361;
  $363 = $362;
  $364 = HEAP32[$363>>2]|0;
  $365 = (($362) + 4)|0;
  $366 = $365;
  $367 = HEAP32[$366>>2]|0;
  $368 = $3;
  $369 = $368;
  $370 = $369;
  $371 = HEAP32[$370>>2]|0;
  $372 = (($369) + 4)|0;
  $373 = $372;
  $374 = HEAP32[$373>>2]|0;
  $375 = $364 ^ $371;
  $376 = $367 ^ $374;
  $377 = $1;
  $378 = $377;
  $379 = $378;
  HEAP32[$379>>2] = $375;
  $380 = (($378) + 4)|0;
  $381 = $380;
  HEAP32[$381>>2] = $376;
  $382 = $2;
  $383 = (($382) + 8|0);
  $384 = $383;
  $385 = $384;
  $386 = HEAP32[$385>>2]|0;
  $387 = (($384) + 4)|0;
  $388 = $387;
  $389 = HEAP32[$388>>2]|0;
  $390 = $3;
  $391 = (($390) + 8|0);
  $392 = $391;
  $393 = $392;
  $394 = HEAP32[$393>>2]|0;
  $395 = (($392) + 4)|0;
  $396 = $395;
  $397 = HEAP32[$396>>2]|0;
  $398 = $386 ^ $394;
  $399 = $389 ^ $397;
  $400 = $1;
  $401 = (($400) + 8|0);
  $402 = $401;
  $403 = $402;
  HEAP32[$403>>2] = $398;
  $404 = (($402) + 4)|0;
  $405 = $404;
  HEAP32[$405>>2] = $399;
  $406 = $ac_min;
  $407 = (($406) - 1)|0;
  $408 = $1;
  $409 = (($408) + 16|0);
  HEAP32[$409>>2] = $407;
  break;
 }
 case 3:  {
  $410 = $2;
  $411 = $410;
  $412 = $411;
  $413 = HEAP32[$412>>2]|0;
  $414 = (($411) + 4)|0;
  $415 = $414;
  $416 = HEAP32[$415>>2]|0;
  $417 = $3;
  $418 = $417;
  $419 = $418;
  $420 = HEAP32[$419>>2]|0;
  $421 = (($418) + 4)|0;
  $422 = $421;
  $423 = HEAP32[$422>>2]|0;
  $424 = $420 ^ -1;
  $425 = $423 ^ -1;
  $426 = $413 & $424;
  $427 = $416 & $425;
  $428 = $1;
  $429 = $428;
  $430 = $429;
  HEAP32[$430>>2] = $426;
  $431 = (($429) + 4)|0;
  $432 = $431;
  HEAP32[$432>>2] = $427;
  $433 = $2;
  $434 = (($433) + 8|0);
  $435 = $434;
  $436 = $435;
  $437 = HEAP32[$436>>2]|0;
  $438 = (($435) + 4)|0;
  $439 = $438;
  $440 = HEAP32[$439>>2]|0;
  $441 = $3;
  $442 = (($441) + 8|0);
  $443 = $442;
  $444 = $443;
  $445 = HEAP32[$444>>2]|0;
  $446 = (($443) + 4)|0;
  $447 = $446;
  $448 = HEAP32[$447>>2]|0;
  $449 = $445 ^ -1;
  $450 = $448 ^ -1;
  $451 = $437 & $449;
  $452 = $440 & $450;
  $453 = $1;
  $454 = (($453) + 8|0);
  $455 = $454;
  $456 = $455;
  HEAP32[$456>>2] = $451;
  $457 = (($455) + 4)|0;
  $458 = $457;
  HEAP32[$458>>2] = $452;
  $459 = $a_min;
  $460 = (($459) - 1)|0;
  $461 = $1;
  $462 = (($461) + 16|0);
  HEAP32[$462>>2] = $460;
  break;
 }
 case 4:  {
  $463 = $3;
  $464 = $463;
  $465 = $464;
  $466 = HEAP32[$465>>2]|0;
  $467 = (($464) + 4)|0;
  $468 = $467;
  $469 = HEAP32[$468>>2]|0;
  $470 = $1;
  $471 = $470;
  $472 = $471;
  HEAP32[$472>>2] = $466;
  $473 = (($471) + 4)|0;
  $474 = $473;
  HEAP32[$474>>2] = $469;
  $475 = $3;
  $476 = (($475) + 8|0);
  $477 = $476;
  $478 = $477;
  $479 = HEAP32[$478>>2]|0;
  $480 = (($477) + 4)|0;
  $481 = $480;
  $482 = HEAP32[$481>>2]|0;
  $483 = $1;
  $484 = (($483) + 8|0);
  $485 = $484;
  $486 = $485;
  HEAP32[$486>>2] = $479;
  $487 = (($485) + 4)|0;
  $488 = $487;
  HEAP32[$488>>2] = $482;
  $489 = $b_min;
  $490 = $c_min;
  $491 = (($489) + ($490))|0;
  $492 = (($491) - 1)|0;
  $493 = $1;
  $494 = (($493) + 16|0);
  HEAP32[$494>>2] = $492;
  break;
 }
 case 5:  {
  $495 = $xybits;
  $496 = $495;
  $497 = HEAP32[$496>>2]|0;
  $498 = (($495) + 4)|0;
  $499 = $498;
  $500 = HEAP32[$499>>2]|0;
  $501 = $1;
  $502 = $501;
  $503 = $502;
  HEAP32[$503>>2] = $497;
  $504 = (($502) + 4)|0;
  $505 = $504;
  HEAP32[$505>>2] = $500;
  $506 = (($xybits) + 8|0);
  $507 = $506;
  $508 = $507;
  $509 = HEAP32[$508>>2]|0;
  $510 = (($507) + 4)|0;
  $511 = $510;
  $512 = HEAP32[$511>>2]|0;
  $513 = $1;
  $514 = (($513) + 8|0);
  $515 = $514;
  $516 = $515;
  HEAP32[$516>>2] = $509;
  $517 = (($515) + 4)|0;
  $518 = $517;
  HEAP32[$518>>2] = $512;
  $519 = $b_min;
  $520 = (($519) - 1)|0;
  $521 = $1;
  $522 = (($521) + 16|0);
  HEAP32[$522>>2] = $520;
  break;
 }
 case 7:  {
  $576 = $1;
  $577 = (_bf_true($576)|0);
  $0 = $577;
  $625 = $0;
  STACKTOP = sp;return ($625|0);
  break;
 }
 case 6:  {
  $523 = $3;
  $524 = $523;
  $525 = $524;
  $526 = HEAP32[$525>>2]|0;
  $527 = (($524) + 4)|0;
  $528 = $527;
  $529 = HEAP32[$528>>2]|0;
  $530 = $2;
  $531 = $530;
  $532 = $531;
  $533 = HEAP32[$532>>2]|0;
  $534 = (($531) + 4)|0;
  $535 = $534;
  $536 = HEAP32[$535>>2]|0;
  $537 = $533 ^ -1;
  $538 = $536 ^ -1;
  $539 = $526 & $537;
  $540 = $529 & $538;
  $541 = $1;
  $542 = $541;
  $543 = $542;
  HEAP32[$543>>2] = $539;
  $544 = (($542) + 4)|0;
  $545 = $544;
  HEAP32[$545>>2] = $540;
  $546 = $3;
  $547 = (($546) + 8|0);
  $548 = $547;
  $549 = $548;
  $550 = HEAP32[$549>>2]|0;
  $551 = (($548) + 4)|0;
  $552 = $551;
  $553 = HEAP32[$552>>2]|0;
  $554 = $2;
  $555 = (($554) + 8|0);
  $556 = $555;
  $557 = $556;
  $558 = HEAP32[$557>>2]|0;
  $559 = (($556) + 4)|0;
  $560 = $559;
  $561 = HEAP32[$560>>2]|0;
  $562 = $558 ^ -1;
  $563 = $561 ^ -1;
  $564 = $550 & $562;
  $565 = $553 & $563;
  $566 = $1;
  $567 = (($566) + 8|0);
  $568 = $567;
  $569 = $568;
  HEAP32[$569>>2] = $564;
  $570 = (($568) + 4)|0;
  $571 = $570;
  HEAP32[$571>>2] = $565;
  $572 = $c_min;
  $573 = (($572) - 1)|0;
  $574 = $1;
  $575 = (($574) + 16|0);
  HEAP32[$575>>2] = $573;
  break;
 }
 default: {
 }
 }
 $578 = $1;
 $579 = (($578) + 16|0);
 $580 = HEAP32[$579>>2]|0;
 $581 = $1;
 $582 = (_uint64_2_pop($581)|0);
 $583 = ($580|0)>($582|0);
 if ($583) {
  $584 = $1;
  $585 = (_bf_false($584)|0);
  $0 = $585;
  $625 = $0;
  STACKTOP = sp;return ($625|0);
 }
 $586 = HEAP32[64>>2]|0;
 $587 = ($586|0)!=(0);
 if ($587) {
  $i = 0;
  while(1) {
   $588 = $i;
   $589 = HEAP32[80>>2]|0;
   $590 = ($588|0)<($589|0);
   if (!($590)) {
    break;
   }
   $591 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($591|0))|0);
   $592 = $i;
   $593 = (($592) + 1)|0;
   $i = $593;
  }
  $594 = HEAP32[_stderr>>2]|0;
  $595 = $1;
  $596 = (($595) + 8|0);
  $597 = $596;
  $598 = $597;
  $599 = HEAP32[$598>>2]|0;
  $600 = (($597) + 4)|0;
  $601 = $600;
  $602 = HEAP32[$601>>2]|0;
  $603 = $1;
  $604 = $603;
  $605 = $604;
  $606 = HEAP32[$605>>2]|0;
  $607 = (($604) + 4)|0;
  $608 = $607;
  $609 = HEAP32[$608>>2]|0;
  $610 = $1;
  $611 = (($610) + 16|0);
  $612 = HEAP32[$611>>2]|0;
  $613 = (($612) + 1)|0;
  $614 = $1;
  $615 = (_uint64_2_pop($614)|0);
  $616 = $vararg_buffer10;
  $617 = $616;
  HEAP32[$617>>2] = $599;
  $618 = (($616) + 4)|0;
  $619 = $618;
  HEAP32[$619>>2] = $602;
  $vararg_ptr13 = (($vararg_buffer10) + 8|0);
  $620 = $vararg_ptr13;
  $621 = $620;
  HEAP32[$621>>2] = $606;
  $622 = (($620) + 4)|0;
  $623 = $622;
  HEAP32[$623>>2] = $609;
  $vararg_ptr14 = (($vararg_buffer10) + 16|0);
  HEAP32[$vararg_ptr14>>2] = $613;
  $vararg_ptr15 = (($vararg_buffer10) + 20|0);
  HEAP32[$vararg_ptr15>>2] = $615;
  (_fprintf(($594|0),(192|0),($vararg_buffer10|0))|0);
 }
 $624 = $1;
 $0 = $624;
 $625 = $0;
 STACKTOP = sp;return ($625|0);
}
function _uint64_2_pop($b) {
 $b = $b|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0;
 var $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0;
 var $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0;
 var $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0;
 var $99 = 0, $x = 0, $y = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $x = sp + 8|0;
 $y = sp;
 $0 = $b;
 $1 = $0;
 $2 = $1;
 $3 = $2;
 $4 = HEAP32[$3>>2]|0;
 $5 = (($2) + 4)|0;
 $6 = $5;
 $7 = HEAP32[$6>>2]|0;
 $8 = $0;
 $9 = $8;
 $10 = $9;
 $11 = HEAP32[$10>>2]|0;
 $12 = (($9) + 4)|0;
 $13 = $12;
 $14 = HEAP32[$13>>2]|0;
 $15 = (_bitshift64Lshr(($11|0),($14|0),1)|0);
 $16 = tempRet0;
 $17 = $15 & 1431655765;
 $18 = $16 & 1431655765;
 $19 = (_i64Subtract(($4|0),($7|0),($17|0),($18|0))|0);
 $20 = tempRet0;
 $21 = $x;
 $22 = $21;
 HEAP32[$22>>2] = $19;
 $23 = (($21) + 4)|0;
 $24 = $23;
 HEAP32[$24>>2] = $20;
 $25 = $x;
 $26 = $25;
 $27 = HEAP32[$26>>2]|0;
 $28 = (($25) + 4)|0;
 $29 = $28;
 $30 = HEAP32[$29>>2]|0;
 $31 = $27 & 858993459;
 $32 = $30 & 858993459;
 $33 = $x;
 $34 = $33;
 $35 = HEAP32[$34>>2]|0;
 $36 = (($33) + 4)|0;
 $37 = $36;
 $38 = HEAP32[$37>>2]|0;
 $39 = (_bitshift64Lshr(($35|0),($38|0),2)|0);
 $40 = tempRet0;
 $41 = $39 & 858993459;
 $42 = $40 & 858993459;
 $43 = (_i64Add(($31|0),($32|0),($41|0),($42|0))|0);
 $44 = tempRet0;
 $45 = $x;
 $46 = $45;
 HEAP32[$46>>2] = $43;
 $47 = (($45) + 4)|0;
 $48 = $47;
 HEAP32[$48>>2] = $44;
 $49 = $x;
 $50 = $49;
 $51 = HEAP32[$50>>2]|0;
 $52 = (($49) + 4)|0;
 $53 = $52;
 $54 = HEAP32[$53>>2]|0;
 $55 = (_bitshift64Lshr(($51|0),($54|0),4)|0);
 $56 = tempRet0;
 $57 = $x;
 $58 = $57;
 $59 = HEAP32[$58>>2]|0;
 $60 = (($57) + 4)|0;
 $61 = $60;
 $62 = HEAP32[$61>>2]|0;
 $63 = (_i64Add(($59|0),($62|0),($55|0),($56|0))|0);
 $64 = tempRet0;
 $65 = $x;
 $66 = $65;
 HEAP32[$66>>2] = $63;
 $67 = (($65) + 4)|0;
 $68 = $67;
 HEAP32[$68>>2] = $64;
 $69 = $x;
 $70 = $69;
 $71 = HEAP32[$70>>2]|0;
 $72 = (($69) + 4)|0;
 $73 = $72;
 $74 = HEAP32[$73>>2]|0;
 $75 = $71 & 252645135;
 $76 = $74 & 252645135;
 $77 = $x;
 $78 = $77;
 HEAP32[$78>>2] = $75;
 $79 = (($77) + 4)|0;
 $80 = $79;
 HEAP32[$80>>2] = $76;
 $81 = $0;
 $82 = (($81) + 8|0);
 $83 = $82;
 $84 = $83;
 $85 = HEAP32[$84>>2]|0;
 $86 = (($83) + 4)|0;
 $87 = $86;
 $88 = HEAP32[$87>>2]|0;
 $89 = $0;
 $90 = (($89) + 8|0);
 $91 = $90;
 $92 = $91;
 $93 = HEAP32[$92>>2]|0;
 $94 = (($91) + 4)|0;
 $95 = $94;
 $96 = HEAP32[$95>>2]|0;
 $97 = (_bitshift64Lshr(($93|0),($96|0),1)|0);
 $98 = tempRet0;
 $99 = $97 & 1431655765;
 $100 = $98 & 1431655765;
 $101 = (_i64Subtract(($85|0),($88|0),($99|0),($100|0))|0);
 $102 = tempRet0;
 $103 = $y;
 $104 = $103;
 HEAP32[$104>>2] = $101;
 $105 = (($103) + 4)|0;
 $106 = $105;
 HEAP32[$106>>2] = $102;
 $107 = $y;
 $108 = $107;
 $109 = HEAP32[$108>>2]|0;
 $110 = (($107) + 4)|0;
 $111 = $110;
 $112 = HEAP32[$111>>2]|0;
 $113 = $109 & 858993459;
 $114 = $112 & 858993459;
 $115 = $y;
 $116 = $115;
 $117 = HEAP32[$116>>2]|0;
 $118 = (($115) + 4)|0;
 $119 = $118;
 $120 = HEAP32[$119>>2]|0;
 $121 = (_bitshift64Lshr(($117|0),($120|0),2)|0);
 $122 = tempRet0;
 $123 = $121 & 858993459;
 $124 = $122 & 858993459;
 $125 = (_i64Add(($113|0),($114|0),($123|0),($124|0))|0);
 $126 = tempRet0;
 $127 = $y;
 $128 = $127;
 HEAP32[$128>>2] = $125;
 $129 = (($127) + 4)|0;
 $130 = $129;
 HEAP32[$130>>2] = $126;
 $131 = $y;
 $132 = $131;
 $133 = HEAP32[$132>>2]|0;
 $134 = (($131) + 4)|0;
 $135 = $134;
 $136 = HEAP32[$135>>2]|0;
 $137 = (_bitshift64Lshr(($133|0),($136|0),4)|0);
 $138 = tempRet0;
 $139 = $y;
 $140 = $139;
 $141 = HEAP32[$140>>2]|0;
 $142 = (($139) + 4)|0;
 $143 = $142;
 $144 = HEAP32[$143>>2]|0;
 $145 = (_i64Add(($141|0),($144|0),($137|0),($138|0))|0);
 $146 = tempRet0;
 $147 = $y;
 $148 = $147;
 HEAP32[$148>>2] = $145;
 $149 = (($147) + 4)|0;
 $150 = $149;
 HEAP32[$150>>2] = $146;
 $151 = $y;
 $152 = $151;
 $153 = HEAP32[$152>>2]|0;
 $154 = (($151) + 4)|0;
 $155 = $154;
 $156 = HEAP32[$155>>2]|0;
 $157 = $153 & 252645135;
 $158 = $156 & 252645135;
 $159 = $y;
 $160 = $159;
 HEAP32[$160>>2] = $157;
 $161 = (($159) + 4)|0;
 $162 = $161;
 HEAP32[$162>>2] = $158;
 $163 = $x;
 $164 = $163;
 $165 = HEAP32[$164>>2]|0;
 $166 = (($163) + 4)|0;
 $167 = $166;
 $168 = HEAP32[$167>>2]|0;
 $169 = $y;
 $170 = $169;
 $171 = HEAP32[$170>>2]|0;
 $172 = (($169) + 4)|0;
 $173 = $172;
 $174 = HEAP32[$173>>2]|0;
 $175 = (_i64Add(($165|0),($168|0),($171|0),($174|0))|0);
 $176 = tempRet0;
 $177 = (___muldi3(($175|0),($176|0),16843009,16843009)|0);
 $178 = tempRet0;
 $179 = (_bitshift64Lshr(($177|0),($178|0),56)|0);
 $180 = tempRet0;
 STACKTOP = sp;return ($179|0);
}
function _default_needle_fn($n,$f) {
 $n = $n|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $7 = 0, $8 = 0, $9 = 0, $fa = 0, $fb = 0, $fc = 0, $hval = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 96|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $fa = sp + 48|0;
 $fb = sp + 24|0;
 $fc = sp;
 $0 = $n;
 $1 = $f;
 $2 = $0;
 $3 = (($2) + 4|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = (($4) + 16|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = $0;
 $8 = (($7) + 4|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = (($9) + 12|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = (_fnv_hash($6,$11,1)|0);
 $13 = $0;
 $14 = (($13) + 28|0);
 $15 = HEAP32[$14>>2]|0;
 $16 = Math_imul(1108378657, $15)|0;
 $17 = (($12) + ($16))|0;
 $hval = $17;
 $18 = $hval;
 $19 = (_bit_combo(32,3,$18)|0);
 $20 = $1;
 $21 = $20;
 $22 = $21;
 HEAP32[$22>>2] = $19;
 $23 = (($21) + 4)|0;
 $24 = $23;
 HEAP32[$24>>2] = 0;
 $25 = $1;
 $26 = (($25) + 8|0);
 $27 = $26;
 $28 = $27;
 HEAP32[$28>>2] = 0;
 $29 = (($27) + 4)|0;
 $30 = $29;
 HEAP32[$30>>2] = 0;
 $31 = $1;
 $32 = (($31) + 16|0);
 HEAP32[$32>>2] = 2;
 $33 = $0;
 $34 = (($33) + 28|0);
 $35 = HEAP32[$34>>2]|0;
 $36 = ($35|0)==(0);
 if ($36) {
  (_bf_true($fa)|0);
 } else {
  $37 = $0;
  $38 = (($37) + 8|0);
  $39 = HEAP32[$38>>2]|0;
  _needle_fn_wrapper($39,$fa);
  (_bf_first_child($fa,$fa)|0);
 }
 $40 = $0;
 $41 = (($40) + 28|0);
 $42 = HEAP32[$41>>2]|0;
 $43 = ($42|0)==(0);
 if ($43) {
  (_bf_true($fb)|0);
 } else {
  $44 = $0;
  $45 = (($44) + 28|0);
  $46 = HEAP32[$45>>2]|0;
  $47 = (($46) - 1)|0;
  $48 = $0;
  $49 = (($48) + 8|0);
  $50 = (($49) + ($47<<2)|0);
  $51 = HEAP32[$50>>2]|0;
  _needle_fn_wrapper($51,$fb);
  (_bf_last_child($fb,$fb)|0);
 }
 $52 = $0;
 $53 = (($52) + 28|0);
 $54 = HEAP32[$53>>2]|0;
 $55 = ($54|0)<(3);
 if ($55) {
  (_bf_true($fc)|0);
  $60 = $1;
  $61 = $1;
  $62 = $1;
  $63 = (_bf_and($61,$62,$fa)|0);
  $64 = (_bf_and($fb,$fb,$fc)|0);
  (_bf_and($60,$63,$64)|0);
  STACKTOP = sp;return;
 } else {
  $56 = $0;
  $57 = (($56) + 8|0);
  $58 = (($57) + 4|0);
  $59 = HEAP32[$58>>2]|0;
  _needle_fn_wrapper($59,$fc);
  (_bf_middle_child($fc,$fc)|0);
  $60 = $1;
  $61 = $1;
  $62 = $1;
  $63 = (_bf_and($61,$62,$fa)|0);
  $64 = (_bf_and($fb,$fb,$fc)|0);
  (_bf_and($60,$63,$64)|0);
  STACKTOP = sp;return;
 }
}
function _bf_true($z) {
 $z = $z|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $i = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer = sp;
 $0 = $z;
 $1 = $0;
 $2 = $1;
 $3 = $2;
 HEAP32[$3>>2] = -1;
 $4 = (($2) + 4)|0;
 $5 = $4;
 HEAP32[$5>>2] = -1;
 $6 = $0;
 $7 = (($6) + 8|0);
 $8 = $7;
 $9 = $8;
 HEAP32[$9>>2] = -1;
 $10 = (($8) + 4)|0;
 $11 = $10;
 HEAP32[$11>>2] = -1;
 $12 = $0;
 $13 = (($12) + 16|0);
 HEAP32[$13>>2] = -1;
 $14 = HEAP32[64>>2]|0;
 $15 = ($14|0)!=(0);
 if (!($15)) {
  $52 = $0;
  STACKTOP = sp;return ($52|0);
 }
 $i = 0;
 while(1) {
  $16 = $i;
  $17 = HEAP32[80>>2]|0;
  $18 = ($16|0)<($17|0);
  if (!($18)) {
   break;
  }
  $19 = HEAP32[_stderr>>2]|0;
  (_fputc(32,($19|0))|0);
  $20 = $i;
  $21 = (($20) + 1)|0;
  $i = $21;
 }
 $22 = HEAP32[_stderr>>2]|0;
 $23 = $0;
 $24 = (($23) + 8|0);
 $25 = $24;
 $26 = $25;
 $27 = HEAP32[$26>>2]|0;
 $28 = (($25) + 4)|0;
 $29 = $28;
 $30 = HEAP32[$29>>2]|0;
 $31 = $0;
 $32 = $31;
 $33 = $32;
 $34 = HEAP32[$33>>2]|0;
 $35 = (($32) + 4)|0;
 $36 = $35;
 $37 = HEAP32[$36>>2]|0;
 $38 = $0;
 $39 = (($38) + 16|0);
 $40 = HEAP32[$39>>2]|0;
 $41 = (($40) + 1)|0;
 $42 = $0;
 $43 = (_uint64_2_pop($42)|0);
 $44 = $vararg_buffer;
 $45 = $44;
 HEAP32[$45>>2] = $27;
 $46 = (($44) + 4)|0;
 $47 = $46;
 HEAP32[$47>>2] = $30;
 $vararg_ptr1 = (($vararg_buffer) + 8|0);
 $48 = $vararg_ptr1;
 $49 = $48;
 HEAP32[$49>>2] = $34;
 $50 = (($48) + 4)|0;
 $51 = $50;
 HEAP32[$51>>2] = $37;
 $vararg_ptr2 = (($vararg_buffer) + 16|0);
 HEAP32[$vararg_ptr2>>2] = $41;
 $vararg_ptr3 = (($vararg_buffer) + 20|0);
 HEAP32[$vararg_ptr3>>2] = $43;
 (_fprintf(($22|0),(288|0),($vararg_buffer|0))|0);
 $52 = $0;
 STACKTOP = sp;return ($52|0);
}
function _bf_first_child($z,$x) {
 $z = $z|0;
 $x = $x|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0;
 var $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0;
 var $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0;
 var $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0;
 var $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $c = 0, $i = 0, $mylambda = 0, $vararg_buffer = 0, $vararg_buffer4 = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, $vararg_ptr7 = 0, $vararg_ptr8 = 0, $vararg_ptr9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 96|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer4 = sp + 40|0;
 $vararg_buffer = sp + 16|0;
 $c = sp;
 $1 = $z;
 $2 = $x;
 $3 = HEAP32[64>>2]|0;
 $4 = ($3|0)!=(0);
 if ($4) {
  $i = 0;
  while(1) {
   $5 = $i;
   $6 = HEAP32[80>>2]|0;
   $7 = ($5|0)<($6|0);
   if (!($7)) {
    break;
   }
   $8 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($8|0))|0);
   $9 = $i;
   $10 = (($9) + 1)|0;
   $i = $10;
  }
  $11 = HEAP32[_stderr>>2]|0;
  $12 = $2;
  $13 = (($12) + 8|0);
  $14 = $13;
  $15 = $14;
  $16 = HEAP32[$15>>2]|0;
  $17 = (($14) + 4)|0;
  $18 = $17;
  $19 = HEAP32[$18>>2]|0;
  $20 = $2;
  $21 = $20;
  $22 = $21;
  $23 = HEAP32[$22>>2]|0;
  $24 = (($21) + 4)|0;
  $25 = $24;
  $26 = HEAP32[$25>>2]|0;
  $27 = $2;
  $28 = (($27) + 16|0);
  $29 = HEAP32[$28>>2]|0;
  $30 = (($29) + 1)|0;
  $31 = $2;
  $32 = (_uint64_2_pop($31)|0);
  $33 = $vararg_buffer;
  $34 = $33;
  HEAP32[$34>>2] = $16;
  $35 = (($33) + 4)|0;
  $36 = $35;
  HEAP32[$36>>2] = $19;
  $vararg_ptr1 = (($vararg_buffer) + 8|0);
  $37 = $vararg_ptr1;
  $38 = $37;
  HEAP32[$38>>2] = $23;
  $39 = (($37) + 4)|0;
  $40 = $39;
  HEAP32[$40>>2] = $26;
  $vararg_ptr2 = (($vararg_buffer) + 16|0);
  HEAP32[$vararg_ptr2>>2] = $30;
  $vararg_ptr3 = (($vararg_buffer) + 20|0);
  HEAP32[$vararg_ptr3>>2] = $32;
  (_fprintf(($11|0),(256|0),($vararg_buffer|0))|0);
 }
 $41 = $2;
 $42 = (($41) + 16|0);
 $43 = HEAP32[$42>>2]|0;
 $44 = ($43|0)<(0);
 if ($44) {
  $45 = $1;
  $46 = (_bf_true($45)|0);
  $0 = $46;
  $246 = $0;
  STACKTOP = sp;return ($246|0);
 }
 $47 = $2;
 $48 = (($47) + 8|0);
 $49 = $48;
 $50 = $49;
 $51 = HEAP32[$50>>2]|0;
 $52 = (($49) + 4)|0;
 $53 = $52;
 $54 = HEAP32[$53>>2]|0;
 $55 = $2;
 $56 = (($55) + 8|0);
 $57 = $56;
 $58 = $57;
 $59 = HEAP32[$58>>2]|0;
 $60 = (($57) + 4)|0;
 $61 = $60;
 $62 = HEAP32[$61>>2]|0;
 $63 = $54 | $59;
 $64 = $c;
 $65 = $64;
 HEAP32[$65>>2] = 0;
 $66 = (($64) + 4)|0;
 $67 = $66;
 HEAP32[$67>>2] = $63;
 $68 = $2;
 $69 = $68;
 $70 = $69;
 $71 = HEAP32[$70>>2]|0;
 $72 = (($69) + 4)|0;
 $73 = $72;
 $74 = HEAP32[$73>>2]|0;
 $75 = $2;
 $76 = $75;
 $77 = $76;
 $78 = HEAP32[$77>>2]|0;
 $79 = (($76) + 4)|0;
 $80 = $79;
 $81 = HEAP32[$80>>2]|0;
 $82 = $2;
 $83 = (($82) + 8|0);
 $84 = $83;
 $85 = $84;
 $86 = HEAP32[$85>>2]|0;
 $87 = (($84) + 4)|0;
 $88 = $87;
 $89 = HEAP32[$88>>2]|0;
 $90 = $81 | $89;
 $91 = $2;
 $92 = (($91) + 8|0);
 $93 = $92;
 $94 = $93;
 $95 = HEAP32[$94>>2]|0;
 $96 = (($93) + 4)|0;
 $97 = $96;
 $98 = HEAP32[$97>>2]|0;
 $99 = $74 | $95;
 $100 = (($c) + 8|0);
 $101 = $100;
 $102 = $101;
 HEAP32[$102>>2] = $90;
 $103 = (($101) + 4)|0;
 $104 = $103;
 HEAP32[$104>>2] = $99;
 $105 = $2;
 $106 = $105;
 $107 = $106;
 $108 = HEAP32[$107>>2]|0;
 $109 = (($106) + 4)|0;
 $110 = $109;
 $111 = HEAP32[$110>>2]|0;
 $112 = $c;
 $113 = $112;
 $114 = HEAP32[$113>>2]|0;
 $115 = (($112) + 4)|0;
 $116 = $115;
 $117 = HEAP32[$116>>2]|0;
 $118 = $114 & $108;
 $119 = $117 & $111;
 $120 = $c;
 $121 = $120;
 HEAP32[$121>>2] = $118;
 $122 = (($120) + 4)|0;
 $123 = $122;
 HEAP32[$123>>2] = $119;
 $124 = $2;
 $125 = (($124) + 8|0);
 $126 = $125;
 $127 = $126;
 $128 = HEAP32[$127>>2]|0;
 $129 = (($126) + 4)|0;
 $130 = $129;
 $131 = HEAP32[$130>>2]|0;
 $132 = (($c) + 8|0);
 $133 = $132;
 $134 = $133;
 $135 = HEAP32[$134>>2]|0;
 $136 = (($133) + 4)|0;
 $137 = $136;
 $138 = HEAP32[$137>>2]|0;
 $139 = $135 & $128;
 $140 = $138 & $131;
 $141 = $132;
 $142 = $141;
 HEAP32[$142>>2] = $139;
 $143 = (($141) + 4)|0;
 $144 = $143;
 HEAP32[$144>>2] = $140;
 $145 = $2;
 $146 = (($145) + 16|0);
 $147 = HEAP32[$146>>2]|0;
 $148 = (_uint64_2_pop($c)|0);
 $149 = (($148|0) / 2)&-1;
 $150 = (($147) - ($149))|0;
 $mylambda = $150;
 $151 = $mylambda;
 $152 = $2;
 $153 = (($152) + 16|0);
 $154 = HEAP32[$153>>2]|0;
 $155 = (($154|0) / 3)&-1;
 $156 = ($151|0)<($155|0);
 if ($156) {
  $157 = $2;
  $158 = (($157) + 16|0);
  $159 = HEAP32[$158>>2]|0;
  $160 = (($159|0) / 3)&-1;
  $mylambda = $160;
 }
 $161 = $2;
 $162 = (($161) + 8|0);
 $163 = $162;
 $164 = $163;
 $165 = HEAP32[$164>>2]|0;
 $166 = (($163) + 4)|0;
 $167 = $166;
 $168 = HEAP32[$167>>2]|0;
 $169 = $2;
 $170 = (($169) + 8|0);
 $171 = $170;
 $172 = $171;
 $173 = HEAP32[$172>>2]|0;
 $174 = (($171) + 4)|0;
 $175 = $174;
 $176 = HEAP32[$175>>2]|0;
 $177 = $168 | $173;
 $178 = $2;
 $179 = $178;
 $180 = $179;
 $181 = HEAP32[$180>>2]|0;
 $182 = (($179) + 4)|0;
 $183 = $182;
 $184 = HEAP32[$183>>2]|0;
 $165 | $181;
 $185 = $177 | $184;
 $186 = $1;
 $187 = (($186) + 8|0);
 $188 = $187;
 $189 = $188;
 HEAP32[$189>>2] = 0;
 $190 = (($188) + 4)|0;
 $191 = $190;
 HEAP32[$191>>2] = $185;
 $192 = $2;
 $193 = $192;
 $194 = $193;
 $195 = HEAP32[$194>>2]|0;
 $196 = (($193) + 4)|0;
 $197 = $196;
 $198 = HEAP32[$197>>2]|0;
 $199 = $1;
 $200 = $199;
 $201 = $200;
 HEAP32[$201>>2] = 0;
 $202 = (($200) + 4)|0;
 $203 = $202;
 HEAP32[$203>>2] = $195;
 $204 = $mylambda;
 $205 = $1;
 $206 = (($205) + 16|0);
 HEAP32[$206>>2] = $204;
 $207 = HEAP32[64>>2]|0;
 $208 = ($207|0)!=(0);
 if ($208) {
  $i = 0;
  while(1) {
   $209 = $i;
   $210 = HEAP32[80>>2]|0;
   $211 = ($209|0)<($210|0);
   if (!($211)) {
    break;
   }
   $212 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($212|0))|0);
   $213 = $i;
   $214 = (($213) + 1)|0;
   $i = $214;
  }
  $215 = HEAP32[_stderr>>2]|0;
  $216 = $1;
  $217 = (($216) + 8|0);
  $218 = $217;
  $219 = $218;
  $220 = HEAP32[$219>>2]|0;
  $221 = (($218) + 4)|0;
  $222 = $221;
  $223 = HEAP32[$222>>2]|0;
  $224 = $1;
  $225 = $224;
  $226 = $225;
  $227 = HEAP32[$226>>2]|0;
  $228 = (($225) + 4)|0;
  $229 = $228;
  $230 = HEAP32[$229>>2]|0;
  $231 = $1;
  $232 = (($231) + 16|0);
  $233 = HEAP32[$232>>2]|0;
  $234 = (($233) + 1)|0;
  $235 = $1;
  $236 = (_uint64_2_pop($235)|0);
  $237 = $vararg_buffer4;
  $238 = $237;
  HEAP32[$238>>2] = $220;
  $239 = (($237) + 4)|0;
  $240 = $239;
  HEAP32[$240>>2] = $223;
  $vararg_ptr7 = (($vararg_buffer4) + 8|0);
  $241 = $vararg_ptr7;
  $242 = $241;
  HEAP32[$242>>2] = $227;
  $243 = (($241) + 4)|0;
  $244 = $243;
  HEAP32[$244>>2] = $230;
  $vararg_ptr8 = (($vararg_buffer4) + 16|0);
  HEAP32[$vararg_ptr8>>2] = $234;
  $vararg_ptr9 = (($vararg_buffer4) + 20|0);
  HEAP32[$vararg_ptr9>>2] = $236;
  (_fprintf(($215|0),(192|0),($vararg_buffer4|0))|0);
 }
 $245 = $1;
 $0 = $245;
 $246 = $0;
 STACKTOP = sp;return ($246|0);
}
function _bf_last_child($z,$x) {
 $z = $z|0;
 $x = $x|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0;
 var $c = 0, $i = 0, $mylambda = 0, $vararg_buffer = 0, $vararg_buffer4 = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, $vararg_ptr7 = 0, $vararg_ptr8 = 0, $vararg_ptr9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 96|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer4 = sp + 40|0;
 $vararg_buffer = sp + 16|0;
 $c = sp;
 $1 = $z;
 $2 = $x;
 $3 = HEAP32[64>>2]|0;
 $4 = ($3|0)!=(0);
 if ($4) {
  $i = 0;
  while(1) {
   $5 = $i;
   $6 = HEAP32[80>>2]|0;
   $7 = ($5|0)<($6|0);
   if (!($7)) {
    break;
   }
   $8 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($8|0))|0);
   $9 = $i;
   $10 = (($9) + 1)|0;
   $i = $10;
  }
  $11 = HEAP32[_stderr>>2]|0;
  $12 = $2;
  $13 = (($12) + 8|0);
  $14 = $13;
  $15 = $14;
  $16 = HEAP32[$15>>2]|0;
  $17 = (($14) + 4)|0;
  $18 = $17;
  $19 = HEAP32[$18>>2]|0;
  $20 = $2;
  $21 = $20;
  $22 = $21;
  $23 = HEAP32[$22>>2]|0;
  $24 = (($21) + 4)|0;
  $25 = $24;
  $26 = HEAP32[$25>>2]|0;
  $27 = $2;
  $28 = (($27) + 16|0);
  $29 = HEAP32[$28>>2]|0;
  $30 = (($29) + 1)|0;
  $31 = $2;
  $32 = (_uint64_2_pop($31)|0);
  $33 = $vararg_buffer;
  $34 = $33;
  HEAP32[$34>>2] = $16;
  $35 = (($33) + 4)|0;
  $36 = $35;
  HEAP32[$36>>2] = $19;
  $vararg_ptr1 = (($vararg_buffer) + 8|0);
  $37 = $vararg_ptr1;
  $38 = $37;
  HEAP32[$38>>2] = $23;
  $39 = (($37) + 4)|0;
  $40 = $39;
  HEAP32[$40>>2] = $26;
  $vararg_ptr2 = (($vararg_buffer) + 16|0);
  HEAP32[$vararg_ptr2>>2] = $30;
  $vararg_ptr3 = (($vararg_buffer) + 20|0);
  HEAP32[$vararg_ptr3>>2] = $32;
  (_fprintf(($11|0),(224|0),($vararg_buffer|0))|0);
 }
 $41 = $2;
 $42 = (($41) + 16|0);
 $43 = HEAP32[$42>>2]|0;
 $44 = ($43|0)<(0);
 if ($44) {
  $45 = $1;
  $46 = (_bf_true($45)|0);
  $0 = $46;
  $239 = $0;
  STACKTOP = sp;return ($239|0);
 }
 $47 = $2;
 $48 = (($47) + 8|0);
 $49 = $48;
 $50 = $49;
 $51 = HEAP32[$50>>2]|0;
 $52 = (($49) + 4)|0;
 $53 = $52;
 $54 = HEAP32[$53>>2]|0;
 $55 = $2;
 $56 = (($55) + 8|0);
 $57 = $56;
 $58 = $57;
 $59 = HEAP32[$58>>2]|0;
 $60 = (($57) + 4)|0;
 $61 = $60;
 $62 = HEAP32[$61>>2]|0;
 $63 = $54 | $59;
 $64 = $c;
 $65 = $64;
 HEAP32[$65>>2] = 0;
 $66 = (($64) + 4)|0;
 $67 = $66;
 HEAP32[$67>>2] = $63;
 $68 = $2;
 $69 = $68;
 $70 = $69;
 $71 = HEAP32[$70>>2]|0;
 $72 = (($69) + 4)|0;
 $73 = $72;
 $74 = HEAP32[$73>>2]|0;
 $75 = $2;
 $76 = $75;
 $77 = $76;
 $78 = HEAP32[$77>>2]|0;
 $79 = (($76) + 4)|0;
 $80 = $79;
 $81 = HEAP32[$80>>2]|0;
 $82 = $2;
 $83 = (($82) + 8|0);
 $84 = $83;
 $85 = $84;
 $86 = HEAP32[$85>>2]|0;
 $87 = (($84) + 4)|0;
 $88 = $87;
 $89 = HEAP32[$88>>2]|0;
 $90 = $81 | $89;
 $91 = $2;
 $92 = (($91) + 8|0);
 $93 = $92;
 $94 = $93;
 $95 = HEAP32[$94>>2]|0;
 $96 = (($93) + 4)|0;
 $97 = $96;
 $98 = HEAP32[$97>>2]|0;
 $99 = $74 | $95;
 $100 = (($c) + 8|0);
 $101 = $100;
 $102 = $101;
 HEAP32[$102>>2] = $90;
 $103 = (($101) + 4)|0;
 $104 = $103;
 HEAP32[$104>>2] = $99;
 $105 = $2;
 $106 = $105;
 $107 = $106;
 $108 = HEAP32[$107>>2]|0;
 $109 = (($106) + 4)|0;
 $110 = $109;
 $111 = HEAP32[$110>>2]|0;
 $112 = $c;
 $113 = $112;
 $114 = HEAP32[$113>>2]|0;
 $115 = (($112) + 4)|0;
 $116 = $115;
 $117 = HEAP32[$116>>2]|0;
 $118 = $114 & $108;
 $119 = $117 & $111;
 $120 = $c;
 $121 = $120;
 HEAP32[$121>>2] = $118;
 $122 = (($120) + 4)|0;
 $123 = $122;
 HEAP32[$123>>2] = $119;
 $124 = $2;
 $125 = (($124) + 8|0);
 $126 = $125;
 $127 = $126;
 $128 = HEAP32[$127>>2]|0;
 $129 = (($126) + 4)|0;
 $130 = $129;
 $131 = HEAP32[$130>>2]|0;
 $132 = (($c) + 8|0);
 $133 = $132;
 $134 = $133;
 $135 = HEAP32[$134>>2]|0;
 $136 = (($133) + 4)|0;
 $137 = $136;
 $138 = HEAP32[$137>>2]|0;
 $139 = $135 & $128;
 $140 = $138 & $131;
 $141 = $132;
 $142 = $141;
 HEAP32[$142>>2] = $139;
 $143 = (($141) + 4)|0;
 $144 = $143;
 HEAP32[$144>>2] = $140;
 $145 = $2;
 $146 = (($145) + 16|0);
 $147 = HEAP32[$146>>2]|0;
 $148 = (_uint64_2_pop($c)|0);
 $149 = (($148|0) / 2)&-1;
 $150 = (($147) - ($149))|0;
 $mylambda = $150;
 $151 = $mylambda;
 $152 = $2;
 $153 = (($152) + 16|0);
 $154 = HEAP32[$153>>2]|0;
 $155 = (($154|0) / 3)&-1;
 $156 = ($151|0)<($155|0);
 if ($156) {
  $157 = $2;
  $158 = (($157) + 16|0);
  $159 = HEAP32[$158>>2]|0;
  $160 = (($159|0) / 3)&-1;
  $mylambda = $160;
 }
 $161 = $2;
 $162 = $161;
 $163 = $162;
 $164 = HEAP32[$163>>2]|0;
 $165 = (($162) + 4)|0;
 $166 = $165;
 $167 = HEAP32[$166>>2]|0;
 $168 = $2;
 $169 = (($168) + 8|0);
 $170 = $169;
 $171 = $170;
 $172 = HEAP32[$171>>2]|0;
 $173 = (($170) + 4)|0;
 $174 = $173;
 $175 = HEAP32[$174>>2]|0;
 $176 = $167 | $172;
 $177 = $2;
 $178 = (($177) + 8|0);
 $179 = $178;
 $180 = $179;
 $181 = HEAP32[$180>>2]|0;
 $182 = (($179) + 4)|0;
 $183 = $182;
 $184 = HEAP32[$183>>2]|0;
 $185 = $176 | $184;
 $186 = $1;
 $187 = (($186) + 8|0);
 $188 = $187;
 $189 = $188;
 HEAP32[$189>>2] = $164;
 $190 = (($188) + 4)|0;
 $191 = $190;
 HEAP32[$191>>2] = $185;
 $192 = $1;
 $193 = $192;
 $194 = $193;
 HEAP32[$194>>2] = 0;
 $195 = (($193) + 4)|0;
 $196 = $195;
 HEAP32[$196>>2] = 0;
 $197 = $mylambda;
 $198 = $1;
 $199 = (($198) + 16|0);
 HEAP32[$199>>2] = $197;
 $200 = HEAP32[64>>2]|0;
 $201 = ($200|0)!=(0);
 if ($201) {
  $i = 0;
  while(1) {
   $202 = $i;
   $203 = HEAP32[80>>2]|0;
   $204 = ($202|0)<($203|0);
   if (!($204)) {
    break;
   }
   $205 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($205|0))|0);
   $206 = $i;
   $207 = (($206) + 1)|0;
   $i = $207;
  }
  $208 = HEAP32[_stderr>>2]|0;
  $209 = $1;
  $210 = (($209) + 8|0);
  $211 = $210;
  $212 = $211;
  $213 = HEAP32[$212>>2]|0;
  $214 = (($211) + 4)|0;
  $215 = $214;
  $216 = HEAP32[$215>>2]|0;
  $217 = $1;
  $218 = $217;
  $219 = $218;
  $220 = HEAP32[$219>>2]|0;
  $221 = (($218) + 4)|0;
  $222 = $221;
  $223 = HEAP32[$222>>2]|0;
  $224 = $1;
  $225 = (($224) + 16|0);
  $226 = HEAP32[$225>>2]|0;
  $227 = (($226) + 1)|0;
  $228 = $1;
  $229 = (_uint64_2_pop($228)|0);
  $230 = $vararg_buffer4;
  $231 = $230;
  HEAP32[$231>>2] = $213;
  $232 = (($230) + 4)|0;
  $233 = $232;
  HEAP32[$233>>2] = $216;
  $vararg_ptr7 = (($vararg_buffer4) + 8|0);
  $234 = $vararg_ptr7;
  $235 = $234;
  HEAP32[$235>>2] = $220;
  $236 = (($234) + 4)|0;
  $237 = $236;
  HEAP32[$237>>2] = $223;
  $vararg_ptr8 = (($vararg_buffer4) + 16|0);
  HEAP32[$vararg_ptr8>>2] = $227;
  $vararg_ptr9 = (($vararg_buffer4) + 20|0);
  HEAP32[$vararg_ptr9>>2] = $229;
  (_fprintf(($208|0),(192|0),($vararg_buffer4|0))|0);
 }
 $238 = $1;
 $0 = $238;
 $239 = $0;
 STACKTOP = sp;return ($239|0);
}
function _bf_middle_child($z,$x) {
 $z = $z|0;
 $x = $x|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0;
 var $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0;
 var $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0;
 var $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0;
 var $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $c = 0, $i = 0, $mylambda = 0, $vararg_buffer = 0, $vararg_buffer4 = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, $vararg_ptr7 = 0, $vararg_ptr8 = 0, $vararg_ptr9 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 96|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer4 = sp + 40|0;
 $vararg_buffer = sp + 16|0;
 $c = sp;
 $1 = $z;
 $2 = $x;
 $3 = HEAP32[64>>2]|0;
 $4 = ($3|0)!=(0);
 if ($4) {
  $i = 0;
  while(1) {
   $5 = $i;
   $6 = HEAP32[80>>2]|0;
   $7 = ($5|0)<($6|0);
   if (!($7)) {
    break;
   }
   $8 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($8|0))|0);
   $9 = $i;
   $10 = (($9) + 1)|0;
   $i = $10;
  }
  $11 = HEAP32[_stderr>>2]|0;
  $12 = $2;
  $13 = (($12) + 8|0);
  $14 = $13;
  $15 = $14;
  $16 = HEAP32[$15>>2]|0;
  $17 = (($14) + 4)|0;
  $18 = $17;
  $19 = HEAP32[$18>>2]|0;
  $20 = $2;
  $21 = $20;
  $22 = $21;
  $23 = HEAP32[$22>>2]|0;
  $24 = (($21) + 4)|0;
  $25 = $24;
  $26 = HEAP32[$25>>2]|0;
  $27 = $2;
  $28 = (($27) + 16|0);
  $29 = HEAP32[$28>>2]|0;
  $30 = (($29) + 1)|0;
  $31 = $2;
  $32 = (_uint64_2_pop($31)|0);
  $33 = $vararg_buffer;
  $34 = $33;
  HEAP32[$34>>2] = $16;
  $35 = (($33) + 4)|0;
  $36 = $35;
  HEAP32[$36>>2] = $19;
  $vararg_ptr1 = (($vararg_buffer) + 8|0);
  $37 = $vararg_ptr1;
  $38 = $37;
  HEAP32[$38>>2] = $23;
  $39 = (($37) + 4)|0;
  $40 = $39;
  HEAP32[$40>>2] = $26;
  $vararg_ptr2 = (($vararg_buffer) + 16|0);
  HEAP32[$vararg_ptr2>>2] = $30;
  $vararg_ptr3 = (($vararg_buffer) + 20|0);
  HEAP32[$vararg_ptr3>>2] = $32;
  (_fprintf(($11|0),(160|0),($vararg_buffer|0))|0);
 }
 $41 = $2;
 $42 = (($41) + 16|0);
 $43 = HEAP32[$42>>2]|0;
 $44 = ($43|0)<(0);
 if ($44) {
  $45 = $1;
  $46 = (_bf_true($45)|0);
  $0 = $46;
  $288 = $0;
  STACKTOP = sp;return ($288|0);
 }
 $47 = $2;
 $48 = $47;
 $49 = $48;
 $50 = HEAP32[$49>>2]|0;
 $51 = (($48) + 4)|0;
 $52 = $51;
 $53 = HEAP32[$52>>2]|0;
 $54 = $2;
 $55 = $54;
 $56 = $55;
 $57 = HEAP32[$56>>2]|0;
 $58 = (($55) + 4)|0;
 $59 = $58;
 $60 = HEAP32[$59>>2]|0;
 $61 = $2;
 $62 = (($61) + 8|0);
 $63 = $62;
 $64 = $63;
 $65 = HEAP32[$64>>2]|0;
 $66 = (($63) + 4)|0;
 $67 = $66;
 $68 = HEAP32[$67>>2]|0;
 $69 = $60 | $65;
 $70 = $50 | $68;
 $71 = $2;
 $72 = (($71) + 8|0);
 $73 = $72;
 $74 = $73;
 $75 = HEAP32[$74>>2]|0;
 $76 = (($73) + 4)|0;
 $77 = $76;
 $78 = HEAP32[$77>>2]|0;
 $79 = $70 | $75;
 $80 = $2;
 $81 = (($80) + 8|0);
 $82 = $81;
 $83 = $82;
 $84 = HEAP32[$83>>2]|0;
 $85 = (($82) + 4)|0;
 $86 = $85;
 $87 = HEAP32[$86>>2]|0;
 $88 = $69 | $87;
 $89 = $c;
 $90 = $89;
 HEAP32[$90>>2] = $88;
 $91 = (($89) + 4)|0;
 $92 = $91;
 HEAP32[$92>>2] = $79;
 $93 = $2;
 $94 = $93;
 $95 = $94;
 $96 = HEAP32[$95>>2]|0;
 $97 = (($94) + 4)|0;
 $98 = $97;
 $99 = HEAP32[$98>>2]|0;
 $100 = $2;
 $101 = $100;
 $102 = $101;
 $103 = HEAP32[$102>>2]|0;
 $104 = (($101) + 4)|0;
 $105 = $104;
 $106 = HEAP32[$105>>2]|0;
 $107 = $2;
 $108 = $107;
 $109 = $108;
 $110 = HEAP32[$109>>2]|0;
 $111 = (($108) + 4)|0;
 $112 = $111;
 $113 = HEAP32[$112>>2]|0;
 $114 = $106 | $110;
 $115 = $96 | $113;
 $116 = $2;
 $117 = (($116) + 8|0);
 $118 = $117;
 $119 = $118;
 $120 = HEAP32[$119>>2]|0;
 $121 = (($118) + 4)|0;
 $122 = $121;
 $123 = HEAP32[$122>>2]|0;
 $124 = $115 | $120;
 $125 = $2;
 $126 = (($125) + 8|0);
 $127 = $126;
 $128 = $127;
 $129 = HEAP32[$128>>2]|0;
 $130 = (($127) + 4)|0;
 $131 = $130;
 $132 = HEAP32[$131>>2]|0;
 $133 = $114 | $132;
 $134 = (($c) + 8|0);
 $135 = $134;
 $136 = $135;
 HEAP32[$136>>2] = $133;
 $137 = (($135) + 4)|0;
 $138 = $137;
 HEAP32[$138>>2] = $124;
 $139 = $2;
 $140 = $139;
 $141 = $140;
 $142 = HEAP32[$141>>2]|0;
 $143 = (($140) + 4)|0;
 $144 = $143;
 $145 = HEAP32[$144>>2]|0;
 $146 = $c;
 $147 = $146;
 $148 = HEAP32[$147>>2]|0;
 $149 = (($146) + 4)|0;
 $150 = $149;
 $151 = HEAP32[$150>>2]|0;
 $152 = $148 & $142;
 $153 = $151 & $145;
 $154 = $c;
 $155 = $154;
 HEAP32[$155>>2] = $152;
 $156 = (($154) + 4)|0;
 $157 = $156;
 HEAP32[$157>>2] = $153;
 $158 = $2;
 $159 = (($158) + 8|0);
 $160 = $159;
 $161 = $160;
 $162 = HEAP32[$161>>2]|0;
 $163 = (($160) + 4)|0;
 $164 = $163;
 $165 = HEAP32[$164>>2]|0;
 $166 = (($c) + 8|0);
 $167 = $166;
 $168 = $167;
 $169 = HEAP32[$168>>2]|0;
 $170 = (($167) + 4)|0;
 $171 = $170;
 $172 = HEAP32[$171>>2]|0;
 $173 = $169 & $162;
 $174 = $172 & $165;
 $175 = $166;
 $176 = $175;
 HEAP32[$176>>2] = $173;
 $177 = (($175) + 4)|0;
 $178 = $177;
 HEAP32[$178>>2] = $174;
 $179 = $2;
 $180 = (($179) + 16|0);
 $181 = HEAP32[$180>>2]|0;
 $182 = (_uint64_2_pop($c)|0);
 $183 = (($182|0) / 2)&-1;
 $184 = (($181) - ($183))|0;
 $mylambda = $184;
 $185 = $mylambda;
 $186 = $2;
 $187 = (($186) + 16|0);
 $188 = HEAP32[$187>>2]|0;
 $189 = (($188|0) / 4)&-1;
 $190 = ($185|0)<($189|0);
 if ($190) {
  $191 = $2;
  $192 = (($191) + 16|0);
  $193 = HEAP32[$192>>2]|0;
  $194 = (($193|0) / 4)&-1;
  $mylambda = $194;
 }
 $195 = $2;
 $196 = $195;
 $197 = $196;
 $198 = HEAP32[$197>>2]|0;
 $199 = (($196) + 4)|0;
 $200 = $199;
 $201 = HEAP32[$200>>2]|0;
 $202 = $2;
 $203 = (($202) + 8|0);
 $204 = $203;
 $205 = $204;
 $206 = HEAP32[$205>>2]|0;
 $207 = (($204) + 4)|0;
 $208 = $207;
 $209 = HEAP32[$208>>2]|0;
 $210 = $198 | $206;
 $211 = $201 | $209;
 $212 = $1;
 $213 = (($212) + 8|0);
 $214 = $213;
 $215 = $214;
 HEAP32[$215>>2] = $210;
 $216 = (($214) + 4)|0;
 $217 = $216;
 HEAP32[$217>>2] = $211;
 $218 = $1;
 $219 = (($218) + 8|0);
 $220 = $219;
 $221 = $220;
 $222 = HEAP32[$221>>2]|0;
 $223 = (($220) + 4)|0;
 $224 = $223;
 $225 = HEAP32[$224>>2]|0;
 $226 = $1;
 $227 = (($226) + 8|0);
 $228 = $227;
 $229 = $228;
 $230 = HEAP32[$229>>2]|0;
 $231 = (($228) + 4)|0;
 $232 = $231;
 $233 = HEAP32[$232>>2]|0;
 $234 = $222 | $233;
 $235 = $1;
 $236 = (($235) + 8|0);
 $237 = $236;
 $238 = $237;
 HEAP32[$238>>2] = 0;
 $239 = (($237) + 4)|0;
 $240 = $239;
 HEAP32[$240>>2] = $234;
 $241 = $1;
 $242 = $241;
 $243 = $242;
 HEAP32[$243>>2] = 0;
 $244 = (($242) + 4)|0;
 $245 = $244;
 HEAP32[$245>>2] = 0;
 $246 = $mylambda;
 $247 = $1;
 $248 = (($247) + 16|0);
 HEAP32[$248>>2] = $246;
 $249 = HEAP32[64>>2]|0;
 $250 = ($249|0)!=(0);
 if ($250) {
  $i = 0;
  while(1) {
   $251 = $i;
   $252 = HEAP32[80>>2]|0;
   $253 = ($251|0)<($252|0);
   if (!($253)) {
    break;
   }
   $254 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($254|0))|0);
   $255 = $i;
   $256 = (($255) + 1)|0;
   $i = $256;
  }
  $257 = HEAP32[_stderr>>2]|0;
  $258 = $1;
  $259 = (($258) + 8|0);
  $260 = $259;
  $261 = $260;
  $262 = HEAP32[$261>>2]|0;
  $263 = (($260) + 4)|0;
  $264 = $263;
  $265 = HEAP32[$264>>2]|0;
  $266 = $1;
  $267 = $266;
  $268 = $267;
  $269 = HEAP32[$268>>2]|0;
  $270 = (($267) + 4)|0;
  $271 = $270;
  $272 = HEAP32[$271>>2]|0;
  $273 = $1;
  $274 = (($273) + 16|0);
  $275 = HEAP32[$274>>2]|0;
  $276 = (($275) + 1)|0;
  $277 = $1;
  $278 = (_uint64_2_pop($277)|0);
  $279 = $vararg_buffer4;
  $280 = $279;
  HEAP32[$280>>2] = $262;
  $281 = (($279) + 4)|0;
  $282 = $281;
  HEAP32[$282>>2] = $265;
  $vararg_ptr7 = (($vararg_buffer4) + 8|0);
  $283 = $vararg_ptr7;
  $284 = $283;
  HEAP32[$284>>2] = $269;
  $285 = (($283) + 4)|0;
  $286 = $285;
  HEAP32[$286>>2] = $272;
  $vararg_ptr8 = (($vararg_buffer4) + 16|0);
  HEAP32[$vararg_ptr8>>2] = $276;
  $vararg_ptr9 = (($vararg_buffer4) + 20|0);
  HEAP32[$vararg_ptr9>>2] = $278;
  (_fprintf(($257|0),(192|0),($vararg_buffer4|0))|0);
 }
 $287 = $1;
 $0 = $287;
 $288 = $0;
 STACKTOP = sp;return ($288|0);
}
function _anything_needle_fn($n,$f) {
 $n = $n|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $n;
 $1 = $f;
 $2 = $1;
 (_bf_true($2)|0);
 STACKTOP = sp;return;
}
function _anywhere_needle_fn($n,$f) {
 $n = $n|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var $fa = 0, $fb = 0, $fc = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $fa = sp + 48|0;
 $fb = sp + 24|0;
 $fc = sp;
 $0 = $n;
 $1 = $f;
 $2 = $0;
 $3 = (($2) + 28|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($4|0)!=(1);
 if ($5) {
  $6 = $0;
  $7 = $1;
  _default_needle_fn($6,$7);
  STACKTOP = sp;return;
 } else {
  $8 = $0;
  $9 = (($8) + 8|0);
  $10 = HEAP32[$9>>2]|0;
  $11 = $1;
  _needle_fn_wrapper($10,$11);
  $12 = $1;
  (_bf_first_child($fa,$12)|0);
  $13 = $1;
  (_bf_last_child($fb,$13)|0);
  $14 = $1;
  (_bf_middle_child($fc,$14)|0);
  $15 = $1;
  $16 = $1;
  $17 = $1;
  $18 = (_bf_or($16,$17,$fa)|0);
  $19 = (_bf_or($fb,$fb,$fc)|0);
  (_bf_or($15,$18,$19)|0);
  STACKTOP = sp;return;
 }
}
function _and_needle_fn($n,$f) {
 $n = $n|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $fa = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $fa = sp;
 $0 = $n;
 $1 = $f;
 $2 = $0;
 $3 = (($2) + 28|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($4|0)!=(2);
 if ($5) {
  $6 = $0;
  $7 = $1;
  _default_needle_fn($6,$7);
  STACKTOP = sp;return;
 } else {
  $8 = $0;
  $9 = (($8) + 8|0);
  $10 = HEAP32[$9>>2]|0;
  $11 = $1;
  _needle_fn_wrapper($10,$11);
  $12 = $0;
  $13 = (($12) + 8|0);
  $14 = (($13) + 4|0);
  $15 = HEAP32[$14>>2]|0;
  _needle_fn_wrapper($15,$fa);
  $16 = $1;
  $17 = $1;
  (_bf_and($16,$17,$fa)|0);
  STACKTOP = sp;return;
 }
}
function _or_needle_fn($n,$f) {
 $n = $n|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $fa = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $fa = sp;
 $0 = $n;
 $1 = $f;
 $2 = $0;
 $3 = (($2) + 28|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($4|0)!=(2);
 if ($5) {
  $6 = $0;
  $7 = $1;
  _default_needle_fn($6,$7);
  STACKTOP = sp;return;
 } else {
  $8 = $0;
  $9 = (($8) + 8|0);
  $10 = HEAP32[$9>>2]|0;
  $11 = $1;
  _needle_fn_wrapper($10,$11);
  $12 = $0;
  $13 = (($12) + 8|0);
  $14 = (($13) + 4|0);
  $15 = HEAP32[$14>>2]|0;
  _needle_fn_wrapper($15,$fa);
  $16 = $1;
  $17 = $1;
  (_bf_or($16,$17,$fa)|0);
  STACKTOP = sp;return;
 }
}
function _not_needle_fn($n,$f) {
 $n = $n|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $16 = 0, $17 = 0;
 var $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0;
 var $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0;
 var $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0;
 var $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0;
 var $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $na = 0, $nb = 0, $nc = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $n;
 $1 = $f;
 $2 = $0;
 $3 = (($2) + 28|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($4|0)!=(1);
 if ($5) {
  $6 = $0;
  $7 = $1;
  _default_needle_fn($6,$7);
  STACKTOP = sp;return;
 }
 $8 = $0;
 $9 = (($8) + 8|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = (($10) + 28|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = ($12|0)==(0);
 if ($13) {
  $14 = $0;
  $15 = (($14) + 8|0);
  $16 = HEAP32[$15>>2]|0;
  $17 = (($16) + 4|0);
  $18 = HEAP32[$17>>2]|0;
  $19 = (($18) + 28|0);
  $20 = HEAP32[$19>>2]|0;
  $21 = ($20|0)==(2|0);
  if ($21) {
   $22 = $1;
   (_bf_false($22)|0);
   STACKTOP = sp;return;
  }
 }
 $23 = $0;
 $24 = (($23) + 8|0);
 $25 = HEAP32[$24>>2]|0;
 $26 = (($25) + 28|0);
 $27 = HEAP32[$26>>2]|0;
 $28 = ($27|0)==(1);
 if ($28) {
  $29 = $0;
  $30 = (($29) + 8|0);
  $31 = HEAP32[$30>>2]|0;
  $32 = (($31) + 4|0);
  $33 = HEAP32[$32>>2]|0;
  $34 = (($33) + 28|0);
  $35 = HEAP32[$34>>2]|0;
  $36 = ($35|0)==(3|0);
  if ($36) {
   $37 = $0;
   $38 = (($37) + 8|0);
   $39 = HEAP32[$38>>2]|0;
   $40 = (($39) + 8|0);
   $41 = HEAP32[$40>>2]|0;
   $42 = $1;
   _needle_fn_wrapper($41,$42);
  } else {
   label = 9;
  }
 } else {
  label = 9;
 }
 if ((label|0) == 9) {
  $43 = $0;
  $44 = (($43) + 8|0);
  $45 = HEAP32[$44>>2]|0;
  $46 = (($45) + 28|0);
  $47 = HEAP32[$46>>2]|0;
  $48 = ($47|0)==(2);
  if ($48) {
   $49 = $0;
   $50 = (($49) + 8|0);
   $51 = HEAP32[$50>>2]|0;
   $52 = (($51) + 4|0);
   $53 = HEAP32[$52>>2]|0;
   $54 = (($53) + 28|0);
   $55 = HEAP32[$54>>2]|0;
   $56 = ($55|0)==(4|0);
   if ($56) {
    $57 = (_new_node()|0);
    $nb = $57;
    $58 = $0;
    $59 = (($58) + 4|0);
    $60 = HEAP32[$59>>2]|0;
    $61 = $nb;
    $62 = (($61) + 4|0);
    HEAP32[$62>>2] = $60;
    $63 = $nb;
    $64 = (($63) + 4|0);
    $65 = HEAP32[$64>>2]|0;
    $66 = (($65) + 20|0);
    $67 = HEAP32[$66>>2]|0;
    $68 = (($67) + 1)|0;
    HEAP32[$66>>2] = $68;
    $69 = $nb;
    $70 = (($69) + 28|0);
    HEAP32[$70>>2] = 1;
    $71 = $0;
    $72 = (($71) + 8|0);
    $73 = HEAP32[$72>>2]|0;
    $74 = (($73) + 8|0);
    $75 = HEAP32[$74>>2]|0;
    $76 = $nb;
    $77 = (($76) + 8|0);
    HEAP32[$77>>2] = $75;
    $78 = $nb;
    $79 = (($78) + 8|0);
    $80 = HEAP32[$79>>2]|0;
    $81 = (($80) + 24|0);
    $82 = HEAP32[$81>>2]|0;
    $83 = (($82) + 1)|0;
    HEAP32[$81>>2] = $83;
    $84 = (_new_node()|0);
    $nc = $84;
    $85 = $0;
    $86 = (($85) + 4|0);
    $87 = HEAP32[$86>>2]|0;
    $88 = $nc;
    $89 = (($88) + 4|0);
    HEAP32[$89>>2] = $87;
    $90 = $nc;
    $91 = (($90) + 4|0);
    $92 = HEAP32[$91>>2]|0;
    $93 = (($92) + 20|0);
    $94 = HEAP32[$93>>2]|0;
    $95 = (($94) + 1)|0;
    HEAP32[$93>>2] = $95;
    $96 = $nc;
    $97 = (($96) + 28|0);
    HEAP32[$97>>2] = 1;
    $98 = $0;
    $99 = (($98) + 8|0);
    $100 = HEAP32[$99>>2]|0;
    $101 = (($100) + 8|0);
    $102 = (($101) + 4|0);
    $103 = HEAP32[$102>>2]|0;
    $104 = $nc;
    $105 = (($104) + 8|0);
    HEAP32[$105>>2] = $103;
    $106 = $nc;
    $107 = (($106) + 8|0);
    $108 = HEAP32[$107>>2]|0;
    $109 = (($108) + 24|0);
    $110 = HEAP32[$109>>2]|0;
    $111 = (($110) + 1)|0;
    HEAP32[$109>>2] = $111;
    $112 = (_new_node()|0);
    $na = $112;
    $113 = $0;
    $114 = (($113) + 8|0);
    $115 = HEAP32[$114>>2]|0;
    $116 = (($115) + 4|0);
    $117 = HEAP32[$116>>2]|0;
    $118 = (($117) + 12|0);
    $119 = HEAP32[$118>>2]|0;
    $120 = HEAP8[$119>>0]|0;
    $121 = $120 << 24 >> 24;
    $122 = ($121|0)==(124);
    $123 = $122 ? 112 : 120;
    $124 = (_new_string(1,$123)|0);
    $125 = $na;
    $126 = (($125) + 4|0);
    HEAP32[$126>>2] = $124;
    $127 = $na;
    $128 = (($127) + 28|0);
    HEAP32[$128>>2] = 2;
    $129 = $nb;
    $130 = $na;
    $131 = (($130) + 8|0);
    HEAP32[$131>>2] = $129;
    $132 = $nb;
    $133 = (($132) + 24|0);
    $134 = HEAP32[$133>>2]|0;
    $135 = (($134) + 1)|0;
    HEAP32[$133>>2] = $135;
    $136 = $nc;
    $137 = $na;
    $138 = (($137) + 8|0);
    $139 = (($138) + 4|0);
    HEAP32[$139>>2] = $136;
    $140 = $nc;
    $141 = (($140) + 24|0);
    $142 = HEAP32[$141>>2]|0;
    $143 = (($142) + 1)|0;
    HEAP32[$141>>2] = $143;
    $144 = $na;
    $145 = $1;
    _needle_fn_wrapper($144,$145);
    $146 = $nb;
    _free_node($146);
    $147 = $nc;
    _free_node($147);
    $148 = $na;
    _free_node($148);
   } else {
    label = 12;
   }
  } else {
   label = 12;
  }
  if ((label|0) == 12) {
   $149 = $1;
   (_bf_true($149)|0);
  }
 }
 STACKTOP = sp;return;
}
function _bf_false($z) {
 $z = $z|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $i = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer = sp;
 $0 = $z;
 $1 = $0;
 $2 = $1;
 $3 = $2;
 HEAP32[$3>>2] = 0;
 $4 = (($2) + 4)|0;
 $5 = $4;
 HEAP32[$5>>2] = 0;
 $6 = $0;
 $7 = (($6) + 8|0);
 $8 = $7;
 $9 = $8;
 HEAP32[$9>>2] = 0;
 $10 = (($8) + 4)|0;
 $11 = $10;
 HEAP32[$11>>2] = 0;
 $12 = $0;
 $13 = (($12) + 16|0);
 HEAP32[$13>>2] = 128;
 $14 = HEAP32[64>>2]|0;
 $15 = ($14|0)!=(0);
 if (!($15)) {
  $52 = $0;
  STACKTOP = sp;return ($52|0);
 }
 $i = 0;
 while(1) {
  $16 = $i;
  $17 = HEAP32[80>>2]|0;
  $18 = ($16|0)<($17|0);
  if (!($18)) {
   break;
  }
  $19 = HEAP32[_stderr>>2]|0;
  (_fputc(32,($19|0))|0);
  $20 = $i;
  $21 = (($20) + 1)|0;
  $i = $21;
 }
 $22 = HEAP32[_stderr>>2]|0;
 $23 = $0;
 $24 = (($23) + 8|0);
 $25 = $24;
 $26 = $25;
 $27 = HEAP32[$26>>2]|0;
 $28 = (($25) + 4)|0;
 $29 = $28;
 $30 = HEAP32[$29>>2]|0;
 $31 = $0;
 $32 = $31;
 $33 = $32;
 $34 = HEAP32[$33>>2]|0;
 $35 = (($32) + 4)|0;
 $36 = $35;
 $37 = HEAP32[$36>>2]|0;
 $38 = $0;
 $39 = (($38) + 16|0);
 $40 = HEAP32[$39>>2]|0;
 $41 = (($40) + 1)|0;
 $42 = $0;
 $43 = (_uint64_2_pop($42)|0);
 $44 = $vararg_buffer;
 $45 = $44;
 HEAP32[$45>>2] = $27;
 $46 = (($44) + 4)|0;
 $47 = $46;
 HEAP32[$47>>2] = $30;
 $vararg_ptr1 = (($vararg_buffer) + 8|0);
 $48 = $vararg_ptr1;
 $49 = $48;
 HEAP32[$49>>2] = $34;
 $50 = (($48) + 4)|0;
 $51 = $50;
 HEAP32[$51>>2] = $37;
 $vararg_ptr2 = (($vararg_buffer) + 16|0);
 HEAP32[$vararg_ptr2>>2] = $41;
 $vararg_ptr3 = (($vararg_buffer) + 20|0);
 HEAP32[$vararg_ptr3>>2] = $43;
 (_fprintf(($22|0),(128|0),($vararg_buffer|0))|0);
 $52 = $0;
 STACKTOP = sp;return ($52|0);
}
function _unord_needle_fn($n,$f) {
 $n = $n|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0;
 var $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0;
 var $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0;
 var $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0;
 var $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0;
 var $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0;
 var $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0;
 var $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0;
 var $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0;
 var $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $fa = 0, $nprime = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $fa = sp;
 $0 = $n;
 $1 = $f;
 $2 = $0;
 $3 = (($2) + 28|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($4|0)!=(1);
 if ($5) {
  $6 = $0;
  $7 = $1;
  _default_needle_fn($6,$7);
  STACKTOP = sp;return;
 }
 $8 = $0;
 $9 = (($8) + 8|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = $1;
 _needle_fn_wrapper($10,$11);
 $12 = $0;
 $13 = (($12) + 8|0);
 $14 = HEAP32[$13>>2]|0;
 $15 = (($14) + 28|0);
 $16 = HEAP32[$15>>2]|0;
 $17 = ($16|0)==(2);
 if ($17) {
  $18 = (_new_node()|0);
  $nprime = $18;
  $19 = $0;
  $20 = (($19) + 8|0);
  $21 = HEAP32[$20>>2]|0;
  $22 = (($21) + 4|0);
  $23 = HEAP32[$22>>2]|0;
  $24 = $nprime;
  $25 = (($24) + 4|0);
  HEAP32[$25>>2] = $23;
  $26 = $nprime;
  $27 = (($26) + 4|0);
  $28 = HEAP32[$27>>2]|0;
  $29 = (($28) + 20|0);
  $30 = HEAP32[$29>>2]|0;
  $31 = (($30) + 1)|0;
  HEAP32[$29>>2] = $31;
  $32 = $nprime;
  $33 = (($32) + 28|0);
  HEAP32[$33>>2] = 2;
  $34 = $0;
  $35 = (($34) + 8|0);
  $36 = HEAP32[$35>>2]|0;
  $37 = (($36) + 8|0);
  $38 = (($37) + 4|0);
  $39 = HEAP32[$38>>2]|0;
  $40 = $nprime;
  $41 = (($40) + 8|0);
  HEAP32[$41>>2] = $39;
  $42 = $nprime;
  $43 = (($42) + 8|0);
  $44 = HEAP32[$43>>2]|0;
  $45 = (($44) + 24|0);
  $46 = HEAP32[$45>>2]|0;
  $47 = (($46) + 1)|0;
  HEAP32[$45>>2] = $47;
  $48 = $0;
  $49 = (($48) + 8|0);
  $50 = HEAP32[$49>>2]|0;
  $51 = (($50) + 8|0);
  $52 = HEAP32[$51>>2]|0;
  $53 = $nprime;
  $54 = (($53) + 8|0);
  $55 = (($54) + 4|0);
  HEAP32[$55>>2] = $52;
  $56 = $nprime;
  $57 = (($56) + 8|0);
  $58 = (($57) + 4|0);
  $59 = HEAP32[$58>>2]|0;
  $60 = (($59) + 24|0);
  $61 = HEAP32[$60>>2]|0;
  $62 = (($61) + 1)|0;
  HEAP32[$60>>2] = $62;
  $63 = $nprime;
  _needle_fn_wrapper($63,$fa);
  $64 = $1;
  $65 = $1;
  (_bf_or($64,$65,$fa)|0);
  $66 = $nprime;
  _free_node($66);
  STACKTOP = sp;return;
 }
 $67 = $0;
 $68 = (($67) + 8|0);
 $69 = HEAP32[$68>>2]|0;
 $70 = (($69) + 28|0);
 $71 = HEAP32[$70>>2]|0;
 $72 = ($71|0)==(3);
 if ($72) {
  $73 = (_new_node()|0);
  $nprime = $73;
  $74 = $0;
  $75 = (($74) + 8|0);
  $76 = HEAP32[$75>>2]|0;
  $77 = (($76) + 4|0);
  $78 = HEAP32[$77>>2]|0;
  $79 = $nprime;
  $80 = (($79) + 4|0);
  HEAP32[$80>>2] = $78;
  $81 = $nprime;
  $82 = (($81) + 4|0);
  $83 = HEAP32[$82>>2]|0;
  $84 = (($83) + 20|0);
  $85 = HEAP32[$84>>2]|0;
  $86 = (($85) + 1)|0;
  HEAP32[$84>>2] = $86;
  $87 = $nprime;
  $88 = (($87) + 28|0);
  HEAP32[$88>>2] = 3;
  $89 = $0;
  $90 = (($89) + 8|0);
  $91 = HEAP32[$90>>2]|0;
  $92 = (($91) + 8|0);
  $93 = (($92) + 4|0);
  $94 = HEAP32[$93>>2]|0;
  $95 = $nprime;
  $96 = (($95) + 8|0);
  HEAP32[$96>>2] = $94;
  $97 = $nprime;
  $98 = (($97) + 8|0);
  $99 = HEAP32[$98>>2]|0;
  $100 = (($99) + 24|0);
  $101 = HEAP32[$100>>2]|0;
  $102 = (($101) + 1)|0;
  HEAP32[$100>>2] = $102;
  $103 = $0;
  $104 = (($103) + 8|0);
  $105 = HEAP32[$104>>2]|0;
  $106 = (($105) + 8|0);
  $107 = (($106) + 8|0);
  $108 = HEAP32[$107>>2]|0;
  $109 = $nprime;
  $110 = (($109) + 8|0);
  $111 = (($110) + 4|0);
  HEAP32[$111>>2] = $108;
  $112 = $nprime;
  $113 = (($112) + 8|0);
  $114 = (($113) + 4|0);
  $115 = HEAP32[$114>>2]|0;
  $116 = (($115) + 24|0);
  $117 = HEAP32[$116>>2]|0;
  $118 = (($117) + 1)|0;
  HEAP32[$116>>2] = $118;
  $119 = $0;
  $120 = (($119) + 8|0);
  $121 = HEAP32[$120>>2]|0;
  $122 = (($121) + 8|0);
  $123 = HEAP32[$122>>2]|0;
  $124 = $nprime;
  $125 = (($124) + 8|0);
  $126 = (($125) + 8|0);
  HEAP32[$126>>2] = $123;
  $127 = $nprime;
  $128 = (($127) + 8|0);
  $129 = (($128) + 8|0);
  $130 = HEAP32[$129>>2]|0;
  $131 = (($130) + 24|0);
  $132 = HEAP32[$131>>2]|0;
  $133 = (($132) + 1)|0;
  HEAP32[$131>>2] = $133;
  $134 = $nprime;
  _needle_fn_wrapper($134,$fa);
  $135 = $1;
  $136 = $1;
  (_bf_or($135,$136,$fa)|0);
  $137 = $nprime;
  _free_node($137);
  $138 = (_new_node()|0);
  $nprime = $138;
  $139 = $0;
  $140 = (($139) + 8|0);
  $141 = HEAP32[$140>>2]|0;
  $142 = (($141) + 4|0);
  $143 = HEAP32[$142>>2]|0;
  $144 = $nprime;
  $145 = (($144) + 4|0);
  HEAP32[$145>>2] = $143;
  $146 = $nprime;
  $147 = (($146) + 4|0);
  $148 = HEAP32[$147>>2]|0;
  $149 = (($148) + 20|0);
  $150 = HEAP32[$149>>2]|0;
  $151 = (($150) + 1)|0;
  HEAP32[$149>>2] = $151;
  $152 = $nprime;
  $153 = (($152) + 28|0);
  HEAP32[$153>>2] = 3;
  $154 = $0;
  $155 = (($154) + 8|0);
  $156 = HEAP32[$155>>2]|0;
  $157 = (($156) + 8|0);
  $158 = (($157) + 8|0);
  $159 = HEAP32[$158>>2]|0;
  $160 = $nprime;
  $161 = (($160) + 8|0);
  HEAP32[$161>>2] = $159;
  $162 = $nprime;
  $163 = (($162) + 8|0);
  $164 = HEAP32[$163>>2]|0;
  $165 = (($164) + 24|0);
  $166 = HEAP32[$165>>2]|0;
  $167 = (($166) + 1)|0;
  HEAP32[$165>>2] = $167;
  $168 = $0;
  $169 = (($168) + 8|0);
  $170 = HEAP32[$169>>2]|0;
  $171 = (($170) + 8|0);
  $172 = HEAP32[$171>>2]|0;
  $173 = $nprime;
  $174 = (($173) + 8|0);
  $175 = (($174) + 4|0);
  HEAP32[$175>>2] = $172;
  $176 = $nprime;
  $177 = (($176) + 8|0);
  $178 = (($177) + 4|0);
  $179 = HEAP32[$178>>2]|0;
  $180 = (($179) + 24|0);
  $181 = HEAP32[$180>>2]|0;
  $182 = (($181) + 1)|0;
  HEAP32[$180>>2] = $182;
  $183 = $0;
  $184 = (($183) + 8|0);
  $185 = HEAP32[$184>>2]|0;
  $186 = (($185) + 8|0);
  $187 = (($186) + 4|0);
  $188 = HEAP32[$187>>2]|0;
  $189 = $nprime;
  $190 = (($189) + 8|0);
  $191 = (($190) + 8|0);
  HEAP32[$191>>2] = $188;
  $192 = $nprime;
  $193 = (($192) + 8|0);
  $194 = (($193) + 8|0);
  $195 = HEAP32[$194>>2]|0;
  $196 = (($195) + 24|0);
  $197 = HEAP32[$196>>2]|0;
  $198 = (($197) + 1)|0;
  HEAP32[$196>>2] = $198;
  $199 = $nprime;
  _needle_fn_wrapper($199,$fa);
  $200 = $1;
  $201 = $1;
  (_bf_or($200,$201,$fa)|0);
  $202 = $nprime;
  _free_node($202);
  $203 = (_new_node()|0);
  $nprime = $203;
  $204 = $0;
  $205 = (($204) + 8|0);
  $206 = HEAP32[$205>>2]|0;
  $207 = (($206) + 4|0);
  $208 = HEAP32[$207>>2]|0;
  $209 = $nprime;
  $210 = (($209) + 4|0);
  HEAP32[$210>>2] = $208;
  $211 = $nprime;
  $212 = (($211) + 4|0);
  $213 = HEAP32[$212>>2]|0;
  $214 = (($213) + 20|0);
  $215 = HEAP32[$214>>2]|0;
  $216 = (($215) + 1)|0;
  HEAP32[$214>>2] = $216;
  $217 = $nprime;
  $218 = (($217) + 28|0);
  HEAP32[$218>>2] = 3;
  $219 = $0;
  $220 = (($219) + 8|0);
  $221 = HEAP32[$220>>2]|0;
  $222 = (($221) + 8|0);
  $223 = (($222) + 8|0);
  $224 = HEAP32[$223>>2]|0;
  $225 = $nprime;
  $226 = (($225) + 8|0);
  HEAP32[$226>>2] = $224;
  $227 = $nprime;
  $228 = (($227) + 8|0);
  $229 = HEAP32[$228>>2]|0;
  $230 = (($229) + 24|0);
  $231 = HEAP32[$230>>2]|0;
  $232 = (($231) + 1)|0;
  HEAP32[$230>>2] = $232;
  $233 = $0;
  $234 = (($233) + 8|0);
  $235 = HEAP32[$234>>2]|0;
  $236 = (($235) + 8|0);
  $237 = (($236) + 4|0);
  $238 = HEAP32[$237>>2]|0;
  $239 = $nprime;
  $240 = (($239) + 8|0);
  $241 = (($240) + 4|0);
  HEAP32[$241>>2] = $238;
  $242 = $nprime;
  $243 = (($242) + 8|0);
  $244 = (($243) + 4|0);
  $245 = HEAP32[$244>>2]|0;
  $246 = (($245) + 24|0);
  $247 = HEAP32[$246>>2]|0;
  $248 = (($247) + 1)|0;
  HEAP32[$246>>2] = $248;
  $249 = $0;
  $250 = (($249) + 8|0);
  $251 = HEAP32[$250>>2]|0;
  $252 = (($251) + 8|0);
  $253 = HEAP32[$252>>2]|0;
  $254 = $nprime;
  $255 = (($254) + 8|0);
  $256 = (($255) + 8|0);
  HEAP32[$256>>2] = $253;
  $257 = $nprime;
  $258 = (($257) + 8|0);
  $259 = (($258) + 8|0);
  $260 = HEAP32[$259>>2]|0;
  $261 = (($260) + 24|0);
  $262 = HEAP32[$261>>2]|0;
  $263 = (($262) + 1)|0;
  HEAP32[$261>>2] = $263;
  $264 = $nprime;
  _needle_fn_wrapper($264,$fa);
  $265 = $1;
  $266 = $1;
  (_bf_or($265,$266,$fa)|0);
  $267 = $nprime;
  _free_node($267);
  $268 = (_new_node()|0);
  $nprime = $268;
  $269 = $0;
  $270 = (($269) + 8|0);
  $271 = HEAP32[$270>>2]|0;
  $272 = (($271) + 4|0);
  $273 = HEAP32[$272>>2]|0;
  $274 = $nprime;
  $275 = (($274) + 4|0);
  HEAP32[$275>>2] = $273;
  $276 = $nprime;
  $277 = (($276) + 4|0);
  $278 = HEAP32[$277>>2]|0;
  $279 = (($278) + 20|0);
  $280 = HEAP32[$279>>2]|0;
  $281 = (($280) + 1)|0;
  HEAP32[$279>>2] = $281;
  $282 = $nprime;
  $283 = (($282) + 28|0);
  HEAP32[$283>>2] = 3;
  $284 = $0;
  $285 = (($284) + 8|0);
  $286 = HEAP32[$285>>2]|0;
  $287 = (($286) + 8|0);
  $288 = HEAP32[$287>>2]|0;
  $289 = $nprime;
  $290 = (($289) + 8|0);
  HEAP32[$290>>2] = $288;
  $291 = $nprime;
  $292 = (($291) + 8|0);
  $293 = HEAP32[$292>>2]|0;
  $294 = (($293) + 24|0);
  $295 = HEAP32[$294>>2]|0;
  $296 = (($295) + 1)|0;
  HEAP32[$294>>2] = $296;
  $297 = $0;
  $298 = (($297) + 8|0);
  $299 = HEAP32[$298>>2]|0;
  $300 = (($299) + 8|0);
  $301 = (($300) + 8|0);
  $302 = HEAP32[$301>>2]|0;
  $303 = $nprime;
  $304 = (($303) + 8|0);
  $305 = (($304) + 4|0);
  HEAP32[$305>>2] = $302;
  $306 = $nprime;
  $307 = (($306) + 8|0);
  $308 = (($307) + 4|0);
  $309 = HEAP32[$308>>2]|0;
  $310 = (($309) + 24|0);
  $311 = HEAP32[$310>>2]|0;
  $312 = (($311) + 1)|0;
  HEAP32[$310>>2] = $312;
  $313 = $0;
  $314 = (($313) + 8|0);
  $315 = HEAP32[$314>>2]|0;
  $316 = (($315) + 8|0);
  $317 = (($316) + 4|0);
  $318 = HEAP32[$317>>2]|0;
  $319 = $nprime;
  $320 = (($319) + 8|0);
  $321 = (($320) + 8|0);
  HEAP32[$321>>2] = $318;
  $322 = $nprime;
  $323 = (($322) + 8|0);
  $324 = (($323) + 8|0);
  $325 = HEAP32[$324>>2]|0;
  $326 = (($325) + 24|0);
  $327 = HEAP32[$326>>2]|0;
  $328 = (($327) + 1)|0;
  HEAP32[$326>>2] = $328;
  $329 = $nprime;
  _needle_fn_wrapper($329,$fa);
  $330 = $1;
  $331 = $1;
  (_bf_or($330,$331,$fa)|0);
  $332 = $nprime;
  _free_node($332);
  $333 = (_new_node()|0);
  $nprime = $333;
  $334 = $0;
  $335 = (($334) + 8|0);
  $336 = HEAP32[$335>>2]|0;
  $337 = (($336) + 4|0);
  $338 = HEAP32[$337>>2]|0;
  $339 = $nprime;
  $340 = (($339) + 4|0);
  HEAP32[$340>>2] = $338;
  $341 = $nprime;
  $342 = (($341) + 4|0);
  $343 = HEAP32[$342>>2]|0;
  $344 = (($343) + 20|0);
  $345 = HEAP32[$344>>2]|0;
  $346 = (($345) + 1)|0;
  HEAP32[$344>>2] = $346;
  $347 = $nprime;
  $348 = (($347) + 28|0);
  HEAP32[$348>>2] = 3;
  $349 = $0;
  $350 = (($349) + 8|0);
  $351 = HEAP32[$350>>2]|0;
  $352 = (($351) + 8|0);
  $353 = (($352) + 4|0);
  $354 = HEAP32[$353>>2]|0;
  $355 = $nprime;
  $356 = (($355) + 8|0);
  HEAP32[$356>>2] = $354;
  $357 = $nprime;
  $358 = (($357) + 8|0);
  $359 = HEAP32[$358>>2]|0;
  $360 = (($359) + 24|0);
  $361 = HEAP32[$360>>2]|0;
  $362 = (($361) + 1)|0;
  HEAP32[$360>>2] = $362;
  $363 = $0;
  $364 = (($363) + 8|0);
  $365 = HEAP32[$364>>2]|0;
  $366 = (($365) + 8|0);
  $367 = HEAP32[$366>>2]|0;
  $368 = $nprime;
  $369 = (($368) + 8|0);
  $370 = (($369) + 4|0);
  HEAP32[$370>>2] = $367;
  $371 = $nprime;
  $372 = (($371) + 8|0);
  $373 = (($372) + 4|0);
  $374 = HEAP32[$373>>2]|0;
  $375 = (($374) + 24|0);
  $376 = HEAP32[$375>>2]|0;
  $377 = (($376) + 1)|0;
  HEAP32[$375>>2] = $377;
  $378 = $0;
  $379 = (($378) + 8|0);
  $380 = HEAP32[$379>>2]|0;
  $381 = (($380) + 8|0);
  $382 = (($381) + 8|0);
  $383 = HEAP32[$382>>2]|0;
  $384 = $nprime;
  $385 = (($384) + 8|0);
  $386 = (($385) + 8|0);
  HEAP32[$386>>2] = $383;
  $387 = $nprime;
  $388 = (($387) + 8|0);
  $389 = (($388) + 8|0);
  $390 = HEAP32[$389>>2]|0;
  $391 = (($390) + 24|0);
  $392 = HEAP32[$391>>2]|0;
  $393 = (($392) + 1)|0;
  HEAP32[$391>>2] = $393;
  $394 = $nprime;
  _needle_fn_wrapper($394,$fa);
  $395 = $1;
  $396 = $1;
  (_bf_or($395,$396,$fa)|0);
  $397 = $nprime;
  _free_node($397);
 }
 STACKTOP = sp;return;
}
function _equal_needle_fn($n,$f) {
 $n = $n|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $12 = 0, $13 = 0, $14 = 0;
 var $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0;
 var $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0;
 var $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0;
 var $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0;
 var $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $fa = 0, $fb = 0, $hval = 0, $i = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0;
 var $vararg_ptr3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 96|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer = sp + 48|0;
 $fa = sp + 24|0;
 $fb = sp;
 $0 = $n;
 $1 = $f;
 $2 = $0;
 $3 = (($2) + 28|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($4|0)!=(1);
 if ($5) {
  $6 = $0;
  $7 = $1;
  _default_needle_fn($6,$7);
  STACKTOP = sp;return;
 }
 $8 = HEAP32[64>>2]|0;
 $9 = ($8|0)!=(0);
 if ($9) {
  $i = 0;
  while(1) {
   $10 = $i;
   $11 = HEAP32[80>>2]|0;
   $12 = ($10|0)<($11|0);
   if (!($12)) {
    break;
   }
   $13 = HEAP32[_stderr>>2]|0;
   (_fputc(32,($13|0))|0);
   $14 = $i;
   $15 = (($14) + 1)|0;
   $i = $15;
  }
  $16 = $0;
  $17 = (($16) + 8|0);
  $18 = HEAP32[$17>>2]|0;
  $19 = HEAP32[_stderr>>2]|0;
  _write_cooked_tree($18,$19);
  $20 = HEAP32[80>>2]|0;
  $21 = (($20) + 3)|0;
  HEAP32[80>>2] = $21;
 }
 $22 = $0;
 $23 = (($22) + 8|0);
 $24 = HEAP32[$23>>2]|0;
 $25 = $1;
 _default_needle_fn($24,$25);
 $26 = $0;
 $27 = (($26) + 8|0);
 $28 = HEAP32[$27>>2]|0;
 $29 = HEAP32[$28>>2]|0;
 $30 = ($29|0)!=(0|0);
 if ($30) {
  $31 = $0;
  $32 = (($31) + 8|0);
  $33 = HEAP32[$32>>2]|0;
  $34 = HEAP32[$33>>2]|0;
  $35 = (($34) + 16|0);
  $36 = HEAP32[$35>>2]|0;
  $37 = $0;
  $38 = (($37) + 8|0);
  $39 = HEAP32[$38>>2]|0;
  $40 = HEAP32[$39>>2]|0;
  $41 = (($40) + 12|0);
  $42 = HEAP32[$41>>2]|0;
  $43 = (_fnv_hash($36,$42,0)|0);
  $hval = $43;
  $44 = $hval;
  $45 = (_bit_combo(32,3,$44)|0);
  $46 = $fa;
  $47 = $46;
  HEAP32[$47>>2] = $45;
  $48 = (($46) + 4)|0;
  $49 = $48;
  HEAP32[$49>>2] = 0;
  $50 = (($fa) + 8|0);
  $51 = $50;
  $52 = $51;
  HEAP32[$52>>2] = 0;
  $53 = (($51) + 4)|0;
  $54 = $53;
  HEAP32[$54>>2] = 0;
  $55 = (($fa) + 16|0);
  HEAP32[$55>>2] = 2;
  $56 = (_fnv_hash(0,72,0)|0);
  $hval = $56;
  $57 = $hval;
  $58 = (_bit_combo(32,3,$57)|0);
  $59 = $fb;
  $60 = $59;
  HEAP32[$60>>2] = $58;
  $61 = (($59) + 4)|0;
  $62 = $61;
  HEAP32[$62>>2] = 0;
  $63 = (($fb) + 8|0);
  $64 = $63;
  $65 = $64;
  HEAP32[$65>>2] = 0;
  $66 = (($64) + 4)|0;
  $67 = $66;
  HEAP32[$67>>2] = 0;
  $68 = (($fb) + 16|0);
  HEAP32[$68>>2] = 2;
  $69 = $1;
  $70 = $1;
  $71 = $1;
  $72 = (_bf_and($70,$71,$fb)|0);
  (_bf_or($69,$fa,$72)|0);
 }
 $73 = HEAP32[64>>2]|0;
 $74 = ($73|0)!=(0);
 if (!($74)) {
  STACKTOP = sp;return;
 }
 $75 = HEAP32[80>>2]|0;
 $76 = (($75) - 3)|0;
 HEAP32[80>>2] = $76;
 $i = 0;
 while(1) {
  $77 = $i;
  $78 = HEAP32[80>>2]|0;
  $79 = ($77|0)<($78|0);
  if (!($79)) {
   break;
  }
  $80 = HEAP32[_stderr>>2]|0;
  (_fputc(32,($80|0))|0);
  $81 = $i;
  $82 = (($81) + 1)|0;
  $i = $82;
 }
 $83 = HEAP32[_stderr>>2]|0;
 $84 = $1;
 $85 = (($84) + 8|0);
 $86 = $85;
 $87 = $86;
 $88 = HEAP32[$87>>2]|0;
 $89 = (($86) + 4)|0;
 $90 = $89;
 $91 = HEAP32[$90>>2]|0;
 $92 = $1;
 $93 = $92;
 $94 = $93;
 $95 = HEAP32[$94>>2]|0;
 $96 = (($93) + 4)|0;
 $97 = $96;
 $98 = HEAP32[$97>>2]|0;
 $99 = $1;
 $100 = (($99) + 16|0);
 $101 = HEAP32[$100>>2]|0;
 $102 = (($101) + 1)|0;
 $103 = $1;
 $104 = (_uint64_2_pop($103)|0);
 $105 = $vararg_buffer;
 $106 = $105;
 HEAP32[$106>>2] = $88;
 $107 = (($105) + 4)|0;
 $108 = $107;
 HEAP32[$108>>2] = $91;
 $vararg_ptr1 = (($vararg_buffer) + 8|0);
 $109 = $vararg_ptr1;
 $110 = $109;
 HEAP32[$110>>2] = $95;
 $111 = (($109) + 4)|0;
 $112 = $111;
 HEAP32[$112>>2] = $98;
 $vararg_ptr2 = (($vararg_buffer) + 16|0);
 HEAP32[$vararg_ptr2>>2] = $102;
 $vararg_ptr3 = (($vararg_buffer) + 20|0);
 HEAP32[$vararg_ptr3>>2] = $104;
 (_fprintf(($83|0),(88|0),($vararg_buffer|0))|0);
 STACKTOP = sp;return;
}
function _set_output_recipe($r) {
 $r = $r|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $r;
 $1 = $0;
 $2 = (_strlen(($1|0))|0);
 $3 = ($2>>>0)>=(3);
 if ($3) {
  $4 = $0;
  $5 = (_strncmp($4,440,3)|0);
  $6 = ($5|0)!=(0);
  $8 = $6;
 } else {
  $8 = 0;
 }
 $7 = $8&1;
 HEAP32[416>>2] = $7;
 $i = 0;
 while(1) {
  $9 = $i;
  $10 = ($9|0)<(5);
  if (!($10)) {
   break;
  }
  $11 = $0;
  $12 = $i;
  $13 = (448 + ($12<<3)|0);
  $14 = HEAP32[$13>>2]|0;
  $15 = (_strcmp($11,$14)|0);
  $16 = ($15|0)==(0);
  if ($16) {
   $17 = $i;
   $18 = (448 + ($17<<3)|0);
   $19 = (($18) + 4|0);
   $20 = HEAP32[$19>>2]|0;
   $0 = $20;
  }
  $21 = $i;
  $22 = (($21) + 1)|0;
  $i = $22;
 }
 $i = 0;
 while(1) {
  $23 = $i;
  $24 = ($23|0)<(12);
  if (!($24)) {
   label = 18;
   break;
  }
  $25 = $i;
  $26 = $0;
  $27 = (($26) + ($25)|0);
  $28 = HEAP8[$27>>0]|0;
  $29 = $28 << 24 >> 24;
  $30 = ($29|0)>=(48);
  if ($30) {
   $31 = $i;
   $32 = $0;
   $33 = (($32) + ($31)|0);
   $34 = HEAP8[$33>>0]|0;
   $35 = $34 << 24 >> 24;
   $36 = ($35|0)<=(57);
   if ($36) {
    $37 = $i;
    $38 = $0;
    $39 = (($38) + ($37)|0);
    $40 = HEAP8[$39>>0]|0;
    $41 = $i;
    $42 = (488 + ($41)|0);
    HEAP8[$42>>0] = $40;
   }
  }
  $43 = $i;
  $44 = $0;
  $45 = (($44) + ($43)|0);
  $46 = HEAP8[$45>>0]|0;
  $47 = $46 << 24 >> 24;
  $48 = ($47|0)==(0);
  if ($48) {
   break;
  }
  $49 = $i;
  $50 = (($49) + 1)|0;
  $i = $50;
 }
 if ((label|0) == 18) {
  $51 = HEAP8[((488 + 11|0))>>0]|0;
  $52 = $51 << 24 >> 24;
  $53 = $52 & 4;
  $54 = ($53|0)==(0);
  $55 = $54&1;
  HEAP32[432>>2] = $55;
  STACKTOP = sp;return;
 }
 $51 = HEAP8[((488 + 11|0))>>0]|0;
 $52 = $51 << 24 >> 24;
 $53 = $52 & 4;
 $54 = ($53|0)==(0);
 $55 = $54&1;
 HEAP32[432>>2] = $55;
 STACKTOP = sp;return;
}
function _char_length($c) {
 $c = $c|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $c;
 $2 = $1;
 $3 = HEAP8[$2>>0]|0;
 $4 = $3&255;
 $5 = ($4|0)<(128);
 do {
  if ($5) {
   $0 = 1;
  } else {
   $6 = $1;
   $7 = HEAP8[$6>>0]|0;
   $8 = $7&255;
   $9 = ($8|0)<(192);
   if ($9) {
    (_puts((504|0))|0);
    _exit(1);
    // unreachable;
   }
   $10 = $1;
   $11 = HEAP8[$10>>0]|0;
   $12 = $11&255;
   $13 = ($12|0)<(224);
   if ($13) {
    $0 = 2;
    break;
   }
   $14 = $1;
   $15 = HEAP8[$14>>0]|0;
   $16 = $15&255;
   $17 = ($16|0)<(240);
   if ($17) {
    $0 = 3;
    break;
   }
   $18 = $1;
   $19 = HEAP8[$18>>0]|0;
   $20 = $19&255;
   $21 = ($20|0)<(245);
   if ($21) {
    $0 = 4;
    break;
   } else {
    (_puts((568|0))|0);
    _exit(1);
    // unreachable;
   }
  }
 } while(0);
 $22 = $0;
 STACKTOP = sp;return ($22|0);
}
function _wrap_write($cp,$len,$f) {
 $cp = $cp|0;
 $len = $len|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0;
 var $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0;
 var $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0;
 var $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0;
 var $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0;
 var $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $i = 0, $j = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $cp;
 $1 = $len;
 $2 = $f;
 $3 = HEAP32[416>>2]|0;
 $4 = ($3|0)!=(0);
 if ($4) {
  $5 = HEAP8[((488 + 6|0))>>0]|0;
  $6 = $5 << 24 >> 24;
  $7 = ($6|0)!=(57);
  if (!($7)) {
   $i = 0;
   while(1) {
    $11 = $i;
    $12 = $1;
    $13 = ($11|0)<($12|0);
    if (!($13)) {
     break;
    }
    $14 = $i;
    $15 = $0;
    $16 = (($15) + ($14)|0);
    $17 = HEAP8[$16>>0]|0;
    $18 = $17 << 24 >> 24;
    $19 = ($18|0)==(10);
    if ($19) {
     label = 8;
    } else {
     $20 = $i;
     $21 = $0;
     $22 = (($21) + ($20)|0);
     $23 = HEAP8[$22>>0]|0;
     $24 = $23 << 24 >> 24;
     $25 = ($24|0)==(12);
     if ($25) {
      label = 8;
     } else {
      $39 = HEAP32[680>>2]|0;
      $40 = ($39|0)!=(0);
      if ($40) {
       $41 = HEAP32[688>>2]|0;
       $42 = HEAP32[648>>2]|0;
       $43 = (($42) + 4)|0;
       $44 = ($41|0)<($43|0);
       if ($44) {
        $45 = HEAP32[640>>2]|0;
        $46 = ($45|0)==(0|0);
        if ($46) {
         HEAP32[688>>2] = 320;
         $47 = HEAP32[688>>2]|0;
         $48 = (_malloc($47)|0);
         HEAP32[640>>2] = $48;
        } else {
         $49 = HEAP32[688>>2]|0;
         $50 = (($49|0) / 3)&-1;
         HEAP32[688>>2] = $50;
         $51 = HEAP32[688>>2]|0;
         $52 = $51<<2;
         HEAP32[688>>2] = $52;
         $53 = HEAP32[640>>2]|0;
         $54 = HEAP32[688>>2]|0;
         $55 = (_realloc($53,$54)|0);
         HEAP32[640>>2] = $55;
        }
       }
       $56 = $0;
       $57 = $i;
       $58 = (($56) + ($57)|0);
       $59 = (_idsgrep_utf8cw($58)|0);
       $60 = HEAP32[664>>2]|0;
       $61 = (($60) + ($59))|0;
       HEAP32[664>>2] = $61;
       while(1) {
        $62 = $i;
        $63 = (($62) + 1)|0;
        $i = $63;
        $64 = $0;
        $65 = (($64) + ($62)|0);
        $66 = HEAP8[$65>>0]|0;
        $67 = HEAP32[648>>2]|0;
        $68 = (($67) + 1)|0;
        HEAP32[648>>2] = $68;
        $69 = HEAP32[640>>2]|0;
        $70 = (($69) + ($67)|0);
        HEAP8[$70>>0] = $66;
        $71 = $i;
        $72 = $1;
        $73 = ($71|0)>=($72|0);
        if ($73) {
         break;
        }
        $74 = $i;
        $75 = $0;
        $76 = (($75) + ($74)|0);
        $77 = HEAP8[$76>>0]|0;
        $78 = $77 << 24 >> 24;
        $79 = $78 & 192;
        $80 = ($79|0)!=(128);
        if ($80) {
         break;
        }
       }
       $81 = HEAP32[672>>2]|0;
       $82 = HEAP32[664>>2]|0;
       $83 = (($81) + ($82))|0;
       $84 = ($83|0)>(76);
       if ($84) {
        $85 = $2;
        (_fwrite((696|0),1,4,($85|0))|0);
        $86 = HEAP32[656>>2]|0;
        $87 = $2;
        (_fputs(($86|0),($87|0))|0);
        $88 = HEAP32[640>>2]|0;
        $89 = HEAP32[648>>2]|0;
        $90 = $2;
        (_fwrite(($88|0),1,($89|0),($90|0))|0);
        $91 = HEAP32[664>>2]|0;
        $92 = (3 + ($91))|0;
        HEAP32[672>>2] = $92;
        HEAP32[664>>2] = 0;
        HEAP32[648>>2] = 0;
        HEAP32[680>>2] = 0;
       }
      } else {
       $93 = $0;
       $94 = $i;
       $95 = (($93) + ($94)|0);
       $96 = (_char_length($95)|0);
       $j = $96;
       $97 = $0;
       $98 = $i;
       $99 = (($97) + ($98)|0);
       $100 = $j;
       $101 = $2;
       (_fwrite(($99|0),1,($100|0),($101|0))|0);
       $102 = $0;
       $103 = $i;
       $104 = (($102) + ($103)|0);
       $105 = (_idsgrep_utf8cw($104)|0);
       $106 = HEAP32[672>>2]|0;
       $107 = (($106) + ($105))|0;
       HEAP32[672>>2] = $107;
       $108 = $j;
       $109 = $i;
       $110 = (($109) + ($108))|0;
       $i = $110;
      }
     }
    }
    if ((label|0) == 8) {
     label = 0;
     $26 = HEAP32[640>>2]|0;
     $27 = HEAP32[648>>2]|0;
     $28 = $2;
     (_fwrite(($26|0),1,($27|0),($28|0))|0);
     $29 = $i;
     $30 = $0;
     $31 = (($30) + ($29)|0);
     $32 = HEAP8[$31>>0]|0;
     $33 = $32 << 24 >> 24;
     $34 = $2;
     (_fputc(($33|0),($34|0))|0);
     $35 = HEAP32[656>>2]|0;
     $36 = $2;
     (_fputs(($35|0),($36|0))|0);
     HEAP32[648>>2] = 0;
     HEAP32[664>>2] = 0;
     HEAP32[672>>2] = 0;
     HEAP32[680>>2] = 0;
     $37 = $i;
     $38 = (($37) + 1)|0;
     $i = $38;
    }
   }
   STACKTOP = sp;return;
  }
 }
 $8 = $0;
 $9 = $1;
 $10 = $2;
 (_fwrite(($8|0),1,($9|0),($10|0))|0);
 STACKTOP = sp;return;
}
function _wrap_flush($f) {
 $f = $f|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $f;
 $1 = HEAP32[648>>2]|0;
 $2 = ($1|0)>(0);
 if (!($2)) {
  STACKTOP = sp;return;
 }
 $3 = HEAP32[640>>2]|0;
 $4 = HEAP32[648>>2]|0;
 $5 = $0;
 (_fwrite(($3|0),1,($4|0),($5|0))|0);
 $6 = HEAP32[664>>2]|0;
 $7 = HEAP32[672>>2]|0;
 $8 = (($7) + ($6))|0;
 HEAP32[672>>2] = $8;
 HEAP32[664>>2] = 0;
 HEAP32[648>>2] = 0;
 STACKTOP = sp;return;
}
function _write_maybe_escaped_char($cp,$br,$f) {
 $cp = $cp|0;
 $br = $br|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0;
 var $c = 0, $cl = 0, $do_esc = 0, $i = 0, $out_buffer = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, $vararg_buffer4 = 0, $vararg_buffer7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer7 = sp + 24|0;
 $vararg_buffer4 = sp + 16|0;
 $vararg_buffer1 = sp + 8|0;
 $vararg_buffer = sp;
 $out_buffer = sp + 56|0;
 $0 = $cp;
 $1 = $br;
 $2 = $f;
 $3 = $0;
 $4 = (_char_length($3)|0);
 $cl = $4;
 if ((($4|0) == 1)) {
  $5 = $0;
  $6 = HEAP8[$5>>0]|0;
  $7 = $6&255;
  $c = $7;
 } else if ((($4|0) == 2)) {
  $8 = $0;
  $9 = HEAP8[$8>>0]|0;
  $10 = $9&255;
  $11 = $10 & 31;
  $12 = $11 << 6;
  $13 = $0;
  $14 = (($13) + 1|0);
  $15 = HEAP8[$14>>0]|0;
  $16 = $15&255;
  $17 = $16 & 63;
  $18 = $12 | $17;
  $c = $18;
 } else if ((($4|0) == 3)) {
  $19 = $0;
  $20 = HEAP8[$19>>0]|0;
  $21 = $20&255;
  $22 = $21 & 15;
  $23 = $22 << 12;
  $24 = $0;
  $25 = (($24) + 1|0);
  $26 = HEAP8[$25>>0]|0;
  $27 = $26&255;
  $28 = $27 & 63;
  $29 = $28 << 6;
  $30 = $23 | $29;
  $31 = $0;
  $32 = (($31) + 2|0);
  $33 = HEAP8[$32>>0]|0;
  $34 = $33&255;
  $35 = $34 & 63;
  $36 = $30 | $35;
  $c = $36;
 } else if ((($4|0) == 4)) {
  $37 = $0;
  $38 = HEAP8[$37>>0]|0;
  $39 = $38&255;
  $40 = $39 & 7;
  $41 = $40 << 18;
  $42 = $0;
  $43 = (($42) + 1|0);
  $44 = HEAP8[$43>>0]|0;
  $45 = $44&255;
  $46 = $45 & 63;
  $47 = $46 << 12;
  $48 = $41 | $47;
  $49 = $0;
  $50 = (($49) + 2|0);
  $51 = HEAP8[$50>>0]|0;
  $52 = $51&255;
  $53 = $52 & 63;
  $54 = $53 << 6;
  $55 = $48 | $54;
  $56 = $0;
  $57 = (($56) + 3|0);
  $58 = HEAP8[$57>>0]|0;
  $59 = $58&255;
  $60 = $59 & 63;
  $61 = $55 | $60;
  $c = $61;
 } else {
  (_puts((704|0))|0);
  _exit(1);
  // unreachable;
 }
 $62 = $c;
 $63 = ($62|0)==(92);
 if ($63) {
  $do_esc = 1;
 } else {
  $64 = $1;
  $65 = ($64|0)!=(0|0);
  if ($65) {
   $66 = $0;
   $67 = $1;
   $68 = (($67) + 12|0);
   $69 = HEAP32[$68>>2]|0;
   $70 = $1;
   $71 = (($70) + 16|0);
   $72 = HEAP32[$71>>2]|0;
   $73 = (_strncmp($66,$69,$72)|0);
   $74 = ($73|0)==(0);
   if ($74) {
    $do_esc = 1;
   } else {
    label = 12;
   }
  } else {
   label = 12;
  }
  if ((label|0) == 12) {
   $75 = $c;
   $76 = ($75|0)>(65535);
   if ($76) {
    $77 = HEAP8[((488 + 9|0))>>0]|0;
    $78 = $77 << 24 >> 24;
    $79 = ($78|0)>=(49);
    $80 = $79&1;
    $do_esc = $80;
   } else {
    $81 = $c;
    $82 = ($81|0)>=(19968);
    if ($82) {
     $83 = $c;
     $84 = ($83|0)<=(40959);
     if ($84) {
      $85 = HEAP8[((488 + 9|0))>>0]|0;
      $86 = $85 << 24 >> 24;
      $87 = ($86|0)>=(52);
      $88 = $87&1;
      $do_esc = $88;
     } else {
      label = 17;
     }
    } else {
     label = 17;
    }
    if ((label|0) == 17) {
     $89 = $c;
     $90 = ($89|0)>=(57344);
     if ($90) {
      $91 = $c;
      $92 = ($91|0)<=(63743);
      if ($92) {
       $93 = HEAP8[((488 + 9|0))>>0]|0;
       $94 = $93 << 24 >> 24;
       $95 = ($94|0)>=(50);
       $96 = $95&1;
       $do_esc = $96;
      } else {
       label = 20;
      }
     } else {
      label = 20;
     }
     if ((label|0) == 20) {
      $97 = $c;
      $98 = ($97|0)>=(128);
      if ($98) {
       $99 = HEAP8[((488 + 9|0))>>0]|0;
       $100 = $99 << 24 >> 24;
       $101 = ($100|0)>=(51);
       $102 = $101&1;
       $do_esc = $102;
      } else {
       $103 = $c;
       $104 = ($103|0)<(32);
       if ($104) {
        $105 = HEAP8[((488 + 9|0))>>0]|0;
        $106 = $105 << 24 >> 24;
        $107 = ($106|0)>=(53);
        $108 = $107&1;
        $do_esc = $108;
       } else {
        $109 = HEAP8[((488 + 9|0))>>0]|0;
        $110 = $109 << 24 >> 24;
        $111 = ($110|0)>=(55);
        $112 = $111&1;
        $do_esc = $112;
       }
      }
     }
    }
   }
  }
 }
 $113 = $do_esc;
 $114 = ($113|0)!=(0);
 if (!($114)) {
  $196 = $0;
  $197 = $0;
  $198 = (_char_length($197)|0);
  $199 = $2;
  _wrap_write($196,$198,$199);
  STACKTOP = sp;return;
 }
 $115 = HEAP8[((488 + 10|0))>>0]|0;
 $116 = $115 << 24 >> 24;
 L46: do {
  switch ($116|0) {
  case 51: case 53:  {
   $117 = HEAP8[((488 + 10|0))>>0]|0;
   $118 = $117 << 24 >> 24;
   $119 = ($118|0)==(51);
   if ($119) {
    label = 35;
   } else {
    $120 = $c;
    $121 = ($120|0)>=(127);
    if ($121) {
     label = 35;
    }
   }
   if ((label|0) == 35) {
    $122 = $c;
    $123 = ($122|0)<=(255);
    if ($123) {
     $124 = $c;
     HEAP32[$vararg_buffer>>2] = $124;
     (_sprintf($out_buffer,752,$vararg_buffer)|0);
     break L46;
    }
   }
   label = 38;
   break;
  }
  case 52:  {
   label = 38;
   break;
  }
  case 50:  {
   label = 43;
   break;
  }
  case 48:  {
   label = 60;
   break;
  }
  case 49:  {
   label = 47;
   break;
  }
  default: {
   label = 61;
  }
  }
 } while(0);
 do {
  if ((label|0) == 38) {
   $125 = HEAP8[((488 + 10|0))>>0]|0;
   $126 = $125 << 24 >> 24;
   $127 = ($126|0)==(52);
   if ($127) {
    label = 40;
   } else {
    $128 = $c;
    $129 = ($128|0)>(255);
    if ($129) {
     label = 40;
    }
   }
   if ((label|0) == 40) {
    $130 = $c;
    $131 = ($130|0)<=(65535);
    if ($131) {
     $132 = $c;
     HEAP32[$vararg_buffer1>>2] = $132;
     (_sprintf($out_buffer,760,$vararg_buffer1)|0);
     break;
    }
   }
   label = 43;
  }
 } while(0);
 do {
  if ((label|0) == 43) {
   $133 = HEAP8[((488 + 10|0))>>0]|0;
   $134 = $133 << 24 >> 24;
   $135 = ($134|0)==(50);
   if (!($135)) {
    $136 = $c;
    $137 = ($136|0)>(65535);
    if (!($137)) {
     label = 47;
     break;
    }
   }
   $138 = $c;
   HEAP32[$vararg_buffer4>>2] = $138;
   (_sprintf($out_buffer,768,$vararg_buffer4)|0);
  }
 } while(0);
 do {
  if ((label|0) == 47) {
   $139 = $c;
   $140 = ($139|0)>=(1);
   if ($140) {
    $141 = $c;
    $142 = ($141|0)<=(27);
    if ($142) {
     HEAP8[$out_buffer>>0] = 92;
     $143 = (($out_buffer) + 2|0);
     HEAP8[$143>>0] = 0;
     $144 = $c;
     switch ($144|0) {
     case 13:  {
      $151 = (($out_buffer) + 1|0);
      HEAP8[$151>>0] = 114;
      break;
     }
     case 7:  {
      $145 = (($out_buffer) + 1|0);
      HEAP8[$145>>0] = 97;
      break;
     }
     case 8:  {
      $146 = (($out_buffer) + 1|0);
      HEAP8[$146>>0] = 98;
      break;
     }
     case 27:  {
      $147 = (($out_buffer) + 1|0);
      HEAP8[$147>>0] = 101;
      break;
     }
     case 12:  {
      $148 = (($out_buffer) + 1|0);
      HEAP8[$148>>0] = 102;
      break;
     }
     case 9:  {
      $149 = (($out_buffer) + 1|0);
      HEAP8[$149>>0] = 116;
      break;
     }
     case 10:  {
      $150 = (($out_buffer) + 1|0);
      HEAP8[$150>>0] = 110;
      break;
     }
     default: {
      $152 = (($out_buffer) + 1|0);
      HEAP8[$152>>0] = 99;
      $153 = $c;
      $154 = (($153) + 65)|0;
      $155 = (($154) - 1)|0;
      $156 = $155&255;
      $157 = (($out_buffer) + 2|0);
      HEAP8[$157>>0] = $156;
      $158 = (($out_buffer) + 3|0);
      HEAP8[$158>>0] = 0;
     }
     }
     break;
    }
   }
   label = 60;
  }
 } while(0);
 if ((label|0) == 60) {
  label = 61;
 }
 if ((label|0) == 61) {
  $159 = HEAP8[((488 + 10|0))>>0]|0;
  $160 = $159 << 24 >> 24;
  $161 = ($160|0)==(53);
  do {
   if ($161) {
    $162 = $c;
    $163 = ($162|0)<=(31);
    if (!($163)) {
     $164 = $c;
     $165 = ($164|0)==(127);
     if (!($165)) {
      label = 65;
      break;
     }
    }
    $166 = $c;
    HEAP32[$vararg_buffer7>>2] = $166;
    (_sprintf($out_buffer,752,$vararg_buffer7)|0);
   } else {
    label = 65;
   }
  } while(0);
  if ((label|0) == 65) {
   $167 = $c;
   $168 = $167 | 32;
   $169 = ($168|0)>=(97);
   if ($169) {
    $170 = $c;
    $171 = $170 | 32;
    $172 = ($171|0)<=(122);
    if ($172) {
     $173 = $c;
     $174 = $173&255;
     HEAP8[$out_buffer>>0] = $174;
     $175 = (($out_buffer) + 1|0);
     HEAP8[$175>>0] = 0;
    } else {
     label = 68;
    }
   } else {
    label = 68;
   }
   do {
    if ((label|0) == 68) {
     HEAP8[$out_buffer>>0] = 92;
     $i = 0;
     while(1) {
      $176 = $i;
      $177 = $cl;
      $178 = ($176|0)<($177|0);
      if (!($178)) {
       break;
      }
      $179 = $i;
      $180 = $0;
      $181 = (($180) + ($179)|0);
      $182 = HEAP8[$181>>0]|0;
      $183 = $i;
      $184 = (($183) + 1)|0;
      $185 = (($out_buffer) + ($184)|0);
      HEAP8[$185>>0] = $182;
      $186 = $i;
      $187 = (($186) + 1)|0;
      $i = $187;
     }
     $188 = $i;
     $189 = (($188) + 1)|0;
     $190 = (($out_buffer) + ($189)|0);
     HEAP8[$190>>0] = 0;
     $191 = $c;
     $192 = ($191|0)==(0);
     if (!($192)) {
      break;
     }
     $193 = $2;
     _wrap_write($out_buffer,2,$193);
     STACKTOP = sp;return;
    }
   } while(0);
  }
 }
 $194 = (_strlen(($out_buffer|0))|0);
 $195 = $2;
 _wrap_write($out_buffer,$194,$195);
 STACKTOP = sp;return;
}
function _write_bracketed_string($hs,$br,$f) {
 $hs = $hs|0;
 $br = $br|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $7 = 0, $8 = 0, $9 = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $hs;
 $1 = $br;
 $2 = $f;
 $3 = $2;
 _wrap_flush($3);
 $4 = HEAP32[424>>2]|0;
 $5 = ($4|0)!=(0);
 if ($5) {
  $6 = $1;
  $7 = (($6) + 24|0);
  $8 = HEAP32[$7>>2]|0;
  $9 = (($8) + 2)|0;
  $10 = (776 + ($9<<2)|0);
  $11 = HEAP32[$10>>2]|0;
  HEAP32[656>>2] = $11;
  $12 = HEAP32[656>>2]|0;
  $13 = $2;
  (_fputs(($12|0),($13|0))|0);
 }
 HEAP32[680>>2] = 1;
 $14 = $1;
 $15 = (($14) + 12|0);
 $16 = HEAP32[$15>>2]|0;
 $17 = $1;
 $18 = (($17) + 16|0);
 $19 = HEAP32[$18>>2]|0;
 $20 = $2;
 _wrap_write($16,$19,$20);
 $i = 0;
 while(1) {
  $21 = $i;
  $22 = $0;
  $23 = (($22) + 16|0);
  $24 = HEAP32[$23>>2]|0;
  $25 = ($21>>>0)<($24>>>0);
  if (!($25)) {
   break;
  }
  $26 = $i;
  $27 = ($26|0)==(0);
  if ($27) {
   $28 = HEAP8[((488 + 9|0))>>0]|0;
   $29 = $28 << 24 >> 24;
   $30 = ($29|0)<(54);
   if ($30) {
    $31 = $0;
    $32 = (($31) + 12|0);
    $33 = HEAP32[$32>>2]|0;
    $34 = $i;
    $35 = (($33) + ($34)|0);
    $36 = $2;
    _write_maybe_escaped_char($35,0,$36);
   } else {
    label = 8;
   }
  } else {
   label = 8;
  }
  if ((label|0) == 8) {
   label = 0;
   $37 = $0;
   $38 = (($37) + 12|0);
   $39 = HEAP32[$38>>2]|0;
   $40 = $i;
   $41 = (($39) + ($40)|0);
   $42 = $1;
   $43 = (($42) + 4|0);
   $44 = HEAP32[$43>>2]|0;
   $45 = $2;
   _write_maybe_escaped_char($41,$44,$45);
  }
  $46 = $0;
  $47 = (($46) + 12|0);
  $48 = HEAP32[$47>>2]|0;
  $49 = $i;
  $50 = (($48) + ($49)|0);
  $51 = (_char_length($50)|0);
  $52 = $i;
  $53 = (($52) + ($51))|0;
  $i = $53;
 }
 $54 = $1;
 $55 = (($54) + 4|0);
 $56 = HEAP32[$55>>2]|0;
 $57 = (($56) + 12|0);
 $58 = HEAP32[$57>>2]|0;
 $59 = $1;
 $60 = (($59) + 4|0);
 $61 = HEAP32[$60>>2]|0;
 $62 = (($61) + 16|0);
 $63 = HEAP32[$62>>2]|0;
 $64 = $2;
 _wrap_write($58,$63,$64);
 STACKTOP = sp;return;
}
function _write_cooked_tree($ms,$f) {
 $ms = $ms|0;
 $f = $f|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0;
 var $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0;
 var $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0;
 var $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0;
 var $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $i = 0, $mf = 0, $semicolon = 0, $tail = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $ms;
 $1 = $f;
 $2 = $0;
 $3 = (($2) + 32|0);
 HEAP32[$3>>2] = 0;
 $4 = (_new_string(1,800)|0);
 $semicolon = $4;
 while(1) {
  $5 = $0;
  $6 = ($5|0)!=(0|0);
  if (!($6)) {
   break;
  }
  $7 = $0;
  $8 = (($7) + 20|0);
  $9 = HEAP32[$8>>2]|0;
  $tail = $9;
  $10 = $0;
  $11 = (($10) + 28|0);
  $12 = HEAP32[$11>>2]|0;
  $13 = (($12) - 1)|0;
  $i = $13;
  while(1) {
   $14 = $i;
   $15 = ($14|0)>=(0);
   if (!($15)) {
    break;
   }
   $16 = $tail;
   $17 = $i;
   $18 = $0;
   $19 = (($18) + 8|0);
   $20 = (($19) + ($17<<2)|0);
   $21 = HEAP32[$20>>2]|0;
   $22 = (($21) + 20|0);
   HEAP32[$22>>2] = $16;
   $23 = $0;
   $24 = (($23) + 32|0);
   $25 = HEAP32[$24>>2]|0;
   $26 = (($25) + 1)|0;
   $27 = $i;
   $28 = $0;
   $29 = (($28) + 8|0);
   $30 = (($29) + ($27<<2)|0);
   $31 = HEAP32[$30>>2]|0;
   $32 = (($31) + 32|0);
   HEAP32[$32>>2] = $26;
   $33 = $i;
   $34 = $0;
   $35 = (($34) + 8|0);
   $36 = (($35) + ($33<<2)|0);
   $37 = HEAP32[$36>>2]|0;
   $tail = $37;
   $38 = $i;
   $39 = (($38) + -1)|0;
   $i = $39;
  }
  $40 = HEAP8[((488 + 6|0))>>0]|0;
  $41 = $40 << 24 >> 24;
  $42 = ($41|0)!=(57);
  if ($42) {
   $43 = HEAP8[((488 + 6|0))>>0]|0;
   $44 = $43 << 24 >> 24;
   $45 = ($44|0)!=(48);
   if ($45) {
    $46 = $0;
    $47 = (($46) + 32|0);
    $48 = HEAP32[$47>>2]|0;
    $49 = ($48|0)>(0);
    if ($49) {
     $50 = $1;
     (_fputc(10,($50|0))|0);
    }
   }
   $51 = HEAP8[((488 + 6|0))>>0]|0;
   $52 = $51 << 24 >> 24;
   $53 = ($52|0)==(56);
   if ($53) {
    $i = 0;
    while(1) {
     $54 = $i;
     $55 = $0;
     $56 = (($55) + 32|0);
     $57 = HEAP32[$56>>2]|0;
     $58 = ($54|0)<($57|0);
     if (!($58)) {
      break;
     }
     $59 = $1;
     (_fputc(9,($59|0))|0);
     $60 = $i;
     $61 = (($60) + 1)|0;
     $i = $61;
    }
   } else {
    $i = 0;
    while(1) {
     $62 = $i;
     $63 = $0;
     $64 = (($63) + 32|0);
     $65 = HEAP32[$64>>2]|0;
     $66 = HEAP8[((488 + 6|0))>>0]|0;
     $67 = $66 << 24 >> 24;
     $68 = (($67) - 48)|0;
     $69 = Math_imul($65, $68)|0;
     $70 = ($62|0)<($69|0);
     if (!($70)) {
      break;
     }
     $71 = $1;
     (_fputc(32,($71|0))|0);
     $72 = $i;
     $73 = (($72) + 1)|0;
     $i = $73;
    }
   }
  }
  $74 = HEAP8[((488 + 8|0))>>0]|0;
  $75 = $74 << 24 >> 24;
  $76 = $75 & 2;
  $77 = ($76|0)!=(0);
  if ($77) {
   label = 25;
  } else {
   $78 = $0;
   $79 = (($78) + 32|0);
   $80 = HEAP32[$79>>2]|0;
   $81 = ($80|0)==(0);
   if ($81) {
    label = 25;
   } else {
    label = 36;
   }
  }
  do {
   if ((label|0) == 25) {
    label = 0;
    $82 = HEAP8[((488 + 8|0))>>0]|0;
    $83 = $82 << 24 >> 24;
    $84 = $83 & 4;
    $85 = ($84|0)!=(0);
    if (!($85)) {
     $86 = $0;
     $87 = (($86) + 32|0);
     $88 = HEAP32[$87>>2]|0;
     $89 = ($88|0)>(0);
     if (!($89)) {
      label = 36;
      break;
     }
    }
    $90 = $0;
    $91 = HEAP32[$90>>2]|0;
    $92 = ($91|0)!=(0|0);
    if ($92) {
     $93 = $0;
     $94 = HEAP32[$93>>2]|0;
     $95 = (($94) + 12|0);
     $96 = HEAP32[$95>>2]|0;
     $97 = HEAP8[$96>>0]|0;
     $98 = $97&255;
     $99 = ($98|0)>(32);
     if ($99) {
      $100 = $0;
      $101 = HEAP32[$100>>2]|0;
      $102 = (($101) + 12|0);
      $103 = HEAP32[$102>>2]|0;
      $104 = (_char_length($103)|0);
      $105 = $0;
      $106 = HEAP32[$105>>2]|0;
      $107 = (($106) + 16|0);
      $108 = HEAP32[$107>>2]|0;
      $109 = ($104|0)==($108|0);
      if ($109) {
       $110 = $0;
       $111 = HEAP32[$110>>2]|0;
       $112 = (($111) + 24|0);
       $113 = HEAP32[$112>>2]|0;
       $114 = ($113|0)==(-2);
       if ($114) {
        $115 = $0;
        $116 = (($115) + 28|0);
        $117 = HEAP32[$116>>2]|0;
        $118 = ($117|0)==(0);
        if ($118) {
         $119 = $0;
         $120 = (($119) + 4|0);
         $121 = HEAP32[$120>>2]|0;
         $122 = $semicolon;
         $123 = ($121|0)==($122|0);
         if ($123) {
          $124 = $1;
          _wrap_flush($124);
          $125 = HEAP32[424>>2]|0;
          $126 = ($125|0)!=(0);
          if ($126) {
           $127 = HEAP32[((808 + 4|0))>>2]|0;
           HEAP32[656>>2] = $127;
           $128 = HEAP32[656>>2]|0;
           $129 = $1;
           (_fputs(($128|0),($129|0))|0);
          }
          HEAP32[680>>2] = 1;
          $130 = $0;
          $131 = HEAP32[$130>>2]|0;
          $132 = (($131) + 12|0);
          $133 = HEAP32[$132>>2]|0;
          $134 = $1;
          _write_maybe_escaped_char($133,0,$134);
         } else {
          label = 36;
         }
        } else {
         label = 36;
        }
       } else {
        label = 36;
       }
      } else {
       label = 36;
      }
     } else {
      label = 36;
     }
    } else {
     label = 36;
    }
   }
  } while(0);
  if ((label|0) == 36) {
   label = 0;
   $135 = $0;
   $136 = HEAP32[$135>>2]|0;
   $137 = ($136|0)!=(0|0);
   if ($137) {
    $138 = $0;
    $139 = (($138) + 32|0);
    $140 = HEAP32[$139>>2]|0;
    $141 = ($140|0)==(0);
    if ($141) {
     $142 = HEAP8[488>>0]|0;
     $143 = $142 << 24 >> 24;
     $144 = ($143|0)<(50);
     if ($144) {
      $145 = $0;
      $146 = HEAP32[$145>>2]|0;
      $147 = HEAP8[488>>0]|0;
      $148 = $147 << 24 >> 24;
      $149 = (($148) - 48)|0;
      $150 = (2080 + ($149<<2)|0);
      $151 = HEAP32[$150>>2]|0;
      $152 = $1;
      _write_bracketed_string($146,$151,$152);
     } else {
      $153 = $0;
      $154 = HEAP32[$153>>2]|0;
      $155 = HEAP32[((2080 + 8|0))>>2]|0;
      $156 = $1;
      _write_bracketed_string($154,$155,$156);
     }
    } else {
     $157 = HEAP8[((488 + 1|0))>>0]|0;
     $158 = $157 << 24 >> 24;
     $159 = ($158|0)<(50);
     if ($159) {
      $160 = $0;
      $161 = HEAP32[$160>>2]|0;
      $162 = HEAP8[((488 + 1|0))>>0]|0;
      $163 = $162 << 24 >> 24;
      $164 = (($163) - 48)|0;
      $165 = (2080 + ($164<<2)|0);
      $166 = HEAP32[$165>>2]|0;
      $167 = $1;
      _write_bracketed_string($161,$166,$167);
     } else {
      $168 = $0;
      $169 = HEAP32[$168>>2]|0;
      $170 = HEAP32[((2080 + 8|0))>>2]|0;
      $171 = $1;
      _write_bracketed_string($169,$170,$171);
     }
    }
   }
   $172 = $0;
   $173 = (($172) + 4|0);
   $174 = HEAP32[$173>>2]|0;
   $175 = (($174) + 8|0);
   $176 = HEAP32[$175>>2]|0;
   $177 = ($176|0)!=(0|0);
   if ($177) {
    $178 = $0;
    $179 = (($178) + 28|0);
    $180 = HEAP32[$179>>2]|0;
    $181 = $0;
    $182 = (($181) + 4|0);
    $183 = HEAP32[$182>>2]|0;
    $184 = (($183) + 8|0);
    $185 = HEAP32[$184>>2]|0;
    $186 = (($185) + 24|0);
    $187 = HEAP32[$186>>2]|0;
    $188 = ($180|0)==($187|0);
    if ($188) {
     $189 = HEAP8[((488 + 11|0))>>0]|0;
     $190 = $189 << 24 >> 24;
     $191 = $0;
     $192 = (($191) + 4|0);
     $193 = HEAP32[$192>>2]|0;
     $194 = (($193) + 12|0);
     $195 = HEAP32[$194>>2]|0;
     $196 = HEAP8[$195>>0]|0;
     $197 = $196 << 24 >> 24;
     $198 = $197 & 128;
     $199 = ($198|0)!=(0);
     $200 = $199 ? 1 : 2;
     $201 = ($200|0)!=(0);
     $202 = $201&1;
     $203 = $190 & $202;
     $204 = ($203|0)!=(0);
     if ($204) {
      $205 = $0;
      $206 = (($205) + 4|0);
      $207 = HEAP32[$206>>2]|0;
      $208 = (($207) + 8|0);
      $209 = HEAP32[$208>>2]|0;
      $mf = $209;
     } else {
      label = 51;
     }
    } else {
     label = 51;
    }
   } else {
    label = 51;
   }
   if ((label|0) == 51) {
    label = 0;
    $210 = $0;
    $211 = (($210) + 4|0);
    $212 = HEAP32[$211>>2]|0;
    $mf = $212;
   }
   $213 = HEAP8[((488 + 8|0))>>0]|0;
   $214 = $213 << 24 >> 24;
   $215 = $214 & 1;
   $216 = ($215|0)!=(0);
   if ($216) {
    $217 = $mf;
    $218 = (($217) + 24|0);
    $219 = HEAP32[$218>>2]|0;
    $220 = $0;
    $221 = (($220) + 28|0);
    $222 = HEAP32[$221>>2]|0;
    $223 = ($219|0)==($222|0);
    if ($223) {
     $224 = $mf;
     $225 = (($224) + 4|0);
     $226 = HEAP32[$225>>2]|0;
     $227 = ($226|0)==(0|0);
     if ($227) {
      $228 = $mf;
      $229 = (($228) + 12|0);
      $230 = HEAP32[$229>>2]|0;
      $231 = (_char_length($230)|0);
      $232 = $mf;
      $233 = (($232) + 16|0);
      $234 = HEAP32[$233>>2]|0;
      $235 = ($231|0)==($234|0);
      if ($235) {
       $236 = $1;
       _wrap_flush($236);
       $237 = HEAP32[424>>2]|0;
       $238 = ($237|0)!=(0);
       if ($238) {
        $239 = $mf;
        $240 = (($239) + 24|0);
        $241 = HEAP32[$240>>2]|0;
        $242 = (($241) + 2)|0;
        $243 = (808 + ($242<<2)|0);
        $244 = HEAP32[$243>>2]|0;
        HEAP32[656>>2] = $244;
        $245 = HEAP32[656>>2]|0;
        $246 = $1;
        (_fputs(($245|0),($246|0))|0);
       }
       HEAP32[680>>2] = 1;
       $247 = $mf;
       $248 = (($247) + 12|0);
       $249 = HEAP32[$248>>2]|0;
       $250 = $mf;
       $251 = (($250) + 16|0);
       $252 = HEAP32[$251>>2]|0;
       $253 = $1;
       _wrap_write($249,$252,$253);
      } else {
       label = 59;
      }
     } else {
      label = 59;
     }
    } else {
     label = 59;
    }
   } else {
    label = 59;
   }
   if ((label|0) == 59) {
    label = 0;
    $254 = $0;
    $255 = (($254) + 28|0);
    $256 = HEAP32[$255>>2]|0;
    $257 = (2 + ($256))|0;
    $258 = (488 + ($257)|0);
    $259 = HEAP8[$258>>0]|0;
    $260 = $259 << 24 >> 24;
    $261 = (($260) - 48)|0;
    $i = $261;
    $262 = $i;
    $263 = ($262|0)>(2);
    if ($263) {
     $i = 2;
    }
    $264 = $mf;
    $265 = $0;
    $266 = (($265) + 28|0);
    $267 = HEAP32[$266>>2]|0;
    $268 = (($267) + 1)|0;
    $269 = ($268*3)|0;
    $270 = $i;
    $271 = (($269) + ($270))|0;
    $272 = (2080 + ($271<<2)|0);
    $273 = HEAP32[$272>>2]|0;
    $274 = $1;
    _write_bracketed_string($264,$273,$274);
   }
  }
  $275 = $0;
  $276 = (($275) + 20|0);
  HEAP32[$276>>2] = 0;
  $277 = $tail;
  $0 = $277;
 }
 $278 = $1;
 _wrap_flush($278);
 $279 = HEAP32[424>>2]|0;
 $280 = ($279|0)!=(0);
 if ($280) {
  HEAP32[656>>2] = 832;
 }
 $281 = HEAP8[((488 + 7|0))>>0]|0;
 $282 = $281 << 24 >> 24;
 if ((($282|0) == 48)) {
  $283 = $1;
  (_fputc(0,($283|0))|0);
  $286 = $semicolon;
  _delete_string($286);
  STACKTOP = sp;return;
 } else if ((($282|0) == 51)) {
  $286 = $semicolon;
  _delete_string($286);
  STACKTOP = sp;return;
 } else if ((($282|0) == 50)) {
  $284 = $1;
  _wrap_write(840,2,$284);
  $286 = $semicolon;
  _delete_string($286);
  STACKTOP = sp;return;
 } else {
  $285 = $1;
  _wrap_write(848,1,$285);
  $286 = $semicolon;
  _delete_string($286);
  STACKTOP = sp;return;
 }
}
function _alloc_string($len) {
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $i = 0, $rval = 0, $save_data = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $len;
 $1 = $0;
 $2 = ($1>>>0)<=(16);
 if ($2) {
  $i = 4;
 } else {
  $i = 5;
  while(1) {
   $3 = $i;
   $4 = 1 << $3;
   $5 = $0;
   $6 = ($4>>>0)<($5>>>0);
   if (!($6)) {
    break;
   }
   $7 = $i;
   $8 = (($7) + 1)|0;
   $i = $8;
  }
 }
 $9 = $i;
 $10 = (1064 + ($9<<2)|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = ($11|0)==(0|0);
 if ($12) {
  $13 = $i;
  $14 = 1 << $13;
  $15 = (48 + ($14))|0;
  $16 = (($15) + 1)|0;
  $17 = (_malloc($16)|0);
  $rval = $17;
  $18 = $rval;
  dest=$18+0|0; stop=dest+48|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
  $19 = $rval;
  $20 = (($19) + 48|0);
  $21 = $rval;
  $22 = (($21) + 12|0);
  HEAP32[$22>>2] = $20;
 } else {
  $23 = $i;
  $24 = (1064 + ($23<<2)|0);
  $25 = HEAP32[$24>>2]|0;
  $rval = $25;
  $26 = $rval;
  $27 = HEAP32[$26>>2]|0;
  $28 = $i;
  $29 = (1064 + ($28<<2)|0);
  HEAP32[$29>>2] = $27;
  $30 = $rval;
  $31 = (($30) + 12|0);
  $32 = HEAP32[$31>>2]|0;
  $save_data = $32;
  $33 = $rval;
  dest=$33+0|0; stop=dest+48|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
  $34 = $save_data;
  $35 = $rval;
  $36 = (($35) + 12|0);
  HEAP32[$36>>2] = $34;
 }
 $37 = $0;
 $38 = $rval;
 $39 = (($38) + 16|0);
 HEAP32[$39>>2] = $37;
 $40 = $rval;
 $41 = (($40) + 24|0);
 HEAP32[$41>>2] = -2;
 $42 = $rval;
 $43 = (($42) + 28|0);
 HEAP32[$43>>2] = 5;
 $44 = $rval;
 $45 = (($44) + 32|0);
 HEAP32[$45>>2] = 6;
 $46 = $rval;
 $47 = (($46) + 40|0);
 $48 = $47;
 $49 = $48;
 HEAP32[$49>>2] = 0;
 $50 = (($48) + 4)|0;
 $51 = $50;
 HEAP32[$51>>2] = 0;
 $52 = $rval;
 STACKTOP = sp;return ($52|0);
}
function _free_string($s) {
 $s = $s|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $s;
 $1 = $0;
 $2 = (($1) + 16|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ($3>>>0)<=(16);
 if ($4) {
  $i = 4;
 } else {
  $i = 5;
  while(1) {
   $5 = $i;
   $6 = 1 << $5;
   $7 = $0;
   $8 = (($7) + 16|0);
   $9 = HEAP32[$8>>2]|0;
   $10 = ($6>>>0)<($9>>>0);
   if (!($10)) {
    break;
   }
   $11 = $i;
   $12 = (($11) + 1)|0;
   $i = $12;
  }
 }
 $13 = $i;
 $14 = (1064 + ($13<<2)|0);
 $15 = HEAP32[$14>>2]|0;
 $16 = $0;
 HEAP32[$16>>2] = $15;
 $17 = $0;
 $18 = $i;
 $19 = (1064 + ($18<<2)|0);
 HEAP32[$19>>2] = $17;
 STACKTOP = sp;return;
}
function _new_string($len,$s) {
 $len = $len|0;
 $s = $s|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0;
 var $h = 0, $i = 0, $new_table = 0, $tmph = 0, $tmps = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $len;
 $1 = $s;
 $2 = HEAP32[1320>>2]|0;
 $3 = ($2|0)==(0);
 if ($3) {
  $4 = (_malloc(400)|0);
  HEAP32[1328>>2] = $4;
  HEAP32[1320>>2] = 100;
  $i = 0;
  while(1) {
   $5 = $i;
   $6 = HEAP32[1320>>2]|0;
   $7 = ($5|0)<($6|0);
   if (!($7)) {
    break;
   }
   $8 = $i;
   $9 = HEAP32[1328>>2]|0;
   $10 = (($9) + ($8<<2)|0);
   HEAP32[$10>>2] = 0;
   $11 = $i;
   $12 = (($11) + 1)|0;
   $i = $12;
  }
 }
 $13 = $0;
 $14 = $1;
 $15 = (_fnv_hash31($13,$14,0)|0);
 $h = $15;
 $16 = $h;
 $17 = HEAP32[1320>>2]|0;
 $18 = (($16>>>0) % ($17>>>0))&-1;
 $19 = HEAP32[1328>>2]|0;
 $20 = (($19) + ($18<<2)|0);
 $21 = HEAP32[$20>>2]|0;
 $tmps = $21;
 while(1) {
  $22 = $tmps;
  $23 = ($22|0)!=(0|0);
  if ($23) {
   $24 = $tmps;
   $25 = (($24) + 16|0);
   $26 = HEAP32[$25>>2]|0;
   $27 = $0;
   $28 = ($26|0)!=($27|0);
   if ($28) {
    $139 = 1;
   } else {
    $29 = $tmps;
    $30 = (($29) + 12|0);
    $31 = HEAP32[$30>>2]|0;
    $32 = $1;
    $33 = $0;
    $34 = (_memcmp($31,$32,$33)|0);
    $35 = ($34|0)!=(0);
    $139 = $35;
   }
   $138 = $139;
  } else {
   $138 = 0;
  }
  if (!($138)) {
   break;
  }
  $36 = $tmps;
  $37 = HEAP32[$36>>2]|0;
  $tmps = $37;
 }
 $38 = $tmps;
 $39 = ($38|0)!=(0|0);
 if ($39) {
  $40 = $tmps;
  $41 = (($40) + 20|0);
  $42 = HEAP32[$41>>2]|0;
  $43 = (($42) + 1)|0;
  HEAP32[$41>>2] = $43;
  $137 = $tmps;
  STACKTOP = sp;return ($137|0);
 }
 $44 = HEAP32[1336>>2]|0;
 $45 = HEAP32[1320>>2]|0;
 $46 = $45<<1;
 $47 = ($44|0)>($46|0);
 if ($47) {
  $48 = HEAP32[1320>>2]|0;
  $49 = $48<<1;
  HEAP32[1320>>2] = $49;
  $50 = HEAP32[1320>>2]|0;
  $51 = $50<<2;
  $52 = (_malloc($51)|0);
  $new_table = $52;
  $i = 0;
  while(1) {
   $53 = $i;
   $54 = HEAP32[1320>>2]|0;
   $55 = ($53|0)<($54|0);
   if (!($55)) {
    break;
   }
   $56 = $i;
   $57 = $new_table;
   $58 = (($57) + ($56<<2)|0);
   HEAP32[$58>>2] = 0;
   $59 = $i;
   $60 = (($59) + 1)|0;
   $i = $60;
  }
  $i = 0;
  while(1) {
   $61 = $i;
   $62 = HEAP32[1320>>2]|0;
   $63 = (($62|0) / 2)&-1;
   $64 = ($61|0)<($63|0);
   if (!($64)) {
    break;
   }
   while(1) {
    $65 = $i;
    $66 = HEAP32[1328>>2]|0;
    $67 = (($66) + ($65<<2)|0);
    $68 = HEAP32[$67>>2]|0;
    $69 = ($68|0)!=(0|0);
    if (!($69)) {
     break;
    }
    $70 = $i;
    $71 = HEAP32[1328>>2]|0;
    $72 = (($71) + ($70<<2)|0);
    $73 = HEAP32[$72>>2]|0;
    $tmps = $73;
    $74 = $tmps;
    $75 = HEAP32[$74>>2]|0;
    $76 = $i;
    $77 = HEAP32[1328>>2]|0;
    $78 = (($77) + ($76<<2)|0);
    HEAP32[$78>>2] = $75;
    $79 = $tmps;
    $80 = (($79) + 16|0);
    $81 = HEAP32[$80>>2]|0;
    $82 = $tmps;
    $83 = (($82) + 12|0);
    $84 = HEAP32[$83>>2]|0;
    $85 = (_fnv_hash31($81,$84,0)|0);
    $86 = HEAP32[1320>>2]|0;
    $87 = (($85>>>0) % ($86>>>0))&-1;
    $tmph = $87;
    $88 = $tmph;
    $89 = $new_table;
    $90 = (($89) + ($88<<2)|0);
    $91 = HEAP32[$90>>2]|0;
    $92 = $tmps;
    HEAP32[$92>>2] = $91;
    $93 = $tmps;
    $94 = $tmph;
    $95 = $new_table;
    $96 = (($95) + ($94<<2)|0);
    HEAP32[$96>>2] = $93;
   }
   $97 = $i;
   $98 = (($97) + 1)|0;
   $i = $98;
  }
  $99 = HEAP32[1328>>2]|0;
  _free($99);
  $100 = $new_table;
  HEAP32[1328>>2] = $100;
 }
 $101 = $0;
 $102 = (_alloc_string($101)|0);
 $tmps = $102;
 $103 = $tmps;
 $104 = (($103) + 12|0);
 $105 = HEAP32[$104>>2]|0;
 $106 = $1;
 $107 = $0;
 _memcpy(($105|0),($106|0),($107|0))|0;
 $108 = $0;
 $109 = $tmps;
 $110 = (($109) + 12|0);
 $111 = HEAP32[$110>>2]|0;
 $112 = (($111) + ($108)|0);
 HEAP8[$112>>0] = 0;
 $113 = $0;
 $114 = $tmps;
 $115 = (($114) + 16|0);
 HEAP32[$115>>2] = $113;
 $116 = $0;
 $117 = ($116|0)==(1);
 if ($117) {
  $118 = $tmps;
  $119 = (($118) + 20|0);
  HEAP32[$119>>2] = 2;
 } else {
  $120 = $tmps;
  $121 = (($120) + 20|0);
  HEAP32[$121>>2] = 1;
 }
 $122 = $h;
 $123 = HEAP32[1320>>2]|0;
 $124 = (($122>>>0) % ($123>>>0))&-1;
 $125 = HEAP32[1328>>2]|0;
 $126 = (($125) + ($124<<2)|0);
 $127 = HEAP32[$126>>2]|0;
 $128 = $tmps;
 HEAP32[$128>>2] = $127;
 $129 = $tmps;
 $130 = $h;
 $131 = HEAP32[1320>>2]|0;
 $132 = (($130>>>0) % ($131>>>0))&-1;
 $133 = HEAP32[1328>>2]|0;
 $134 = (($133) + ($132<<2)|0);
 HEAP32[$134>>2] = $129;
 $135 = HEAP32[1336>>2]|0;
 $136 = (($135) + 1)|0;
 HEAP32[1336>>2] = $136;
 $137 = $tmps;
 STACKTOP = sp;return ($137|0);
}
function _fnv_hash31($m,$a,$bump) {
 $m = $m|0;
 $a = $a|0;
 $bump = $bump|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, $hval = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $m;
 $1 = $a;
 $2 = $bump;
 $3 = $2;
 $4 = ($3|0)!=(0);
 $5 = $4 ? 84696351 : -2128831035;
 $hval = $5;
 $i = 0;
 while(1) {
  $6 = $i;
  $7 = $0;
  $8 = ($6|0)<($7|0);
  if (!($8)) {
   break;
  }
  $9 = $i;
  $10 = $1;
  $11 = (($10) + ($9)|0);
  $12 = HEAP8[$11>>0]|0;
  $13 = $12 << 24 >> 24;
  $14 = $hval;
  $15 = $14 ^ $13;
  $hval = $15;
  $16 = $hval;
  $17 = Math_imul($16, 16777619)|0;
  $hval = $17;
  $18 = $i;
  $19 = (($18) + 1)|0;
  $i = $19;
 }
 $20 = $hval;
 STACKTOP = sp;return ($20|0);
}
function _delete_string($s) {
 $s = $s|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $h = 0, $tmps = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $s;
 $1 = $0;
 $2 = (($1) + 20|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = (($3) + -1)|0;
 HEAP32[$2>>2] = $4;
 $5 = $0;
 $6 = (($5) + 20|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ($7|0)==(0);
 if (!($8)) {
  STACKTOP = sp;return;
 }
 $9 = $0;
 $10 = (($9) + 16|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = $0;
 $13 = (($12) + 12|0);
 $14 = HEAP32[$13>>2]|0;
 $15 = (_fnv_hash31($11,$14,0)|0);
 $16 = HEAP32[1320>>2]|0;
 $17 = (($15>>>0) % ($16>>>0))&-1;
 $h = $17;
 $18 = $h;
 $19 = HEAP32[1328>>2]|0;
 $20 = (($19) + ($18<<2)|0);
 $21 = HEAP32[$20>>2]|0;
 $22 = $0;
 $23 = ($21|0)==($22|0);
 if ($23) {
  $24 = $0;
  $25 = HEAP32[$24>>2]|0;
  $26 = $h;
  $27 = HEAP32[1328>>2]|0;
  $28 = (($27) + ($26<<2)|0);
  HEAP32[$28>>2] = $25;
 } else {
  $29 = $h;
  $30 = HEAP32[1328>>2]|0;
  $31 = (($30) + ($29<<2)|0);
  $32 = HEAP32[$31>>2]|0;
  $tmps = $32;
  while(1) {
   $33 = $tmps;
   $34 = HEAP32[$33>>2]|0;
   $35 = $0;
   $36 = ($34|0)!=($35|0);
   if (!($36)) {
    break;
   }
   $37 = $tmps;
   $38 = HEAP32[$37>>2]|0;
   $tmps = $38;
  }
  $39 = $0;
  $40 = HEAP32[$39>>2]|0;
  $41 = $tmps;
  HEAP32[$41>>2] = $40;
 }
 $42 = $0;
 _free_string($42);
 $43 = HEAP32[1336>>2]|0;
 $44 = (($43) + -1)|0;
 HEAP32[1336>>2] = $44;
 STACKTOP = sp;return;
}
function _new_node() {
 var $0 = 0, $1 = 0, $10 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $rval = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = HEAP32[1344>>2]|0;
 $1 = ($0|0)!=(0|0);
 if ($1) {
  $2 = HEAP32[1344>>2]|0;
  $rval = $2;
  $3 = $rval;
  $4 = (($3) + 8|0);
  $5 = HEAP32[$4>>2]|0;
  HEAP32[1344>>2] = $5;
 } else {
  $6 = (_malloc(40)|0);
  $rval = $6;
 }
 $7 = $rval;
 dest=$7+0|0; stop=dest+40|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 $8 = $rval;
 $9 = (($8) + 24|0);
 HEAP32[$9>>2] = 1;
 $10 = $rval;
 STACKTOP = sp;return ($10|0);
}
function _free_node($n) {
 $n = $n|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $8 = 0, $9 = 0, $i = 0, $tmpn = 0, $to_free = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $n;
 $to_free = 0;
 $1 = $0;
 $2 = (($1) + 24|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = (($3) + -1)|0;
 HEAP32[$2>>2] = $4;
 $5 = $0;
 $6 = (($5) + 24|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ($7|0)==(0);
 if ($8) {
  $9 = $to_free;
  $10 = $0;
  $11 = (($10) + 20|0);
  HEAP32[$11>>2] = $9;
  $12 = $0;
  $to_free = $12;
 }
 while(1) {
  $13 = $to_free;
  $14 = ($13|0)!=(0|0);
  if (!($14)) {
   break;
  }
  $15 = $to_free;
  $tmpn = $15;
  $16 = $tmpn;
  $17 = (($16) + 20|0);
  $18 = HEAP32[$17>>2]|0;
  $to_free = $18;
  $i = 0;
  while(1) {
   $19 = $i;
   $20 = ($19|0)<(3);
   if (!($20)) {
    break;
   }
   $21 = $i;
   $22 = $tmpn;
   $23 = (($22) + 8|0);
   $24 = (($23) + ($21<<2)|0);
   $25 = HEAP32[$24>>2]|0;
   $26 = ($25|0)!=(0|0);
   if ($26) {
    $27 = $i;
    $28 = $tmpn;
    $29 = (($28) + 8|0);
    $30 = (($29) + ($27<<2)|0);
    $31 = HEAP32[$30>>2]|0;
    $32 = (($31) + 24|0);
    $33 = HEAP32[$32>>2]|0;
    $34 = (($33) + -1)|0;
    HEAP32[$32>>2] = $34;
    $35 = $i;
    $36 = $tmpn;
    $37 = (($36) + 8|0);
    $38 = (($37) + ($35<<2)|0);
    $39 = HEAP32[$38>>2]|0;
    $40 = (($39) + 24|0);
    $41 = HEAP32[$40>>2]|0;
    $42 = ($41|0)==(0);
    if ($42) {
     $43 = $to_free;
     $44 = $i;
     $45 = $tmpn;
     $46 = (($45) + 8|0);
     $47 = (($46) + ($44<<2)|0);
     $48 = HEAP32[$47>>2]|0;
     $49 = (($48) + 20|0);
     HEAP32[$49>>2] = $43;
     $50 = $i;
     $51 = $tmpn;
     $52 = (($51) + 8|0);
     $53 = (($52) + ($50<<2)|0);
     $54 = HEAP32[$53>>2]|0;
     $to_free = $54;
    }
   }
   $55 = $i;
   $56 = (($55) + 1)|0;
   $i = $56;
  }
  $57 = $tmpn;
  $58 = HEAP32[$57>>2]|0;
  $59 = ($58|0)!=(0|0);
  if ($59) {
   $60 = $tmpn;
   $61 = HEAP32[$60>>2]|0;
   _delete_string($61);
  }
  $62 = $tmpn;
  $63 = (($62) + 4|0);
  $64 = HEAP32[$63>>2]|0;
  $65 = ($64|0)!=(0|0);
  if ($65) {
   $66 = $tmpn;
   $67 = (($66) + 4|0);
   $68 = HEAP32[$67>>2]|0;
   _delete_string($68);
  }
  $69 = HEAP32[1344>>2]|0;
  $70 = $tmpn;
  $71 = (($70) + 8|0);
  HEAP32[$71>>2] = $69;
  $72 = $tmpn;
  HEAP32[1344>>2] = $72;
 }
 STACKTOP = sp;return;
}
function _process_file_indexed($match_pattern,$fn,$fn_flag) {
 $match_pattern = $match_pattern|0;
 $fn = $fn|0;
 $fn_flag = $fn_flag|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0;
 var $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0;
 var $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0;
 var $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0;
 var $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0;
 var $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0;
 var $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $btest = 0;
 var $colon = 0, $dict_buff = 0, $dict_buff_size = 0, $entry_size = 0, $hfn = 0, $i = 0, $idxfile = 0, $ih = 0, $infile = 0, $ir = 0, $ir_avail = 0, $ir_done = 0, $mtime = 0, $offset = 0, $parsed = 0, $stat_buff = 0, $to_match = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, $vararg_buffer12 = 0;
 var $vararg_buffer3 = 0, $vararg_buffer5 = 0, $vararg_buffer7 = 0, $vararg_buffer9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 240|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer12 = sp + 64|0;
 $vararg_buffer9 = sp + 56|0;
 $vararg_buffer7 = sp + 48|0;
 $vararg_buffer5 = sp + 40|0;
 $vararg_buffer3 = sp + 32|0;
 $vararg_buffer1 = sp + 24|0;
 $vararg_buffer = sp + 16|0;
 $ih = sp + 168|0;
 $stat_buff = sp + 88|0;
 $btest = sp;
 $1 = $match_pattern;
 $2 = $fn;
 $3 = $fn_flag;
 $dict_buff_size = 0;
 $4 = HEAP32[1368>>2]|0;
 $5 = ($4|0)!=(0);
 if (!($5)) {
  $6 = HEAP32[1376>>2]|0;
  $7 = ($6|0)!=(0);
  if (!($7)) {
   $8 = $2;
   $9 = (_strcmp($8,1384)|0);
   $10 = ($9|0)==(0);
   if (!($10)) {
    $16 = (_malloc(48024)|0);
    $ir = $16;
    $i = 0;
    while(1) {
     $17 = $i;
     $18 = $2;
     $19 = (($18) + ($17)|0);
     $20 = HEAP8[$19>>0]|0;
     $21 = $20 << 24 >> 24;
     $22 = ($21|0)!=(0);
     if (!($22)) {
      break;
     }
     $23 = $i;
     $24 = (($23) + 1)|0;
     $i = $24;
    }
    $25 = $i;
    $26 = ($25|0)<(5);
    if (!($26)) {
     $27 = $2;
     $28 = $i;
     $29 = (($27) + ($28)|0);
     $30 = (($29) + -5|0);
     $31 = (_strcmp($30,1472)|0);
     $32 = ($31|0)!=(0);
     if (!($32)) {
      $33 = $2;
      $34 = (_stat(($33|0),($stat_buff|0))|0);
      $35 = ($34|0)!=(0);
      if (!($35)) {
       $40 = (($stat_buff) + 56|0);
       $41 = HEAP32[$40>>2]|0;
       $mtime = $41;
       $42 = $2;
       $43 = $i;
       $44 = (($42) + ($43)|0);
       $45 = (($44) + -4|0);
       (_strcpy(($45|0),(1528|0))|0);
       $46 = $2;
       $47 = (_stat(($46|0),($stat_buff|0))|0);
       $48 = ($47|0)!=(0);
       if (!($48)) {
        $49 = (($stat_buff) + 56|0);
        $50 = HEAP32[$49>>2]|0;
        $51 = $mtime;
        $52 = ($50|0)<($51|0);
        if (!($52)) {
         $53 = $2;
         $54 = (_fopen(($53|0),(1536|0))|0);
         $idxfile = $54;
         $55 = ($54|0)==(0|0);
         if (!($55)) {
          $64 = $2;
          $65 = $i;
          $66 = (($64) + ($65)|0);
          $67 = (($66) + -4|0);
          (_strcpy(($67|0),(1544|0))|0);
          $68 = $idxfile;
          $69 = (_fread(($ih|0),8,1,($68|0))|0);
          $70 = ($69|0)!=(1);
          if (!($70)) {
           $71 = HEAP32[$ih>>2]|0;
           $72 = (_fnv_hash71(52,8,0)|0);
           $73 = ($71|0)!=($72|0);
           if (!($73)) {
            $74 = (($ih) + 4|0);
            $75 = HEAP32[$74>>2]|0;
            $76 = (_fnv_hash71(52,8,1)|0);
            $77 = ($75|0)!=($76|0);
            if (!($77)) {
             $78 = $ir;
             $79 = $idxfile;
             $80 = (_fread(($78|0),24,1,($79|0))|0);
             $81 = ($80|0)!=(1);
             if (!($81)) {
              $87 = HEAP32[1656>>2]|0;
              $88 = ($87|0)==(0|0);
              if ($88) {
               $89 = $1;
               _needle_fn_wrapper($89,1664);
               $90 = $1;
               HEAP32[1656>>2] = $90;
              }
              $91 = $3;
              $92 = ($91|0)>=(0);
              if ($92) {
               $93 = $2;
               $94 = $3;
               $95 = (($93) + ($94)|0);
               $96 = (_strlen(($95|0))|0);
               $97 = $2;
               $98 = $3;
               $99 = (($97) + ($98)|0);
               $100 = (_new_string($96,$99)|0);
               $hfn = $100;
              } else {
               $101 = $2;
               $102 = (_strlen(($101|0))|0);
               $103 = $2;
               $104 = (_new_string($102,$103)|0);
               $hfn = $104;
              }
              $105 = (_new_string(1,1688)|0);
              $colon = $105;
              $106 = $2;
              $107 = (_fopen(($106|0),(1536|0))|0);
              $infile = $107;
              $108 = $infile;
              $109 = ($108|0)==(0|0);
              if ($109) {
               $110 = $idxfile;
               (_fclose(($110|0))|0);
               $111 = $ir;
               _free($111);
               $112 = HEAP32[_stderr>>2]|0;
               $113 = $2;
               HEAP32[$vararg_buffer7>>2] = $113;
               (_fprintf(($112|0),(1696|0),($vararg_buffer7|0))|0);
               $0 = -1;
               $338 = $0;
               STACKTOP = sp;return ($338|0);
              }
              $offset = 0;
              $ir_avail = 0;
              L34: while(1) {
               $114 = $idxfile;
               $115 = (_feof(($114|0))|0);
               $116 = ($115|0)!=(0);
               if ($116) {
                $121 = 1;
               } else {
                $117 = $idxfile;
                $118 = (_ferror(($117|0))|0);
                $119 = ($118|0)!=(0);
                $121 = $119;
               }
               $120 = $121 ^ 1;
               if (!($120)) {
                label = 68;
                break;
               }
               $122 = $ir;
               $123 = $ir_avail;
               $124 = (($122) + (($123*24)|0)|0);
               $125 = (($124) + 24|0);
               $126 = $ir_avail;
               $127 = (2001 - ($126))|0;
               $128 = (($127) - 1)|0;
               $129 = $idxfile;
               $130 = (_fread(($125|0),24,($128|0),($129|0))|0);
               $131 = $ir_avail;
               $132 = (($131) + ($130))|0;
               $ir_avail = $132;
               $ir_done = 0;
               while(1) {
                $133 = $ir_done;
                $134 = $ir_avail;
                $135 = ($133|0)<($134|0);
                if (!($135)) {
                 break;
                }
                $136 = $ir_done;
                $137 = $ir;
                $138 = (($137) + (($136*24)|0)|0);
                $139 = $138;
                $140 = $139;
                $141 = HEAP32[$140>>2]|0;
                $142 = (($139) + 4)|0;
                $143 = $142;
                $144 = HEAP32[$143>>2]|0;
                $145 = 1664;
                $146 = $145;
                $147 = HEAP32[$146>>2]|0;
                $148 = (($145) + 4)|0;
                $149 = $148;
                $150 = HEAP32[$149>>2]|0;
                $151 = $141 & $147;
                $152 = $144 & $150;
                $153 = $btest;
                $154 = $153;
                HEAP32[$154>>2] = $151;
                $155 = (($153) + 4)|0;
                $156 = $155;
                HEAP32[$156>>2] = $152;
                $157 = $ir_done;
                $158 = $ir;
                $159 = (($158) + (($157*24)|0)|0);
                $160 = (($159) + 8|0);
                $161 = $160;
                $162 = $161;
                $163 = HEAP32[$162>>2]|0;
                $164 = (($161) + 4)|0;
                $165 = $164;
                $166 = HEAP32[$165>>2]|0;
                $167 = ((1664 + 8|0));
                $168 = $167;
                $169 = HEAP32[$168>>2]|0;
                $170 = (($167) + 4)|0;
                $171 = $170;
                $172 = HEAP32[$171>>2]|0;
                $173 = $163 & $169;
                $174 = $166 & $172;
                $175 = (($btest) + 8|0);
                $176 = $175;
                $177 = $176;
                HEAP32[$177>>2] = $173;
                $178 = (($176) + 4)|0;
                $179 = $178;
                HEAP32[$179>>2] = $174;
                $180 = 1728;
                $181 = $180;
                $182 = HEAP32[$181>>2]|0;
                $183 = (($180) + 4)|0;
                $184 = $183;
                $185 = HEAP32[$184>>2]|0;
                $186 = (_i64Add(($182|0),($185|0),1,0)|0);
                $187 = tempRet0;
                $188 = 1728;
                $189 = $188;
                HEAP32[$189>>2] = $186;
                $190 = (($188) + 4)|0;
                $191 = $190;
                HEAP32[$191>>2] = $187;
                $192 = HEAP32[1736>>2]|0;
                $193 = ($192|0)!=(0);
                if ($193) {
                 label = 46;
                } else {
                 $194 = (_uint64_2_pop72($btest)|0);
                 $195 = HEAP32[((1664 + 16|0))>>2]|0;
                 $196 = ($194|0)>($195|0);
                 if ($196) {
                  label = 46;
                 }
                }
                if ((label|0) == 46) {
                 label = 0;
                 $197 = 1744;
                 $198 = $197;
                 $199 = HEAP32[$198>>2]|0;
                 $200 = (($197) + 4)|0;
                 $201 = $200;
                 $202 = HEAP32[$201>>2]|0;
                 $203 = (_i64Add(($199|0),($202|0),1,0)|0);
                 $204 = tempRet0;
                 $205 = 1744;
                 $206 = $205;
                 HEAP32[$206>>2] = $203;
                 $207 = (($205) + 4)|0;
                 $208 = $207;
                 HEAP32[$208>>2] = $204;
                 $209 = $offset;
                 $210 = $ir_done;
                 $211 = $ir;
                 $212 = (($211) + (($210*24)|0)|0);
                 $213 = (($212) + 16|0);
                 $214 = HEAP32[$213>>2]|0;
                 $215 = ($209|0)!=($214|0);
                 if ($215) {
                  $216 = $infile;
                  $217 = $ir_done;
                  $218 = $ir;
                  $219 = (($218) + (($217*24)|0)|0);
                  $220 = (($219) + 16|0);
                  $221 = HEAP32[$220>>2]|0;
                  $222 = (_fseeko(($216|0),($221|0),0)|0);
                  $223 = ($222|0)!=(0);
                  if ($223) {
                   label = 48;
                   break L34;
                  }
                 }
                 $229 = $ir_done;
                 $230 = $ir;
                 $231 = (($230) + (($229*24)|0)|0);
                 $232 = (($231) + 16|0);
                 $233 = HEAP32[$232>>2]|0;
                 $offset = $233;
                 $234 = $ir_done;
                 $235 = (($234) + 1)|0;
                 $236 = $ir;
                 $237 = (($236) + (($235*24)|0)|0);
                 $238 = (($237) + 16|0);
                 $239 = HEAP32[$238>>2]|0;
                 $240 = $offset;
                 $241 = (($239) - ($240))|0;
                 $entry_size = $241;
                 $242 = $entry_size;
                 $243 = $dict_buff_size;
                 $244 = ($242>>>0)>($243>>>0);
                 if ($244) {
                  $245 = $dict_buff_size;
                  $246 = ($245>>>0)>(0);
                  if ($246) {
                   $247 = $dict_buff;
                   _free($247);
                  }
                  $248 = $entry_size;
                  $249 = $248<<1;
                  $250 = (_malloc($249)|0);
                  $dict_buff = $250;
                  $251 = $entry_size;
                  $252 = $251<<1;
                  $dict_buff_size = $252;
                 }
                 $253 = $dict_buff;
                 $254 = $entry_size;
                 $255 = $infile;
                 $256 = (_fread(($253|0),1,($254|0),($255|0))|0);
                 $257 = $entry_size;
                 $258 = ($256|0)!=($257|0);
                 if ($258) {
                  label = 54;
                  break L34;
                 }
                 $264 = $ir_done;
                 $265 = (($264) + 1)|0;
                 $266 = $ir;
                 $267 = (($266) + (($265*24)|0)|0);
                 $268 = (($267) + 16|0);
                 $269 = HEAP32[$268>>2]|0;
                 $offset = $269;
                 $270 = $entry_size;
                 $271 = $dict_buff;
                 $272 = (_parse($270,$271)|0);
                 $parsed = $272;
                 $273 = HEAP32[2032>>2]|0;
                 $274 = ($273|0)!=(-3);
                 if ($274) {
                  label = 56;
                  break L34;
                 }
                 $281 = HEAP32[1984>>2]|0;
                 $282 = HEAP32[$281>>2]|0;
                 $to_match = $282;
                 HEAP32[2000>>2] = 0;
                 $283 = 1352;
                 $284 = $283;
                 $285 = HEAP32[$284>>2]|0;
                 $286 = (($283) + 4)|0;
                 $287 = $286;
                 $288 = HEAP32[$287>>2]|0;
                 $289 = (_i64Add(($285|0),($288|0),1,0)|0);
                 $290 = tempRet0;
                 $291 = 1352;
                 $292 = $291;
                 HEAP32[$292>>2] = $289;
                 $293 = (($291) + 4)|0;
                 $294 = $293;
                 HEAP32[$294>>2] = $290;
                 $295 = $1;
                 $296 = $to_match;
                 $297 = (_tree_match($295,$296)|0);
                 $298 = ($297|0)!=(0);
                 if ($298) {
                  $299 = 1360;
                  $300 = $299;
                  $301 = HEAP32[$300>>2]|0;
                  $302 = (($299) + 4)|0;
                  $303 = $302;
                  $304 = HEAP32[$303>>2]|0;
                  $305 = (_i64Add(($301|0),($304|0),1,0)|0);
                  $306 = tempRet0;
                  $307 = 1360;
                  $308 = $307;
                  HEAP32[$308>>2] = $305;
                  $309 = (($307) + 4)|0;
                  $310 = $309;
                  HEAP32[$310>>2] = $306;
                  $311 = $3;
                  $312 = ($311|0)>=(0);
                  if ($312) {
                   $313 = $hfn;
                   $314 = $colon;
                   $315 = HEAP32[_stdout>>2]|0;
                   _write_bracketed_string($313,$314,$315);
                  }
                  $316 = HEAP32[416>>2]|0;
                  $317 = ($316|0)!=(0);
                  if ($317) {
                   $318 = $to_match;
                   $319 = HEAP32[_stdout>>2]|0;
                   _write_cooked_tree($318,$319);
                  } else {
                   $320 = $dict_buff;
                   $321 = $entry_size;
                   $322 = HEAP32[_stdout>>2]|0;
                   (_fwrite(($320|0),1,($321|0),($322|0))|0);
                  }
                  $323 = $to_match;
                  _free_node($323);
                 }
                }
                $324 = $ir_done;
                $325 = (($324) + 1)|0;
                $ir_done = $325;
               }
               $326 = $ir;
               $327 = $ir_avail;
               $328 = $ir;
               $329 = (($328) + (($327*24)|0)|0);
               ;HEAP32[$326+0>>2]=HEAP32[$329+0>>2]|0;HEAP32[$326+4>>2]=HEAP32[$329+4>>2]|0;HEAP32[$326+8>>2]=HEAP32[$329+8>>2]|0;HEAP32[$326+12>>2]=HEAP32[$329+12>>2]|0;HEAP32[$326+16>>2]=HEAP32[$329+16>>2]|0;HEAP32[$326+20>>2]=HEAP32[$329+20>>2]|0;
               $ir_avail = 0;
              }
              if ((label|0) == 48) {
               $224 = $infile;
               (_fclose(($224|0))|0);
               $225 = $idxfile;
               (_fclose(($225|0))|0);
               $226 = $ir;
               _free($226);
               $227 = HEAP32[_stderr>>2]|0;
               $228 = $2;
               HEAP32[$vararg_buffer9>>2] = $228;
               (_fprintf(($227|0),(1752|0),($vararg_buffer9|0))|0);
               $0 = 1;
               $338 = $0;
               STACKTOP = sp;return ($338|0);
              }
              else if ((label|0) == 54) {
               $259 = $infile;
               (_fclose(($259|0))|0);
               $260 = $idxfile;
               (_fclose(($260|0))|0);
               $261 = $ir;
               _free($261);
               $262 = HEAP32[_stderr>>2]|0;
               $263 = $2;
               HEAP32[$vararg_buffer12>>2] = $263;
               (_fprintf(($262|0),(1776|0),($vararg_buffer12|0))|0);
               $0 = 1;
               $338 = $0;
               STACKTOP = sp;return ($338|0);
              }
              else if ((label|0) == 56) {
               (_puts((1808|0))|0);
               $275 = $dict_buff;
               $276 = $parsed;
               $277 = HEAP32[_stdout>>2]|0;
               (_fwrite(($275|0),1,($276|0),($277|0))|0);
               (_putchar(10)|0);
               $278 = $infile;
               (_fclose(($278|0))|0);
               $279 = $idxfile;
               (_fclose(($279|0))|0);
               $280 = $ir;
               _free($280);
               $0 = 1;
               $338 = $0;
               STACKTOP = sp;return ($338|0);
              }
              else if ((label|0) == 68) {
               $330 = $infile;
               (_fclose(($330|0))|0);
               $331 = $idxfile;
               (_fclose(($331|0))|0);
               $332 = $dict_buff_size;
               $333 = ($332>>>0)>(0);
               if ($333) {
                $334 = $dict_buff;
                _free($334);
               }
               $335 = $ir;
               _free($335);
               $336 = $hfn;
               _delete_string($336);
               $337 = $colon;
               _delete_string($337);
               HEAP32[1656>>2] = 0;
               $0 = 0;
               $338 = $0;
               STACKTOP = sp;return ($338|0);
              }
             }
            }
           }
          }
          $82 = $idxfile;
          (_fclose(($82|0))|0);
          $83 = $ir;
          _free($83);
          $84 = HEAP32[64>>2]|0;
          $85 = ($84|0)!=(0);
          if ($85) {
           (_puts((1608|0))|0);
           $0 = 1;
           $338 = $0;
           STACKTOP = sp;return ($338|0);
          } else {
           $86 = HEAP32[_stderr>>2]|0;
           (_fprintf(($86|0),(1448|0),($vararg_buffer5|0))|0);
           $0 = 0;
           $338 = $0;
           STACKTOP = sp;return ($338|0);
          }
         }
        }
       }
       $56 = $2;
       $57 = $i;
       $58 = (($56) + ($57)|0);
       $59 = (($58) + -4|0);
       (_strcpy(($59|0),(1544|0))|0);
       $60 = $ir;
       _free($60);
       $61 = HEAP32[64>>2]|0;
       $62 = ($61|0)!=(0);
       if ($62) {
        (_puts((1552|0))|0);
        $0 = 1;
        $338 = $0;
        STACKTOP = sp;return ($338|0);
       } else {
        $63 = HEAP32[_stderr>>2]|0;
        (_fprintf(($63|0),(1448|0),($vararg_buffer3|0))|0);
        $0 = 0;
        $338 = $0;
        STACKTOP = sp;return ($338|0);
       }
      }
     }
    }
    $36 = $ir;
    _free($36);
    $37 = HEAP32[64>>2]|0;
    $38 = ($37|0)!=(0);
    if ($38) {
     (_puts((1480|0))|0);
     $0 = 1;
     $338 = $0;
     STACKTOP = sp;return ($338|0);
    } else {
     $39 = HEAP32[_stderr>>2]|0;
     (_fprintf(($39|0),(1448|0),($vararg_buffer1|0))|0);
     $0 = 0;
     $338 = $0;
     STACKTOP = sp;return ($338|0);
    }
   }
  }
 }
 $11 = HEAP32[64>>2]|0;
 $12 = ($11|0)!=(0);
 if ($12) {
  $13 = HEAP32[1376>>2]|0;
  $14 = ($13|0)!=(0);
  if (!($14)) {
   (_puts((1392|0))|0);
   $0 = 1;
   $338 = $0;
   STACKTOP = sp;return ($338|0);
  }
 }
 $15 = HEAP32[_stderr>>2]|0;
 (_fprintf(($15|0),(1448|0),($vararg_buffer|0))|0);
 $0 = 0;
 $338 = $0;
 STACKTOP = sp;return ($338|0);
}
function _fnv_hash71($m,$a,$bump) {
 $m = $m|0;
 $a = $a|0;
 $bump = $bump|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, $hval = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $m;
 $1 = $a;
 $2 = $bump;
 $3 = $2;
 $4 = ($3|0)!=(0);
 $5 = $4 ? 84696351 : -2128831035;
 $hval = $5;
 $i = 0;
 while(1) {
  $6 = $i;
  $7 = $0;
  $8 = ($6|0)<($7|0);
  if (!($8)) {
   break;
  }
  $9 = $i;
  $10 = $1;
  $11 = (($10) + ($9)|0);
  $12 = HEAP8[$11>>0]|0;
  $13 = $12 << 24 >> 24;
  $14 = $hval;
  $15 = $14 ^ $13;
  $hval = $15;
  $16 = $hval;
  $17 = Math_imul($16, 16777619)|0;
  $hval = $17;
  $18 = $i;
  $19 = (($18) + 1)|0;
  $i = $19;
 }
 $20 = $hval;
 STACKTOP = sp;return ($20|0);
}
function _uint64_2_pop72($b) {
 $b = $b|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0;
 var $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0;
 var $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0;
 var $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0;
 var $99 = 0, $x = 0, $y = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $x = sp + 8|0;
 $y = sp;
 $0 = $b;
 $1 = $0;
 $2 = $1;
 $3 = $2;
 $4 = HEAP32[$3>>2]|0;
 $5 = (($2) + 4)|0;
 $6 = $5;
 $7 = HEAP32[$6>>2]|0;
 $8 = $0;
 $9 = $8;
 $10 = $9;
 $11 = HEAP32[$10>>2]|0;
 $12 = (($9) + 4)|0;
 $13 = $12;
 $14 = HEAP32[$13>>2]|0;
 $15 = (_bitshift64Lshr(($11|0),($14|0),1)|0);
 $16 = tempRet0;
 $17 = $15 & 1431655765;
 $18 = $16 & 1431655765;
 $19 = (_i64Subtract(($4|0),($7|0),($17|0),($18|0))|0);
 $20 = tempRet0;
 $21 = $x;
 $22 = $21;
 HEAP32[$22>>2] = $19;
 $23 = (($21) + 4)|0;
 $24 = $23;
 HEAP32[$24>>2] = $20;
 $25 = $x;
 $26 = $25;
 $27 = HEAP32[$26>>2]|0;
 $28 = (($25) + 4)|0;
 $29 = $28;
 $30 = HEAP32[$29>>2]|0;
 $31 = $27 & 858993459;
 $32 = $30 & 858993459;
 $33 = $x;
 $34 = $33;
 $35 = HEAP32[$34>>2]|0;
 $36 = (($33) + 4)|0;
 $37 = $36;
 $38 = HEAP32[$37>>2]|0;
 $39 = (_bitshift64Lshr(($35|0),($38|0),2)|0);
 $40 = tempRet0;
 $41 = $39 & 858993459;
 $42 = $40 & 858993459;
 $43 = (_i64Add(($31|0),($32|0),($41|0),($42|0))|0);
 $44 = tempRet0;
 $45 = $x;
 $46 = $45;
 HEAP32[$46>>2] = $43;
 $47 = (($45) + 4)|0;
 $48 = $47;
 HEAP32[$48>>2] = $44;
 $49 = $x;
 $50 = $49;
 $51 = HEAP32[$50>>2]|0;
 $52 = (($49) + 4)|0;
 $53 = $52;
 $54 = HEAP32[$53>>2]|0;
 $55 = (_bitshift64Lshr(($51|0),($54|0),4)|0);
 $56 = tempRet0;
 $57 = $x;
 $58 = $57;
 $59 = HEAP32[$58>>2]|0;
 $60 = (($57) + 4)|0;
 $61 = $60;
 $62 = HEAP32[$61>>2]|0;
 $63 = (_i64Add(($59|0),($62|0),($55|0),($56|0))|0);
 $64 = tempRet0;
 $65 = $x;
 $66 = $65;
 HEAP32[$66>>2] = $63;
 $67 = (($65) + 4)|0;
 $68 = $67;
 HEAP32[$68>>2] = $64;
 $69 = $x;
 $70 = $69;
 $71 = HEAP32[$70>>2]|0;
 $72 = (($69) + 4)|0;
 $73 = $72;
 $74 = HEAP32[$73>>2]|0;
 $75 = $71 & 252645135;
 $76 = $74 & 252645135;
 $77 = $x;
 $78 = $77;
 HEAP32[$78>>2] = $75;
 $79 = (($77) + 4)|0;
 $80 = $79;
 HEAP32[$80>>2] = $76;
 $81 = $0;
 $82 = (($81) + 8|0);
 $83 = $82;
 $84 = $83;
 $85 = HEAP32[$84>>2]|0;
 $86 = (($83) + 4)|0;
 $87 = $86;
 $88 = HEAP32[$87>>2]|0;
 $89 = $0;
 $90 = (($89) + 8|0);
 $91 = $90;
 $92 = $91;
 $93 = HEAP32[$92>>2]|0;
 $94 = (($91) + 4)|0;
 $95 = $94;
 $96 = HEAP32[$95>>2]|0;
 $97 = (_bitshift64Lshr(($93|0),($96|0),1)|0);
 $98 = tempRet0;
 $99 = $97 & 1431655765;
 $100 = $98 & 1431655765;
 $101 = (_i64Subtract(($85|0),($88|0),($99|0),($100|0))|0);
 $102 = tempRet0;
 $103 = $y;
 $104 = $103;
 HEAP32[$104>>2] = $101;
 $105 = (($103) + 4)|0;
 $106 = $105;
 HEAP32[$106>>2] = $102;
 $107 = $y;
 $108 = $107;
 $109 = HEAP32[$108>>2]|0;
 $110 = (($107) + 4)|0;
 $111 = $110;
 $112 = HEAP32[$111>>2]|0;
 $113 = $109 & 858993459;
 $114 = $112 & 858993459;
 $115 = $y;
 $116 = $115;
 $117 = HEAP32[$116>>2]|0;
 $118 = (($115) + 4)|0;
 $119 = $118;
 $120 = HEAP32[$119>>2]|0;
 $121 = (_bitshift64Lshr(($117|0),($120|0),2)|0);
 $122 = tempRet0;
 $123 = $121 & 858993459;
 $124 = $122 & 858993459;
 $125 = (_i64Add(($113|0),($114|0),($123|0),($124|0))|0);
 $126 = tempRet0;
 $127 = $y;
 $128 = $127;
 HEAP32[$128>>2] = $125;
 $129 = (($127) + 4)|0;
 $130 = $129;
 HEAP32[$130>>2] = $126;
 $131 = $y;
 $132 = $131;
 $133 = HEAP32[$132>>2]|0;
 $134 = (($131) + 4)|0;
 $135 = $134;
 $136 = HEAP32[$135>>2]|0;
 $137 = (_bitshift64Lshr(($133|0),($136|0),4)|0);
 $138 = tempRet0;
 $139 = $y;
 $140 = $139;
 $141 = HEAP32[$140>>2]|0;
 $142 = (($139) + 4)|0;
 $143 = $142;
 $144 = HEAP32[$143>>2]|0;
 $145 = (_i64Add(($141|0),($144|0),($137|0),($138|0))|0);
 $146 = tempRet0;
 $147 = $y;
 $148 = $147;
 HEAP32[$148>>2] = $145;
 $149 = (($147) + 4)|0;
 $150 = $149;
 HEAP32[$150>>2] = $146;
 $151 = $y;
 $152 = $151;
 $153 = HEAP32[$152>>2]|0;
 $154 = (($151) + 4)|0;
 $155 = $154;
 $156 = HEAP32[$155>>2]|0;
 $157 = $153 & 252645135;
 $158 = $156 & 252645135;
 $159 = $y;
 $160 = $159;
 HEAP32[$160>>2] = $157;
 $161 = (($159) + 4)|0;
 $162 = $161;
 HEAP32[$162>>2] = $158;
 $163 = $x;
 $164 = $163;
 $165 = HEAP32[$164>>2]|0;
 $166 = (($163) + 4)|0;
 $167 = $166;
 $168 = HEAP32[$167>>2]|0;
 $169 = $y;
 $170 = $169;
 $171 = HEAP32[$170>>2]|0;
 $172 = (($169) + 4)|0;
 $173 = $172;
 $174 = HEAP32[$173>>2]|0;
 $175 = (_i64Add(($165|0),($168|0),($171|0),($174|0))|0);
 $176 = tempRet0;
 $177 = (___muldi3(($175|0),($176|0),16843009,16843009)|0);
 $178 = tempRet0;
 $179 = (_bitshift64Lshr(($177|0),($178|0),56)|0);
 $180 = tempRet0;
 STACKTOP = sp;return ($179|0);
}
function _core_test($name,$use_printf) {
 $name = $name|0;
 $use_printf = $use_printf|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $out = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 1056|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer1 = sp + 8|0;
 $vararg_buffer = sp;
 $out = sp + 24|0;
 $1 = $name;
 $2 = $use_printf;
 _memset(($out|0),0,1024)|0;
 $3 = $2;
 $4 = ($3|0)!=(0);
 if ($4) {
  $5 = $1;
  HEAP32[$vararg_buffer>>2] = $5;
  (_printf((1840|0),($vararg_buffer|0))|0);
  $0 = 0;
  $12 = $0;
  STACKTOP = sp;return ($12|0);
 } else {
  _memmove(($out|0),(1848|0),3)|0;
  $6 = (($out) + 3|0);
  $7 = $1;
  $8 = $1;
  $9 = (_strlen(($8|0))|0);
  _memmove(($6|0),($7|0),($9|0))|0;
  HEAP32[$vararg_buffer1>>2] = $out;
  (_printf((1856|0),($vararg_buffer1|0))|0);
  $10 = HEAP32[_stdout>>2]|0;
  (_fflush(($10|0))|0);
  $11 = (_strlen(($out|0))|0);
  $0 = $11;
  $12 = $0;
  STACKTOP = sp;return ($12|0);
 }
 return 0|0;
}
function _core_cook($c) {
 $c = $c|0;
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $c;
 $1 = $0;
 HEAP32[416>>2] = $1;
 STACKTOP = sp;return;
}
function _core_process($pattern,$dict_path) {
 $pattern = $pattern|0;
 $dict_path = $dict_path|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $match_pattern = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $pattern;
 $2 = $dict_path;
 _register_syntax();
 $3 = $1;
 $4 = (_strlen(($3|0))|0);
 $5 = $1;
 $6 = (_parse($4,$5)|0);
 $7 = $1;
 $8 = (_strlen(($7|0))|0);
 $9 = ($6>>>0)<($8>>>0);
 if (!($9)) {
  $10 = HEAP32[2032>>2]|0;
  $11 = ($10|0)!=(-3);
  if (!($11)) {
   $12 = HEAP32[1984>>2]|0;
   $13 = HEAP32[$12>>2]|0;
   $match_pattern = $13;
   HEAP32[2000>>2] = 0;
   $14 = $match_pattern;
   $15 = $2;
   (_process_file_indexed($14,$15,-1)|0);
   HEAP32[1656>>2] = 0;
   $0 = 0;
   $16 = $0;
   STACKTOP = sp;return ($16|0);
  }
 }
 HEAP32[2000>>2] = 0;
 (_puts((1864|0))|0);
 $0 = -1;
 $16 = $0;
 STACKTOP = sp;return ($16|0);
}
function _core_init() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 _check_memoization();
 STACKTOP = sp;return 0;
}
function _default_match_fn($ms) {
 $ms = $ms|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0;
 var $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0;
 var $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0;
 var $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0;
 var $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0;
 var $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $i = 0, $rval = 0, $tmpn = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $ms;
 $2 = $1;
 $3 = (($2) + 8|0);
 $4 = (($3) + 4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = (($5) + 28|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = $1;
 $9 = (($8) + 8|0);
 $10 = (($9) + 8|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = (($11) + 28|0);
 $13 = HEAP32[$12>>2]|0;
 $14 = ($7|0)!=($13|0);
 if (!($14)) {
  $15 = $1;
  $16 = (($15) + 8|0);
  $17 = (($16) + 4|0);
  $18 = HEAP32[$17>>2]|0;
  $19 = (($18) + 4|0);
  $20 = HEAP32[$19>>2]|0;
  $21 = $1;
  $22 = (($21) + 8|0);
  $23 = (($22) + 8|0);
  $24 = HEAP32[$23>>2]|0;
  $25 = (($24) + 4|0);
  $26 = HEAP32[$25>>2]|0;
  $27 = ($20|0)!=($26|0);
  if (!($27)) {
   $31 = $1;
   $32 = (($31) + 8|0);
   $33 = (($32) + 4|0);
   $34 = HEAP32[$33>>2]|0;
   $35 = (($34) + 28|0);
   $36 = HEAP32[$35>>2]|0;
   $37 = ($36|0)==(0);
   if ($37) {
    $38 = $1;
    $39 = (($38) + 36|0);
    HEAP32[$39>>2] = 2;
    $40 = $1;
    $0 = $40;
    $105 = $0;
    STACKTOP = sp;return ($105|0);
   }
   $41 = $1;
   $rval = $41;
   $42 = $1;
   $43 = (($42) + 36|0);
   HEAP32[$43>>2] = 3;
   $i = 0;
   while(1) {
    $44 = $i;
    $45 = $1;
    $46 = (($45) + 8|0);
    $47 = (($46) + 4|0);
    $48 = HEAP32[$47>>2]|0;
    $49 = (($48) + 28|0);
    $50 = HEAP32[$49>>2]|0;
    $51 = ($44|0)<($50|0);
    if (!($51)) {
     break;
    }
    $52 = (_new_node()|0);
    $tmpn = $52;
    $53 = $rval;
    $54 = $tmpn;
    $55 = (($54) + 8|0);
    HEAP32[$55>>2] = $53;
    $56 = $tmpn;
    $57 = (($56) + 8|0);
    $58 = HEAP32[$57>>2]|0;
    $59 = (($58) + 24|0);
    $60 = HEAP32[$59>>2]|0;
    $61 = (($60) + 1)|0;
    HEAP32[$59>>2] = $61;
    $62 = $tmpn;
    $rval = $62;
    $63 = $i;
    $64 = $1;
    $65 = (($64) + 8|0);
    $66 = (($65) + 4|0);
    $67 = HEAP32[$66>>2]|0;
    $68 = (($67) + 8|0);
    $69 = (($68) + ($63<<2)|0);
    $70 = HEAP32[$69>>2]|0;
    $71 = $rval;
    $72 = (($71) + 8|0);
    $73 = (($72) + 4|0);
    HEAP32[$73>>2] = $70;
    $74 = $rval;
    $75 = (($74) + 8|0);
    $76 = (($75) + 4|0);
    $77 = HEAP32[$76>>2]|0;
    $78 = (($77) + 24|0);
    $79 = HEAP32[$78>>2]|0;
    $80 = (($79) + 1)|0;
    HEAP32[$78>>2] = $80;
    $81 = $i;
    $82 = $1;
    $83 = (($82) + 8|0);
    $84 = (($83) + 8|0);
    $85 = HEAP32[$84>>2]|0;
    $86 = (($85) + 8|0);
    $87 = (($86) + ($81<<2)|0);
    $88 = HEAP32[$87>>2]|0;
    $89 = $rval;
    $90 = (($89) + 8|0);
    $91 = (($90) + 8|0);
    HEAP32[$91>>2] = $88;
    $92 = $rval;
    $93 = (($92) + 8|0);
    $94 = (($93) + 8|0);
    $95 = HEAP32[$94>>2]|0;
    $96 = (($95) + 24|0);
    $97 = HEAP32[$96>>2]|0;
    $98 = (($97) + 1)|0;
    HEAP32[$96>>2] = $98;
    $99 = $1;
    $100 = $rval;
    $101 = (($100) + 20|0);
    HEAP32[$101>>2] = $99;
    $102 = $i;
    $103 = (($102) + 1)|0;
    $i = $103;
   }
   $104 = $rval;
   $0 = $104;
   $105 = $0;
   STACKTOP = sp;return ($105|0);
  }
 }
 $28 = $1;
 $29 = (($28) + 36|0);
 HEAP32[$29>>2] = 1;
 $30 = $1;
 $0 = $30;
 $105 = $0;
 STACKTOP = sp;return ($105|0);
}
function _anything_match_fn($ms) {
 $ms = $ms|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $ms;
 $1 = $0;
 $2 = (($1) + 36|0);
 HEAP32[$2>>2] = 2;
 $3 = $0;
 STACKTOP = sp;return ($3|0);
}
function _anywhere_match_fn($ms) {
 $ms = $ms|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0;
 var $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0;
 var $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0;
 var $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0;
 var $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0;
 var $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $i = 0, $rval = 0, $tmpn = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $ms;
 $1 = $0;
 $rval = $1;
 $2 = $0;
 $3 = (($2) + 36|0);
 HEAP32[$3>>2] = 4;
 $4 = (_new_node()|0);
 $tmpn = $4;
 $5 = $rval;
 $6 = $tmpn;
 $7 = (($6) + 8|0);
 HEAP32[$7>>2] = $5;
 $8 = $tmpn;
 $9 = (($8) + 8|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = (($10) + 24|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = (($12) + 1)|0;
 HEAP32[$11>>2] = $13;
 $14 = $tmpn;
 $rval = $14;
 $15 = $0;
 $16 = (($15) + 8|0);
 $17 = (($16) + 4|0);
 $18 = HEAP32[$17>>2]|0;
 $19 = (($18) + 8|0);
 $20 = HEAP32[$19>>2]|0;
 $21 = $rval;
 $22 = (($21) + 8|0);
 $23 = (($22) + 4|0);
 HEAP32[$23>>2] = $20;
 $24 = $rval;
 $25 = (($24) + 8|0);
 $26 = (($25) + 4|0);
 $27 = HEAP32[$26>>2]|0;
 $28 = (($27) + 24|0);
 $29 = HEAP32[$28>>2]|0;
 $30 = (($29) + 1)|0;
 HEAP32[$28>>2] = $30;
 $31 = $0;
 $32 = (($31) + 8|0);
 $33 = (($32) + 8|0);
 $34 = HEAP32[$33>>2]|0;
 $35 = $rval;
 $36 = (($35) + 8|0);
 $37 = (($36) + 8|0);
 HEAP32[$37>>2] = $34;
 $38 = $rval;
 $39 = (($38) + 8|0);
 $40 = (($39) + 8|0);
 $41 = HEAP32[$40>>2]|0;
 $42 = (($41) + 24|0);
 $43 = HEAP32[$42>>2]|0;
 $44 = (($43) + 1)|0;
 HEAP32[$42>>2] = $44;
 $45 = $0;
 $46 = $rval;
 $47 = (($46) + 20|0);
 HEAP32[$47>>2] = $45;
 $i = 0;
 while(1) {
  $48 = $i;
  $49 = $0;
  $50 = (($49) + 8|0);
  $51 = (($50) + 8|0);
  $52 = HEAP32[$51>>2]|0;
  $53 = (($52) + 28|0);
  $54 = HEAP32[$53>>2]|0;
  $55 = ($48|0)<($54|0);
  if (!($55)) {
   break;
  }
  $56 = (_new_node()|0);
  $tmpn = $56;
  $57 = $rval;
  $58 = $tmpn;
  $59 = (($58) + 8|0);
  HEAP32[$59>>2] = $57;
  $60 = $tmpn;
  $61 = (($60) + 8|0);
  $62 = HEAP32[$61>>2]|0;
  $63 = (($62) + 24|0);
  $64 = HEAP32[$63>>2]|0;
  $65 = (($64) + 1)|0;
  HEAP32[$63>>2] = $65;
  $66 = $tmpn;
  $rval = $66;
  $67 = (_new_node()|0);
  $68 = $tmpn;
  $69 = (($68) + 8|0);
  $70 = (($69) + 4|0);
  HEAP32[$70>>2] = $67;
  $71 = $tmpn;
  $72 = (($71) + 8|0);
  $73 = (($72) + 4|0);
  $74 = HEAP32[$73>>2]|0;
  $75 = (($74) + 28|0);
  HEAP32[$75>>2] = 1;
  $76 = (_new_string(1,1904)|0);
  $77 = $tmpn;
  $78 = (($77) + 8|0);
  $79 = (($78) + 4|0);
  $80 = HEAP32[$79>>2]|0;
  $81 = (($80) + 4|0);
  HEAP32[$81>>2] = $76;
  $82 = $0;
  $83 = (($82) + 8|0);
  $84 = (($83) + 4|0);
  $85 = HEAP32[$84>>2]|0;
  $86 = (($85) + 8|0);
  $87 = HEAP32[$86>>2]|0;
  $88 = $tmpn;
  $89 = (($88) + 8|0);
  $90 = (($89) + 4|0);
  $91 = HEAP32[$90>>2]|0;
  $92 = (($91) + 8|0);
  HEAP32[$92>>2] = $87;
  $93 = $tmpn;
  $94 = (($93) + 8|0);
  $95 = (($94) + 4|0);
  $96 = HEAP32[$95>>2]|0;
  $97 = (($96) + 8|0);
  $98 = HEAP32[$97>>2]|0;
  $99 = (($98) + 24|0);
  $100 = HEAP32[$99>>2]|0;
  $101 = (($100) + 1)|0;
  HEAP32[$99>>2] = $101;
  $102 = $i;
  $103 = $0;
  $104 = (($103) + 8|0);
  $105 = (($104) + 8|0);
  $106 = HEAP32[$105>>2]|0;
  $107 = (($106) + 8|0);
  $108 = (($107) + ($102<<2)|0);
  $109 = HEAP32[$108>>2]|0;
  $110 = $tmpn;
  $111 = (($110) + 8|0);
  $112 = (($111) + 8|0);
  HEAP32[$112>>2] = $109;
  $113 = $tmpn;
  $114 = (($113) + 8|0);
  $115 = (($114) + 8|0);
  $116 = HEAP32[$115>>2]|0;
  $117 = (($116) + 24|0);
  $118 = HEAP32[$117>>2]|0;
  $119 = (($118) + 1)|0;
  HEAP32[$117>>2] = $119;
  $120 = $0;
  $121 = $tmpn;
  $122 = (($121) + 20|0);
  HEAP32[$122>>2] = $120;
  $123 = $i;
  $124 = (($123) + 1)|0;
  $i = $124;
 }
 $125 = $rval;
 STACKTOP = sp;return ($125|0);
}
function _and_or_match_fn($ms) {
 $ms = $ms|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0;
 var $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0;
 var $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0;
 var $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0;
 var $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0;
 var $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $rval = 0, $tmpn = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $ms;
 $1 = $0;
 $rval = $1;
 $2 = $0;
 $3 = (($2) + 8|0);
 $4 = (($3) + 4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = (($5) + 4|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = (($7) + 12|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = HEAP8[$9>>0]|0;
 $11 = $10 << 24 >> 24;
 $12 = ($11|0)==(124);
 $13 = $12 ? 4 : 3;
 $14 = $0;
 $15 = (($14) + 36|0);
 HEAP32[$15>>2] = $13;
 $16 = (_new_node()|0);
 $tmpn = $16;
 $17 = $rval;
 $18 = $tmpn;
 $19 = (($18) + 8|0);
 HEAP32[$19>>2] = $17;
 $20 = $tmpn;
 $21 = (($20) + 8|0);
 $22 = HEAP32[$21>>2]|0;
 $23 = (($22) + 24|0);
 $24 = HEAP32[$23>>2]|0;
 $25 = (($24) + 1)|0;
 HEAP32[$23>>2] = $25;
 $26 = $tmpn;
 $rval = $26;
 $27 = $0;
 $28 = (($27) + 8|0);
 $29 = (($28) + 4|0);
 $30 = HEAP32[$29>>2]|0;
 $31 = (($30) + 8|0);
 $32 = HEAP32[$31>>2]|0;
 $33 = $rval;
 $34 = (($33) + 8|0);
 $35 = (($34) + 4|0);
 HEAP32[$35>>2] = $32;
 $36 = $rval;
 $37 = (($36) + 8|0);
 $38 = (($37) + 4|0);
 $39 = HEAP32[$38>>2]|0;
 $40 = (($39) + 24|0);
 $41 = HEAP32[$40>>2]|0;
 $42 = (($41) + 1)|0;
 HEAP32[$40>>2] = $42;
 $43 = $0;
 $44 = (($43) + 8|0);
 $45 = (($44) + 8|0);
 $46 = HEAP32[$45>>2]|0;
 $47 = $rval;
 $48 = (($47) + 8|0);
 $49 = (($48) + 8|0);
 HEAP32[$49>>2] = $46;
 $50 = $rval;
 $51 = (($50) + 8|0);
 $52 = (($51) + 8|0);
 $53 = HEAP32[$52>>2]|0;
 $54 = (($53) + 24|0);
 $55 = HEAP32[$54>>2]|0;
 $56 = (($55) + 1)|0;
 HEAP32[$54>>2] = $56;
 $57 = $0;
 $58 = $rval;
 $59 = (($58) + 20|0);
 HEAP32[$59>>2] = $57;
 $60 = (_new_node()|0);
 $tmpn = $60;
 $61 = $rval;
 $62 = $tmpn;
 $63 = (($62) + 8|0);
 HEAP32[$63>>2] = $61;
 $64 = $tmpn;
 $65 = (($64) + 8|0);
 $66 = HEAP32[$65>>2]|0;
 $67 = (($66) + 24|0);
 $68 = HEAP32[$67>>2]|0;
 $69 = (($68) + 1)|0;
 HEAP32[$67>>2] = $69;
 $70 = $tmpn;
 $rval = $70;
 $71 = $0;
 $72 = (($71) + 8|0);
 $73 = (($72) + 4|0);
 $74 = HEAP32[$73>>2]|0;
 $75 = (($74) + 8|0);
 $76 = (($75) + 4|0);
 $77 = HEAP32[$76>>2]|0;
 $78 = $rval;
 $79 = (($78) + 8|0);
 $80 = (($79) + 4|0);
 HEAP32[$80>>2] = $77;
 $81 = $rval;
 $82 = (($81) + 8|0);
 $83 = (($82) + 4|0);
 $84 = HEAP32[$83>>2]|0;
 $85 = (($84) + 24|0);
 $86 = HEAP32[$85>>2]|0;
 $87 = (($86) + 1)|0;
 HEAP32[$85>>2] = $87;
 $88 = $0;
 $89 = (($88) + 8|0);
 $90 = (($89) + 8|0);
 $91 = HEAP32[$90>>2]|0;
 $92 = $rval;
 $93 = (($92) + 8|0);
 $94 = (($93) + 8|0);
 HEAP32[$94>>2] = $91;
 $95 = $rval;
 $96 = (($95) + 8|0);
 $97 = (($96) + 8|0);
 $98 = HEAP32[$97>>2]|0;
 $99 = (($98) + 24|0);
 $100 = HEAP32[$99>>2]|0;
 $101 = (($100) + 1)|0;
 HEAP32[$99>>2] = $101;
 $102 = $0;
 $103 = $rval;
 $104 = (($103) + 20|0);
 HEAP32[$104>>2] = $102;
 $105 = $rval;
 STACKTOP = sp;return ($105|0);
}
function _not_match_fn($ms) {
 $ms = $ms|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $rval = 0, $tmpn = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $ms;
 $1 = $0;
 $rval = $1;
 $2 = $0;
 $3 = (($2) + 36|0);
 HEAP32[$3>>2] = 5;
 $4 = (_new_node()|0);
 $tmpn = $4;
 $5 = $rval;
 $6 = $tmpn;
 $7 = (($6) + 8|0);
 HEAP32[$7>>2] = $5;
 $8 = $tmpn;
 $9 = (($8) + 8|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = (($10) + 24|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = (($12) + 1)|0;
 HEAP32[$11>>2] = $13;
 $14 = $tmpn;
 $rval = $14;
 $15 = $0;
 $16 = (($15) + 8|0);
 $17 = (($16) + 4|0);
 $18 = HEAP32[$17>>2]|0;
 $19 = (($18) + 8|0);
 $20 = HEAP32[$19>>2]|0;
 $21 = $rval;
 $22 = (($21) + 8|0);
 $23 = (($22) + 4|0);
 HEAP32[$23>>2] = $20;
 $24 = $rval;
 $25 = (($24) + 8|0);
 $26 = (($25) + 4|0);
 $27 = HEAP32[$26>>2]|0;
 $28 = (($27) + 24|0);
 $29 = HEAP32[$28>>2]|0;
 $30 = (($29) + 1)|0;
 HEAP32[$28>>2] = $30;
 $31 = $0;
 $32 = (($31) + 8|0);
 $33 = (($32) + 8|0);
 $34 = HEAP32[$33>>2]|0;
 $35 = $rval;
 $36 = (($35) + 8|0);
 $37 = (($36) + 8|0);
 HEAP32[$37>>2] = $34;
 $38 = $rval;
 $39 = (($38) + 8|0);
 $40 = (($39) + 8|0);
 $41 = HEAP32[$40>>2]|0;
 $42 = (($41) + 24|0);
 $43 = HEAP32[$42>>2]|0;
 $44 = (($43) + 1)|0;
 HEAP32[$42>>2] = $44;
 $45 = $0;
 $46 = $rval;
 $47 = (($46) + 20|0);
 HEAP32[$47>>2] = $45;
 $48 = $rval;
 STACKTOP = sp;return ($48|0);
}
function _equal_match_fn($ms) {
 $ms = $ms|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0;
 var $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0;
 var $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0;
 var $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0;
 var $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0;
 var $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $i = 0, $rval = 0, $tmpn = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $ms;
 $2 = $1;
 $3 = (($2) + 8|0);
 $4 = (($3) + 4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = (($5) + 8|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = HEAP32[$7>>2]|0;
 $9 = ($8|0)!=(0|0);
 if ($9) {
  $10 = $1;
  $11 = (($10) + 8|0);
  $12 = (($11) + 8|0);
  $13 = HEAP32[$12>>2]|0;
  $14 = HEAP32[$13>>2]|0;
  $15 = ($14|0)!=(0|0);
  if ($15) {
   $16 = $1;
   $17 = (($16) + 8|0);
   $18 = (($17) + 4|0);
   $19 = HEAP32[$18>>2]|0;
   $20 = (($19) + 8|0);
   $21 = HEAP32[$20>>2]|0;
   $22 = HEAP32[$21>>2]|0;
   $23 = $1;
   $24 = (($23) + 8|0);
   $25 = (($24) + 8|0);
   $26 = HEAP32[$25>>2]|0;
   $27 = HEAP32[$26>>2]|0;
   $28 = ($22|0)==($27|0);
   $29 = $28 ? 2 : 1;
   $30 = $1;
   $31 = (($30) + 36|0);
   HEAP32[$31>>2] = $29;
   $32 = $1;
   $0 = $32;
   $146 = $0;
   STACKTOP = sp;return ($146|0);
  }
 }
 $33 = $1;
 $34 = (($33) + 8|0);
 $35 = (($34) + 4|0);
 $36 = HEAP32[$35>>2]|0;
 $37 = (($36) + 8|0);
 $38 = HEAP32[$37>>2]|0;
 $39 = (($38) + 28|0);
 $40 = HEAP32[$39>>2]|0;
 $41 = $1;
 $42 = (($41) + 8|0);
 $43 = (($42) + 8|0);
 $44 = HEAP32[$43>>2]|0;
 $45 = (($44) + 28|0);
 $46 = HEAP32[$45>>2]|0;
 $47 = ($40|0)!=($46|0);
 if (!($47)) {
  $48 = $1;
  $49 = (($48) + 8|0);
  $50 = (($49) + 4|0);
  $51 = HEAP32[$50>>2]|0;
  $52 = (($51) + 8|0);
  $53 = HEAP32[$52>>2]|0;
  $54 = (($53) + 4|0);
  $55 = HEAP32[$54>>2]|0;
  $56 = $1;
  $57 = (($56) + 8|0);
  $58 = (($57) + 8|0);
  $59 = HEAP32[$58>>2]|0;
  $60 = (($59) + 4|0);
  $61 = HEAP32[$60>>2]|0;
  $62 = ($55|0)!=($61|0);
  if (!($62)) {
   $66 = $1;
   $67 = (($66) + 8|0);
   $68 = (($67) + 4|0);
   $69 = HEAP32[$68>>2]|0;
   $70 = (($69) + 8|0);
   $71 = HEAP32[$70>>2]|0;
   $72 = (($71) + 28|0);
   $73 = HEAP32[$72>>2]|0;
   $74 = ($73|0)==(0);
   if ($74) {
    $75 = $1;
    $76 = (($75) + 36|0);
    HEAP32[$76>>2] = 2;
    $77 = $1;
    $0 = $77;
    $146 = $0;
    STACKTOP = sp;return ($146|0);
   }
   $78 = $1;
   $rval = $78;
   $79 = $1;
   $80 = (($79) + 36|0);
   HEAP32[$80>>2] = 3;
   $i = 0;
   while(1) {
    $81 = $i;
    $82 = $1;
    $83 = (($82) + 8|0);
    $84 = (($83) + 4|0);
    $85 = HEAP32[$84>>2]|0;
    $86 = (($85) + 8|0);
    $87 = HEAP32[$86>>2]|0;
    $88 = (($87) + 28|0);
    $89 = HEAP32[$88>>2]|0;
    $90 = ($81|0)<($89|0);
    if (!($90)) {
     break;
    }
    $91 = (_new_node()|0);
    $tmpn = $91;
    $92 = $rval;
    $93 = $tmpn;
    $94 = (($93) + 8|0);
    HEAP32[$94>>2] = $92;
    $95 = $tmpn;
    $96 = (($95) + 8|0);
    $97 = HEAP32[$96>>2]|0;
    $98 = (($97) + 24|0);
    $99 = HEAP32[$98>>2]|0;
    $100 = (($99) + 1)|0;
    HEAP32[$98>>2] = $100;
    $101 = $tmpn;
    $rval = $101;
    $102 = $i;
    $103 = $1;
    $104 = (($103) + 8|0);
    $105 = (($104) + 4|0);
    $106 = HEAP32[$105>>2]|0;
    $107 = (($106) + 8|0);
    $108 = HEAP32[$107>>2]|0;
    $109 = (($108) + 8|0);
    $110 = (($109) + ($102<<2)|0);
    $111 = HEAP32[$110>>2]|0;
    $112 = $rval;
    $113 = (($112) + 8|0);
    $114 = (($113) + 4|0);
    HEAP32[$114>>2] = $111;
    $115 = $rval;
    $116 = (($115) + 8|0);
    $117 = (($116) + 4|0);
    $118 = HEAP32[$117>>2]|0;
    $119 = (($118) + 24|0);
    $120 = HEAP32[$119>>2]|0;
    $121 = (($120) + 1)|0;
    HEAP32[$119>>2] = $121;
    $122 = $i;
    $123 = $1;
    $124 = (($123) + 8|0);
    $125 = (($124) + 8|0);
    $126 = HEAP32[$125>>2]|0;
    $127 = (($126) + 8|0);
    $128 = (($127) + ($122<<2)|0);
    $129 = HEAP32[$128>>2]|0;
    $130 = $rval;
    $131 = (($130) + 8|0);
    $132 = (($131) + 8|0);
    HEAP32[$132>>2] = $129;
    $133 = $rval;
    $134 = (($133) + 8|0);
    $135 = (($134) + 8|0);
    $136 = HEAP32[$135>>2]|0;
    $137 = (($136) + 24|0);
    $138 = HEAP32[$137>>2]|0;
    $139 = (($138) + 1)|0;
    HEAP32[$137>>2] = $139;
    $140 = $1;
    $141 = $rval;
    $142 = (($141) + 20|0);
    HEAP32[$142>>2] = $140;
    $143 = $i;
    $144 = (($143) + 1)|0;
    $i = $144;
   }
   $145 = $rval;
   $0 = $145;
   $146 = $0;
   STACKTOP = sp;return ($146|0);
  }
 }
 $63 = $1;
 $64 = (($63) + 36|0);
 HEAP32[$64>>2] = 1;
 $65 = $1;
 $0 = $65;
 $146 = $0;
 STACKTOP = sp;return ($146|0);
}
function _unord_match_fn($ms) {
 $ms = $ms|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0;
 var $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0;
 var $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0;
 var $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0;
 var $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0;
 var $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0;
 var $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0;
 var $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0;
 var $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0;
 var $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0;
 var $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0;
 var $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0;
 var $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0;
 var $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0;
 var $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0;
 var $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0;
 var $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0;
 var $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0;
 var $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0;
 var $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0;
 var $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0;
 var $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0;
 var $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0;
 var $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0;
 var $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0;
 var $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0;
 var $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0;
 var $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0;
 var $783 = 0, $784 = 0, $785 = 0, $786 = 0, $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0;
 var $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0;
 var $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0;
 var $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0;
 var $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0;
 var $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0;
 var $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0;
 var $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $rval = 0, $tmpn = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $ms;
 $2 = $1;
 $3 = (($2) + 8|0);
 $4 = (($3) + 4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = (($5) + 8|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = HEAP32[$7>>2]|0;
 $9 = ($8|0)!=(0|0);
 if ($9) {
  $10 = $1;
  $11 = (($10) + 8|0);
  $12 = (($11) + 8|0);
  $13 = HEAP32[$12>>2]|0;
  $14 = HEAP32[$13>>2]|0;
  $15 = ($14|0)!=(0|0);
  if ($15) {
   $16 = $1;
   $17 = (($16) + 8|0);
   $18 = (($17) + 4|0);
   $19 = HEAP32[$18>>2]|0;
   $20 = (($19) + 8|0);
   $21 = HEAP32[$20>>2]|0;
   $22 = HEAP32[$21>>2]|0;
   $23 = $1;
   $24 = (($23) + 8|0);
   $25 = (($24) + 8|0);
   $26 = HEAP32[$25>>2]|0;
   $27 = HEAP32[$26>>2]|0;
   $28 = ($22|0)==($27|0);
   $29 = $28 ? 2 : 1;
   $30 = $1;
   $31 = (($30) + 36|0);
   HEAP32[$31>>2] = $29;
   $32 = $1;
   $0 = $32;
   $908 = $0;
   STACKTOP = sp;return ($908|0);
  }
 }
 $33 = $1;
 $rval = $33;
 $34 = $1;
 $35 = (($34) + 36|0);
 HEAP32[$35>>2] = 4;
 $36 = (_new_node()|0);
 $tmpn = $36;
 $37 = $rval;
 $38 = $tmpn;
 $39 = (($38) + 8|0);
 HEAP32[$39>>2] = $37;
 $40 = $tmpn;
 $41 = (($40) + 8|0);
 $42 = HEAP32[$41>>2]|0;
 $43 = (($42) + 24|0);
 $44 = HEAP32[$43>>2]|0;
 $45 = (($44) + 1)|0;
 HEAP32[$43>>2] = $45;
 $46 = $tmpn;
 $rval = $46;
 $47 = $1;
 $48 = (($47) + 8|0);
 $49 = (($48) + 4|0);
 $50 = HEAP32[$49>>2]|0;
 $51 = (($50) + 8|0);
 $52 = HEAP32[$51>>2]|0;
 $53 = $rval;
 $54 = (($53) + 8|0);
 $55 = (($54) + 4|0);
 HEAP32[$55>>2] = $52;
 $56 = $rval;
 $57 = (($56) + 8|0);
 $58 = (($57) + 4|0);
 $59 = HEAP32[$58>>2]|0;
 $60 = (($59) + 24|0);
 $61 = HEAP32[$60>>2]|0;
 $62 = (($61) + 1)|0;
 HEAP32[$60>>2] = $62;
 $63 = $1;
 $64 = (($63) + 8|0);
 $65 = (($64) + 8|0);
 $66 = HEAP32[$65>>2]|0;
 $67 = $rval;
 $68 = (($67) + 8|0);
 $69 = (($68) + 8|0);
 HEAP32[$69>>2] = $66;
 $70 = $rval;
 $71 = (($70) + 8|0);
 $72 = (($71) + 8|0);
 $73 = HEAP32[$72>>2]|0;
 $74 = (($73) + 24|0);
 $75 = HEAP32[$74>>2]|0;
 $76 = (($75) + 1)|0;
 HEAP32[$74>>2] = $76;
 $77 = $1;
 $78 = $rval;
 $79 = (($78) + 20|0);
 HEAP32[$79>>2] = $77;
 $80 = $1;
 $81 = (($80) + 8|0);
 $82 = (($81) + 4|0);
 $83 = HEAP32[$82>>2]|0;
 $84 = (($83) + 8|0);
 $85 = HEAP32[$84>>2]|0;
 $86 = (($85) + 28|0);
 $87 = HEAP32[$86>>2]|0;
 $88 = ($87|0)==(2);
 if ($88) {
  $89 = (_new_node()|0);
  $tmpn = $89;
  $90 = $rval;
  $91 = $tmpn;
  $92 = (($91) + 8|0);
  HEAP32[$92>>2] = $90;
  $93 = $tmpn;
  $94 = (($93) + 8|0);
  $95 = HEAP32[$94>>2]|0;
  $96 = (($95) + 24|0);
  $97 = HEAP32[$96>>2]|0;
  $98 = (($97) + 1)|0;
  HEAP32[$96>>2] = $98;
  $99 = $tmpn;
  $rval = $99;
  $100 = (_new_node()|0);
  $101 = $rval;
  $102 = (($101) + 8|0);
  $103 = (($102) + 4|0);
  HEAP32[$103>>2] = $100;
  $104 = $1;
  $105 = (($104) + 8|0);
  $106 = (($105) + 4|0);
  $107 = HEAP32[$106>>2]|0;
  $108 = (($107) + 8|0);
  $109 = HEAP32[$108>>2]|0;
  $110 = (($109) + 4|0);
  $111 = HEAP32[$110>>2]|0;
  $112 = $rval;
  $113 = (($112) + 8|0);
  $114 = (($113) + 4|0);
  $115 = HEAP32[$114>>2]|0;
  $116 = (($115) + 4|0);
  HEAP32[$116>>2] = $111;
  $117 = $rval;
  $118 = (($117) + 8|0);
  $119 = (($118) + 4|0);
  $120 = HEAP32[$119>>2]|0;
  $121 = (($120) + 4|0);
  $122 = HEAP32[$121>>2]|0;
  $123 = (($122) + 20|0);
  $124 = HEAP32[$123>>2]|0;
  $125 = (($124) + 1)|0;
  HEAP32[$123>>2] = $125;
  $126 = $1;
  $127 = (($126) + 8|0);
  $128 = (($127) + 4|0);
  $129 = HEAP32[$128>>2]|0;
  $130 = (($129) + 8|0);
  $131 = HEAP32[$130>>2]|0;
  $132 = (($131) + 28|0);
  $133 = HEAP32[$132>>2]|0;
  $134 = $rval;
  $135 = (($134) + 8|0);
  $136 = (($135) + 4|0);
  $137 = HEAP32[$136>>2]|0;
  $138 = (($137) + 28|0);
  HEAP32[$138>>2] = $133;
  $139 = $1;
  $140 = (($139) + 8|0);
  $141 = (($140) + 4|0);
  $142 = HEAP32[$141>>2]|0;
  $143 = (($142) + 8|0);
  $144 = HEAP32[$143>>2]|0;
  $145 = (($144) + 8|0);
  $146 = (($145) + 4|0);
  $147 = HEAP32[$146>>2]|0;
  $148 = $rval;
  $149 = (($148) + 8|0);
  $150 = (($149) + 4|0);
  $151 = HEAP32[$150>>2]|0;
  $152 = (($151) + 8|0);
  HEAP32[$152>>2] = $147;
  $153 = $rval;
  $154 = (($153) + 8|0);
  $155 = (($154) + 4|0);
  $156 = HEAP32[$155>>2]|0;
  $157 = (($156) + 8|0);
  $158 = HEAP32[$157>>2]|0;
  $159 = (($158) + 24|0);
  $160 = HEAP32[$159>>2]|0;
  $161 = (($160) + 1)|0;
  HEAP32[$159>>2] = $161;
  $162 = $1;
  $163 = (($162) + 8|0);
  $164 = (($163) + 4|0);
  $165 = HEAP32[$164>>2]|0;
  $166 = (($165) + 8|0);
  $167 = HEAP32[$166>>2]|0;
  $168 = (($167) + 8|0);
  $169 = HEAP32[$168>>2]|0;
  $170 = $rval;
  $171 = (($170) + 8|0);
  $172 = (($171) + 4|0);
  $173 = HEAP32[$172>>2]|0;
  $174 = (($173) + 8|0);
  $175 = (($174) + 4|0);
  HEAP32[$175>>2] = $169;
  $176 = $rval;
  $177 = (($176) + 8|0);
  $178 = (($177) + 4|0);
  $179 = HEAP32[$178>>2]|0;
  $180 = (($179) + 8|0);
  $181 = (($180) + 4|0);
  $182 = HEAP32[$181>>2]|0;
  $183 = (($182) + 24|0);
  $184 = HEAP32[$183>>2]|0;
  $185 = (($184) + 1)|0;
  HEAP32[$183>>2] = $185;
  $186 = $1;
  $187 = (($186) + 8|0);
  $188 = (($187) + 8|0);
  $189 = HEAP32[$188>>2]|0;
  $190 = $rval;
  $191 = (($190) + 8|0);
  $192 = (($191) + 8|0);
  HEAP32[$192>>2] = $189;
  $193 = $rval;
  $194 = (($193) + 8|0);
  $195 = (($194) + 8|0);
  $196 = HEAP32[$195>>2]|0;
  $197 = (($196) + 24|0);
  $198 = HEAP32[$197>>2]|0;
  $199 = (($198) + 1)|0;
  HEAP32[$197>>2] = $199;
  $200 = $1;
  $201 = $rval;
  $202 = (($201) + 20|0);
  HEAP32[$202>>2] = $200;
 } else {
  $203 = $1;
  $204 = (($203) + 8|0);
  $205 = (($204) + 4|0);
  $206 = HEAP32[$205>>2]|0;
  $207 = (($206) + 8|0);
  $208 = HEAP32[$207>>2]|0;
  $209 = (($208) + 28|0);
  $210 = HEAP32[$209>>2]|0;
  $211 = ($210|0)==(3);
  if ($211) {
   $212 = (_new_node()|0);
   $tmpn = $212;
   $213 = $rval;
   $214 = $tmpn;
   $215 = (($214) + 8|0);
   HEAP32[$215>>2] = $213;
   $216 = $tmpn;
   $217 = (($216) + 8|0);
   $218 = HEAP32[$217>>2]|0;
   $219 = (($218) + 24|0);
   $220 = HEAP32[$219>>2]|0;
   $221 = (($220) + 1)|0;
   HEAP32[$219>>2] = $221;
   $222 = $tmpn;
   $rval = $222;
   $223 = (_new_node()|0);
   $224 = $rval;
   $225 = (($224) + 8|0);
   $226 = (($225) + 4|0);
   HEAP32[$226>>2] = $223;
   $227 = $1;
   $228 = (($227) + 8|0);
   $229 = (($228) + 4|0);
   $230 = HEAP32[$229>>2]|0;
   $231 = (($230) + 8|0);
   $232 = HEAP32[$231>>2]|0;
   $233 = (($232) + 4|0);
   $234 = HEAP32[$233>>2]|0;
   $235 = $rval;
   $236 = (($235) + 8|0);
   $237 = (($236) + 4|0);
   $238 = HEAP32[$237>>2]|0;
   $239 = (($238) + 4|0);
   HEAP32[$239>>2] = $234;
   $240 = $rval;
   $241 = (($240) + 8|0);
   $242 = (($241) + 4|0);
   $243 = HEAP32[$242>>2]|0;
   $244 = (($243) + 4|0);
   $245 = HEAP32[$244>>2]|0;
   $246 = (($245) + 20|0);
   $247 = HEAP32[$246>>2]|0;
   $248 = (($247) + 1)|0;
   HEAP32[$246>>2] = $248;
   $249 = $1;
   $250 = (($249) + 8|0);
   $251 = (($250) + 4|0);
   $252 = HEAP32[$251>>2]|0;
   $253 = (($252) + 8|0);
   $254 = HEAP32[$253>>2]|0;
   $255 = (($254) + 28|0);
   $256 = HEAP32[$255>>2]|0;
   $257 = $rval;
   $258 = (($257) + 8|0);
   $259 = (($258) + 4|0);
   $260 = HEAP32[$259>>2]|0;
   $261 = (($260) + 28|0);
   HEAP32[$261>>2] = $256;
   $262 = $1;
   $263 = (($262) + 8|0);
   $264 = (($263) + 4|0);
   $265 = HEAP32[$264>>2]|0;
   $266 = (($265) + 8|0);
   $267 = HEAP32[$266>>2]|0;
   $268 = (($267) + 8|0);
   $269 = HEAP32[$268>>2]|0;
   $270 = $rval;
   $271 = (($270) + 8|0);
   $272 = (($271) + 4|0);
   $273 = HEAP32[$272>>2]|0;
   $274 = (($273) + 8|0);
   HEAP32[$274>>2] = $269;
   $275 = $rval;
   $276 = (($275) + 8|0);
   $277 = (($276) + 4|0);
   $278 = HEAP32[$277>>2]|0;
   $279 = (($278) + 8|0);
   $280 = HEAP32[$279>>2]|0;
   $281 = (($280) + 24|0);
   $282 = HEAP32[$281>>2]|0;
   $283 = (($282) + 1)|0;
   HEAP32[$281>>2] = $283;
   $284 = $1;
   $285 = (($284) + 8|0);
   $286 = (($285) + 4|0);
   $287 = HEAP32[$286>>2]|0;
   $288 = (($287) + 8|0);
   $289 = HEAP32[$288>>2]|0;
   $290 = (($289) + 8|0);
   $291 = (($290) + 8|0);
   $292 = HEAP32[$291>>2]|0;
   $293 = $rval;
   $294 = (($293) + 8|0);
   $295 = (($294) + 4|0);
   $296 = HEAP32[$295>>2]|0;
   $297 = (($296) + 8|0);
   $298 = (($297) + 4|0);
   HEAP32[$298>>2] = $292;
   $299 = $rval;
   $300 = (($299) + 8|0);
   $301 = (($300) + 4|0);
   $302 = HEAP32[$301>>2]|0;
   $303 = (($302) + 8|0);
   $304 = (($303) + 4|0);
   $305 = HEAP32[$304>>2]|0;
   $306 = (($305) + 24|0);
   $307 = HEAP32[$306>>2]|0;
   $308 = (($307) + 1)|0;
   HEAP32[$306>>2] = $308;
   $309 = $1;
   $310 = (($309) + 8|0);
   $311 = (($310) + 4|0);
   $312 = HEAP32[$311>>2]|0;
   $313 = (($312) + 8|0);
   $314 = HEAP32[$313>>2]|0;
   $315 = (($314) + 8|0);
   $316 = (($315) + 4|0);
   $317 = HEAP32[$316>>2]|0;
   $318 = $rval;
   $319 = (($318) + 8|0);
   $320 = (($319) + 4|0);
   $321 = HEAP32[$320>>2]|0;
   $322 = (($321) + 8|0);
   $323 = (($322) + 8|0);
   HEAP32[$323>>2] = $317;
   $324 = $rval;
   $325 = (($324) + 8|0);
   $326 = (($325) + 4|0);
   $327 = HEAP32[$326>>2]|0;
   $328 = (($327) + 8|0);
   $329 = (($328) + 8|0);
   $330 = HEAP32[$329>>2]|0;
   $331 = (($330) + 24|0);
   $332 = HEAP32[$331>>2]|0;
   $333 = (($332) + 1)|0;
   HEAP32[$331>>2] = $333;
   $334 = $1;
   $335 = (($334) + 8|0);
   $336 = (($335) + 8|0);
   $337 = HEAP32[$336>>2]|0;
   $338 = $rval;
   $339 = (($338) + 8|0);
   $340 = (($339) + 8|0);
   HEAP32[$340>>2] = $337;
   $341 = $rval;
   $342 = (($341) + 8|0);
   $343 = (($342) + 8|0);
   $344 = HEAP32[$343>>2]|0;
   $345 = (($344) + 24|0);
   $346 = HEAP32[$345>>2]|0;
   $347 = (($346) + 1)|0;
   HEAP32[$345>>2] = $347;
   $348 = $1;
   $349 = $rval;
   $350 = (($349) + 20|0);
   HEAP32[$350>>2] = $348;
   $351 = (_new_node()|0);
   $tmpn = $351;
   $352 = $rval;
   $353 = $tmpn;
   $354 = (($353) + 8|0);
   HEAP32[$354>>2] = $352;
   $355 = $tmpn;
   $356 = (($355) + 8|0);
   $357 = HEAP32[$356>>2]|0;
   $358 = (($357) + 24|0);
   $359 = HEAP32[$358>>2]|0;
   $360 = (($359) + 1)|0;
   HEAP32[$358>>2] = $360;
   $361 = $tmpn;
   $rval = $361;
   $362 = (_new_node()|0);
   $363 = $rval;
   $364 = (($363) + 8|0);
   $365 = (($364) + 4|0);
   HEAP32[$365>>2] = $362;
   $366 = $1;
   $367 = (($366) + 8|0);
   $368 = (($367) + 4|0);
   $369 = HEAP32[$368>>2]|0;
   $370 = (($369) + 8|0);
   $371 = HEAP32[$370>>2]|0;
   $372 = (($371) + 4|0);
   $373 = HEAP32[$372>>2]|0;
   $374 = $rval;
   $375 = (($374) + 8|0);
   $376 = (($375) + 4|0);
   $377 = HEAP32[$376>>2]|0;
   $378 = (($377) + 4|0);
   HEAP32[$378>>2] = $373;
   $379 = $rval;
   $380 = (($379) + 8|0);
   $381 = (($380) + 4|0);
   $382 = HEAP32[$381>>2]|0;
   $383 = (($382) + 4|0);
   $384 = HEAP32[$383>>2]|0;
   $385 = (($384) + 20|0);
   $386 = HEAP32[$385>>2]|0;
   $387 = (($386) + 1)|0;
   HEAP32[$385>>2] = $387;
   $388 = $1;
   $389 = (($388) + 8|0);
   $390 = (($389) + 4|0);
   $391 = HEAP32[$390>>2]|0;
   $392 = (($391) + 8|0);
   $393 = HEAP32[$392>>2]|0;
   $394 = (($393) + 28|0);
   $395 = HEAP32[$394>>2]|0;
   $396 = $rval;
   $397 = (($396) + 8|0);
   $398 = (($397) + 4|0);
   $399 = HEAP32[$398>>2]|0;
   $400 = (($399) + 28|0);
   HEAP32[$400>>2] = $395;
   $401 = $1;
   $402 = (($401) + 8|0);
   $403 = (($402) + 4|0);
   $404 = HEAP32[$403>>2]|0;
   $405 = (($404) + 8|0);
   $406 = HEAP32[$405>>2]|0;
   $407 = (($406) + 8|0);
   $408 = (($407) + 4|0);
   $409 = HEAP32[$408>>2]|0;
   $410 = $rval;
   $411 = (($410) + 8|0);
   $412 = (($411) + 4|0);
   $413 = HEAP32[$412>>2]|0;
   $414 = (($413) + 8|0);
   HEAP32[$414>>2] = $409;
   $415 = $rval;
   $416 = (($415) + 8|0);
   $417 = (($416) + 4|0);
   $418 = HEAP32[$417>>2]|0;
   $419 = (($418) + 8|0);
   $420 = HEAP32[$419>>2]|0;
   $421 = (($420) + 24|0);
   $422 = HEAP32[$421>>2]|0;
   $423 = (($422) + 1)|0;
   HEAP32[$421>>2] = $423;
   $424 = $1;
   $425 = (($424) + 8|0);
   $426 = (($425) + 4|0);
   $427 = HEAP32[$426>>2]|0;
   $428 = (($427) + 8|0);
   $429 = HEAP32[$428>>2]|0;
   $430 = (($429) + 8|0);
   $431 = HEAP32[$430>>2]|0;
   $432 = $rval;
   $433 = (($432) + 8|0);
   $434 = (($433) + 4|0);
   $435 = HEAP32[$434>>2]|0;
   $436 = (($435) + 8|0);
   $437 = (($436) + 4|0);
   HEAP32[$437>>2] = $431;
   $438 = $rval;
   $439 = (($438) + 8|0);
   $440 = (($439) + 4|0);
   $441 = HEAP32[$440>>2]|0;
   $442 = (($441) + 8|0);
   $443 = (($442) + 4|0);
   $444 = HEAP32[$443>>2]|0;
   $445 = (($444) + 24|0);
   $446 = HEAP32[$445>>2]|0;
   $447 = (($446) + 1)|0;
   HEAP32[$445>>2] = $447;
   $448 = $1;
   $449 = (($448) + 8|0);
   $450 = (($449) + 4|0);
   $451 = HEAP32[$450>>2]|0;
   $452 = (($451) + 8|0);
   $453 = HEAP32[$452>>2]|0;
   $454 = (($453) + 8|0);
   $455 = (($454) + 8|0);
   $456 = HEAP32[$455>>2]|0;
   $457 = $rval;
   $458 = (($457) + 8|0);
   $459 = (($458) + 4|0);
   $460 = HEAP32[$459>>2]|0;
   $461 = (($460) + 8|0);
   $462 = (($461) + 8|0);
   HEAP32[$462>>2] = $456;
   $463 = $rval;
   $464 = (($463) + 8|0);
   $465 = (($464) + 4|0);
   $466 = HEAP32[$465>>2]|0;
   $467 = (($466) + 8|0);
   $468 = (($467) + 8|0);
   $469 = HEAP32[$468>>2]|0;
   $470 = (($469) + 24|0);
   $471 = HEAP32[$470>>2]|0;
   $472 = (($471) + 1)|0;
   HEAP32[$470>>2] = $472;
   $473 = $1;
   $474 = (($473) + 8|0);
   $475 = (($474) + 8|0);
   $476 = HEAP32[$475>>2]|0;
   $477 = $rval;
   $478 = (($477) + 8|0);
   $479 = (($478) + 8|0);
   HEAP32[$479>>2] = $476;
   $480 = $rval;
   $481 = (($480) + 8|0);
   $482 = (($481) + 8|0);
   $483 = HEAP32[$482>>2]|0;
   $484 = (($483) + 24|0);
   $485 = HEAP32[$484>>2]|0;
   $486 = (($485) + 1)|0;
   HEAP32[$484>>2] = $486;
   $487 = $1;
   $488 = $rval;
   $489 = (($488) + 20|0);
   HEAP32[$489>>2] = $487;
   $490 = (_new_node()|0);
   $tmpn = $490;
   $491 = $rval;
   $492 = $tmpn;
   $493 = (($492) + 8|0);
   HEAP32[$493>>2] = $491;
   $494 = $tmpn;
   $495 = (($494) + 8|0);
   $496 = HEAP32[$495>>2]|0;
   $497 = (($496) + 24|0);
   $498 = HEAP32[$497>>2]|0;
   $499 = (($498) + 1)|0;
   HEAP32[$497>>2] = $499;
   $500 = $tmpn;
   $rval = $500;
   $501 = (_new_node()|0);
   $502 = $rval;
   $503 = (($502) + 8|0);
   $504 = (($503) + 4|0);
   HEAP32[$504>>2] = $501;
   $505 = $1;
   $506 = (($505) + 8|0);
   $507 = (($506) + 4|0);
   $508 = HEAP32[$507>>2]|0;
   $509 = (($508) + 8|0);
   $510 = HEAP32[$509>>2]|0;
   $511 = (($510) + 4|0);
   $512 = HEAP32[$511>>2]|0;
   $513 = $rval;
   $514 = (($513) + 8|0);
   $515 = (($514) + 4|0);
   $516 = HEAP32[$515>>2]|0;
   $517 = (($516) + 4|0);
   HEAP32[$517>>2] = $512;
   $518 = $rval;
   $519 = (($518) + 8|0);
   $520 = (($519) + 4|0);
   $521 = HEAP32[$520>>2]|0;
   $522 = (($521) + 4|0);
   $523 = HEAP32[$522>>2]|0;
   $524 = (($523) + 20|0);
   $525 = HEAP32[$524>>2]|0;
   $526 = (($525) + 1)|0;
   HEAP32[$524>>2] = $526;
   $527 = $1;
   $528 = (($527) + 8|0);
   $529 = (($528) + 4|0);
   $530 = HEAP32[$529>>2]|0;
   $531 = (($530) + 8|0);
   $532 = HEAP32[$531>>2]|0;
   $533 = (($532) + 28|0);
   $534 = HEAP32[$533>>2]|0;
   $535 = $rval;
   $536 = (($535) + 8|0);
   $537 = (($536) + 4|0);
   $538 = HEAP32[$537>>2]|0;
   $539 = (($538) + 28|0);
   HEAP32[$539>>2] = $534;
   $540 = $1;
   $541 = (($540) + 8|0);
   $542 = (($541) + 4|0);
   $543 = HEAP32[$542>>2]|0;
   $544 = (($543) + 8|0);
   $545 = HEAP32[$544>>2]|0;
   $546 = (($545) + 8|0);
   $547 = (($546) + 4|0);
   $548 = HEAP32[$547>>2]|0;
   $549 = $rval;
   $550 = (($549) + 8|0);
   $551 = (($550) + 4|0);
   $552 = HEAP32[$551>>2]|0;
   $553 = (($552) + 8|0);
   HEAP32[$553>>2] = $548;
   $554 = $rval;
   $555 = (($554) + 8|0);
   $556 = (($555) + 4|0);
   $557 = HEAP32[$556>>2]|0;
   $558 = (($557) + 8|0);
   $559 = HEAP32[$558>>2]|0;
   $560 = (($559) + 24|0);
   $561 = HEAP32[$560>>2]|0;
   $562 = (($561) + 1)|0;
   HEAP32[$560>>2] = $562;
   $563 = $1;
   $564 = (($563) + 8|0);
   $565 = (($564) + 4|0);
   $566 = HEAP32[$565>>2]|0;
   $567 = (($566) + 8|0);
   $568 = HEAP32[$567>>2]|0;
   $569 = (($568) + 8|0);
   $570 = (($569) + 8|0);
   $571 = HEAP32[$570>>2]|0;
   $572 = $rval;
   $573 = (($572) + 8|0);
   $574 = (($573) + 4|0);
   $575 = HEAP32[$574>>2]|0;
   $576 = (($575) + 8|0);
   $577 = (($576) + 4|0);
   HEAP32[$577>>2] = $571;
   $578 = $rval;
   $579 = (($578) + 8|0);
   $580 = (($579) + 4|0);
   $581 = HEAP32[$580>>2]|0;
   $582 = (($581) + 8|0);
   $583 = (($582) + 4|0);
   $584 = HEAP32[$583>>2]|0;
   $585 = (($584) + 24|0);
   $586 = HEAP32[$585>>2]|0;
   $587 = (($586) + 1)|0;
   HEAP32[$585>>2] = $587;
   $588 = $1;
   $589 = (($588) + 8|0);
   $590 = (($589) + 4|0);
   $591 = HEAP32[$590>>2]|0;
   $592 = (($591) + 8|0);
   $593 = HEAP32[$592>>2]|0;
   $594 = (($593) + 8|0);
   $595 = HEAP32[$594>>2]|0;
   $596 = $rval;
   $597 = (($596) + 8|0);
   $598 = (($597) + 4|0);
   $599 = HEAP32[$598>>2]|0;
   $600 = (($599) + 8|0);
   $601 = (($600) + 8|0);
   HEAP32[$601>>2] = $595;
   $602 = $rval;
   $603 = (($602) + 8|0);
   $604 = (($603) + 4|0);
   $605 = HEAP32[$604>>2]|0;
   $606 = (($605) + 8|0);
   $607 = (($606) + 8|0);
   $608 = HEAP32[$607>>2]|0;
   $609 = (($608) + 24|0);
   $610 = HEAP32[$609>>2]|0;
   $611 = (($610) + 1)|0;
   HEAP32[$609>>2] = $611;
   $612 = $1;
   $613 = (($612) + 8|0);
   $614 = (($613) + 8|0);
   $615 = HEAP32[$614>>2]|0;
   $616 = $rval;
   $617 = (($616) + 8|0);
   $618 = (($617) + 8|0);
   HEAP32[$618>>2] = $615;
   $619 = $rval;
   $620 = (($619) + 8|0);
   $621 = (($620) + 8|0);
   $622 = HEAP32[$621>>2]|0;
   $623 = (($622) + 24|0);
   $624 = HEAP32[$623>>2]|0;
   $625 = (($624) + 1)|0;
   HEAP32[$623>>2] = $625;
   $626 = $1;
   $627 = $rval;
   $628 = (($627) + 20|0);
   HEAP32[$628>>2] = $626;
   $629 = (_new_node()|0);
   $tmpn = $629;
   $630 = $rval;
   $631 = $tmpn;
   $632 = (($631) + 8|0);
   HEAP32[$632>>2] = $630;
   $633 = $tmpn;
   $634 = (($633) + 8|0);
   $635 = HEAP32[$634>>2]|0;
   $636 = (($635) + 24|0);
   $637 = HEAP32[$636>>2]|0;
   $638 = (($637) + 1)|0;
   HEAP32[$636>>2] = $638;
   $639 = $tmpn;
   $rval = $639;
   $640 = (_new_node()|0);
   $641 = $rval;
   $642 = (($641) + 8|0);
   $643 = (($642) + 4|0);
   HEAP32[$643>>2] = $640;
   $644 = $1;
   $645 = (($644) + 8|0);
   $646 = (($645) + 4|0);
   $647 = HEAP32[$646>>2]|0;
   $648 = (($647) + 8|0);
   $649 = HEAP32[$648>>2]|0;
   $650 = (($649) + 4|0);
   $651 = HEAP32[$650>>2]|0;
   $652 = $rval;
   $653 = (($652) + 8|0);
   $654 = (($653) + 4|0);
   $655 = HEAP32[$654>>2]|0;
   $656 = (($655) + 4|0);
   HEAP32[$656>>2] = $651;
   $657 = $rval;
   $658 = (($657) + 8|0);
   $659 = (($658) + 4|0);
   $660 = HEAP32[$659>>2]|0;
   $661 = (($660) + 4|0);
   $662 = HEAP32[$661>>2]|0;
   $663 = (($662) + 20|0);
   $664 = HEAP32[$663>>2]|0;
   $665 = (($664) + 1)|0;
   HEAP32[$663>>2] = $665;
   $666 = $1;
   $667 = (($666) + 8|0);
   $668 = (($667) + 4|0);
   $669 = HEAP32[$668>>2]|0;
   $670 = (($669) + 8|0);
   $671 = HEAP32[$670>>2]|0;
   $672 = (($671) + 28|0);
   $673 = HEAP32[$672>>2]|0;
   $674 = $rval;
   $675 = (($674) + 8|0);
   $676 = (($675) + 4|0);
   $677 = HEAP32[$676>>2]|0;
   $678 = (($677) + 28|0);
   HEAP32[$678>>2] = $673;
   $679 = $1;
   $680 = (($679) + 8|0);
   $681 = (($680) + 4|0);
   $682 = HEAP32[$681>>2]|0;
   $683 = (($682) + 8|0);
   $684 = HEAP32[$683>>2]|0;
   $685 = (($684) + 8|0);
   $686 = (($685) + 8|0);
   $687 = HEAP32[$686>>2]|0;
   $688 = $rval;
   $689 = (($688) + 8|0);
   $690 = (($689) + 4|0);
   $691 = HEAP32[$690>>2]|0;
   $692 = (($691) + 8|0);
   HEAP32[$692>>2] = $687;
   $693 = $rval;
   $694 = (($693) + 8|0);
   $695 = (($694) + 4|0);
   $696 = HEAP32[$695>>2]|0;
   $697 = (($696) + 8|0);
   $698 = HEAP32[$697>>2]|0;
   $699 = (($698) + 24|0);
   $700 = HEAP32[$699>>2]|0;
   $701 = (($700) + 1)|0;
   HEAP32[$699>>2] = $701;
   $702 = $1;
   $703 = (($702) + 8|0);
   $704 = (($703) + 4|0);
   $705 = HEAP32[$704>>2]|0;
   $706 = (($705) + 8|0);
   $707 = HEAP32[$706>>2]|0;
   $708 = (($707) + 8|0);
   $709 = HEAP32[$708>>2]|0;
   $710 = $rval;
   $711 = (($710) + 8|0);
   $712 = (($711) + 4|0);
   $713 = HEAP32[$712>>2]|0;
   $714 = (($713) + 8|0);
   $715 = (($714) + 4|0);
   HEAP32[$715>>2] = $709;
   $716 = $rval;
   $717 = (($716) + 8|0);
   $718 = (($717) + 4|0);
   $719 = HEAP32[$718>>2]|0;
   $720 = (($719) + 8|0);
   $721 = (($720) + 4|0);
   $722 = HEAP32[$721>>2]|0;
   $723 = (($722) + 24|0);
   $724 = HEAP32[$723>>2]|0;
   $725 = (($724) + 1)|0;
   HEAP32[$723>>2] = $725;
   $726 = $1;
   $727 = (($726) + 8|0);
   $728 = (($727) + 4|0);
   $729 = HEAP32[$728>>2]|0;
   $730 = (($729) + 8|0);
   $731 = HEAP32[$730>>2]|0;
   $732 = (($731) + 8|0);
   $733 = (($732) + 4|0);
   $734 = HEAP32[$733>>2]|0;
   $735 = $rval;
   $736 = (($735) + 8|0);
   $737 = (($736) + 4|0);
   $738 = HEAP32[$737>>2]|0;
   $739 = (($738) + 8|0);
   $740 = (($739) + 8|0);
   HEAP32[$740>>2] = $734;
   $741 = $rval;
   $742 = (($741) + 8|0);
   $743 = (($742) + 4|0);
   $744 = HEAP32[$743>>2]|0;
   $745 = (($744) + 8|0);
   $746 = (($745) + 8|0);
   $747 = HEAP32[$746>>2]|0;
   $748 = (($747) + 24|0);
   $749 = HEAP32[$748>>2]|0;
   $750 = (($749) + 1)|0;
   HEAP32[$748>>2] = $750;
   $751 = $1;
   $752 = (($751) + 8|0);
   $753 = (($752) + 8|0);
   $754 = HEAP32[$753>>2]|0;
   $755 = $rval;
   $756 = (($755) + 8|0);
   $757 = (($756) + 8|0);
   HEAP32[$757>>2] = $754;
   $758 = $rval;
   $759 = (($758) + 8|0);
   $760 = (($759) + 8|0);
   $761 = HEAP32[$760>>2]|0;
   $762 = (($761) + 24|0);
   $763 = HEAP32[$762>>2]|0;
   $764 = (($763) + 1)|0;
   HEAP32[$762>>2] = $764;
   $765 = $1;
   $766 = $rval;
   $767 = (($766) + 20|0);
   HEAP32[$767>>2] = $765;
   $768 = (_new_node()|0);
   $tmpn = $768;
   $769 = $rval;
   $770 = $tmpn;
   $771 = (($770) + 8|0);
   HEAP32[$771>>2] = $769;
   $772 = $tmpn;
   $773 = (($772) + 8|0);
   $774 = HEAP32[$773>>2]|0;
   $775 = (($774) + 24|0);
   $776 = HEAP32[$775>>2]|0;
   $777 = (($776) + 1)|0;
   HEAP32[$775>>2] = $777;
   $778 = $tmpn;
   $rval = $778;
   $779 = (_new_node()|0);
   $780 = $rval;
   $781 = (($780) + 8|0);
   $782 = (($781) + 4|0);
   HEAP32[$782>>2] = $779;
   $783 = $1;
   $784 = (($783) + 8|0);
   $785 = (($784) + 4|0);
   $786 = HEAP32[$785>>2]|0;
   $787 = (($786) + 8|0);
   $788 = HEAP32[$787>>2]|0;
   $789 = (($788) + 4|0);
   $790 = HEAP32[$789>>2]|0;
   $791 = $rval;
   $792 = (($791) + 8|0);
   $793 = (($792) + 4|0);
   $794 = HEAP32[$793>>2]|0;
   $795 = (($794) + 4|0);
   HEAP32[$795>>2] = $790;
   $796 = $rval;
   $797 = (($796) + 8|0);
   $798 = (($797) + 4|0);
   $799 = HEAP32[$798>>2]|0;
   $800 = (($799) + 4|0);
   $801 = HEAP32[$800>>2]|0;
   $802 = (($801) + 20|0);
   $803 = HEAP32[$802>>2]|0;
   $804 = (($803) + 1)|0;
   HEAP32[$802>>2] = $804;
   $805 = $1;
   $806 = (($805) + 8|0);
   $807 = (($806) + 4|0);
   $808 = HEAP32[$807>>2]|0;
   $809 = (($808) + 8|0);
   $810 = HEAP32[$809>>2]|0;
   $811 = (($810) + 28|0);
   $812 = HEAP32[$811>>2]|0;
   $813 = $rval;
   $814 = (($813) + 8|0);
   $815 = (($814) + 4|0);
   $816 = HEAP32[$815>>2]|0;
   $817 = (($816) + 28|0);
   HEAP32[$817>>2] = $812;
   $818 = $1;
   $819 = (($818) + 8|0);
   $820 = (($819) + 4|0);
   $821 = HEAP32[$820>>2]|0;
   $822 = (($821) + 8|0);
   $823 = HEAP32[$822>>2]|0;
   $824 = (($823) + 8|0);
   $825 = (($824) + 8|0);
   $826 = HEAP32[$825>>2]|0;
   $827 = $rval;
   $828 = (($827) + 8|0);
   $829 = (($828) + 4|0);
   $830 = HEAP32[$829>>2]|0;
   $831 = (($830) + 8|0);
   HEAP32[$831>>2] = $826;
   $832 = $rval;
   $833 = (($832) + 8|0);
   $834 = (($833) + 4|0);
   $835 = HEAP32[$834>>2]|0;
   $836 = (($835) + 8|0);
   $837 = HEAP32[$836>>2]|0;
   $838 = (($837) + 24|0);
   $839 = HEAP32[$838>>2]|0;
   $840 = (($839) + 1)|0;
   HEAP32[$838>>2] = $840;
   $841 = $1;
   $842 = (($841) + 8|0);
   $843 = (($842) + 4|0);
   $844 = HEAP32[$843>>2]|0;
   $845 = (($844) + 8|0);
   $846 = HEAP32[$845>>2]|0;
   $847 = (($846) + 8|0);
   $848 = (($847) + 4|0);
   $849 = HEAP32[$848>>2]|0;
   $850 = $rval;
   $851 = (($850) + 8|0);
   $852 = (($851) + 4|0);
   $853 = HEAP32[$852>>2]|0;
   $854 = (($853) + 8|0);
   $855 = (($854) + 4|0);
   HEAP32[$855>>2] = $849;
   $856 = $rval;
   $857 = (($856) + 8|0);
   $858 = (($857) + 4|0);
   $859 = HEAP32[$858>>2]|0;
   $860 = (($859) + 8|0);
   $861 = (($860) + 4|0);
   $862 = HEAP32[$861>>2]|0;
   $863 = (($862) + 24|0);
   $864 = HEAP32[$863>>2]|0;
   $865 = (($864) + 1)|0;
   HEAP32[$863>>2] = $865;
   $866 = $1;
   $867 = (($866) + 8|0);
   $868 = (($867) + 4|0);
   $869 = HEAP32[$868>>2]|0;
   $870 = (($869) + 8|0);
   $871 = HEAP32[$870>>2]|0;
   $872 = (($871) + 8|0);
   $873 = HEAP32[$872>>2]|0;
   $874 = $rval;
   $875 = (($874) + 8|0);
   $876 = (($875) + 4|0);
   $877 = HEAP32[$876>>2]|0;
   $878 = (($877) + 8|0);
   $879 = (($878) + 8|0);
   HEAP32[$879>>2] = $873;
   $880 = $rval;
   $881 = (($880) + 8|0);
   $882 = (($881) + 4|0);
   $883 = HEAP32[$882>>2]|0;
   $884 = (($883) + 8|0);
   $885 = (($884) + 8|0);
   $886 = HEAP32[$885>>2]|0;
   $887 = (($886) + 24|0);
   $888 = HEAP32[$887>>2]|0;
   $889 = (($888) + 1)|0;
   HEAP32[$887>>2] = $889;
   $890 = $1;
   $891 = (($890) + 8|0);
   $892 = (($891) + 8|0);
   $893 = HEAP32[$892>>2]|0;
   $894 = $rval;
   $895 = (($894) + 8|0);
   $896 = (($895) + 8|0);
   HEAP32[$896>>2] = $893;
   $897 = $rval;
   $898 = (($897) + 8|0);
   $899 = (($898) + 8|0);
   $900 = HEAP32[$899>>2]|0;
   $901 = (($900) + 24|0);
   $902 = HEAP32[$901>>2]|0;
   $903 = (($902) + 1)|0;
   HEAP32[$901>>2] = $903;
   $904 = $1;
   $905 = $rval;
   $906 = (($905) + 20|0);
   HEAP32[$906>>2] = $904;
  }
 }
 $907 = $rval;
 $0 = $907;
 $908 = $0;
 STACKTOP = sp;return ($908|0);
}
function _check_memoization() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $hard_node_count = 0, $hs = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = (_new_string(1,1928)|0);
 $hs = $0;
 $1 = $hs;
 $2 = (($1) + 20|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = (($3) - 6)|0;
 $hard_node_count = $4;
 $5 = $hs;
 _delete_string($5);
 $6 = (_new_string(1,1904)|0);
 $hs = $6;
 $7 = $hs;
 $8 = (($7) + 20|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = (($9) - 4)|0;
 $11 = $hard_node_count;
 $12 = (($11) + ($10))|0;
 $hard_node_count = $12;
 $13 = $hs;
 _delete_string($13);
 $14 = $hard_node_count;
 $15 = ($14|0)>=(3);
 if (!($15)) {
  STACKTOP = sp;return;
 }
 $16 = $hard_node_count;
 $17 = ($16|0)>(22);
 if ($17) {
  $hard_node_count = 22;
 }
 $18 = $hard_node_count;
 $19 = ($18|0)<(10);
 if ($19) {
  $hard_node_count = 10;
 }
 $20 = $hard_node_count;
 $21 = 2 << $20;
 $22 = $21<<4;
 $23 = (_malloc($22)|0);
 HEAP32[1936>>2] = $23;
 $24 = $hard_node_count;
 $25 = 2 << $24;
 $26 = (($25) - 1)|0;
 HEAP32[1944>>2] = $26;
 STACKTOP = sp;return;
}
function _tree_match($needle,$haystack) {
 $needle = $needle|0;
 $haystack = $haystack|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0;
 var $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0;
 var $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0;
 var $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0;
 var $97 = 0, $98 = 0, $99 = 0, $hval = 0, $memo_key = 0, $mn = 0, $tmpn = 0, $tmpnn = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $memo_key = sp + 8|0;
 $1 = $needle;
 $2 = $haystack;
 $3 = (_new_node()|0);
 $mn = $3;
 $4 = $1;
 $5 = $mn;
 $6 = (($5) + 8|0);
 $7 = (($6) + 4|0);
 HEAP32[$7>>2] = $4;
 $8 = $2;
 $9 = $mn;
 $10 = (($9) + 8|0);
 $11 = (($10) + 8|0);
 HEAP32[$11>>2] = $8;
 $12 = $1;
 $13 = (($12) + 24|0);
 $14 = HEAP32[$13>>2]|0;
 $15 = (($14) + 1)|0;
 HEAP32[$13>>2] = $15;
 $16 = $2;
 $17 = (($16) + 24|0);
 $18 = HEAP32[$17>>2]|0;
 $19 = (($18) + 1)|0;
 HEAP32[$17>>2] = $19;
 $20 = HEAP32[1944>>2]|0;
 $21 = ($20|0)!=(0);
 if ($21) {
  $22 = HEAP32[1952>>2]|0;
  $23 = (($22) + 1)|0;
  HEAP32[1952>>2] = $23;
  ;HEAP32[$memo_key+0>>2]=0|0;HEAP32[$memo_key+4>>2]=0|0;HEAP32[$memo_key+8>>2]=0|0;HEAP32[$memo_key+12>>2]=0|0;
  $24 = HEAP32[1952>>2]|0;
  HEAP32[$memo_key>>2] = $24;
  $25 = HEAP32[1952>>2]|0;
  $26 = ($25|0)==(1);
  if ($26) {
   $27 = HEAP32[1936>>2]|0;
   $28 = HEAP32[1944>>2]|0;
   $29 = (($28) + 1)|0;
   $30 = $29<<4;
   _memset(($27|0),0,($30|0))|0;
  }
 }
 while(1) {
  $31 = $mn;
  $32 = (($31) + 36|0);
  $33 = HEAP32[$32>>2]|0;
  $34 = ($33|0)==(0);
  if ($34) {
   $35 = $mn;
   $36 = (($35) + 8|0);
   $37 = (($36) + 4|0);
   $38 = HEAP32[$37>>2]|0;
   $39 = HEAP32[$38>>2]|0;
   $40 = ($39|0)!=(0|0);
   if ($40) {
    $41 = $mn;
    $42 = (($41) + 8|0);
    $43 = (($42) + 8|0);
    $44 = HEAP32[$43>>2]|0;
    $45 = HEAP32[$44>>2]|0;
    $46 = ($45|0)!=(0|0);
    if ($46) {
     $47 = $mn;
     $48 = (($47) + 8|0);
     $49 = (($48) + 4|0);
     $50 = HEAP32[$49>>2]|0;
     $51 = HEAP32[$50>>2]|0;
     $52 = $mn;
     $53 = (($52) + 8|0);
     $54 = (($53) + 8|0);
     $55 = HEAP32[$54>>2]|0;
     $56 = HEAP32[$55>>2]|0;
     $57 = ($51|0)==($56|0);
     $58 = $57 ? 2 : 1;
     $59 = $mn;
     $60 = (($59) + 36|0);
     HEAP32[$60>>2] = $58;
    } else {
     label = 10;
    }
   } else {
    label = 10;
   }
   if ((label|0) == 10) {
    label = 0;
    $61 = HEAP32[1944>>2]|0;
    $62 = ($61|0)!=(0);
    if ($62) {
     $63 = $mn;
     $64 = (($63) + 8|0);
     $65 = (($64) + 4|0);
     $66 = HEAP32[$65>>2]|0;
     $67 = (($66) + 32|0);
     $68 = HEAP32[$67>>2]|0;
     $69 = ($68|0)!=(0);
     if ($69) {
      $70 = 1912;
      $71 = $70;
      $72 = HEAP32[$71>>2]|0;
      $73 = (($70) + 4)|0;
      $74 = $73;
      $75 = HEAP32[$74>>2]|0;
      $76 = (_i64Add(($72|0),($75|0),1,0)|0);
      $77 = tempRet0;
      $78 = 1912;
      $79 = $78;
      HEAP32[$79>>2] = $76;
      $80 = (($78) + 4)|0;
      $81 = $80;
      HEAP32[$81>>2] = $77;
      $82 = $mn;
      $83 = (($82) + 8|0);
      $84 = (($83) + 4|0);
      $85 = HEAP32[$84>>2]|0;
      $86 = (($memo_key) + 4|0);
      HEAP32[$86>>2] = $85;
      $87 = $mn;
      $88 = (($87) + 8|0);
      $89 = (($88) + 8|0);
      $90 = HEAP32[$89>>2]|0;
      $91 = (($memo_key) + 8|0);
      HEAP32[$91>>2] = $90;
      $92 = (_fnv_hash92(16,$memo_key,0)|0);
      $93 = HEAP32[1944>>2]|0;
      $94 = $92 & $93;
      $hval = $94;
      $95 = $hval;
      $96 = HEAP32[1936>>2]|0;
      $97 = (($96) + ($95<<4)|0);
      $98 = HEAP32[$97>>2]|0;
      $99 = HEAP32[$memo_key>>2]|0;
      $100 = ($98|0)==($99|0);
      if ($100) {
       $101 = $hval;
       $102 = HEAP32[1936>>2]|0;
       $103 = (($102) + ($101<<4)|0);
       $104 = (($103) + 4|0);
       $105 = HEAP32[$104>>2]|0;
       $106 = (($memo_key) + 4|0);
       $107 = HEAP32[$106>>2]|0;
       $108 = ($105|0)==($107|0);
       if ($108) {
        $109 = $hval;
        $110 = HEAP32[1936>>2]|0;
        $111 = (($110) + ($109<<4)|0);
        $112 = (($111) + 8|0);
        $113 = HEAP32[$112>>2]|0;
        $114 = (($memo_key) + 8|0);
        $115 = HEAP32[$114>>2]|0;
        $116 = ($113|0)==($115|0);
        if ($116) {
         $117 = $hval;
         $118 = HEAP32[1936>>2]|0;
         $119 = (($118) + ($117<<4)|0);
         $120 = (($119) + 12|0);
         $121 = HEAP32[$120>>2]|0;
         $122 = $mn;
         $123 = (($122) + 36|0);
         HEAP32[$123>>2] = $121;
         $124 = 1920;
         $125 = $124;
         $126 = HEAP32[$125>>2]|0;
         $127 = (($124) + 4)|0;
         $128 = $127;
         $129 = HEAP32[$128>>2]|0;
         $130 = (_i64Add(($126|0),($129|0),1,0)|0);
         $131 = tempRet0;
         $132 = 1920;
         $133 = $132;
         HEAP32[$133>>2] = $130;
         $134 = (($132) + 4)|0;
         $135 = $134;
         HEAP32[$135>>2] = $131;
        } else {
         label = 16;
        }
       } else {
        label = 16;
       }
      } else {
       label = 16;
      }
      if ((label|0) == 16) {
       label = 0;
       $136 = $mn;
       $137 = (($136) + 8|0);
       $138 = (($137) + 4|0);
       $139 = HEAP32[$138>>2]|0;
       $140 = (($139) + 28|0);
       $141 = HEAP32[$140>>2]|0;
       $142 = $mn;
       $143 = (($142) + 8|0);
       $144 = (($143) + 4|0);
       $145 = HEAP32[$144>>2]|0;
       $146 = (($145) + 4|0);
       $147 = HEAP32[$146>>2]|0;
       $148 = (($147) + 24|0);
       $149 = HEAP32[$148>>2]|0;
       $150 = ($141|0)==($149|0);
       if ($150) {
        $151 = $mn;
        $152 = (($151) + 8|0);
        $153 = (($152) + 4|0);
        $154 = HEAP32[$153>>2]|0;
        $155 = (($154) + 4|0);
        $156 = HEAP32[$155>>2]|0;
        $157 = (($156) + 28|0);
        $158 = HEAP32[$157>>2]|0;
        $159 = $mn;
        $160 = (FUNCTION_TABLE_ii[$158 & 31]($159)|0);
        $mn = $160;
       } else {
        $161 = $mn;
        $162 = (_default_match_fn($161)|0);
        $mn = $162;
       }
      }
     } else {
      label = 21;
     }
    } else {
     label = 21;
    }
    if ((label|0) == 21) {
     label = 0;
     $163 = $mn;
     $164 = (($163) + 8|0);
     $165 = (($164) + 4|0);
     $166 = HEAP32[$165>>2]|0;
     $167 = (($166) + 28|0);
     $168 = HEAP32[$167>>2]|0;
     $169 = $mn;
     $170 = (($169) + 8|0);
     $171 = (($170) + 4|0);
     $172 = HEAP32[$171>>2]|0;
     $173 = (($172) + 4|0);
     $174 = HEAP32[$173>>2]|0;
     $175 = (($174) + 24|0);
     $176 = HEAP32[$175>>2]|0;
     $177 = ($168|0)==($176|0);
     if ($177) {
      $178 = $mn;
      $179 = (($178) + 8|0);
      $180 = (($179) + 4|0);
      $181 = HEAP32[$180>>2]|0;
      $182 = (($181) + 4|0);
      $183 = HEAP32[$182>>2]|0;
      $184 = (($183) + 28|0);
      $185 = HEAP32[$184>>2]|0;
      $186 = $mn;
      $187 = (FUNCTION_TABLE_ii[$185 & 31]($186)|0);
      $mn = $187;
     } else {
      $188 = $mn;
      $189 = (_default_match_fn($188)|0);
      $mn = $189;
     }
    }
   }
  } else {
   $190 = $mn;
   $191 = (($190) + 20|0);
   $192 = HEAP32[$191>>2]|0;
   $193 = ($192|0)!=(0|0);
   if ($193) {
    $194 = $mn;
    $195 = (($194) + 20|0);
    $196 = HEAP32[$195>>2]|0;
    $tmpn = $196;
    $197 = HEAP32[1944>>2]|0;
    $198 = ($197|0)!=(0);
    if ($198) {
     $199 = $mn;
     $200 = (($199) + 8|0);
     $201 = (($200) + 4|0);
     $202 = HEAP32[$201>>2]|0;
     $203 = (($202) + 32|0);
     $204 = HEAP32[$203>>2]|0;
     $205 = ($204|0)!=(0);
     if ($205) {
      $206 = $mn;
      $207 = (($206) + 8|0);
      $208 = (($207) + 4|0);
      $209 = HEAP32[$208>>2]|0;
      $210 = (($memo_key) + 4|0);
      HEAP32[$210>>2] = $209;
      $211 = $mn;
      $212 = (($211) + 8|0);
      $213 = (($212) + 8|0);
      $214 = HEAP32[$213>>2]|0;
      $215 = (($memo_key) + 8|0);
      HEAP32[$215>>2] = $214;
      $216 = (_fnv_hash92(16,$memo_key,0)|0);
      $217 = HEAP32[1944>>2]|0;
      $218 = $216 & $217;
      $hval = $218;
      $219 = $hval;
      $220 = HEAP32[1936>>2]|0;
      $221 = (($220) + ($219<<4)|0);
      ;HEAP32[$221+0>>2]=HEAP32[$memo_key+0>>2]|0;HEAP32[$221+4>>2]=HEAP32[$memo_key+4>>2]|0;HEAP32[$221+8>>2]=HEAP32[$memo_key+8>>2]|0;HEAP32[$221+12>>2]=HEAP32[$memo_key+12>>2]|0;
      $222 = $mn;
      $223 = (($222) + 36|0);
      $224 = HEAP32[$223>>2]|0;
      $225 = $hval;
      $226 = HEAP32[1936>>2]|0;
      $227 = (($226) + ($225<<4)|0);
      $228 = (($227) + 12|0);
      HEAP32[$228>>2] = $224;
     }
    }
    $229 = $mn;
    $230 = (($229) + 36|0);
    $231 = HEAP32[$230>>2]|0;
    if ((($231|0) == 3) | (($231|0) == 2)) {
     $232 = $tmpn;
     $233 = (($232) + 36|0);
     $234 = HEAP32[$233>>2]|0;
     $235 = ($234|0)==(4);
     if ($235) {
      $236 = $tmpn;
      $237 = (($236) + 36|0);
      HEAP32[$237>>2] = 2;
     } else {
      $238 = $tmpn;
      $239 = (($238) + 36|0);
      $240 = HEAP32[$239>>2]|0;
      $241 = ($240|0)==(5);
      if ($241) {
       $242 = $tmpn;
       $243 = (($242) + 36|0);
       HEAP32[$243>>2] = 1;
      }
     }
    } else if ((($231|0) == 4) | (($231|0) == 1)) {
     $244 = $tmpn;
     $245 = (($244) + 36|0);
     $246 = HEAP32[$245>>2]|0;
     $247 = ($246|0)==(3);
     if ($247) {
      $248 = $tmpn;
      $249 = (($248) + 36|0);
      HEAP32[$249>>2] = 1;
     } else {
      $250 = $tmpn;
      $251 = (($250) + 36|0);
      $252 = HEAP32[$251>>2]|0;
      $253 = ($252|0)==(5);
      if ($253) {
       $254 = $tmpn;
       $255 = (($254) + 36|0);
       HEAP32[$255>>2] = 2;
      }
     }
    } else {
     label = 44;
     break;
    }
    $256 = $tmpn;
    $257 = (($256) + 36|0);
    $258 = HEAP32[$257>>2]|0;
    $259 = ($258|0)==(2);
    if ($259) {
     label = 47;
    } else {
     $260 = $tmpn;
     $261 = (($260) + 36|0);
     $262 = HEAP32[$261>>2]|0;
     $263 = ($262|0)==(1);
     if ($263) {
      label = 47;
     } else {
      $272 = $mn;
      $273 = (($272) + 8|0);
      $274 = HEAP32[$273>>2]|0;
      $tmpnn = $274;
      $275 = $mn;
      _free_node($275);
      $276 = $tmpnn;
      $mn = $276;
     }
    }
    if ((label|0) == 47) {
     label = 0;
     while(1) {
      $264 = $mn;
      $265 = $tmpn;
      $266 = ($264|0)!=($265|0);
      if (!($266)) {
       break;
      }
      $267 = $mn;
      $268 = (($267) + 8|0);
      $269 = HEAP32[$268>>2]|0;
      $tmpnn = $269;
      $270 = $mn;
      _free_node($270);
      $271 = $tmpnn;
      $mn = $271;
     }
    }
   } else {
    $277 = $mn;
    $278 = (($277) + 36|0);
    $279 = HEAP32[$278>>2]|0;
    if ((($279|0) == 3) | (($279|0) == 2)) {
     label = 54;
     break;
    } else if ((($279|0) == 4) | (($279|0) == 1)) {
     label = 55;
     break;
    }
   }
  }
 }
 if ((label|0) == 44) {
  (_puts((1960|0))|0);
  _exit(1);
  // unreachable;
 }
 else if ((label|0) == 54) {
  $280 = $mn;
  _free_node($280);
  $0 = 1;
  $282 = $0;
  STACKTOP = sp;return ($282|0);
 }
 else if ((label|0) == 55) {
  $281 = $mn;
  _free_node($281);
  $0 = 0;
  $282 = $0;
  STACKTOP = sp;return ($282|0);
 }
 return 0|0;
}
function _fnv_hash92($m,$a,$bump) {
 $m = $m|0;
 $a = $a|0;
 $bump = $bump|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, $hval = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $m;
 $1 = $a;
 $2 = $bump;
 $3 = $2;
 $4 = ($3|0)!=(0);
 $5 = $4 ? 84696351 : -2128831035;
 $hval = $5;
 $i = 0;
 while(1) {
  $6 = $i;
  $7 = $0;
  $8 = ($6|0)<($7|0);
  if (!($8)) {
   break;
  }
  $9 = $i;
  $10 = $1;
  $11 = (($10) + ($9)|0);
  $12 = HEAP8[$11>>0]|0;
  $13 = $12 << 24 >> 24;
  $14 = $hval;
  $15 = $14 ^ $13;
  $hval = $15;
  $16 = $hval;
  $17 = Math_imul($16, 16777619)|0;
  $hval = $17;
  $18 = $i;
  $19 = (($18) + 1)|0;
  $i = $19;
 }
 $20 = $hval;
 STACKTOP = sp;return ($20|0);
}
function _construct_utf8($xval,$ebuf) {
 $xval = $xval|0;
 $ebuf = $ebuf|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $8 = 0, $9 = 0, $clen = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $xval;
 $1 = $ebuf;
 $2 = $0;
 $3 = ($2|0)>=(1114112);
 if ($3) {
  $0 = 65533;
 }
 $4 = $0;
 $5 = ($4|0)>=(55296);
 if ($5) {
  $6 = $0;
  $7 = ($6|0)<=(57343);
  if ($7) {
   $0 = 65533;
  }
 }
 $8 = $0;
 $9 = ($8|0)<(128);
 if ($9) {
  $clen = 1;
  $10 = $0;
  $11 = $10&255;
  $12 = $1;
  HEAP8[$12>>0] = $11;
  $71 = $clen;
  STACKTOP = sp;return ($71|0);
 }
 $13 = $0;
 $14 = ($13|0)<(2048);
 if ($14) {
  $clen = 2;
  $15 = $0;
  $16 = $15 >> 6;
  $17 = 192 | $16;
  $18 = $17&255;
  $19 = $1;
  HEAP8[$19>>0] = $18;
  $20 = $0;
  $21 = $20 & 63;
  $22 = 128 | $21;
  $23 = $22&255;
  $24 = $1;
  $25 = (($24) + 1|0);
  HEAP8[$25>>0] = $23;
 } else {
  $26 = $0;
  $27 = ($26|0)<(65536);
  if ($27) {
   $clen = 3;
   $28 = $0;
   $29 = $28 >> 12;
   $30 = 224 | $29;
   $31 = $30&255;
   $32 = $1;
   HEAP8[$32>>0] = $31;
   $33 = $0;
   $34 = $33 >> 6;
   $35 = $34 & 63;
   $36 = 128 | $35;
   $37 = $36&255;
   $38 = $1;
   $39 = (($38) + 1|0);
   HEAP8[$39>>0] = $37;
   $40 = $0;
   $41 = $40 & 63;
   $42 = 128 | $41;
   $43 = $42&255;
   $44 = $1;
   $45 = (($44) + 2|0);
   HEAP8[$45>>0] = $43;
  } else {
   $clen = 4;
   $46 = $0;
   $47 = $46 >> 18;
   $48 = 240 | $47;
   $49 = $48&255;
   $50 = $1;
   HEAP8[$50>>0] = $49;
   $51 = $0;
   $52 = $51 >> 12;
   $53 = $52 & 63;
   $54 = 128 | $53;
   $55 = $54&255;
   $56 = $1;
   $57 = (($56) + 1|0);
   HEAP8[$57>>0] = $55;
   $58 = $0;
   $59 = $58 >> 6;
   $60 = $59 & 63;
   $61 = 128 | $60;
   $62 = $61&255;
   $63 = $1;
   $64 = (($63) + 2|0);
   HEAP8[$64>>0] = $62;
   $65 = $0;
   $66 = $65 & 63;
   $67 = 128 | $66;
   $68 = $67&255;
   $69 = $1;
   $70 = (($69) + 3|0);
   HEAP8[$70>>0] = $68;
  }
 }
 $71 = $clen;
 STACKTOP = sp;return ($71|0);
}
function _parse($len,$inp) {
 $len = $len|0;
 $inp = $inp|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $1000 = 0, $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0, $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0;
 var $1015 = 0, $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0, $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0, $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0;
 var $1033 = 0, $1034 = 0, $1035 = 0, $1036 = 0, $1037 = 0, $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0, $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0;
 var $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0, $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0, $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0;
 var $107 = 0, $1070 = 0, $1071 = 0, $1072 = 0, $1073 = 0, $1074 = 0, $1075 = 0, $1076 = 0, $1077 = 0, $1078 = 0, $1079 = 0, $108 = 0, $1080 = 0, $1081 = 0, $1082 = 0, $1083 = 0, $1084 = 0, $1085 = 0, $1086 = 0, $1087 = 0;
 var $1088 = 0, $1089 = 0, $109 = 0, $1090 = 0, $1091 = 0, $1092 = 0, $1093 = 0, $1094 = 0, $1095 = 0, $1096 = 0, $1097 = 0, $1098 = 0, $1099 = 0, $11 = 0, $110 = 0, $1100 = 0, $1101 = 0, $1102 = 0, $1103 = 0, $1104 = 0;
 var $1105 = 0, $1106 = 0, $1107 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0;
 var $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0;
 var $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0;
 var $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0;
 var $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0;
 var $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0;
 var $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0;
 var $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0;
 var $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0;
 var $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0;
 var $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0;
 var $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0;
 var $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0;
 var $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0;
 var $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0;
 var $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0;
 var $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0;
 var $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0;
 var $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0;
 var $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0;
 var $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0;
 var $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0;
 var $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0;
 var $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0;
 var $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0;
 var $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0;
 var $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0;
 var $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0;
 var $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0;
 var $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0;
 var $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0;
 var $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0;
 var $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0;
 var $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0;
 var $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0;
 var $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0;
 var $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0;
 var $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0, $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0;
 var $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0;
 var $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0;
 var $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0;
 var $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0;
 var $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0;
 var $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0;
 var $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0, $912 = 0, $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0;
 var $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0, $930 = 0, $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0;
 var $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0, $949 = 0, $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0;
 var $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0, $967 = 0, $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0;
 var $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0, $985 = 0, $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0;
 var $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $clen = 0, $ebuf = 0, $eptr = 0, $escaped = 0, $flag = 0, $hchar = 0, $i = 0, $newstr = 0, $offs = 0, $tmps = 0, $xval = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $ebuf = sp + 52|0;
 $1 = $len;
 $2 = $inp;
 $offs = 0;
 $3 = HEAP32[2032>>2]|0;
 $4 = ($3|0)==(-5);
 if ($4) {
  $0 = 0;
  $1107 = $0;
  STACKTOP = sp;return ($1107|0);
 }
 $5 = HEAP32[2000>>2]|0;
 $6 = ($5|0)==(0);
 if ($6) {
  $7 = HEAP32[2032>>2]|0;
  $8 = ($7|0)==(-3);
  if ($8) {
   HEAP32[2032>>2] = -2;
  }
 }
 $9 = HEAP32[2008>>2]|0;
 $10 = ($9|0)==(0|0);
 if ($10) {
  HEAP32[2016>>2] = 1024;
  $11 = HEAP32[2016>>2]|0;
  $12 = (_malloc($11)|0);
  HEAP32[2008>>2] = $12;
 }
 $13 = HEAP32[1984>>2]|0;
 $14 = ($13|0)==(0|0);
 if ($14) {
  HEAP32[1992>>2] = 16;
  $15 = HEAP32[1992>>2]|0;
  $16 = $15<<2;
  $17 = (_malloc($16)|0);
  HEAP32[1984>>2] = $17;
 }
 L15: while(1) {
  $18 = $offs;
  $19 = $1;
  $20 = ($18>>>0)<($19>>>0);
  if (!($20)) {
   label = 254;
   break;
  }
  $21 = HEAP32[1992>>2]|0;
  $22 = HEAP32[2000>>2]|0;
  $23 = ($21|0)<=($22|0);
  if ($23) {
   $24 = HEAP32[2000>>2]|0;
   $25 = (($24) + 8)|0;
   HEAP32[1992>>2] = $25;
   $26 = HEAP32[1984>>2]|0;
   $27 = HEAP32[1992>>2]|0;
   $28 = $27<<2;
   $29 = (_realloc($26,$28)|0);
   HEAP32[1984>>2] = $29;
  }
  $escaped = 0;
  $clen = 0;
  $30 = $2;
  $31 = $offs;
  $32 = (($30) + ($31)|0);
  $eptr = $32;
  $33 = $eptr;
  $34 = HEAP8[$33>>0]|0;
  $35 = $34 << 24 >> 24;
  $36 = ($35|0)==(92);
  if ($36) {
   $escaped = 1;
   $37 = $1;
   $38 = $offs;
   $39 = (($37) - ($38))|0;
   $40 = ($39>>>0)<(2);
   if ($40) {
    label = 16;
    break;
   }
   $42 = $eptr;
   $43 = (($42) + 1|0);
   $44 = HEAP8[$43>>0]|0;
   $45 = $44 << 24 >> 24;
   do {
    switch ($45|0) {
    case 99:  {
     $50 = $1;
     $51 = $offs;
     $52 = (($50) - ($51))|0;
     $53 = ($52>>>0)<(3);
     if ($53) {
      label = 21;
      break L15;
     }
     $55 = $eptr;
     $56 = (($55) + 2|0);
     $57 = HEAP8[$56>>0]|0;
     $58 = $57 << 24 >> 24;
     $59 = ($58|0)>=(65);
     if ($59) {
      $60 = $eptr;
      $61 = (($60) + 2|0);
      $62 = HEAP8[$61>>0]|0;
      $63 = $62 << 24 >> 24;
      $64 = ($63|0)<=(90);
      if (!($64)) {
       label = 24;
      }
     } else {
      label = 24;
     }
     do {
      if ((label|0) == 24) {
       label = 0;
       $65 = $eptr;
       $66 = (($65) + 2|0);
       $67 = HEAP8[$66>>0]|0;
       $68 = $67 << 24 >> 24;
       $69 = ($68|0)>=(97);
       if ($69) {
        $70 = $eptr;
        $71 = (($70) + 2|0);
        $72 = HEAP8[$71>>0]|0;
        $73 = $72 << 24 >> 24;
        $74 = ($73|0)<=(122);
        if ($74) {
         break;
        }
       }
       $84 = $offs;
       $85 = (($84) + 1)|0;
       $offs = $85;
       continue L15;
      }
     } while(0);
     $75 = $eptr;
     $76 = (($75) + 2|0);
     $77 = HEAP8[$76>>0]|0;
     $78 = $77 << 24 >> 24;
     $79 = $78 | 32;
     $80 = $79 ^ 96;
     $81 = $80&255;
     HEAP8[$ebuf>>0] = $81;
     $eptr = $ebuf;
     $82 = $offs;
     $83 = (($82) + 2)|0;
     $offs = $83;
     $clen = 1;
     break;
    }
    case 101:  {
     HEAP8[$ebuf>>0] = 27;
     $eptr = $ebuf;
     $86 = $offs;
     $87 = (($86) + 1)|0;
     $offs = $87;
     $clen = 1;
     break;
    }
    case 102:  {
     HEAP8[$ebuf>>0] = 12;
     $eptr = $ebuf;
     $88 = $offs;
     $89 = (($88) + 1)|0;
     $offs = $89;
     $clen = 1;
     break;
    }
    case 110:  {
     HEAP8[$ebuf>>0] = 10;
     $eptr = $ebuf;
     $90 = $offs;
     $91 = (($90) + 1)|0;
     $offs = $91;
     $clen = 1;
     break;
    }
    case 114:  {
     HEAP8[$ebuf>>0] = 13;
     $eptr = $ebuf;
     $92 = $offs;
     $93 = (($92) + 1)|0;
     $offs = $93;
     $clen = 1;
     break;
    }
    case 116:  {
     HEAP8[$ebuf>>0] = 9;
     $eptr = $ebuf;
     $94 = $offs;
     $95 = (($94) + 1)|0;
     $offs = $95;
     $clen = 1;
     break;
    }
    case 97:  {
     HEAP8[$ebuf>>0] = 7;
     $eptr = $ebuf;
     $46 = $offs;
     $47 = (($46) + 1)|0;
     $offs = $47;
     $clen = 1;
     break;
    }
    case 88: case 120:  {
     $96 = $1;
     $97 = $offs;
     $98 = (($96) - ($97))|0;
     $99 = ($98>>>0)<(3);
     if ($99) {
      label = 35;
      break L15;
     }
     $101 = $eptr;
     $102 = (($101) + 2|0);
     $103 = HEAP8[$102>>0]|0;
     $104 = $103 << 24 >> 24;
     $105 = ($104|0)==(123);
     do {
      if ($105) {
       $i = 3;
       $xval = 0;
       L137: while(1) {
        $106 = $1;
        $107 = $offs;
        $108 = (($106) - ($107))|0;
        $109 = $i;
        $110 = (($109) + 1)|0;
        $111 = ($108>>>0)<($110>>>0);
        if ($111) {
         label = 39;
         break L15;
        }
        $113 = $i;
        $114 = $eptr;
        $115 = (($114) + ($113)|0);
        $116 = HEAP8[$115>>0]|0;
        $117 = $116 << 24 >> 24;
        $118 = ($117|0)>=(48);
        if ($118) {
         $119 = $i;
         $120 = $eptr;
         $121 = (($120) + ($119)|0);
         $122 = HEAP8[$121>>0]|0;
         $123 = $122 << 24 >> 24;
         $124 = ($123|0)<=(57);
         if (!($124)) {
          label = 42;
         }
        } else {
         label = 42;
        }
        do {
         if ((label|0) == 42) {
          label = 0;
          $125 = $i;
          $126 = $eptr;
          $127 = (($126) + ($125)|0);
          $128 = HEAP8[$127>>0]|0;
          $129 = $128 << 24 >> 24;
          $130 = ($129|0)>=(97);
          if ($130) {
           $131 = $i;
           $132 = $eptr;
           $133 = (($132) + ($131)|0);
           $134 = HEAP8[$133>>0]|0;
           $135 = $134 << 24 >> 24;
           $136 = ($135|0)<=(102);
           if ($136) {
            break;
           }
          }
          $137 = $i;
          $138 = $eptr;
          $139 = (($138) + ($137)|0);
          $140 = HEAP8[$139>>0]|0;
          $141 = $140 << 24 >> 24;
          $142 = ($141|0)>=(65);
          if (!($142)) {
           break L137;
          }
          $143 = $i;
          $144 = $eptr;
          $145 = (($144) + ($143)|0);
          $146 = HEAP8[$145>>0]|0;
          $147 = $146 << 24 >> 24;
          $148 = ($147|0)<=(70);
          if (!($148)) {
           break L137;
          }
         }
        } while(0);
        $149 = $xval;
        $150 = $149 << 4;
        $xval = $150;
        $151 = $i;
        $152 = $eptr;
        $153 = (($152) + ($151)|0);
        $154 = HEAP8[$153>>0]|0;
        $155 = $154 << 24 >> 24;
        $156 = $155 & 64;
        $157 = ($156|0)!=(0);
        if ($157) {
         $158 = $i;
         $159 = $eptr;
         $160 = (($159) + ($158)|0);
         $161 = HEAP8[$160>>0]|0;
         $162 = $161 << 24 >> 24;
         $163 = $162 & 15;
         $164 = (($163) + 9)|0;
         $173 = $164;
        } else {
         $165 = $i;
         $166 = $eptr;
         $167 = (($166) + ($165)|0);
         $168 = HEAP8[$167>>0]|0;
         $169 = $168 << 24 >> 24;
         $170 = $169 & 15;
         $173 = $170;
        }
        $171 = $xval;
        $172 = (($171) + ($173))|0;
        $xval = $172;
        $174 = $i;
        $175 = (($174) + 1)|0;
        $i = $175;
       }
       $176 = $i;
       $177 = (($176) + 1)|0;
       $178 = $offs;
       $179 = (($178) + ($177))|0;
       $offs = $179;
       $180 = $i;
       $181 = ($180|0)>(9);
       if ($181) {
        $xval = 65533;
       }
       $182 = $i;
       $183 = $eptr;
       $184 = (($183) + ($182)|0);
       $185 = HEAP8[$184>>0]|0;
       $186 = $185 << 24 >> 24;
       $187 = ($186|0)!=(125);
       if ($187) {
        continue L15;
       } else {
        break;
       }
      } else {
       $188 = $eptr;
       $189 = (($188) + 1|0);
       $190 = HEAP8[$189>>0]|0;
       $191 = $190 << 24 >> 24;
       $192 = ($191|0)==(120);
       L46: do {
        if ($192) {
         $193 = $1;
         $194 = $offs;
         $195 = (($193) - ($194))|0;
         $196 = ($195>>>0)<(4);
         if ($196) {
          label = 59;
          break L15;
         }
         $198 = $offs;
         $199 = (($198) + 4)|0;
         $offs = $199;
         $200 = $eptr;
         $201 = (($200) + 2|0);
         $202 = HEAP8[$201>>0]|0;
         $203 = $202 << 24 >> 24;
         $204 = ($203|0)>=(48);
         if ($204) {
          $205 = $eptr;
          $206 = (($205) + 2|0);
          $207 = HEAP8[$206>>0]|0;
          $208 = $207 << 24 >> 24;
          $209 = ($208|0)<=(57);
          if ($209) {
           label = 66;
          } else {
           label = 62;
          }
         } else {
          label = 62;
         }
         do {
          if ((label|0) == 62) {
           label = 0;
           $210 = $eptr;
           $211 = (($210) + 2|0);
           $212 = HEAP8[$211>>0]|0;
           $213 = $212 << 24 >> 24;
           $214 = ($213|0)>=(97);
           if ($214) {
            $215 = $eptr;
            $216 = (($215) + 2|0);
            $217 = HEAP8[$216>>0]|0;
            $218 = $217 << 24 >> 24;
            $219 = ($218|0)<=(102);
            if ($219) {
             label = 66;
             break;
            }
           }
           $220 = $eptr;
           $221 = (($220) + 2|0);
           $222 = HEAP8[$221>>0]|0;
           $223 = $222 << 24 >> 24;
           $224 = ($223|0)>=(65);
           if (!($224)) {
            break;
           }
           $225 = $eptr;
           $226 = (($225) + 2|0);
           $227 = HEAP8[$226>>0]|0;
           $228 = $227 << 24 >> 24;
           $229 = ($228|0)<=(70);
           if ($229) {
            label = 66;
           }
          }
         } while(0);
         L57: do {
          if ((label|0) == 66) {
           label = 0;
           $230 = $eptr;
           $231 = (($230) + 3|0);
           $232 = HEAP8[$231>>0]|0;
           $233 = $232 << 24 >> 24;
           $234 = ($233|0)>=(48);
           if ($234) {
            $235 = $eptr;
            $236 = (($235) + 3|0);
            $237 = HEAP8[$236>>0]|0;
            $238 = $237 << 24 >> 24;
            $239 = ($238|0)<=(57);
            if (!($239)) {
             label = 68;
            }
           } else {
            label = 68;
           }
           do {
            if ((label|0) == 68) {
             label = 0;
             $240 = $eptr;
             $241 = (($240) + 3|0);
             $242 = HEAP8[$241>>0]|0;
             $243 = $242 << 24 >> 24;
             $244 = ($243|0)>=(97);
             if ($244) {
              $245 = $eptr;
              $246 = (($245) + 3|0);
              $247 = HEAP8[$246>>0]|0;
              $248 = $247 << 24 >> 24;
              $249 = ($248|0)<=(102);
              if ($249) {
               break;
              }
             }
             $250 = $eptr;
             $251 = (($250) + 3|0);
             $252 = HEAP8[$251>>0]|0;
             $253 = $252 << 24 >> 24;
             $254 = ($253|0)>=(65);
             if (!($254)) {
              break L57;
             }
             $255 = $eptr;
             $256 = (($255) + 3|0);
             $257 = HEAP8[$256>>0]|0;
             $258 = $257 << 24 >> 24;
             $259 = ($258|0)<=(70);
             if (!($259)) {
              break L57;
             }
            }
           } while(0);
           $260 = $eptr;
           $261 = (($260) + 2|0);
           $262 = HEAP8[$261>>0]|0;
           $263 = $262 << 24 >> 24;
           $264 = $263 & 64;
           $265 = ($264|0)!=(0);
           if ($265) {
            $266 = $eptr;
            $267 = (($266) + 2|0);
            $268 = HEAP8[$267>>0]|0;
            $269 = $268 << 24 >> 24;
            $270 = $269 & 15;
            $271 = (($270) + 9)|0;
            $278 = $271;
           } else {
            $272 = $eptr;
            $273 = (($272) + 2|0);
            $274 = HEAP8[$273>>0]|0;
            $275 = $274 << 24 >> 24;
            $276 = $275 & 15;
            $278 = $276;
           }
           $277 = $278 << 4;
           $279 = $eptr;
           $280 = (($279) + 3|0);
           $281 = HEAP8[$280>>0]|0;
           $282 = $281 << 24 >> 24;
           $283 = $282 & 64;
           $284 = ($283|0)!=(0);
           if ($284) {
            $285 = $eptr;
            $286 = (($285) + 3|0);
            $287 = HEAP8[$286>>0]|0;
            $288 = $287 << 24 >> 24;
            $289 = $288 & 15;
            $290 = (($289) + 9)|0;
            $297 = $290;
           } else {
            $291 = $eptr;
            $292 = (($291) + 3|0);
            $293 = HEAP8[$292>>0]|0;
            $294 = $293 << 24 >> 24;
            $295 = $294 & 15;
            $297 = $295;
           }
           $296 = (($277) + ($297))|0;
           $xval = $296;
           break L46;
          }
         } while(0);
         continue L15;
        } else {
         $298 = $1;
         $299 = $offs;
         $300 = (($298) - ($299))|0;
         $301 = ($300>>>0)<(6);
         if ($301) {
          label = 82;
          break L15;
         }
         $303 = $offs;
         $304 = (($303) + 6)|0;
         $offs = $304;
         $305 = $eptr;
         $306 = (($305) + 2|0);
         $307 = HEAP8[$306>>0]|0;
         $308 = $307 << 24 >> 24;
         $309 = ($308|0)>=(48);
         if ($309) {
          $310 = $eptr;
          $311 = (($310) + 2|0);
          $312 = HEAP8[$311>>0]|0;
          $313 = $312 << 24 >> 24;
          $314 = ($313|0)<=(57);
          if ($314) {
           label = 89;
          } else {
           label = 85;
          }
         } else {
          label = 85;
         }
         do {
          if ((label|0) == 85) {
           label = 0;
           $315 = $eptr;
           $316 = (($315) + 2|0);
           $317 = HEAP8[$316>>0]|0;
           $318 = $317 << 24 >> 24;
           $319 = ($318|0)>=(97);
           if ($319) {
            $320 = $eptr;
            $321 = (($320) + 2|0);
            $322 = HEAP8[$321>>0]|0;
            $323 = $322 << 24 >> 24;
            $324 = ($323|0)<=(102);
            if ($324) {
             label = 89;
             break;
            }
           }
           $325 = $eptr;
           $326 = (($325) + 2|0);
           $327 = HEAP8[$326>>0]|0;
           $328 = $327 << 24 >> 24;
           $329 = ($328|0)>=(65);
           if (!($329)) {
            break;
           }
           $330 = $eptr;
           $331 = (($330) + 2|0);
           $332 = HEAP8[$331>>0]|0;
           $333 = $332 << 24 >> 24;
           $334 = ($333|0)<=(70);
           if ($334) {
            label = 89;
           }
          }
         } while(0);
         L88: do {
          if ((label|0) == 89) {
           label = 0;
           $335 = $eptr;
           $336 = (($335) + 3|0);
           $337 = HEAP8[$336>>0]|0;
           $338 = $337 << 24 >> 24;
           $339 = ($338|0)>=(48);
           if ($339) {
            $340 = $eptr;
            $341 = (($340) + 3|0);
            $342 = HEAP8[$341>>0]|0;
            $343 = $342 << 24 >> 24;
            $344 = ($343|0)<=(57);
            if (!($344)) {
             label = 91;
            }
           } else {
            label = 91;
           }
           do {
            if ((label|0) == 91) {
             label = 0;
             $345 = $eptr;
             $346 = (($345) + 3|0);
             $347 = HEAP8[$346>>0]|0;
             $348 = $347 << 24 >> 24;
             $349 = ($348|0)>=(97);
             if ($349) {
              $350 = $eptr;
              $351 = (($350) + 3|0);
              $352 = HEAP8[$351>>0]|0;
              $353 = $352 << 24 >> 24;
              $354 = ($353|0)<=(102);
              if ($354) {
               break;
              }
             }
             $355 = $eptr;
             $356 = (($355) + 3|0);
             $357 = HEAP8[$356>>0]|0;
             $358 = $357 << 24 >> 24;
             $359 = ($358|0)>=(65);
             if (!($359)) {
              break L88;
             }
             $360 = $eptr;
             $361 = (($360) + 3|0);
             $362 = HEAP8[$361>>0]|0;
             $363 = $362 << 24 >> 24;
             $364 = ($363|0)<=(70);
             if (!($364)) {
              break L88;
             }
            }
           } while(0);
           $365 = $eptr;
           $366 = (($365) + 4|0);
           $367 = HEAP8[$366>>0]|0;
           $368 = $367 << 24 >> 24;
           $369 = ($368|0)>=(48);
           if ($369) {
            $370 = $eptr;
            $371 = (($370) + 4|0);
            $372 = HEAP8[$371>>0]|0;
            $373 = $372 << 24 >> 24;
            $374 = ($373|0)<=(57);
            if (!($374)) {
             label = 97;
            }
           } else {
            label = 97;
           }
           do {
            if ((label|0) == 97) {
             label = 0;
             $375 = $eptr;
             $376 = (($375) + 4|0);
             $377 = HEAP8[$376>>0]|0;
             $378 = $377 << 24 >> 24;
             $379 = ($378|0)>=(97);
             if ($379) {
              $380 = $eptr;
              $381 = (($380) + 4|0);
              $382 = HEAP8[$381>>0]|0;
              $383 = $382 << 24 >> 24;
              $384 = ($383|0)<=(102);
              if ($384) {
               break;
              }
             }
             $385 = $eptr;
             $386 = (($385) + 4|0);
             $387 = HEAP8[$386>>0]|0;
             $388 = $387 << 24 >> 24;
             $389 = ($388|0)>=(65);
             if (!($389)) {
              break L88;
             }
             $390 = $eptr;
             $391 = (($390) + 4|0);
             $392 = HEAP8[$391>>0]|0;
             $393 = $392 << 24 >> 24;
             $394 = ($393|0)<=(70);
             if (!($394)) {
              break L88;
             }
            }
           } while(0);
           $395 = $eptr;
           $396 = (($395) + 5|0);
           $397 = HEAP8[$396>>0]|0;
           $398 = $397 << 24 >> 24;
           $399 = ($398|0)>=(48);
           if ($399) {
            $400 = $eptr;
            $401 = (($400) + 5|0);
            $402 = HEAP8[$401>>0]|0;
            $403 = $402 << 24 >> 24;
            $404 = ($403|0)<=(57);
            if (!($404)) {
             label = 103;
            }
           } else {
            label = 103;
           }
           do {
            if ((label|0) == 103) {
             label = 0;
             $405 = $eptr;
             $406 = (($405) + 5|0);
             $407 = HEAP8[$406>>0]|0;
             $408 = $407 << 24 >> 24;
             $409 = ($408|0)>=(97);
             if ($409) {
              $410 = $eptr;
              $411 = (($410) + 5|0);
              $412 = HEAP8[$411>>0]|0;
              $413 = $412 << 24 >> 24;
              $414 = ($413|0)<=(102);
              if ($414) {
               break;
              }
             }
             $415 = $eptr;
             $416 = (($415) + 5|0);
             $417 = HEAP8[$416>>0]|0;
             $418 = $417 << 24 >> 24;
             $419 = ($418|0)>=(65);
             if (!($419)) {
              break L88;
             }
             $420 = $eptr;
             $421 = (($420) + 5|0);
             $422 = HEAP8[$421>>0]|0;
             $423 = $422 << 24 >> 24;
             $424 = ($423|0)<=(70);
             if (!($424)) {
              break L88;
             }
            }
           } while(0);
           $425 = $eptr;
           $426 = (($425) + 2|0);
           $427 = HEAP8[$426>>0]|0;
           $428 = $427 << 24 >> 24;
           $429 = $428 & 64;
           $430 = ($429|0)!=(0);
           if ($430) {
            $431 = $eptr;
            $432 = (($431) + 2|0);
            $433 = HEAP8[$432>>0]|0;
            $434 = $433 << 24 >> 24;
            $435 = $434 & 15;
            $436 = (($435) + 9)|0;
            $443 = $436;
           } else {
            $437 = $eptr;
            $438 = (($437) + 2|0);
            $439 = HEAP8[$438>>0]|0;
            $440 = $439 << 24 >> 24;
            $441 = $440 & 15;
            $443 = $441;
           }
           $442 = $443 << 12;
           $444 = $eptr;
           $445 = (($444) + 3|0);
           $446 = HEAP8[$445>>0]|0;
           $447 = $446 << 24 >> 24;
           $448 = $447 & 64;
           $449 = ($448|0)!=(0);
           if ($449) {
            $450 = $eptr;
            $451 = (($450) + 3|0);
            $452 = HEAP8[$451>>0]|0;
            $453 = $452 << 24 >> 24;
            $454 = $453 & 15;
            $455 = (($454) + 9)|0;
            $462 = $455;
           } else {
            $456 = $eptr;
            $457 = (($456) + 3|0);
            $458 = HEAP8[$457>>0]|0;
            $459 = $458 << 24 >> 24;
            $460 = $459 & 15;
            $462 = $460;
           }
           $461 = $462 << 8;
           $463 = (($442) + ($461))|0;
           $464 = $eptr;
           $465 = (($464) + 4|0);
           $466 = HEAP8[$465>>0]|0;
           $467 = $466 << 24 >> 24;
           $468 = $467 & 64;
           $469 = ($468|0)!=(0);
           if ($469) {
            $470 = $eptr;
            $471 = (($470) + 4|0);
            $472 = HEAP8[$471>>0]|0;
            $473 = $472 << 24 >> 24;
            $474 = $473 & 15;
            $475 = (($474) + 9)|0;
            $482 = $475;
           } else {
            $476 = $eptr;
            $477 = (($476) + 4|0);
            $478 = HEAP8[$477>>0]|0;
            $479 = $478 << 24 >> 24;
            $480 = $479 & 15;
            $482 = $480;
           }
           $481 = $482 << 4;
           $483 = (($463) + ($481))|0;
           $484 = $eptr;
           $485 = (($484) + 5|0);
           $486 = HEAP8[$485>>0]|0;
           $487 = $486 << 24 >> 24;
           $488 = $487 & 64;
           $489 = ($488|0)!=(0);
           if ($489) {
            $490 = $eptr;
            $491 = (($490) + 5|0);
            $492 = HEAP8[$491>>0]|0;
            $493 = $492 << 24 >> 24;
            $494 = $493 & 15;
            $495 = (($494) + 9)|0;
            $502 = $495;
           } else {
            $496 = $eptr;
            $497 = (($496) + 5|0);
            $498 = HEAP8[$497>>0]|0;
            $499 = $498 << 24 >> 24;
            $500 = $499 & 15;
            $502 = $500;
           }
           $501 = (($483) + ($502))|0;
           $xval = $501;
           break L46;
          }
         } while(0);
         continue L15;
        }
       } while(0);
      }
     } while(0);
     $eptr = $ebuf;
     $503 = $xval;
     $504 = (_construct_utf8($503,$ebuf)|0);
     $clen = $504;
     $505 = $clen;
     $506 = $offs;
     $507 = (($506) - ($505))|0;
     $offs = $507;
     break;
    }
    case 98:  {
     HEAP8[$ebuf>>0] = 8;
     $eptr = $ebuf;
     $48 = $offs;
     $49 = (($48) + 1)|0;
     $offs = $49;
     $clen = 1;
     break;
    }
    default: {
     $508 = $eptr;
     $509 = (($508) + 1|0);
     $eptr = $509;
     $510 = $offs;
     $511 = (($510) + 1)|0;
     $offs = $511;
    }
    }
   } while(0);
  }
  $512 = $clen;
  $513 = ($512|0)>(0);
  if ($513) {
  } else {
   $514 = $eptr;
   $515 = HEAP8[$514>>0]|0;
   $516 = $515 << 24 >> 24;
   $517 = $516 & 128;
   $518 = ($517|0)==(0);
   if ($518) {
    $clen = 1;
   } else {
    $519 = $eptr;
    $520 = HEAP8[$519>>0]|0;
    $521 = $520 << 24 >> 24;
    $522 = $521 & 192;
    $523 = ($522|0)==(128);
    if ($523) {
     $524 = $offs;
     $525 = (($524) + 1)|0;
     $offs = $525;
     continue;
    }
    $526 = $eptr;
    $527 = HEAP8[$526>>0]|0;
    $528 = $527 << 24 >> 24;
    $529 = $528 & 224;
    $530 = ($529|0)==(192);
    do {
     if ($530) {
      $531 = $1;
      $532 = $offs;
      $533 = (($531) - ($532))|0;
      $534 = ($533>>>0)<(2);
      if ($534) {
       label = 134;
       break L15;
      }
      $538 = $eptr;
      $539 = (($538) + 1|0);
      $540 = HEAP8[$539>>0]|0;
      $541 = $540 << 24 >> 24;
      $542 = $541 & 192;
      $543 = ($542|0)!=(128);
      if ($543) {
       $544 = $offs;
       $545 = (($544) + 2)|0;
       $offs = $545;
       continue L15;
      }
      $546 = $eptr;
      $547 = HEAP8[$546>>0]|0;
      $548 = $547 << 24 >> 24;
      $549 = $548 & 254;
      $550 = ($549|0)==(192);
      if ($550) {
       $551 = $offs;
       $552 = (($551) + 2)|0;
       $offs = $552;
       continue L15;
      } else {
       $clen = 2;
       break;
      }
     } else {
      $553 = $eptr;
      $554 = HEAP8[$553>>0]|0;
      $555 = $554 << 24 >> 24;
      $556 = $555 & 240;
      $557 = ($556|0)==(224);
      L185: do {
       if ($557) {
        $558 = $1;
        $559 = $offs;
        $560 = (($558) - ($559))|0;
        $561 = ($560>>>0)<(3);
        if ($561) {
         label = 142;
         break L15;
        }
        $565 = $eptr;
        $566 = (($565) + 1|0);
        $567 = HEAP8[$566>>0]|0;
        $568 = $567 << 24 >> 24;
        $569 = $568 & 192;
        $570 = ($569|0)!=(128);
        do {
         if (!($570)) {
          $571 = $eptr;
          $572 = (($571) + 2|0);
          $573 = HEAP8[$572>>0]|0;
          $574 = $573 << 24 >> 24;
          $575 = $574 & 192;
          $576 = ($575|0)!=(128);
          if ($576) {
           break;
          }
          $579 = $eptr;
          $580 = HEAP8[$579>>0]|0;
          $581 = $580 << 24 >> 24;
          $582 = $581 & 255;
          $583 = ($582|0)==(237);
          do {
           if ($583) {
            $584 = $eptr;
            $585 = (($584) + 1|0);
            $586 = HEAP8[$585>>0]|0;
            $587 = $586 << 24 >> 24;
            $588 = $587 & 224;
            $589 = ($588|0)==(160);
            if (!($589)) {
             break;
            }
            $590 = $offs;
            $591 = (($590) + 3)|0;
            $offs = $591;
            continue L15;
           }
          } while(0);
          $592 = $eptr;
          $593 = HEAP8[$592>>0]|0;
          $594 = $593 << 24 >> 24;
          $595 = $594 & 255;
          $596 = ($595|0)==(224);
          do {
           if ($596) {
            $597 = $eptr;
            $598 = (($597) + 1|0);
            $599 = HEAP8[$598>>0]|0;
            $600 = $599 << 24 >> 24;
            $601 = $600 & 224;
            $602 = ($601|0)==(128);
            if (!($602)) {
             break;
            }
            $603 = $offs;
            $604 = (($603) + 3)|0;
            $offs = $604;
            continue L15;
           }
          } while(0);
          $clen = 3;
          break L185;
         }
        } while(0);
        $577 = $offs;
        $578 = (($577) + 3)|0;
        $offs = $578;
        continue L15;
       } else {
        $605 = $eptr;
        $606 = HEAP8[$605>>0]|0;
        $607 = $606 << 24 >> 24;
        $608 = $607 & 248;
        $609 = ($608|0)==(240);
        if (!($609)) {
         $668 = $offs;
         $669 = (($668) + 1)|0;
         $offs = $669;
         continue L15;
        }
        $610 = $1;
        $611 = $offs;
        $612 = (($610) - ($611))|0;
        $613 = ($612>>>0)<(4);
        if ($613) {
         label = 155;
         break L15;
        }
        $617 = $eptr;
        $618 = (($617) + 1|0);
        $619 = HEAP8[$618>>0]|0;
        $620 = $619 << 24 >> 24;
        $621 = $620 & 192;
        $622 = ($621|0)!=(128);
        do {
         if (!($622)) {
          $623 = $eptr;
          $624 = (($623) + 2|0);
          $625 = HEAP8[$624>>0]|0;
          $626 = $625 << 24 >> 24;
          $627 = $626 & 192;
          $628 = ($627|0)!=(128);
          if ($628) {
           break;
          }
          $629 = $eptr;
          $630 = (($629) + 3|0);
          $631 = HEAP8[$630>>0]|0;
          $632 = $631 << 24 >> 24;
          $633 = $632 & 192;
          $634 = ($633|0)!=(128);
          if ($634) {
           break;
          }
          $637 = $eptr;
          $638 = HEAP8[$637>>0]|0;
          $639 = $638 << 24 >> 24;
          $640 = $639 & 255;
          $641 = ($640|0)==(244);
          if ($641) {
           $642 = $eptr;
           $643 = (($642) + 1|0);
           $644 = HEAP8[$643>>0]|0;
           $645 = $644 << 24 >> 24;
           $646 = $645 & 240;
           $647 = ($646|0)>(128);
           if (!($647)) {
            label = 162;
           }
          } else {
           label = 162;
          }
          do {
           if ((label|0) == 162) {
            label = 0;
            $648 = $eptr;
            $649 = HEAP8[$648>>0]|0;
            $650 = $649 << 24 >> 24;
            $651 = $650 & 255;
            $652 = ($651|0)>(244);
            if ($652) {
             break;
            }
            $655 = $eptr;
            $656 = HEAP8[$655>>0]|0;
            $657 = $656 << 24 >> 24;
            $658 = $657 & 255;
            $659 = ($658|0)==(240);
            do {
             if ($659) {
              $660 = $eptr;
              $661 = (($660) + 1|0);
              $662 = HEAP8[$661>>0]|0;
              $663 = $662 << 24 >> 24;
              $664 = $663 & 240;
              $665 = ($664|0)==(128);
              if (!($665)) {
               break;
              }
              $666 = $offs;
              $667 = (($666) + 4)|0;
              $offs = $667;
              continue L15;
             }
            } while(0);
            $clen = 4;
            break L185;
           }
          } while(0);
          $653 = $offs;
          $654 = (($653) + 4)|0;
          $offs = $654;
          continue L15;
         }
        } while(0);
        $635 = $offs;
        $636 = (($635) + 4)|0;
        $offs = $636;
        continue L15;
       }
      } while(0);
     }
    } while(0);
   }
  }
  $670 = HEAP32[2032>>2]|0;
  $671 = ($670|0)<(-1);
  if ($671) {
   $672 = $clen;
   $673 = ($672|0)==(1);
   if ($673) {
    $674 = $eptr;
    $675 = HEAP8[$674>>0]|0;
    $676 = $675&255;
    $677 = ($676|0)<=(32);
    if ($677) {
     $678 = $escaped;
     $679 = ($678|0)!=(0);
     if (!($679)) {
      $680 = HEAP32[2040>>2]|0;
      $681 = ($680|0)!=(0);
      if ($681) {
       $682 = $eptr;
       $683 = HEAP8[$682>>0]|0;
       $684 = $683 << 24 >> 24;
       (_putchar(($684|0))|0);
      }
      $685 = $offs;
      $686 = (($685) + 1)|0;
      $offs = $686;
      continue;
     }
    }
   }
   HEAP32[2040>>2] = 0;
   $687 = $clen;
   $688 = $eptr;
   $689 = (_new_string($687,$688)|0);
   $hchar = $689;
   $690 = HEAP32[2032>>2]|0;
   $691 = ($690|0)!=(-2);
   if ($691) {
    $692 = $hchar;
    $693 = (($692) + 24|0);
    $694 = HEAP32[$693>>2]|0;
    $695 = ($694|0)==(-1);
    if ($695) {
     $696 = $escaped;
     $697 = ($696|0)!=(0);
     if (!($697)) {
      label = 184;
      break;
     }
    }
   }
   $700 = $hchar;
   $701 = (($700) + 24|0);
   $702 = HEAP32[$701>>2]|0;
   $703 = ($702|0)>=(-1);
   if ($703) {
    $704 = $hchar;
    $705 = (($704) + 4|0);
    $706 = HEAP32[$705>>2]|0;
    $707 = ($706|0)!=(0|0);
    if ($707) {
     $708 = $escaped;
     $709 = ($708|0)!=(0);
     if ($709) {
      label = 189;
     } else {
      $710 = $hchar;
      $711 = (($710) + 4|0);
      $712 = HEAP32[$711>>2]|0;
      HEAP32[2064>>2] = $712;
      $713 = $clen;
      $714 = $offs;
      $715 = (($714) + ($713))|0;
      $offs = $715;
      $716 = $hchar;
      $717 = (($716) + 24|0);
      $718 = HEAP32[$717>>2]|0;
      HEAP32[2032>>2] = $718;
      $719 = $hchar;
      _delete_string($719);
     }
    } else {
     label = 189;
    }
   } else {
    label = 189;
   }
   if ((label|0) == 189) {
    label = 0;
    $720 = $hchar;
    $721 = (($720) + 24|0);
    $722 = HEAP32[$721>>2]|0;
    $723 = ($722|0)>=(-1);
    if ($723) {
     $724 = $escaped;
     $725 = ($724|0)!=(0);
     if (!($725)) {
      $726 = $hchar;
      HEAP32[2064>>2] = $726;
      $727 = $hchar;
      $728 = (($727) + 24|0);
      $729 = HEAP32[$728>>2]|0;
      HEAP32[2032>>2] = $729;
      $730 = $clen;
      if ((($730|0) == 4)) {
       $731 = $eptr;
       $732 = (($731) + 3|0);
       $733 = HEAP8[$732>>0]|0;
       $734 = HEAP32[2008>>2]|0;
       $735 = (($734) + 3|0);
       HEAP8[$735>>0] = $733;
       label = 193;
      } else if ((($730|0) == 3)) {
       label = 193;
      } else if ((($730|0) == 2)) {
       label = 194;
      } else if ((($730|0) == 1)) {
       label = 195;
      }
      if ((label|0) == 193) {
       label = 0;
       $736 = $eptr;
       $737 = (($736) + 2|0);
       $738 = HEAP8[$737>>0]|0;
       $739 = HEAP32[2008>>2]|0;
       $740 = (($739) + 2|0);
       HEAP8[$740>>0] = $738;
       label = 194;
      }
      if ((label|0) == 194) {
       label = 0;
       $741 = $eptr;
       $742 = (($741) + 1|0);
       $743 = HEAP8[$742>>0]|0;
       $744 = HEAP32[2008>>2]|0;
       $745 = (($744) + 1|0);
       HEAP8[$745>>0] = $743;
       label = 195;
      }
      if ((label|0) == 195) {
       label = 0;
       $746 = $eptr;
       $747 = HEAP8[$746>>0]|0;
       $748 = HEAP32[2008>>2]|0;
       HEAP8[$748>>0] = $747;
      }
      $749 = $clen;
      HEAP32[2024>>2] = $749;
      $750 = $hchar;
      _delete_string($750);
      continue;
     }
    }
    $751 = HEAP32[2048>>2]|0;
    $752 = ($751|0)!=(0|0);
    if (!($752)) {
     $753 = (_new_string(1,2072)|0);
     HEAP32[2048>>2] = $753;
    }
    $754 = HEAP32[2032>>2]|0;
    $755 = ($754|0)!=(-2);
    if ($755) {
     label = 200;
     break;
    }
    $758 = (_new_node()|0);
    $759 = HEAP32[2000>>2]|0;
    $760 = HEAP32[1984>>2]|0;
    $761 = (($760) + ($759<<2)|0);
    HEAP32[$761>>2] = $758;
    $762 = $hchar;
    $763 = HEAP32[2000>>2]|0;
    $764 = HEAP32[1984>>2]|0;
    $765 = (($764) + ($763<<2)|0);
    $766 = HEAP32[$765>>2]|0;
    HEAP32[$766>>2] = $762;
    $767 = HEAP32[2048>>2]|0;
    $768 = HEAP32[2000>>2]|0;
    $769 = HEAP32[1984>>2]|0;
    $770 = (($769) + ($768<<2)|0);
    $771 = HEAP32[$770>>2]|0;
    $772 = (($771) + 4|0);
    HEAP32[$772>>2] = $767;
    $773 = HEAP32[2000>>2]|0;
    $774 = HEAP32[1984>>2]|0;
    $775 = (($774) + ($773<<2)|0);
    $776 = HEAP32[$775>>2]|0;
    $777 = (($776) + 28|0);
    HEAP32[$777>>2] = 0;
    $778 = HEAP32[2000>>2]|0;
    $779 = HEAP32[1984>>2]|0;
    $780 = (($779) + ($778<<2)|0);
    $781 = HEAP32[$780>>2]|0;
    $782 = (($781) + 32|0);
    HEAP32[$782>>2] = 1;
    $783 = HEAP32[2048>>2]|0;
    $784 = (($783) + 20|0);
    $785 = HEAP32[$784>>2]|0;
    $786 = (($785) + 1)|0;
    HEAP32[$784>>2] = $786;
    $787 = HEAP32[2000>>2]|0;
    $788 = (($787) + 1)|0;
    HEAP32[2000>>2] = $788;
    $789 = $clen;
    $790 = $offs;
    $791 = (($790) + ($789))|0;
    $offs = $791;
    $792 = HEAP32[2000>>2]|0;
    $793 = ($792|0)==(1);
    if ($793) {
     label = 202;
     break;
    }
    HEAP32[2032>>2] = -2;
   }
  } else {
   $795 = $clen;
   $796 = $eptr;
   $797 = (_new_string($795,$796)|0);
   $hchar = $797;
   $798 = $hchar;
   $799 = HEAP32[2064>>2]|0;
   $800 = ($798|0)==($799|0);
   if ($800) {
    $801 = $escaped;
    $802 = ($801|0)!=(0);
    if ($802) {
     label = 222;
    } else {
     $803 = HEAP32[2024>>2]|0;
     $804 = ($803|0)>(0);
     if ($804) {
      $805 = HEAP32[2024>>2]|0;
      $806 = HEAP32[2008>>2]|0;
      $807 = (_new_string($805,$806)|0);
      $newstr = $807;
      HEAP32[2024>>2] = 0;
      $808 = HEAP32[432>>2]|0;
      $809 = ($808|0)!=(0);
      do {
       if ($809) {
        $810 = $newstr;
        $811 = (($810) + 8|0);
        $812 = HEAP32[$811>>2]|0;
        $813 = ($812|0)!=(0|0);
        if ($813) {
         $814 = $newstr;
         $815 = (($814) + 12|0);
         $816 = HEAP32[$815>>2]|0;
         $817 = HEAP8[$816>>0]|0;
         $818 = $817 << 24 >> 24;
         $819 = ($818|0)>=(97);
         if ($819) {
          $820 = $newstr;
          $821 = (($820) + 12|0);
          $822 = HEAP32[$821>>2]|0;
          $823 = HEAP8[$822>>0]|0;
          $824 = $823 << 24 >> 24;
          $825 = ($824|0)<=(122);
          if ($825) {
           $826 = HEAP32[2032>>2]|0;
           $827 = $newstr;
           $828 = (($827) + 24|0);
           $829 = HEAP32[$828>>2]|0;
           $830 = ($826|0)==($829|0);
           if (!($830)) {
            break;
           }
           $831 = $newstr;
           $832 = (($831) + 8|0);
           $833 = HEAP32[$832>>2]|0;
           $tmps = $833;
           $834 = $newstr;
           _delete_string($834);
           $835 = $tmps;
           $836 = (($835) + 20|0);
           $837 = HEAP32[$836>>2]|0;
           $838 = (($837) + 1)|0;
           HEAP32[$836>>2] = $838;
           $839 = $tmps;
           $newstr = $839;
          }
         }
        }
       }
      } while(0);
      $840 = HEAP32[2032>>2]|0;
      $841 = ($840|0)==(-1);
      if ($841) {
       $842 = $newstr;
       HEAP32[2056>>2] = $842;
       HEAP32[2032>>2] = -4;
      } else {
       $843 = (_new_node()|0);
       $844 = HEAP32[2000>>2]|0;
       $845 = HEAP32[1984>>2]|0;
       $846 = (($845) + ($844<<2)|0);
       HEAP32[$846>>2] = $843;
       $847 = HEAP32[2056>>2]|0;
       $848 = HEAP32[2000>>2]|0;
       $849 = HEAP32[1984>>2]|0;
       $850 = (($849) + ($848<<2)|0);
       $851 = HEAP32[$850>>2]|0;
       HEAP32[$851>>2] = $847;
       $852 = $newstr;
       $853 = HEAP32[2000>>2]|0;
       $854 = HEAP32[1984>>2]|0;
       $855 = (($854) + ($853<<2)|0);
       $856 = HEAP32[$855>>2]|0;
       $857 = (($856) + 4|0);
       HEAP32[$857>>2] = $852;
       $858 = HEAP32[2032>>2]|0;
       $859 = HEAP32[2000>>2]|0;
       $860 = HEAP32[1984>>2]|0;
       $861 = (($860) + ($859<<2)|0);
       $862 = HEAP32[$861>>2]|0;
       $863 = (($862) + 28|0);
       HEAP32[$863>>2] = $858;
       $864 = HEAP32[2032>>2]|0;
       $865 = ($864|0)==(0);
       if ($865) {
        $866 = HEAP32[2000>>2]|0;
        $867 = HEAP32[1984>>2]|0;
        $868 = (($867) + ($866<<2)|0);
        $869 = HEAP32[$868>>2]|0;
        $870 = (($869) + 32|0);
        HEAP32[$870>>2] = 1;
       }
       HEAP32[2056>>2] = 0;
       $871 = HEAP32[2000>>2]|0;
       $872 = (($871) + 1)|0;
       HEAP32[2000>>2] = $872;
       HEAP32[2032>>2] = -2;
      }
      $873 = $clen;
      $874 = $offs;
      $875 = (($874) + ($873))|0;
      $offs = $875;
      HEAP32[2064>>2] = 0;
     } else {
      label = 222;
     }
    }
   } else {
    label = 222;
   }
   if ((label|0) == 222) {
    label = 0;
    $876 = HEAP32[2024>>2]|0;
    $877 = $clen;
    $878 = (($876) + ($877))|0;
    $879 = HEAP32[2016>>2]|0;
    $880 = ($878|0)>($879|0);
    if ($880) {
     $881 = HEAP32[2016>>2]|0;
     $882 = $881<<1;
     HEAP32[2016>>2] = $882;
     $883 = HEAP32[2008>>2]|0;
     $884 = HEAP32[2016>>2]|0;
     $885 = (_realloc($883,$884)|0);
     HEAP32[2008>>2] = $885;
    }
    $886 = $clen;
    if ((($886|0) == 4)) {
     $887 = $eptr;
     $888 = (($887) + 1|0);
     $eptr = $888;
     $889 = HEAP8[$887>>0]|0;
     $890 = HEAP32[2024>>2]|0;
     $891 = (($890) + 1)|0;
     HEAP32[2024>>2] = $891;
     $892 = HEAP32[2008>>2]|0;
     $893 = (($892) + ($890)|0);
     HEAP8[$893>>0] = $889;
     label = 226;
    } else if ((($886|0) == 3)) {
     label = 226;
    } else if ((($886|0) == 2)) {
     label = 227;
    } else if ((($886|0) == 1)) {
     label = 228;
    }
    if ((label|0) == 226) {
     label = 0;
     $894 = $eptr;
     $895 = (($894) + 1|0);
     $eptr = $895;
     $896 = HEAP8[$894>>0]|0;
     $897 = HEAP32[2024>>2]|0;
     $898 = (($897) + 1)|0;
     HEAP32[2024>>2] = $898;
     $899 = HEAP32[2008>>2]|0;
     $900 = (($899) + ($897)|0);
     HEAP8[$900>>0] = $896;
     label = 227;
    }
    if ((label|0) == 227) {
     label = 0;
     $901 = $eptr;
     $902 = (($901) + 1|0);
     $eptr = $902;
     $903 = HEAP8[$901>>0]|0;
     $904 = HEAP32[2024>>2]|0;
     $905 = (($904) + 1)|0;
     HEAP32[2024>>2] = $905;
     $906 = HEAP32[2008>>2]|0;
     $907 = (($906) + ($904)|0);
     HEAP8[$907>>0] = $903;
     label = 228;
    }
    if ((label|0) == 228) {
     label = 0;
     $908 = $eptr;
     $909 = HEAP8[$908>>0]|0;
     $910 = HEAP32[2024>>2]|0;
     $911 = (($910) + 1)|0;
     HEAP32[2024>>2] = $911;
     $912 = HEAP32[2008>>2]|0;
     $913 = (($912) + ($910)|0);
     HEAP8[$913>>0] = $909;
    }
    $914 = $clen;
    $915 = $offs;
    $916 = (($915) + ($914))|0;
    $offs = $916;
   }
   $917 = $hchar;
   _delete_string($917);
  }
  $918 = HEAP32[2000>>2]|0;
  $919 = ($918|0)>(0);
  if ($919) {
   $920 = HEAP32[2000>>2]|0;
   $921 = (($920) - 1)|0;
   $922 = HEAP32[1984>>2]|0;
   $923 = (($922) + ($921<<2)|0);
   $924 = HEAP32[$923>>2]|0;
   $925 = (($924) + 32|0);
   $926 = HEAP32[$925>>2]|0;
   $927 = ($926|0)!=(0);
   $929 = $927;
  } else {
   $929 = 0;
  }
  $928 = $929&1;
  $flag = $928;
  while(1) {
   $930 = $flag;
   $931 = ($930|0)!=(0);
   if (!($931)) {
    break;
   }
   $flag = 0;
   $932 = HEAP32[2000>>2]|0;
   $933 = ($932|0)==(1);
   if ($933) {
    label = 236;
    break L15;
   }
   $935 = HEAP32[2000>>2]|0;
   $936 = ($935|0)>=(2);
   if ($936) {
    $937 = HEAP32[2000>>2]|0;
    $938 = (($937) - 2)|0;
    $939 = HEAP32[1984>>2]|0;
    $940 = (($939) + ($938<<2)|0);
    $941 = HEAP32[$940>>2]|0;
    $942 = (($941) + 28|0);
    $943 = HEAP32[$942>>2]|0;
    $944 = ($943|0)==(1);
    if ($944) {
     $945 = HEAP32[2000>>2]|0;
     $946 = (($945) - 2)|0;
     $947 = HEAP32[1984>>2]|0;
     $948 = (($947) + ($946<<2)|0);
     $949 = HEAP32[$948>>2]|0;
     $950 = (($949) + 32|0);
     $951 = HEAP32[$950>>2]|0;
     $952 = ($951|0)!=(0);
     if (!($952)) {
      $953 = HEAP32[2000>>2]|0;
      $954 = (($953) - 1)|0;
      $955 = HEAP32[1984>>2]|0;
      $956 = (($955) + ($954<<2)|0);
      $957 = HEAP32[$956>>2]|0;
      $958 = HEAP32[2000>>2]|0;
      $959 = (($958) - 2)|0;
      $960 = HEAP32[1984>>2]|0;
      $961 = (($960) + ($959<<2)|0);
      $962 = HEAP32[$961>>2]|0;
      $963 = (($962) + 8|0);
      HEAP32[$963>>2] = $957;
      $964 = HEAP32[2000>>2]|0;
      $965 = (($964) - 2)|0;
      $966 = HEAP32[1984>>2]|0;
      $967 = (($966) + ($965<<2)|0);
      $968 = HEAP32[$967>>2]|0;
      $969 = (($968) + 32|0);
      HEAP32[$969>>2] = 1;
      $970 = HEAP32[2000>>2]|0;
      $971 = (($970) + -1)|0;
      HEAP32[2000>>2] = $971;
      $flag = 1;
     }
    }
   }
   $972 = HEAP32[2000>>2]|0;
   $973 = ($972|0)>=(3);
   if ($973) {
    $974 = HEAP32[2000>>2]|0;
    $975 = (($974) - 3)|0;
    $976 = HEAP32[1984>>2]|0;
    $977 = (($976) + ($975<<2)|0);
    $978 = HEAP32[$977>>2]|0;
    $979 = (($978) + 28|0);
    $980 = HEAP32[$979>>2]|0;
    $981 = ($980|0)==(2);
    if ($981) {
     $982 = HEAP32[2000>>2]|0;
     $983 = (($982) - 2)|0;
     $984 = HEAP32[1984>>2]|0;
     $985 = (($984) + ($983<<2)|0);
     $986 = HEAP32[$985>>2]|0;
     $987 = (($986) + 32|0);
     $988 = HEAP32[$987>>2]|0;
     $989 = ($988|0)!=(0);
     if ($989) {
      $990 = HEAP32[2000>>2]|0;
      $991 = (($990) - 3)|0;
      $992 = HEAP32[1984>>2]|0;
      $993 = (($992) + ($991<<2)|0);
      $994 = HEAP32[$993>>2]|0;
      $995 = (($994) + 32|0);
      $996 = HEAP32[$995>>2]|0;
      $997 = ($996|0)!=(0);
      if (!($997)) {
       $998 = HEAP32[2000>>2]|0;
       $999 = (($998) - 2)|0;
       $1000 = HEAP32[1984>>2]|0;
       $1001 = (($1000) + ($999<<2)|0);
       $1002 = HEAP32[$1001>>2]|0;
       $1003 = HEAP32[2000>>2]|0;
       $1004 = (($1003) - 3)|0;
       $1005 = HEAP32[1984>>2]|0;
       $1006 = (($1005) + ($1004<<2)|0);
       $1007 = HEAP32[$1006>>2]|0;
       $1008 = (($1007) + 8|0);
       HEAP32[$1008>>2] = $1002;
       $1009 = HEAP32[2000>>2]|0;
       $1010 = (($1009) - 1)|0;
       $1011 = HEAP32[1984>>2]|0;
       $1012 = (($1011) + ($1010<<2)|0);
       $1013 = HEAP32[$1012>>2]|0;
       $1014 = HEAP32[2000>>2]|0;
       $1015 = (($1014) - 3)|0;
       $1016 = HEAP32[1984>>2]|0;
       $1017 = (($1016) + ($1015<<2)|0);
       $1018 = HEAP32[$1017>>2]|0;
       $1019 = (($1018) + 8|0);
       $1020 = (($1019) + 4|0);
       HEAP32[$1020>>2] = $1013;
       $1021 = HEAP32[2000>>2]|0;
       $1022 = (($1021) - 3)|0;
       $1023 = HEAP32[1984>>2]|0;
       $1024 = (($1023) + ($1022<<2)|0);
       $1025 = HEAP32[$1024>>2]|0;
       $1026 = (($1025) + 32|0);
       HEAP32[$1026>>2] = 1;
       $1027 = HEAP32[2000>>2]|0;
       $1028 = (($1027) - 2)|0;
       HEAP32[2000>>2] = $1028;
       $flag = 1;
      }
     }
    }
   }
   $1029 = HEAP32[2000>>2]|0;
   $1030 = ($1029|0)>=(4);
   do {
    if ($1030) {
     $1031 = HEAP32[2000>>2]|0;
     $1032 = (($1031) - 4)|0;
     $1033 = HEAP32[1984>>2]|0;
     $1034 = (($1033) + ($1032<<2)|0);
     $1035 = HEAP32[$1034>>2]|0;
     $1036 = (($1035) + 28|0);
     $1037 = HEAP32[$1036>>2]|0;
     $1038 = ($1037|0)==(3);
     if ($1038) {
      $1039 = HEAP32[2000>>2]|0;
      $1040 = (($1039) - 2)|0;
      $1041 = HEAP32[1984>>2]|0;
      $1042 = (($1041) + ($1040<<2)|0);
      $1043 = HEAP32[$1042>>2]|0;
      $1044 = (($1043) + 32|0);
      $1045 = HEAP32[$1044>>2]|0;
      $1046 = ($1045|0)!=(0);
      if ($1046) {
       $1047 = HEAP32[2000>>2]|0;
       $1048 = (($1047) - 3)|0;
       $1049 = HEAP32[1984>>2]|0;
       $1050 = (($1049) + ($1048<<2)|0);
       $1051 = HEAP32[$1050>>2]|0;
       $1052 = (($1051) + 32|0);
       $1053 = HEAP32[$1052>>2]|0;
       $1054 = ($1053|0)!=(0);
       if (!($1054)) {
        break;
       }
       $1055 = HEAP32[2000>>2]|0;
       $1056 = (($1055) - 4)|0;
       $1057 = HEAP32[1984>>2]|0;
       $1058 = (($1057) + ($1056<<2)|0);
       $1059 = HEAP32[$1058>>2]|0;
       $1060 = (($1059) + 32|0);
       $1061 = HEAP32[$1060>>2]|0;
       $1062 = ($1061|0)!=(0);
       if ($1062) {
        break;
       }
       $1063 = HEAP32[2000>>2]|0;
       $1064 = (($1063) - 3)|0;
       $1065 = HEAP32[1984>>2]|0;
       $1066 = (($1065) + ($1064<<2)|0);
       $1067 = HEAP32[$1066>>2]|0;
       $1068 = HEAP32[2000>>2]|0;
       $1069 = (($1068) - 4)|0;
       $1070 = HEAP32[1984>>2]|0;
       $1071 = (($1070) + ($1069<<2)|0);
       $1072 = HEAP32[$1071>>2]|0;
       $1073 = (($1072) + 8|0);
       HEAP32[$1073>>2] = $1067;
       $1074 = HEAP32[2000>>2]|0;
       $1075 = (($1074) - 2)|0;
       $1076 = HEAP32[1984>>2]|0;
       $1077 = (($1076) + ($1075<<2)|0);
       $1078 = HEAP32[$1077>>2]|0;
       $1079 = HEAP32[2000>>2]|0;
       $1080 = (($1079) - 4)|0;
       $1081 = HEAP32[1984>>2]|0;
       $1082 = (($1081) + ($1080<<2)|0);
       $1083 = HEAP32[$1082>>2]|0;
       $1084 = (($1083) + 8|0);
       $1085 = (($1084) + 4|0);
       HEAP32[$1085>>2] = $1078;
       $1086 = HEAP32[2000>>2]|0;
       $1087 = (($1086) - 1)|0;
       $1088 = HEAP32[1984>>2]|0;
       $1089 = (($1088) + ($1087<<2)|0);
       $1090 = HEAP32[$1089>>2]|0;
       $1091 = HEAP32[2000>>2]|0;
       $1092 = (($1091) - 4)|0;
       $1093 = HEAP32[1984>>2]|0;
       $1094 = (($1093) + ($1092<<2)|0);
       $1095 = HEAP32[$1094>>2]|0;
       $1096 = (($1095) + 8|0);
       $1097 = (($1096) + 8|0);
       HEAP32[$1097>>2] = $1090;
       $1098 = HEAP32[2000>>2]|0;
       $1099 = (($1098) - 4)|0;
       $1100 = HEAP32[1984>>2]|0;
       $1101 = (($1100) + ($1099<<2)|0);
       $1102 = HEAP32[$1101>>2]|0;
       $1103 = (($1102) + 32|0);
       HEAP32[$1103>>2] = 1;
       $1104 = HEAP32[2000>>2]|0;
       $1105 = (($1104) - 3)|0;
       HEAP32[2000>>2] = $1105;
       $flag = 1;
      }
     }
    }
   } while(0);
  }
 }
 switch (label|0) {
  case 16: {
   $41 = $offs;
   $0 = $41;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 21: {
   $54 = $offs;
   $0 = $54;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 35: {
   $100 = $offs;
   $0 = $100;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 39: {
   $112 = $offs;
   $0 = $112;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 59: {
   $197 = $offs;
   $0 = $197;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 82: {
   $302 = $offs;
   $0 = $302;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 134: {
   $535 = $offs;
   $536 = $escaped;
   $537 = (($535) - ($536))|0;
   $0 = $537;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 142: {
   $562 = $offs;
   $563 = $escaped;
   $564 = (($562) - ($563))|0;
   $0 = $564;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 155: {
   $614 = $offs;
   $615 = $escaped;
   $616 = (($614) - ($615))|0;
   $0 = $616;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 184: {
   HEAP32[2032>>2] = -5;
   $698 = $hchar;
   _delete_string($698);
   $699 = $offs;
   $0 = $699;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 200: {
   HEAP32[2032>>2] = -5;
   $756 = $hchar;
   _delete_string($756);
   $757 = $offs;
   $0 = $757;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 202: {
   HEAP32[2032>>2] = -3;
   $794 = $offs;
   $0 = $794;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 236: {
   HEAP32[2032>>2] = -3;
   $934 = $offs;
   $0 = $934;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
  case 254: {
   $1106 = $offs;
   $0 = $1106;
   $1107 = $0;
   STACKTOP = sp;return ($1107|0);
   break;
  }
 }
 return 0|0;
}
function _register_brackets($opb,$clb,$arity,$idx) {
 $opb = $opb|0;
 $clb = $clb|0;
 $arity = $arity|0;
 $idx = $idx|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $3 = 0, $4 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, $clh = 0, $oph = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $opb;
 $1 = $clb;
 $2 = $arity;
 $3 = $idx;
 $4 = $0;
 $5 = (_strlen(($4|0))|0);
 $6 = $0;
 $7 = (_new_string($5,$6)|0);
 $oph = $7;
 $8 = $1;
 $9 = (_strlen(($8|0))|0);
 $10 = $1;
 $11 = (_new_string($9,$10)|0);
 $clh = $11;
 $12 = $2;
 $13 = $oph;
 $14 = (($13) + 24|0);
 HEAP32[$14>>2] = $12;
 $15 = $clh;
 $16 = $oph;
 $17 = (($16) + 4|0);
 HEAP32[$17>>2] = $15;
 $18 = $oph;
 $19 = $clh;
 $20 = (($19) + 4|0);
 HEAP32[$20>>2] = $18;
 $21 = $oph;
 $22 = $3;
 $23 = (2080 + ($22<<2)|0);
 HEAP32[$23>>2] = $21;
 STACKTOP = sp;return;
}
function _register_special_functor($fctr,$arity,$mf,$bf) {
 $fctr = $fctr|0;
 $arity = $arity|0;
 $mf = $mf|0;
 $bf = $bf|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $3 = 0;
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $hs = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $fctr;
 $1 = $arity;
 $2 = $mf;
 $3 = $bf;
 $4 = $0;
 $5 = (_strlen(($4|0))|0);
 $6 = $0;
 $7 = (_new_string($5,$6)|0);
 $hs = $7;
 $8 = $hs;
 $9 = (($8) + 24|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = ($10|0)>(-2);
 if ($11) {
  $12 = $hs;
  $13 = (($12) + 24|0);
  $14 = HEAP32[$13>>2]|0;
  $15 = $1;
  $16 = ($14|0)!=($15|0);
  if ($16) {
   (_puts((2144|0))|0);
   _exit(1);
   // unreachable;
  }
 }
 $17 = $1;
 $18 = $hs;
 $19 = (($18) + 24|0);
 HEAP32[$19>>2] = $17;
 $20 = $2;
 $21 = $hs;
 $22 = (($21) + 28|0);
 HEAP32[$22>>2] = $20;
 $23 = $3;
 $24 = $hs;
 $25 = (($24) + 32|0);
 HEAP32[$25>>2] = $23;
 STACKTOP = sp;return;
}
function _register_alias($fctr,$canon) {
 $fctr = $fctr|0;
 $canon = $canon|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $cs = 0, $hs = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $fctr;
 $1 = $canon;
 $2 = $0;
 $3 = (_strlen(($2|0))|0);
 $4 = $0;
 $5 = (_new_string($3,$4)|0);
 $hs = $5;
 $6 = $1;
 $7 = (_strlen(($6|0))|0);
 $8 = $1;
 $9 = (_new_string($7,$8)|0);
 $cs = $9;
 $10 = $hs;
 $11 = (($10) + 24|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = ($12|0)>(-2);
 if ($13) {
  $14 = $cs;
  $15 = (($14) + 24|0);
  $16 = HEAP32[$15>>2]|0;
  $17 = $hs;
  $18 = (($17) + 24|0);
  $19 = HEAP32[$18>>2]|0;
  $20 = ($16|0)!=($19|0);
  if ($20) {
   (_puts((2144|0))|0);
   _exit(1);
   // unreachable;
  }
 }
 $21 = $cs;
 $22 = (($21) + 24|0);
 $23 = HEAP32[$22>>2]|0;
 $24 = $hs;
 $25 = (($24) + 24|0);
 HEAP32[$25>>2] = $23;
 $26 = $cs;
 $27 = $hs;
 $28 = (($27) + 8|0);
 HEAP32[$28>>2] = $26;
 $29 = $hs;
 $30 = $cs;
 $31 = (($30) + 8|0);
 HEAP32[$31>>2] = $29;
 STACKTOP = sp;return;
}
function _register_syntax() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 _register_brackets(2200,2208,-1,0);
 _register_brackets(2216,2224,-1,1);
 _register_brackets(2232,2240,-1,2);
 _register_brackets(2248,2256,0,3);
 _register_brackets(2264,2272,0,4);
 _register_brackets(2280,2288,0,5);
 _register_brackets(2296,2296,1,6);
 _register_brackets(2304,2304,1,7);
 _register_brackets(2312,2312,1,8);
 _register_brackets(2320,2328,2,9);
 _register_brackets(2336,2344,2,10);
 _register_brackets(2352,2360,2,11);
 _register_brackets(2368,2376,3,12);
 _register_brackets(2384,2392,3,13);
 _register_brackets(2400,2408,3,14);
 _register_special_functor(2072,0,5,6);
 _register_special_functor(2416,2,5,6);
 _register_special_functor(2424,0,2,7);
 _register_alias(2432,2424);
 _register_special_functor(2296,1,8,9);
 _register_alias(2448,2296);
 _register_special_functor(2464,2,4,10);
 _register_alias(2472,2464);
 _register_special_functor(2480,2,4,11);
 _register_alias(2488,2480);
 _register_special_functor(2496,1,3,12);
 _register_alias(2504,2496);
 _register_special_functor(2512,1,13,14);
 _register_alias(2520,2512);
 _register_special_functor(2528,1,15,16);
 _register_alias(2536,2528);
 _register_special_functor(2544,1,17,7);
 _register_alias(2552,2544);
 _register_special_functor(2560,1,18,7);
 _register_alias(2568,2560);
 _register_special_functor(2576,1,19,7);
 _register_alias(2584,2576);
 _register_special_functor(2592,2,5,6);
 _register_alias(2600,2592);
 _register_special_functor(2608,2,5,6);
 _register_alias(2616,2608);
 _register_special_functor(2624,3,5,6);
 _register_alias(2632,2624);
 _register_special_functor(2640,3,5,6);
 _register_alias(2648,2640);
 _register_special_functor(2656,2,5,6);
 _register_alias(2664,2656);
 _register_special_functor(2672,2,5,6);
 _register_alias(2680,2672);
 _register_special_functor(2688,2,5,6);
 _register_alias(2696,2688);
 _register_special_functor(2704,2,5,6);
 _register_alias(2712,2704);
 _register_special_functor(2720,2,5,6);
 _register_alias(2728,2720);
 _register_special_functor(2736,2,5,6);
 _register_alias(2744,2736);
 _register_special_functor(2752,2,5,6);
 _register_alias(2760,2752);
 _register_special_functor(2768,2,5,6);
 _register_alias(2776,2768);
 STACKTOP = sp;return;
}
function _regex_match_fn($ms) {
 $ms = $ms|0;
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $ms;
 (_puts((2784|0))|0);
 _exit(1);
 // unreachable;
 return 0|0;
}
function _user_match_fn($ms) {
 $ms = $ms|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $7 = 0, $8 = 0, $9 = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $ms;
 $2 = $1;
 $3 = (($2) + 8|0);
 $4 = (($3) + 4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = (($5) + 28|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ($7|0)!=(1);
 if (!($8)) {
  $9 = $1;
  $10 = (($9) + 8|0);
  $11 = (($10) + 8|0);
  $12 = HEAP32[$11>>2]|0;
  $13 = HEAP32[$12>>2]|0;
  $14 = ($13|0)==(0|0);
  if (!($14)) {
   $18 = $1;
   $19 = (($18) + 8|0);
   $20 = (($19) + 4|0);
   $21 = HEAP32[$20>>2]|0;
   $22 = (($21) + 8|0);
   $23 = HEAP32[$22>>2]|0;
   $24 = HEAP32[$23>>2]|0;
   $25 = ($24|0)!=(0|0);
   if ($25) {
    $26 = $1;
    $27 = (($26) + 8|0);
    $28 = (($27) + 4|0);
    $29 = HEAP32[$28>>2]|0;
    $30 = (($29) + 8|0);
    $31 = HEAP32[$30>>2]|0;
    $32 = HEAP32[$31>>2]|0;
    $33 = (($32) + 12|0);
    $34 = HEAP32[$33>>2]|0;
    $35 = (_atoi($34)|0);
    $i = $35;
   } else {
    $i = 1;
   }
   $36 = $i;
   $37 = ($36|0)<=(0);
   if ($37) {
    $i = 1;
   }
   $38 = $i;
   $39 = HEAP32[2832>>2]|0;
   $40 = ($38|0)<=($39|0);
   if ($40) {
    $41 = $1;
    $42 = (($41) + 8|0);
    $43 = (($42) + 8|0);
    $44 = HEAP32[$43>>2]|0;
    $45 = HEAP32[$44>>2]|0;
    $46 = (($45) + 40|0);
    $47 = $46;
    $48 = $47;
    $49 = HEAP32[$48>>2]|0;
    $50 = (($47) + 4)|0;
    $51 = $50;
    $52 = HEAP32[$51>>2]|0;
    $53 = $i;
    $54 = (($53) - 1)|0;
    $55 = 1 << $54;
    $56 = ($55|0)<(0);
    $57 = $56 << 31 >> 31;
    $58 = $49 & $55;
    $59 = $52 & $57;
    $60 = ($58|0)!=(0);
    $61 = ($59|0)!=(0);
    $62 = $60 | $61;
    $63 = $62;
   } else {
    $63 = 0;
   }
   $64 = $63 ? 2 : 1;
   $65 = $1;
   $66 = (($65) + 36|0);
   HEAP32[$66>>2] = $64;
   $67 = $1;
   $0 = $67;
   $68 = $0;
   STACKTOP = sp;return ($68|0);
  }
 }
 $15 = $1;
 $16 = (($15) + 36|0);
 HEAP32[$16>>2] = 1;
 $17 = $1;
 $0 = $17;
 $68 = $0;
 STACKTOP = sp;return ($68|0);
}
function _idsgrep_utf8cw($cp) {
 $cp = $cp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $search = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $cp;
 $search = 0;
 while(1) {
  $2 = $search;
  $3 = ($2|0)>=(0);
  if (!($3)) {
   break;
  }
  $4 = $search;
  $5 = (2840 + (($4*18)|0)|0);
  $6 = (($5) + 16|0);
  $7 = HEAP8[$6>>0]|0;
  $8 = $7 << 24 >> 24;
  $9 = $1;
  $10 = (($9) + ($8)|0);
  $11 = HEAP8[$10>>0]|0;
  $12 = $11 << 24 >> 24;
  $13 = $search;
  $14 = (2840 + (($13*18)|0)|0);
  $15 = (($14) + 17|0);
  $16 = HEAP8[$15>>0]|0;
  $17 = $16 << 24 >> 24;
  $18 = $12 >> $17;
  $19 = $18 & 7;
  $20 = $search;
  $21 = (2840 + (($20*18)|0)|0);
  $22 = (($21) + ($19<<1)|0);
  $23 = HEAP16[$22>>1]|0;
  $24 = $23 << 16 >> 16;
  $search = $24;
 }
 $25 = $search;
 $26 = ($25|0)==(-1);
 if ($26) {
  $0 = 2;
  $52 = $0;
  STACKTOP = sp;return ($52|0);
 }
 $search = 1;
 while(1) {
  $27 = $search;
  $28 = ($27|0)>=(0);
  if (!($28)) {
   break;
  }
  $29 = $search;
  $30 = (2840 + (($29*18)|0)|0);
  $31 = (($30) + 16|0);
  $32 = HEAP8[$31>>0]|0;
  $33 = $32 << 24 >> 24;
  $34 = $1;
  $35 = (($34) + ($33)|0);
  $36 = HEAP8[$35>>0]|0;
  $37 = $36 << 24 >> 24;
  $38 = $search;
  $39 = (2840 + (($38*18)|0)|0);
  $40 = (($39) + 17|0);
  $41 = HEAP8[$40>>0]|0;
  $42 = $41 << 24 >> 24;
  $43 = $37 >> $42;
  $44 = $43 & 7;
  $45 = $search;
  $46 = (2840 + (($45*18)|0)|0);
  $47 = (($46) + ($44<<1)|0);
  $48 = HEAP16[$47>>1]|0;
  $49 = $48 << 16 >> 16;
  $search = $49;
 }
 $50 = $search;
 $51 = (-1 - ($50))|0;
 $0 = $51;
 $52 = $0;
 STACKTOP = sp;return ($52|0);
}
function _malloc($bytes) {
 $bytes = $bytes|0;
 var $$$i = 0, $$3$i = 0, $$4$i = 0, $$pre = 0, $$pre$i = 0, $$pre$i$i = 0, $$pre$i25 = 0, $$pre$i25$i = 0, $$pre$phi$i$iZ2D = 0, $$pre$phi$i26$iZ2D = 0, $$pre$phi$i26Z2D = 0, $$pre$phi$iZ2D = 0, $$pre$phi58$i$iZ2D = 0, $$pre$phiZ2D = 0, $$pre57$i$i = 0, $$rsize$0$i = 0, $$rsize$3$i = 0, $$sum = 0, $$sum$i$i = 0, $$sum$i$i$i = 0;
 var $$sum$i14$i = 0, $$sum$i15$i = 0, $$sum$i18$i = 0, $$sum$i21$i = 0, $$sum$i2334 = 0, $$sum$i32 = 0, $$sum$i35 = 0, $$sum1 = 0, $$sum1$i = 0, $$sum1$i$i = 0, $$sum1$i16$i = 0, $$sum1$i22$i = 0, $$sum1$i24 = 0, $$sum10 = 0, $$sum10$i = 0, $$sum10$i$i = 0, $$sum10$pre$i$i = 0, $$sum107$i = 0, $$sum108$i = 0, $$sum109$i = 0;
 var $$sum11$i = 0, $$sum11$i$i = 0, $$sum11$i24$i = 0, $$sum110$i = 0, $$sum111$i = 0, $$sum1112 = 0, $$sum112$i = 0, $$sum113$i = 0, $$sum114$i = 0, $$sum115$i = 0, $$sum116$i = 0, $$sum117$i = 0, $$sum118$i = 0, $$sum119$i = 0, $$sum12$i = 0, $$sum12$i$i = 0, $$sum120$i = 0, $$sum13$i = 0, $$sum13$i$i = 0, $$sum14$i$i = 0;
 var $$sum14$pre$i = 0, $$sum15$i = 0, $$sum15$i$i = 0, $$sum16$i = 0, $$sum16$i$i = 0, $$sum17$i = 0, $$sum17$i$i = 0, $$sum18$i = 0, $$sum1819$i$i = 0, $$sum2 = 0, $$sum2$i = 0, $$sum2$i$i = 0, $$sum2$i$i$i = 0, $$sum2$i17$i = 0, $$sum2$i19$i = 0, $$sum2$i23$i = 0, $$sum2$pre$i = 0, $$sum20$i$i = 0, $$sum21$i$i = 0, $$sum22$i$i = 0;
 var $$sum23$i$i = 0, $$sum24$i$i = 0, $$sum25$i$i = 0, $$sum26$pre$i$i = 0, $$sum27$i$i = 0, $$sum28$i$i = 0, $$sum29$i$i = 0, $$sum3$i = 0, $$sum3$i$i = 0, $$sum3$i27 = 0, $$sum30$i$i = 0, $$sum3132$i$i = 0, $$sum34$i$i = 0, $$sum3536$i$i = 0, $$sum3738$i$i = 0, $$sum39$i$i = 0, $$sum4 = 0, $$sum4$i = 0, $$sum4$i28 = 0, $$sum40$i$i = 0;
 var $$sum41$i$i = 0, $$sum42$i$i = 0, $$sum5$i = 0, $$sum5$i$i = 0, $$sum56 = 0, $$sum6$i = 0, $$sum67$i$i = 0, $$sum7$i = 0, $$sum8$i = 0, $$sum8$pre = 0, $$sum9 = 0, $$sum9$i = 0, $$sum9$i$i = 0, $$tsize$1$i = 0, $$v$0$i = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $1000 = 0;
 var $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0, $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0, $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0;
 var $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0, $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0, $1034 = 0, $1035 = 0, $1036 = 0, $1037 = 0;
 var $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0, $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0, $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0;
 var $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0, $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0, $107 = 0, $1070 = 0, $1071 = 0, $1072 = 0, $1073 = 0;
 var $1074 = 0, $1075 = 0, $1076 = 0, $1077 = 0, $1078 = 0, $1079 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0;
 var $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0;
 var $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0;
 var $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0;
 var $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0;
 var $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0;
 var $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0;
 var $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0;
 var $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0;
 var $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0;
 var $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0;
 var $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0;
 var $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0;
 var $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0;
 var $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0;
 var $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0;
 var $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0;
 var $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0;
 var $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0;
 var $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0;
 var $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0;
 var $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0;
 var $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0;
 var $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0;
 var $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0;
 var $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0;
 var $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0;
 var $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0;
 var $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0;
 var $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0;
 var $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0;
 var $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0;
 var $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0;
 var $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0;
 var $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0;
 var $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0;
 var $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0;
 var $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0, $787 = 0;
 var $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0;
 var $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0;
 var $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0;
 var $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0;
 var $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0;
 var $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0;
 var $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0, $912 = 0;
 var $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0, $930 = 0;
 var $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0, $949 = 0;
 var $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0, $967 = 0;
 var $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0, $985 = 0;
 var $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $F$0$i$i = 0, $F1$0$i = 0, $F4$0 = 0, $F4$0$i$i = 0, $F5$0$i = 0;
 var $I1$0$c$i$i = 0, $I1$0$i$i = 0, $I7$0$i = 0, $I7$0$i$i = 0, $K12$025$i = 0, $K2$014$i$i = 0, $K8$052$i$i = 0, $R$0$i = 0, $R$0$i$i = 0, $R$0$i18 = 0, $R$1$i = 0, $R$1$i$i = 0, $R$1$i20 = 0, $RP$0$i = 0, $RP$0$i$i = 0, $RP$0$i17 = 0, $T$0$lcssa$i = 0, $T$0$lcssa$i$i = 0, $T$0$lcssa$i28$i = 0, $T$013$i$i = 0;
 var $T$024$i = 0, $T$051$i$i = 0, $br$0$i = 0, $cond$i = 0, $cond$i$i = 0, $cond$i21 = 0, $exitcond$i$i = 0, $i$02$i$i = 0, $idx$0$i = 0, $mem$0 = 0, $nb$0 = 0, $notlhs$i = 0, $notrhs$i = 0, $oldfirst$0$i$i = 0, $or$cond$i = 0, $or$cond$i29 = 0, $or$cond1$i = 0, $or$cond10$i = 0, $or$cond19$i = 0, $or$cond2$i = 0;
 var $or$cond49$i = 0, $or$cond5$i = 0, $or$cond6$i = 0, $or$cond8$not$i = 0, $or$cond9$i = 0, $qsize$0$i$i = 0, $rsize$0$i = 0, $rsize$0$i15 = 0, $rsize$1$i = 0, $rsize$2$i = 0, $rsize$3$lcssa$i = 0, $rsize$329$i = 0, $rst$0$i = 0, $rst$1$i = 0, $sizebits$0$i = 0, $sp$0$i$i = 0, $sp$0$i$i$i = 0, $sp$075$i = 0, $sp$168$i = 0, $ssize$0$$i = 0;
 var $ssize$0$i = 0, $ssize$1$i = 0, $ssize$2$i = 0, $t$0$i = 0, $t$0$i14 = 0, $t$1$i = 0, $t$2$ph$i = 0, $t$2$v$3$i = 0, $t$228$i = 0, $tbase$0$i = 0, $tbase$247$i = 0, $tsize$0$i = 0, $tsize$0323841$i = 0, $tsize$1$i = 0, $tsize$246$i = 0, $v$0$i = 0, $v$0$i16 = 0, $v$1$i = 0, $v$2$i = 0, $v$3$lcssa$i = 0;
 var $v$330$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($bytes>>>0)<(245);
 do {
  if ($0) {
   $1 = ($bytes>>>0)<(11);
   if ($1) {
    $5 = 16;
   } else {
    $2 = (($bytes) + 11)|0;
    $3 = $2 & -8;
    $5 = $3;
   }
   $4 = $5 >>> 3;
   $6 = HEAP32[8512>>2]|0;
   $7 = $6 >>> $4;
   $8 = $7 & 3;
   $9 = ($8|0)==(0);
   if (!($9)) {
    $10 = $7 & 1;
    $11 = $10 ^ 1;
    $12 = (($11) + ($4))|0;
    $13 = $12 << 1;
    $14 = ((8512 + ($13<<2)|0) + 40|0);
    $$sum10 = (($13) + 2)|0;
    $15 = ((8512 + ($$sum10<<2)|0) + 40|0);
    $16 = HEAP32[$15>>2]|0;
    $17 = (($16) + 8|0);
    $18 = HEAP32[$17>>2]|0;
    $19 = ($14|0)==($18|0);
    do {
     if ($19) {
      $20 = 1 << $12;
      $21 = $20 ^ -1;
      $22 = $6 & $21;
      HEAP32[8512>>2] = $22;
     } else {
      $23 = HEAP32[((8512 + 16|0))>>2]|0;
      $24 = ($18>>>0)<($23>>>0);
      if ($24) {
       _abort();
       // unreachable;
      }
      $25 = (($18) + 12|0);
      $26 = HEAP32[$25>>2]|0;
      $27 = ($26|0)==($16|0);
      if ($27) {
       HEAP32[$25>>2] = $14;
       HEAP32[$15>>2] = $18;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $28 = $12 << 3;
    $29 = $28 | 3;
    $30 = (($16) + 4|0);
    HEAP32[$30>>2] = $29;
    $$sum1112 = $28 | 4;
    $31 = (($16) + ($$sum1112)|0);
    $32 = HEAP32[$31>>2]|0;
    $33 = $32 | 1;
    HEAP32[$31>>2] = $33;
    $mem$0 = $17;
    STACKTOP = sp;return ($mem$0|0);
   }
   $34 = HEAP32[((8512 + 8|0))>>2]|0;
   $35 = ($5>>>0)>($34>>>0);
   if ($35) {
    $36 = ($7|0)==(0);
    if (!($36)) {
     $37 = $7 << $4;
     $38 = 2 << $4;
     $39 = (0 - ($38))|0;
     $40 = $38 | $39;
     $41 = $37 & $40;
     $42 = (0 - ($41))|0;
     $43 = $41 & $42;
     $44 = (($43) + -1)|0;
     $45 = $44 >>> 12;
     $46 = $45 & 16;
     $47 = $44 >>> $46;
     $48 = $47 >>> 5;
     $49 = $48 & 8;
     $50 = $49 | $46;
     $51 = $47 >>> $49;
     $52 = $51 >>> 2;
     $53 = $52 & 4;
     $54 = $50 | $53;
     $55 = $51 >>> $53;
     $56 = $55 >>> 1;
     $57 = $56 & 2;
     $58 = $54 | $57;
     $59 = $55 >>> $57;
     $60 = $59 >>> 1;
     $61 = $60 & 1;
     $62 = $58 | $61;
     $63 = $59 >>> $61;
     $64 = (($62) + ($63))|0;
     $65 = $64 << 1;
     $66 = ((8512 + ($65<<2)|0) + 40|0);
     $$sum4 = (($65) + 2)|0;
     $67 = ((8512 + ($$sum4<<2)|0) + 40|0);
     $68 = HEAP32[$67>>2]|0;
     $69 = (($68) + 8|0);
     $70 = HEAP32[$69>>2]|0;
     $71 = ($66|0)==($70|0);
     do {
      if ($71) {
       $72 = 1 << $64;
       $73 = $72 ^ -1;
       $74 = $6 & $73;
       HEAP32[8512>>2] = $74;
      } else {
       $75 = HEAP32[((8512 + 16|0))>>2]|0;
       $76 = ($70>>>0)<($75>>>0);
       if ($76) {
        _abort();
        // unreachable;
       }
       $77 = (($70) + 12|0);
       $78 = HEAP32[$77>>2]|0;
       $79 = ($78|0)==($68|0);
       if ($79) {
        HEAP32[$77>>2] = $66;
        HEAP32[$67>>2] = $70;
        break;
       } else {
        _abort();
        // unreachable;
       }
      }
     } while(0);
     $80 = $64 << 3;
     $81 = (($80) - ($5))|0;
     $82 = $5 | 3;
     $83 = (($68) + 4|0);
     HEAP32[$83>>2] = $82;
     $84 = (($68) + ($5)|0);
     $85 = $81 | 1;
     $$sum56 = $5 | 4;
     $86 = (($68) + ($$sum56)|0);
     HEAP32[$86>>2] = $85;
     $87 = (($68) + ($80)|0);
     HEAP32[$87>>2] = $81;
     $88 = HEAP32[((8512 + 8|0))>>2]|0;
     $89 = ($88|0)==(0);
     if (!($89)) {
      $90 = HEAP32[((8512 + 20|0))>>2]|0;
      $91 = $88 >>> 3;
      $92 = $91 << 1;
      $93 = ((8512 + ($92<<2)|0) + 40|0);
      $94 = HEAP32[8512>>2]|0;
      $95 = 1 << $91;
      $96 = $94 & $95;
      $97 = ($96|0)==(0);
      if ($97) {
       $98 = $94 | $95;
       HEAP32[8512>>2] = $98;
       $$sum8$pre = (($92) + 2)|0;
       $$pre = ((8512 + ($$sum8$pre<<2)|0) + 40|0);
       $$pre$phiZ2D = $$pre;$F4$0 = $93;
      } else {
       $$sum9 = (($92) + 2)|0;
       $99 = ((8512 + ($$sum9<<2)|0) + 40|0);
       $100 = HEAP32[$99>>2]|0;
       $101 = HEAP32[((8512 + 16|0))>>2]|0;
       $102 = ($100>>>0)<($101>>>0);
       if ($102) {
        _abort();
        // unreachable;
       } else {
        $$pre$phiZ2D = $99;$F4$0 = $100;
       }
      }
      HEAP32[$$pre$phiZ2D>>2] = $90;
      $103 = (($F4$0) + 12|0);
      HEAP32[$103>>2] = $90;
      $104 = (($90) + 8|0);
      HEAP32[$104>>2] = $F4$0;
      $105 = (($90) + 12|0);
      HEAP32[$105>>2] = $93;
     }
     HEAP32[((8512 + 8|0))>>2] = $81;
     HEAP32[((8512 + 20|0))>>2] = $84;
     $mem$0 = $69;
     STACKTOP = sp;return ($mem$0|0);
    }
    $106 = HEAP32[((8512 + 4|0))>>2]|0;
    $107 = ($106|0)==(0);
    if ($107) {
     $nb$0 = $5;
    } else {
     $108 = (0 - ($106))|0;
     $109 = $106 & $108;
     $110 = (($109) + -1)|0;
     $111 = $110 >>> 12;
     $112 = $111 & 16;
     $113 = $110 >>> $112;
     $114 = $113 >>> 5;
     $115 = $114 & 8;
     $116 = $115 | $112;
     $117 = $113 >>> $115;
     $118 = $117 >>> 2;
     $119 = $118 & 4;
     $120 = $116 | $119;
     $121 = $117 >>> $119;
     $122 = $121 >>> 1;
     $123 = $122 & 2;
     $124 = $120 | $123;
     $125 = $121 >>> $123;
     $126 = $125 >>> 1;
     $127 = $126 & 1;
     $128 = $124 | $127;
     $129 = $125 >>> $127;
     $130 = (($128) + ($129))|0;
     $131 = ((8512 + ($130<<2)|0) + 304|0);
     $132 = HEAP32[$131>>2]|0;
     $133 = (($132) + 4|0);
     $134 = HEAP32[$133>>2]|0;
     $135 = $134 & -8;
     $136 = (($135) - ($5))|0;
     $rsize$0$i = $136;$t$0$i = $132;$v$0$i = $132;
     while(1) {
      $137 = (($t$0$i) + 16|0);
      $138 = HEAP32[$137>>2]|0;
      $139 = ($138|0)==(0|0);
      if ($139) {
       $140 = (($t$0$i) + 20|0);
       $141 = HEAP32[$140>>2]|0;
       $142 = ($141|0)==(0|0);
       if ($142) {
        break;
       } else {
        $144 = $141;
       }
      } else {
       $144 = $138;
      }
      $143 = (($144) + 4|0);
      $145 = HEAP32[$143>>2]|0;
      $146 = $145 & -8;
      $147 = (($146) - ($5))|0;
      $148 = ($147>>>0)<($rsize$0$i>>>0);
      $$rsize$0$i = $148 ? $147 : $rsize$0$i;
      $$v$0$i = $148 ? $144 : $v$0$i;
      $rsize$0$i = $$rsize$0$i;$t$0$i = $144;$v$0$i = $$v$0$i;
     }
     $149 = HEAP32[((8512 + 16|0))>>2]|0;
     $150 = ($v$0$i>>>0)<($149>>>0);
     if ($150) {
      _abort();
      // unreachable;
     }
     $151 = (($v$0$i) + ($5)|0);
     $152 = ($v$0$i>>>0)<($151>>>0);
     if (!($152)) {
      _abort();
      // unreachable;
     }
     $153 = (($v$0$i) + 24|0);
     $154 = HEAP32[$153>>2]|0;
     $155 = (($v$0$i) + 12|0);
     $156 = HEAP32[$155>>2]|0;
     $157 = ($156|0)==($v$0$i|0);
     do {
      if ($157) {
       $167 = (($v$0$i) + 20|0);
       $168 = HEAP32[$167>>2]|0;
       $169 = ($168|0)==(0|0);
       if ($169) {
        $170 = (($v$0$i) + 16|0);
        $171 = HEAP32[$170>>2]|0;
        $172 = ($171|0)==(0|0);
        if ($172) {
         $R$1$i = 0;
         break;
        } else {
         $R$0$i = $171;$RP$0$i = $170;
        }
       } else {
        $R$0$i = $168;$RP$0$i = $167;
       }
       while(1) {
        $173 = (($R$0$i) + 20|0);
        $174 = HEAP32[$173>>2]|0;
        $175 = ($174|0)==(0|0);
        if (!($175)) {
         $R$0$i = $174;$RP$0$i = $173;
         continue;
        }
        $176 = (($R$0$i) + 16|0);
        $177 = HEAP32[$176>>2]|0;
        $178 = ($177|0)==(0|0);
        if ($178) {
         break;
        } else {
         $R$0$i = $177;$RP$0$i = $176;
        }
       }
       $179 = ($RP$0$i>>>0)<($149>>>0);
       if ($179) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$RP$0$i>>2] = 0;
        $R$1$i = $R$0$i;
        break;
       }
      } else {
       $158 = (($v$0$i) + 8|0);
       $159 = HEAP32[$158>>2]|0;
       $160 = ($159>>>0)<($149>>>0);
       if ($160) {
        _abort();
        // unreachable;
       }
       $161 = (($159) + 12|0);
       $162 = HEAP32[$161>>2]|0;
       $163 = ($162|0)==($v$0$i|0);
       if (!($163)) {
        _abort();
        // unreachable;
       }
       $164 = (($156) + 8|0);
       $165 = HEAP32[$164>>2]|0;
       $166 = ($165|0)==($v$0$i|0);
       if ($166) {
        HEAP32[$161>>2] = $156;
        HEAP32[$164>>2] = $159;
        $R$1$i = $156;
        break;
       } else {
        _abort();
        // unreachable;
       }
      }
     } while(0);
     $180 = ($154|0)==(0|0);
     do {
      if (!($180)) {
       $181 = (($v$0$i) + 28|0);
       $182 = HEAP32[$181>>2]|0;
       $183 = ((8512 + ($182<<2)|0) + 304|0);
       $184 = HEAP32[$183>>2]|0;
       $185 = ($v$0$i|0)==($184|0);
       if ($185) {
        HEAP32[$183>>2] = $R$1$i;
        $cond$i = ($R$1$i|0)==(0|0);
        if ($cond$i) {
         $186 = 1 << $182;
         $187 = $186 ^ -1;
         $188 = HEAP32[((8512 + 4|0))>>2]|0;
         $189 = $188 & $187;
         HEAP32[((8512 + 4|0))>>2] = $189;
         break;
        }
       } else {
        $190 = HEAP32[((8512 + 16|0))>>2]|0;
        $191 = ($154>>>0)<($190>>>0);
        if ($191) {
         _abort();
         // unreachable;
        }
        $192 = (($154) + 16|0);
        $193 = HEAP32[$192>>2]|0;
        $194 = ($193|0)==($v$0$i|0);
        if ($194) {
         HEAP32[$192>>2] = $R$1$i;
        } else {
         $195 = (($154) + 20|0);
         HEAP32[$195>>2] = $R$1$i;
        }
        $196 = ($R$1$i|0)==(0|0);
        if ($196) {
         break;
        }
       }
       $197 = HEAP32[((8512 + 16|0))>>2]|0;
       $198 = ($R$1$i>>>0)<($197>>>0);
       if ($198) {
        _abort();
        // unreachable;
       }
       $199 = (($R$1$i) + 24|0);
       HEAP32[$199>>2] = $154;
       $200 = (($v$0$i) + 16|0);
       $201 = HEAP32[$200>>2]|0;
       $202 = ($201|0)==(0|0);
       do {
        if (!($202)) {
         $203 = HEAP32[((8512 + 16|0))>>2]|0;
         $204 = ($201>>>0)<($203>>>0);
         if ($204) {
          _abort();
          // unreachable;
         } else {
          $205 = (($R$1$i) + 16|0);
          HEAP32[$205>>2] = $201;
          $206 = (($201) + 24|0);
          HEAP32[$206>>2] = $R$1$i;
          break;
         }
        }
       } while(0);
       $207 = (($v$0$i) + 20|0);
       $208 = HEAP32[$207>>2]|0;
       $209 = ($208|0)==(0|0);
       if (!($209)) {
        $210 = HEAP32[((8512 + 16|0))>>2]|0;
        $211 = ($208>>>0)<($210>>>0);
        if ($211) {
         _abort();
         // unreachable;
        } else {
         $212 = (($R$1$i) + 20|0);
         HEAP32[$212>>2] = $208;
         $213 = (($208) + 24|0);
         HEAP32[$213>>2] = $R$1$i;
         break;
        }
       }
      }
     } while(0);
     $214 = ($rsize$0$i>>>0)<(16);
     if ($214) {
      $215 = (($rsize$0$i) + ($5))|0;
      $216 = $215 | 3;
      $217 = (($v$0$i) + 4|0);
      HEAP32[$217>>2] = $216;
      $$sum4$i = (($215) + 4)|0;
      $218 = (($v$0$i) + ($$sum4$i)|0);
      $219 = HEAP32[$218>>2]|0;
      $220 = $219 | 1;
      HEAP32[$218>>2] = $220;
     } else {
      $221 = $5 | 3;
      $222 = (($v$0$i) + 4|0);
      HEAP32[$222>>2] = $221;
      $223 = $rsize$0$i | 1;
      $$sum$i35 = $5 | 4;
      $224 = (($v$0$i) + ($$sum$i35)|0);
      HEAP32[$224>>2] = $223;
      $$sum1$i = (($rsize$0$i) + ($5))|0;
      $225 = (($v$0$i) + ($$sum1$i)|0);
      HEAP32[$225>>2] = $rsize$0$i;
      $226 = HEAP32[((8512 + 8|0))>>2]|0;
      $227 = ($226|0)==(0);
      if (!($227)) {
       $228 = HEAP32[((8512 + 20|0))>>2]|0;
       $229 = $226 >>> 3;
       $230 = $229 << 1;
       $231 = ((8512 + ($230<<2)|0) + 40|0);
       $232 = HEAP32[8512>>2]|0;
       $233 = 1 << $229;
       $234 = $232 & $233;
       $235 = ($234|0)==(0);
       if ($235) {
        $236 = $232 | $233;
        HEAP32[8512>>2] = $236;
        $$sum2$pre$i = (($230) + 2)|0;
        $$pre$i = ((8512 + ($$sum2$pre$i<<2)|0) + 40|0);
        $$pre$phi$iZ2D = $$pre$i;$F1$0$i = $231;
       } else {
        $$sum3$i = (($230) + 2)|0;
        $237 = ((8512 + ($$sum3$i<<2)|0) + 40|0);
        $238 = HEAP32[$237>>2]|0;
        $239 = HEAP32[((8512 + 16|0))>>2]|0;
        $240 = ($238>>>0)<($239>>>0);
        if ($240) {
         _abort();
         // unreachable;
        } else {
         $$pre$phi$iZ2D = $237;$F1$0$i = $238;
        }
       }
       HEAP32[$$pre$phi$iZ2D>>2] = $228;
       $241 = (($F1$0$i) + 12|0);
       HEAP32[$241>>2] = $228;
       $242 = (($228) + 8|0);
       HEAP32[$242>>2] = $F1$0$i;
       $243 = (($228) + 12|0);
       HEAP32[$243>>2] = $231;
      }
      HEAP32[((8512 + 8|0))>>2] = $rsize$0$i;
      HEAP32[((8512 + 20|0))>>2] = $151;
     }
     $244 = (($v$0$i) + 8|0);
     $mem$0 = $244;
     STACKTOP = sp;return ($mem$0|0);
    }
   } else {
    $nb$0 = $5;
   }
  } else {
   $245 = ($bytes>>>0)>(4294967231);
   if ($245) {
    $nb$0 = -1;
   } else {
    $246 = (($bytes) + 11)|0;
    $247 = $246 & -8;
    $248 = HEAP32[((8512 + 4|0))>>2]|0;
    $249 = ($248|0)==(0);
    if ($249) {
     $nb$0 = $247;
    } else {
     $250 = (0 - ($247))|0;
     $251 = $246 >>> 8;
     $252 = ($251|0)==(0);
     if ($252) {
      $idx$0$i = 0;
     } else {
      $253 = ($247>>>0)>(16777215);
      if ($253) {
       $idx$0$i = 31;
      } else {
       $254 = (($251) + 1048320)|0;
       $255 = $254 >>> 16;
       $256 = $255 & 8;
       $257 = $251 << $256;
       $258 = (($257) + 520192)|0;
       $259 = $258 >>> 16;
       $260 = $259 & 4;
       $261 = $260 | $256;
       $262 = $257 << $260;
       $263 = (($262) + 245760)|0;
       $264 = $263 >>> 16;
       $265 = $264 & 2;
       $266 = $261 | $265;
       $267 = (14 - ($266))|0;
       $268 = $262 << $265;
       $269 = $268 >>> 15;
       $270 = (($267) + ($269))|0;
       $271 = $270 << 1;
       $272 = (($270) + 7)|0;
       $273 = $247 >>> $272;
       $274 = $273 & 1;
       $275 = $274 | $271;
       $idx$0$i = $275;
      }
     }
     $276 = ((8512 + ($idx$0$i<<2)|0) + 304|0);
     $277 = HEAP32[$276>>2]|0;
     $278 = ($277|0)==(0|0);
     L126: do {
      if ($278) {
       $rsize$2$i = $250;$t$1$i = 0;$v$2$i = 0;
      } else {
       $279 = ($idx$0$i|0)==(31);
       if ($279) {
        $283 = 0;
       } else {
        $280 = $idx$0$i >>> 1;
        $281 = (25 - ($280))|0;
        $283 = $281;
       }
       $282 = $247 << $283;
       $rsize$0$i15 = $250;$rst$0$i = 0;$sizebits$0$i = $282;$t$0$i14 = $277;$v$0$i16 = 0;
       while(1) {
        $284 = (($t$0$i14) + 4|0);
        $285 = HEAP32[$284>>2]|0;
        $286 = $285 & -8;
        $287 = (($286) - ($247))|0;
        $288 = ($287>>>0)<($rsize$0$i15>>>0);
        if ($288) {
         $289 = ($286|0)==($247|0);
         if ($289) {
          $rsize$2$i = $287;$t$1$i = $t$0$i14;$v$2$i = $t$0$i14;
          break L126;
         } else {
          $rsize$1$i = $287;$v$1$i = $t$0$i14;
         }
        } else {
         $rsize$1$i = $rsize$0$i15;$v$1$i = $v$0$i16;
        }
        $290 = (($t$0$i14) + 20|0);
        $291 = HEAP32[$290>>2]|0;
        $292 = $sizebits$0$i >>> 31;
        $293 = ((($t$0$i14) + ($292<<2)|0) + 16|0);
        $294 = HEAP32[$293>>2]|0;
        $295 = ($291|0)==(0|0);
        $296 = ($291|0)==($294|0);
        $or$cond$i = $295 | $296;
        $rst$1$i = $or$cond$i ? $rst$0$i : $291;
        $297 = ($294|0)==(0|0);
        $298 = $sizebits$0$i << 1;
        if ($297) {
         $rsize$2$i = $rsize$1$i;$t$1$i = $rst$1$i;$v$2$i = $v$1$i;
         break;
        } else {
         $rsize$0$i15 = $rsize$1$i;$rst$0$i = $rst$1$i;$sizebits$0$i = $298;$t$0$i14 = $294;$v$0$i16 = $v$1$i;
        }
       }
      }
     } while(0);
     $299 = ($t$1$i|0)==(0|0);
     $300 = ($v$2$i|0)==(0|0);
     $or$cond19$i = $299 & $300;
     if ($or$cond19$i) {
      $301 = 2 << $idx$0$i;
      $302 = (0 - ($301))|0;
      $303 = $301 | $302;
      $304 = $248 & $303;
      $305 = ($304|0)==(0);
      if ($305) {
       $nb$0 = $247;
       break;
      }
      $306 = (0 - ($304))|0;
      $307 = $304 & $306;
      $308 = (($307) + -1)|0;
      $309 = $308 >>> 12;
      $310 = $309 & 16;
      $311 = $308 >>> $310;
      $312 = $311 >>> 5;
      $313 = $312 & 8;
      $314 = $313 | $310;
      $315 = $311 >>> $313;
      $316 = $315 >>> 2;
      $317 = $316 & 4;
      $318 = $314 | $317;
      $319 = $315 >>> $317;
      $320 = $319 >>> 1;
      $321 = $320 & 2;
      $322 = $318 | $321;
      $323 = $319 >>> $321;
      $324 = $323 >>> 1;
      $325 = $324 & 1;
      $326 = $322 | $325;
      $327 = $323 >>> $325;
      $328 = (($326) + ($327))|0;
      $329 = ((8512 + ($328<<2)|0) + 304|0);
      $330 = HEAP32[$329>>2]|0;
      $t$2$ph$i = $330;
     } else {
      $t$2$ph$i = $t$1$i;
     }
     $331 = ($t$2$ph$i|0)==(0|0);
     if ($331) {
      $rsize$3$lcssa$i = $rsize$2$i;$v$3$lcssa$i = $v$2$i;
     } else {
      $rsize$329$i = $rsize$2$i;$t$228$i = $t$2$ph$i;$v$330$i = $v$2$i;
      while(1) {
       $332 = (($t$228$i) + 4|0);
       $333 = HEAP32[$332>>2]|0;
       $334 = $333 & -8;
       $335 = (($334) - ($247))|0;
       $336 = ($335>>>0)<($rsize$329$i>>>0);
       $$rsize$3$i = $336 ? $335 : $rsize$329$i;
       $t$2$v$3$i = $336 ? $t$228$i : $v$330$i;
       $337 = (($t$228$i) + 16|0);
       $338 = HEAP32[$337>>2]|0;
       $339 = ($338|0)==(0|0);
       if (!($339)) {
        $rsize$329$i = $$rsize$3$i;$t$228$i = $338;$v$330$i = $t$2$v$3$i;
        continue;
       }
       $340 = (($t$228$i) + 20|0);
       $341 = HEAP32[$340>>2]|0;
       $342 = ($341|0)==(0|0);
       if ($342) {
        $rsize$3$lcssa$i = $$rsize$3$i;$v$3$lcssa$i = $t$2$v$3$i;
        break;
       } else {
        $rsize$329$i = $$rsize$3$i;$t$228$i = $341;$v$330$i = $t$2$v$3$i;
       }
      }
     }
     $343 = ($v$3$lcssa$i|0)==(0|0);
     if ($343) {
      $nb$0 = $247;
     } else {
      $344 = HEAP32[((8512 + 8|0))>>2]|0;
      $345 = (($344) - ($247))|0;
      $346 = ($rsize$3$lcssa$i>>>0)<($345>>>0);
      if ($346) {
       $347 = HEAP32[((8512 + 16|0))>>2]|0;
       $348 = ($v$3$lcssa$i>>>0)<($347>>>0);
       if ($348) {
        _abort();
        // unreachable;
       }
       $349 = (($v$3$lcssa$i) + ($247)|0);
       $350 = ($v$3$lcssa$i>>>0)<($349>>>0);
       if (!($350)) {
        _abort();
        // unreachable;
       }
       $351 = (($v$3$lcssa$i) + 24|0);
       $352 = HEAP32[$351>>2]|0;
       $353 = (($v$3$lcssa$i) + 12|0);
       $354 = HEAP32[$353>>2]|0;
       $355 = ($354|0)==($v$3$lcssa$i|0);
       do {
        if ($355) {
         $365 = (($v$3$lcssa$i) + 20|0);
         $366 = HEAP32[$365>>2]|0;
         $367 = ($366|0)==(0|0);
         if ($367) {
          $368 = (($v$3$lcssa$i) + 16|0);
          $369 = HEAP32[$368>>2]|0;
          $370 = ($369|0)==(0|0);
          if ($370) {
           $R$1$i20 = 0;
           break;
          } else {
           $R$0$i18 = $369;$RP$0$i17 = $368;
          }
         } else {
          $R$0$i18 = $366;$RP$0$i17 = $365;
         }
         while(1) {
          $371 = (($R$0$i18) + 20|0);
          $372 = HEAP32[$371>>2]|0;
          $373 = ($372|0)==(0|0);
          if (!($373)) {
           $R$0$i18 = $372;$RP$0$i17 = $371;
           continue;
          }
          $374 = (($R$0$i18) + 16|0);
          $375 = HEAP32[$374>>2]|0;
          $376 = ($375|0)==(0|0);
          if ($376) {
           break;
          } else {
           $R$0$i18 = $375;$RP$0$i17 = $374;
          }
         }
         $377 = ($RP$0$i17>>>0)<($347>>>0);
         if ($377) {
          _abort();
          // unreachable;
         } else {
          HEAP32[$RP$0$i17>>2] = 0;
          $R$1$i20 = $R$0$i18;
          break;
         }
        } else {
         $356 = (($v$3$lcssa$i) + 8|0);
         $357 = HEAP32[$356>>2]|0;
         $358 = ($357>>>0)<($347>>>0);
         if ($358) {
          _abort();
          // unreachable;
         }
         $359 = (($357) + 12|0);
         $360 = HEAP32[$359>>2]|0;
         $361 = ($360|0)==($v$3$lcssa$i|0);
         if (!($361)) {
          _abort();
          // unreachable;
         }
         $362 = (($354) + 8|0);
         $363 = HEAP32[$362>>2]|0;
         $364 = ($363|0)==($v$3$lcssa$i|0);
         if ($364) {
          HEAP32[$359>>2] = $354;
          HEAP32[$362>>2] = $357;
          $R$1$i20 = $354;
          break;
         } else {
          _abort();
          // unreachable;
         }
        }
       } while(0);
       $378 = ($352|0)==(0|0);
       do {
        if (!($378)) {
         $379 = (($v$3$lcssa$i) + 28|0);
         $380 = HEAP32[$379>>2]|0;
         $381 = ((8512 + ($380<<2)|0) + 304|0);
         $382 = HEAP32[$381>>2]|0;
         $383 = ($v$3$lcssa$i|0)==($382|0);
         if ($383) {
          HEAP32[$381>>2] = $R$1$i20;
          $cond$i21 = ($R$1$i20|0)==(0|0);
          if ($cond$i21) {
           $384 = 1 << $380;
           $385 = $384 ^ -1;
           $386 = HEAP32[((8512 + 4|0))>>2]|0;
           $387 = $386 & $385;
           HEAP32[((8512 + 4|0))>>2] = $387;
           break;
          }
         } else {
          $388 = HEAP32[((8512 + 16|0))>>2]|0;
          $389 = ($352>>>0)<($388>>>0);
          if ($389) {
           _abort();
           // unreachable;
          }
          $390 = (($352) + 16|0);
          $391 = HEAP32[$390>>2]|0;
          $392 = ($391|0)==($v$3$lcssa$i|0);
          if ($392) {
           HEAP32[$390>>2] = $R$1$i20;
          } else {
           $393 = (($352) + 20|0);
           HEAP32[$393>>2] = $R$1$i20;
          }
          $394 = ($R$1$i20|0)==(0|0);
          if ($394) {
           break;
          }
         }
         $395 = HEAP32[((8512 + 16|0))>>2]|0;
         $396 = ($R$1$i20>>>0)<($395>>>0);
         if ($396) {
          _abort();
          // unreachable;
         }
         $397 = (($R$1$i20) + 24|0);
         HEAP32[$397>>2] = $352;
         $398 = (($v$3$lcssa$i) + 16|0);
         $399 = HEAP32[$398>>2]|0;
         $400 = ($399|0)==(0|0);
         do {
          if (!($400)) {
           $401 = HEAP32[((8512 + 16|0))>>2]|0;
           $402 = ($399>>>0)<($401>>>0);
           if ($402) {
            _abort();
            // unreachable;
           } else {
            $403 = (($R$1$i20) + 16|0);
            HEAP32[$403>>2] = $399;
            $404 = (($399) + 24|0);
            HEAP32[$404>>2] = $R$1$i20;
            break;
           }
          }
         } while(0);
         $405 = (($v$3$lcssa$i) + 20|0);
         $406 = HEAP32[$405>>2]|0;
         $407 = ($406|0)==(0|0);
         if (!($407)) {
          $408 = HEAP32[((8512 + 16|0))>>2]|0;
          $409 = ($406>>>0)<($408>>>0);
          if ($409) {
           _abort();
           // unreachable;
          } else {
           $410 = (($R$1$i20) + 20|0);
           HEAP32[$410>>2] = $406;
           $411 = (($406) + 24|0);
           HEAP32[$411>>2] = $R$1$i20;
           break;
          }
         }
        }
       } while(0);
       $412 = ($rsize$3$lcssa$i>>>0)<(16);
       L204: do {
        if ($412) {
         $413 = (($rsize$3$lcssa$i) + ($247))|0;
         $414 = $413 | 3;
         $415 = (($v$3$lcssa$i) + 4|0);
         HEAP32[$415>>2] = $414;
         $$sum18$i = (($413) + 4)|0;
         $416 = (($v$3$lcssa$i) + ($$sum18$i)|0);
         $417 = HEAP32[$416>>2]|0;
         $418 = $417 | 1;
         HEAP32[$416>>2] = $418;
        } else {
         $419 = $247 | 3;
         $420 = (($v$3$lcssa$i) + 4|0);
         HEAP32[$420>>2] = $419;
         $421 = $rsize$3$lcssa$i | 1;
         $$sum$i2334 = $247 | 4;
         $422 = (($v$3$lcssa$i) + ($$sum$i2334)|0);
         HEAP32[$422>>2] = $421;
         $$sum1$i24 = (($rsize$3$lcssa$i) + ($247))|0;
         $423 = (($v$3$lcssa$i) + ($$sum1$i24)|0);
         HEAP32[$423>>2] = $rsize$3$lcssa$i;
         $424 = $rsize$3$lcssa$i >>> 3;
         $425 = ($rsize$3$lcssa$i>>>0)<(256);
         if ($425) {
          $426 = $424 << 1;
          $427 = ((8512 + ($426<<2)|0) + 40|0);
          $428 = HEAP32[8512>>2]|0;
          $429 = 1 << $424;
          $430 = $428 & $429;
          $431 = ($430|0)==(0);
          do {
           if ($431) {
            $432 = $428 | $429;
            HEAP32[8512>>2] = $432;
            $$sum14$pre$i = (($426) + 2)|0;
            $$pre$i25 = ((8512 + ($$sum14$pre$i<<2)|0) + 40|0);
            $$pre$phi$i26Z2D = $$pre$i25;$F5$0$i = $427;
           } else {
            $$sum17$i = (($426) + 2)|0;
            $433 = ((8512 + ($$sum17$i<<2)|0) + 40|0);
            $434 = HEAP32[$433>>2]|0;
            $435 = HEAP32[((8512 + 16|0))>>2]|0;
            $436 = ($434>>>0)<($435>>>0);
            if (!($436)) {
             $$pre$phi$i26Z2D = $433;$F5$0$i = $434;
             break;
            }
            _abort();
            // unreachable;
           }
          } while(0);
          HEAP32[$$pre$phi$i26Z2D>>2] = $349;
          $437 = (($F5$0$i) + 12|0);
          HEAP32[$437>>2] = $349;
          $$sum15$i = (($247) + 8)|0;
          $438 = (($v$3$lcssa$i) + ($$sum15$i)|0);
          HEAP32[$438>>2] = $F5$0$i;
          $$sum16$i = (($247) + 12)|0;
          $439 = (($v$3$lcssa$i) + ($$sum16$i)|0);
          HEAP32[$439>>2] = $427;
          break;
         }
         $440 = $rsize$3$lcssa$i >>> 8;
         $441 = ($440|0)==(0);
         if ($441) {
          $I7$0$i = 0;
         } else {
          $442 = ($rsize$3$lcssa$i>>>0)>(16777215);
          if ($442) {
           $I7$0$i = 31;
          } else {
           $443 = (($440) + 1048320)|0;
           $444 = $443 >>> 16;
           $445 = $444 & 8;
           $446 = $440 << $445;
           $447 = (($446) + 520192)|0;
           $448 = $447 >>> 16;
           $449 = $448 & 4;
           $450 = $449 | $445;
           $451 = $446 << $449;
           $452 = (($451) + 245760)|0;
           $453 = $452 >>> 16;
           $454 = $453 & 2;
           $455 = $450 | $454;
           $456 = (14 - ($455))|0;
           $457 = $451 << $454;
           $458 = $457 >>> 15;
           $459 = (($456) + ($458))|0;
           $460 = $459 << 1;
           $461 = (($459) + 7)|0;
           $462 = $rsize$3$lcssa$i >>> $461;
           $463 = $462 & 1;
           $464 = $463 | $460;
           $I7$0$i = $464;
          }
         }
         $465 = ((8512 + ($I7$0$i<<2)|0) + 304|0);
         $$sum2$i = (($247) + 28)|0;
         $466 = (($v$3$lcssa$i) + ($$sum2$i)|0);
         HEAP32[$466>>2] = $I7$0$i;
         $$sum3$i27 = (($247) + 16)|0;
         $467 = (($v$3$lcssa$i) + ($$sum3$i27)|0);
         $$sum4$i28 = (($247) + 20)|0;
         $468 = (($v$3$lcssa$i) + ($$sum4$i28)|0);
         HEAP32[$468>>2] = 0;
         HEAP32[$467>>2] = 0;
         $469 = HEAP32[((8512 + 4|0))>>2]|0;
         $470 = 1 << $I7$0$i;
         $471 = $469 & $470;
         $472 = ($471|0)==(0);
         if ($472) {
          $473 = $469 | $470;
          HEAP32[((8512 + 4|0))>>2] = $473;
          HEAP32[$465>>2] = $349;
          $$sum5$i = (($247) + 24)|0;
          $474 = (($v$3$lcssa$i) + ($$sum5$i)|0);
          HEAP32[$474>>2] = $465;
          $$sum6$i = (($247) + 12)|0;
          $475 = (($v$3$lcssa$i) + ($$sum6$i)|0);
          HEAP32[$475>>2] = $349;
          $$sum7$i = (($247) + 8)|0;
          $476 = (($v$3$lcssa$i) + ($$sum7$i)|0);
          HEAP32[$476>>2] = $349;
          break;
         }
         $477 = HEAP32[$465>>2]|0;
         $478 = ($I7$0$i|0)==(31);
         if ($478) {
          $486 = 0;
         } else {
          $479 = $I7$0$i >>> 1;
          $480 = (25 - ($479))|0;
          $486 = $480;
         }
         $481 = (($477) + 4|0);
         $482 = HEAP32[$481>>2]|0;
         $483 = $482 & -8;
         $484 = ($483|0)==($rsize$3$lcssa$i|0);
         L224: do {
          if ($484) {
           $T$0$lcssa$i = $477;
          } else {
           $485 = $rsize$3$lcssa$i << $486;
           $K12$025$i = $485;$T$024$i = $477;
           while(1) {
            $493 = $K12$025$i >>> 31;
            $494 = ((($T$024$i) + ($493<<2)|0) + 16|0);
            $489 = HEAP32[$494>>2]|0;
            $495 = ($489|0)==(0|0);
            if ($495) {
             break;
            }
            $487 = $K12$025$i << 1;
            $488 = (($489) + 4|0);
            $490 = HEAP32[$488>>2]|0;
            $491 = $490 & -8;
            $492 = ($491|0)==($rsize$3$lcssa$i|0);
            if ($492) {
             $T$0$lcssa$i = $489;
             break L224;
            } else {
             $K12$025$i = $487;$T$024$i = $489;
            }
           }
           $496 = HEAP32[((8512 + 16|0))>>2]|0;
           $497 = ($494>>>0)<($496>>>0);
           if ($497) {
            _abort();
            // unreachable;
           } else {
            HEAP32[$494>>2] = $349;
            $$sum11$i = (($247) + 24)|0;
            $498 = (($v$3$lcssa$i) + ($$sum11$i)|0);
            HEAP32[$498>>2] = $T$024$i;
            $$sum12$i = (($247) + 12)|0;
            $499 = (($v$3$lcssa$i) + ($$sum12$i)|0);
            HEAP32[$499>>2] = $349;
            $$sum13$i = (($247) + 8)|0;
            $500 = (($v$3$lcssa$i) + ($$sum13$i)|0);
            HEAP32[$500>>2] = $349;
            break L204;
           }
          }
         } while(0);
         $501 = (($T$0$lcssa$i) + 8|0);
         $502 = HEAP32[$501>>2]|0;
         $503 = HEAP32[((8512 + 16|0))>>2]|0;
         $504 = ($T$0$lcssa$i>>>0)<($503>>>0);
         if ($504) {
          _abort();
          // unreachable;
         }
         $505 = ($502>>>0)<($503>>>0);
         if ($505) {
          _abort();
          // unreachable;
         } else {
          $506 = (($502) + 12|0);
          HEAP32[$506>>2] = $349;
          HEAP32[$501>>2] = $349;
          $$sum8$i = (($247) + 8)|0;
          $507 = (($v$3$lcssa$i) + ($$sum8$i)|0);
          HEAP32[$507>>2] = $502;
          $$sum9$i = (($247) + 12)|0;
          $508 = (($v$3$lcssa$i) + ($$sum9$i)|0);
          HEAP32[$508>>2] = $T$0$lcssa$i;
          $$sum10$i = (($247) + 24)|0;
          $509 = (($v$3$lcssa$i) + ($$sum10$i)|0);
          HEAP32[$509>>2] = 0;
          break;
         }
        }
       } while(0);
       $510 = (($v$3$lcssa$i) + 8|0);
       $mem$0 = $510;
       STACKTOP = sp;return ($mem$0|0);
      } else {
       $nb$0 = $247;
      }
     }
    }
   }
  }
 } while(0);
 $511 = HEAP32[((8512 + 8|0))>>2]|0;
 $512 = ($nb$0>>>0)>($511>>>0);
 if (!($512)) {
  $513 = (($511) - ($nb$0))|0;
  $514 = HEAP32[((8512 + 20|0))>>2]|0;
  $515 = ($513>>>0)>(15);
  if ($515) {
   $516 = (($514) + ($nb$0)|0);
   HEAP32[((8512 + 20|0))>>2] = $516;
   HEAP32[((8512 + 8|0))>>2] = $513;
   $517 = $513 | 1;
   $$sum2 = (($nb$0) + 4)|0;
   $518 = (($514) + ($$sum2)|0);
   HEAP32[$518>>2] = $517;
   $519 = (($514) + ($511)|0);
   HEAP32[$519>>2] = $513;
   $520 = $nb$0 | 3;
   $521 = (($514) + 4|0);
   HEAP32[$521>>2] = $520;
  } else {
   HEAP32[((8512 + 8|0))>>2] = 0;
   HEAP32[((8512 + 20|0))>>2] = 0;
   $522 = $511 | 3;
   $523 = (($514) + 4|0);
   HEAP32[$523>>2] = $522;
   $$sum1 = (($511) + 4)|0;
   $524 = (($514) + ($$sum1)|0);
   $525 = HEAP32[$524>>2]|0;
   $526 = $525 | 1;
   HEAP32[$524>>2] = $526;
  }
  $527 = (($514) + 8|0);
  $mem$0 = $527;
  STACKTOP = sp;return ($mem$0|0);
 }
 $528 = HEAP32[((8512 + 12|0))>>2]|0;
 $529 = ($nb$0>>>0)<($528>>>0);
 if ($529) {
  $530 = (($528) - ($nb$0))|0;
  HEAP32[((8512 + 12|0))>>2] = $530;
  $531 = HEAP32[((8512 + 24|0))>>2]|0;
  $532 = (($531) + ($nb$0)|0);
  HEAP32[((8512 + 24|0))>>2] = $532;
  $533 = $530 | 1;
  $$sum = (($nb$0) + 4)|0;
  $534 = (($531) + ($$sum)|0);
  HEAP32[$534>>2] = $533;
  $535 = $nb$0 | 3;
  $536 = (($531) + 4|0);
  HEAP32[$536>>2] = $535;
  $537 = (($531) + 8|0);
  $mem$0 = $537;
  STACKTOP = sp;return ($mem$0|0);
 }
 $538 = HEAP32[8984>>2]|0;
 $539 = ($538|0)==(0);
 do {
  if ($539) {
   $540 = (_sysconf(30)|0);
   $541 = (($540) + -1)|0;
   $542 = $541 & $540;
   $543 = ($542|0)==(0);
   if ($543) {
    HEAP32[((8984 + 8|0))>>2] = $540;
    HEAP32[((8984 + 4|0))>>2] = $540;
    HEAP32[((8984 + 12|0))>>2] = -1;
    HEAP32[((8984 + 16|0))>>2] = -1;
    HEAP32[((8984 + 20|0))>>2] = 0;
    HEAP32[((8512 + 444|0))>>2] = 0;
    $544 = (_time((0|0))|0);
    $545 = $544 & -16;
    $546 = $545 ^ 1431655768;
    HEAP32[8984>>2] = $546;
    break;
   } else {
    _abort();
    // unreachable;
   }
  }
 } while(0);
 $547 = (($nb$0) + 48)|0;
 $548 = HEAP32[((8984 + 8|0))>>2]|0;
 $549 = (($nb$0) + 47)|0;
 $550 = (($548) + ($549))|0;
 $551 = (0 - ($548))|0;
 $552 = $550 & $551;
 $553 = ($552>>>0)>($nb$0>>>0);
 if (!($553)) {
  $mem$0 = 0;
  STACKTOP = sp;return ($mem$0|0);
 }
 $554 = HEAP32[((8512 + 440|0))>>2]|0;
 $555 = ($554|0)==(0);
 if (!($555)) {
  $556 = HEAP32[((8512 + 432|0))>>2]|0;
  $557 = (($556) + ($552))|0;
  $558 = ($557>>>0)<=($556>>>0);
  $559 = ($557>>>0)>($554>>>0);
  $or$cond1$i = $558 | $559;
  if ($or$cond1$i) {
   $mem$0 = 0;
   STACKTOP = sp;return ($mem$0|0);
  }
 }
 $560 = HEAP32[((8512 + 444|0))>>2]|0;
 $561 = $560 & 4;
 $562 = ($561|0)==(0);
 L269: do {
  if ($562) {
   $563 = HEAP32[((8512 + 24|0))>>2]|0;
   $564 = ($563|0)==(0|0);
   L271: do {
    if ($564) {
     label = 182;
    } else {
     $sp$0$i$i = ((8512 + 448|0));
     while(1) {
      $565 = HEAP32[$sp$0$i$i>>2]|0;
      $566 = ($565>>>0)>($563>>>0);
      if (!($566)) {
       $567 = (($sp$0$i$i) + 4|0);
       $568 = HEAP32[$567>>2]|0;
       $569 = (($565) + ($568)|0);
       $570 = ($569>>>0)>($563>>>0);
       if ($570) {
        break;
       }
      }
      $571 = (($sp$0$i$i) + 8|0);
      $572 = HEAP32[$571>>2]|0;
      $573 = ($572|0)==(0|0);
      if ($573) {
       label = 182;
       break L271;
      } else {
       $sp$0$i$i = $572;
      }
     }
     $574 = ($sp$0$i$i|0)==(0|0);
     if ($574) {
      label = 182;
     } else {
      $597 = HEAP32[((8512 + 12|0))>>2]|0;
      $598 = (($550) - ($597))|0;
      $599 = $598 & $551;
      $600 = ($599>>>0)<(2147483647);
      if ($600) {
       $601 = (_sbrk(($599|0))|0);
       $602 = HEAP32[$sp$0$i$i>>2]|0;
       $603 = HEAP32[$567>>2]|0;
       $604 = (($602) + ($603)|0);
       $605 = ($601|0)==($604|0);
       $$3$i = $605 ? $599 : 0;
       $$4$i = $605 ? $601 : (-1);
       $br$0$i = $601;$ssize$1$i = $599;$tbase$0$i = $$4$i;$tsize$0$i = $$3$i;
       label = 191;
      } else {
       $tsize$0323841$i = 0;
      }
     }
    }
   } while(0);
   do {
    if ((label|0) == 182) {
     $575 = (_sbrk(0)|0);
     $576 = ($575|0)==((-1)|0);
     if ($576) {
      $tsize$0323841$i = 0;
     } else {
      $577 = $575;
      $578 = HEAP32[((8984 + 4|0))>>2]|0;
      $579 = (($578) + -1)|0;
      $580 = $579 & $577;
      $581 = ($580|0)==(0);
      if ($581) {
       $ssize$0$i = $552;
      } else {
       $582 = (($579) + ($577))|0;
       $583 = (0 - ($578))|0;
       $584 = $582 & $583;
       $585 = (($552) - ($577))|0;
       $586 = (($585) + ($584))|0;
       $ssize$0$i = $586;
      }
      $587 = HEAP32[((8512 + 432|0))>>2]|0;
      $588 = (($587) + ($ssize$0$i))|0;
      $589 = ($ssize$0$i>>>0)>($nb$0>>>0);
      $590 = ($ssize$0$i>>>0)<(2147483647);
      $or$cond$i29 = $589 & $590;
      if ($or$cond$i29) {
       $591 = HEAP32[((8512 + 440|0))>>2]|0;
       $592 = ($591|0)==(0);
       if (!($592)) {
        $593 = ($588>>>0)<=($587>>>0);
        $594 = ($588>>>0)>($591>>>0);
        $or$cond2$i = $593 | $594;
        if ($or$cond2$i) {
         $tsize$0323841$i = 0;
         break;
        }
       }
       $595 = (_sbrk(($ssize$0$i|0))|0);
       $596 = ($595|0)==($575|0);
       $ssize$0$$i = $596 ? $ssize$0$i : 0;
       $$$i = $596 ? $575 : (-1);
       $br$0$i = $595;$ssize$1$i = $ssize$0$i;$tbase$0$i = $$$i;$tsize$0$i = $ssize$0$$i;
       label = 191;
      } else {
       $tsize$0323841$i = 0;
      }
     }
    }
   } while(0);
   L291: do {
    if ((label|0) == 191) {
     $606 = (0 - ($ssize$1$i))|0;
     $607 = ($tbase$0$i|0)==((-1)|0);
     if (!($607)) {
      $tbase$247$i = $tbase$0$i;$tsize$246$i = $tsize$0$i;
      label = 202;
      break L269;
     }
     $608 = ($br$0$i|0)!=((-1)|0);
     $609 = ($ssize$1$i>>>0)<(2147483647);
     $or$cond5$i = $608 & $609;
     $610 = ($ssize$1$i>>>0)<($547>>>0);
     $or$cond6$i = $or$cond5$i & $610;
     do {
      if ($or$cond6$i) {
       $611 = HEAP32[((8984 + 8|0))>>2]|0;
       $612 = (($549) - ($ssize$1$i))|0;
       $613 = (($612) + ($611))|0;
       $614 = (0 - ($611))|0;
       $615 = $613 & $614;
       $616 = ($615>>>0)<(2147483647);
       if ($616) {
        $617 = (_sbrk(($615|0))|0);
        $618 = ($617|0)==((-1)|0);
        if ($618) {
         (_sbrk(($606|0))|0);
         $tsize$0323841$i = $tsize$0$i;
         break L291;
        } else {
         $619 = (($615) + ($ssize$1$i))|0;
         $ssize$2$i = $619;
         break;
        }
       } else {
        $ssize$2$i = $ssize$1$i;
       }
      } else {
       $ssize$2$i = $ssize$1$i;
      }
     } while(0);
     $620 = ($br$0$i|0)==((-1)|0);
     if ($620) {
      $tsize$0323841$i = $tsize$0$i;
     } else {
      $tbase$247$i = $br$0$i;$tsize$246$i = $ssize$2$i;
      label = 202;
      break L269;
     }
    }
   } while(0);
   $621 = HEAP32[((8512 + 444|0))>>2]|0;
   $622 = $621 | 4;
   HEAP32[((8512 + 444|0))>>2] = $622;
   $tsize$1$i = $tsize$0323841$i;
   label = 199;
  } else {
   $tsize$1$i = 0;
   label = 199;
  }
 } while(0);
 if ((label|0) == 199) {
  $623 = ($552>>>0)<(2147483647);
  if ($623) {
   $624 = (_sbrk(($552|0))|0);
   $625 = (_sbrk(0)|0);
   $notlhs$i = ($624|0)!=((-1)|0);
   $notrhs$i = ($625|0)!=((-1)|0);
   $or$cond8$not$i = $notrhs$i & $notlhs$i;
   $626 = ($624>>>0)<($625>>>0);
   $or$cond9$i = $or$cond8$not$i & $626;
   if ($or$cond9$i) {
    $627 = $625;
    $628 = $624;
    $629 = (($627) - ($628))|0;
    $630 = (($nb$0) + 40)|0;
    $631 = ($629>>>0)>($630>>>0);
    $$tsize$1$i = $631 ? $629 : $tsize$1$i;
    if ($631) {
     $tbase$247$i = $624;$tsize$246$i = $$tsize$1$i;
     label = 202;
    }
   }
  }
 }
 if ((label|0) == 202) {
  $632 = HEAP32[((8512 + 432|0))>>2]|0;
  $633 = (($632) + ($tsize$246$i))|0;
  HEAP32[((8512 + 432|0))>>2] = $633;
  $634 = HEAP32[((8512 + 436|0))>>2]|0;
  $635 = ($633>>>0)>($634>>>0);
  if ($635) {
   HEAP32[((8512 + 436|0))>>2] = $633;
  }
  $636 = HEAP32[((8512 + 24|0))>>2]|0;
  $637 = ($636|0)==(0|0);
  L311: do {
   if ($637) {
    $638 = HEAP32[((8512 + 16|0))>>2]|0;
    $639 = ($638|0)==(0|0);
    $640 = ($tbase$247$i>>>0)<($638>>>0);
    $or$cond10$i = $639 | $640;
    if ($or$cond10$i) {
     HEAP32[((8512 + 16|0))>>2] = $tbase$247$i;
    }
    HEAP32[((8512 + 448|0))>>2] = $tbase$247$i;
    HEAP32[((8512 + 452|0))>>2] = $tsize$246$i;
    HEAP32[((8512 + 460|0))>>2] = 0;
    $641 = HEAP32[8984>>2]|0;
    HEAP32[((8512 + 36|0))>>2] = $641;
    HEAP32[((8512 + 32|0))>>2] = -1;
    $i$02$i$i = 0;
    while(1) {
     $642 = $i$02$i$i << 1;
     $643 = ((8512 + ($642<<2)|0) + 40|0);
     $$sum$i$i = (($642) + 3)|0;
     $644 = ((8512 + ($$sum$i$i<<2)|0) + 40|0);
     HEAP32[$644>>2] = $643;
     $$sum1$i$i = (($642) + 2)|0;
     $645 = ((8512 + ($$sum1$i$i<<2)|0) + 40|0);
     HEAP32[$645>>2] = $643;
     $646 = (($i$02$i$i) + 1)|0;
     $exitcond$i$i = ($646|0)==(32);
     if ($exitcond$i$i) {
      break;
     } else {
      $i$02$i$i = $646;
     }
    }
    $647 = (($tsize$246$i) + -40)|0;
    $648 = (($tbase$247$i) + 8|0);
    $649 = $648;
    $650 = $649 & 7;
    $651 = ($650|0)==(0);
    if ($651) {
     $655 = 0;
    } else {
     $652 = (0 - ($649))|0;
     $653 = $652 & 7;
     $655 = $653;
    }
    $654 = (($tbase$247$i) + ($655)|0);
    $656 = (($647) - ($655))|0;
    HEAP32[((8512 + 24|0))>>2] = $654;
    HEAP32[((8512 + 12|0))>>2] = $656;
    $657 = $656 | 1;
    $$sum$i14$i = (($655) + 4)|0;
    $658 = (($tbase$247$i) + ($$sum$i14$i)|0);
    HEAP32[$658>>2] = $657;
    $$sum2$i$i = (($tsize$246$i) + -36)|0;
    $659 = (($tbase$247$i) + ($$sum2$i$i)|0);
    HEAP32[$659>>2] = 40;
    $660 = HEAP32[((8984 + 16|0))>>2]|0;
    HEAP32[((8512 + 28|0))>>2] = $660;
   } else {
    $sp$075$i = ((8512 + 448|0));
    while(1) {
     $661 = HEAP32[$sp$075$i>>2]|0;
     $662 = (($sp$075$i) + 4|0);
     $663 = HEAP32[$662>>2]|0;
     $664 = (($661) + ($663)|0);
     $665 = ($tbase$247$i|0)==($664|0);
     if ($665) {
      label = 214;
      break;
     }
     $666 = (($sp$075$i) + 8|0);
     $667 = HEAP32[$666>>2]|0;
     $668 = ($667|0)==(0|0);
     if ($668) {
      break;
     } else {
      $sp$075$i = $667;
     }
    }
    if ((label|0) == 214) {
     $669 = (($sp$075$i) + 12|0);
     $670 = HEAP32[$669>>2]|0;
     $671 = $670 & 8;
     $672 = ($671|0)==(0);
     if ($672) {
      $673 = ($636>>>0)>=($661>>>0);
      $674 = ($636>>>0)<($tbase$247$i>>>0);
      $or$cond49$i = $673 & $674;
      if ($or$cond49$i) {
       $675 = (($663) + ($tsize$246$i))|0;
       HEAP32[$662>>2] = $675;
       $676 = HEAP32[((8512 + 12|0))>>2]|0;
       $677 = (($676) + ($tsize$246$i))|0;
       $678 = (($636) + 8|0);
       $679 = $678;
       $680 = $679 & 7;
       $681 = ($680|0)==(0);
       if ($681) {
        $685 = 0;
       } else {
        $682 = (0 - ($679))|0;
        $683 = $682 & 7;
        $685 = $683;
       }
       $684 = (($636) + ($685)|0);
       $686 = (($677) - ($685))|0;
       HEAP32[((8512 + 24|0))>>2] = $684;
       HEAP32[((8512 + 12|0))>>2] = $686;
       $687 = $686 | 1;
       $$sum$i18$i = (($685) + 4)|0;
       $688 = (($636) + ($$sum$i18$i)|0);
       HEAP32[$688>>2] = $687;
       $$sum2$i19$i = (($677) + 4)|0;
       $689 = (($636) + ($$sum2$i19$i)|0);
       HEAP32[$689>>2] = 40;
       $690 = HEAP32[((8984 + 16|0))>>2]|0;
       HEAP32[((8512 + 28|0))>>2] = $690;
       break;
      }
     }
    }
    $691 = HEAP32[((8512 + 16|0))>>2]|0;
    $692 = ($tbase$247$i>>>0)<($691>>>0);
    if ($692) {
     HEAP32[((8512 + 16|0))>>2] = $tbase$247$i;
    }
    $693 = (($tbase$247$i) + ($tsize$246$i)|0);
    $sp$168$i = ((8512 + 448|0));
    while(1) {
     $694 = HEAP32[$sp$168$i>>2]|0;
     $695 = ($694|0)==($693|0);
     if ($695) {
      label = 224;
      break;
     }
     $696 = (($sp$168$i) + 8|0);
     $697 = HEAP32[$696>>2]|0;
     $698 = ($697|0)==(0|0);
     if ($698) {
      break;
     } else {
      $sp$168$i = $697;
     }
    }
    if ((label|0) == 224) {
     $699 = (($sp$168$i) + 12|0);
     $700 = HEAP32[$699>>2]|0;
     $701 = $700 & 8;
     $702 = ($701|0)==(0);
     if ($702) {
      HEAP32[$sp$168$i>>2] = $tbase$247$i;
      $703 = (($sp$168$i) + 4|0);
      $704 = HEAP32[$703>>2]|0;
      $705 = (($704) + ($tsize$246$i))|0;
      HEAP32[$703>>2] = $705;
      $706 = (($tbase$247$i) + 8|0);
      $707 = $706;
      $708 = $707 & 7;
      $709 = ($708|0)==(0);
      if ($709) {
       $713 = 0;
      } else {
       $710 = (0 - ($707))|0;
       $711 = $710 & 7;
       $713 = $711;
      }
      $712 = (($tbase$247$i) + ($713)|0);
      $$sum107$i = (($tsize$246$i) + 8)|0;
      $714 = (($tbase$247$i) + ($$sum107$i)|0);
      $715 = $714;
      $716 = $715 & 7;
      $717 = ($716|0)==(0);
      if ($717) {
       $720 = 0;
      } else {
       $718 = (0 - ($715))|0;
       $719 = $718 & 7;
       $720 = $719;
      }
      $$sum108$i = (($720) + ($tsize$246$i))|0;
      $721 = (($tbase$247$i) + ($$sum108$i)|0);
      $722 = $721;
      $723 = $712;
      $724 = (($722) - ($723))|0;
      $$sum$i21$i = (($713) + ($nb$0))|0;
      $725 = (($tbase$247$i) + ($$sum$i21$i)|0);
      $726 = (($724) - ($nb$0))|0;
      $727 = $nb$0 | 3;
      $$sum1$i22$i = (($713) + 4)|0;
      $728 = (($tbase$247$i) + ($$sum1$i22$i)|0);
      HEAP32[$728>>2] = $727;
      $729 = HEAP32[((8512 + 24|0))>>2]|0;
      $730 = ($721|0)==($729|0);
      L348: do {
       if ($730) {
        $731 = HEAP32[((8512 + 12|0))>>2]|0;
        $732 = (($731) + ($726))|0;
        HEAP32[((8512 + 12|0))>>2] = $732;
        HEAP32[((8512 + 24|0))>>2] = $725;
        $733 = $732 | 1;
        $$sum42$i$i = (($$sum$i21$i) + 4)|0;
        $734 = (($tbase$247$i) + ($$sum42$i$i)|0);
        HEAP32[$734>>2] = $733;
       } else {
        $735 = HEAP32[((8512 + 20|0))>>2]|0;
        $736 = ($721|0)==($735|0);
        if ($736) {
         $737 = HEAP32[((8512 + 8|0))>>2]|0;
         $738 = (($737) + ($726))|0;
         HEAP32[((8512 + 8|0))>>2] = $738;
         HEAP32[((8512 + 20|0))>>2] = $725;
         $739 = $738 | 1;
         $$sum40$i$i = (($$sum$i21$i) + 4)|0;
         $740 = (($tbase$247$i) + ($$sum40$i$i)|0);
         HEAP32[$740>>2] = $739;
         $$sum41$i$i = (($738) + ($$sum$i21$i))|0;
         $741 = (($tbase$247$i) + ($$sum41$i$i)|0);
         HEAP32[$741>>2] = $738;
         break;
        }
        $$sum2$i23$i = (($tsize$246$i) + 4)|0;
        $$sum109$i = (($$sum2$i23$i) + ($720))|0;
        $742 = (($tbase$247$i) + ($$sum109$i)|0);
        $743 = HEAP32[$742>>2]|0;
        $744 = $743 & 3;
        $745 = ($744|0)==(1);
        if ($745) {
         $746 = $743 & -8;
         $747 = $743 >>> 3;
         $748 = ($743>>>0)<(256);
         L356: do {
          if ($748) {
           $$sum3738$i$i = $720 | 8;
           $$sum119$i = (($$sum3738$i$i) + ($tsize$246$i))|0;
           $749 = (($tbase$247$i) + ($$sum119$i)|0);
           $750 = HEAP32[$749>>2]|0;
           $$sum39$i$i = (($tsize$246$i) + 12)|0;
           $$sum120$i = (($$sum39$i$i) + ($720))|0;
           $751 = (($tbase$247$i) + ($$sum120$i)|0);
           $752 = HEAP32[$751>>2]|0;
           $753 = $747 << 1;
           $754 = ((8512 + ($753<<2)|0) + 40|0);
           $755 = ($750|0)==($754|0);
           do {
            if (!($755)) {
             $756 = HEAP32[((8512 + 16|0))>>2]|0;
             $757 = ($750>>>0)<($756>>>0);
             if ($757) {
              _abort();
              // unreachable;
             }
             $758 = (($750) + 12|0);
             $759 = HEAP32[$758>>2]|0;
             $760 = ($759|0)==($721|0);
             if ($760) {
              break;
             }
             _abort();
             // unreachable;
            }
           } while(0);
           $761 = ($752|0)==($750|0);
           if ($761) {
            $762 = 1 << $747;
            $763 = $762 ^ -1;
            $764 = HEAP32[8512>>2]|0;
            $765 = $764 & $763;
            HEAP32[8512>>2] = $765;
            break;
           }
           $766 = ($752|0)==($754|0);
           do {
            if ($766) {
             $$pre57$i$i = (($752) + 8|0);
             $$pre$phi58$i$iZ2D = $$pre57$i$i;
            } else {
             $767 = HEAP32[((8512 + 16|0))>>2]|0;
             $768 = ($752>>>0)<($767>>>0);
             if ($768) {
              _abort();
              // unreachable;
             }
             $769 = (($752) + 8|0);
             $770 = HEAP32[$769>>2]|0;
             $771 = ($770|0)==($721|0);
             if ($771) {
              $$pre$phi58$i$iZ2D = $769;
              break;
             }
             _abort();
             // unreachable;
            }
           } while(0);
           $772 = (($750) + 12|0);
           HEAP32[$772>>2] = $752;
           HEAP32[$$pre$phi58$i$iZ2D>>2] = $750;
          } else {
           $$sum34$i$i = $720 | 24;
           $$sum110$i = (($$sum34$i$i) + ($tsize$246$i))|0;
           $773 = (($tbase$247$i) + ($$sum110$i)|0);
           $774 = HEAP32[$773>>2]|0;
           $$sum5$i$i = (($tsize$246$i) + 12)|0;
           $$sum111$i = (($$sum5$i$i) + ($720))|0;
           $775 = (($tbase$247$i) + ($$sum111$i)|0);
           $776 = HEAP32[$775>>2]|0;
           $777 = ($776|0)==($721|0);
           do {
            if ($777) {
             $$sum67$i$i = $720 | 16;
             $$sum117$i = (($$sum2$i23$i) + ($$sum67$i$i))|0;
             $788 = (($tbase$247$i) + ($$sum117$i)|0);
             $789 = HEAP32[$788>>2]|0;
             $790 = ($789|0)==(0|0);
             if ($790) {
              $$sum118$i = (($$sum67$i$i) + ($tsize$246$i))|0;
              $791 = (($tbase$247$i) + ($$sum118$i)|0);
              $792 = HEAP32[$791>>2]|0;
              $793 = ($792|0)==(0|0);
              if ($793) {
               $R$1$i$i = 0;
               break;
              } else {
               $R$0$i$i = $792;$RP$0$i$i = $791;
              }
             } else {
              $R$0$i$i = $789;$RP$0$i$i = $788;
             }
             while(1) {
              $794 = (($R$0$i$i) + 20|0);
              $795 = HEAP32[$794>>2]|0;
              $796 = ($795|0)==(0|0);
              if (!($796)) {
               $R$0$i$i = $795;$RP$0$i$i = $794;
               continue;
              }
              $797 = (($R$0$i$i) + 16|0);
              $798 = HEAP32[$797>>2]|0;
              $799 = ($798|0)==(0|0);
              if ($799) {
               break;
              } else {
               $R$0$i$i = $798;$RP$0$i$i = $797;
              }
             }
             $800 = HEAP32[((8512 + 16|0))>>2]|0;
             $801 = ($RP$0$i$i>>>0)<($800>>>0);
             if ($801) {
              _abort();
              // unreachable;
             } else {
              HEAP32[$RP$0$i$i>>2] = 0;
              $R$1$i$i = $R$0$i$i;
              break;
             }
            } else {
             $$sum3536$i$i = $720 | 8;
             $$sum112$i = (($$sum3536$i$i) + ($tsize$246$i))|0;
             $778 = (($tbase$247$i) + ($$sum112$i)|0);
             $779 = HEAP32[$778>>2]|0;
             $780 = HEAP32[((8512 + 16|0))>>2]|0;
             $781 = ($779>>>0)<($780>>>0);
             if ($781) {
              _abort();
              // unreachable;
             }
             $782 = (($779) + 12|0);
             $783 = HEAP32[$782>>2]|0;
             $784 = ($783|0)==($721|0);
             if (!($784)) {
              _abort();
              // unreachable;
             }
             $785 = (($776) + 8|0);
             $786 = HEAP32[$785>>2]|0;
             $787 = ($786|0)==($721|0);
             if ($787) {
              HEAP32[$782>>2] = $776;
              HEAP32[$785>>2] = $779;
              $R$1$i$i = $776;
              break;
             } else {
              _abort();
              // unreachable;
             }
            }
           } while(0);
           $802 = ($774|0)==(0|0);
           if ($802) {
            break;
           }
           $$sum30$i$i = (($tsize$246$i) + 28)|0;
           $$sum113$i = (($$sum30$i$i) + ($720))|0;
           $803 = (($tbase$247$i) + ($$sum113$i)|0);
           $804 = HEAP32[$803>>2]|0;
           $805 = ((8512 + ($804<<2)|0) + 304|0);
           $806 = HEAP32[$805>>2]|0;
           $807 = ($721|0)==($806|0);
           do {
            if ($807) {
             HEAP32[$805>>2] = $R$1$i$i;
             $cond$i$i = ($R$1$i$i|0)==(0|0);
             if (!($cond$i$i)) {
              break;
             }
             $808 = 1 << $804;
             $809 = $808 ^ -1;
             $810 = HEAP32[((8512 + 4|0))>>2]|0;
             $811 = $810 & $809;
             HEAP32[((8512 + 4|0))>>2] = $811;
             break L356;
            } else {
             $812 = HEAP32[((8512 + 16|0))>>2]|0;
             $813 = ($774>>>0)<($812>>>0);
             if ($813) {
              _abort();
              // unreachable;
             }
             $814 = (($774) + 16|0);
             $815 = HEAP32[$814>>2]|0;
             $816 = ($815|0)==($721|0);
             if ($816) {
              HEAP32[$814>>2] = $R$1$i$i;
             } else {
              $817 = (($774) + 20|0);
              HEAP32[$817>>2] = $R$1$i$i;
             }
             $818 = ($R$1$i$i|0)==(0|0);
             if ($818) {
              break L356;
             }
            }
           } while(0);
           $819 = HEAP32[((8512 + 16|0))>>2]|0;
           $820 = ($R$1$i$i>>>0)<($819>>>0);
           if ($820) {
            _abort();
            // unreachable;
           }
           $821 = (($R$1$i$i) + 24|0);
           HEAP32[$821>>2] = $774;
           $$sum3132$i$i = $720 | 16;
           $$sum114$i = (($$sum3132$i$i) + ($tsize$246$i))|0;
           $822 = (($tbase$247$i) + ($$sum114$i)|0);
           $823 = HEAP32[$822>>2]|0;
           $824 = ($823|0)==(0|0);
           do {
            if (!($824)) {
             $825 = HEAP32[((8512 + 16|0))>>2]|0;
             $826 = ($823>>>0)<($825>>>0);
             if ($826) {
              _abort();
              // unreachable;
             } else {
              $827 = (($R$1$i$i) + 16|0);
              HEAP32[$827>>2] = $823;
              $828 = (($823) + 24|0);
              HEAP32[$828>>2] = $R$1$i$i;
              break;
             }
            }
           } while(0);
           $$sum115$i = (($$sum2$i23$i) + ($$sum3132$i$i))|0;
           $829 = (($tbase$247$i) + ($$sum115$i)|0);
           $830 = HEAP32[$829>>2]|0;
           $831 = ($830|0)==(0|0);
           if ($831) {
            break;
           }
           $832 = HEAP32[((8512 + 16|0))>>2]|0;
           $833 = ($830>>>0)<($832>>>0);
           if ($833) {
            _abort();
            // unreachable;
           } else {
            $834 = (($R$1$i$i) + 20|0);
            HEAP32[$834>>2] = $830;
            $835 = (($830) + 24|0);
            HEAP32[$835>>2] = $R$1$i$i;
            break;
           }
          }
         } while(0);
         $$sum9$i$i = $746 | $720;
         $$sum116$i = (($$sum9$i$i) + ($tsize$246$i))|0;
         $836 = (($tbase$247$i) + ($$sum116$i)|0);
         $837 = (($746) + ($726))|0;
         $oldfirst$0$i$i = $836;$qsize$0$i$i = $837;
        } else {
         $oldfirst$0$i$i = $721;$qsize$0$i$i = $726;
        }
        $838 = (($oldfirst$0$i$i) + 4|0);
        $839 = HEAP32[$838>>2]|0;
        $840 = $839 & -2;
        HEAP32[$838>>2] = $840;
        $841 = $qsize$0$i$i | 1;
        $$sum10$i$i = (($$sum$i21$i) + 4)|0;
        $842 = (($tbase$247$i) + ($$sum10$i$i)|0);
        HEAP32[$842>>2] = $841;
        $$sum11$i24$i = (($qsize$0$i$i) + ($$sum$i21$i))|0;
        $843 = (($tbase$247$i) + ($$sum11$i24$i)|0);
        HEAP32[$843>>2] = $qsize$0$i$i;
        $844 = $qsize$0$i$i >>> 3;
        $845 = ($qsize$0$i$i>>>0)<(256);
        if ($845) {
         $846 = $844 << 1;
         $847 = ((8512 + ($846<<2)|0) + 40|0);
         $848 = HEAP32[8512>>2]|0;
         $849 = 1 << $844;
         $850 = $848 & $849;
         $851 = ($850|0)==(0);
         do {
          if ($851) {
           $852 = $848 | $849;
           HEAP32[8512>>2] = $852;
           $$sum26$pre$i$i = (($846) + 2)|0;
           $$pre$i25$i = ((8512 + ($$sum26$pre$i$i<<2)|0) + 40|0);
           $$pre$phi$i26$iZ2D = $$pre$i25$i;$F4$0$i$i = $847;
          } else {
           $$sum29$i$i = (($846) + 2)|0;
           $853 = ((8512 + ($$sum29$i$i<<2)|0) + 40|0);
           $854 = HEAP32[$853>>2]|0;
           $855 = HEAP32[((8512 + 16|0))>>2]|0;
           $856 = ($854>>>0)<($855>>>0);
           if (!($856)) {
            $$pre$phi$i26$iZ2D = $853;$F4$0$i$i = $854;
            break;
           }
           _abort();
           // unreachable;
          }
         } while(0);
         HEAP32[$$pre$phi$i26$iZ2D>>2] = $725;
         $857 = (($F4$0$i$i) + 12|0);
         HEAP32[$857>>2] = $725;
         $$sum27$i$i = (($$sum$i21$i) + 8)|0;
         $858 = (($tbase$247$i) + ($$sum27$i$i)|0);
         HEAP32[$858>>2] = $F4$0$i$i;
         $$sum28$i$i = (($$sum$i21$i) + 12)|0;
         $859 = (($tbase$247$i) + ($$sum28$i$i)|0);
         HEAP32[$859>>2] = $847;
         break;
        }
        $860 = $qsize$0$i$i >>> 8;
        $861 = ($860|0)==(0);
        do {
         if ($861) {
          $I7$0$i$i = 0;
         } else {
          $862 = ($qsize$0$i$i>>>0)>(16777215);
          if ($862) {
           $I7$0$i$i = 31;
           break;
          }
          $863 = (($860) + 1048320)|0;
          $864 = $863 >>> 16;
          $865 = $864 & 8;
          $866 = $860 << $865;
          $867 = (($866) + 520192)|0;
          $868 = $867 >>> 16;
          $869 = $868 & 4;
          $870 = $869 | $865;
          $871 = $866 << $869;
          $872 = (($871) + 245760)|0;
          $873 = $872 >>> 16;
          $874 = $873 & 2;
          $875 = $870 | $874;
          $876 = (14 - ($875))|0;
          $877 = $871 << $874;
          $878 = $877 >>> 15;
          $879 = (($876) + ($878))|0;
          $880 = $879 << 1;
          $881 = (($879) + 7)|0;
          $882 = $qsize$0$i$i >>> $881;
          $883 = $882 & 1;
          $884 = $883 | $880;
          $I7$0$i$i = $884;
         }
        } while(0);
        $885 = ((8512 + ($I7$0$i$i<<2)|0) + 304|0);
        $$sum12$i$i = (($$sum$i21$i) + 28)|0;
        $886 = (($tbase$247$i) + ($$sum12$i$i)|0);
        HEAP32[$886>>2] = $I7$0$i$i;
        $$sum13$i$i = (($$sum$i21$i) + 16)|0;
        $887 = (($tbase$247$i) + ($$sum13$i$i)|0);
        $$sum14$i$i = (($$sum$i21$i) + 20)|0;
        $888 = (($tbase$247$i) + ($$sum14$i$i)|0);
        HEAP32[$888>>2] = 0;
        HEAP32[$887>>2] = 0;
        $889 = HEAP32[((8512 + 4|0))>>2]|0;
        $890 = 1 << $I7$0$i$i;
        $891 = $889 & $890;
        $892 = ($891|0)==(0);
        if ($892) {
         $893 = $889 | $890;
         HEAP32[((8512 + 4|0))>>2] = $893;
         HEAP32[$885>>2] = $725;
         $$sum15$i$i = (($$sum$i21$i) + 24)|0;
         $894 = (($tbase$247$i) + ($$sum15$i$i)|0);
         HEAP32[$894>>2] = $885;
         $$sum16$i$i = (($$sum$i21$i) + 12)|0;
         $895 = (($tbase$247$i) + ($$sum16$i$i)|0);
         HEAP32[$895>>2] = $725;
         $$sum17$i$i = (($$sum$i21$i) + 8)|0;
         $896 = (($tbase$247$i) + ($$sum17$i$i)|0);
         HEAP32[$896>>2] = $725;
         break;
        }
        $897 = HEAP32[$885>>2]|0;
        $898 = ($I7$0$i$i|0)==(31);
        if ($898) {
         $906 = 0;
        } else {
         $899 = $I7$0$i$i >>> 1;
         $900 = (25 - ($899))|0;
         $906 = $900;
        }
        $901 = (($897) + 4|0);
        $902 = HEAP32[$901>>2]|0;
        $903 = $902 & -8;
        $904 = ($903|0)==($qsize$0$i$i|0);
        L445: do {
         if ($904) {
          $T$0$lcssa$i28$i = $897;
         } else {
          $905 = $qsize$0$i$i << $906;
          $K8$052$i$i = $905;$T$051$i$i = $897;
          while(1) {
           $913 = $K8$052$i$i >>> 31;
           $914 = ((($T$051$i$i) + ($913<<2)|0) + 16|0);
           $909 = HEAP32[$914>>2]|0;
           $915 = ($909|0)==(0|0);
           if ($915) {
            break;
           }
           $907 = $K8$052$i$i << 1;
           $908 = (($909) + 4|0);
           $910 = HEAP32[$908>>2]|0;
           $911 = $910 & -8;
           $912 = ($911|0)==($qsize$0$i$i|0);
           if ($912) {
            $T$0$lcssa$i28$i = $909;
            break L445;
           } else {
            $K8$052$i$i = $907;$T$051$i$i = $909;
           }
          }
          $916 = HEAP32[((8512 + 16|0))>>2]|0;
          $917 = ($914>>>0)<($916>>>0);
          if ($917) {
           _abort();
           // unreachable;
          } else {
           HEAP32[$914>>2] = $725;
           $$sum23$i$i = (($$sum$i21$i) + 24)|0;
           $918 = (($tbase$247$i) + ($$sum23$i$i)|0);
           HEAP32[$918>>2] = $T$051$i$i;
           $$sum24$i$i = (($$sum$i21$i) + 12)|0;
           $919 = (($tbase$247$i) + ($$sum24$i$i)|0);
           HEAP32[$919>>2] = $725;
           $$sum25$i$i = (($$sum$i21$i) + 8)|0;
           $920 = (($tbase$247$i) + ($$sum25$i$i)|0);
           HEAP32[$920>>2] = $725;
           break L348;
          }
         }
        } while(0);
        $921 = (($T$0$lcssa$i28$i) + 8|0);
        $922 = HEAP32[$921>>2]|0;
        $923 = HEAP32[((8512 + 16|0))>>2]|0;
        $924 = ($T$0$lcssa$i28$i>>>0)<($923>>>0);
        if ($924) {
         _abort();
         // unreachable;
        }
        $925 = ($922>>>0)<($923>>>0);
        if ($925) {
         _abort();
         // unreachable;
        } else {
         $926 = (($922) + 12|0);
         HEAP32[$926>>2] = $725;
         HEAP32[$921>>2] = $725;
         $$sum20$i$i = (($$sum$i21$i) + 8)|0;
         $927 = (($tbase$247$i) + ($$sum20$i$i)|0);
         HEAP32[$927>>2] = $922;
         $$sum21$i$i = (($$sum$i21$i) + 12)|0;
         $928 = (($tbase$247$i) + ($$sum21$i$i)|0);
         HEAP32[$928>>2] = $T$0$lcssa$i28$i;
         $$sum22$i$i = (($$sum$i21$i) + 24)|0;
         $929 = (($tbase$247$i) + ($$sum22$i$i)|0);
         HEAP32[$929>>2] = 0;
         break;
        }
       }
      } while(0);
      $$sum1819$i$i = $713 | 8;
      $930 = (($tbase$247$i) + ($$sum1819$i$i)|0);
      $mem$0 = $930;
      STACKTOP = sp;return ($mem$0|0);
     }
    }
    $sp$0$i$i$i = ((8512 + 448|0));
    while(1) {
     $931 = HEAP32[$sp$0$i$i$i>>2]|0;
     $932 = ($931>>>0)>($636>>>0);
     if (!($932)) {
      $933 = (($sp$0$i$i$i) + 4|0);
      $934 = HEAP32[$933>>2]|0;
      $935 = (($931) + ($934)|0);
      $936 = ($935>>>0)>($636>>>0);
      if ($936) {
       break;
      }
     }
     $937 = (($sp$0$i$i$i) + 8|0);
     $938 = HEAP32[$937>>2]|0;
     $sp$0$i$i$i = $938;
    }
    $$sum$i15$i = (($934) + -47)|0;
    $$sum1$i16$i = (($934) + -39)|0;
    $939 = (($931) + ($$sum1$i16$i)|0);
    $940 = $939;
    $941 = $940 & 7;
    $942 = ($941|0)==(0);
    if ($942) {
     $945 = 0;
    } else {
     $943 = (0 - ($940))|0;
     $944 = $943 & 7;
     $945 = $944;
    }
    $$sum2$i17$i = (($$sum$i15$i) + ($945))|0;
    $946 = (($931) + ($$sum2$i17$i)|0);
    $947 = (($636) + 16|0);
    $948 = ($946>>>0)<($947>>>0);
    $949 = $948 ? $636 : $946;
    $950 = (($949) + 8|0);
    $951 = (($tsize$246$i) + -40)|0;
    $952 = (($tbase$247$i) + 8|0);
    $953 = $952;
    $954 = $953 & 7;
    $955 = ($954|0)==(0);
    if ($955) {
     $959 = 0;
    } else {
     $956 = (0 - ($953))|0;
     $957 = $956 & 7;
     $959 = $957;
    }
    $958 = (($tbase$247$i) + ($959)|0);
    $960 = (($951) - ($959))|0;
    HEAP32[((8512 + 24|0))>>2] = $958;
    HEAP32[((8512 + 12|0))>>2] = $960;
    $961 = $960 | 1;
    $$sum$i$i$i = (($959) + 4)|0;
    $962 = (($tbase$247$i) + ($$sum$i$i$i)|0);
    HEAP32[$962>>2] = $961;
    $$sum2$i$i$i = (($tsize$246$i) + -36)|0;
    $963 = (($tbase$247$i) + ($$sum2$i$i$i)|0);
    HEAP32[$963>>2] = 40;
    $964 = HEAP32[((8984 + 16|0))>>2]|0;
    HEAP32[((8512 + 28|0))>>2] = $964;
    $965 = (($949) + 4|0);
    HEAP32[$965>>2] = 27;
    ;HEAP32[$950+0>>2]=HEAP32[((8512 + 448|0))+0>>2]|0;HEAP32[$950+4>>2]=HEAP32[((8512 + 448|0))+4>>2]|0;HEAP32[$950+8>>2]=HEAP32[((8512 + 448|0))+8>>2]|0;HEAP32[$950+12>>2]=HEAP32[((8512 + 448|0))+12>>2]|0;
    HEAP32[((8512 + 448|0))>>2] = $tbase$247$i;
    HEAP32[((8512 + 452|0))>>2] = $tsize$246$i;
    HEAP32[((8512 + 460|0))>>2] = 0;
    HEAP32[((8512 + 456|0))>>2] = $950;
    $966 = (($949) + 28|0);
    HEAP32[$966>>2] = 7;
    $967 = (($949) + 32|0);
    $968 = ($967>>>0)<($935>>>0);
    if ($968) {
     $970 = $966;
     while(1) {
      $969 = (($970) + 4|0);
      HEAP32[$969>>2] = 7;
      $971 = (($970) + 8|0);
      $972 = ($971>>>0)<($935>>>0);
      if ($972) {
       $970 = $969;
      } else {
       break;
      }
     }
    }
    $973 = ($949|0)==($636|0);
    if (!($973)) {
     $974 = $949;
     $975 = $636;
     $976 = (($974) - ($975))|0;
     $977 = (($636) + ($976)|0);
     $$sum3$i$i = (($976) + 4)|0;
     $978 = (($636) + ($$sum3$i$i)|0);
     $979 = HEAP32[$978>>2]|0;
     $980 = $979 & -2;
     HEAP32[$978>>2] = $980;
     $981 = $976 | 1;
     $982 = (($636) + 4|0);
     HEAP32[$982>>2] = $981;
     HEAP32[$977>>2] = $976;
     $983 = $976 >>> 3;
     $984 = ($976>>>0)<(256);
     if ($984) {
      $985 = $983 << 1;
      $986 = ((8512 + ($985<<2)|0) + 40|0);
      $987 = HEAP32[8512>>2]|0;
      $988 = 1 << $983;
      $989 = $987 & $988;
      $990 = ($989|0)==(0);
      do {
       if ($990) {
        $991 = $987 | $988;
        HEAP32[8512>>2] = $991;
        $$sum10$pre$i$i = (($985) + 2)|0;
        $$pre$i$i = ((8512 + ($$sum10$pre$i$i<<2)|0) + 40|0);
        $$pre$phi$i$iZ2D = $$pre$i$i;$F$0$i$i = $986;
       } else {
        $$sum11$i$i = (($985) + 2)|0;
        $992 = ((8512 + ($$sum11$i$i<<2)|0) + 40|0);
        $993 = HEAP32[$992>>2]|0;
        $994 = HEAP32[((8512 + 16|0))>>2]|0;
        $995 = ($993>>>0)<($994>>>0);
        if (!($995)) {
         $$pre$phi$i$iZ2D = $992;$F$0$i$i = $993;
         break;
        }
        _abort();
        // unreachable;
       }
      } while(0);
      HEAP32[$$pre$phi$i$iZ2D>>2] = $636;
      $996 = (($F$0$i$i) + 12|0);
      HEAP32[$996>>2] = $636;
      $997 = (($636) + 8|0);
      HEAP32[$997>>2] = $F$0$i$i;
      $998 = (($636) + 12|0);
      HEAP32[$998>>2] = $986;
      break;
     }
     $999 = $976 >>> 8;
     $1000 = ($999|0)==(0);
     if ($1000) {
      $I1$0$i$i = 0;
     } else {
      $1001 = ($976>>>0)>(16777215);
      if ($1001) {
       $I1$0$i$i = 31;
      } else {
       $1002 = (($999) + 1048320)|0;
       $1003 = $1002 >>> 16;
       $1004 = $1003 & 8;
       $1005 = $999 << $1004;
       $1006 = (($1005) + 520192)|0;
       $1007 = $1006 >>> 16;
       $1008 = $1007 & 4;
       $1009 = $1008 | $1004;
       $1010 = $1005 << $1008;
       $1011 = (($1010) + 245760)|0;
       $1012 = $1011 >>> 16;
       $1013 = $1012 & 2;
       $1014 = $1009 | $1013;
       $1015 = (14 - ($1014))|0;
       $1016 = $1010 << $1013;
       $1017 = $1016 >>> 15;
       $1018 = (($1015) + ($1017))|0;
       $1019 = $1018 << 1;
       $1020 = (($1018) + 7)|0;
       $1021 = $976 >>> $1020;
       $1022 = $1021 & 1;
       $1023 = $1022 | $1019;
       $I1$0$i$i = $1023;
      }
     }
     $1024 = ((8512 + ($I1$0$i$i<<2)|0) + 304|0);
     $1025 = (($636) + 28|0);
     $I1$0$c$i$i = $I1$0$i$i;
     HEAP32[$1025>>2] = $I1$0$c$i$i;
     $1026 = (($636) + 20|0);
     HEAP32[$1026>>2] = 0;
     $1027 = (($636) + 16|0);
     HEAP32[$1027>>2] = 0;
     $1028 = HEAP32[((8512 + 4|0))>>2]|0;
     $1029 = 1 << $I1$0$i$i;
     $1030 = $1028 & $1029;
     $1031 = ($1030|0)==(0);
     if ($1031) {
      $1032 = $1028 | $1029;
      HEAP32[((8512 + 4|0))>>2] = $1032;
      HEAP32[$1024>>2] = $636;
      $1033 = (($636) + 24|0);
      HEAP32[$1033>>2] = $1024;
      $1034 = (($636) + 12|0);
      HEAP32[$1034>>2] = $636;
      $1035 = (($636) + 8|0);
      HEAP32[$1035>>2] = $636;
      break;
     }
     $1036 = HEAP32[$1024>>2]|0;
     $1037 = ($I1$0$i$i|0)==(31);
     if ($1037) {
      $1045 = 0;
     } else {
      $1038 = $I1$0$i$i >>> 1;
      $1039 = (25 - ($1038))|0;
      $1045 = $1039;
     }
     $1040 = (($1036) + 4|0);
     $1041 = HEAP32[$1040>>2]|0;
     $1042 = $1041 & -8;
     $1043 = ($1042|0)==($976|0);
     L499: do {
      if ($1043) {
       $T$0$lcssa$i$i = $1036;
      } else {
       $1044 = $976 << $1045;
       $K2$014$i$i = $1044;$T$013$i$i = $1036;
       while(1) {
        $1052 = $K2$014$i$i >>> 31;
        $1053 = ((($T$013$i$i) + ($1052<<2)|0) + 16|0);
        $1048 = HEAP32[$1053>>2]|0;
        $1054 = ($1048|0)==(0|0);
        if ($1054) {
         break;
        }
        $1046 = $K2$014$i$i << 1;
        $1047 = (($1048) + 4|0);
        $1049 = HEAP32[$1047>>2]|0;
        $1050 = $1049 & -8;
        $1051 = ($1050|0)==($976|0);
        if ($1051) {
         $T$0$lcssa$i$i = $1048;
         break L499;
        } else {
         $K2$014$i$i = $1046;$T$013$i$i = $1048;
        }
       }
       $1055 = HEAP32[((8512 + 16|0))>>2]|0;
       $1056 = ($1053>>>0)<($1055>>>0);
       if ($1056) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$1053>>2] = $636;
        $1057 = (($636) + 24|0);
        HEAP32[$1057>>2] = $T$013$i$i;
        $1058 = (($636) + 12|0);
        HEAP32[$1058>>2] = $636;
        $1059 = (($636) + 8|0);
        HEAP32[$1059>>2] = $636;
        break L311;
       }
      }
     } while(0);
     $1060 = (($T$0$lcssa$i$i) + 8|0);
     $1061 = HEAP32[$1060>>2]|0;
     $1062 = HEAP32[((8512 + 16|0))>>2]|0;
     $1063 = ($T$0$lcssa$i$i>>>0)<($1062>>>0);
     if ($1063) {
      _abort();
      // unreachable;
     }
     $1064 = ($1061>>>0)<($1062>>>0);
     if ($1064) {
      _abort();
      // unreachable;
     } else {
      $1065 = (($1061) + 12|0);
      HEAP32[$1065>>2] = $636;
      HEAP32[$1060>>2] = $636;
      $1066 = (($636) + 8|0);
      HEAP32[$1066>>2] = $1061;
      $1067 = (($636) + 12|0);
      HEAP32[$1067>>2] = $T$0$lcssa$i$i;
      $1068 = (($636) + 24|0);
      HEAP32[$1068>>2] = 0;
      break;
     }
    }
   }
  } while(0);
  $1069 = HEAP32[((8512 + 12|0))>>2]|0;
  $1070 = ($1069>>>0)>($nb$0>>>0);
  if ($1070) {
   $1071 = (($1069) - ($nb$0))|0;
   HEAP32[((8512 + 12|0))>>2] = $1071;
   $1072 = HEAP32[((8512 + 24|0))>>2]|0;
   $1073 = (($1072) + ($nb$0)|0);
   HEAP32[((8512 + 24|0))>>2] = $1073;
   $1074 = $1071 | 1;
   $$sum$i32 = (($nb$0) + 4)|0;
   $1075 = (($1072) + ($$sum$i32)|0);
   HEAP32[$1075>>2] = $1074;
   $1076 = $nb$0 | 3;
   $1077 = (($1072) + 4|0);
   HEAP32[$1077>>2] = $1076;
   $1078 = (($1072) + 8|0);
   $mem$0 = $1078;
   STACKTOP = sp;return ($mem$0|0);
  }
 }
 $1079 = (___errno_location()|0);
 HEAP32[$1079>>2] = 12;
 $mem$0 = 0;
 STACKTOP = sp;return ($mem$0|0);
}
function _free($mem) {
 $mem = $mem|0;
 var $$pre = 0, $$pre$phi68Z2D = 0, $$pre$phi70Z2D = 0, $$pre$phiZ2D = 0, $$pre67 = 0, $$pre69 = 0, $$sum = 0, $$sum16$pre = 0, $$sum17 = 0, $$sum18 = 0, $$sum19 = 0, $$sum2 = 0, $$sum20 = 0, $$sum2324 = 0, $$sum25 = 0, $$sum26 = 0, $$sum28 = 0, $$sum29 = 0, $$sum3 = 0, $$sum30 = 0;
 var $$sum31 = 0, $$sum32 = 0, $$sum33 = 0, $$sum34 = 0, $$sum35 = 0, $$sum36 = 0, $$sum37 = 0, $$sum5 = 0, $$sum67 = 0, $$sum8 = 0, $$sum9 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0;
 var $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0;
 var $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0;
 var $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0;
 var $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0;
 var $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0;
 var $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0;
 var $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0;
 var $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0;
 var $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0;
 var $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0;
 var $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0;
 var $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0;
 var $322 = 0, $323 = 0, $324 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0;
 var $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0;
 var $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0;
 var $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $F16$0 = 0, $I18$0 = 0, $I18$0$c = 0, $K19$057 = 0;
 var $R$0 = 0, $R$1 = 0, $R7$0 = 0, $R7$1 = 0, $RP$0 = 0, $RP9$0 = 0, $T$0$lcssa = 0, $T$056 = 0, $cond = 0, $cond54 = 0, $p$0 = 0, $psize$0 = 0, $psize$1 = 0, $sp$0$i = 0, $sp$0$in$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($mem|0)==(0|0);
 if ($0) {
  STACKTOP = sp;return;
 }
 $1 = (($mem) + -8|0);
 $2 = HEAP32[((8512 + 16|0))>>2]|0;
 $3 = ($1>>>0)<($2>>>0);
 if ($3) {
  _abort();
  // unreachable;
 }
 $4 = (($mem) + -4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 3;
 $7 = ($6|0)==(1);
 if ($7) {
  _abort();
  // unreachable;
 }
 $8 = $5 & -8;
 $$sum = (($8) + -8)|0;
 $9 = (($mem) + ($$sum)|0);
 $10 = $5 & 1;
 $11 = ($10|0)==(0);
 do {
  if ($11) {
   $12 = HEAP32[$1>>2]|0;
   $13 = ($6|0)==(0);
   if ($13) {
    STACKTOP = sp;return;
   }
   $$sum2 = (-8 - ($12))|0;
   $14 = (($mem) + ($$sum2)|0);
   $15 = (($12) + ($8))|0;
   $16 = ($14>>>0)<($2>>>0);
   if ($16) {
    _abort();
    // unreachable;
   }
   $17 = HEAP32[((8512 + 20|0))>>2]|0;
   $18 = ($14|0)==($17|0);
   if ($18) {
    $$sum3 = (($8) + -4)|0;
    $104 = (($mem) + ($$sum3)|0);
    $105 = HEAP32[$104>>2]|0;
    $106 = $105 & 3;
    $107 = ($106|0)==(3);
    if (!($107)) {
     $p$0 = $14;$psize$0 = $15;
     break;
    }
    HEAP32[((8512 + 8|0))>>2] = $15;
    $108 = HEAP32[$104>>2]|0;
    $109 = $108 & -2;
    HEAP32[$104>>2] = $109;
    $110 = $15 | 1;
    $$sum26 = (($$sum2) + 4)|0;
    $111 = (($mem) + ($$sum26)|0);
    HEAP32[$111>>2] = $110;
    HEAP32[$9>>2] = $15;
    STACKTOP = sp;return;
   }
   $19 = $12 >>> 3;
   $20 = ($12>>>0)<(256);
   if ($20) {
    $$sum36 = (($$sum2) + 8)|0;
    $21 = (($mem) + ($$sum36)|0);
    $22 = HEAP32[$21>>2]|0;
    $$sum37 = (($$sum2) + 12)|0;
    $23 = (($mem) + ($$sum37)|0);
    $24 = HEAP32[$23>>2]|0;
    $25 = $19 << 1;
    $26 = ((8512 + ($25<<2)|0) + 40|0);
    $27 = ($22|0)==($26|0);
    if (!($27)) {
     $28 = ($22>>>0)<($2>>>0);
     if ($28) {
      _abort();
      // unreachable;
     }
     $29 = (($22) + 12|0);
     $30 = HEAP32[$29>>2]|0;
     $31 = ($30|0)==($14|0);
     if (!($31)) {
      _abort();
      // unreachable;
     }
    }
    $32 = ($24|0)==($22|0);
    if ($32) {
     $33 = 1 << $19;
     $34 = $33 ^ -1;
     $35 = HEAP32[8512>>2]|0;
     $36 = $35 & $34;
     HEAP32[8512>>2] = $36;
     $p$0 = $14;$psize$0 = $15;
     break;
    }
    $37 = ($24|0)==($26|0);
    if ($37) {
     $$pre69 = (($24) + 8|0);
     $$pre$phi70Z2D = $$pre69;
    } else {
     $38 = ($24>>>0)<($2>>>0);
     if ($38) {
      _abort();
      // unreachable;
     }
     $39 = (($24) + 8|0);
     $40 = HEAP32[$39>>2]|0;
     $41 = ($40|0)==($14|0);
     if ($41) {
      $$pre$phi70Z2D = $39;
     } else {
      _abort();
      // unreachable;
     }
    }
    $42 = (($22) + 12|0);
    HEAP32[$42>>2] = $24;
    HEAP32[$$pre$phi70Z2D>>2] = $22;
    $p$0 = $14;$psize$0 = $15;
    break;
   }
   $$sum28 = (($$sum2) + 24)|0;
   $43 = (($mem) + ($$sum28)|0);
   $44 = HEAP32[$43>>2]|0;
   $$sum29 = (($$sum2) + 12)|0;
   $45 = (($mem) + ($$sum29)|0);
   $46 = HEAP32[$45>>2]|0;
   $47 = ($46|0)==($14|0);
   do {
    if ($47) {
     $$sum31 = (($$sum2) + 20)|0;
     $57 = (($mem) + ($$sum31)|0);
     $58 = HEAP32[$57>>2]|0;
     $59 = ($58|0)==(0|0);
     if ($59) {
      $$sum30 = (($$sum2) + 16)|0;
      $60 = (($mem) + ($$sum30)|0);
      $61 = HEAP32[$60>>2]|0;
      $62 = ($61|0)==(0|0);
      if ($62) {
       $R$1 = 0;
       break;
      } else {
       $R$0 = $61;$RP$0 = $60;
      }
     } else {
      $R$0 = $58;$RP$0 = $57;
     }
     while(1) {
      $63 = (($R$0) + 20|0);
      $64 = HEAP32[$63>>2]|0;
      $65 = ($64|0)==(0|0);
      if (!($65)) {
       $R$0 = $64;$RP$0 = $63;
       continue;
      }
      $66 = (($R$0) + 16|0);
      $67 = HEAP32[$66>>2]|0;
      $68 = ($67|0)==(0|0);
      if ($68) {
       break;
      } else {
       $R$0 = $67;$RP$0 = $66;
      }
     }
     $69 = ($RP$0>>>0)<($2>>>0);
     if ($69) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$RP$0>>2] = 0;
      $R$1 = $R$0;
      break;
     }
    } else {
     $$sum35 = (($$sum2) + 8)|0;
     $48 = (($mem) + ($$sum35)|0);
     $49 = HEAP32[$48>>2]|0;
     $50 = ($49>>>0)<($2>>>0);
     if ($50) {
      _abort();
      // unreachable;
     }
     $51 = (($49) + 12|0);
     $52 = HEAP32[$51>>2]|0;
     $53 = ($52|0)==($14|0);
     if (!($53)) {
      _abort();
      // unreachable;
     }
     $54 = (($46) + 8|0);
     $55 = HEAP32[$54>>2]|0;
     $56 = ($55|0)==($14|0);
     if ($56) {
      HEAP32[$51>>2] = $46;
      HEAP32[$54>>2] = $49;
      $R$1 = $46;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   } while(0);
   $70 = ($44|0)==(0|0);
   if ($70) {
    $p$0 = $14;$psize$0 = $15;
   } else {
    $$sum32 = (($$sum2) + 28)|0;
    $71 = (($mem) + ($$sum32)|0);
    $72 = HEAP32[$71>>2]|0;
    $73 = ((8512 + ($72<<2)|0) + 304|0);
    $74 = HEAP32[$73>>2]|0;
    $75 = ($14|0)==($74|0);
    if ($75) {
     HEAP32[$73>>2] = $R$1;
     $cond = ($R$1|0)==(0|0);
     if ($cond) {
      $76 = 1 << $72;
      $77 = $76 ^ -1;
      $78 = HEAP32[((8512 + 4|0))>>2]|0;
      $79 = $78 & $77;
      HEAP32[((8512 + 4|0))>>2] = $79;
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    } else {
     $80 = HEAP32[((8512 + 16|0))>>2]|0;
     $81 = ($44>>>0)<($80>>>0);
     if ($81) {
      _abort();
      // unreachable;
     }
     $82 = (($44) + 16|0);
     $83 = HEAP32[$82>>2]|0;
     $84 = ($83|0)==($14|0);
     if ($84) {
      HEAP32[$82>>2] = $R$1;
     } else {
      $85 = (($44) + 20|0);
      HEAP32[$85>>2] = $R$1;
     }
     $86 = ($R$1|0)==(0|0);
     if ($86) {
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    }
    $87 = HEAP32[((8512 + 16|0))>>2]|0;
    $88 = ($R$1>>>0)<($87>>>0);
    if ($88) {
     _abort();
     // unreachable;
    }
    $89 = (($R$1) + 24|0);
    HEAP32[$89>>2] = $44;
    $$sum33 = (($$sum2) + 16)|0;
    $90 = (($mem) + ($$sum33)|0);
    $91 = HEAP32[$90>>2]|0;
    $92 = ($91|0)==(0|0);
    do {
     if (!($92)) {
      $93 = HEAP32[((8512 + 16|0))>>2]|0;
      $94 = ($91>>>0)<($93>>>0);
      if ($94) {
       _abort();
       // unreachable;
      } else {
       $95 = (($R$1) + 16|0);
       HEAP32[$95>>2] = $91;
       $96 = (($91) + 24|0);
       HEAP32[$96>>2] = $R$1;
       break;
      }
     }
    } while(0);
    $$sum34 = (($$sum2) + 20)|0;
    $97 = (($mem) + ($$sum34)|0);
    $98 = HEAP32[$97>>2]|0;
    $99 = ($98|0)==(0|0);
    if ($99) {
     $p$0 = $14;$psize$0 = $15;
    } else {
     $100 = HEAP32[((8512 + 16|0))>>2]|0;
     $101 = ($98>>>0)<($100>>>0);
     if ($101) {
      _abort();
      // unreachable;
     } else {
      $102 = (($R$1) + 20|0);
      HEAP32[$102>>2] = $98;
      $103 = (($98) + 24|0);
      HEAP32[$103>>2] = $R$1;
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    }
   }
  } else {
   $p$0 = $1;$psize$0 = $8;
  }
 } while(0);
 $112 = ($p$0>>>0)<($9>>>0);
 if (!($112)) {
  _abort();
  // unreachable;
 }
 $$sum25 = (($8) + -4)|0;
 $113 = (($mem) + ($$sum25)|0);
 $114 = HEAP32[$113>>2]|0;
 $115 = $114 & 1;
 $116 = ($115|0)==(0);
 if ($116) {
  _abort();
  // unreachable;
 }
 $117 = $114 & 2;
 $118 = ($117|0)==(0);
 if ($118) {
  $119 = HEAP32[((8512 + 24|0))>>2]|0;
  $120 = ($9|0)==($119|0);
  if ($120) {
   $121 = HEAP32[((8512 + 12|0))>>2]|0;
   $122 = (($121) + ($psize$0))|0;
   HEAP32[((8512 + 12|0))>>2] = $122;
   HEAP32[((8512 + 24|0))>>2] = $p$0;
   $123 = $122 | 1;
   $124 = (($p$0) + 4|0);
   HEAP32[$124>>2] = $123;
   $125 = HEAP32[((8512 + 20|0))>>2]|0;
   $126 = ($p$0|0)==($125|0);
   if (!($126)) {
    STACKTOP = sp;return;
   }
   HEAP32[((8512 + 20|0))>>2] = 0;
   HEAP32[((8512 + 8|0))>>2] = 0;
   STACKTOP = sp;return;
  }
  $127 = HEAP32[((8512 + 20|0))>>2]|0;
  $128 = ($9|0)==($127|0);
  if ($128) {
   $129 = HEAP32[((8512 + 8|0))>>2]|0;
   $130 = (($129) + ($psize$0))|0;
   HEAP32[((8512 + 8|0))>>2] = $130;
   HEAP32[((8512 + 20|0))>>2] = $p$0;
   $131 = $130 | 1;
   $132 = (($p$0) + 4|0);
   HEAP32[$132>>2] = $131;
   $133 = (($p$0) + ($130)|0);
   HEAP32[$133>>2] = $130;
   STACKTOP = sp;return;
  }
  $134 = $114 & -8;
  $135 = (($134) + ($psize$0))|0;
  $136 = $114 >>> 3;
  $137 = ($114>>>0)<(256);
  do {
   if ($137) {
    $138 = (($mem) + ($8)|0);
    $139 = HEAP32[$138>>2]|0;
    $$sum2324 = $8 | 4;
    $140 = (($mem) + ($$sum2324)|0);
    $141 = HEAP32[$140>>2]|0;
    $142 = $136 << 1;
    $143 = ((8512 + ($142<<2)|0) + 40|0);
    $144 = ($139|0)==($143|0);
    if (!($144)) {
     $145 = HEAP32[((8512 + 16|0))>>2]|0;
     $146 = ($139>>>0)<($145>>>0);
     if ($146) {
      _abort();
      // unreachable;
     }
     $147 = (($139) + 12|0);
     $148 = HEAP32[$147>>2]|0;
     $149 = ($148|0)==($9|0);
     if (!($149)) {
      _abort();
      // unreachable;
     }
    }
    $150 = ($141|0)==($139|0);
    if ($150) {
     $151 = 1 << $136;
     $152 = $151 ^ -1;
     $153 = HEAP32[8512>>2]|0;
     $154 = $153 & $152;
     HEAP32[8512>>2] = $154;
     break;
    }
    $155 = ($141|0)==($143|0);
    if ($155) {
     $$pre67 = (($141) + 8|0);
     $$pre$phi68Z2D = $$pre67;
    } else {
     $156 = HEAP32[((8512 + 16|0))>>2]|0;
     $157 = ($141>>>0)<($156>>>0);
     if ($157) {
      _abort();
      // unreachable;
     }
     $158 = (($141) + 8|0);
     $159 = HEAP32[$158>>2]|0;
     $160 = ($159|0)==($9|0);
     if ($160) {
      $$pre$phi68Z2D = $158;
     } else {
      _abort();
      // unreachable;
     }
    }
    $161 = (($139) + 12|0);
    HEAP32[$161>>2] = $141;
    HEAP32[$$pre$phi68Z2D>>2] = $139;
   } else {
    $$sum5 = (($8) + 16)|0;
    $162 = (($mem) + ($$sum5)|0);
    $163 = HEAP32[$162>>2]|0;
    $$sum67 = $8 | 4;
    $164 = (($mem) + ($$sum67)|0);
    $165 = HEAP32[$164>>2]|0;
    $166 = ($165|0)==($9|0);
    do {
     if ($166) {
      $$sum9 = (($8) + 12)|0;
      $177 = (($mem) + ($$sum9)|0);
      $178 = HEAP32[$177>>2]|0;
      $179 = ($178|0)==(0|0);
      if ($179) {
       $$sum8 = (($8) + 8)|0;
       $180 = (($mem) + ($$sum8)|0);
       $181 = HEAP32[$180>>2]|0;
       $182 = ($181|0)==(0|0);
       if ($182) {
        $R7$1 = 0;
        break;
       } else {
        $R7$0 = $181;$RP9$0 = $180;
       }
      } else {
       $R7$0 = $178;$RP9$0 = $177;
      }
      while(1) {
       $183 = (($R7$0) + 20|0);
       $184 = HEAP32[$183>>2]|0;
       $185 = ($184|0)==(0|0);
       if (!($185)) {
        $R7$0 = $184;$RP9$0 = $183;
        continue;
       }
       $186 = (($R7$0) + 16|0);
       $187 = HEAP32[$186>>2]|0;
       $188 = ($187|0)==(0|0);
       if ($188) {
        break;
       } else {
        $R7$0 = $187;$RP9$0 = $186;
       }
      }
      $189 = HEAP32[((8512 + 16|0))>>2]|0;
      $190 = ($RP9$0>>>0)<($189>>>0);
      if ($190) {
       _abort();
       // unreachable;
      } else {
       HEAP32[$RP9$0>>2] = 0;
       $R7$1 = $R7$0;
       break;
      }
     } else {
      $167 = (($mem) + ($8)|0);
      $168 = HEAP32[$167>>2]|0;
      $169 = HEAP32[((8512 + 16|0))>>2]|0;
      $170 = ($168>>>0)<($169>>>0);
      if ($170) {
       _abort();
       // unreachable;
      }
      $171 = (($168) + 12|0);
      $172 = HEAP32[$171>>2]|0;
      $173 = ($172|0)==($9|0);
      if (!($173)) {
       _abort();
       // unreachable;
      }
      $174 = (($165) + 8|0);
      $175 = HEAP32[$174>>2]|0;
      $176 = ($175|0)==($9|0);
      if ($176) {
       HEAP32[$171>>2] = $165;
       HEAP32[$174>>2] = $168;
       $R7$1 = $165;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $191 = ($163|0)==(0|0);
    if (!($191)) {
     $$sum18 = (($8) + 20)|0;
     $192 = (($mem) + ($$sum18)|0);
     $193 = HEAP32[$192>>2]|0;
     $194 = ((8512 + ($193<<2)|0) + 304|0);
     $195 = HEAP32[$194>>2]|0;
     $196 = ($9|0)==($195|0);
     if ($196) {
      HEAP32[$194>>2] = $R7$1;
      $cond54 = ($R7$1|0)==(0|0);
      if ($cond54) {
       $197 = 1 << $193;
       $198 = $197 ^ -1;
       $199 = HEAP32[((8512 + 4|0))>>2]|0;
       $200 = $199 & $198;
       HEAP32[((8512 + 4|0))>>2] = $200;
       break;
      }
     } else {
      $201 = HEAP32[((8512 + 16|0))>>2]|0;
      $202 = ($163>>>0)<($201>>>0);
      if ($202) {
       _abort();
       // unreachable;
      }
      $203 = (($163) + 16|0);
      $204 = HEAP32[$203>>2]|0;
      $205 = ($204|0)==($9|0);
      if ($205) {
       HEAP32[$203>>2] = $R7$1;
      } else {
       $206 = (($163) + 20|0);
       HEAP32[$206>>2] = $R7$1;
      }
      $207 = ($R7$1|0)==(0|0);
      if ($207) {
       break;
      }
     }
     $208 = HEAP32[((8512 + 16|0))>>2]|0;
     $209 = ($R7$1>>>0)<($208>>>0);
     if ($209) {
      _abort();
      // unreachable;
     }
     $210 = (($R7$1) + 24|0);
     HEAP32[$210>>2] = $163;
     $$sum19 = (($8) + 8)|0;
     $211 = (($mem) + ($$sum19)|0);
     $212 = HEAP32[$211>>2]|0;
     $213 = ($212|0)==(0|0);
     do {
      if (!($213)) {
       $214 = HEAP32[((8512 + 16|0))>>2]|0;
       $215 = ($212>>>0)<($214>>>0);
       if ($215) {
        _abort();
        // unreachable;
       } else {
        $216 = (($R7$1) + 16|0);
        HEAP32[$216>>2] = $212;
        $217 = (($212) + 24|0);
        HEAP32[$217>>2] = $R7$1;
        break;
       }
      }
     } while(0);
     $$sum20 = (($8) + 12)|0;
     $218 = (($mem) + ($$sum20)|0);
     $219 = HEAP32[$218>>2]|0;
     $220 = ($219|0)==(0|0);
     if (!($220)) {
      $221 = HEAP32[((8512 + 16|0))>>2]|0;
      $222 = ($219>>>0)<($221>>>0);
      if ($222) {
       _abort();
       // unreachable;
      } else {
       $223 = (($R7$1) + 20|0);
       HEAP32[$223>>2] = $219;
       $224 = (($219) + 24|0);
       HEAP32[$224>>2] = $R7$1;
       break;
      }
     }
    }
   }
  } while(0);
  $225 = $135 | 1;
  $226 = (($p$0) + 4|0);
  HEAP32[$226>>2] = $225;
  $227 = (($p$0) + ($135)|0);
  HEAP32[$227>>2] = $135;
  $228 = HEAP32[((8512 + 20|0))>>2]|0;
  $229 = ($p$0|0)==($228|0);
  if ($229) {
   HEAP32[((8512 + 8|0))>>2] = $135;
   STACKTOP = sp;return;
  } else {
   $psize$1 = $135;
  }
 } else {
  $230 = $114 & -2;
  HEAP32[$113>>2] = $230;
  $231 = $psize$0 | 1;
  $232 = (($p$0) + 4|0);
  HEAP32[$232>>2] = $231;
  $233 = (($p$0) + ($psize$0)|0);
  HEAP32[$233>>2] = $psize$0;
  $psize$1 = $psize$0;
 }
 $234 = $psize$1 >>> 3;
 $235 = ($psize$1>>>0)<(256);
 if ($235) {
  $236 = $234 << 1;
  $237 = ((8512 + ($236<<2)|0) + 40|0);
  $238 = HEAP32[8512>>2]|0;
  $239 = 1 << $234;
  $240 = $238 & $239;
  $241 = ($240|0)==(0);
  if ($241) {
   $242 = $238 | $239;
   HEAP32[8512>>2] = $242;
   $$sum16$pre = (($236) + 2)|0;
   $$pre = ((8512 + ($$sum16$pre<<2)|0) + 40|0);
   $$pre$phiZ2D = $$pre;$F16$0 = $237;
  } else {
   $$sum17 = (($236) + 2)|0;
   $243 = ((8512 + ($$sum17<<2)|0) + 40|0);
   $244 = HEAP32[$243>>2]|0;
   $245 = HEAP32[((8512 + 16|0))>>2]|0;
   $246 = ($244>>>0)<($245>>>0);
   if ($246) {
    _abort();
    // unreachable;
   } else {
    $$pre$phiZ2D = $243;$F16$0 = $244;
   }
  }
  HEAP32[$$pre$phiZ2D>>2] = $p$0;
  $247 = (($F16$0) + 12|0);
  HEAP32[$247>>2] = $p$0;
  $248 = (($p$0) + 8|0);
  HEAP32[$248>>2] = $F16$0;
  $249 = (($p$0) + 12|0);
  HEAP32[$249>>2] = $237;
  STACKTOP = sp;return;
 }
 $250 = $psize$1 >>> 8;
 $251 = ($250|0)==(0);
 if ($251) {
  $I18$0 = 0;
 } else {
  $252 = ($psize$1>>>0)>(16777215);
  if ($252) {
   $I18$0 = 31;
  } else {
   $253 = (($250) + 1048320)|0;
   $254 = $253 >>> 16;
   $255 = $254 & 8;
   $256 = $250 << $255;
   $257 = (($256) + 520192)|0;
   $258 = $257 >>> 16;
   $259 = $258 & 4;
   $260 = $259 | $255;
   $261 = $256 << $259;
   $262 = (($261) + 245760)|0;
   $263 = $262 >>> 16;
   $264 = $263 & 2;
   $265 = $260 | $264;
   $266 = (14 - ($265))|0;
   $267 = $261 << $264;
   $268 = $267 >>> 15;
   $269 = (($266) + ($268))|0;
   $270 = $269 << 1;
   $271 = (($269) + 7)|0;
   $272 = $psize$1 >>> $271;
   $273 = $272 & 1;
   $274 = $273 | $270;
   $I18$0 = $274;
  }
 }
 $275 = ((8512 + ($I18$0<<2)|0) + 304|0);
 $276 = (($p$0) + 28|0);
 $I18$0$c = $I18$0;
 HEAP32[$276>>2] = $I18$0$c;
 $277 = (($p$0) + 20|0);
 HEAP32[$277>>2] = 0;
 $278 = (($p$0) + 16|0);
 HEAP32[$278>>2] = 0;
 $279 = HEAP32[((8512 + 4|0))>>2]|0;
 $280 = 1 << $I18$0;
 $281 = $279 & $280;
 $282 = ($281|0)==(0);
 L199: do {
  if ($282) {
   $283 = $279 | $280;
   HEAP32[((8512 + 4|0))>>2] = $283;
   HEAP32[$275>>2] = $p$0;
   $284 = (($p$0) + 24|0);
   HEAP32[$284>>2] = $275;
   $285 = (($p$0) + 12|0);
   HEAP32[$285>>2] = $p$0;
   $286 = (($p$0) + 8|0);
   HEAP32[$286>>2] = $p$0;
  } else {
   $287 = HEAP32[$275>>2]|0;
   $288 = ($I18$0|0)==(31);
   if ($288) {
    $296 = 0;
   } else {
    $289 = $I18$0 >>> 1;
    $290 = (25 - ($289))|0;
    $296 = $290;
   }
   $291 = (($287) + 4|0);
   $292 = HEAP32[$291>>2]|0;
   $293 = $292 & -8;
   $294 = ($293|0)==($psize$1|0);
   L205: do {
    if ($294) {
     $T$0$lcssa = $287;
    } else {
     $295 = $psize$1 << $296;
     $K19$057 = $295;$T$056 = $287;
     while(1) {
      $303 = $K19$057 >>> 31;
      $304 = ((($T$056) + ($303<<2)|0) + 16|0);
      $299 = HEAP32[$304>>2]|0;
      $305 = ($299|0)==(0|0);
      if ($305) {
       break;
      }
      $297 = $K19$057 << 1;
      $298 = (($299) + 4|0);
      $300 = HEAP32[$298>>2]|0;
      $301 = $300 & -8;
      $302 = ($301|0)==($psize$1|0);
      if ($302) {
       $T$0$lcssa = $299;
       break L205;
      } else {
       $K19$057 = $297;$T$056 = $299;
      }
     }
     $306 = HEAP32[((8512 + 16|0))>>2]|0;
     $307 = ($304>>>0)<($306>>>0);
     if ($307) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$304>>2] = $p$0;
      $308 = (($p$0) + 24|0);
      HEAP32[$308>>2] = $T$056;
      $309 = (($p$0) + 12|0);
      HEAP32[$309>>2] = $p$0;
      $310 = (($p$0) + 8|0);
      HEAP32[$310>>2] = $p$0;
      break L199;
     }
    }
   } while(0);
   $311 = (($T$0$lcssa) + 8|0);
   $312 = HEAP32[$311>>2]|0;
   $313 = HEAP32[((8512 + 16|0))>>2]|0;
   $314 = ($T$0$lcssa>>>0)<($313>>>0);
   if ($314) {
    _abort();
    // unreachable;
   }
   $315 = ($312>>>0)<($313>>>0);
   if ($315) {
    _abort();
    // unreachable;
   } else {
    $316 = (($312) + 12|0);
    HEAP32[$316>>2] = $p$0;
    HEAP32[$311>>2] = $p$0;
    $317 = (($p$0) + 8|0);
    HEAP32[$317>>2] = $312;
    $318 = (($p$0) + 12|0);
    HEAP32[$318>>2] = $T$0$lcssa;
    $319 = (($p$0) + 24|0);
    HEAP32[$319>>2] = 0;
    break;
   }
  }
 } while(0);
 $320 = HEAP32[((8512 + 32|0))>>2]|0;
 $321 = (($320) + -1)|0;
 HEAP32[((8512 + 32|0))>>2] = $321;
 $322 = ($321|0)==(0);
 if ($322) {
  $sp$0$in$i = ((8512 + 456|0));
 } else {
  STACKTOP = sp;return;
 }
 while(1) {
  $sp$0$i = HEAP32[$sp$0$in$i>>2]|0;
  $323 = ($sp$0$i|0)==(0|0);
  $324 = (($sp$0$i) + 8|0);
  if ($323) {
   break;
  } else {
   $sp$0$in$i = $324;
  }
 }
 HEAP32[((8512 + 32|0))>>2] = -1;
 STACKTOP = sp;return;
}
function _realloc($oldmem,$bytes) {
 $oldmem = $oldmem|0;
 $bytes = $bytes|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, $mem$0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($oldmem|0)==(0|0);
 do {
  if ($0) {
   $1 = (_malloc($bytes)|0);
   $mem$0 = $1;
  } else {
   $2 = ($bytes>>>0)>(4294967231);
   if ($2) {
    $3 = (___errno_location()|0);
    HEAP32[$3>>2] = 12;
    $mem$0 = 0;
    break;
   }
   $4 = ($bytes>>>0)<(11);
   if ($4) {
    $8 = 16;
   } else {
    $5 = (($bytes) + 11)|0;
    $6 = $5 & -8;
    $8 = $6;
   }
   $7 = (($oldmem) + -8|0);
   $9 = (_try_realloc_chunk($7,$8)|0);
   $10 = ($9|0)==(0|0);
   if (!($10)) {
    $11 = (($9) + 8|0);
    $mem$0 = $11;
    break;
   }
   $12 = (_malloc($bytes)|0);
   $13 = ($12|0)==(0|0);
   if ($13) {
    $mem$0 = 0;
   } else {
    $14 = (($oldmem) + -4|0);
    $15 = HEAP32[$14>>2]|0;
    $16 = $15 & -8;
    $17 = $15 & 3;
    $18 = ($17|0)==(0);
    $19 = $18 ? 8 : 4;
    $20 = (($16) - ($19))|0;
    $21 = ($20>>>0)<($bytes>>>0);
    $22 = $21 ? $20 : $bytes;
    _memcpy(($12|0),($oldmem|0),($22|0))|0;
    _free($oldmem);
    $mem$0 = $12;
   }
  }
 } while(0);
 STACKTOP = sp;return ($mem$0|0);
}
function _try_realloc_chunk($p,$nb) {
 $p = $p|0;
 $nb = $nb|0;
 var $$pre = 0, $$pre$phiZ2D = 0, $$sum = 0, $$sum11 = 0, $$sum12 = 0, $$sum13 = 0, $$sum14 = 0, $$sum15 = 0, $$sum16 = 0, $$sum17 = 0, $$sum19 = 0, $$sum2 = 0, $$sum20 = 0, $$sum22 = 0, $$sum23 = 0, $$sum2728 = 0, $$sum3 = 0, $$sum4 = 0, $$sum5 = 0, $$sum78 = 0;
 var $$sum910 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0;
 var $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0;
 var $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0;
 var $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0;
 var $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0;
 var $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0;
 var $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0;
 var $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0;
 var $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $R$0 = 0, $R$1 = 0, $RP$0 = 0;
 var $cond = 0, $newp$0 = 0, $or$cond = 0, $storemerge = 0, $storemerge21 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($p) + 4|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = $1 & -8;
 $3 = (($p) + ($2)|0);
 $4 = HEAP32[((8512 + 16|0))>>2]|0;
 $5 = ($p>>>0)<($4>>>0);
 if ($5) {
  _abort();
  // unreachable;
 }
 $6 = $1 & 3;
 $7 = ($6|0)!=(1);
 $8 = ($p>>>0)<($3>>>0);
 $or$cond = $7 & $8;
 if (!($or$cond)) {
  _abort();
  // unreachable;
 }
 $$sum2728 = $2 | 4;
 $9 = (($p) + ($$sum2728)|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = $10 & 1;
 $12 = ($11|0)==(0);
 if ($12) {
  _abort();
  // unreachable;
 }
 $13 = ($6|0)==(0);
 if ($13) {
  $14 = ($nb>>>0)<(256);
  if ($14) {
   $newp$0 = 0;
   STACKTOP = sp;return ($newp$0|0);
  }
  $15 = (($nb) + 4)|0;
  $16 = ($2>>>0)<($15>>>0);
  if (!($16)) {
   $17 = (($2) - ($nb))|0;
   $18 = HEAP32[((8984 + 8|0))>>2]|0;
   $19 = $18 << 1;
   $20 = ($17>>>0)>($19>>>0);
   if (!($20)) {
    $newp$0 = $p;
    STACKTOP = sp;return ($newp$0|0);
   }
  }
  $newp$0 = 0;
  STACKTOP = sp;return ($newp$0|0);
 }
 $21 = ($2>>>0)<($nb>>>0);
 if (!($21)) {
  $22 = (($2) - ($nb))|0;
  $23 = ($22>>>0)>(15);
  if (!($23)) {
   $newp$0 = $p;
   STACKTOP = sp;return ($newp$0|0);
  }
  $24 = (($p) + ($nb)|0);
  $25 = $1 & 1;
  $26 = $25 | $nb;
  $27 = $26 | 2;
  HEAP32[$0>>2] = $27;
  $$sum23 = (($nb) + 4)|0;
  $28 = (($p) + ($$sum23)|0);
  $29 = $22 | 3;
  HEAP32[$28>>2] = $29;
  $30 = HEAP32[$9>>2]|0;
  $31 = $30 | 1;
  HEAP32[$9>>2] = $31;
  _dispose_chunk($24,$22);
  $newp$0 = $p;
  STACKTOP = sp;return ($newp$0|0);
 }
 $32 = HEAP32[((8512 + 24|0))>>2]|0;
 $33 = ($3|0)==($32|0);
 if ($33) {
  $34 = HEAP32[((8512 + 12|0))>>2]|0;
  $35 = (($34) + ($2))|0;
  $36 = ($35>>>0)>($nb>>>0);
  if (!($36)) {
   $newp$0 = 0;
   STACKTOP = sp;return ($newp$0|0);
  }
  $37 = (($35) - ($nb))|0;
  $38 = (($p) + ($nb)|0);
  $39 = $1 & 1;
  $40 = $39 | $nb;
  $41 = $40 | 2;
  HEAP32[$0>>2] = $41;
  $$sum22 = (($nb) + 4)|0;
  $42 = (($p) + ($$sum22)|0);
  $43 = $37 | 1;
  HEAP32[$42>>2] = $43;
  HEAP32[((8512 + 24|0))>>2] = $38;
  HEAP32[((8512 + 12|0))>>2] = $37;
  $newp$0 = $p;
  STACKTOP = sp;return ($newp$0|0);
 }
 $44 = HEAP32[((8512 + 20|0))>>2]|0;
 $45 = ($3|0)==($44|0);
 if ($45) {
  $46 = HEAP32[((8512 + 8|0))>>2]|0;
  $47 = (($46) + ($2))|0;
  $48 = ($47>>>0)<($nb>>>0);
  if ($48) {
   $newp$0 = 0;
   STACKTOP = sp;return ($newp$0|0);
  }
  $49 = (($47) - ($nb))|0;
  $50 = ($49>>>0)>(15);
  if ($50) {
   $51 = (($p) + ($nb)|0);
   $52 = (($p) + ($47)|0);
   $53 = $1 & 1;
   $54 = $53 | $nb;
   $55 = $54 | 2;
   HEAP32[$0>>2] = $55;
   $$sum19 = (($nb) + 4)|0;
   $56 = (($p) + ($$sum19)|0);
   $57 = $49 | 1;
   HEAP32[$56>>2] = $57;
   HEAP32[$52>>2] = $49;
   $$sum20 = (($47) + 4)|0;
   $58 = (($p) + ($$sum20)|0);
   $59 = HEAP32[$58>>2]|0;
   $60 = $59 & -2;
   HEAP32[$58>>2] = $60;
   $storemerge = $51;$storemerge21 = $49;
  } else {
   $61 = $1 & 1;
   $62 = $61 | $47;
   $63 = $62 | 2;
   HEAP32[$0>>2] = $63;
   $$sum17 = (($47) + 4)|0;
   $64 = (($p) + ($$sum17)|0);
   $65 = HEAP32[$64>>2]|0;
   $66 = $65 | 1;
   HEAP32[$64>>2] = $66;
   $storemerge = 0;$storemerge21 = 0;
  }
  HEAP32[((8512 + 8|0))>>2] = $storemerge21;
  HEAP32[((8512 + 20|0))>>2] = $storemerge;
  $newp$0 = $p;
  STACKTOP = sp;return ($newp$0|0);
 }
 $67 = $10 & 2;
 $68 = ($67|0)==(0);
 if (!($68)) {
  $newp$0 = 0;
  STACKTOP = sp;return ($newp$0|0);
 }
 $69 = $10 & -8;
 $70 = (($69) + ($2))|0;
 $71 = ($70>>>0)<($nb>>>0);
 if ($71) {
  $newp$0 = 0;
  STACKTOP = sp;return ($newp$0|0);
 }
 $72 = (($70) - ($nb))|0;
 $73 = $10 >>> 3;
 $74 = ($10>>>0)<(256);
 do {
  if ($74) {
   $$sum15 = (($2) + 8)|0;
   $75 = (($p) + ($$sum15)|0);
   $76 = HEAP32[$75>>2]|0;
   $$sum16 = (($2) + 12)|0;
   $77 = (($p) + ($$sum16)|0);
   $78 = HEAP32[$77>>2]|0;
   $79 = $73 << 1;
   $80 = ((8512 + ($79<<2)|0) + 40|0);
   $81 = ($76|0)==($80|0);
   if (!($81)) {
    $82 = ($76>>>0)<($4>>>0);
    if ($82) {
     _abort();
     // unreachable;
    }
    $83 = (($76) + 12|0);
    $84 = HEAP32[$83>>2]|0;
    $85 = ($84|0)==($3|0);
    if (!($85)) {
     _abort();
     // unreachable;
    }
   }
   $86 = ($78|0)==($76|0);
   if ($86) {
    $87 = 1 << $73;
    $88 = $87 ^ -1;
    $89 = HEAP32[8512>>2]|0;
    $90 = $89 & $88;
    HEAP32[8512>>2] = $90;
    break;
   }
   $91 = ($78|0)==($80|0);
   if ($91) {
    $$pre = (($78) + 8|0);
    $$pre$phiZ2D = $$pre;
   } else {
    $92 = ($78>>>0)<($4>>>0);
    if ($92) {
     _abort();
     // unreachable;
    }
    $93 = (($78) + 8|0);
    $94 = HEAP32[$93>>2]|0;
    $95 = ($94|0)==($3|0);
    if ($95) {
     $$pre$phiZ2D = $93;
    } else {
     _abort();
     // unreachable;
    }
   }
   $96 = (($76) + 12|0);
   HEAP32[$96>>2] = $78;
   HEAP32[$$pre$phiZ2D>>2] = $76;
  } else {
   $$sum = (($2) + 24)|0;
   $97 = (($p) + ($$sum)|0);
   $98 = HEAP32[$97>>2]|0;
   $$sum2 = (($2) + 12)|0;
   $99 = (($p) + ($$sum2)|0);
   $100 = HEAP32[$99>>2]|0;
   $101 = ($100|0)==($3|0);
   do {
    if ($101) {
     $$sum4 = (($2) + 20)|0;
     $111 = (($p) + ($$sum4)|0);
     $112 = HEAP32[$111>>2]|0;
     $113 = ($112|0)==(0|0);
     if ($113) {
      $$sum3 = (($2) + 16)|0;
      $114 = (($p) + ($$sum3)|0);
      $115 = HEAP32[$114>>2]|0;
      $116 = ($115|0)==(0|0);
      if ($116) {
       $R$1 = 0;
       break;
      } else {
       $R$0 = $115;$RP$0 = $114;
      }
     } else {
      $R$0 = $112;$RP$0 = $111;
     }
     while(1) {
      $117 = (($R$0) + 20|0);
      $118 = HEAP32[$117>>2]|0;
      $119 = ($118|0)==(0|0);
      if (!($119)) {
       $R$0 = $118;$RP$0 = $117;
       continue;
      }
      $120 = (($R$0) + 16|0);
      $121 = HEAP32[$120>>2]|0;
      $122 = ($121|0)==(0|0);
      if ($122) {
       break;
      } else {
       $R$0 = $121;$RP$0 = $120;
      }
     }
     $123 = ($RP$0>>>0)<($4>>>0);
     if ($123) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$RP$0>>2] = 0;
      $R$1 = $R$0;
      break;
     }
    } else {
     $$sum14 = (($2) + 8)|0;
     $102 = (($p) + ($$sum14)|0);
     $103 = HEAP32[$102>>2]|0;
     $104 = ($103>>>0)<($4>>>0);
     if ($104) {
      _abort();
      // unreachable;
     }
     $105 = (($103) + 12|0);
     $106 = HEAP32[$105>>2]|0;
     $107 = ($106|0)==($3|0);
     if (!($107)) {
      _abort();
      // unreachable;
     }
     $108 = (($100) + 8|0);
     $109 = HEAP32[$108>>2]|0;
     $110 = ($109|0)==($3|0);
     if ($110) {
      HEAP32[$105>>2] = $100;
      HEAP32[$108>>2] = $103;
      $R$1 = $100;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   } while(0);
   $124 = ($98|0)==(0|0);
   if (!($124)) {
    $$sum11 = (($2) + 28)|0;
    $125 = (($p) + ($$sum11)|0);
    $126 = HEAP32[$125>>2]|0;
    $127 = ((8512 + ($126<<2)|0) + 304|0);
    $128 = HEAP32[$127>>2]|0;
    $129 = ($3|0)==($128|0);
    if ($129) {
     HEAP32[$127>>2] = $R$1;
     $cond = ($R$1|0)==(0|0);
     if ($cond) {
      $130 = 1 << $126;
      $131 = $130 ^ -1;
      $132 = HEAP32[((8512 + 4|0))>>2]|0;
      $133 = $132 & $131;
      HEAP32[((8512 + 4|0))>>2] = $133;
      break;
     }
    } else {
     $134 = HEAP32[((8512 + 16|0))>>2]|0;
     $135 = ($98>>>0)<($134>>>0);
     if ($135) {
      _abort();
      // unreachable;
     }
     $136 = (($98) + 16|0);
     $137 = HEAP32[$136>>2]|0;
     $138 = ($137|0)==($3|0);
     if ($138) {
      HEAP32[$136>>2] = $R$1;
     } else {
      $139 = (($98) + 20|0);
      HEAP32[$139>>2] = $R$1;
     }
     $140 = ($R$1|0)==(0|0);
     if ($140) {
      break;
     }
    }
    $141 = HEAP32[((8512 + 16|0))>>2]|0;
    $142 = ($R$1>>>0)<($141>>>0);
    if ($142) {
     _abort();
     // unreachable;
    }
    $143 = (($R$1) + 24|0);
    HEAP32[$143>>2] = $98;
    $$sum12 = (($2) + 16)|0;
    $144 = (($p) + ($$sum12)|0);
    $145 = HEAP32[$144>>2]|0;
    $146 = ($145|0)==(0|0);
    do {
     if (!($146)) {
      $147 = HEAP32[((8512 + 16|0))>>2]|0;
      $148 = ($145>>>0)<($147>>>0);
      if ($148) {
       _abort();
       // unreachable;
      } else {
       $149 = (($R$1) + 16|0);
       HEAP32[$149>>2] = $145;
       $150 = (($145) + 24|0);
       HEAP32[$150>>2] = $R$1;
       break;
      }
     }
    } while(0);
    $$sum13 = (($2) + 20)|0;
    $151 = (($p) + ($$sum13)|0);
    $152 = HEAP32[$151>>2]|0;
    $153 = ($152|0)==(0|0);
    if (!($153)) {
     $154 = HEAP32[((8512 + 16|0))>>2]|0;
     $155 = ($152>>>0)<($154>>>0);
     if ($155) {
      _abort();
      // unreachable;
     } else {
      $156 = (($R$1) + 20|0);
      HEAP32[$156>>2] = $152;
      $157 = (($152) + 24|0);
      HEAP32[$157>>2] = $R$1;
      break;
     }
    }
   }
  }
 } while(0);
 $158 = ($72>>>0)<(16);
 if ($158) {
  $159 = HEAP32[$0>>2]|0;
  $160 = $159 & 1;
  $161 = $70 | $160;
  $162 = $161 | 2;
  HEAP32[$0>>2] = $162;
  $$sum910 = $70 | 4;
  $163 = (($p) + ($$sum910)|0);
  $164 = HEAP32[$163>>2]|0;
  $165 = $164 | 1;
  HEAP32[$163>>2] = $165;
  $newp$0 = $p;
  STACKTOP = sp;return ($newp$0|0);
 } else {
  $166 = (($p) + ($nb)|0);
  $167 = HEAP32[$0>>2]|0;
  $168 = $167 & 1;
  $169 = $168 | $nb;
  $170 = $169 | 2;
  HEAP32[$0>>2] = $170;
  $$sum5 = (($nb) + 4)|0;
  $171 = (($p) + ($$sum5)|0);
  $172 = $72 | 3;
  HEAP32[$171>>2] = $172;
  $$sum78 = $70 | 4;
  $173 = (($p) + ($$sum78)|0);
  $174 = HEAP32[$173>>2]|0;
  $175 = $174 | 1;
  HEAP32[$173>>2] = $175;
  _dispose_chunk($166,$72);
  $newp$0 = $p;
  STACKTOP = sp;return ($newp$0|0);
 }
 return 0|0;
}
function _dispose_chunk($p,$psize) {
 $p = $p|0;
 $psize = $psize|0;
 var $$0 = 0, $$02 = 0, $$1 = 0, $$pre = 0, $$pre$phi63Z2D = 0, $$pre$phi65Z2D = 0, $$pre$phiZ2D = 0, $$pre62 = 0, $$pre64 = 0, $$sum = 0, $$sum1 = 0, $$sum12$pre = 0, $$sum13 = 0, $$sum14 = 0, $$sum15 = 0, $$sum16 = 0, $$sum17 = 0, $$sum18 = 0, $$sum19 = 0, $$sum2 = 0;
 var $$sum20 = 0, $$sum22 = 0, $$sum23 = 0, $$sum24 = 0, $$sum25 = 0, $$sum26 = 0, $$sum27 = 0, $$sum28 = 0, $$sum29 = 0, $$sum3 = 0, $$sum30 = 0, $$sum31 = 0, $$sum4 = 0, $$sum5 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0;
 var $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0;
 var $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0;
 var $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0;
 var $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0;
 var $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0;
 var $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0;
 var $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0;
 var $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0;
 var $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0;
 var $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0;
 var $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0;
 var $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0;
 var $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0;
 var $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0;
 var $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0;
 var $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $F16$0 = 0, $I19$0 = 0, $I19$0$c = 0, $K20$049 = 0, $R$0 = 0, $R$1 = 0, $R7$0 = 0, $R7$1 = 0, $RP$0 = 0, $RP9$0 = 0, $T$0$lcssa = 0, $T$048 = 0, $cond = 0, $cond46 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 $0 = (($p) + ($psize)|0);
 $1 = (($p) + 4|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = $2 & 1;
 $4 = ($3|0)==(0);
 do {
  if ($4) {
   $5 = HEAP32[$p>>2]|0;
   $6 = $2 & 3;
   $7 = ($6|0)==(0);
   if ($7) {
    STACKTOP = sp;return;
   }
   $8 = (0 - ($5))|0;
   $9 = (($p) + ($8)|0);
   $10 = (($5) + ($psize))|0;
   $11 = HEAP32[((8512 + 16|0))>>2]|0;
   $12 = ($9>>>0)<($11>>>0);
   if ($12) {
    _abort();
    // unreachable;
   }
   $13 = HEAP32[((8512 + 20|0))>>2]|0;
   $14 = ($9|0)==($13|0);
   if ($14) {
    $$sum = (($psize) + 4)|0;
    $100 = (($p) + ($$sum)|0);
    $101 = HEAP32[$100>>2]|0;
    $102 = $101 & 3;
    $103 = ($102|0)==(3);
    if (!($103)) {
     $$0 = $9;$$02 = $10;
     break;
    }
    HEAP32[((8512 + 8|0))>>2] = $10;
    $104 = HEAP32[$100>>2]|0;
    $105 = $104 & -2;
    HEAP32[$100>>2] = $105;
    $106 = $10 | 1;
    $$sum20 = (4 - ($5))|0;
    $107 = (($p) + ($$sum20)|0);
    HEAP32[$107>>2] = $106;
    HEAP32[$0>>2] = $10;
    STACKTOP = sp;return;
   }
   $15 = $5 >>> 3;
   $16 = ($5>>>0)<(256);
   if ($16) {
    $$sum30 = (8 - ($5))|0;
    $17 = (($p) + ($$sum30)|0);
    $18 = HEAP32[$17>>2]|0;
    $$sum31 = (12 - ($5))|0;
    $19 = (($p) + ($$sum31)|0);
    $20 = HEAP32[$19>>2]|0;
    $21 = $15 << 1;
    $22 = ((8512 + ($21<<2)|0) + 40|0);
    $23 = ($18|0)==($22|0);
    if (!($23)) {
     $24 = ($18>>>0)<($11>>>0);
     if ($24) {
      _abort();
      // unreachable;
     }
     $25 = (($18) + 12|0);
     $26 = HEAP32[$25>>2]|0;
     $27 = ($26|0)==($9|0);
     if (!($27)) {
      _abort();
      // unreachable;
     }
    }
    $28 = ($20|0)==($18|0);
    if ($28) {
     $29 = 1 << $15;
     $30 = $29 ^ -1;
     $31 = HEAP32[8512>>2]|0;
     $32 = $31 & $30;
     HEAP32[8512>>2] = $32;
     $$0 = $9;$$02 = $10;
     break;
    }
    $33 = ($20|0)==($22|0);
    if ($33) {
     $$pre64 = (($20) + 8|0);
     $$pre$phi65Z2D = $$pre64;
    } else {
     $34 = ($20>>>0)<($11>>>0);
     if ($34) {
      _abort();
      // unreachable;
     }
     $35 = (($20) + 8|0);
     $36 = HEAP32[$35>>2]|0;
     $37 = ($36|0)==($9|0);
     if ($37) {
      $$pre$phi65Z2D = $35;
     } else {
      _abort();
      // unreachable;
     }
    }
    $38 = (($18) + 12|0);
    HEAP32[$38>>2] = $20;
    HEAP32[$$pre$phi65Z2D>>2] = $18;
    $$0 = $9;$$02 = $10;
    break;
   }
   $$sum22 = (24 - ($5))|0;
   $39 = (($p) + ($$sum22)|0);
   $40 = HEAP32[$39>>2]|0;
   $$sum23 = (12 - ($5))|0;
   $41 = (($p) + ($$sum23)|0);
   $42 = HEAP32[$41>>2]|0;
   $43 = ($42|0)==($9|0);
   do {
    if ($43) {
     $$sum24 = (16 - ($5))|0;
     $$sum25 = (($$sum24) + 4)|0;
     $53 = (($p) + ($$sum25)|0);
     $54 = HEAP32[$53>>2]|0;
     $55 = ($54|0)==(0|0);
     if ($55) {
      $56 = (($p) + ($$sum24)|0);
      $57 = HEAP32[$56>>2]|0;
      $58 = ($57|0)==(0|0);
      if ($58) {
       $R$1 = 0;
       break;
      } else {
       $R$0 = $57;$RP$0 = $56;
      }
     } else {
      $R$0 = $54;$RP$0 = $53;
     }
     while(1) {
      $59 = (($R$0) + 20|0);
      $60 = HEAP32[$59>>2]|0;
      $61 = ($60|0)==(0|0);
      if (!($61)) {
       $R$0 = $60;$RP$0 = $59;
       continue;
      }
      $62 = (($R$0) + 16|0);
      $63 = HEAP32[$62>>2]|0;
      $64 = ($63|0)==(0|0);
      if ($64) {
       break;
      } else {
       $R$0 = $63;$RP$0 = $62;
      }
     }
     $65 = ($RP$0>>>0)<($11>>>0);
     if ($65) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$RP$0>>2] = 0;
      $R$1 = $R$0;
      break;
     }
    } else {
     $$sum29 = (8 - ($5))|0;
     $44 = (($p) + ($$sum29)|0);
     $45 = HEAP32[$44>>2]|0;
     $46 = ($45>>>0)<($11>>>0);
     if ($46) {
      _abort();
      // unreachable;
     }
     $47 = (($45) + 12|0);
     $48 = HEAP32[$47>>2]|0;
     $49 = ($48|0)==($9|0);
     if (!($49)) {
      _abort();
      // unreachable;
     }
     $50 = (($42) + 8|0);
     $51 = HEAP32[$50>>2]|0;
     $52 = ($51|0)==($9|0);
     if ($52) {
      HEAP32[$47>>2] = $42;
      HEAP32[$50>>2] = $45;
      $R$1 = $42;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   } while(0);
   $66 = ($40|0)==(0|0);
   if ($66) {
    $$0 = $9;$$02 = $10;
   } else {
    $$sum26 = (28 - ($5))|0;
    $67 = (($p) + ($$sum26)|0);
    $68 = HEAP32[$67>>2]|0;
    $69 = ((8512 + ($68<<2)|0) + 304|0);
    $70 = HEAP32[$69>>2]|0;
    $71 = ($9|0)==($70|0);
    if ($71) {
     HEAP32[$69>>2] = $R$1;
     $cond = ($R$1|0)==(0|0);
     if ($cond) {
      $72 = 1 << $68;
      $73 = $72 ^ -1;
      $74 = HEAP32[((8512 + 4|0))>>2]|0;
      $75 = $74 & $73;
      HEAP32[((8512 + 4|0))>>2] = $75;
      $$0 = $9;$$02 = $10;
      break;
     }
    } else {
     $76 = HEAP32[((8512 + 16|0))>>2]|0;
     $77 = ($40>>>0)<($76>>>0);
     if ($77) {
      _abort();
      // unreachable;
     }
     $78 = (($40) + 16|0);
     $79 = HEAP32[$78>>2]|0;
     $80 = ($79|0)==($9|0);
     if ($80) {
      HEAP32[$78>>2] = $R$1;
     } else {
      $81 = (($40) + 20|0);
      HEAP32[$81>>2] = $R$1;
     }
     $82 = ($R$1|0)==(0|0);
     if ($82) {
      $$0 = $9;$$02 = $10;
      break;
     }
    }
    $83 = HEAP32[((8512 + 16|0))>>2]|0;
    $84 = ($R$1>>>0)<($83>>>0);
    if ($84) {
     _abort();
     // unreachable;
    }
    $85 = (($R$1) + 24|0);
    HEAP32[$85>>2] = $40;
    $$sum27 = (16 - ($5))|0;
    $86 = (($p) + ($$sum27)|0);
    $87 = HEAP32[$86>>2]|0;
    $88 = ($87|0)==(0|0);
    do {
     if (!($88)) {
      $89 = HEAP32[((8512 + 16|0))>>2]|0;
      $90 = ($87>>>0)<($89>>>0);
      if ($90) {
       _abort();
       // unreachable;
      } else {
       $91 = (($R$1) + 16|0);
       HEAP32[$91>>2] = $87;
       $92 = (($87) + 24|0);
       HEAP32[$92>>2] = $R$1;
       break;
      }
     }
    } while(0);
    $$sum28 = (($$sum27) + 4)|0;
    $93 = (($p) + ($$sum28)|0);
    $94 = HEAP32[$93>>2]|0;
    $95 = ($94|0)==(0|0);
    if ($95) {
     $$0 = $9;$$02 = $10;
    } else {
     $96 = HEAP32[((8512 + 16|0))>>2]|0;
     $97 = ($94>>>0)<($96>>>0);
     if ($97) {
      _abort();
      // unreachable;
     } else {
      $98 = (($R$1) + 20|0);
      HEAP32[$98>>2] = $94;
      $99 = (($94) + 24|0);
      HEAP32[$99>>2] = $R$1;
      $$0 = $9;$$02 = $10;
      break;
     }
    }
   }
  } else {
   $$0 = $p;$$02 = $psize;
  }
 } while(0);
 $108 = HEAP32[((8512 + 16|0))>>2]|0;
 $109 = ($0>>>0)<($108>>>0);
 if ($109) {
  _abort();
  // unreachable;
 }
 $$sum1 = (($psize) + 4)|0;
 $110 = (($p) + ($$sum1)|0);
 $111 = HEAP32[$110>>2]|0;
 $112 = $111 & 2;
 $113 = ($112|0)==(0);
 if ($113) {
  $114 = HEAP32[((8512 + 24|0))>>2]|0;
  $115 = ($0|0)==($114|0);
  if ($115) {
   $116 = HEAP32[((8512 + 12|0))>>2]|0;
   $117 = (($116) + ($$02))|0;
   HEAP32[((8512 + 12|0))>>2] = $117;
   HEAP32[((8512 + 24|0))>>2] = $$0;
   $118 = $117 | 1;
   $119 = (($$0) + 4|0);
   HEAP32[$119>>2] = $118;
   $120 = HEAP32[((8512 + 20|0))>>2]|0;
   $121 = ($$0|0)==($120|0);
   if (!($121)) {
    STACKTOP = sp;return;
   }
   HEAP32[((8512 + 20|0))>>2] = 0;
   HEAP32[((8512 + 8|0))>>2] = 0;
   STACKTOP = sp;return;
  }
  $122 = HEAP32[((8512 + 20|0))>>2]|0;
  $123 = ($0|0)==($122|0);
  if ($123) {
   $124 = HEAP32[((8512 + 8|0))>>2]|0;
   $125 = (($124) + ($$02))|0;
   HEAP32[((8512 + 8|0))>>2] = $125;
   HEAP32[((8512 + 20|0))>>2] = $$0;
   $126 = $125 | 1;
   $127 = (($$0) + 4|0);
   HEAP32[$127>>2] = $126;
   $128 = (($$0) + ($125)|0);
   HEAP32[$128>>2] = $125;
   STACKTOP = sp;return;
  }
  $129 = $111 & -8;
  $130 = (($129) + ($$02))|0;
  $131 = $111 >>> 3;
  $132 = ($111>>>0)<(256);
  do {
   if ($132) {
    $$sum18 = (($psize) + 8)|0;
    $133 = (($p) + ($$sum18)|0);
    $134 = HEAP32[$133>>2]|0;
    $$sum19 = (($psize) + 12)|0;
    $135 = (($p) + ($$sum19)|0);
    $136 = HEAP32[$135>>2]|0;
    $137 = $131 << 1;
    $138 = ((8512 + ($137<<2)|0) + 40|0);
    $139 = ($134|0)==($138|0);
    if (!($139)) {
     $140 = ($134>>>0)<($108>>>0);
     if ($140) {
      _abort();
      // unreachable;
     }
     $141 = (($134) + 12|0);
     $142 = HEAP32[$141>>2]|0;
     $143 = ($142|0)==($0|0);
     if (!($143)) {
      _abort();
      // unreachable;
     }
    }
    $144 = ($136|0)==($134|0);
    if ($144) {
     $145 = 1 << $131;
     $146 = $145 ^ -1;
     $147 = HEAP32[8512>>2]|0;
     $148 = $147 & $146;
     HEAP32[8512>>2] = $148;
     break;
    }
    $149 = ($136|0)==($138|0);
    if ($149) {
     $$pre62 = (($136) + 8|0);
     $$pre$phi63Z2D = $$pre62;
    } else {
     $150 = ($136>>>0)<($108>>>0);
     if ($150) {
      _abort();
      // unreachable;
     }
     $151 = (($136) + 8|0);
     $152 = HEAP32[$151>>2]|0;
     $153 = ($152|0)==($0|0);
     if ($153) {
      $$pre$phi63Z2D = $151;
     } else {
      _abort();
      // unreachable;
     }
    }
    $154 = (($134) + 12|0);
    HEAP32[$154>>2] = $136;
    HEAP32[$$pre$phi63Z2D>>2] = $134;
   } else {
    $$sum2 = (($psize) + 24)|0;
    $155 = (($p) + ($$sum2)|0);
    $156 = HEAP32[$155>>2]|0;
    $$sum3 = (($psize) + 12)|0;
    $157 = (($p) + ($$sum3)|0);
    $158 = HEAP32[$157>>2]|0;
    $159 = ($158|0)==($0|0);
    do {
     if ($159) {
      $$sum5 = (($psize) + 20)|0;
      $169 = (($p) + ($$sum5)|0);
      $170 = HEAP32[$169>>2]|0;
      $171 = ($170|0)==(0|0);
      if ($171) {
       $$sum4 = (($psize) + 16)|0;
       $172 = (($p) + ($$sum4)|0);
       $173 = HEAP32[$172>>2]|0;
       $174 = ($173|0)==(0|0);
       if ($174) {
        $R7$1 = 0;
        break;
       } else {
        $R7$0 = $173;$RP9$0 = $172;
       }
      } else {
       $R7$0 = $170;$RP9$0 = $169;
      }
      while(1) {
       $175 = (($R7$0) + 20|0);
       $176 = HEAP32[$175>>2]|0;
       $177 = ($176|0)==(0|0);
       if (!($177)) {
        $R7$0 = $176;$RP9$0 = $175;
        continue;
       }
       $178 = (($R7$0) + 16|0);
       $179 = HEAP32[$178>>2]|0;
       $180 = ($179|0)==(0|0);
       if ($180) {
        break;
       } else {
        $R7$0 = $179;$RP9$0 = $178;
       }
      }
      $181 = ($RP9$0>>>0)<($108>>>0);
      if ($181) {
       _abort();
       // unreachable;
      } else {
       HEAP32[$RP9$0>>2] = 0;
       $R7$1 = $R7$0;
       break;
      }
     } else {
      $$sum17 = (($psize) + 8)|0;
      $160 = (($p) + ($$sum17)|0);
      $161 = HEAP32[$160>>2]|0;
      $162 = ($161>>>0)<($108>>>0);
      if ($162) {
       _abort();
       // unreachable;
      }
      $163 = (($161) + 12|0);
      $164 = HEAP32[$163>>2]|0;
      $165 = ($164|0)==($0|0);
      if (!($165)) {
       _abort();
       // unreachable;
      }
      $166 = (($158) + 8|0);
      $167 = HEAP32[$166>>2]|0;
      $168 = ($167|0)==($0|0);
      if ($168) {
       HEAP32[$163>>2] = $158;
       HEAP32[$166>>2] = $161;
       $R7$1 = $158;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $182 = ($156|0)==(0|0);
    if (!($182)) {
     $$sum14 = (($psize) + 28)|0;
     $183 = (($p) + ($$sum14)|0);
     $184 = HEAP32[$183>>2]|0;
     $185 = ((8512 + ($184<<2)|0) + 304|0);
     $186 = HEAP32[$185>>2]|0;
     $187 = ($0|0)==($186|0);
     if ($187) {
      HEAP32[$185>>2] = $R7$1;
      $cond46 = ($R7$1|0)==(0|0);
      if ($cond46) {
       $188 = 1 << $184;
       $189 = $188 ^ -1;
       $190 = HEAP32[((8512 + 4|0))>>2]|0;
       $191 = $190 & $189;
       HEAP32[((8512 + 4|0))>>2] = $191;
       break;
      }
     } else {
      $192 = HEAP32[((8512 + 16|0))>>2]|0;
      $193 = ($156>>>0)<($192>>>0);
      if ($193) {
       _abort();
       // unreachable;
      }
      $194 = (($156) + 16|0);
      $195 = HEAP32[$194>>2]|0;
      $196 = ($195|0)==($0|0);
      if ($196) {
       HEAP32[$194>>2] = $R7$1;
      } else {
       $197 = (($156) + 20|0);
       HEAP32[$197>>2] = $R7$1;
      }
      $198 = ($R7$1|0)==(0|0);
      if ($198) {
       break;
      }
     }
     $199 = HEAP32[((8512 + 16|0))>>2]|0;
     $200 = ($R7$1>>>0)<($199>>>0);
     if ($200) {
      _abort();
      // unreachable;
     }
     $201 = (($R7$1) + 24|0);
     HEAP32[$201>>2] = $156;
     $$sum15 = (($psize) + 16)|0;
     $202 = (($p) + ($$sum15)|0);
     $203 = HEAP32[$202>>2]|0;
     $204 = ($203|0)==(0|0);
     do {
      if (!($204)) {
       $205 = HEAP32[((8512 + 16|0))>>2]|0;
       $206 = ($203>>>0)<($205>>>0);
       if ($206) {
        _abort();
        // unreachable;
       } else {
        $207 = (($R7$1) + 16|0);
        HEAP32[$207>>2] = $203;
        $208 = (($203) + 24|0);
        HEAP32[$208>>2] = $R7$1;
        break;
       }
      }
     } while(0);
     $$sum16 = (($psize) + 20)|0;
     $209 = (($p) + ($$sum16)|0);
     $210 = HEAP32[$209>>2]|0;
     $211 = ($210|0)==(0|0);
     if (!($211)) {
      $212 = HEAP32[((8512 + 16|0))>>2]|0;
      $213 = ($210>>>0)<($212>>>0);
      if ($213) {
       _abort();
       // unreachable;
      } else {
       $214 = (($R7$1) + 20|0);
       HEAP32[$214>>2] = $210;
       $215 = (($210) + 24|0);
       HEAP32[$215>>2] = $R7$1;
       break;
      }
     }
    }
   }
  } while(0);
  $216 = $130 | 1;
  $217 = (($$0) + 4|0);
  HEAP32[$217>>2] = $216;
  $218 = (($$0) + ($130)|0);
  HEAP32[$218>>2] = $130;
  $219 = HEAP32[((8512 + 20|0))>>2]|0;
  $220 = ($$0|0)==($219|0);
  if ($220) {
   HEAP32[((8512 + 8|0))>>2] = $130;
   STACKTOP = sp;return;
  } else {
   $$1 = $130;
  }
 } else {
  $221 = $111 & -2;
  HEAP32[$110>>2] = $221;
  $222 = $$02 | 1;
  $223 = (($$0) + 4|0);
  HEAP32[$223>>2] = $222;
  $224 = (($$0) + ($$02)|0);
  HEAP32[$224>>2] = $$02;
  $$1 = $$02;
 }
 $225 = $$1 >>> 3;
 $226 = ($$1>>>0)<(256);
 if ($226) {
  $227 = $225 << 1;
  $228 = ((8512 + ($227<<2)|0) + 40|0);
  $229 = HEAP32[8512>>2]|0;
  $230 = 1 << $225;
  $231 = $229 & $230;
  $232 = ($231|0)==(0);
  if ($232) {
   $233 = $229 | $230;
   HEAP32[8512>>2] = $233;
   $$sum12$pre = (($227) + 2)|0;
   $$pre = ((8512 + ($$sum12$pre<<2)|0) + 40|0);
   $$pre$phiZ2D = $$pre;$F16$0 = $228;
  } else {
   $$sum13 = (($227) + 2)|0;
   $234 = ((8512 + ($$sum13<<2)|0) + 40|0);
   $235 = HEAP32[$234>>2]|0;
   $236 = HEAP32[((8512 + 16|0))>>2]|0;
   $237 = ($235>>>0)<($236>>>0);
   if ($237) {
    _abort();
    // unreachable;
   } else {
    $$pre$phiZ2D = $234;$F16$0 = $235;
   }
  }
  HEAP32[$$pre$phiZ2D>>2] = $$0;
  $238 = (($F16$0) + 12|0);
  HEAP32[$238>>2] = $$0;
  $239 = (($$0) + 8|0);
  HEAP32[$239>>2] = $F16$0;
  $240 = (($$0) + 12|0);
  HEAP32[$240>>2] = $228;
  STACKTOP = sp;return;
 }
 $241 = $$1 >>> 8;
 $242 = ($241|0)==(0);
 if ($242) {
  $I19$0 = 0;
 } else {
  $243 = ($$1>>>0)>(16777215);
  if ($243) {
   $I19$0 = 31;
  } else {
   $244 = (($241) + 1048320)|0;
   $245 = $244 >>> 16;
   $246 = $245 & 8;
   $247 = $241 << $246;
   $248 = (($247) + 520192)|0;
   $249 = $248 >>> 16;
   $250 = $249 & 4;
   $251 = $250 | $246;
   $252 = $247 << $250;
   $253 = (($252) + 245760)|0;
   $254 = $253 >>> 16;
   $255 = $254 & 2;
   $256 = $251 | $255;
   $257 = (14 - ($256))|0;
   $258 = $252 << $255;
   $259 = $258 >>> 15;
   $260 = (($257) + ($259))|0;
   $261 = $260 << 1;
   $262 = (($260) + 7)|0;
   $263 = $$1 >>> $262;
   $264 = $263 & 1;
   $265 = $264 | $261;
   $I19$0 = $265;
  }
 }
 $266 = ((8512 + ($I19$0<<2)|0) + 304|0);
 $267 = (($$0) + 28|0);
 $I19$0$c = $I19$0;
 HEAP32[$267>>2] = $I19$0$c;
 $268 = (($$0) + 20|0);
 HEAP32[$268>>2] = 0;
 $269 = (($$0) + 16|0);
 HEAP32[$269>>2] = 0;
 $270 = HEAP32[((8512 + 4|0))>>2]|0;
 $271 = 1 << $I19$0;
 $272 = $270 & $271;
 $273 = ($272|0)==(0);
 if ($273) {
  $274 = $270 | $271;
  HEAP32[((8512 + 4|0))>>2] = $274;
  HEAP32[$266>>2] = $$0;
  $275 = (($$0) + 24|0);
  HEAP32[$275>>2] = $266;
  $276 = (($$0) + 12|0);
  HEAP32[$276>>2] = $$0;
  $277 = (($$0) + 8|0);
  HEAP32[$277>>2] = $$0;
  STACKTOP = sp;return;
 }
 $278 = HEAP32[$266>>2]|0;
 $279 = ($I19$0|0)==(31);
 if ($279) {
  $287 = 0;
 } else {
  $280 = $I19$0 >>> 1;
  $281 = (25 - ($280))|0;
  $287 = $281;
 }
 $282 = (($278) + 4|0);
 $283 = HEAP32[$282>>2]|0;
 $284 = $283 & -8;
 $285 = ($284|0)==($$1|0);
 L194: do {
  if ($285) {
   $T$0$lcssa = $278;
  } else {
   $286 = $$1 << $287;
   $K20$049 = $286;$T$048 = $278;
   while(1) {
    $294 = $K20$049 >>> 31;
    $295 = ((($T$048) + ($294<<2)|0) + 16|0);
    $290 = HEAP32[$295>>2]|0;
    $296 = ($290|0)==(0|0);
    if ($296) {
     break;
    }
    $288 = $K20$049 << 1;
    $289 = (($290) + 4|0);
    $291 = HEAP32[$289>>2]|0;
    $292 = $291 & -8;
    $293 = ($292|0)==($$1|0);
    if ($293) {
     $T$0$lcssa = $290;
     break L194;
    } else {
     $K20$049 = $288;$T$048 = $290;
    }
   }
   $297 = HEAP32[((8512 + 16|0))>>2]|0;
   $298 = ($295>>>0)<($297>>>0);
   if ($298) {
    _abort();
    // unreachable;
   }
   HEAP32[$295>>2] = $$0;
   $299 = (($$0) + 24|0);
   HEAP32[$299>>2] = $T$048;
   $300 = (($$0) + 12|0);
   HEAP32[$300>>2] = $$0;
   $301 = (($$0) + 8|0);
   HEAP32[$301>>2] = $$0;
   STACKTOP = sp;return;
  }
 } while(0);
 $302 = (($T$0$lcssa) + 8|0);
 $303 = HEAP32[$302>>2]|0;
 $304 = HEAP32[((8512 + 16|0))>>2]|0;
 $305 = ($T$0$lcssa>>>0)<($304>>>0);
 if ($305) {
  _abort();
  // unreachable;
 }
 $306 = ($303>>>0)<($304>>>0);
 if ($306) {
  _abort();
  // unreachable;
 }
 $307 = (($303) + 12|0);
 HEAP32[$307>>2] = $$0;
 HEAP32[$302>>2] = $$0;
 $308 = (($$0) + 8|0);
 HEAP32[$308>>2] = $303;
 $309 = (($$0) + 12|0);
 HEAP32[$309>>2] = $T$0$lcssa;
 $310 = (($$0) + 24|0);
 HEAP32[$310>>2] = 0;
 STACKTOP = sp;return;
}
function _isdigit($c) {
 $c = $c|0;
 var $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($c) + -48)|0;
 $1 = ($0>>>0)<(10);
 $2 = $1&1;
 STACKTOP = sp;return ($2|0);
}
function _isspace($c) {
 $c = $c|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($c|0)==(32);
 if ($0) {
  $4 = 1;
 } else {
  $1 = (($c) + -9)|0;
  $2 = ($1>>>0)<(5);
  $4 = $2;
 }
 $3 = $4&1;
 STACKTOP = sp;return ($3|0);
}
function _frexp($x,$e) {
 $x = +$x;
 $e = $e|0;
 var $$0 = 0.0, $$01 = 0.0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0.0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0.0, $7 = 0.0, $8 = 0, $9 = 0, $storemerge = 0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $x;$0 = HEAP32[tempDoublePtr>>2]|0;
 $1 = HEAP32[tempDoublePtr+4>>2]|0;
 $2 = (_bitshift64Lshr(($0|0),($1|0),52)|0);
 $3 = tempRet0;
 $4 = $2 & 2047;
 if ((($4|0) == 2047)) {
  $$0 = $x;
  STACKTOP = sp;return (+$$0);
 } else if ((($4|0) == 0)) {
  $5 = $x != 0.0;
  if ($5) {
   $6 = $x * 18446744073709551616.0;
   $7 = (+_frexp($6,$e));
   $8 = HEAP32[$e>>2]|0;
   $9 = (($8) + -64)|0;
   $$01 = $7;$storemerge = $9;
  } else {
   $$01 = $x;$storemerge = 0;
  }
  HEAP32[$e>>2] = $storemerge;
  $$0 = $$01;
  STACKTOP = sp;return (+$$0);
 } else {
  $10 = (($4) + -1022)|0;
  HEAP32[$e>>2] = $10;
  $11 = $1 & -2146435073;
  $12 = $11 | 1071644672;
  HEAP32[tempDoublePtr>>2] = $0;HEAP32[tempDoublePtr+4>>2] = $12;$13 = +HEAPF64[tempDoublePtr>>3];
  $$0 = $13;
  STACKTOP = sp;return (+$$0);
 }
 return +0;
}
function _frexpl($x,$e) {
 $x = +$x;
 $e = $e|0;
 var $0 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (+_frexp($x,$e));
 STACKTOP = sp;return (+$0);
}
function _wctomb($s,$wc) {
 $s = $s|0;
 $wc = $wc|0;
 var $$0 = 0, $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($s|0)==(0|0);
 if ($0) {
  $$0 = 0;
 } else {
  $1 = (_wcrtomb($s,$wc,0)|0);
  $$0 = $1;
 }
 STACKTOP = sp;return ($$0|0);
}
function _wcrtomb($s,$wc,$st) {
 $s = $s|0;
 $wc = $wc|0;
 $st = $st|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0;
 var $44 = 0, $45 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($s|0)==(0|0);
 if ($0) {
  $$0 = 1;
  STACKTOP = sp;return ($$0|0);
 }
 $1 = ($wc>>>0)<(128);
 if ($1) {
  $2 = $wc&255;
  HEAP8[$s>>0] = $2;
  $$0 = 1;
  STACKTOP = sp;return ($$0|0);
 }
 $3 = ($wc>>>0)<(2048);
 if ($3) {
  $4 = $wc >>> 6;
  $5 = $4 | 192;
  $6 = $5&255;
  $7 = (($s) + 1|0);
  HEAP8[$s>>0] = $6;
  $8 = $wc & 63;
  $9 = $8 | 128;
  $10 = $9&255;
  HEAP8[$7>>0] = $10;
  $$0 = 2;
  STACKTOP = sp;return ($$0|0);
 }
 $11 = ($wc>>>0)<(55296);
 $12 = (($wc) + -57344)|0;
 $13 = ($12>>>0)<(8192);
 $or$cond = $11 | $13;
 if ($or$cond) {
  $14 = $wc >>> 12;
  $15 = $14 | 224;
  $16 = $15&255;
  $17 = (($s) + 1|0);
  HEAP8[$s>>0] = $16;
  $18 = $wc >>> 6;
  $19 = $18 & 63;
  $20 = $19 | 128;
  $21 = $20&255;
  $22 = (($s) + 2|0);
  HEAP8[$17>>0] = $21;
  $23 = $wc & 63;
  $24 = $23 | 128;
  $25 = $24&255;
  HEAP8[$22>>0] = $25;
  $$0 = 3;
  STACKTOP = sp;return ($$0|0);
 }
 $26 = (($wc) + -65536)|0;
 $27 = ($26>>>0)<(1048576);
 if ($27) {
  $28 = $wc >>> 18;
  $29 = $28 | 240;
  $30 = $29&255;
  $31 = (($s) + 1|0);
  HEAP8[$s>>0] = $30;
  $32 = $wc >>> 12;
  $33 = $32 & 63;
  $34 = $33 | 128;
  $35 = $34&255;
  $36 = (($s) + 2|0);
  HEAP8[$31>>0] = $35;
  $37 = $wc >>> 6;
  $38 = $37 & 63;
  $39 = $38 | 128;
  $40 = $39&255;
  $41 = (($s) + 3|0);
  HEAP8[$36>>0] = $40;
  $42 = $wc & 63;
  $43 = $42 | 128;
  $44 = $43&255;
  HEAP8[$41>>0] = $44;
  $$0 = 4;
  STACKTOP = sp;return ($$0|0);
 } else {
  $45 = (___errno_location()|0);
  HEAP32[$45>>2] = 84;
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 return 0|0;
}
function ___towrite($f) {
 $f = $f|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($f) + 74|0);
 $1 = HEAP8[$0>>0]|0;
 $2 = $1 << 24 >> 24;
 $3 = (($2) + 255)|0;
 $4 = $3 | $2;
 $5 = $4&255;
 HEAP8[$0>>0] = $5;
 $6 = HEAP32[$f>>2]|0;
 $7 = $6 & 8;
 $8 = ($7|0)==(0);
 if ($8) {
  $10 = (($f) + 8|0);
  HEAP32[$10>>2] = 0;
  $11 = (($f) + 4|0);
  HEAP32[$11>>2] = 0;
  $12 = (($f) + 44|0);
  $13 = HEAP32[$12>>2]|0;
  $14 = (($f) + 28|0);
  HEAP32[$14>>2] = $13;
  $15 = (($f) + 20|0);
  HEAP32[$15>>2] = $13;
  $16 = (($f) + 48|0);
  $17 = HEAP32[$16>>2]|0;
  $18 = (($13) + ($17)|0);
  $19 = (($f) + 16|0);
  HEAP32[$19>>2] = $18;
  $$0 = 0;
  STACKTOP = sp;return ($$0|0);
 } else {
  $9 = $6 | 32;
  HEAP32[$f>>2] = $9;
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 return 0|0;
}
function ___fwritex($s,$l,$f) {
 $s = $s|0;
 $l = $l|0;
 $f = $f|0;
 var $$0 = 0, $$01 = 0, $$02 = 0, $$pre = 0, $$pre6 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0;
 var $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $i$0 = 0, $i$1 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($f) + 16|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==(0|0);
 do {
  if ($2) {
   $3 = (___towrite($f)|0);
   $4 = ($3|0)==(0);
   if ($4) {
    $$pre6 = HEAP32[$0>>2]|0;
    $7 = $$pre6;
    break;
   } else {
    $$0 = 0;
    STACKTOP = sp;return ($$0|0);
   }
  } else {
   $7 = $1;
  }
 } while(0);
 $5 = (($f) + 20|0);
 $6 = HEAP32[$5>>2]|0;
 $8 = $7;
 $9 = $6;
 $10 = (($8) - ($9))|0;
 $11 = ($10>>>0)<($l>>>0);
 if ($11) {
  $12 = (($f) + 36|0);
  $13 = HEAP32[$12>>2]|0;
  $14 = (FUNCTION_TABLE_iiii[$13 & 1]($f,$s,$l)|0);
  $$0 = $14;
  STACKTOP = sp;return ($$0|0);
 }
 $15 = (($f) + 75|0);
 $16 = HEAP8[$15>>0]|0;
 $17 = ($16<<24>>24)>(-1);
 L11: do {
  if ($17) {
   $i$0 = $l;
   while(1) {
    $18 = ($i$0|0)==(0);
    if ($18) {
     $$01 = $l;$$02 = $s;$29 = $6;$i$1 = 0;
     break L11;
    }
    $19 = (($i$0) + -1)|0;
    $20 = (($s) + ($19)|0);
    $21 = HEAP8[$20>>0]|0;
    $22 = ($21<<24>>24)==(10);
    if ($22) {
     break;
    } else {
     $i$0 = $19;
    }
   }
   $23 = (($f) + 36|0);
   $24 = HEAP32[$23>>2]|0;
   $25 = (FUNCTION_TABLE_iiii[$24 & 1]($f,$s,$i$0)|0);
   $26 = ($25>>>0)<($i$0>>>0);
   if ($26) {
    $$0 = $i$0;
    STACKTOP = sp;return ($$0|0);
   } else {
    $27 = (($s) + ($i$0)|0);
    $28 = (($l) - ($i$0))|0;
    $$pre = HEAP32[$5>>2]|0;
    $$01 = $28;$$02 = $27;$29 = $$pre;$i$1 = $i$0;
    break;
   }
  } else {
   $$01 = $l;$$02 = $s;$29 = $6;$i$1 = 0;
  }
 } while(0);
 _memcpy(($29|0),($$02|0),($$01|0))|0;
 $30 = HEAP32[$5>>2]|0;
 $31 = (($30) + ($$01)|0);
 HEAP32[$5>>2] = $31;
 $32 = (($i$1) + ($$01))|0;
 $$0 = $32;
 STACKTOP = sp;return ($$0|0);
}
function _sprintf($s,$fmt,$varargs) {
 $s = $s|0;
 $fmt = $fmt|0;
 $varargs = $varargs|0;
 var $0 = 0, $ap = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $ap = sp;
 HEAP32[$ap>>2] = $varargs;
 $0 = (_vsprintf($s,$fmt,$ap)|0);
 STACKTOP = sp;return ($0|0);
}
function _MUSL_vfprintf($f,$fmt,$ap) {
 $f = $f|0;
 $fmt = $fmt|0;
 $ap = $ap|0;
 var $$ = 0, $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var $ap2 = 0, $internal_buf = 0, $nl_arg = 0, $nl_type = 0, $ret$1 = 0, $vacopy_currentptr = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 224|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $ap2 = sp + 120|0;
 $nl_type = sp + 80|0;
 $nl_arg = sp;
 $internal_buf = sp + 136|0;
 dest=$nl_type+0|0; stop=dest+40|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 $vacopy_currentptr = HEAP32[$ap>>2]|0;
 HEAP32[$ap2>>2] = $vacopy_currentptr;
 $0 = (_printf_core(0,$fmt,$ap2,$nl_arg,$nl_type)|0);
 $1 = ($0|0)<(0);
 if ($1) {
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 $2 = (($f) + 48|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ($3|0)==(0);
 if ($4) {
  $6 = (($f) + 44|0);
  $7 = HEAP32[$6>>2]|0;
  HEAP32[$6>>2] = $internal_buf;
  $8 = (($f) + 28|0);
  HEAP32[$8>>2] = $internal_buf;
  $9 = (($f) + 20|0);
  HEAP32[$9>>2] = $internal_buf;
  HEAP32[$2>>2] = 80;
  $10 = (($internal_buf) + 80|0);
  $11 = (($f) + 16|0);
  HEAP32[$11>>2] = $10;
  $12 = (_printf_core($f,$fmt,$ap2,$nl_arg,$nl_type)|0);
  $13 = ($7|0)==(0|0);
  if ($13) {
   $ret$1 = $12;
  } else {
   $14 = (($f) + 36|0);
   $15 = HEAP32[$14>>2]|0;
   (FUNCTION_TABLE_iiii[$15 & 1]($f,0,0)|0);
   $16 = HEAP32[$9>>2]|0;
   $17 = ($16|0)==(0|0);
   $$ = $17 ? -1 : $12;
   HEAP32[$6>>2] = $7;
   HEAP32[$2>>2] = 0;
   HEAP32[$11>>2] = 0;
   HEAP32[$8>>2] = 0;
   HEAP32[$9>>2] = 0;
   $ret$1 = $$;
  }
 } else {
  $5 = (_printf_core($f,$fmt,$ap2,$nl_arg,$nl_type)|0);
  $ret$1 = $5;
 }
 $$0 = $ret$1;
 STACKTOP = sp;return ($$0|0);
}
function _printf_core($f,$fmt,$ap,$nl_arg,$nl_type) {
 $f = $f|0;
 $fmt = $fmt|0;
 $ap = $ap|0;
 $nl_arg = $nl_arg|0;
 $nl_type = $nl_type|0;
 var $$ = 0, $$$5$i = 0, $$$i = 0, $$$p$i = 0, $$0 = 0, $$0$lcssa$i = 0, $$0$lcssa$i$i = 0, $$0$lcssa$i103$i = 0, $$0$lcssa$i127$i = 0, $$0$lcssa$i142$i = 0, $$0$lcssa$i37 = 0, $$0$lcssa$i38$i = 0, $$0$lcssa$i43 = 0, $$0$lcssa$i45 = 0, $$0$lcssa$i45$i = 0, $$0$lcssa$i48$i = 0, $$0$lcssa$i52 = 0, $$0$lcssa$i55$i = 0, $$0$lcssa$i59 = 0, $$0$lcssa$i62$i = 0;
 var $$0$lcssa$i66 = 0, $$0$lcssa$i68$i = 0, $$0$lcssa$i75$i = 0, $$0$lcssa$i76 = 0, $$0$lcssa$i84$i = 0, $$0$lcssa$i96$i = 0, $$01$i = 0, $$01$i$i = 0, $$01$i101$i = 0, $$01$i125$i = 0, $$01$i140$i = 0, $$01$i35 = 0, $$01$i36$i = 0, $$01$i43$i = 0, $$01$i50 = 0, $$01$i53$i = 0, $$01$i57 = 0, $$01$i60$i = 0, $$01$i64 = 0, $$01$i66$i = 0;
 var $$01$i73$i = 0, $$01$i74 = 0, $$01$i94$i = 0, $$01$lcssa$off0$i = 0, $$01$lcssa$off0$i$i = 0, $$01$lcssa$off0$i85$i = 0, $$012$i = 0, $$013$i = 0, $$03$i40 = 0, $$05$i = 0, $$05$i$i = 0, $$05$i79$i = 0, $$07$i = 0.0, $$1$i = 0.0, $$1$lcssa$i$i = 0, $$1$lcssa$i112$i = 0, $$114$i = 0, $$12$i = 0, $$12$i$i = 0, $$12$i110$i = 0;
 var $$12$i119$i = 0, $$12$i134$i = 0, $$12$i87$i = 0, $$13 = 0, $$14 = 0, $$15 = 0, $$17 = 0, $$2$i = 0.0, $$2$us$i = 0.0, $$2$us$us$i = 0.0, $$2$us159$i = 0.0, $$20$i = 0, $$20$us$i = 0, $$21$i = 0, $$210$$23$i = 0, $$210$$25$i = 0, $$210$i = 0, $$22$i = 0.0, $$23$i = 0, $$25$i = 0;
 var $$3$i = 0.0, $$31$i = 0, $$311$i = 0, $$4$i = 0.0, $$412$lcssa$i = 0, $$412175$i = 0, $$5193$i = 0, $$a$3$i = 0, $$a$3$us$i = 0, $$a$3$us322$i = 0, $$a$3$us323$i = 0, $$a$3324$i = 0, $$a$3325$i = 0, $$fl$4 = 0, $$lcssa300$i = 0, $$lcssa92 = 0, $$mask$i = 0, $$mask$i30 = 0, $$mask1$i = 0, $$mask1$i29 = 0;
 var $$neg151$i = 0, $$neg152$i = 0, $$not$i = 0, $$p$5 = 0, $$p$i = 0, $$pn$i = 0, $$pr$i = 0, $$pr146$i = 0, $$pre = 0, $$pre$i = 0, $$pre290 = 0, $$pre292 = 0, $$pre319$i = 0, $$sum$i = 0, $$sum15$i = 0, $$sum16$i = 0, $$z$3$i = 0, $$z$4$us$i = 0, $0 = 0, $1 = 0;
 var $10 = 0, $100 = 0, $1000 = 0, $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0, $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0, $1016 = 0;
 var $1017 = 0, $1018 = 0, $1019 = 0, $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0, $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0, $1034 = 0;
 var $1035 = 0, $1036 = 0.0, $1037 = 0.0, $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1045$phi = 0, $1046 = 0, $1046$phi = 0, $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0;
 var $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0, $1056 = 0, $1057 = 0, $1058 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0;
 var $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0;
 var $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0;
 var $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0;
 var $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0;
 var $19 = 0, $190 = 0.0, $191 = 0, $192 = 0, $193 = 0, $194 = 0.0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0;
 var $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0;
 var $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0;
 var $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0;
 var $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0;
 var $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0;
 var $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0;
 var $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0;
 var $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0;
 var $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0.0;
 var $37 = 0, $370 = 0, $371 = 0.0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0;
 var $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0;
 var $405 = 0, $406 = 0, $407 = 0.0, $408 = 0.0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0.0;
 var $423 = 0, $424 = 0, $425 = 0, $426 = 0.0, $427 = 0.0, $428 = 0.0, $429 = 0.0, $43 = 0, $430 = 0.0, $431 = 0.0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0;
 var $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0;
 var $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0;
 var $478 = 0, $479 = 0, $48 = 0, $480 = 0.0, $481 = 0.0, $482 = 0.0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0.0;
 var $496 = 0.0, $497 = 0.0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0.0, $511 = 0.0, $512 = 0.0;
 var $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0.0, $526 = 0.0, $527 = 0.0, $528 = 0, $529 = 0, $53 = 0, $530 = 0;
 var $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0;
 var $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0;
 var $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0.0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0.0;
 var $586 = 0.0, $587 = 0.0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0;
 var $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0;
 var $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0;
 var $64 = 0, $640 = 0, $641 = 0, $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0;
 var $658 = 0, $659 = 0, $66 = 0, $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0;
 var $676 = 0, $677 = 0, $678 = 0, $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0;
 var $694 = 0, $695 = 0, $696 = 0, $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0;
 var $711 = 0, $712 = 0, $713 = 0, $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0.0, $726 = 0.0, $727 = 0, $728 = 0.0, $729 = 0;
 var $73 = 0, $730 = 0, $731 = 0, $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0;
 var $748 = 0, $749 = 0, $75 = 0, $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0;
 var $766 = 0, $767 = 0, $768 = 0, $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0;
 var $784 = 0, $785 = 0, $786 = 0, $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0;
 var $801 = 0, $802 = 0, $803 = 0, $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0;
 var $82 = 0, $820 = 0, $821 = 0, $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0;
 var $838 = 0, $839 = 0, $84 = 0, $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0;
 var $856 = 0, $857 = 0, $858 = 0, $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0;
 var $874 = 0, $875 = 0, $876 = 0, $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0;
 var $892 = 0, $893 = 0, $894 = 0, $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0;
 var $91 = 0, $910 = 0, $911 = 0, $912 = 0, $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0;
 var $928 = 0, $929 = 0, $93 = 0, $930 = 0, $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0;
 var $946 = 0, $947 = 0, $948 = 0, $949 = 0, $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0;
 var $964 = 0, $965 = 0, $966 = 0, $967 = 0, $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0;
 var $982 = 0, $983 = 0, $984 = 0, $985 = 0, $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $a$0 = 0;
 var $a$1 = 0, $a$1$lcssa$i = 0, $a$1263$i = 0, $a$2 = 0, $a$2$ph$i = 0, $a$3$lcssa$i = 0, $a$3249$i = 0, $a$3249$us$i = 0, $a$5$lcssa$i = 0, $a$5223$i = 0, $a$6$i = 0, $a$7$i = 0, $a$8$ph$i = 0, $arglist_current = 0, $arglist_current11 = 0, $arglist_current14 = 0, $arglist_current17 = 0, $arglist_current2 = 0, $arglist_current20 = 0, $arglist_current23 = 0;
 var $arglist_current26 = 0, $arglist_current29 = 0, $arglist_current32 = 0, $arglist_current35 = 0, $arglist_current38 = 0, $arglist_current41 = 0, $arglist_current44 = 0, $arglist_current47 = 0, $arglist_current5 = 0, $arglist_current50 = 0, $arglist_current53 = 0, $arglist_current56 = 0, $arglist_current59 = 0, $arglist_current62 = 0, $arglist_current8 = 0, $arglist_next = 0, $arglist_next12 = 0, $arglist_next15 = 0, $arglist_next18 = 0, $arglist_next21 = 0;
 var $arglist_next24 = 0, $arglist_next27 = 0, $arglist_next3 = 0, $arglist_next30 = 0, $arglist_next33 = 0, $arglist_next36 = 0, $arglist_next39 = 0, $arglist_next42 = 0, $arglist_next45 = 0, $arglist_next48 = 0, $arglist_next51 = 0, $arglist_next54 = 0, $arglist_next57 = 0, $arglist_next6 = 0, $arglist_next60 = 0, $arglist_next63 = 0, $arglist_next9 = 0, $argpos$0 = 0, $big$i = 0, $brmerge$i = 0;
 var $buf = 0, $buf$i = 0, $carry$0255$i = 0, $carry3$0243$i = 0, $carry3$0243$us$i = 0, $cnt$0 = 0, $cnt$1 = 0, $d$0$i = 0, $d$0254$i = 0, $d$0256$i = 0, $d$1242$i = 0, $d$1242$us$i = 0, $d$2$lcssa$i = 0, $d$2222$i = 0, $d$3$i = 0, $d$4183$i = 0, $d$5174$i = 0, $d$6192$i = 0, $e$0238$i = 0, $e$1$i = 0;
 var $e$2218$i = 0, $e$3$i = 0, $e$4$ph$i = 0, $e2$i = 0, $ebuf0$i = 0, $estr$0$i = 0, $estr$1$lcssa$i = 0, $estr$1$ph$i = 0, $estr$1200$i = 0, $estr$2$i = 0, $exitcond$i = 0, $fl$0100 = 0, $fl$0104 = 0, $fl$1 = 0, $fl$1$ = 0, $fl$3 = 0, $fl$4 = 0, $fl$6 = 0, $i$0$lcssa = 0, $i$0166 = 0;
 var $i$0168 = 0, $i$0237$i = 0, $i$03$i = 0, $i$03$i22 = 0, $i$1$lcssa$i = 0, $i$1174 = 0, $i$1230$i = 0, $i$2217$i = 0, $i$289 = 0, $i$3209$i = 0, $i$388 = 0, $isdigit = 0, $isdigit$i = 0, $isdigit$i24 = 0, $isdigit11 = 0, $isdigit2$i = 0, $isdigit2$i21 = 0, $isdigit9 = 0, $isdigittmp = 0, $isdigittmp$i = 0;
 var $isdigittmp$i23 = 0, $isdigittmp1$i = 0, $isdigittmp1$i20 = 0, $isdigittmp10 = 0, $isdigittmp8 = 0, $j$0$i = 0, $j$0229$i = 0, $j$0231$i = 0, $j$1210$i = 0, $j$2$i = 0, $l$0 = 0, $l$0$i = 0, $l$1$i = 0, $l$1$lcssa = 0, $l$1167 = 0, $l10n$0 = 0, $l10n$0$phi = 0, $l10n$1 = 0, $l10n$2 = 0, $l10n$3 = 0;
 var $mb = 0, $or$cond = 0, $or$cond$i = 0, $or$cond$i$i = 0, $or$cond$i100$i = 0, $or$cond$i35$i = 0, $or$cond$i42$i = 0, $or$cond$i49 = 0, $or$cond$i52$i = 0, $or$cond$i56 = 0, $or$cond$i59$i = 0, $or$cond$i63 = 0, $or$cond$i71 = 0, $or$cond$i72$i = 0, $or$cond$i73 = 0, $or$cond$i93$i = 0, $or$cond28$i = 0, $or$cond28173$i = 0, $or$cond29$i = 0, $or$cond4$i = 0;
 var $p$0 = 0, $p$1 = 0, $p$2 = 0, $p$2$ = 0, $p$4296 = 0, $p$5 = 0, $pad$i = 0, $pl$0 = 0, $pl$0$i = 0, $pl$1 = 0, $pl$1$i = 0, $pl$2 = 0, $prefix$0 = 0, $prefix$0$$i = 0, $prefix$0$i = 0, $prefix$1 = 0, $prefix$2 = 0, $r$0$a$8$i = 0, $re$0$i = 0, $re$1165$i = 0;
 var $round$0164$i = 0.0, $round6$1$i = 0.0, $s$0$i = 0, $s$0$us$i = 0, $s$0$us$us$i = 0, $s$0$us158$i = 0, $s$1$i = 0, $s$1$lcssa$i = 0, $s$1$us$i = 0, $s$1$us$us$i = 0, $s$1$us160$i = 0, $s1$0$i = 0, $s7$0180$i = 0, $s7$1$i = 0, $s8$0$lcssa$i = 0, $s8$0169$i = 0, $s9$0$i = 0, $s9$1188$i = 0, $s9$2$i = 0, $sext = 0;
 var $sext84 = 0, $small$0$i = 0.0, $small$1$i = 0.0, $st$0 = 0, $storemerge = 0, $storemerge12 = 0, $storemerge7103 = 0, $storemerge798 = 0, $t$0 = 0, $t$1 = 0, $w$$i = 0, $w$0 = 0, $w$1 = 0, $w$18$i = 0, $w$2 = 0, $w$30$i = 0, $wc = 0, $ws$0169 = 0, $ws$1175 = 0, $y$03$i = 0;
 var $y$03$i$i = 0, $y$03$i109$i = 0, $y$03$i118$i = 0, $y$03$i133$i = 0, $y$03$i86$i = 0, $z$0$i = 0, $z$0$lcssa = 0, $z$093 = 0, $z$1$lcssa$i = 0, $z$1262$i = 0, $z$2 = 0, $z$2$i = 0, $z$3$lcssa$i = 0, $z$3248$i = 0, $z$3248$us$i = 0, $z$4$i = 0, $z$4$us$i = 0, $z$5$i = 0, $z$6$$i = 0, $z$6$i = 0;
 var $z$6$ph$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 864|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $big$i = sp + 16|0;
 $e2$i = sp + 8|0;
 $buf$i = sp + 836|0;
 $0 = $buf$i;
 $ebuf0$i = sp + 824|0;
 $pad$i = sp + 568|0;
 $buf = sp + 528|0;
 $wc = sp;
 $mb = sp + 520|0;
 $1 = ($f|0)!=(0|0);
 $2 = (($buf) + 40|0);
 $3 = $2;
 $4 = (($buf) + 39|0);
 $5 = (($wc) + 4|0);
 $6 = (($ebuf0$i) + 12|0);
 $7 = (($ebuf0$i) + 11|0);
 $8 = $6;
 $9 = (($8) - ($0))|0;
 $10 = (-2 - ($0))|0;
 $11 = (($8) + 2)|0;
 $12 = (($big$i) + 288|0);
 $13 = (($buf$i) + 9|0);
 $14 = $13;
 $15 = (($buf$i) + 8|0);
 $1045 = 0;$1046 = 0;$22 = $fmt;$cnt$0 = 0;$l$0 = 0;$l10n$0 = 0;
 L1: while(1) {
  $16 = ($cnt$0|0)>(-1);
  do {
   if ($16) {
    $17 = (2147483647 - ($cnt$0))|0;
    $18 = ($l$0|0)>($17|0);
    if ($18) {
     $19 = (___errno_location()|0);
     HEAP32[$19>>2] = 75;
     $cnt$1 = -1;
     break;
    } else {
     $20 = (($l$0) + ($cnt$0))|0;
     $cnt$1 = $20;
     break;
    }
   } else {
    $cnt$1 = $cnt$0;
   }
  } while(0);
  $21 = HEAP8[$22>>0]|0;
  $23 = ($21<<24>>24)==(0);
  if ($23) {
   label = 344;
   break;
  } else {
   $1047 = $21;$25 = $22;
  }
  while(1) {
   if ((($1047<<24>>24) == 0)) {
    $$lcssa92 = $25;$z$0$lcssa = $25;
    break;
   } else if ((($1047<<24>>24) == 37)) {
    $27 = $25;$z$093 = $25;
    label = 9;
    break;
   }
   $24 = (($25) + 1|0);
   $$pre = HEAP8[$24>>0]|0;
   $1047 = $$pre;$25 = $24;
  }
  L12: do {
   if ((label|0) == 9) {
    while(1) {
     label = 0;
     $26 = (($27) + 1|0);
     $28 = HEAP8[$26>>0]|0;
     $29 = ($28<<24>>24)==(37);
     if (!($29)) {
      $$lcssa92 = $27;$z$0$lcssa = $z$093;
      break L12;
     }
     $30 = (($z$093) + 1|0);
     $31 = (($27) + 2|0);
     $32 = HEAP8[$31>>0]|0;
     $33 = ($32<<24>>24)==(37);
     if ($33) {
      $27 = $31;$z$093 = $30;
      label = 9;
     } else {
      $$lcssa92 = $31;$z$0$lcssa = $30;
      break;
     }
    }
   }
  } while(0);
  $34 = $z$0$lcssa;
  $35 = $22;
  $36 = (($34) - ($35))|0;
  if ($1) {
   (___fwritex($22,$36,$f)|0);
  }
  $37 = ($z$0$lcssa|0)==($22|0);
  if (!($37)) {
   $l10n$0$phi = $l10n$0;$1046$phi = $1046;$1045$phi = $1045;$22 = $$lcssa92;$cnt$0 = $cnt$1;$l$0 = $36;$l10n$0 = $l10n$0$phi;$1046 = $1046$phi;$1045 = $1045$phi;
   continue;
  }
  $38 = (($$lcssa92) + 1|0);
  $39 = HEAP8[$38>>0]|0;
  $40 = $39 << 24 >> 24;
  $isdigittmp = (($40) + -48)|0;
  $isdigit = ($isdigittmp>>>0)<(10);
  if ($isdigit) {
   $41 = (($$lcssa92) + 2|0);
   $42 = HEAP8[$41>>0]|0;
   $43 = ($42<<24>>24)==(36);
   if ($43) {
    $44 = (($$lcssa92) + 3|0);
    $$pre290 = HEAP8[$44>>0]|0;
    $46 = $$pre290;$argpos$0 = $isdigittmp;$l10n$1 = 1;$storemerge = $44;
   } else {
    $46 = $39;$argpos$0 = -1;$l10n$1 = $l10n$0;$storemerge = $38;
   }
  } else {
   $46 = $39;$argpos$0 = -1;$l10n$1 = $l10n$0;$storemerge = $38;
  }
  $45 = $46 << 24 >> 24;
  $47 = (($45) + -32)|0;
  $48 = ($47>>>0)<(32);
  L25: do {
   if ($48) {
    $50 = $45;$55 = $46;$fl$0104 = 0;$storemerge7103 = $storemerge;
    while(1) {
     $49 = (($50) + -32)|0;
     $51 = 1 << $49;
     $52 = $51 & 75913;
     $53 = ($52|0)==(0);
     if ($53) {
      $64 = $55;$fl$0100 = $fl$0104;$storemerge798 = $storemerge7103;
      break L25;
     }
     $54 = $55 << 24 >> 24;
     $56 = (($54) + -32)|0;
     $57 = 1 << $56;
     $58 = $57 | $fl$0104;
     $59 = (($storemerge7103) + 1|0);
     $60 = HEAP8[$59>>0]|0;
     $61 = $60 << 24 >> 24;
     $62 = (($61) + -32)|0;
     $63 = ($62>>>0)<(32);
     if ($63) {
      $50 = $61;$55 = $60;$fl$0104 = $58;$storemerge7103 = $59;
     } else {
      $64 = $60;$fl$0100 = $58;$storemerge798 = $59;
      break;
     }
    }
   } else {
    $64 = $46;$fl$0100 = 0;$storemerge798 = $storemerge;
   }
  } while(0);
  $65 = ($64<<24>>24)==(42);
  do {
   if ($65) {
    $66 = (($storemerge798) + 1|0);
    $67 = HEAP8[$66>>0]|0;
    $68 = $67 << 24 >> 24;
    $isdigittmp10 = (($68) + -48)|0;
    $isdigit11 = ($isdigittmp10>>>0)<(10);
    if ($isdigit11) {
     $69 = (($storemerge798) + 2|0);
     $70 = HEAP8[$69>>0]|0;
     $71 = ($70<<24>>24)==(36);
     if ($71) {
      $72 = (($nl_type) + ($isdigittmp10<<2)|0);
      HEAP32[$72>>2] = 10;
      $73 = HEAP8[$66>>0]|0;
      $74 = $73 << 24 >> 24;
      $75 = (($74) + -48)|0;
      $76 = (($nl_arg) + ($75<<3)|0);
      $77 = $76;
      $78 = $77;
      $79 = HEAP32[$78>>2]|0;
      $80 = (($77) + 4)|0;
      $81 = $80;
      $82 = HEAP32[$81>>2]|0;
      $83 = (($storemerge798) + 3|0);
      $l10n$2 = 1;$storemerge12 = $83;$w$0 = $79;
     } else {
      label = 24;
     }
    } else {
     label = 24;
    }
    if ((label|0) == 24) {
     label = 0;
     $84 = ($l10n$1|0)==(0);
     if (!($84)) {
      $$0 = -1;
      label = 362;
      break L1;
     }
     if (!($1)) {
      $100 = $66;$fl$1 = $fl$0100;$l10n$3 = 0;$w$1 = 0;
      break;
     }
     $arglist_current = HEAP32[$ap>>2]|0;
     $85 = HEAP32[$arglist_current>>2]|0;
     $arglist_next = (($arglist_current) + 4|0);
     HEAP32[$ap>>2] = $arglist_next;
     $l10n$2 = 0;$storemerge12 = $66;$w$0 = $85;
    }
    $86 = ($w$0|0)<(0);
    if ($86) {
     $87 = $fl$0100 | 8192;
     $88 = (0 - ($w$0))|0;
     $100 = $storemerge12;$fl$1 = $87;$l10n$3 = $l10n$2;$w$1 = $88;
    } else {
     $100 = $storemerge12;$fl$1 = $fl$0100;$l10n$3 = $l10n$2;$w$1 = $w$0;
    }
   } else {
    $89 = $64 << 24 >> 24;
    $isdigittmp1$i = (($89) + -48)|0;
    $isdigit2$i = ($isdigittmp1$i>>>0)<(10);
    if ($isdigit2$i) {
     $92 = $89;$95 = $storemerge798;$i$03$i = 0;
     while(1) {
      $90 = ($i$03$i*10)|0;
      $91 = (($92) + -48)|0;
      $93 = (($91) + ($90))|0;
      $94 = (($95) + 1|0);
      $96 = HEAP8[$94>>0]|0;
      $97 = $96 << 24 >> 24;
      $isdigittmp$i = (($97) + -48)|0;
      $isdigit$i = ($isdigittmp$i>>>0)<(10);
      if ($isdigit$i) {
       $92 = $97;$95 = $94;$i$03$i = $93;
      } else {
       break;
      }
     }
     $98 = ($93|0)<(0);
     if ($98) {
      $$0 = -1;
      label = 362;
      break L1;
     } else {
      $100 = $94;$fl$1 = $fl$0100;$l10n$3 = $l10n$1;$w$1 = $93;
     }
    } else {
     $100 = $storemerge798;$fl$1 = $fl$0100;$l10n$3 = $l10n$1;$w$1 = 0;
    }
   }
  } while(0);
  $99 = HEAP8[$100>>0]|0;
  $101 = ($99<<24>>24)==(46);
  L46: do {
   if ($101) {
    $102 = (($100) + 1|0);
    $103 = HEAP8[$102>>0]|0;
    $104 = ($103<<24>>24)==(42);
    if (!($104)) {
     $125 = $103 << 24 >> 24;
     $isdigittmp1$i20 = (($125) + -48)|0;
     $isdigit2$i21 = ($isdigittmp1$i20>>>0)<(10);
     if ($isdigit2$i21) {
      $128 = $125;$131 = $102;$i$03$i22 = 0;
     } else {
      $1048 = $102;$p$0 = 0;
      break;
     }
     while(1) {
      $126 = ($i$03$i22*10)|0;
      $127 = (($128) + -48)|0;
      $129 = (($127) + ($126))|0;
      $130 = (($131) + 1|0);
      $132 = HEAP8[$130>>0]|0;
      $133 = $132 << 24 >> 24;
      $isdigittmp$i23 = (($133) + -48)|0;
      $isdigit$i24 = ($isdigittmp$i23>>>0)<(10);
      if ($isdigit$i24) {
       $128 = $133;$131 = $130;$i$03$i22 = $129;
      } else {
       $1048 = $130;$p$0 = $129;
       break L46;
      }
     }
    }
    $105 = (($100) + 2|0);
    $106 = HEAP8[$105>>0]|0;
    $107 = $106 << 24 >> 24;
    $isdigittmp8 = (($107) + -48)|0;
    $isdigit9 = ($isdigittmp8>>>0)<(10);
    if ($isdigit9) {
     $108 = (($100) + 3|0);
     $109 = HEAP8[$108>>0]|0;
     $110 = ($109<<24>>24)==(36);
     if ($110) {
      $111 = (($nl_type) + ($isdigittmp8<<2)|0);
      HEAP32[$111>>2] = 10;
      $112 = HEAP8[$105>>0]|0;
      $113 = $112 << 24 >> 24;
      $114 = (($113) + -48)|0;
      $115 = (($nl_arg) + ($114<<3)|0);
      $116 = $115;
      $117 = $116;
      $118 = HEAP32[$117>>2]|0;
      $119 = (($116) + 4)|0;
      $120 = $119;
      $121 = HEAP32[$120>>2]|0;
      $122 = (($100) + 4|0);
      $1048 = $122;$p$0 = $118;
      break;
     }
    }
    $123 = ($l10n$3|0)==(0);
    if (!($123)) {
     $$0 = -1;
     label = 362;
     break L1;
    }
    if ($1) {
     $arglist_current2 = HEAP32[$ap>>2]|0;
     $124 = HEAP32[$arglist_current2>>2]|0;
     $arglist_next3 = (($arglist_current2) + 4|0);
     HEAP32[$ap>>2] = $arglist_next3;
     $1048 = $105;$p$0 = $124;
    } else {
     $1048 = $105;$p$0 = 0;
    }
   } else {
    $1048 = $100;$p$0 = -1;
   }
  } while(0);
  $135 = $1048;$st$0 = 0;
  while(1) {
   $134 = HEAP8[$135>>0]|0;
   $136 = $134 << 24 >> 24;
   $137 = (($136) + -65)|0;
   $138 = ($137>>>0)>(57);
   if ($138) {
    $$0 = -1;
    label = 362;
    break L1;
   }
   $139 = (($135) + 1|0);
   $140 = ((9008 + (($st$0*58)|0)|0) + ($137)|0);
   $141 = HEAP8[$140>>0]|0;
   $142 = $141&255;
   $143 = (($142) + -1)|0;
   $144 = ($143>>>0)<(8);
   if ($144) {
    $135 = $139;$st$0 = $142;
   } else {
    break;
   }
  }
  $145 = ($141<<24>>24)==(0);
  if ($145) {
   $$0 = -1;
   label = 362;
   break;
  }
  $146 = ($141<<24>>24)==(19);
  $147 = ($argpos$0|0)>(-1);
  L65: do {
   if ($146) {
    if ($147) {
     $$0 = -1;
     label = 362;
     break L1;
    } else {
     $1049 = $1045;$1050 = $1046;
     label = 63;
    }
   } else {
    if ($147) {
     $148 = (($nl_type) + ($argpos$0<<2)|0);
     HEAP32[$148>>2] = $142;
     $149 = (($nl_arg) + ($argpos$0<<3)|0);
     $150 = $149;
     $151 = $150;
     $152 = HEAP32[$151>>2]|0;
     $153 = (($150) + 4)|0;
     $154 = $153;
     $155 = HEAP32[$154>>2]|0;
     $156 = $152;
     $1049 = $155;$1050 = $156;
     label = 63;
     break;
    }
    if (!($1)) {
     $$0 = 0;
     label = 362;
     break L1;
    }
    $157 = ($141&255)>(20);
    if ($157) {
     $199 = $134;$207 = $1046;$228 = $1045;
    } else {
     do {
      switch ($142|0) {
      case 16:  {
       $arglist_current26 = HEAP32[$ap>>2]|0;
       $188 = HEAP32[$arglist_current26>>2]|0;
       $arglist_next27 = (($arglist_current26) + 4|0);
       HEAP32[$ap>>2] = $arglist_next27;
       $$mask$i30 = $188 & 255;
       $189 = $$mask$i30;
       $1051 = $189;$1052 = 0;
       label = 64;
       break L65;
       break;
      }
      case 18:  {
       $arglist_current32 = HEAP32[$ap>>2]|0;
       HEAP32[tempDoublePtr>>2]=HEAP32[$arglist_current32>>2];HEAP32[tempDoublePtr+4>>2]=HEAP32[$arglist_current32+4>>2];$194 = +HEAPF64[tempDoublePtr>>3];
       $arglist_next33 = (($arglist_current32) + 8|0);
       HEAP32[$ap>>2] = $arglist_next33;
       HEAPF64[tempDoublePtr>>3] = $194;$195 = HEAP32[tempDoublePtr>>2]|0;
       $196 = HEAP32[tempDoublePtr+4>>2]|0;
       $197 = $195;
       $1049 = $196;$1050 = $197;
       label = 63;
       break L65;
       break;
      }
      case 13:  {
       $arglist_current17 = HEAP32[$ap>>2]|0;
       $172 = HEAP32[$arglist_current17>>2]|0;
       $arglist_next18 = (($arglist_current17) + 4|0);
       HEAP32[$ap>>2] = $arglist_next18;
       $173 = $172&65535;
       $174 = $173 << 16 >> 16;
       $175 = ($174|0)<(0);
       $176 = $175 << 31 >> 31;
       $sext84 = $172 << 16;
       $177 = $sext84 >> 16;
       $178 = $177;
       $1051 = $178;$1052 = $176;
       label = 64;
       break L65;
       break;
      }
      case 17:  {
       $arglist_current29 = HEAP32[$ap>>2]|0;
       HEAP32[tempDoublePtr>>2]=HEAP32[$arglist_current29>>2];HEAP32[tempDoublePtr+4>>2]=HEAP32[$arglist_current29+4>>2];$190 = +HEAPF64[tempDoublePtr>>3];
       $arglist_next30 = (($arglist_current29) + 8|0);
       HEAP32[$ap>>2] = $arglist_next30;
       HEAPF64[tempDoublePtr>>3] = $190;$191 = HEAP32[tempDoublePtr>>2]|0;
       $192 = HEAP32[tempDoublePtr+4>>2]|0;
       $193 = $191;
       $1051 = $193;$1052 = $192;
       label = 64;
       break L65;
       break;
      }
      case 12:  {
       $arglist_current14 = HEAP32[$ap>>2]|0;
       $165 = $arglist_current14;
       $166 = $165;
       $167 = HEAP32[$166>>2]|0;
       $168 = (($165) + 4)|0;
       $169 = $168;
       $170 = HEAP32[$169>>2]|0;
       $arglist_next15 = (($arglist_current14) + 8|0);
       HEAP32[$ap>>2] = $arglist_next15;
       $171 = $167;
       $1051 = $171;$1052 = $170;
       label = 64;
       break L65;
       break;
      }
      case 10:  {
       $arglist_current8 = HEAP32[$ap>>2]|0;
       $159 = HEAP32[$arglist_current8>>2]|0;
       $arglist_next9 = (($arglist_current8) + 4|0);
       HEAP32[$ap>>2] = $arglist_next9;
       $160 = ($159|0)<(0);
       $161 = $160 << 31 >> 31;
       $162 = $159;
       $1051 = $162;$1052 = $161;
       label = 64;
       break L65;
       break;
      }
      case 9:  {
       $arglist_current5 = HEAP32[$ap>>2]|0;
       $158 = HEAP32[$arglist_current5>>2]|0;
       $arglist_next6 = (($arglist_current5) + 4|0);
       HEAP32[$ap>>2] = $arglist_next6;
       $1051 = $158;$1052 = $1045;
       label = 64;
       break L65;
       break;
      }
      case 14:  {
       $arglist_current20 = HEAP32[$ap>>2]|0;
       $179 = HEAP32[$arglist_current20>>2]|0;
       $arglist_next21 = (($arglist_current20) + 4|0);
       HEAP32[$ap>>2] = $arglist_next21;
       $$mask1$i29 = $179 & 65535;
       $180 = $$mask1$i29;
       $1051 = $180;$1052 = 0;
       label = 64;
       break L65;
       break;
      }
      case 11:  {
       $arglist_current11 = HEAP32[$ap>>2]|0;
       $163 = HEAP32[$arglist_current11>>2]|0;
       $arglist_next12 = (($arglist_current11) + 4|0);
       HEAP32[$ap>>2] = $arglist_next12;
       $164 = $163;
       $1051 = $164;$1052 = 0;
       label = 64;
       break L65;
       break;
      }
      case 15:  {
       $arglist_current23 = HEAP32[$ap>>2]|0;
       $181 = HEAP32[$arglist_current23>>2]|0;
       $arglist_next24 = (($arglist_current23) + 4|0);
       HEAP32[$ap>>2] = $arglist_next24;
       $182 = $181&255;
       $183 = $182 << 24 >> 24;
       $184 = ($183|0)<(0);
       $185 = $184 << 31 >> 31;
       $sext = $181 << 24;
       $186 = $sext >> 24;
       $187 = $186;
       $1051 = $187;$1052 = $185;
       label = 64;
       break L65;
       break;
      }
      default: {
       $1051 = $1046;$1052 = $1045;
       label = 64;
       break L65;
      }
      }
     } while(0);
    }
   }
  } while(0);
  if ((label|0) == 63) {
   label = 0;
   if ($1) {
    $1051 = $1050;$1052 = $1049;
    label = 64;
   } else {
    $1045 = $1049;$1046 = $1050;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $36;$l10n$0 = $l10n$3;
    continue;
   }
  }
  if ((label|0) == 64) {
   label = 0;
   $$pre292 = HEAP8[$135>>0]|0;
   $199 = $$pre292;$207 = $1051;$228 = $1052;
  }
  $198 = $199 << 24 >> 24;
  $200 = ($st$0|0)==(0);
  if ($200) {
   $t$0 = $198;
  } else {
   $201 = $198 & 15;
   $202 = ($201|0)==(3);
   $203 = $198 & -33;
   $$ = $202 ? $203 : $198;
   $t$0 = $$;
  }
  $204 = $fl$1 & 8192;
  $205 = ($204|0)==(0);
  $206 = $fl$1 & -65537;
  $fl$1$ = $205 ? $fl$1 : $206;
  L92: do {
   switch ($t$0|0) {
   case 65: case 71: case 70: case 69: case 97: case 103: case 102: case 101:  {
    $368 = $207;
    HEAP32[tempDoublePtr>>2] = $368;HEAP32[tempDoublePtr+4>>2] = $228;$369 = +HEAPF64[tempDoublePtr>>3];
    HEAP32[$e2$i>>2] = 0;
    $370 = ($228|0)<(0);
    if ($370) {
     $371 = -$369;
     $$07$i = $371;$pl$0$i = 1;$prefix$0$i = 9496;
    } else {
     $372 = $fl$1$ & 2048;
     $373 = ($372|0)==(0);
     if ($373) {
      $374 = $fl$1$ & 1;
      $375 = ($374|0)==(0);
      $$$i = $375 ? ((9496 + 1|0)) : ((9496 + 6|0));
      $$07$i = $369;$pl$0$i = $374;$prefix$0$i = $$$i;
     } else {
      $$07$i = $369;$pl$0$i = 1;$prefix$0$i = ((9496 + 3|0));
     }
    }
    HEAPF64[tempDoublePtr>>3] = $$07$i;$376 = HEAP32[tempDoublePtr>>2]|0;
    $377 = HEAP32[tempDoublePtr+4>>2]|0;
    $378 = $377 & 2146435072;
    $379 = ($378>>>0)<(2146435072);
    $380 = ($378|0)==(2146435072);
    $381 = (0)<(0);
    $382 = $380 & $381;
    $383 = $379 | $382;
    if (!($383)) {
     $384 = $t$0 & 32;
     $385 = ($384|0)!=(0);
     $386 = $385 ? 9520 : 9528;
     $387 = ($$07$i != $$07$i) | (0.0 != 0.0);
     if ($387) {
      $388 = $385 ? 9536 : 9544;
      $pl$1$i = 0;$s1$0$i = $388;
     } else {
      $pl$1$i = $pl$0$i;$s1$0$i = $386;
     }
     $389 = (($pl$1$i) + 3)|0;
     $390 = $fl$1$ & 8192;
     $391 = ($390|0)==(0);
     $392 = ($389|0)<($w$1|0);
     $or$cond$i35$i = $391 & $392;
     if ($or$cond$i35$i) {
      $393 = (($w$1) - ($389))|0;
      $394 = ($393>>>0)>(256);
      $395 = $394 ? 256 : $393;
      _memset(($pad$i|0),32,($395|0))|0;
      $396 = ($393>>>0)>(255);
      if ($396) {
       $$01$i36$i = $393;
       while(1) {
        (___fwritex($pad$i,256,$f)|0);
        $397 = (($$01$i36$i) + -256)|0;
        $398 = ($397>>>0)>(255);
        if ($398) {
         $$01$i36$i = $397;
        } else {
         $$0$lcssa$i38$i = $397;
         break;
        }
       }
      } else {
       $$0$lcssa$i38$i = $393;
      }
      (___fwritex($pad$i,$$0$lcssa$i38$i,$f)|0);
     }
     (___fwritex($prefix$0$i,$pl$1$i,$f)|0);
     (___fwritex($s1$0$i,3,$f)|0);
     $399 = $fl$1$ & 73728;
     $400 = ($399|0)==(8192);
     $or$cond$i42$i = $400 & $392;
     if ($or$cond$i42$i) {
      $401 = (($w$1) - ($389))|0;
      $402 = ($401>>>0)>(256);
      $403 = $402 ? 256 : $401;
      _memset(($pad$i|0),32,($403|0))|0;
      $404 = ($401>>>0)>(255);
      if ($404) {
       $$01$i43$i = $401;
       while(1) {
        (___fwritex($pad$i,256,$f)|0);
        $405 = (($$01$i43$i) + -256)|0;
        $406 = ($405>>>0)>(255);
        if ($406) {
         $$01$i43$i = $405;
        } else {
         $$0$lcssa$i45$i = $405;
         break;
        }
       }
      } else {
       $$0$lcssa$i45$i = $401;
      }
      (___fwritex($pad$i,$$0$lcssa$i45$i,$f)|0);
     }
     $w$$i = $392 ? $w$1 : $389;
     $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $w$$i;$l10n$0 = $l10n$3;
     continue L1;
    }
    $407 = (+_frexpl($$07$i,$e2$i));
    $408 = $407 * 2.0;
    $409 = $408 != 0.0;
    if ($409) {
     $410 = HEAP32[$e2$i>>2]|0;
     $411 = (($410) + -1)|0;
     HEAP32[$e2$i>>2] = $411;
    }
    $412 = $t$0 | 32;
    $413 = ($412|0)==(97);
    if ($413) {
     $414 = $t$0 & 32;
     $415 = ($414|0)==(0);
     $416 = (($prefix$0$i) + 9|0);
     $prefix$0$$i = $415 ? $prefix$0$i : $416;
     $417 = $pl$0$i | 2;
     $418 = ($p$0>>>0)>(11);
     $419 = (12 - ($p$0))|0;
     $re$0$i = $418 ? 0 : $419;
     $420 = ($re$0$i|0)==(0);
     do {
      if ($420) {
       $$1$i = $408;
      } else {
       $re$1165$i = $re$0$i;$round$0164$i = 8.0;
       while(1) {
        $421 = (($re$1165$i) + -1)|0;
        $422 = $round$0164$i * 16.0;
        $423 = ($421|0)==(0);
        if ($423) {
         break;
        } else {
         $re$1165$i = $421;$round$0164$i = $422;
        }
       }
       $424 = HEAP8[$prefix$0$$i>>0]|0;
       $425 = ($424<<24>>24)==(45);
       if ($425) {
        $426 = -$408;
        $427 = $426 - $422;
        $428 = $422 + $427;
        $429 = -$428;
        $$1$i = $429;
        break;
       } else {
        $430 = $408 + $422;
        $431 = $430 - $422;
        $$1$i = $431;
        break;
       }
      }
     } while(0);
     $432 = HEAP32[$e2$i>>2]|0;
     $433 = ($432|0)<(0);
     $434 = (0 - ($432))|0;
     $435 = $433 ? $434 : $432;
     $436 = ($435|0)<(0);
     if ($436) {
      $437 = ($435|0)<(0);
      $438 = $437 << 31 >> 31;
      $$05$i$i = $6;$439 = $435;$440 = $438;
      while(1) {
       $441 = (___uremdi3(($439|0),($440|0),10,0)|0);
       $442 = tempRet0;
       $443 = $441 | 48;
       $444 = $443&255;
       $445 = (($$05$i$i) + -1|0);
       HEAP8[$445>>0] = $444;
       $446 = (___udivdi3(($439|0),($440|0),10,0)|0);
       $447 = tempRet0;
       $448 = ($440>>>0)>(9);
       $449 = ($440|0)==(9);
       $450 = ($439>>>0)>(4294967295);
       $451 = $449 & $450;
       $452 = $448 | $451;
       if ($452) {
        $$05$i$i = $445;$439 = $446;$440 = $447;
       } else {
        break;
       }
      }
      $$0$lcssa$i48$i = $445;$$01$lcssa$off0$i$i = $446;
     } else {
      $$0$lcssa$i48$i = $6;$$01$lcssa$off0$i$i = $435;
     }
     $453 = ($$01$lcssa$off0$i$i|0)==(0);
     if ($453) {
      $$1$lcssa$i$i = $$0$lcssa$i48$i;
     } else {
      $$12$i$i = $$0$lcssa$i48$i;$y$03$i$i = $$01$lcssa$off0$i$i;
      while(1) {
       $454 = (($y$03$i$i>>>0) % 10)&-1;
       $455 = $454 | 48;
       $456 = $455&255;
       $457 = (($$12$i$i) + -1|0);
       HEAP8[$457>>0] = $456;
       $458 = (($y$03$i$i>>>0) / 10)&-1;
       $459 = ($y$03$i$i>>>0)<(10);
       if ($459) {
        $$1$lcssa$i$i = $457;
        break;
       } else {
        $$12$i$i = $457;$y$03$i$i = $458;
       }
      }
     }
     $460 = ($$1$lcssa$i$i|0)==($6|0);
     if ($460) {
      HEAP8[$7>>0] = 48;
      $estr$0$i = $7;
     } else {
      $estr$0$i = $$1$lcssa$i$i;
     }
     $461 = HEAP32[$e2$i>>2]|0;
     $462 = $461 >> 31;
     $463 = $462 & 2;
     $464 = (($463) + 43)|0;
     $465 = $464&255;
     $466 = (($estr$0$i) + -1|0);
     HEAP8[$466>>0] = $465;
     $467 = (($t$0) + 15)|0;
     $468 = $467&255;
     $469 = (($estr$0$i) + -2|0);
     HEAP8[$469>>0] = $468;
     $470 = ($p$0|0)>(0);
     $471 = $fl$1$ & 8;
     $472 = ($471|0)==(0);
     if ($470) {
      if ($472) {
       $$2$us$us$i = $$1$i;$s$0$us$us$i = $buf$i;
       while(1) {
        $473 = (~~(($$2$us$us$i)));
        $474 = (9552 + ($473)|0);
        $475 = HEAP8[$474>>0]|0;
        $476 = $475&255;
        $477 = $476 | $414;
        $478 = $477&255;
        $479 = (($s$0$us$us$i) + 1|0);
        HEAP8[$s$0$us$us$i>>0] = $478;
        $480 = (+($473|0));
        $481 = $$2$us$us$i - $480;
        $482 = $481 * 16.0;
        $483 = $479;
        $484 = (($483) - ($0))|0;
        $485 = ($484|0)==(1);
        if ($485) {
         $486 = (($s$0$us$us$i) + 2|0);
         HEAP8[$479>>0] = 46;
         $s$1$us$us$i = $486;
        } else {
         $s$1$us$us$i = $479;
        }
        $487 = $482 != 0.0;
        if ($487) {
         $$2$us$us$i = $482;$s$0$us$us$i = $s$1$us$us$i;
        } else {
         $s$1$lcssa$i = $s$1$us$us$i;
         break;
        }
       }
      } else {
       $$2$us$i = $$1$i;$s$0$us$i = $buf$i;
       while(1) {
        $488 = (~~(($$2$us$i)));
        $489 = (9552 + ($488)|0);
        $490 = HEAP8[$489>>0]|0;
        $491 = $490&255;
        $492 = $491 | $414;
        $493 = $492&255;
        $494 = (($s$0$us$i) + 1|0);
        HEAP8[$s$0$us$i>>0] = $493;
        $495 = (+($488|0));
        $496 = $$2$us$i - $495;
        $497 = $496 * 16.0;
        $498 = $494;
        $499 = (($498) - ($0))|0;
        $500 = ($499|0)==(1);
        if ($500) {
         $501 = (($s$0$us$i) + 2|0);
         HEAP8[$494>>0] = 46;
         $s$1$us$i = $501;
        } else {
         $s$1$us$i = $494;
        }
        $502 = $497 != 0.0;
        if ($502) {
         $$2$us$i = $497;$s$0$us$i = $s$1$us$i;
        } else {
         $s$1$lcssa$i = $s$1$us$i;
         break;
        }
       }
      }
     } else {
      if ($472) {
       $$2$us159$i = $$1$i;$s$0$us158$i = $buf$i;
       while(1) {
        $503 = (~~(($$2$us159$i)));
        $504 = (9552 + ($503)|0);
        $505 = HEAP8[$504>>0]|0;
        $506 = $505&255;
        $507 = $506 | $414;
        $508 = $507&255;
        $509 = (($s$0$us158$i) + 1|0);
        HEAP8[$s$0$us158$i>>0] = $508;
        $510 = (+($503|0));
        $511 = $$2$us159$i - $510;
        $512 = $511 * 16.0;
        $513 = $509;
        $514 = (($513) - ($0))|0;
        $515 = ($514|0)==(1);
        $516 = $512 != 0.0;
        $or$cond$i71 = $515 & $516;
        if ($or$cond$i71) {
         $517 = (($s$0$us158$i) + 2|0);
         HEAP8[$509>>0] = 46;
         $s$1$us160$i = $517;
        } else {
         $s$1$us160$i = $509;
        }
        if ($516) {
         $$2$us159$i = $512;$s$0$us158$i = $s$1$us160$i;
        } else {
         $s$1$lcssa$i = $s$1$us160$i;
         break;
        }
       }
      } else {
       $$2$i = $$1$i;$s$0$i = $buf$i;
       while(1) {
        $518 = (~~(($$2$i)));
        $519 = (9552 + ($518)|0);
        $520 = HEAP8[$519>>0]|0;
        $521 = $520&255;
        $522 = $521 | $414;
        $523 = $522&255;
        $524 = (($s$0$i) + 1|0);
        HEAP8[$s$0$i>>0] = $523;
        $525 = (+($518|0));
        $526 = $$2$i - $525;
        $527 = $526 * 16.0;
        $528 = $524;
        $529 = (($528) - ($0))|0;
        $530 = ($529|0)==(1);
        if ($530) {
         $531 = (($s$0$i) + 2|0);
         HEAP8[$524>>0] = 46;
         $s$1$i = $531;
        } else {
         $s$1$i = $524;
        }
        $532 = $527 != 0.0;
        if ($532) {
         $$2$i = $527;$s$0$i = $s$1$i;
        } else {
         $s$1$lcssa$i = $s$1$i;
         break;
        }
       }
      }
     }
     $533 = ($p$0|0)==(0);
     $$pre319$i = $s$1$lcssa$i;
     do {
      if ($533) {
       label = 173;
      } else {
       $534 = (($10) + ($$pre319$i))|0;
       $535 = ($534|0)<($p$0|0);
       if (!($535)) {
        label = 173;
        break;
       }
       $536 = $469;
       $537 = (($11) + ($p$0))|0;
       $538 = (($537) - ($536))|0;
       $l$0$i = $538;
      }
     } while(0);
     if ((label|0) == 173) {
      label = 0;
      $539 = $469;
      $540 = (($9) - ($539))|0;
      $541 = (($540) + ($$pre319$i))|0;
      $l$0$i = $541;
     }
     $542 = (($l$0$i) + ($417))|0;
     $543 = $fl$1$ & 73728;
     $544 = ($543|0)==(0);
     $545 = ($542|0)<($w$1|0);
     $or$cond$i52$i = $544 & $545;
     if ($or$cond$i52$i) {
      $546 = (($w$1) - ($542))|0;
      $547 = ($546>>>0)>(256);
      $548 = $547 ? 256 : $546;
      _memset(($pad$i|0),32,($548|0))|0;
      $549 = ($546>>>0)>(255);
      if ($549) {
       $$01$i53$i = $546;
       while(1) {
        (___fwritex($pad$i,256,$f)|0);
        $550 = (($$01$i53$i) + -256)|0;
        $551 = ($550>>>0)>(255);
        if ($551) {
         $$01$i53$i = $550;
        } else {
         $$0$lcssa$i55$i = $550;
         break;
        }
       }
      } else {
       $$0$lcssa$i55$i = $546;
      }
      (___fwritex($pad$i,$$0$lcssa$i55$i,$f)|0);
     }
     (___fwritex($prefix$0$$i,$417,$f)|0);
     $552 = ($543|0)==(65536);
     $or$cond$i59$i = $552 & $545;
     if ($or$cond$i59$i) {
      $553 = (($w$1) - ($542))|0;
      $554 = ($553>>>0)>(256);
      $555 = $554 ? 256 : $553;
      _memset(($pad$i|0),48,($555|0))|0;
      $556 = ($553>>>0)>(255);
      if ($556) {
       $$01$i60$i = $553;
       while(1) {
        (___fwritex($pad$i,256,$f)|0);
        $557 = (($$01$i60$i) + -256)|0;
        $558 = ($557>>>0)>(255);
        if ($558) {
         $$01$i60$i = $557;
        } else {
         $$0$lcssa$i62$i = $557;
         break;
        }
       }
      } else {
       $$0$lcssa$i62$i = $553;
      }
      (___fwritex($pad$i,$$0$lcssa$i62$i,$f)|0);
     }
     $559 = (($$pre319$i) - ($0))|0;
     (___fwritex($buf$i,$559,$f)|0);
     $560 = $469;
     $561 = (($8) - ($560))|0;
     $562 = (($l$0$i) - ($561))|0;
     $563 = (($562) - ($559))|0;
     $564 = ($563|0)>(0);
     if ($564) {
      $565 = ($563>>>0)>(256);
      $566 = $565 ? 256 : $563;
      _memset(($pad$i|0),48,($566|0))|0;
      $567 = ($563>>>0)>(255);
      if ($567) {
       $$01$i66$i = $563;
       while(1) {
        (___fwritex($pad$i,256,$f)|0);
        $568 = (($$01$i66$i) + -256)|0;
        $569 = ($568>>>0)>(255);
        if ($569) {
         $$01$i66$i = $568;
        } else {
         $$0$lcssa$i68$i = $568;
         break;
        }
       }
      } else {
       $$0$lcssa$i68$i = $563;
      }
      (___fwritex($pad$i,$$0$lcssa$i68$i,$f)|0);
     }
     (___fwritex($469,$561,$f)|0);
     $570 = ($543|0)==(8192);
     $or$cond$i72$i = $570 & $545;
     if ($or$cond$i72$i) {
      $571 = (($w$1) - ($542))|0;
      $572 = ($571>>>0)>(256);
      $573 = $572 ? 256 : $571;
      _memset(($pad$i|0),32,($573|0))|0;
      $574 = ($571>>>0)>(255);
      if ($574) {
       $$01$i73$i = $571;
       while(1) {
        (___fwritex($pad$i,256,$f)|0);
        $575 = (($$01$i73$i) + -256)|0;
        $576 = ($575>>>0)>(255);
        if ($576) {
         $$01$i73$i = $575;
        } else {
         $$0$lcssa$i75$i = $575;
         break;
        }
       }
      } else {
       $$0$lcssa$i75$i = $571;
      }
      (___fwritex($pad$i,$$0$lcssa$i75$i,$f)|0);
     }
     $w$18$i = $545 ? $w$1 : $542;
     $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $w$18$i;$l10n$0 = $l10n$3;
     continue L1;
    }
    $577 = ($p$0|0)<(0);
    $$p$i = $577 ? 6 : $p$0;
    if ($409) {
     $578 = $408 * 268435456.0;
     $579 = HEAP32[$e2$i>>2]|0;
     $580 = (($579) + -28)|0;
     HEAP32[$e2$i>>2] = $580;
     $$3$i = $578;$581 = $580;
    } else {
     $$pre$i = HEAP32[$e2$i>>2]|0;
     $$3$i = $408;$581 = $$pre$i;
    }
    $582 = ($581|0)<(0);
    $$31$i = $582 ? $big$i : $12;
    $$4$i = $$3$i;$z$0$i = $$31$i;
    while(1) {
     $583 = (~~(($$4$i))>>>0);
     HEAP32[$z$0$i>>2] = $583;
     $584 = (($z$0$i) + 4|0);
     $585 = (+($583>>>0));
     $586 = $$4$i - $585;
     $587 = $586 * 1.0E+9;
     $588 = $587 != 0.0;
     if ($588) {
      $$4$i = $587;$z$0$i = $584;
     } else {
      break;
     }
    }
    $$pr$i = HEAP32[$e2$i>>2]|0;
    $589 = ($$pr$i|0)>(0);
    if ($589) {
     $590 = $$pr$i;$a$1263$i = $$31$i;$z$1262$i = $584;
     while(1) {
      $591 = ($590|0)>(29);
      $592 = $591 ? 29 : $590;
      $d$0254$i = (($z$1262$i) + -4|0);
      $593 = ($d$0254$i>>>0)<($a$1263$i>>>0);
      do {
       if ($593) {
        $a$2$ph$i = $a$1263$i;
       } else {
        $carry$0255$i = 0;$d$0256$i = $d$0254$i;
        while(1) {
         $594 = HEAP32[$d$0256$i>>2]|0;
         $595 = (_bitshift64Shl(($594|0),0,($592|0))|0);
         $596 = tempRet0;
         $597 = (_i64Add(($595|0),($596|0),($carry$0255$i|0),0)|0);
         $598 = tempRet0;
         $599 = (___uremdi3(($597|0),($598|0),1000000000,0)|0);
         $600 = tempRet0;
         HEAP32[$d$0256$i>>2] = $599;
         $601 = (___udivdi3(($597|0),($598|0),1000000000,0)|0);
         $602 = tempRet0;
         $d$0$i = (($d$0256$i) + -4|0);
         $603 = ($d$0$i>>>0)<($a$1263$i>>>0);
         if ($603) {
          break;
         } else {
          $carry$0255$i = $601;$d$0256$i = $d$0$i;
         }
        }
        $604 = ($601|0)==(0);
        if ($604) {
         $a$2$ph$i = $a$1263$i;
         break;
        }
        $605 = (($a$1263$i) + -4|0);
        HEAP32[$605>>2] = $601;
        $a$2$ph$i = $605;
       }
      } while(0);
      $z$2$i = $z$1262$i;
      while(1) {
       $606 = ($z$2$i>>>0)>($a$2$ph$i>>>0);
       if (!($606)) {
        break;
       }
       $607 = (($z$2$i) + -4|0);
       $608 = HEAP32[$607>>2]|0;
       $609 = ($608|0)==(0);
       if ($609) {
        $z$2$i = $607;
       } else {
        break;
       }
      }
      $610 = HEAP32[$e2$i>>2]|0;
      $611 = (($610) - ($592))|0;
      HEAP32[$e2$i>>2] = $611;
      $612 = ($611|0)>(0);
      if ($612) {
       $590 = $611;$a$1263$i = $a$2$ph$i;$z$1262$i = $z$2$i;
      } else {
       $$pr146$i = $611;$a$1$lcssa$i = $a$2$ph$i;$z$1$lcssa$i = $z$2$i;
       break;
      }
     }
    } else {
     $$pr146$i = $$pr$i;$a$1$lcssa$i = $$31$i;$z$1$lcssa$i = $584;
    }
    $613 = ($$pr146$i|0)<(0);
    L228: do {
     if ($613) {
      $614 = (($$p$i) + 25)|0;
      $615 = (($614|0) / 9)&-1;
      $616 = (($615) + 1)|0;
      $617 = ($412|0)==(102);
      if ($617) {
       $618 = $$31$i;
       $619 = (($$31$i) + ($616<<2)|0);
       $621 = $$pr146$i;$a$3249$us$i = $a$1$lcssa$i;$z$3248$us$i = $z$1$lcssa$i;
       while(1) {
        $620 = (0 - ($621))|0;
        $622 = ($620|0)>(9);
        $$20$us$i = $622 ? 9 : $620;
        $623 = ($a$3249$us$i>>>0)<($z$3248$us$i>>>0);
        do {
         if ($623) {
          $648 = 1 << $$20$us$i;
          $642 = (($648) + -1)|0;
          $645 = 1000000000 >>> $$20$us$i;
          $carry3$0243$us$i = 0;$d$1242$us$i = $a$3249$us$i;
          while(1) {
           $640 = HEAP32[$d$1242$us$i>>2]|0;
           $641 = $640 & $642;
           $643 = $640 >>> $$20$us$i;
           $644 = (($643) + ($carry3$0243$us$i))|0;
           HEAP32[$d$1242$us$i>>2] = $644;
           $630 = Math_imul($641, $645)|0;
           $646 = (($d$1242$us$i) + 4|0);
           $647 = ($646>>>0)<($z$3248$us$i>>>0);
           if ($647) {
            $carry3$0243$us$i = $630;$d$1242$us$i = $646;
           } else {
            break;
           }
          }
          $627 = HEAP32[$a$3249$us$i>>2]|0;
          $628 = ($627|0)==(0);
          $629 = (($a$3249$us$i) + 4|0);
          $$a$3$us$i = $628 ? $629 : $a$3249$us$i;
          $631 = ($630|0)==(0);
          if ($631) {
           $$a$3$us323$i = $$a$3$us$i;$z$4$us$i = $z$3248$us$i;
           break;
          }
          $632 = (($z$3248$us$i) + 4|0);
          HEAP32[$z$3248$us$i>>2] = $630;
          $$a$3$us323$i = $$a$3$us$i;$z$4$us$i = $632;
         } else {
          $624 = HEAP32[$a$3249$us$i>>2]|0;
          $625 = ($624|0)==(0);
          $626 = (($a$3249$us$i) + 4|0);
          $$a$3$us322$i = $625 ? $626 : $a$3249$us$i;
          $$a$3$us323$i = $$a$3$us322$i;$z$4$us$i = $z$3248$us$i;
         }
        } while(0);
        $633 = $z$4$us$i;
        $634 = (($633) - ($618))|0;
        $635 = $634 >> 2;
        $636 = ($635|0)>($616|0);
        $$z$4$us$i = $636 ? $619 : $z$4$us$i;
        $637 = HEAP32[$e2$i>>2]|0;
        $638 = (($637) + ($$20$us$i))|0;
        HEAP32[$e2$i>>2] = $638;
        $639 = ($638|0)<(0);
        if ($639) {
         $621 = $638;$a$3249$us$i = $$a$3$us323$i;$z$3248$us$i = $$z$4$us$i;
        } else {
         $a$3$lcssa$i = $$a$3$us323$i;$z$3$lcssa$i = $$z$4$us$i;
         break L228;
        }
       }
      } else {
       $650 = $$pr146$i;$a$3249$i = $a$1$lcssa$i;$z$3248$i = $z$1$lcssa$i;
      }
      while(1) {
       $649 = (0 - ($650))|0;
       $651 = ($649|0)>(9);
       $$20$i = $651 ? 9 : $649;
       $652 = ($a$3249$i>>>0)<($z$3248$i>>>0);
       do {
        if ($652) {
         $656 = 1 << $$20$i;
         $657 = (($656) + -1)|0;
         $658 = 1000000000 >>> $$20$i;
         $carry3$0243$i = 0;$d$1242$i = $a$3249$i;
         while(1) {
          $659 = HEAP32[$d$1242$i>>2]|0;
          $660 = $659 & $657;
          $661 = $659 >>> $$20$i;
          $662 = (($661) + ($carry3$0243$i))|0;
          HEAP32[$d$1242$i>>2] = $662;
          $663 = Math_imul($660, $658)|0;
          $664 = (($d$1242$i) + 4|0);
          $665 = ($664>>>0)<($z$3248$i>>>0);
          if ($665) {
           $carry3$0243$i = $663;$d$1242$i = $664;
          } else {
           break;
          }
         }
         $666 = HEAP32[$a$3249$i>>2]|0;
         $667 = ($666|0)==(0);
         $668 = (($a$3249$i) + 4|0);
         $$a$3$i = $667 ? $668 : $a$3249$i;
         $669 = ($663|0)==(0);
         if ($669) {
          $$a$3325$i = $$a$3$i;$z$4$i = $z$3248$i;
          break;
         }
         $670 = (($z$3248$i) + 4|0);
         HEAP32[$z$3248$i>>2] = $663;
         $$a$3325$i = $$a$3$i;$z$4$i = $670;
        } else {
         $653 = HEAP32[$a$3249$i>>2]|0;
         $654 = ($653|0)==(0);
         $655 = (($a$3249$i) + 4|0);
         $$a$3324$i = $654 ? $655 : $a$3249$i;
         $$a$3325$i = $$a$3324$i;$z$4$i = $z$3248$i;
        }
       } while(0);
       $671 = $z$4$i;
       $672 = $$a$3325$i;
       $673 = (($671) - ($672))|0;
       $674 = $673 >> 2;
       $675 = ($674|0)>($616|0);
       if ($675) {
        $676 = (($$a$3325$i) + ($616<<2)|0);
        $z$5$i = $676;
       } else {
        $z$5$i = $z$4$i;
       }
       $677 = HEAP32[$e2$i>>2]|0;
       $678 = (($677) + ($$20$i))|0;
       HEAP32[$e2$i>>2] = $678;
       $679 = ($678|0)<(0);
       if ($679) {
        $650 = $678;$a$3249$i = $$a$3325$i;$z$3248$i = $z$5$i;
       } else {
        $a$3$lcssa$i = $$a$3325$i;$z$3$lcssa$i = $z$5$i;
        break;
       }
      }
     } else {
      $a$3$lcssa$i = $a$1$lcssa$i;$z$3$lcssa$i = $z$1$lcssa$i;
     }
    } while(0);
    $680 = ($a$3$lcssa$i>>>0)<($z$3$lcssa$i>>>0);
    $681 = $$31$i;
    do {
     if ($680) {
      $682 = $a$3$lcssa$i;
      $683 = (($681) - ($682))|0;
      $684 = $683 >> 2;
      $685 = ($684*9)|0;
      $686 = HEAP32[$a$3$lcssa$i>>2]|0;
      $687 = ($686>>>0)<(10);
      if ($687) {
       $e$1$i = $685;
       break;
      } else {
       $e$0238$i = $685;$i$0237$i = 10;
      }
      while(1) {
       $688 = ($i$0237$i*10)|0;
       $689 = (($e$0238$i) + 1)|0;
       $690 = ($686>>>0)<($688>>>0);
       if ($690) {
        $e$1$i = $689;
        break;
       } else {
        $e$0238$i = $689;$i$0237$i = $688;
       }
      }
     } else {
      $e$1$i = 0;
     }
    } while(0);
    $691 = ($412|0)!=(102);
    $692 = $691 ? $e$1$i : 0;
    $693 = (($$p$i) - ($692))|0;
    $694 = ($412|0)==(103);
    $695 = ($$p$i|0)!=(0);
    $$21$i = $694 & $695;
    $$neg151$i = $$21$i << 31 >> 31;
    $696 = (($693) + ($$neg151$i))|0;
    $697 = $z$3$lcssa$i;
    $698 = (($697) - ($681))|0;
    $699 = $698 >> 2;
    $700 = ($699*9)|0;
    $701 = (($700) + -9)|0;
    $702 = ($696|0)<($701|0);
    if ($702) {
     $703 = (($696) + 9216)|0;
     $704 = (($703|0) / 9)&-1;
     $$sum$i = (($704) + -1023)|0;
     $705 = (($$31$i) + ($$sum$i<<2)|0);
     $706 = (($703|0) % 9)&-1;
     $j$0229$i = (($706) + 1)|0;
     $707 = ($j$0229$i|0)<(9);
     if ($707) {
      $i$1230$i = 10;$j$0231$i = $j$0229$i;
      while(1) {
       $708 = ($i$1230$i*10)|0;
       $j$0$i = (($j$0231$i) + 1)|0;
       $exitcond$i = ($j$0$i|0)==(9);
       if ($exitcond$i) {
        $i$1$lcssa$i = $708;
        break;
       } else {
        $i$1230$i = $708;$j$0231$i = $j$0$i;
       }
      }
     } else {
      $i$1$lcssa$i = 10;
     }
     $709 = HEAP32[$705>>2]|0;
     $710 = (($709>>>0) % ($i$1$lcssa$i>>>0))&-1;
     $711 = ($710|0)==(0);
     if ($711) {
      $$sum15$i = (($704) + -1022)|0;
      $712 = (($$31$i) + ($$sum15$i<<2)|0);
      $713 = ($712|0)==($z$3$lcssa$i|0);
      if ($713) {
       $a$7$i = $a$3$lcssa$i;$d$3$i = $705;$e$3$i = $e$1$i;
      } else {
       label = 233;
      }
     } else {
      label = 233;
     }
     do {
      if ((label|0) == 233) {
       label = 0;
       $714 = (($709>>>0) / ($i$1$lcssa$i>>>0))&-1;
       $715 = $714 & 1;
       $716 = ($715|0)==(0);
       $$22$i = $716 ? 9007199254740992.0 : 9007199254740994.0;
       $717 = (($i$1$lcssa$i|0) / 2)&-1;
       $718 = ($710>>>0)<($717>>>0);
       do {
        if ($718) {
         $small$0$i = 0.5;
        } else {
         $719 = ($710|0)==($717|0);
         if ($719) {
          $$sum16$i = (($704) + -1022)|0;
          $720 = (($$31$i) + ($$sum16$i<<2)|0);
          $721 = ($720|0)==($z$3$lcssa$i|0);
          if ($721) {
           $small$0$i = 1.0;
           break;
          }
         }
         $small$0$i = 1.5;
        }
       } while(0);
       $722 = ($pl$0$i|0)==(0);
       do {
        if ($722) {
         $round6$1$i = $$22$i;$small$1$i = $small$0$i;
        } else {
         $723 = HEAP8[$prefix$0$i>>0]|0;
         $724 = ($723<<24>>24)==(45);
         if (!($724)) {
          $round6$1$i = $$22$i;$small$1$i = $small$0$i;
          break;
         }
         $725 = $$22$i * -1.0;
         $726 = $small$0$i * -1.0;
         $round6$1$i = $725;$small$1$i = $726;
        }
       } while(0);
       $727 = (($709) - ($710))|0;
       HEAP32[$705>>2] = $727;
       $728 = $round6$1$i + $small$1$i;
       $729 = $728 != $round6$1$i;
       if (!($729)) {
        $a$7$i = $a$3$lcssa$i;$d$3$i = $705;$e$3$i = $e$1$i;
        break;
       }
       $730 = (($727) + ($i$1$lcssa$i))|0;
       HEAP32[$705>>2] = $730;
       $731 = ($730>>>0)>(999999999);
       if ($731) {
        $a$5223$i = $a$3$lcssa$i;$d$2222$i = $705;
        while(1) {
         $732 = (($d$2222$i) + -4|0);
         HEAP32[$d$2222$i>>2] = 0;
         $733 = ($732>>>0)<($a$5223$i>>>0);
         if ($733) {
          $734 = (($a$5223$i) + -4|0);
          HEAP32[$734>>2] = 0;
          $a$6$i = $734;
         } else {
          $a$6$i = $a$5223$i;
         }
         $735 = HEAP32[$732>>2]|0;
         $736 = (($735) + 1)|0;
         HEAP32[$732>>2] = $736;
         $737 = ($736>>>0)>(999999999);
         if ($737) {
          $a$5223$i = $a$6$i;$d$2222$i = $732;
         } else {
          $a$5$lcssa$i = $a$6$i;$d$2$lcssa$i = $732;
          break;
         }
        }
       } else {
        $a$5$lcssa$i = $a$3$lcssa$i;$d$2$lcssa$i = $705;
       }
       $738 = $a$5$lcssa$i;
       $739 = (($681) - ($738))|0;
       $740 = $739 >> 2;
       $741 = ($740*9)|0;
       $742 = HEAP32[$a$5$lcssa$i>>2]|0;
       $743 = ($742>>>0)<(10);
       if ($743) {
        $a$7$i = $a$5$lcssa$i;$d$3$i = $d$2$lcssa$i;$e$3$i = $741;
        break;
       } else {
        $e$2218$i = $741;$i$2217$i = 10;
       }
       while(1) {
        $744 = ($i$2217$i*10)|0;
        $745 = (($e$2218$i) + 1)|0;
        $746 = ($742>>>0)<($744>>>0);
        if ($746) {
         $a$7$i = $a$5$lcssa$i;$d$3$i = $d$2$lcssa$i;$e$3$i = $745;
         break;
        } else {
         $e$2218$i = $745;$i$2217$i = $744;
        }
       }
      }
     } while(0);
     $747 = (($d$3$i) + 4|0);
     $748 = ($z$3$lcssa$i>>>0)>($747>>>0);
     $$z$3$i = $748 ? $747 : $z$3$lcssa$i;
     $a$8$ph$i = $a$7$i;$e$4$ph$i = $e$3$i;$z$6$ph$i = $$z$3$i;
    } else {
     $a$8$ph$i = $a$3$lcssa$i;$e$4$ph$i = $e$1$i;$z$6$ph$i = $z$3$lcssa$i;
    }
    $749 = (0 - ($e$4$ph$i))|0;
    $z$6$i = $z$6$ph$i;
    while(1) {
     $750 = ($z$6$i>>>0)>($a$8$ph$i>>>0);
     if (!($750)) {
      $$lcssa300$i = 0;
      break;
     }
     $751 = (($z$6$i) + -4|0);
     $752 = HEAP32[$751>>2]|0;
     $753 = ($752|0)==(0);
     if ($753) {
      $z$6$i = $751;
     } else {
      $$lcssa300$i = 1;
      break;
     }
    }
    do {
     if ($694) {
      $754 = ($$p$i|0)==(0);
      $755 = $754&1;
      $$$p$i = (($755) + ($$p$i))|0;
      $756 = ($$$p$i|0)>($e$4$ph$i|0);
      $757 = ($e$4$ph$i|0)>(-5);
      $or$cond4$i = $756 & $757;
      if ($or$cond4$i) {
       $758 = (($t$0) + -1)|0;
       $$neg152$i = (($$$p$i) + -1)|0;
       $759 = (($$neg152$i) - ($e$4$ph$i))|0;
       $$013$i = $758;$$210$i = $759;
      } else {
       $760 = (($t$0) + -2)|0;
       $761 = (($$$p$i) + -1)|0;
       $$013$i = $760;$$210$i = $761;
      }
      $762 = $fl$1$ & 8;
      $763 = ($762|0)==(0);
      if (!($763)) {
       $$114$i = $$013$i;$$311$i = $$210$i;
       break;
      }
      do {
       if ($$lcssa300$i) {
        $764 = (($z$6$i) + -4|0);
        $765 = HEAP32[$764>>2]|0;
        $766 = ($765|0)==(0);
        if ($766) {
         $j$2$i = 9;
         break;
        }
        $767 = (($765>>>0) % 10)&-1;
        $768 = ($767|0)==(0);
        if ($768) {
         $i$3209$i = 10;$j$1210$i = 0;
        } else {
         $j$2$i = 0;
         break;
        }
        while(1) {
         $769 = ($i$3209$i*10)|0;
         $770 = (($j$1210$i) + 1)|0;
         $771 = (($765>>>0) % ($769>>>0))&-1;
         $772 = ($771|0)==(0);
         if ($772) {
          $i$3209$i = $769;$j$1210$i = $770;
         } else {
          $j$2$i = $770;
          break;
         }
        }
       } else {
        $j$2$i = 9;
       }
      } while(0);
      $773 = $$013$i | 32;
      $774 = ($773|0)==(102);
      $775 = $z$6$i;
      $776 = (($775) - ($681))|0;
      $777 = $776 >> 2;
      $778 = ($777*9)|0;
      $779 = (($778) + -9)|0;
      if ($774) {
       $780 = (($779) - ($j$2$i))|0;
       $781 = ($780|0)<(0);
       $$23$i = $781 ? 0 : $780;
       $782 = ($$210$i|0)<($$23$i|0);
       $$210$$23$i = $782 ? $$210$i : $$23$i;
       $$114$i = $$013$i;$$311$i = $$210$$23$i;
       break;
      } else {
       $783 = (($779) + ($e$4$ph$i))|0;
       $784 = (($783) - ($j$2$i))|0;
       $785 = ($784|0)<(0);
       $$25$i = $785 ? 0 : $784;
       $786 = ($$210$i|0)<($$25$i|0);
       $$210$$25$i = $786 ? $$210$i : $$25$i;
       $$114$i = $$013$i;$$311$i = $$210$$25$i;
       break;
      }
     } else {
      $$114$i = $t$0;$$311$i = $$p$i;
     }
    } while(0);
    $787 = ($$311$i|0)!=(0);
    if ($787) {
     $791 = 1;
    } else {
     $788 = $fl$1$ & 8;
     $789 = ($788|0)!=(0);
     $791 = $789;
    }
    $790 = $791&1;
    $792 = $$114$i | 32;
    $793 = ($792|0)==(102);
    if ($793) {
     $794 = ($e$4$ph$i|0)>(0);
     $795 = $794 ? $e$4$ph$i : 0;
     $$pn$i = $795;$estr$2$i = 0;
    } else {
     $796 = ($e$4$ph$i|0)<(0);
     $797 = $796 ? $749 : $e$4$ph$i;
     $798 = ($797|0)<(0);
     if ($798) {
      $799 = ($797|0)<(0);
      $800 = $799 << 31 >> 31;
      $$05$i79$i = $6;$801 = $797;$802 = $800;
      while(1) {
       $803 = (___uremdi3(($801|0),($802|0),10,0)|0);
       $804 = tempRet0;
       $805 = $803 | 48;
       $806 = $805&255;
       $807 = (($$05$i79$i) + -1|0);
       HEAP8[$807>>0] = $806;
       $808 = (___udivdi3(($801|0),($802|0),10,0)|0);
       $809 = tempRet0;
       $810 = ($802>>>0)>(9);
       $811 = ($802|0)==(9);
       $812 = ($801>>>0)>(4294967295);
       $813 = $811 & $812;
       $814 = $810 | $813;
       if ($814) {
        $$05$i79$i = $807;$801 = $808;$802 = $809;
       } else {
        break;
       }
      }
      $$0$lcssa$i84$i = $807;$$01$lcssa$off0$i85$i = $808;
     } else {
      $$0$lcssa$i84$i = $6;$$01$lcssa$off0$i85$i = $797;
     }
     $815 = ($$01$lcssa$off0$i85$i|0)==(0);
     if ($815) {
      $estr$1$ph$i = $$0$lcssa$i84$i;
     } else {
      $$12$i87$i = $$0$lcssa$i84$i;$y$03$i86$i = $$01$lcssa$off0$i85$i;
      while(1) {
       $816 = (($y$03$i86$i>>>0) % 10)&-1;
       $817 = $816 | 48;
       $818 = $817&255;
       $819 = (($$12$i87$i) + -1|0);
       HEAP8[$819>>0] = $818;
       $820 = (($y$03$i86$i>>>0) / 10)&-1;
       $821 = ($y$03$i86$i>>>0)<(10);
       if ($821) {
        $estr$1$ph$i = $819;
        break;
       } else {
        $$12$i87$i = $819;$y$03$i86$i = $820;
       }
      }
     }
     $822 = $estr$1$ph$i;
     $823 = (($8) - ($822))|0;
     $824 = ($823|0)<(2);
     if ($824) {
      $estr$1200$i = $estr$1$ph$i;
      while(1) {
       $825 = (($estr$1200$i) + -1|0);
       HEAP8[$825>>0] = 48;
       $826 = $825;
       $827 = (($8) - ($826))|0;
       $828 = ($827|0)<(2);
       if ($828) {
        $estr$1200$i = $825;
       } else {
        $estr$1$lcssa$i = $825;
        break;
       }
      }
     } else {
      $estr$1$lcssa$i = $estr$1$ph$i;
     }
     $829 = $e$4$ph$i >> 31;
     $830 = $829 & 2;
     $831 = (($830) + 43)|0;
     $832 = $831&255;
     $833 = (($estr$1$lcssa$i) + -1|0);
     HEAP8[$833>>0] = $832;
     $834 = $$114$i&255;
     $835 = (($estr$1$lcssa$i) + -2|0);
     HEAP8[$835>>0] = $834;
     $836 = $835;
     $837 = (($8) - ($836))|0;
     $$pn$i = $837;$estr$2$i = $835;
    }
    $838 = (($pl$0$i) + 1)|0;
    $839 = (($838) + ($$311$i))|0;
    $l$1$i = (($839) + ($790))|0;
    $840 = (($l$1$i) + ($$pn$i))|0;
    $841 = $fl$1$ & 73728;
    $842 = ($841|0)==(0);
    $843 = ($840|0)<($w$1|0);
    $or$cond$i93$i = $842 & $843;
    if ($or$cond$i93$i) {
     $844 = (($w$1) - ($840))|0;
     $845 = ($844>>>0)>(256);
     $846 = $845 ? 256 : $844;
     _memset(($pad$i|0),32,($846|0))|0;
     $847 = ($844>>>0)>(255);
     if ($847) {
      $$01$i94$i = $844;
      while(1) {
       (___fwritex($pad$i,256,$f)|0);
       $848 = (($$01$i94$i) + -256)|0;
       $849 = ($848>>>0)>(255);
       if ($849) {
        $$01$i94$i = $848;
       } else {
        $$0$lcssa$i96$i = $848;
        break;
       }
      }
     } else {
      $$0$lcssa$i96$i = $844;
     }
     (___fwritex($pad$i,$$0$lcssa$i96$i,$f)|0);
    }
    (___fwritex($prefix$0$i,$pl$0$i,$f)|0);
    $850 = ($841|0)==(65536);
    $or$cond$i100$i = $850 & $843;
    if ($or$cond$i100$i) {
     $851 = (($w$1) - ($840))|0;
     $852 = ($851>>>0)>(256);
     $853 = $852 ? 256 : $851;
     _memset(($pad$i|0),48,($853|0))|0;
     $854 = ($851>>>0)>(255);
     if ($854) {
      $$01$i101$i = $851;
      while(1) {
       (___fwritex($pad$i,256,$f)|0);
       $855 = (($$01$i101$i) + -256)|0;
       $856 = ($855>>>0)>(255);
       if ($856) {
        $$01$i101$i = $855;
       } else {
        $$0$lcssa$i103$i = $855;
        break;
       }
      }
     } else {
      $$0$lcssa$i103$i = $851;
     }
     (___fwritex($pad$i,$$0$lcssa$i103$i,$f)|0);
    }
    do {
     if ($793) {
      $857 = ($a$8$ph$i>>>0)>($$31$i>>>0);
      $r$0$a$8$i = $857 ? $$31$i : $a$8$ph$i;
      $d$4183$i = $r$0$a$8$i;
      while(1) {
       $858 = HEAP32[$d$4183$i>>2]|0;
       $859 = ($858|0)==(0);
       if ($859) {
        $$1$lcssa$i112$i = $13;
       } else {
        $$12$i110$i = $13;$y$03$i109$i = $858;
        while(1) {
         $860 = (($y$03$i109$i>>>0) % 10)&-1;
         $861 = $860 | 48;
         $862 = $861&255;
         $863 = (($$12$i110$i) + -1|0);
         HEAP8[$863>>0] = $862;
         $864 = (($y$03$i109$i>>>0) / 10)&-1;
         $865 = ($y$03$i109$i>>>0)<(10);
         if ($865) {
          $$1$lcssa$i112$i = $863;
          break;
         } else {
          $$12$i110$i = $863;$y$03$i109$i = $864;
         }
        }
       }
       $866 = ($d$4183$i|0)==($r$0$a$8$i|0);
       do {
        if ($866) {
         $870 = ($$1$lcssa$i112$i|0)==($13|0);
         if (!($870)) {
          $s7$1$i = $$1$lcssa$i112$i;
          break;
         }
         HEAP8[$15>>0] = 48;
         $s7$1$i = $15;
        } else {
         $867 = ($$1$lcssa$i112$i>>>0)>($buf$i>>>0);
         if ($867) {
          $s7$0180$i = $$1$lcssa$i112$i;
         } else {
          $s7$1$i = $$1$lcssa$i112$i;
          break;
         }
         while(1) {
          $868 = (($s7$0180$i) + -1|0);
          HEAP8[$868>>0] = 48;
          $869 = ($868>>>0)>($buf$i>>>0);
          if ($869) {
           $s7$0180$i = $868;
          } else {
           $s7$1$i = $868;
           break;
          }
         }
        }
       } while(0);
       $871 = $s7$1$i;
       $872 = (($14) - ($871))|0;
       (___fwritex($s7$1$i,$872,$f)|0);
       $873 = (($d$4183$i) + 4|0);
       $874 = ($873>>>0)>($$31$i>>>0);
       if ($874) {
        break;
       } else {
        $d$4183$i = $873;
       }
      }
      if (!($787)) {
       $875 = $fl$1$ & 8;
       $876 = ($875|0)==(0);
       if ($876) {
        break;
       }
      }
      (___fwritex(9568,1,$f)|0);
      $877 = ($873>>>0)<($z$6$i>>>0);
      $878 = ($$311$i|0)>(0);
      $or$cond28173$i = $877 & $878;
      if ($or$cond28173$i) {
       $$412175$i = $$311$i;$d$5174$i = $873;
       while(1) {
        $879 = HEAP32[$d$5174$i>>2]|0;
        $880 = ($879|0)==(0);
        if ($880) {
         $s8$0169$i = $13;
         label = 300;
        } else {
         $$12$i119$i = $13;$y$03$i118$i = $879;
         while(1) {
          $881 = (($y$03$i118$i>>>0) % 10)&-1;
          $882 = $881 | 48;
          $883 = $882&255;
          $884 = (($$12$i119$i) + -1|0);
          HEAP8[$884>>0] = $883;
          $885 = (($y$03$i118$i>>>0) / 10)&-1;
          $886 = ($y$03$i118$i>>>0)<(10);
          if ($886) {
           break;
          } else {
           $$12$i119$i = $884;$y$03$i118$i = $885;
          }
         }
         $887 = ($884>>>0)>($buf$i>>>0);
         if ($887) {
          $s8$0169$i = $884;
          label = 300;
         } else {
          $s8$0$lcssa$i = $884;
         }
        }
        if ((label|0) == 300) {
         while(1) {
          label = 0;
          $888 = (($s8$0169$i) + -1|0);
          HEAP8[$888>>0] = 48;
          $889 = ($888>>>0)>($buf$i>>>0);
          if ($889) {
           $s8$0169$i = $888;
           label = 300;
          } else {
           $s8$0$lcssa$i = $888;
           break;
          }
         }
        }
        $890 = ($$412175$i|0)>(9);
        $891 = $890 ? 9 : $$412175$i;
        (___fwritex($s8$0$lcssa$i,$891,$f)|0);
        $892 = (($d$5174$i) + 4|0);
        $893 = (($$412175$i) + -9)|0;
        $894 = ($892>>>0)<($z$6$i>>>0);
        $895 = ($893|0)>(0);
        $or$cond28$i = $894 & $895;
        if ($or$cond28$i) {
         $$412175$i = $893;$d$5174$i = $892;
        } else {
         $$412$lcssa$i = $893;
         break;
        }
       }
      } else {
       $$412$lcssa$i = $$311$i;
      }
      $896 = ($$412$lcssa$i|0)>(0);
      if (!($896)) {
       break;
      }
      $897 = ($$412$lcssa$i>>>0)>(256);
      $898 = $897 ? 256 : $$412$lcssa$i;
      _memset(($pad$i|0),48,($898|0))|0;
      $899 = ($$412$lcssa$i>>>0)>(255);
      if ($899) {
       $$01$i125$i = $$412$lcssa$i;
       while(1) {
        (___fwritex($pad$i,256,$f)|0);
        $900 = (($$01$i125$i) + -256)|0;
        $901 = ($900>>>0)>(255);
        if ($901) {
         $$01$i125$i = $900;
        } else {
         $$0$lcssa$i127$i = $900;
         break;
        }
       }
      } else {
       $$0$lcssa$i127$i = $$412$lcssa$i;
      }
      (___fwritex($pad$i,$$0$lcssa$i127$i,$f)|0);
     } else {
      $902 = (($a$8$ph$i) + 4|0);
      $z$6$$i = $$lcssa300$i ? $z$6$i : $902;
      $903 = ($$311$i|0)>(-1);
      do {
       if ($903) {
        $904 = $fl$1$ & 8;
        $$not$i = ($904|0)!=(0);
        $$5193$i = $$311$i;$d$6192$i = $a$8$ph$i;
        while(1) {
         $905 = HEAP32[$d$6192$i>>2]|0;
         $906 = ($905|0)==(0);
         if ($906) {
          label = 311;
         } else {
          $$12$i134$i = $13;$y$03$i133$i = $905;
          while(1) {
           $907 = (($y$03$i133$i>>>0) % 10)&-1;
           $908 = $907 | 48;
           $909 = $908&255;
           $910 = (($$12$i134$i) + -1|0);
           HEAP8[$910>>0] = $909;
           $911 = (($y$03$i133$i>>>0) / 10)&-1;
           $912 = ($y$03$i133$i>>>0)<(10);
           if ($912) {
            break;
           } else {
            $$12$i134$i = $910;$y$03$i133$i = $911;
           }
          }
          $913 = ($910|0)==($13|0);
          if ($913) {
           label = 311;
          } else {
           $s9$0$i = $910;
          }
         }
         if ((label|0) == 311) {
          label = 0;
          HEAP8[$15>>0] = 48;
          $s9$0$i = $15;
         }
         $914 = ($d$6192$i|0)==($a$8$ph$i|0);
         do {
          if ($914) {
           $918 = (($s9$0$i) + 1|0);
           (___fwritex($s9$0$i,1,$f)|0);
           $919 = ($$5193$i|0)>(0);
           $brmerge$i = $919 | $$not$i;
           if (!($brmerge$i)) {
            $s9$2$i = $918;
            break;
           }
           (___fwritex(9568,1,$f)|0);
           $s9$2$i = $918;
          } else {
           $915 = ($s9$0$i>>>0)>($buf$i>>>0);
           if ($915) {
            $s9$1188$i = $s9$0$i;
           } else {
            $s9$2$i = $s9$0$i;
            break;
           }
           while(1) {
            $916 = (($s9$1188$i) + -1|0);
            HEAP8[$916>>0] = 48;
            $917 = ($916>>>0)>($buf$i>>>0);
            if ($917) {
             $s9$1188$i = $916;
            } else {
             $s9$2$i = $916;
             break;
            }
           }
          }
         } while(0);
         $920 = $s9$2$i;
         $921 = (($14) - ($920))|0;
         $922 = ($921|0)<($$5193$i|0);
         $$$5$i = $922 ? $921 : $$5193$i;
         (___fwritex($s9$2$i,$$$5$i,$f)|0);
         $923 = (($$5193$i) - ($921))|0;
         $924 = (($d$6192$i) + 4|0);
         $925 = ($924>>>0)<($z$6$$i>>>0);
         $926 = ($923|0)>(-1);
         $or$cond29$i = $925 & $926;
         if ($or$cond29$i) {
          $$5193$i = $923;$d$6192$i = $924;
         } else {
          break;
         }
        }
        $927 = ($923|0)>(0);
        if (!($927)) {
         break;
        }
        $928 = ($923>>>0)>(256);
        $929 = $928 ? 256 : $923;
        _memset(($pad$i|0),48,($929|0))|0;
        $930 = ($923>>>0)>(255);
        if ($930) {
         $$01$i140$i = $923;
         while(1) {
          (___fwritex($pad$i,256,$f)|0);
          $931 = (($$01$i140$i) + -256)|0;
          $932 = ($931>>>0)>(255);
          if ($932) {
           $$01$i140$i = $931;
          } else {
           $$0$lcssa$i142$i = $931;
           break;
          }
         }
        } else {
         $$0$lcssa$i142$i = $923;
        }
        (___fwritex($pad$i,$$0$lcssa$i142$i,$f)|0);
       }
      } while(0);
      $933 = $estr$2$i;
      $934 = (($8) - ($933))|0;
      (___fwritex($estr$2$i,$934,$f)|0);
     }
    } while(0);
    $935 = ($841|0)==(8192);
    $or$cond$i$i = $935 & $843;
    if ($or$cond$i$i) {
     $936 = (($w$1) - ($840))|0;
     $937 = ($936>>>0)>(256);
     $938 = $937 ? 256 : $936;
     _memset(($pad$i|0),32,($938|0))|0;
     $939 = ($936>>>0)>(255);
     if ($939) {
      $$01$i$i = $936;
      while(1) {
       (___fwritex($pad$i,256,$f)|0);
       $940 = (($$01$i$i) + -256)|0;
       $941 = ($940>>>0)>(255);
       if ($941) {
        $$01$i$i = $940;
       } else {
        $$0$lcssa$i$i = $940;
        break;
       }
      }
     } else {
      $$0$lcssa$i$i = $936;
     }
     (___fwritex($pad$i,$$0$lcssa$i$i,$f)|0);
    }
    $w$30$i = $843 ? $w$1 : $840;
    $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $w$30$i;$l10n$0 = $l10n$3;
    continue L1;
    break;
   }
   case 111:  {
    $249 = $207;
    $250 = ($249|0)==(0);
    $251 = ($228|0)==(0);
    $252 = $250 & $251;
    if ($252) {
     $$0$lcssa$i43 = $2;
    } else {
     $$03$i40 = $2;$254 = $249;$258 = $228;
     while(1) {
      $253 = $254 & 7;
      $255 = $253 | 48;
      $256 = $255&255;
      $257 = (($$03$i40) + -1|0);
      HEAP8[$257>>0] = $256;
      $259 = (_bitshift64Lshr(($254|0),($258|0),3)|0);
      $260 = tempRet0;
      $261 = ($259|0)==(0);
      $262 = ($260|0)==(0);
      $263 = $261 & $262;
      if ($263) {
       $$0$lcssa$i43 = $257;
       break;
      } else {
       $$03$i40 = $257;$254 = $259;$258 = $260;
      }
     }
    }
    $264 = $fl$1$ & 8;
    $265 = ($264|0)==(0);
    if ($265) {
     $307 = $207;$310 = $228;$a$0 = $$0$lcssa$i43;$fl$4 = $fl$1$;$p$2 = $p$0;$pl$1 = 0;$prefix$1 = 9472;
     label = 94;
    } else {
     $$13 = $252 ? 9472 : ((9472 + 5|0));
     $266 = $252&1;
     $$14 = $266 ^ 1;
     $307 = $207;$310 = $228;$a$0 = $$0$lcssa$i43;$fl$4 = $fl$1$;$p$2 = $p$0;$pl$1 = $$14;$prefix$1 = $$13;
     label = 94;
    }
    break;
   }
   case 67:  {
    $331 = $207;
    HEAP32[$wc>>2] = $331;
    HEAP32[$5>>2] = 0;
    $1055 = $wc;$1056 = $wc;$p$4296 = -1;
    label = 104;
    break;
   }
   case 83:  {
    $332 = ($p$0|0)==(0);
    if ($332) {
     $1057 = $207;$1058 = $207;$i$0166 = 0;
     label = 110;
    } else {
     $1055 = $207;$1056 = $207;$p$4296 = $p$0;
     label = 104;
    }
    break;
   }
   case 99:  {
    $319 = $207;
    $320 = $319&255;
    HEAP8[$4>>0] = $320;
    $1053 = $228;$1054 = $207;$a$2 = $4;$fl$6 = $206;$p$5 = 1;$pl$2 = 0;$prefix$2 = 9472;$z$2 = $2;
    break;
   }
   case 109:  {
    $321 = (___errno_location()|0);
    $322 = HEAP32[$321>>2]|0;
    $323 = (_strerror(($322|0))|0);
    $a$1 = $323;
    label = 99;
    break;
   }
   case 115:  {
    $324 = ($207|0)==(0|0);
    $$17 = $324 ? 9488 : $207;
    $a$1 = $$17;
    label = 99;
    break;
   }
   case 105: case 100:  {
    $267 = $207;
    $268 = ($228|0)<(0);
    if ($268) {
     $269 = (_i64Subtract(0,0,($267|0),($228|0))|0);
     $270 = tempRet0;
     $271 = $269;
     $276 = $271;$278 = $270;$pl$0 = 1;$prefix$0 = 9472;
     label = 89;
     break L92;
    }
    $272 = $fl$1$ & 2048;
    $273 = ($272|0)==(0);
    if ($273) {
     $274 = $fl$1$ & 1;
     $275 = ($274|0)==(0);
     $$15 = $275 ? 9472 : ((9472 + 2|0));
     $276 = $207;$278 = $228;$pl$0 = $274;$prefix$0 = $$15;
     label = 89;
    } else {
     $276 = $207;$278 = $228;$pl$0 = 1;$prefix$0 = ((9472 + 1|0));
     label = 89;
    }
    break;
   }
   case 110:  {
    switch ($st$0|0) {
    case 4:  {
     $215 = $cnt$1&255;
     HEAP8[$207>>0] = $215;
     $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $36;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 6:  {
     HEAP32[$207>>2] = $cnt$1;
     $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $36;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 7:  {
     $216 = ($cnt$1|0)<(0);
     $217 = $216 << 31 >> 31;
     $218 = $207;
     $219 = $218;
     HEAP32[$219>>2] = $cnt$1;
     $220 = (($218) + 4)|0;
     $221 = $220;
     HEAP32[$221>>2] = $217;
     $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $36;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 0:  {
     HEAP32[$207>>2] = $cnt$1;
     $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $36;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 1:  {
     HEAP32[$207>>2] = $cnt$1;
     $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $36;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 2:  {
     $208 = ($cnt$1|0)<(0);
     $209 = $208 << 31 >> 31;
     $210 = $207;
     $211 = $210;
     HEAP32[$211>>2] = $cnt$1;
     $212 = (($210) + 4)|0;
     $213 = $212;
     HEAP32[$213>>2] = $209;
     $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $36;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 3:  {
     $214 = $cnt$1&65535;
     HEAP16[$207>>1] = $214;
     $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $36;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    default: {
     $1045 = $228;$1046 = $207;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $36;$l10n$0 = $l10n$3;
     continue L1;
    }
    }
    break;
   }
   case 112:  {
    $222 = ($p$0>>>0)>(8);
    $223 = $222 ? $p$0 : 8;
    $224 = $fl$1$ | 8;
    $fl$3 = $224;$p$1 = $223;$t$1 = 120;
    label = 77;
    break;
   }
   case 117:  {
    $276 = $207;$278 = $228;$pl$0 = 0;$prefix$0 = 9472;
    label = 89;
    break;
   }
   case 88: case 120:  {
    $fl$3 = $fl$1$;$p$1 = $p$0;$t$1 = $t$0;
    label = 77;
    break;
   }
   default: {
    $1053 = $228;$1054 = $207;$a$2 = $22;$fl$6 = $fl$1$;$p$5 = $p$0;$pl$2 = 0;$prefix$2 = 9472;$z$2 = $2;
   }
   }
  } while(0);
  L445: do {
   if ((label|0) == 77) {
    label = 0;
    $225 = $207;
    $226 = $t$1 & 32;
    $227 = ($225|0)==(0);
    $229 = ($228|0)==(0);
    $230 = $227 & $229;
    if ($230) {
     $307 = $207;$310 = $228;$a$0 = $2;$fl$4 = $fl$3;$p$2 = $p$1;$pl$1 = 0;$prefix$1 = 9472;
     label = 94;
    } else {
     $$012$i = $2;$232 = $225;$239 = $228;
     while(1) {
      $231 = $232 & 15;
      $233 = (9552 + ($231)|0);
      $234 = HEAP8[$233>>0]|0;
      $235 = $234&255;
      $236 = $235 | $226;
      $237 = $236&255;
      $238 = (($$012$i) + -1|0);
      HEAP8[$238>>0] = $237;
      $240 = (_bitshift64Lshr(($232|0),($239|0),4)|0);
      $241 = tempRet0;
      $242 = ($240|0)==(0);
      $243 = ($241|0)==(0);
      $244 = $242 & $243;
      if ($244) {
       break;
      } else {
       $$012$i = $238;$232 = $240;$239 = $241;
      }
     }
     $245 = $fl$3 & 8;
     $246 = ($245|0)==(0);
     if ($246) {
      $307 = $207;$310 = $228;$a$0 = $238;$fl$4 = $fl$3;$p$2 = $p$1;$pl$1 = 0;$prefix$1 = 9472;
      label = 94;
     } else {
      $247 = $t$1 >> 4;
      $248 = (9472 + ($247)|0);
      $307 = $207;$310 = $228;$a$0 = $238;$fl$4 = $fl$3;$p$2 = $p$1;$pl$1 = 2;$prefix$1 = $248;
      label = 94;
     }
    }
   }
   else if ((label|0) == 89) {
    label = 0;
    $277 = $276;
    $279 = ($278>>>0)>(0);
    $280 = ($278|0)==(0);
    $281 = ($277>>>0)>(4294967295);
    $282 = $280 & $281;
    $283 = $279 | $282;
    if ($283) {
     $$05$i = $2;$284 = $277;$285 = $278;
     while(1) {
      $286 = (___uremdi3(($284|0),($285|0),10,0)|0);
      $287 = tempRet0;
      $288 = $286 | 48;
      $289 = $288&255;
      $290 = (($$05$i) + -1|0);
      HEAP8[$290>>0] = $289;
      $291 = (___udivdi3(($284|0),($285|0),10,0)|0);
      $292 = tempRet0;
      $293 = ($285>>>0)>(9);
      $294 = ($285|0)==(9);
      $295 = ($284>>>0)>(4294967295);
      $296 = $294 & $295;
      $297 = $293 | $296;
      if ($297) {
       $$05$i = $290;$284 = $291;$285 = $292;
      } else {
       break;
      }
     }
     $$0$lcssa$i45 = $290;$$01$lcssa$off0$i = $291;
    } else {
     $$0$lcssa$i45 = $2;$$01$lcssa$off0$i = $277;
    }
    $298 = ($$01$lcssa$off0$i|0)==(0);
    if ($298) {
     $307 = $276;$310 = $278;$a$0 = $$0$lcssa$i45;$fl$4 = $fl$1$;$p$2 = $p$0;$pl$1 = $pl$0;$prefix$1 = $prefix$0;
     label = 94;
    } else {
     $$12$i = $$0$lcssa$i45;$y$03$i = $$01$lcssa$off0$i;
     while(1) {
      $299 = (($y$03$i>>>0) % 10)&-1;
      $300 = $299 | 48;
      $301 = $300&255;
      $302 = (($$12$i) + -1|0);
      HEAP8[$302>>0] = $301;
      $303 = (($y$03$i>>>0) / 10)&-1;
      $304 = ($y$03$i>>>0)<(10);
      if ($304) {
       $307 = $276;$310 = $278;$a$0 = $302;$fl$4 = $fl$1$;$p$2 = $p$0;$pl$1 = $pl$0;$prefix$1 = $prefix$0;
       label = 94;
       break;
      } else {
       $$12$i = $302;$y$03$i = $303;
      }
     }
    }
   }
   else if ((label|0) == 99) {
    label = 0;
    $325 = (_memchr($a$1,0,$p$0)|0);
    $326 = ($325|0)==(0|0);
    if ($326) {
     $327 = (($a$1) + ($p$0)|0);
     $1053 = $228;$1054 = $207;$a$2 = $a$1;$fl$6 = $206;$p$5 = $p$0;$pl$2 = 0;$prefix$2 = 9472;$z$2 = $327;
     break;
    } else {
     $328 = $325;
     $329 = $a$1;
     $330 = (($328) - ($329))|0;
     $1053 = $228;$1054 = $207;$a$2 = $a$1;$fl$6 = $206;$p$5 = $330;$pl$2 = 0;$prefix$2 = 9472;$z$2 = $325;
     break;
    }
   }
   else if ((label|0) == 104) {
    label = 0;
    $i$0168 = 0;$l$1167 = 0;$ws$0169 = $1055;
    while(1) {
     $336 = HEAP32[$ws$0169>>2]|0;
     $337 = ($336|0)==(0);
     if ($337) {
      $i$0$lcssa = $i$0168;$l$1$lcssa = $l$1167;
      break;
     }
     $338 = (_wctomb($mb,$336)|0);
     $339 = ($338|0)>(-1);
     if (!($339)) {
      $$0 = -1;
      label = 362;
      break L1;
     }
     $340 = (($p$4296) - ($i$0168))|0;
     $341 = ($338>>>0)>($340>>>0);
     $334 = (($338) + ($i$0168))|0;
     if ($341) {
      $1057 = $1055;$1058 = $1056;$i$0166 = $i$0168;
      label = 110;
      break L445;
     }
     $333 = (($ws$0169) + 4|0);
     $335 = ($334>>>0)<($p$4296>>>0);
     if ($335) {
      $i$0168 = $334;$l$1167 = $338;$ws$0169 = $333;
     } else {
      $i$0$lcssa = $334;$l$1$lcssa = $338;
      break;
     }
    }
    $342 = ($l$1$lcssa|0)<(0);
    if ($342) {
     $$0 = -1;
     label = 362;
     break L1;
    } else {
     $1057 = $1055;$1058 = $1056;$i$0166 = $i$0$lcssa;
     label = 110;
    }
   }
  } while(0);
  if ((label|0) == 94) {
   label = 0;
   $305 = ($p$2|0)>(-1);
   $306 = $fl$4 & -65537;
   $$fl$4 = $305 ? $306 : $fl$4;
   $308 = $307;
   $309 = ($308|0)==(0);
   $311 = ($310|0)==(0);
   $312 = $309 & $311;
   $313 = ($p$2|0)==(0);
   $or$cond = $312 & $313;
   if ($or$cond) {
    $1053 = $310;$1054 = $307;$a$2 = $2;$fl$6 = $$fl$4;$p$5 = 0;$pl$2 = $pl$1;$prefix$2 = $prefix$1;$z$2 = $2;
   } else {
    $314 = $a$0;
    $315 = (($3) - ($314))|0;
    $316 = $312&1;
    $317 = (($316) + ($315))|0;
    $318 = ($p$2|0)>($317|0);
    $p$2$ = $318 ? $p$2 : $317;
    $1053 = $310;$1054 = $307;$a$2 = $a$0;$fl$6 = $$fl$4;$p$5 = $p$2$;$pl$2 = $pl$1;$prefix$2 = $prefix$1;$z$2 = $2;
   }
  }
  else if ((label|0) == 110) {
   label = 0;
   $343 = $fl$1$ & 73728;
   $344 = ($343|0)==(0);
   $345 = ($i$0166|0)<($w$1|0);
   $or$cond$i56 = $344 & $345;
   if ($or$cond$i56) {
    $346 = (($w$1) - ($i$0166))|0;
    $347 = ($346>>>0)>(256);
    $348 = $347 ? 256 : $346;
    _memset(($pad$i|0),32,($348|0))|0;
    $349 = ($346>>>0)>(255);
    if ($349) {
     $$01$i57 = $346;
     while(1) {
      (___fwritex($pad$i,256,$f)|0);
      $350 = (($$01$i57) + -256)|0;
      $351 = ($350>>>0)>(255);
      if ($351) {
       $$01$i57 = $350;
      } else {
       $$0$lcssa$i59 = $350;
       break;
      }
     }
    } else {
     $$0$lcssa$i59 = $346;
    }
    (___fwritex($pad$i,$$0$lcssa$i59,$f)|0);
   }
   $352 = ($i$0166|0)==(0);
   L479: do {
    if (!($352)) {
     $i$1174 = 0;$ws$1175 = $1057;
     while(1) {
      $353 = HEAP32[$ws$1175>>2]|0;
      $354 = ($353|0)==(0);
      if ($354) {
       break L479;
      }
      $355 = (_wctomb($mb,$353)|0);
      $356 = (($355) + ($i$1174))|0;
      $357 = ($356|0)>($i$0166|0);
      if ($357) {
       break L479;
      }
      $358 = (($ws$1175) + 4|0);
      (___fwritex($mb,$355,$f)|0);
      $359 = ($356>>>0)<($i$0166>>>0);
      if ($359) {
       $i$1174 = $356;$ws$1175 = $358;
      } else {
       break;
      }
     }
    }
   } while(0);
   $360 = ($343|0)==(8192);
   $or$cond$i63 = $360 & $345;
   if ($or$cond$i63) {
    $361 = (($w$1) - ($i$0166))|0;
    $362 = ($361>>>0)>(256);
    $363 = $362 ? 256 : $361;
    _memset(($pad$i|0),32,($363|0))|0;
    $364 = ($361>>>0)>(255);
    if ($364) {
     $$01$i64 = $361;
     while(1) {
      (___fwritex($pad$i,256,$f)|0);
      $365 = (($$01$i64) + -256)|0;
      $366 = ($365>>>0)>(255);
      if ($366) {
       $$01$i64 = $365;
      } else {
       $$0$lcssa$i66 = $365;
       break;
      }
     }
    } else {
     $$0$lcssa$i66 = $361;
    }
    (___fwritex($pad$i,$$0$lcssa$i66,$f)|0);
   }
   $367 = $345 ? $w$1 : $i$0166;
   $1045 = $228;$1046 = $1058;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $367;$l10n$0 = $l10n$3;
   continue;
  }
  $942 = $z$2;
  $943 = $a$2;
  $944 = (($942) - ($943))|0;
  $945 = ($p$5|0)<($944|0);
  $$p$5 = $945 ? $944 : $p$5;
  $946 = (($pl$2) + ($$p$5))|0;
  $947 = ($w$1|0)<($946|0);
  $w$2 = $947 ? $946 : $w$1;
  $948 = $fl$6 & 73728;
  $949 = ($948|0)==(0);
  $950 = ($946|0)<($w$2|0);
  $or$cond$i73 = $949 & $950;
  if ($or$cond$i73) {
   $951 = (($w$2) - ($946))|0;
   $952 = ($951>>>0)>(256);
   $953 = $952 ? 256 : $951;
   _memset(($pad$i|0),32,($953|0))|0;
   $954 = ($951>>>0)>(255);
   if ($954) {
    $$01$i74 = $951;
    while(1) {
     (___fwritex($pad$i,256,$f)|0);
     $955 = (($$01$i74) + -256)|0;
     $956 = ($955>>>0)>(255);
     if ($956) {
      $$01$i74 = $955;
     } else {
      $$0$lcssa$i76 = $955;
      break;
     }
    }
   } else {
    $$0$lcssa$i76 = $951;
   }
   (___fwritex($pad$i,$$0$lcssa$i76,$f)|0);
  }
  (___fwritex($prefix$2,$pl$2,$f)|0);
  $957 = ($948|0)==(65536);
  $or$cond$i49 = $957 & $950;
  if ($or$cond$i49) {
   $958 = (($w$2) - ($946))|0;
   $959 = ($958>>>0)>(256);
   $960 = $959 ? 256 : $958;
   _memset(($pad$i|0),48,($960|0))|0;
   $961 = ($958>>>0)>(255);
   if ($961) {
    $$01$i50 = $958;
    while(1) {
     (___fwritex($pad$i,256,$f)|0);
     $962 = (($$01$i50) + -256)|0;
     $963 = ($962>>>0)>(255);
     if ($963) {
      $$01$i50 = $962;
     } else {
      $$0$lcssa$i52 = $962;
      break;
     }
    }
   } else {
    $$0$lcssa$i52 = $958;
   }
   (___fwritex($pad$i,$$0$lcssa$i52,$f)|0);
  }
  $964 = ($944|0)<($$p$5|0);
  if ($964) {
   $965 = (($$p$5) - ($944))|0;
   $966 = ($965>>>0)>(256);
   $967 = $966 ? 256 : $965;
   _memset(($pad$i|0),48,($967|0))|0;
   $968 = ($965>>>0)>(255);
   if ($968) {
    $$01$i35 = $965;
    while(1) {
     (___fwritex($pad$i,256,$f)|0);
     $969 = (($$01$i35) + -256)|0;
     $970 = ($969>>>0)>(255);
     if ($970) {
      $$01$i35 = $969;
     } else {
      $$0$lcssa$i37 = $969;
      break;
     }
    }
   } else {
    $$0$lcssa$i37 = $965;
   }
   (___fwritex($pad$i,$$0$lcssa$i37,$f)|0);
  }
  (___fwritex($a$2,$944,$f)|0);
  $971 = ($948|0)==(8192);
  $or$cond$i = $971 & $950;
  if (!($or$cond$i)) {
   $1045 = $1053;$1046 = $1054;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $w$2;$l10n$0 = $l10n$3;
   continue;
  }
  $972 = (($w$2) - ($946))|0;
  $973 = ($972>>>0)>(256);
  $974 = $973 ? 256 : $972;
  _memset(($pad$i|0),32,($974|0))|0;
  $975 = ($972>>>0)>(255);
  if ($975) {
   $$01$i = $972;
   while(1) {
    (___fwritex($pad$i,256,$f)|0);
    $976 = (($$01$i) + -256)|0;
    $977 = ($976>>>0)>(255);
    if ($977) {
     $$01$i = $976;
    } else {
     $$0$lcssa$i = $976;
     break;
    }
   }
  } else {
   $$0$lcssa$i = $972;
  }
  (___fwritex($pad$i,$$0$lcssa$i,$f)|0);
  $1045 = $1053;$1046 = $1054;$22 = $139;$cnt$0 = $cnt$1;$l$0 = $w$2;$l10n$0 = $l10n$3;
 }
 if ((label|0) == 344) {
  $978 = ($f|0)==(0|0);
  if (!($978)) {
   $$0 = $cnt$1;
   STACKTOP = sp;return ($$0|0);
  }
  $979 = ($l10n$0|0)==(0);
  if ($979) {
   $$0 = 0;
   STACKTOP = sp;return ($$0|0);
  } else {
   $i$289 = 1;
  }
  while(1) {
   $980 = (($nl_type) + ($i$289<<2)|0);
   $981 = HEAP32[$980>>2]|0;
   $982 = ($981|0)==(0);
   if ($982) {
    $i$388 = $i$289;
    break;
   }
   $983 = (($nl_arg) + ($i$289<<3)|0);
   $984 = ($981>>>0)>(20);
   L531: do {
    if (!($984)) {
     do {
      switch ($981|0) {
      case 11:  {
       $arglist_current41 = HEAP32[$ap>>2]|0;
       $993 = HEAP32[$arglist_current41>>2]|0;
       $arglist_next42 = (($arglist_current41) + 4|0);
       HEAP32[$ap>>2] = $arglist_next42;
       $994 = $983;
       $995 = $994;
       HEAP32[$995>>2] = $993;
       $996 = (($994) + 4)|0;
       $997 = $996;
       HEAP32[$997>>2] = 0;
       break L531;
       break;
      }
      case 12:  {
       $arglist_current44 = HEAP32[$ap>>2]|0;
       $998 = $arglist_current44;
       $999 = $998;
       $1000 = HEAP32[$999>>2]|0;
       $1001 = (($998) + 4)|0;
       $1002 = $1001;
       $1003 = HEAP32[$1002>>2]|0;
       $arglist_next45 = (($arglist_current44) + 8|0);
       HEAP32[$ap>>2] = $arglist_next45;
       $1004 = $983;
       $1005 = $1004;
       HEAP32[$1005>>2] = $1000;
       $1006 = (($1004) + 4)|0;
       $1007 = $1006;
       HEAP32[$1007>>2] = $1003;
       break L531;
       break;
      }
      case 13:  {
       $arglist_current47 = HEAP32[$ap>>2]|0;
       $1008 = HEAP32[$arglist_current47>>2]|0;
       $arglist_next48 = (($arglist_current47) + 4|0);
       HEAP32[$ap>>2] = $arglist_next48;
       $1009 = $1008&65535;
       $1010 = $1009 << 16 >> 16;
       $1011 = ($1010|0)<(0);
       $1012 = $1011 << 31 >> 31;
       $1013 = $983;
       $1014 = $1013;
       HEAP32[$1014>>2] = $1010;
       $1015 = (($1013) + 4)|0;
       $1016 = $1015;
       HEAP32[$1016>>2] = $1012;
       break L531;
       break;
      }
      case 14:  {
       $arglist_current50 = HEAP32[$ap>>2]|0;
       $1017 = HEAP32[$arglist_current50>>2]|0;
       $arglist_next51 = (($arglist_current50) + 4|0);
       HEAP32[$ap>>2] = $arglist_next51;
       $$mask1$i = $1017 & 65535;
       $1018 = $983;
       $1019 = $1018;
       HEAP32[$1019>>2] = $$mask1$i;
       $1020 = (($1018) + 4)|0;
       $1021 = $1020;
       HEAP32[$1021>>2] = 0;
       break L531;
       break;
      }
      case 15:  {
       $arglist_current53 = HEAP32[$ap>>2]|0;
       $1022 = HEAP32[$arglist_current53>>2]|0;
       $arglist_next54 = (($arglist_current53) + 4|0);
       HEAP32[$ap>>2] = $arglist_next54;
       $1023 = $1022&255;
       $1024 = $1023 << 24 >> 24;
       $1025 = ($1024|0)<(0);
       $1026 = $1025 << 31 >> 31;
       $1027 = $983;
       $1028 = $1027;
       HEAP32[$1028>>2] = $1024;
       $1029 = (($1027) + 4)|0;
       $1030 = $1029;
       HEAP32[$1030>>2] = $1026;
       break L531;
       break;
      }
      case 16:  {
       $arglist_current56 = HEAP32[$ap>>2]|0;
       $1031 = HEAP32[$arglist_current56>>2]|0;
       $arglist_next57 = (($arglist_current56) + 4|0);
       HEAP32[$ap>>2] = $arglist_next57;
       $$mask$i = $1031 & 255;
       $1032 = $983;
       $1033 = $1032;
       HEAP32[$1033>>2] = $$mask$i;
       $1034 = (($1032) + 4)|0;
       $1035 = $1034;
       HEAP32[$1035>>2] = 0;
       break L531;
       break;
      }
      case 17:  {
       $arglist_current59 = HEAP32[$ap>>2]|0;
       HEAP32[tempDoublePtr>>2]=HEAP32[$arglist_current59>>2];HEAP32[tempDoublePtr+4>>2]=HEAP32[$arglist_current59+4>>2];$1036 = +HEAPF64[tempDoublePtr>>3];
       $arglist_next60 = (($arglist_current59) + 8|0);
       HEAP32[$ap>>2] = $arglist_next60;
       HEAPF64[$983>>3] = $1036;
       break L531;
       break;
      }
      case 18:  {
       $arglist_current62 = HEAP32[$ap>>2]|0;
       HEAP32[tempDoublePtr>>2]=HEAP32[$arglist_current62>>2];HEAP32[tempDoublePtr+4>>2]=HEAP32[$arglist_current62+4>>2];$1037 = +HEAPF64[tempDoublePtr>>3];
       $arglist_next63 = (($arglist_current62) + 8|0);
       HEAP32[$ap>>2] = $arglist_next63;
       HEAPF64[$983>>3] = $1037;
       break L531;
       break;
      }
      case 9:  {
       $arglist_current35 = HEAP32[$ap>>2]|0;
       $985 = HEAP32[$arglist_current35>>2]|0;
       $arglist_next36 = (($arglist_current35) + 4|0);
       HEAP32[$ap>>2] = $arglist_next36;
       HEAP32[$983>>2] = $985;
       break L531;
       break;
      }
      case 10:  {
       $arglist_current38 = HEAP32[$ap>>2]|0;
       $986 = HEAP32[$arglist_current38>>2]|0;
       $arglist_next39 = (($arglist_current38) + 4|0);
       HEAP32[$ap>>2] = $arglist_next39;
       $987 = ($986|0)<(0);
       $988 = $987 << 31 >> 31;
       $989 = $983;
       $990 = $989;
       HEAP32[$990>>2] = $986;
       $991 = (($989) + 4)|0;
       $992 = $991;
       HEAP32[$992>>2] = $988;
       break L531;
       break;
      }
      default: {
       break L531;
      }
      }
     } while(0);
    }
   } while(0);
   $1038 = (($i$289) + 1)|0;
   $1039 = ($1038|0)<(10);
   if ($1039) {
    $i$289 = $1038;
   } else {
    $$0 = 1;
    label = 362;
    break;
   }
  }
  if ((label|0) == 362) {
   STACKTOP = sp;return ($$0|0);
  }
  while(1) {
   $1042 = (($nl_type) + ($i$388<<2)|0);
   $1043 = HEAP32[$1042>>2]|0;
   $1044 = ($1043|0)==(0);
   $1040 = (($i$388) + 1)|0;
   if (!($1044)) {
    $$0 = -1;
    label = 362;
    break;
   }
   $1041 = ($1040|0)<(10);
   if ($1041) {
    $i$388 = $1040;
   } else {
    $$0 = 1;
    label = 362;
    break;
   }
  }
  if ((label|0) == 362) {
   STACKTOP = sp;return ($$0|0);
  }
 }
 else if ((label|0) == 362) {
  STACKTOP = sp;return ($$0|0);
 }
 return 0|0;
}
function _vsnprintf($s,$n,$fmt,$ap) {
 $s = $s|0;
 $n = $n|0;
 $fmt = $fmt|0;
 $ap = $ap|0;
 var $$$02 = 0, $$0 = 0, $$01 = 0, $$02 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, $b = 0, $f = 0, dest = 0, label = 0, sp = 0, src = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 128|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $b = sp + 112|0;
 $f = sp;
 dest=$f+0|0; src=9576+0|0; stop=dest+112|0; do { HEAP32[dest>>2]=HEAP32[src>>2]|0; dest=dest+4|0; src=src+4|0; } while ((dest|0) < (stop|0));
 $0 = (($n) + -1)|0;
 $1 = ($0>>>0)>(2147483646);
 if ($1) {
  $2 = ($n|0)==(0);
  if ($2) {
   $$01 = $b;$$02 = 1;
  } else {
   $3 = (___errno_location()|0);
   HEAP32[$3>>2] = 75;
   $$0 = -1;
   STACKTOP = sp;return ($$0|0);
  }
 } else {
  $$01 = $s;$$02 = $n;
 }
 $4 = $$01;
 $5 = (-2 - ($4))|0;
 $6 = ($$02>>>0)>($5>>>0);
 $$$02 = $6 ? $5 : $$02;
 $7 = (($f) + 48|0);
 HEAP32[$7>>2] = $$$02;
 $8 = (($f) + 20|0);
 HEAP32[$8>>2] = $$01;
 $9 = (($f) + 44|0);
 HEAP32[$9>>2] = $$01;
 $10 = (($$01) + ($$$02)|0);
 $11 = (($f) + 16|0);
 HEAP32[$11>>2] = $10;
 $12 = (($f) + 28|0);
 HEAP32[$12>>2] = $10;
 $13 = (_MUSL_vfprintf($f,$fmt,$ap)|0);
 $14 = ($$$02|0)==(0);
 if ($14) {
  $$0 = $13;
  STACKTOP = sp;return ($$0|0);
 }
 $15 = HEAP32[$8>>2]|0;
 $16 = HEAP32[$11>>2]|0;
 $17 = ($15|0)==($16|0);
 $18 = $17 << 31 >> 31;
 $19 = (($15) + ($18)|0);
 HEAP8[$19>>0] = 0;
 $$0 = $13;
 STACKTOP = sp;return ($$0|0);
}
function _sn_write($f,$s,$l) {
 $f = $f|0;
 $s = $s|0;
 $l = $l|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $l$ = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($f) + 16|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = (($f) + 20|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = $1;
 $5 = $3;
 $6 = (($4) - ($5))|0;
 $7 = ($6>>>0)>($l>>>0);
 $l$ = $7 ? $l : $6;
 _memcpy(($3|0),($s|0),($l$|0))|0;
 $8 = HEAP32[$2>>2]|0;
 $9 = (($8) + ($l$)|0);
 HEAP32[$2>>2] = $9;
 STACKTOP = sp;return ($l|0);
}
function _vsprintf($s,$fmt,$ap) {
 $s = $s|0;
 $fmt = $fmt|0;
 $ap = $ap|0;
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (_vsnprintf($s,2147483647,$fmt,$ap)|0);
 STACKTOP = sp;return ($0|0);
}
function _atoi($s) {
 $s = $s|0;
 var $$0 = 0, $$1$ph = 0, $$12 = 0, $$neg1 = 0, $$pre = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0;
 var $22 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $n$0$lcssa = 0, $n$03 = 0, $neg$0 = 0, $neg$1$ph = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $$0 = $s;
 while(1) {
  $0 = HEAP8[$$0>>0]|0;
  $1 = $0 << 24 >> 24;
  $2 = (_isspace($1)|0);
  $3 = ($2|0)==(0);
  $4 = (($$0) + 1|0);
  if ($3) {
   break;
  } else {
   $$0 = $4;
  }
 }
 $5 = HEAP8[$$0>>0]|0;
 $6 = $5 << 24 >> 24;
 if ((($6|0) == 43)) {
  $neg$0 = 0;
  label = 5;
 } else if ((($6|0) == 45)) {
  $neg$0 = 1;
  label = 5;
 } else {
  $$1$ph = $$0;$8 = $5;$neg$1$ph = 0;
 }
 if ((label|0) == 5) {
  $$pre = HEAP8[$4>>0]|0;
  $$1$ph = $4;$8 = $$pre;$neg$1$ph = $neg$0;
 }
 $7 = $8 << 24 >> 24;
 $9 = (_isdigit($7)|0);
 $10 = ($9|0)==(0);
 if ($10) {
  $n$0$lcssa = 0;
  $20 = ($neg$1$ph|0)!=(0);
  $21 = (0 - ($n$0$lcssa))|0;
  $22 = $20 ? $n$0$lcssa : $21;
  STACKTOP = sp;return ($22|0);
 } else {
  $$12 = $$1$ph;$n$03 = 0;
 }
 while(1) {
  $11 = ($n$03*10)|0;
  $12 = (($$12) + 1|0);
  $13 = HEAP8[$$12>>0]|0;
  $14 = $13 << 24 >> 24;
  $$neg1 = (($11) + 48)|0;
  $15 = (($$neg1) - ($14))|0;
  $16 = HEAP8[$12>>0]|0;
  $17 = $16 << 24 >> 24;
  $18 = (_isdigit($17)|0);
  $19 = ($18|0)==(0);
  if ($19) {
   $n$0$lcssa = $15;
   break;
  } else {
   $$12 = $12;$n$03 = $15;
  }
 }
 $20 = ($neg$1$ph|0)!=(0);
 $21 = (0 - ($n$0$lcssa))|0;
 $22 = $20 ? $n$0$lcssa : $21;
 STACKTOP = sp;return ($22|0);
}
function _memchr($src,$c,$n) {
 $src = $src|0;
 $c = $c|0;
 $n = $n|0;
 var $$0$lcssa = 0, $$0$lcssa34 = 0, $$013 = 0, $$1$lcssa = 0, $$17 = 0, $$24 = 0, $$3 = 0, $$lcssa = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0;
 var $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $4 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, $or$cond12 = 0, $s$0$lcssa = 0, $s$0$lcssa33 = 0, $s$014 = 0, $s$15 = 0, $s$2 = 0, $w$0$lcssa = 0, $w$08 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $c & 255;
 $1 = $src;
 $2 = $1 & 3;
 $3 = ($2|0)==(0);
 $4 = ($n|0)==(0);
 $or$cond12 = $3 | $4;
 L1: do {
  if ($or$cond12) {
   $$0$lcssa = $n;$$lcssa = $4;$s$0$lcssa = $src;
   label = 5;
  } else {
   $5 = $c&255;
   $$013 = $n;$s$014 = $src;
   while(1) {
    $6 = HEAP8[$s$014>>0]|0;
    $7 = ($6<<24>>24)==($5<<24>>24);
    if ($7) {
     $$0$lcssa34 = $$013;$s$0$lcssa33 = $s$014;
     label = 6;
     break L1;
    }
    $8 = (($s$014) + 1|0);
    $9 = (($$013) + -1)|0;
    $10 = $8;
    $11 = $10 & 3;
    $12 = ($11|0)==(0);
    $13 = ($9|0)==(0);
    $or$cond = $12 | $13;
    if ($or$cond) {
     $$0$lcssa = $9;$$lcssa = $13;$s$0$lcssa = $8;
     label = 5;
     break;
    } else {
     $$013 = $9;$s$014 = $8;
    }
   }
  }
 } while(0);
 if ((label|0) == 5) {
  if ($$lcssa) {
   $$3 = 0;$s$2 = $s$0$lcssa;
  } else {
   $$0$lcssa34 = $$0$lcssa;$s$0$lcssa33 = $s$0$lcssa;
   label = 6;
  }
 }
 L8: do {
  if ((label|0) == 6) {
   $14 = HEAP8[$s$0$lcssa33>>0]|0;
   $15 = $c&255;
   $16 = ($14<<24>>24)==($15<<24>>24);
   if ($16) {
    $$3 = $$0$lcssa34;$s$2 = $s$0$lcssa33;
   } else {
    $17 = Math_imul($0, 16843009)|0;
    $18 = ($$0$lcssa34>>>0)>(3);
    L11: do {
     if ($18) {
      $$17 = $$0$lcssa34;$w$08 = $s$0$lcssa33;
      while(1) {
       $19 = HEAP32[$w$08>>2]|0;
       $20 = $19 ^ $17;
       $21 = (($20) + -16843009)|0;
       $22 = $20 & -2139062144;
       $23 = $22 ^ -2139062144;
       $24 = $23 & $21;
       $25 = ($24|0)==(0);
       if (!($25)) {
        $$1$lcssa = $$17;$w$0$lcssa = $w$08;
        break L11;
       }
       $26 = (($w$08) + 4|0);
       $27 = (($$17) + -4)|0;
       $28 = ($27>>>0)>(3);
       if ($28) {
        $$17 = $27;$w$08 = $26;
       } else {
        $$1$lcssa = $27;$w$0$lcssa = $26;
        break;
       }
      }
     } else {
      $$1$lcssa = $$0$lcssa34;$w$0$lcssa = $s$0$lcssa33;
     }
    } while(0);
    $29 = ($$1$lcssa|0)==(0);
    if ($29) {
     $$3 = 0;$s$2 = $w$0$lcssa;
    } else {
     $$24 = $$1$lcssa;$s$15 = $w$0$lcssa;
     while(1) {
      $30 = HEAP8[$s$15>>0]|0;
      $31 = ($30<<24>>24)==($15<<24>>24);
      if ($31) {
       $$3 = $$24;$s$2 = $s$15;
       break L8;
      }
      $32 = (($s$15) + 1|0);
      $33 = (($$24) + -1)|0;
      $34 = ($33|0)==(0);
      if ($34) {
       $$3 = 0;$s$2 = $32;
       break;
      } else {
       $$24 = $33;$s$15 = $32;
      }
     }
    }
   }
  }
 } while(0);
 $35 = ($$3|0)!=(0);
 $36 = $35 ? $s$2 : 0;
 STACKTOP = sp;return ($36|0);
}
function _memcmp($vl,$vr,$n) {
 $vl = $vl|0;
 $vr = $vr|0;
 $n = $n|0;
 var $$03 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $l$04 = 0, $r$05 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($n|0)==(0);
 L1: do {
  if ($0) {
   $11 = 0;
  } else {
   $$03 = $n;$l$04 = $vl;$r$05 = $vr;
   while(1) {
    $1 = HEAP8[$l$04>>0]|0;
    $2 = HEAP8[$r$05>>0]|0;
    $3 = ($1<<24>>24)==($2<<24>>24);
    if (!($3)) {
     break;
    }
    $4 = (($$03) + -1)|0;
    $5 = (($l$04) + 1|0);
    $6 = (($r$05) + 1|0);
    $7 = ($4|0)==(0);
    if ($7) {
     $11 = 0;
     break L1;
    } else {
     $$03 = $4;$l$04 = $5;$r$05 = $6;
    }
   }
   $8 = $1&255;
   $9 = $2&255;
   $10 = (($8) - ($9))|0;
   $11 = $10;
  }
 } while(0);
 STACKTOP = sp;return ($11|0);
}
function _strcmp($l,$r) {
 $l = $l|0;
 $r = $r|0;
 var $$014 = 0, $$05 = 0, $$lcssa = 0, $$lcssa2 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, $or$cond3 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 $0 = HEAP8[$l>>0]|0;
 $1 = HEAP8[$r>>0]|0;
 $2 = ($0<<24>>24)!=($1<<24>>24);
 $3 = ($0<<24>>24)==(0);
 $or$cond3 = $2 | $3;
 if ($or$cond3) {
  $$lcssa = $0;$$lcssa2 = $1;
 } else {
  $$014 = $l;$$05 = $r;
  while(1) {
   $4 = (($$014) + 1|0);
   $5 = (($$05) + 1|0);
   $6 = HEAP8[$4>>0]|0;
   $7 = HEAP8[$5>>0]|0;
   $8 = ($6<<24>>24)!=($7<<24>>24);
   $9 = ($6<<24>>24)==(0);
   $or$cond = $8 | $9;
   if ($or$cond) {
    $$lcssa = $6;$$lcssa2 = $7;
    break;
   } else {
    $$014 = $4;$$05 = $5;
   }
  }
 }
 $10 = $$lcssa&255;
 $11 = $$lcssa2&255;
 $12 = (($10) - ($11))|0;
 STACKTOP = sp;return ($12|0);
}
function _strncmp($_l,$_r,$n) {
 $_l = $_l|0;
 $_r = $_r|0;
 $n = $n|0;
 var $$03 = 0, $$08 = 0, $$08$in = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $l$06 = 0, $notlhs = 0;
 var $notrhs = 0, $or$cond$not = 0, $or$cond4 = 0, $r$0$lcssa = 0, $r$07 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($n|0)==(0);
 if ($0) {
  $$03 = 0;
  STACKTOP = sp;return ($$03|0);
 }
 $1 = HEAP8[$_l>>0]|0;
 $2 = ($1<<24>>24)==(0);
 L4: do {
  if ($2) {
   $11 = 0;$r$0$lcssa = $_r;
  } else {
   $$08$in = $n;$4 = $1;$l$06 = $_l;$r$07 = $_r;
   while(1) {
    $$08 = (($$08$in) + -1)|0;
    $3 = HEAP8[$r$07>>0]|0;
    $notlhs = ($3<<24>>24)!=(0);
    $notrhs = ($$08|0)!=(0);
    $or$cond$not = $notrhs & $notlhs;
    $5 = ($4<<24>>24)==($3<<24>>24);
    $or$cond4 = $or$cond$not & $5;
    if (!($or$cond4)) {
     $11 = $4;$r$0$lcssa = $r$07;
     break L4;
    }
    $6 = (($l$06) + 1|0);
    $7 = (($r$07) + 1|0);
    $8 = HEAP8[$6>>0]|0;
    $9 = ($8<<24>>24)==(0);
    if ($9) {
     $11 = 0;$r$0$lcssa = $7;
     break;
    } else {
     $$08$in = $$08;$4 = $8;$l$06 = $6;$r$07 = $7;
    }
   }
  }
 } while(0);
 $10 = $11&255;
 $12 = HEAP8[$r$0$lcssa>>0]|0;
 $13 = $12&255;
 $14 = (($10) - ($13))|0;
 $$03 = $14;
 STACKTOP = sp;return ($$03|0);
}
function runPostSets() {
 
}
function _i64Subtract(a, b, c, d) {
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a - c)>>>0;
    h = (b - d)>>>0;
    h = (b - d - (((c>>>0) > (a>>>0))|0))>>>0; // Borrow one from high word to low word on underflow.
    return ((tempRet0 = h,l|0)|0);
}
function _bitshift64Shl(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = (high << bits) | ((low&(ander << (32 - bits))) >>> (32 - bits));
      return low << bits;
    }
    tempRet0 = low << (bits - 32);
    return 0;
}
function _strlen(ptr) {
    ptr = ptr|0;
    var curr = 0;
    curr = ptr;
    while (((HEAP8[((curr)>>0)])|0)) {
      curr = (curr + 1)|0;
    }
    return (curr - ptr)|0;
}
function _i64Add(a, b, c, d) {
    /*
      x = a + b*2^32
      y = c + d*2^32
      result = l + h*2^32
    */
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a + c)>>>0;
    h = (b + d + (((l>>>0) < (a>>>0))|0))>>>0; // Add carry from low word to high word on overflow.
    return ((tempRet0 = h,l|0)|0);
}
function _bitshift64Lshr(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = high >>> bits;
      return (low >>> bits) | ((high&ander) << (32 - bits));
    }
    tempRet0 = 0;
    return (high >>> (bits - 32))|0;
}
function _memset(ptr, value, num) {
    ptr = ptr|0; value = value|0; num = num|0;
    var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
    stop = (ptr + num)|0;
    if ((num|0) >= 20) {
      // This is unaligned, but quite large, so work hard to get to aligned settings
      value = value & 0xff;
      unaligned = ptr & 3;
      value4 = value | (value << 8) | (value << 16) | (value << 24);
      stop4 = stop & ~3;
      if (unaligned) {
        unaligned = (ptr + 4 - unaligned)|0;
        while ((ptr|0) < (unaligned|0)) { // no need to check for stop, since we have large num
          HEAP8[((ptr)>>0)]=value;
          ptr = (ptr+1)|0;
        }
      }
      while ((ptr|0) < (stop4|0)) {
        HEAP32[((ptr)>>2)]=value4;
        ptr = (ptr+4)|0;
      }
    }
    while ((ptr|0) < (stop|0)) {
      HEAP8[((ptr)>>0)]=value;
      ptr = (ptr+1)|0;
    }
    return (ptr-num)|0;
}
function _memcpy(dest, src, num) {

    dest = dest|0; src = src|0; num = num|0;
    var ret = 0;
    if ((num|0) >= 4096) return _emscripten_memcpy_big(dest|0, src|0, num|0)|0;
    ret = dest|0;
    if ((dest&3) == (src&3)) {
      while (dest & 3) {
        if ((num|0) == 0) return ret|0;
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
        dest = (dest+1)|0;
        src = (src+1)|0;
        num = (num-1)|0;
      }
      while ((num|0) >= 4) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
        num = (num-4)|0;
      }
    }
    while ((num|0) > 0) {
      HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
      dest = (dest+1)|0;
      src = (src+1)|0;
      num = (num-1)|0;
    }
    return ret|0;
}
function _memmove(dest, src, num) {
    dest = dest|0; src = src|0; num = num|0;
    var ret = 0;
    if (((src|0) < (dest|0)) & ((dest|0) < ((src + num)|0))) {
      // Unlikely case: Copy backwards in a safe manner
      ret = dest;
      src = (src + num)|0;
      dest = (dest + num)|0;
      while ((num|0) > 0) {
        dest = (dest - 1)|0;
        src = (src - 1)|0;
        num = (num - 1)|0;
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
      }
      dest = ret;
    } else {
      _memcpy(dest, src, num) | 0;
    }
    return dest | 0;
}
function _strcpy(pdest, psrc) {
    pdest = pdest|0; psrc = psrc|0;
    var i = 0;
    do {
      HEAP8[(((pdest+i)|0)>>0)]=HEAP8[(((psrc+i)|0)>>0)];
      i = (i+1)|0;
    } while (((HEAP8[(((psrc)+(i-1))>>0)])|0));
    return pdest|0;
}
function _bitshift64Ashr(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = high >> bits;
      return (low >>> bits) | ((high&ander) << (32 - bits));
    }
    tempRet0 = (high|0) < 0 ? -1 : 0;
    return (high >> (bits - 32))|0;
  }
function _llvm_ctlz_i32(x) {
    x = x|0;
    var ret = 0;
    ret = ((HEAP8[(((ctlz_i8)+(x >>> 24))>>0)])|0);
    if ((ret|0) < 8) return ret|0;
    ret = ((HEAP8[(((ctlz_i8)+((x >> 16)&0xff))>>0)])|0);
    if ((ret|0) < 8) return (ret + 8)|0;
    ret = ((HEAP8[(((ctlz_i8)+((x >> 8)&0xff))>>0)])|0);
    if ((ret|0) < 8) return (ret + 16)|0;
    return (((HEAP8[(((ctlz_i8)+(x&0xff))>>0)])|0) + 24)|0;
  }

function _llvm_cttz_i32(x) {
    x = x|0;
    var ret = 0;
    ret = ((HEAP8[(((cttz_i8)+(x & 0xff))>>0)])|0);
    if ((ret|0) < 8) return ret|0;
    ret = ((HEAP8[(((cttz_i8)+((x >> 8)&0xff))>>0)])|0);
    if ((ret|0) < 8) return (ret + 8)|0;
    ret = ((HEAP8[(((cttz_i8)+((x >> 16)&0xff))>>0)])|0);
    if ((ret|0) < 8) return (ret + 16)|0;
    return (((HEAP8[(((cttz_i8)+(x >>> 24))>>0)])|0) + 24)|0;
  }

// ======== compiled code from system/lib/compiler-rt , see readme therein
function ___muldsi3($a, $b) {
  $a = $a | 0;
  $b = $b | 0;
  var $1 = 0, $2 = 0, $3 = 0, $6 = 0, $8 = 0, $11 = 0, $12 = 0;
  $1 = $a & 65535;
  $2 = $b & 65535;
  $3 = Math_imul($2, $1) | 0;
  $6 = $a >>> 16;
  $8 = ($3 >>> 16) + (Math_imul($2, $6) | 0) | 0;
  $11 = $b >>> 16;
  $12 = Math_imul($11, $1) | 0;
  return (tempRet0 = (($8 >>> 16) + (Math_imul($11, $6) | 0) | 0) + ((($8 & 65535) + $12 | 0) >>> 16) | 0, 0 | ($8 + $12 << 16 | $3 & 65535)) | 0;
}
function ___divdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $1$0 = 0, $1$1 = 0, $2$0 = 0, $2$1 = 0, $4$0 = 0, $4$1 = 0, $6$0 = 0, $7$0 = 0, $7$1 = 0, $8$0 = 0, $10$0 = 0;
  $1$0 = $a$1 >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $1$1 = (($a$1 | 0) < 0 ? -1 : 0) >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $2$0 = $b$1 >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $2$1 = (($b$1 | 0) < 0 ? -1 : 0) >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $4$0 = _i64Subtract($1$0 ^ $a$0, $1$1 ^ $a$1, $1$0, $1$1) | 0;
  $4$1 = tempRet0;
  $6$0 = _i64Subtract($2$0 ^ $b$0, $2$1 ^ $b$1, $2$0, $2$1) | 0;
  $7$0 = $2$0 ^ $1$0;
  $7$1 = $2$1 ^ $1$1;
  $8$0 = ___udivmoddi4($4$0, $4$1, $6$0, tempRet0, 0) | 0;
  $10$0 = _i64Subtract($8$0 ^ $7$0, tempRet0 ^ $7$1, $7$0, $7$1) | 0;
  return (tempRet0 = tempRet0, $10$0) | 0;
}
function ___remdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $rem = 0, $1$0 = 0, $1$1 = 0, $2$0 = 0, $2$1 = 0, $4$0 = 0, $4$1 = 0, $6$0 = 0, $10$0 = 0, $10$1 = 0, __stackBase__ = 0;
  __stackBase__ = STACKTOP;
  STACKTOP = STACKTOP + 8 | 0;
  $rem = __stackBase__ | 0;
  $1$0 = $a$1 >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $1$1 = (($a$1 | 0) < 0 ? -1 : 0) >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $2$0 = $b$1 >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $2$1 = (($b$1 | 0) < 0 ? -1 : 0) >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $4$0 = _i64Subtract($1$0 ^ $a$0, $1$1 ^ $a$1, $1$0, $1$1) | 0;
  $4$1 = tempRet0;
  $6$0 = _i64Subtract($2$0 ^ $b$0, $2$1 ^ $b$1, $2$0, $2$1) | 0;
  ___udivmoddi4($4$0, $4$1, $6$0, tempRet0, $rem) | 0;
  $10$0 = _i64Subtract(HEAP32[$rem >> 2] ^ $1$0, HEAP32[$rem + 4 >> 2] ^ $1$1, $1$0, $1$1) | 0;
  $10$1 = tempRet0;
  STACKTOP = __stackBase__;
  return (tempRet0 = $10$1, $10$0) | 0;
}
function ___muldi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $x_sroa_0_0_extract_trunc = 0, $y_sroa_0_0_extract_trunc = 0, $1$0 = 0, $1$1 = 0, $2 = 0;
  $x_sroa_0_0_extract_trunc = $a$0;
  $y_sroa_0_0_extract_trunc = $b$0;
  $1$0 = ___muldsi3($x_sroa_0_0_extract_trunc, $y_sroa_0_0_extract_trunc) | 0;
  $1$1 = tempRet0;
  $2 = Math_imul($a$1, $y_sroa_0_0_extract_trunc) | 0;
  return (tempRet0 = ((Math_imul($b$1, $x_sroa_0_0_extract_trunc) | 0) + $2 | 0) + $1$1 | $1$1 & 0, 0 | $1$0 & -1) | 0;
}
function ___udivdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $1$0 = 0;
  $1$0 = ___udivmoddi4($a$0, $a$1, $b$0, $b$1, 0) | 0;
  return (tempRet0 = tempRet0, $1$0) | 0;
}
function ___uremdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $rem = 0, __stackBase__ = 0;
  __stackBase__ = STACKTOP;
  STACKTOP = STACKTOP + 8 | 0;
  $rem = __stackBase__ | 0;
  ___udivmoddi4($a$0, $a$1, $b$0, $b$1, $rem) | 0;
  STACKTOP = __stackBase__;
  return (tempRet0 = HEAP32[$rem + 4 >> 2] | 0, HEAP32[$rem >> 2] | 0) | 0;
}
function ___udivmoddi4($a$0, $a$1, $b$0, $b$1, $rem) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  $rem = $rem | 0;
  var $n_sroa_0_0_extract_trunc = 0, $n_sroa_1_4_extract_shift$0 = 0, $n_sroa_1_4_extract_trunc = 0, $d_sroa_0_0_extract_trunc = 0, $d_sroa_1_4_extract_shift$0 = 0, $d_sroa_1_4_extract_trunc = 0, $4 = 0, $17 = 0, $37 = 0, $49 = 0, $51 = 0, $57 = 0, $58 = 0, $66 = 0, $78 = 0, $86 = 0, $88 = 0, $89 = 0, $91 = 0, $92 = 0, $95 = 0, $105 = 0, $117 = 0, $119 = 0, $125 = 0, $126 = 0, $130 = 0, $q_sroa_1_1_ph = 0, $q_sroa_0_1_ph = 0, $r_sroa_1_1_ph = 0, $r_sroa_0_1_ph = 0, $sr_1_ph = 0, $d_sroa_0_0_insert_insert99$0 = 0, $d_sroa_0_0_insert_insert99$1 = 0, $137$0 = 0, $137$1 = 0, $carry_0203 = 0, $sr_1202 = 0, $r_sroa_0_1201 = 0, $r_sroa_1_1200 = 0, $q_sroa_0_1199 = 0, $q_sroa_1_1198 = 0, $147 = 0, $149 = 0, $r_sroa_0_0_insert_insert42$0 = 0, $r_sroa_0_0_insert_insert42$1 = 0, $150$1 = 0, $151$0 = 0, $152 = 0, $154$0 = 0, $r_sroa_0_0_extract_trunc = 0, $r_sroa_1_4_extract_trunc = 0, $155 = 0, $carry_0_lcssa$0 = 0, $carry_0_lcssa$1 = 0, $r_sroa_0_1_lcssa = 0, $r_sroa_1_1_lcssa = 0, $q_sroa_0_1_lcssa = 0, $q_sroa_1_1_lcssa = 0, $q_sroa_0_0_insert_ext75$0 = 0, $q_sroa_0_0_insert_ext75$1 = 0, $q_sroa_0_0_insert_insert77$1 = 0, $_0$0 = 0, $_0$1 = 0;
  $n_sroa_0_0_extract_trunc = $a$0;
  $n_sroa_1_4_extract_shift$0 = $a$1;
  $n_sroa_1_4_extract_trunc = $n_sroa_1_4_extract_shift$0;
  $d_sroa_0_0_extract_trunc = $b$0;
  $d_sroa_1_4_extract_shift$0 = $b$1;
  $d_sroa_1_4_extract_trunc = $d_sroa_1_4_extract_shift$0;
  if (($n_sroa_1_4_extract_trunc | 0) == 0) {
    $4 = ($rem | 0) != 0;
    if (($d_sroa_1_4_extract_trunc | 0) == 0) {
      if ($4) {
        HEAP32[$rem >> 2] = ($n_sroa_0_0_extract_trunc >>> 0) % ($d_sroa_0_0_extract_trunc >>> 0);
        HEAP32[$rem + 4 >> 2] = 0;
      }
      $_0$1 = 0;
      $_0$0 = ($n_sroa_0_0_extract_trunc >>> 0) / ($d_sroa_0_0_extract_trunc >>> 0) >>> 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    } else {
      if (!$4) {
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      HEAP32[$rem >> 2] = $a$0 & -1;
      HEAP32[$rem + 4 >> 2] = $a$1 & 0;
      $_0$1 = 0;
      $_0$0 = 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    }
  }
  $17 = ($d_sroa_1_4_extract_trunc | 0) == 0;
  do {
    if (($d_sroa_0_0_extract_trunc | 0) == 0) {
      if ($17) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = ($n_sroa_1_4_extract_trunc >>> 0) % ($d_sroa_0_0_extract_trunc >>> 0);
          HEAP32[$rem + 4 >> 2] = 0;
        }
        $_0$1 = 0;
        $_0$0 = ($n_sroa_1_4_extract_trunc >>> 0) / ($d_sroa_0_0_extract_trunc >>> 0) >>> 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      if (($n_sroa_0_0_extract_trunc | 0) == 0) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = 0;
          HEAP32[$rem + 4 >> 2] = ($n_sroa_1_4_extract_trunc >>> 0) % ($d_sroa_1_4_extract_trunc >>> 0);
        }
        $_0$1 = 0;
        $_0$0 = ($n_sroa_1_4_extract_trunc >>> 0) / ($d_sroa_1_4_extract_trunc >>> 0) >>> 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $37 = $d_sroa_1_4_extract_trunc - 1 | 0;
      if (($37 & $d_sroa_1_4_extract_trunc | 0) == 0) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = 0 | $a$0 & -1;
          HEAP32[$rem + 4 >> 2] = $37 & $n_sroa_1_4_extract_trunc | $a$1 & 0;
        }
        $_0$1 = 0;
        $_0$0 = $n_sroa_1_4_extract_trunc >>> ((_llvm_cttz_i32($d_sroa_1_4_extract_trunc | 0) | 0) >>> 0);
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $49 = _llvm_ctlz_i32($d_sroa_1_4_extract_trunc | 0) | 0;
      $51 = $49 - (_llvm_ctlz_i32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
      if ($51 >>> 0 <= 30) {
        $57 = $51 + 1 | 0;
        $58 = 31 - $51 | 0;
        $sr_1_ph = $57;
        $r_sroa_0_1_ph = $n_sroa_1_4_extract_trunc << $58 | $n_sroa_0_0_extract_trunc >>> ($57 >>> 0);
        $r_sroa_1_1_ph = $n_sroa_1_4_extract_trunc >>> ($57 >>> 0);
        $q_sroa_0_1_ph = 0;
        $q_sroa_1_1_ph = $n_sroa_0_0_extract_trunc << $58;
        break;
      }
      if (($rem | 0) == 0) {
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      HEAP32[$rem >> 2] = 0 | $a$0 & -1;
      HEAP32[$rem + 4 >> 2] = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
      $_0$1 = 0;
      $_0$0 = 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    } else {
      if (!$17) {
        $117 = _llvm_ctlz_i32($d_sroa_1_4_extract_trunc | 0) | 0;
        $119 = $117 - (_llvm_ctlz_i32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
        if ($119 >>> 0 <= 31) {
          $125 = $119 + 1 | 0;
          $126 = 31 - $119 | 0;
          $130 = $119 - 31 >> 31;
          $sr_1_ph = $125;
          $r_sroa_0_1_ph = $n_sroa_0_0_extract_trunc >>> ($125 >>> 0) & $130 | $n_sroa_1_4_extract_trunc << $126;
          $r_sroa_1_1_ph = $n_sroa_1_4_extract_trunc >>> ($125 >>> 0) & $130;
          $q_sroa_0_1_ph = 0;
          $q_sroa_1_1_ph = $n_sroa_0_0_extract_trunc << $126;
          break;
        }
        if (($rem | 0) == 0) {
          $_0$1 = 0;
          $_0$0 = 0;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
        HEAP32[$rem >> 2] = 0 | $a$0 & -1;
        HEAP32[$rem + 4 >> 2] = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $66 = $d_sroa_0_0_extract_trunc - 1 | 0;
      if (($66 & $d_sroa_0_0_extract_trunc | 0) != 0) {
        $86 = (_llvm_ctlz_i32($d_sroa_0_0_extract_trunc | 0) | 0) + 33 | 0;
        $88 = $86 - (_llvm_ctlz_i32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
        $89 = 64 - $88 | 0;
        $91 = 32 - $88 | 0;
        $92 = $91 >> 31;
        $95 = $88 - 32 | 0;
        $105 = $95 >> 31;
        $sr_1_ph = $88;
        $r_sroa_0_1_ph = $91 - 1 >> 31 & $n_sroa_1_4_extract_trunc >>> ($95 >>> 0) | ($n_sroa_1_4_extract_trunc << $91 | $n_sroa_0_0_extract_trunc >>> ($88 >>> 0)) & $105;
        $r_sroa_1_1_ph = $105 & $n_sroa_1_4_extract_trunc >>> ($88 >>> 0);
        $q_sroa_0_1_ph = $n_sroa_0_0_extract_trunc << $89 & $92;
        $q_sroa_1_1_ph = ($n_sroa_1_4_extract_trunc << $89 | $n_sroa_0_0_extract_trunc >>> ($95 >>> 0)) & $92 | $n_sroa_0_0_extract_trunc << $91 & $88 - 33 >> 31;
        break;
      }
      if (($rem | 0) != 0) {
        HEAP32[$rem >> 2] = $66 & $n_sroa_0_0_extract_trunc;
        HEAP32[$rem + 4 >> 2] = 0;
      }
      if (($d_sroa_0_0_extract_trunc | 0) == 1) {
        $_0$1 = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
        $_0$0 = 0 | $a$0 & -1;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      } else {
        $78 = _llvm_cttz_i32($d_sroa_0_0_extract_trunc | 0) | 0;
        $_0$1 = 0 | $n_sroa_1_4_extract_trunc >>> ($78 >>> 0);
        $_0$0 = $n_sroa_1_4_extract_trunc << 32 - $78 | $n_sroa_0_0_extract_trunc >>> ($78 >>> 0) | 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
    }
  } while (0);
  if (($sr_1_ph | 0) == 0) {
    $q_sroa_1_1_lcssa = $q_sroa_1_1_ph;
    $q_sroa_0_1_lcssa = $q_sroa_0_1_ph;
    $r_sroa_1_1_lcssa = $r_sroa_1_1_ph;
    $r_sroa_0_1_lcssa = $r_sroa_0_1_ph;
    $carry_0_lcssa$1 = 0;
    $carry_0_lcssa$0 = 0;
  } else {
    $d_sroa_0_0_insert_insert99$0 = 0 | $b$0 & -1;
    $d_sroa_0_0_insert_insert99$1 = $d_sroa_1_4_extract_shift$0 | $b$1 & 0;
    $137$0 = _i64Add($d_sroa_0_0_insert_insert99$0, $d_sroa_0_0_insert_insert99$1, -1, -1) | 0;
    $137$1 = tempRet0;
    $q_sroa_1_1198 = $q_sroa_1_1_ph;
    $q_sroa_0_1199 = $q_sroa_0_1_ph;
    $r_sroa_1_1200 = $r_sroa_1_1_ph;
    $r_sroa_0_1201 = $r_sroa_0_1_ph;
    $sr_1202 = $sr_1_ph;
    $carry_0203 = 0;
    while (1) {
      $147 = $q_sroa_0_1199 >>> 31 | $q_sroa_1_1198 << 1;
      $149 = $carry_0203 | $q_sroa_0_1199 << 1;
      $r_sroa_0_0_insert_insert42$0 = 0 | ($r_sroa_0_1201 << 1 | $q_sroa_1_1198 >>> 31);
      $r_sroa_0_0_insert_insert42$1 = $r_sroa_0_1201 >>> 31 | $r_sroa_1_1200 << 1 | 0;
      _i64Subtract($137$0, $137$1, $r_sroa_0_0_insert_insert42$0, $r_sroa_0_0_insert_insert42$1) | 0;
      $150$1 = tempRet0;
      $151$0 = $150$1 >> 31 | (($150$1 | 0) < 0 ? -1 : 0) << 1;
      $152 = $151$0 & 1;
      $154$0 = _i64Subtract($r_sroa_0_0_insert_insert42$0, $r_sroa_0_0_insert_insert42$1, $151$0 & $d_sroa_0_0_insert_insert99$0, ((($150$1 | 0) < 0 ? -1 : 0) >> 31 | (($150$1 | 0) < 0 ? -1 : 0) << 1) & $d_sroa_0_0_insert_insert99$1) | 0;
      $r_sroa_0_0_extract_trunc = $154$0;
      $r_sroa_1_4_extract_trunc = tempRet0;
      $155 = $sr_1202 - 1 | 0;
      if (($155 | 0) == 0) {
        break;
      } else {
        $q_sroa_1_1198 = $147;
        $q_sroa_0_1199 = $149;
        $r_sroa_1_1200 = $r_sroa_1_4_extract_trunc;
        $r_sroa_0_1201 = $r_sroa_0_0_extract_trunc;
        $sr_1202 = $155;
        $carry_0203 = $152;
      }
    }
    $q_sroa_1_1_lcssa = $147;
    $q_sroa_0_1_lcssa = $149;
    $r_sroa_1_1_lcssa = $r_sroa_1_4_extract_trunc;
    $r_sroa_0_1_lcssa = $r_sroa_0_0_extract_trunc;
    $carry_0_lcssa$1 = 0;
    $carry_0_lcssa$0 = $152;
  }
  $q_sroa_0_0_insert_ext75$0 = $q_sroa_0_1_lcssa;
  $q_sroa_0_0_insert_ext75$1 = 0;
  $q_sroa_0_0_insert_insert77$1 = $q_sroa_1_1_lcssa | $q_sroa_0_0_insert_ext75$1;
  if (($rem | 0) != 0) {
    HEAP32[$rem >> 2] = 0 | $r_sroa_0_1_lcssa;
    HEAP32[$rem + 4 >> 2] = $r_sroa_1_1_lcssa | 0;
  }
  $_0$1 = (0 | $q_sroa_0_0_insert_ext75$0) >>> 31 | $q_sroa_0_0_insert_insert77$1 << 1 | ($q_sroa_0_0_insert_ext75$1 << 1 | $q_sroa_0_0_insert_ext75$0 >>> 31) & 0 | $carry_0_lcssa$1;
  $_0$0 = ($q_sroa_0_0_insert_ext75$0 << 1 | 0 >>> 31) & -2 | $carry_0_lcssa$0;
  return (tempRet0 = $_0$1, $_0$0) | 0;
}
// =======================================================================



// EMSCRIPTEN_END_FUNCS

    
    function dynCall_ii(index,a1) {
      index = index|0;
      a1=a1|0;
      return FUNCTION_TABLE_ii[index&31](a1|0)|0;
    }
  

    function dynCall_iiii(index,a1,a2,a3) {
      index = index|0;
      a1=a1|0; a2=a2|0; a3=a3|0;
      return FUNCTION_TABLE_iiii[index&1](a1|0,a2|0,a3|0)|0;
    }
  

    function dynCall_vii(index,a1,a2) {
      index = index|0;
      a1=a1|0; a2=a2|0;
      FUNCTION_TABLE_vii[index&31](a1|0,a2|0);
    }
  
function b0(p0) { p0 = p0|0; nullFunc_ii(0);return 0; }
  function b1(p0,p1,p2) { p0 = p0|0;p1 = p1|0;p2 = p2|0; nullFunc_iiii(1);return 0; }
  function b2(p0,p1) { p0 = p0|0;p1 = p1|0; nullFunc_vii(2); }
  // EMSCRIPTEN_END_FUNCS
  var FUNCTION_TABLE_ii = [b0,b0,_anything_match_fn,_not_match_fn,_and_or_match_fn,_default_match_fn,b0,b0,_anywhere_match_fn,b0,b0,b0,b0,_unord_match_fn,b0,_equal_match_fn,b0,_assoc_match_fn,_regex_match_fn,_user_match_fn,b0,b0,b0,b0,b0,b0,b0,b0,b0
  ,b0,b0,b0];
  var FUNCTION_TABLE_iiii = [b1,_sn_write];
  var FUNCTION_TABLE_vii = [b2,b2,b2,b2,b2,b2,_default_needle_fn,_anything_needle_fn,b2,_anywhere_needle_fn,_and_needle_fn,_or_needle_fn,_not_needle_fn,b2,_unord_needle_fn,b2,_equal_needle_fn,b2,b2,b2,b2,b2,b2,b2,b2,b2,b2,b2,b2
  ,b2,b2,b2];

    return { _i64Subtract: _i64Subtract, _free: _free, _memset: _memset, _realloc: _realloc, _i64Add: _i64Add, _memmove: _memmove, _core_init: _core_init, _core_process: _core_process, _malloc: _malloc, _memcpy: _memcpy, _strlen: _strlen, _bitshift64Shl: _bitshift64Shl, _bitshift64Lshr: _bitshift64Lshr, _set_output_recipe: _set_output_recipe, _core_test: _core_test, _strcpy: _strcpy, _core_cook: _core_cook, runPostSets: runPostSets, stackAlloc: stackAlloc, stackSave: stackSave, stackRestore: stackRestore, setThrew: setThrew, setTempRet0: setTempRet0, getTempRet0: getTempRet0, dynCall_ii: dynCall_ii, dynCall_iiii: dynCall_iiii, dynCall_vii: dynCall_vii };
  })
  // EMSCRIPTEN_END_ASM
  ({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "nullFunc_ii": nullFunc_ii, "nullFunc_iiii": nullFunc_iiii, "nullFunc_vii": nullFunc_vii, "invoke_ii": invoke_ii, "invoke_iiii": invoke_iiii, "invoke_vii": invoke_vii, "_send": _send, "_fread": _fread, "_lseek": _lseek, "__reallyNegative": __reallyNegative, "_write": _write, "_fflush": _fflush, "_pwrite": _pwrite, "_strerror_r": _strerror_r, "_open": _open, "_sbrk": _sbrk, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_fileno": _fileno, "_sysconf": _sysconf, "_close": _close, "_ferror": _ferror, "_fseeko": _fseeko, "_putchar": _putchar, "_fseek": _fseek, "_pread": _pread, "_puts": _puts, "_mkport": _mkport, "_fclose": _fclose, "_feof": _feof, "_fsync": _fsync, "___errno_location": ___errno_location, "_stat": _stat, "_recv": _recv, "_printf": _printf, "__exit": __exit, "_read": _read, "_fputc": _fputc, "_abort": _abort, "_fwrite": _fwrite, "_time": _time, "_fprintf": _fprintf, "_strerror": _strerror, "__formatString": __formatString, "_fputs": _fputs, "_fopen": _fopen, "_exit": _exit, "___setErrNo": ___setErrNo, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "ctlz_i8": ctlz_i8, "NaN": NaN, "Infinity": Infinity, "_stderr": _stderr, "_stdout": _stdout }, buffer);
  var real__i64Subtract = asm["_i64Subtract"]; asm["_i64Subtract"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__i64Subtract.apply(null, arguments);
};

var real__realloc = asm["_realloc"]; asm["_realloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__realloc.apply(null, arguments);
};

var real__i64Add = asm["_i64Add"]; asm["_i64Add"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__i64Add.apply(null, arguments);
};

var real__memmove = asm["_memmove"]; asm["_memmove"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__memmove.apply(null, arguments);
};

var real__core_init = asm["_core_init"]; asm["_core_init"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__core_init.apply(null, arguments);
};

var real__core_process = asm["_core_process"]; asm["_core_process"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__core_process.apply(null, arguments);
};

var real__strlen = asm["_strlen"]; asm["_strlen"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__strlen.apply(null, arguments);
};

var real__bitshift64Shl = asm["_bitshift64Shl"]; asm["_bitshift64Shl"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__bitshift64Shl.apply(null, arguments);
};

var real__bitshift64Lshr = asm["_bitshift64Lshr"]; asm["_bitshift64Lshr"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__bitshift64Lshr.apply(null, arguments);
};

var real__set_output_recipe = asm["_set_output_recipe"]; asm["_set_output_recipe"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__set_output_recipe.apply(null, arguments);
};

var real__core_test = asm["_core_test"]; asm["_core_test"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__core_test.apply(null, arguments);
};

var real__strcpy = asm["_strcpy"]; asm["_strcpy"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__strcpy.apply(null, arguments);
};

var real__core_cook = asm["_core_cook"]; asm["_core_cook"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__core_cook.apply(null, arguments);
};

var real_runPostSets = asm["runPostSets"]; asm["runPostSets"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_runPostSets.apply(null, arguments);
};
var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
var _free = Module["_free"] = asm["_free"];
var _memset = Module["_memset"] = asm["_memset"];
var _realloc = Module["_realloc"] = asm["_realloc"];
var _i64Add = Module["_i64Add"] = asm["_i64Add"];
var _memmove = Module["_memmove"] = asm["_memmove"];
var _core_init = Module["_core_init"] = asm["_core_init"];
var _core_process = Module["_core_process"] = asm["_core_process"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];
var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];
var _set_output_recipe = Module["_set_output_recipe"] = asm["_set_output_recipe"];
var _core_test = Module["_core_test"] = asm["_core_test"];
var _strcpy = Module["_strcpy"] = asm["_strcpy"];
var _core_cook = Module["_core_cook"] = asm["_core_cook"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
  
  Runtime.stackAlloc = asm['stackAlloc'];
  Runtime.stackSave = asm['stackSave'];
  Runtime.stackRestore = asm['stackRestore'];
  Runtime.setTempRet0 = asm['setTempRet0'];
  Runtime.getTempRet0 = asm['getTempRet0'];
  

// TODO: strip out parts of this we do not need

//======= begin closure i64 code =======

// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */

var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };


  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.

    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };


  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.


  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};


  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }

    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };


  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };


  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };


  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }

    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));

    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };


  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.


  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;


  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);


  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);


  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);


  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);


  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);


  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);


  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };


  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };


  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (this.isZero()) {
      return '0';
    }

    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));

    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);

      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };


  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };


  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };


  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };


  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };


  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };


  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };


  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };


  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }

    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }

    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };


  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };


  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };


  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }

    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);

      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }

      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }

      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };


  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };


  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };


  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };


  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };


  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };


  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };

  //======= begin jsbn =======

  var navigator = { appName: 'Modern Browser' }; // polyfill a little

  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/

  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */

  // Basic JavaScript BN library - subset useful for RSA encryption.

  // Bits per digit
  var dbits;

  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);

  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }

  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }

  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.

  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);

  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;

  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }

  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }

  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }

  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }

  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }

  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }

  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }

  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }

  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }

  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }

  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }

  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }

  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }

  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }

  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }

  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }

  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }

  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }

  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }

  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }

  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }

  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }

  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }

  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // jsbn2 stuff

  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }

  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }

  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }

  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }

  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }

  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }

  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;

  //======= end jsbn =======

  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();

//======= end closure i64 code =======



// === Auto-generated postamble setup entry stuff ===

if (memoryInitializer) {
  if (Module['memoryInitializerPrefixURL']) {
    memoryInitializer = Module['memoryInitializerPrefixURL'] + memoryInitializer;
  }
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    var data = Module['readBinary'](memoryInitializer);
    HEAPU8.set(data, STATIC_BASE);
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      for (var i = 0; i < data.length; i++) {
        assert(HEAPU8[STATIC_BASE + i] === 0, "area for memory initializer should not have been touched before it's loaded");
      }
      HEAPU8.set(data, STATIC_BASE);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}

function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString(Module['thisProgram']), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);

  initialStackTop = STACKTOP;

  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    exit(ret);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    if (ABORT) return; 

    ensureInitRuntime();

    preMain();

    if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
      Module.printErr('pre-main prep time: ' + (Date.now() - preloadStartTime) + ' ms');
    }

    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status) {
  if (Module['noExitRuntime']) {
    Module.printErr('exit(' + status + ') called, but noExitRuntime, so not exiting');
    return;
  }

  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;

  // exit the runtime
  exitRuntime();

  if (ENVIRONMENT_IS_NODE) {
    // Work around a node.js bug where stdout buffer is not flushed at process exit:
    // Instead of process.exit() directly, wait for stdout flush event.
    // See https://github.com/joyent/node/issues/1669 and https://github.com/kripken/emscripten/issues/2582
    // Workaround is based on https://github.com/RReverser/acorn/commit/50ab143cecc9ed71a2d66f78b4aec3bb2e9844f6
    process['stdout']['once']('drain', function () {
      process['exit'](status);
    });
    console.log(' '); // Make sure to print something to force the drain event to occur, in case the stdout buffer was empty.
    // Work around another node bug where sometimes 'drain' is never fired - make another effort
    // to emit the exit status, after a significant delay (if node hasn't fired drain by then, give up)
    setTimeout(function() {
      process['exit'](status);
    }, 500);
  } else if (ENVIRONMENT_IS_SHELL && typeof quit === 'function') {
    quit(status);
  }
  // if we reach here, we must throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '';

  throw 'abort() at ' + stackTrace() + extra;
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}


run();

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}



