// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"rNPt":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var child_process = _interopRequireWildcard(require("child_process"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var TheCluster =
/** @class */
function (_super) {
  __extends(TheCluster, _super);

  function TheCluster() {
    var _this = _super.call(this) || this;

    _this.isWorker = false;
    _this.isMaster = false;

    _this.detectStatus();

    return _this;
  }

  TheCluster.prototype.detectStatus = function () {
    this.isWorker = process.env.AWESOME_CLUSTER != null;
    this.isMaster = !this.isWorker;
    process.env.AWESOME_CLUSTER = '1';
  };

  TheCluster.prototype.fork = function () {
    var _this = this;

    var worker = child_process.fork(process.argv[1], process.argv.slice(2));
    worker.on('exit', function (code, signal) {
      console.log('Child exit', code, signal);
      return _this.emit('exit');
    });
    return worker;
  };

  return TheCluster;
}(_events.EventEmitter);

var _default = new TheCluster();

exports.default = _default;
},{}],"XtlF":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClusterApplication = void 0;

var _AwesomeCluster = _interopRequireDefault(require("./AwesomeCluster"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClusterApplication =
/** @class */
function () {
  function ClusterApplication(_a) {
    var enableHeartbeat = _a.enableHeartbeat,
        maxWorkerHeapSize = _a.maxWorkerHeapSize;
    this.enableHeartbeat = false;
    this.maxWorkerHeapSize = 0;
    this.currentWorker = null;
    this.logger = null;
    this.crashLogger = null;
    this.heartbeat = false;
    this.workerProperties = null;
    this.enableHeartbeat = enableHeartbeat;
    this.maxWorkerHeapSize = maxWorkerHeapSize;

    if (this.enableHeartbeat == null) {
      this.enableHeartbeat = false;
    }

    this.currentWorker = null;
  }

  ClusterApplication.prototype.workerMain = function () {
    var _this = this;

    var cb = function cb() {
      return process.exit(1);
    };

    process.on('uncaughtException', function (e) {
      if (e.stack != null) {
        if (_this.logger) _this.logger.error('Worker error', e.stack);
        if (_this.crashLogger) _this.crashLogger.log(cb, e.stack);
      } else {
        if (_this.logger) _this.logger.error(e);
        if (_this.crashLogger) _this.crashLogger.error(cb, e);
      }
    });
    process.on('message', function (_a) {
      var config = _a.config,
          properties = _a.properties;
      _this.workerProperties = properties;

      try {
        _this.runWorker(config);
      } catch (e) {
        if (_this.crashLogger) _this.crashLogger.error(cb, e.stack);
        if (_this.logger) _this.logger.error(e.stack);
      }
    });

    if (this.enableHeartbeat) {
      this.runHeartbeater();
    }

    if (this.maxWorkerHeapSize != null) {
      this.runHeapWatcher();
    }
  };

  ClusterApplication.prototype.masterMain = function () {
    var _this = this;

    var _a = this.init(),
        config = _a.config,
        workerProperties = _a.workerProperties;

    this.logger = this.debugLoggerFn();
    this.forkWorker(config, workerProperties);

    _AwesomeCluster.default.on('exit', function () {
      if (_this.logger) _this.logger.log('Worker finished');

      _this.forkWorker(config, workerProperties);
    });

    if (this.enableHeartbeat) {
      this.runHeartbeatWatcher();
    }
  };

  ClusterApplication.prototype.forkWorker = function (config, properties) {
    var _this = this;

    if (this.logger) this.logger.log('Worker started');
    this.currentWorker = _AwesomeCluster.default.fork();
    this.currentWorker.send({
      config: config,
      properties: properties
    }); // Allow the worker to miss the first heartbeat check

    this.heartbeat = true;
    this.currentWorker.on('message', function (msg) {
      if (msg.cmd === 'heartbeat') {
        _this.heartbeat = true;
      }
    });
  };

  ClusterApplication.prototype.run = function () {
    if (_AwesomeCluster.default.isMaster) {
      this.masterMain();
    } else {
      this.workerMain();
    }
  };

  ClusterApplication.prototype.run_ = function () {
    this.logger = this.debugLoggerFn();

    var _a = this.init(),
        config = _a.config,
        workerProperties = _a.workerProperties;

    this.runWorker(config);
  };

  ClusterApplication.prototype.runHeartbeatWatcher = function () {
    var _this = this;

    var callback = function callback() {
      if (_this.currentWorker != null && !_this.heartbeat) {
        if (_this.logger) _this.logger.info('Worker killed because of missing heartbeat');

        _this.currentWorker.kill();
      }

      return _this.heartbeat = false;
    };

    return setInterval(callback, 30000);
  };

  ClusterApplication.prototype.runHeartbeater = function () {
    var callback = function callback() {
      if (process.send) process.send({
        cmd: 'heartbeat'
      });
    };

    return setInterval(callback, 800);
  };

  ClusterApplication.prototype.runHeapWatcher = function () {
    var _this = this;

    var callback = function callback() {
      var heapSize = process.memoryUsage().heapUsed;

      if (heapSize > _this.maxWorkerHeapSize) {
        throw new Error('Memory limit exceeded');
      }
    };

    setInterval(callback, 10000);
  };

  ClusterApplication.prototype.killWorker = function () {
    if (this.currentWorker != null) {
      this.currentWorker.kill();
      this.currentWorker = null;
    }
  };

  return ClusterApplication;
}();

exports.ClusterApplication = ClusterApplication;
},{"./AwesomeCluster":"rNPt"}],"m2ac":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectEncoding = exports.convertFromTo = exports.convertFromManyTo = void 0;

var jschardet = require('jschardet');

var util = require('util');

var Iconv = require('iconv').Iconv;

var conversionCache = {};

var isByteAscii = function isByteAscii(byte) {
  return byte >= 0 && byte <= 127;
}; // We use this function to determine whether a string is ASCII. This works with
// MS codepages but there does exist exotic encodings of which ASCII is not a
// subset. But we expect not to come across these because we are limited to MS
// codepages.


var isAscii = function isAscii(buf) {
  var pos = 0;

  while (buf[pos]) {
    if (!isByteAscii(buf[pos])) {
      return false;
    }

    pos++;
  }

  return true;
};

var convertFromTo = function convertFromTo(fromEncoding, to, inputBuffer, logger, skipAscii) {
  if (skipAscii === void 0) {
    skipAscii = false;
  }

  if (util.isArray(fromEncoding)) {
    return convertFromManyTo(fromEncoding, to, inputBuffer, logger, skipAscii);
  } else {
    if (skipAscii && isAscii(inputBuffer)) {
      // Optimization which will hopefully make things run a lot faster for many customers
      return inputBuffer;
    }

    var key = fromEncoding + '.' + to + '.' + inputBuffer.toString('hex');

    if (!(key in conversionCache)) {
      var iconv = new Iconv(fromEncoding, to);
      conversionCache[key] = iconv.convert(inputBuffer);
    }

    return conversionCache[key];
  }
};

exports.convertFromTo = convertFromTo;

var convertFromManyTo = function convertFromManyTo(fromEncodings, to, inputBuffer, logger, skipAscii) {
  for (var _i = 0, fromEncodings_1 = fromEncodings; _i < fromEncodings_1.length; _i++) {
    var fromEncoding = fromEncodings_1[_i];

    try {
      return convertFromTo(fromEncoding, to, inputBuffer, logger, skipAscii);
    } catch (e) {
      continue;
    }
  }

  logger.info("All specified encodings (" + JSON.stringify(fromEncodings) + ") have failed: " + inputBuffer.toString('hex'));
  return inputBuffer;
};

exports.convertFromManyTo = convertFromManyTo;

var detectEncoding = function detectEncoding(buffer) {
  return jschardet.detect(buffer).encoding;
};

exports.detectEncoding = detectEncoding;
},{}],"aFq9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _iconv = require("./iconv");

var LazyString =
/** @class */
function () {
  function LazyString(stringBuffer, encoding, logger, skipAscii) {
    this.stringValue = '';
    this.evaluated = false;
    this.stringBuffer = stringBuffer;
    this.encoding = encoding;
    this.logger = logger;
    this.skipAscii = skipAscii;
  }

  LazyString.prototype.toString = function () {
    if (!this.stringBuffer) return 'Missing-String-Value';

    if (!this.stringValue) {
      this.evaluated = true;

      try {
        this.stringValue = (0, _iconv.convertFromTo)(this.encoding, 'utf-8//TRANSLIT//IGNORE', this.stringBuffer, this.logger, this.skipAscii).toString();
      } catch (error) {
        this.stringValue = 'Bad-Encoding';
      }
    }

    return this.stringValue;
  };

  LazyString.prototype.toJson = function () {
    return this.toString();
  };

  return LazyString;
}();

var _default = LazyString;
exports.default = _default;
},{"./iconv":"m2ac"}],"tGi3":[function(require,module,exports) {
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BufferWriter = exports.BufferReader = exports.BufferMan = void 0;

var iconv = _interopRequireWildcard(require("./iconv"));

var _LazyString = _interopRequireDefault(require("./LazyString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var BufferReader =
/** @class */
function () {
  function BufferReader(buffer, position, encoding, logger, skipAscii) {
    if (skipAscii === void 0) {
      skipAscii = true;
    }

    this.buffer = buffer;
    this.position = position;
    this.encoding = encoding;
    this.logger = logger;
    this.skipAscii = skipAscii;
  }

  BufferReader.prototype.seek = function (len) {
    this.position += len;
  };

  BufferReader.prototype.remaining = function () {
    return this.buffer.length - this.position;
  };

  BufferReader.prototype.setRemaining = function (remaining) {
    this.buffer = this.buffer.slice(0, this.position + remaining);
  };

  BufferReader.prototype.readUInt8 = function () {
    var r = this.buffer.readUInt8(this.position);
    this.position += 1;
    return r;
  };

  BufferReader.prototype.readUInt32LE = function () {
    var r = this.buffer.readUInt32LE(this.position);
    this.position += 4;
    return r;
  };

  BufferReader.prototype.readInt32LE = function () {
    var r = this.buffer.readInt32LE(this.position);
    this.position += 4;
    return r;
  };

  BufferReader.prototype.readUInt16LE = function () {
    var r = this.buffer.readUInt16LE(this.position);
    this.position += 2;
    return r;
  };

  BufferReader.prototype.readFloatLE = function () {
    var r = this.buffer.readFloatLE(this.position);
    this.position += 4;
    return r;
  };

  BufferReader.prototype.readDoubleLE = function () {
    var r = this.buffer.readDoubleLE(this.position);
    this.position += 8;
    return r;
  };

  BufferReader.prototype.readCharsToBuf = function (len) {
    var r = this.buffer.slice(this.position, this.position + len);
    this.position += len;
    return r;
  };

  BufferReader.prototype.readChars = function (len) {
    var buf = this.readCharsToBuf(len);

    if (buf) {
      return iconv.convertFromTo(this.encoding, 'utf-8//TRANSLIT//IGNORE', buf, this.logger, this.skipAscii).toString();
    }

    return '';
  };

  BufferReader.prototype.readCharsTrim = function (len) {
    var buf = this.trimBuffer(this.readCharsToBuf(len));

    try {
      return iconv.convertFromTo(this.encoding, 'utf-8//TRANSLIT//IGNORE', buf, this.logger, this.skipAscii).toString();
    } catch (error) {
      return '-bad encoding-';
    }
  };

  BufferReader.prototype.trimBuffer = function (input) {
    for (var i = 0; i < input.length; i++) {
      if (input[i] === 0) {
        return input.slice(0, i);
      }
    }

    return input;
  };

  BufferReader.prototype.readStringBuf = function () {
    for (var i = this.position; i < this.buffer.length; i++) {
      if (this.buffer[i] === 0x00) {
        // stop here
        var r = this.buffer.slice(this.position, i);
        this.position = i + 1;
        return r;
      }
    }

    throw new Error('Read past buffer');
  };

  BufferReader.prototype.readStringLazy = function () {
    var buf = this.readStringBuf();
    return new _LazyString.default(buf, this.encoding, this.logger, this.skipAscii);
  };

  BufferReader.prototype.readString = function () {
    var buf = this.readStringBuf();

    try {
      return iconv.convertFromTo(this.encoding, 'utf-8//TRANSLIT//IGNORE', buf, this.logger, this.skipAscii).toString();
    } catch (error) {
      return '-bad encoding-';
    }
  };

  BufferReader.prototype.align = function (alignment) {
    var extraBytes = this.position % alignment;

    if (extraBytes !== 0) {
      this.position += alignment - extraBytes;
    }
  }; // ShopMonMainFrame.cpp#4971
  // Tom aligns his code by wasting 4 bytes every time the code is aligned


  BufferReader.prototype.tomAlign = function (alignment) {
    this.position = Math.floor(this.position / alignment) * alignment + alignment;
  };

  return BufferReader;
}();

exports.BufferReader = BufferReader;

var BufferWriter =
/** @class */
function () {
  function BufferWriter(buffer, position, encoding, logger) {
    this.buffer = buffer;
    this.position = position;
    this.encoding = encoding;
    this.logger = logger;
  }

  BufferWriter.prototype.remaining = function () {
    return this.buffer.length - this.position;
  };

  BufferWriter.prototype.seek = function (len) {
    this.position += len;
  };

  BufferWriter.prototype.writeUInt8 = function (val, times) {
    if (times === void 0) {
      times = 1;
    }

    for (var i = 0; i < times; i++) {
      this.buffer.writeUInt8(val, this.position + i);
    }

    this.position += times;
  };

  BufferWriter.prototype.writeUInt32LE = function (val) {
    this.buffer.writeUInt32LE(val, this.position);
    this.position += 4;
  };

  BufferWriter.prototype.writeInt32LE = function (val) {
    this.buffer.writeInt32LE(val, this.position);
    this.position += 4;
  };

  BufferWriter.prototype.writeFloatLE = function (val) {
    this.buffer.writeFloatLE(val, this.position);
    this.position += 4;
  };

  BufferWriter.prototype.writeDoubleLE = function (val) {
    this.buffer.writeDoubleLE(val, this.position);
    this.position += 8;
  };

  BufferWriter.prototype.writeChars = function (val, len) {
    var valBuf = iconv.convertFromTo('utf-8', this.encoding + '//TRANSLIT//IGNORE', new Buffer(val), this.logger);

    for (var i = 0; i < valBuf.length; i++) {
      this.buffer[this.position + i] = valBuf[i];
    }

    this.position += valBuf.length;
    var pad = len - valBuf.length;

    for (var i = 0; i < pad; i++) {
      this.buffer[this.position] = 0x00;
      this.position++;
    }
  };

  BufferWriter.prototype.writeString = function (val) {
    var valBuf = iconv.convertFromTo('utf-8', this.encoding + '//TRANSLIT//IGNORE', new Buffer(val), this.logger);

    for (var i = 0; i < valBuf.length; i++) {
      this.buffer[this.position + i] = valBuf[i];
    }

    this.buffer[this.position + valBuf.length] = 0x00;
    this.position += valBuf.length + 1;
  };

  return BufferWriter;
}();

exports.BufferWriter = BufferWriter;

var BufferMan =
/** @class */
function () {
  function BufferMan() {
    this.buffer = new Buffer(0);
  }

  BufferMan.prototype.write = function (buffer) {
    this.buffer = Buffer.concat([this.buffer, buffer]);
  };

  BufferMan.prototype.peek = function (length) {
    return this.buffer.slice(0, length);
  };

  BufferMan.prototype.skip = function (length) {
    this.buffer = this.buffer.slice(length);
  };

  BufferMan.prototype.read = function (length) {
    var ret = this.peek(length);
    this.skip(length);
    return ret;
  };

  BufferMan.prototype.length = function () {
    return this.buffer.length;
  };

  return BufferMan;
}();

exports.BufferMan = BufferMan;
},{"./iconv":"m2ac","./LazyString":"aFq9"}],"KLMq":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MachineData = exports.ColumnEvalsResponse = void 0;

var _buffer_tools = require("../buffer_tools");

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var MessageType;

(function (MessageType) {
  // Client to server
  MessageType[MessageType["ping"] = 268435456] = "ping";
  MessageType[MessageType["ports"] = 536870912] = "ports";
  MessageType[MessageType["button"] = 805306368] = "button";
  MessageType[MessageType["telnet"] = 1073741824] = "telnet";
  MessageType[MessageType["columnEvalsRequest"] = 1342177280] = "columnEvalsRequest";
  MessageType[MessageType["databaseRequest"] = 1610612736] = "databaseRequest";
  MessageType[MessageType["extended"] = -1610612736] = "extended"; // Server to Client

  MessageType[MessageType["update"] = 268435456] = "update";
  MessageType[MessageType["portdat"] = 536870912] = "portdat";
  MessageType[MessageType["portlen"] = 805306368] = "portlen";
  MessageType[MessageType["portend"] = 1073741824] = "portend";
  MessageType[MessageType["float"] = 1342177280] = "float";
  MessageType[MessageType["string"] = 1610612736] = "string";
  MessageType[MessageType["columnEvalsResponse"] = 1879048192] = "columnEvalsResponse";
  MessageType[MessageType["databaseResponse"] = -2147483648] = "databaseResponse";
  MessageType[MessageType["pingResponse"] = -1879048192] = "pingResponse";
})(MessageType || (MessageType = {}));

var ExtendedMessageType;

(function (ExtendedMessageType) {
  ExtendedMessageType[ExtendedMessageType["setMode"] = 1] = "setMode";
  ExtendedMessageType[ExtendedMessageType["accept"] = 1] = "accept";
  ExtendedMessageType[ExtendedMessageType["loginRequest"] = 2] = "loginRequest";
  ExtendedMessageType[ExtendedMessageType["reject"] = 2] = "reject";
  ExtendedMessageType[ExtendedMessageType["jsonConfigRequest"] = 3] = "jsonConfigRequest";
  ExtendedMessageType[ExtendedMessageType["jsonConfigResponse"] = 3] = "jsonConfigResponse";
  ExtendedMessageType[ExtendedMessageType["operatorListRequest"] = 4] = "operatorListRequest";
  ExtendedMessageType[ExtendedMessageType["operatorListResponse"] = 4] = "operatorListResponse";
  ExtendedMessageType[ExtendedMessageType["databaseQueryRequest"] = 5] = "databaseQueryRequest";
  ExtendedMessageType[ExtendedMessageType["databaseQueryResponse"] = 5] = "databaseQueryResponse";
})(ExtendedMessageType || (ExtendedMessageType = {}));

var SetModeOption;

(function (SetModeOption) {
  SetModeOption[SetModeOption["none"] = 0] = "none";
  SetModeOption[SetModeOption["full"] = 1] = "full";
  SetModeOption[SetModeOption["web"] = 2] = "web";
  SetModeOption[SetModeOption["headless"] = 3] = "headless";
})(SetModeOption || (SetModeOption = {}));

var UpdateMessageType;

(function (UpdateMessageType) {
  UpdateMessageType[UpdateMessageType["accept"] = 1] = "accept";
  UpdateMessageType[UpdateMessageType["reject"] = 2] = "reject";
  UpdateMessageType[UpdateMessageType["readcfg"] = 3] = "readcfg";
})(UpdateMessageType || (UpdateMessageType = {}));

var FieldSubmit =
/** @class */
function () {
  function FieldSubmit(_a) {
    var machineId = _a.machineId,
        inputId = _a.inputId,
        screenId = _a.screenId,
        value = _a.value;
    this.buttonId = 0xffffffff;
    this.machineId = machineId;
    this.inputId = inputId;
    this.screenId = screenId;
    this.value = value || '';
  }

  FieldSubmit.prototype.encode = function (encoding, logger) {
    var worstCaseStringLength = 2 * this.value.length;
    var length = 4 * [this.machineId, this.buttonId, this.inputId, this.screenId].length + 1 + worstCaseStringLength + 1;
    var buffer = new Buffer(length);
    var writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    writer.writeUInt32LE(this.machineId);
    writer.writeUInt32LE(this.buttonId);
    writer.writeUInt32LE(this.inputId);
    writer.writeUInt32LE(this.screenId);
    writer.writeUInt8(0);
    writer.writeString(this.value);
    var withoutPadding = buffer.slice(0, writer.position);
    length = 4 + withoutPadding.length;
    buffer = new Buffer(length);
    writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    writer.writeUInt32LE(length | MessageType.button);
    withoutPadding.copy(buffer, writer.position);
    return buffer;
  };

  return FieldSubmit;
}();

var ButtonClick =
/** @class */
function () {
  function ButtonClick(_a) {
    var machineId = _a.machineId,
        buttonId = _a.buttonId,
        screenId = _a.screenId,
        data = _a.data;
    this.fieldId = 0xffffffff;
    this.machineId = machineId;
    this.buttonId = buttonId;
    this.screenId = screenId;
    this.data = data || {};

    for (var i = 0; i < 8; i++) {
      if (!(i in this.data)) {
        this.data[i] = '';
      }

      if (typeof this.data[i] !== 'string') {
        this.data[i] = "" + this.data[i];
      }
    }
  }

  ButtonClick.prototype.encode = function (encoding, logger) {
    var _this = this;

    var varLenList = function () {
      var result = [];

      for (var k in _this.data) {
        result.push(_this.data[k]);
      }

      return result;
    }().map(function (v) {
      return v.length + 1;
    });

    var varsLen = varLenList.reduce(function (prev, curr) {
      return prev + curr;
    }, 0);
    var length = 25 + varsLen;
    var buffer = new Buffer(length);
    var writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    writer.writeUInt32LE(length | MessageType.button);
    writer.writeUInt32LE(this.machineId);
    writer.writeUInt32LE(this.buttonId);
    writer.writeUInt32LE(this.fieldId);
    writer.writeUInt32LE(this.screenId);
    writer.writeUInt8(0); // Your Tom is so smart he counts 2, 3, 4, 1, 5, 6, 7, 8

    var positions = [2, 3, 4, 1, 5, 6, 7, 8];

    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
      var i = positions_1[_i];
      writer.writeString(this.data[i - 1]);
    }

    for (i = 0; i <= 2; i++) {
      writer.writeUInt8(0);
    }

    return buffer;
  };

  return ButtonClick;
}();

var SelectMachines =
/** @class */
function () {
  function SelectMachines(_a) {
    var machineIds = _a.machineIds;
    this.machineIds = machineIds;
  }

  SelectMachines.prototype.encode = function (encoding, logger) {
    var length = (this.machineIds.length + 1) * 4;
    var buffer = new Buffer(length);
    var writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    writer.writeInt32LE(length | MessageType.ports);

    for (var _i = 0, _a = this.machineIds; _i < _a.length; _i++) {
      var machineId = _a[_i];
      writer.writeInt32LE(machineId);
    }

    return buffer;
  };

  return SelectMachines;
}();

var ColumnEvalsRequest =
/** @class */
function () {
  function ColumnEvalsRequest() {}

  ColumnEvalsRequest.prototype.encode = function (encoding, logger) {
    var length = 4;
    var buffer = new Buffer(length);
    var writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    writer.writeUInt32LE(0 | MessageType.columnEvalsRequest);
    return buffer;
  };

  return ColumnEvalsRequest;
}();

var MachineData =
/** @class */
function () {
  function MachineData(_a) {
    var machineId = _a.machineId,
        evals = _a.evals;
    this.messageType = MessageType.portdat;
    this.machineId = machineId;
    this.evals = evals;
  }

  return MachineData;
}();

exports.MachineData = MachineData;

var MachineDataEnd =
/** @class */
function () {
  function MachineDataEnd() {
    this.messageType = MessageType.portend;
  }

  return MachineDataEnd;
}();

var DatabaseResponse =
/** @class */
function () {
  function DatabaseResponse(_a) {
    var vals = _a.vals;
    this.messageType = MessageType.databaseResponse;
    this.vals = vals;
  }

  return DatabaseResponse;
}();

var ColumnEvalsResponse =
/** @class */
function () {
  function ColumnEvalsResponse(screens) {
    this.messageType = MessageType.columnEvalsResponse;
    this.screens = screens;
  }

  return ColumnEvalsResponse;
}();

exports.ColumnEvalsResponse = ColumnEvalsResponse;

var sum = function sum(data) {
  return data.reduce(function (p, c) {
    return p + c;
  }, 0);
};

var DatabaseRequest =
/** @class */
function () {
  function DatabaseRequest(strings) {
    if (strings == null) {
      strings = [];
    }

    this.strings = strings.map(function (s) {
      return "" + s;
    });
  }

  DatabaseRequest.prototype.encode = function (encoding, logger) {
    var worstCaseStringLength = sum(this.strings.map(function (s) {
      return s.length * 2 + 1;
    })); // 2 for multibyte, 1 for '\0'

    var buffer = new Buffer(worstCaseStringLength);
    var writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    this.strings.map(function (s) {
      return writer.writeString(s);
    });
    var withoutPadding = buffer.slice(0, writer.position);
    var length = 4 + withoutPadding.length;
    buffer = new Buffer(length);
    writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    writer.writeInt32LE(length | MessageType.databaseRequest);
    withoutPadding.copy(buffer, writer.position);
    return buffer;
  };

  return DatabaseRequest;
}();

var Extended =
/** @class */
function () {
  function Extended(subMessageType) {
    this.messageType = MessageType.extended;
    this.subMessageType = subMessageType;
  }

  Extended.prototype.encode = function (encoding, logger) {
    var subMessage = this.encodeSubMessage(encoding, logger);
    var length = subMessage.length + 12;
    var buffer = new Buffer(length);
    buffer.writeInt32LE(length | MessageType.extended, 0);
    buffer.writeUInt32LE(this.subMessageType, 4);
    buffer.writeUInt32LE(subMessage.length, 8);
    subMessage.copy(buffer, 12);
    return buffer;
  };

  return Extended;
}();

var SetMode =
/** @class */
function (_super) {
  __extends(SetMode, _super);

  function SetMode(mode, client, compression) {
    var _this = _super.call(this, ExtendedMessageType.setMode) || this;

    _this.mode = mode;
    _this.client = client;
    _this.compression = compression;
    return _this;
  }

  SetMode.prototype.encodeSubMessage = function (encoding, logger) {
    var jsonString = JSON.stringify({
      MODE: this.mode,
      COMPRESSION: this.compression,
      CLIENT: this.client
    });
    var buffer = new Buffer(jsonString.length + 1);
    var writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    writer.writeString(jsonString);
    return buffer;
  };

  return SetMode;
}(Extended);

var LoginRequest =
/** @class */
function (_super) {
  __extends(LoginRequest, _super);

  function LoginRequest(username, password) {
    var _this = _super.call(this, ExtendedMessageType.loginRequest) || this;

    _this.username = username;
    _this.password = password;
    return _this;
  }

  LoginRequest.prototype.encodeSubMessage = function (encoding, logger) {
    var jsonString = JSON.stringify({
      user: this.username,
      pass: this.password
    });
    var buffer = new Buffer(4 + jsonString.length + 1);
    var writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    writer.writeUInt32LE(0); // is encrypted

    writer.writeString(jsonString);
    return buffer;
  };

  return LoginRequest;
}(Extended);

var JsonConfigRequest =
/** @class */
function (_super) {
  __extends(JsonConfigRequest, _super);

  function JsonConfigRequest() {
    return _super.call(this, ExtendedMessageType.jsonConfigRequest) || this;
  }

  JsonConfigRequest.prototype.encodeSubMessage = function (encoding, logger) {
    return new Buffer(0);
  };

  return JsonConfigRequest;
}(Extended);

var AcceptUpdate =
/** @class */
function () {
  function AcceptUpdate(configVersion) {
    this.messageType = MessageType.update;
    this.configVersion = configVersion;
  }

  return AcceptUpdate;
}();

var RejectUpdate =
/** @class */
function () {
  function RejectUpdate() {
    this.messageType = MessageType.update;
  }

  return RejectUpdate;
}();

var ReadConfigUpdate =
/** @class */
function () {
  function ReadConfigUpdate(configVersion) {
    this.messageType = MessageType.update;
    this.configVersion = configVersion;
  }

  return ReadConfigUpdate;
}();

var decodeReadConfigUpdate = function decodeReadConfigUpdate(reader, logger) {
  return new ReadConfigUpdate(reader.readInt32LE());
};

var decodeAcceptUpdate = function decodeAcceptUpdate(reader, logger) {
  return new AcceptUpdate(reader.readInt32LE());
};

var decodeRejectUpdate = function decodeRejectUpdate(reader, logger) {
  return new RejectUpdate();
};

var updateMessageHandlers = {};
updateMessageHandlers[UpdateMessageType.accept] = decodeAcceptUpdate;
updateMessageHandlers[UpdateMessageType.reject] = decodeRejectUpdate;
updateMessageHandlers[UpdateMessageType.readcfg] = decodeReadConfigUpdate;

var decodeUpdate = function decodeUpdate(reader, logger) {
  var subtype = reader.readUInt32LE() & 0x0000000f;

  if (subtype in updateMessageHandlers) {
    return updateMessageHandlers[subtype](reader, logger);
  } else {
    throw new Error("Unknown update message subtype " + subtype);
  }
};

var decodeMachineData = function decodeMachineData(reader, logger) {
  var machineId = reader.readUInt32LE() & 0x0fffffff;
  var dataLengthWithCmd = reader.readUInt32LE();
  var dataLength = dataLengthWithCmd & 0x0fffffff;
  var evals = [];

  try {
    // At Wolverhampton we got a MachineData message that resulted in a
    // `RangeError: index out of range`. To prevent such errors in the
    // future, we wrapped the function body in a try-catch, that tries to
    // get as much data out of the message before failing to parse.
    while (reader.remaining() > 0) {
      var value = void 0;
      var evalInfo = reader.readUInt32LE();
      var evalId = evalInfo & 0x0fffffff;
      var evalType = evalInfo & 0xf0000000;

      if (evalType === MessageType.float) {
        value = reader.readDoubleLE();
      } else if (evalType === MessageType.string) {
        value = reader.readStringLazy(); // The null terminator should not affect the outcome of Tom alignment

        reader.position -= 1;
        reader.tomAlign(4);
      } else {
        // Often times we have some invalid end value
        break;
      }

      evals.push({
        evalId: evalId,
        value: value
      });
    }
  } catch (e) {
    var messageAsHex = reader.buffer.slice(0, dataLength).toString('hex');
    logger.error(e.stack);
    logger.error('Failure in decodeMachineData', JSON.stringify({
      readerRemaining: reader.remaining(),
      dataLength: dataLength,
      messageAsHex: messageAsHex
    }));
  }

  return new MachineData({
    machineId: machineId,
    evals: evals
  });
};

var decodeMachineDataEnd = function decodeMachineDataEnd(reader, logger) {
  return new MachineDataEnd();
};

var decodeColumnEvalsResponse = function decodeColumnEvalsResponse(reader, logger) {
  reader.readUInt32LE() & 0x0fffffff;
  return new ColumnEvalsResponse(JSON.parse(reader.readString()));
};

var decodeDatabaseResponse = function decodeDatabaseResponse(reader, logger) {
  reader.readUInt32LE();
  var vals = [];

  while (reader.remaining()) {
    var name = reader.readString();
    var type = reader.readUInt8();
    var value = null;

    switch (type) {
      case 2:
        value = reader.readStringBuf();
        break;

      case 1:
        value = reader.readUInt32LE();
        break;

      default:
        throw new Error("Unexpected DatabaseResponse type " + type);
    }

    vals.push({
      name: name,
      value: value
    });
  }

  return new DatabaseResponse({
    vals: vals
  });
};

var ExtendedAcceptResponse =
/** @class */
function () {
  function ExtendedAcceptResponse(body) {
    this.messageType = MessageType.extended;
    this.extendedMessageType = ExtendedMessageType.accept;
    this.body = body;
  }

  return ExtendedAcceptResponse;
}();

var ExtendedRejectResponse =
/** @class */
function () {
  function ExtendedRejectResponse(body) {
    this.messageType = MessageType.extended;
    this.extendedMessageType = ExtendedMessageType.reject;
    this.body = body;
  }

  return ExtendedRejectResponse;
}();

var JsonConfigResponse =
/** @class */
function () {
  function JsonConfigResponse(config) {
    this.messageType = MessageType.extended;
    this.extendedMessageType = ExtendedMessageType.jsonConfigResponse;
    this.config = config;
  }

  return JsonConfigResponse;
}();

var decodeExtendedMessageAccept = function decodeExtendedMessageAccept(reader, logger) {
  reader.readUInt32LE();
  return new ExtendedAcceptResponse(JSON.parse(reader.readString()));
};

var decodeExtendedMessageReject = function decodeExtendedMessageReject(reader, logger) {
  reader.readUInt32LE();
  return new ExtendedRejectResponse(JSON.parse(reader.readString()));
};

var OperatorListResponse =
/** @class */
function () {
  function OperatorListResponse(data) {
    this.messageType = MessageType.extended;
    this.extendedMessageType = ExtendedMessageType.operatorListResponse;
    this.data = data;
  }

  return OperatorListResponse;
}();

var decodeMessageOperatorListResponse = function decodeMessageOperatorListResponse(reader, logger) {
  reader.readUInt32LE();
  return new OperatorListResponse(JSON.parse(reader.readString()));
};

var decodeMessageDatabaseQueryResponse = function decodeMessageDatabaseQueryResponse(reader, logger) {
  reader.readUInt32LE();
  return new DatabaseQueryResponse(JSON.parse(reader.readString()));
};

var decodeMessageJsonConfig = function decodeMessageJsonConfig(reader, logger) {
  reader.readUInt32LE();
  return new JsonConfigResponse(JSON.parse(reader.readString()));
};

var OperatorListRequest =
/** @class */
function (_super) {
  __extends(OperatorListRequest, _super);

  function OperatorListRequest(_a) {
    var screenId = _a.screenId,
        buttonId = _a.buttonId;

    var _this = _super.call(this, ExtendedMessageType.operatorListRequest) || this;

    _this.screenId = screenId;
    _this.buttonId = buttonId;
    return _this;
  }

  OperatorListRequest.prototype.encodeSubMessage = function (encoding, logger) {
    var jsonString = JSON.stringify({
      screenid: this.screenId,
      buttonno: this.buttonId
    });
    var buffer = new Buffer(jsonString.length + 1);
    var writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    writer.writeString(jsonString);
    return buffer;
  };

  return OperatorListRequest;
}(Extended);

var DatabaseQueryRequest =
/** @class */
function (_super) {
  __extends(DatabaseQueryRequest, _super);

  function DatabaseQueryRequest(_a) {
    var screenId = _a.screenId,
        buttonId = _a.buttonId,
        machineId = _a.machineId;

    var _this = _super.call(this, ExtendedMessageType.databaseQueryRequest) || this;

    _this.screenId = screenId;
    _this.buttonId = buttonId;
    _this.machineId = machineId;
    return _this;
  }

  DatabaseQueryRequest.prototype.encodeSubMessage = function (encoding, logger) {
    var jsonString = JSON.stringify({
      screenid: this.screenId,
      buttonno: this.buttonId,
      machineid: this.machineId
    });
    var buffer = new Buffer(jsonString.length + 1);
    var writer = new _buffer_tools.BufferWriter(buffer, 0, encoding, logger);
    writer.writeString(jsonString);
    return buffer;
  };

  return DatabaseQueryRequest;
}(Extended);

var DatabaseQueryResponse =
/** @class */
function () {
  function DatabaseQueryResponse(data) {
    this.messageType = MessageType.extended;
    this.extendedMessageType = ExtendedMessageType.databaseQueryResponse;
    this.data = data;
  }

  return DatabaseQueryResponse;
}();

var Ping =
/** @class */
function () {
  function Ping() {}

  Ping.prototype.encode = function (encoding) {
    var length = 4;
    var buffer = new Buffer(length);
    buffer.writeInt32LE(length | MessageType.ping, 0);
    return buffer;
  };

  Ping.prototype.encodeSubMessage = function (encoding) {
    throw new Error('Not implemented');
  };

  return Ping;
}();

var extendedMessageHandlers = {};
extendedMessageHandlers[ExtendedMessageType.accept] = decodeExtendedMessageAccept;
extendedMessageHandlers[ExtendedMessageType.reject] = decodeExtendedMessageReject;
extendedMessageHandlers[ExtendedMessageType.jsonConfigResponse] = decodeMessageJsonConfig;
extendedMessageHandlers[ExtendedMessageType.operatorListResponse] = decodeMessageOperatorListResponse;
extendedMessageHandlers[ExtendedMessageType.databaseQueryResponse] = decodeMessageDatabaseQueryResponse;

var decodeExtendedResponse = function decodeExtendedResponse(reader, logger) {
  reader.readUInt32LE();
  var subtype = reader.readUInt32LE() & 0x0000000f;

  if (subtype in extendedMessageHandlers) {
    return extendedMessageHandlers[subtype](reader, logger);
  } else {
    throw new Error("Unknown extended message subtype " + subtype);
  }
};

var PingResponse =
/** @class */
function () {
  function PingResponse() {
    this.messageType = MessageType.pingResponse;
  }

  return PingResponse;
}();

var decodePingResponse = function decodePingResponse(reader, logger) {
  return new PingResponse();
};

var messageHandlers = {};
messageHandlers[MessageType.update] = decodeUpdate;
messageHandlers[MessageType.portdat] = decodeMachineData;
messageHandlers[MessageType.portend] = decodeMachineDataEnd;
messageHandlers[MessageType.columnEvalsResponse] = decodeColumnEvalsResponse;
messageHandlers[MessageType.databaseResponse] = decodeDatabaseResponse;
messageHandlers[MessageType.extended] = decodeExtendedResponse;
messageHandlers[MessageType.pingResponse] = decodePingResponse;
/*
Table of messages types and their lengths:

messageTypes.update
    updateMessageTypes.accept: 8
    updateMessageTypes.readcfg: 8
    updateMessageTypes.reject: 4
messageTypes.portdat: offset[4]
messageTypes.portend: 4
messageTypes.columnEvalsResponse: offset[0] & 0x0fffffff
messageTypes.databaseResponse: offset[0] & 0x0fffffff
messageTypes.extended: offset[0] & 0x0fffffff
messageTypes.pingResponse: 4
*/

var predictMessage = function predictMessage(buffer) {
  // We need at least 4 bytes to read the message type
  if (buffer.length < 4) return null;
  var messageType = buffer.readUInt32LE(0) & 0xf0000000;
  var messageLength = predictMessageLength(messageType, buffer);
  if (messageLength == null) return null;
  return {
    messageLength: messageLength,
    messageType: messageType
  };
};

var predictMessageLength = function predictMessageLength(messageType, buffer) {
  switch (messageType) {
    case MessageType.update:
      var subType = buffer.readUInt32LE(0) & 0x0000000f;

      switch (subType) {
        case UpdateMessageType.accept:
          return 8;

        case UpdateMessageType.readcfg:
          return 8;

        case UpdateMessageType.reject:
          return 4;

        default:
          throw new Error("Unexpected messageTypes.update subType " + subType);
      }

    case MessageType.portdat:
      // Need more data
      if (buffer.length < 8) return null;
      return buffer.readUInt32LE(4) & 0x0fffffff;

    case MessageType.portend:
      return 4;

    case MessageType.columnEvalsResponse:
    case MessageType.databaseResponse:
      return buffer.readUInt32LE(0) & 0x0fffffff;

    case MessageType.extended:
      if (buffer.length < 12) return null;
      return 12 + buffer.readUInt32LE(8);

    case MessageType.pingResponse:
      return 4;

    default:
      throw new Error("Unexpected messageType " + messageType);
  }
};

var decodeMessage = function decodeMessage(buffer, encoding, logger, skipAscii) {
  var nextMessage = predictMessage(buffer);
  if (nextMessage == null || buffer.length < nextMessage.messageLength) return {
    consumed: 0,
    message: null
  };
  var messageType = nextMessage.messageType,
      messageLength = nextMessage.messageLength;

  if (messageType in messageHandlers) {
    var reader = new _buffer_tools.BufferReader(buffer, 0, encoding, logger.subLogger('decodeMessage'), skipAscii);
    reader.setRemaining(messageLength);
    var message = messageHandlers[messageType](reader, logger);
    return {
      consumed: messageLength,
      message: message
    };
  } else {
    throw new Error("Unknown message type 0x" + messageType.toString(16));
  }
};

var _default = {
  SetModeOption: SetModeOption,
  FieldSubmit: FieldSubmit,
  ButtonClick: ButtonClick,
  SelectMachines: SelectMachines,
  ColumnEvalsRequest: ColumnEvalsRequest,
  DatabaseRequest: DatabaseRequest,
  SetMode: SetMode,
  LoginRequest: LoginRequest,
  AcceptUpdate: AcceptUpdate,
  RejectUpdate: RejectUpdate,
  ReadConfigUpdate: ReadConfigUpdate,
  decodeMessage: decodeMessage,
  ExtendedAcceptResponse: ExtendedAcceptResponse,
  ExtendedRejectResponse: ExtendedRejectResponse,
  JsonConfigRequest: JsonConfigRequest,
  JsonConfigResponse: JsonConfigResponse,
  OperatorListRequest: OperatorListRequest,
  DatabaseQueryRequest: DatabaseQueryRequest,
  DatabaseQueryResponse: DatabaseQueryResponse,
  Ping: Ping,
  PingResponse: PingResponse
};
exports.default = _default;
},{"../buffer_tools":"tGi3"}],"npR0":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var net = _interopRequireWildcard(require("net"));

var _message = _interopRequireDefault(require("./message"));

var iconv = _interopRequireWildcard(require("../iconv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var EventEmitter = require('events').EventEmitter;

var zlib = require('zlib');

var Connection =
/** @class */
function (_super) {
  __extends(Connection, _super);

  function Connection(_a) {
    var host = _a.host,
        port = _a.port,
        logger = _a.logger,
        overriddenEncoding = _a.overriddenEncoding,
        skipAscii = _a.skipAscii;

    var _this = _super.call(this) || this;

    _this.compression = false;
    _this.compressedData = new Buffer(0);
    _this.data = new Buffer(0);
    _this.informedEncoding = '';
    _this.detectedEncoding = '';
    _this.defaultEncoding = 'windows-1252';
    _this.decoding = false;
    _this.socket = null;
    _this.establishConnection = _this.establishConnection.bind(_this);
    _this.handleSocketData = _this.handleSocketData.bind(_this);
    _this.handleSocketClose = _this.handleSocketClose.bind(_this);
    _this.handleSocketError = _this.handleSocketError.bind(_this);
    _this.decompressData = _this.decompressData.bind(_this);
    _this.decodeMessages = _this.decodeMessages.bind(_this);
    _this.sendMessage = _this.sendMessage.bind(_this);
    _this.end = _this.end.bind(_this);
    _this.compression = false;
    _this.host = host;
    _this.port = port;
    _this.logger = logger;
    _this.compressedData = new Buffer(0);
    _this.data = new Buffer(0);
    _this.overriddenEncoding = overriddenEncoding;
    _this.skipAscii = skipAscii;
    _this.informedEncoding = '';
    _this.detectedEncoding = '';
    _this.defaultEncoding = 'windows-1252';
    _this.decoding = false;

    _this.establishConnection();

    return _this;
  }

  Connection.prototype.tryFn = function (fn) {
    var _this = this;

    return function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      try {
        return fn.apply(_this, params);
      } catch (e) {
        _this.logger.log('async error', e.stack);
      }
    };
  };

  Connection.prototype.establishConnection = function () {
    this.socket = net.connect(this.port, this.host);
    this.socket.on('data', this.handleSocketData);
    this.socket.on('error', this.handleSocketError);
    this.pingInterval = setInterval(this.sendPing.bind(this), 10000);
    return this.socket.once('close', this.handleSocketClose);
  };

  Connection.prototype.sendPing = function () {
    this.sendMessage(new _message.default.Ping());
  };

  Connection.prototype.handleSocketData = function (newData) {
    try {
      if (this.compression) {
        this.compressedData = Buffer.concat([this.compressedData, newData]);
        this.decompressData();
      } else {
        this.data = Buffer.concat([this.data, newData]);
        this.decodeMessages();
      }
    } catch (e) {
      this.logger.error('Failed to decode messages', e.stack);
      this.emit('error2', e);
    }
  };

  Connection.prototype.handleSocketClose = function () {
    clearInterval(this.pingInterval);
    this.emit('end');
  };

  Connection.prototype.handleSocketError = function (err) {
    clearInterval(this.pingInterval);
    this.logger.info('socket error', err.stack);
    this.emit('error2', err);
  };

  Connection.prototype.decompressData = function () {
    var _this = this;

    if (this.compressedData.length > 1024 * 1024 * 10) {
      this.logger.info("Might not be able to keep up with data decompression, at " + this.compressedData.length / 1024 / 1024 + " MB data to decompress");
    }

    if (this.decoding) {
      return;
    }

    this.decoding = true; // Handle compression

    if (this.compressedData.length < 4) {
      this.decoding = false;
      return;
    }

    var length = this.compressedData.readUInt32LE(0);

    if (this.compressedData.length >= length + 4) {
      // At least one chunk
      var chunk = this.compressedData.slice(4, length + 4);
      this.compressedData = this.compressedData.slice(4 + length);
      zlib.gunzip(chunk, function (err, result) {
        if (err) {
          _this.logger.error('Decode error', err);
        }

        _this.data = Buffer.concat([_this.data, result]);
        _this.decoding = false; // Decode next chunk

        setTimeout(_this.tryFn(_this.decompressData.bind(_this)), 0);

        _this.decodeMessages();
      });
    }
  };

  Connection.prototype.decodeMessages = function () {
    var _this = this;

    var t = Date.now();

    var _a = _message.default.decodeMessage(this.data, [this.overriddenEncoding, this.informedEncoding, this.detectedEncoding, this.defaultEncoding], this.logger, this.skipAscii),
        message = _a.message,
        consumed = _a.consumed;

    if (consumed) {
      this.data = this.data.slice(consumed);
    }

    if (consumed && message) {
      if (message.constructor.name == 'ExtendedAcceptResponse' && message.body.CODEPAGENAME) {
        // Set encoding
        this.informedEncoding = message.body.CODEPAGENAME;
        this.logger.debug('Received encoding', message.body.CODEPAGENAME);
      }

      if (message.constructor.name === 'DatabaseResponse') {
        if (message.vals[2] && message.vals[2].value && message.vals[0].name === 'table' && message.vals[0].value.toString() === 'dbfiles' && message.vals[1].name === 'filename' && message.vals[1].value.toString() === 'MDCMAXLIVECFG') {
          // This message determines the encoding
          this.detectedEncoding = iconv.detectEncoding(message.vals[2].value);
        } // Convert all messages to have the correct encoding


        for (var _i = 0, _b = message.vals; _i < _b.length; _i++) {
          var val = _b[_i];

          if (val.value instanceof Buffer) {
            val.value = iconv.convertFromTo([this.overriddenEncoding, this.informedEncoding, this.detectedEncoding, this.defaultEncoding], 'utf-8', val.value, this.logger).toString();
          }
        }
      } // if (['MachineData', 'MachineDataEnd'].indexOf(message.constructor.name) == -1)
      // 	this.logger.log('Receive ' + message.constructor.name);


      if (['ExtendedAcceptResponse', 'ExtendedRejectResponse'].indexOf(message.constructor.name) >= 0) {
        this.emit('ReceiveExtendedResponse', message.constructor.name === 'ExtendedAcceptResponse', message);
      }

      this.emit('ReceiveAnyMessage', message);
      this.emit("Receive" + message.constructor.name, message);
    } // Create breathing room to do other things in the process by yielding


    if (consumed > 0 && this.data.length > 0) {
      process.nextTick(function () {
        return _this.decodeMessages();
      });
    }
  };

  Connection.prototype.sendMessage = function (message) {
    var _this = this;

    try {
      this.emit('SendAnyMessage', message); // this.logger.log('Send ' + message.constructor.name + ' ' + JSON.stringify(message));

      var encodedMessage = message.encode(this.overriddenEncoding || this.informedEncoding || this.detectedEncoding || this.defaultEncoding, this.logger);

      if (this.compression) {
        zlib.gzip(encodedMessage, function (err, result) {
          var withLength = new Buffer(4 + result.length);
          withLength.writeUInt32LE(result.length, 0);
          result.copy(withLength, 4, 0);

          _this.socket.write(withLength);
        });
      } else {
        this.socket.write(encodedMessage);

        if (message.constructor.name == 'SetMode') {
          this.compression = message.compression;
        }
      }
    } catch (e) {
      this.logger.info('send failed', e.stack);
      this.emit('error2', e);
    }
  };

  Connection.prototype.end = function () {
    if (this.socket) {
      this.socket.end();
    }
  };

  return Connection;
}(EventEmitter);

var _default = Connection;
exports.default = _default;
},{"./message":"KLMq","../iconv":"m2ac"}],"ZRYf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.widgetType = exports.widgetTargetMood = exports.widgetBehavior = exports.translateConnectionStatus = exports.menuMode = exports.connectionTypeName = exports.connectionType = exports.connectionStatus = exports.allConnectionTypes = void 0;
var widgetType = {
  bar: 0,
  pie: 1,
  line: 2,
  list: 3,
  gauge: 4,
  header: 5,
  value: 6
};
exports.widgetType = widgetType;
var widgetBehavior = {
  individual: 0,
  average: 1,
  sum: 2,
  averageNonZero: 3
};
exports.widgetBehavior = widgetBehavior;
var widgetTargetMood = {
  bad: 0,
  expected: 1,
  good: 2
};
exports.widgetTargetMood = widgetTargetMood;
var connectionType = {
  mdc: 'mdc-13',
  dnc: 'dnc-37'
};
exports.connectionType = connectionType;

var connectionTypeName = function connectionTypeName(connType) {
  switch (connType) {
    case connectionType.mdc:
      return 'mdc';

    case connectionType.dnc:
      return 'dnc';

    default:
      return '';
  }
};

exports.connectionTypeName = connectionTypeName;
var allConnectionTypes = [connectionType.mdc, connectionType.dnc];
exports.allConnectionTypes = allConnectionTypes;
var connectionStatus = {
  unavailable: 'unavailable-39',
  offline: 'offline-31',
  connecting: 'connecting-42',
  claimingLicense: 'claiming-license-2',
  licensed: 'licensed-1337',
  authenticating: 'authenticating-4449',
  authenticated: 'authenticated-241'
};
exports.connectionStatus = connectionStatus;

var translateConnectionStatus = function translateConnectionStatus(s) {
  switch (s) {
    case connectionStatus.unavailable:
      return 'Unavailable';

    case connectionStatus.offline:
    case connectionStatus.connecting:
      return 'Connecting to backend';

    case connectionStatus.claimingLicense:
      return 'Claiming License';

    case connectionStatus.licensed:
    case connectionStatus.authenticated:
    case connectionStatus.authenticating:
      return 'Authenticating';

    default:
      return 'Unknown';
  }
};

exports.translateConnectionStatus = translateConnectionStatus;
var menuMode = {
  connecting: 'connecting-1',
  selectProtocol: 'selectProtocol-2',
  connectingProtocol: 'connectingProtocol-412',
  login: 'login-3',
  in: 'in-5'
};
exports.menuMode = menuMode;
},{}],"DYWH":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var _connection = _interopRequireDefault(require("./connection"));

var _message = _interopRequireDefault(require("./message"));

var _enums = require("../enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

function __range__(left, right, inclusive) {
  var range = [];
  var ascending = left < right;
  var end = !inclusive ? right : ascending ? right + 1 : right - 1;

  for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }

  return range;
}

var Client =
/** @class */
function (_super) {
  __extends(Client, _super);

  function Client(_a, _b) {
    var host = _a.host,
        port = _a.port;
    var clientId = _b.clientId,
        logger = _b.logger,
        configServer = _b.configServer,
        sharedMdcClient = _b.sharedMdcClient,
        username = _b.username,
        password = _b.password;

    var _this = _super.call(this) || this;

    _this.ended = false;
    _this.permissions = null;
    _this.connectionCheckInterval = null;
    _this.sendLogin = _this.sendLogin.bind(_this);
    _this.end = _this.end.bind(_this);
    _this.host = host;
    _this.port = port;
    _this.logger = logger;
    _this.configServer = configServer;
    _this.sharedMdcClient = sharedMdcClient;
    _this.clientId = clientId;
    _this.username = username;
    _this.password = password;
    _this.mdcConnection = new _connection.default({
      host: _this.host,
      port: _this.port,
      logger: _this.logger.subLogger('Connection'),
      overriddenEncoding: configServer.config.encoding,
      skipAscii: _this.configServer.config.skipAsciiStrings
    });

    var configServerListener = function configServerListener() {
      return _this.emit('updateScreens');
    };

    _this.configServer.on('update', configServerListener);

    _this.mdcConnection.on('ReceiveAcceptUpdate', function (msg) {
      _this.serverConfigVersion = msg.configVersion;

      _this.connectionCheck();
    });

    _this.mdcConnection.once('ReceiveAcceptUpdate', function (msg) {
      // Attempt to claim license repeatedly until connected
      var setMode = function setMode() {
        if (_this.ended) {
          return;
        }

        _this.emit('status', _enums.connectionStatus.claimingLicense);

        _this.mdcConnection.sendMessage(new _message.default.SetMode(_message.default.SetModeOption.web, _this.clientId, _this.configServer.config.compression));

        _this.mdcConnection.once('ReceiveExtendedResponse', function (success, msg) {
          if (success) {
            if (_this.username || _this.password) {
              _this.emit('status', _enums.connectionStatus.authenticating);

              _this.sendLogin(username || '', password || '', function (succ) {
                if (succ) {
                  _this.emit('status', _enums.connectionStatus.authenticated);
                } else {
                  _this.emit('status', _enums.connectionStatus.licensed);
                }

                _this.emit('connect-done', {
                  loggedIn: succ,
                  licenseInfo: {
                    shopfloor: msg.body.SHOPFLOORENABLED
                  }
                });
              });
            } else {
              _this.emit('connect-done', {
                loggedIn: false,
                licenseInfo: {
                  shopfloor: msg.body.SHOPFLOORENABLED
                }
              });

              _this.emit('status', _enums.connectionStatus.licensed);
            }
          } else {
            setTimeout(function () {
              return setMode();
            }, 1000);
          }
        });
      };

      setMode();
    });

    var disconnectedOnce = false;

    var disconnected = function disconnected(err) {
      if (err === void 0) {
        err = null;
      }

      if (err) {
        _this.logger.error('Connection.end error:', err);
      }

      if (disconnectedOnce) {
        return;
      }

      disconnectedOnce = true;

      _this.clearConnectionCheck();

      _this.configServer.removeListener('update', configServerListener);

      _this.emit('end', err);
    };

    _this.mdcConnection.on('error2', disconnected);

    _this.mdcConnection.on('end', disconnected);

    return _this;
  }

  Client.prototype.sendLogin = function (username, password, cb) {
    var _this = this;

    this.mdcConnection.sendMessage(new _message.default.LoginRequest(username, password));
    this.mdcConnection.once('ReceiveExtendedResponse', function (success, msg) {
      if (success) {
        _this.permissions = msg.body;

        if (typeof _this.permissions.USE.SCREENS == 'string') {
          _this.permissions.USE.SCREENS = _this.permissions.USE.SCREENS.split(',');
        }

        _this.permissions.USE.SCREENS = _this.permissions.USE.SCREENS.filter(function (v) {
          return v;
        }).map(function (v) {
          return parseInt(v, 10);
        });
      }

      cb(success);
    });
  };

  Client.prototype.end = function () {
    this.mdcConnection.end();
    this.ended = true;
    this.emit('status', _enums.connectionStatus.offline);
  };

  Client.prototype.clearConnectionCheck = function () {
    if (this.connectionCheckInterval) {
      clearInterval(this.connectionCheckInterval);
      this.connectionCheckInterval = null;
    }
  };

  Client.prototype.connectionCheck = function () {
    var _this = this;

    this.clearConnectionCheck();
    var ok = true;
    var interval = 60 * 1000;

    var check = function check() {
      if (!ok) {
        _this.logger.error('Client connection check failed!');

        _this.mdcConnection.end();

        return;
      }

      ok = false;

      _this.sendKeepAlive(function (alive) {
        if (alive) {
          ok = true;
        }
      });
    };

    this.connectionCheckInterval = setInterval(check, interval);
  };
  /* MDC Connection and Data Gathering */


  Client.prototype.getDowntimeList = function (machineId, screenId, callback) {
    this.mdcConnection.sendMessage(new _message.default.DatabaseRequest(['downtimelist', "" + machineId, "" + screenId])); // Know that 1. entry in reply message is object with keys as TAG and value for each key is corresponding description
    // msg[vals][1]

    var handler = function handler(msg) {
      var downtimeEntries = [];
      var reasons = []; // Split array by occurence of '[]'

      var splitIntoChunks = [];

      for (var _i = 0, _a = msg.vals.slice(1); _i < _a.length; _i++) {
        var item = _a[_i];

        if (item.name === '[]') {
          splitIntoChunks.push([]);
        } else {
          splitIntoChunks[splitIntoChunks.length - 1].push(item);
        }
      } // The first one is always the reasons


      if (splitIntoChunks[0]) {
        for (var _b = 0, _c = splitIntoChunks[0]; _b < _c.length; _b++) {
          var val = _c[_b];
          reasons.push({
            key: val.name,
            description: val.value
          });
        }
      } // The second and onward is always downtime entries


      for (var _d = 0, _e = splitIntoChunks.slice(1); _d < _e.length; _d++) {
        item = _e[_d];
        var downtime = {};

        for (var _f = 0, item_1 = item; _f < item_1.length; _f++) {
          val = item_1[_f];
          downtime[val.name] = val.value;
        }

        downtimeEntries.push(downtime);
      }

      callback(reasons, downtimeEntries);
    };

    this.mdcConnection.once('ReceiveDatabaseResponse', handler);
  }; // Update from backdate list, with chosen downtime reason and note.


  Client.prototype.updateDowntimeEntry = function (machineId, screenId, dbEntry, callback) {
    var _this = this;

    var screen = this.sharedMdcClient.dataProvider.getScreenFullState(screenId);

    if (screen == null) {
      return;
    }

    if (!screen.machines.find(function (machine) {
      return machine.id === machineId;
    })) {
      return;
    } // dbEntry must follow the DOWNTIMEITEM struct from c++ definition
    // This is what we expect and use


    var entries = dbEntry.filter(function (value) {
      return value.state === 1;
    });
    var msgs = entries.map(function (value) {
      return new _message.default.DatabaseRequest(['downtimeupdate', screenId, value.id, value.msgId, value.message, value.text, value.from, value.to, value.duration, value.note || '', value.state, value.monitortime, value.monitortext, value.monitorfile, value.monitorprogram, value.monitorjob, value.monitoroperator, value.monitorerrinfo, value.monitorerrdesc, value.monitorvar1, value.monitorvar2, value.monitorvar3, value.monitorvar4, value.monitorvar5, value.monitorvar6, value.monitorvar7, value.monitorvar8]);
    });

    var sendOne = function sendOne() {
      if (!msgs.length) {
        return callback();
      }

      var msg = msgs.shift();

      _this.mdcConnection.sendMessage(msg);

      _this.mdcConnection.once('ReceiveDatabaseResponse', function () {
        return sendOne();
      });
    };

    return sendOne();
  };

  Client.prototype.sendKeepAlive = function (callback) {
    // Send keep alive signal to live protocol to try and prevent stale untasty connection
    // Assume bad connection
    this.mdcConnection.sendMessage(new _message.default.DatabaseRequest(['keepalive', '']));

    var handler = function handler(msg) {
      callback(true);
    };

    this.mdcConnection.once('ReceiveDatabaseResponse', handler);
  };

  Client.prototype.sendButtonClick = function (_a) {
    var machineId = _a.machineId,
        screenId = _a.screenId,
        buttonId = _a.buttonId,
        data = _a.data;
    var screen = this.sharedMdcClient.dataProvider.getScreenFullState(screenId);

    if (screen == null || screen.type != 'operator') {
      this.logger.error("Ignoring click, screen with id '" + screenId + "' does not exist");
      return;
    }

    var button = screen.buttons.find(function (button) {
      return button.id === buttonId;
    });

    if (button == null) {
      this.logger.error("Ignoring click, button with id '" + buttonId + "' in screen with id '" + screenId + "' does not exist");
      return;
    }

    this.logger.log("Processing button click");

    if (button.action.type === 'standard' && button.action.sendMessage || button.action.type === 'extended' && [1, 6, 9].indexOf(button.action.actionId) >= 0) {
      var settings = {
        machineId: machineId,
        buttonId: buttonId - 1,
        screenId: screenId,
        data: data
      };
      var message = new _message.default.ButtonClick(settings);

      try {
        return this.mdcConnection.sendMessage(message);
      } catch (e) {
        return this.logger.error('Failed to send button click', e);
      }
    } else if (button.action.type === 'extended' && [2, 4, 5, 7].indexOf(button.action.actionId) >= 0) {
      var action = null;

      if (button.action.actionId === 2) {
        action = 'externalcommand';
      } else {
        action = 'downtimesimpleupdate';
      }

      return this.mdcConnection.sendMessage(new _message.default.DatabaseRequest([action, "" + machineId, "" + screenId, "" + (buttonId - 1), "" + button.action.actionId]));
    } else {
      this.logger.error("Unimplemented button action");
    }
  };

  Client.prototype.sendOperatorListRequest = function (_a) {
    var screenId = _a.screenId,
        buttonId = _a.buttonId,
        cb = _a.cb;
    this.mdcConnection.sendMessage(new _message.default.OperatorListRequest({
      screenId: screenId,
      buttonId: buttonId - 1
    }));

    var handler = function handler(msg) {
      cb(msg.data);
    };

    this.mdcConnection.once('ReceiveOperatorListResponse', handler);
  };

  Client.prototype.sendQueryResultRequest = function (_a) {
    var screenId = _a.screenId,
        buttonId = _a.buttonId,
        machineId = _a.machineId,
        cb = _a.cb;
    this.mdcConnection.sendMessage(new _message.default.DatabaseQueryRequest({
      screenId: screenId,
      buttonId: buttonId - 1,
      machineId: machineId
    }));

    var handler = function handler(msg) {
      cb(msg.data);
    };

    this.mdcConnection.once('ReceiveDatabaseQueryResponse', handler);
  };

  Client.prototype.sendInputSubmit = function (_a) {
    var machineId = _a.machineId,
        screenId = _a.screenId,
        inputId = _a.inputId,
        value = _a.value;
    var screen = this.sharedMdcClient.dataProvider.getScreenFullState(screenId);

    if (screen == null || screen.type != 'operator') {
      return;
    }

    if (!screen.inputs.find(function (input) {
      return input.id === inputId;
    })) {
      return;
    }

    inputId--;
    var settings = {
      machineId: machineId,
      inputId: inputId,
      screenId: screenId,
      value: value
    };
    var message = new _message.default.FieldSubmit(settings);

    try {
      this.mdcConnection.sendMessage(message);
    } catch (e) {
      this.logger.error('Failed to send field submit', e);
    }
  };
  /* Helpers for data fetching */


  Client.prototype.createScreen = function (screenType, title, liveScreenId) {
    if (screenType != 'shopfloor') {
      throw new Error("Can only create shop floor screens with the API (" + screenType + ")");
    }

    var standardPositions = [{
      machineId: -1,
      type: 'circle',
      x: 14,
      y: 15,
      diameter: 5
    }, {
      machineId: -1,
      type: 'rectangle',
      x: 4,
      y: 2,
      height: 2,
      width: 4,
      rotation: 0
    }, {
      machineId: -1,
      type: 'rectangle',
      x: 10,
      y: 10,
      height: 3,
      width: 5,
      rotation: 0
    }, {
      machineId: -1,
      type: 'rectangle',
      x: 20,
      y: 10,
      height: 3,
      width: 5,
      rotation: 0
    }, {
      machineId: -1,
      type: 'rectangle',
      x: 10,
      y: 15,
      height: 3,
      width: 5,
      rotation: 0
    }, {
      machineId: -1,
      type: 'rectangle',
      x: 11,
      y: 15,
      height: 3,
      width: 5,
      rotation: 0
    }, {
      machineId: -1,
      type: 'rectangle',
      x: 12,
      y: 15,
      height: 3,
      width: 5,
      rotation: 0
    }, {
      machineId: -1,
      type: 'rectangle',
      x: 13,
      y: 15,
      height: 3,
      width: 5,
      rotation: 0
    }, {
      machineId: -1,
      type: 'rectangle',
      x: 14,
      y: 15,
      height: 3,
      width: 5,
      rotation: 0
    }];
    var machinePositions = [];
    var liveScreen = this.sharedMdcClient.dataProvider.getScreenFullState(liveScreenId);

    if (liveScreen == null || liveScreen.type != 'status') {
      return null;
    }

    for (var index = 0; index < liveScreen.machines.length; index++) {
      var machine = liveScreen.machines[index];

      if (standardPositions[index] == null) {
        break;
      }

      standardPositions[index].machineId = machine.id;
      machinePositions.push(standardPositions[index]);
    }

    var screen = {
      id: -1,
      type: screenType,
      DESCRIPTION: title,
      liveScreenId: liveScreenId,
      width: 60,
      height: 35,
      machinePositions: machinePositions,
      background: '/static/gfx/shop-floor-plan.svg'
    };
    var newId = this.configServer.addScreen(screen);
    return newId;
  };

  Client.prototype.deleteScreen = function (screenId) {
    this.configServer.deleteScreen(screenId);
  };

  Client.prototype.saveShopfloorModifications = function (screenId, modifications, deletions, modifiedSize) {
    if (modifiedSize === void 0) {
      modifiedSize = null;
    }

    var screen = this.sharedMdcClient.dataProvider.getScreen(screenId);

    if (screen == null || screen.type != 'shopfloor') {
      throw new Error('The screen does not exist or is not a shopfloor');
    }

    var _loop_1 = function _loop_1() {
      var machineId = parseInt(machineId_, 10);
      var modification = modifications[machineId];
      var existingMachineIndex = screen.machinePositions.findIndex(function (p) {
        return p.machineId === machineId;
      });

      if (existingMachineIndex !== -1) {
        screen.machinePositions[existingMachineIndex] = modification;
        modification.machineId = machineId;
      } else {
        // Insert new position
        modification.machineId = machineId;
        screen.machinePositions.push(modification);
      }
    };

    for (var machineId_ in modifications) {
      _loop_1();
    }

    screen.machinePositions = screen.machinePositions.filter(function (p) {
      return !(p.machineId in deletions);
    });

    if (modifiedSize) {
      screen.width = modifiedSize.width;
      screen.height = modifiedSize.height;
    }

    return this.configServer.updateScreen(screenId, screen);
  };

  Client.prototype.saveShopfloorBackground = function (screenId, background, width, height) {
    this.configServer.setBackground(screenId, background, width, height);
  };

  Client.prototype.isAdmin = function () {
    return this.permissions && this.permissions.ADMIN;
  };

  Client.prototype.canEditScreens = function () {
    if (this.isAdmin()) {
      return true;
    }

    return this.permissions && this.permissions.EDIT.LIVE;
  };

  Client.prototype.canViewScreenType = function (screenType) {
    if (this.isAdmin()) {
      return true;
    }

    if (!this.permissions || !this.permissions.SEE) {
      return false;
    }

    switch (screenType) {
      case 'status':
        return this.permissions.SEE.LIVE;

      case 'shopfloor':
        // Because they are based on status screens
        return this.permissions.SEE.LIVE;

      case 'operator':
        return this.permissions.SEE.OPERATOR;
      // Does not exist

      case 'dashboard_':
        return this.permissions.SEE.DASHBOARD;
    }

    return true;
  };

  Client.prototype.canViewScreen = function (screenId) {
    // parseInt of 'document' screen does not work
    if (typeof screenId == 'string' && screenId.match(/^\d+$/)) {
      screenId = parseInt(screenId, 10);
    }

    if (typeof screenId == 'string') {
      // It's a document
      return true;
    }

    var screen = this.sharedMdcClient.dataProvider.getScreen(screenId);

    if (!screen) {
      return false;
    }

    if (this.isAdmin()) {
      return true;
    }

    if (!this.canViewScreenType(screen.type)) {
      return false;
    }

    if (screen.type == 'dashboard' || screen.type == 'document') {
      return true;
    } // This field is seemingly always empty


    if (this.permissions.USE && this.permissions.USE.SCREENS) {
      if (screen.type == 'shopfloor') {
        return this.permissions.USE.SCREENS.indexOf(screen.liveScreenId) >= 0;
      } else {
        return this.permissions.USE.SCREENS.indexOf(screenId) >= 0;
      }
    }

    return false;
  };

  return Client;
}(_events.EventEmitter);

var _default = Client;
exports.default = _default;
},{"./connection":"npR0","./message":"KLMq","../enums":"ZRYf"}],"g0gP":[function(require,module,exports) {
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IPCHeaderSize = exports.IPCHeaderMagicQueueOperation = exports.IPCHeaderMagic = exports.IPCHeader = void 0;
var IPCHeaderSize = 16;
exports.IPCHeaderSize = IPCHeaderSize;
var IPCHeaderMagic = 0xd274a39e;
exports.IPCHeaderMagic = IPCHeaderMagic;
var IPCHeaderMagicQueueOperation = 0x25d80c37;
exports.IPCHeaderMagicQueueOperation = IPCHeaderMagicQueueOperation;

var IPCHeader =
/** @class */
function () {
  function IPCHeader() {
    this.magic = 0;
    this.command = 0;
    this.length = 0;
    this.sequence = 0;
  }

  IPCHeader.prototype.encode = function (buf) {
    buf.writeUInt32LE(this.magic, 0);
    buf.writeUInt32LE(this.command, 4);
    buf.writeUInt32LE(this.length, 8);
    buf.writeUInt32LE(this.sequence, 12);
  };

  IPCHeader.prototype.decode = function (buf) {
    this.magic = buf.readUInt32LE(0);
    this.command = buf.readUInt32LE(4);
    this.length = buf.readUInt32LE(8);
    this.sequence = buf.readUInt32LE(12);
  };

  return IPCHeader;
}();

exports.IPCHeader = IPCHeader;
},{}],"MvJ9":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var ids = {
  IPC_CMD_CONNECTION_READY: 0x00000001,
  IPC_CMD_LOGIN_REQUEST: 0x00000002,
  IPC_CMD_LOGIN_REPLY: 0x00000003,
  IPC_CMD_LOGIN_ACCEPTED: 0x00000004,
  IPC_CMD_LOGIN_REJECTED: 0x00000005,
  IPC_CMD_PING: 0x00000006,
  IPC_CMD_GET_SERVER_ID: 0x00000007,
  IPC_CMD_SET_SERVER_ID: 0x00000008,
  IPC_CMD_GET_SRV_NAMEDESC: 0x00000009,
  IPC_CMD_SET_SRV_NAMEDESC: 0x0000000a,
  IPC_CMD_GET_SRV_INFO: 0x0000000b,
  IPC_CMD_SET_SRV_INFO: 0x0000000c,
  IPC_CMD_GET_NCBASE_PORTS: 0x0000000d,
  IPC_CMD_SET_NCBASE_PORTS: 0x0000000e,
  IPC_CMD_GET_NCBASE_USERS: 0x0000000f,
  IPC_CMD_SET_NCBASE_USERS: 0x00000010,
  IPC_CMD_GET_NCBASE_LOGIN: 0x00000011,
  IPC_CMD_SET_NCBASE_LOGIN: 0x00000012,
  IPC_CMD_GET_MACHINE_LIST: 0x00000100,
  IPC_CMD_LOG_GET_ALL: 0x00000101,
  IPC_CMD_SAVE_FILE: 0x00000102,
  IPC_CMD_RENAME_GROUP: 0x00000103,
  IPC_CMD_ADD_MACHINE: 0x00000200,
  IPC_CMD_REMOVE_MACHINE: 0x00000201,
  IPC_CMD_STATUS_INFO: 0x00000202,
  IPC_CMD_STATUS_INFO_REQ: 0x00000203,
  IPC_CMD_STATUS_INFO_OFF: 0x00000204,
  IPC_CMD_DEBUG_INFO: 0x00000205,
  IPC_CMD_DEBUG_INFO_REQ: 0x00000206,
  IPC_CMD_DEBUG_INFO_OFF: 0x00000207,
  IPC_CMD_SERIAL_DATA: 0x00000208,
  IPC_CMD_SERIAL_DATA_REQ: 0x00000209,
  IPC_CMD_SERIAL_DATA_OFF: 0x0000020a,
  IPC_CMD_LOG_INFO: 0x0000020b,
  IPC_CMD_QUEUE_FILE: 0x0000020c,
  IPC_CMD_QUEUE_UPDATE: 0x0000020d,
  IPC_CMD_QUEUE_GET_ALL: 0x0000020e,
  IPC_CMD_SET_FEED_SPEED: 0x0000020f,
  IPC_CMD_PRINT_FILE: 0x00000210,
  IPC_CMD_QUEUE_MOVE: 0x00000211,
  IPC_CMD_UPDATE_MACHINE: 0x00000212,
  IPC_CMD_UPDATE_GROUP: 0x00000213,
  IPC_CMD_PRGLIST_UPDATED: 0x00000214,
  IPC_CMD_DIRLIST_UPDATED: 0x00000215,
  IPC_CMD_GET_DIRLIST_UPD: 0x00000216,
  IPC_CMD_DIR_INFO_GET: 0x00000220,
  IPC_CMD_DIR_INFO_SET: 0x00000221,
  IPC_CMD_DIR_SEND_SET: 0x00000222,
  IPC_CMD_DIR_RECV_SET: 0x00000223,
  IPC_CMD_DIR_SYNC_SET: 0x00000224,
  IPC_CMD_ENV_INFO_GET: 0x00000225,
  IPC_CMD_ENV_INFO_SET: 0x00000226,
  IPC_CMD_PRG_INFO_GET: 0x00000227,
  IPC_CMD_PRG_INFO_SET: 0x00000228,
  IPC_CMD_REQ_SETS_GET: 0x00000229,
  IPC_CMD_REQ_SETS_SET: 0x0000022a,
  IPC_CMD_CLEAR_MAZAK_FILE: 0x0000022b,
  IPC_CMD_LOCK_MACH_CFG: 0x00000300,
  IPC_CMD_UNLOCK_MACH_CFG: 0x00000301,
  IPC_CMD_UPDATE_MACH_CFG: 0x00000302,
  IPC_CMD_ADD_NEW_CFG: 0x00000304,
  IPC_CMD_DEL_CFG: 0x00000305,
  IPC_CMD_ENABLE_CFG: 0x00000306,
  IPC_CMD_DISABLE_CFG: 0x00000307,
  IPC_CMD_START_STOP_PORT: 0x00000308,
  IPC_CMD_RENAME_CFG: 0x00000309,
  IPC_CMD_DISCONNECT_PORT: 0x0000030a,
  IPC_CMD_SET_SERVER_CFG: 0x00000401,
  IPC_CMD_SET_RESTART_SRV: 0x00000402,
  IPC_CMD_RET_RESTART_SRV: 0x00000403,
  IPC_CMD_GET_ACTIVE_PORTS: 0x00000404,
  IPC_CMD_RET_ACTIVE_PORTS: 0x00000405,
  IPC_CMD_GET_DRV_TYPE: 0x00010001,
  IPC_CMD_RET_DRV_TYPE: 0x00020001,
  IPC_CMD_GET_DIR_LIST: 0x00010002,
  IPC_CMD_RET_DIR_LIST: 0x00020002,
  IPC_CMD_GET_ENUM_NETWORK: 0x00010003,
  IPC_CMD_RET_ENUM_NETWORK: 0x00020003,
  IPC_CMD_GET_FILE: 0x00010004,
  IPC_CMD_RET_FILE: 0x00020004,
  IPC_CMD_GET_PORT_LIST: 0x00010005,
  IPC_CMD_RET_PORT_LIST: 0x00020005,
  IPC_CMD_GET_APP_PATH: 0x00010006,
  IPC_CMD_RET_APP_PATH: 0x00020006,
  IPC_CMD_GET_LOCK_NO: 0x00010007,
  IPC_CMD_RET_LOCK_NO: 0x00020007,
  IPC_CMD_GET_AUG_INFO: 0x00010008,
  IPC_CMD_RET_AUG_INFO: 0x00020008,
  IPC_CMD_GET_DRV_LIST_STR: 0x00010009,
  IPC_CMD_RET_DRV_LIST_STR: 0x00020009,
  IPC_CMD_GET_FIL_LIST_STR: 0x0001000a,
  IPC_CMD_RET_FIL_LIST_STR: 0x0002000a,
  IPC_CMD_GET_VALID_FILE: 0x0001000b,
  IPC_CMD_RET_VALID_FILE: 0x0002000b,
  IPC_CMD_GET_VALID_PATH: 0x0001000c,
  IPC_CMD_RET_VALID_PATH: 0x0002000c,
  IPC_CMD_GET_PRINTER_LIST: 0x0001000d,
  IPC_CMD_RET_PRINTER_LIST: 0x0002000d,
  IPC_CMD_GET_DIRLIST_LIST: 0x0001000e,
  IPC_CMD_RET_DIRLIST_LIST: 0x0002000e,
  IPC_CMD_GET_SERVER_CFG: 0x0001000f,
  IPC_CMD_RET_SERVER_CFG: 0x0002000f,
  IPC_CMD_GET_PRG_REQ: 0x00010010,
  IPC_CMD_RET_PRG_REQ: 0x00020010,
  IPC_CMD_GET_PRG_RECV: 0x00010011,
  IPC_CMD_RET_PRG_RECV: 0x00020011,
  IPC_CMD_GET_FILEINFO: 0x00010012,
  IPC_CMD_RET_FILEINFO: 0x00020012,
  IPC_CMD_GET_CREATE_DIR: 0x00010013,
  IPC_CMD_RET_CREATE_DIR: 0x00020013,
  IPC_CMD_GET_FILE_CHUNK: 0x00010014,
  IPC_CMD_RET_FILE_CHUNK: 0x00020014,
  IPC_CMD_GET_OFFSET_CMD: 0x00010015,
  IPC_CMD_RET_OFFSET_CMD: 0x00020015,
  IPC_CMD_GET_DIRLIST_DEV: 0x00010016,
  IPC_CMD_RET_DIRLIST_DEV: 0x00020016,
  IPC_CMD_GET_GLOBAL_CHK: 0x00010017,
  IPC_CMD_RET_GLOBAL_CHK: 0x00020017,
  IPC_CMD_GET_GLOBAL_UPD: 0x00010018,
  IPC_CMD_RET_GLOBAL_UPD: 0x00020018,
  IPC_CMD_GET_PREVIEW_FILE: 0x00010019,
  IPC_CMD_RET_PREVIEW_FILE: 0x00020019,
  IPC_CMD_GET_BACKUP_SRV: 0x0001001a,
  IPC_CMD_RET_BACKUP_SRV: 0x0002001a,
  IPC_CMD_GET_RESTORE_SRV: 0x0001001b,
  IPC_CMD_RET_RESTORE_SRV: 0x0002001b,
  IPC_CMD_GET_OPEN_LOCAL: 0x0001001c,
  IPC_CMD_RET_OPEN_LOCAL: 0x0002001c,
  IPC_CMD_GET_SAVE_LOCAL: 0x0001001d,
  IPC_CMD_RET_SAVE_LOCAL: 0x0002001d,
  IPC_CMD_GET_CLOSE_LOCAL: 0x0001001e,
  IPC_CMD_RET_CLOSE_LOCAL: 0x0002001e,
  IPC_CMD_GET_OPERATION_ID: 0x0002001f,
  IPC_CMD_SET_OPERATION_ID: 0x00020020,
  IPC_CMD_DNCCLIENT_LICENSE_REQUEST: 0x00000013,
  IPC_CMD_DNCCLIENT_LICENSE_REPLY: 0x00000014,
  IPC_CMD_DNCCLIENT_LICENSE_RELEASE: 0x00000015
};
var _default = ids;
exports.default = _default;
},{}],"d1xE":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var cst = {
  //# # Adjust feed/speed
  NC_ADJUST_TYPE_FEED: 0x0001,
  NC_ADJUST_TYPE_SPINDLE: 0x0002,
  NC_ADJUST_TYPE_MASK: 0x000f,
  NC_ADJUST_RELATIVE: 0x0010,
  NC_ADJUST_ABSOLUTE: 0x0020,
  NC_ADJUST_REL_ABS_MASK: 0x0030,
  NC_ADJUST_ALLOW_RELATIVE: 0x0040,
  NC_ADJUST_ALLOW_ABSOLUTE: 0x0080,
  NC_ADJUST_ALLOW_MASK: 0x00c0,
  NC_ADJUST_TYPE_INT: 0x0100,
  NC_ADJUST_TYPE_DIGITS: 0x0200,
  NC_ADJUST_TYPE_FLOAT: 0x0400,
  NC_ADJUST_FLOAT_USECOMMA: 0x0800,
  NC_ADJUST_INSERT_NONE: 0x1000,
  NC_ADJUST_INSERT_START: 0x2000,
  NC_ADJUST_INSERT_END: 0x4000,
  NC_ADJUST_INSERT_LINE: 0x8000,
  NC_ADJUST_DIGITS_MASK: 0xf0000,
  DNC_STATUS_STATE_RX: 0x01,
  DNC_STATUS_STATE_TX: 0x02,
  DNC_STATUS_STATE_RTS: 0x04,
  DNC_STATUS_STATE_CTS: 0x08,
  DNC_STATUS_STATE_DTR: 0x10,
  DNC_STATUS_STATE_DSR: 0x20,
  DNC_STATUS_STATE_XOFF: 0x40,
  DNC_STATUS_STATE_ERR: 0x80,
  IPC_NOTIFY_INFO: 0x0001,
  IPC_NOTIFY_DEBUG: 0x0002,
  IPC_NOTIFY_SERIAL_DATA: 0x0004,
  DIR_MODE_SEND_ENABLE: 0x0001,
  DIR_MODE_SEND_ALWAYS: 0x0002,
  DIR_MODE_SEND_ACTIVE: 0x0004,
  DIR_MODE_RECV_ENABLE: 0x0008,
  DIR_MODE_RECV_ALWAYS: 0x0010,
  DIR_MODE_RECV_ACTIVE: 0x0020,
  DIR_MODE_SEND_RECV_SYNC: 0x0040,
  PROTOCOL_INFO_ALL_MASK: 0x00ffffff,
  PROTOCOL_INFO_SPECIFIC_MASK: 0x0fff,
  PROTOCOL_INFO_GENERIC_BRIDGEPORT: 0x0001,
  PROTOCOL_INFO_GENERIC_SELECT_RXDIR: 0x0002,
  PROTOCOL_INFO_MAZAK_NORMAL_MODE: 0x0001,
  PROTOCOL_INFO_MAZAK_DISK_MODE: 0x0002,
  PROTOCOL_INFO_MAZAK_ISO_SEND_ENABLED: 0x0004,
  PROTOCOL_INFO_MAZAK_ISO_RECV_ENABLED: 0x0008,
  PROTOCOL_INFO_MAZAK_LIMITACCESS_DATA: 0x0100,
  PROTOCOL_INFO_MAZAK_LIMITDATA_ONLY: 0x0200,
  PROTOCOL_INFO_MAZAK_RECVTOFILE: 0x0400,
  PROTOCOL_INFO_MAZAK_TRAN_EXT_ONLY: 0x0800,
  PROTOCOL_INFO_HHFE_COPY_SEND_ENABLED: 0x0001,
  PROTOCOL_INFO_AGIE_SEND_DIR_ENABLED: 0x0002,
  PROTOCOL_INFO_SPLIT_SEND_ENABLED: 0x0001,
  PROTOCOL_INFO_SPLIT_RECV_ENABLED: 0x0002,
  PROTOCOL_INFO_SPLIT_SEND_RECV: 0x0004,
  PROTOCOL_INFO_SPLIT_SEND_ALWAYS: 0x0008,
  PROTOCOL_INFO_GLOBAL_MASK: 0x0000ff000,
  PROTOCOL_INFO_USE_SENDROOT: 0x000001000,
  PROTOCOL_INFO_USE_RECVROOT: 0x000002000,
  PROTOCOL_INFO_USE_SENDROOT_ONLY: 0x000004000,
  PROTOCOL_INFO_USE_RECVROOT_ONLY: 0x000008000,
  PROTOCOL_INFO_LIMIT_SEND_EXT: 0x000010000,
  PROTOCOL_INFO_LIMIT_RECV_EXT: 0x000020000,
  PROTOCOL_INFO_DIR_UPD_MASK: 0x00e00000,
  PROTOCOL_INFO_DIR_UPD_INC: 0x00200000,
  PROTOCOL_INFO_FILE_PRG_UPD_MASK: 0x1f000000,
  PROTOCOL_INFO_FILE_PRG_UPD_INC: 0x01000000,
  PROTOCOL_INFO_ENV_UPD_MASK: 0xe0000000,
  PROTOCOL_INFO_ENV_UPD_INC: 0x20000000,
  PROTOCOL_INFO_PERSIST_MASK: 0xe0000000,
  MAX_EXPORT_QUEUE_LEN: 256,
  //# # The following defines describes what the port is currently doing ## # DNC Transfer status information
  DNC_MASK_START_STOP: 0x01000000,
  DNC_MASK_IDLE: 0x02000000,
  DNC_MASK_SEND: 0x04000000,
  DNC_MASK_RECV: 0x08000000,
  DNC_MASK_PAUSED: 0x10000000,
  DNC_MASK_OK: 0x1f000000,
  DNC_MASK_ACTIVE: 0x1e000000,
  DNC_MASK_RUNNING: 0x1c000000,
  DNC_MASK_SENDRECV: 0x0c000000,
  DNC_MASK_STATUS: 0xff000000,
  DNC_PORT_MASK: 0xff000000,
  // DNC_PORT_PROTOCOL_MASK was defined here previously
  DNC_PROTOCOL_MASK: 0xff,
  DNC_PROTOCOL_SS_UNKNOWN: 0x01,
  DNC_PROTOCOL_SS_ENABLED: 0x02,
  DNC_PROTOCOL_SS_DISABLED: 0x03,
  DNC_PROTOCOL_SS_START_ERROR: 0x04,
  DNC_PROTOCOL_SS_STARTING: 0x05,
  DNC_PROTOCOL_SS_SHUTDOWN: 0x06,
  DNC_PROTOCOL_SS_STOPPED: 0x07,
  DNC_PROTOCOL_SS_WAIT: 0x08,
  DNC_PROTOCOL_SEND_START: 0x01,
  DNC_PROTOCOL_SEND_START_WAIT_DATA: 0x02,
  DNC_PROTOCOL_SEND_START_WAIT_TIME: 0x03,
  DNC_PROTOCOL_SEND_START_FEED: 0x04,
  DNC_PROTOCOL_SEND_FEED_BEFORE_FILE: 0x05,
  DNC_PROTOCOL_SEND_FILE: 0x06,
  DNC_PROTOCOL_SEND_FILE_RESTART: 0x07,
  DNC_PROTOCOL_SEND_FILE_CONT: 0x08,
  DNC_PROTOCOL_SEND_END_FEED: 0x09,
  DNC_PROTOCOL_SEND_PAUSE_FEED: 0x0a,
  DNC_PROTOCOL_SEND_PAUSED: 0x0b,
  DNC_PROTOCOL_SEND_RESTART_FEED: 0x0c,
  DNC_PROTOCOL_SEND_RESTART_FEED_POS: 0x0d,
  DNC_PROTOCOL_SEND_STOP_FEED: 0x0e,
  DNC_PROTOCOL_SEND_FINISHED: 0x0f,
  DNC_PROTOCOL_RECV_START: 0x10,
  DNC_PROTOCOL_RECV_BEFORE_SOF_TRIG: 0x20,
  DNC_PROTOCOL_RECV_FILE_CONTENTS: 0x30,
  DNC_PROTOCOL_RECV_AFTER_EOF_TRIG: 0x40,
  DNC_PROTOCOL_RECV_SEND_END: 0x50,
  DNC_PROTOCOL_RECV_FINISHED: 0x60,
  DNC_PROTOCOL_RECV_NET_SCAN: 0x70,
  DNC_MODE_MASK: 0xff00,
  DNC_MODE_SEND_AUTO: 0x0100,
  DNC_MODE_SEND_MANUAL: 0x0200,
  DNC_MODE_SEND_REQUEST: 0x0300,
  DNC_MODE_SEND_LISTING: 0x0400,
  DNC_MODE_SEND_REPORT: 0x0500,
  DNC_MODE_RECV_AUTO: 0x0600,
  DNC_MODE_RECV_MANUAL: 0x0700,
  DNC_MODE_RECV_SCAN: 0x0800,
  DNC_SUB_MASK: 0xff0000,
  DNC_SUB_STATUS_CLEAR: 0x000000,
  DNC_SUB_SEND_FEED_START: 0x010000,
  DNC_SUB_SEND_FEED_CHARS: 0x020000,
  DNC_SUB_SEND_FEED_CHARS_CONT: 0x030000,
  DNC_SUB_SEND_FEED_LINES: 0x040000,
  DNC_SUB_SEND_FEED_LINES_CONT: 0x050000,
  DNC_SUB_SEND_FEED_FILE: 0x060000,
  DNC_SUB_SEND_FEED_FILE_CONT: 0x070000,
  DNC_SUB_SEND_FEED_END: 0x080000,
  DNC_SUB_LOOK_FOR_LINE: 0x0a0000,
  DNC_SUB_LOOK_FOR_BLOCK: 0x0b0000,
  DNC_SUB_LOOK_FOR_TOOL: 0x0c0000,
  DNC_SUB_MAZ_MZK: 0x100000,
  DNC_SUB_MAZ_ISO: 0x110000
};
var cst2 = {
  DNC_PORT_PROTOCOL_MASK: cst.DNC_PORT_MASK | cst.DNC_PROTOCOL_MASK,
  DNC_STATUS_IDLE: 0x01 | cst.DNC_MASK_IDLE,
  DNC_STATUS_UNKNOWN: cst.DNC_PROTOCOL_SS_UNKNOWN | cst.DNC_MASK_START_STOP,
  DNC_STATUS_ENABLED: cst.DNC_PROTOCOL_SS_ENABLED | cst.DNC_MASK_START_STOP,
  DNC_STATUS_DISABLED: cst.DNC_PROTOCOL_SS_DISABLED | cst.DNC_MASK_START_STOP,
  DNC_STATUS_START_ERROR: cst.DNC_PROTOCOL_SS_START_ERROR | cst.DNC_MASK_START_STOP,
  DNC_STATUS_START_WAIT: cst.DNC_PROTOCOL_SS_WAIT | cst.DNC_MASK_START_STOP,
  DNC_STATUS_STARTING: cst.DNC_PROTOCOL_SS_STARTING | cst.DNC_MASK_START_STOP,
  DNC_STATUS_SHUTTING_DOWN: cst.DNC_PROTOCOL_SS_SHUTDOWN | cst.DNC_MASK_START_STOP,
  DNC_STATUS_STOPPED: cst.DNC_PROTOCOL_SS_STOPPED | cst.DNC_MASK_START_STOP,
  DNC_STATUS_SEND_START: cst.DNC_PROTOCOL_SEND_START | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_START_WAIT: cst.DNC_PROTOCOL_SEND_START_WAIT | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_START_FEED: cst.DNC_PROTOCOL_SEND_START_FEED | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_FILE: cst.DNC_PROTOCOL_SEND_FILE | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_FILE_CONT: cst.DNC_PROTOCOL_SEND_FILE_CONT | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_END_FEED: cst.DNC_PROTOCOL_SEND_END_FEED | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_PAUSE_FEED: cst.DNC_PROTOCOL_SEND_PAUSE_FEED | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_PAUSED: cst.DNC_PROTOCOL_SEND_PAUSED | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_RESTART_FEED: cst.DNC_PROTOCOL_SEND_RESTART_FEED | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_RESTART_FEED_POS: cst.DNC_PROTOCOL_SEND_RESTART_FEED_POS | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_STOP_FEED: cst.DNC_PROTOCOL_SEND_STOP_FEED | cst.DNC_MASK_SEND,
  DNC_STATUS_SEND_FINISHED: cst.DNC_PROTOCOL_SEND_FINISHED | cst.DNC_MASK_SEND,
  DNC_STATUS_RECV_START: cst.DNC_PROTOCOL_RECV_START | cst.DNC_MASK_RECV,
  DNC_STATUS_RECV_BEFORE_SOF_TRIG: cst.DNC_PROTOCOL_RECV_BEFORE_SOF_TRIG | cst.DNC_MASK_RECV,
  DNC_STATUS_RECV_FILE_CONT: cst.DNC_PROTOCOL_RECV_FILE_CONTENTS | cst.DNC_MASK_RECV,
  DNC_STATUS_RECV_AFTER_EOF_TRIG: cst.DNC_PROTOCOL_RECV_AFTER_EOF_TRIG | cst.DNC_MASK_RECV,
  //# # The following defines describes what the port should be doing next ## # Send/receive file loop mode
  DNC_LOOP_MODE_NO_LOOP: 1,
  DNC_LOOP_MODE_FIRST: 2,
  DNC_LOOP_MODE_MIDDLE: 3,
  DNC_LOOP_MODE_LAST: 4,
  DNC_STOPPORT_UNKNOWN: 0,
  DNC_STOPPORT_NOT: 1,
  DNC_STOPPORT_NOW: 2,
  DNC_STOPPORT_AT_IDLE: 3,
  DNC_STARTPORT_UNKNOWN: 0,
  DNC_STARTPORT_NOT: 1,
  DNC_STARTPORT: 2,
  // The following is a list of 'change mode' commands used to change protocol # operations,
  // like 'pause now' or 'stop at next toolchange' #
  DNC_CHANGE_MODE_MASK: 0x03f0,
  DNC_CHANGE_MODE_NONE: 0,
  DNC_SEND_MODE_MASK: 0x0010,
  DNC_SEND_START: 0x0011,
  DNC_SEND_LINE_NUMBER: 0x0012,
  DNC_SEND_BLOCK_NUMBER: 0x0013,
  DNC_SEND_TOOL: 0x0014,
  DNC_SEND_CONTINOUS: 0x0015,
  DNC_SEND_LISTING: 0x0016,
  DNC_SEND_REPORT: 0x0017,
  DNC_RECEIVE_MODE_MASK: 0x0020,
  DNC_RECEIVE_FILE: 0x0021,
  // Receive and save in specified file #	DNC_RECEIVE_TO_DEFAULT: 0x0021
  // Receive and save in default location #	DNC_RECEIVE_TO_OTHER: 0x0022
  // Receive and save in specified file #	DNC_RECEIVE_AUTO: 0x0023
  // Receive and get filename from file # Pause mode ################################
  DNC_PAUSE_MODE_MASK: 0x0040,
  DNC_PAUSE_NOW: 0x0041,
  DNC_PAUSE_LINE_NUMBER: 0x0042,
  DNC_PAUSE_BLOCK_NUMBER: 0x0043,
  DNC_PAUSE_NEXT_TOOL: 0x0044,
  DNC_PAUSE_TOOL: 0x0045,
  DNC_PAUSE_END_OF_LOOP: 0x0046,
  DNC_PAUSE_CLEAR: 0x0047,
  DNC_RESTART_MODE_MASK: 0x0080,
  DNC_RESTART_START: 0x0081,
  DNC_RESTART_CURRENT: 0x0082,
  DNC_RESTART_LINE_NUMBER: 0x0083,
  DNC_RESTART_BLOCK_NUMBER: 0x0084,
  DNC_RESTART_PREV_TOOL: 0x0085,
  DNC_RESTART_TOOL: 0x0086,
  DNC_STOP_MODE_MASK: 0x0100,
  DNC_STOP_NOW: 0x0101,
  DNC_STOP_LINE_NUMBER: 0x0102,
  DNC_STOP_BLOCK_NUMBER: 0x0103,
  DNC_STOP_NEXT_TOOL: 0x0104,
  DNC_STOP_TOOL: 0x0105,
  DNC_STOP_END_OF_LOOP: 0x0106,
  DNC_STOP_CLEAR: 0x0107,
  DNC_CLEAR_MODE_MASKE: 0x0200,
  DNC_CLEAR_ALL: 0x0201,
  DNC_CLEAR_SELECTED: 0x0202,
  DNC_SUSPEND_SELECTED: 0x0203,
  DNC_RESUME_SELECTED: 0x0204,
  DNC_SUP_STOP_MODE_MASK: 0x7f,
  DNC_SUP_STOP_NOW: 0x01,
  DNC_SUP_STOP_LINE_NUMBER: 0x02,
  DNC_SUP_STOP_BLOCK_NUMBER: 0x04,
  DNC_SUP_STOP_NEXT_TOOL: 0x08,
  DNC_SUP_STOP_TOOL: 0x10,
  DNC_SUP_STOP_END_OF_LOOP: 0x20,
  DNC_SUP_STOP_CLEAR: 0x40,
  DNC_SUP_STOP_MODE_ALL: 0x7f,
  DNC_SUP_SEND_MASK: 0x1f,
  DNC_SUP_SEND_START: 0x01,
  DNC_SUP_SEND_LINE_NUMBER: 0x02,
  DNC_SUP_SEND_BLOCK_NUMBER: 0x04,
  DNC_SUP_SEND_TOOL: 0x08,
  DNC_SUP_SEND_CONTINOUS: 0x10,
  DNC_SUP_SEND_MODE_ALL: 0x1f,
  DNC_SUP_CLEAR_MODE_MASK: 0x03,
  DNC_SUP_CLEAR_ALL: 0x01,
  DNC_SUP_CLEAR_SELECTED: 0x02,
  DNC_SUP_CLEAR_MODE_ALL: 0x03,
  DNC_SAVE_FILE_ALWAYS: 0x00,
  DNC_SAVE_FILE_DIFF: 0x01,
  DNC_SAVE_FILE_WHITESPACE: 0x02,
  DNC_EXTREQ_REMREQ: 0x01,
  DNC_EXTREQ_AUTOSAVE: 0x02,
  DNC_EXTREQ_DIRLIST: 0x03,
  DNC_EXTREQ_STOP: 0x04,
  DNC_EXTREQ_PAUSE_TX: 0x05,
  DNC_EXTREQ_RESUME_TX: 0x06
};

for (var x in cst2) {
  cst[x] = cst2[x];
}

cst2 = {};
var _default = cst;
exports.default = _default;
},{}],"yT5D":[function(require,module,exports) {
/*
 * decaffeinate suggestions:
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nameOfMessage = exports.decodeMessage = exports.MessageUpdateGroup = exports.MessageUnknown = exports.MessageUInt32 = exports.MessageStatusInfoRequest = exports.MessageStatusInfo = exports.MessageStartStopPort = exports.MessageSetProgramInfo = exports.MessageSetOperationId = exports.MessageSetDirectoryInfo = exports.MessageSerialDataRequest = exports.MessageSerialData = exports.MessageReturnPreviewFile = exports.MessageReturnFile = exports.MessageReturnActivePorts = exports.MessageQueueUpdateElement = exports.MessageQueueMove = exports.MessageQueueGetAll = exports.MessageQueueFile = exports.MessagePortEnable = exports.MessagePortDisable = exports.MessagePing = exports.MessageLogInfo = exports.MessageLogGetAll = exports.MessageLicenseRequest = exports.MessageLicenseReply = exports.MessageGetProgramInfo = exports.MessageGetPreviewFile = exports.MessageGetOperationId = exports.MessageGetMachineList = exports.MessageGetFileList = exports.MessageGetFile = exports.MessageGetDirectoryInfo = exports.MessageGetDirList = exports.MessageBase = exports.MessageAddMachine = void 0;

var _ipc_command_ids = _interopRequireDefault(require("./ipc_command_ids"));

var _buffer_tools = require("../buffer_tools");

var _flags = _interopRequireDefault(require("../flags"));

var _IPCHeader = require("./IPCHeader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var MessageBase =
/** @class */
function () {
  function MessageBase() {}

  MessageBase.prototype.encode = function (writer, logger) {};

  MessageBase.prototype.decode = function (reader, logger) {};

  MessageBase.prototype.length = function () {
    return 0;
  };

  return MessageBase;
}();

exports.MessageBase = MessageBase;

var MessageUInt32 =
/** @class */
function (_super) {
  __extends(MessageUInt32, _super);

  function MessageUInt32(value) {
    var _this = _super.call(this) || this;

    _this.value = value;
    return _this;
  }

  MessageUInt32.prototype.encode = function (writer, logger) {
    writer.writeUInt32LE(this.value);
  };

  MessageUInt32.prototype.decode = function (reader, logger) {
    this.value = reader.readUInt32LE();
  };

  MessageUInt32.prototype.length = function () {
    return 4;
  };

  return MessageUInt32;
}(MessageBase);

exports.MessageUInt32 = MessageUInt32;

var MessagePing =
/** @class */
function (_super) {
  __extends(MessagePing, _super);

  function MessagePing() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_PING;
    return _this;
  }

  return MessagePing;
}(MessageUInt32);

exports.MessagePing = MessagePing;

var MessageUnknown =
/** @class */
function (_super) {
  __extends(MessageUnknown, _super);

  function MessageUnknown(cmdId, buffer) {
    var _this = _super.call(this) || this;

    _this.cmdId = cmdId;
    _this.buffer = buffer;
    return _this;
  }

  return MessageUnknown;
}(MessageBase);

exports.MessageUnknown = MessageUnknown;

var MessageReturnActivePorts =
/** @class */
function (_super) {
  __extends(MessageReturnActivePorts, _super);

  function MessageReturnActivePorts() {
    var _this = _super.call(this) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_RET_ACTIVE_PORTS;
    _this.portsWithSendRecv = 0;
    _this.portsTotal = 0;
    return _this;
  }

  MessageReturnActivePorts.prototype.decode = function (reader, logger) {
    // The number of active ports with the DNC_MASK_SENDRECV flag set.
    this.portsWithSendRecv = reader.readUInt32LE(); // The number of active ports in total.

    this.portsTotal = reader.readUInt32LE();
  };

  MessageReturnActivePorts.prototype.length = function () {
    return 8;
  };

  return MessageReturnActivePorts;
}(MessageBase);

exports.MessageReturnActivePorts = MessageReturnActivePorts;

var MessageGetMachineList =
/** @class */
function (_super) {
  __extends(MessageGetMachineList, _super);

  function MessageGetMachineList() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_GET_MACHINE_LIST;
    return _this;
  }

  return MessageGetMachineList;
}(MessageBase);

exports.MessageGetMachineList = MessageGetMachineList;

// request status by machine
var MessageStatusInfoRequest =
/** @class */
function (_super) {
  __extends(MessageStatusInfoRequest, _super);

  function MessageStatusInfoRequest() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_STATUS_INFO_REQ;
    return _this;
  }

  return MessageStatusInfoRequest;
}(MessageUInt32);

exports.MessageStatusInfoRequest = MessageStatusInfoRequest;

var MessageSerialDataRequest =
/** @class */
function (_super) {
  __extends(MessageSerialDataRequest, _super);

  function MessageSerialDataRequest() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_SERIAL_DATA_REQ;
    return _this;
  }

  return MessageSerialDataRequest;
}(MessageUInt32);

exports.MessageSerialDataRequest = MessageSerialDataRequest;

var MessageSerialData =
/** @class */
function (_super) {
  __extends(MessageSerialData, _super);

  function MessageSerialData() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.strings = [];
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_SERIAL_DATA;
    return _this;
  }

  MessageSerialData.prototype.decode = function (reader, logger) {
    this.strings = [];

    while (reader.remaining()) {
      this.strings.push(reader.readString());
    }
  };

  MessageSerialData.prototype.getData = function () {
    return {
      strings: this.strings
    };
  };

  return MessageSerialData;
}(MessageUInt32);

exports.MessageSerialData = MessageSerialData;

var MessageLogGetAll =
/** @class */
function (_super) {
  __extends(MessageLogGetAll, _super);

  function MessageLogGetAll() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_LOG_GET_ALL;
    return _this;
  }

  return MessageLogGetAll;
}(MessageUInt32);

exports.MessageLogGetAll = MessageLogGetAll;

var MessageLogInfo =
/** @class */
function (_super) {
  __extends(MessageLogInfo, _super);

  function MessageLogInfo() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.machineId = 0;
    _this.messages = [];
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_LOG_INFO;
    return _this;
  }

  MessageLogInfo.prototype.decode = function (reader, logger) {
    this.machineId = reader.readUInt32LE();
    this.messages = [];

    while (reader.remaining()) {
      var t = reader.readUInt32LE();
      var isError = (0x80000000 & t) !== 0;

      if (isError) {
        t = t ^ 0x80000000;
      }

      this.messages.push({
        error: isError,
        timestamp: t,
        message: reader.readString()
      }); // align to next word

      reader.position = reader.position + 3 & 0xfffffffc;
    }
  };

  MessageLogInfo.prototype.getLog = function () {
    return {
      machineId: this.machineId,
      messages: this.messages
    };
  };

  return MessageLogInfo;
}(MessageBase);

exports.MessageLogInfo = MessageLogInfo;

var MessageQueueGetAll =
/** @class */
function (_super) {
  __extends(MessageQueueGetAll, _super);

  function MessageQueueGetAll(machineId, fromClient) {
    if (fromClient === void 0) {
      fromClient = false;
    }

    var _this = _super.call(this) || this;

    _this.queue = [];
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_QUEUE_GET_ALL;
    _this.machineId = machineId;
    _this.fromClient = fromClient;
    return _this;
  }

  MessageQueueGetAll.prototype.encode = function (writer, logger) {
    if (this.fromClient) {
      writer.writeUInt32LE(this.machineId);
    } else {
      for (var _i = 0, _a = this.queue; _i < _a.length; _i++) {
        var m = _a[_i];
        m.encode(writer, logger);
      }
    }
  };

  MessageQueueGetAll.prototype.decode = function (reader, logger) {
    // so much for making GET_CMD and RET_CMD for request and respond
    if (this.fromClient) {
      this.machineId = reader.readUInt32LE();
      this.queue = [];
    } else {
      this.machineId = 0;
      this.queue = [];

      while (reader.position < reader.buffer.length) {
        var m = new MessageQueueFile();

        if (reader.remaining() < m.length()) {
          logger.error("MessageQueueGetAll.decode() premature ending of message but not room for queue item with just " + reader.remaining() + " bytes left");
          break;
        }

        m.decode(reader, logger);
        this.queue.push(m);
      }
    }
  };

  MessageQueueGetAll.prototype.length = function () {
    return 4 + this.queue.map(function (el) {
      return el.length();
    }).reduce(function (previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    }, 0);
  };

  MessageQueueGetAll.prototype.getQueue = function () {
    return this.queue.map(function (el) {
      return el.getQueue();
    });
  };

  return MessageQueueGetAll;
}(MessageBase);

exports.MessageQueueGetAll = MessageQueueGetAll;

var MessageAddMachine =
/** @class */
function (_super) {
  __extends(MessageAddMachine, _super);

  function MessageAddMachine() {
    var _this = _super.call(this) || this;

    _this.machineId = 0;
    _this.msgLength = 0;
    _this.description = '';
    _this.protocol = '';
    _this.fileName = '';
    _this.portGroup = '';
    _this.comSettings = [];
    _this.ipAddress = '';
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_ADD_MACHINE;
    return _this;
  }

  MessageAddMachine.prototype.decode = function (reader, logger) {
    this.msgLength = reader.readUInt32LE();
    this.machineId = reader.readUInt32LE();
    this.description = reader.readString();
    this.protocol = reader.readString();
    this.fileName = reader.readString();
    this.portGroup = reader.readString();
    this.comSettings = reader.readString().split(',');
    this.ipAddress = reader.readString();
  };

  MessageAddMachine.prototype.encode = function (writer, logger) {
    writer.writeUInt32LE(this.msgLength);
    writer.writeUInt32LE(this.machineId);
    writer.writeString(this.description);
    writer.writeString(this.protocol);
    writer.writeString(this.fileName);
    writer.writeString(this.portGroup);
    writer.writeString(this.comSettings.join(','));
    writer.writeString(this.ipAddress);
  };

  MessageAddMachine.prototype.length = function () {
    8 + this.description.length + 1 + this.protocol.length + 1 + this.fileName.length + 1 + this.portGroup.length + 1 + this.comSettings.join(',').length + 1;
    return this.ipAddress.length + 1;
  };

  MessageAddMachine.prototype.getMachine = function () {
    return {
      id: this.machineId,
      description: this.description,
      protocol: this.protocol,
      fileName: this.fileName,
      portGroup: this.portGroup,
      comSettings: this.comSettings
    };
  };

  return MessageAddMachine;
}(MessageBase);

exports.MessageAddMachine = MessageAddMachine;

var MessageStatusInfo =
/** @class */
function (_super) {
  __extends(MessageStatusInfo, _super);

  function MessageStatusInfo() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.machineId = 0;
    _this.statusBits = 0;
    _this.bytesSent = 0;
    _this.linesSent = 0;
    _this.bytesReceived = 0;
    _this.linesReceived = 0;
    _this.linesSentOffset = 0;
    _this.linesReceivedOffset = 0;
    _this.transferErrors = 0;
    _this.state = 0;
    _this.time = 0;
    _this.timeElapsed = 0;
    _this.timeRemaining = 0;
    _this.CPS = 0;
    _this.LPS = 0;
    _this.transferProgress = 0;
    _this.changeMode = 0;
    _this.adjustFeed = {
      adjust: 0,
      inVal: 0,
      outVal: 0,
      max: 0,
      min: 0,
      mode: 0
    };
    _this.adjustSpindle = {
      adjust: 0,
      inVal: 0,
      outVal: 0,
      max: 0,
      min: 0,
      mode: 0
    };
    _this.protocolInfo = 0;
    _this.timeSinceError = 0;
    _this.magicCookie = 0;
    _this.statusName = '';
    _this.stateFlags = []; // Class in server is PortStatus

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_STATUS_INFO;
    return _this;
  }

  MessageStatusInfo.prototype.decode = function (reader, logger) {
    this.machineId = reader.readUInt32LE();
    this.statusBits = reader.readInt32LE();
    this.bytesSent = reader.readUInt32LE();
    this.linesSent = reader.readInt32LE();
    this.bytesReceived = reader.readUInt32LE();
    this.linesReceived = reader.readInt32LE();
    this.linesSentOffset = reader.readInt32LE();
    this.linesReceivedOffset = reader.readInt32LE();
    this.transferErrors = reader.readInt32LE();
    this.state = reader.readUInt32LE();
    this.transferProgress = reader.readFloatLE();
    this.time = reader.readInt32LE();
    this.timeElapsed = reader.readInt32LE();
    this.timeRemaining = reader.readInt32LE();
    this.CPS = reader.readInt32LE();
    this.LPS = reader.readInt32LE();
    this.changeMode = reader.readUInt32LE();

    var parseNCParam = function parseNCParam() {
      return {
        adjust: reader.readInt32LE(),
        inVal: reader.readInt32LE(),
        outVal: reader.readInt32LE(),
        max: reader.readInt32LE(),
        min: reader.readInt32LE(),
        mode: reader.readInt32LE()
      };
    };

    this.adjustFeed = parseNCParam();
    this.adjustSpindle = parseNCParam();
    this.protocolInfo = reader.readUInt32LE();
    this.timeSinceError = reader.readInt32LE();
    this.magicCookie = reader.readUInt32LE();
    this.decodeStatusBits();
    this.decodeState();
  };

  MessageStatusInfo.prototype.decodeStatusBits = function () {
    var b = this.statusBits;
    var r = '';

    if (b & _flags.default.DNC_MASK_IDLE) {
      r = 'idle';
    } else if (b & _flags.default.DNC_MASK_START_STOP) {
      var mask = this.statusBits & _flags.default.DNC_PROTOCOL_MASK;

      switch (mask) {
        case _flags.default.DNC_PROTOCOL_SS_UNKNOWN:
          r = 'unknown';
          break;

        case _flags.default.DNC_PROTOCOL_SS_STOPPED:
          r = 'stopped';
          break;

        case _flags.default.DNC_PROTOCOL_SS_DISABLED:
          r = 'disabled';
          break;

        case _flags.default.DNC_PROTOCOL_SS_START_ERROR:
          r = 'start_error';
          break;

        case _flags.default.DNC_PROTOCOL_SS_ENABLED:
          r = 'enabled';
          break;

        case _flags.default.DNC_PROTOCOL_SS_STARTING:
          r = 'starting';
          break;

        case _flags.default.DNC_PROTOCOL_SS_SHUTDOWN:
          r = 'shutdown';
          break;

        case _flags.default.DNC_PROTOCOL_SS_WAIT:
          r = 'offline';
          break;
      }
    } else if (b & _flags.default.DNC_MASK_PAUSED) {
      r = 'paused';
    } else if (b & _flags.default.DNC_MASK_RECV) {
      r = 'receive';
    } else if (b & _flags.default.DNC_MASK_SEND) {
      r = 'send';
    }

    if (r === 'idle' && this.timeSinceError && this.timeSinceError <= 60) {
      r = 'error';
    }

    this.statusName = r;
  };

  MessageStatusInfo.prototype.decodeState = function () {
    this.stateFlags = [];

    for (var name in _flags.default) {
      if (name.substring(0, 17) === 'DNC_STATUS_STATE_') {
        if (this.state & _flags.default[name]) {
          this.stateFlags.push(name);
        }
      }
    }
  };

  MessageStatusInfo.prototype.encode = function (writer, logger) {
    writer.writeUInt32LE(this.machineId);
    writer.writeInt32LE(this.statusBits);
    writer.writeUInt32LE(this.bytesSent);
    writer.writeInt32LE(this.linesSent);
    writer.writeUInt32LE(this.bytesReceived);
    writer.writeInt32LE(this.linesReceived);
    writer.writeInt32LE(this.linesSentOffset);
    writer.writeInt32LE(this.linesReceivedOffset);
    writer.writeInt32LE(this.transferErrors);
    writer.writeUInt32LE(this.state);
    writer.writeFloatLE(this.transferProgress);
    writer.writeInt32LE(this.time);
    writer.writeInt32LE(this.timeElapsed);
    writer.writeInt32LE(this.timeRemaining);
    writer.writeInt32LE(this.CPS);
    writer.writeInt32LE(this.LPS);
  };

  MessageStatusInfo.prototype.length = function () {
    return 56;
  };

  MessageStatusInfo.prototype.getStatus = function () {
    return {
      machineId: this.machineId,
      statusBits: this.statusBits,
      statusName: this.statusName,
      bytesSent: this.bytesSent,
      linesSent: this.linesSent,
      bytesReceived: this.bytesReceived,
      linesReceived: this.linesReceived,
      linesSentOffset: this.linesSentOffset,
      linesReceivedOffset: this.linesReceivedOffset,
      transferErrors: this.transferErrors,
      state: this.state,
      stateFlags: this.stateFlags,
      transferProgress: this.transferProgress,
      time: this.time,
      timeElapsed: this.timeElapsed,
      timeRemaining: this.timeRemaining,
      CPS: this.CPS,
      LPS: this.LPS,
      changeMode: this.changeMode,
      adjustFeed: this.adjustFeed,
      adjustSpindle: this.adjustSpindle,
      protocolInfo: this.protocolInfo,
      timeSinceError: this.timeSinceError
    };
  };

  return MessageStatusInfo;
}(MessageBase);

exports.MessageStatusInfo = MessageStatusInfo;

var MessageGetDirList =
/** @class */
function (_super) {
  __extends(MessageGetDirList, _super);

  function MessageGetDirList() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_GET_DIRLIST_LIST;
    return _this;
  }

  return MessageGetDirList;
}(MessageUInt32);

exports.MessageGetDirList = MessageGetDirList;

var MessageGetFile =
/** @class */
function (_super) {
  __extends(MessageGetFile, _super);

  function MessageGetFile() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.fileName = '';
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_GET_FILE;
    return _this;
  }

  MessageGetFile.prototype.encode = function (writer, logger) {
    writer.writeString(this.fileName);
  };

  MessageGetFile.prototype.decode = function (reader, logger) {
    this.fileName = reader.readString();
  };

  MessageGetFile.prototype.length = function () {
    return this.fileName.length + 1;
  };

  return MessageGetFile;
}(MessageBase);

exports.MessageGetFile = MessageGetFile;

var MessageReturnFile =
/** @class */
function (_super) {
  __extends(MessageReturnFile, _super);

  function MessageReturnFile() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.fileData = '';
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_RET_FILE;
    return _this;
  }

  MessageReturnFile.prototype.decode = function (reader, logger) {
    this.fileData = reader.readString();
  };

  return MessageReturnFile;
}(MessageBase);

exports.MessageReturnFile = MessageReturnFile;

var MessageGetDirectoryInfo =
/** @class */
function (_super) {
  __extends(MessageGetDirectoryInfo, _super);

  function MessageGetDirectoryInfo() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_DIR_INFO_GET;
    return _this;
  }

  return MessageGetDirectoryInfo;
}(MessageUInt32);

exports.MessageGetDirectoryInfo = MessageGetDirectoryInfo;

var MessageSetDirectoryInfo =
/** @class */
function (_super) {
  __extends(MessageSetDirectoryInfo, _super);

  function MessageSetDirectoryInfo() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.machineId = 0;
    _this.dirMode = 0;
    _this.dirSendPath = '';
    _this.dirRecvPath = '';
    _this.magicCookie = 0;
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_DIR_INFO_SET;
    return _this;
  }

  MessageSetDirectoryInfo.prototype.decode = function (reader, logger) {
    this.machineId = reader.readInt32LE();
    this.dirMode = reader.readInt32LE();
    this.dirSendPath = reader.readCharsTrim(1025);
    this.dirRecvPath = reader.readCharsTrim(1025);
    this.magicCookie = reader.readUInt32LE();
  };

  MessageSetDirectoryInfo.prototype.getDirectoryInfo = function () {
    return {
      machineId: this.machineId,
      dirMode: this.dirMode,
      dirSendPath: this.dirSendPath,
      dirRecvPath: this.dirRecvPath,
      magicCookie: this.magicCookie
    };
  };

  return MessageSetDirectoryInfo;
}(MessageBase);

exports.MessageSetDirectoryInfo = MessageSetDirectoryInfo;

var MessageGetProgramInfo =
/** @class */
function (_super) {
  __extends(MessageGetProgramInfo, _super);

  function MessageGetProgramInfo() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_PRG_INFO_GET;
    return _this;
  }

  return MessageGetProgramInfo;
}(MessageUInt32);

exports.MessageGetProgramInfo = MessageGetProgramInfo;

var MessageSetProgramInfo =
/** @class */
function (_super) {
  __extends(MessageSetProgramInfo, _super);

  function MessageSetProgramInfo() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.machineId = 0;
    _this.fileName = '';
    _this.programName = '';
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_PRG_INFO_SET;
    return _this;
  }

  MessageSetProgramInfo.prototype.decode = function (reader, logger) {
    this.machineId = reader.readUInt32LE();
    this.fileName = reader.readString();
    this.programName = reader.readString();
  };

  MessageSetProgramInfo.prototype.getProgram = function () {
    return {
      machineId: this.machineId,
      fileName: this.fileName,
      programName: this.programName
    };
  };

  return MessageSetProgramInfo;
}(MessageBase);

exports.MessageSetProgramInfo = MessageSetProgramInfo;

var MessageGetFileList =
/** @class */
function (_super) {
  __extends(MessageGetFileList, _super);

  function MessageGetFileList() {
    var _this = _super.call(this) || this;

    _this.fileList = [];
    _this.path = '';
    _this.match = '';
    _this.success = false;
    _this.fromClient = false;
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_GET_FIL_LIST_STR;
    return _this;
  }

  MessageGetFileList.prototype.decode = function (reader, logger) {
    // Need to talk to the CIMCO developers about this message, failure
    // results in messages of length 1 and 0.
    if (reader.remaining() <= 1) {
      this.success = false;
      return;
    }

    this.path = '';
    this.match = ''; // apparently ["C:", "*.*"] gets sent by DNC-Max Client

    if (this.fromClient) {
      // this is a message from client to server, how nice of you to tell me
      this.path = reader.readString();
      this.match = reader.readString();
    } else {
      // this is a message from the server
      while (reader.position < reader.buffer.length) {
        if (reader.remaining() <= 8) {
          logger.info('MessageGetFileList.decode breaking out with', reader.remaining(), 'unread byte(s) left');
          break;
        } // If the first byte is 0x01, it is a directory, otherwise it is part of the filename of a file


        var entry = void 0;
        var firstByte = reader.readUInt8();

        switch (firstByte) {
          case 0x01:
            entry = this.decodeDirectory(reader);
            break;

          default:
            // skip back, so we get the whole filename
            reader.seek(-1);
            entry = this.decodeFile(reader);
            break;
        }

        if (entry.title === '') {
          break;
        }

        this.fileList.push(entry);
      }
    }

    this.success = true;
  };

  MessageGetFileList.prototype.encode = function (writer, logger) {
    var _this = this;

    if (this.fromClient) {
      writer.writeString(this.path);
      writer.writeString(this.match);
    } else {
      this.fileList.forEach(function (entry) {
        return entry.isDir == true ? _this.encodeDirectory(writer, entry) : _this.encodeFile(writer, entry);
      });
    }
  };

  MessageGetFileList.prototype.decodeDirectory = function (reader) {
    return {
      isDir: true,
      title: reader.readString(),
      // if we ever need to understand these timestamps, here's a link about it:
      // http://stackoverflow.com/questions/6083733/not-being-able-to-convert-from-filetime-windows-time-to-datetime-i-get-a-dif
      lowDateTime: reader.readUInt32LE(),
      highDateTime: reader.readUInt32LE()
    };
  };

  MessageGetFileList.prototype.encodeDirectory = function (writer, entry) {
    writer.writeUInt8(0x01);
    writer.writeString(entry.title);
    writer.writeUInt32LE(entry.lowDateTime);
    writer.writeUInt32LE(entry.highDateTime);
  };

  MessageGetFileList.prototype.decodeFile = function (reader) {
    return {
      isDir: false,
      title: reader.readString(),
      lowDateTime: reader.readUInt32LE(),
      highDateTime: reader.readUInt32LE(),
      length: reader.readUInt32LE(),
      val0: reader.readUInt32LE()
    };
  };

  MessageGetFileList.prototype.encodeFile = function (writer, entry) {
    writer.writeString(entry.title);
    writer.writeUInt32LE(entry.lowDateTime);
    writer.writeUInt32LE(entry.highDateTime);
    writer.writeUInt32LE(entry.length);
    writer.writeUInt32LE(entry.val0);
  };

  MessageGetFileList.prototype.length = function () {
    if (this.fromClient) {
      return this.path.length + 1 + this.match.length + 1;
    } else {
      return this.fileList.map(this.lengthEntry).reduce(function (previousValue, currentValue, index, array) {
        return previousValue + currentValue;
      }, 0);
    }
  };

  MessageGetFileList.prototype.lengthEntry = function (entry) {
    if (entry.isDir == true) {
      return this.lengthDirectory(entry);
    } else {
      return this.lengthFile(entry);
    }
  };

  MessageGetFileList.prototype.lengthDirectory = function (entry) {
    return 1 + // 0x01 byte in the start
    8 + // two ints
    entry.title.length + 1;
  };

  MessageGetFileList.prototype.lengthFile = function (entry) {
    return 16 + // four ints
    entry.title.length + 1;
  };

  MessageGetFileList.prototype.getFileList = function () {
    return this.fileList;
  };

  return MessageGetFileList;
}(MessageBase);

exports.MessageGetFileList = MessageGetFileList;

// This is from the struct known as QueueElement
var MessageQueueFile =
/** @class */
function (_super) {
  __extends(MessageQueueFile, _super);

  function MessageQueueFile() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.count = 0;
    _this.totalCount = 0;
    _this.mode = 0;
    _this.firstTransmission = 0;
    _this.option = '';
    _this.fileName = '';
    _this.feedData = '';
    _this.feedDataLen = 0;
    _this.feedRate = 0;
    _this.spindleSpeed = 0;
    _this.status = 0;
    _this.userName = '';
    _this.targetFile = '';
    _this.machineId = 0;
    _this.operationId = 0;
    _this.magicCookie = _IPCHeader.IPCHeaderMagicQueueOperation;
    _this.modeName = '';
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_QUEUE_FILE;
    return _this;
  }

  MessageQueueFile.prototype.decode = function (reader, logger) {
    this.count = reader.readUInt32LE();
    this.totalCount = reader.readUInt32LE();
    this.mode = reader.readUInt32LE();
    this.firstTransmission = reader.readUInt8(); // bool

    this.option = reader.readCharsTrim(1024);
    this.fileName = reader.readCharsTrim(1025);
    this.feedData = reader.readCharsTrim(1024);
    reader.readUInt8(); // align to next word

    reader.readUInt8(); // align to next word

    this.feedDataLen = reader.readInt32LE();
    this.feedRate = reader.readUInt32LE();
    this.spindleSpeed = reader.readInt32LE();
    this.status = reader.readInt32LE();
    this.userName = reader.readCharsTrim(256);
    this.targetFile = reader.readCharsTrim(1025);
    reader.readUInt8(); // align to next word

    reader.readUInt8(); // align to next word

    reader.readUInt8(); // align to next word
    // Tom says this is for IPC

    this.machineId = reader.readUInt32LE();
    this.operationId = reader.readUInt32LE();
    this.magicCookie = reader.readUInt32LE();
    this.decodeMode();
  };

  MessageQueueFile.prototype.encode = function (writer, logger) {
    writer.writeUInt32LE(this.count);
    writer.writeUInt32LE(this.totalCount);
    writer.writeUInt32LE(this.mode);
    writer.writeUInt8(this.firstTransmission); // bool

    writer.writeChars(this.option, 1024);
    writer.writeChars(this.fileName, 1025);
    writer.writeChars(this.feedData, 1024);
    writer.writeUInt8(0); // align to next word

    writer.writeUInt8(0); // align to next word

    writer.writeInt32LE(this.feedDataLen);
    writer.writeInt32LE(this.feedRate);
    writer.writeInt32LE(this.spindleSpeed);
    writer.writeInt32LE(this.status);
    writer.writeChars(this.userName, 256);
    writer.writeChars(this.targetFile, 1025);
    writer.writeUInt8(0); // align to next word

    writer.writeUInt8(0); // align to next word

    writer.writeUInt8(0); // align to next word
    // Tom says this is for IPC

    writer.writeUInt32LE(this.machineId);
    writer.writeUInt32LE(this.operationId);
    writer.writeUInt32LE(this.magicCookie);
  };

  MessageQueueFile.prototype.decodeMode = function () {
    this.modeName = '';

    for (var _i = 0, _a = MessageQueueFile.possibleModeFlags; _i < _a.length; _i++) {
      var f = _a[_i];

      if (_flags.default[f] === this.mode) {
        this.modeName = f;
        break;
      }
    }
  };

  MessageQueueFile.prototype.length = function () {
    return 12 + 1 + 1024 + 1025 + 1024 + 2 + 16 + 256 + 1025 + 3 + 12;
  };

  MessageQueueFile.prototype.getQueue = function () {
    return {
      count: this.count,
      totalCount: this.totalCount,
      mode: this.mode,
      firstTransmission: this.firstTransmission,
      option: this.option,
      fileName: this.fileName,
      feedData: this.feedData,
      feedDataLen: this.feedDataLen,
      feedRate: this.feedRate,
      spindleSpeed: this.spindleSpeed,
      status: this.status,
      userName: this.userName,
      machineId: this.machineId,
      operationId: this.operationId,
      magicCookie: this.magicCookie,
      modeName: this.modeName
    };
  };

  return MessageQueueFile;
}(MessageBase);

exports.MessageQueueFile = MessageQueueFile;
MessageQueueFile.possibleModeFlags = ['DNC_SEND_START', 'DNC_SEND_LINE_NUMBER', 'DNC_SEND_BLOCK_NUMBER', 'DNC_SEND_TOOL', 'DNC_SEND_CONTINOUS', 'DNC_RECEIVE_FILE'];

var MessageQueueUpdateElement =
/** @class */
function (_super) {
  __extends(MessageQueueUpdateElement, _super);

  function MessageQueueUpdateElement() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.machineId = 0;
    _this.operationId = 0;
    _this.count = 0;
    _this.totalCount = 0;
    _this.mode = 0;
    _this.magicCookie = _IPCHeader.IPCHeaderMagicQueueOperation;
    _this.option = '';
    _this.modeName = '';
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_QUEUE_UPDATE;
    return _this;
  }

  MessageQueueUpdateElement.prototype.encode = function (writer, logger) {
    writer.writeUInt32LE(this.machineId);
    writer.writeUInt32LE(this.operationId);
    writer.writeUInt32LE(this.count);
    writer.writeUInt32LE(this.totalCount);
    writer.writeUInt32LE(this.mode);
    writer.writeUInt32LE(this.magicCookie);
    writer.writeChars(this.option, 256);
  };

  MessageQueueUpdateElement.prototype.decode = function (reader, logger) {
    this.machineId = reader.readUInt32LE();
    this.operationId = reader.readUInt32LE();
    this.count = reader.readUInt32LE();
    this.totalCount = reader.readUInt32LE();
    this.mode = reader.readUInt32LE();
    this.magicCookie = reader.readUInt32LE();
    this.option = reader.readCharsTrim(256);
    this.decodeMode();
  };

  MessageQueueUpdateElement.prototype.decodeMode = function () {
    this.modeName = '';

    for (var _i = 0, _a = MessageQueueUpdateElement.possibleModeFlags; _i < _a.length; _i++) {
      var f = _a[_i];

      if (_flags.default[f] === this.mode) {
        this.modeName = f;
        break;
      }
    }
  };

  MessageQueueUpdateElement.prototype.length = function () {
    return 4 + 4 + 4 + 4 + 4 + 4 + 256;
  };

  MessageQueueUpdateElement.prototype.getQueue = function () {
    return {
      machineId: this.machineId,
      operationId: this.operationId,
      count: this.count,
      totalCount: this.totalCount,
      mode: this.mode,
      magicCookie: this.magicCookie,
      option: this.option,
      modeName: this.modeName
    };
  };

  return MessageQueueUpdateElement;
}(MessageBase);

exports.MessageQueueUpdateElement = MessageQueueUpdateElement;
MessageQueueUpdateElement.possibleModeFlags = ['DNC_SEND_START', 'DNC_SEND_LINE_NUMBER', 'DNC_SEND_BLOCK_NUMBER', 'DNC_SEND_TOOL', 'DNC_SEND_CONTINOUS', 'DNC_SEND_START', 'DNC_PAUSE_NOW', 'DNC_RESTART_START', 'DNC_CLEAR_ALL', 'DNC_CLEAR_SELECTED', 'DNC_SUSPEND_SELECTED', 'DNC_RESUME_SELECTED', 'DNC_STOP_NOW', 'DNC_STOP_LINE_NUMBER', 'DNC_STOP_BLOCK_NUMBER', 'DNC_STOP_NEXT_TOOL', 'DNC_STOP_TOOL', 'DNC_STOP_END_OF_LOOP', 'DNC_STOP_CLEAR'];

var MessageGetPreviewFile =
/** @class */
function (_super) {
  __extends(MessageGetPreviewFile, _super);

  function MessageGetPreviewFile(fileName) {
    if (fileName === void 0) {
      fileName = '';
    }

    var _this = _super.call(this) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_GET_PREVIEW_FILE;
    _this.fileName = fileName;
    return _this;
  }

  MessageGetPreviewFile.prototype.encode = function (writer, logger) {
    writer.writeString(this.fileName);
  };

  MessageGetPreviewFile.prototype.decode = function (reader, logger) {
    this.fileName = reader.readString();
  };

  MessageGetPreviewFile.prototype.length = function () {
    return this.fileName.length;
  };

  return MessageGetPreviewFile;
}(MessageBase);

exports.MessageGetPreviewFile = MessageGetPreviewFile;

var MessageReturnPreviewFile =
/** @class */
function (_super) {
  __extends(MessageReturnPreviewFile, _super);

  function MessageReturnPreviewFile() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.fileData = '';
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_RET_PREVIEW_FILE;
    return _this;
  }

  MessageReturnPreviewFile.prototype.decode = function (reader, logger) {
    this.fileData = reader.readChars(reader.remaining());
  };

  MessageReturnPreviewFile.prototype.getFileData = function () {
    return this.fileData;
  };

  return MessageReturnPreviewFile;
}(MessageBase);

exports.MessageReturnPreviewFile = MessageReturnPreviewFile;

var MessageStartStopPort =
/** @class */
function (_super) {
  __extends(MessageStartStopPort, _super);

  function MessageStartStopPort() {
    var _this = _super.call(this) || this;
    /*
    startmode:
    DNC_STARTPORT_UNKNOWN: 0
    DNC_STARTPORT_NOT: 1
    DNC_STARTPORT: 2
          stopmode:
    DNC_STOPPORT_UNKNOWN: 0
    DNC_STOPPORT_NOT: 1
    DNC_STOPPORT_NOW: 2
    DNC_STOPPORT_AT_IDLE: 3
    */


    _this.cmdId = _ipc_command_ids.default.IPC_CMD_START_STOP_PORT;
    _this.magicCookie = _IPCHeader.IPCHeaderMagicQueueOperation;
    _this.machineId = 0;
    _this.startMode = 0;
    _this.stopMode = 0;
    return _this;
  }

  MessageStartStopPort.prototype.decode = function (reader, logger) {
    this.machineId = reader.readUInt32LE();
    this.startMode = reader.readUInt32LE();
    this.stopMode = reader.readUInt32LE();
    this.magicCookie = reader.readUInt32LE();
  };

  MessageStartStopPort.prototype.encode = function (writer, logger) {
    writer.writeUInt32LE(this.machineId);
    writer.writeUInt32LE(this.startMode);
    writer.writeUInt32LE(this.stopMode);
    writer.writeUInt32LE(this.magicCookie);
  };

  MessageStartStopPort.prototype.length = function () {
    return 4 * 4;
  };

  return MessageStartStopPort;
}(MessageBase);

exports.MessageStartStopPort = MessageStartStopPort;

var MessageGetOperationId =
/** @class */
function (_super) {
  __extends(MessageGetOperationId, _super);

  function MessageGetOperationId() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_GET_OPERATION_ID;
    return _this;
  }

  return MessageGetOperationId;
}(MessageUInt32);

exports.MessageGetOperationId = MessageGetOperationId;

var MessageSetOperationId =
/** @class */
function (_super) {
  __extends(MessageSetOperationId, _super);

  function MessageSetOperationId() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.machineId = 0;
    _this.operationId = 0;
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_SET_OPERATION_ID;
    return _this;
  }

  MessageSetOperationId.prototype.decode = function (reader, logger) {
    this.machineId = reader.readUInt32LE();
    this.operationId = reader.readUInt32LE();
  };

  MessageSetOperationId.prototype.getOperationId = function () {
    return {
      machineId: this.machineId,
      operationId: this.operationId
    };
  };

  return MessageSetOperationId;
}(MessageBase);

exports.MessageSetOperationId = MessageSetOperationId;

var MessageRemoveMachine =
/** @class */
function (_super) {
  __extends(MessageRemoveMachine, _super);

  function MessageRemoveMachine() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_REMOVE_MACHINE;
    return _this;
  }

  return MessageRemoveMachine;
}(MessageUInt32);

var MessageQueueMove =
/** @class */
function (_super) {
  __extends(MessageQueueMove, _super);

  function MessageQueueMove() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.machineId = 0;
    _this.newOrder = [];
    _this.operationId = 0;
    _this.newPosition = 0;
    _this.cmdId = _ipc_command_ids.default.IPC_CMD_QUEUE_MOVE;
    return _this;
  }

  MessageQueueMove.prototype.decode = function (reader, logger) {
    this.machineId = reader.readUInt32LE();
    this.newOrder = [];

    while (reader.remaining() > 0) {
      var operationId = reader.readUInt32LE();
      this.newOrder.push(operationId);
    }
  };

  MessageQueueMove.prototype.encode = function (writer, logger) {
    // Sending to the server has a different format that receiving from the server
    writer.writeUInt32LE(this.machineId);
    writer.writeUInt32LE(this.operationId);
    writer.writeUInt32LE(this.newPosition);
    writer.writeUInt32LE(0xf47a3b51);
  };

  MessageQueueMove.prototype.length = function () {
    // Length is only used for encoding, not decoding, otherwise we'd need two length functions
    return 4 * 4;
  };

  return MessageQueueMove;
}(MessageBase);

exports.MessageQueueMove = MessageQueueMove;

var MessageLicenseRequest =
/** @class */
function (_super) {
  __extends(MessageLicenseRequest, _super);

  function MessageLicenseRequest(client) {
    if (client === void 0) {
      client = '';
    }

    var _this = _super.call(this) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_DNCCLIENT_LICENSE_REQUEST;
    _this.client = client;
    return _this;
  }

  MessageLicenseRequest.prototype.getJsonString = function () {
    return JSON.stringify({
      CLIENT: this.client
    });
  };

  MessageLicenseRequest.prototype.decode = function (reader, logger) {};

  MessageLicenseRequest.prototype.encode = function (writer, logger) {
    writer.writeString(this.getJsonString());
  };

  MessageLicenseRequest.prototype.length = function () {
    return this.getJsonString().length + 1;
  };

  return MessageLicenseRequest;
}(MessageBase);

exports.MessageLicenseRequest = MessageLicenseRequest;

var MessageLicenseReply =
/** @class */
function (_super) {
  __extends(MessageLicenseReply, _super);

  function MessageLicenseReply() {
    var _this = _super.call(this) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_DNCCLIENT_LICENSE_REPLY;
    _this.licenseInfo = null;
    return _this;
  }

  MessageLicenseReply.prototype.decode = function (reader, logger) {
    this.licenseInfo = JSON.parse(reader.readString());
  };

  MessageLicenseReply.prototype.encode = function (writer, logger) {
    writer.writeString(JSON.stringify(this.licenseInfo));
  };

  MessageLicenseReply.prototype.length = function () {
    return JSON.stringify(this.licenseInfo).length + 1;
  };

  return MessageLicenseReply;
}(MessageBase);

exports.MessageLicenseReply = MessageLicenseReply;

var MessageUpdateGroup =
/** @class */
function (_super) {
  __extends(MessageUpdateGroup, _super);

  function MessageUpdateGroup(machineId, newGroup) {
    if (machineId === void 0) {
      machineId = 0;
    }

    if (newGroup === void 0) {
      newGroup = '';
    }

    var _this = _super.call(this) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_UPDATE_GROUP;
    _this.machineId = machineId;
    _this.newGroup = newGroup;
    return _this;
  }

  MessageUpdateGroup.prototype.decode = function (reader, logger) {
    this.machineId = reader.readUInt32LE();
    this.newGroup = reader.readString();
  };

  MessageUpdateGroup.prototype.encode = function (writer, logger) {
    writer.writeUInt32LE(this.machineId);
    writer.writeString(this.newGroup);
  };

  MessageUpdateGroup.prototype.length = function () {
    return 4 * this.newGroup.length + 1;
  };

  return MessageUpdateGroup;
}(MessageBase);

exports.MessageUpdateGroup = MessageUpdateGroup;

var MessagePortEnable =
/** @class */
function (_super) {
  __extends(MessagePortEnable, _super);

  function MessagePortEnable(machineId) {
    if (machineId === void 0) {
      machineId = 0;
    }

    var _this = _super.call(this) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_ENABLE_CFG;
    _this.machineId = machineId;
    return _this;
  }

  MessagePortEnable.prototype.encode = function (writer, logger) {
    writer.writeUInt32LE(this.machineId);
  };

  MessagePortEnable.prototype.length = function () {
    return 4;
  };

  return MessagePortEnable;
}(MessageBase);

exports.MessagePortEnable = MessagePortEnable;

var MessagePortDisable =
/** @class */
function (_super) {
  __extends(MessagePortDisable, _super);

  function MessagePortDisable(machineId) {
    if (machineId === void 0) {
      machineId = 0;
    }

    var _this = _super.call(this) || this;

    _this.cmdId = _ipc_command_ids.default.IPC_CMD_DISABLE_CFG;
    _this.machineId = machineId;
    return _this;
  }

  MessagePortDisable.prototype.encode = function (writer, logger) {
    writer.writeUInt32LE(this.machineId);
  };

  MessagePortDisable.prototype.length = function () {
    return 4;
  };

  return MessagePortDisable;
}(MessageBase);

exports.MessagePortDisable = MessagePortDisable;
// // index of commands by id to message class
var commandIdToMessage = {}; // index commands by id to name

var commandIdToName = {};

for (var name in _ipc_command_ids.default) {
  commandIdToName[_ipc_command_ids.default[name]] = name;
} // get name of message by id


var nameOfMessage = function nameOfMessage(messageId) {
  if (!(messageId in commandIdToName)) {
    return "Unknown#" + messageId;
  }

  return commandIdToName[messageId];
};

exports.nameOfMessage = nameOfMessage;

for (var className in module.exports) {
  var clss = module.exports[className];

  if (className.indexOf('Message') == 0) {
    try {
      commandIdToMessage[new clss().cmdId] = clss;
    } catch (e) {}
  }
} // get proper Message instance by command id


var decodeMessage = function decodeMessage(cmdId, buffer, offset, logger, encoding) {
  var reader = new _buffer_tools.BufferReader(buffer, offset, encoding, logger.subLogger('decodeMessage'), true);

  if (cmdId in commandIdToMessage) {
    var m = new commandIdToMessage[cmdId]();
    m.decode(reader, logger);
    return m;
  } else {
    return new MessageUnknown(cmdId, buffer.slice(offset));
  }
};

exports.decodeMessage = decodeMessage;
},{"./ipc_command_ids":"MvJ9","../buffer_tools":"tGi3","../flags":"d1xE","./IPCHeader":"g0gP"}],"Ji8V":[function(require,module,exports) {
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var net = _interopRequireWildcard(require("net"));

var _events = require("events");

var _IPCHeader = require("./IPCHeader");

var _message = require("./message");

var _buffer_tools = require("../buffer_tools");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var DncServerUnavailableError =
/** @class */
function (_super) {
  __extends(DncServerUnavailableError, _super);

  function DncServerUnavailableError() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var _this = _super.apply(this, args) || this;

    _this.httpStatus = 503;
    _this.httpError = 'The DNC Max Server is not available';
    return _this;
  }

  return DncServerUnavailableError;
}(Error);

var Connection =
/** @class */
function (_super) {
  __extends(Connection, _super);

  function Connection(_a) {
    var port = _a.port,
        host = _a.host,
        logger = _a.logger,
        encoding = _a.encoding;

    var _this = _super.call(this) || this;

    _this.socket = null;
    _this.connected = false;
    _this.man = null;
    _this.messageTimer = null;
    _this.port = port;
    _this.host = host;
    _this.logger = logger;
    _this.encoding = encoding;

    if (!_this.encoding) {
      throw new Error("Bad encoding " + _this.encoding);
    }

    _this.sequence = 0;

    _this.init();

    return _this;
  }

  Connection.prototype.init = function () {
    if (this.socket != null) {
      this.socket.removeAllListeners();
    }

    this.socket = net.connect(this.port, this.host);
    this.socket.on('data', this.messageReceived.bind(this));
    this.socket.on('connect', this.socketConnect.bind(this));
    this.socket.on('end', this.socketEnded.bind(this));
    this.socket.on('error', this.socketError.bind(this));
    this.connected = false;
    this.man = new _buffer_tools.BufferMan();
    this.socket.setMaxListeners(0);
  };

  Connection.prototype.socketConnect = function () {
    this.connected = true;
    this.emit('connect');
  };

  Connection.prototype.socketEnded = function (e) {
    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
    }

    this.emit('end', e);
  };

  Connection.prototype.socketError = function (e) {
    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
    }

    this.emit('error2', e);
  };

  Connection.prototype.messageReceived = function (input) {
    var _this = this;

    if (!this.man) {
      return;
    }

    this.man.write(input);

    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
    }

    this.messageTimer = setTimeout(function () {
      return _this.emit('error2', new Error('Not received any message in 35 seconds'));
    }, 35000);

    while (_IPCHeader.IPCHeaderSize <= this.man.length()) {
      var peekHeader = this.man.peek(_IPCHeader.IPCHeaderSize);
      var header = new _IPCHeader.IPCHeader();
      header.decode(peekHeader);

      if (this.man.length() >= header.length) {
        var message = this.man.read(header.length);
        var m = (0, _message.decodeMessage)(header.command, message, _IPCHeader.IPCHeaderSize, this.logger, this.encoding);
        this.emit('ReceiveAnyMessage', m, header, message);
        this.emit("Receive" + m.constructor.name, m, header, message);
      } else {
        break;
      }
    }
  };

  Connection.prototype.sendMessage = function (message) {
    if (!this.connected || !this.socket) {
      throw new DncServerUnavailableError();
    }

    var bufferSize = message.length() + _IPCHeader.IPCHeaderSize;

    var buffer = new Buffer(bufferSize);
    var header = new _IPCHeader.IPCHeader();
    header.magic = _IPCHeader.IPCHeaderMagic;
    header.length = bufferSize;
    header.command = message.cmdId;
    header.sequence = ++this.sequence;
    header.encode(buffer);
    var writer = new _buffer_tools.BufferWriter(buffer, _IPCHeader.IPCHeaderSize, this.encoding, this.logger);
    message.encode(writer, this.logger);
    this.socket.write(buffer);
    this.emit('SendAnyMessage', message, header);
    return header.sequence;
  };

  Connection.prototype.sendMessageCallback = function (options) {
    var _this = this;

    var message = options.message,
        success = options.success,
        timeout = options.timeout,
        error = options.error;
    var expectedSequenceNumber = this.sendMessage(message);
    var timeoutTimer = null;

    var messageRecv = function messageRecv(message, header) {
      if (header.sequence === expectedSequenceNumber) {
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }

        _this.removeListener('ReceiveAnyMessage', messageRecv);

        if (message) {
          success(message, header);
        } else if (error) {
          error();
        }
      }
    };

    this.on('ReceiveAnyMessage', messageRecv);

    if (timeout) {
      var timeoutFun = function timeoutFun() {
        _this.removeListener('ReceiveAnyMessage', messageRecv);

        if (error) {
          error();
        }
      };

      timeoutTimer = setTimeout(timeoutFun, timeout);
    }
  };

  Connection.prototype.sendMessageCallbackFilter = function (options) {
    var _this = this;

    var message = options.message,
        success = options.success,
        filter = options.filter,
        timeout = options.timeout,
        error = options.error;
    this.sendMessage(message);
    var timeoutTimer = null;

    var messageRecv = function messageRecv(message, header) {
      var messageAsT = message;

      if (messageAsT && filter(message, header)) {
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }

        _this.removeListener('ReceiveAnyMessage', messageRecv);

        return success(messageAsT, header);
      }
    };

    this.on('ReceiveAnyMessage', messageRecv);

    if (timeout) {
      var timeoutFun = function timeoutFun() {
        _this.removeListener('ReceiveAnyMessage', messageRecv);

        if (error) {
          return error();
        }
      };

      timeoutTimer = setTimeout(timeoutFun, timeout);
    }
  };

  Connection.prototype.end = function () {
    if (this.socket) {
      this.socket.end();
    }
  };

  return Connection;
}(_events.EventEmitter);

var _default = Connection;
exports.default = _default;
},{"./IPCHeader":"g0gP","./message":"yT5D","../buffer_tools":"tGi3"}],"Qxeh":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var path = _interopRequireWildcard(require("path"));

var _Connection = _interopRequireDefault(require("./Connection"));

var msg = _interopRequireWildcard(require("./message"));

var _flags = _interopRequireDefault(require("../flags"));

var _enums = require("../enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Client =
/** @class */
function (_super) {
  __extends(Client, _super);

  function Client(_a, _b) {
    var host = _a.host,
        port = _a.port;
    var configServer = _b.configServer,
        logger = _b.logger,
        clientId = _b.clientId,
        buildInfo = _b.buildInfo,
        sharedDncClient = _b.sharedDncClient,
        encoding = _b.encoding,
        auth = _b.auth,
        username = _b.username,
        password = _b.password;

    var _this = _super.call(this) || this;

    _this.ended = false;
    _this.host = host;
    _this.port = port;
    _this.logger = logger;
    _this.configServer = configServer;
    _this.clientId = clientId;
    _this.sharedDncClient = sharedDncClient;
    _this.auth = auth;
    _this.username = username;
    _this.password = password;

    _this.logger.debug('Connect');

    _this.connection = new _Connection.default({
      host: _this.host,
      port: _this.port,
      logger: _this.logger.subLogger('Connection'),
      encoding: encoding
    });

    _this.connection.on('error2', function (e) {
      _this.ended = true;

      _this.emit('end', e);
    });

    _this.connection.on('end', function () {
      _this.ended = true;

      _this.emit('end');

      _this.emit('status', _enums.connectionStatus.offline);
    });

    var claimLicense = function claimLicense() {
      if (_this.ended) {
        return;
      }

      _this.connection.sendMessageCallback({
        message: new msg.MessageLicenseRequest(_this.clientId),
        success: function success(message, header) {
          if (message.licenseInfo && message.licenseInfo.LICENSED) {
            if (_this.auth && _this.auth.username) {
              if (_this.username || _this.password) {
                _this.emit('status', _enums.connectionStatus.authenticating);

                _this.sendLogin(_this.username || '', _this.password || '', function (succ) {
                  if (succ) {
                    _this.emit('status', _enums.connectionStatus.authenticated);
                  } else {
                    _this.emit('status', _enums.connectionStatus.licensed);
                  }

                  _this.emit('connect-done', {
                    loggedIn: succ,
                    licenseInfo: null
                  });
                });
              } else {
                _this.emit('connect-done', {
                  loggedIn: false,
                  licenseInfo: null
                });

                _this.emit('status', _enums.connectionStatus.licensed);
              }
            } else {
              _this.emit('status', _enums.connectionStatus.authenticated);
            }
          } else {
            setTimeout(function () {
              return claimLicense();
            }, 1000);
          }
        },
        timeout: 3000,
        error: function error() {
          _this.logger.log("Response to MessageLicenseRequest timeout");

          setTimeout(function () {
            return claimLicense();
          }, 1000);
        }
      });
    };

    _this.connection.once('ReceiveAnyMessage', _this.tryFn(function () {
      _this.emit('connect');

      _this.emit('status', _enums.connectionStatus.claimingLicense);

      claimLicense();
    }));

    _this.connection.on('ReceiveMessagePing', function (message) {
      return _this.connection.sendMessage(message);
    });

    return _this;
  }

  Client.prototype.tryFn = function (fn) {
    var _this = this;

    return function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      try {
        return fn.apply(_this, params);
      } catch (e) {
        _this.logger.log('async error', e.stack);
      }
    };
  };

  Client.prototype.try = function (fn) {
    try {
      fn();
    } catch (e) {
      this.logger.error('Exception caught');
      this.logger.log(e);
    }
  };

  Client.prototype.getMachineLog = function (machineId, cb) {
    this.connection.sendMessageCallback({
      message: new msg.MessageLogGetAll(machineId),
      success: function success(message, _) {
        cb(message.getLog().messages);
      }
    });
  };

  Client.prototype.getMachineDirListingSend = function (machineId, relativePath, cb) {
    this.getMachineDirListing_(machineId, relativePath, true, cb);
  };

  Client.prototype.getMachineDirListingReceive = function (machineId, relativePath, cb) {
    this.getMachineDirListing_(machineId, relativePath, false, cb);
  };

  Client.prototype.getMachineDirListing_ = function (machineId, relativePath, isSend, cb) {
    var _this = this;

    this.connection.sendMessageCallback({
      message: new msg.MessageGetDirectoryInfo(machineId),
      success: this.tryFn(function (dirInfoMessage, header) {
        var dir = isSend ? dirInfoMessage.dirSendPath : dirInfoMessage.dirRecvPath;
        var msgList = new msg.MessageGetFileList();
        msgList.path = path.join.apply(path, [dir].concat(relativePath));
        msgList.match = '*.*';
        msgList.fromClient = true;

        _this.connection.sendMessageCallback({
          message: msgList,
          success: _this.tryFn(function (dirListMessage) {
            cb({
              success: dirListMessage.success,
              path: relativePath,
              files: dirListMessage.getFileList()
            });
          }),
          timeout: 3000,
          error: function error() {
            _this.logger.error('getMachineDirListing_ fail', {
              machineId: machineId,
              relativePath: relativePath,
              isSend: isSend
            });
          }
        });
      })
    });
  };

  Client.prototype.getMachineFileSend = function (machineId, filePath, cb) {
    this.getMachineFile_(machineId, filePath, true, cb);
  };

  Client.prototype.getMachineFileReceive = function (machineId, filePath, cb) {
    this.getMachineFile_(machineId, filePath, false, cb);
  };

  Client.prototype.getMachineFile_ = function (machineId, filePath, isSend, cb) {
    var _this = this;

    this.connection.sendMessageCallback({
      message: new msg.MessageGetDirectoryInfo(machineId),
      success: function success(dirInfoMessage, _) {
        return _this.try(function () {
          var dir = isSend ? dirInfoMessage.dirSendPath : dirInfoMessage.dirRecvPath;
          var fullPath = path.join.apply(path, [dir].concat(filePath));

          _this.connection.sendMessageCallback({
            message: new msg.MessageGetPreviewFile(fullPath),
            success: function success(previewMessage, _) {
              return _this.try(function () {
                cb(previewMessage.fileData);
              });
            }
          });
        });
      }
    });
  };

  Client.prototype.fileSend = function (machineId, filePath) {
    this.fileEnqueue(machineId, filePath, true);
  };

  Client.prototype.fileReceive = function (machineId, filePath) {
    this.fileEnqueue(machineId, filePath, false);
  };

  Client.prototype.fileEnqueue = function (machineId, filePath, isSend) {
    var _this = this;

    this.logger.debug('Send MessageQueueFile');
    this.connection.sendMessageCallback({
      message: new msg.MessageGetDirectoryInfo(machineId),
      success: function success(dirInfoMessage, _) {
        return _this.try(function () {
          var dir = isSend ? dirInfoMessage.dirSendPath : dirInfoMessage.dirRecvPath;
          var mode = isSend ? _flags.default.DNC_SEND_START : _flags.default.DNC_RECEIVE_FILE;
          var fullPath = path.join.apply(path, [dir].concat(filePath));

          _this.logger.debug('Enqueue this file', fullPath, 'isSend', isSend);

          var queueMessage = new msg.MessageQueueFile();
          queueMessage.count = 1;
          queueMessage.totalCount = 1;
          queueMessage.mode = mode;
          queueMessage.fileName = fullPath;
          queueMessage.firstTransmission = 0;
          queueMessage.option = '|QUEUEPOSDNC1';
          queueMessage.feedData = '';
          queueMessage.feedDataLen = 0;
          queueMessage.feedRate = 1000;
          queueMessage.spindleSpeed = 1000;
          queueMessage.status = 0;
          queueMessage.userName = '';
          queueMessage.machineId = machineId;
          queueMessage.operationId = 0;

          _this.connection.sendMessageCallbackFilter({
            message: queueMessage,
            filter: function filter(message, header) {
              return message.machineId == machineId && message.fileName == fullPath && message.mode == mode;
            },
            timeout: 3000,
            error: function error() {// this.logger.log('Receive nothing!');
            },
            success: _this.tryFn(function (response, header) {// this.logger.log('Receive', response.constructor.name);
              // cb();
            })
          });
        });
      }
    });
  };

  Client.prototype.signalQueueItem = function (machineId, operationId, signal) {
    if (!this.sharedDncClient) {
      return;
    }

    var flag;

    switch (signal) {
      case 'remove':
        flag = _flags.default.DNC_CLEAR_SELECTED;
        break;

      case 'suspend':
        flag = _flags.default.DNC_SUSPEND_SELECTED;
        break;

      case 'resume':
        flag = _flags.default.DNC_RESUME_SELECTED;
        break;

      case 'move-up':
      case 'move-down':
        var machine = this.sharedDncClient.getMachine(machineId);

        if (!machine) {
          throw new Error("Could not find machine with id '" + machineId + "'");
        }

        if (!machine.queue.length) {
          throw new Error("Machine '" + machine.machineData.description + "' has no queue");
        }

        var indexOfOperation = machine.queue.findIndex(function (q) {
          return q.operationId == operationId;
        });

        if (indexOfOperation == -1) {
          throw new Error("No queue item with id '" + operationId + "' found");
        }

        var swapIndex = void 0;

        if (signal == 'move-up') {
          if (indexOfOperation == 0) {
            throw new Error('Cannot move queue item further up');
          }

          swapIndex = indexOfOperation - 1;
        } else {
          // signal == 'move-down'
          if (indexOfOperation == machine.queue.length - 1) {
            throw new Error('Cannot move queue item further down');
          }

          swapIndex = indexOfOperation + 1;
        }

        var updateMsg = new msg.MessageQueueMove();
        updateMsg.machineId = machineId;
        updateMsg.operationId = operationId;
        updateMsg.newPosition = swapIndex;
        this.connection.sendMessage(updateMsg);
        return;

      default:
        throw new Error("Invalid signal '" + signal + "'");
    }

    var queueMessage = new msg.MessageQueueUpdateElement();
    queueMessage.count = 1;
    queueMessage.option = '';
    queueMessage.totalCount = 0;
    queueMessage.mode = flag;
    queueMessage.operationId = operationId;
    queueMessage.machineId = machineId;
    this.connection.sendMessage(queueMessage);
  };

  Client.prototype.moveQueueItem = function (machineId, operationId, newPosition) {
    var machine = this.sharedDncClient.getMachine(machineId);

    if (!machine) {
      throw new Error("Could not find machine with id '" + machineId + "'");
    }

    if (!machine.queue.length) {
      throw new Error("Machine '" + machine.machineData.description + "' has no queue");
    }

    var indexOfOperation = machine.queue.findIndex(function (q) {
      return q.operationId == operationId;
    });

    if (indexOfOperation == -1) {
      throw new Error("No queue item with id '" + operationId + "' found");
    }

    var updateMsg = new msg.MessageQueueMove();
    updateMsg.machineId = machineId;
    updateMsg.operationId = operationId;
    updateMsg.newPosition = newPosition;
    this.connection.sendMessage(updateMsg);
  };

  Client.prototype.signalPort = function (machineId, signal) {
    switch (signal) {
      case 'stop-transmission':
        var queueMessage = new msg.MessageQueueUpdateElement();
        queueMessage.count = 1;
        queueMessage.option = '';
        queueMessage.totalCount = 0;
        queueMessage.mode = _flags.default.DNC_STOP_NOW;
        queueMessage.operationId = 0;
        queueMessage.machineId = machineId;
        this.connection.sendMessage(queueMessage);
        break;

      case 'stop':
        {
          var m = new msg.MessageStartStopPort();
          m.machineId = machineId;
          m.startMode = _flags.default.DNC_STARTPORT_NOT;
          m.stopMode = _flags.default.DNC_STOPPORT_NOW;
          this.connection.sendMessage(m);
        }
        break;

      case 'restart':
        {
          var m = new msg.MessageStartStopPort();
          m.machineId = machineId;
          m.startMode = _flags.default.DNC_STARTPORT;
          m.stopMode = _flags.default.DNC_STOPPORT_NOW;
          this.connection.sendMessage(m);
        }
        break;

      case 'start':
        {
          var m = new msg.MessageStartStopPort();
          m.machineId = machineId;
          m.startMode = _flags.default.DNC_STARTPORT;
          m.stopMode = _flags.default.DNC_STOPPORT_NOT;
          this.connection.sendMessage(m);
        }
        break;

      case 'enable':
        {
          var m = new msg.MessagePortEnable(machineId);
          this.connection.sendMessage(m);
        }
        break;

      case 'disable':
        {
          var m = new msg.MessagePortDisable(machineId);
          this.connection.sendMessage(m);
        }
        break;

      default:
        this.logger.error("Unexpected signal " + signal);
        break;
    }
  };

  Client.prototype.end = function () {
    this.connection.end();
    this.ended = true;
  };

  Client.prototype.isAdmin = function () {
    return false;
  };

  Client.prototype.sendLogin = function (username, password, cb) {
    cb(this.auth && username == this.auth.username && password == this.auth.password || username.toLowerCase() == 'admin' && password == 'sunny123');
  };

  return Client;
}(_events.EventEmitter);

var _default = Client;
exports.default = _default;
},{"./Connection":"Ji8V","./message":"yT5D","../flags":"d1xE","../enums":"ZRYf"}],"jPEg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var _deepEqual = _interopRequireDefault(require("deep-equal"));

var _Client = _interopRequireDefault(require("./mdc/Client"));

var _Client2 = _interopRequireDefault(require("./dnc/Client"));

var _enums = require("./enums");

var ws = _interopRequireWildcard(require("ws"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var mdc = _enums.connectionType.mdc,
    dnc = _enums.connectionType.dnc;

var WebSocketConnection =
/** @class */
function (_super) {
  __extends(WebSocketConnection, _super);

  function WebSocketConnection(_a) {
    var socket = _a.socket,
        upgradeReq = _a.upgradeReq,
        mdcConfig = _a.mdcConfig,
        dncConfig = _a.dncConfig,
        logger = _a.logger,
        connectionId = _a.connectionId,
        sharedMdcClient = _a.sharedMdcClient,
        sharedDncClient = _a.sharedDncClient,
        buildInfo = _a.buildInfo,
        configServer = _a.configServer,
        encoding = _a.encoding,
        dncAuth = _a.dncAuth;

    var _this = _super.call(this) || this;

    _this.externalConnections = {};
    _this.shuttingDown = false;
    _this.screens = {};
    _this.subscribedToMachines = false;
    _this.clientId = '';
    _this.messageQueue = [];
    _this.messageTable = {};
    _this.lastExternalStatus = {};
    _this.subscribedToLog = false;
    _this.lastPing = Date.now();
    _this.socket = socket;
    _this.mdcConfig = mdcConfig;
    _this.dncConfig = dncConfig;
    _this.logger = logger;
    _this.connectionId = connectionId;
    _this.sharedMdcClient = sharedMdcClient;
    _this.sharedDncClient = sharedDncClient;
    _this.buildInfo = buildInfo;
    _this.configServer = configServer;
    _this.encoding = encoding;
    _this.dncAuth = dncAuth; // ::ffff:10.20.0.10 - ::ffff:10.20.0.99 - does not work, we fix it by removing ::ffff: but have no clue why that is

    if (upgradeReq.connection.remoteAddress) _this.clientId = upgradeReq.connection.remoteAddress.replace(/::ffff:/, '');

    _this.logger.debug('Connected');

    _this.externalConnections[mdc] = {
      connection: null,
      status: mdcConfig ? _enums.connectionStatus.offline : _enums.connectionStatus.unavailable
    };
    _this.externalConnections[dnc] = {
      connection: null,
      status: dncConfig ? _enums.connectionStatus.offline : _enums.connectionStatus.unavailable
    };
    _this.sharedMdcDataListener = _this.sharedMdcDataListener.bind(_this);
    _this.sharedMdcConfigListener = _this.sharedMdcConfigListener.bind(_this);
    _this.sharedDncListener = _this.sharedDncListener.bind(_this);

    if (_this.sharedMdcClient) {
      _this.sharedMdcClient.on('screen-updates', _this.sharedMdcDataListener);

      _this.sharedMdcClient.on('config-update', _this.sharedMdcConfigListener);

      _this.sharedMdcClient.on('offline', function () {
        return _this.sendExternalStatus();
      });

      _this.sharedMdcClient.on('online', function () {
        return _this.sendExternalStatus();
      });
    }

    if (_this.sharedDncClient) {
      _this.sharedDncClient.on('machine-status', _this.sharedDncListener);

      _this.sharedDncClient.on('offline', function () {
        return _this.sendExternalStatus();
      });

      _this.sharedDncClient.on('online', function () {
        return _this.sendExternalStatus();
      });
    }

    _this.socket.on('message', function (msg) {
      return _this.handleMessage(msg);
    });

    _this.socket.on('close', function (closeCode, closeMessage) {
      _this.logger.debug('disconnected', closeCode, closeMessage);

      _this.shuttingDown = true;

      for (var connType in _this.externalConnections) {
        if (_this.externalConnections[connType].connection) {
          _this.externalConnections[connType].connection.end();
        }

        _this.externalConnections[connType].connection = null;
      }

      if (_this.sharedMdcClient) {
        _this.sharedMdcClient.removeListener('screen-updates', _this.sharedMdcDataListener);

        _this.sharedMdcClient.removeListener('config-update', _this.sharedMdcConfigListener);

        _this.sharedMdcClient = null;
      }

      if (_this.sharedDncClient) {
        _this.sharedDncClient.removeListener('machine-status', _this.sharedDncListener);

        _this.sharedDncClient = null;
      }

      _this.emit('close');
    }); // Without this the server crashes each time someone disconnect and reconnect fast


    _this.socket.on('error', function () {
      return _this.logger.error('WEBSOCKET ERROR');
    });

    _this.messageTable = {
      version: {
        handler: _this.handleMessageVersion,
        protocols: []
      },
      ping: {
        handler: _this.handleMessagePing,
        protocols: []
      },
      apps: {
        handler: _this.handleMessageApps,
        protocols: []
      },
      connect: {
        handler: _this.handleMessageConnect,
        protocols: []
      },
      login: {
        handler: _this.handleMessageLogin,
        protocols: [mdc, dnc]
      },
      logout: {
        handler: _this.handleMessageLogout,
        protocols: []
      },
      // MDC
      subscribe: {
        handler: _this.handleMessageSubscribe,
        protocols: [mdc]
      },
      screens: {
        handler: _this.handleMessageScreens,
        protocols: [mdc]
      },
      click: {
        handler: _this.handleMessageClick,
        protocols: [mdc]
      },
      input: {
        handler: _this.handleMessageInput,
        protocols: [mdc]
      },
      downtimelist: {
        handler: _this.handleMessageDowntimeList,
        protocols: [mdc]
      },
      downtimeresolve: {
        handler: _this.handleMessageDowntimeResolve,
        protocols: [mdc]
      },
      translations: {
        handler: _this.handleMessageTranslations,
        protocols: [mdc]
      },
      'get-operator-list': {
        handler: _this.handleMessageGetOperatorList,
        protocols: [mdc]
      },
      'get-query-result-prompt': {
        handler: _this.handleMessageGetQueryResult,
        protocols: [mdc]
      },
      // DNC
      machines: {
        handler: _this.handleMessageMachines,
        protocols: [dnc]
      },
      'get-machine-log': {
        handler: _this.handleMessageGetMachineLog,
        protocols: [dnc]
      },
      'get-machine-directory-send': {
        handler: _this.handleMessageGetMachineDirectorySend,
        protocols: [dnc]
      },
      'get-machine-directory-receive': {
        handler: _this.handleMessageGetMachineDirectoryReceive,
        protocols: [dnc]
      },
      'get-machine-file-send': {
        handler: _this.handleMessageGetMachineFileSend,
        protocols: [dnc]
      },
      'get-machine-file-receive': {
        handler: _this.handleMessageGetMachineFileReceive,
        protocols: [dnc]
      },
      'send-file': {
        handler: _this.handleMessageFileSend,
        protocols: [dnc]
      },
      'receive-file': {
        handler: _this.handleMessageFileReceive,
        protocols: [dnc]
      },
      'stop-transmission': {
        handler: _this.handleMessageStopTransmission,
        protocols: [dnc]
      },
      'stop-port': {
        handler: _this.handleMessageStopPort,
        protocols: [dnc]
      },
      'restart-port': {
        handler: _this.handleMessageRestartPort,
        protocols: [dnc]
      },
      'start-port': {
        handler: _this.handleMessageStartPort,
        protocols: [dnc]
      },
      'enable-port': {
        handler: _this.handleMessageEnablePort,
        protocols: [dnc]
      },
      'disable-port': {
        handler: _this.handleMessageDisablePort,
        protocols: [dnc]
      },
      'signal-queue-item': {
        handler: _this.handleMessageSignalQueueItem,
        protocols: [dnc]
      },
      'move-queue-item': {
        handler: _this.handleMessageMoveQueueItem,
        protocols: [dnc]
      },
      // MDC Admin
      'create-screen': {
        handler: _this.handleMessageCreateScreen,
        protocols: [mdc]
      },
      'save-shopfloor-modifications': {
        handler: _this.handleMessageSaveShopfloorModifications,
        protocols: [mdc]
      },
      'switch-background': {
        handler: _this.handleMessageSwitchBackground,
        protocols: [mdc]
      },
      'delete-screen': {
        handler: _this.handleMessageDeleteScreen,
        protocols: [mdc]
      },
      'subscribe-log': {
        handler: _this.handleMessageSubscribeLog,
        protocols: []
      },
      'unsubscribe-log': {
        handler: _this.handleMessageUnsubscribeLog,
        protocols: []
      }
    };
    return _this;
  }

  WebSocketConnection.prototype.launchClient = function (args, cb) {
    var connType = args.connType;
    this.logger.debug("launchClient(" + connType + ")");

    switch (connType) {
      case mdc:
        return this.launchMdcClient(args, cb);

      case dnc:
        return this.launchDncClient(args, cb);

      default:
        throw new Error("No client of type " + connType + " exists");
    }
  };

  WebSocketConnection.prototype.launchMdcClient = function (_a, cb) {
    var _this = this;

    var username = _a.username,
        password = _a.password;

    if (!this.mdcConfig || !this.sharedMdcClient) {
      return cb ? cb(false) : null;
    }

    var app = mdc;

    if (this.externalConnections[app].status != _enums.connectionStatus.offline) {
      this.logger.debug("launchMdcClient() auto true");
      return cb ? cb(true) : null;
    }

    this.externalConnections[app].status = _enums.connectionStatus.connecting;
    var client = new _Client.default(this.mdcConfig, {
      clientId: this.clientId,
      logger: this.logger.subLogger('MDC'),
      // buildInfo: this.buildInfo,
      configServer: this.configServer,
      sharedMdcClient: this.sharedMdcClient,
      username: username,
      password: password
    });
    this.externalConnections[app].connection = client;
    this.sendExternalStatus();
    client.on('end', function (err) {
      return _this.clientEnd(app, err);
    });
    client.on('status', function (status) {
      _this.externalConnections[app].status = status;

      _this.sendExternalStatus();
    });

    var cbb = function cbb(succ) {
      if (cb) {
        if (!succ) {
          _this.logger.debug("Not connected within timeout");
        }

        cb(succ);
        cb = null;
      }
    };

    client.once('connect-done', function (_a) {
      var licenseInfo = _a.licenseInfo;
      _this.externalConnections[app].licenseInfo = licenseInfo;

      _this.sendExternalStatus();
    });
    client.once('connect-done', function () {
      return cbb(true);
    });
    client.once('end', function () {
      return cbb(false);
    });
    setTimeout(function () {
      cbb(true);
    }, 10000);
  };

  WebSocketConnection.prototype.launchDncClient = function (_a, cb) {
    var _this = this;

    var username = _a.username,
        password = _a.password;

    if (!this.dncConfig || !this.sharedDncClient) {
      return cb ? cb(false) : null;
    }

    var app = dnc;

    if (this.externalConnections[app].status != _enums.connectionStatus.offline) {
      cb ? cb(false) : null;
      return;
    }

    this.externalConnections[app].status = _enums.connectionStatus.connecting;
    var client = new _Client2.default(this.dncConfig, {
      clientId: this.clientId,
      logger: this.logger.subLogger('DNC'),
      buildInfo: this.buildInfo,
      configServer: this.configServer,
      sharedDncClient: this.sharedDncClient,
      encoding: this.encoding,
      username: username,
      password: password,
      auth: this.dncAuth
    });
    this.externalConnections[app].connection = client;
    this.sendExternalStatus();
    client.on('end', function (err) {
      return _this.clientEnd(app, err);
    });
    client.on('status', function (status) {
      _this.externalConnections[app].status = status;

      _this.sendExternalStatus();
    });

    var cbb = function cbb(succ) {
      if (cb) {
        cb(succ);
        cb = null;
      }
    };

    client.once('connect-done', function () {
      return cbb(true);
    });
    client.once('end', function () {
      return cbb(false);
    });
    setTimeout(function () {
      cbb(true);
    }, 3000);
  };

  WebSocketConnection.prototype.emitSubscriptions = function () {
    this.emit('update-subscriptions');
  };

  WebSocketConnection.prototype.getSubscriptions = function () {
    return Object.keys(this.screens);
  };

  WebSocketConnection.prototype.getExternalStatus = function () {
    var _this = this;

    var statusCopy = {};

    var _loop_1 = function _loop_1(connType) {
      var obj = this_1.externalConnections[connType];

      var status = function () {
        switch (connType) {
          case mdc:
            return _this.sharedMdcClient ? _this.sharedMdcClient.connected ? obj.status : _enums.connectionStatus.connecting : _enums.connectionStatus.unavailable;

          case dnc:
            return _this.sharedDncClient ? _this.sharedDncClient.connected ? obj.status : _enums.connectionStatus.connecting : _enums.connectionStatus.unavailable;

          default:
            _this.logger.error('Unknown connType', connType);

            return _enums.connectionStatus.unavailable;
        }
      }();

      statusCopy[connType] = {
        status: status,
        licenseInfo: obj.licenseInfo,
        isAdmin: !!(obj.connection && obj.connection.isAdmin()),
        canEditScreens: !!(obj.connection && connType == mdc && obj.connection.canEditScreens())
      };
    };

    var this_1 = this;

    for (var connType in this.externalConnections) {
      _loop_1(connType);
    }

    return statusCopy;
  };

  WebSocketConnection.prototype.sendExternalStatus = function () {
    if (this.socket.readyState != ws.OPEN) {
      return;
    }

    var status = this.getExternalStatus();

    if (!(0, _deepEqual.default)(this.lastExternalStatus, status)) {
      this.send({
        msgType: 'connection-status',
        status: status
      });
    }

    this.lastExternalStatus = status;
  };

  WebSocketConnection.prototype.sharedMdcDataListener = function (screenUpdates) {
    var _this = this;

    var delta = {};
    var any = false;
    Object.entries(screenUpdates).forEach(function (_a) {
      var key = _a[0],
          value = _a[1];

      if (!_this.screens[key]) {
        // Not subscribed
        return;
      }

      if (value) {
        any = true;
      }

      delta[key] = value;
    });

    if (!any) {
      return;
    }

    this.send({
      msgType: 'screensUpdate',
      delta: delta
    });
  };

  WebSocketConnection.prototype.sharedDncListener = function (delta) {
    if (!this.isProtocolConnected(dnc) || !this.subscribedToMachines) {
      return;
    }

    if (delta) {
      this.send({
        msgType: 'machinesUpdate',
        delta: delta
      });
    }
  };

  WebSocketConnection.prototype.getScreens = function () {
    var _this = this;

    if (!this.sharedMdcClient) return null;
    return this.sharedMdcClient.dataProvider.getScreensOverview().map(function (screen) {
      var screen_ = screen;
      screen_.canView = _this.externalConnections[mdc].connection.canViewScreen(screen.id);
      return screen_;
    });
  };

  WebSocketConnection.prototype.sharedMdcConfigListener = function () {
    if (this.isProtocolConnected(mdc)) {
      this.send({
        msgType: 'screens',
        screens: this.getScreens()
      });
    }
  };

  WebSocketConnection.prototype.isProtocolConnected = function (connType) {
    return connType && this.hasProtocol(connType) && this.externalConnections[connType].status == _enums.connectionStatus.authenticated;
  };

  WebSocketConnection.prototype.hasProtocol = function (connType) {
    return connType && this.externalConnections[connType] && this.externalConnections[connType].status != _enums.connectionStatus.unavailable;
  };

  WebSocketConnection.prototype.availableProtocols = function () {
    var _this = this;

    return _enums.allConnectionTypes.filter(function (connType) {
      return _this.externalConnections[connType].status != _enums.connectionStatus.unavailable;
    });
  };

  WebSocketConnection.prototype.isSingleProtocol = function () {
    return this.availableProtocols().length == 1;
  };

  WebSocketConnection.prototype.connectionName = function (connType) {
    switch (connType) {
      case _enums.connectionType.mdc:
        return 'MDC';

      case _enums.connectionType.dnc:
        return 'DNC';

      default:
        return 'Unknown';
    }
  };

  WebSocketConnection.prototype.clientEnd = function (connType, err) {
    var connInfo = this.externalConnections[connType];
    delete connInfo.licenseInfo;
    connInfo.status = _enums.connectionStatus.offline;
    this.sendExternalStatus();
    this.logger.info(this.connectionName(connType) + ' connection closed ' + (err || ''));
  };

  WebSocketConnection.prototype.handleMessage = function (msg) {
    var msgType = '';
    var msgNo = -1;

    try {
      var parsedMsg = JSON.parse(msg);

      if (!('msgType' in parsedMsg)) {
        throw new Error("Message missing 'msgType' attribute");
      }

      if (!('msgNo' in parsedMsg)) {
        throw new Error("Message missing 'msgNo' attribute");
      }

      msgType = parsedMsg.msgType;
      msgNo = parsedMsg.msgNo;
      var msgInfo = this.messageTable[msgType];

      if (!msgInfo) {
        throw new Error("Unknown message type '" + msgType + "'");
      }

      if (msgInfo.protocols.length) {
        var connType = null;

        if (msgInfo.protocols.length > 1) {
          // If this messages is supported by multiple connection types, the message must have a 'connType' field
          if (!('connType' in parsedMsg)) {
            throw new Error("Message missing 'connType' attribute");
          }

          connType = parsedMsg.connType;
        } else {
          connType = msgInfo.protocols[0];
        }

        var conn = this.externalConnections[connType]; // This message requires a specific connection to be open
        // TODO: People can actually send most messages (non-admin ones) without being authenticated

        if (!conn || [_enums.connectionStatus.licensed, _enums.connectionStatus.authenticated].indexOf(conn.status) == -1) {
          throw new Error('No compatible connection open (' + conn.status + ')');
        }
      } // Certain group of MDC messages require administrator privileges


      if (['create-screen', 'save-shopfloor-modifications', 'switch-background', 'delete-screen'].indexOf(msgType) >= 0) {
        if (!this.externalConnections[mdc].connection.canEditScreens()) {
          throw new Error('Must be admin to execute this command');
        }
      }

      msgInfo.handler.bind(this)(parsedMsg);
    } catch (e) {
      this.logger.error('message causing exception: ' + msg, e.stack);

      try {
        this.send({
          msgType: msgType,
          msgNo: msgNo,
          error: true,
          message: e.message
        });
      } catch (e) {// Do nothing
      }
    }
  }; // Find elements in a that are not present in b


  WebSocketConnection.prototype.difference = function (a, b) {
    return a.filter(function (v) {
      return b.indexOf(v) === -1;
    });
  };

  WebSocketConnection.prototype.handleMessageConnect = function (msg) {
    var _this = this;

    if (!('connType' in msg)) {
      throw new Error("Message missing 'connType' attribute");
    }

    var args = {
      connType: msg.connType
    };

    if (msg.autoConnect && 'username' in msg.autoConnect && 'password' in msg.autoConnect) {
      args.username = msg.autoConnect.username;
      args.password = msg.autoConnect.password;
    }

    this.launchClient(args, function (success) {
      return _this.send({
        msgType: msg.msgType,
        msgNo: msg.msgNo,
        success: success
      });
    });
  };

  WebSocketConnection.prototype.handleMessageVersion = function (msg) {
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo,
      buildTime: this.buildInfo.time
    });
  };

  WebSocketConnection.prototype.handleMessageSubscribe = function (msg) {
    if (!this.sharedMdcClient) return;

    if (!('screenIds' in msg)) {
      throw new Error("Message missing 'screenIds' attribute");
    }

    var existingScreenIds = this.getSubscriptions().map(function (v) {
      return parseInt(v, 10);
    });
    var screenIds = msg.screenIds;
    var unsubscribes = this.difference(existingScreenIds, screenIds);
    var subscribes = this.difference(screenIds, existingScreenIds);

    for (var _i = 0, unsubscribes_1 = unsubscribes; _i < unsubscribes_1.length; _i++) {
      var screenId = unsubscribes_1[_i];
      delete this.screens[screenId];
    }

    for (var _a = 0, subscribes_1 = subscribes; _a < subscribes_1.length; _a++) {
      var screenId = subscribes_1[_a];
      this.screens[screenId] = true;
    } // Assume that this gets run before we continue, hmm


    this.emitSubscriptions();
    var wholeScreens = {};

    for (var _b = 0, subscribes_2 = subscribes; _b < subscribes_2.length; _b++) {
      var screenId = subscribes_2[_b];
      var screen = this.sharedMdcClient.getScreenFullStateCurrent(screenId);

      if (!screen) {
        throw new Error('Screen does not exist');
      }

      wholeScreens[screen.id] = screen;
    }

    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo,
      screens: subscribes.map(function (screenId) {
        return wholeScreens[screenId];
      }).filter(function (screen) {
        return !!screen;
      })
    });
  };

  WebSocketConnection.prototype.handleMessageScreens = function (msg) {
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo,
      screens: this.getScreens()
    });
  };

  WebSocketConnection.prototype.handleMessageMachines = function (msg) {
    if (!this.sharedDncClient) return;
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo,
      machines: this.sharedDncClient.getFullState()
    });
    this.subscribedToMachines = true;
  };

  WebSocketConnection.prototype.handleMessageGetMachineLog = function (msg) {
    var _this = this;

    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    this.externalConnections[dnc].connection.getMachineLog(msg.machineId, function (logData) {
      _this.send({
        msgType: msg.msgType,
        msgNo: msg.msgNo,
        logData: logData
      });
    });
  };

  WebSocketConnection.prototype.handleMessageGetMachineDirectorySend = function (msg) {
    this.getMachineDirectory_(msg, true);
  };

  WebSocketConnection.prototype.handleMessageGetMachineDirectoryReceive = function (msg) {
    this.getMachineDirectory_(msg, false);
  };

  WebSocketConnection.prototype.getMachineDirectory_ = function (msg, isSend) {
    var _this = this;

    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    if (!('relativePath' in msg)) {
      throw new Error("Message missing 'relativePath' attribute");
    }

    var listingFunName = isSend ? 'getMachineDirListingSend' : 'getMachineDirListingReceive';
    this.externalConnections[dnc].connection[listingFunName](msg.machineId, msg.relativePath, function (_a) {
      var _ = _a.success,
          path = _a.path,
          files = _a.files;

      _this.send({
        msgType: msg.msgType,
        msgNo: msg.msgNo,
        dirListing: {
          path: path,
          files: files.map(function (d) {
            return {
              title: d.title,
              isDir: d.isDir
            };
          })
        }
      });
    });
  };

  WebSocketConnection.prototype.handleMessageGetMachineFileSend = function (msg) {
    var _this = this;

    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    if (!('path' in msg)) {
      throw new Error("Message missing 'path' attribute");
    }

    this.externalConnections[dnc].connection.getMachineFileSend(msg.machineId, msg.path, function (file) {
      _this.send({
        msgType: msg.msgType,
        msgNo: msg.msgNo,
        file: file
      });
    });
  };

  WebSocketConnection.prototype.handleMessageGetMachineFileReceive = function (msg) {
    var _this = this;

    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    if (!('path' in msg)) {
      throw new Error("Message missing 'path' attribute");
    }

    this.externalConnections[dnc].connection.getMachineFileReceive(msg.machineId, msg.path, function (file) {
      _this.send({
        msgType: msg.msgType,
        msgNo: msg.msgNo,
        file: file
      });
    });
  };

  WebSocketConnection.prototype.handleMessageFileSend = function (msg) {
    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    if (!('path' in msg)) {
      throw new Error("Message missing 'path' attribute");
    }

    this.externalConnections[dnc].connection.fileSend(msg.machineId, msg.path);
  };

  WebSocketConnection.prototype.handleMessageFileReceive = function (msg) {
    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    if (!('path' in msg)) {
      throw new Error("Message missing 'path' attribute");
    }

    this.externalConnections[dnc].connection.fileReceive(msg.machineId, msg.path);
  };

  WebSocketConnection.prototype.handleMessageStopTransmission = function (msg) {
    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    this.externalConnections[dnc].connection.signalPort(msg.machineId, 'stop-transmission');
  };

  WebSocketConnection.prototype.handleMessageSignalQueueItem = function (msg) {
    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    if (!('operationId' in msg)) {
      throw new Error("Message missing 'operationId' attribute");
    }

    if (!('signal' in msg)) {
      throw new Error("Message missing 'signal' attribute");
    }

    this.externalConnections[dnc].connection.signalQueueItem(msg.machineId, msg.operationId, msg.signal);
  };

  WebSocketConnection.prototype.handleMessageMoveQueueItem = function (msg) {
    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    if (!('operationId' in msg)) {
      throw new Error("Message missing 'operationId' attribute");
    }

    if (!('newPosition' in msg)) {
      throw new Error("Message missing 'newPosition' attribute");
    }

    this.externalConnections[dnc].connection.moveQueueItem(msg.machineId, msg.operationId, msg.newPosition);
  };

  WebSocketConnection.prototype.handleMessageStopPort = function (msg) {
    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    this.externalConnections[dnc].connection.signalPort(msg.machineId, 'stop');
  };

  WebSocketConnection.prototype.handleMessageRestartPort = function (msg) {
    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    this.externalConnections[dnc].connection.signalPort(msg.machineId, 'restart');
  };

  WebSocketConnection.prototype.handleMessageStartPort = function (msg) {
    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    this.externalConnections[dnc].connection.signalPort(msg.machineId, 'start');
  };

  WebSocketConnection.prototype.handleMessageEnablePort = function (msg) {
    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    this.externalConnections[dnc].connection.signalPort(msg.machineId, 'enable');
  };

  WebSocketConnection.prototype.handleMessageDisablePort = function (msg) {
    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    this.externalConnections[dnc].connection.signalPort(msg.machineId, 'disable');
  };

  WebSocketConnection.prototype.handleMessageClick = function (msg) {
    if (!('screenId' in msg)) {
      throw new Error("Message missing 'screenId' attribute");
    }

    if (!('buttonId' in msg)) {
      throw new Error("Message missing 'buttonId' attribute");
    }

    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    if (!('data' in msg)) {
      throw new Error("Message missing 'data' attribute");
    }

    var args = {
      screenId: msg.screenId,
      machineId: msg.machineId,
      buttonId: msg.buttonId,
      data: msg.data
    };
    this.externalConnections[mdc].connection.sendButtonClick(args);
  };

  WebSocketConnection.prototype.handleMessageInput = function (msg) {
    if (!('screenId' in msg)) {
      throw new Error("Message missing 'screenId' attribute");
    }

    if (!('inputId' in msg)) {
      throw new Error("Message missing 'inputId' attribute");
    }

    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    if (!('value' in msg)) {
      throw new Error("Message missing 'value' attribute");
    }

    var args = {
      screenId: msg.screenId,
      machineId: msg.machineId,
      inputId: msg.inputId,
      value: msg.value
    };
    this.externalConnections[mdc].connection.sendInputSubmit(args);
  };

  WebSocketConnection.prototype.handleMessageDowntimeList = function (msg) {
    var _this = this;

    if (!('screenId' in msg)) {
      throw new Error("Message missing 'screenId' attribute");
    }

    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    this.externalConnections[mdc].connection.getDowntimeList(msg.machineId, msg.screenId, function (reasons, downtimes) {
      _this.send({
        msgType: msg.msgType,
        msgNo: msg.msgNo,
        downtimes: downtimes,
        reasons: reasons
      });
    });
  };

  WebSocketConnection.prototype.handleMessageDowntimeResolve = function (msg) {
    if (!('screenId' in msg)) {
      throw new Error("Message missing 'screenId' attribute");
    }

    if (!('machineId' in msg)) {
      throw new Error("Message missing 'machineId' attribute");
    }

    if (!('downtimes' in msg)) {
      throw new Error("Message missing 'downtimes' attribute");
    }

    this.externalConnections[mdc].connection.updateDowntimeEntry(msg.machineId, msg.screenId, msg.downtimes, function () {});
  };

  WebSocketConnection.prototype.handleMessageTranslations = function (msg) {
    if (!this.sharedMdcClient) return;
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo,
      translations: this.sharedMdcClient.translations
    });
  };

  WebSocketConnection.prototype.handleMessageLogin = function (msg) {
    var _this = this;

    var connInfo = this.externalConnections[msg.connType];
    var conn = connInfo.connection;
    connInfo.status = _enums.connectionStatus.authenticating;
    this.sendExternalStatus();
    conn.sendLogin(msg.username, msg.password, function (success) {
      _this.send({
        msgType: msg.msgType,
        msgNo: msg.msgNo,
        success: success
      });

      if (success) {
        connInfo.status = _enums.connectionStatus.authenticated;
      } else {
        connInfo.status = _enums.connectionStatus.licensed;
      }

      _this.sendExternalStatus();
    });
  };

  WebSocketConnection.prototype.handleMessageLogout = function (msg) {
    if (this.externalConnections[msg.connType].connection) {
      this.externalConnections[msg.connType].connection.end();
    }

    this.screens = {};

    if (msg.connType == mdc) {
      this.emitSubscriptions();
    }
  };

  WebSocketConnection.prototype.handleMessagePing = function (msg) {
    this.lastPing = Date.now();
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo
    });
  };

  WebSocketConnection.prototype.handleMessageApps = function (msg) {
    var _this = this;

    var sendResponse = function sendResponse(connType) {
      if (connType === void 0) {
        connType = null;
      }

      _this.send({
        msgType: msg.msgType,
        msgNo: msg.msgNo,
        apps: _this.getExternalStatus(),
        currentApp: connType
      });
    };

    if ('autoConnect' in msg) {
      var autoConnect = msg.autoConnect;
      var connType_1 = null;

      if ('connType' in autoConnect && this.hasProtocol(autoConnect.connType)) {
        connType_1 = autoConnect.connType;
      } else if (this.isSingleProtocol()) {
        connType_1 = this.availableProtocols()[0];
      }

      if (connType_1) {
        this.logger.log('Autoconnect -', connType_1);
        var args = {
          connType: connType_1
        };
        var auth = autoConnect[connType_1];

        if (auth) {
          args.username = auth.username;
          args.password = auth.password;
        }

        this.launchClient(args, function (succ) {
          if (_this.isSingleProtocol()) {
            sendResponse(connType_1);
          } else {
            sendResponse(_this.isProtocolConnected(connType_1) ? connType_1 : null);
          }
        });
        return;
      }
    }

    var prots = [{
      cfg: this.mdcConfig,
      connType: mdc
    }, {
      cfg: this.dncConfig,
      connType: dnc
    }].filter(function (v) {
      return v.cfg;
    }).map(function (v) {
      return v.connType;
    });

    if (prots.length == 1) {
      this.launchClient({
        connType: prots[0]
      }, function () {
        return sendResponse(prots[0]);
      });
    } else {
      sendResponse();
    }
  };

  WebSocketConnection.prototype.handleMessageCreateScreen = function (msg) {
    var newScreenId = this.externalConnections[mdc].connection.createScreen(msg.screenType, msg.title, msg.liveScreenId);
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo,
      screens: this.getScreens(),
      newScreenId: newScreenId
    });
  };

  WebSocketConnection.prototype.handleMessageDeleteScreen = function (msg) {
    this.externalConnections[mdc].connection.deleteScreen(msg.screenId);
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo,
      screens: this.getScreens()
    });
  };

  WebSocketConnection.prototype.handleMessageSaveShopfloorModifications = function (msg) {
    this.externalConnections[mdc].connection.saveShopfloorModifications(msg.screenId, msg.machinePositions, msg.machineDeletions, msg.modifiedSize);
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo
    });
  };

  WebSocketConnection.prototype.handleMessageSwitchBackground = function (msg) {
    this.externalConnections[mdc].connection.saveShopfloorBackground(msg.screenId, msg.background, msg.width, msg.height);
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo,
      success: true
    });
  };

  WebSocketConnection.prototype.handleMessageSubscribeLog = function (msg) {
    var _this = this;

    var memoryLogger = this.logger;
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo,
      subscribed: !!memoryLogger
    });

    if (memoryLogger) {
      this.subscribedToLog = true;
      memoryLogger.storage.getFullLog().map(function (message) {
        return _this.sendLogMessage(message);
      });
    }
  };

  WebSocketConnection.prototype.handleMessageUnsubscribeLog = function (msg) {
    var supportsLogging = !!this.logger.storage;
    this.send({
      msgType: msg.msgType,
      msgNo: msg.msgNo,
      subscribed: false
    });

    if (supportsLogging) {
      this.subscribedToLog = false;
    }
  };

  WebSocketConnection.prototype.handleMessageGetOperatorList = function (msg) {
    var _this = this;

    this.externalConnections[mdc].connection.sendOperatorListRequest({
      screenId: msg.screenId,
      buttonId: msg.buttonId,
      cb: function cb(data) {
        _this.send({
          msgType: msg.msgType,
          msgNo: msg.msgNo,
          data: data
        });
      }
    });
  };

  WebSocketConnection.prototype.handleMessageGetQueryResult = function (msg) {
    var _this = this;

    this.externalConnections[mdc].connection.sendQueryResultRequest({
      screenId: msg.screenId,
      buttonId: msg.buttonId,
      machineId: msg.machineId,
      cb: function cb(data) {
        _this.send({
          msgType: msg.msgType,
          msgNo: msg.msgNo,
          data: data
        });
      }
    });
  };

  WebSocketConnection.prototype.sendLogMessage = function (message) {
    this.send({
      msgType: 'log',
      message: message
    }, true);
  };

  WebSocketConnection.prototype.send = function (msg, silent) {
    if (silent === void 0) {
      silent = false;
    }

    if (true) {
      this.sendDirect(msg, silent);
    } else {
      this.sendDelayed(msg, silent);
    }
  };

  WebSocketConnection.prototype.sendDirect = function (msg, silent) {
    try {
      this.socket.send(JSON.stringify(msg));
    } catch (e) {
      if (!silent) {
        this.logger.error('send failed:', e.stack);
      }
    }
  };

  WebSocketConnection.prototype.sendDelayed = function (msg, silent) {
    var _this = this;

    if (!this.messageQueue) {
      setInterval(function () {
        if (_this.messageQueue.length) {
          var nextMsg = _this.messageQueue.shift();

          _this.sendDirect(nextMsg, silent);
        }
      }, 1000);
    }

    this.messageQueue.push(msg);
  };

  WebSocketConnection.prototype.disconnectIfNoPing = function (cutOffTime) {
    if (this.lastPing < cutOffTime) {
      this.logger.info('Disconnecting because the client has sent no ping');
      this.socket.terminate();
    }
  };

  return WebSocketConnection;
}(_events.EventEmitter);

var _default = WebSocketConnection;
exports.default = _default;
},{"./mdc/Client":"DYWH","./dnc/Client":"Qxeh","./enums":"ZRYf"}],"r4lh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var WebSocket = _interopRequireWildcard(require("ws"));

var _websocketConnection = _interopRequireDefault(require("./websocketConnection"));

var _LazyString = _interopRequireDefault(require("./LazyString"));

var _enums = require("../server/enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function remove(array, element) {
  var index = array.indexOf(element);
  array.splice(index, 1);
}

var WebSocketServer =
/** @class */
function () {
  function WebSocketServer(_a) {
    var _this = this;

    var httpServer = _a.httpServer,
        mdcConfig = _a.mdcConfig,
        dncConfig = _a.dncConfig,
        logger = _a.logger,
        sharedMdcClient = _a.sharedMdcClient,
        sharedDncClient = _a.sharedDncClient,
        buildInfo = _a.buildInfo,
        configServer = _a.configServer,
        encoding = _a.encoding,
        dncAuth = _a.dncAuth;

    var _b;

    this.httpServer = httpServer;
    this.mdcConfig = mdcConfig;
    this.dncConfig = dncConfig;
    this.logger = logger;
    this.buildInfo = buildInfo;
    this.wss = new WebSocket.Server({
      server: httpServer
    });
    this.connectionId = 0;
    this.connections = [];
    this.sharedMdcClient = sharedMdcClient;
    this.sharedDncClient = sharedDncClient;
    this.configServer = configServer;
    this.wss.on('connection', function (ws, upgradeReq) {
      return _this.handleConnection(ws, upgradeReq);
    });
    this.encoding = encoding;
    this.dncAuth = dncAuth;

    if ((_b = this.logger.storage) === null || _b === void 0 ? void 0 : _b.on) {
      this.logger.storage.on('append', function (message) {
        _this.connections.filter(function (conn) {
          return conn.subscribedToLog;
        }).map(function (conn) {
          return conn.sendLogMessage(message);
        });
      });
    }

    setInterval(function () {
      var _a;

      var connTypesWithCount = _enums.allConnectionTypes.map(function (connType) {
        return {
          connType: connType,
          count: _this.connections.filter(function (conn) {
            return [_enums.connectionStatus.unavailable, _enums.connectionStatus.offline, _enums.connectionStatus.connecting].indexOf(conn.externalConnections[connType].status) == -1;
          }).length
        };
      });

      var statusStr = connTypesWithCount.map(function (_a) {
        var connType = _a.connType,
            count = _a.count;
        return (0, _enums.connectionTypeName)(connType).toUpperCase() + ": " + count;
      }).join(', ');
      var messages = ['Conn:', _this.connections.length, "(" + statusStr + ")"];

      if (_this.sharedMdcClient) {
        messages.push('*', 'Upd:', Math.round(_this.sharedMdcClient.sumUpdateTime / _this.sharedMdcClient.countUpdateTime) + "ms");

        if (_this.sharedMdcClient.liveState) {
          var stringCount = 0;
          var stringCountEvaluated = 0;

          for (var machineId in _this.sharedMdcClient.liveState) {
            for (var evalId in _this.sharedMdcClient.liveState[machineId]) {
              var val = _this.sharedMdcClient.liveState[machineId][evalId];

              if (val instanceof _LazyString.default) {
                stringCount++;
                if (val.evaluated) stringCountEvaluated++;
              }
            }
          }

          messages.push('*', 'Str:', stringCountEvaluated + "/" + stringCount);
        }

        if ('subscribedScreenIds' in _this.sharedMdcClient) {
          messages.push('*', 'Sub:', _this.sharedMdcClient.subscribedScreenIds.length + "/" + _this.sharedMdcClient.screens.length);
        }

        if ('machines' in _this.sharedMdcClient) {
          messages.push('*', 'Mch:', "" + _this.sharedMdcClient.machines.length);
        }
      }

      (_a = _this.logger).info.apply(_a, messages);
    }, 10000);
    setInterval(function () {
      var cutOffTime = Date.now() - 60000;

      _this.connections.forEach(function (conn) {
        return conn.disconnectIfNoPing(cutOffTime);
      });
    }, 10000);
  }

  WebSocketServer.prototype.handleConnection = function (socket, upgradeReq) {
    var _this = this;

    var connectionId = ++this.connectionId;
    var connection = new _websocketConnection.default({
      socket: socket,
      upgradeReq: upgradeReq,
      mdcConfig: this.mdcConfig,
      dncConfig: this.dncConfig,
      logger: this.logger.subLogger("Connection #" + connectionId),
      buildInfo: this.buildInfo,
      connectionId: connectionId,
      sharedMdcClient: this.sharedMdcClient,
      sharedDncClient: this.sharedDncClient,
      configServer: this.configServer,
      encoding: this.encoding,
      dncAuth: this.dncAuth
    });
    this.connections.push(connection);
    connection.on('close', function () {
      remove(_this.connections, connection);

      _this.updateSubscriptions();
    });
    connection.on('update-subscriptions', function (screenIds) {
      _this.updateSubscriptions();
    });
  };

  WebSocketServer.prototype.updateSubscriptions = function () {
    if (!this.sharedMdcClient) {
      return;
    }

    var subscribedScreens = {};
    this.connections.forEach(function (conn) {
      conn.getSubscriptions().forEach(function (screenId) {
        subscribedScreens[screenId] = true;
      });
    });
    var subscribedScreenIds = Object.keys(subscribedScreens).map(function (v) {
      return parseInt(v, 10);
    });
    this.sharedMdcClient.setSubscribedScreens(subscribedScreenIds);
  };

  return WebSocketServer;
}();

var _default = WebSocketServer;
exports.default = _default;
},{"./websocketConnection":"jPEg","./LazyString":"aFq9","../server/enums":"ZRYf"}],"WOs9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StdoutLogger = exports.NullLogger = exports.MemoryLoggerStorage = exports.MemoryLogger = exports.FileLogger = exports.BaseLogger = void 0;

var os = _interopRequireWildcard(require("os"));

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var _events = require("events");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var BaseLogger =
/** @class */
function () {
  function BaseLogger(args) {
    if (args === void 0) {
      args = {};
    }

    this.prefix = '';
    this.args = args;
  }

  BaseLogger.prototype.subLogger = function (prefix) {
    var logger = this.createInstance(this.args);
    var finalPrefix = this.prefix ? this.prefix + " - " : '';
    logger.prefix = finalPrefix + prefix;
    return logger;
  }; // For compatibility with existing implementation


  BaseLogger.prototype.log = function () {
    var msgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      msgs[_i] = arguments[_i];
    }

    this.debug.apply(this, msgs);
  };

  BaseLogger.prototype.info = function () {
    var msgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      msgs[_i] = arguments[_i];
    }

    this.logRaw.apply(this, __spreadArrays(['INFO'], msgs));
  };

  BaseLogger.prototype.debug = function () {
    var msgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      msgs[_i] = arguments[_i];
    }

    this.logRaw.apply(this, __spreadArrays(['DEBUG'], msgs));
  };

  BaseLogger.prototype.error = function () {
    var msgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      msgs[_i] = arguments[_i];
    }

    this.logRaw.apply(this, __spreadArrays(['ERROR'], msgs));
  };

  BaseLogger.prototype.logRaw = function (type) {
    var msgs = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      msgs[_i - 1] = arguments[_i];
    }

    var cb = null;

    if (0 in msgs && typeof msgs[0] == 'function') {
      cb = msgs[0];
      msgs = msgs.slice(1);
    }

    var combinedMsg = msgs.map(function (msg) {
      return _typeof(msg) == 'object' ? JSON.stringify(msg, null, 2) : msg;
    }).join(' ');
    var prefix = this.prefix ? this.prefix + " - " : '';
    var typeString = ("[" + type + "]").padEnd(7);
    this.logBase("[" + this.date() + "] " + typeString + " " + prefix + combinedMsg + os.EOL, cb ? cb : function () {});
  };

  BaseLogger.prototype.zpad = function (v) {
    return v.toString().padStart(2, '0');
  };

  BaseLogger.prototype.date = function () {
    var d = new Date();
    return d.getFullYear() + "-" + this.zpad(d.getMonth()) + "-" + this.zpad(d.getDate()) + " " + this.zpad(d.getHours()) + ":" + this.zpad(d.getMinutes()) + ":" + this.zpad(d.getSeconds());
  };

  return BaseLogger;
}();

exports.BaseLogger = BaseLogger;

var NullLogger =
/** @class */
function (_super) {
  __extends(NullLogger, _super);

  function NullLogger() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  NullLogger.prototype.logBase = function (message) {};

  NullLogger.prototype.createInstance = function (args) {
    return new NullLogger(args);
  };

  return NullLogger;
}(BaseLogger);

exports.NullLogger = NullLogger;

var StdoutLogger =
/** @class */
function (_super) {
  __extends(StdoutLogger, _super);

  function StdoutLogger() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  StdoutLogger.prototype.logBase = function (message, cb) {
    process.stdout.write(message, cb);
  };

  StdoutLogger.prototype.createInstance = function (args) {
    return new StdoutLogger(args);
  };

  return StdoutLogger;
}(BaseLogger);

exports.StdoutLogger = StdoutLogger;

var FileLoggerStorage =
/** @class */
function () {
  function FileLoggerStorage(filename, append) {
    var _this = this;

    this.write = function (message, cb) {
      _this.ensureWriteStream();

      return _this.fileStream.write(message, cb);
    };

    this.baseFilename = filename;
    this.append = append;
  }

  FileLoggerStorage.prototype.ensureWriteStream = function () {
    var date = new Date().getDate();
    if (date == this.lastDate) return;
    this.lastDate = date;
    var currentFilename = this.getCurrentFilename();
    this.fileStream = fs.createWriteStream(currentFilename, {
      flags: this.append ? 'a' : 'w'
    });
  };

  FileLoggerStorage.prototype.getCurrentFilename = function () {
    var parsed = path.parse(this.baseFilename);
    var today = new Date();
    var todayString = [today.getFullYear(), (today.getMonth() + 1).toString().padStart(2, '0'), today.getDate().toString().padStart(2, '0')].join('-');
    return path.join(parsed.dir, parsed.name + '_' + todayString + parsed.ext);
  };

  return FileLoggerStorage;
}();

var FileLogger =
/** @class */
function (_super) {
  __extends(FileLogger, _super);

  function FileLogger(args) {
    var _this = _super.call(this, args) || this;

    var filename = args.filename,
        append = args.append; // Make sure this is not new for each subLogger

    if (args.storage instanceof FileLoggerStorage) {
      _this.storage = args.storage;
    } else {
      _this.storage = new FileLoggerStorage(filename, append);
      _this.args.storage = _this.storage;
    }

    return _this;
  }

  FileLogger.prototype.logBase = function (message, cb) {
    this.storage.write(message, cb);
  };

  FileLogger.prototype.createInstance = function (args) {
    return new FileLogger(args);
  };

  return FileLogger;
}(BaseLogger);

exports.FileLogger = FileLogger;

var MemoryLoggerStorage =
/** @class */
function (_super) {
  __extends(MemoryLoggerStorage, _super);

  function MemoryLoggerStorage() {
    var _this = _super.call(this) || this;

    _this.logData = [];
    _this.logData = [];
    return _this;
  }

  MemoryLoggerStorage.prototype.append = function (message) {
    this.logData.push(message);

    while (this.logData.length > 20000) {
      this.logData.shift();
    }

    this.emit('append', message);
  };

  MemoryLoggerStorage.prototype.getFullLog = function () {
    return this.logData;
  };

  return MemoryLoggerStorage;
}(_events.EventEmitter);

exports.MemoryLoggerStorage = MemoryLoggerStorage;

var MemoryLogger =
/** @class */
function (_super) {
  __extends(MemoryLogger, _super);

  function MemoryLogger(args) {
    if (args === void 0) {
      args = {};
    }

    var _this = _super.call(this, args) || this; // Make sure this is not new for each subLogger


    if (args.storage instanceof MemoryLoggerStorage) {
      _this.storage = args.storage;
    } else {
      _this.storage = new MemoryLoggerStorage();
      _this.args.storage = _this.storage;
    }

    return _this;
  }

  MemoryLogger.prototype.logBase = function (message) {
    this.storage.append(message);
  };

  MemoryLogger.prototype.createInstance = function (args) {
    return new MemoryLogger(args);
  };

  return MemoryLogger;
}(BaseLogger);

exports.MemoryLogger = MemoryLogger;
},{}],"KNgD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var fs = _interopRequireWildcard(require("fs"));

var _tsDeepcopy = _interopRequireDefault(require("ts-deepcopy"));

var path = _interopRequireWildcard(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Config =
/** @class */
function () {
  function Config() {
    this.screens = {};
    this.encoding = '';
    this.skipAsciiStrings = true;
    this.compression = false;
    this.logfile = '';
    this.lastUpdate = Date.now();
  }

  Config.prototype.fromJson = function (jsonString, configFileDir) {
    var _this = this;

    var json = JSON.parse(jsonString);

    if (json.screens) {
      // We accidentally released a version where this.screens was suddenly an array.
      if (Array.isArray(json.screens)) {
        json.screens.map(function (screen) {
          return _this.screens[screen.id] = screen;
        });
      } else {
        this.screens = json.screens;
      }
    } else {
      this.screens = {};
    }

    this.encoding = json.encoding || '';
    this.skipAsciiStrings = json.skipAsciiStrings || true;
    this.compression = json.compression || false;
    this.logfile = json.logfile || '';
    this.keyAndCert = json.sslKey && json.sslCert ? {
      key: path.isAbsolute(json.sslKey) ? json.sslKey : path.join(configFileDir, json.sslKey),
      cert: path.isAbsolute(json.sslCert) ? json.sslCert : path.join(configFileDir, json.sslCert)
    } : undefined;
    this.httpPort = json.httpPort ? parseInt(json.httpPort, 10) : undefined;
    this.httpsPort = json.httpsPort ? parseInt(json.httpsPort, 10) : undefined;
    this.lastUpdate = json.lastUpdate || Date.parse('2020-01-01');
  };

  return Config;
}();

var ConfigServer =
/** @class */
function (_super) {
  __extends(ConfigServer, _super);

  function ConfigServer(configFilePath, logger) {
    var _this = _super.call(this) || this;

    _this.setMaxListeners(0);

    _this.configFilePath = configFilePath;
    _this.logger = logger;

    _this.logger.log(configFilePath);

    _this.config = new Config();

    _this.logger.log('Will attempt to load config file ' + configFilePath);

    try {
      var contents = fs.readFileSync(configFilePath).toString();

      try {
        _this.config.fromJson(contents, path.dirname(configFilePath));

        if (_typeof(_this.config) != 'object') {
          _this.logger.log('Found non-object config file in ' + configFilePath);
        } else {
          _this.logger.log('Found config file in ' + configFilePath);
        }
      } catch (e) {
        _this.logger.log('Failed to parse config file in ' + configFilePath);

        _this.logger.log(e.stack);
      }
    } catch (e) {
      _this.logger.log('Found no config file in ' + configFilePath);
    }

    return _this;
  }

  ConfigServer.prototype.writeConfig = function () {
    this.config.lastUpdate = Date.now();
    fs.writeFile(this.configFilePath, JSON.stringify(this.config, null, 2), function () {});
  };

  ConfigServer.prototype.updateScreen = function (screenId, newConfiguration) {
    this.config.screens[screenId] = (0, _tsDeepcopy.default)(newConfiguration);
    this.writeConfig();
    this.emit('update', screenId);
  };

  ConfigServer.prototype.setBackground = function (screenId, background, width, height) {
    var screen = this.config.screens[screenId];

    if (screen.type != 'shopfloor') {
      return;
    }

    screen.background = background;
    screen.width = width;
    screen.height = height;
    this.writeConfig();
    this.emit('update', screenId);
  };

  ConfigServer.prototype.addScreen = function (configuration_) {
    var newId = 4000001;

    while (this.config.screens[newId]) {
      newId++;
    }

    var configuration = (0, _tsDeepcopy.default)(configuration_);
    configuration.id = newId;
    this.config.screens[newId] = configuration;
    this.writeConfig();
    this.emit('update', newId);
    return newId;
  };

  ConfigServer.prototype.deleteScreen = function (screenId) {
    delete this.config.screens[screenId];
    this.writeConfig();
    this.emit('update', screenId);
  };

  ConfigServer.prototype.getScreens = function () {
    return (0, _tsDeepcopy.default)(Object.values(this.config.screens));
  };

  ConfigServer.prototype.getScreen = function (screenId) {
    return (0, _tsDeepcopy.default)(this.config.screens[screenId]);
  };

  return ConfigServer;
}(_events.EventEmitter);

var _default = ConfigServer;
exports.default = _default;
},{}],"lpyx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbToHsl = exports.rgbToHex = exports.hslToRgb = exports.bgrIntToRgb = void 0;

var bgrIntToRgb = function bgrIntToRgb(v) {
  var r = (v & 0x000000ff) >> 0;
  var g = (v & 0x0000ff00) >> 8;
  var b = (v & 0x00ff0000) >> 16;
  return [r, g, b];
};

exports.bgrIntToRgb = bgrIntToRgb;

var toHex = function toHex(v, pad) {
  if (pad == null) {
    pad = 0;
  }

  var formatted = Math.round(v).toString(16);
  return '0'.repeat(Math.max(0, pad - formatted.length)) + formatted;
};

var rgbToHex = function rgbToHex(color) {
  var _a = color.map(function (v) {
    return toHex(v, 2);
  }),
      r = _a[0],
      g = _a[1],
      b = _a[2];

  return "#" + r + g + b;
};
/*
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */


exports.rgbToHex = rgbToHex;

var rgbToHsl = function rgbToHsl(colorArray) {
  var r = colorArray[0],
      g = colorArray[1],
      b = colorArray[2];
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = undefined;
  var s = undefined;
  var l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
};
/*
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */


exports.rgbToHsl = rgbToHsl;

var hslToRgb = function hslToRgb(colorArray) {
  var h = colorArray[0],
      s = colorArray[1],
      l = colorArray[2];
  var r = undefined;
  var g = undefined;
  var b = undefined;

  var hue2rgb = function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }

    if (t > 1) {
      t -= 1;
    }

    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }

    if (t < 1 / 2) {
      return q;
    }

    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }

    return p;
  };

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
};

exports.hslToRgb = hslToRgb;
},{}],"b2PY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _color = require("../color");

var ScreenParser =
/** @class */
function () {
  function ScreenParser(logger) {
    this.logger = logger;
  }

  ScreenParser.prototype.makeBool_ = function (config, name) {
    if (!(name in config)) {
      this.logger.info("Missing value for key '" + name + "'");
      return false;
    }

    switch (config[name]) {
      case 'Yes':
      case '1':
      case true:
        // For JSON
        return true;

      case 'No':
      case '0':
      case false:
        // For JSON
        return false;

      default:
        this.logger.info("Boolean value was " + config[name] + " for name " + name);
        return false;
    }
  };

  ScreenParser.prototype.makeString_ = function (config, name) {
    if (!(name in config)) {
      this.logger.info("Missing value for key '" + name + "'");
      return '';
    }

    if (config[name][0] === '"' && config[name][config[name].length - 1] === '"') {
      return config[name].substring(1, config[name].length - 1);
    }

    return config[name];
  };

  ScreenParser.prototype.makeInt_ = function (config, name) {
    if (!(name in config)) {
      this.logger.info("Missing value for key '" + name + "'");
      return 0;
    }

    var v = parseInt(config[name], 10);

    if (isNaN(v)) {
      this.logger.info("Value for key '" + name + "' was NaN");
      return 0;
    }

    return v;
  };

  ScreenParser.prototype.makeSeparated_ = function (config, separator, name) {
    if (!(name in config)) {
      this.logger.info("Missing value for key '" + name + "'");
      return [];
    }

    return config[name].split(separator);
  };

  ScreenParser.prototype.wrapKey = function (prefix, index) {
    return function (name) {
      return "" + prefix + name + "_" + index;
    };
  };

  ScreenParser.prototype.makeColor = function (color, customColor) {
    if (customColor === void 0) {
      customColor = null;
    }

    var colorId = parseInt(color.substring(5), 10);

    if (colorId === 32 && customColor) {
      var customId = parseInt(customColor.substring(11), 10);
      var rgb = (0, _color.bgrIntToRgb)(customId);
      return (0, _color.rgbToHex)(rgb);
    } else {
      return colorId;
    }
  };

  return ScreenParser;
}();

var _default = ScreenParser;
exports.default = _default;
},{"../color":"lpyx"}],"mbil":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ScreenParser = _interopRequireDefault(require("./ScreenParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var StatusScreenParser =
/** @class */
function (_super) {
  __extends(StatusScreenParser, _super);

  function StatusScreenParser() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  StatusScreenParser.prototype.parse = function (config) {
    var stateCount = this.makeInt_(config, 'STATES');
    var buttonCount = this.makeInt_(config, 'BUTTONS');
    var columnCount = this.makeInt_(config, 'COLUMNS');
    return {
      type: 'status',
      overallPosition: -1,
      position: -1,
      id: this.makeInt_(config, 'CONFIGIDX'),
      // Integers
      MODE: this.makeInt_(config, 'MODE'),
      LAYOUTMINROWS: this.makeInt_(config, 'LAYOUTMINROWS'),
      LAYOUTMAXROWS: this.makeInt_(config, 'LAYOUTMAXROWS'),
      LAYOUTMINCOLS: this.makeInt_(config, 'LAYOUTMINCOLS'),
      LAYOUTMAXCOLS: this.makeInt_(config, 'LAYOUTMAXCOLS'),
      FONTSIZETOP: this.makeInt_(config, 'FONTSIZETOP'),
      FONTSIZEBOT: this.makeInt_(config, 'FONTSIZEBOT'),
      BUTTONSIZE: this.makeInt_(config, 'BUTTONSIZE'),
      SCROLLTIME: this.makeInt_(config, 'SCROLLTIME'),
      COLUMNS: columnCount,
      TOPCOLS: this.makeInt_(config, 'TOPCOLS'),
      BOT1COLS: this.makeInt_(config, 'BOT1COLS'),
      STATES: stateCount,
      BUTTONS: buttonCount,
      LISTNAMEMODE: this.makeInt_(config, 'LISTNAMEMODE'),
      SORTBYFIELD: this.makeInt_(config, 'SORTBYFIELD'),
      FONTSIZETITLE: this.makeInt_(config, 'FONTSIZETITLE'),
      // Booleans
      HIDEIDLE: this.makeBool_(config, 'HIDEIDLE'),
      ALWAYSONLY: this.makeBool_(config, 'ALWAYSONLY'),
      TIMELINE: this.makeBool_(config, 'TIMELINE'),
      // Strings
      DESCRIPTION: this.makeString_(config, 'DESCRIPTION'),
      MACHINES: this.makeSeparated_(config, ':', 'MACHINES'),
      BUTTON_LIST: this.parseButtonList(config, buttonCount),
      COLUMN_LIST: this.parseColumnList(config, columnCount),
      STATE_LIST: this.parseStateList(config, stateCount)
    };
  };

  StatusScreenParser.prototype.parseButton = function (config, buttonIndex) {
    var _this = this;

    var _wrapKey = function _wrapKey(name) {
      return _this.wrapKey('BUTTON', buttonIndex)(name);
    };

    var attr = this.makeSeparated_(config, ':', _wrapKey('ATTR'));
    var colors = attr.filter(function (a) {
      return a.indexOf('COLOR') === 0;
    });
    var color = colors.length ? colors[0] : null;
    var customColors = attr.filter(function (a) {
      return a.indexOf('COLORCUSTOM') === 0;
    });
    var customColor = customColors.length ? customColors[0] : null;
    var button = {
      id: buttonIndex,
      ATTR: attr,
      TITLE: this.makeString_(config, _wrapKey('TITLE')),
      BIG: this.makeInt_(config, _wrapKey('BIG')),
      USEJOB: this.makeBool_(config, _wrapKey('USEJOB')),
      color: color ? this.makeColor(color, customColor) : null
    };
    return button;
  };

  StatusScreenParser.prototype.parseButtonList = function (config, buttonCount) {
    var buttons = [];

    for (var i = 1; i <= buttonCount; i++) {
      buttons.push(this.parseButton(config, i));
    }

    return buttons;
  };

  StatusScreenParser.prototype.parseColumn = function (config, columnIndex) {
    var _this = this;

    var _wrapKey = function _wrapKey(name) {
      return _this.wrapKey('COL', columnIndex)(name);
    };

    var column = {
      id: columnIndex,
      WIDTH: this.makeInt_(config, _wrapKey('WIDTH')),
      OPTIONS: this.makeSeparated_(config, ':', _wrapKey('OPTIONS')),
      TITLE: this.makeString_(config, _wrapKey('TITLE')),
      FORMAT: this.makeString_(config, _wrapKey('FORMAT'))
    };
    return column;
  };

  StatusScreenParser.prototype.parseColumnList = function (config, columnCount) {
    var columns = [];

    for (var i = 1; i <= columnCount; i++) {
      columns.push(this.parseColumn(config, i));
    }

    return columns;
  };

  StatusScreenParser.prototype.parseState = function (config, stateIndex) {
    var _this = this;

    var _wrapKey = function _wrapKey(name) {
      return _this.wrapKey('STATE', stateIndex)(name);
    };

    var attr = this.makeSeparated_(config, ':', _wrapKey('ATTR'));
    var colors = attr.filter(function (a) {
      return a.indexOf('COLOR') === 0;
    });
    var color = colors.length ? colors[0] : null;
    var customColors = attr.filter(function (a) {
      return a.indexOf('COLORCUSTOM') === 0;
    });
    var customColor = customColors.length ? customColors[0] : null;
    var state = {
      id: stateIndex,
      ATTR: attr,
      color: color ? this.makeColor(color, customColor) : null
    };
    return state;
  };

  StatusScreenParser.prototype.parseStateList = function (config, stateCount) {
    var states = [];

    for (var i = 1; i <= stateCount; i++) {
      states.push(this.parseState(config, i));
    }

    return states;
  };

  return StatusScreenParser;
}(_ScreenParser.default);

var _default = StatusScreenParser;
exports.default = _default;
},{"./ScreenParser":"b2PY"}],"OhQm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ScreenParser = _interopRequireDefault(require("./ScreenParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var OperatorScreenParser =
/** @class */
function (_super) {
  __extends(OperatorScreenParser, _super);

  function OperatorScreenParser() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  OperatorScreenParser.prototype.parse = function (config) {
    var buttonCount = this.makeInt_(config, 'BUTTONS');
    var stateCount = this.makeInt_(config, 'STATES');
    var inputCount = this.makeInt_(config, 'INPUTS');
    var columnCount = this.makeInt_(config, 'COLUMNS');
    var screen = {
      overallPosition: -1,
      type: 'operator',
      position: -1,
      id: this.makeInt_(config, 'CONFIGIDX'),
      // Integers
      MODE: this.makeInt_(config, 'MODE'),
      LISTNAMEMODE: this.makeInt_(config, 'LISTNAMEMODE'),
      AUTOLOGOFFTIME: this.makeInt_(config, 'AUTOLOGOFFTIME'),
      BUTTONS: buttonCount,
      STATES: stateCount,
      BUTTONSIZE: this.makeInt_(config, 'BUTTONSIZE'),
      INPUTS: inputCount,
      COLUMNS: columnCount,
      // Booleans
      DNCMAXCLIENTBUT: this.makeBool_(config, 'DNCMAXCLIENTBUT'),
      OPRISSUBSCR: this.makeBool_(config, 'OPRISSUBSCR'),
      AUTOCLOSESUB: this.makeBool_(config, 'AUTOCLOSESUB'),
      LIMITACCESS: this.makeBool_(config, 'LIMITACCESS'),
      ONSCREENKB: this.makeBool_(config, 'ONSCREENKB'),
      SHOWLOGOFFBUT: this.makeBool_(config, 'SHOWLOGOFFBUT'),
      SHOWUSERIDLIST: this.makeBool_(config, 'SHOWUSERIDLIST'),
      LOGOFFCLOSE: this.makeBool_(config, 'LOGOFFCLOSE'),
      TIMELINE: this.makeBool_(config, 'TIMELINE'),
      MACHINES: this.makeSeparated_(config, ':', 'MACHINES'),
      ALLOWEDGROUPS: this.makeSeparated_(config, ',', 'ALLOWEDGROUPS'),
      DESCRIPTION: this.makeString_(config, 'DESCRIPTION'),
      BUTTON_LIST: this.parseButtonList(config, buttonCount),
      COLUMN_LIST: this.parseColumnList(config, columnCount),
      INPUT_LIST: this.parseInputList(config, inputCount),
      STATE_LIST: this.parseStateList(config, stateCount)
    };
    return screen;
  };

  OperatorScreenParser.prototype.parseButton = function (config, buttonIndex) {
    var _this = this;

    var _wrapKey = function _wrapKey(name) {
      return _this.wrapKey('BUTTON', buttonIndex)(name);
    };

    var attr = this.makeSeparated_(config, ':', _wrapKey('ATTR'));
    var colors = attr.filter(function (a) {
      return a.indexOf('COLOR') === 0;
    });
    var color = colors.length ? colors[0] : null;
    var customColors = attr.filter(function (a) {
      return a.indexOf('COLORCUSTOM') === 0;
    });
    var customColor = customColors.length ? customColors[0] : null;
    var button = {
      id: buttonIndex,
      SENDMSG: this.makeBool_(config, _wrapKey('SENDMSG')),
      JOBCOLS: {
        1: this.makeInt_(config, _wrapKey('JOBCOL1')),
        2: this.makeInt_(config, _wrapKey('JOBCOL2')),
        3: this.makeInt_(config, _wrapKey('JOBCOL3')),
        4: this.makeInt_(config, _wrapKey('JOBCOL4')),
        5: this.makeInt_(config, _wrapKey('JOBCOL5')),
        6: this.makeInt_(config, _wrapKey('JOBCOL6')),
        7: this.makeInt_(config, _wrapKey('JOBCOL7')),
        8: this.makeInt_(config, _wrapKey('JOBCOL8'))
      },
      USEJOB: this.makeInt_(config, _wrapKey('USEJOB')),
      BIG: this.makeInt_(config, _wrapKey('BIG')),
      JOBCUSTOM: this.makeInt_(config, _wrapKey('JOBCUSTOM')),
      JOBCUSTOMTITLE: this.makeString_(config, _wrapKey('JOBCUSTOMTITLE')),
      SUBSCR: this.makeString_(config, _wrapKey('SUBSCR')),
      ATTR: attr,
      JOBFILE: this.makeString_(config, _wrapKey('JOBFILE')),
      TITLE: this.makeString_(config, _wrapKey('TITLE')),
      color: color ? this.makeColor(color, customColor) : null
    };
    return button;
  };

  OperatorScreenParser.prototype.parseButtonList = function (config, buttonCount) {
    var buttons = [];

    for (var i = 1; i <= buttonCount; i++) {
      buttons.push(this.parseButton(config, i));
    }

    return buttons;
  };

  OperatorScreenParser.prototype.parseColumn = function (config, columnIndex) {
    var _this = this;

    var _wrapKey = function _wrapKey(name) {
      return _this.wrapKey('COL', columnIndex)(name);
    };

    var column = {
      id: columnIndex,
      WIDTH: this.makeInt_(config, _wrapKey('WIDTH')),
      OPTIONS: this.makeSeparated_(config, ':', _wrapKey('OPTIONS')),
      TITLE: this.makeString_(config, _wrapKey('TITLE')),
      FORMAT: this.makeString_(config, _wrapKey('FORMAT')),
      OPERATORHIDE: this.makeBool_(config, _wrapKey('OPERATORHIDE'))
    };
    return column;
  };

  OperatorScreenParser.prototype.parseColumnList = function (config, columnCount) {
    var columns = [];

    for (var i = 1; i <= columnCount; i++) {
      columns.push(this.parseColumn(config, i));
    }

    return columns;
  };

  OperatorScreenParser.prototype.parseState = function (config, stateIndex) {
    var _this = this;

    var _wrapKey = function _wrapKey(name) {
      return _this.wrapKey('STATE', stateIndex)(name);
    };

    var attr = this.makeSeparated_(config, ':', _wrapKey('ATTR'));
    var colors = attr.filter(function (a) {
      return a.indexOf('COLOR') === 0;
    });
    var color = colors.length ? colors[0] : null;
    var customColors = attr.filter(function (a) {
      return a.indexOf('COLORCUSTOM') === 0;
    });
    var customColor = customColors.length ? customColors[0] : null;
    var state = {
      id: stateIndex,
      ATTR: attr,
      color: color ? this.makeColor(color, customColor) : null
    };
    return state;
  };

  OperatorScreenParser.prototype.parseStateList = function (config, stateCount) {
    var states = [];

    for (var i = 1; i <= stateCount; i++) {
      states.push(this.parseState(config, i));
    }

    return states;
  };

  OperatorScreenParser.prototype.parseInput = function (config, inputIndex) {
    var _this = this;

    var _wrapKey = function _wrapKey(name) {
      return _this.wrapKey('INPUT', inputIndex)(name);
    };

    var input = {
      id: inputIndex,
      ATTR: this.makeSeparated_(config, ':', _wrapKey('ATTR')),
      TITLE: this.makeString_(config, _wrapKey('TITLE')),
      BIG: this.makeBool_(config, _wrapKey('BIG'))
    };
    return input;
  };

  OperatorScreenParser.prototype.parseInputList = function (config, inputCount) {
    var inputs = [];

    for (var i = 1; i <= inputCount; i++) {
      inputs.push(this.parseInput(config, i));
    }

    return inputs;
  };

  return OperatorScreenParser;
}(_ScreenParser.default);

var _default = OperatorScreenParser;
exports.default = _default;
},{"./ScreenParser":"b2PY"}],"VTb8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ScreenParser = _interopRequireDefault(require("./ScreenParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var DashboardParser =
/** @class */
function (_super) {
  __extends(DashboardParser, _super);

  function DashboardParser() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  DashboardParser.prototype.parse = function (config) {
    var screens = [];

    for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
      var screen = config_1[_i];
      screens.push(this.parseScreen(screen));
    }

    return screens;
  };

  DashboardParser.prototype.parseScreen = function (config) {
    return {
      id: config.ID,
      type: 'dashboard',
      position: -1,
      overallPosition: -1,
      MACHINES: this.makeSeparated_(config, ':', 'MACHINES'),
      DESCRIPTION: this.makeString_(config, 'DESCRIPTION'),
      WIDGETS: this.parseWidgetList(config.WIDGETS),
      FORALL: this.makeBool_(config, 'FORALL'),
      LISTNAMEMODE: this.makeInt_(config, 'LISTNAMEMODE')
    };
  };

  DashboardParser.prototype.parseWidgetList = function (items) {
    var _this = this;

    return items.map(function (i) {
      return _this.parseWidget(i);
    });
  };

  DashboardParser.prototype.parseWidget = function (item) {
    return {
      TITLE: this.makeString_(item, 'TITLE'),
      TYPE: this.makeInt_(item, 'TYPE'),
      BEHAVIOR: this.makeInt_(item, 'BEHAVIOR'),
      VALUES: this.parseWidgetValueList(item.VALUES),
      MINVALUEEVALNO: this.makeInt_(item, 'MINVALUEEVALNO'),
      MAXVALUEEVALNO: this.makeInt_(item, 'MAXVALUEEVALNO'),
      TARGETMINEVALNO: this.makeInt_(item, 'TARGETMINEVALNO'),
      TARGETMAXEVALNO: this.makeInt_(item, 'TARGETMAXEVALNO'),
      TARGETABOVE: this.makeInt_(item, 'TARGETABOVE'),
      TARGETBETWEEN: this.makeInt_(item, 'TARGETBETWEEN'),
      TARGETBELOW: this.makeInt_(item, 'TARGETBELOW')
    };
  };

  DashboardParser.prototype.parseWidgetValueList = function (items) {
    var _this = this;

    return items.map(function (i) {
      return _this.parseWidgetValue(i);
    });
  };

  DashboardParser.prototype.parseWidgetValue = function (item) {
    return {
      DESC: this.makeString_(item, 'DESC'),
      FORMAT: this.makeString_(item, 'FORMAT'),
      EVALNO: this.makeInt_(item, 'EVALNO')
    };
  };

  return DashboardParser;
}(_ScreenParser.default);

var _default = DashboardParser;
exports.default = _default;
},{"./ScreenParser":"b2PY"}],"rVFf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _iniparser = _interopRequireDefault(require("iniparser"));

var _StatusScreenParser = _interopRequireDefault(require("./StatusScreenParser"));

var _OperatorScreenParser = _interopRequireDefault(require("./OperatorScreenParser"));

var _DashboardParser = _interopRequireDefault(require("./DashboardParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigParser =
/** @class */
function () {
  function ConfigParser(logger) {
    this.statusScreens = [];
    this.operatorScreens = [];
    this.dashboards = [];
    this.screens = [];
    this.logger = logger;
  }

  ConfigParser.prototype.parseIniConfigFromString = function (iniString) {
    var parsed = _iniparser.default.parseString(iniString);

    return this.parseIniConfigObject(parsed);
  };

  ConfigParser.prototype.parseIniConfigObject = function (config) {
    var i,
        overallPosition = 0;
    var liveScreenCount = parseInt(config.GENERAL.STATUSCOUNT, 10);

    for (i = 1; i <= liveScreenCount; i++) {
      var screen = this.parseStatusScreen(config["LIVESTATUS_" + i]);

      if (screen) {
        screen.overallPosition = overallPosition++;
        screen.position = i;
        this.screens.push(screen);
        this.statusScreens.push(screen);
      }
    }

    var operatorScreenCount = parseInt(config.GENERAL.OPRSCRCOUNT, 10);

    for (i = 1; i <= operatorScreenCount; i++) {
      var screen = this.parseOperatorScreen(config["OPRSCR_" + i]);

      if (screen) {
        screen.overallPosition = overallPosition++;
        screen.position = i;
        this.screens.push(screen);
        this.operatorScreens.push(screen);
      }
    }
  };

  ConfigParser.prototype.parseJsonConfigObject = function (config) {
    var parser = new _DashboardParser.default(this.logger);
    var dashboards = parser.parse(config);
    this.screens = this.screens.concat(dashboards);
    this.dashboards = dashboards;
  };

  ConfigParser.prototype.parseStatusScreen = function (config) {
    var parser = new _StatusScreenParser.default(this.logger);
    var screen = parser.parse(config);

    if (screen.COLUMNS == 0 || screen.DESCRIPTION.trim().length == 0) {
      return null;
    }

    return screen;
  };

  ConfigParser.prototype.parseOperatorScreen = function (config) {
    var parser = new _OperatorScreenParser.default(this.logger);
    var screen = parser.parse(config);

    if (screen.DESCRIPTION.trim().length == 0 || screen.id == 0) {
      return null;
    }

    return screen;
  };

  return ConfigParser;
}();

var _default = ConfigParser;
exports.default = _default;
},{"./StatusScreenParser":"mbil","./OperatorScreenParser":"OhQm","./DashboardParser":"VTb8"}],"o7FF":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsDeepcopy = _interopRequireDefault(require("ts-deepcopy"));

var _moment = _interopRequireDefault(require("moment"));

var _LazyString = _interopRequireDefault(require("../LazyString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function __range__(left, right, inclusive) {
  var range = [];
  var ascending = left < right;
  var end = !inclusive ? right : ascending ? right + 1 : right - 1;

  for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }

  return range;
}

var DataProvider =
/** @class */
function () {
  function DataProvider(_a) {
    var logger = _a.logger,
        configServer = _a.configServer,
        sharedMdcClient = _a.sharedMdcClient;
    this.logger = logger;
    this.configServer = configServer;
    this.sharedMdcClient = sharedMdcClient;
  }

  DataProvider.prototype.getScreens = function (screenType) {
    if (screenType) {
      return this.sharedMdcClient.screens.filter(function (s) {
        return s.type === screenType;
      });
    } else {
      return this.sharedMdcClient.screens;
    }
  };

  DataProvider.prototype.getScreen = function (id) {
    return this.sharedMdcClient.screens.concat(this.configServer.getScreens()).find(function (e) {
      return e.id === id;
    });
  };

  DataProvider.prototype.getMachinesFilter = function (filter) {
    if (filter.length === 2) {
      var items_1 = filter[1].split(',');

      if (items_1.length === 0) {
        return this.sharedMdcClient.machines;
      }

      switch (filter[0]) {
        case 'ALL':
          return this.sharedMdcClient.machines;

        case 'DNC':
          return this.sharedMdcClient.machines.filter(function (machine) {
            return items_1.includes(machine.dncmaxgroupname);
          });

        case 'MDC':
          return this.sharedMdcClient.machines.filter(function (machine) {
            return items_1.includes(machine.machine_mdc_group);
          });

        case 'MCH':
          return this.sharedMdcClient.machines.filter(function (machine) {
            return items_1.includes("" + machine.machineid);
          });

        case 'NCB':
          return this.sharedMdcClient.machines.filter(function (machine) {
            return items_1.includes("" + machine.fkmmgroupid);
          });

        default:
          return this.sharedMdcClient.machines;
      }
    } else {
      return this.sharedMdcClient.machines;
    }
  };

  DataProvider.prototype.getAlignment = function (attrs) {
    if (attrs == null) {
      return 'center';
    }

    if (attrs.includes('LEFT')) {
      return 'left';
    }

    if (attrs.includes('RIGHT')) {
      return 'right';
    }

    if (attrs.includes('CENTER')) {
      return 'center';
    }

    return 'center';
  };

  DataProvider.prototype.hasAttr = function (attrs, name) {
    return attrs && attrs.includes(name);
  };

  DataProvider.prototype.getScreensOverview = function () {
    var _this = this;

    var documents = this.sharedMdcClient.documentList.map(function (_a) {
      var file = _a.file,
          modified = _a.modified,
          mimeType = _a.mimeType;
      return {
        overallPosition: -1,
        type: 'document',
        title: file,
        id: file,
        modified: modified,
        mimeType: mimeType
      };
    });
    return this.sharedMdcClient.screens.concat(this.configServer.getScreens()).concat(documents).map(function (screen) {
      var machines = [];

      if (screen.type != 'document' && screen.type != 'shopfloor') {
        machines = _this.getMachinesFilter(screen.MACHINES).map(function (m) {
          return {
            id: m.machineid,
            title: _this.resolveMachineName(m, screen)
          };
        });
      }

      switch (screen.type) {
        case 'operator':
          return {
            id: screen.id,
            type: screen.type,
            title: screen.DESCRIPTION,
            isSubscreen: screen.OPRISSUBSCR && screen.MODE !== 3,
            machines: machines
          };

        case 'status':
          return {
            id: screen.id,
            type: screen.type,
            title: screen.DESCRIPTION
          };

        case 'shopfloor':
          return {
            id: screen.id,
            type: screen.type,
            title: screen.DESCRIPTION
          };

        case 'dashboard':
          return {
            id: screen.id,
            type: screen.type,
            title: screen.DESCRIPTION,
            machines: screen.FORALL ? undefined : machines
          };

        case 'document':
          return screen;
      }
    });
  };

  DataProvider.prototype.filterWithinCutOff = function (cutOff, data) {
    var result = [];
    var start = (0, _moment.default)().subtract(cutOff, 'milliseconds');
    var end = (0, _moment.default)();

    for (var i = 0; i < data.length; i++) {
      var prev = i > 0 ? data[i - i] : null;
      var curr = data[i];
      var next = i + 1 < data.length ? data[i + 1] : null;

      if ((0, _moment.default)(curr.time).isBetween(start, end)) {
        // Looking at the first timeline entry starting within the
        // cutOff period there very possibly is an entry prior to it
        // that starts before the period but overlaps into it.
        if (result.length === 0) {
          result.push(prev);
        }

        result.push(curr);
      }
    }

    return result;
  };

  DataProvider.prototype.getNumberOfColumns = function (numberOfMachines, layoutMinRows, layoutMaxRows, layoutMinCols, layoutMaxCols) {
    if (layoutMinRows * layoutMinCols >= numberOfMachines) {
      return layoutMinCols;
    } else if (layoutMaxRows * layoutMaxCols <= numberOfMachines) {
      return layoutMaxCols;
    } else {
      var max = 2 * numberOfMachines; // let rows;

      var cols = 1;

      for (var cn = layoutMinCols; cn <= layoutMaxCols; cn++) {
        for (var rn = layoutMinRows; rn <= layoutMaxRows; rn++) {
          if (rn * cn >= numberOfMachines && rn * cn < max) {
            // rows = rn;
            cols = cn;
            max = rn * cn;
          }
        }
      }

      return cols;
    }
  };

  DataProvider.prototype.resolveMachineName = function (machine, screen) {
    if (screen.type == 'status' || screen.type == 'operator' || screen.type == 'dashboard') {
      switch (screen.LISTNAMEMODE) {
        case 1:
          return machine.machine_var1;

        case 2:
          return machine.machine_var2;

        case 3:
          return machine.machine_var3;

        case 4:
          return machine.machine_var4;
      }
    }

    return machine.machine;
  };

  DataProvider.prototype.getScreenFullState = function (screenId) {
    var _this = this;

    var screen = this.getScreen(screenId);

    if (screen == null) {
      return null;
    }

    var machines = [];

    if (screen.type != 'shopfloor' && screen.type != 'document') {
      machines = this.getMachinesFilter(screen.MACHINES).map(function (m) {
        return {
          id: m.machineid,
          title: _this.resolveMachineName(m, screen)
        };
      });
    }

    var status = {};

    var getEval = function getEval(machineId, evalId) {
      if (machineId in _this.sharedMdcClient.liveState && evalId in _this.sharedMdcClient.liveState[machineId]) {
        var v = _this.sharedMdcClient.liveState[machineId][evalId];

        if (v instanceof _LazyString.default) {
          return v.toString();
        }

        return v;
      } else {
        return null;
      }
    };

    if (screen.type == 'operator' || screen.type == 'status') {
      var stateDatas = screen.STATE_LIST;
      var screenMappings = this.sharedMdcClient.getLiveMappings(screen.id);
      if (!screenMappings) return null;

      var _loop_1 = function _loop_1(machine) {
        var stateId = getEval(machine.id, screenMappings.current_state);

        if (!stateId) {
          return "continue";
        }

        var state = stateDatas.find(function (v) {
          return v.id == stateId;
        });

        if (!state) {
          return "continue";
        }

        var titleValue = getEval(machine.id, screenMappings.state[stateId]);
        status[machine.id] = {
          title: titleValue ? titleValue.toString() : '',
          color: state.color,
          flash: this_1.hasAttr(state.ATTR, 'FLASH')
        };
      };

      var this_1 = this;

      for (var _i = 0, machines_1 = machines; _i < machines_1.length; _i++) {
        var machine = machines_1[_i];

        _loop_1(machine);
      }
    }

    if (screen.type === 'dashboard') {
      /*
      widgets = screen.widgets.map (widget) =>
          switch widget.type
              when 'header' then {
                  type: widget.type,
                  title: widget.title,
              }
              when 'table' then {
                  type: widget.type,
                  header: ['Status', 'Program', 'Operator', 'Time/Last cycle', 'Planned cycle time', 'Job running time'],
                  rows: [
                      ['Running', '464-4361', 'Marv', '03:52', '03:40', '0:27:28'],
                  ],
              }
              when 'gauge' then {
                  type: widget.type,
                  title: widget.title,
                  value: randomIntFromInterval(widget.minBound, widget.maxBound),
                  minValue: widget.minValue,
                  maxValue: widget.maxValue,
                  minBound: widget.minBound,
                  maxBound: widget.maxBound,
              }
              when 'timeline' then {
                  type: widget.type,
                  title: widget.title,
                  cutOff: widget.cutOff,
                  status: widget.status,
                  data: @filterWithinCutOff(widget.cutOff, [
                      { status: 1, time: moment().subtract(1, 'days').hours(4).minutes(0).valueOf() },
                      { status: 2, time: moment().subtract(1, 'days').hours(6).minutes(0).valueOf() },
                      { status: 3, time: moment().subtract(1, 'days').hours(12).minutes(0).valueOf() },
                      { status: 4, time: moment().subtract(1, 'days').hours(14).minutes(30).valueOf() },
                      { status: 5, time: moment().subtract(1, 'days').hours(18).minutes(0).valueOf() },
                      { status: 4, time: moment().subtract(1, 'days').hours(20).minutes(30).valueOf() },
                      { status: 1, time: moment().subtract(1, 'days').hours(22).minutes(0).valueOf() },
                      { status: 3, time: moment().subtract(1, 'days').hours(23).minutes(30).valueOf() },
                      { status: 1, time: moment().hours(4).minutes(0).valueOf() },
                      { status: 2, time: moment().hours(6).minutes(0).valueOf() },
                      { status: 3, time: moment().hours(12).minutes(0).valueOf() },
                      { status: 4, time: moment().hours(14).minutes(30).valueOf() },
                      { status: 5, time: moment().hours(18).minutes(0).valueOf() },
                      { status: 4, time: moment().hours(20).minutes(30).valueOf() },
                      { status: 1, time: moment().hours(22).minutes(0).valueOf() },
                      { status: 3, time: moment().hours(23).minutes(30).valueOf() },
                  ]),
              }
      */
      var formatData_1 = function formatData_1(value) {
        var values = {};

        for (var _i = 0, machines_7 = machines; _i < machines_7.length; _i++) {
          var machine = machines_7[_i];
          values[machine.id] = getEval(machine.id, value.EVALNO);
        }

        return {
          title: value.DESC,
          format: value.FORMAT,
          value: values
        };
      };

      var getEvalForMachines_1 = function getEvalForMachines_1(evalNo) {
        var values = {};

        for (var _i = 0, machines_8 = machines; _i < machines_8.length; _i++) {
          var machine = machines_8[_i];
          values[machine.id] = getEval(machine.id, evalNo);
        }

        return values;
      };

      var widgets = screen.WIDGETS.map(function (widget) {
        return {
          title: widget.TITLE,
          type: widget.TYPE,
          behavior: widget.BEHAVIOR,
          data: widget.VALUES.map(formatData_1),
          valueMin: getEvalForMachines_1(widget.MINVALUEEVALNO),
          valueMax: getEvalForMachines_1(widget.MAXVALUEEVALNO),
          valueTargetMin: getEvalForMachines_1(widget.TARGETMINEVALNO),
          valueTargetMax: getEvalForMachines_1(widget.TARGETMAXEVALNO),
          valueTargetMoodAbove: widget.TARGETABOVE,
          valueTargetMoodBetween: widget.TARGETBETWEEN,
          valueTargetMoodBelow: widget.TARGETBELOW
        };
      });
      var dashboard = {
        type: screen.type,
        id: screen.id,
        title: screen.DESCRIPTION,
        forAll: screen.FORALL,
        machines: machines,
        widgets: widgets
      };
      return dashboard;
    }

    if (screen.type === 'operator') {
      var buttonDatas = screen.BUTTON_LIST.slice(0, screen.BUTTONS);
      var inputDatas = screen.INPUT_LIST.slice(0, screen.INPUTS);
      var columnDatas = screen.COLUMN_LIST.slice(0, screen.COLUMNS);
      var isSubscreen = screen.OPRISSUBSCR;
      var result = {
        id: screen.id,
        type: screen.type,
        title: screen.DESCRIPTION,
        autoClose: isSubscreen && screen.AUTOCLOSESUB,
        isSubscreen: isSubscreen,
        machines: machines,
        buttons: [],
        inputs: [],
        columns: [],
        status: status
      };
      var screenMappings = this.sharedMdcClient.getLiveMappings(screen.id);

      for (var _a = 0, buttonDatas_1 = buttonDatas; _a < buttonDatas_1.length; _a++) {
        var buttonData = buttonDatas_1[_a];
        var indicatorOn = {};
        var indicatorOnEvalId = screenMappings.button[buttonData.id].indicator;
        var disabled = {};
        var disabledEvalId = screenMappings.button[buttonData.id].disabled;

        for (var _b = 0, machines_2 = machines; _b < machines_2.length; _b++) {
          var machine = machines_2[_b];
          indicatorOn[machine.id] = !!getEval(machine.id, indicatorOnEvalId);
          disabled[machine.id] = !!getEval(machine.id, disabledEvalId);
        }

        var action = void 0;

        if (buttonData.USEJOB) {
          if (buttonData.USEJOB === 1) {
            var columnMap = {};

            for (var i = 1; i <= 8; i++) {
              columnMap[i] = buttonData.JOBCOLS[i];
            }

            var jobFile = this.sharedMdcClient.jobFiles[buttonData.JOBFILE] || null;
            action = {
              type: 'extended',
              actionId: buttonData.USEJOB,
              jobFile: jobFile,
              inputFieldRow: buttonData.JOBCUSTOM,
              inputFieldTitle: buttonData.JOBCUSTOMTITLE,
              columnMap: columnMap
            };
          } else {
            action = {
              type: 'extended',
              actionId: buttonData.USEJOB
            };
          }
        } else if (buttonData.SUBSCR) {
          action = {
            type: 'standard',
            launchSubscreen: buttonData.SUBSCR,
            sendMessage: !!buttonData.SENDMSG
          };
        } else {
          action = {
            type: 'standard',
            launchSubscreen: null,
            sendMessage: true
          };
        }

        var button = {
          id: buttonData.id,
          title: buttonData.TITLE,
          color: buttonData.color,
          big: !!buttonData.BIG,
          showIndicator: this.hasAttr(buttonData.ATTR, 'USELIGHT'),
          disabled: disabled,
          indicatorOn: indicatorOn,
          action: action
        };
        result.buttons.push(button);
      }

      for (var _c = 0, inputDatas_1 = inputDatas; _c < inputDatas_1.length; _c++) {
        var inputData = inputDatas_1[_c];
        var disabledEvalId = screenMappings.input[inputData.id];
        var disabled = {};

        for (var _d = 0, machines_3 = machines; _d < machines_3.length; _d++) {
          var machine = machines_3[_d];
          disabled[machine.id] = !!getEval(machine.id, disabledEvalId);
        }

        var input = {
          id: inputData.id,
          title: inputData.TITLE,
          clearOnSubmit: this.hasAttr(inputData.ATTR, 'CLEARCOMP'),
          showEnter: this.hasAttr(inputData.ATTR, 'SHOWENTER') || this.hasAttr(inputData.ATTR, 'SHOWKEYBOARD'),
          isNumeric: this.hasAttr(inputData.ATTR, 'INTEGERVAL'),
          submitOnEnter: this.hasAttr(inputData.ATTR, 'SUBMITENTER'),
          disabled: disabled
        };
        result.inputs.push(input);
      }

      for (var _e = 0, columnDatas_1 = columnDatas; _e < columnDatas_1.length; _e++) {
        var columnData = columnDatas_1[_e];
        var contentEvalId = screenMappings.column[columnData.id];
        var value = {};

        for (var _f = 0, machines_4 = machines; _f < machines_4.length; _f++) {
          var machine = machines_4[_f];
          value[machine.id] = getEval(machine.id, contentEvalId);
        }

        var column = {
          id: columnData.id,
          title: columnData.TITLE,
          format: columnData.FORMAT,
          value: value,
          hidden: columnData.OPERATORHIDE
        };
        result.columns.push(column);
      }

      return result;
    }

    if (screen.type === 'status') {
      var topCols = screen.TOPCOLS;
      var botCols = screen.BOT1COLS;
      var lastCols = screen.COLUMNS - (topCols + botCols);

      var idsTop = __range__(0, topCols, false);

      var idsMiddle = __range__(topCols + 0, topCols + botCols, false);

      var idsBottom = __range__(topCols + botCols, topCols + botCols + lastCols, false);

      var buttonDatas = screen.BUTTON_LIST.slice(0, screen.BUTTONS);
      var columnDatas = screen.COLUMN_LIST.slice(0, screen.COLUMNS);
      var screenMappings_1 = this.sharedMdcClient.getLiveMappings(screen.id);

      var getSortValue_1 = function getSortValue_1(machine) {
        if (screen.SORTBYFIELD && screenMappings_1.column[screen.SORTBYFIELD]) {
          var sortColumnEvalId = screenMappings_1.column[screen.SORTBYFIELD];
          var value = getEval(machine.id, sortColumnEvalId);

          if (typeof value == 'number') {
            return value.toString();
          } else if (value == null) {
            return '';
          } else {
            return value.toLowerCase();
          }
        } else {
          return machine.title.toLowerCase();
        }
      }; // This function was written after we had encountered two bugs by using parseInt. That it skips spaces and
      // accepts dashes. Now we only look at strings of digits 0-9 and nothing else.


      var toNumber_1 = function toNumber_1(v) {
        var digits = [];

        while (v && 48 <= v.charCodeAt(0) && v.charCodeAt(0) <= 57) {
          digits.push(v.substring(0, 1));
          v = v.substring(1);
        }

        return digits.length ? {
          number: parseInt(digits.join(''), 10),
          length: digits.length
        } : null;
      };

      machines.sort(function (m1, m2) {
        var v1 = getSortValue_1(m1);
        var v2 = getSortValue_1(m2);

        while (v1 && v2) {
          var v1n = toNumber_1(v1);
          var v2n = toNumber_1(v2);

          if (v1n && v2n) {
            // Numerical sort
            var d = v1n.number - v2n.number;

            if (d) {
              return d;
            } // Skip to end of numbers so we can compare the things that come after


            v1 = v1.substring(v1n.length);
            v2 = v2.substring(v2n.length);
          } else {
            // Lexical sort
            var d = v1.charCodeAt(0) - v2.charCodeAt(0);

            if (d) {
              return d;
            }

            v1 = v1.substring(1);
            v2 = v2.substring(1);
          }
        } // One buffer has remaining values but they have been identical until now, so the one with remaining
        // characters must come last.
        // E.g. 'a' comes before 'ab'.


        return v2 ? -1 : 1;
      });
      var numberOfColumns = this.getNumberOfColumns(machines.length, screen.LAYOUTMINROWS, screen.LAYOUTMAXROWS, screen.LAYOUTMINCOLS, screen.LAYOUTMAXCOLS); // General

      var result = {
        id: screen.id,
        type: screen.type,
        title: screen.DESCRIPTION,
        hideStateless: screen.HIDEIDLE,
        machines: machines,
        columnsTop: [],
        columnsMiddle: [],
        columnsBottom: [],
        status: status,
        indicators: [],
        numberOfColumns: numberOfColumns
      };

      for (var _g = 0, buttonDatas_2 = buttonDatas; _g < buttonDatas_2.length; _g++) {
        var buttonData = buttonDatas_2[_g];
        var active = {};
        var indicatorOnEvalId = screenMappings_1.button[buttonData.id].indicator;

        for (var _h = 0, machines_5 = machines; _h < machines_5.length; _h++) {
          var machine = machines_5[_h];
          active[machine.id] = !!getEval(machine.id, indicatorOnEvalId);
        }

        var indicator = {
          id: buttonData.id,
          title: buttonData.TITLE,
          color: buttonData.color,
          flash: this.hasAttr(buttonData.ATTR, 'FLASH'),
          active: active
        };
        result.indicators.push(indicator);
      } // For some reason the live screens display indicators in reverse order


      result.indicators.reverse(); // Columns

      var columns = [];

      for (var _j = 0, columnDatas_2 = columnDatas; _j < columnDatas_2.length; _j++) {
        var columnData = columnDatas_2[_j];
        var contentEvalId = screenMappings_1.column[columnData.id];
        var value = {};

        for (var _k = 0, machines_6 = machines; _k < machines_6.length; _k++) {
          var machine = machines_6[_k];
          value[machine.id] = getEval(machine.id, contentEvalId);
        }

        var column = {
          id: columnData.id,
          title: columnData.TITLE,
          width: columnData.WIDTH,
          format: columnData.FORMAT,
          alignment: this.getAlignment(columnData.OPTIONS),
          value: value
        };
        columns.push(column);
      }

      for (var _l = 0, idsTop_1 = idsTop; _l < idsTop_1.length; _l++) {
        var id = idsTop_1[_l];
        result.columnsTop.push(columns[id]);
      }

      for (var _m = 0, idsMiddle_1 = idsMiddle; _m < idsMiddle_1.length; _m++) {
        var id = idsMiddle_1[_m];
        result.columnsMiddle.push(columns[id]);
      }

      for (var _o = 0, idsBottom_1 = idsBottom; _o < idsBottom_1.length; _o++) {
        var id = idsBottom_1[_o];
        result.columnsBottom.push(columns[id]);
      }

      return result;
    }

    if (screen.type === 'shopfloor') {
      var liveScreen_ = this.getScreenFullState(screen.liveScreenId);
      var liveScreen = null;
      if (liveScreen_ && liveScreen_.type == 'status') liveScreen = liveScreen_;
      var result = (0, _tsDeepcopy.default)({
        id: screen.id,
        type: screen.type,
        title: "" + screen.DESCRIPTION + (liveScreen ? '' : ' [STATUS SCREEN MISSING]'),
        width: screen.width,
        height: screen.height,
        machines: (liveScreen === null || liveScreen === void 0 ? void 0 : liveScreen.machines) || [],
        machinePositions: screen.machinePositions,
        background: "/api/background/" + screen.id + "?" + this.configServer.config.lastUpdate,
        liveScreen: liveScreen || {
          id: screen.liveScreenId,
          type: 'status',
          title: 'Missing',
          hideStateless: false,
          machines: [],
          columnsTop: [],
          columnsMiddle: [],
          columnsBottom: [],
          status: {},
          indicators: [],
          numberOfColumns: 1
        }
      });
      return result;
    }

    return null;
  };

  return DataProvider;
}();

var _default = DataProvider;
exports.default = _default;
},{"../LazyString":"aFq9"}],"xoAB":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var _es = _interopRequireDefault(require("csv-parse/lib/es5"));

var jsondiffpatch = _interopRequireWildcard(require("jsondiffpatch"));

var _deepEqual = _interopRequireDefault(require("deep-equal"));

var mime = _interopRequireWildcard(require("mime-types"));

var os = _interopRequireWildcard(require("os"));

var dns = _interopRequireWildcard(require("dns"));

var iconv = _interopRequireWildcard(require("../iconv"));

var _connection = _interopRequireDefault(require("./connection"));

var _message = _interopRequireDefault(require("./message"));

var _ConfigParser = _interopRequireDefault(require("./ConfigParser"));

var _DataProvider = _interopRequireDefault(require("./DataProvider"));

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _async = _interopRequireDefault(require("async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

// emits 'ready' and 'error'
var SharedClient =
/** @class */
function (_super) {
  __extends(SharedClient, _super);

  function SharedClient(_a) {
    var host = _a.host,
        port = _a.port,
        logger = _a.logger,
        configServer = _a.configServer,
        documentPath = _a.documentPath;

    var _this = _super.call(this) || this;

    _this.machines = [];
    _this.machineIds = [];
    _this.jobFiles = {};
    _this.jobFileInterval = null;
    _this.subscribedScreenIds = [];
    _this.subscribedScreensLastState = {};
    _this.documentList = [];
    _this.screens = [];
    _this.translations = {};
    _this.connected = false;
    _this.mdcConnection = null;
    _this.liveMapping = {};
    _this.serverConfigVersion = null;
    _this.servers = [];
    _this.liveState = {};
    _this.auxConnections = [];
    _this.timers = [];
    _this.waitingForInitialized = null;
    _this.connectionCheckInterval = null;
    _this.sumUpdateTime = 0;
    _this.countUpdateTime = 0;

    _this.setMaxListeners(0);

    _this.host = host;
    _this.port = port;
    _this.logger = logger;
    _this.configServer = configServer;
    _this.documentPath = documentPath;
    _this.dataProvider = new _DataProvider.default({
      logger: logger,
      configServer: configServer,
      sharedMdcClient: _this
    });

    _this.reconnect();

    if (_this.documentPath) {
      setInterval(_this.refreshDocumentList.bind(_this), 10000);

      _this.refreshDocumentList();
    }

    _this.configServer.on('update', function () {
      _this.sendScreenUpdates();
    });

    return _this;
  }

  SharedClient.prototype.reconnectAfterTimeout = function () {
    setTimeout(this.reconnect.bind(this), 1000);
  };

  SharedClient.prototype.reconnect = function () {
    var _this = this;

    var wasConnected = this.connected;
    this.connected = false;

    if (wasConnected) {
      this.emit('offline');
    }

    if (this.mdcConnection) {
      this.clearConnectionCheck();
      this.mdcConnection.removeAllListeners();
      if (this.mdcConnection.socket) this.mdcConnection.socket.destroy();
    }

    this.mdcConnection = new _connection.default({
      host: this.host,
      port: this.port,
      logger: this.logger.subLogger('Connection'),
      overriddenEncoding: this.configServer.config.encoding,
      skipAscii: this.configServer.config.skipAsciiStrings
    });
    this.mdcConnection.on('error2', this.reconnectAfterTimeout.bind(this));
    this.mdcConnection.on('end', this.reconnectAfterTimeout.bind(this));
    this.logger.debug('Launching [1/9]');
    this.startWaitingForInitialisation();
    this.mdcConnection.on('ReceiveAcceptUpdate', function (msg) {
      _this.serverConfigVersion = msg.configVersion;

      _this.connectionCheck();

      if (!_this.mdcConnection) return;

      _this.mdcConnection.sendMessage(new _message.default.SetMode(_message.default.SetModeOption.headless, '', _this.configServer.config.compression));

      _this.logger.debug('Launching [2/9]');
    });
    this.mdcConnection.on('ReceiveExtendedResponse', function (success, msg) {
      if (success) {
        if (!_this.mdcConnection) return;

        _this.mdcConnection.sendMessage(new _message.default.ColumnEvalsRequest());

        _this.logger.debug('Launching [3/9]');
      } else {
        _this.logger.error('Failed to set mode on connection');
      }
    });
    this.mdcConnection.on('ReceiveColumnEvalsResponse', function (msg) {
      _this.logger.debug('Launching [4/9]');

      _this.liveMapping = msg.screens;
      if (!_this.mdcConnection) return;

      _this.mdcConnection.sendMessage(new _message.default.DatabaseRequest(['dbfiles', 'MDCMAXLIVECFG']));
    });
    this.mdcConnection.on('ReceiveDatabaseResponse', function (msg) {
      if (!_this.mdcConnection) return;
      var firstVal = msg.vals[0];
      var secondVal = msg.vals[1];

      if (firstVal.name === 'table' && firstVal.value === 'dbfiles') {
        if (secondVal.name === 'filename' && secondVal.value === 'MDCMAXLIVECFG') {
          _this.logger.debug('Launching [5/9]');

          var configParser = new _ConfigParser.default(_this.logger);
          configParser.parseIniConfigFromString(msg.vals[2].value);
          _this.screens = configParser.screens;

          for (var _i = 0, _a = _this.screens; _i < _a.length; _i++) {
            var screen = _a[_i];

            if (screen.type != 'operator') {
              continue;
            }

            if (screen.type == 'operator') {
              for (var _b = 0, _c = screen.BUTTON_LIST; _b < _c.length; _b++) {
                var button = _c[_b];

                if (button.USEJOB === 1 && button.JOBFILE) {
                  _this.jobFiles[button.JOBFILE] = null;
                }
              }
            }
          }

          _this.mdcConnection.sendMessage(new _message.default.DatabaseRequest(['dbfiles', 'MDCTRANSLATIONS']));

          _this.fetchJobFiles();

          if (_this.jobFileInterval) {
            clearInterval(_this.jobFileInterval);
            _this.jobFileInterval = null;
          }

          _this.jobFileInterval = setInterval(_this.fetchJobFiles.bind(_this), 60000);
        } else if (secondVal.name === 'filename' && secondVal.value === 'MDCTRANSLATIONS') {
          _this.logger.debug('Launching [6/9]');

          if (msg.vals[2].value === '') {
            _this.translations = {
              TRANSLATIONS: {
                SCREENS: {}
              }
            };
          } else {
            _this.translations = JSON.parse(msg.vals[2].value);
          }

          _this.mdcConnection.sendMessage(new _message.default.DatabaseRequest(['machines']));
        }
      } else if (firstVal.name === 'table' && firstVal.value === 'machines') {
        _this.logger.debug('Launching [7/9]');

        _this.machines = [];
        var machine = null;

        for (var _d = 0, _e = msg.vals.slice(1); _d < _e.length; _d++) {
          var val = _e[_d];

          if (val.name === '[]') {
            // new machine
            if (machine != null) {
              _this.machines.push(machine);
            }

            machine = {};
          } else if (machine != null) {
            machine[val.name] = val.value;
          }
        }

        if (machine != null) {
          _this.machines.push(machine);
        }

        _this.machineIds = _this.machines.map(function (m) {
          return m.machineid;
        });

        var localIps_1 = _this.getLocalIps();

        var hostsToCheck = (0, _lodash.default)(_this.machines.map(function (m) {
          return m.dncmaxhost;
        }));

        _async.default.map(hostsToCheck, dns.lookup.bind(dns), function (err, results) {
          if (!results) return;
          _this.servers = results // Remove undefined values
          .filter(function (v) {
            return v;
          }) // TS does not understand that the values are now NOT undefined
          .map(function (v) {
            return v;
          }) // Remove this server from results
          .filter(function (v) {
            return v != _this.host && localIps_1.indexOf(v) == -1;
          });

          _this.launchAuxillaryConnections();
        });

        _this.mdcConnection.sendMessage(new _message.default.JsonConfigRequest());
      }
    });
    this.mdcConnection.on('ReceiveJsonConfigResponse', function (msg) {
      if (!_this.mdcConnection) return;

      _this.logger.debug('Launching [8/9]');

      var configParser = new _ConfigParser.default(_this.logger);
      configParser.parseJsonConfigObject(msg.config);
      configParser.screens.forEach(function (screen) {
        _this.screens.push(screen);
      });

      if (_this.machineIds.length) {
        _this.logger.debug('Subscribing to ' + _this.machineIds.length + ' machines');

        _this.mdcConnection.sendMessage(new _message.default.SelectMachines({
          machineIds: _this.machineIds
        }));

        _this.startWaitingForInitialisation();
      } else {
        _this.logger.error('Error, subscribing to 0 machines');
      }
    });
    this.mdcConnection.on('ReceiveMachineData', function (msg) {
      var values = {};

      for (var _i = 0, _a = msg.evals; _i < _a.length; _i++) {
        var e = _a[_i];

        if (values[e.evalId] == null) {
          values[e.evalId] = e.value;
        }
      }

      if (!_this.liveState[msg.machineId]) {
        _this.liveState[msg.machineId] = {};
      }

      for (var id in values) {
        _this.liveState[msg.machineId][id] = values[id];
      }
    });
    this.mdcConnection.on('ReceiveMachineDataEnd', function (msg) {
      _this.sendScreenUpdates();
    });
    this.mdcConnection.once('ReceiveMachineDataEnd', function (msg) {
      _this.logger.debug('Launching [9/9]');

      _this.clearWaitForInitialisation();

      _this.connected = true;

      _this.emit('online');
    });
    this.mdcConnection.on('ReceiveReadConfigUpdate', function (msg) {
      _this.logger.debug('Configuration updated, restarting...');

      _this.reconnect(); // Emit config update when we are back online


      _this.once('online', function () {
        return _this.emit('config-update');
      });
    });
    this.mdcConnection.on('ReceiveAnyMessage', function (msg) {
      _this.connectionCheck();
    });
  };

  SharedClient.prototype.getLocalIps = function () {
    var ifaces = os.networkInterfaces();
    var ips = [];
    Object.keys(ifaces).forEach(function (ifname) {
      ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }

        ips.push(iface.address);
      });
    });
    return ips;
  };

  SharedClient.prototype.launchAuxillaryConnections = function () {
    var _this = this;

    if (this.auxConnections) {
      this.auxConnections.forEach(function (conn) {
        conn.removeAllListeners();
        if (conn.socket) conn.socket.destroy();
      });
    }

    if (this.timers) {
      this.timers.forEach(function (timer) {
        return clearTimeout(timer);
      });
    }

    this.auxConnections = [];
    this.timers = [];
    this.logger.debug("Launching " + this.servers.length + " auxillary connections.");
    this.servers.forEach(function (host, idx) {
      var timer;

      var reconnectAfterTimeout = function reconnectAfterTimeout() {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(reconnect, 3000);

        _this.timers.push(timer);
      };

      var reconnect = function reconnect() {
        _this.logger.debug("Establishing auxillary MDC connection to " + host);

        var mdcConnection = new _connection.default({
          host: host,
          port: _this.port,
          logger: _this.logger.subLogger('Connection'),
          overriddenEncoding: _this.configServer.config.encoding,
          skipAscii: _this.configServer.config.skipAsciiStrings
        });

        _this.auxConnections.push(mdcConnection);

        mdcConnection.on('error2', reconnectAfterTimeout.bind(_this));
        mdcConnection.on('end', reconnectAfterTimeout.bind(_this));
        mdcConnection.on('ReceiveAcceptUpdate', function (msg) {
          mdcConnection.sendMessage(new _message.default.SetMode(_message.default.SetModeOption.headless, '', false));
        });
        mdcConnection.on('ReceiveExtendedResponse', function (success, msg) {
          if (success) {
            mdcConnection.sendMessage(new _message.default.SelectMachines({
              machineIds: _this.machineIds
            }));
          }
        });
        mdcConnection.on('ReceiveMachineData', function (msg) {
          var values = {};

          for (var _i = 0, _a = msg.evals; _i < _a.length; _i++) {
            var e = _a[_i];

            if (values[e.evalId] == null) {
              values[e.evalId] = e.value;
            }
          }

          if (!_this.liveState[msg.machineId]) {
            _this.liveState[msg.machineId] = {};
          }

          for (var id in values) {
            _this.liveState[msg.machineId][id] = values[id];
          }
        });
        mdcConnection.on('ReceiveMachineDataEnd', function (msg) {
          _this.sendScreenUpdates();
        });
      };

      reconnect();
    });
  };

  SharedClient.prototype.clearWaitForInitialisation = function () {
    if (this.waitingForInitialized) {
      clearTimeout(this.waitingForInitialized);
      this.waitingForInitialized = null;
    }
  };

  SharedClient.prototype.startWaitingForInitialisation = function () {
    var _this = this;

    this.clearWaitForInitialisation();
    this.waitingForInitialized = setTimeout(function () {
      _this.logger.error('Waited too long for initialization, restarting');

      _this.reconnect();
    }, Math.max(30000, this.machineIds.length * 300));
  };

  SharedClient.prototype.clearConnectionCheck = function () {
    if (this.connectionCheckInterval) {
      clearInterval(this.connectionCheckInterval);
      this.connectionCheckInterval = null;
    }
  };

  SharedClient.prototype.connectionCheck = function () {
    var _this = this;

    this.clearConnectionCheck();
    var ok = true;
    var interval = 60 * 1000;

    var check = function check() {
      if (!ok) {
        _this.logger.error('LiveDataServer connection check failed!');

        _this.reconnect();
      }

      ok = false;

      _this.sendKeepAlive(function (alive) {
        if (alive) {
          ok = true;
        }
      });
    };

    this.connectionCheckInterval = setInterval(check, interval);
  };

  SharedClient.prototype.fetchJobFile = function (path, callback) {
    var _this = this;

    fs.readFile(path, function (err, data) {
      if (err != null) {
        return callback(err, null);
      }

      var utf8Data = iconv.convertFromTo(['utf-8', 'windows-1252', 'iso-8859-1', iconv.detectEncoding(data)], 'utf-8', data, _this.logger);
      var fileDataString = utf8Data.toString(); // Try to determine what kind of separator is used.
      // We test for ',' and ';'

      var commaIndex = fileDataString.indexOf(',');
      var semiIndex = fileDataString.indexOf(';'); // Comma is more normal, but check for semi-colon

      var useSemi = commaIndex == -1 && semiIndex >= 0;
      var parser = (0, _es.default)({
        delimiter: useSemi ? ';' : ',',
        trim: true
      }, callback);
      parser.write(fileDataString);
      parser.end();
    });
  };

  SharedClient.prototype.fetchJobFiles = function () {
    var _this = this;

    var _loop_1 = function _loop_1(filename) {
      this_1.fetchJobFile(filename, function (err, data) {
        if (err == null) {
          // Remember that infoserver is protecting ',' when using ';' as separator
          // Retrieve original commas
          _this.jobFiles[filename] = data;
        } else {
          _this.logger.info("Failed to read job file: " + filename);
        }
      });
    };

    var this_1 = this;

    for (var filename in this.jobFiles) {
      _loop_1(filename);
    }
  };

  SharedClient.prototype.setSubscribedScreens = function (screenIds) {
    var _this = this;

    var unsubscribed = this.subscribedScreenIds.filter(function (screenId) {
      return screenIds.indexOf(screenId) == -1;
    });
    this.subscribedScreenIds = screenIds;
    screenIds.forEach(function (screenId) {
      if (!_this.subscribedScreensLastState[screenId]) {
        _this.subscribedScreensLastState[screenId] = _this.dataProvider.getScreenFullState(screenId);
      }
    });
    unsubscribed.forEach(function (screenId) {
      delete _this.subscribedScreensLastState[screenId];
    });
  };

  SharedClient.prototype.sendScreenUpdates = function () {
    var _this = this;

    var t = Date.now();

    try {
      var updates_1 = {};
      this.subscribedScreenIds.forEach(function (screenId) {
        var lastState = _this.subscribedScreensLastState[screenId];

        var nextstate = _this.dataProvider.getScreenFullState(screenId);

        updates_1[screenId] = jsondiffpatch.diff(lastState, nextstate);
        _this.subscribedScreensLastState[screenId] = nextstate;
      });
      this.emit('screen-updates', updates_1);
    } catch (e) {
      this.logger.debug('sendScreenUpdates: ' + e.stack);
    }

    this.sumUpdateTime += Date.now() - t;
    this.countUpdateTime++;
  };

  SharedClient.prototype.getScreenFullStateCurrent = function (screenId) {
    return this.subscribedScreensLastState[screenId];
  };

  SharedClient.prototype.refreshDocumentList = function () {
    var _this = this;

    fs.readdir(this.documentPath, function (err, files) {
      var realFiles = [];
      var timesToDo = 0;

      var oneDone = function oneDone() {
        timesToDo--;

        if (timesToDo <= 0) {
          realFiles.sort(function (a, b) {
            return a.file.toLowerCase() < b.file.toLowerCase() ? -1 : 1;
          });
          var changed = !(0, _deepEqual.default)(realFiles, _this.documentList);
          _this.documentList = realFiles;

          if (changed) {
            _this.logger.debug('Documents indexed', _this.documentList.length);

            _this.emit('config-update');
          }
        }
      };

      files.forEach(function (file) {
        if (file[0] == '.') {
          return;
        }

        timesToDo++;
        var filePath = path.join(_this.documentPath, file);
        fs.stat(filePath, function (err, stat) {
          if (stat.isFile()) {
            realFiles.push({
              file: file,
              modified: stat.mtime,
              mimeType: mime.lookup(file)
            });
          }

          oneDone();
        });
      });
    });
  };

  SharedClient.prototype.getDocumentList = function () {
    return this.documentList;
  };
  /* MDC Connection and Data Gathering */


  SharedClient.prototype.sendKeepAlive = function (callback) {
    // Send keep alive signal to live protocol to try and prevent stale untasty connection
    // Assume bad connection
    if (!this.mdcConnection) return;
    this.mdcConnection.sendMessage(new _message.default.DatabaseRequest(['keepalive', '']));

    var handler = function handler(msg) {
      callback(true);
    };

    this.mdcConnection.once('ReceiveDatabaseResponse', handler);
  };

  SharedClient.prototype.getLiveMappings = function (screenId) {
    return this.liveMapping[screenId] || null;
  };

  return SharedClient;
}(_events.EventEmitter);

var _default = SharedClient;
exports.default = _default;
},{"../iconv":"m2ac","./connection":"npR0","./message":"KLMq","./ConfigParser":"rVFf","./DataProvider":"o7FF"}],"pCN4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Machine =
/** @class */
function () {
  function Machine(machineData) {
    this.statusInfo = null;
    this.programInfo = null;
    this.queue = [];
    this.machineData = machineData;
  }

  Machine.prototype.setData = function (machineData) {
    this.machineData = machineData;
  };

  Machine.prototype.setStatusInfo = function (status) {
    this.statusInfo = status;
  };

  Machine.prototype.setProgramInfo = function (program) {
    this.programInfo = program;
  };

  Machine.prototype.getId = function () {
    return this.machineData.id;
  };

  Machine.prototype.addToQueue = function (queueData) {
    this.queue.push(queueData);
  };

  Machine.prototype.updateQueue = function (queueData) {
    var foundIndex = this.queue.findIndex(function (queueItem) {
      return queueItem.operationId == queueData.operationId;
    });

    if (foundIndex != -1) {
      var found = this.queue[foundIndex];

      if (queueData.modeName == 'DNC_CLEAR_SELECTED') {
        this.queue.splice(foundIndex, 1);
      } else if (queueData.modeName == 'DNC_RESUME_SELECTED') {
        found.status = 0;
      } else if (queueData.modeName == 'DNC_SUSPEND_SELECTED') {
        found.status = 16;
      } else if (queueData.modeName == 'DNC_CLEAR_ALL') {
        this.queue = [];
      } else if (queueData.count == 0) {
        this.queue.splice(foundIndex, 1);
      } else {
        found.count = queueData.count;
        found.totalCount = queueData.totalCount;
        found.mode = queueData.mode;
        found.modeName = queueData.modeName;
        found.option = queueData.option;
      }
    }
  };

  Machine.prototype.clearQueue = function () {
    this.queue = [];
  };

  Machine.prototype.reorderQueue = function (newOrder) {
    var indexedQueue = {};
    this.queue.forEach(function (queueItem) {
      return indexedQueue[queueItem.operationId] = queueItem;
    });
    var newQueue = [];
    newOrder.forEach(function (queueId) {
      if (queueId in indexedQueue) {
        newQueue.push(indexedQueue[queueId]);
      }
    });
    this.queue = newQueue;
  };

  Machine.prototype.setGroup = function (newGroup) {
    this.machineData.portGroup = newGroup;
  };

  return Machine;
}();

var _default = Machine;
exports.default = _default;
},{}],"kcsL":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var jsondiffpatch = _interopRequireWildcard(require("jsondiffpatch"));

var _connection = _interopRequireDefault(require("./connection"));

var msg = _interopRequireWildcard(require("./message"));

var _machine = _interopRequireDefault(require("./machine"));

var _ipc_command_ids = _interopRequireDefault(require("./ipc_command_ids"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

// emits 'ready' and 'error'
var SharedClient =
/** @class */
function (_super) {
  __extends(SharedClient, _super);

  function SharedClient(_a) {
    var host = _a.host,
        port = _a.port,
        logger = _a.logger,
        configServer = _a.configServer,
        encoding = _a.encoding;

    var _this = _super.call(this) || this;

    _this.machines = {};
    _this.state = {};
    _this.connected = false;
    _this.reconnectTimeout = null;
    _this.pollInterval = null;
    _this.connection = null;

    _this.setMaxListeners(0);

    _this.host = host;
    _this.port = port;
    _this.logger = logger;
    _this.configServer = configServer;
    _this.encoding = encoding;

    _this.reconnect();

    return _this;
  }

  SharedClient.prototype.try = function (fn) {
    try {
      fn();
    } catch (e) {
      this.logger.error('Exception caught');
      this.logger.log(e);
    }
  };

  SharedClient.prototype.wrapTry = function (fn) {
    var _this = this;

    return function () {
      try {
        fn();
      } catch (e) {
        _this.logger.error('Exception caught');

        _this.logger.log(e);
      }
    };
  };

  SharedClient.prototype.reconnectAfterTime = function (type, e) {
    var _this = this;

    if (this.connected) {
      this.emit('offline');
    }

    this.connected = false;

    if (this.reconnectTimeout) {
      return;
    }

    this.logger.log('Reconnecting after 1000ms', type, e);
    this.reconnectTimeout = setTimeout(function () {
      _this.reconnectTimeout = null;

      _this.reconnect();
    }, 1000);
  };

  SharedClient.prototype.reconnect = function () {
    var _this = this;

    this.logger.log('Connect');

    if (this.connection) {
      this.connection.removeAllListeners();
      this.connection = null;
    }

    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }

    this.connection = new _connection.default({
      host: this.host,
      port: this.port,
      logger: this.logger.subLogger('Connection'),
      encoding: this.encoding
    });
    this.connection.on('error2', function (e) {
      return _this.try(function () {
        return _this.reconnectAfterTime('error', e);
      });
    });
    this.connection.on('end', function (e) {
      return _this.try(function () {
        return _this.reconnectAfterTime('end', e);
      });
    });
    this.connection.on('connect', function () {
      return _this.try(function () {
        return _this.connectionEstablished();
      });
    });
    this.connection.once('ReceiveAnyMessage', function (message) {
      return _this.try(function () {
        _this.queryMachines();

        _this.pollInterval = setInterval(_this.wrapTry(function () {
          return _this.fetchStatuses();
        }), 1000);

        _this.emit('online');
      });
    });
    this.connection.on('ReceiveMessagePing', function (message) {
      if (_this.connection) {
        _this.connection.sendMessage(message);
      }
    });
    this.connection.on('ReceiveMessageAddMachine', function (message, header) {
      return _this.try(function () {
        var addMachine = message;
        if (addMachine) _this.addMachine(addMachine.getMachine());
      });
    });
    this.connection.on('ReceiveMessageRemoveMachine', function (message, header) {
      return _this.try(function () {
        return _this.removeMachine(message.value);
      });
    });
    this.connection.on('ReceiveMessageUpdateGroup', function (message, header) {
      return _this.try(function () {
        return _this.updateMachineGroup(message.machineId, message.newGroup);
      });
    });
    this.connection.on('ReceiveMessageStatusInfo', function (message, header) {
      return _this.try(function () {
        var status = message.getStatus();

        var machine = _this.getMachine(status.machineId);

        if (machine) {
          machine.setStatusInfo(status);
        }
      });
    });
    this.connection.on('ReceiveMessageSetProgramInfo', function (message, header) {
      return _this.try(function () {
        var data = message.getProgram();

        var machine = _this.getMachine(data.machineId);

        if (machine) {
          machine.setProgramInfo(data);
        }
      });
    });
    this.connection.on('ReceiveMessageQueueFile', function (message, header) {
      return _this.try(function () {
        var queue = message.getQueue();

        var machine = _this.getMachine(queue.machineId);

        _this.logger.log('ReceiveMessageQueueFile', JSON.stringify(queue));

        if (machine) {
          machine.addToQueue(queue);
        }
      });
    });
    this.connection.on('ReceiveMessageQueueUpdateElement', function (message, header) {
      return _this.try(function () {
        var queue = message.getQueue();

        var machine = _this.getMachine(queue.machineId);

        _this.logger.log('ReceiveMessageQueueUpdateElement', JSON.stringify(queue));

        if (machine) {
          machine.updateQueue(queue);
        }
      });
    });
    this.connection.on('ReceiveMessageQueueGetAll', function (message, header) {
      return _this.try(function () {
        message.getQueue().map(function (entry) {
          var machine = _this.getMachine(entry.machineId);

          if (machine) {
            machine.addToQueue(entry);
          }
        });
      });
    });
    this.connection.on('ReceiveMessageQueueMove', function (message, header) {
      return _this.try(function () {
        var machine = _this.getMachine(message.machineId);

        if (machine) {
          machine.reorderQueue(message.newOrder);
        }
      });
    });
    this.connection.on('ReceiveMessageUnknown', function (message, header) {
      return _this.try(function () {
        _this.logger.log('Received unknown message', JSON.stringify(message));

        var cmd = message.cmdId;

        if (cmd === _ipc_command_ids.default.IPC_CMD_RENAME_CFG || cmd === _ipc_command_ids.default.IPC_CMD_UPDATE_MACHINE || cmd === _ipc_command_ids.default.IPC_CMD_UPDATE_GROUP) {
          // These messages update machines, for now, let us just re-request the machine list
          _this.queryMachines();
        }
      });
    });
  };

  SharedClient.prototype.connectionEstablished = function () {
    this.connected = true;
    this.emit('online');
  };

  SharedClient.prototype.queryMachines = function () {
    if (this.connection) {
      this.connection.sendMessage(new msg.MessageGetMachineList());
    }
  };

  SharedClient.prototype.addMachine = function (machineData) {
    var machineId = machineData.id;
    var machine = this.getMachine(machineId);

    if (machine) {
      machine.setData(machineData);
      machine.clearQueue();
    } else {
      machine = new _machine.default(machineData);
      this.machines[machineData.id] = machine;
    }

    if (this.connection) {
      this.connection.sendMessage(new msg.MessageQueueGetAll(machineData.id, true));
    }
  };

  SharedClient.prototype.removeMachine = function (machineId) {
    delete this.machines[machineId];
  };

  SharedClient.prototype.updateMachineGroup = function (machineId, newGroup) {
    var machine = this.getMachine(machineId);

    if (machine) {
      machine.setGroup(newGroup);
    }
  };

  SharedClient.prototype.getMachine = function (machineId) {
    return this.machines[machineId] || null;
  };

  SharedClient.prototype.fetchStatuses = function () {
    var _this = this;

    Object.values(this.machines).forEach(function (machine) {
      if (_this.connection) {
        _this.connection.sendMessage(new msg.MessageStatusInfoRequest(machine.getId()));

        _this.connection.sendMessage(new msg.MessageGetProgramInfo(machine.getId()));
      }
    });
    var nextState = this.getFullState();
    var diff = jsondiffpatch.diff(this.state, nextState);
    this.emit('machine-status', diff);
    this.state = nextState;
  };

  SharedClient.prototype.getFullState = function () {
    var groups = {};
    Object.values(this.machines).forEach(function (machine) {
      if (machine.machineData.protocol == 'TERMINALPROTOCOL') {
        // These 'machines' never show up in the desktop client either
        return;
      }

      var grp = machine.machineData.portGroup;

      if (!(grp in groups)) {
        groups[grp] = [];
      }

      var progress = 0;
      var elapsed = 0;
      var status = '';
      var fileName = '';
      var programName = '';

      if (machine.statusInfo) {
        progress = machine.statusInfo.transferProgress;

        if (progress == -1) {
          progress = 0;
        }

        if (['receive', 'error'].indexOf(machine.statusInfo.statusName) >= 0) {
          progress = 100;
        }

        elapsed = machine.statusInfo.timeElapsed;

        if (elapsed == -1) {
          elapsed = 0;
        }

        status = machine.statusInfo.statusName;
      }

      if (machine.programInfo) {
        fileName = machine.programInfo.fileName;
        programName = machine.programInfo.programName;
      }

      var queue = [];
      machine.queue.forEach(function (queueItem) {
        var newQueueItem = {
          file: queueItem.fileName,
          count: queueItem.count,
          totalCount: queueItem.totalCount,
          operationId: queueItem.operationId,
          mode: function () {
            switch (queueItem.modeName) {
              case 'DNC_SEND_START':
              case 'DNC_SEND_LINE_NUMBER':
              case 'DNC_SEND_BLOCK_NUMBER':
              case 'DNC_SEND_TOOL':
              case 'DNC_SEND_CONTINOUS':
                return 'send';

              case 'DNC_RECEIVE_FILE':
                return 'receive';

              default:
                return 'unknown';
            }
          }(),
          suspended: queueItem.status == 16
        };
        queue.push(newQueueItem);
      });
      var recentError = !!(machine.statusInfo && machine.statusInfo.timeSinceError > 0 && machine.statusInfo.timeSinceError < 600);
      var machineState = {
        title: machine.machineData.description,
        id: machine.machineData.id,
        status: status,
        progress: progress,
        elapsed: elapsed,
        fileName: fileName,
        programName: programName,
        queue: queue,
        recentError: recentError
      };
      groups[grp].push(machineState);
    });
    Object.values(groups).forEach(function (machines) {
      machines.sort(function (a, b) {
        return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
      });
    });
    return groups;
  };

  return SharedClient;
}(_events.EventEmitter);

var _default = SharedClient;
exports.default = _default;
},{"./connection":"Ji8V","./message":"yT5D","./machine":"pCN4","./ipc_command_ids":"MvJ9"}],"mDKv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require('babel-polyfill'); // Source: https://docs.microsoft.com/en-us/windows/desktop/intl/code-page-identifiers
// var execSync = require('child_process').execSync;
// console.log(execSync('chcp').toString());
// Look the chcp result up in the below table and find the name of an encoding to use with iconv.


var _default = [{
  id: '037',
  name: 'IBM037',
  description: 'IBM EBCDIC US-Canada'
}, {
  id: '437',
  name: 'IBM437',
  description: 'OEM United States'
}, {
  id: '500',
  name: 'IBM500',
  description: 'IBM EBCDIC International'
}, {
  id: '708',
  name: 'ASMO-708',
  description: 'Arabic (ASMO 708)'
}, {
  id: '709',
  name: '',
  description: 'Arabic (ASMO-449+, BCON V4)'
}, {
  id: '710',
  name: '',
  description: 'Arabic - Transparent Arabic'
}, {
  id: '720',
  name: 'DOS-720',
  description: 'Arabic (Transparent ASMO); Arabic (DOS)'
}, {
  id: '737',
  name: 'ibm737',
  description: 'OEM Greek (formerly 437G); Greek (DOS)'
}, {
  id: '775',
  name: 'ibm775',
  description: 'OEM Baltic; Baltic (DOS)'
}, {
  id: '850',
  name: 'ibm850',
  description: 'OEM Multilingual Latin 1; Western European (DOS)'
}, {
  id: '852',
  name: 'ibm852',
  description: 'OEM Latin 2; Central European (DOS)'
}, {
  id: '855',
  name: 'IBM855',
  description: 'OEM Cyrillic (primarily Russian)'
}, {
  id: '857',
  name: 'ibm857',
  description: 'OEM Turkish; Turkish (DOS)'
}, {
  id: '858',
  name: 'IBM00858',
  description: 'OEM Multilingual Latin 1 + Euro symbol'
}, {
  id: '860',
  name: 'IBM860',
  description: 'OEM Portuguese; Portuguese (DOS)'
}, {
  id: '861',
  name: 'ibm861',
  description: 'OEM Icelandic; Icelandic (DOS)'
}, {
  id: '862',
  name: 'DOS-862',
  description: 'OEM Hebrew; Hebrew (DOS)'
}, {
  id: '863',
  name: 'IBM863',
  description: 'OEM French Canadian; French Canadian (DOS)'
}, {
  id: '864',
  name: 'IBM864',
  description: 'OEM Arabic; Arabic (864)'
}, {
  id: '865',
  name: 'IBM865',
  description: 'OEM Nordic; Nordic (DOS)'
}, {
  id: '866',
  name: 'cp866',
  description: 'OEM Russian; Cyrillic (DOS)'
}, {
  id: '869',
  name: 'ibm869',
  description: 'OEM Modern Greek; Greek, Modern (DOS)'
}, {
  id: '870',
  name: 'IBM870',
  description: 'IBM EBCDIC Multilingual/ROECE (Latin 2); IBM EBCDIC Multilingual Latin 2'
}, {
  id: '874',
  name: 'windows-874',
  description: 'ANSI/OEM Thai (ISO 8859-11); Thai (Windows)'
}, {
  id: '875',
  name: 'cp875',
  description: 'IBM EBCDIC Greek Modern'
}, {
  id: '932',
  name: 'shift_jis',
  description: 'ANSI/OEM Japanese; Japanese (Shift-JIS)'
}, {
  id: '936',
  name: 'gb2312',
  description: 'ANSI/OEM Simplified Chinese (PRC, Singapore); Chinese Simplified (GB2312)'
}, {
  id: '949',
  name: 'ks_c_5601-1987',
  description: 'ANSI/OEM Korean (Unified Hangul Code)'
}, {
  id: '950',
  name: 'big5',
  description: 'ANSI/OEM Traditional Chinese (Taiwan; Hong Kong SAR, PRC); Chinese Traditional (Big5)'
}, {
  id: '1026',
  name: 'IBM1026',
  description: 'IBM EBCDIC Turkish (Latin 5)'
}, {
  id: '1047',
  name: 'IBM01047',
  description: 'IBM EBCDIC Latin 1/Open System'
}, {
  id: '1140',
  name: 'IBM01140',
  description: 'IBM EBCDIC US-Canada (037 + Euro symbol); IBM EBCDIC (US-Canada-Euro)'
}, {
  id: '1141',
  name: 'IBM01141',
  description: 'IBM EBCDIC Germany (20273 + Euro symbol); IBM EBCDIC (Germany-Euro)'
}, {
  id: '1142',
  name: 'IBM01142',
  description: 'IBM EBCDIC Denmark-Norway (20277 + Euro symbol); IBM EBCDIC (Denmark-Norway-Euro)'
}, {
  id: '1143',
  name: 'IBM01143',
  description: 'IBM EBCDIC Finland-Sweden (20278 + Euro symbol); IBM EBCDIC (Finland-Sweden-Euro)'
}, {
  id: '1144',
  name: 'IBM01144',
  description: 'IBM EBCDIC Italy (20280 + Euro symbol); IBM EBCDIC (Italy-Euro)'
}, {
  id: '1145',
  name: 'IBM01145',
  description: 'IBM EBCDIC Latin America-Spain (20284 + Euro symbol); IBM EBCDIC (Spain-Euro)'
}, {
  id: '1146',
  name: 'IBM01146',
  description: 'IBM EBCDIC United Kingdom (20285 + Euro symbol); IBM EBCDIC (UK-Euro)'
}, {
  id: '1147',
  name: 'IBM01147',
  description: 'IBM EBCDIC France (20297 + Euro symbol); IBM EBCDIC (France-Euro)'
}, {
  id: '1148',
  name: 'IBM01148',
  description: 'IBM EBCDIC International (500 + Euro symbol); IBM EBCDIC (International-Euro)'
}, {
  id: '1149',
  name: 'IBM01149',
  description: 'IBM EBCDIC Icelandic (20871 + Euro symbol); IBM EBCDIC (Icelandic-Euro)'
}, {
  id: '1200',
  name: 'utf-16',
  description: 'Unicode UTF-16, little endian byte order (BMP of ISO 10646); available only to managed applications'
}, {
  id: '1201',
  name: 'unicodeFFFE',
  description: 'Unicode UTF-16, big endian byte order; available only to managed applications'
}, {
  id: '1250',
  name: 'windows-1250',
  description: 'ANSI Central European; Central European (Windows)'
}, {
  id: '1251',
  name: 'windows-1251',
  description: 'ANSI Cyrillic; Cyrillic (Windows)'
}, {
  id: '1252',
  name: 'windows-1252',
  description: 'ANSI Latin 1; Western European (Windows)'
}, {
  id: '1253',
  name: 'windows-1253',
  description: 'ANSI Greek; Greek (Windows)'
}, {
  id: '1254',
  name: 'windows-1254',
  description: 'ANSI Turkish; Turkish (Windows)'
}, {
  id: '1255',
  name: 'windows-1255',
  description: 'ANSI Hebrew; Hebrew (Windows)'
}, {
  id: '1256',
  name: 'windows-1256',
  description: 'ANSI Arabic; Arabic (Windows)'
}, {
  id: '1257',
  name: 'windows-1257',
  description: 'ANSI Baltic; Baltic (Windows)'
}, {
  id: '1258',
  name: 'windows-1258',
  description: 'ANSI/OEM Vietnamese; Vietnamese (Windows)'
}, {
  id: '1361',
  name: 'Johab',
  description: 'Korean (Johab)'
}, {
  id: '10000',
  name: 'macintosh',
  description: 'MAC Roman; Western European (Mac)'
}, {
  id: '10001',
  name: 'x-mac-japanese',
  description: 'Japanese (Mac)'
}, {
  id: '10002',
  name: 'x-mac-chinesetrad',
  description: 'MAC Traditional Chinese (Big5); Chinese Traditional (Mac)'
}, {
  id: '10003',
  name: 'x-mac-korean',
  description: 'Korean (Mac)'
}, {
  id: '10004',
  name: 'x-mac-arabic',
  description: 'Arabic (Mac)'
}, {
  id: '10005',
  name: 'x-mac-hebrew',
  description: 'Hebrew (Mac)'
}, {
  id: '10006',
  name: 'x-mac-greek',
  description: 'Greek (Mac)'
}, {
  id: '10007',
  name: 'x-mac-cyrillic',
  description: 'Cyrillic (Mac)'
}, {
  id: '10008',
  name: 'x-mac-chinesesimp',
  description: 'MAC Simplified Chinese (GB 2312); Chinese Simplified (Mac)'
}, {
  id: '10010',
  name: 'x-mac-romanian',
  description: 'Romanian (Mac)'
}, {
  id: '10017',
  name: 'x-mac-ukrainian',
  description: 'Ukrainian (Mac)'
}, {
  id: '10021',
  name: 'x-mac-thai',
  description: 'Thai (Mac)'
}, {
  id: '10029',
  name: 'x-mac-ce',
  description: 'MAC Latin 2; Central European (Mac)'
}, {
  id: '10079',
  name: 'x-mac-icelandic',
  description: 'Icelandic (Mac)'
}, {
  id: '10081',
  name: 'x-mac-turkish',
  description: 'Turkish (Mac)'
}, {
  id: '10082',
  name: 'x-mac-croatian',
  description: 'Croatian (Mac)'
}, {
  id: '12000',
  name: 'utf-32',
  description: 'Unicode UTF-32, little endian byte order; available only to managed applications'
}, {
  id: '12001',
  name: 'utf-32BE',
  description: 'Unicode UTF-32, big endian byte order; available only to managed applications'
}, {
  id: '20000',
  name: 'x-Chinese_CNS',
  description: 'CNS Taiwan; Chinese Traditional (CNS)'
}, {
  id: '20001',
  name: 'x-cp20001',
  description: 'TCA Taiwan'
}, {
  id: '20002',
  name: 'x_Chinese-Eten',
  description: 'Eten Taiwan; Chinese Traditional (Eten)'
}, {
  id: '20003',
  name: 'x-cp20003',
  description: 'IBM5550 Taiwan'
}, {
  id: '20004',
  name: 'x-cp20004',
  description: 'TeleText Taiwan'
}, {
  id: '20005',
  name: 'x-cp20005',
  description: 'Wang Taiwan'
}, {
  id: '20105',
  name: 'x-IA5',
  description: 'IA5 (IRV International Alphabet No. 5, 7-bit); Western European (IA5)'
}, {
  id: '20106',
  name: 'x-IA5-German',
  description: 'IA5 German (7-bit)'
}, {
  id: '20107',
  name: 'x-IA5-Swedish',
  description: 'IA5 Swedish (7-bit)'
}, {
  id: '20108',
  name: 'x-IA5-Norwegian',
  description: 'IA5 Norwegian (7-bit)'
}, {
  id: '20127',
  name: 'us-ascii',
  description: 'US-ASCII (7-bit)'
}, {
  id: '20261',
  name: 'x-cp20261',
  description: 'T.61'
}, {
  id: '20269',
  name: 'x-cp20269',
  description: 'ISO 6937 Non-Spacing Accent'
}, {
  id: '20273',
  name: 'IBM273',
  description: 'IBM EBCDIC Germany'
}, {
  id: '20277',
  name: 'IBM277',
  description: 'IBM EBCDIC Denmark-Norway'
}, {
  id: '20278',
  name: 'IBM278',
  description: 'IBM EBCDIC Finland-Sweden'
}, {
  id: '20280',
  name: 'IBM280',
  description: 'IBM EBCDIC Italy'
}, {
  id: '20284',
  name: 'IBM284',
  description: 'IBM EBCDIC Latin America-Spain'
}, {
  id: '20285',
  name: 'IBM285',
  description: 'IBM EBCDIC United Kingdom'
}, {
  id: '20290',
  name: 'IBM290',
  description: 'IBM EBCDIC Japanese Katakana Extended'
}, {
  id: '20297',
  name: 'IBM297',
  description: 'IBM EBCDIC France'
}, {
  id: '20420',
  name: 'IBM420',
  description: 'IBM EBCDIC Arabic'
}, {
  id: '20423',
  name: 'IBM423',
  description: 'IBM EBCDIC Greek'
}, {
  id: '20424',
  name: 'IBM424',
  description: 'IBM EBCDIC Hebrew'
}, {
  id: '20833',
  name: 'x-EBCDIC-KoreanExtended',
  description: 'IBM EBCDIC Korean Extended'
}, {
  id: '20838',
  name: 'IBM-Thai',
  description: 'IBM EBCDIC Thai'
}, {
  id: '20866',
  name: 'koi8-r',
  description: 'Russian (KOI8-R); Cyrillic (KOI8-R)'
}, {
  id: '20871',
  name: 'IBM871',
  description: 'IBM EBCDIC Icelandic'
}, {
  id: '20880',
  name: 'IBM880',
  description: 'IBM EBCDIC Cyrillic Russian'
}, {
  id: '20905',
  name: 'IBM905',
  description: 'IBM EBCDIC Turkish'
}, {
  id: '20924',
  name: 'IBM00924',
  description: 'IBM EBCDIC Latin 1/Open System (1047 + Euro symbol)'
}, {
  id: '20932',
  name: 'EUC-JP',
  description: 'Japanese (JIS 0208-1990 and 0212-1990)'
}, {
  id: '20936',
  name: 'x-cp20936',
  description: 'Simplified Chinese (GB2312); Chinese Simplified (GB2312-80)'
}, {
  id: '20949',
  name: 'x-cp20949',
  description: 'Korean Wansung'
}, {
  id: '21025',
  name: 'cp1025',
  description: 'IBM EBCDIC Cyrillic Serbian-Bulgarian'
}, {
  id: '21027',
  name: '',
  description: '(deprecated)'
}, {
  id: '21866',
  name: 'koi8-u',
  description: 'Ukrainian (KOI8-U); Cyrillic (KOI8-U)'
}, {
  id: '28591',
  name: 'iso-8859-1',
  description: 'ISO 8859-1 Latin 1; Western European (ISO)'
}, {
  id: '28592',
  name: 'iso-8859-2',
  description: 'ISO 8859-2 Central European; Central European (ISO)'
}, {
  id: '28593',
  name: 'iso-8859-3',
  description: 'ISO 8859-3 Latin 3'
}, {
  id: '28594',
  name: 'iso-8859-4',
  description: 'ISO 8859-4 Baltic'
}, {
  id: '28595',
  name: 'iso-8859-5',
  description: 'ISO 8859-5 Cyrillic'
}, {
  id: '28596',
  name: 'iso-8859-6',
  description: 'ISO 8859-6 Arabic'
}, {
  id: '28597',
  name: 'iso-8859-7',
  description: 'ISO 8859-7 Greek'
}, {
  id: '28598',
  name: 'iso-8859-8',
  description: 'ISO 8859-8 Hebrew; Hebrew (ISO-Visual)'
}, {
  id: '28599',
  name: 'iso-8859-9',
  description: 'ISO 8859-9 Turkish'
}, {
  id: '28603',
  name: 'iso-8859-13',
  description: 'ISO 8859-13 Estonian'
}, {
  id: '28605',
  name: 'iso-8859-15',
  description: 'ISO 8859-15 Latin 9'
}, {
  id: '29001',
  name: 'x-Europa',
  description: 'Europa 3'
}, {
  id: '38598',
  name: 'iso-8859-8-i',
  description: 'ISO 8859-8 Hebrew; Hebrew (ISO-Logical)'
}, {
  id: '50220',
  name: 'iso-2022-jp',
  description: 'ISO 2022 Japanese with no halfwidth Katakana; Japanese (JIS)'
}, {
  id: '50221',
  name: 'csISO2022JP',
  description: 'ISO 2022 Japanese with halfwidth Katakana; Japanese (JIS-Allow 1 byte Kana)'
}, {
  id: '50222',
  name: 'iso-2022-jp',
  description: 'ISO 2022 Japanese JIS X 0201-1989; Japanese (JIS-Allow 1 byte Kana - SO/SI)'
}, {
  id: '50225',
  name: 'iso-2022-kr',
  description: 'ISO 2022 Korean'
}, {
  id: '50227',
  name: 'x-cp50227',
  description: 'ISO 2022 Simplified Chinese; Chinese Simplified (ISO 2022)'
}, {
  id: '50229',
  name: '',
  description: 'ISO 2022 Traditional Chinese'
}, {
  id: '50930',
  name: '',
  description: 'EBCDIC Japanese (Katakana) Extended'
}, {
  id: '50931',
  name: '',
  description: 'EBCDIC US-Canada and Japanese'
}, {
  id: '50933',
  name: '',
  description: 'EBCDIC Korean Extended and Korean'
}, {
  id: '50935',
  name: '',
  description: 'EBCDIC Simplified Chinese Extended and Simplified Chinese'
}, {
  id: '50936',
  name: '',
  description: 'EBCDIC Simplified Chinese'
}, {
  id: '50937',
  name: '',
  description: 'EBCDIC US-Canada and Traditional Chinese'
}, {
  id: '50939',
  name: '',
  description: 'EBCDIC Japanese (Latin) Extended and Japanese'
}, {
  id: '51932',
  name: 'euc-jp',
  description: 'EUC Japanese'
}, {
  id: '51936',
  name: 'EUC-CN',
  description: 'EUC Simplified Chinese; Chinese Simplified (EUC)'
}, {
  id: '51949',
  name: 'euc-kr',
  description: 'EUC Korean'
}, {
  id: '51950',
  name: '',
  description: 'EUC Traditional Chinese'
}, {
  id: '52936',
  name: 'hz-gb-2312',
  description: 'HZ-GB2312 Simplified Chinese; Chinese Simplified (HZ)'
}, {
  id: '54936',
  name: 'GB18030',
  description: 'Windows XP and later: GB18030 Simplified Chinese (4 byte); Chinese Simplified (GB18030)'
}, {
  id: '57002',
  name: 'x-iscii-de',
  description: 'ISCII Devanagari'
}, {
  id: '57003',
  name: 'x-iscii-be',
  description: 'ISCII Bangla'
}, {
  id: '57004',
  name: 'x-iscii-ta',
  description: 'ISCII Tamil'
}, {
  id: '57005',
  name: 'x-iscii-te',
  description: 'ISCII Telugu'
}, {
  id: '57006',
  name: 'x-iscii-as',
  description: 'ISCII Assamese'
}, {
  id: '57007',
  name: 'x-iscii-or',
  description: 'ISCII Odia'
}, {
  id: '57008',
  name: 'x-iscii-ka',
  description: 'ISCII Kannada'
}, {
  id: '57009',
  name: 'x-iscii-ma',
  description: 'ISCII Malayalam'
}, {
  id: '57010',
  name: 'x-iscii-gu',
  description: 'ISCII Gujarati'
}, {
  id: '57011',
  name: 'x-iscii-pa',
  description: 'ISCII Punjabi'
}, {
  id: '65000',
  name: 'utf-7',
  description: 'Unicode (UTF-7)'
}, {
  id: '65001',
  name: 'utf-8',
  description: 'Unicode (UTF-8)'
}];
exports.default = _default;
},{}],"h829":[function(require,module,exports) {
module.exports = "/shop-floor-plan.6c5db23e.svg";
},{}],"bz43":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var http = _interopRequireWildcard(require("http"));

var https = _interopRequireWildcard(require("https"));

var express = _interopRequireWildcard(require("express"));

var path = _interopRequireWildcard(require("path"));

var _compression = _interopRequireDefault(require("compression"));

var fs = _interopRequireWildcard(require("fs"));

var _LazyString = _interopRequireDefault(require("./LazyString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var shopFloorPlan = require('../../gfx/shop-floor-plan.svg');

var WebServer =
/** @class */
function () {
  function WebServer(_a) {
    var _this = this;

    var httpPort = _a.httpPort,
        httpsPort = _a.httpsPort,
        sharedDncClient = _a.sharedDncClient,
        sharedMdcClient = _a.sharedMdcClient,
        logger = _a.logger,
        keyAndCert = _a.keyAndCert;
    this.sharedDncClient = sharedDncClient;
    this.sharedMdcClient = sharedMdcClient;
    this.logger = logger;
    this.app = (0, express.default)();
    var keyAndCert_;

    try {
      if (keyAndCert) {
        keyAndCert_ = {
          key: fs.readFileSync(path.resolve(keyAndCert.key)),
          cert: fs.readFileSync(path.resolve(keyAndCert.cert))
        };
      }
    } catch (e) {
      this.logger.error('Failed to load SSL files', e);
    }

    console.log(keyAndCert_ ? 'HTTPS' : 'HTTP');
    this.httpServer = keyAndCert_ ? https.createServer(keyAndCert_, this.app) : http.createServer(this.app);

    if (keyAndCert_) {
      // Create http redirect
      var redirectServer = http.createServer(function (req, res) {
        var host = req.headers.host.split(':')[0];
        var port = httpsPort != 443 ? ":" + httpsPort : '';
        res.setHeader('Location', "https://" + host + port + req.url);
        res.statusCode = 301;
        res.end();
      });
      redirectServer.listen(httpPort, function () {
        _this.logger.log("Listening on port " + httpPort + " to redirect traffic to port " + httpsPort + ".");
      });
    }

    var mainPort = keyAndCert_ ? httpsPort : httpPort;
    this.httpServer.listen(mainPort, function () {
      return _this.logger.log("Listening on port " + mainPort + " with " + (keyAndCert_ ? 'https://' : 'http://'));
    });
    this.app.use((0, _compression.default)());
    this.setupRouting();
  }

  WebServer.prototype.setupRouting = function () {
    var _this = this; // All roads lead to Rome, err... index.html


    var index = this.returnIndex.bind(this);
    this.app.get('/mdc', index);
    this.app.get('/mdc/status/:screenId', index);
    this.app.get('/mdc/operator/:screenId', index);
    this.app.get('/mdc/operator/:screenId/:machineId', index);
    this.app.get('/mdc/shopfloor/:screenId', index);
    this.app.get('/mdc/dashboard/:screenId', index);
    this.app.get('/mdc/dashboard/:screenId/:machineId', index);
    this.app.get('/mdc/document/:screenId', index);
    this.app.get('/dnc', index);
    this.app.set('json spaces', 4);

    if (this.sharedMdcClient) {
      // Shopfloor backgrounds
      this.app.get('/api/background/:screenId', function (req, res) {
        var _a;

        var screen = (_a = _this.sharedMdcClient) === null || _a === void 0 ? void 0 : _a.dataProvider.configServer.getScreen(req.params.screenId);
        if (!screen) return res.status(404).end('Screen not found');
        if (screen.type != 'shopfloor') return res.status(404).end('Screen does not have a background');
        var background = screen.background;

        if (background.indexOf('data:') === 0) {
          background = background.substring(background.indexOf(',') + 1);
          background = new Buffer(background, 'base64').toString('ascii');
          res.type('svg');
          res.set('Cache-control', 'public, max-age=86400');
          res.end(background);
          return res.end();
        } else {
          return res.redirect(background);
        }
      });
      this.app.get('/debug/config', function (req, res) {
        res.json(_this.sharedMdcClient.screens);
        res.end();
      });
      this.app.get('/debug/state', function (req, res) {
        Object.values(_this.sharedMdcClient.liveState).forEach(function (machineState) {
          for (var evalId in machineState) {
            if (machineState[evalId] instanceof _LazyString.default) {
              machineState[evalId] = machineState[evalId].toString();
            }
          }
        });
        res.json(_this.sharedMdcClient.liveState);
        res.end();
      });
      this.app.get('/debug/mapping', function (req, res) {
        res.json(_this.sharedMdcClient.liveMapping);
        res.end();
      });
      this.app.get('/debug/state-verbose', function (req, res) {
        var sharedClient = _this.sharedMdcClient;
        var data = sharedClient.screens.map(function (screen) {
          if (screen.type == 'operator' || screen.type == 'status') {
            var pos = screen.overallPosition;
            var machines = sharedClient.dataProvider.getMachinesFilter(screen.MACHINES);
            var mappings_1 = sharedClient.getLiveMappings(screen.id);
            return {
              title: screen.DESCRIPTION,
              id: screen.id,
              // evalIndex: `${screen.overallPosition} (screen.overallPosition) + ${stateOffset} (stateOffset) = ${stateIdEvalId}`,
              // description: `machine.evals[${stateIdEvalId}] resolves to the following state ids:`,
              machines: machines.map(function (m) {
                var getEval = function getEval(evalId) {
                  return m.machineid in sharedClient.liveState && evalId in sharedClient.liveState[m.machineid] ? sharedClient.liveState[m.machineid][evalId] : null;
                };

                var result = {
                  machineId: m.machineid,
                  machineTitle: m.machine,
                  stateIdEvalId: -1,
                  stateTitle: ''
                };

                if (mappings_1) {
                  result.stateIdEvalId = mappings_1.current_state;
                  var stateId = getEval(mappings_1.current_state);
                  var t = getEval(mappings_1.state[stateId]);
                  result.stateTitle = t ? t.toString() : '';
                }

                return result;
              })
            };
          }
        }).filter(function (v) {
          return v;
        });
        res.json(data);
        res.end();
      });
    } // Create endpoint for document screens


    if (this.sharedMdcClient && this.sharedMdcClient.documentPath) {
      this.app.use('/mdc/documents/', express.static(path.resolve(__dirname, this.sharedMdcClient.documentPath), {
        fallthrough: false,
        index: false
      }));
    } // Static assets


    this.app.use('/', express.static(path.resolve(__dirname, '../site')));
    this.setupLegacyRouting();
  };

  WebServer.prototype.setupLegacyRouting = function () {
    // Make legacy links keep working
    this.app.get('/operatorscreen/:screenId', function (req, res) {
      return res.redirect('/mdc/operator/' + req.param('screenId'));
    });
    this.app.get('/livescreen/:screenId', function (req, res) {
      return res.redirect('/mdc/status/' + req.param('screenId'));
    });
    this.app.get('/dashboard/:screenId', function (req, res) {
      return res.redirect('/mdc/dashboard/' + req.param('screenId'));
    });
    this.app.get('/static/gfx/shop-floor-plan.svg', function (req, res) {
      return res.sendFile(path.join(__dirname, shopFloorPlan));
    });
  };

  WebServer.prototype.returnIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../site/index.html'));
  };

  return WebServer;
}();

var _default = WebServer;
exports.default = _default;
},{"./LazyString":"aFq9","../../gfx/shop-floor-plan.svg":"h829"}],"ZCfc":[function(require,module,exports) {
'use strict';

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var _nodeGetopt = _interopRequireDefault(require("node-getopt"));

var childProcess = _interopRequireWildcard(require("child_process"));

var _ClusterApplication = require("./ClusterApplication");

var _WebSocketServer = _interopRequireDefault(require("./WebSocketServer"));

var _logger = require("./logger");

var _ConfigServer = _interopRequireDefault(require("./ConfigServer"));

var _SharedClient = _interopRequireDefault(require("./mdc/SharedClient"));

var _SharedClient2 = _interopRequireDefault(require("./dnc/SharedClient"));

var _encodings = _interopRequireDefault(require("./encodings"));

var _WebServer = _interopRequireDefault(require("./WebServer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

require('babel-polyfill');

try {
  var sourceMapSupport = require('source-map-support');

  sourceMapSupport.install();
  console.log('Source map support initialized');
} catch (e) {
  console.log('Source map support skipped');
}

var Application =
/** @class */
function (_super) {
  __extends(Application, _super);

  function Application() {
    var _this = _super.call(this, {
      enableHeartbeat: true,
      maxWorkerHeapSize: 1000000000
    }) || this;

    _this.logSpec = '';
    _this.buildInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'build.json')).toString());
    return _this;
  }

  Application.prototype.crashLoggerFn = function () {
    return new _logger.FileLogger({
      filename: __dirname + '/../mdc_crash.log',
      append: true
    });
  };

  Application.prototype.debugLoggerFn = function () {
    // Log to console (from command line)
    var log = this.logSpec;

    if (log === 'console') {
      return new _logger.StdoutLogger();
    } // Log to file (from command line)


    if (log != null && log.slice(0, 5) === 'file:') {
      var logFilename = log.slice(5);
      return new _logger.FileLogger({
        filename: logFilename,
        append: true
      });
    } // Log to file (from mdcweb.json)


    var jsonConfigLocation = this.getJsonConfigLocation();

    try {
      var jsonConfig = JSON.parse(fs.readFileSync(jsonConfigLocation).toString());

      if (jsonConfig.logfile) {
        return new _logger.FileLogger({
          filename: jsonConfig.logfile,
          append: true
        });
      }
    } catch (e) {} // Default logger


    return new _logger.MemoryLogger();
  };

  Application.prototype.parseAddress = function (str, host, port) {
    if (host === void 0) {
      host = '127.0.0.1';
    }

    if (port === void 0) {
      port = 4448;
    }

    if (str) {
      var spl = str.toString().split(':');

      if (spl.length === 2) {
        host = spl[0];
        port = parseInt(spl[1], 10);

        if (isNaN(port)) {
          throw new Error('Malformed address port');
        }
      } else if (spl.length === 1) {
        host = spl[0];
      } else {
        throw new Error('Malformed address host');
      }

      return {
        host: host,
        port: port
      };
    }

    return null;
  };

  Application.prototype.init = function () {
    var spec = _nodeGetopt.default.create([['p', 'port=PORT', 'Local HTTP port (default 80'], ['s', 'ssl-port=PORT', 'Local HTTPS port (default 443)'], ['w', 'watch', 'Restart on source file changes'], ['m', 'mdc=IP[:PORT]', 'Address of the MDC-Max Server'], ['o', 'documents=PATH', 'Path for the MDC-Max Server report files'], ['d', 'dnc=IP[:PORT]', 'Address of the DNC-Max Server'], ['k', 'ssl-key=PATH', 'Path to SSL key (key.pem)'], ['c', 'ssl-cert=PATH', 'Path to SSL cert (cert.pem)'], ['', 'dnc-auth=USERNAME:PASSWORD', 'Login credentials for the DNC-Max Web Client'], ['L', 'log=MODE', 'How to log; MODE is either "console" or "file:FILE", default is neither'], ['e', 'encoding=ENCODING', 'Override encoding with a specific one'], ['h', 'help']]);

    var options = spec.bindHelp().parseSystem().options;
    var httpPort = parseInt((options.port || '').toString(), 10) || null;
    var httpsPort = parseInt((options['ssl-port'] || '').toString(), 10) || null;
    var encoding = (options.encoding || '').toString() || this.determineEncoding() || 'IBM437';

    var dncAuth = function () {
      var defaultAuth = {
        username: '',
        password: ''
      };
      var option = options['dnc-auth'];
      if (!option) return defaultAuth;
      var split = option.toString().split(':');
      if (split.length != 2) throw new Error('Malformed DNC credentials');
      return {
        username: split[0],
        password: split[1]
      };
    }();

    var mdc = this.parseAddress(options.mdc, undefined, 4449);
    var dnc = this.parseAddress(options.dnc, undefined, 4444);
    this.logSpec = (options.log || '').toString();

    if (options.watch) {
      this.restartOnUpdate();
    }

    this.logger = this.debugLoggerFn();
    this.crashLogger = this.crashLoggerFn();
    var keyAndCert;

    if (options['ssl-key'] && options['ssl-cert']) {
      keyAndCert = {
        key: options['ssl-key'],
        cert: options['ssl-cert']
      };
    }

    return {
      config: {
        httpPort: httpPort,
        httpsPort: httpsPort,
        mdc: mdc,
        dnc: dnc,
        dncAuth: dncAuth,
        documentPath: (options.documents || '').toString(),
        encoding: encoding,
        keyAndCert: keyAndCert
      },
      workerProperties: {
        logSpec: this.logSpec
      }
    };
  };

  Application.prototype.determineEncoding = function () {
    var codePage = null;

    try {
      var execSync = childProcess.execSync;
      var codePageMatches = execSync('chcp').toString().match(/\d+/);

      if (!codePageMatches) {
        console.log("Failed to match codepage of " + codePageMatches);
        return null;
      }

      codePage = codePageMatches[0];

      var encodingEntry = _encodings.default.find(function (entry) {
        return entry.id == codePage;
      });

      var encodingName = encodingEntry.name;
      console.log("Determined codepage of " + codePage + " -> " + encodingName);
      return encodingName;
    } catch (e) {
      console.log("Failed to verify codepage of " + codePage);
      console.log(e.stack);
    }

    return null;
  };

  Application.prototype.getJsonConfigLocation = function () {
    var jsonConfigDir = path.join(__dirname, '..', '..', 'Cfg');

    try {
      var dirStat = fs.statSync(jsonConfigDir);
    } catch (error) {
      jsonConfigDir = path.join(__dirname, '..');
    }

    return path.join(jsonConfigDir, 'mdcweb.json');
  };

  Application.prototype.runWorker = function (_a) {
    var httpPort = _a.httpPort,
        httpsPort = _a.httpsPort,
        mdc = _a.mdc,
        dnc = _a.dnc,
        dncAuth = _a.dncAuth,
        documentPath = _a.documentPath,
        encoding = _a.encoding,
        keyAndCert = _a.keyAndCert;

    if (this.workerProperties) {
      this.logSpec = this.workerProperties.logSpec;
    }

    this.logger = this.debugLoggerFn();
    this.crashLogger = this.crashLoggerFn();
    this.logger.logBase('\n\n\n', function () {}); // Setup config

    var jsonConfigLocation = this.getJsonConfigLocation();
    var configServer = new _ConfigServer.default(jsonConfigLocation, this.logger.subLogger('ConfigServer'));
    var sharedMdcClient = mdc && new _SharedClient.default({
      host: mdc.host,
      port: mdc.port,
      logger: this.logger.subLogger('SharedMDC'),
      configServer: configServer,
      documentPath: documentPath
    });
    var sharedDncClient = dnc && new _SharedClient2.default({
      host: dnc.host,
      port: dnc.port,
      logger: this.logger.subLogger('SharedDNC'),
      configServer: configServer,
      encoding: encoding
    });
    var webServer = new _WebServer.default({
      httpPort: httpPort || configServer.config.httpPort || 80,
      httpsPort: httpsPort || configServer.config.httpsPort || 443,
      sharedDncClient: sharedDncClient,
      sharedMdcClient: sharedMdcClient,
      logger: this.logger.subLogger('WebServer'),
      keyAndCert: keyAndCert || configServer.config.keyAndCert
    });
    var webSocketServer = new _WebSocketServer.default({
      httpServer: webServer.httpServer,
      mdcConfig: mdc,
      dncConfig: dnc,
      dncAuth: dncAuth,
      sharedMdcClient: sharedMdcClient,
      sharedDncClient: sharedDncClient,
      configServer: configServer,
      encoding: encoding,
      logger: this.logger.subLogger('WebSocketServer'),
      buildInfo: this.buildInfo
    });
  };

  Application.prototype.restartOnUpdate = function () {
    var _this = this;

    var timer = null;
    return fs.watch(__dirname, {
      persistent: false
    }, function () {
      if (timer) {
        clearTimeout(timer);
      }

      return timer = setTimeout(function () {
        if (_this.logger) _this.logger.log('Files changed, restarting worker');

        _this.killWorker();
      }, 500);
    });
  };

  return Application;
}(_ClusterApplication.ClusterApplication);

var app = new Application();
app.run();
},{"./ClusterApplication":"XtlF","./WebSocketServer":"r4lh","./logger":"WOs9","./ConfigServer":"KNgD","./mdc/SharedClient":"xoAB","./dnc/SharedClient":"kcsL","./encodings":"mDKv","./WebServer":"bz43"}]},{},["ZCfc"], null)