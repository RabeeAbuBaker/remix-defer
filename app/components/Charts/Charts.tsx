import {Box, LoadingOverlay, Select, Stack} from "@mantine/core";
import {AreaChart} from "@mantine/charts";
import {useSearchParams} from "@remix-run/react";
import {ChartData} from "~/utils/mockData";


type ChartsProps = {
    data?: ChartData[]
    loading?: boolean
}

export function Charts({data, loading}: ChartsProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const whenParam = searchParams.get("when") ?? "thisWeek"

    return (
        <Stack gap={50}>
            <Select
                label="When?"
                placeholder="Pick value"
                data={[{value: 'thisWeek', label: 'This Week'}, {value: 'lastWeek', label: 'Last Week'}]}
                value={whenParam}
                onChange={(value) => {
                    if (value) {
                        setSearchParams((searchParams) => {
                            searchParams.set("when", value)
                            return searchParams
                        })
                    }
                }}
            />
            <Box h={300} pos="relative">
                {loading ?
                    <LoadingOverlay visible overlayProps={{radius: "sm", blur: 2}}
                                    loaderProps={{color: 'green', type: 'bars'}}/> :
                    <>
                        {data && <AreaChart
                            h={300}
                            data={data}
                            dataKey="date"
                            series={[
                                {name: 'Apples', color: 'indigo.6'},
                                {name: 'Oranges', color: 'blue.6'},
                                {name: 'Tomatoes', color: 'teal.6'},
                            ]}
                            curveType="linear"
                        />}
                    </>}
            </Box>
        </Stack>
    );
}
