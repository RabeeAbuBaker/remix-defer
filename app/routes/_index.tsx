import {defer, LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {AppShell, Container} from "@mantine/core";
import {Await, useLoaderData} from "@remix-run/react";
import React, {Suspense} from "react";

export const meta: MetaFunction = () => {
    return [
        {title: "Mantine Remix App"},
        {name: "description", content: "Welcome to Mantine!"},
    ];
};

type Movie = {
    id: number
    name: string
}

function getMovies(): Promise<Movie[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const movies = [
                { id: 1, name: 'The Shawshank Redemption' },
                { id: 2, name: 'The Godfather' },
                { id: 3, name: 'The Dark Knight' },
                { id: 4, name: 'Pulp Fiction' },
                { id: 5, name: 'Forrest Gump' },
                { id: 6, name: 'Inception' },
                { id: 7, name: 'Fight Club' },
                { id: 8, name: 'The Matrix' },
                { id: 9, name: 'Interstellar' },
                {
                    id: 10,
                    name: 'The Lord of the Rings: The Fellowship of the Ring',
                },
            ]
            resolve(movies)
        }, 2000)
    })
}

export async function loader({ request, params }: LoaderFunctionArgs) {
    const movies = getMovies()
    return defer({ movies })
}


export default function Index() {
    const {movies} = useLoaderData<typeof loader>()
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header>
                <div>Logo</div>
            </AppShell.Header>
            <AppShell.Main>
                <Container mt="xl">
                    <Suspense fallback={<div>
                        <div>--------------------</div>
                        <div>--------------------</div>
                        <div>--------------------</div>
                        <div>--------------------</div>
                        <div>--------------------</div>
                        <div>--------------------</div>
                        <div>--------------------</div>
                        <div>--------------------</div>
                        <div>--------------------</div>
                        <div>--------------------</div>
                    </div>}>
                        <Await resolve={movies}>
                            {(moviesData) => <>
                            {moviesData.map((movie)=> <div key={movie.id}> {movie.name}</div>)}
                            </>
                            }
                        </Await>
                    </Suspense>
                </Container>
            </AppShell.Main>
        </AppShell>

    );
}
