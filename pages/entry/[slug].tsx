import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Grid } from '@ui/Grid'
import { RichText } from '@components/RichText'
import { AuthorCard } from '@components/AuthorCard'
import { getCategoryList, getPlant, getPlantList } from '@api'
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { PlantEntryInline } from '@components/PlantCollection'
import Link from 'next/link'
import { useRouter } from 'next/router'

type PlantEntryProps = {
    plant: Plant
    otherEntries: Plant[]
    categories: Category[]
}
type PathType = {
    params: {
        slug: string
    },
    locale: string
}

export const getStaticProps: GetStaticProps<PlantEntryProps> = async ({ params, preview, locale }) => {
    const slug = params?.slug;

    if (typeof slug !== "string") {
        return {
            notFound: true
        }
    }

    try {
        const plant = await getPlant(slug, preview, locale  )
        const otherEntries = await getPlantList({
            limit: 5
        });
        const categories = await getCategoryList({
            limit: 10
        });

        return {
            props: {
                plant,
                otherEntries,
                categories
            },
            revalidate: 5 * 60
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export const getStaticPaths: GetStaticPaths= async ({ locales }: any) => {

    if (locales === undefined) {
        throw new Error("Did you forget to config your locales in your Next.config.js?");
    }
    const entries = await getPlantList({ limit: 10 })

    const paths: PathType[] = entries.map(({slug}) => ({
        params: {
            slug
        }
    })).flatMap(path => locales.map((locale: string) => ({
        locale, ...path
    })))


    return {
        paths,
        fallback: true
    };
}

export default function PlantEntryPage({
    plant,
    otherEntries,
    categories
}: InferGetStaticPropsType<typeof getStaticProps>) {

    const { isFallback } = useRouter();

    if (isFallback) {
        //Next js is loading
        return (<Layout>
            <main>Loading something</main>
        </Layout>)
    }
    return (
        <Layout>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={9} component="article">
                    <figure>
                        <img width={952} src={plant?.image.url} alt={plant?.image.title} />
                    </figure>
                    <div className="px-12 pt-8">
                        <Typography variant="h2">{plant?.plantName}</Typography>
                    </div>
                    <div className="p-10">
                        <RichText richText={plant.description} />
                    </div>
                </Grid>
                <Grid item xs={12} md={4} lg={3} component="aside">
                    <section>
                        <Typography variant="h5" component="h3" className="mb-4">
                            Recent Posts
                        </Typography>
                        {
                            otherEntries?.map(entry => (
                                <article className="mb-4" key={entry.id}>
                                    <PlantEntryInline {...entry} />
                                </article>
                            ))
                        }
                    </section>
                    <section className="mt-10">
                        <Typography variant="h5" component="h3" className="mb-4">
                            Categories
                        </Typography>
                        <ul className='list'>
                            {
                                categories?.map(category => (
                                    <li key={category.id}>
                                        <Link href={`/category/${category.slug}`}>
                                            <Typography component="a" variant="h6">
                                                {category.title}
                                            </Typography>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                </Grid>
            </Grid>
            <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
                <AuthorCard {...plant.author} />
            </section>
        </Layout>
    )
}