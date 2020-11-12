import {Card, CardContent, Grid} from '@material-ui/core';
import {Field} from 'formik';
import {SimpleFileUpload, TextField} from 'formik-material-ui';
import {DatePicker} from 'formik-material-ui-pickers';
import React from 'react';
import * as yup from "yup";
import useStyles from '../../Utils/useStyles';
import {FormikStepper} from './FormikStepper';


const tooShortError = value => "Doit avoir au moins " + value.min + " caractères";
const tooLittleError = valueNumber => "Doit être plus grand que ou égal à " + valueNumber.min;
const tooBigError = valueNumber => "Doit être plus petit que ou égal à " + valueNumber.max;
const requiredFieldMsg = "Ce champs est requis";

export default function BusinessEvalution() {
    const classes = useStyles()

    const evaluationAnswers = [
        "Totalement en accord",
        "Plutôt en accord",
        "Plutôt en désaccord",
        "Totalement en désaccord",
        "N/A"
    ]

    const globalAppreciations = [
        "Les habiletés démontrées dépassent de beaucoup les attentes",
        "Les habiletés démontrées dépassent les attentes",
        "Les habiletés démontrées répondent pleinement aux attentes",
        "Les habiletés démontrées répondent partiellement aux attentes",
        "Les habiletés démontrées ne répondent pas aux attentes"
    ]

    const traineesNumber = [
        "Un stagiaire",
        "Deux stagiaires",
        "Trois stagiaires",
        "Plus de trois"
    ]

    const validationSchemaStep1 = yup.object().shape({});

    return <Card>
        <CardContent>
            <FormikStepper evaluationAnswers={evaluationAnswers} globalAppreciations={globalAppreciations}>
                <FormikStep label="IDENTIFICATION DE L’ENTREPRISE" validationSchema={validationSchemaStep1}>
                    <Grid container alignItems="flex-start" justify="center" spacing={2}>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="companyName"
                                id="companyName"
                                variant="outlined"
                                label="Nom de l’entreprise"
                                disabled
                                // required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="employerName"
                                id="employerName"
                                variant="outlined"
                                label="Personne contact"
                                // required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="address"
                                id="address"
                                variant="outlined"
                                label="Adresse"
                                // required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="phone"
                                id="phone"
                                variant="outlined"
                                label="Téléphone"
                                // required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="city"
                                id="city"
                                variant="outlined"
                                label="Ville"
                                // required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="fax"
                                id="fax"
                                variant="outlined"
                                label="Télécopieur"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="postalCode"
                                id="postalCode"
                                variant="outlined"
                                label="Code postal"
                                // required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </FormikStep>
                <FormikStep label="IDENTIFICATION DU STAGIAIRE" validationSchema={validationSchemaStep1}>
                    <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="traineeName"
                                id="traineeName"
                                variant="outlined"
                                label="Nom du stagiaire"
                                // required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={DatePicker}
                                name="internshipStartDate"
                                id="internshipStartDate"
                                variant="outlined"
                                label="Date du stage"
                                required
                                fullWidth
                                format="MM/dd/yyyy"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label>Stage : </label>
                            <label style={{marginRight: "1em"}}>
                                <Field type="radio" name="" value="1"/>
                                1
                            </label>
                            <label>
                                <Field type="radio" name="" value="2"/>
                                2
                            </label>
                        </Grid>
                    </Grid>
                </FormikStep>
                <FormikStep label="ÉVALUATION">
                    <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Les tâches confiées au stagiaire sont conformes aux
                                tâches annoncées dans l’entente de stage</label>
                            <Field as="select" name="">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Des mesures d’accueil facilitent l’intégration du
                                nouveau stagiaire</label>
                            <Field as="select" name="">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Le temps réel consacré à l’encadrement du stagiaire est
                                suffisant</label>
                            <Field as="select" name="">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>L’environnement de travail respecte les normes d’hygiène
                                et de sécurité au travail</label>
                            <Field as="select" name="">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Le climat de travail est agréable</label>
                            <Field as="select" name="">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Le milieu de stage est accessible par transport en
                                commun</label>
                            <Field as="select" name="">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Le salaire offert est intéressant pour le
                                stagiaire</label>
                            <Field
                                component={TextField}
                                name="salary"
                                id="salary"
                                variant="outlined"
                                label="Préciser : __/l’heure."
                                // required
                                type={"number"}
                                style={{marginRight: "2em"}}
                                InputProps={{
                                    inputProps: {
                                        min: 12.50,
                                        step: "any"
                                    }
                                }}
                            />
                            <Field as="select" name="">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>La communication avec le superviseur de stage facilite
                                le déroulement du stage</label>
                            <Field as="select" name="">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>L’équipement fourni est adéquat pour réaliser les tâches
                                confiées</label>
                            <Field as="select" name="">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Le volume de travail est acceptable</label>
                            <Field as="select" name="">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Préciser le nombre d’heures/semaine :</label>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Field
                                component={TextField}
                                name="month1"
                                id="month1"
                                variant="outlined"
                                label="Premier mois"
                                // required
                                fullWidth
                                type={"number"}
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                        max: 40,
                                        step: "any"
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Field
                                component={TextField}
                                name="month2"
                                id="month2"
                                variant="outlined"
                                label="Deuxième mois"
                                // required
                                fullWidth
                                type={"number"}
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                        max: 40,
                                        step: "any"
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Field
                                component={TextField}
                                name="month3"
                                id="month3"
                                variant="outlined"
                                label="Troisième mois"
                                // required
                                fullWidth
                                type={"number"}
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                        max: 40,
                                        step: "any"
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField} style={{
                                backgroundColor: "#F2F3F4"
                            }} rows={4} fullWidth multiline label="Commentaires" name="productivity.comment">
                            </Field>
                        </Grid>
                    </Grid>
                </FormikStep>
                <FormikStep label="OBSERVATIONS GÉNÉRALES">
                    <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Ce milieu est à privilégier pour le</label>
                            <label style={{marginRight: "1em"}}>
                                <Field type="radio" name="" value="premierStage"/>
                                Premier stage
                            </label>
                            <label>
                                <Field type="radio" name="" value="deuxiemeStage"/>
                                Deuxième stage
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Ce milieu est ouvert à accueillir</label>
                            <Field as="select" name="">
                                {traineesNumber.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Ce milieu désire accueillir le même stagiaire pour un
                                prochain stage</label>
                            <label style={{marginRight: "1em"}}>
                                <Field type="radio" name="" value="oui"/>
                                oui
                            </label>
                            <label>
                                <Field type="radio" name="" value="non"/>
                                non
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Ce milieu offre des quarts de travail variables</label>
                            <Field
                                component={TextField}
                                name="optionStarted1"
                                id="optionStarted1"
                                variant="outlined"
                                label="De"
                                required
                                type={"number"}
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                        step: "any"
                                    }
                                }}
                            />
                            <Field
                                component={TextField}
                                name="optionEnd1"
                                id="optionEnd1"
                                variant="outlined"
                                label="À"
                                required
                                type={"number"}
                                InputProps={{
                                    inputProps: {
                                        min: 2,
                                        step: "any"
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="optionStarted2"
                                id="optionStarted2"
                                variant="outlined"
                                label="De"
                                required
                                type={"number"}
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                        step: "any"
                                    }
                                }}
                            />
                            <Field
                                component={TextField}
                                name="optionEnd2"
                                id="optionEnd2"
                                variant="outlined"
                                label="À"
                                required
                                type={"number"}
                                InputProps={{
                                    inputProps: {
                                        min: 2,
                                        step: "any"
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>Ce milieu offre des quarts de travail variables</label>
                            <Field
                                component={TextField}
                                name="optionStarted3"
                                id="optionStarted3"
                                variant="outlined"
                                label="De"
                                required
                                type={"number"}
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                        step: "any"
                                    }
                                }}
                            />
                            <Field
                                component={TextField}
                                name="optionEnd3"
                                id="optionEnd3"
                                variant="outlined"
                                label="À"
                                required
                                type={"number"}
                                InputProps={{
                                    inputProps: {
                                        min: 2,
                                        step: "any"
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </FormikStep>
                <FormikStep label="Decision">
                    <Grid container alignItems="flex-start" justify="center" spacing={2}>
                        <Grid item xs={12}>
                            <label>L’ENTREPRISE AIMERAIT ACCUEILLIR CET ÉLÈVE POUR SON PROCHAIN STAGE</label>
                            <label>
                                <Field type="radio" name="feedback.hireAgain" value="Oui"/>
                                Oui
                            </label>
                            <label>
                                <Field type="radio" name="feedback.hireAgain" value="Non"/>
                                Non
                            </label>
                            <label>
                                <Field type="radio" name="feedback.hireAgain" value="Peut-être"/>
                                Peut-être
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <label>La formation technique du stagiaire était-elle suffisante pour accomplir le
                                mandat de stage?</label>
                            <Field component={TextField}
                                   name="feedback.technicalFormationOpinion"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField}
                                   variant="outlined"
                                   label="Nom :"
                                   name="signature.name"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="infos.supervisorRole"
                                id="supervisorRole"
                                variant="outlined"
                                label="Fonction du superviseur:"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={SimpleFileUpload}
                                onChange={(e) => {
                                    console.log(e)
                                }}
                                type={"file"}
                                name="signature.image"
                                id="file"
                                variant="outlined"
                                label="Fichier JPG/PNG"
                                fullwidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={DatePicker}
                                   name="signature.date"
                                   label="Date d'évaluation"
                                   format="MM/dd/yyyy"/>
                        </Grid>
                    </Grid>
                </FormikStep>
            </FormikStepper>
        </CardContent>
    </Card>
}

export function FormikStep({children}) {
    return <>{children}</>;
}