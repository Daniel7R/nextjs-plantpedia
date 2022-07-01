import { serialize, CookieSerializeOptions } from "cookie";
import { NextApiHandler, NextApiResponse } from "next";

const DEFAULT_LOCALE = "es";

const PREFERRED_LOCALE_COOKIE = "NEXT_LOCALE";

const language: NextApiHandler = (request, response) => {
    if (request.method === "GET") {
        const preferredLocale = request.cookies[PREFERRED_LOCALE_COOKIE] || "";

        return response.status(200).json({
            preferredLocale,
            defaultLocate: DEFAULT_LOCALE
        })
    }
    if (request.method === "POST") {
        const newPreferredLocale = request.body.preferredLocale as
            | string
            | undefined

        setCookie(response, PREFERRED_LOCALE_COOKIE,
            newPreferredLocale, {
            path: "/"
        });

        response.redirect("/");

        return response.end()
    }

    response.status(405).end();
}

function setCookie(
    res: NextApiResponse,
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {}
) {
    const stringValue = typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

    if ("maxAge" in options) {
        options.expires = new Date(Date.now() + options.maxAge!)
        options.maxAge! /= 1000;
    }

    res.setHeader("Set-Cookie", serialize(name, String(stringValue), options))
}

export default language;