import { useRouter } from "next/router"
import { Grid } from "@ui/Grid";
import { Typography } from "@ui/Typography";
import { Button } from "@ui/Button";
import { useTranslation } from "next-i18next";

import { signIn, signOut, useSession } from "next-auth/react";

export function TopArea() {

    return (
        <Grid container justifyContent="space-between">
            <Grid item>
                <LogingLogout />
            </Grid>
            <Grid item>
                <LocaleOptions />
            </Grid>
        </Grid>
    )
}

function LogingLogout() {
    const { t }= useTranslation(["common"])
    const { data: session, status} = useSession();

    if(status === "loading") {
        return null;
    }

    if(session === null) {
        return <Button onClick={() => signIn()}>{t("signIn")}</Button>
    }

    return(
        <>
            <span>{session.user?.name}</span>
            <Button onClick={() => signOut()}>{t("signOut")}</Button>
        </>
    );
}

const LocaleOptions = () => {

    const { locales, locale } = useRouter();
    const { t }= useTranslation(["common"])

    if (locales === undefined || locale === undefined) {
        return null;
    }

    return (
        <>
            <Typography variant="body2" component="span" className="pr-3">
                {t("language")}
            </Typography>
            {
                locales.map(loc => (
                    <form
                        action="/api/language"
                        method="POST"
                        key={loc}
                        className="inline-block"
                    >
                        <input name="preferredLocale" value={loc} type="hidden" />
                        <Button variant={loc === locale ? "outlined" : "text"} className="ml-1" type="submit">
                            {loc}
                        </Button>
                    </form>
                ))
            }
        </>
    )
}