import React, { FunctionComponent } from 'react';
import { styled, Theme } from '@mui/material/styles';

const PREFIX = 'Blockquote';

const classes = {
    root: `${PREFIX}-root`
};

const StyledBlockquote = styled('div')(({ theme }: { theme: Theme }) => ({
    [`&.${classes.root}`]: {
        fontStyle: 'italic',
        color: theme.palette.grey[800],
        borderLeft: `4px solid ${theme.palette.grey.A100}`
    }
}));

interface IBlockquoteProps {
    children?: React.ReactNode;
}

const Blockquote: FunctionComponent<IBlockquoteProps> = (props) => {
    return (
        <StyledBlockquote className={classes.root}>
            {props.children}
        </StyledBlockquote>
    );
};

export default Blockquote;
