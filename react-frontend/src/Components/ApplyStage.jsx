import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Document, Page} from "react-pdf";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AuthenticationService from "../js/AuthenticationService";
import {Field, Form, Formik} from "formik";
import {Select} from "formik-material-ui";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as yup from "yup";
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    linkButton: {
        fontSize: "1.5rem",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        margin: 0,
        padding: 5,
        borderRadius: 0,
        textAlign: "left",
        '&:hover': {
            backgroundColor: "#00000055",
        },
        '&:focus': {
            outline: "none",
        }
    },
    fileButton: {
        '&:focus': {
            outline: "none",
            backgroundColor: theme.palette.secondary.light,
            display: "inline"
        }
    },
    buttonDiv: {
        display: "inline"
    },
    viewbox: {
        height: "90vh",
        overflow: "auto",
        backgroundColor: "#888",
        padding: theme.spacing(2, 0),
    },
    listResumes: {
        height: "90vh",
        overflow: "auto",
    },
    page: {
        margin: theme.spacing(1, 0)
    },
    container: {
        backgroundColor: "#fff",
    },
    resumeState: {
        color: "black",
        display: "block",
        padding: theme.spacing(0.5, 2, 2),
        textAlign: "justify"
    }
}));

export default function ApplyStage() {
    const classes = useStyles();
    const [currentDoc, setCurrentDoc] = useState('');
    const [offers, setOffers] = useState([{title: '', joinedFile: '', employer: {}, id: -1}]);
    const [resumes, setResumes] = useState([{name: '', file: '', owner: {}, id: -1}]);
    const [numPages, setNumPages] = useState(null);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [reasonModalOpen, setReasonModalOpen] = useState(false);
    const [currentOfferId, setCurrentOfferId] = useState(-1);

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get("http://localhost:8080/resumes/student/" + AuthenticationService.getCurrentUser().id)
                .catch(() => {
                    setErrorModalOpen(true)
                })
            setResumes(result.data)
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get("http://localhost:8080/offers/student/" + AuthenticationService.getCurrentUser().id)
                .catch(() => {
                    setErrorModalOpen(true)
                })
            setOffers(result.data)
        }
        getData()
    }, [])

    useEffect(() => {
        if (offers[0]) {
            if (offers[0].joinedFile !== '' && offers[0].joinedFile !== undefined && offers[0].joinedFile !== null)
                setCurrentDoc(offers[0].joinedFile)
        } else
            setCurrentDoc('')
    }, [offers])


    return (
        <Container component="main" className={classes.container}>
            <Grid
                container
                spacing={0}
                style={{alignItems: "stretch"}}
            >
                <Grid item xs={5} className={classes.listResumes}>
                    <Typography variant="h4" id="title">Les stages</Typography>
                    {
                        offers.map((item, i) => (
                            <div key={i}>
                                <div className={classes.buttonDiv}>
                                    <button
                                        type={"button"}
                                        className={[classes.linkButton].join(' ')}
                                        style={{marginRight: 5}}
                                        onClick={() => {
                                            setCurrentOfferId(item.id);
                                            setReasonModalOpen(true);
                                        }}
                                    ><i className="fa fa-check-square" style={{color: "green"}}/></button>
                                </div>
                                <button
                                    type={"button"}
                                    className={[classes.linkButton, classes.fileButton].join(' ')}
                                    autoFocus={i === 0}
                                >
                                    <Typography color={"textPrimary"} variant={"body1"} display={"inline"}>
                                        {item.title + " "}
                                    </Typography>
                                    <Typography color={"textSecondary"} variant={"body2"} display={"inline"}>
                                        {item.employer.companyName}
                                    </Typography>
                                    <Typography>
                                        {AuthenticationService.getCurrentUser().firstName}
                                    </Typography>
                                </button>
                            </div>
                        ))
                    }
                </Grid>
                <Grid item className={classes.viewbox} xs={7} align="center">
                    <Document
                        onLoadSuccess={({numPages}) => {
                            setNumPages(numPages)
                        }}
                        error={"Veuillez choisir un fichier"}
                        file={currentDoc}
                    >
                        {Array.from(
                            new Array(numPages),
                            (el, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    renderTextLayer={false}
                                    className={classes.page}
                                />
                            ),
                        )}
                    </Document>
                </Grid>
            </Grid>
            <Dialog open={errorModalOpen} onClose={() => setErrorModalOpen(false)}>
                <DialogTitle id="alert-dialog-title">{"Erreur réseau"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Erreur réseau: impossible de communiquer avec le serveur
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setErrorModalOpen(false)} color="primary">
                        J'ai compris
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={reasonModalOpen} onClose={() => setReasonModalOpen(false)} fullWidth maxWidth={"md"}>
                <DialogTitle id="alert-dialog-title">{"Veuillez choisir un CV :"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" component={"div"}>
                        <Formik
                            onSubmit={async (values) => {
                                return axios.post("http://localhost:8080/application/" + currentOfferId + "/" + values.resumeId, {})
                                    .then((e) => setReasonModalOpen(false))
                            }}
                            validateOnBlur={false}
                            validateOnChange={false}
                            enableReinitialize={true}
                            validationSchema={yup.object()
                                .shape({
                                    resumeId: yup.mixed().required("Ce champ est requis")
                                })}
                            initialValues={{
                                resumeId: resumes[0].id,
                            }}
                        >
                            {({submitForm, isSubmitting}) => (
                                <Form>
                                    <Field
                                        component={Select}
                                        name="resumeId"
                                        fullWidth
                                        style={{marginBottom: "10px"}}
                                    >
                                        {
                                            resumes.map((item, i) => (
                                                <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Field>
                                    {isSubmitting && <LinearProgress/>}
                                    <Button
                                        id="buttonSubmit"
                                        type={"submit"}
                                        variant="contained"
                                        fullWidth
                                        size={"large"}
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Envoyer ma candidature
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setReasonModalOpen(false)} color={"primary"}>
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}