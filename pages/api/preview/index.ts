import { NextApiHandler } from "next";
import { getPlant } from "@api";

const enablePreview: NextApiHandler = async (request, response) => {
    const slug = request.query.slug;

    if (request.query.secret !== process.env.PREVIEW_SECRET || typeof slug !== "string" || slug === "") {
        return response.status(401).json({ message: "Invalid Token" })
    }

    try {
        const plant = await getPlant(slug, true);

        response.setPreviewData({})

        response.redirect(`/entry/${plant.slug}`)
    } catch (er) {
        if (process.env.NODE_ENV !== "production") {
            console.error(er)
        }
        return response.status(401).json({ message: "Invalid Slug" })
    }
}

export default enablePreview;