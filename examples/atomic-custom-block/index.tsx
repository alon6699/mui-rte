import React, { useRef, useState, FunctionComponent, useEffect } from 'react'
import MUIRichTextEditor, { TMUIRichTextEditorRef } from '../..'
import {
    Card, CardHeader, Avatar, CardMedia, CardContent,
    Typography, IconButton, CardActions, Grid, styled
} from '@mui/material'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'

type TMyCardData = {
    title?: string
    name?: string
    date?: Date
    text?: string
    image?: string
}

type TAnchor = HTMLElement | null

interface IMyCardPopoverProps {
    anchor: TAnchor
    onSubmit: (data: TMyCardData, insert: boolean) => void
}

type TMyCardPopoverState = {
    anchor: TAnchor
    isCancelled: boolean
}

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

const PREFIX = 'MyCard';

const cardClasses = {
    root: `${PREFIX}-root`,
    media: `${PREFIX}-media`,
    avatar: `${PREFIX}-avatar`
};

const CardStyled = styled(Card)({
    [`&.${cardClasses.root}`]: {
        maxWidth: 345
    },
    [`& .${cardClasses.media}`]: {
        height: 0,
        paddingTop: '56.25%'
    },
    [`& .${cardClasses.avatar}`]: {
        backgroundColor: 'tomato'
    }
});

const save = (data: string) => {
    console.log(data)
}

const MyCard: FunctionComponent<any> = (props) => {
    const { blockProps } = props

    const handleLiked = () => {
        alert("Favorited")
    }

    const handleShared = () => {
        alert("Shared")
    }

    return (
        <CardStyled className={cardClasses.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="name" className={cardClasses.avatar}>
                        {blockProps.name && blockProps.name.substring(0, 1)}
                    </Avatar>
                }
                title={blockProps.title}
                subheader={blockProps.date && blockProps.date.toLocaleDateString()}
            />
            <CardMedia
                className={cardClasses.media}
                image={blockProps.image || "default"}
                title={blockProps.title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {blockProps.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="like card"
                    onClick={handleLiked}>
                    <FavoriteIcon />
                </IconButton>
                <IconButton
                    aria-label="share"
                    onClick={handleShared}
                >
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </CardStyled>
    )
}

const MyCardPopover: FunctionComponent<IMyCardPopoverProps> = (props) => {
    const [state, setState] = useState<TMyCardPopoverState>({
        anchor: null,
        isCancelled: false
    })
    const [data, setData] = useState<TMyCardData>({})

    useEffect(() => {
        setState({
            anchor: props.anchor,
            isCancelled: false
        })
        setData({
            date: new Date()
        })
    }, [props.anchor])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const textFieldProps = {
        className: popoverClasses.textField,
        onChange: handleChange,
        InputLabelProps: {
            shrink: true
        }
    }

    return (
        <PopoverStyled
            anchorEl={state.anchor}
            open={state.anchor !== null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Grid container spacing={1} className={popoverClasses.root}>
                <Grid item xs={6}>
                    <TextField
                        {...textFieldProps}
                        autoFocus={true}
                        label="Title"
                        name="title"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        {...textFieldProps}
                        label="Name"
                        name="name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...textFieldProps}
                        label="Text"
                        name="text"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...textFieldProps}
                        label="Image URL"
                        name="image"
                    />
                </Grid>
                <Grid item container xs={12} justifyContent="flex-end">
                    <Button onClick={() => {
                        setState({
                            anchor: null,
                            isCancelled: true
                        })
                    }}
                    >
                        <CloseIcon />
                    </Button>
                    <Button onClick={() => {
                        setState({
                            anchor: null,
                            isCancelled: false
                        })
                        props.onSubmit(data, !state.isCancelled)
                    }}
                    >
                        <DoneIcon />
                    </Button>
                </Grid>
            </Grid>
        </PopoverStyled>
    )
}

const AtomicCustomBlock: FunctionComponent = () => {

    const ref = useRef<TMUIRichTextEditorRef>(null)
    const [anchor, setAnchor] = useState<HTMLElement | null>(null)
    return (
        <>
            <MyCardPopover
                anchor={anchor}
                onSubmit={(data, insert) => {
                    if (insert) {
                        ref.current?.insertAtomicBlockSync("my-card", data)
                    }
                    setAnchor(null)
                }}
            />
            <MUIRichTextEditor
                label="Press the last icon in the toolbar to insert an atomic custom block...."
                ref={ref}
                onSave={save}
                controls={["title", "bold", "underline", "save", "add-card"]}
                customControls={[
                    {
                        name: "my-card",
                        type: "atomic",
                        atomicComponent: MyCard
                    },
                    {
                        name: "add-card",
                        icon: <WebAssetIcon />,
                        type: "callback",
                        onClick: (_editorState: any, _name: any, anchor: any) => {
                            setAnchor(anchor)
                        }
                    }
                ]}
            />
        </>
    )
}

export default AtomicCustomBlock
