import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Field, Formik} from "formik";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as yup from "yup";
import {TextField} from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
}));

const tooShortError = (value) => "Doit avoir au moins " + value.min + " caractères";
const tooLongError = (value) => "Doit avoir au plus " + value.max + " caractères";

export default function RegisterEmployer() {
    const classes = useStyles();
    let validationSchema =  yup.object()
        .shape({
                companyName :    yup.string().trim().min(5, tooShortError).required("Ce champs est requis"),
                companyAddress:  yup.string().trim().min(10, tooShortError).required("Ce champs est requis"),
                contactName :    yup.string().trim().min(5, tooShortError).max(50, tooLongError).required("Ce champs est requis"),
                phoneNumber :    yup.string().trim().min(10, tooShortError).required("Ce champs est requis"),
                username:        yup.string().trim().min(5, tooShortError).max(30, tooLongError).required("Ce champs est requis"),
                email:           yup.string().trim().email().required("Ce champs est requis"),
                password:        yup.string().trim().min(8, tooShortError).required("Ce champs est requis"),
                passwordConfirm: yup.string()
                    .oneOf([yup.ref('password'), null], "Les mots de passes doivent êtres identiques").required("Ce champs est requis"),
            });
    let onSubmit = (validationSchema, values, setSubmitting) => {
        setTimeout(() => {
            setSubmitting(false);
            validationSchema.isValid(values).then(b => console.log(b))
        }, 500);
    };

    return (
        <Formik
            onSubmit={(values, action) => onSubmit(validationSchema, values, action.setSubmitting)}

            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize={true}
            validationSchema={validationSchema}
            initialValues={{
                companyName: '',
                contactName: '',
                phoneNumber: '',
                companyAddress: '',
                email: '',
                username: '',
                password: '',
                passwordConfirm: '',

            }}
        >
            {({submitForm, isSubmitting}) => (
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="companyName"
                                id="companyName"
                                variant="outlined"
                                label="Nom de la compagnie"
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="companyAddress"
                                id="companyAddress"
                                variant="outlined"
                                label="Addresse de la compagnie"
                                required
                                fullWidth
                                autoFocus
                             />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="contactName"
                                id="contactName"
                                variant="outlined"
                                label="Nom du contact"
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="phoneNumber"
                                id="phoneNumber"
                                variant="outlined"
                                label="Numéro de téléphone"
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="username"
                                id="username"
                                variant="outlined"
                                label="Nom d'utilisateur"
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="email"
                                id="email"
                                variant="outlined"
                                label="Addresse courriel"
                                type={"email"}
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="password"
                                id="password"
                                variant="outlined"
                                label="Mot de passe"
                                type={"password"}
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="passwordConfirm"
                                id="passwordConfirm"
                                variant="outlined"
                                label="Confirmez"
                                type={"password"}
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    {isSubmitting && <LinearProgress />}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size={"large"}
                        className={classes.submit}
                        disabled={isSubmitting}
                        onClick={submitForm}
                    >
                        S'enregistrer
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Vous avez déja un compte? Se connecter
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
}