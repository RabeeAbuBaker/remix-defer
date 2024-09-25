import {defer, LoaderFunction, MetaFunction} from "@remix-run/node";
import {AppShell, Container} from "@mantine/core";
import {getMockData} from "~/utils/mock.server";
import {Await, useLoaderData, useNavigation} from "@remix-run/react";
import {ChartData, lastWeekData, thisWeekData} from "~/utils/mockData";
import {Charts} from "~/components/Charts/Charts";
import React, {Suspense} from "react";

export const meta: MetaFunction = () => {
    return [
        {title: "Mantine Remix App"},
        {name: "description", content: "Welcome to Mantine!"},
    ];
};


export type LoaderData = {
    data: Promise<{ type: string, data: ChartData[] }>;
}

export const loader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url)
    const when = url.searchParams.get("when")
    const thisWeek = when === "thisWeek"
    const response = getMockData<ChartData[]>({
        data: thisWeek ? thisWeekData : lastWeekData,
        delay: thisWeek ? 2000 : 3000
    })
    return defer<LoaderData>({data: response});
}

export default function Index() {
    const {data} = useLoaderData() as LoaderData
    const {state} = useNavigation()

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
                    <Suspense fallback={<Charts loading/>}>
                        <Await resolve={data}>
                            {({data}) => <Charts data={data} loading={state === "loading"}/>
                            }
                        </Await>
                    </Suspense>
                </Container>
            </AppShell.Main>
        </AppShell>

    );
}
