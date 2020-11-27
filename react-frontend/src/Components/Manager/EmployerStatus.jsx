import {Button, Dialog, DialogContent, Grid, Typography} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import React, {useEffect, useState} from "react";
import {useApi, useDateParser, useModal, useTimeParserFromDate} from "../../Services/Hooks";
import OfferDetails from "../Utils/OfferDetails";
import PdfDocument from "../Utils/PDF/PdfDocument";
import useStyles from "../Utils/Style/useStyles";
import * as PropTypes from "prop-types";

function EmployerApplicationDetails({offers}) {

    function interviewStatus() {
        let interviewCount = 0

        for (const offer of offers)
            interviewCount += offer.applications.filter(appli => appli.interview).length

        if (interviewCount > 0)
                return interviewCount + " demandes d'entrevue"
            else
                return "Aucune demande d'entrevue"
    }

    function isApplicationWaitingForEmployer(appli) {
        return appli.state === "APPLICATION_PENDING_FOR_EMPLOYER_INITIAL_REVIEW" ||
            appli.state === "WAITING_FOR_EMPLOYER_HIRING_FINAL_DECISION"
    }

    function applicationsStatus() {
        let applisWaitingForEmployerCount = 0

        for (const offer of offers)
            applisWaitingForEmployerCount += offer.applications.filter(appli => isApplicationWaitingForEmployer(appli)).length

        return applisWaitingForEmployerCount + " applications en attente de l'employeur"
    }

    function contractsStatus() {
        let contractsWaitingCount = 0
        let contractFinalizedCount = 0

        for (const offer of offers)
            for (const appli of offer.applications)
                if (appli.contract)
                    switch (appli.contract.signatureState) {
                        case "PENDING_FOR_ADMIN_REVIEW":
                        case "WAITING_FOR_EMPLOYER_SIGNATURE" :
                        case "WAITING_FOR_STUDENT_SIGNATURE" :
                        case "WAITING_FOR_ADMIN_SIGNATURE":
                            contractsWaitingCount++
                            break;
                        case "SIGNED":
                            contractFinalizedCount++
                        default:
                            break;
                    }

        return contractsWaitingCount + " contrats en attente, " + contractFinalizedCount + " contrats finalisés"
    }

    return <>
        <Typography>
            {interviewStatus()}
        </Typography>
        <Typography>
            {applicationsStatus()}
        </Typography>
        <Typography>
            {contractsStatus()}
        </Typography>
    </>
}

EmployerApplicationDetails.propTypes = {
    offers: PropTypes.array.isRequired
}

function EmployerStatusDetails({offers}) {
    function offerStatus() {
        if (offers.length === 0)
            return "Aucune offre"
        else {
            let approvedOffers = 0
            let pendingOffers = 0
            let rejectedOffers = 0

            for (const offer of offers) {
                if (offer.reviewState === "APPROVED")
                    approvedOffers++
                else if (offer.reviewState === "PENDING")
                    pendingOffers++
                else if (offer.reviewState === "DENIED")
                    rejectedOffers++
            }

            return offers.length + " offres: " + approvedOffers + " approuvées, "
                + pendingOffers + " en attente, " + rejectedOffers + " rejetées"
        }
    }

    return <>
        <Typography>
            {offerStatus()}
        </Typography>
        <Typography>
            <EmployerApplicationDetails offers={offers}/>
        </Typography>
    </>
}

EmployerStatusDetails.propTypes = {
    offers: PropTypes.array.isRequired
}

