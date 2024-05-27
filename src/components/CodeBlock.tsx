import React, { FunctionComponent } from 'react';
import { styled, Theme } from '@mui/material/styles';

const PREFIX = 'CodeBlock';

const classes = {
    root: `${PREFIX}-root`
};

const StyledDiv = styled('div')(({ theme }: { theme: Theme }) => ({
    [`&.${classes.root}`]: {
        backgroundColor: theme.palette.grey[200],
        padding: theme.spacing(1, 2, 1, 2)
    }
}));

interface ICodeBlockProps {
    children?: React.ReactNode;
}

const CodeBlock: FunctionComponent<ICodeBlockProps> = (props) => {
    return (
        <StyledDiv className={classes.root}>
            {props.children}
        </StyledDiv>
    );
};

export default CodeBlock;
