import React, {useEffect, useState} from "react";
import useStyles from "../Utils/useStyles";
import {useApi} from "../Utils/Hooks";
import {Typography} from "@material-ui/core";
import PdfSelectionViewer from "../Utils/PdfSelectionViewer";

export default function ContractList() {
    const classes = useStyles();
    const api = useApi();
    const [contracts, setContracts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        api.get("/contract")
            .then(r => setContracts(r ? r.data : []))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function sendDecision(index, contractState) {
        const nextState = [...contracts];
        const application = nextState[index];
        application.signatureState = contractState;
        return api.put("/contract/" + application.id, application)
            .then(result => {
                setContracts(nextState);
            })
    }

    function deleteContract(index) {
        const nextState = [...contracts];
        return api.delete("/contract/" + nextState[index].id)
            .then(() => {
                nextState.splice(index, 1)
                setContracts(nextState)
            })
    }

    function showContractState(index) {
        const nextState = [...contracts];
        const contractState = nextState[index].signatureState;

        switch (contractState) {
            case "WAITING_FOR_EMPLOYER_SIGNATURE" :
                return <Typography variant={"body1"} style={{color: "blue"}}>
                    En attente de la signature de l'employeur
                </Typography>
            case "REJECTED_BY_EMPLOYER" :
                return <Typography variant={"body1"} style={{color: "red"}}>
                    L'employeur a rejeté le contrat :
                    {nextState[index].reasonForRejection}
                </Typography>
            case "WAITING_FOR_STUDENT_SIGNATURE" :
                return <Typography variant={"body1"} style={{color: "blue"}}>
                    En attente de la signature de l'étudiant
                    {nextState[index].reasonForRejection}
                </Typography>
            default:
                return '';
        }
    }

    return (
        <div style={{height: "100%"}}>
            <PdfSelectionViewer
                documents={contracts ? contracts.map(c => c.file ? "data:application/pdf;base64," + c.file : "") : []}
                title={"Contrats"}>
                {(i, setCurrent) => (
                    <div key={i}>
                        <di className={classes.buttonDiv}>
                            {contracts[i].signatureState !== "WAITING_FOR_STUDENT_SIGNATURE" &&
                            <button
                                type={"button"}
                                className={classes.linkButton}
                                onClick={() => deleteContract(i)}>
                                <i className="fa fa-trash" style={{color: "red"}}/>
                            </button>
                            }
                            {contracts[i].signatureState === "PENDING_FOR_ADMIN_REVIEW" &&
                            <button
                                type={"button"}
                                className={[classes.linkButton].join(' ')}
                                onClick={() => sendDecision(i, "WAITING_FOR_EMPLOYER_SIGNATURE")}
                                style={{marginRight: 5}}>
                                <i className="fa fa-check-square" style={{color: "green"}}/>
                            </button>
                            }
                        </di>
                        < button
                            type={"button"}
                            className={[classes.linkButton, i === currentIndex ? classes.fileButton : null].join(' ')}
                            onClick={() => {
                                setCurrent(i);
                                setCurrentIndex(i);
                            }}
                        >
                            <Typography color={"textPrimary"} variant={"body1"}>
                                Nom du gestionnaire de stage : {contracts[i].adminName}
                            </Typography>
                            {showContractState(i)}
                            <hr className={classes.hrStyle}/>
                        </button>
                    </div>
                )}
            </PdfSelectionViewer>
        </div>
    )
}