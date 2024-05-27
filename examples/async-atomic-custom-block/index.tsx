import React, { useRef, useState, FunctionComponent, useEffect } from 'react';
import MUIRichTextEditor, { TMUIRichTextEditorRef, TAsyncAtomicBlockResponse } from '../..';
import { Card, CardContent, Typography, Grid, Popover, TextField, Button } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

type TMyCardData = {
    searchTerm?: string;
};

type TAnchor = HTMLElement | null;

interface IMyCardPopoverProps {
    anchor: TAnchor;
    onSubmit: (data: TMyCardData, insert: boolean) => void;
}

type TMyCardPopoverState = {
    anchor: TAnchor;
    isCancelled: boolean;
};

const PREFIX = 'MyCard';

const cardClasses = {
    root: `${PREFIX}-root`
};

const CardStyled = styled(Card)({
    [`&.${cardClasses.root}`]: {
        maxWidth: 345
    }
});

const popoverPrefix = 'MyCardPopover';

const popoverClasses = {
    root: `${popoverPrefix}-root`,
    textField: `${popoverPrefix}-textField`
};

const PopoverStyled = styled(Popover)({
    [`& .${popoverClasses.root}`]: {
        padding: 10,
        maxWidth: 350
    },
    [`& .${popoverClasses.textField}`]: {
        width: '100%'
    }
});

const getDataFromCloudService = (searchTerm: string) => {
    return new Promise((resolve) => {
        console.log(`Searching for ${searchTerm}...`);
        setTimeout(() => {
            resolve({
                title: 'Data from cloud',
                subtitle: `You searched: ${searchTerm}`,
                text: 'Some description from the cloud.'
            });
        }, 2000);
    });
};

const downloadData = (searchTerm: string) => {
    return new Promise<TAsyncAtomicBlockResponse>(async (resolve, reject) => {
        const data = await getDataFromCloudService(searchTerm);
        if (!data) {
            reject();
            return;
        }
        resolve({
            data: data
        });
    });
};

const MyCard: FunctionComponent<any> = (props) => {
    const { blockProps } = props;

    return (
        <CardStyled className={cardClasses.root}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {blockProps.title}
                </Typography>
                <Typography gutterBottom component="h2">
                    {blockProps.subtitle}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {blockProps.text}
                </Typography>
            </CardContent>
        </CardStyled>
    );
};

const MyCardPopover: FunctionComponent<IMyCardPopoverProps> = (props) => {
    const [state, setState] = useState<TMyCardPopoverState>({
        anchor: null,
        isCancelled: false
    });
    const [data, setData] = useState<TMyCardData>({});

    useEffect(() => {
        setState({
            anchor: props.anchor,
            isCancelled: false
        });
    }, [props.anchor]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const textFieldProps = {
        className: popoverClasses.textField,
        onChange: handleChange,
        InputLabelProps: {
            shrink: true
        }
    };

    return (
        <PopoverStyled
            anchorEl={state.anchor}
            open={state.anchor !== null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
        >
            <Grid container spacing={1} className={popoverClasses.root}>
                <Grid item xs={12}>
                    <TextField {...textFieldProps} autoFocus={true} label="Search term" name="searchTerm" placeholder="Type anything here..." />
                </Grid>
                <Grid item container xs={12} justifyContent="flex-end">
                    <Button
                        onClick={() => {
                            setState({
                                anchor: null,
                                isCancelled: true
                            });
                        }}
                    >
                        <CloseIcon />
                    </Button>
                    <Button
                        onClick={() => {
                            setState({
                                anchor: null,
                                isCancelled: false
                            });
                            props.onSubmit(data, !state.isCancelled);
                        }}
                    >
                        <DoneIcon />
                    </Button>
                </Grid>
            </Grid>
        </PopoverStyled>
    );
};

const AsyncAtomicCustomBlock: FunctionComponent = () => {
    const ref = useRef<TMUIRichTextEditorRef>(null);
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    return (
        <>
            <MyCardPopover
                anchor={anchor}
                onSubmit={(data, insert) => {
                    if (insert && data.searchTerm) {
                        ref.current?.insertAtomicBlockAsync('my-card', downloadData(data.searchTerm), 'Downloading data...');
                    }
                    setAnchor(null);
                }}
            />
            <MUIRichTextEditor
                label="Press the last icon in the toolbar to insert an async atomic custom block..."
                ref={ref}
                controls={['title', 'bold', 'underline', 'add-card']}
                customControls={[
                    {
                        name: 'my-card',
                        type: 'atomic',
                        atomicComponent: MyCard
                    },
                    {
                        name: 'add-card',
                        icon: <UpdateIcon />,
                        type: 'callback',
                        onClick: (_editorState: any, _name: any, anchor: any) => {
                            setAnchor(anchor);
                        }
                    }
                ]}
            />
        </>
    );
};

export default AsyncAtomicCustomBlock;