export default function EmployerStatus() {
    const offersTabIndex = 0
    const interviewsTabIndex = 1
    const classes = useStyles()
    const api = useApi()
    const parseDate = useDateParser()
    const parseTimeFromDate = useTimeParserFromDate()
    const [employers, setEmployers] = useState([])
    const [currentEmployerOffers, setCurrentEmployerOffers] = useState([])
    const [currentEmployerInterviews, setCurrentEmployerInterviews] = useState([])
    const [currentEmployerIndex, setCurrentEmployerIndex] = useState(0)
    const [isPdfOpen, openPdf, closePdf] = useModal()
    const [currentDoc, setCurrentDoc] = useState("")
    const [currentSubtab, setCurrentSubtab] = useState(0)

    useEffect(() => {
        api.get("/employers").then(resp => {
            setEmployers(resp ? resp.data : [])
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (employers[currentEmployerIndex])
            api.get("/offers/employer/" + employers[currentEmployerIndex].email)
                .then(r => {
                    setCurrentEmployerOffers(r.data)
                })
    }, [currentEmployerIndex, employers]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (employers[currentEmployerIndex]) {
            api.get("/interviews/employer/" + employers[currentEmployerIndex].id)
                .then(r => {
                    setCurrentEmployerInterviews(r ? r.data : [])
                })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getCurrentEmployerInterviews(index) {
        api.get("/interviews/employer/" + employers[index].id)
            .then(r => {
                setCurrentEmployerInterviews(r ? r.data : [])
            })
    }

    function hiredStudentsNames(o) {
        return o.reviewState === "APPROVED" ?
            o.applications.map(elem =>
                <Typography
                    style={{fontWeight: "bold"}}>{elem.student.firstName + " " + elem.student.lastName}</Typography>
            )
            : <Typography style={{fontWeight: "bold"}}>Aucun étudiant n'a été selectionné pour l'offre</Typography>
    }

    function printOfferStatus(offer) {
        if (offer.reviewState === "PENDING")
            return <span style={{color: "blue"}}>En attente</span>
        else if (offer.reviewState === "DENIED")
            return <span style={{color: "red"}}>Rejeté<span
                style={{color: "black"}}> : {offer.reasonForRejection} </span></span>
        else
            return <span style={{color: "green"}}>Approuvé</span>
    }

    function InterviewStatus(props) {
        function getInterviewState(interview) {
            if (interview.reviewState === "PENDING")
                return <span style={{color: "blue"}}>En attente</span>
            else if (interview.reviewState === "DENIED")
                return <span style={{color: "red"}}>Rejeté<span
                    style={{color: "black"}}> : {interview.reasonForRejection} </span></span>
            else
                return <span style={{color: "green"}}>Approuvé</span>
        }

        return <div>
            <Typography>
                Entrevue pour
                l'étudiant {props.interview.studentApplication ? props.interview.studentApplication.student.firstName + " " + props.interview.studentApplication.student.lastName : ""}
            </Typography>
            <Typography>
                Date : {props.interview ? parseDate(props.interview.date) : ""}
            </Typography>
            <Typography>
                Heure : {props.interview ? parseTimeFromDate(props.interview.date) : ""}
            </Typography>
            <Typography>Titre de l'offre :
                {props.interview.studentApplication ? props.interview.studentApplication.offer.title : ""}</Typography>
            <Typography>
                État : {getInterviewState(props.interview)}
            </Typography>
        </div>
    }

    return <Grid
        container
        spacing={2}
        className={classes.main}
        style={{padding: "15px 0 0 15px"}}
    >
        <Grid item xs={5} className={classes.list}>
            <Typography variant={"h4"} gutterBottom={true} className={classes.title}>
                État des employeurs
            </Typography>
            {employers.length !== 0 ? employers.map((item, i) =>
                <div key={i}>
                    <button type={"button"}
                            className={[classes.linkButton, i === currentEmployerIndex ? classes.fileButton : null].join(" ")}
                            onClick={() => {
                                setCurrentEmployerIndex(i)
                            }}
                    >
                        <Typography color={"textPrimary"} variant={"body1"} display={"block"}>
                            {employers[i].companyName + " - " + employers[i].contactName}
                        </Typography>
                    </button>
                    {currentEmployerIndex === i &&
                    <div>
                        <EmployerStatusDetails offers={currentEmployerOffers}/>
                        <button
                            type={"button"}
                            className={[classes.linkButton, currentSubtab === 0 ? classes.fileButton : null].join(' ')}
                            onClick={() => setCurrentSubtab(0)}>
                            <Typography color={"textSecondary"} variant={"body2"}>
                                Offers
                            </Typography>
                        </button>
                        <button
                            type={"button"}
                            className={[classes.linkButton, currentSubtab === 1 ? classes.fileButton : null].join(' ')}
                            onClick={() => {
                                setCurrentSubtab(1)
                                getCurrentEmployerInterviews(currentEmployerIndex)
                            }
                            }>
                            <Typography color={"textSecondary"} variant={"body2"}>
                                Inteviews
                            </Typography>
                        </button>
                    </div>
                    }
                </div>
            ) : "Aucun employeurs"}
        </Grid>
        <Grid item xs={7} align="center" style={{overflow: "auto", height: "100%"}}>
            {currentSubtab === offersTabIndex ? <h1>Détails des offres</h1> : <h1>Détails des entrevues</h1>}
            {
                currentSubtab === offersTabIndex ?
                    currentEmployerOffers ? currentEmployerOffers.map((o, k) => {
                            return <div key={k}>
                                <Typography>
                                    <button type={"button"} className={[classes.linkButton].join(" ")}
                                            onClick={() => {
                                                setCurrentDoc(o.file)
                                                openPdf()
                                            }}
                                    >
                                        {o.title}
                                    </button>
                                </Typography>
                                <OfferDetails offer={o}/>
                                <Typography>
                                    <span>Liste des étudiants selectionnés</span>
                                </Typography>
                                {hiredStudentsNames(o)}
                                {printOfferStatus(o)}
                                <hr/>
                            </div>
                        })
                        : "L'employeur n'a aucune offre"
                    : ""
            }
            {
                currentSubtab === interviewsTabIndex ?
                    currentSubtab === interviewsTabIndex && currentEmployerInterviews ? currentEmployerInterviews.map((interview, index) => {
                            return <div key={index}>
                                <InterviewStatus classes={classes} interview={interview}/>
                                <hr/>
                            </div>
                        })
                        : "L'employeur n'a programmé aucune entrevue"
                    : ""
            }
        </Grid>
        <Dialog open={isPdfOpen} onClose={closePdf} maxWidth={"xl"}>
            <DialogContent className={classes.viewbox}>
                <PdfDocument document={currentDoc}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={closePdf} color="primary">
                    Fermer
                </Button>
            </DialogActions>
        </Dialog>
    </Grid>
}
