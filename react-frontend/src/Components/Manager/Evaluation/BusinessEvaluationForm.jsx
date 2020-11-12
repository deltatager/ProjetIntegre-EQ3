import {Card, CardContent, Grid, Typography} from '@material-ui/core';
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

    const validationSchemaStep1 = yup.object().shape({
        infos: yup.object().shape({
            studentProgram: yup.string().trim().min(5, tooLittleError).max(50, tooBigError).required(),
        })
    });

    return <Card>
        <CardContent>
            <FormikStepper evaluationAnswers={evaluationAnswers} globalAppreciations={globalAppreciations}>
                <FormikStep label="Information Generale" validationSchema={validationSchemaStep1}>
                    <Grid container alignItems="flex-start" justify="center" spacing={2}>
                        <Typography variant={"h1"} className={classes.formTitle}>
                            Évaluation du stagiaire
                        </Typography>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="infos.fullname"
                                id="fullname"
                                variant="outlined"
                                label="Nom de l’étudiant :"
                                disabled
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="infos.studentProgram"
                                id="studentProgram"
                                variant="outlined"
                                label="Programme d’études :"
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                </FormikStep>
                <FormikStep label="Evaluation productivité">
                    <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={12}>
                            <h1>Capacité d’optimiser son rendement au travail</h1>
                            <h1>Le stagiaire a été en mesure de :</h1>
                            <label>a - planifier et organiser son travail de façon efficace</label>
                            <Field as="select" name="productivity.efficiency">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>b - comprendre rapidement les directives
                                relatives à son travail</label>
                            <Field as="select" name="productivity.comprehension">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>c - maintenir un rythme de travail
                                soutenu</label>
                            <Field as="select" name="productivity.rythm">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>d - établir ses priorités</label>
                            <Field as="select" name="productivity.priorities">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{marginRight: "2em"}}>e - respecter ses échéanciers</label>
                            <Field as="select" name="productivity.deadlines">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField} style={{
                                backgroundColor: "#F2F3F4"
                            }} rows={4} fullWidth multiline label="Commentaires" name="productivity.comment">

                            </Field>
                        </Grid>
                    </Grid>
                </FormikStep>
                <FormikStep label="Evaluation qualité du travail">
                    <Grid container alignItems="flex-start" justify="center" spacing={2}>
                        <Grid item xs={12}>
                            <h1>Capacité de s’acquitter des tâches sous sa responsabilité en s’imposant
                                personnellement des normes de qualité</h1>
                            <h1>Le stagiaire a été en mesure de :</h1>
                            <label>a - respecter les mandats qui lui ont été confiés</label>
                            <Field as="select" name="quality.followsInstruction">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>b - porter attention aux détails dans la réalisation de ses
                                tâches</label>
                            <Field as="select" name="quality.detailsAttention">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>c - vérifier son travail, s’assurer que rien n’a été oublié</label>
                            <Field as="select" name="quality.doubleChecks">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>d - rechercher des occasions de se perfectionner</label>
                            <Field as="select" name="quality.strivesForPerfection">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>e - faire une bonne analyse des problèmes rencontrés</label>
                            <Field as="select" name="quality.problemAnalysis">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component="textarea" label="Commentaires" name="quality.comment">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                    </Grid>
                </FormikStep>
                <FormikStep label="Evaluation QUALITÉS DES RELATIONS INTERPERSONNELLES">
                    <Grid container alignItems="flex-start" justify="center" spacing={2}>
                        <Grid item xs={12}>
                            <h1>Capacité d’établir des interrelations harmonieuses dans son milieu de
                                travail</h1>
                            <h1>Le stagiaire a été en mesure de :</h1>
                            <label>a - établir facilement des contacts avec les gens</label>
                            <Field as="select" name="relationships.connectsEasily">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>b - contribuer activement au travail d’équipe</label>
                            <Field as="select" name="relationships.teamworkContribution">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>c - s’adapter facilement à la culture de l’entreprise</label>
                            <Field as="select" name="relationships.culturalAdaptation">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}
                                </option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>d - accepter les critiques constructives</label>
                            <Field as="select" name="relationships..acceptsCriticism">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>e - être respectueux envers les gens</label>
                            <Field as="select" name="relationships.respectsOthers">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>f - Faire preuve d’écoute active en essayant de comprendre le point de
                                vue de
                                l’autre</label>
                            <Field as="select" name="relationships.activelyListens">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>Commentaires</label>
                            <Field as="textarea" name="relationships.comment">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                    </Grid>
                </FormikStep>
                <FormikStep label="HABILETÉS PERSONNELLES"
                >
                    <Grid container alignItems="flex-start" justify="center" spacing={2}>
                        <Grid item xs={12}>
                            <h1>Capacité de faire preuve d’attitudes ou de comportements matures et
                                responsables</h1>
                            <h1>Le stagiaire a été en mesure de :</h1>
                            <label>a - démontrer de l’intérêt et de la motivation au travail</label>
                            <Field as="select" name="skills.showsInterest">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>b - exprimer clairement ses idées</label>
                            <Field as="select" name="skills.expressesOwnIdeas">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>c - faire preuve d’initiative</label>
                            <Field as="select" name="skills.showsInitiative">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}
                                </option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>d - travailler de façon sécuritaire</label>
                            <Field as="select" name="skills.worksSafely">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>e - démontrer un bon sens des responsabilités ne requérant qu’un minimum
                                de
                                supervision</label>
                            <Field as="select" name="skills.dependable">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>f - être ponctuel et assidu à son travail</label>
                            <Field as="select" name="skills.puntual">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>Commentaires</label>
                            <Field as="textarea" name="skills.comment">
                                {evaluationAnswers.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                    </Grid>
                </FormikStep>
                <FormikStep label="APPRÉCIATION GLOBALE DU STAGIAIRE">
                    <Grid container alignItems="flex-start" justify="center" spacing={2}>
                        <Grid item xs={12}>
                            <label>APPRÉCIATION GLOBALE DU STAGIAIRE</label>
                            <Field as="select" name="globalAppreciation.expectations">
                                {globalAppreciations.map((e, k) => <option key={k}>{e}</option>)}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <label>PRÉCISEZ VOTRE APPRÉCIATION:</label>
                            <Field as="textarea" name="globalAppreciation.comment">
                            </Field>
                        </Grid>

                        <Grid item xs={12}>
                            <label>Cette évaluation a été discutée avec le stagiaire :</label>
                            <label>
                                <Field type="radio" name="globalAppreciation.discussedWithIntern" value="One"/>
                                Oui
                            </label>
                            <label>
                                <Field type="radio" name="globalAppreciation.discussedWithIntern" value="Two"/>
                                Non
                            </label>

                        </Grid>

                    </Grid>
                </FormikStep>
                <FormikStep label="Nombre d'heure de supervision par semaine">
                    <Grid container alignItems="flex-start" justify="center" spacing={2}>
                        <Grid item xs={12}>
                            <label>Veuillez indiquer le nombre d’heures réel par semaine d’encadrement accordé
                                au stagiaire :</label>
                            <Field type="number" name="feedback.weeklySupervisionHours"/>

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
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="infos.phoneNumber"
                                id="phoneNumber"
                                variant="outlined"
                                label="Numero de telephone"
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
                                   label="Date d'évaluation"
                                   format="MM/dd/yyyy"
                                   name="signature.date"/>
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
