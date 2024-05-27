import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { ContentState, ContentBlock } from 'draft-js';
import { styled, Theme } from '@mui/material/styles';

interface IMediaProps {
    block: ContentBlock;
    contentState: ContentState;
    blockProps: any;
    onClick: (block: ContentBlock) => void;
}

const PREFIX = 'Media';

const classes = {
    root: `${PREFIX}-root`,
    editable: `${PREFIX}-editable`,
    focused: `${PREFIX}-focused`,
    centered: `${PREFIX}-centered`,
    leftAligned: `${PREFIX}-leftAligned`,
    rightAligned: `${PREFIX}-rightAligned`
};

const StyledDiv = styled('div')(({ theme }: { theme: Theme }) => ({
    [`&.${classes.root}`]: {
        margin: '5px 0 1px',
        outline: 'none'
    },
    [`&.${classes.editable}`]: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: theme.shadows[3]
        }
    },
    [`&.${classes.focused}`]: {
        boxShadow: theme.shadows[3]
    },
    [`&.${classes.centered}`]: {
        textAlign: 'center'
    },
    [`&.${classes.leftAligned}`]: {
        textAlign: 'left'
    },
    [`&.${classes.rightAligned}`]: {
        textAlign: 'right'
    }
}));

const Media: FunctionComponent<IMediaProps> = (props) => {
    const { url, width, height, alignment, type } = props.contentState.getEntity(props.block.getEntityAt(0)).getData();
    const { onClick, readOnly, focusKey } = props.blockProps;

    const htmlTag = () => {
        const componentProps = {
            src: url,
            className: classNames(classes.root, {
                [classes.editable]: !readOnly,
                [classes.focused]: !readOnly && focusKey === props.block.getKey()
            }),
            width: width,
            height: type === 'video' ? 'auto' : height,
            onClick: () => {
                if (readOnly) {
                    return;
                }
                onClick(props.block);
            }
        };

        if (!type || type === 'image') {
            return <img {...componentProps} />;
        }
        if (type === 'video') {
            return <video {...componentProps} autoPlay={false} controls />;
        }
        return null;
    };

    return (
        <StyledDiv
            className={classNames({
                [classes.centered]: alignment === 'center',
                [classes.leftAligned]: alignment === 'left',
                [classes.rightAligned]: alignment === 'right'
            })}
        >
            {htmlTag()}
        </StyledDiv>
    );
};

export default Media;
