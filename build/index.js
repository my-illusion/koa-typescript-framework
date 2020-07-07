"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const app = new koa_1.default();
app.use(async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = '<a>2323</a>';
    next();
});
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});
//# sourceMappingURL=index.js.map