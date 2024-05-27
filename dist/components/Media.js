"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var styles_1 = require("@mui/material/styles");
var PREFIX = 'Media';
var classes = {
    root: "".concat(PREFIX, "-root"),
    editable: "".concat(PREFIX, "-editable"),
    focused: "".concat(PREFIX, "-focused"),
    centered: "".concat(PREFIX, "-centered"),
    leftAligned: "".concat(PREFIX, "-leftAligned"),
    rightAligned: "".concat(PREFIX, "-rightAligned")
};
var StyledDiv = (0, styles_1.styled)('div')(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {},
        _b["&.".concat(classes.root)] = {
            margin: '5px 0 1px',
            outline: 'none'
        },
        _b["&.".concat(classes.editable)] = {
            cursor: 'pointer',
            '&:hover': {
                boxShadow: theme.shadows[3]
            }
        },
        _b["&.".concat(classes.focused)] = {
            boxShadow: theme.shadows[3]
        },
        _b["&.".concat(classes.centered)] = {
            textAlign: 'center'
        },
        _b["&.".concat(classes.leftAligned)] = {
            textAlign: 'left'
        },
        _b["&.".concat(classes.rightAligned)] = {
            textAlign: 'right'
        },
        _b);
});
var Media = function (props) {
    var _a;
    var _b = props.contentState.getEntity(props.block.getEntityAt(0)).getData(), url = _b.url, width = _b.width, height = _b.height, alignment = _b.alignment, type = _b.type;
    var _c = props.blockProps, onClick = _c.onClick, readOnly = _c.readOnly, focusKey = _c.focusKey;
    var htmlTag = function () {
        var _a;
        var componentProps = {
            src: url,
            className: (0, classnames_1.default)(classes.root, (_a = {},
                _a[classes.editable] = !readOnly,
                _a[classes.focused] = !readOnly && focusKey === props.block.getKey(),
                _a)),
            width: width,
            height: type === 'video' ? 'auto' : height,
            onClick: function () {
                if (readOnly) {
                    return;
                }
                onClick(props.block);
            }
        };
        if (!type || type === 'image') {
            return react_1.default.createElement("img", __assign({}, componentProps));
        }
        if (type === 'video') {
            return react_1.default.createElement("video", __assign({}, componentProps, { autoPlay: false, controls: true }));
        }
        return null;
    };
    return (react_1.default.createElement(StyledDiv, { className: (0, classnames_1.default)((_a = {},
            _a[classes.centered] = alignment === 'center',
            _a[classes.leftAligned] = alignment === 'left',
            _a[classes.rightAligned] = alignment === 'right',
            _a)) }, htmlTag()));
};
exports.default = Media;
//# sourceMappingURL=Media.js.map