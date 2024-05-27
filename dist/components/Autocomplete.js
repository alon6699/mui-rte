"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var PREFIX = 'Autocomplete';
var classes = {
    container: "".concat(PREFIX, "-container"),
    item: "".concat(PREFIX, "-item")
};
var StyledPaper = (0, styles_1.styled)(material_1.Paper)((_a = {},
    _a["&.".concat(classes.container)] = {
        minWidth: '200px',
        position: 'absolute',
        zIndex: 10
    },
    _a["& .".concat(classes.item)] = {
        cursor: 'pointer'
    },
    _a));
var Autocomplete = function (props) {
    if (!props.items.length) {
        return null;
    }
    return (react_1.default.createElement(StyledPaper, { className: classes.container, style: { top: props.top, left: props.left } },
        react_1.default.createElement(material_1.List, { dense: true }, props.items.map(function (item, index) { return (react_1.default.createElement(material_1.ListItem, { key: index, className: classes.item, selected: index === props.selectedIndex, onClick: function () { return props.onClick(index); } }, item.content)); }))));
};
exports.default = Autocomplete;
//# sourceMappingURL=Autocomplete.js.map