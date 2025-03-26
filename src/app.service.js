"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
var common_1 = require("@nestjs/common");
var fs = require("fs/promises");
var prices = {
    A: 55.5,
    B: 59.5,
    C: 62.75,
    D: 66.0,
    E: 69.0,
    F: 71.25,
};
var AppService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppService = _classThis = /** @class */ (function () {
        function AppService_1() {
            this.usersData = [];
        }
        AppService_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rawData, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fs.readFile('data.json', 'utf-8')];
                        case 1:
                            rawData = _a.sent();
                            this.usersData = JSON.parse(rawData);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Error loading data.json:', error_1);
                            throw new Error('Failed to load user data');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AppService_1.prototype.findUserById = function (userId) {
            var user = this.usersData.find(function (u) { return u.id === userId; });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        };
        AppService_1.prototype.getActiveCatNames = function (user) {
            return user.cats
                .filter(function (cat) { return cat.subscriptionActive; })
                .map(function (cat) { return cat.name; });
        };
        AppService_1.prototype.calculateTotalPrice = function (user) {
            return user.cats.reduce(function (sum, cat) {
                if (cat.subscriptionActive) {
                    var price = prices[cat.pouchSize];
                    return sum + (price || 0); // Default to 0 if pouch size is invalid
                }
                return sum;
            }, 0);
        };
        AppService_1.prototype.isFreeGiftApplicable = function (totalPrice) {
            return totalPrice > 120;
        };
        AppService_1.prototype.formatTitle = function (catNames) {
            if (catNames.length > 1) {
                return "Your next delivery for ".concat(catNames.slice(0, -1).join(', '), " and ").concat(catNames[catNames.length - 1]);
            }
            return "Your next delivery for ".concat(catNames[0]);
        };
        AppService_1.prototype.formatMessage = function (user, catNames) {
            return "Hey ".concat(user.firstName, "! In two days' time, we'll be charging you for your next order for ").concat(catNames.join(', ').replace(/, ([^,]*)$/, ' and $1'), "'s fresh food.");
        };
        AppService_1.prototype.getNextDelivery = function (userId) {
            var user = this.findUserById(userId);
            var catNames = this.getActiveCatNames(user);
            var totalPrice = this.calculateTotalPrice(user);
            var freeGift = this.isFreeGiftApplicable(totalPrice);
            var title = this.formatTitle(catNames);
            var message = this.formatMessage(user, catNames);
            return {
                title: title,
                message: message,
                totalPrice: parseFloat(totalPrice.toFixed(2)),
                freeGift: freeGift,
            };
        };
        return AppService_1;
    }());
    __setFunctionName(_classThis, "AppService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppService = _classThis;
}();
exports.AppService = AppService;
